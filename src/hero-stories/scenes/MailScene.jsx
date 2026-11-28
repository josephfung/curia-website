import { motion } from 'motion/react'
import Enter from './Enter.jsx'

export default function MailScene({ view, reduced, motionOn }) {
  const { thread, invite, quietRows, freshId } = view
  const expanded = thread.expanded

  return (
    <article className="mail">
      <div className="surface-label">Inbox</div>
      <div className={`mail-thread${thread.unread ? ' is-unread' : ''}`}>
        <div className="mail-row">
          <div className="mail-row-main">
            <div className="mail-from">{thread.fromLine}</div>
            <div className="mail-subject">{thread.subject}</div>
            {!expanded && <p className="mail-snippet">{thread.snippet}</p>}
          </div>
          <time className="mail-time">{thread.time}</time>
        </div>
        <motion.div
          className="mail-thread-body"
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {thread.messages.map((message) => (
            <Enter key={message.id} fresh={motionOn && message.id === freshId} reduced={reduced}>
              <div className={`mail-msg${message.from === 'Nathan' ? ' is-nathan' : ''}`}>
                <div className="mail-msg-from">{message.from}</div>
                <p>{message.body}</p>
              </div>
            </Enter>
          ))}
        </motion.div>
      </div>
      {quietRows.map((row) => (
        <div className="mail-row is-quiet" key={row.id}>
          <div className="mail-row-main">
            <div className="mail-from">{row.from}</div>
            <div className="mail-subject">{row.subject}</div>
            <p className="mail-snippet">{row.snippet}</p>
          </div>
          <time className="mail-time">{row.time}</time>
        </div>
      ))}
      {invite && (
        <Enter fresh={motionOn && freshId === 'invite'} reduced={reduced}>
          <div className="mail-invite">
            <div className="mail-invite-kicker">Invitation</div>
            <div className="mail-invite-title">{invite.title}</div>
            <div className="mail-invite-when">{invite.when}</div>
            <div className="mail-invite-who">Organizer: {invite.organizer}</div>
          </div>
        </Enter>
      )}
    </article>
  )
}
