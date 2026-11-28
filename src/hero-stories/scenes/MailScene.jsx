import Enter from './Enter.jsx'
import { initial, tone } from './faces.js'

function Avatar({ name }) {
  return (
    <span className="g-avatar" style={{ background: tone(name) }} aria-hidden="true">
      {initial(name)}
    </span>
  )
}

function Row({ from, subject, snippet, time, unread }) {
  return (
    <div className={`g-row${unread ? ' is-unread' : ''}`}>
      <Avatar name={from} />
      <div className="g-main">
        <div className="g-topline">
          <span className="g-from">{from}</span>
          <time className="g-time">{time}</time>
        </div>
        <div className="g-subjectline">
          <span className="g-subject">{subject}</span>
          {snippet && <span className="g-snippet">{snippet}</span>}
        </div>
      </div>
    </div>
  )
}

export default function MailScene({ view, reduced, motionOn }) {
  const { thread, invite, quietRows, freshId } = view
  const expanded = thread.expanded

  return (
    <article className="gmail">
      {!expanded && (
        <div className="g-list">
          <Row
            from={thread.participants[0]}
            subject={thread.subject}
            snippet={thread.snippet}
            time={thread.time}
            unread={thread.unread}
          />
          {quietRows.map((row) => (
            <Row
              key={row.id}
              from={row.from}
              subject={row.subject}
              snippet={row.snippet}
              time={row.time}
            />
          ))}
        </div>
      )}
      {expanded && (
        <div className="g-open">
          <h2 className="g-title">{thread.subject}</h2>
          {thread.messages.map((message) => (
            <Enter key={message.id} fresh={motionOn && message.id === freshId} reduced={reduced}>
              <div className="g-msg">
                <Avatar name={message.from} />
                <div>
                  <div className="g-from">{message.from}</div>
                  <p>{message.body}</p>
                </div>
              </div>
            </Enter>
          ))}
        </div>
      )}
      {invite && (
        <Enter fresh={motionOn && freshId === 'invite'} reduced={reduced}>
          <div className="g-event">
            <div className="g-cal" aria-hidden="true">
              <span>Today</span>
              <strong>2:30</strong>
            </div>
            <div>
              <div className="g-event-kicker">Invitation</div>
              <div className="g-event-title">{invite.title}</div>
              <div className="g-event-when">{invite.when}</div>
              <div className="g-event-who">Organizer: {invite.organizer}</div>
            </div>
          </div>
        </Enter>
      )}
    </article>
  )
}
