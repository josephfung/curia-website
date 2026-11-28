/** One clock for the hero stories. Reading delays live on each beat; the hold lives here. */

export const HOLD_MS = 4000

export function transportAction(state) {
  if (state.reducedMotion || state.mode === 'inspect') return 'play-carousel'
  if (state.userPaused || state.focusPaused) return 'play'
  return 'pause'
}

export function createPlayback(stories, options) {
  const { now, schedule, clear } = options
  const reducedMotion = Boolean(options.reducedMotion)
  let generation = 0
  let timer = null
  let wait = null
  let destroyed = false
  const listeners = new Set()

  const state = {
    storyIndex: 0,
    beatIndex: 0,
    revision: 0,
    mode: 'auto',
    phase: 'live',
    reducedMotion,
    userPaused: false,
    focusPaused: false,
    focusArmed: true,
    hoverPaused: false,
    ignoreHover: false,
    hidden: false,
    offscreen: true,
  }

  function lastBeat(index = state.storyIndex) {
    return Math.max(0, stories[index].beats.length - 1)
  }

  function emit() {
    const snap = getState()
    for (const listener of listeners) listener(snap)
  }

  function getState() {
    return { ...state, storyId: stories[state.storyIndex].id }
  }

  function canRun() {
    return !destroyed
      && !state.reducedMotion
      && (state.mode === 'auto' || state.mode === 'replay')
      && !state.userPaused
      && !state.focusPaused
      && !state.hoverPaused
      && !state.hidden
      && !state.offscreen
  }

  function stopTimer() {
    if (timer != null) {
      clear(timer)
      timer = null
    }
  }

  function freezeWait() {
    if (!wait || timer == null || wait.startedAt == null) return
    const elapsed = Math.max(0, now() - wait.startedAt)
    wait.remaining = Math.max(0, wait.total - elapsed)
    wait.startedAt = null
    stopTimer()
  }

  function arm(ms, kind) {
    stopTimer()
    const token = ++generation
    const total = Math.max(0, ms)
    wait = { token, kind, total, remaining: total, startedAt: null }
    if (!canRun()) return
    wait.startedAt = now()
    timer = schedule(() => {
      if (destroyed || token !== generation) return
      timer = null
      wait = null
      if (kind === 'beat') onBeat()
      else onHoldDone()
    }, total)
  }

  function pendingKind() {
    if (state.beatIndex < lastBeat()) return 'beat'
    if (state.phase !== 'held') return 'hold'
    return null
  }

  function delayFor(kind) {
    if (kind === 'hold') return HOLD_MS
    return stories[state.storyIndex].beats[state.beatIndex].readMs ?? 0
  }

  function queueFromHere() {
    if (state.reducedMotion || state.mode === 'inspect') {
      stopTimer()
      wait = null
      return
    }
    if (state.phase === 'held' && state.beatIndex >= lastBeat()) {
      if (state.mode === 'auto' && canRun()) {
        state.storyIndex = (state.storyIndex + 1) % stories.length
        state.beatIndex = 0
        state.phase = 'live'
        state.revision += 1
        emit()
        queueFromHere()
      }
      return
    }
    const kind = pendingKind()
    if (!kind) return
    if (!canRun()) {
      if (!wait) {
        const total = delayFor(kind)
        wait = { token: generation, kind, total, remaining: total, startedAt: null }
      }
      return
    }
    const ms = wait && wait.kind === kind ? wait.remaining : delayFor(kind)
    if (kind === 'hold') state.phase = 'holding'
    arm(ms, kind)
  }

  function onBeat() {
    if (state.beatIndex < lastBeat()) state.beatIndex += 1
    state.phase = 'live'
    emit()
    queueFromHere()
  }

  function onHoldDone() {
    state.phase = 'held'
    if (state.mode === 'replay') {
      state.mode = 'inspect'
      emit()
      return
    }
    emit()
    queueFromHere()
  }

  function select(index) {
    if (index < 0 || index >= stories.length) return
    generation += 1
    stopTimer()
    wait = null
    state.storyIndex = index
    state.beatIndex = lastBeat(index)
    state.mode = 'inspect'
    state.phase = 'held'
    state.userPaused = false
    state.focusPaused = false
    state.revision += 1
    emit()
  }

  function pause() {
    if (state.reducedMotion || state.mode === 'inspect') return
    state.userPaused = true
    freezeWait()
    emit()
  }

  function play() {
    if (state.reducedMotion) return
    if (state.mode === 'inspect') {
      playCarousel()
      return
    }
    state.userPaused = false
    state.focusPaused = false
    state.ignoreHover = true
    state.hoverPaused = false
    emit()
    queueFromHere()
  }

  function replay() {
    generation += 1
    stopTimer()
    wait = null
    state.revision += 1
    if (state.reducedMotion) {
      state.mode = 'inspect'
      state.phase = 'held'
      state.beatIndex = lastBeat()
      emit()
      return
    }
    state.mode = 'replay'
    state.userPaused = false
    state.focusPaused = false
    state.ignoreHover = true
    state.hoverPaused = false
    state.beatIndex = 0
    state.phase = 'live'
    emit()
    queueFromHere()
  }

  function playCarousel() {
    if (state.reducedMotion) return
    generation += 1
    stopTimer()
    wait = null
    state.userPaused = false
    state.focusPaused = false
    state.ignoreHover = true
    state.hoverPaused = false
    state.mode = 'auto'
    if (state.phase === 'held' && state.beatIndex >= lastBeat()) {
      state.storyIndex = (state.storyIndex + 1) % stories.length
      state.beatIndex = 0
      state.phase = 'live'
      state.revision += 1
    }
    emit()
    queueFromHere()
  }

  function hover(active) {
    if (active) {
      if (state.ignoreHover || state.userPaused || state.focusPaused || state.reducedMotion) return
      if (state.mode !== 'auto' && state.mode !== 'replay') return
      if (state.hoverPaused) return
      state.hoverPaused = true
      freezeWait()
      return
    }
    const wasHovering = state.hoverPaused
    state.hoverPaused = false
    state.ignoreHover = false
    if (wasHovering && canRun()) queueFromHere()
  }

  function focusEnter() {
    if (!state.focusArmed) return
    state.focusArmed = false
    if (state.reducedMotion) return
    if (state.mode !== 'auto' && state.mode !== 'replay') return
    state.focusPaused = true
    freezeWait()
    emit()
  }

  function focusLeave() {
    state.focusArmed = true
  }

  function setHidden(hidden) {
    if (state.hidden === hidden) return
    state.hidden = hidden
    if (hidden) freezeWait()
    else if (canRun()) queueFromHere()
  }

  function setOffscreen(offscreen) {
    if (state.offscreen === offscreen) return
    state.offscreen = offscreen
    if (offscreen) freezeWait()
    else queueFromHere()
  }

  function setReducedMotion(on) {
    if (state.reducedMotion === on) return
    state.reducedMotion = on
    if (on) {
      generation += 1
      stopTimer()
      wait = null
      state.mode = 'inspect'
      state.phase = 'held'
      state.beatIndex = lastBeat()
      state.userPaused = false
      state.focusPaused = false
      state.hoverPaused = false
      state.revision += 1
    }
    emit()
  }

  function destroy() {
    destroyed = true
    generation += 1
    stopTimer()
    listeners.clear()
  }

  if (reducedMotion) {
    state.mode = 'inspect'
    state.phase = 'held'
    state.beatIndex = lastBeat(0)
  }

  return {
    getState,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    select,
    pause,
    play,
    replay,
    playCarousel,
    hover,
    focusEnter,
    focusLeave,
    setHidden,
    setOffscreen,
    setReducedMotion,
    destroy,
  }
}
