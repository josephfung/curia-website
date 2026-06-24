import React from 'react';
import MarketingHeader from '../components/MarketingHeader.jsx';
import MarketingFooter from '../components/MarketingFooter.jsx';

const PrivacyPage = () => (
  <>
    <MarketingHeader home={false} />
    <main className="m-section">
      <div className="m-container m-legal">
        <div className="m-section-eyebrow">Legal</div>
        <h1 className="m-section-title">Privacy</h1>
        <p className="m-legal-updated">Last updated June 22, 2026</p>

        <p className="m-legal-lede">
          Curia is open-source software you run on your own infrastructure. This page
          covers two things: how the website at meetcuria.com handles your data, and
          what that means for the Curia software itself.
        </p>

        <h2 className="m-legal-h">The website</h2>
        <p>This site is a static marketing page. It does not track you.</p>
        <ul className="m-legal-list">
          <li><strong>No analytics.</strong> We don&rsquo;t use Google Analytics, Plausible, or
            any other tracking tool. We don&rsquo;t know who you are or that you visited.</li>
          <li><strong>No cookies.</strong> The site sets none.</li>
          <li><strong>No third-party trackers or ad tech.</strong> Fonts are self-hosted, so your
            browser doesn&rsquo;t call out to Google or any other CDN when the page loads.</li>
        </ul>
        <p>
          The site is hosted on Cloudflare Pages. Like any web host, Cloudflare processes
          standard request data (such as your IP address) to deliver the site and protect it
          from abuse, governed by{' '}
          <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare&rsquo;s privacy policy</a>.
          We don&rsquo;t receive or store this ourselves.
        </p>

        <h2 className="m-legal-h">When you contact us</h2>
        <p>The only personal information we ever hold is what you choose to send us:</p>
        <ul className="m-legal-list">
          <li><strong>Email.</strong> If you email us, we keep your message and address to reply.
            Nothing more.</li>
          <li><strong>Booking a call.</strong> The &ldquo;Start a conversation&rdquo; link uses{' '}
            <a href="https://calendly.com/">Calendly</a>, a third party. If you book, the name,
            email, and time you provide go to Calendly under{' '}
            <a href="https://calendly.com/privacy">their privacy policy</a>. We see only the
            details needed to meet with you.</li>
        </ul>
        <p>
          We don&rsquo;t sell your information, share it with advertisers, or use it for anything
          beyond responding to you.
        </p>

        <h2 className="m-legal-h">The Curia software</h2>
        <p>
          This is the important part. Curia is self-hosted: you clone it, run it on your own
          machines, and connect your own accounts and API keys.{' '}
          <strong>Your email, calendar, contacts, and everything Curia processes stay on your
          infrastructure.</strong> We are the maintainer of the software, not the operator of
          your instance. We never receive, see, or store any data Curia handles for you. How
          that data is treated is governed by your own setup and the providers you connect
          (your LLM provider, email host, and so on), not by us.
        </p>

        <h2 className="m-legal-h">Questions</h2>
        <p>
          Email <a href="mailto:security@meetcuria.com">security@meetcuria.com</a> with any
          privacy questions.
        </p>
        <p>
          We may update this page as the site changes. The date at the top always reflects the
          latest version.
        </p>
      </div>
    </main>
    <MarketingFooter home={false} />
  </>
);

export default PrivacyPage;
