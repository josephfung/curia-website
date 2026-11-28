import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';
import Faq from '../components/Faq.jsx';
import DelegationSection from '../components/DelegationSection.jsx';
import TrustSection from '../components/TrustSection.jsx';
import IntegrationsSection from '../components/IntegrationsSection.jsx';
import HeroStories from '../hero-stories/HeroStories.jsx';

/* Asset paths are absolute — files live in public/assets/ and are served at /assets/ */

const Hero = () => (
  <section className="m-hero">
    <div className="m-container m-hero-layout">
      <div className="m-hero-copy">
        <h1 className="m-hero-title">The luxury of knowing it’s handled</h1>
        <p className="m-hero-lede">
          Curia learns your priorities, handles your inbox and calendar, and keeps
          delegated projects moving. You get room to do your best work.
        </p>
      </div>
      <HeroStories />
    </div>
  </section>
);

const GetStartedSection = () => (
  <section className="m-section" id="get-started">
    <div className="m-container">
      <h2 className="m-section-title">Run your own Curia office.</h2>
      <div className="m-getstarted">
        <div>
          <p className="m-pillar-body" style={{ fontSize: 17, marginBottom: 20, maxWidth: 560 }}>
            Open source and single-tenant. Review the code, deploy it on infrastructure
            you control, and add your own desks.
          </p>
          <div className="m-phases">
            <div className="m-phases-title">Getting started has two phases</div>
            <div className="m-phase">
              <div className="m-phase-name">Setup</div>
              <p>
                Whoever runs Curia. About 5 minutes to install, then an hour or two to connect:
                Curia&rsquo;s own email, a way to message you, a voice, and access to Google Docs.
              </p>
            </div>
            <div className="m-phase">
              <div className="m-phase-name">Onboarding</div>
              <p>
                You, the executive. Curia invites you to a first conversation, by voice or chat,
                and takes it from there.
              </p>
            </div>
          </div>
          <div className="m-hero-actions">
            <a className="m-cta" href="https://github.com/josephfung/curia">
              <span className="m-gh-mark" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </span>
              View on GitHub
            </a>
            <a className="m-cta m-cta-ghost" href="https://docs.meetcuria.com/get-started/what-to-expect">What to expect</a>
          </div>
          <div className="m-getstarted-note">
            MIT-licensed · Self-host on your own infrastructure · Browser-based setup
          </div>
        </div>
        <div className="m-prereqs">
          <div className="m-prereqs-title">To install</div>
          <ul className="m-prereqs-list">
            <li><span className="m-mono">docker</span><span>with Compose</span></li>
            <li><span className="m-mono">curl</span><span>to fetch the installer</span></li>
            <li><span className="m-mono">api key</span><span>Anthropic (required)</span></li>
            <li><span className="m-mono">domain</span><span>for HTTPS, set up for you</span></li>
          </ul>
          <div className="m-prereqs-cmd">
            <span className="ts">$</span>
            <span>curl -fsSLO https://github.com/josephfung/curia/releases/latest/download/install.sh</span>
          </div>
          <div className="m-prereqs-cmd">
            <span className="ts">$</span>
            <span>bash install.sh</span>
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
              Born from one CEO's working life, refined as new clients ask for more.
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
            always wished he had. He is personally accountable for every
            instance in the managed practice.
          </p>
          <a className="m-bio-link" href="https://www.linkedin.com/in/josephfung/">LinkedIn →</a>
        </div>

        <div className="m-managed-cta">
          <a className="m-cta" href="https://calendly.com/jbfung/curia">Start a conversation</a>
          <span className="m-managed-cta-note">By invitation. No pricing page. No tiers.</span>
        </div>
      </div>
    </div>
  </section>
);

const FaqSection = () => {
  const faqs = [
    { q: 'Who is Curia for?',                        a: 'Experienced CEOs, founders, and principals whose work spans email, calendar, relationships, and follow-through, and who want an office with more continuity, control, and memory.' },
    // Managed-practice FAQs hidden while the managed section is dark (see ManagedSection).
    { q: 'Can I add my own desks?',                  a: 'Yes. A desk is a specialist agent with its own mandate, tools, memory, permissions, and schedule. Curia ships with 140+ built-in tools and supports the Model Context Protocol (MCP), so external tools plug straight in.' },
    { q: 'Where does Curia run?',                    a: 'Anywhere you can run Docker: a laptop, a VPS, your own VPC, or on-premises. It is single-tenant and self-hosted, so your data stays on your infrastructure, apart from what Curia sends to the model provider you configure.' },
    {
      q: 'Is Curia secure?',
      a: (
        <>
          Its security is auditable, not asserted. Curia runs single-tenant on your infrastructure, secrets never touch the LLM, every action is logged, and the codebase is continuously scanned. See its{' '}
          <a href="https://securityscorecards.dev/viewer/?uri=github.com/josephfung/curia">OpenSSF Scorecard</a>, or read{' '}
          <a href="/governance">how Curia approaches security and governance</a>.
        </>
      ),
    },
    { q: 'How does the audit trail work?',           a: 'Every read, draft, send, and decision is logged with a timestamp, actor, model, and SHA-256 fingerprints of the prompt and response, in append-only Postgres with causal tracing. Only tools hold credentials, and every access is logged.' },
    { q: 'Is Curia an executive assistant replacement?', a: 'It can own many responsibilities an executive assistant or chief of staff would, but it is not a person. It works best with clear mandates, connected tools, explicit permissions, and defined escalation rules.' },
    { q: 'Will the API surface change?',             a: 'Not after v1.0.0. From then on, agent contracts, tool manifests, channel adapters, the knowledge-graph interface, the autonomy model, and configuration schemas are frozen.' },
    { q: 'What does it cost to run?',                a: 'The software is free under MIT. You pay only for your infrastructure and LLM API usage.' },
    {
      q: 'What support do you have?',
      a: (
        <>
          Curia is self-supported: documentation, no warranty, no support contract. If you would rather not run it alone, a managed instance is available.{' '}
          <a href="https://calendly.com/jbfung/curia">Get in touch</a>.
        </>
      ),
    },
  ];
  return (
    <section className="m-section" id="faq">
      <div className="m-container">
        <h2 className="m-section-title">A few that always come up.</h2>
        <Faq items={faqs} />
      </div>
    </section>
  );
};

// Home page composition — assembles all homepage sections with the shared header/footer.
const HomePage = () => (
  <>
    <MarketingHeader />
    <Hero />
    <DelegationSection />
    <TrustSection />
    <IntegrationsSection />
    <GetStartedSection />
    <ManagedSection />
    <FaqSection />
    <MarketingFooter />
  </>
);

export default HomePage;
