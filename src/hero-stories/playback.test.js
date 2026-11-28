import { afterEach, describe, expect, it, vi } from 'vitest'
import { createPlayback, HOLD_MS } from './playback.js'
import { stories } from './stories/index.js'
import { introductions, interruption, meeting } from './stories/index.js'

function clock(options = {}) {
  vi.useFakeTimers()
  const playback = createPlayback(stories, {
    reducedMotion: false,
    now: () => Date.now(),
    schedule: (fn, ms) => setTimeout(fn, ms),
    clear: (id) => clearTimeout(id),
    ...options,
  })
  if (!options.reducedMotion) playback.setOffscreen(false)
  return playback
}

afterEach(() => {
  vi.useRealTimers()
})

describe('hero playback', () => {
  it('plays each story to its outcome, holds four seconds, and returns to email', () => {
    const playback = clock()
    expect(playback.getState().storyId).toBe('meeting')
    expect(playback.getState().beatIndex).toBe(0)

    vi.advanceTimersByTime(3000)
    expect(playback.getState().beatIndex).toBe(1)
    vi.advanceTimersByTime(5000)
    expect(playback.getState().beatIndex).toBe(2)
    vi.advanceTimersByTime(3000)
    expect(playback.getState().beatIndex).toBe(3)

    vi.advanceTimersByTime(HOLD_MS - 1)
    expect(playback.getState().storyId).toBe('meeting')

    vi.advanceTimersByTime(1)
    expect(playback.getState().storyId).toBe('interruption')
    expect(playback.getState().beatIndex).toBe(0)

    vi.advanceTimersByTime(5000 + 2000 + 4000 + HOLD_MS)
    expect(playback.getState().storyId).toBe('introductions')

    vi.advanceTimersByTime(2000 + 5000 + 2000 + HOLD_MS)
    expect(playback.getState().storyId).toBe('meeting')
    expect(playback.getState().beatIndex).toBe(0)
  })

  it('cancels the old story when a tab is selected', () => {
    const playback = clock()
    vi.advanceTimersByTime(11000 + 2000)
    expect(playback.getState().storyId).toBe('meeting')

    playback.select(2)
    const selected = playback.getState()
    expect(selected.storyId).toBe('introductions')
    expect(selected.mode).toBe('inspect')
    expect(selected.beatIndex).toBe(introductions.beats.length - 1)

    vi.advanceTimersByTime(60000)
    expect(playback.getState().storyId).toBe('introductions')
    expect(playback.getState().beatIndex).toBe(introductions.beats.length - 1)
  })

  it('ignores a stale timer after selection', () => {
    vi.useFakeTimers()
    const queued = []
    const playback = createPlayback(stories, {
      now: () => Date.now(),
      schedule: (fn, ms) => {
        queued.push(fn)
        return setTimeout(fn, ms)
      },
      clear: () => {},
    })
    playback.setOffscreen(false)
    const stale = queued[0]
    playback.select(1)
    stale()
    vi.advanceTimersByTime(60000)
    expect(playback.getState().storyId).toBe('interruption')
    expect(playback.getState().mode).toBe('inspect')
  })

  it('pauses and resumes the remaining reading delay', () => {
    const playback = clock()
    vi.advanceTimersByTime(1000)
    playback.pause()
    vi.advanceTimersByTime(20000)
    expect(playback.getState().beatIndex).toBe(0)
    expect(playback.getState().storyId).toBe('meeting')

    playback.play()
    vi.advanceTimersByTime(1999)
    expect(playback.getState().beatIndex).toBe(0)
    vi.advanceTimersByTime(1)
    expect(playback.getState().beatIndex).toBe(1)
  })

  it('keeps a user pause across hide and show', () => {
    const playback = clock()
    vi.advanceTimersByTime(1000)
    playback.pause()
    playback.setHidden(true)
    vi.advanceTimersByTime(10000)
    playback.setHidden(false)
    vi.advanceTimersByTime(10000)
    expect(playback.getState().beatIndex).toBe(0)

    playback.play()
    vi.advanceTimersByTime(2000)
    expect(playback.getState().beatIndex).toBe(1)
  })

  it('does not let hover release override an explicit pause', () => {
    const playback = clock()
    vi.advanceTimersByTime(1000)
    playback.hover(true)
    playback.pause()
    playback.hover(false)
    vi.advanceTimersByTime(20000)
    expect(playback.getState().beatIndex).toBe(0)
    expect(playback.getState().userPaused).toBe(true)
  })

  it('resumes after a temporary hover', () => {
    const playback = clock()
    vi.advanceTimersByTime(1000)
    playback.hover(true)
    vi.advanceTimersByTime(20000)
    expect(playback.getState().beatIndex).toBe(0)
    playback.hover(false)
    vi.advanceTimersByTime(2000)
    expect(playback.getState().beatIndex).toBe(1)
  })

  it('holds at the end of a replay instead of advancing', () => {
    const playback = clock()
    playback.select(0)
    playback.replay()
    expect(playback.getState().beatIndex).toBe(0)
    expect(playback.getState().mode).toBe('replay')

    vi.advanceTimersByTime(3000 + 5000 + 3000 + HOLD_MS)
    const done = playback.getState()
    expect(done.storyId).toBe('meeting')
    expect(done.mode).toBe('inspect')
    expect(done.beatIndex).toBe(meeting.beats.length - 1)

    vi.advanceTimersByTime(20000)
    expect(playback.getState().storyId).toBe('meeting')
  })

  it('starts the next story when the carousel resumes from a completed tab', () => {
    const playback = clock()
    playback.select(0)
    playback.playCarousel()
    expect(playback.getState().storyId).toBe('interruption')
    expect(playback.getState().beatIndex).toBe(0)
    expect(playback.getState().mode).toBe('auto')
  })

  it('stops on focus until Play, including after the pointer leaves', () => {
    const playback = clock()
    vi.advanceTimersByTime(1000)
    playback.focusEnter()
    playback.focusLeave()
    vi.advanceTimersByTime(20000)
    expect(playback.getState().beatIndex).toBe(0)
    playback.play()
    vi.advanceTimersByTime(2000)
    expect(playback.getState().beatIndex).toBe(1)
  })

  it('shows the finished exchange and does not rotate when reduced motion is on', () => {
    const playback = clock({ reducedMotion: true })
    expect(playback.getState().mode).toBe('inspect')
    expect(playback.getState().beatIndex).toBe(meeting.beats.length - 1)
    vi.advanceTimersByTime(60000)
    expect(playback.getState().storyId).toBe('meeting')

    playback.setReducedMotion(false)
    vi.advanceTimersByTime(60000)
    expect(playback.getState().storyId).toBe('meeting')
    expect(playback.getState().mode).toBe('inspect')
  })

  it('jumps to the finished exchange if reduced motion turns on mid-play', () => {
    const playback = clock()
    vi.advanceTimersByTime(3000)
    expect(playback.getState().beatIndex).toBe(1)
    playback.setReducedMotion(true)
    expect(playback.getState().mode).toBe('inspect')
    expect(playback.getState().beatIndex).toBe(meeting.beats.length - 1)
    vi.advanceTimersByTime(20000)
    expect(playback.getState().storyId).toBe('meeting')
  })

  it('starts a single sequence once the hero is in view', () => {
    vi.useFakeTimers()
    const playback = createPlayback(stories, {
      now: () => Date.now(),
      schedule: (fn, ms) => setTimeout(fn, ms),
      clear: (id) => clearTimeout(id),
    })
    vi.advanceTimersByTime(20000)
    expect(playback.getState().beatIndex).toBe(0)
    playback.setOffscreen(false)
    vi.advanceTimersByTime(3000)
    expect(playback.getState().beatIndex).toBe(1)
    playback.destroy()
    vi.advanceTimersByTime(20000)
    expect(playback.getState().beatIndex).toBe(1)
  })

  it('uses the story file delays for the signal scene', () => {
    const playback = clock()
    vi.advanceTimersByTime(3000 + 5000 + 3000 + HOLD_MS)
    expect(playback.getState().storyId).toBe(interruption.id)
    vi.advanceTimersByTime(5000)
    expect(playback.getState().beatIndex).toBe(1)
    vi.advanceTimersByTime(2000)
    expect(playback.getState().beatIndex).toBe(2)
  })
})
