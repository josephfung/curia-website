import React, { useState } from 'react';

// Accordion FAQ shared by the homepage and the governance page. One row open at
// a time; `initialOpen` is the row index open on load (-1 for none).
const Faq = ({ items, initialOpen = 0 }) => {
  const [open, setOpen] = useState(initialOpen);
  return (
    <div className="m-faq">
      {items.map((f, i) => (
        <div key={i} className="m-faq-row">
          <div
            className="m-faq-q"
            onClick={() => setOpen(open === i ? -1 : i)}
            role="button"
            tabIndex={0}
            aria-expanded={open === i}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (e.key === ' ') e.preventDefault();
                setOpen(open === i ? -1 : i);
              }
            }}
          >
            <span className="m-faq-q-text">{f.q}</span>
            <span className="m-faq-q-toggle">{open === i ? '−' : '+'}</span>
          </div>
          {open === i && <div className="m-faq-a">{f.a}</div>}
        </div>
      ))}
    </div>
  );
};

export default Faq;
