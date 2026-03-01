import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameState } from './hooks/useGameState'
import { getDateOptions, dates as allDates } from './data/dates'
import LandingScreen from './components/LandingScreen'
import CategoryScreen from './components/CategoryScreen'
import SubMoodScreen from './components/SubMoodScreen'
import DayNightScreen from './components/DayNightScreen'
import DateRevealScreen from './components/DateRevealScreen'
import RoadTripModal from './components/RoadTripModal'
import RoadTripRevealScreen from './components/RoadTripRevealScreen'

// Screen constants
const SCREENS = {
  LANDING: 'landing',
  CATEGORY: 'category',
  SUBMOOD: 'submood',
  DAYNIGHT: 'daynight',
  REVEAL: 'reveal',
  ROADTRIP_REVEAL: 'roadtrip_reveal',
}

// Pick a random date from options, preferring undone ones
function pickDate(options, completedDates) {
  const undone = options.filter(d => !completedDates.includes(d.id))
  const pool = undone.length > 0 ? undone : options
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function App() {
  const { state, markDateDone, unlockRoadTrip, isDateDone, needsRiddle } = useGameState()

  const [screen, setScreen] = useState(SCREENS.LANDING)
  const [category, setCategory] = useState(null)
  const [submood, setSubmood] = useState(null)
  const [time, setTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showRoadTripModal, setShowRoadTripModal] = useState(false)

  function handleStart() {
    setScreen(SCREENS.CATEGORY)
  }

  function handleCategorySelect(cat) {
    setCategory(cat)
    if (cat === 'roadtrip') {
      // Go straight to road trip reveal (already unlocked, since we checked in category screen)
      setScreen(SCREENS.ROADTRIP_REVEAL)
    } else if (!['romance', 'fun', 'adventure', 'food'].includes(cat) || !['romance', 'fun', 'adventure', 'food'].some(c => c === cat)) {
      setScreen(SCREENS.SUBMOOD)
    } else {
      setScreen(SCREENS.SUBMOOD)
    }
  }

  function handleSubMoodSelect(mood) {
    setSubmood(mood)
    setScreen(SCREENS.DAYNIGHT)
  }

  function handleTimeSelect(selectedTime) {
    setTime(selectedTime)
    const options = getDateOptions(category, submood, selectedTime)
    if (options.length === 0) {
      // fallback: try any time
      const fallback = getDateOptions(category, submood, selectedTime === 'day' ? 'night' : 'day')
      const date = fallback.length > 0
        ? pickDate(fallback, state.completedDates)
        : { id: 'placeholder', title: 'Coming soon 🥚', description: 'Something special is being planned…', category }
      setSelectedDate(date)
    } else {
      setSelectedDate(pickDate(options, state.completedDates))
    }
    setScreen(SCREENS.REVEAL)
  }

  function handleDone(dateId) {
    markDateDone(dateId)
    resetToCategory()
  }

  function handlePickAgain() {
    // Re-pick from same options
    if (category === 'roadtrip') {
      setScreen(SCREENS.ROADTRIP_REVEAL)
      return
    }
    const options = getDateOptions(category, submood, time)
    if (options.length > 0) {
      setSelectedDate(pickDate(options, state.completedDates))
    }
    setScreen(SCREENS.REVEAL)
  }

  function resetToCategory() {
    setCategory(null)
    setSubmood(null)
    setTime(null)
    setSelectedDate(null)
    setScreen(SCREENS.CATEGORY)
  }

  function handleBack() {
    if (screen === SCREENS.SUBMOOD) setScreen(SCREENS.CATEGORY)
    else if (screen === SCREENS.DAYNIGHT) setScreen(SCREENS.SUBMOOD)
    else if (screen === SCREENS.REVEAL) {
      if (category && submood) setScreen(SCREENS.DAYNIGHT)
      else setScreen(SCREENS.CATEGORY)
    }
    else if (screen === SCREENS.ROADTRIP_REVEAL) setScreen(SCREENS.CATEGORY)
    else setScreen(SCREENS.CATEGORY)
  }

  const isFirstEver = !state.firstDateDone && state.completedDates.length === 0

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

        {screen === SCREENS.CATEGORY && (
          <div key="category" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <CategoryScreen
              onSelect={handleCategorySelect}
              onRoadTripLocked={() => setShowRoadTripModal(true)}
              unlockedRoadTrips={state.roadTripUnlocked}
              gameState={state}
            />
          </div>
        )}

        {screen === SCREENS.SUBMOOD && (
          <div key="submood" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <SubMoodScreen
              category={category}
              onSelect={handleSubMoodSelect}
              onBack={handleBack}
            />
          </div>
        )}

        {screen === SCREENS.DAYNIGHT && (
          <div key="daynight" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <DayNightScreen onSelect={handleTimeSelect} onBack={handleBack} />
          </div>
        )}

        {screen === SCREENS.REVEAL && selectedDate && (
          <div key="reveal" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <DateRevealScreen
              date={selectedDate}
              needsRiddle={needsRiddle()}
              onDone={handleDone}
              isFirstEver={isFirstEver}
            />
          </div>
        )}

        {screen === SCREENS.ROADTRIP_REVEAL && (
          <div key="roadtrip" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <RoadTripRevealScreen
              unlockedRoadTrips={state.roadTripUnlocked}
              onDone={handleDone}
              onPickAgain={resetToCategory}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Road Trip Modal */}
      <AnimatePresence>
        {showRoadTripModal && (
          <RoadTripModal
            onClose={() => setShowRoadTripModal(false)}
            onUnlock={(code) => {
              unlockRoadTrip(code)
              setTimeout(() => {
                setShowRoadTripModal(false)
              }, 1800)
            }}
            unlockedRoadTrips={state.roadTripUnlocked}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
