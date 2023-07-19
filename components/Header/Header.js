import Head from "next/head";
import Script from "next/script";
const Header = () => {
  return (
    <>
      <Head>
        <title>JNTUH Results</title>
        <meta property='og:url' content='https://jntuhresults.vercel.app/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='JNTUH Results' />
        <meta
          property='og:description'
          content='You can find the Results of your entire semesters here of Jawaharlal Nehru Technological University, Hyderabad (JNTUH).'
        />
        <meta property='og:image' content='https://raw.githubusercontent.com/ThilakReddyy/JNTUHRESULTS-WEB/main/public/FrontPage.png' />
        <meta name='twitter:card' content='summary' />
        <meta property='twitter:title' content='JNTUH Results' />
        <meta property='twitter:description' content='JNTUH Results, JNTUH B.Tech Results, jntuhresults, jntuh notifications, JNTUH Results Engineering, JNTUH Engineering Results, jntuh bpharmacy results, jntuh bphar results, jntuh mtech results, jntuh mba results, jntuh mca results' />
        <meta name="description" content="Find the results of your entire semesters at Jawaharlal Nehru Technological University, Hyderabad (JNTUH). Get JNTUH B.Tech results, notifications, and more." />
        <meta name="google-site-verification" content="2arj9D99oUuGh03Qhewo_iEY45zbwhrJqLytiZSmoEg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://jntuhresults.vercel.app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" alt="Favicon 32x32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" alt="Favicon 16x16" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Delicious+Handrawn&family=Inter:wght@300&family=Roboto+Slab&display=swap" rel="stylesheet" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    // console.log("dark Mode");         
                }
                else
                {
                  // console.log("light mode");
                }
                addEventListener('popstate', (event) => { });
                onpopstate = (event) => {
                  console.log("pressed");
                  window.location.reload();
                 };
                  `,
          }}
        >
        </script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5512897194230969"
          crossorigin="anonymous"></script>
      </Head>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6CR1W425NE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6CR1W425NE');
        `}
      </Script>
    </>
  )
}
export default Header;
