import React from 'react';

// Styled slot for a sanitized screenshot to be dropped in later (Phase 3).
// Intentional placeholder — looks deliberate, not broken. Swap the inner
// content for an <img> when the real capture exists.
const EvidencePlaceholder = ({ caption }) => (
  <figure className="m-evidence-ph">
    <div className="m-evidence-ph-box">
      <span className="m-evidence-ph-tag">Screenshot to come</span>
    </div>
    <figcaption className="m-evidence-ph-cap">{caption}</figcaption>
  </figure>
);

export default EvidencePlaceholder;
