import { useEffect, useMemo, useRef, useState } from 'react'
import { createPlayback } from './playback.js'

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useStoryPlayback(stories) {
  const rootRef = useRef(null)
  const playbackRef = useRef(null)
  if (!playbackRef.current) {
    playbackRef.current = createPlayback(stories, {
      reducedMotion: prefersReducedMotion(),
      now: () => Date.now(),
      schedule: (fn, ms) => window.setTimeout(fn, ms),
      clear: (id) => window.clearTimeout(id),
    })
  }

  const [state, setState] = useState(() => playbackRef.current.getState())

  useEffect(() => {
    const playback = playbackRef.current
    const unsubscribe = playback.subscribe(setState)
    const node = rootRef.current

    const syncVisibility = () => {
      if (!node) return
      const rect = node.getBoundingClientRect()
      const inView = rect.bottom > 0 && rect.top < window.innerHeight
      playback.setOffscreen(!inView)
      playback.setHidden(document.hidden)
    }
    syncVisibility()

    const observer = new IntersectionObserver(([entry]) => {
      playback.setOffscreen(!entry.isIntersecting)
    })
    if (node) observer.observe(node)

    const onVisibility = () => playback.setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => playback.setReducedMotion(motion.matches)
    motion.addEventListener('change', onMotion)

    return () => {
      unsubscribe()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      motion.removeEventListener('change', onMotion)
      playback.destroy()
    }
  }, [])

  const actions = useMemo(() => ({
    select: (index) => playbackRef.current?.select(index),
    jump: (index) => playbackRef.current?.jump(index),
    pause: () => playbackRef.current?.pause(),
    play: () => playbackRef.current?.play(),
    replay: () => playbackRef.current?.replay(),
    playCarousel: () => playbackRef.current?.playCarousel(),
    hover: (active) => playbackRef.current?.hover(active),
    focusEnter: () => playbackRef.current?.focusEnter(),
    focusLeave: () => playbackRef.current?.focusLeave(),
  }), [])

  return { rootRef, state, actions }
}
