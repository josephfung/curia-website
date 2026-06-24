import React from 'react';

const MarketingFooter = ({ home = true }) => (
  <footer className="m-footer">
    <div className="m-container">
      <div className="m-footer-grid">
        <div>
          <a className="m-wordmark" href={home ? '#' : '/'} aria-label="Curia">
            <img src="/assets/logo-curia-wordmark.svg" alt="Curia" width="96" height="22" />
          </a>
          <p className="m-pillar-body" style={{ marginTop: 18, maxWidth: 320 }}>
            A Digital Office of the CEO. Open source on GitHub.
          </p>
          <div className="m-footer-licence">
            <span className="m-licence-badge">MIT</span>
            <span>Open-source</span>
          </div>
        </div>
        <div className="m-footer-col">
          <div className="m-footer-col-title">Product</div>
          <a href="/capabilities">Capabilities</a>
          <a href={home ? '#governance' : '/#governance'}>Governance</a>
          <a href={home ? '#get-started' : '/#get-started'}>Get started</a>
        </div>
        <div className="m-footer-col">
          <div className="m-footer-col-title">Office</div>
          {/* <a href="#managed">Managed practice</a> */}
          <a href="https://calendly.com/jbfung/curia">Start a conversation</a>
          <a href={home ? '#faq' : '/#faq'}>FAQ</a>
        </div>
        <div className="m-footer-col">
          <div className="m-footer-col-title">Open source</div>
          <a href="https://github.com/josephfung/curia">GitHub</a>
          <a href="https://github.com/josephfung/curia#quickstart">Quickstart</a>
          <a href="https://docs.meetcuria.com">Docs</a>
        </div>
      </div>
      <div className="m-footer-finepct">
        <span>© {new Date().getFullYear()} <a href="https://linkedin.com/in/josephfung" className="m-footer-author-link">Joseph Fung</a></span>
        {/* "License" → the repo's MIT LICENSE (the real legal instrument for OSS);
            "Security" → the repo's SECURITY.md; "Privacy" → the in-app /privacy page. */}
        <span className="m-footer-legal">
          <a href="https://github.com/josephfung/curia/blob/main/LICENSE">License</a>
          {' · '}
          <a href="/privacy">Privacy</a>
          {' · '}
          <a href="https://github.com/josephfung/curia/blob/main/SECURITY.md">Security</a>
        </span>
      </div>
    </div>
  </footer>
);

export default MarketingFooter;
