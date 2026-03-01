import { motion } from 'framer-motion'
import { dates, ROAD_TRIP_CODES } from '../data/dates'

export default function RoadTripRevealScreen({ unlockedRoadTrips, onDone, onPickAgain }) {
  // Show road trips in unlock order
  const order = ['TORTUGA01', 'VEGAS02', 'NOLA03']
  const unlocked = order.filter(code => unlockedRoadTrips.includes(code))

  // Pick the first unlocked trip's date
  const codeKey = unlocked[0]
  const tripSlug = ROAD_TRIP_CODES[codeKey]
  const date = dates.find(d => d.roadTripCode === tripSlug)

  if (!date) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#7c6a9e' }}>
        <p>Something went wrong finding your road trip 🥚</p>
        <button onClick={onPickAgain} style={{ marginTop: 20, color: '#6c5ce7' }}>Go back</button>
      </div>
    )
  }

  return (
    <motion.div
      key="roadtrip-reveal"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 60%, #24243e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Stars bg */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            width: Math.random() * 2.5 + 1,
            height: Math.random() * 2.5 + 1,
            background: '#fff',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Gradient band */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 220,
          background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
          borderRadius: '0 0 40px 40px',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          paddingTop: 64,
          fontSize: 64,
        }}
      >
        🚗
      </motion.div>

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          margin: '24px 20px 0',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 28,
          padding: '28px 24px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            borderRadius: 99,
            padding: '4px 14px',
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          Road Trip
        </div>
        <h1
          className="font-display"
          style={{ fontSize: 26, fontWeight: 700, color: '#1e1030', lineHeight: 1.25, marginBottom: 12 }}
        >
          {date.title}
        </h1>
        <p style={{ fontSize: 15, color: '#6b5b8a', lineHeight: 1.65 }}>{date.description}</p>

        {/* All unlocked trips list */}
        {unlocked.length > 1 && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0e8ff' }}>
            <p style={{ fontSize: 12, color: '#b4a0cc', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Your unlocked trips
            </p>
            {unlocked.map(code => {
              const slug = ROAD_TRIP_CODES[code]
              const d = dates.find(x => x.roadTripCode === slug)
              return (
                <div key={code} style={{ fontSize: 13, color: '#7c6a9e', padding: '4px 0' }}>
                  🚗 {d?.title}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ padding: '20px 20px 48px', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto', position: 'relative', zIndex: 10 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onDone(date.id)}
          style={{
            width: '100%',
            padding: '18px 0',
            borderRadius: 999,
            border: 'none',
            background: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
            color: '#fff',
            fontSize: 17,
            fontWeight: 700,
            boxShadow: '0 8px 28px rgba(108,92,231,0.4)',
          }}
        >
          Let's do this 🥚
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onPickAgain}
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Pick again ↩
        </motion.button>
      </div>
    </motion.div>
  )
}
