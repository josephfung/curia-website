import { motion } from 'motion/react'
import Enter from './Enter.jsx'

function initial(name) {
  return name.slice(0, 1)
}

export default function SlackScene({ view, reduced, motionOn }) {
  return (
    <article className="slack">
      <header className="slack-bar">Direct message</header>
      {view.messages.map((message) => (
        <div key={message.id}>
          <Enter fresh={motionOn && message.id === view.freshId} reduced={reduced}>
            <div className="slack-msg">
              <span className={`avatar avatar-${message.from.toLowerCase()}`} aria-hidden="true">{initial(message.from)}</span>
              <div className="slack-msg-main">
                <div className="slack-meta">
                  <span className="slack-name">{message.from}</span>
                  {message.time && <time className="slack-time">{message.time}</time>}
                </div>
                <p>{message.body}</p>
              </div>
            </div>
          </Enter>
          {message.id === 'offer' && view.drafts.length > 0 && (
            <div className="slack-drafts">
              {view.drafts.map((draft) => (
                <Enter key={draft.id} fresh={motionOn && view.freshId === 'drafts'} reduced={reduced}>
                  <div className="draft-card">
                    <div className="draft-subject">{draft.subject}</div>
                    <motion.div
                      key={draft.status}
                      className="draft-status"
                      initial={reduced ? false : { opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: reduced ? 0 : 0.2 }}
                    >
                      {draft.status}
                    </motion.div>
                  </div>
                </Enter>
              ))}
            </div>
          )}
        </div>
      ))}
    </article>
  )
}
