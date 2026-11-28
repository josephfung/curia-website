import Enter from './Enter.jsx'
import { initial, tone } from './faces.js'

export default function SignalScene({ view, reduced, motionOn }) {
  return (
    <article className="signal">
      <header className="sig-head">
        <span className="sig-avatar" style={{ background: tone(view.contact) }} aria-hidden="true">
          {initial(view.contact)}
        </span>
        <span className="sig-name">{view.contact}</span>
      </header>
      <div className="sig-thread">
        {view.messages.map((message) => (
          <Enter key={message.id} fresh={motionOn && message.id === view.freshId} reduced={reduced}>
            <div className={`sig-bubble sig-${message.side}`}>
              <p>{message.body}</p>
            </div>
          </Enter>
        ))}
      </div>
    </article>
  )
}
