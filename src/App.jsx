import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameState } from './hooks/useGameState'
import { getDateOptions, dates, ROAD_TRIP_CODES } from './data/dates'
import { riddles } from './data/riddles'
import LandingScreen from './components/LandingScreen'
import CountdownScreen from './components/CountdownScreen'
import HowToPlayScreen from './components/HowToPlayScreen'
import RiddleScreen from './components/RiddleScreen'
import DayNightScreen from './components/DayNightScreen'
import CategoryScreen from './components/CategoryScreen'
import SubMoodScreen from './components/SubMoodScreen'
import DateRevealScreen from './components/DateRevealScreen'
import RoadTripModal from './components/RoadTripModal'

const SCREENS = {
  LANDING:   'landing',
  COUNTDOWN: 'countdown',
  HOWTOPLAY: 'howtoplay',
  RIDDLE:    'riddle',
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
  const { state, markDateDone, unlockRoadTrip, pickNextRiddle } = useGameState()

  const [screen, setScreen]             = useState(SCREENS.LANDING)
  const [time, setTime]                 = useState(null)
  const [category, setCategory]         = useState(null)
  const [submood, setSubmood]           = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentRiddle, setCurrentRiddle] = useState(null)
  const [showRoadTripModal, setShowRoadTripModal] = useState(false)

  // ── Navigation handlers ────────────────────────────────────────────────

  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

  function handleStart() {
    setScreen(SCREENS.HOWTOPLAY)
  }

  function handleCountdownReady() {
    setScreen(SCREENS.HOWTOPLAY)
  }

  function handleHowToPlayContinue() {
    const riddle = pickNextRiddle(riddles)
    setCurrentRiddle(riddle)
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
    setTime(null)
    setCategory(null)
    setSubmood(null)
    setSelectedDate(null)
    setScreen(SCREENS.COUNTDOWN)
  }

  function handleWait(dateId) {
    markDateDone(dateId)
    setTime(null)
    setCategory(null)
    setSubmood(null)
    setSelectedDate(null)
    setScreen(SCREENS.COUNTDOWN)
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

        {screen === SCREENS.COUNTDOWN && (
          <div key="countdown" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <CountdownScreen
              lastCompletedAt={state.lastCompletedAt}
              onReady={handleCountdownReady}
              onCodeClick={() => setShowRoadTripModal(true)}
            />
          </div>
        )}

        {screen === SCREENS.HOWTOPLAY && (
          <div key="howtoplay" style={{ flex: 1, overflowY: 'auto', minHeight: '100%' }}>
            <HowToPlayScreen onContinue={handleHowToPlayContinue} />
          </div>
        )}

        {screen === SCREENS.RIDDLE && currentRiddle && (
          <div key="riddle" style={{ flex: 1, minHeight: '100%' }}>
            <RiddleScreen
              riddle={currentRiddle}
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
              time={time}
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
              onWait={handleWait}
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
