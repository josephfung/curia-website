import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';
import DataFlowDiagram from '../components/DataFlowDiagram.jsx';
import Faq from '../components/Faq.jsx';

// Written for a CEO weighing Curia against platform agents, not for the IT
// reviewer: the philosophy of hosting your own agent, not configuration detail.
// The security FAQ is the seed for a fuller technical paper later.

const SECURITY_POLICY = 'https://github.com/josephfung/curia/blob/main/SECURITY.md';
const SCORECARD = 'https://securityscorecards.dev/viewer/?uri=github.com/josephfung/curia';

const PRINCIPLES = [
  {
    title: 'It works only for you.',
    body: 'No ads, no upsell, no one else’s business model. Would you hand Meta your finances?',
  },
  {
    title: 'No honeypot.',
    body: 'Platforms pool millions of inboxes into one target. Yours holds one office’s data.',
  },
  {
    title: 'The AI never sees your secrets.',
    body: 'Keys go from the vault straight to the tool, never to the model. By design, not by policy.',
  },
  {
    title: 'Your data, your custody.',
    body: 'Legal requests come to you, and deleted means deleted.',
  },
  {
    title: 'Yours for good.',
    body: 'No account bans, price hikes, or shutdowns. Move hosts whenever you like.',
  },
  {
    title: 'Built to pass your security review.',
    body: (
      <>
        Host it wherever your governance requires. Open code, continuously scanned,{' '}
        <a href={SCORECARD}>publicly scored</a>.
      </>
    ),
  },
  {
    title: 'See everything it did, and why.',
    body: 'Every action is logged with its reasoning, and flows to your monitoring via OpenTelemetry.',
  },
  {
    title: 'Your model, your roadmap.',
    body: 'Pick any model, even one on your own hardware. Extend Curia for whatever you need.',
  },
];

const FAQS = [
  {
    q: 'Is my data used to train AI models?',
    a: 'Not by Curia: there is no Curia service collecting it. Model calls go through the API of the provider you choose, under that provider’s API terms, and most major providers do not train on API traffic by default. For the strictest setup, choose a provider with zero data retention, or run a local model.',
  },
  {
    q: 'What exactly leaves my server?',
    a: 'Two things. Requests to the AI model you choose, carrying the conversation and context a task needs, but never your secrets. And the actions you have authorised Curia to take in your tools, like sending an email or updating a document. Nothing goes to Curia the company.',
  },
  {
    q: 'Can I run Curia entirely on local models?',
    a: 'Yes. Operators already run Curia on local models. Then nothing leaves your infrastructure except the actions you ask it to take.',
  },
  {
    q: 'Can anyone at Curia see my data?',
    a: 'No. Curia is software you host, not a service we run. There is no Curia account, no back door, and no copy on our side. If you opt for a managed instance, its operator’s access is set out in that agreement.',
  },
  {
    q: 'What happens if the Curia project stops?',
    a: 'Your office keeps running. The code is MIT-licensed and already on your server, so you can keep using, changing, and hosting it indefinitely.',
  },
  {
    q: 'How does Curia handle emails that try to trick it?',
    a: 'Curia checks who sent each message before acting on it. Instructions from unverified senders are treated as information, not commands, and work that drifts from a task’s original intent is paused for you. We red-team Curia against these attacks, and prompt injection is in scope for security reports.',
  },
  {
    q: 'Do I need to be technical to run Curia safely?',
    a: (
      <>
        Someone needs to keep the server updated, as with any software you host. Setup is
        browser-based, and if you would rather not run it yourself, a managed instance is
        available. <a href="https://calendly.com/jbfung/curia">Get in touch</a>.
      </>
    ),
  },
];

const GovernancePage = () => (
  <>
    <MarketingHeader home={false} />
    <main className="m-section">
      <div className="m-container">
        <h1 className="m-section-title" style={{ marginBottom: 24 }}>Private by design. Yours to keep.</h1>
        <p className="m-hero-lede" style={{ marginBottom: 64 }}>
          Platform agents ask you to trust them. Curia lets you check.
        </p>
        <div className="m-pillars m-pillars-4 m-principles">
          {PRINCIPLES.map((p) => (
            <div className="m-pillar" key={p.title}>
              <div className="m-pillar-rule"></div>
              <h2 className="m-pillar-title">{p.title}</h2>
              <p className="m-pillar-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>

    <section className="m-section" id="data-flow">
      <div className="m-container">
        <h2 className="m-section-title">Where your data goes</h2>
        <p className="m-section-lede">
          Everything lives on your server. Only the conversation reaches the AI model you
          choose, and with a local model, not even that.
        </p>
        <DataFlowDiagram />
      </div>
    </section>

    <section className="m-section" id="security-faq">
      <div className="m-container">
        <h2 className="m-section-title">Security and privacy questions</h2>
        <Faq items={FAQS} />

        <aside className="m-vuln" aria-labelledby="vuln-h">
          <h2 className="m-vuln-h" id="vuln-h">Reporting a vulnerability</h2>
          <p className="m-pillar-body">
            Found a security issue? Please don’t open a public GitHub issue. Email{' '}
            <a href="mailto:security@meetcuria.com">security@meetcuria.com</a>, and see the{' '}
            <a href={SECURITY_POLICY}>security policy</a> for scope and how we handle disclosure.
          </p>
        </aside>
      </div>
    </section>

    <MarketingFooter home={false} />
  </>
);

export default GovernancePage;
