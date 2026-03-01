import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const skyThemes = {
  day: {
    gradient: 'linear-gradient(180deg, #7ec8e3 0%, #a8d8ea 50%, #ffecd2 100%)',
    label: 'Daytime ☀️',
  },
  sunset: {
    gradient: 'linear-gradient(180deg, #ff7e5f 0%, #feb47b 40%, #ffd89b 100%)',
  },
  night: {
    gradient: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    label: 'Nighttime 🌙',
  },
}

function Star({ x, y, size, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.7, 1] }}
      transition={{ delay, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: '#fff',
        borderRadius: '50%',
        boxShadow: '0 0 4px 1px rgba(255,255,255,0.8)',
      }}
    />
  )
}

const STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 65,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 2,
}))

export default function DayNightScreen({ onSelect, onBack }) {
  const [isNight, setIsNight] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  function toggle() {
    setTransitioning(true)
    setTimeout(() => setTransitioning(false), 800)
    setIsNight(v => !v)
  }

  const skyStyle = transitioning
    ? skyThemes.sunset.gradient
    : isNight
    ? skyThemes.night.gradient
    : skyThemes.day.gradient

  return (
    <motion.div
      key="daynight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated sky background */}
      <motion.div
        animate={{ background: skyStyle }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: skyStyle,
        }}
      />

      {/* Stars (night only) */}
      <AnimatePresence>
        {isNight && !transitioning && (
          <motion.div
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            {STARS.map(s => <Star key={s.id} {...s} />)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sun */}
      <AnimatePresence>
        {!isNight && (
          <motion.div
            key="sun"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 72,
              right: 48,
              width: 72,
              height: 72,
              background: 'radial-gradient(circle, #ffe066 50%, #ffb347 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 60px 20px rgba(255,220,80,0.5)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Moon */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            key="moon"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: 64,
              right: 44,
              width: 64,
              height: 64,
              background: 'radial-gradient(circle at 40% 40%, #f8f0e3 50%, #c8b8a2 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 40px 12px rgba(248,240,227,0.35)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Clouds (day only) */}
      <AnimatePresence>
        {!isNight && (
          <motion.div
            key="clouds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            {[
              { top: 90, left: 20 },
              { top: 140, right: 100 },
              { top: 200, left: 60 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...pos,
                  width: 80,
                  height: 28,
                  background: 'rgba(255,255,255,0.8)',
                  borderRadius: 50,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <div style={{ position: 'relative', zIndex: 10, padding: '48px 24px 0' }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: 999,
            padding: '8px 18px',
            fontSize: 14,
            color: isNight ? '#e2d9f3' : '#3d2b6e',
            fontWeight: 500,
          }}
        >
          ← Back
        </button>
      </div>

      {/* Center content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          gap: 24,
        }}
      >
        <motion.h2
          animate={{ color: isNight ? '#e2d9f3' : '#2d1b69' }}
          transition={{ duration: 0.8 }}
          className="font-display"
          style={{ fontSize: 30, fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}
        >
          When are you going?
        </motion.h2>

        {/* Toggle pill */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={toggle}
          style={{
            background: isNight ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(12px)',
            border: `2px solid ${isNight ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)'}`,
            borderRadius: 999,
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 600,
            color: isNight ? '#e2d9f3' : '#3d2b6e',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span>{isNight ? '🌙' : '☀️'}</span>
          <span>{isNight ? 'Night mode' : 'Day mode'}</span>
          <span style={{ fontSize: 12, opacity: 0.7 }}>tap to switch</span>
        </motion.button>
      </div>

      {/* Bottom buttons */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 24px 48px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelect('day')}
          style={{
            width: '100%',
            padding: '18px 0',
            borderRadius: 999,
            background: !isNight
              ? 'linear-gradient(135deg, #ffe066 0%, #ffb347 100%)'
              : 'rgba(255,255,255,0.15)',
            backdropFilter: isNight ? 'blur(8px)' : 'none',
            color: !isNight ? '#5a3a00' : 'rgba(255,255,255,0.6)',
            fontSize: 18,
            fontWeight: 700,
            boxShadow: !isNight ? '0 8px 28px rgba(255,179,71,0.45)' : 'none',
            border: isNight ? '1px solid rgba(255,255,255,0.2)' : 'none',
          }}
        >
          Daytime ☀️
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelect('night')}
          style={{
            width: '100%',
            padding: '18px 0',
            borderRadius: 999,
            background: isNight
              ? 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)'
              : 'rgba(255,255,255,0.3)',
            backdropFilter: !isNight ? 'blur(8px)' : 'none',
            color: isNight ? '#fff' : 'rgba(45,27,105,0.5)',
            fontSize: 18,
            fontWeight: 700,
            boxShadow: isNight ? '0 8px 28px rgba(108,92,231,0.45)' : 'none',
            border: !isNight ? '1px solid rgba(255,255,255,0.5)' : 'none',
          }}
        >
          Nighttime 🌙
        </motion.button>
      </div>
    </motion.div>
  )
}
