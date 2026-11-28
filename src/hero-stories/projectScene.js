/** Fold revealed beats into the view each scene renders. */

function nameList(names) {
  if (names.length <= 1) return names[0] || ''
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`
}

function shownBeats(story, beatIndex) {
  const last = story.beats.length - 1
  const end = Math.min(last, Math.max(0, beatIndex))
  return story.beats.slice(0, end + 1)
}

function projectMail(story, beats) {
  const thread = {
    subject: '',
    snippet: '',
    time: '',
    participants: [],
    messages: [],
    expanded: false,
    unread: true,
  }
  let invite = null
  for (const beat of beats) {
    if (beat.incoming) {
      thread.subject = beat.incoming.subject
      thread.snippet = beat.incoming.snippet
      thread.time = beat.incoming.time
      thread.participants = [beat.incoming.from]
      thread.messages = [{ id: beat.id, from: beat.incoming.from, body: beat.incoming.body }]
      thread.unread = true
      thread.expanded = false
    }
    if (beat.message) {
      thread.messages.push({ id: beat.id, from: beat.message.from, body: beat.message.body })
      if (!thread.participants.includes(beat.message.from)) thread.participants.push(beat.message.from)
      thread.snippet = beat.message.body
      thread.unread = false
      if (beat.message.expand) thread.expanded = true
    }
    if (beat.invite) invite = beat.invite
  }
  return {
    surface: 'mail',
    thread: { ...thread, fromLine: nameList(thread.participants) },
    invite,
    quietRows: thread.expanded ? [] : story.quietRows,
    freshId: beats[beats.length - 1]?.id ?? null,
  }
}

function projectSignal(story, beats) {
  const messages = []
  for (const beat of beats) {
    if (!beat.message) continue
    messages.push({
      id: beat.id,
      from: beat.message.from,
      body: beat.message.body,
      side: beat.message.from === 'Joseph' ? 'out' : 'in',
    })
  }
  return {
    surface: 'signal',
    contact: story.contact,
    messages,
    freshId: beats[beats.length - 1]?.id ?? null,
  }
}

function projectSlack(story, beats) {
  const messages = []
  let drafts = []
  for (const beat of beats) {
    if (beat.message) {
      messages.push({
        id: beat.id,
        from: beat.message.from,
        body: beat.message.body,
        time: beat.message.time,
      })
    }
    if (beat.drafts) {
      drafts = beat.drafts.map((draft) => ({ ...draft, status: 'Draft' }))
    }
    if (beat.send) {
      const sentIds = new Set(beat.send.draftIds)
      drafts = drafts.map((draft) => (
        sentIds.has(draft.id) ? { ...draft, status: 'Sent' } : draft
      ))
      messages.push({
        id: beat.id,
        from: beat.send.from,
        body: beat.send.body,
        time: beat.send.time,
      })
    }
  }
  return {
    surface: 'slack',
    messages,
    drafts,
    freshId: beats[beats.length - 1]?.id ?? null,
  }
}

export function projectStory(story, beatIndex) {
  const beats = shownBeats(story, beatIndex)
  if (story.surface === 'mail') return projectMail(story, beats)
  if (story.surface === 'signal') return projectSignal(story, beats)
  return projectSlack(story, beats)
}

export function transcriptLines(story) {
  const view = projectStory(story, story.beats.length - 1)
  if (view.surface === 'mail') {
    const lines = view.thread.messages.map((message) => `${message.from}: ${message.body}`)
    if (view.invite) {
      lines.push(`Invitation from ${view.invite.organizer}: ${view.invite.title}, ${view.invite.when}`)
    }
    return lines
  }
  if (view.surface === 'signal') {
    return view.messages.map((message) => `${message.from}: ${message.body}`)
  }
  const lines = []
  for (const message of view.messages) {
    lines.push(`${message.from}: ${message.body}`)
    if (message.id === 'offer') {
      for (const draft of view.drafts) lines.push(`${draft.subject}: ${draft.status}`)
    }
  }
  return lines
}
