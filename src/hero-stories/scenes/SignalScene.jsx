import Enter from './Enter.jsx'

export default function SignalScene({ view, reduced, motionOn }) {
  return (
    <div className="device">
      <div className="device-ear" aria-hidden="true" />
      <article className="phone">
        <header className="phone-top">
          <span className="phone-name">{view.contact}</span>
        </header>
        <div className="phone-thread">
          {view.messages.map((message) => (
            <Enter key={message.id} fresh={motionOn && message.id === view.freshId} reduced={reduced}>
              <div className={`bubble bubble-${message.side}`}>
                <p>{message.body}</p>
              </div>
            </Enter>
          ))}
        </div>
      </article>
    </div>
  )
}
