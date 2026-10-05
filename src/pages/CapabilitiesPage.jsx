import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';
import CapabilityDetail from '../components/CapabilityDetail.jsx';
import OfficeDeskCard from '../components/OfficeDeskCard.jsx';

// Eight responsibilities grouped into four named sections. Headings double as
// screenshot captions and match the homepage preview cards, so change them together.
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
        heading: 'Know exactly what is still open',
        description: 'Curia keeps one backlog of everything in flight: what it owns, what is waiting on you or someone else, and what has stalled. Progress persists between sessions, so nothing quietly disappears.',
        bringsYouIn: [
          'A decision only you can make',
          'A stalled external dependency',
          'Conflicting priorities',
        ],
        result: 'One view of your open loops, instead of rebuilding it from email, calendar, and memory.',
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
        heading: 'Walk into every important meeting prepared',
        description: 'Before an important meeting, Curia briefs you on who you are meeting, how you know them, what you have discussed, what each side owes, and what has changed, combining your private history with fresh research.',
        bringsYouIn: [
          'Identity records conflict',
          'Sources disagree or facts are uncertain',
          'Something may be too sensitive to include',
        ],
        result: 'Arrive with current research and your own relationship context.',
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
    label: 'Move work forward',
    capabilities: [
      {
        heading: 'Never lose a meeting follow-up',
        description: 'When a meeting ends, Curia asks for your takeaways. Reply in plain language and it splits your answer into drafts, research, reminders, contact updates, and tasks.',
        bringsYouIn: [
          'Your note is ambiguous',
          'A follow-up needs authority Curia does not have',
          'A deadline is missing',
        ],
        result: 'Follow-through no longer depends on you updating five systems hours later.',
        image: {
          src: '/assets/capabilities/follow-up.jpg', width: 1600, height: 867,
          alt: 'Curia chat after a meeting: Curia asks for follow-ups, the CEO lists two promised items, and Curia offers to find them and draft the note.',
        },
      },
      {
        heading: 'Hand off a project, not just a prompt',
        description: 'Give Curia an outcome that takes days, like researching three markets and recommending one, or assembling a board package. It breaks the work down, delegates to specialist desks, saves progress, and keeps the original goal attached so the work does not drift.',
        bringsYouIn: [
          'A decision would change direction',
          'Important information is missing',
          'The task hits its budget or error limit',
        ],
        result: 'Delegate an outcome, not every intermediate step.',
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
    {/* Deployed desks — anchor target for homepage CTA and "See real examples" link.
        Reverse-coloured (dark) treatment, matching the homepage governance band. */}
    <section className="m-section m-section-dark" id="deployed-desks">
      <div className="m-container">
        <h2 className="m-section-title">Desks one CEO added to a live office</h2>
        <p className="m-pillar-body" style={{ maxWidth: 720, marginBottom: 48 }}>
          These run in a live Curia office today, each with a mandate, chosen tools, a
          schedule, scoped memory, and explicit limits. Build the desks your own work needs.
        </p>

        <div className="m-desk-grid">
          <OfficeDeskCard
            title="Editorial Desk"
            body="Tracks the content pipeline, flags approaching deadlines and stalled drafts, and sends a morning status each weekday. Cannot contact contributors without approval."
          />
          <OfficeDeskCard
            title="Expense Desk"
            body="Checks expenses against policy, catches duplicates, flags anything needing CFO approval, and logs each decision with its reasoning. Cannot trigger payments."
          />
          <OfficeDeskCard
            title="Social Desk"
            body="Drafts posts from a weekly brief, queues them for approval, and reports engagement every Monday. Cannot publish directly."
          />
        </div>
      </div>
    </section>

    {/* Add-a-desk — travel as an example you could build, not a deployed desk */}
    <section className="m-section" id="add-a-desk">
      <div className="m-container m-adddesk">
        <h2 className="m-section-title">Add another desk</h2>
        <p className="m-pillar-body">
          A desk is a specialist agent with its own mandate, tools, memory, schedule, and
          permissions. Adding one never gives every agent access to everything.
        </p>
        <ul className="m-adddesk-list">
          <li>Define the responsibility</li>
          <li>Choose its tools and memory</li>
          <li>Set its schedule or triggers</li>
          <li>Decide which actions need approval</li>
        </ul>
        <p className="m-pillar-body">
          A travel desk, a diligence desk, a hiring-pipeline desk: the same framework
          builds them all, and every action lands in the audit trail.
        </p>
        <div className="m-hero-actions">
          <a className="m-cta" href="https://docs.meetcuria.com/agents/building-custom-agents">Read the agent-building documentation</a>
        </div>
      </div>
    </section>

    <MarketingFooter home={false} />
  </>
);

export default CapabilitiesPage;
