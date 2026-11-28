import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { stories } from './stories/index.js'
import { projectStory, transcriptLines } from './projectScene.js'
import { useStoryPlayback } from './useStoryPlayback.js'
import MailScene from './scenes/MailScene.jsx'
import SignalScene from './scenes/SignalScene.jsx'
import SlackScene from './scenes/SlackScene.jsx'
import './hero-stories.css'

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
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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

  function onDot(index) {
    if (state.reducedMotion) actions.select(index)
    else actions.jump(index)
  }

  function onDotsKeyDown(event) {
    const last = stories.length - 1
    let next = null
    if (event.key === 'ArrowRight') next = state.storyIndex === last ? 0 : state.storyIndex + 1
    else if (event.key === 'ArrowLeft') next = state.storyIndex === 0 ? last : state.storyIndex - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    else return
    event.preventDefault()
    onDot(next)
    const tabId = `hero-dot-${stories[next].id}`
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
      <div
        role="tabpanel"
        id={`hero-panel-${story.id}`}
        aria-labelledby={`hero-dot-${story.id}`}
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
      </div>
      <div className="hero-dots" role="tablist" aria-label="Stories" onKeyDown={onDotsKeyDown}>
        {stories.map((item, index) => {
          const selected = index === state.storyIndex
          return (
            <button
              key={item.id}
              id={`hero-dot-${item.id}`}
              type="button"
              role="tab"
              className="hero-dot"
              aria-label={item.tab}
              aria-selected={selected}
              aria-controls={`hero-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onDot(index)}
            />
          )
        })}
      </div>
    </div>
  )
}
