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
    <svg className="m-trust-art" viewBox="0 0 320 200" aria-hidden="true">
      <rect x="78" y="22" width="164" height="156" rx="6" fill="#265058" />
      <rect x="90" y="34" width="140" height="132" fill="#FBF8F3" />
      <rect x="108" y="48" width="104" height="52" fill="#E7EFE8" stroke="#265058" strokeWidth="1.25" />
      <path d="M160 48v52M108 74h104" stroke="#265058" strokeWidth="1.15" />
      <circle cx="178" cy="62" r="7" fill="#B08A3E" />
      <rect x="124" y="112" width="72" height="26" rx="2" fill="#1F1F1F" />
      <text x="160" y="129" textAnchor="middle" fill="#F4EFE6" fontFamily="Lora, Georgia, serif" fontSize="14">Yours.</text>
      <circle cx="214" cy="126" r="5" fill="#B08A3E" />
      <rect x="148" y="166" width="24" height="6" fill="#265058" />
    </svg>
  );
}

function DocumentsArt() {
  return (
    <img
      className="m-trust-art m-trust-picture"
      src="/assets/trust/make-it-yours.png"
      alt=""
    />
  );
}

function PlaybookArt() {
  return (
    <img
      className="m-trust-art m-trust-picture"
      src="/assets/trust/comes-knowing.png"
      alt=""
    />
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
