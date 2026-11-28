/** Same-day meeting. Edit copy and readMs here. readMs is the pause before the next beat. */

export const meeting = {
  id: 'meeting',
  surface: 'mail',
  tab: 'The same-day meeting',
  tabShort: 'Same-day meeting',
  caption: 'Joseph and the CTO spoke that afternoon. Their assistants arranged it.',
  source: 'Reconstruction of a real scheduling exchange.',
  quietRows: [
    { id: 'quiet-notes', from: 'Sam', subject: 'Monday notes', snippet: 'A few items for the file.', time: '12:41 PM' },
    { id: 'quiet-receipt', from: 'Riley', subject: 'Receipt', snippet: 'Filed with the trip.', time: '12:18 PM' },
  ],
  beats: [
    {
      id: 'incoming',
      readMs: 3000,
      incoming: {
        from: 'Alex',
        subject: 'Intro: Joseph and Alex',
        snippet: 'Looping in Maya, my EA, to find a time.',
        body: 'Looping in Maya, my EA, to find a time.',
        time: '1:06 PM',
      },
    },
    {
      id: 'nathan-reply',
      readMs: 5000,
      message: {
        from: 'Nathan',
        body: 'Thanks, Alex. Maya, Joseph could do 2:30 or 4 today. Would either work on your end?',
        expand: true,
      },
    },
    {
      id: 'maya-reply',
      readMs: 3000,
      message: {
        from: 'Maya',
        body: '2:30 works. I’ll send the invite.',
      },
    },
    {
      id: 'invite',
      invite: {
        id: 'invite-230',
        title: 'Joseph / Alex',
        when: 'Today, 2:30–3:00',
        organizer: 'Maya',
      },
    },
  ],
}
