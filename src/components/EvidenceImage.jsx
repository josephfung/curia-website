import React, { useRef } from 'react';

// Sanitized screenshot with a click-to-enlarge lightbox. Uses a native <dialog>
// so Esc-to-close, focus handling, and the backdrop come from the browser.
// Clicking anywhere in the open dialog (image or backdrop) closes it.
const EvidenceImage = ({ src, alt, width, height, caption }) => {
  const dialogRef = useRef(null);

  return (
    <figure className="m-evidence-img">
      <button
        type="button"
        className="m-evidence-img-btn"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Enlarge screenshot: ${alt}`}
      >
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </button>
      <figcaption className="m-evidence-ph-cap">{caption}</figcaption>
      <dialog ref={dialogRef} className="m-lightbox" onClick={() => dialogRef.current?.close()}>
        <img src={src} alt={alt} width={width} height={height} />
      </dialog>
    </figure>
  );
};

export default EvidenceImage;
