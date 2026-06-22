import React, { useState } from 'react';

/* Asset paths are absolute — files live in public/assets/ and are served at /assets/ */

// `home` controls how in-page anchors resolve: on the marketing page they stay
// local (#section); on a standalone route like /privacy they jump back to the
// homepage (/#section) so the shared header/footer work from anywhere.
const MarketingHeader = ({ home = true }) => (
  <header className="m-header">
    <div className="m-container m-header-inner">
      <a className="m-wordmark" href={home ? '#' : '/'} aria-label="Curia">
        <img src="/assets/logo-curia-wordmark.svg" alt="Curia" width="105" height="24" />
      </a>
      <nav className="m-nav" aria-label="Primary">
        <a href={home ? '#capabilities' : '/#capabilities'}>Capabilities</a>
        <a href={home ? '#governance' : '/#governance'}>Governance</a>
        <a href={home ? '#get-started' : '/#get-started'}>Get started</a>
      </nav>
      <div className="m-header-actions">
        <a className="m-cta m-cta-ghost" href="https://docs.meetcuria.com">
          <svg className="m-cta-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Documentation
        </a>
        <a className="m-cta" href="https://github.com/josephfung/curia">
          <svg className="m-cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="m-hero">
    <div className="m-container">
      <div className="m-eyebrow">A Digital Office of the CEO</div>
      <h1 className="m-hero-title">
        Your Digital Office<br />
        <em>of the CEO.</em>
      </h1>
      <p className="m-hero-lede">
        Communications, scheduling, research, and knowledge work — handled at superhuman
        speed, with full governance and an audit trail. Open source — clone it, run it, extend it.
      </p>
      <div className="m-hero-actions">
        <a className="m-cta" href="https://github.com/josephfung/curia">Get started</a>
        <a className="m-cta m-cta-ghost" href="#capabilities">Learn more</a>
      </div>
    </div>
  </section>
);

const CapabilitiesSection = () => {
  const pillars = [
    {
      n: '01',
      title: 'Communications.',
      bullets: [
        'Email triage, drafting, replies, and sending',
        'Multi-channel: email, Signal, HTTP API, CLI',
        'A unified voice across every channel',
        'Contact management with relationship tracking',
      ],
    },
    {
      n: '02',
      title: 'Scheduling and calendar.',
      bullets: [
        'Calendar management — create, update, conflict detection',
        'Free-time finding across attendees',
        'Templates for requests, reschedules, cancellations',
        'Calendar-aware context for every interaction',
      ],
    },
    {
      n: '03',
      title: 'Research and knowledge work.',
      bullets: [
        'Web search and content synthesis',
        'Multi-session research with persistent memory',
        'A knowledge graph of people, organizations, projects, decisions',
        'Institutional memory that compounds — never walks out the door',
      ],
    },
    {
      n: '04',
      title: 'Extensibility.',
      bullets: [
        '90+ built-in skills',
        'Build your own agents and skills',
        'YAML-based agent definition — no deep coding required',
        'Model Context Protocol (MCP) integration',
      ],
    },
  ];
  return (
    <section className="m-section" id="capabilities">
      <div className="m-container">
        <div className="m-section-eyebrow">Capabilities</div>
        <h2 className="m-section-title">
          Four pillars of the digital knowledge work that buries a CEO.
        </h2>
        <div className="m-pillars m-pillars-4">
          {pillars.map((p) => (
            <div className="m-pillar" key={p.n}>
              <div className="m-pillar-num">{p.n}</div>
              <div className="m-pillar-rule"></div>
              <h3 className="m-pillar-title">{p.title}</h3>
              <ul className="m-pillar-list">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GovernanceSection = () => {
  const trust = [
    {
      n: '01',
      title: 'Open source.',
      body: "Full codebase on GitHub under a permissive licence — every line auditable. Your head of engineering can evaluate the architecture before you commit. A managed practice is offered on top by the maintainer, but the core platform stands on its own and is yours to run.",
      foot: "Don\u2019t take our word for it — read the code.",
    },
    {
      n: '02',
      title: 'Audit trail and accountability.',
      body: 'Append-only audit log — every action recorded, nothing deleted. Causal tracing from any outcome back through the full decision chain. Every event logged before it is delivered — write-ahead guarantee. Secrets never touch the LLM; only skills hold credentials, and every access is logged.',
    },
    {
      n: '03',
      title: 'Autonomy controls.',
      body: 'You set the band — from "draft only" to "act independently." Five behavioural levels with clear, predictable boundaries. Intent-drift detection pauses the office when it wanders from the original task. Error budgets cap LLM rounds, spend, and consecutive errors. No infinite loops.',
    },
  ];
  const bands = [
    { num: '00', name: 'Observe',    desc: 'Curia reads, summarises, surfaces. Never drafts, never sends.' },
    { num: '25', name: 'Suggest',    desc: 'Curia proposes drafts and replies. The principal sends every one.' },
    { num: '50', name: 'Stage',      desc: 'Curia stages routine correspondence; principal confirms in batches.' },
    { num: '85', name: 'Spot-check', desc: 'Curia sends within named lanes; the principal audits at end of day.' },
    { num: '95', name: 'Standing',   desc: 'Curia operates against pre-approved standing orders. Exceptions escalate.' },
  ];
  const [active, setActive] = useState(3);
  return (
    <section className="m-section m-section-dark" id="governance">
      <div className="m-container">
        <div className="m-section-eyebrow m-section-eyebrow-dark">Governance and trust</div>
        <h2 className="m-section-title">
          Why trust an office of agents with your inbox?
        </h2>
        <p className="m-section-lede">
          Three answers — built into the system, not bolted on.
        </p>
        <div className="m-trust">
          {trust.map((t) => (
            <div className="m-trust-card" key={t.n}>
              <div className="m-pillar-num">{t.n}</div>
              <div className="m-pillar-rule m-pillar-rule-dark"></div>
              <h3 className="m-pillar-title">{t.title}</h3>
              <p className="m-pillar-body">{t.body}</p>
              {t.foot && <div className="m-trust-foot">{t.foot}</div>}
            </div>
          ))}
        </div>

        <div className="m-ladder-wrap">
          <div className="m-section-eyebrow m-section-eyebrow-dark">The autonomy ladder</div>
          <div className="m-ladder">
            <div>
              <p className="m-pillar-body" style={{ marginBottom: 18 }}>
                Yes, there is a literal slider in settings — and that is the point.
                Autonomy is a named, explicit contract between the principal and the
                office: chosen on purpose, recorded in the audit trail, and revisited
                on a cadence. Never a default you forgot you set.
              </p>
              <div className="m-ladder-active-band">
                Currently selected · {bands[active].name} ({bands[active].num})
              </div>
            </div>
            <div className="m-ladder-rail">
              {bands.map((b, i) => (
                <div
                  key={b.num}
                  className={`m-ladder-row${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="m-ladder-num">{b.num}</span>
                  <span className="m-ladder-name">{b.name}</span>
                  <span className="m-ladder-desc">{b.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="m-evidence">
          <div>
            <blockquote className="m-pullquote">
              This is what was decided, this is who decided it, this is the trail you can hand to your auditor.
            </blockquote>
            <div className="m-pullquote-attr">— Curia operating principle</div>
          </div>
          <div className="m-audit" aria-label="Sample audit trail">
            <div className="m-audit-row"><span className="ts">14:02:18Z</span><span className="ev">memory.recall · "Q3 board agenda"</span></div>
            <div className="m-audit-row"><span className="ts">14:02:19Z</span><span className="ev">graph.read · 4 nodes · sensitivity ≤ confidential</span></div>
            <div className="m-audit-row"><span className="ts">14:02:24Z</span><span className="ev">draft.compose · 132 tokens · model=staff-v3.2</span></div>
            <div className="m-audit-row"><span className="ts">14:02:24Z</span><span className="ev">policy.gate · band=Spot-check · status=hold</span></div>
            <div className="m-audit-row"><span className="ts">14:07:51Z</span><span className="ev">principal.confirm · sender=jf · channel=email</span></div>
            <div className="m-audit-row"><span className="ts">14:07:52Z</span><span className="ev">action.send · outcome=ok · receipt=msg-7c4a-9e1b</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GetStartedSection = () => (
  <section className="m-section" id="get-started">
    <div className="m-container">
      <div className="m-section-eyebrow">Get started</div>
      <h2 className="m-section-title">Run it yourself.</h2>
      <div className="m-getstarted">
        <div>
          <p className="m-pillar-body" style={{ fontSize: 17, marginBottom: 28, maxWidth: 560 }}>
            Curia is open source. Clone the repository, follow the quickstart, and run
            your own Digital Office of the CEO. Extend it with your own agents and
            skills. Inspect every line before you commit.
          </p>
          <div className="m-hero-actions">
            <a className="m-cta" href="https://github.com/josephfung/curia">
              <span className="m-gh-mark" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </span>
              View on GitHub
            </a>
            <a className="m-cta m-cta-ghost" href="https://github.com/josephfung/curia#quickstart">Read the quickstart</a>
          </div>
          <div className="m-getstarted-note">
            MIT-licensed · Self-host on your own infrastructure · Browser-based setup
          </div>
        </div>
        <div className="m-prereqs">
          <div className="m-prereqs-title">Prerequisites</div>
          <ul className="m-prereqs-list">
            <li><span className="m-mono">node</span><span>≥ 22</span></li>
            <li><span className="m-mono">docker</span><span>Postgres + pgvector</span></li>
            <li><span className="m-mono">pnpm</span><span>package manager</span></li>
            <li><span className="m-mono">api key</span><span>Anthropic</span></li>
          </ul>
          <div className="m-prereqs-cmd">
            <span className="ts">$</span>
            <span>git clone github.com/josephfung/curia</span>
          </div>
          <div className="m-prereqs-cmd">
            <span className="ts">$</span>
            <span>cd curia &amp;&amp; pnpm run setup</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* Hidden for now — not accepting managed-practice inquiries */
const ManagedSection = () => (
  <section className="m-section m-section-managed" id="managed" style={{ display: 'none' }}>
    <div className="m-container">
      <div className="m-eyebrow m-section-eyebrow-managed">Managed by Curia</div>
      <h2 className="m-section-title m-section-title-managed">
        A managed practice for CEOs who want more than the core platform.
      </h2>
      <div className="m-managed-body">
        <p className="m-managed-lede">
          Battle-tested agents built from real executive experience. Bespoke
          development driven by your needs. Personal accountability for every
          instance. The managed practice exists for the principals who would
          rather have a thinking partner than a deployment.
        </p>
        <div className="m-managed-grid">
          <div className="m-managed-pillar">
            <div className="m-managed-pillar-title">Battle-tested agents</div>
            <p className="m-pillar-body">
              Writing-scout, essay-writer, calendar-curator, industry-intel-researcher.
              Born from one CEO's working life — refined as new clients ask for more.
            </p>
          </div>
          <div className="m-managed-pillar">
            <div className="m-managed-pillar-title">Bespoke skills, on request</div>
            <p className="m-pillar-body">
              Each managed engagement adds to the system. Your feature requests
              become tomorrow's capabilities. The roster compounds for everyone in
              the practice.
            </p>
          </div>
          <div className="m-managed-pillar">
            <div className="m-managed-pillar-title">Personally operated</div>
            <p className="m-pillar-body">
              A maximum of ten managed clients. Each instance is operated, tuned,
              and answered for personally. This is permanent positioning, not a
              phase before scale.
            </p>
          </div>
        </div>

        <div className="m-bio">
          <div className="m-bio-rule"></div>
          <div className="m-bio-name">Joseph Fung</div>
          <p className="m-bio-body">
            Seasoned tech CEO and founder. Built Curia because it is the system he
            always wished he had — and he is personally accountable for every
            instance in the managed practice.
          </p>
          <a className="m-bio-link" href="https://www.linkedin.com/in/josephfung/">LinkedIn →</a>
        </div>

        <div className="m-managed-cta">
          <a className="m-cta" href="https://calendly.com/josephfung">Start a conversation</a>
          <span className="m-managed-cta-note">By invitation. No pricing page. No tiers.</span>
        </div>
      </div>
    </div>
  </section>
);

const FaqSection = () => {
  const faqs = [
    { q: 'Who is Curia for?',                        a: 'Experienced CEOs of 50–200-person knowledge-work companies — tech, financial services, consulting, recruiting — who know what a great EA looks like and are tired of the hire-train-lose cycle. The buyer is the CEO, not a procurement office.' },
    { q: 'Is Curia really open source?',             a: 'Yes. The full codebase lives on GitHub under a permissive (MIT) licence — clone it, audit it, run it, extend it. Many technical founders self-host and add their own agents and skills.' },
    // Managed-practice FAQs hidden while the managed section is dark (see ManagedSection). Restore alongside it.
    // { q: 'How does the managed practice differ from the OSS core?', a: 'The OSS core is a fully functional Digital Office of the CEO — clone, deploy, extend. The managed practice adds battle-tested agents and skills born from real CEO experience, bespoke development driven by client needs, and personal operation of every instance. Maximum ten managed clients. Permanent positioning, not a phase.' },
    { q: 'Can I add my own agents and skills?',      a: 'Yes — that is the point. Curia ships with 90+ built-in skills, but agents are defined in plain YAML and skills are self-contained handlers with a manifest, so you can add your own without forking the core. It also speaks the Model Context Protocol (MCP), so external tools wire straight in.' },
    { q: 'Where does Curia run?',                    a: "Anywhere you can run Docker and Node — your laptop, a VPS, your own VPC, or on-premises. It is a single-tenant, self-hosted deployment: you hold the keys, and your data never leaves your infrastructure." },
    { q: 'How does the audit trail work?',           a: 'Every action — read, draft, send, decision — is recorded with timestamp, actor, model, prompt, output, and policy gate. Append-only Postgres with causal tracing across every event. Exports are signed. Secrets never touch the LLM; only skills hold credentials, and every access is logged.' },
    { q: 'Will the API surface change?',             a: 'After v1.0.0, no. v1.0.0 means the API surface is stable: agent contracts, skill manifests, channel adapters, the knowledge-graph query interface, the autonomy model, and configuration schemas all freeze. Self-hosters can rely on interfaces that will not break between releases.' },
    { q: 'What does it cost to run?',                a: 'The software is free and MIT-licensed. Your only costs are the infrastructure you run it on and your own LLM API usage — there is no per-seat fee and nothing to buy.' },
    // { q: 'How much does the managed practice cost?', a: 'There is no pricing page. Engagements are conversations, not transactions. The frame is "Curia plus junior support versus a $10k-per-month EA" — augmentation, not replacement. Start a conversation if you want a number.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="m-section" id="faq">
      <div className="m-container">
        <div className="m-section-eyebrow">Questions</div>
        <h2 className="m-section-title">A few that always come up.</h2>
        <div className="m-faq">
          {faqs.map((f, i) => (
            <div key={i} className="m-faq-row">
              <div className="m-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="m-faq-q-text">{f.q}</span>
                <span className="m-faq-q-toggle">{open === i ? '\u2212' : '+'}</span>
              </div>
              {open === i && <div className="m-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MarketingFooter = ({ home = true }) => (
  <footer className="m-footer">
    <div className="m-container">
      <div className="m-footer-grid">
        <div>
          <a className="m-wordmark" href={home ? '#' : '/'} aria-label="Curia">
            <img src="/assets/logo-curia-wordmark.svg" alt="Curia" width="96" height="22" />
          </a>
          <p className="m-pillar-body" style={{ marginTop: 18, maxWidth: 320 }}>
            A Digital Office of the CEO. Open source on GitHub.
          </p>
          <div className="m-footer-licence">
            <span className="m-licence-badge">MIT</span>
            <span>Open-source</span>
          </div>
        </div>
        <div className="m-footer-col">
          <div className="m-footer-col-title">Product</div>
          <a href={home ? '#capabilities' : '/#capabilities'}>Capabilities</a>
          <a href={home ? '#governance' : '/#governance'}>Governance</a>
          <a href={home ? '#get-started' : '/#get-started'}>Get started</a>
        </div>
        <div className="m-footer-col">
          <div className="m-footer-col-title">Office</div>
          {/* <a href="#managed">Managed practice</a> */}
          <a href="https://calendly.com/josephfung">Start a conversation</a>
          <a href={home ? '#faq' : '/#faq'}>FAQ</a>
        </div>
        <div className="m-footer-col">
          <div className="m-footer-col-title">Open source</div>
          <a href="https://github.com/josephfung/curia">GitHub</a>
          <a href="https://github.com/josephfung/curia#quickstart">Quickstart</a>
          <a href="https://docs.meetcuria.com">Docs</a>
        </div>
      </div>
      <div className="m-footer-finepct">
        <span>© {new Date().getFullYear()} <a href="https://linkedin.com/in/josephfung" className="m-footer-author-link">Joseph Fung</a></span>
        {/* "License" → the repo's MIT LICENSE (the real legal instrument for OSS);
            "Security" → the repo's SECURITY.md; "Privacy" → the in-app /privacy page. */}
        <span className="m-footer-legal">
          <a href="https://github.com/josephfung/curia/blob/main/LICENSE">License</a>
          {' · '}
          <a href="/privacy">Privacy</a>
          {' · '}
          <a href="https://github.com/josephfung/curia/blob/main/SECURITY.md">Security</a>
        </span>
      </div>
    </div>
  </footer>
);

const MarketingPage = () => (
  <>
    <MarketingHeader />
    <Hero />
    <CapabilitiesSection />
    <GovernanceSection />
    <GetStartedSection />
    <ManagedSection />
    <FaqSection />
    <MarketingFooter />
  </>
);

const PrivacyPage = () => (
  <>
    <MarketingHeader home={false} />
    <main className="m-section">
      <div className="m-container m-legal">
        <div className="m-section-eyebrow">Legal</div>
        <h1 className="m-section-title">Privacy</h1>
        <p className="m-legal-updated">Last updated June 22, 2026</p>

        <p className="m-legal-lede">
          Curia is open-source software you run on your own infrastructure. This page
          covers two things: how the website at meetcuria.com handles your data, and
          what that means for the Curia software itself.
        </p>

        <h2 className="m-legal-h">The website</h2>
        <p>This site is a static marketing page. It does not track you.</p>
        <ul className="m-legal-list">
          <li><strong>No analytics.</strong> We don&rsquo;t use Google Analytics, Plausible, or
            any other tracking tool. We don&rsquo;t know who you are or that you visited.</li>
          <li><strong>No cookies.</strong> The site sets none.</li>
          <li><strong>No third-party trackers or ad tech.</strong> Fonts are self-hosted, so your
            browser doesn&rsquo;t call out to Google or any other CDN when the page loads.</li>
        </ul>
        <p>
          The site is hosted on Cloudflare Pages. Like any web host, Cloudflare processes
          standard request data (such as your IP address) to deliver the site and protect it
          from abuse, governed by{' '}
          <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare&rsquo;s privacy policy</a>.
          We don&rsquo;t receive or store this ourselves.
        </p>

        <h2 className="m-legal-h">When you contact us</h2>
        <p>The only personal information we ever hold is what you choose to send us:</p>
        <ul className="m-legal-list">
          <li><strong>Email.</strong> If you email us, we keep your message and address to reply.
            Nothing more.</li>
          <li><strong>Booking a call.</strong> The &ldquo;Start a conversation&rdquo; link uses{' '}
            <a href="https://calendly.com/">Calendly</a>, a third party. If you book, the name,
            email, and time you provide go to Calendly under{' '}
            <a href="https://calendly.com/privacy">their privacy policy</a>. We see only the
            details needed to meet with you.</li>
        </ul>
        <p>
          We don&rsquo;t sell your information, share it with advertisers, or use it for anything
          beyond responding to you.
        </p>

        <h2 className="m-legal-h">The Curia software</h2>
        <p>
          This is the important part. Curia is self-hosted: you clone it, run it on your own
          machines, and connect your own accounts and API keys.{' '}
          <strong>Your email, calendar, contacts, and everything Curia processes stay on your
          infrastructure.</strong> We are the maintainer of the software, not the operator of
          your instance. We never receive, see, or store any data Curia handles for you. How
          that data is treated is governed by your own setup and the providers you connect
          (your LLM provider, email host, and so on), not by us.
        </p>

        <h2 className="m-legal-h">Questions</h2>
        <p>
          Email <a href="mailto:security@meetcuria.com">security@meetcuria.com</a> with any
          privacy questions.
        </p>
        <p>
          We may update this page as the site changes. The date at the top always reflects the
          latest version.
        </p>
      </div>
    </main>
    <MarketingFooter home={false} />
  </>
);

// Tiny path-based router — no router dependency for a two-page static site.
// Trailing slashes are normalized so /privacy and /privacy/ both match.
// Cloudflare Pages serves index.html for unmatched paths via its default SPA
// fallback (active because there's no top-level 404.html), then this runs. We
// deliberately do NOT ship a _redirects file: a `/privacy /index.html 200`
// rewrite there gets canonicalized into a 308 redirect to /, which sent the
// real /privacy URL to the homepage instead of the privacy page.
const App = () => {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path === '/privacy' ? <PrivacyPage /> : <MarketingPage />;
};

export default App;
