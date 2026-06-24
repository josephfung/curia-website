# meetcuria.com Messaging & IA Update — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe meetcuria.com around the responsibilities Curia takes off a CEO's plate, add a `/capabilities` page, and correct every claim to match the shipped product — without redesigning the site.

**Architecture:** Refactor the single `src/App.jsx` into shared components + per-page files behind the existing tiny path-based router (add `/capabilities` alongside `/privacy`; no React Router). Layer content/copy changes on top of the extracted structure. Preserve the existing `m-` CSS system and visual language; add new `m-` classes only where new component shapes require them.

**Tech Stack:** Vite 6 + React 18, plain CSS (`src/styles.css`), self-hosted fonts. Build = `npm run build`. Dev = `npm run dev`.

## Global Constraints

- **Worktree:** all work in `/Users/josephfung/Projects/office-of-the-ceo/worktrees/curia-website-messaging-ia` on branch `feat/website-messaging-ia`. Run npm via `npm --prefix <worktree> …`.
- **No em dashes (—) or en dashes used as pauses in user-facing copy.** Use periods, commas, parentheses, or two sentences. (Hyphens in compound words are fine.) This is a hard rule.
- **Preserve the design language:** Manrope/Lora/JetBrains Mono, the `--m-*` palette, the dark governance band, existing button/section primitives. No new fonts, no animation, no illustration, no redesign.
- **Accuracy over marketing.** Only ship claims substantiated in the spec's Appendix A. No generic AI clichés ("superhuman", "seamless", "revolutionize", "unlock").
- **Routing:** keep the path-based router; do NOT add React Router; do NOT add a `_redirects` file; keep trailing-slash normalization.
- **Node ≥ 24** wherever a runtime version appears (never 22).
- **Skill count phrasing:** "90+" (true; actual is 99).
- **Inbox cadence:** "every 15 minutes". Drafts, not auto-send by default.
- **No Co-Authored-By / no Claude attribution** in commits or any artifact.
- Per-task verification: `npm --prefix <worktree> run build` must succeed, and a dev-server smoke check must show the page renders with no console errors and working nav/anchors.

Spec: `docs/superpowers/specs/2026-06-24-messaging-ia-design.md` (Appendix A is the source of truth for all factual claims).

---

## File Structure

**Create:**
- `src/components/MarketingHeader.jsx` — sticky header, nav, header actions; `home` prop.
- `src/components/MarketingFooter.jsx` — footer grid + fine print; `home` prop.
- `src/components/SectionHeader.jsx` — eyebrow + title + optional lede; `dark` prop.
- `src/components/CapabilityPreviewCard.jsx` — homepage 4-up outcome card.
- `src/components/CapabilityDetail.jsx` — `/capabilities` 6-part responsibility block.
- `src/components/OfficeDeskCard.jsx` — deployed-desk card (both pages).
- `src/components/EvidencePlaceholder.jsx` — captioned slot for future screenshots.
- `src/pages/HomePage.jsx` — composes homepage sections.
- `src/pages/CapabilitiesPage.jsx` — the new page.
- `src/pages/PrivacyPage.jsx` — moved verbatim from App.jsx.
- `src/lib/useRouteMetadata.js` — sets document.title + meta tags per route.

**Modify:**
- `src/App.jsx` — becomes router + metadata wiring; section components for the homepage may live here or under `src/sections/` (implementer's choice, keep files focused).
- `src/styles.css` — add new `m-` classes (capability-detail, desk card, evidence placeholder, capabilities-page group headers, add-a-desk block).
- `index.html` — update homepage `<title>`, meta description, OG tags.

> Section components for the homepage (Hero, capability preview row, operating model, deployed desks, governance, get-started, FAQ) can stay inside `HomePage.jsx` or be split into `src/sections/*.jsx`. Either is fine; keep each file single-responsibility.

---

## Task 1: Extract shared components (pure refactor, no content change)

Move existing markup out of `App.jsx` into components/pages with **identical output**. This isolates the risky restructure from the copy work.

**Files:**
- Create: `src/components/MarketingHeader.jsx`, `src/components/MarketingFooter.jsx`, `src/pages/PrivacyPage.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `MarketingHeader({ home = true })`, `MarketingFooter({ home = true })`, `PrivacyPage()` — default exports.

- [ ] **Step 1: Create `src/components/MarketingHeader.jsx`** — cut the current `MarketingHeader` component (App.jsx:8-36) verbatim into this file, add `import React from 'react';` and `export default MarketingHeader;`. Keep the leading comment about the `home` prop.

- [ ] **Step 2: Create `src/components/MarketingFooter.jsx`** — cut the current `MarketingFooter` (App.jsx:370-419) verbatim, `import React`, default-export. Keep the inline comments.

- [ ] **Step 3: Create `src/pages/PrivacyPage.jsx`** — cut the current `PrivacyPage` (App.jsx:434-506) verbatim; `import React`, import `MarketingHeader`/`MarketingFooter` from `../components/`, default-export.

- [ ] **Step 4: Update `src/App.jsx`** — import the three new modules. Leave `Hero`, `CapabilitiesSection`, `GovernanceSection`, `GetStartedSection`, `ManagedSection`, `FaqSection`, `MarketingPage`, and the router in place for now (they still reference the imported header/footer). Remove the moved definitions.

- [ ] **Step 5: Build**

Run: `npm --prefix /Users/josephfung/Projects/office-of-the-ceo/worktrees/curia-website-messaging-ia run build`
Expected: build succeeds, no errors.

- [ ] **Step 6: Smoke-check** — `npm --prefix <worktree> run dev`, load `/` and `/privacy`. Expected: both render exactly as before, no console errors, header/footer links work.

- [ ] **Step 7: Commit**

```bash
git -C /Users/josephfung/Projects/office-of-the-ceo/worktrees/curia-website-messaging-ia add -A
git -C /Users/josephfung/Projects/office-of-the-ceo/worktrees/curia-website-messaging-ia commit -m "refactor: extract MarketingHeader, MarketingFooter, PrivacyPage"
```

---

## Task 2: Router + per-route metadata + nav + `/capabilities` stub

Add the new route, route-specific metadata, and point the nav at it. The page is a stub (title only) so routing is verifiable before content lands.

**Files:**
- Create: `src/lib/useRouteMetadata.js`, `src/pages/CapabilitiesPage.jsx`, `src/pages/HomePage.jsx`
- Modify: `src/App.jsx`, `src/components/MarketingHeader.jsx`, `index.html`

**Interfaces:**
- Produces: `useRouteMetadata(path)` (side-effect hook), `CapabilitiesPage()`, `HomePage()`.
- Consumes: `MarketingHeader`/`MarketingFooter` from Task 1.

- [ ] **Step 1: Create `src/lib/useRouteMetadata.js`**

```js
import { useEffect } from 'react';

// Per-route document metadata. index.html holds the homepage defaults; this
// overrides title + description + OG tags when a standalone route renders.
const META = {
  '/capabilities': {
    title: 'Curia Capabilities — What Curia Can Take Off Your Plate',
    description:
      'See how Curia handles inbox triage, scheduling, meeting follow-up, relationship memory, research, standing orders, and multi-step executive work.',
  },
};

function setMeta(name, attr, value) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export function useRouteMetadata(path) {
  useEffect(() => {
    const m = META[path];
    if (!m) return; // homepage/privacy keep the index.html defaults
    const prevTitle = document.title;
    document.title = m.title;
    setMeta('description', 'name', m.description);
    setMeta('og:title', 'property', m.title);
    setMeta('og:description', 'property', m.description);
    return () => {
      document.title = prevTitle;
    };
  }, [path]);
}
```

- [ ] **Step 2: Create `src/pages/HomePage.jsx`** — move the current `MarketingPage` composition (App.jsx:421-432) here, rename to `HomePage`, default-export, import the section components it uses (for now import them from `../App.jsx` is NOT allowed — instead, keep the section components in App.jsx and have App render `<HomePage/>` by passing them, OR move the section components into HomePage.jsx). Simplest: move `Hero`, `CapabilitiesSection`, `GovernanceSection`, `GetStartedSection`, `ManagedSection`, `FaqSection` definitions into `HomePage.jsx` and compose them there with `MarketingHeader`/`MarketingFooter`.

- [ ] **Step 3: Create `src/pages/CapabilitiesPage.jsx` (stub)**

```jsx
import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';

const CapabilitiesPage = () => (
  <>
    <MarketingHeader home={false} />
    <main className="m-section">
      <div className="m-container">
        <div className="m-section-eyebrow">Capabilities</div>
        <h1 className="m-section-title">What Curia can take off your plate</h1>
      </div>
    </main>
    <MarketingFooter home={false} />
  </>
);

export default CapabilitiesPage;
```

- [ ] **Step 4: Rewrite `src/App.jsx` as router + metadata**

```jsx
import React from 'react';
import HomePage from './pages/HomePage.jsx';
import CapabilitiesPage from './pages/CapabilitiesPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import { useRouteMetadata } from './lib/useRouteMetadata.js';

// Tiny path-based router — no router dependency for a small static site.
// Trailing slashes are normalized so /x and /x/ both match. Cloudflare Pages
// serves index.html for unmatched paths via its default SPA fallback (no
// _redirects file — a /privacy /index.html 200 rewrite there 308-loops to /).
const App = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  useRouteMetadata(path);
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/capabilities') return <CapabilitiesPage />;
  return <HomePage />;
};

export default App;
```

- [ ] **Step 5: Update nav in `src/components/MarketingHeader.jsx`** — change the Capabilities link so it always points to the page (not an anchor):

```jsx
<a href="/capabilities">Capabilities</a>
<a href={home ? '#governance' : '/#governance'}>Governance</a>
<a href={home ? '#get-started' : '/#get-started'}>Get started</a>
```

- [ ] **Step 6: Update `index.html` homepage metadata** — set:
  - `<title>Curia — A Persistent Digital Office for CEOs</title>`
  - description: `One point of contact backed by specialist desks for your inbox, calendar, meetings, relationships, research, and ongoing work. Open source and self-hosted.`
  - `og:title`: `Curia — An Executive Office Behind One Point of Contact`
  - `og:description`: `Curia runs specialist desks with standing mandates, private memory, explicit permissions, and clear escalation rules.`

  (The em dash in the brand `<title>` is the existing typographic title treatment, not prose; keep it consistent with the current title style.)

- [ ] **Step 7: Build** — Run the build command. Expected: success.

- [ ] **Step 8: Smoke-check** — visit `/`, `/capabilities`, `/privacy`. Expected: capabilities stub renders; tab title changes to the capabilities title on that route and back; nav "Capabilities" navigates to `/capabilities`; Governance/Get started anchors work from `/capabilities` (they go to `/#governance` etc.); no console errors.

- [ ] **Step 9: Commit**

```bash
git -C <worktree> add -A
git -C <worktree> commit -m "feat: add /capabilities route, per-route metadata, nav update"
```

---

## Task 3: Hero rewrite

**Files:** Modify the `Hero` component (now in `src/pages/HomePage.jsx`).

- [ ] **Step 1: Replace the Hero JSX** with:

```jsx
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
```

- [ ] **Step 2: Build.** Expected: success.
- [ ] **Step 3: Smoke-check** — hero shows new eyebrow/headline/lede; "superhuman speed" gone; primary CTA → `/capabilities`; no em dashes in the lede.
- [ ] **Step 4: Commit** — `git commit -m "feat: rewrite hero with one-point-of-contact positioning"`

---

## Task 4: Homepage capability preview cards

Replace the four abstract pillars with four outcome-led jobs.

**Files:** Create `src/components/CapabilityPreviewCard.jsx`; modify `CapabilitiesSection` (in HomePage.jsx); add CSS.

**Interfaces:**
- Produces: `CapabilityPreviewCard({ title, body, outcome })`.

- [ ] **Step 1: Create `src/components/CapabilityPreviewCard.jsx`**

```jsx
import React from 'react';

const CapabilityPreviewCard = ({ title, body, outcome }) => (
  <div className="m-pillar">
    <div className="m-pillar-rule"></div>
    <h3 className="m-pillar-title">{title}</h3>
    <p className="m-pillar-body">{body}</p>
    <p className="m-cap-outcome">{outcome}</p>
  </div>
);

export default CapabilityPreviewCard;
```

- [ ] **Step 2: Add CSS** to `styles.css` (near the pillar rules):

```css
.m-cap-outcome {
  font-family: 'Lora', Georgia, serif; font-style: italic;
  font-size: 15px; line-height: 1.5; color: var(--m-ink-mute);
  margin: 4px 0 0; padding-top: 12px; border-top: 1px solid var(--m-rule);
}
.m-cap-bridge {
  font-family: 'Manrope', sans-serif; font-size: 16px; line-height: 1.6;
  color: var(--m-ink-2); max-width: 720px; margin: 48px 0 0;
}
.m-cap-bridge a { color: var(--m-teal); font-weight: 600; text-decoration: none; }
.m-cap-bridge a:hover { text-decoration: underline; }
```

- [ ] **Step 3: Rewrite `CapabilitiesSection`** to use the cards. Exact copy:

```jsx
import CapabilityPreviewCard from '../components/CapabilityPreviewCard.jsx';

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
```

- [ ] **Step 4: Build.** Expected: success.
- [ ] **Step 5: Smoke-check** — four cards render in the 4-up grid (2-up at ≤1080, 1-up at ≤880); bridge line + link to `/capabilities`; no em dashes.
- [ ] **Step 6: Commit** — `git commit -m "feat: replace capability pillars with outcome-led cards"`

---

## Task 5: Operating-model section ("How Curia works")

**Files:** Add an `OperatingModelSection` in HomePage.jsx; render it between capabilities and governance; add CSS if needed (reuse `m-pillars` 2x2 via `m-pillars-4` or a 4-col grid).

- [ ] **Step 1: Add the component**

```jsx
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
```

- [ ] **Step 2: Render it** in `HomePage` between `<CapabilitiesSection/>` and `<GovernanceSection/>`. Do NOT add it to the nav.
- [ ] **Step 3: Build.** Expected: success.
- [ ] **Step 4: Smoke-check** — section renders with four elements; not in nav; anchors elsewhere unaffected.
- [ ] **Step 5: Commit** — `git commit -m "feat: add operating-model section"`

---

## Task 6: Deployed-desks section (extensibility framing)

Lead with extensibility: three desks one CEO built for his own life, proving you can build your own. NOT stock features.

**Files:** Create `src/components/OfficeDeskCard.jsx`; add `DeployedDesksSection` in HomePage.jsx; CSS.

**Interfaces:**
- Produces: `OfficeDeskCard({ title, body })`.

- [ ] **Step 1: Create `src/components/OfficeDeskCard.jsx`**

```jsx
import React from 'react';

const OfficeDeskCard = ({ title, body }) => (
  <div className="m-desk-card">
    <h3 className="m-desk-title">{title}</h3>
    <p className="m-pillar-body">{body}</p>
  </div>
);

export default OfficeDeskCard;
```

- [ ] **Step 2: Add CSS**

```css
.m-desk-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.m-desk-card {
  display: flex; flex-direction: column; gap: 10px;
  padding: 28px; background: var(--m-bg-alt);
  border: 1px solid var(--m-rule); border-radius: 6px;
}
.m-desk-title { font-family: 'Lora', Georgia, serif; font-weight: 500; font-size: 20px; line-height: 1.25; margin: 0; }
.m-desk-note {
  font-family: 'Manrope', sans-serif; font-size: 14px; line-height: 1.6;
  color: var(--m-ink-mute); max-width: 720px; margin: 40px 0 0;
}
@media (max-width: 1080px) { .m-desk-grid { grid-template-columns: 1fr; gap: 24px; } }
```

- [ ] **Step 3: Add the section** (extensibility-first copy):

```jsx
import OfficeDeskCard from '../components/OfficeDeskCard.jsx';

const DeployedDesksSection = () => {
  const desks = [
    { title: 'Editorial research and writing pitches', body: 'Monitors subjects relevant to the CEO’s writing, researches new developments, compares them with previous work, and presents pitches with a timely angle, central argument, supporting evidence, and recommended format.' },
    { title: 'Expense and receipt organization', body: 'Watches for receipts, extracts vendor, date, amount, and category, identifies duplicates or missing information, and prepares ambiguous items for review.' },
    { title: 'Social monitoring and engagement triage', body: 'Watches a social account for replies, mentions, and new activity, filters low-value noise, surfaces the conversations where the CEO’s attention could matter, and can unfollow accounts that drift off-topic (always reported back, so it is reversible).' },
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
```

- [ ] **Step 4: Render** `<DeployedDesksSection/>` between operating-model and governance.
- [ ] **Step 5: Build.** Expected: success.
- [ ] **Step 6: Smoke-check** — three desk cards; copy leads with extensibility and explicitly says "not stock features"; CTA → `/capabilities#deployed-desks`; no em dashes.
- [ ] **Step 7: Commit** — `git commit -m "feat: add deployed-desks section framed around extensibility"`

---

## Task 7: Governance corrections (autonomy ladder, audit trace, claims)

Apply Appendix A corrections to `GovernanceSection` in HomePage.jsx.

**Files:** Modify `GovernanceSection`.

- [ ] **Step 1: Replace the `bands` array** with the real five bands (low→high, default-select "Spot-check"):

```jsx
const bands = [
  { num: '<60', name: 'Restricted',        desc: 'Options and analysis only. No independent action; every external effect needs explicit instruction.' },
  { num: '60',  name: 'Draft Only',        desc: 'Prepares drafts, plans, and analysis. Never sends or acts without a direct go-ahead.' },
  { num: '70',  name: 'Approval Required', desc: 'Routine reads proceed; any consequential action is planned and brought for confirmation first.' },
  { num: '80',  name: 'Spot-check',        desc: 'Acts on routine work; notes consequential actions in its reply so you keep visibility.' },
  { num: '90',  name: 'Full',              desc: 'Acts independently; flags only genuinely novel, irreversible, or high-stakes actions.' },
];
const [active, setActive] = useState(3); // Spot-check
```

- [ ] **Step 2: Fix the three trust cards.** Replace the card 02 (audit) and card 03 (autonomy) bodies:

Card 02 body (drop "signed exports", fix prompt/output → fingerprints):
```
Append-only audit log. Every action recorded, nothing deleted. Causal tracing from any outcome back through the full decision chain. Every event is logged before it is delivered (a write-ahead guarantee). Each entry carries the timestamp, the actor, the model, and SHA-256 fingerprints of the prompt and response. Secrets never touch the LLM; only skills hold credentials, and every access is logged by name, never by value.
```

Card 03 body (fix error budgets; keep intent-drift):
```
You set the band, from "draft only" to "act independently." Five behavioural levels with clear, predictable boundaries. Intent-drift detection pauses the office when a task wanders from its original intent. Error budgets cap the number of LLM turns and consecutive errors per task. No infinite loops.
```

- [ ] **Step 3: Replace the audit trace** (`m-audit` block) with real event names from Appendix A:

```jsx
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
```

- [ ] **Step 4: Verify the autonomy-ladder intro copy** still reads correctly with the new bands (the existing "literal slider" paragraph stays; it remains accurate). The active-band label uses `bands[active].name` / `.num` and now shows score "80" — confirm the `m-ladder-num` column still fits (it does: 60px column).

- [ ] **Step 5: Build.** Expected: success.
- [ ] **Step 6: Smoke-check** — ladder shows Restricted/Draft Only/Approval Required/Spot-check/Full with scores <60/60/70/80/90; clicking rows updates the active band; audit trace uses the real event names; "signed exports" no longer appears anywhere; no em dashes (note "behavioural" is fine; ensure no — between clauses).
- [ ] **Step 7: Commit** — `git commit -m "fix: correct autonomy ladder, audit trace, and governance claims to match shipped product"`

---

## Task 8: Get-started repositioning + Node 24 fix

**Files:** Modify `GetStartedSection` in HomePage.jsx.

- [ ] **Step 1: Update the section title + lede.** Title → `Run your own Curia office.` Lede →
```
Curia is open source and single-tenant. Review the code, deploy it on infrastructure you control, and extend it with your own desks and skills.
```

- [ ] **Step 2: CTAs** — keep three: View on GitHub, Read the quickstart, Read the documentation (`https://docs.meetcuria.com`). Add the docs link as a third ghost CTA next to the quickstart.

- [ ] **Step 3: Fix the prereqs block** — change `node` row value from `≥ 22` to `≥ 24`. Keep the rest (docker → Postgres + pgvector, pnpm, Anthropic API key). Keep the two `$` command lines. (Joseph wants the small technical prereq block kept for technical-CEO targeting.)

- [ ] **Step 4: Build.** Expected: success.
- [ ] **Step 5: Smoke-check** — new title/lede; three CTAs; Node shows ≥ 24; prereq block still present and styled.
- [ ] **Step 6: Commit** — `git commit -m "feat: reposition get-started; correct Node version to 24"`

---

## Task 9: FAQ desk-metaphor pass

**Files:** Modify `FaqSection` in HomePage.jsx.

- [ ] **Step 1: Update the `faqs` array.** Keep "Is Curia really open source?", "Where does Curia run?", "How does the audit trail work?", "Will the API surface change?", "What does it cost to run?". Apply these edits:

- "Who is Curia for?" →
```
Curia is designed for experienced CEOs, founders, and principals whose work is buried across email, calendar, relationships, research, and recurring follow-through. It is especially useful for leaders who know what a strong executive office should do and want more continuity, control, and institutional memory.
```
- "Can I add my own agents and skills?" → rename question to "Can I add my own desks?" and answer:
```
Yes. A Curia desk is a specialist agent with a defined mandate, selected tools, scoped memory, permissions, and an optional schedule. You can add new desks without granting every agent access to everything. Curia ships with 90+ built-in skills, and it speaks the Model Context Protocol (MCP), so external tools wire straight in.
```
- "How does the audit trail work?" → align with Task 7 (drop signed exports; fingerprints not raw):
```
Every action (read, draft, send, decision) is recorded with a timestamp, the actor, the model, and SHA-256 fingerprints of the prompt and response. Append-only Postgres with causal tracing across every event. Secrets never touch the LLM; only skills hold credentials, and every access is logged.
```
- Add new FAQ "Is Curia an executive assistant replacement?":
```
Curia can own many persistent responsibilities normally handled by an executive assistant or chief of staff, but it is not a person and should not be described as one. It is strongest when given clear standing mandates, connected tools, explicit permissions, and defined escalation rules.
```
- "Where does Curia run?" → keep, but ensure data-residency honesty (LLM API calls send selected context to your configured model provider). Adjust the last sentence to:
```
It is a single-tenant, self-hosted deployment: you hold the keys, and your data stays on your infrastructure, apart from the context Curia sends to the model provider you configure.
```

- [ ] **Step 2: Build.** Expected: success.
- [ ] **Step 3: Smoke-check** — FAQ rows expand/collapse; new "EA replacement?" question present; no "signed exports"; no em dashes.
- [ ] **Step 4: Commit** — `git commit -m "feat: update FAQ to desk metaphor and corrected claims"`

---

## Task 10: `/capabilities` page — eight responsibilities

Build the detailed page content with the reusable `CapabilityDetail` component.

**Files:** Create `src/components/CapabilityDetail.jsx`; build out `src/pages/CapabilitiesPage.jsx`; CSS.

**Interfaces:**
- Produces: `CapabilityDetail({ heading, description, sequence, makesItWork, bringsYouIn, result })` where `description` is a string or array of strings (paragraphs), `sequence`/`makesItWork`/`bringsYouIn` are string arrays, `result` a string.

- [ ] **Step 1: Create `src/components/CapabilityDetail.jsx`**

```jsx
import React from 'react';

const toParas = (d) => (Array.isArray(d) ? d : [d]);

const CapabilityDetail = ({ heading, description, sequence, makesItWork, bringsYouIn, result }) => (
  <article className="m-capdetail">
    <h3 className="m-capdetail-h">{heading}</h3>
    {toParas(description).map((p, i) => <p className="m-pillar-body" key={i}>{p}</p>)}
    {sequence && (
      <ol className="m-capdetail-seq">
        {sequence.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
    )}
    <div className="m-capdetail-cols">
      <div>
        <div className="m-capdetail-label">What makes it work</div>
        <ul className="m-capdetail-list">{makesItWork.map((m, i) => <li key={i}>{m}</li>)}</ul>
      </div>
      <div>
        <div className="m-capdetail-label">Where Curia brings you in</div>
        <ul className="m-capdetail-list">{bringsYouIn.map((m, i) => <li key={i}>{m}</li>)}</ul>
      </div>
    </div>
    <p className="m-capdetail-result">{result}</p>
  </article>
);

export default CapabilityDetail;
```

- [ ] **Step 2: Add CSS**

```css
.m-capgroup-label {
  font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 12px;
  text-transform: uppercase; letter-spacing: 0.16em; color: var(--m-teal);
  margin: 72px 0 28px; padding-bottom: 12px; border-bottom: 1px solid var(--m-rule);
}
.m-capgroup-label:first-of-type { margin-top: 0; }
.m-capdetail { max-width: 820px; margin: 0 0 56px; }
.m-capdetail-h { font-family: 'Lora', Georgia, serif; font-weight: 500; font-size: 26px; line-height: 1.2; margin: 0 0 16px; }
.m-capdetail-seq { font-family: 'Manrope', sans-serif; font-size: 15px; line-height: 1.6; color: var(--m-ink-2); margin: 16px 0; padding-left: 22px; }
.m-capdetail-seq li { margin-bottom: 6px; }
.m-capdetail-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 24px 0; }
.m-capdetail-label { font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--m-ink-mute); margin-bottom: 12px; }
.m-capdetail-list { list-style: none; padding: 0; margin: 0; font-family: 'Manrope', sans-serif; font-size: 14px; line-height: 1.5; color: var(--m-ink-2); }
.m-capdetail-list li { padding: 7px 0; border-top: 1px solid var(--m-rule); }
.m-capdetail-list li:first-child { border-top: none; padding-top: 0; }
.m-capdetail-result {
  font-family: 'Lora', Georgia, serif; font-style: italic; font-size: 18px; line-height: 1.5;
  color: var(--m-ink); margin: 20px 0 0; border-left: 1px solid var(--m-ink); padding-left: 22px;
}
@media (max-width: 880px) { .m-capdetail-cols { grid-template-columns: 1fr; gap: 24px; } }
```

- [ ] **Step 3: Build the page body.** Replace `CapabilitiesPage` with the intro + four group labels + eight `CapabilityDetail` blocks. Use this data (copy verbatim from the brief, accuracy-corrected). Define a `GROUPS` array and render:

```jsx
import CapabilityDetail from '../components/CapabilityDetail.jsx';
```

Intro block (after `<MarketingHeader home={false}/>`, inside `<main className="m-section">`):
```jsx
<div className="m-section-eyebrow">Capabilities</div>
<h1 className="m-section-title" style={{ marginBottom: 24 }}>What Curia can take off your plate</h1>
<p className="m-hero-lede" style={{ marginBottom: 12 }}>Give Curia responsibility, not just prompts.</p>
<p className="m-pillar-body" style={{ maxWidth: 720, marginBottom: 64 }}>
  Curia&rsquo;s specialist desks can watch systems, preserve context, move routine
  work forward, and bring you the decisions that require judgment. Each responsibility
  below explains what Curia does, what makes it work, and where it brings you in.
</p>
```

The eight responsibilities, grouped. **Render a `<div className="m-capgroup-label">` before each group**, then the group's `CapabilityDetail`s:

Group "Protect your attention":
1. **Check your inbox once a day**
   - description: ["Curia checks your inbox around the clock, every 15 minutes.", "It classifies new messages, separates routine mail from items requiring action, drafts replies, and turns unresolved requests into tracked work. When something appears genuinely urgent, Curia alerts you through Signal rather than waiting for your next inbox review.", "Routine actions can require approval at first, then become automatic within explicitly approved lanes."]
   - makesItWork: ["CEO Inbox agent", "Email search, reading, labelling, drafting, and sending tools", "Contact identities and prior sender context", "Stored preferences and past instructions", "Task backlog for unresolved work", "Signal for urgent escalation", "Approval and autonomy rules"]
   - bringsYouIn: ["Ambiguous urgency", "Sensitive or high-impact replies", "Requests outside approved authority", "Conflicting instructions", "Unverified or suspicious senders", "Repeated failures"]
   - result: "Process your inbox deliberately once or twice a day without trusting luck to surface the important message."
2. **Know exactly what is still open**
   - description: ["Curia maintains a durable backlog of the work surrounding you.", "It distinguishes work Curia owns, work waiting for you, work waiting for someone else, work intentionally deferred, work that has stalled, and work that hit an error. At any time you can ask what is waiting on you, what you are waiting on from others, what has gone quiet, and what Curia finished this week.", "Longer-running work retains its progress between sessions and after system restarts."]
   - makesItWork: ["Goals and persistent tasks", "Explicit task ownership", "Status and progress records", "Scheduled wake-ups for deferred work", "Meeting, email, and message context", "Error tracking and suspension", "Restart-safe state in Postgres"]
   - bringsYouIn: ["Missing ownership", "A task that requires a CEO decision", "A stalled external dependency", "Repeated failure", "Intent drift", "Conflicting priorities"]
   - result: "One coherent view of your open loops instead of reconstructing it from email, calendar entries, notes, and memory."

Group "Protect your time":
3. **Stop negotiating meeting times**
   - description: ["Curia handles the administrative work between “we should meet” and a confirmed calendar event.", "It checks availability, working hours, existing commitments, contact identities, and time zones. It proposes viable times, drafts or sends the scheduling messages, and creates or updates the event once a time is agreed."]
   - makesItWork: ["Calendar Specialist", "Calendar read and write tools", "Email drafting and sending tools", "Stored scheduling preferences", "Time-zone context", "Contact identity resolution", "Approval rules for external communication"]
   - bringsYouIn: ["Two important meetings genuinely conflict", "The purpose of the meeting is unclear", "An attendee is not verified", "A proposed time violates protected preferences", "Rescheduling could damage a relationship", "External communication is outside the approved lane"]
   - result: "Stop spending five messages arranging a 20-minute call while keeping control over meetings that actually compete for your time."
4. **Tell Curia once and trust that it keeps happening**
   - description: ["Curia can maintain standing orders that continue without you restating them: check for investor emails every Monday, review stalled commitments every Friday, begin board prep six weeks out, alert you when a specific person emails, track promises made by a date, or surface people to see when you travel to a city.", "These are not reminders that disappear when a chat closes. Scheduled work and progress are stored durably, recurring jobs continue after restarts, and repeated failures are surfaced instead of silently ignored.", "A standing order can also apply judgment. “When I travel to New York, suggest people to see” can weigh location, relationship importance, contact recency, open conversations, and the shape of the trip before presenting a shortlist."]
   - makesItWork: ["Persistent scheduled jobs", "Calendar and event monitoring", "Contact and relationship memory", "Saved task state", "Original intent anchor", "Failure counting and suspension", "Alert-channel escalation"]
   - bringsYouIn: ["The rule becomes ambiguous", "Required data is unavailable", "The output would trigger a sensitive external action", "The original instruction conflicts with newer preferences", "The job repeatedly fails", "The task appears to have drifted from its original intent"]
   - result: "Establish an operating rule once and rely on Curia to keep carrying it out months later."

Group "Protect your context":
5. **Walk into every important meeting prepared**
   - description: ["Before an important meeting, Curia prepares a concise briefing on the people, organizations, and subjects involved.", "It can combine the calendar invitation and attendee list, previous emails and meetings, facts and relationship history stored privately in Curia, outstanding commitments in either direction, relevant documents, recent developments, and focused web research. The briefing answers who you are meeting, how you know each other, what you have discussed, what they care about, what has changed, what you owe one another, and what you should ask."]
   - makesItWork: ["Contact Specialist", "Research Analyst", "Calendar and email history", "Contact identity resolution", "Private knowledge graph", "Source and freshness metadata", "Current external research"]
   - bringsYouIn: ["Conflicting identity records", "Weak or stale relationship data", "Research sources disagree", "Sensitive information may not be appropriate for the briefing", "A fact has low confidence", "The meeting purpose is unclear"]
   - result: "Arrive with both current research and your own private relationship context."
6. **Remember everyone without updating a CRM**
   - description: ["Curia maintains private relationship memory as work happens.", "It resolves people across email addresses, calendar invitations, messaging accounts, companies, and roles. It captures useful facts from meetings and correspondence, links related people and organizations, and detects duplicate or conflicting records. It can preserve how you met, who introduced you, their role and organization, what they care about, your last meaningful interaction, important personal details, open commitments, and shared relationships.", "This is not another CRM requiring constant manual updates. The record develops through the work Curia is already helping perform."]
   - makesItWork: ["Contact and identity resolution", "Email participants", "Calendar attendees", "Structured entity memory", "Knowledge-graph relationships", "Source attribution", "Confidence and freshness metadata", "Deduplication and contradiction checks"]
   - bringsYouIn: ["Two records may represent the same person", "A new identity is self-claimed", "Facts conflict at similar confidence", "Sensitive information should not be stored automatically", "A contact’s role or permissions are unclear"]
   - result: "Ask “What do I know about this person?” and get an answer grounded in your own private history, not just a web search."

Group "Move work forward":
7. **Never lose a meeting follow-up**
   - description: ["After a designated meeting ends, Curia asks for your takeaways while the conversation is still fresh.", "You can reply naturally: “Send Sarah the report, research the question about Quebec, and remind me to reconnect in September.” Curia separates that response into the appropriate work. It can draft the email, create the research assignment, schedule the reminder, update the contact record, and add unresolved items to the task backlog."]
   - makesItWork: ["Meeting Debrief agent", "Calendar events and attendee information", "Email drafting tools", "Research delegation", "Contact and relationship memory", "Task system", "Scheduler", "Coordinator delegation"]
   - bringsYouIn: ["Your note is ambiguous", "A follow-up requires external authority Curia does not have", "A remembered fact is sensitive or uncertain", "A deadline is missing", "A commitment conflicts with an existing one"]
   - result: "A useful conversation does not depend on you remembering, hours later, to update five different systems."
8. **Hand off a project, not just a prompt**
   - description: ["Curia can own work that takes multiple steps or unfolds over days: research three expansion markets and recommend one, coordinate prep for a quarterly planning session, collect missing inputs for a board package, work through a neglected inbox, monitor a competitor, or prepare a recurring weekly operating brief.", "Curia breaks the objective into work, delegates to the appropriate specialist desks, saves progress, and resumes later. The original objective stays attached so the work does not gradually drift into something else."]
   - makesItWork: ["Persistent tasks", "Saved progress", "Intent anchors", "Specialist agents", "Shared working memory", "Scheduled work sessions", "Permission boundaries", "Error budgets", "Audit trail"]
   - bringsYouIn: ["A decision changes the project direction", "A task requires external authorization", "Important information is missing", "Priorities conflict", "The task reaches a budget or error limit", "Intent drift is detected"]
   - result: "Delegate an outcome instead of manually driving every intermediate step."

- [ ] **Step 4: Build.** Expected: success.
- [ ] **Step 5: Smoke-check** — `/capabilities` shows intro, four group labels, eight detail blocks each with sequence/two columns/result; two-column block collapses to one at ≤880; header/footer anchors work; tab title is the capabilities title; no em dashes.
- [ ] **Step 6: Commit** — `git commit -m "feat: build /capabilities page with eight responsibilities"`

---

## Task 11: Capabilities deployed-desks + add-another-desk + evidence placeholders

**Files:** Create `src/components/EvidencePlaceholder.jsx`; append sections to `CapabilitiesPage`; CSS.

**Interfaces:**
- Produces: `EvidencePlaceholder({ caption })`.

- [ ] **Step 1: Create `src/components/EvidencePlaceholder.jsx`**

```jsx
import React from 'react';

// Styled slot for a sanitized screenshot to be dropped in later (Phase 3).
// Intentional placeholder — looks deliberate, not broken. Swap the inner
// content for an <img> when the real capture exists.
const EvidencePlaceholder = ({ caption }) => (
  <figure className="m-evidence-ph">
    <div className="m-evidence-ph-box">
      <span className="m-evidence-ph-tag">Screenshot to come</span>
    </div>
    <figcaption className="m-evidence-ph-cap">{caption}</figcaption>
  </figure>
);

export default EvidencePlaceholder;
```

- [ ] **Step 2: Add CSS**

```css
.m-evidence-ph { margin: 0 0 32px; }
.m-evidence-ph-box {
  display: flex; align-items: center; justify-content: center;
  min-height: 200px; background: var(--m-bg-alt);
  border: 1px dashed var(--m-rule); border-radius: 6px;
}
.m-evidence-ph-tag {
  font-family: 'JetBrains Mono', monospace; font-size: 12px;
  letter-spacing: 0.06em; color: var(--m-ink-mute);
}
.m-evidence-ph-cap {
  font-family: 'Manrope', sans-serif; font-size: 13px; line-height: 1.5;
  color: var(--m-ink-mute); margin: 10px 0 0;
}
.m-adddesk { max-width: 820px; }
.m-adddesk-list { font-family: 'Manrope', sans-serif; font-size: 15px; line-height: 1.6; color: var(--m-ink-2); margin: 16px 0 24px; padding-left: 22px; }
.m-adddesk-list li { margin-bottom: 6px; }
```

- [ ] **Step 3: Append the deployed-desks section** to `CapabilitiesPage` (inside the page, new `<section>` with `id="deployed-desks"` so the `#deployed-desks` anchor lands here). Reuse `OfficeDeskCard` with fuller copy and the same extensibility framing as the homepage. Intro:
```
These are not hypothetical use cases. They are responsibilities one CEO added to a live Curia office by defining a mandate, selecting tools, setting a schedule, scoping memory, and writing explicit operating instructions. The point is not the specific desks. It is that you can build the desks your own work needs.
```
Three fuller desk descriptions (editorial, expense, social) per the brief's "Deployed Desks Section" copy, accuracy-corrected (social = "a social account", no multi-platform claim). Add one `EvidencePlaceholder` with caption: `Sanitized scheduled-job history from a live Curia office. Replace with real capture.`

- [ ] **Step 4: Append "Add another desk" section**:
```jsx
<section className="m-section" id="add-a-desk">
  <div className="m-container m-adddesk">
    <div className="m-section-eyebrow">Extend</div>
    <h2 className="m-section-title">Add another desk</h2>
    <p className="m-pillar-body">
      A Curia desk is a specialist agent with a defined mandate, selected tools,
      scoped memory, a schedule when needed, and explicit permissions. Adding a desk
      expands the office without granting every agent access to everything.
    </p>
    <ul className="m-adddesk-list">
      <li>Define the responsibility</li>
      <li>Select the tools it may use</li>
      <li>Limit the memory it can access</li>
      <li>Set its schedule or triggers</li>
      <li>Choose which actions require approval</li>
      <li>Record every action in the audit trail</li>
    </ul>
    <p className="m-pillar-body">
      A travel desk that surfaces who to see when you visit a city, a diligence
      desk, a hiring-pipeline desk: the same framework builds them all.
    </p>
    <div className="m-hero-actions">
      <a className="m-cta" href="https://docs.meetcuria.com">Read the agent-building documentation</a>
    </div>
  </div>
</section>
```
(Travel relationship planning appears here as an *example you could build*, satisfying the "dropped as a deployed desk" decision.)

- [ ] **Step 5: Build.** Expected: success.
- [ ] **Step 6: Smoke-check** — `/capabilities#deployed-desks` scrolls to the desks section; three fuller desk cards; evidence placeholder renders as a deliberate dashed box with caption; add-a-desk section with bullets + docs CTA; travel named only as an example; no em dashes.
- [ ] **Step 7: Commit** — `git commit -m "feat: add capabilities deployed-desks, add-a-desk, and evidence placeholder"`

---

## Task 12: Footer links + final verification

**Files:** Modify `src/components/MarketingFooter.jsx`; whole-site verification.

- [ ] **Step 1: Update footer Product column** — point "Capabilities" to `/capabilities` (page, not anchor); keep Governance/Get started as `/#…` (footer renders on all pages, so always use the `/#` form for homepage anchors there, OR keep the existing `home`-aware logic). Keep FAQ link. Keep license/privacy/security fine print.

```jsx
<a href="/capabilities">Capabilities</a>
<a href={home ? '#governance' : '/#governance'}>Governance</a>
<a href={home ? '#get-started' : '/#get-started'}>Get started</a>
```

- [ ] **Step 2: Build.** Expected: success.

- [ ] **Step 3: Full link/anchor audit** (dev server). From `/`, `/capabilities`, `/privacy`, click every nav + footer link and confirm:
  - Capabilities → `/capabilities` from all three pages.
  - Governance / Get started anchors land on the homepage sections from `/capabilities` and `/privacy`.
  - Documentation, GitHub, quickstart, docs, calendly external links present.
  - `/capabilities#deployed-desks` and the homepage "See how the office works" CTA both land on the desks section.

- [ ] **Step 4: Responsive check** — resize to ~1280, ~960, ~520. Confirm capability cards (4→2→1), desk grid (3→1), capability-detail two-column (2→1), nav hides at ≤560, no overflow.

- [ ] **Step 5: Console check** — no errors/warnings on any of the three routes.

- [ ] **Step 6: Copy audit** — grep the built/source for stray em dashes in prose and for removed claims:
```bash
grep -rn "—" /Users/josephfung/Projects/office-of-the-ceo/worktrees/curia-website-messaging-ia/src
grep -rni "superhuman\|signed export\|node.*22\|Observe\|Stage\b" /Users/josephfung/Projects/office-of-the-ceo/worktrees/curia-website-messaging-ia/src
```
Expected: the only `—` hits are the brand `<title>` treatment (acceptable) and none in prose; no "superhuman", "signed export", "node ≥ 22", or stale autonomy band names ("Observe"/"Stage").

- [ ] **Step 7: Commit** — `git commit -m "feat: update footer links; final link/responsive/copy audit"`

---

## Task 13: Pre-PR review + PR

- [ ] **Step 1: Run review subagents in parallel** (per global workflow): `pr-review-toolkit:code-reviewer` (branch diff vs `main`) and `pr-review-toolkit:silent-failure-hunter`. Address any high-priority findings. (No auth/credentials/encryption touched, so no security review needed.)
- [ ] **Step 2: Final build** — `npm --prefix <worktree> run build`. Expected: success.
- [ ] **Step 3: Push branch** — `git -C <worktree> push -u origin feat/website-messaging-ia`
- [ ] **Step 4: Create PR** with `gh pr create`, body summarizing: hero/IA reframe, `/capabilities` page, extensibility-framed deployed desks, and the credibility corrections (autonomy ladder, audit trace, signed-exports removed, fingerprints, error budgets, Node 24). No Claude attribution.
- [ ] **Step 5: Confirm CI** — `gh run list --branch feat/website-messaging-ia --limit 1`; report PR URL + CI status. Do NOT merge without explicit approval.

---

## Self-Review (completed against spec)

- **Spec coverage:** Navigation (T2,T12), hero (T3), capability cards (T4), operating model (T5), deployed desks/extensibility (T6,T11), governance corrections incl. autonomy ladder + audit trace + claims (T7), get-started + Node 24 (T8), FAQ (T9), `/capabilities` eight responsibilities (T10), deployed-desks + add-a-desk + evidence placeholders (T11), metadata (T2 + index.html), component extraction (T1). All Appendix A corrections mapped to T7/T8/T9. ✓
- **Placeholder scan:** No TBD/TODO/"handle edge cases". Evidence placeholders are an intentional, specified deliverable, not a plan gap. ✓
- **Type consistency:** Component prop names (`CapabilityPreviewCard{title,body,outcome}`, `OfficeDeskCard{title,body}`, `CapabilityDetail{heading,description,sequence,makesItWork,bringsYouIn,result}`, `EvidencePlaceholder{caption}`, `useRouteMetadata(path)`) are used consistently across tasks. ✓
