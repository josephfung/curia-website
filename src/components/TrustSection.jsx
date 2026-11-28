import React from 'react';

const GITHUB = 'https://github.com/josephfung/curia';

const cards = [
  {
    id: 'private',
    title: 'Private by design.',
    body: 'Your own instance, hosted where you choose. Your data stays out of a shared Curia platform.',
    art: 'boundary',
  },
  {
    id: 'source',
    title: 'Open source. Make it yours.',
    body: 'See how it works. Extend it. Tailor it to the way you work.',
    art: 'documents',
  },
  {
    id: 'playbook',
    title: 'Comes knowing the job.',
    body: 'Built around the work patterns of experienced executive assistants.',
    art: 'playbook',
  },
];

const links = [
  { href: '/governance', label: 'Explore privacy & control →' },
  { href: GITHUB, label: 'View the source ↗', external: true },
];

function BoundaryArt() {
  return (
    <svg className="m-trust-art" viewBox="0 0 280 150" aria-hidden="true">
      <rect x="28" y="16" width="224" height="118" rx="12" fill="none" stroke="#265058" strokeWidth="1.5" />
      <rect x="86" y="42" width="108" height="66" rx="4" fill="#FBF8F3" stroke="#1F1F1F" strokeWidth="1.25" />
      <path d="M86 60h108" stroke="#265058" strokeWidth="1" />
      <text x="140" y="90" textAnchor="middle" fontFamily="Lora, Georgia, serif" fontSize="18" fill="#1F1F1F">Yours.</text>
    </svg>
  );
}

function DocumentsArt() {
  const sheets = [
    { x: 62, y: 12, label: 'Routines' },
    { x: 74, y: 48, label: 'Preferences' },
    { x: 86, y: 84, label: 'Permissions' },
  ];
  return (
    <svg className="m-trust-art" viewBox="0 0 280 150" aria-hidden="true">
      {sheets.map((sheet) => (
        <g key={sheet.label}>
          <rect x={sheet.x} y={sheet.y} width="148" height="46" rx="3" fill="#FBF8F3" stroke="#1F1F1F" strokeWidth="1.15" />
          <text x={sheet.x + 14} y={sheet.y + 29} fontFamily="Lora, Georgia, serif" fontSize="16" fill="#1F1F1F">{sheet.label}</text>
        </g>
      ))}
    </svg>
  );
}

function PlaybookArt() {
  const entries = ['Inbox triage', 'Scheduling', 'Meeting prep'];
  return (
    <svg className="m-trust-art" viewBox="0 0 280 150" aria-hidden="true">
      <path d="M28 28h108c8 18 8 76 0 96H28V28z" fill="#FBF8F3" stroke="#1F1F1F" strokeWidth="1.15" />
      <path d="M252 28H144c-8 18-8 76 0 96h108V28z" fill="#F4EFE6" stroke="#1F1F1F" strokeWidth="1.15" />
      <path d="M140 28v96" stroke="#265058" strokeWidth="1.25" />
      {entries.map((entry, index) => (
        <text key={entry} x="158" y={58 + index * 26} fontFamily="Lora, Georgia, serif" fontSize="14" fill="#1F1F1F">{entry}</text>
      ))}
    </svg>
  );
}

const arts = {
  boundary: BoundaryArt,
  documents: DocumentsArt,
  playbook: PlaybookArt,
};

const TrustSection = () => (
  <section className="m-section" id="governance">
    <div className="m-container">
      <h2 className="m-section-title">Ready to work. Built to trust.</h2>
      <div className="m-trust-grid">
        {cards.map((card) => {
          const Art = arts[card.art];
          return (
            <article className="m-trust-card" key={card.id}>
              <Art />
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          );
        })}
      </div>
      <p className="m-trust-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </p>
    </div>
  </section>
);

export default TrustSection;
