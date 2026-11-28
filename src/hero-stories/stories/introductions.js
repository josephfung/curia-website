/** Promised introductions. Edit copy and readMs here. readMs is the pause before the next beat. */

export const introductions = {
  id: 'introductions',
  surface: 'slack',
  tab: 'The promised introductions',
  tabShort: 'Introductions',
  caption: 'The introductions were drafted before Joseph asked. He chose when to send them.',
  source: 'Illustrative Slack exchange based on Joseph’s introduction workflow.',
  beats: [
    {
      id: 'offer',
      readMs: 2000,
      message: {
        from: 'Nathan',
        time: '2:41 PM',
        body: 'I picked up the notes from your call with John. You offered to introduce him to Maya and Priya. I’ve drafted both emails for you.',
      },
    },
    {
      id: 'drafts',
      readMs: 5000,
      drafts: [
        { id: 'john-maya', subject: 'Intro: John and Maya' },
        { id: 'john-priya', subject: 'Intro: John and Priya' },
      ],
    },
    {
      id: 'approve',
      readMs: 2000,
      message: {
        from: 'Joseph',
        time: '2:44 PM',
        body: 'Looks good. Please send both.',
      },
    },
    {
      id: 'confirm',
      send: {
        from: 'Nathan',
        time: '2:44 PM',
        body: 'Both sent.',
        draftIds: ['john-maya', 'john-priya'],
      },
    },
  ],
}
