import { useState, useEffect } from 'react'

const DEFAULT_STATE = {
  firstDateDone: false,
  completedDates: [],
  roadTripUnlocked: [],
  lastCompletedAt: null,
  usedRiddleIds: [],
  currentRiddleId: null,
}

function loadState() {
  try {
    const raw = localStorage.getItem('eggventure')
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

function saveState(state) {
  localStorage.setItem('eggventure', JSON.stringify(state))
}

export function useGameState() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  function markDateDone(dateId) {
    setState(prev => ({
      ...prev,
      firstDateDone: true,
      lastCompletedAt: Date.now(),
      completedDates: prev.completedDates.includes(dateId)
        ? prev.completedDates
        : [...prev.completedDates, dateId],
    }))
  }

  function unlockRoadTrip(code) {
    const normalized = code.trim().toUpperCase()
    setState(prev => ({
      ...prev,
      roadTripUnlocked: prev.roadTripUnlocked.includes(normalized)
        ? prev.roadTripUnlocked
        : [...prev.roadTripUnlocked, normalized],
    }))
  }

  function isRoadTripUnlocked(code) {
    return state.roadTripUnlocked.includes(code.trim().toUpperCase())
  }

  function pickNextRiddle(riddleList) {
    const used = state.usedRiddleIds
    const available = riddleList.filter(r => !used.includes(r.id))
    const pool = available.length > 0 ? available : riddleList
    const picked = pool[Math.floor(Math.random() * pool.length)]
    setState(prev => ({
      ...prev,
      currentRiddleId: picked.id,
      usedRiddleIds: available.length > 0
        ? [...prev.usedRiddleIds, picked.id]
        : [picked.id], // reset when all used
    }))
    return picked
  }

  function isDateDone(dateId) {
    return state.completedDates.includes(dateId)
  }

  return {
    state,
    markDateDone,
    unlockRoadTrip,
    pickNextRiddle,
    isRoadTripUnlocked,
    isDateDone,
  }
}
