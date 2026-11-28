/** Worth an interruption. Edit copy and readMs here. readMs is the pause before the next beat. */

export const interruption = {
  id: 'interruption',
  surface: 'signal',
  tab: 'Worth an interruption',
  tabShort: 'Interruption',
  caption: 'Nathan flagged the email and had a reply ready. Joseph made the call.',
  source: 'Illustrative dialogue based on an inbox alert.',
  contact: 'Nathan',
  beats: [
    {
      id: 'flag',
      readMs: 5000,
      message: {
        from: 'Nathan',
        body: 'I know you’re in a meeting. Alex needs a decision on today’s QBR before 2. He’s asking to move it to Thursday. I’ve drafted a reply.',
      },
    },
    {
      id: 'looking',
      readMs: 2000,
      message: { from: 'Joseph', body: 'Thx, looking now.' },
    },
    {
      id: 'sent',
      readMs: 4000,
      message: { from: 'Joseph', body: 'Sent. Good catch. Pls move today’s QBR too. Go with Alex’s timing.' },
    },
    {
      id: 'ack',
      message: { from: 'Nathan', body: 'Got it, boss.' },
    },
  ],
}
