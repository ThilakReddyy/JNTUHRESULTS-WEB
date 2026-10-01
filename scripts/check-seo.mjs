import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { load } from 'cheerio';

const origin = 'https://jntuhconnect.dhethi.com';
const read = (path) => readFileSync(`out/${path}`, 'utf8');
const page = (path) => load(read(path === '/' ? 'index.html' : `${path.slice(1)}.html`));
const sitemap = load(read('sitemap.xml'), { xmlMode: true });
const urls = sitemap('loc').map((_, node) => sitemap(node).text()).get();
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap entries');
for (const url of urls) {
  const path = new URL(url).pathname;
  const $ = page(path);
  assert.equal(new URL($('link[rel="canonical"]').attr('href')).href, new URL(url).href, `Canonical mismatch: ${path}`);
  assert(!($('meta[name="robots"]').attr('content') ?? '').includes('noindex'), `Sitemap page is noindex: ${path}`);
  assert($('title').text().length > 0, `Missing title: ${path}`);
  assert($('meta[name="description"]').attr('content'), `Missing description: ${path}`);
  const image = $('meta[property="og:image"]').attr('content');
  assert(image && existsSync(`public${new URL(image).pathname}`), `Missing social image: ${path}`);
  $('script[type="application/ld+json"]').each((_, node) => JSON.parse($(node).text()));
}
for (const path of [
  '/academicresult/result', '/academicallresult/result', '/backlogreport/result',
  '/classresult/result', '/creditchecker/result', '/journey/result',
  '/resultcontrast/result', '/wrapped/result', '/notifications/examcode', '/notifications/examresults',
]) {
  const $ = page(path);
  assert(($('meta[name="robots"]').attr('content') ?? '').includes('noindex'), `Indexable details: ${path}`);
  assert.equal($('link[rel="canonical"]').length, 0, `Inherited canonical: ${path}`);
  assert(!urls.includes(`${origin}${path}`), `Details in sitemap: ${path}`);
}
const faq = page('/faq');
const schemas = faq('script[type="application/ld+json"]').map((_, node) => JSON.parse(faq(node).text())).get();
const questions = schemas.find((item) => item['@type'] === 'FAQPage').mainEntity;
assert.equal(questions.length, faq('details').length);
questions.forEach((question, index) => {
  const details = faq('details').eq(index);
  assert.equal(details.find('summary').text(), question.name);
  assert.equal(details.find('p').text(), question.acceptedAnswer.text);
});
assert(schemas.some((item) => item['@type'] === 'BreadcrumbList'));
for (const path of ['/', '/academicresult', '/academicallresult', '/backlogreport', '/creditchecker']) {
  assert.equal(page(path)('section[aria-labelledby^="guide-"]').length, 1, `Missing static guide: ${path}`);
}
assert(read('robots.txt').includes(`${origin}/sitemap.xml`));
console.log(`SEO checks passed: ${urls.length} sitemap URLs, 10 noindex detail routes, ${questions.length} crawlable FAQ answers, and 5 guides.`);
