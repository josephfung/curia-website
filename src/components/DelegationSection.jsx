import React, { useState } from 'react';

const heading = 'What would you like handled?';
const intro = 'Start with the everyday details. Hand over more as you get to know your assistant.';
const closing = 'Curia learns how you like things done, and can suggest useful routines along the way.';
const linkLabel = 'Explore capabilities →';

const categories = [
  {
    id: 'inbox',
    title: 'Your inbox and calendar',
    preview: 'Important emails, meeting requests, a workable week',
    responsibilities: [
      'Sort incoming mail and prepare replies',
      'Flag time-sensitive messages',
      'Arrange meetings with other people’s assistants',
      'Resolve scheduling conflicts',
      'Protect time for focused work',
      'Prepare a weekly calendar review',
    ],
    example: '“Handle meeting requests from this thread. Keep Friday afternoon clear.”',
  },
  {
    id: 'meetings',
    title: 'Your meetings and relationships',
    preview: 'Briefings, introductions, staying in touch',
    responsibilities: [
      'Prepare briefings on people you’re meeting',
      'Bring relevant correspondence back into view',
      'Capture decisions and next steps',
      'Draft introductions you offered to make',
      'Remember personal details and shared history',
      'Suggest people to reconnect with when you travel',
    ],
    example: '“I’m going to Ottawa next month. Who should I make time to see?”',
  },
  {
    id: 'projects',
    title: 'Your projects and commitments',
    preview: 'Next steps, deadlines, work in progress',
    responsibilities: [
      'Maintain your to-do list and priorities',
      'Track work waiting on you or someone else',
      'Keep delegated projects moving',
      'Surface stalled work and approaching deadlines',
      'Monitor a publishing or content pipeline',
      'Prepare recurring progress updates',
    ],
    example: '“Keep an eye on the newsletter. Tell me if a draft stalls or a deadline looks tight.”',
  },
  {
    id: 'research',
    title: 'Your research and writing',
    preview: 'Questions answered, developments tracked, drafts prepared',
    responsibilities: [
      'Research a question and prepare a brief',
      'Compare options and make a recommendation',
      'Monitor companies, topics, and industry developments',
      'Prepare background for an important conversation',
      'Draft correspondence and documents',
      'Organize research so you can find it again',
    ],
    example: '“Watch these organizations and send me a Friday brief on changes worth knowing about.”',
  },
  {
    id: 'life',
    title: 'Your life outside work',
    preview: 'Travel, expenses, family logistics',
    responsibilities: [
      'Research travel options and organize itineraries',
      'Coordinate personal and work calendars',
      'Capture receipts and reconcile expenses',
      'Research family activities and local services',
      'Find options that fit dietary preferences',
      'Track personal appointments and reminders',
    ],
    example: '“Find birthday treats that work with our family’s dietary restrictions.”',
  },
];

const DelegationSection = () => {
  const [openId, setOpenId] = useState(categories[0].id);

  return (
    <section className="m-section m-deleg" id="capabilities">
      <span id="how-it-works" className="m-deleg-anchor" />
      <div className="m-container">
        <h2 className="m-section-title m-deleg-title">{heading}</h2>
        <p className="m-deleg-intro">{intro}</p>
        <div className="m-deleg-list">
          {categories.map((category) => {
            const open = openId === category.id;
            const panelId = `deleg-panel-${category.id}`;
            const buttonId = `deleg-button-${category.id}`;
            return (
              <div className="m-deleg-item" key={category.id}>
                <h3 className="m-deleg-heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="m-deleg-btn"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : category.id)}
                  >
                    <span className="m-deleg-name">{category.title}</span>
                    <span className="m-deleg-preview">{category.preview}</span>
                    <span className="m-deleg-mark" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`m-deleg-panel${open ? ' is-open' : ''}`}
                  inert={open ? undefined : ''}
                  aria-hidden={open ? undefined : true}
                >
                  <div className="m-deleg-panel-clip">
                    <ul className="m-deleg-duties">
                      {category.responsibilities.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <blockquote className="m-deleg-example">
                      <p>{category.example}</p>
                    </blockquote>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="m-deleg-close">{closing}</p>
        <p className="m-deleg-more">
          <a href="/capabilities">{linkLabel}</a>
        </p>
      </div>
    </section>
  );
};

export default DelegationSection;
