import React, { useState } from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';
import CapabilityPreviewCard from '../components/CapabilityPreviewCard.jsx';
import OfficeDeskCard from '../components/OfficeDeskCard.jsx';

/* Asset paths are absolute — files live in public/assets/ and are served at /assets/ */

const Hero = () => (
  <section className="m-hero">
    <div className="m-container">
      <div className="m-eyebrow">A persistent digital office for CEOs</div>
      <h1 className="m-hero-title">
        One point of contact.<br />
        <em>An executive office behind it.</em>
      </h1>
      <p className="m-hero-lede">
        Curia runs specialist desks for your inbox, calendar, meetings,
        relationships, research, and ongoing work. Each desk has a standing
        mandate, private memory, and clear rules for when to act and when to
        bring you in.
      </p>
      <div className="m-hero-actions">
        <a className="m-cta" href="/capabilities">Explore Curia&rsquo;s capabilities</a>
        <a className="m-cta m-cta-ghost" href="https://github.com/josephfung/curia">View on GitHub</a>
      </div>
    </div>
  </section>
);

const CapabilitiesSection = () => {
  const cards = [
    {
      title: 'Check your inbox once a day',
      body: 'Curia checks your inbox every 15 minutes, classifies unread messages, creates reply drafts in Gmail, tracks unresolved dependencies, and routes urgent items to Signal.',
      outcome: 'Process your inbox deliberately without trusting luck to surface the important message.',
    },
    {
      title: 'Stop negotiating meeting times',
      body: 'Curia checks calendars, working hours, time zones, contact identities, and scheduling preferences before finding viable slots, creating the event, and preparing the necessary messages.',
      outcome: 'Stop spending five messages arranging a 20-minute call.',
    },
    {
      title: 'Never lose a meeting follow-up',
      body: 'Curia notices when a designated external meeting ends, asks for your takeaways, and turns your response into drafts, tasks, research, remembered facts, and future calendar actions.',
      outcome: 'A useful conversation no longer depends on you remembering to update five systems later.',
    },
    {
      title: 'Walk into important meetings prepared',
      body: 'Curia combines your private interaction history and relationship memory with current research on the people, companies, and subjects involved.',
      outcome: 'Arrive with both current research and your own relationship context.',
    },
  ];
  return (
    <section className="m-section" id="capabilities">
      <div className="m-container">
        <div className="m-section-eyebrow">Capabilities</div>
        <h2 className="m-section-title">Responsibilities Curia can take off your plate.</h2>
        <div className="m-pillars m-pillars-4">
          {cards.map((c) => <CapabilityPreviewCard key={c.title} {...c} />)}
        </div>
        <p className="m-cap-bridge">
          That is only the core office. Curia can also track open loops, maintain
          private relationship memory, run standing orders, and carry multi-step
          projects forward. <a href="/capabilities">Explore all capabilities &rarr;</a>
        </p>
      </div>
    </section>
  );
};

const OperatingModelSection = () => {
  const items = [
    { title: 'One Coordinator', body: 'You communicate with one Curia identity. It decides what it can handle directly and when to involve a specialist.' },
    { title: 'Standing mandates', body: 'Each specialist knows what it watches, what it owns, which tools it can use, and where its authority ends.' },
    { title: 'Shared context', body: 'Tasks, relationships, preferences, and prior work persist across conversations and system restarts.' },
    { title: 'Governed execution', body: 'Permissions, autonomy levels, error limits, and audit records constrain what the office can do.' },
  ];
  return (
    <section className="m-section" id="how-it-works">
      <div className="m-container">
        <div className="m-section-eyebrow">How Curia works</div>
        <h2 className="m-section-title">One office. Specialist desks behind it.</h2>
        <div className="m-pillars m-pillars-4">
          {items.map((it) => (
            <div className="m-pillar" key={it.title}>
              <div className="m-pillar-rule"></div>
              <h3 className="m-pillar-title">{it.title}</h3>
              <p className="m-pillar-body">{it.body}</p>
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
      foot: "Don’t take our word for it — read the code.",
    },
    {
      n: '02',
      title: 'Audit trail and accountability.',
      body: 'Append-only audit log. Every action recorded, nothing deleted. Causal tracing from any outcome back through the full decision chain. Every event is logged before it is delivered (a write-ahead guarantee). Each entry carries the timestamp, the actor, the model, and SHA-256 fingerprints of the prompt and response. Secrets never touch the LLM; only skills hold credentials, and every access is logged by name, never by value.',
    },
    {
      n: '03',
      title: 'Autonomy controls.',
      body: 'You set the band, from "draft only" to "act independently." Five behavioural levels with clear, predictable boundaries. Intent-drift detection pauses the office when a task wanders from its original intent. Error budgets cap the number of LLM turns and consecutive errors per task. No infinite loops.',
    },
  ];
  const bands = [
    { num: '<60', name: 'Restricted',        desc: 'Options and analysis only. No independent action; every external effect needs explicit instruction.' },
    { num: '60',  name: 'Draft Only',        desc: 'Prepares drafts, plans, and analysis. Never sends or acts without a direct go-ahead.' },
    { num: '70',  name: 'Approval Required', desc: 'Routine reads proceed; any consequential action is planned and brought for confirmation first.' },
    { num: '80',  name: 'Spot-check',        desc: 'Acts on routine work; notes consequential actions in its reply so you keep visibility.' },
    { num: '90',  name: 'Full',              desc: 'Acts independently; flags only genuinely novel, irreversible, or high-stakes actions.' },
  ];
  const [active, setActive] = useState(3); // Spot-check
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
            <div className="m-audit-row"><span className="ts">09:14:02</span><span className="ev">inbound.message · channel=email · sender=unverified</span></div>
            <div className="m-audit-row"><span className="ts">09:14:02</span><span className="ev">contact.resolved · status=verified</span></div>
            <div className="m-audit-row"><span className="ts">09:14:05</span><span className="ev">llm.call · agent=ceo-inbox · classify · model=fast</span></div>
            <div className="m-audit-row"><span className="ts">09:14:06</span><span className="ev">agent.task · coordinator → ceo-inbox</span></div>
            <div className="m-audit-row"><span className="ts">09:14:07</span><span className="ev">human.decision · gate=urgency · channel=signal</span></div>
            <div className="m-audit-row"><span className="ts">09:14:08</span><span className="ev">outbound.delivered · channel=signal</span></div>
            <div className="m-audit-row"><span className="ts">09:21:33</span><span className="ev">inbound.message · ceo reply</span></div>
            <div className="m-audit-row"><span className="ts">09:21:34</span><span className="ev">task.created · owner=curia · source=ceo-inbox</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DeployedDesksSection = () => {
  const desks = [
    { title: 'Editorial research and writing pitches', body: 'Monitors subjects relevant to the CEO\'s writing, researches new developments, compares them with previous work, and presents pitches with a timely angle, central argument, supporting evidence, and recommended format.' },
    { title: 'Expense and receipt organization', body: 'Watches for receipts, extracts vendor, date, amount, and category, identifies duplicates or missing information, and prepares ambiguous items for review.' },
    { title: 'Social monitoring and engagement triage', body: 'Watches a social account for replies, mentions, and new activity, filters low-value noise, surfaces the conversations where the CEO\'s attention could matter, and can unfollow accounts that drift off-topic (always reported back, so it is reversible).' },
  ];
  return (
    <section className="m-section" id="deployed-desks">
      <div className="m-container">
        <div className="m-section-eyebrow">Running today</div>
        <h2 className="m-section-title">Already running in the founder&rsquo;s Curia office.</h2>
        <p className="m-section-lede">
          The real value is that you build the desks your own work needs. These three
          are not stock features. They are desks one CEO added to his own Curia office,
          shown here to make the point concrete: the extensibility is real, and yours
          would look different.
        </p>
        <div className="m-desk-grid">
          {desks.map((d) => <OfficeDeskCard key={d.title} {...d} />)}
        </div>
        <p className="m-desk-note">
          Each desk uses the same Curia framework: a defined mandate, selected tools,
          private memory, scheduled work, and explicit limits on when it can act.{' '}
          <a href="/capabilities#deployed-desks" style={{ color: 'var(--m-teal)', fontWeight: 600 }}>See how the office works &rarr;</a>
        </p>
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
                <span className="m-faq-q-toggle">{open === i ? '−' : '+'}</span>
              </div>
              {open === i && <div className="m-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Home page composition — assembles all homepage sections with the shared header/footer.
const HomePage = () => (
  <>
    <MarketingHeader />
    <Hero />
    <CapabilitiesSection />
    <OperatingModelSection />
    <DeployedDesksSection />
    <GovernanceSection />
    <GetStartedSection />
    <ManagedSection />
    <FaqSection />
    <MarketingFooter />
  </>
);

export default HomePage;
