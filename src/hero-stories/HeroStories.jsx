import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { stories } from './stories/index.js'
import { projectStory, transcriptLines } from './projectScene.js'
import { useStoryPlayback } from './useStoryPlayback.js'
import MailScene from './scenes/MailScene.jsx'
import SignalScene from './scenes/SignalScene.jsx'
import SlackScene from './scenes/SlackScene.jsx'
import './hero-stories.css'

const ease = [0.22, 1, 0.36, 1]

function windowCap() {
  if (typeof window === 'undefined') return 340
  return window.matchMedia('(max-width: 720px)').matches ? 300 : 340
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

function StoryBody({ view, reduced }) {
  const motionOn = useMotionOn(view.freshId, reduced)
  return <Scene view={view} reduced={reduced} motionOn={motionOn} />
}

export default function HeroStories() {
  const { rootRef, state, actions } = useStoryPlayback(stories)
  const story = stories[state.storyIndex]
  const view = projectStory(story, state.beatIndex)
  const seen = useRef(false)
  const prevIndex = useRef(state.storyIndex)
  const directionRef = useRef(1)
  if (state.storyIndex !== prevIndex.current) {
    const forward = state.storyIndex === (prevIndex.current + 1) % stories.length
    directionRef.current = forward ? 1 : -1
    prevIndex.current = state.storyIndex
  }
  const direction = directionRef.current
  const slide = seen.current && !state.reducedMotion
  const stackRef = useRef(null)
  const [frame, setFrame] = useState({ height: null, fade: false })
  useEffect(() => { seen.current = true }, [story.id])

  useLayoutEffect(() => {
    const el = stackRef.current
    if (!el || state.reducedMotion) return undefined
    const apply = () => {
      const full = el.scrollHeight
      const cap = windowCap()
      setFrame({ height: Math.min(full, cap), fade: full > cap + 4 })
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(el)
    return () => observer.disconnect()
  }, [story.id, state.beatIndex, state.reducedMotion])

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
        className={`hero-window${state.reducedMotion ? ' is-reduced' : ''}${frame.fade ? ' is-fading' : ''}`}
        style={state.reducedMotion || frame.height == null ? undefined : { height: frame.height }}
      >
        <div className="sr-only">
          {transcriptLines(story).map((line) => <p key={line}>{line}</p>)}
        </div>
        <div className="hero-stage" aria-hidden="true">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={story.id}
              className="hero-slide"
              initial={slide ? { x: `${direction * 100}%` } : false}
              animate={{ x: '0%' }}
              exit={slide ? { x: `${direction * -100}%` } : { opacity: 1 }}
              transition={{ duration: slide ? 0.62 : 0, ease }}
            >
              <div className="hero-stack" ref={stackRef}>
                <StoryBody view={view} reduced={state.reducedMotion} />
              </div>
            </motion.div>
          </AnimatePresence>
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
