import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BookingModal from './BookingModal'
import bgDay from '../assets/Daytime.jpg'
import bgNight from '../assets/Nightime.jpg'

const categoryEmojis = {
  romance:  '🌹',
  fun:      '😄',
  adventure:'🌿',
  food:     '🍜',
  roadtrip: '🚗',
}

const categoryColors = {
  romance:  { bg: 'linear-gradient(135deg, #E8A598 0%, #F5C842 100%)', soft: '#FFF5F3' },
  fun:      { bg: 'linear-gradient(135deg, #F5C842 0%, #F0A868 100%)', soft: '#FFFAED' },
  adventure:{ bg: 'linear-gradient(135deg, #8FAF6A 0%, #F5C842 100%)', soft: '#F5F8EE' },
  food:     { bg: 'linear-gradient(135deg, #F0A868 0%, #F5C842 100%)', soft: '#FFF5EC' },
  roadtrip: { bg: 'linear-gradient(135deg, #5C3D1E 0%, #8B6340 100%)', soft: '#F5F0E8' },
}

// Warm stars for road trip reveal
const RT_STARS = [
  { id: 0, x: 8,  y: 6,  s: 1.8, d: 0.2 }, { id: 1, x: 23, y: 14, s: 1.2, d: 0.9 },
  { id: 2, x: 40, y: 4,  s: 2.2, d: 0.1 }, { id: 3, x: 57, y: 19, s: 1.5, d: 1.2 },
  { id: 4, x: 73, y: 8,  s: 1.0, d: 0.5 }, { id: 5, x: 86, y: 25, s: 1.7, d: 0.3 },
  { id: 6, x: 12, y: 32, s: 1.3, d: 1.4 }, { id: 7, x: 65, y: 37, s: 1.9, d: 0.7 },
  { id: 8, x: 92, y: 12, s: 1.4, d: 1.0 }, { id: 9, x: 48, y: 28, s: 1.1, d: 0.6 },
]

export default function DateRevealScreen({ date, onDone, onWait }) {
  const [showBooking, setShowBooking] = useState(false)
  const colors     = categoryColors[date.category] || categoryColors.fun
  const isRoadTrip = date.category === 'roadtrip'

  return (
    <motion.div
      key="reveal"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        minHeight: '100%', display: 'flex', flexDirection: 'column',
        background: isRoadTrip ? 'linear-gradient(180deg, #080508 0%, #120D0A 40%, #1E1508 100%)' : colors.soft,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Time-of-day background (non-road-trip only) */}
      {!isRoadTrip && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url(${date.time === 'night' ? bgNight : bgDay})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.1,
        }} />
      )}

      {/* Road trip stars */}
      {isRoadTrip && RT_STARS.map(s => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + s.d, repeat: Infinity, delay: s.d }}
          style={{
            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
            width: s.s, height: s.s, background: '#FFE580', borderRadius: '50%',
            pointerEvents: 'none', boxShadow: `0 0 ${s.s * 3}px rgba(255,220,100,0.8)`,
          }}
        />
      ))}

      {/* Top colour band */}
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
        {isRoadTrip && (
          <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #5C3D1E 0%, #8B6340 100%)', borderRadius: 99, padding: '4px 14px', fontSize: 11, fontWeight: 800, color: '#FFF3C0', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>
            Road Trip
          </div>
        )}
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

      {/* Buttons */}
      <div style={{ padding: '20px 20px 52px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 10 }}>
        <motion.button
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowBooking(true)}
          style={{ width: '100%', padding: '18px 0', borderRadius: 999, border: 'none', background: colors.bg, color: '#3D2B0A', fontSize: 17, fontWeight: 800, boxShadow: '0 8px 28px rgba(92,61,30,0.18)' }}
        >
          Let's do this 🥚
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          onClick={() => onWait(date.id)}
          style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: isRoadTrip ? 'rgba(255,220,120,0.45)' : 'rgba(92,61,30,0.35)', padding: '6px 0' }}
        >
          or wait 24 hours
        </motion.button>
      </div>
      {/* Booking modal */}
      <AnimatePresence>
        {showBooking && (
          <BookingModal
            date={date}
            onConfirm={() => { setShowBooking(false); onDone(date.id) }}
            onClose={() => setShowBooking(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
