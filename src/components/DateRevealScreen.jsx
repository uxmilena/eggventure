import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RiddleGate from './RiddleGate'
import BookingModal from './BookingModal'

const categoryEmojis = { romance: '🌹', fun: '😄', adventure: '🌿', food: '🍜', roadtrip: '🚗' }

const categoryColors = {
  romance:  { bg: 'linear-gradient(135deg, #E8A598 0%, #F5C842 100%)', soft: '#FFF5F3' },
  fun:      { bg: 'linear-gradient(135deg, #F5C842 0%, #F0A868 100%)', soft: '#FFFAED' },
  adventure:{ bg: 'linear-gradient(135deg, #8FAF6A 0%, #F5C842 100%)', soft: '#F5F8EE' },
  food:     { bg: 'linear-gradient(135deg, #F0A868 0%, #F5C842 100%)', soft: '#FFF5EC' },
  roadtrip: { bg: 'linear-gradient(135deg, #5C3D1E 0%, #8B6340 100%)', soft: '#F5F0E8' },
}

export default function DateRevealScreen({ date, needsRiddle, onDone, isFirstEver }) {
  const [riddleSolved, setRiddleSolved] = useState(!needsRiddle)
  const [showBooking, setShowBooking]   = useState(false)
  const [showFirstMsg, setShowFirstMsg] = useState(false)

  const colors = categoryColors[date.category] || categoryColors.fun

  function handleBookingConfirm() {
    setShowBooking(false)
    if (isFirstEver) setShowFirstMsg(true)
    else onDone(date.id)
  }

  if (!riddleSolved) return <RiddleGate onSolved={() => setRiddleSolved(true)} />

  return (
    <motion.div
      key="reveal"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: colors.soft, position: 'relative', overflow: 'hidden' }}
    >
      {/* Top band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 230, background: colors.bg, borderRadius: '0 0 44px 44px' }} />

      {/* Floating emoji */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: 64, fontSize: 66, filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.14))' }}
      >
        {categoryEmojis[date.category] || '🥚'}
      </motion.div>

      {/* Card */}
      <div style={{ position: 'relative', zIndex: 10, margin: '24px 20px 0', background: '#FFFDF5', borderRadius: 32, padding: '28px 24px', boxShadow: '0 8px 40px rgba(92,61,30,0.12)' }}>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="font-display"
          style={{ fontSize: 28, color: '#3D2B0A', lineHeight: 1.25, marginBottom: 12 }}
        >
          {date.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ fontSize: 15, color: '#8B6340', lineHeight: 1.7, fontWeight: 600 }}
        >
          {date.description}
        </motion.p>
      </div>

      {/* CTA */}
      <div style={{ padding: '20px 20px 52px', marginTop: 'auto' }}>
        <motion.button
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowBooking(true)}
          style={{ width: '100%', padding: '18px 0', borderRadius: 999, border: 'none', background: colors.bg, color: '#3D2B0A', fontSize: 17, fontWeight: 800, boxShadow: '0 8px 28px rgba(92,61,30,0.18)' }}
        >
          Let's do this 🥚
        </motion.button>
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {showBooking && <BookingModal date={date} onConfirm={handleBookingConfirm} onClose={() => setShowBooking(false)} />}
      </AnimatePresence>

      {/* First-ever psst message */}
      <AnimatePresence>
        {showFirstMsg && (
          <motion.div
            key="firstmsg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,10,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28, zIndex: 400 }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              style={{ background: '#FFFDF5', borderRadius: 32, padding: '36px 28px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.22)', maxWidth: 360, width: '100%' }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
              <p className="font-display" style={{ fontSize: 17, color: '#3D2B0A', lineHeight: 1.7 }}>
                "Psst… there's a secret road trip waiting for you. Ask your person for the code 🗺️"
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setShowFirstMsg(false); onDone(date.id) }}
                style={{ marginTop: 24, width: '100%', padding: '16px 0', borderRadius: 999, border: 'none', background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)', color: '#3D2B0A', fontSize: 15, fontWeight: 800 }}
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
