import { motion } from 'motion/react'
import Enter from './Enter.jsx'
import { initial, tone } from './faces.js'

export default function SlackScene({ view, reduced, motionOn }) {
  return (
    <article className="slackapp">
      {view.messages.map((message) => (
        <div key={message.id}>
          <Enter fresh={motionOn && message.id === view.freshId} reduced={reduced}>
            <div className="sk-msg">
              <span className="sk-avatar" style={{ background: tone(message.from) }} aria-hidden="true">
                {initial(message.from)}
              </span>
              <div className="sk-body">
                <div className="sk-meta">
                  <span className="sk-name">{message.from}</span>
                  {message.time && <time className="sk-time">{message.time}</time>}
                </div>
                <p>{message.body}</p>
              </div>
            </div>
          </Enter>
          {message.id === 'offer' && view.drafts.length > 0 && (
            <div className="sk-files">
              {view.drafts.map((draft) => (
                <Enter key={draft.id} fresh={motionOn && view.freshId === 'drafts'} reduced={reduced}>
                  <div className="sk-file">
                    <div className="sk-file-subject">{draft.subject}</div>
                    <motion.div
                      key={draft.status}
                      className={`sk-file-status is-${draft.status.toLowerCase()}`}
                      initial={reduced ? false : { opacity: 0.35 }}
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
