import React from 'react';

const heading = 'Connect your accounts. Curia brings the routines.';
const lede = 'Work with your assistant through the tools you already use.';

const platforms = [
  { name: 'Gmail', src: '/assets/integrations/gmail.svg' },
  { name: 'Google Calendar', src: '/assets/integrations/google-calendar.svg' },
  { name: 'Google Docs', src: '/assets/integrations/google-docs.svg' },
  { name: 'Microsoft Outlook', src: '/assets/integrations/outlook.svg' },
  { name: 'Microsoft Word', src: '/assets/integrations/word.svg' },
  { name: 'Slack', src: '/assets/integrations/slack.svg' },
  { name: 'Signal', src: '/assets/integrations/signal.svg' },
  { name: 'Messages', src: '/assets/integrations/messages.svg' },
  { name: 'Google Hangouts', src: '/assets/integrations/hangouts.svg' },
];

const IntegrationsSection = () => (
  <section className="m-section m-integrations" id="integrations">
    <div className="m-container">
      <h2 className="m-section-title m-integrations-title">{heading}</h2>
      <p className="m-integrations-lede">{lede}</p>
      <ul className="m-logo-row">
        {platforms.map((platform) => (
          <li key={platform.name}>
            <img src={platform.src} alt="" />
            <span className="sr-only">{platform.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default IntegrationsSection;
