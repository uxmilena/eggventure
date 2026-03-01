import { useState, useEffect } from 'react'

const DEFAULT_STATE = {
  firstDateDone: false,
  completedDates: [],
  roadTripUnlocked: [],
  riddlesSolved: 0,
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
    setState(prev => {
      const isFirst = !prev.firstDateDone && prev.completedDates.length === 0
      return {
        ...prev,
        firstDateDone: true,
        completedDates: prev.completedDates.includes(dateId)
          ? prev.completedDates
          : [...prev.completedDates, dateId],
        riddlesSolved: isFirst ? prev.riddlesSolved : prev.riddlesSolved + 1,
      }
    })
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

  function isDateDone(dateId) {
    return state.completedDates.includes(dateId)
  }

  function needsRiddle() {
    return state.firstDateDone
  }

  return {
    state,
    markDateDone,
    unlockRoadTrip,
    isRoadTripUnlocked,
    isDateDone,
    needsRiddle,
  }
}
