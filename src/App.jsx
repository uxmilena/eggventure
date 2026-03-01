import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameState } from './hooks/useGameState'
import { getDateOptions, dates, ROAD_TRIP_CODES } from './data/dates'
import { riddles } from './data/riddles'
import LandingScreen from './components/LandingScreen'
import RiddleScreen from './components/RiddleScreen'
import DayNightScreen from './components/DayNightScreen'
import CategoryScreen from './components/CategoryScreen'
import SubMoodScreen from './components/SubMoodScreen'
import DateRevealScreen from './components/DateRevealScreen'
import RoadTripModal from './components/RoadTripModal'

const SCREENS = {
  LANDING:  'landing',
  RIDDLE:   'riddle',
  DAYNIGHT: 'daynight',
  CATEGORY: 'category',
  SUBMOOD:  'submood',
  REVEAL:   'reveal',
}

function pickDate(options, completedDates) {
  const undone = options.filter(d => !completedDates.includes(d.id))
  const pool   = undone.length > 0 ? undone : options
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function App() {
  const { state, markDateDone, unlockRoadTrip } = useGameState()

  const [screen, setScreen]             = useState(SCREENS.LANDING)
  const [time, setTime]                 = useState(null)
  const [category, setCategory]         = useState(null)
  const [submood, setSubmood]           = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showRoadTripModal, setShowRoadTripModal] = useState(false)

  // Riddle index computed from progress — cycles through available riddles
  const riddleIndex  = state.completedDates.length % riddles.length
  const currentRiddle = riddles[riddleIndex]

  // ── Navigation handlers ────────────────────────────────────────────────

  function handleStart() {
    setScreen(SCREENS.RIDDLE)
  }

  function handleRiddleSolved() {
    setScreen(SCREENS.DAYNIGHT)
  }

  function handleTimePick(selectedTime) {
    setTime(selectedTime)
    setScreen(SCREENS.CATEGORY)
  }

  function handleCategorySelect(cat) {
    setCategory(cat)
    if (cat === 'roadtrip') {
      // Pick a road trip date and go straight to reveal
      const order    = ['TURTLES', 'HANGOVER', 'BEIGNET']
      const unlocked = order.filter(code => state.roadTripUnlocked.includes(code))
      const code     = unlocked[0]
      const tripSlug = ROAD_TRIP_CODES[code]
      const rtDate   = dates.find(d => d.roadTripCode === tripSlug)
      setSelectedDate(rtDate || null)
      setScreen(SCREENS.REVEAL)
    } else {
      setScreen(SCREENS.SUBMOOD)
    }
  }

  function handleSubMoodSelect(mood) {
    setSubmood(mood)
    const options = getDateOptions(category, mood, time)
    if (options.length === 0) {
      const fallback = getDateOptions(category, mood, time === 'day' ? 'night' : 'day')
      setSelectedDate(
        fallback.length > 0
          ? pickDate(fallback, state.completedDates)
          : { id: 'placeholder', title: 'Coming soon 🥚', description: 'Something special is being planned…', category }
      )
    } else {
      setSelectedDate(pickDate(options, state.completedDates))
    }
    setScreen(SCREENS.REVEAL)
  }

  function handleDone(dateId) {
    markDateDone(dateId)
    // After done, go back to category (keep time selection)
    setCategory(null)
    setSubmood(null)
    setSelectedDate(null)
    setScreen(SCREENS.CATEGORY)
  }

  function handlePickAgain() {
    // Go back to SubMood (same category, keep time)
    setSubmood(null)
    setSelectedDate(null)
    if (category === 'roadtrip') {
      setCategory(null)
      setScreen(SCREENS.CATEGORY)
    } else {
      setScreen(SCREENS.SUBMOOD)
    }
  }

  function handleBackFromCategory() {
    setScreen(SCREENS.DAYNIGHT)
  }

  function handleBackFromSubMood() {
    setSubmood(null)
    setScreen(SCREENS.CATEGORY)
  }

  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100dvh',
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AnimatePresence mode="wait">
        {screen === SCREENS.LANDING && (
          <div key="landing" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <LandingScreen onStart={handleStart} />
          </div>
        )}

        {screen === SCREENS.RIDDLE && (
          <div key="riddle" style={{ flex: 1, minHeight: '100%' }}>
            <RiddleScreen
              riddle={currentRiddle}
              riddleNumber={riddleIndex + 1}
              onSolved={handleRiddleSolved}
            />
          </div>
        )}

        {screen === SCREENS.DAYNIGHT && (
          <div key="daynight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <DayNightScreen onSelect={handleTimePick} />
          </div>
        )}

        {screen === SCREENS.CATEGORY && (
          <div key="category" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <CategoryScreen
              onSelect={handleCategorySelect}
              onRoadTripLocked={() => setShowRoadTripModal(true)}
              unlockedRoadTrips={state.roadTripUnlocked}
              onBack={handleBackFromCategory}
              time={time}
              completedDates={state.completedDates}
            />
          </div>
        )}

        {screen === SCREENS.SUBMOOD && (
          <div key="submood" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <SubMoodScreen
              category={category}
              onSelect={handleSubMoodSelect}
              onBack={handleBackFromSubMood}
            />
          </div>
        )}

        {screen === SCREENS.REVEAL && selectedDate && (
          <div key="reveal" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <DateRevealScreen
              date={selectedDate}
              onDone={handleDone}
              onPickAgain={handlePickAgain}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRoadTripModal && (
          <RoadTripModal
            onClose={() => setShowRoadTripModal(false)}
            onUnlock={(code) => {
              unlockRoadTrip(code)
              setTimeout(() => setShowRoadTripModal(false), 1800)
            }}
            unlockedRoadTrips={state.roadTripUnlocked}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
