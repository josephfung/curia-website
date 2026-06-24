import { useEffect } from 'react';

// Per-route document metadata. The '/' entry defines the homepage defaults used
// both to set metadata on the homepage itself and to restore defaults on cleanup
// when navigating away from another route.
const META = {
  '/': {
    title: 'Curia — A Persistent Digital Office for CEOs',
    description:
      'One point of contact backed by specialist desks for your inbox, calendar, meetings, relationships, research, and ongoing work. Open source and self-hosted.',
    ogTitle: 'Curia — An Executive Office Behind One Point of Contact',
    ogDescription:
      'Curia runs specialist desks with standing mandates, private memory, explicit permissions, and clear escalation rules.',
  },
  '/capabilities': {
    // em-dash in brand title is the allowed exception; do not remove
    title: 'Curia Capabilities — What Curia Can Take Off Your Plate',
    description:
      'See how Curia handles inbox triage, scheduling, meeting follow-up, relationship memory, research, standing orders, and multi-step executive work.',
  },
};

// The homepage defaults, used to restore metadata when leaving a non-home route.
const HOME = META['/'];

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
    // Unknown paths (e.g. /privacy) keep whatever index.html set; don't touch.
    if (!m) return;

    // Apply route-specific metadata. ogTitle/ogDescription fall back to title/description
    // if not explicitly set (capabilities page omits them).
    document.title = m.title;
    setMeta('description', 'name', m.description);
    setMeta('og:title', 'property', m.ogTitle ?? m.title);
    setMeta('og:description', 'property', m.ogDescription ?? m.description);

    return () => {
      // Restore homepage defaults rather than DOM-captured values, so cleanup is
      // always deterministic regardless of order effects or SSR hydration.
      document.title = HOME.title;
      setMeta('description', 'name', HOME.description);
      setMeta('og:title', 'property', HOME.ogTitle);
      setMeta('og:description', 'property', HOME.ogDescription);
    };
  }, [path]);
}
