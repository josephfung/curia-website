import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';
import CapabilityDetail from '../components/CapabilityDetail.jsx';

// Eight responsibilities grouped into four named sections.
// Copy verbatim from task brief — do not edit without updating the brief.
const GROUPS = [
  {
    label: 'Protect your attention',
    capabilities: [
      {
        heading: 'Check your inbox once a day',
        description: [
          'Curia checks your inbox around the clock, every 15 minutes.',
          'It classifies new messages, separates routine mail from items requiring action, drafts replies, and turns unresolved requests into tracked work. When something appears genuinely urgent, Curia alerts you through Signal rather than waiting for your next inbox review.',
          'Routine actions can require approval at first, then become automatic within explicitly approved lanes.',
        ],
        makesItWork: [
          'CEO Inbox agent',
          'Email search, reading, labelling, drafting, and sending tools',
          'Contact identities and prior sender context',
          'Stored preferences and past instructions',
          'Task backlog for unresolved work',
          'Signal for urgent escalation',
          'Approval and autonomy rules',
        ],
        bringsYouIn: [
          'Ambiguous urgency',
          'Sensitive or high-impact replies',
          'Requests outside approved authority',
          'Conflicting instructions',
          'Unverified or suspicious senders',
          'Repeated failures',
        ],
        result: 'Process your inbox deliberately once or twice a day without trusting luck to surface the important message.',
      },
      {
        heading: 'Know exactly what is still open',
        description: [
          'Curia maintains a durable backlog of the work surrounding you.',
          'It distinguishes work Curia owns, work waiting for you, work waiting for someone else, work intentionally deferred, work that has stalled, and work that hit an error. At any time you can ask what is waiting on you, what you are waiting on from others, what has gone quiet, and what Curia finished this week.',
          'Longer-running work retains its progress between sessions and after system restarts.',
        ],
        makesItWork: [
          'Goals and persistent tasks',
          'Explicit task ownership',
          'Status and progress records',
          'Scheduled wake-ups for deferred work',
          'Meeting, email, and message context',
          'Error tracking and suspension',
          'Restart-safe state in Postgres',
        ],
        bringsYouIn: [
          'Missing ownership',
          'A task that requires a CEO decision',
          'A stalled external dependency',
          'Repeated failure',
          'Intent drift',
          'Conflicting priorities',
        ],
        result: 'One coherent view of your open loops instead of reconstructing it from email, calendar entries, notes, and memory.',
      },
    ],
  },
  {
    label: 'Protect your time',
    capabilities: [
      {
        heading: 'Stop negotiating meeting times',
        description: [
          'Curia handles the administrative work between “we should meet” and a confirmed calendar event.',
          'It checks availability, working hours, existing commitments, contact identities, and time zones. It proposes viable times, drafts or sends the scheduling messages, and creates or updates the event once a time is agreed.',
        ],
        makesItWork: [
          'Calendar Specialist',
          'Calendar read and write tools',
          'Email drafting and sending tools',
          'Stored scheduling preferences',
          'Time-zone context',
          'Contact identity resolution',
          'Approval rules for external communication',
        ],
        bringsYouIn: [
          'Two important meetings genuinely conflict',
          'The purpose of the meeting is unclear',
          'An attendee is not verified',
          'A proposed time violates protected preferences',
          'Rescheduling could damage a relationship',
          'External communication is outside the approved lane',
        ],
        result: 'Stop spending five messages arranging a 20-minute call while keeping control over meetings that actually compete for your time.',
      },
      {
        heading: 'Tell Curia once and trust that it keeps happening',
        description: [
          'Curia can maintain standing orders that continue without you restating them: check for investor emails every Monday, review stalled commitments every Friday, begin board prep six weeks out, alert you when a specific person emails, track promises made by a date, or surface people to see when you travel to a city.',
          'These are not reminders that disappear when a chat closes. Scheduled work and progress are stored durably, recurring jobs continue after restarts, and repeated failures are surfaced instead of silently ignored.',
          'A standing order can also apply judgment. “When I travel to New York, suggest people to see” can weigh location, relationship importance, contact recency, open conversations, and the shape of the trip before presenting a shortlist.',
        ],
        makesItWork: [
          'Persistent scheduled jobs',
          'Calendar and event monitoring',
          'Contact and relationship memory',
          'Saved task state',
          'Original intent anchor',
          'Failure counting and suspension',
          'Alert-channel escalation',
        ],
        bringsYouIn: [
          'The rule becomes ambiguous',
          'Required data is unavailable',
          'The output would trigger a sensitive external action',
          'The original instruction conflicts with newer preferences',
          'The job repeatedly fails',
          'The task appears to have drifted from its original intent',
        ],
        result: 'Establish an operating rule once and rely on Curia to keep carrying it out months later.',
      },
    ],
  },
  {
    label: 'Protect your context',
    capabilities: [
      {
        heading: 'Walk into every important meeting prepared',
        description: [
          'Before an important meeting, Curia prepares a concise briefing on the people, organizations, and subjects involved.',
          'It can combine the calendar invitation and attendee list, previous emails and meetings, facts and relationship history stored privately in Curia, outstanding commitments in either direction, relevant documents, recent developments, and focused web research. The briefing answers who you are meeting, how you know each other, what you have discussed, what they care about, what has changed, what you owe one another, and what you should ask.',
        ],
        makesItWork: [
          'Contact Specialist',
          'Research Analyst',
          'Calendar and email history',
          'Contact identity resolution',
          'Private knowledge graph',
          'Source and freshness metadata',
          'Current external research',
        ],
        bringsYouIn: [
          'Conflicting identity records',
          'Weak or stale relationship data',
          'Research sources disagree',
          'Sensitive information may not be appropriate for the briefing',
          'A fact has low confidence',
          'The meeting purpose is unclear',
        ],
        result: 'Arrive with both current research and your own private relationship context.',
      },
      {
        heading: 'Remember everyone without updating a CRM',
        description: [
          'Curia maintains private relationship memory as work happens.',
          'It resolves people across email addresses, calendar invitations, messaging accounts, companies, and roles. It captures useful facts from meetings and correspondence, links related people and organizations, and detects duplicate or conflicting records. It can preserve how you met, who introduced you, their role and organization, what they care about, your last meaningful interaction, important personal details, open commitments, and shared relationships.',
          'This is not another CRM requiring constant manual updates. The record develops through the work Curia is already helping perform.',
        ],
        makesItWork: [
          'Contact and identity resolution',
          'Email participants',
          'Calendar attendees',
          'Structured entity memory',
          'Knowledge-graph relationships',
          'Source attribution',
          'Confidence and freshness metadata',
          'Deduplication and contradiction checks',
        ],
        bringsYouIn: [
          'Two records may represent the same person',
          'A new identity is self-claimed',
          'Facts conflict at similar confidence',
          'Sensitive information should not be stored automatically',
          "A contact's role or permissions are unclear",
        ],
        result: 'Ask “What do I know about this person?” and get an answer grounded in your own private history, not just a web search.',
      },
    ],
  },
  {
    label: 'Move work forward',
    capabilities: [
      {
        heading: 'Never lose a meeting follow-up',
        description: [
          'After a designated meeting ends, Curia asks for your takeaways while the conversation is still fresh.',
          'You can reply naturally: “Send Sarah the report, research the question about Quebec, and remind me to reconnect in September.” Curia separates that response into the appropriate work. It can draft the email, create the research assignment, schedule the reminder, update the contact record, and add unresolved items to the task backlog.',
        ],
        makesItWork: [
          'Meeting Debrief agent',
          'Calendar events and attendee information',
          'Email drafting tools',
          'Research delegation',
          'Contact and relationship memory',
          'Task system',
          'Scheduler',
          'Coordinator delegation',
        ],
        bringsYouIn: [
          'Your note is ambiguous',
          'A follow-up requires external authority Curia does not have',
          'A remembered fact is sensitive or uncertain',
          'A deadline is missing',
          'A commitment conflicts with an existing one',
        ],
        result: 'A useful conversation does not depend on you remembering, hours later, to update five different systems.',
      },
      {
        heading: 'Hand off a project, not just a prompt',
        description: [
          'Curia can own work that takes multiple steps or unfolds over days: research three expansion markets and recommend one, coordinate prep for a quarterly planning session, collect missing inputs for a board package, work through a neglected inbox, monitor a competitor, or prepare a recurring weekly operating brief.',
          'Curia breaks the objective into work, delegates to the appropriate specialist desks, saves progress, and resumes later. The original objective stays attached so the work does not gradually drift into something else.',
        ],
        makesItWork: [
          'Persistent tasks',
          'Saved progress',
          'Intent anchors',
          'Specialist agents',
          'Shared working memory',
          'Scheduled work sessions',
          'Permission boundaries',
          'Error budgets',
          'Audit trail',
        ],
        bringsYouIn: [
          'A decision changes the project direction',
          'A task requires external authorization',
          'Important information is missing',
          'Priorities conflict',
          'The task reaches a budget or error limit',
          'Intent drift is detected',
        ],
        result: 'Delegate an outcome instead of manually driving every intermediate step.',
      },
    ],
  },
];

const CapabilitiesPage = () => (
  <>
    <MarketingHeader home={false} />
    <main className="m-section">
      <div className="m-container">
        <div className="m-section-eyebrow">Capabilities</div>
        <h1 className="m-section-title" style={{ marginBottom: 24 }}>What Curia can take off your plate</h1>
        <p className="m-hero-lede" style={{ marginBottom: 12 }}>Give Curia responsibility, not just prompts.</p>
        <p className="m-pillar-body" style={{ maxWidth: 720, marginBottom: 64 }}>
          Curia&rsquo;s specialist desks can watch systems, preserve context, move routine
          work forward, and bring you the decisions that require judgment. Each responsibility
          below explains what Curia does, what makes it work, and where it brings you in.
        </p>

        {GROUPS.map((group) => (
          <React.Fragment key={group.label}>
            <div className="m-capgroup-label">{group.label}</div>
            {group.capabilities.map((cap) => (
              <CapabilityDetail key={cap.heading} {...cap} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </main>
    <MarketingFooter home={false} />
  </>
);

export default CapabilitiesPage;
