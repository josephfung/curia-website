import React, { useState } from 'react';

/* Asset paths are absolute — files live in public/assets/ and are served at /assets/ */

const MarketingHeader = () => (
  <header className="m-header">
    <div className="m-container m-header-inner">
      <a className="m-wordmark" href="#" aria-label="Curia">
        <img src="/assets/logo-curia-wordmark.svg" alt="Curia" width="105" height="24" />
      </a>
      <nav className="m-nav" aria-label="Primary">
        <a href="#capabilities">Capabilities</a>
        <a href="#governance">Governance</a>
        <a href="#get-started">Get started</a>
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
        '65+ built-in skills',
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
            MIT-licensed · Self-host on your own infrastructure · CLI-based onboarding
          </div>
        </div>
        <div className="m-prereqs">
          <div className="m-prereqs-title">Prerequisites</div>
          <ul className="m-prereqs-list">
            <li><span className="m-mono">node</span><span>≥ 20.x</span></li>
            <li><span className="m-mono">postgresql</span><span>≥ 15</span></li>
            <li><span className="m-mono">api keys</span><span>LLM provider of choice</span></li>
            <li><span className="m-mono">channels</span><span>email, Signal, HTTP, CLI</span></li>
          </ul>
          <div className="m-prereqs-cmd">
            <span className="ts">$</span>
            <span>git clone github.com/josephfung/curia</span>
          </div>
          <div className="m-prereqs-cmd">
            <span className="ts">$</span>
            <span>cd curia &amp;&amp; ./bin/curia init</span>
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
    { q: 'Is Curia really open source?',             a: 'Yes. The full codebase lives on GitHub under a permissive licence — clone it, audit it, run it, extend it. The maintainer also offers a managed practice on top of the open core, but the platform itself stands alone. Many technical founders self-host and add their own agents.' },
    { q: 'How does the managed practice differ from the OSS core?', a: 'The OSS core is a fully functional Digital Office of the CEO — clone, deploy, extend. The managed practice adds battle-tested agents and skills born from real CEO experience, bespoke development driven by client needs, and personal operation of every instance. Maximum ten managed clients. Permanent positioning, not a phase.' },
    { q: 'Where does Curia run?',                    a: "In an environment of your choosing — your VPC, our managed enclave, or on-premises. The default is a single-tenant deployment with hardware-backed key isolation. Self-hosters run wherever they like; the managed practice operates on Joseph\u2019s infrastructure." },
    { q: 'How does the audit trail work?',           a: 'Every action — read, draft, send, decision — is recorded with timestamp, actor, model, prompt, output, and policy gate. Append-only Postgres with causal tracing across every event. Exports are signed. Secrets never touch the LLM; only skills hold credentials, and every access is logged.' },
    { q: 'Will the API surface change?',             a: 'After v1.0.0, no. v1.0.0 means the API surface is stable: agent contracts, skill manifests, channel adapters, the knowledge-graph query interface, the autonomy model, and configuration schemas all freeze. Self-hosters can rely on interfaces that will not break between releases.' },
    { q: 'How much does the managed practice cost?', a: 'There is no pricing page. Engagements are conversations, not transactions. The frame is "Curia plus junior support versus a $10k-per-month EA" — augmentation, not replacement. Start a conversation if you want a number.' },
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

const MarketingFooter = () => (
  <footer className="m-footer">
    <div className="m-container">
      <div className="m-footer-grid">
        <div>
          <a className="m-wordmark" href="#" aria-label="Curia">
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
          <a href="#capabilities">Capabilities</a>
          <a href="#governance">Governance</a>
          <a href="#get-started">Get started</a>
        </div>
        <div className="m-footer-col">
          <div className="m-footer-col-title">Office</div>
          {/* <a href="#managed">Managed practice</a> */}
          <a href="https://calendly.com/josephfung">Start a conversation</a>
          <a href="#faq">FAQ</a>
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
        <span>Terms · Privacy · Audit policy</span>
      </div>
    </div>
  </footer>
);

const App = () => (
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

export default App;
