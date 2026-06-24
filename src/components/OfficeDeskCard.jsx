import React from 'react';

const OfficeDeskCard = ({ title, body }) => (
  <div className="m-desk-card">
    <h3 className="m-desk-title">{title}</h3>
    <p className="m-pillar-body">{body}</p>
  </div>
);

export default OfficeDeskCard;
