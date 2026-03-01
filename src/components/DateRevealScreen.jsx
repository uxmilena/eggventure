import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RiddleGate from './RiddleGate'

const categoryEmojis = {
  romance: '🌹',
  fun: '😄',
  adventure: '🌿',
  food: '🍜',
  roadtrip: '🚗',
}

const categoryColors = {
  romance: { bg: 'linear-gradient(135deg, #ff6b9d 0%, #ff8c42 100%)', soft: '#fff0f3' },
  fun: { bg: 'linear-gradient(135deg, #f7c948 0%, #ff8c42 100%)', soft: '#fffbeb' },
  adventure: { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', soft: '#f0fdf4' },
  food: { bg: 'linear-gradient(135deg, #fa8231 0%, #f7b731 100%)', soft: '#fff7ed' },
  roadtrip: { bg: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)', soft: '#f5f3ff' },
}

export default function DateRevealScreen({ date, needsRiddle, onDone, onPickAgain, isFirstEver }) {
  const [riddleSolved, setRiddleSolved] = useState(!needsRiddle)
  const [showFirstMessage, setShowFirstMessage] = useState(false)

  const colors = categoryColors[date.category] || categoryColors.fun

  function handleDone() {
    if (isFirstEver) {
      setShowFirstMessage(true)
    } else {
      onDone(date.id)
    }
  }

  function handleCloseFirstMessage() {
    onDone(date.id)
  }

  if (!riddleSolved) {
    return <RiddleGate onSolved={() => setRiddleSolved(true)} />
  }

  return (
    <motion.div
      key="reveal"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: colors.soft,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top gradient band */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 220,
          background: colors.bg,
          borderRadius: '0 0 40px 40px',
        }}
      />

      {/* Floating emoji */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          paddingTop: 64,
          fontSize: 64,
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
        }}
      >
        {categoryEmojis[date.category] || '🥚'}
      </motion.div>

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          margin: '24px 20px 0',
          background: '#fff',
          borderRadius: 28,
          padding: '28px 24px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display"
          style={{ fontSize: 28, fontWeight: 700, color: '#1e1030', lineHeight: 1.25, marginBottom: 12 }}
        >
          {date.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ fontSize: 15, color: '#6b5b8a', lineHeight: 1.65 }}
        >
          {date.description}
        </motion.p>
      </div>

      {/* Buttons */}
      <div style={{ padding: '20px 20px 48px', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleDone}
          style={{
            width: '100%',
            padding: '18px 0',
            borderRadius: 999,
            border: 'none',
            background: colors.bg,
            color: '#fff',
            fontSize: 17,
            fontWeight: 700,
            boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
          }}
        >
          Let's do this 🥚
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPickAgain}
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: 999,
            border: '2px solid #e8d5f5',
            background: 'transparent',
            color: '#7c6a9e',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Pick again ↩
        </motion.button>
      </div>

      {/* First-ever completion modal */}
      <AnimatePresence>
        {showFirstMessage && (
          <motion.div
            key="firstmsg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(30,16,48,0.75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 28,
              zIndex: 100,
            }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              style={{
                background: '#fff',
                borderRadius: 28,
                padding: '36px 28px',
                textAlign: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                maxWidth: 360,
                width: '100%',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
              <p
                className="font-display"
                style={{ fontSize: 16, color: '#3d2b6e', lineHeight: 1.7, fontStyle: 'italic' }}
              >
                "Psst… there's a secret road trip waiting for you. Ask your person for the code 🗺️"
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCloseFirstMessage}
                style={{
                  marginTop: 24,
                  width: '100%',
                  padding: '16px 0',
                  borderRadius: 999,
                  border: 'none',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Ooh, exciting! ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
