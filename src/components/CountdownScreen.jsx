import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import bgImage from '../assets/Countdown.jpg'

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

function getRemaining(lastCompletedAt) {
  const elapsed = Date.now() - lastCompletedAt
  return Math.max(0, TWENTY_FOUR_HOURS - elapsed)
}

function formatTime(ms) {
  const totalSecs = Math.floor(ms / 1000)
  const h = Math.floor(totalSecs / 3600)
  const m = Math.floor((totalSecs % 3600) / 60)
  const s = totalSecs % 60
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':')
}

export default function CountdownScreen({ lastCompletedAt, onReady, onCodeClick }) {
  const [remaining, setRemaining] = useState(() => getRemaining(lastCompletedAt))

  useEffect(() => {
    if (remaining === 0) return
    const id = setInterval(() => {
      const r = getRemaining(lastCompletedAt)
      setRemaining(r)
      if (r === 0) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [lastCompletedAt])

  const isDone = remaining === 0

  return (
    <motion.div
      key="countdown"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(20,8,50,0.55) 0%, rgba(20,8,50,0.92) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 28px',
        gap: 0,
      }}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 64, marginBottom: 24 }}
        >
          {isDone ? '🥚' : '⏳'}
        </motion.div>

        <h2
          className="font-display"
          style={{ fontSize: 30, color: '#FFE580', textAlign: 'center', marginBottom: 12, textShadow: '0 2px 20px rgba(248,150,18,0.5)' }}
        >
          {isDone ? 'The adventure awaits!' : 'Next date unlocks in…'}
        </h2>

        <p style={{ fontSize: 14, color: 'rgba(220,190,255,0.75)', fontWeight: 600, textAlign: 'center', marginBottom: 36, lineHeight: 1.6 }}>
          {isDone
            ? 'Your 24 hours are up. A new riddle is ready for you.'
            : 'Good things take time.\nYour next Eggventure is almost ready.'}
        </p>

        {!isDone && (
          <motion.div
            key="timer"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255,255,255,0.14)',
              borderRadius: 28,
              padding: '20px 40px',
              marginBottom: 40,
            }}
          >
            <span style={{
              fontFamily: 'Nunito, monospace', fontSize: 48, fontWeight: 800,
              color: '#FFE580', letterSpacing: '0.06em',
              textShadow: '0 0 24px rgba(248,150,18,0.6)',
            }}>
              {formatTime(remaining)}
            </span>
          </motion.div>
        )}

        {isDone && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.97 }}
            onClick={onReady}
            style={{
              width: '100%', padding: '20px 0', borderRadius: 999, border: 'none',
              background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)',
              color: '#3D2B0A', fontSize: 18, fontWeight: 800,
              boxShadow: '0 8px 32px rgba(248,150,18,0.52)',
              marginBottom: 40,
            }}
          >
            Begin your adventure →
          </motion.button>
        )}
      </div>

      {/* Secret code shortcut */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingBottom: 48 }}>
        <button
          onClick={onCodeClick}
          style={{ background: 'none', border: 'none', fontSize: 13, color: 'rgba(220,190,255,0.5)', fontWeight: 600 }}
        >
          🔐 Have a secret code?
        </button>
      </div>
    </motion.div>
  )
}
