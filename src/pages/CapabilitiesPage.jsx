import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';
import CapabilityDetail from '../components/CapabilityDetail.jsx';
import OfficeDeskCard from '../components/OfficeDeskCard.jsx';

// Eight responsibilities grouped into four named sections. Headings double as
// screenshot captions; the homepage preview cards reuse some of them, so change them together.
const GROUPS = [
  {
    label: 'Protect your attention',
    capabilities: [
      {
        heading: 'Check your inbox once a day',
        description: 'Curia checks your inbox every 15 minutes, drafts replies, turns open requests into tasks, and alerts you on Signal when something is urgent. Routine actions can start with your approval and become automatic over time.',
        bringsYouIn: [
          'Ambiguous urgency',
          'Sensitive or high-impact replies',
          'Requests outside its authority',
        ],
        result: 'Review your inbox once or twice a day without trusting luck to surface what matters.',
        image: {
          src: '/assets/capabilities/inbox.jpg', width: 1600, height: 951,
          alt: 'Gmail inbox where Curia has labelled each message Cleared, Seen, or Handled, with label counts in the sidebar.',
        },
      },
      {
        heading: 'Never let an action item slip',
        description: 'Curia does not wait for you to check a list. It tracks every commitment in flight, reminds you before what you own is due, chases other people for what they owe you, and keeps raising anything that stalls until it is closed out.',
        bringsYouIn: [
          'A decision only you can make',
          'A stalled external dependency',
          'Conflicting priorities',
        ],
        result: 'Stop worrying about the to-do you forgot to write down.',
        image: {
          src: '/assets/capabilities/open-tasks.jpg', width: 1600, height: 942,
          alt: 'Curia Tasks view filtered to open tasks, showing owner, status, age, and status counts across all tasks.',
        },
      },
    ],
  },
  {
    label: 'Protect your time',
    capabilities: [
      {
        heading: 'Stop negotiating meeting times',
        description: 'Curia checks availability, preferences, and time zones, proposes times, handles the back-and-forth, and books the event once a time is agreed.',
        bringsYouIn: [
          'Two important meetings conflict',
          'A time would break your protected preferences',
          'Rescheduling could strain a relationship',
        ],
        result: 'No more five-message threads to arrange a 20-minute call.',
        image: {
          src: '/assets/capabilities/schedule.jpg', width: 1600, height: 1071,
          alt: 'Email thread where a contact asks for a call, the CEO copies Curia, and Curia replies with four time options for next week.',
        },
      },
      {
        heading: 'Tell Curia once and trust that it keeps happening',
        description: 'Give Curia a standing order once, like reviewing stalled commitments every Friday or suggesting people to see when you travel, and it keeps carrying it out. Standing orders survive restarts, and failures are surfaced rather than silently dropped.',
        bringsYouIn: [
          'The instruction becomes ambiguous',
          'It conflicts with a newer preference',
          'The job keeps failing',
        ],
        result: 'Set an operating rule once and rely on it months later.',
        image: {
          src: '/assets/capabilities/tell-once.jpg', width: 904, height: 730,
          alt: 'Signal chat where the CEO asks Curia to search email history before asking for missing contact details, and Curia confirms the instruction is on file.',
        },
      },
    ],
  },
  {
    label: 'Protect your context',
    capabilities: [
      {
        heading: 'Stop keeping notes',
        description: 'Every email, meeting, call, and decision Curia handles feeds a private knowledge graph and document store that it builds and maintains on its own. People, companies, projects, and documents stay linked and current as facts change, so the record writes itself.',
        bringsYouIn: [
          'Two sources disagree',
          'An update would overwrite something you set',
          'Something sensitive should not be stored automatically',
        ],
        result: 'Ask “What did we decide about this?” and get the answer, without ever having written it down.',
      },
      {
        heading: 'Remember everyone without updating a CRM',
        description: 'Curia builds private relationship memory from the work it already does: how you met, what people care about, your last real conversation, and what is open between you. No manual updates.',
        bringsYouIn: [
          'Two records may be the same person',
          'Facts conflict',
          'Something sensitive should not be stored automatically',
        ],
        result: 'Ask “What do I know about this person?” and get an answer from your own history.',
        image: {
          src: '/assets/capabilities/contacts.jpg', width: 1600, height: 820,
          alt: 'Curia Contacts view listing known people with their titles, organizations, trust tier, and last-updated dates.',
        },
      },
    ],
  },
  {
    label: 'Keep work moving',
    capabilities: [
      {
        heading: 'Supercharge every meeting',
        description: [
          'Before a meeting, Curia researches who you are meeting, how you know them, and what each side owes, then attaches a briefing note to the calendar event so it is waiting when you open it.',
          'During it, Curia runs the agenda and takes the minutes, recording every decision and owner. Afterwards it asks for your takeaways: reply in plain language and it turns them into drafts, research, reminders, contact updates, and tasks.',
        ],
        bringsYouIn: [
          'Sources disagree or facts are uncertain',
          'An agenda or minutes need your sign-off before they go out',
          'A follow-up needs authority Curia does not have',
        ],
        result: 'Walk in prepared. Walk out with the minutes, follow-ups, and tasks already handled.',
        image: {
          src: '/assets/capabilities/follow-up.jpg', width: 1600, height: 867,
          alt: 'Curia chat after a meeting: Curia asks for follow-ups, the CEO lists two promised items, and Curia offers to find them and draft the note.',
        },
      },
      {
        heading: 'Reach your office wherever you are',
        description: [
          'Curia runs on its own server, not your laptop, so it stays online when your computer is closed and keeps working while you sleep, travel, or sit in back-to-back meetings.',
          'Reach it however suits the moment: email, a message on Signal, or a phone call. Every channel shares the same memory, so you never have to repeat yourself.',
        ],
        bringsYouIn: [
          'Something urgent needs you while you are away',
          'A request arrives from someone it cannot verify',
          'A job keeps failing while you are offline',
        ],
        result: 'Your office keeps running when you close the laptop.',
        image: {
          src: '/assets/capabilities/always-on.jpg', width: 1600, height: 1104,
          alt: 'Curia console home showing work handled since yesterday, a week of activity by agent, recent autonomous actions, and every channel reporting healthy.',
        },
      },
    ],
  },
];

const CapabilitiesPage = () => (
  <>
    <MarketingHeader home={false} />
    <main className="m-section">
      <div className="m-container">
        <h1 className="m-section-title" style={{ marginBottom: 24 }}>What Curia can take off your plate</h1>
        <p className="m-hero-lede" style={{ marginBottom: 12 }}>Give Curia responsibility, not just prompts.</p>
        <p className="m-pillar-body" style={{ maxWidth: 720, marginBottom: 64 }}>
          Each responsibility below covers what Curia does and where it brings you in.
        </p>

        {(() => {
          // Running index across all groups so the screenshot side alternates
          // continuously down the page, not per-group.
          let n = -1;
          return GROUPS.map((group) => (
            <React.Fragment key={group.label}>
              <div className="m-capgroup-label">{group.label}</div>
              {group.capabilities.map((cap) => {
                n += 1;
                return <CapabilityDetail key={cap.heading} index={n} {...cap} />;
              })}
            </React.Fragment>
          ));
        })()}
      </div>
    </main>
    {/* Real-world setups — anchor target for homepage CTA and "See real examples" link.
        The id stays "deployed-desks" so existing links keep working.
        Reverse-coloured (dark) treatment, matching the homepage governance band. */}
    <section className="m-section m-section-dark" id="deployed-desks">
      <div className="m-container">
        <h2 className="m-section-title">How people are putting Curia to work</h2>
        <p className="m-pillar-body" style={{ maxWidth: 720, marginBottom: 48 }}>
          Each is a setup a Curia user configured for their own work: they described the
          job, connected the tools it needed, and set the guardrails. That takes a short
          setup, not an implementation project.
        </p>

        <div className="m-desk-grid">
          <OfficeDeskCard
            title="Editorial pipeline"
            body="Tracks the content pipeline, flags approaching deadlines and stalled drafts, and sends a morning status each weekday."
          />
          <OfficeDeskCard
            title="Expense review"
            body="Checks expenses against policy, catches duplicates, flags anything needing CFO approval, and logs each decision with its reasoning."
          />
          <OfficeDeskCard
            title="Social posting"
            body="Drafts posts from a weekly brief, queues them for approval, and reports engagement every Monday."
          />
          <OfficeDeskCard
            title="Bookkeeping"
            body="Follows a family business's account workflows, categorizes transactions, and keeps QuickBooks up to date."
          />
          <OfficeDeskCard
            title="Shared inboxes"
            body="Watches the customer service and billing inboxes, triages each message, drafts replies, and makes sure nothing sits unanswered."
          />
          <OfficeDeskCard
            title="Meeting secretary"
            body="Prepares agendas, takes minutes, and chases every open action item until it is closed."
          />
        </div>
      </div>
    </section>

    {/* Set up your own — travel etc. as examples you could build, not live setups */}
    <section className="m-section" id="add-a-desk">
      <div className="m-container m-adddesk">
        <h2 className="m-section-title">Set Curia up for your own work</h2>
        <p className="m-pillar-body">
          Start from the job you want handled, not from a feature list. Each setup gets its
          own mandate, tools, memory, and permissions, so adding one never gives Curia
          access to everything.
        </p>
        <ul className="m-adddesk-list">
          <li>Describe the job</li>
          <li>Connect the tools and data it needs</li>
          <li>Set its schedule or triggers</li>
          <li>Decide which actions need your approval</li>
        </ul>
        <p className="m-pillar-body">
          Travel planning, investor diligence, a hiring pipeline: the same four steps cover
          them all, and every action lands in the audit trail.
        </p>
        <div className="m-hero-actions">
          <a className="m-cta" href="https://docs.meetcuria.com/agents/building-custom-agents">Read the setup guide</a>
        </div>
      </div>
    </section>

    <MarketingFooter home={false} />
  </>
);

export default CapabilitiesPage;
