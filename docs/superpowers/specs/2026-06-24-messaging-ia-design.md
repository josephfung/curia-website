# meetcuria.com — Messaging & Information Architecture Update

**Date:** 2026-06-24
**Branch:** `feat/website-messaging-ia`
**Repo:** curia-website (Vite + React SPA, Cloudflare Pages)

## Goal

Reframe the site so it explains Curia through the responsibilities it takes off a
CEO's plate, not through abstract capability categories. Preserve the existing
visual language entirely (Manrope/Lora/JetBrains Mono, the `--m-*` palette, the
dark governance band, the `m-` class system). This is a copy + IA + small-component
change, **not** a redesign.

Implementation follows the detailed brief (`curia-website-implementation-brief.md`),
**as amended by the decisions below.** Where the brief and these decisions conflict,
these decisions win.

## Decisions (locked with Joseph)

1. **Scope:** Do the full Phase 1 (structure + copy) and Phase 2 (credibility
   verification) now, in one branch. For Phase 3 evidence artifacts (sanitized
   screenshots), add styled **placeholder slots** with a visible caption describing
   exactly what capture belongs there. Joseph supplies the real images later without
   layout changes.

2. **Deployed-desks framing — THE key reframe:** The "Running today" section is
   about **extensibility**, not a feature list. The three desks are *illustrative
   examples* proving the extensibility is real — "here is what one CEO built for his
   own life; yours would be different." They are explicitly **not** three
   out-of-the-box features. Copy must make the built-in-core vs. you-build-this
   distinction unmistakable, and the section must lead with the extensibility idea.

3. **Travel desk dropped.** It is not deployed (no agent exists). Only three real
   desks ship in this section: editorial, expense, social. Travel relationship
   planning appears only as an *example you could build* in the "Add another desk"
   section.

4. **Accuracy:** Correct any copy that contradicts the shipped product. Drop claims
   that cannot be substantiated against the code. See the verified-facts appendix.

5. **Audit trace:** Rebuilt from real bus event names (appendix).

## Architecture

- **Routing.** Keep the existing tiny path-based router in `src/App.jsx`
  (`window.location.pathname` → page). Add a `/capabilities` branch alongside
  `/privacy`. Do **not** add React Router. Do **not** add a `_redirects` file (the
  Cloudflare Pages SPA fallback + no-`_redirects` behavior was deliberately
  debugged; preserve it). Trailing-slash normalization stays.

- **Component extraction.** `App.jsx` is one file today. Extract shared and reusable
  pieces so the new page and homepage share them. Target file layout:
  - `src/components/MarketingHeader.jsx`
  - `src/components/MarketingFooter.jsx`
  - `src/components/SectionHeader.jsx` (eyebrow + title + optional lede)
  - `src/components/CapabilityPreviewCard.jsx` (homepage 4-up card)
  - `src/components/CapabilityDetail.jsx` (the 6-part capability block on /capabilities)
  - `src/components/OfficeDeskCard.jsx` (deployed-desk card, used both pages)
  - `src/components/EvidencePlaceholder.jsx` (captioned slot for future screenshots)
  - `src/pages/HomePage.jsx`, `src/pages/CapabilitiesPage.jsx`, `src/pages/PrivacyPage.jsx`
  - `src/App.jsx` becomes the router + per-route metadata effect.
  - Section components (Hero, Capabilities preview, OperatingModel, DeployedDesks,
    Governance, GetStarted, FAQ) live under `src/sections/` or inside the page files —
    implementer's call, but keep files focused.
  Keep the `home` prop pattern already used by header/footer for anchor resolution
  (local `#x` on the homepage, `/#x` elsewhere).

- **Per-route metadata.** `index.html` holds the homepage defaults. Add a small
  effect in `App` (or a `useRouteMetadata` helper) that sets `document.title`, the
  meta description, and OG title/description per route. Capabilities page gets its
  own title/description/OG (see Metadata section).

- **CSS.** Add new classes following the `m-` convention in `styles.css`. Reuse
  existing primitives (`m-section`, `m-pillars`, `m-pillar-*`, `m-audit`,
  `m-ladder`, etc.) wherever possible. New components needed:
  capability-detail block, deployed-desk card, evidence placeholder, the
  capabilities-page group headers, and an "add a desk" block. Keep responsive
  breakpoints (1080 / 880 / 560) working.

## Navigation

Primary nav: **Capabilities** (→ `/capabilities`), **Governance** (→ `/#governance`),
**Get started** (→ `/#get-started`). Header actions unchanged: Documentation, View
on GitHub. No "Work" label. No "How it works" in nav. Shared header/footer must
resolve anchors correctly from `/`, `/capabilities`, and `/privacy`.

## Homepage section order

Header → Hero → 4 capability cards → Operating model → Deployed desks (extensibility)
→ Governance → Get started → FAQ → Footer.

### Hero
- Eyebrow: "A persistent digital office for CEOs"
- Headline (keep two-line `<em>` treatment): "One point of contact." / *"An executive office behind it."*
- Lede: "Curia runs specialist desks for your inbox, calendar, meetings, relationships, research, and ongoing work. Each desk has a standing mandate, private memory, and clear rules for when to act and when to bring you in."
- Primary CTA: "Explore Curia's capabilities" → `/capabilities`. Secondary: "View on GitHub".
- Remove "superhuman speed." Don't lead with installation.

### Four capability cards (outcome-led, mechanism-specific)
Use `CapabilityPreviewCard`. Copy per brief: Check your inbox once a day · Stop
negotiating meeting times · Never lose a meeting follow-up · Walk into important
meetings prepared. Bridge line + "Explore all capabilities →" → `/capabilities`.
The inbox card must say **every 15 minutes** (accurate).

### Operating model — "How Curia works" (section label only)
Title "One office. Specialist desks behind it." Four elements: One Coordinator ·
Standing mandates · Shared context · Governed execution. CEO language, no bus/pubsub/YAML jargon.

### Deployed desks — extensibility (reframed)
- Eyebrow "Running today"; title "Already running in the founder's Curia office."
- **Lead with the extensibility point:** these are examples of desks one CEO added
  for his own working life — proof you can build your own, not a menu of stock
  features. Then the three real desks (short form), each accurately described:
  - **Editorial research & writing pitches** — monitors subjects, researches, scores
    ideas, presents pitches with argument/evidence/format; drafts outlines.
    (writing-scout + essay-editor)
  - **Expense & receipt organization** — extracts vendor/date/amount/category,
    dedupes, flags ambiguous items for review. (T2125-expense-tracker)
  - **Social monitoring & engagement triage** — watches a social account, filters
    low-value noise, surfaces interactions worth attention, can autonomously
    unfollow accounts that drift off-topic (reported back so it's reversible).
    (social-media; do NOT claim multi-platform or "moderation across all platforms".)
- Supporting line: each desk uses the same framework (mandate, tools, private
  memory, schedule, explicit limits). CTA "See how the office works →"
  → `/capabilities#deployed-desks`.

### Governance — credibility-critical (see appendix for exact corrections)
Keep the dark band, open-source card, autonomy ladder UI, pull-quote. Apply
appendix corrections to the three trust cards, the autonomy ladder, and the audit
trace.

### Get started
Repositioned as final path. Title "Run your own Curia office." Open-source +
single-tenant copy. CTAs: View on GitHub, Read the quickstart, Read the
documentation. De-emphasize prereqs to a small note; if the prereq block stays,
**Node ≥ 24** (not 22), Docker (Postgres + pgvector), pnpm, Anthropic API key.

### FAQ
Desk-metaphor pass. Keep: open source, where it runs, cost. Update "add your own
agents and skills" to desk language. Add "Is Curia an executive assistant
replacement?" Keep the "Where does Curia run?" data-residency wording honest (LLM
API calls do send selected context to the configured provider — don't imply nothing
ever leaves). Keep "Will the API surface change?" but ensure it reads as a stated
intention for v1.0.0, not a present guarantee (currently pre-alpha v0.37.0).

## `/capabilities` page

- Eyebrow "Capabilities"; title "What Curia can take off your plate"; intro "Give
  Curia responsibility, not just prompts." + supporting paragraph (per brief).
- Eight responsibilities (`CapabilityDetail`), four groups:
  - Protect your attention: (1) Check your inbox once a day · (2) Know exactly what is still open
  - Protect your time: (3) Stop negotiating meeting times · (4) Tell Curia once and trust that it keeps happening
  - Protect your context: (5) Walk into every important meeting prepared · (6) Remember everyone without updating a CRM
  - Move work forward: (7) Never lose a meeting follow-up · (8) Hand off a project, not just a prompt
- Each uses the same pattern: outcome heading → plain description → exact sequence →
  "What makes it work" → "Where Curia brings you in" → Result. Copy follows the brief;
  apply accuracy corrections (15-min cadence; drafts-not-auto-send; real escalation).
- `#deployed-desks` section: same extensibility framing, fuller descriptions of the
  three real desks.
- "Add another desk" section: a Curia desk = specialist agent with mandate, tools,
  scoped memory, optional schedule, explicit permissions. Bullets + CTA to the
  agent-building docs. Travel relationship planning may be named here as an example.
- Route-specific title/meta/OG.

## Evidence placeholders (Phase 3 deferred)

`EvidencePlaceholder` renders a styled box (reuse `m-audit`/`m-bg-alt` treatment)
with a short caption stating exactly what sanitized screenshot belongs there, e.g.
"Sanitized meeting briefing — replace with real capture." Add slots where the brief's
Phase 3 lists artifacts (meeting briefing, Signal escalation, meeting debrief,
relationship record, scheduled-job history, audit chain). The audit trace itself is
real text, not a placeholder. Placeholders must look intentional, not broken, and be
trivially swappable.

## Out of scope

- No redesign, no new fonts, no animation/illustration.
- Managed-practice section stays hidden (as today).
- No real screenshots this pass (placeholders only).
- No changes to the Curia product itself.

---

## Appendix A — Verified facts (source of truth for copy)

All verified against the curia / curia-deploy checkouts on 2026-06-24.

### Autonomy ladder (replaces the current wrong names/thresholds)
Source: `curia/src/autonomy/autonomy-service.ts`. Five bands, score-keyed:

| Score | Label | One-line (distilled from shipped BAND_DESCRIPTIONS) |
|------|-------|------|
| <60 | Restricted | Options and analysis only. No independent action; every external effect needs explicit instruction. |
| ≥60 | Draft Only | Prepares drafts, plans, and analysis. Never sends or acts without a direct go-ahead. |
| ≥70 | Approval Required | Routine reads proceed; any consequential action is planned and brought for confirmation first. |
| ≥80 | Spot-check | Acts on routine work; notes consequential actions in its reply so the CEO keeps visibility. |
| ≥90 | Full | Acts independently; flags only genuinely novel, irreversible, or high-stakes actions. |

Autonomy is set via `set-autonomy` / read via `get-autonomy`; every change is
recorded in an `autonomy_history` table; the band description is injected into the
coordinator's prompt on every task. Default-select a middle rung (Approval Required
or Spot-check) in the UI.

### Audit trace (real event names from `curia/src/bus/events.ts`)
Reconstruct the trace using these real event types and field conventions. Every
event carries `id`, `timestamp`, and `parentEventId` (the causal chain):

1. `inbound.message` — senderId, channelId, content
2. `contact.resolved` — contactId, displayName, verificationStatus (verified|unverified)
3. `llm.call` — agentId, actualModel, inputTokens/outputTokens, promptHash (SHA-256) — (classification)
4. `agent.task` — agentId (specialist), messageTrustScore — (coordinator delegates)
5. `human.decision` — decision (approve|deny|escalate|…), deciderChannel, subjectEventId — (urgency gate)
6. `outbound.delivered` — channel=signal, recipientId — (Signal alert)
7. `inbound.message` — (CEO reply)
8. `task.created` — taskId, owner, source — (or a draft saved)

Keep timestamps plausibly sequenced. This mirrors the brief's suggested workflow
using only real names.

### Governance claim corrections
- **Append-only audit log** — TRUE (DB trigger enforces it; only `acknowledged`
  false→true is allowed). Keep.
- **Write-ahead (logged before delivery)** — TRUE. Keep.
- **Causal tracing** — TRUE (`parentEventId` chain). Keep.
- **Secrets never touch the LLM; only skills hold credentials, every access logged**
  — TRUE (`secret.accessed` logs name only, never value). Keep.
- **"Exports are signed"** — UNSUBSTANTIATED for audit-log exports. **Remove.**
  (Only release artifacts are cosign-signed — different thing; don't conflate.)
- **"every action recorded with timestamp, actor, model, prompt, output"** —
  prompts/responses are stored as **SHA-256 fingerprints**, not raw, in the audit
  log. Reword to "timestamp, actor, model, and prompt/response fingerprints" (or
  similar). Don't claim raw prompt/output is in the audit log.
- **Error budgets "cap LLM rounds, spend, and consecutive errors"** — no spend cap
  exists. Real caps: **20 LLM turns**, **5 consecutive errors** (defaults). Reword to
  "cap LLM turns and consecutive errors — no infinite loops." Drop "spend."
- **Intent-drift detection** — TRUE; pauses a scheduled task when an LLM judge finds
  it has diverged from its original intent (fail-open on errors). Keep.

### Other verified facts
- **Skills:** 99 built-in (manifest + handler each). "90+" is true and safe — keep "90+".
- **Agents:** plain YAML in `agents/`. TRUE.
- **MCP:** real (`@modelcontextprotocol/sdk`). Keep.
- **License/deploy:** MIT; single-tenant self-hosted; Docker + Node ≥ 24; Postgres 16 + pgvector. TRUE.
- **CEO-inbox cadence:** `*/15 6-23 * * *` — every 15 min, 6am–11pm local. Drafts in
  Gmail; escalates urgent items (via coordinator/bullpen) to Signal. TRUE.
- **v1.0.0 API freeze:** stated intention only; currently pre-alpha v0.37.0. Frame as future.

### Core agent → capability map (for accurate /capabilities copy)
- **coordinator** — single point of contact; routes/delegates; daily 8am digest; hourly approval sweep.
- **ceo-inbox** — 15-min inbox triage (6 categories), drafts replies, Signal escalation.
- **calendar** — event CRUD, multi-party free-time, conflict detection, timezone-aware, scheduling emails.
- **meeting-debrief** — detects external meetings (7am/12pm/4pm), prompts at meeting end, splits the reply into drafts/tasks/calendar/KG facts/research.
- **contacts** — identity resolution, briefings, weekly dedup (Mon 9am) + grant scan (Wed 10am).
- **research-analyst** — web search/fetch, synthesis, stores facts for known entities, can request clarification mid-research.

### Deployed desk facts (the three real examples)
- **writing-scout** (Tue/Fri 8:30am Toronto) + **essay-editor** — monitors subjects,
  scores ideas on 5 dimensions against a threshold, creates Google Doc outlines;
  editor verifies citations, generates SEO + cover art, posts a Medium *draft* (never auto-publishes).
- **T2125-expense-tracker** (enrichment every 30 min 6am–6pm; monthly reconciliation
  1st 9am) — extracts vendor/date/amount/currency/GST-HST from receipts, dedupes,
  categorizes to CRA T2125 lines, FX lookup, flags ambiguous items for CEO.
- **social-media** (9am & 5pm) — Bluesky account; surfaces a digest of notable
  followers/mentions only when there's something to report; autonomously unfollows
  accounts whose posts are dominated by filtered topics; never posts without explicit
  instruction. Describe generically ("a social account"); no multi-platform claim.

## Metadata (per brief)
- Homepage title: "Curia — A Persistent Digital Office for CEOs"
- Homepage meta: "One point of contact backed by specialist desks for your inbox, calendar, meetings, relationships, research, and ongoing work. Open source and self-hosted."
- Homepage OG title: "Curia — An Executive Office Behind One Point of Contact"
- Homepage OG description: "Curia runs specialist desks with standing mandates, private memory, explicit permissions, and clear escalation rules."
- Capabilities title: "Curia Capabilities — What Curia Can Take Off Your Plate"
- Capabilities meta: "See how Curia handles inbox triage, scheduling, meeting follow-up, relationship memory, research, standing orders, and multi-step executive work."

## Acceptance criteria
Per the brief's Acceptance Criteria (Navigation / Homepage / Capabilities / Quality),
plus: autonomy ladder uses the real five bands; audit trace uses real event names;
"signed exports" removed; error-budget/spend and prompt/output claims corrected;
Node ≥ 24; deployed-desks section leads with extensibility and frames the three desks
as examples, not stock features; build passes; no console errors; existing privacy
page still works; design language preserved.
