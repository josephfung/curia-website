import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';

const CapabilitiesPage = () => (
  <>
    <MarketingHeader home={false} />
    <main className="m-section">
      <div className="m-container">
        <div className="m-section-eyebrow">Capabilities</div>
        <h1 className="m-section-title">What Curia can take off your plate</h1>
      </div>
    </main>
    <MarketingFooter home={false} />
  </>
);

export default CapabilitiesPage;
