import React from 'react';

// `home` controls how in-page anchors resolve: on the marketing page they stay
// local (#section); on a standalone route like /privacy they jump back to the
// homepage (/#section) so the shared header/footer work from anywhere.
const MarketingHeader = ({ home = true }) => (
  <header className="m-header">
    <div className="m-container m-header-inner">
      <a className="m-wordmark" href={home ? '#' : '/'} aria-label="Curia">
        <img src="/assets/logo-curia-wordmark.svg" alt="Curia" width="105" height="24" />
      </a>
      <nav className="m-nav" aria-label="Primary">
        <a href={home ? '#capabilities' : '/#capabilities'}>Capabilities</a>
        <a href={home ? '#governance' : '/#governance'}>Governance</a>
        <a href={home ? '#get-started' : '/#get-started'}>Get started</a>
      </nav>
      <div className="m-header-actions">
        <a className="m-cta m-cta-ghost" href="https://docs.meetcuria.com">
          <svg className="m-cta-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Documentation
        </a>
        <a className="m-cta" href="https://github.com/josephfung/curia">
          <svg className="m-cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  </header>
);

export default MarketingHeader;
