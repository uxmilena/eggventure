import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ROAD_TRIP_CODES } from '../data/dates'

const VALID_CODES = Object.keys(ROAD_TRIP_CODES)

function ConfettiPiece({ x, color, delay }) {
  return (
    <motion.div
      initial={{ y: -20, x, opacity: 1, rotate: 0 }}
      animate={{ y: 420, x: x + (Math.random() - 0.5) * 120, opacity: 0, rotate: Math.random() * 720 }}
      transition={{ duration: 1.8, delay, ease: 'easeIn' }}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 8,
        height: 8,
        background: color,
        borderRadius: Math.random() > 0.5 ? '50%' : 2,
        pointerEvents: 'none',
      }}
    />
  )
}

const CONFETTI_COLORS = ['#ff6b9d', '#ffe066', '#43e97b', '#a29bfe', '#ff8c42', '#38f9d7']
const CONFETTI = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 200,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  delay: Math.random() * 0.4,
}))

export default function RoadTripModal({ onClose, onUnlock, unlockedRoadTrips }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [shaking, setShaking] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const normalized = code.trim().toUpperCase()

    if (!VALID_CODES.includes(normalized)) {
      setError("Hmm, that code doesn't seem right 🤔")
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }

    if (unlockedRoadTrips.includes(normalized)) {
      setError("You've already unlocked this one! 🎉")
      return
    }

    // Valid new code!
    setError('')
    setSuccess(true)
    setConfetti(true)
    onUnlock(normalized)
    setTimeout(() => setConfetti(false), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        key="rt-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(30,16,48,0.7)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 200,
          padding: '0 0 0 0',
        }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          key="rt-sheet"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          style={{
            background: '#fff',
            borderRadius: '28px 28px 0 0',
            padding: '32px 28px 48px',
            width: '100%',
            maxWidth: 430,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Confetti layer */}
          {confetti && CONFETTI.map(c => <ConfettiPiece key={c.id} {...c} />)}

          {/* Drag handle */}
          <div style={{ width: 40, height: 4, background: '#e2d5f5', borderRadius: 99, margin: '0 auto 24px' }} />

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🚗</div>
            <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#1e1030' }}>
              {success ? 'Road Trip Unlocked! 🎉' : 'Secret Road Trip'}
            </h2>
            <p style={{ fontSize: 14, color: '#7c6a9e', marginTop: 8 }}>
              {success
                ? 'Pack your bags — adventure awaits!'
                : 'Got a code? Enter it to unlock a surprise adventure.'}
            </p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <motion.input
                animate={shaking ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                type="text"
                value={code}
                onChange={e => { setCode(e.target.value); setError('') }}
                placeholder="Enter your code…"
                style={{
                  width: '100%',
                  padding: '16px 18px',
                  borderRadius: 14,
                  border: `2px solid ${error ? '#ff6b9d' : '#e8d5f5'}`,
                  fontSize: 16,
                  background: '#fdf6ff',
                  color: '#2d1b69',
                  outline: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 13, color: '#e05a78', textAlign: 'center' }}
                >
                  {error}
                </motion.p>
              )}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px 0',
                  borderRadius: 999,
                  border: 'none',
                  background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: '0 6px 24px rgba(108,92,231,0.35)',
                }}
              >
                Unlock Adventure 🗺️
              </motion.button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  color: '#b4a0cc',
                  padding: '8px 0',
                }}
              >
                Not yet
              </button>
            </form>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              style={{
                width: '100%',
                padding: '18px 0',
                borderRadius: 999,
                border: 'none',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: '#0a4a2e',
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Let's go! 🚗
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
