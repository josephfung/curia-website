import React from 'react';
import HomePage from './pages/HomePage.jsx';
import CapabilitiesPage from './pages/CapabilitiesPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import { useRouteMetadata } from './lib/useRouteMetadata.js';

// Tiny path-based router — no router dependency for a small static site.
// Trailing slashes are normalized so /x and /x/ both match. Cloudflare Pages
// serves index.html for unmatched paths via its default SPA fallback (no
// _redirects file — a /privacy /index.html 200 rewrite there 308-loops to /).
const App = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  useRouteMetadata(path);
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/capabilities') return <CapabilitiesPage />;
  return <HomePage />;
};

export default App;
