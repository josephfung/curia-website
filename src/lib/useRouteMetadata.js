import { useEffect } from 'react';

// Per-route document metadata. index.html holds the homepage defaults; this
// overrides title + description + OG tags when a standalone route renders.
const META = {
  '/capabilities': {
    title: 'Curia Capabilities — What Curia Can Take Off Your Plate',
    description:
      'See how Curia handles inbox triage, scheduling, meeting follow-up, relationship memory, research, standing orders, and multi-step executive work.',
  },
};

function setMeta(name, attr, value) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export function useRouteMetadata(path) {
  useEffect(() => {
    const m = META[path];
    if (!m) return; // homepage/privacy keep the index.html defaults
    const prevTitle = document.title;
    document.title = m.title;
    setMeta('description', 'name', m.description);
    setMeta('og:title', 'property', m.title);
    setMeta('og:description', 'property', m.description);
    return () => {
      document.title = prevTitle;
    };
  }, [path]);
}
