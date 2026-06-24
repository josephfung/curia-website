import React from 'react';

const CapabilityPreviewCard = ({ title, body, outcome }) => (
  <div className="m-pillar">
    <div className="m-pillar-rule"></div>
    <h3 className="m-pillar-title">{title}</h3>
    <p className="m-pillar-body">{body}</p>
    <p className="m-cap-outcome">{outcome}</p>
  </div>
);

export default CapabilityPreviewCard;
