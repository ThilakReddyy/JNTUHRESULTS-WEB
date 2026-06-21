"use client";
import { useEffect, useRef, useState } from "react";

const MCP_STYLES = `
  .mcp-page{
    --bg:#13171a;
    --paper:#efe9d7;
    --paper-soft:#e3dbc3;
    --rule:#bdb08a;
    --rule-soft:#d8cda7;
    --ink:#23271f;
    --ink-soft:#5c5f4f;
    --stamp:#a3362b;
    --seal:#8a6a2c;
    --teal:#2e5b49;
    --teal-soft:#e3e9e0;
    --font-display:'IBM Plex Serif',serif;
    --font-body:'IBM Plex Sans',sans-serif;
    --font-mono:'IBM Plex Mono',monospace;
        color:var(--ink);
    font-family:var(--font-body);
    line-height:1.5;
    min-height:calc(100vh - 64px);
  }
  .mcp-page *{box-sizing:border-box;}

  .mcp-page a{color:var(--teal);}
  .mcp-page :focus-visible{outline:2px solid var(--stamp); outline-offset:2px;}

  .mcp-page .page-wrap{
    display:flex;
    justify-content:center;
    padding:clamp(24px,6vw,72px) 16px clamp(48px,8vw,96px);
  }

  .mcp-page .sheet-frame{
    position:relative;
    max-width:860px;
    width:100%;
  }
  .mcp-page .sheet-frame::before,
  .mcp-page .sheet-frame::after{
    content:"";
    position:absolute;
    inset:0;
    background:var(--paper-soft);
    border:1px solid var(--rule);
  }
  .mcp-page .sheet-frame::before{ transform:rotate(-1.3deg) translate(-7px,10px); z-index:0; }
  .mcp-page .sheet-frame::after{ transform:rotate(1.1deg) translate(8px,13px); z-index:0; }

  .mcp-page .sheet{
    position:relative;
    z-index:1;
    background:var(--paper);
    border:1px solid var(--rule);
    padding:clamp(28px,5vw,56px);
  }

  .mcp-page .eyebrow{
    display:inline-flex;
    align-items:center;
    gap:8px;
    font-family:var(--font-mono);
    font-size:11px;
    letter-spacing:.14em;
    text-transform:uppercase;
    color:var(--stamp);
    border:1px solid var(--stamp);
    padding:4px 9px;
    margin-bottom:18px;
  }
  .mcp-page .eyebrow::before{ content:"●"; font-size:9px; }

  .mcp-page .letterhead{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:20px;
    border-bottom:3px double var(--rule);
    padding-bottom:20px;
    margin-bottom:18px;
  }
  .mcp-page h1{
    font-family:var(--font-display);
    font-weight:700;
    font-size:clamp(28px,4.4vw,42px);
    line-height:1.08;
    margin:0 0 10px;
    color:var(--ink);
  }
  .mcp-page .subtitle{
    font-size:clamp(15px,2vw,17px);
    color:var(--ink-soft);
    max-width:34ch;
    margin:0;
  }
  .mcp-page .seal{ flex-shrink:0; width:64px; height:64px; }

  .mcp-page .meta-row{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:0;
    border-top:1px solid var(--rule);
    border-bottom:1px solid var(--rule);
    margin-bottom:32px;
  }
  .mcp-page .meta-cell{
    padding:10px 14px;
    border-right:1px solid var(--rule);
  }
  .mcp-page .meta-cell:last-child{ border-right:none; }
  .mcp-page .meta-label{
    font-family:var(--font-mono);
    font-size:10px;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:var(--teal);
    display:block;
    margin-bottom:4px;
  }
  .mcp-page .meta-value{
    font-family:var(--font-mono);
    font-size:13px;
    word-break:break-word;
  }

  .mcp-page .facts{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:1px;
    background:var(--rule);
    margin-bottom:40px;
    border:1px solid var(--rule);
  }
  .mcp-page .fact{
    background:var(--paper);
    padding:14px 12px;
  }
  .mcp-page .fact-label{
    font-family:var(--font-mono);
    font-size:10px;
    letter-spacing:.08em;
    text-transform:uppercase;
    color:var(--teal);
    display:block;
    margin-bottom:6px;
  }
  .mcp-page .fact-value{ font-size:13.5px; font-weight:600; }

  .mcp-page .tabs{
    display:flex;
    gap:6px;
    margin-bottom:0;
  }
  .mcp-page .tab-btn{
    font-family:var(--font-mono);
    font-size:12.5px;
    letter-spacing:.04em;
    text-transform:uppercase;
    background:var(--paper-soft);
    border:1px solid var(--rule);
    border-bottom:none;
    color:var(--ink-soft);
    padding:10px 18px;
    cursor:pointer;
    border-radius:3px 3px 0 0;
  }
  .mcp-page .tab-btn[aria-selected="true"]{
    background:var(--paper);
    color:var(--ink);
    font-weight:600;
    position:relative;
    top:1px;
  }
  .mcp-page .tab-panels{
    border:1px solid var(--rule);
    border-top:none;
    padding:clamp(20px,4vw,32px) clamp(18px,4vw,28px);
    margin-bottom:40px;
  }

  .mcp-page ol.steps{ list-style:none; margin:0 0 22px; padding:0; counter-reset:step; }
  .mcp-page ol.steps li{
    counter-increment:step;
    display:grid;
    grid-template-columns:38px 1fr;
    gap:14px;
    padding:12px 0;
    border-bottom:1px solid var(--rule-soft);
  }
  .mcp-page ol.steps li:last-child{ border-bottom:none; }
  .mcp-page ol.steps li::before{
    content:counter(step);
    font-family:var(--font-mono);
    font-weight:600;
    font-size:13px;
    width:34px; height:34px;
    border:1px solid var(--ink);
    display:flex;
    align-items:center;
    justify-content:center;
  }
  .mcp-page .step-body strong{ display:block; margin-bottom:2px; font-size:15px; }
  .mcp-page .step-body span{ color:var(--ink-soft); font-size:13.5px; }
  .mcp-page .step-body code{
    font-family:var(--font-mono);
    background:var(--teal-soft);
    padding:1px 6px;
    border-radius:2px;
    font-size:13px;
  }

  .mcp-page .callout{
    border-left:3px solid var(--teal);
    background:var(--teal-soft);
    padding:12px 16px;
    margin:18px 0 26px;
    font-size:13.5px;
  }
  .mcp-page .callout .label{
    font-family:var(--font-mono);
    font-size:10px;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:var(--teal);
    display:block;
    margin-bottom:4px;
  }

  .mcp-page .prompt-table{ margin-top:24px; }
  .mcp-page .prompt-heading{
    font-family:var(--font-mono);
    font-size:11px;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:var(--teal);
    border-bottom:1px solid var(--rule);
    padding-bottom:6px;
    margin-bottom:4px;
  }
  .mcp-page .prompt-row{
    display:grid;
    grid-template-columns:120px 1fr;
    gap:14px;
    align-items:center;
    padding:9px 0;
    border-bottom:1px solid var(--rule-soft);
  }
  .mcp-page .prompt-tag{
    font-family:var(--font-mono);
    font-size:11px;
    text-transform:uppercase;
    color:var(--ink-soft);
    letter-spacing:.05em;
  }
  .mcp-page .prompt-text{
    font-family:var(--font-mono);
    font-size:13px;
    background:var(--paper-soft);
    padding:6px 10px;
    border:1px solid var(--rule-soft);
    display:inline-block;
  }

  .mcp-page .code-block{
    position:relative;
    background:#1b1f1c;
    border:1px solid #30362f;
    margin:18px 0 8px;
  }
  .mcp-page .code-tag{
    position:absolute;
    top:-1px; left:14px;
    transform:translateY(-100%);
    background:var(--ink);
    color:var(--paper);
    font-family:var(--font-mono);
    font-size:10px;
    letter-spacing:.08em;
    padding:3px 8px;
  }
  .mcp-page .code-block pre{
    margin:0;
    padding:20px 18px 16px;
    overflow-x:auto;
    font-family:var(--font-mono);
    font-size:12.5px;
    line-height:1.6;
    color:#e7e2cf;
  }
  .mcp-page .copy-btn{
    position:absolute;
    top:8px; right:8px;
    font-family:var(--font-mono);
    font-size:10.5px;
    text-transform:uppercase;
    letter-spacing:.06em;
    background:transparent;
    color:#cfc8ac;
    border:1px solid #444a40;
    padding:4px 9px;
    cursor:pointer;
  }
  .mcp-page .copy-btn:hover{ border-color:#cfc8ac; }
  .mcp-page .copy-note{
    font-size:12px;
    color:var(--ink-soft);
    margin:0 0 22px;
  }
  .mcp-page .inline-code{
    font-family:var(--font-mono);
    background:var(--teal-soft);
    padding:1px 5px;
  }

  .mcp-page .tools-section{ margin-bottom:40px; }
  .mcp-page .section-eyebrow{
    font-family:var(--font-mono);
    font-size:11px;
    letter-spacing:.12em;
    text-transform:uppercase;
    color:var(--teal);
    margin-bottom:6px;
  }
  .mcp-page h2{
    font-family:var(--font-display);
    font-size:clamp(20px,3vw,25px);
    margin:0 0 18px;
  }
  .mcp-page table.tools{
    width:100%;
    border-collapse:collapse;
    font-size:13.5px;
  }
  .mcp-page table.tools th{
    text-align:left;
    font-family:var(--font-mono);
    font-size:10.5px;
    letter-spacing:.08em;
    text-transform:uppercase;
    color:var(--teal);
    border-bottom:2px solid var(--ink);
    padding:0 10px 8px 0;
  }
  .mcp-page table.tools td{
    padding:11px 10px 11px 0;
    border-bottom:1px solid var(--rule-soft);
    vertical-align:top;
  }
  .mcp-page table.tools tr:nth-child(even) td{ background:rgba(189,176,138,0.10); }
  .mcp-page table.tools td:first-child{ font-weight:600; white-space:nowrap; }
  .mcp-page table.tools td:last-child{ color:var(--ink-soft); }

  .mcp-page .verify{
    text-align:center;
    padding:30px 0 6px;
    border-top:3px double var(--rule);
  }
  .mcp-page .verify h2{ margin-bottom:6px; }
  .mcp-page .verify p{
    max-width:42ch;
    margin:0 auto 26px;
    color:var(--ink-soft);
    font-size:14px;
  }
  .mcp-page .stamp-wrap{
    display:flex;
    justify-content:center;
    margin-bottom:8px;
  }
  .mcp-page .stamp{
    width:150px;
    height:150px;
    opacity:0;
    transform:scale(1.6) rotate(2deg);
    transition:opacity .5s ease, transform .55s cubic-bezier(.34,1.6,.5,1);
  }
  .mcp-page .stamp.in-view{
    opacity:.92;
    transform:scale(1) rotate(-9deg);
  }
  .mcp-page .stamp-rotate text{
    fill:var(--stamp);
    font-family:var(--font-mono);
  }
  .mcp-page .stamp-main{ font-size:19px; font-weight:600; letter-spacing:.03em; }
  .mcp-page .stamp-sub{ font-size:10px; letter-spacing:.1em; }

  .mcp-page footer{
    border-top:1px solid var(--rule);
    padding-top:18px;
    margin-top:8px;
    font-size:12px;
    color:var(--ink-soft);
  }
  .mcp-page footer p{ margin:0 0 8px; }
  .mcp-page footer strong{ color:var(--ink); }

  @media (max-width:640px){
    .mcp-page .letterhead{ flex-direction:column; }
    .mcp-page .seal{ display:none; }
    .mcp-page .meta-row{ grid-template-columns:repeat(2,1fr); }
    .mcp-page .meta-cell:nth-child(2){ border-right:none; }
    .mcp-page .facts{ grid-template-columns:repeat(2,1fr); }
    .mcp-page .prompt-row{ grid-template-columns:1fr; gap:4px; }
    .mcp-page table.tools{ font-size:12.5px; }
  }

  @media (prefers-reduced-motion:reduce){
    .mcp-page .stamp{ transition:none; transform:rotate(-9deg); opacity:.92; }
  }
`;

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:wght@600;700&display=swap";

const JSON_CONFIG = `{
  "mcpServers": {
    "jntuh-results": {
      "url": "https://jntuhresults.dhethi.com/mcp"
    }
  }
}`;

const API_CONFIG = `mcp_servers: [
  {
    "type": "url",
    "url": "https://jntuhresults.dhethi.com/mcp",
    "name": "jntuh-results"
  }
]`;

type Tab = "claude" | "mcp";

const McpPage = () => {
  const [tab, setTab] = useState<Tab>("claude");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const stampRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const existing = document.querySelector(`link[href="${FONTS_HREF}"]`);
      if (!existing) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = FONTS_HREF;
        document.head.appendChild(link);
      }
    }
  }, []);

  useEffect(() => {
    const stamp = stampRef.current;
    if (!stamp) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      stamp.classList.add("in-view");
      return;
    }
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              stamp.classList.add("in-view");
              observer.disconnect();
            }
          });
        },
        { threshold: 0.4 },
      );
      observer.observe(stamp);
      return () => observer.disconnect();
    }
    stamp.classList.add("in-view");
  }, []);

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
    } catch {
      setCopiedKey("error-" + key);
      setTimeout(
        () => setCopiedKey((k) => (k === "error-" + key ? null : k)),
        1500,
      );
    }
  };

  const copyLabel = (key: string) =>
    copiedKey === key
      ? "Copied"
      : copiedKey === "error-" + key
        ? "Press Ctrl+C"
        : "Copy";

  return (
    <div className="mcp-page">
      <style dangerouslySetInnerHTML={{ __html: MCP_STYLES }} />

      <div className="page-wrap">
        <div className="sheet-frame">
          <div className="sheet">
            <span className="eyebrow">Unofficial connector · MCP beta</span>

            <div className="letterhead">
              <div>
                <h1>JNTUH Results, via MCP.</h1>
                <p className="subtitle">
                  Pull semester results, backlogs, CGPA, and credit progress
                  into a conversation — no portal refreshing required.
                </p>
              </div>
              <svg className="seal" viewBox="0 0 100 100" aria-hidden="true">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#8a6a2c"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#8a6a2c"
                  strokeWidth="1"
                />
                <text
                  x="50"
                  y="58"
                  textAnchor="middle"
                  fontFamily="IBM Plex Serif, serif"
                  fontWeight="700"
                  fontSize="26"
                  fill="#8a6a2c"
                >
                  JR
                </text>
              </svg>
            </div>

            <div className="meta-row">
              <div className="meta-cell">
                <span className="meta-label">Server</span>
                <span className="meta-value">jntuhresults.dhethi.com/mcp</span>
              </div>
              <div className="meta-cell">
                <span className="meta-label">Covers</span>
                <span className="meta-value">B.Tech &amp; B.Pharm</span>
              </div>
              <div className="meta-cell">
                <span className="meta-label">Issued</span>
                <span className="meta-value">21 Jun 2026</span>
              </div>
              <div className="meta-cell">
                <span className="meta-label">Status</span>
                <span className="meta-value">Active · Beta</span>
              </div>
            </div>

            <div className="facts">
              <div className="fact">
                <span className="fact-label">Works on</span>
                <span className="fact-value">
                  Claude web, desktop, iOS, Android, or any another mcp client
                </span>
              </div>

              <div className="fact">
                <span className="fact-label">Setup time</span>
                <span className="fact-value">Under 2 minutes</span>
              </div>
              <div className="fact">
                <span className="fact-label">Data needed</span>
                <span className="fact-value">
                  Roll number only — no password
                </span>
              </div>
            </div>

            <div className="tabs" role="tablist">
              <button
                className="tab-btn"
                role="tab"
                aria-selected={tab === "claude"}
                id="tab-claude"
                onClick={() => setTab("claude")}
              >
                Set up in Claude
              </button>
              <button
                className="tab-btn"
                role="tab"
                aria-selected={tab === "mcp"}
                id="tab-mcp"
                onClick={() => setTab("mcp")}
              >
                Set up in another MCP client
              </button>
            </div>

            <div className="tab-panels">
              <section
                id="panel-claude"
                role="tabpanel"
                aria-labelledby="tab-claude"
                hidden={tab !== "claude"}
              >
                <ol className="steps">
                  <li>
                    <div className="step-body">
                      <strong>Open Claude</strong>
                      <span>
                        Web, desktop app, or the mobile app — setup is the same
                        on all three.
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="step-body">
                      <strong>Go to Settings → Connectors</strong>
                    </div>
                  </li>
                  <li>
                    <div className="step-body">
                      <strong>
                        Select <em>Add custom connector</em>
                      </strong>
                      <span>
                        It&apos;s the + button next to the Connectors list.
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="step-body">
                      <strong>Name it and paste the server address</strong>
                      <span>
                        Name: <code>JNTUH Results</code> · URL:{" "}
                        <code>https://jntuhresults.dhethi.com/mcp</code>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="step-body">
                      <strong>Select Add, then Connect</strong>
                    </div>
                  </li>
                  <li>
                    <div className="step-body">
                      <strong>Turn it on for your chat</strong>
                      <span>
                        Open the tools menu (+) in the message box and enable it
                        before you ask.
                      </span>
                    </div>
                  </li>
                </ol>

                <div className="callout">
                  <span className="label">On the free plan</span>
                  This counts as your one custom connector. Pro, Max, Team, and
                  Enterprise plans can run it alongside others.
                </div>

                <div className="prompt-table">
                  <div className="prompt-heading">Try asking Claude</div>
                  <div className="prompt-row">
                    <span className="prompt-tag">Your result</span>
                    <span className="prompt-text">
                      Check my JNTUH result for 21XX1A0501
                    </span>
                  </div>
                  <div className="prompt-row">
                    <span className="prompt-tag">Backlogs</span>
                    <span className="prompt-text">
                      What backlogs do I still have?
                    </span>
                  </div>

                  <div className="prompt-row">
                    <span className="prompt-tag">Credits</span>
                    <span className="prompt-text">
                      How many credits do I still need to graduate?
                    </span>
                  </div>
                  <div className="prompt-row">
                    <span className="prompt-tag">Compare</span>
                    <span className="prompt-text">
                      Compare my result with 21XX1A0512
                    </span>
                  </div>
                  <div className="prompt-row">
                    <span className="prompt-tag">Section</span>
                    <span className="prompt-text">
                      Show results for my whole class section
                    </span>
                  </div>
                  <div className="prompt-row">
                    <span className="prompt-tag">Updates</span>
                    <span className="prompt-text">
                      Any new JNTUH result notifications?
                    </span>
                  </div>
                </div>
              </section>

              <section
                id="panel-mcp"
                role="tabpanel"
                aria-labelledby="tab-mcp"
                hidden={tab !== "mcp"}
              >
                <p style={{ marginTop: 0 }}>
                  This is a standard remote MCP server reachable over HTTPS. Any
                  MCP-compatible client — Claude Desktop, Cursor, Windsurf,
                  Cline, or a client you&apos;ve built yourself — can connect to
                  it the same way it connects to any other remote server.
                </p>

                <div className="code-block">
                  <span className="code-tag">JSON · client config</span>
                  <button
                    className="copy-btn"
                    onClick={() => copy("json", JSON_CONFIG)}
                  >
                    {copyLabel("json")}
                  </button>
                  <pre>{JSON_CONFIG}</pre>
                </div>
                <p className="copy-note">
                  Field names vary slightly between clients — some expect a{" "}
                  <code className="inline-code">transport</code> or{" "}
                  <code className="inline-code">type</code> field alongside the
                  URL. Check your client&apos;s MCP documentation for the exact
                  shape it wants.
                </p>

                <div className="code-block">
                  <span className="code-tag">JS · Anthropic API</span>
                  <button
                    className="copy-btn"
                    onClick={() => copy("api", API_CONFIG)}
                  >
                    {copyLabel("api")}
                  </button>
                  <pre>{API_CONFIG}</pre>
                </div>
                <p className="copy-note">
                  Building on the Anthropic API directly? Pass it as an{" "}
                  <code className="inline-code">mcp_servers</code> entry on your{" "}
                  <code className="inline-code">/v1/messages</code> call.
                </p>
              </section>
            </div>

            <div className="tools-section">
              <div className="section-eyebrow">What&apos;s inside</div>
              <h2>Seven tools, one server</h2>
              <table className="tools">
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>What it returns</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Result lookup</td>
                    <td>
                      Consolidated grade card — SGPA, CGPA, total credits, best
                      grade per subject across all attempts.
                    </td>
                  </tr>
                  <tr>
                    <td>Full history</td>
                    <td>
                      Every exam attempt per semester — regular, supplementary,
                      revaluation, and grace — without collapsing duplicates.
                    </td>
                  </tr>
                  <tr>
                    <td>Backlogs</td>
                    <td>
                      Just the subjects still showing F or Ab, grouped by
                      semester, with a total count.
                    </td>
                  </tr>
                  <tr>
                    <td>Credits check</td>
                    <td>
                      Credits earned vs. required for each academic year. B.Tech
                      only.
                    </td>
                  </tr>
                  <tr>
                    <td>Class results</td>
                    <td>
                      Results for an entire section at once, including the
                      paired day/evening cohort.
                    </td>
                  </tr>
                  <tr>
                    <td>Compare</td>
                    <td>
                      Two roll numbers side by side, semester by semester —
                      SGPA, credits, and backlog flags.
                    </td>
                  </tr>
                  <tr>
                    <td>Notifications</td>
                    <td>
                      Latest JNTUH result announcements, filterable by
                      regulation, degree, and year.
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="copy-note" style={{ marginTop: 14 }}>
                Roll numbers are the standard 10-character JNTUH format — e.g.{" "}
                <code className="inline-code">21XX1A0501</code>. A first lookup
                for a fresh roll number can take a few seconds longer while
                it&apos;s fetched.
              </p>
            </div>

            <div className="verify" id="verify">
              <h2>That&apos;s it.</h2>
              <p>
                Ask a question with a roll number and the connector handles the
                rest. If a result hasn&apos;t synced yet, it&apos;ll say so
                instead of guessing.
              </p>
              <div className="stamp-wrap">
                <svg
                  className="stamp"
                  ref={stampRef}
                  viewBox="0 0 220 220"
                  aria-hidden="true"
                >
                  <g className="stamp-rotate">
                    <path
                      id="circlePath"
                      d="M110,110 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
                      fill="none"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="95"
                      fill="none"
                      stroke="#a3362b"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="68"
                      fill="none"
                      stroke="#a3362b"
                      strokeWidth="1.5"
                    />
                    <text fontSize="9.5" letterSpacing="2.5">
                      <textPath href="#circlePath" startOffset="2%">
                        ★ JNTUH RESULTS · MCP ★ VERIFIED CONNECTION ★ JNTUH
                        RESULTS · MCP ★ VERIFIED CONNECTION
                      </textPath>
                    </text>
                    <text
                      x="110"
                      y="103"
                      textAnchor="middle"
                      className="stamp-main"
                    >
                      CONNECTED
                    </text>
                    <text
                      x="110"
                      y="124"
                      textAnchor="middle"
                      className="stamp-sub"
                    >
                      JUN 2026
                    </text>
                    <path
                      d="M82 113 L102 134 L142 92"
                      fill="none"
                      stroke="#a3362b"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </div>

            <footer>
              <p>
                <strong>Unofficial, third-party project.</strong> Not affiliated
                with JNTUH or any llm — built on top of publicly available JNTUH
                result data.
              </p>
              <p>
                For anything official — admissions, certificates, revaluation
                requests — use the university&apos;s own results portal. Only a
                roll number is ever requested here; this connector never asks
                for a password.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McpPage;
