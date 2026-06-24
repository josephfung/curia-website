import React from 'react';

// Normalise description to an array of paragraph strings regardless of input type
const toParas = (d) => (Array.isArray(d) ? d : [d]);

const CapabilityDetail = ({ heading, description, sequence, makesItWork, bringsYouIn, result }) => (
  <article className="m-capdetail">
    <h3 className="m-capdetail-h">{heading}</h3>
    {toParas(description).map((p, i) => <p className="m-pillar-body" key={i}>{p}</p>)}
    {sequence && (
      <ol className="m-capdetail-seq">
        {sequence.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
    )}
    <div className="m-capdetail-cols">
      {makesItWork?.length > 0 && (
        <div>
          <div className="m-capdetail-label">What makes it work</div>
          <ul className="m-capdetail-list">{makesItWork.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>
      )}
      {bringsYouIn?.length > 0 && (
        <div>
          <div className="m-capdetail-label">Where Curia brings you in</div>
          <ul className="m-capdetail-list">{bringsYouIn.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>
      )}
    </div>
    <p className="m-capdetail-result">{result}</p>
  </article>
);

export default CapabilityDetail;
