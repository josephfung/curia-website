import { describe, expect, it } from 'vitest'
import { projectStory } from './projectScene.js'
import { introductions, interruption, meeting } from './stories/index.js'

describe('story projection', () => {
  it('keeps Joseph out of the email thread and shows Maya’s invite separately', () => {
    const view = projectStory(meeting, meeting.beats.length - 1)
    expect(view.thread.messages.map((message) => message.from)).toEqual(['Alex', 'Nathan', 'Maya'])
    expect(view.thread.expanded).toBe(true)
    expect(view.invite).toMatchObject({
      title: 'Joseph / Alex',
      when: 'Today, 2:30–3:00',
      organizer: 'Maya',
    })
    expect(view.thread.messages[1].body).toBe(meeting.beats[1].message.body)
  })

  it('shows the email as a closed unread row on the first beat', () => {
    const view = projectStory(meeting, 0)
    expect(view.thread.expanded).toBe(false)
    expect(view.thread.unread).toBe(true)
    expect(view.thread.fromLine).toBe('Alex')
    expect(view.quietRows).toHaveLength(2)
    expect(view.invite).toBeNull()
  })

  it('lets Nathan reply before the thread lists Maya', () => {
    const view = projectStory(meeting, 1)
    expect(view.thread.fromLine).toBe('Alex and Nathan')
    expect(view.thread.snippet).toBe(meeting.beats[1].message.body)
  })

  it('shows Joseph sending the email and Nathan acknowledging the calendar request', () => {
    const view = projectStory(interruption, interruption.beats.length - 1)
    expect(view.messages.map((message) => message.from)).toEqual(['Nathan', 'Joseph', 'Joseph', 'Nathan'])
    expect(view.messages[2].body).toBe('Sent. Good catch. Pls move today’s QBR too. Go with Alex’s timing.')
    expect(view.messages[2].side).toBe('out')
    expect(view.messages[3].body).toBe('Got it, boss.')
    expect(view.messages[3].side).toBe('in')
  })

  it('keeps both introductions in Draft until Joseph approves, then marks both Sent', () => {
    const waiting = projectStory(introductions, 2)
    expect(waiting.drafts.map((draft) => draft.status)).toEqual(['Draft', 'Draft'])
    expect(waiting.messages.map((message) => message.from)).toEqual(['Nathan', 'Joseph'])

    const sent = projectStory(introductions, 3)
    expect(sent.drafts.map((draft) => [draft.id, draft.status])).toEqual([
      ['john-maya', 'Sent'],
      ['john-priya', 'Sent'],
    ])
    expect(sent.messages.at(-1).body).toBe('Both sent.')
    expect(sent.messages[0].body).toBe(introductions.beats[0].message.body)
  })
})
