import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { stories } from './stories/index.js'
import { projectStory, transcriptLines } from './projectScene.js'
import { transportAction } from './playback.js'
import { useStoryPlayback } from './useStoryPlayback.js'
import MailScene from './scenes/MailScene.jsx'
import SignalScene from './scenes/SignalScene.jsx'
import SlackScene from './scenes/SlackScene.jsx'
import './hero-stories.css'

const labels = {
  pause: 'Pause',
  play: 'Play',
  'play-carousel': 'Play carousel',
}

function Scene({ view, reduced, motionOn }) {
  if (view.surface === 'mail') return <MailScene view={view} reduced={reduced} motionOn={motionOn} />
  if (view.surface === 'signal') return <SignalScene view={view} reduced={reduced} motionOn={motionOn} />
  return <SlackScene view={view} reduced={reduced} motionOn={motionOn} />
}

function useMotionOn(freshId, reduced) {
  const mountedFresh = useRef(freshId)
  const [ready, setReady] = useState(false)
  useEffect(() => { setReady(true) }, [])
  if (reduced || !ready) return false
  return freshId !== mountedFresh.current
}

function StoryPane({ view, reduced, fade }) {
  const motionOn = useMotionOn(view.freshId, reduced)
  return (
    <motion.div
      initial={fade && !reduced ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Scene view={view} reduced={reduced} motionOn={motionOn} />
    </motion.div>
  )
}

export default function HeroStories() {
  const { rootRef, state, actions } = useStoryPlayback(stories)
  const story = stories[state.storyIndex]
  const view = projectStory(story, state.beatIndex)
  const seen = useRef(false)
  const fade = seen.current
  useEffect(() => { seen.current = true }, [story.id, state.revision])
  const action = transportAction(state)

  function onTransport() {
    if (action === 'pause') actions.pause()
    else if (action === 'play') actions.play()
    else actions.playCarousel()
  }

  function onTabsKeyDown(event) {
    const last = stories.length - 1
    let next = null
    if (event.key === 'ArrowRight') next = state.storyIndex === last ? 0 : state.storyIndex + 1
    else if (event.key === 'ArrowLeft') next = state.storyIndex === 0 ? last : state.storyIndex - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    actions.select(next)
    const tabId = `hero-tab-${stories[next].id}`
    requestAnimationFrame(() => document.getElementById(tabId)?.focus())
  }

  return (
    <div
      ref={rootRef}
      className="hero-stories"
      role="region"
      aria-roledescription="carousel"
      aria-label="Stories of Nathan at work"
      onMouseEnter={() => actions.hover(true)}
      onMouseLeave={() => actions.hover(false)}
      onFocusCapture={() => actions.focusEnter()}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) actions.focusLeave()
      }}
    >
      <p className="hero-who">Nathan, Joseph’s AI executive assistant.</p>
      <div className="hero-tabs" role="tablist" aria-label="Stories" onKeyDown={onTabsKeyDown}>
        {stories.map((item, index) => {
          const selected = index === state.storyIndex
          return (
            <button
              key={item.id}
              id={`hero-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`hero-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className="hero-tab"
              onClick={() => actions.select(index)}
            >
              <span className="tab-long">{item.tab}</span>
              <span className="tab-short">{item.tabShort}</span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`hero-panel-${story.id}`}
        aria-labelledby={`hero-tab-${story.id}`}
        tabIndex={0}
        className="hero-panel"
      >
        <div className="sr-only">
          {transcriptLines(story).map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="hero-stage" aria-hidden="true">
          <StoryPane
            key={`${story.id}-${state.revision}`}
            view={view}
            reduced={state.reducedMotion}
            fade={fade}
          />
        </div>
        <p className="hero-caption">{story.caption}</p>
        <p className="hero-source">{story.source}</p>
      </div>

      {!state.reducedMotion && (
        <div className="hero-controls">
          <button type="button" className="hero-control is-primary" onClick={onTransport}>
            {labels[action]}
          </button>
          <button type="button" className="hero-control" onClick={() => actions.replay()}>
            Replay story
          </button>
        </div>
      )}
    </div>
  )
}
