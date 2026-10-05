import React from 'react';
import EvidencePlaceholder from './EvidencePlaceholder.jsx';
import EvidenceImage from './EvidenceImage.jsx';

// Normalise description to an array of paragraph strings regardless of input type
const toParas = (d) => (Array.isArray(d) ? d : [d]);

// Each responsibility is a two-column row: text content beside a screenshot slot.
// `index` alternates the screenshot side (even = right, odd = left) so the page
// reads as a rhythm rather than a wall of stacked blocks. The placeholder caption
// is derived from the heading so there is one source of truth for the copy.
// `image` ({ src, alt, width, height }) replaces the placeholder once a capture exists.
const CapabilityDetail = ({ heading, description, bringsYouIn, result, image, index = 0 }) => (
  <div className={`m-capdetail-row${index % 2 === 1 ? ' flip' : ''}`}>
    <article className="m-capdetail">
      <h3 className="m-capdetail-h">{heading}</h3>
      {toParas(description).map((p, i) => <p className="m-pillar-body" key={i}>{p}</p>)}
      {bringsYouIn?.length > 0 && (
        <div className="m-capdetail-escalate">
          <div className="m-capdetail-label">Where Curia brings you in</div>
          <ul className="m-capdetail-list">{bringsYouIn.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>
      )}
      <p className="m-capdetail-result">{result}</p>
    </article>
    <div className="m-capdetail-media">
      {image
        ? <EvidenceImage {...image} caption={`Sanitized example: ${heading}.`} />
        : <EvidencePlaceholder caption={`Sanitized example: ${heading}.`} />}
    </div>
  </div>
);

export default CapabilityDetail;
