import { motion } from 'framer-motion'
import { dates, ROAD_TRIP_CODES } from '../data/dates'

// Warm stars for the road trip night sky
const RT_STARS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 60,
  s: Math.random() * 2 + 0.8,
  d: Math.random() * 2,
}))

export default function RoadTripRevealScreen({ unlockedRoadTrips, onDone, onPickAgain }) {
  const order   = ['TORTUGA01', 'VEGAS02', 'NOLA03']
  const unlocked = order.filter(code => unlockedRoadTrips.includes(code))
  const codeKey  = unlocked[0]
  const tripSlug = ROAD_TRIP_CODES[codeKey]
  const date     = dates.find(d => d.roadTripCode === tripSlug)

  if (!date) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#8B6340', background: '#FFF8E7', minHeight: '100%' }}>
        <p style={{ fontWeight: 700 }}>Something went wrong finding your road trip 🥚</p>
        <button onClick={onPickAgain} style={{ marginTop: 20, color: '#C8941A', fontWeight: 700, background: 'none', border: 'none', fontSize: 15 }}>Go back</button>
      </div>
    )
  }

  return (
    <motion.div
      key="roadtrip-reveal"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #080508 0%, #120D0A 40%, #1E1508 100%)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Warm golden stars */}
      {RT_STARS.map((s, i) => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: s.d }}
          style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, background: '#FFE580', borderRadius: '50%', pointerEvents: 'none', boxShadow: `0 0 ${s.s * 3}px rgba(255,220,100,0.8)` }}
        />
      ))}

      {/* Top warm gradient band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 230, background: 'linear-gradient(135deg, #5C3D1E 0%, #8B6340 100%)', borderRadius: '0 0 44px 44px' }} />

      {/* Floating icon */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: 64, fontSize: 66 }}
      >
        🚗
      </motion.div>

      {/* Card */}
      <div style={{ position: 'relative', zIndex: 10, margin: '24px 20px 0', background: '#FFFDF5', borderRadius: 32, padding: '28px 24px', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #5C3D1E 0%, #8B6340 100%)', borderRadius: 99, padding: '4px 14px', fontSize: 11, fontWeight: 800, color: '#FFF3C0', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>
          Road Trip
        </div>
        <h1 className="font-display" style={{ fontSize: 28, color: '#3D2B0A', lineHeight: 1.25, marginBottom: 12 }}>
          {date.title}
        </h1>
        <p style={{ fontSize: 15, color: '#8B6340', lineHeight: 1.7, fontWeight: 600 }}>{date.description}</p>

        {unlocked.length > 1 && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1.5px solid #F0E8D4' }}>
            <p style={{ fontSize: 11, color: '#C4A882', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Your unlocked trips</p>
            {unlocked.map(code => {
              const d = dates.find(x => x.roadTripCode === ROAD_TRIP_CODES[code])
              return <div key={code} style={{ fontSize: 13, color: '#8B6340', padding: '4px 0', fontWeight: 600 }}>🚗 {d?.title}</div>
            })}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ padding: '20px 20px 52px', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto', position: 'relative', zIndex: 10 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onDone(date.id)}
          style={{ width: '100%', padding: '18px 0', borderRadius: 999, border: 'none', background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)', color: '#3D2B0A', fontSize: 17, fontWeight: 800, boxShadow: '0 8px 28px rgba(245,200,66,0.35)' }}
        >
          Let's do this 🥚
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onPickAgain}
          style={{ width: '100%', padding: '16px 0', borderRadius: 999, border: '1.5px solid rgba(255,255,255,0.18)', background: 'transparent', color: 'rgba(255,220,120,0.65)', fontSize: 15, fontWeight: 700 }}
        >
          Pick again ↩
        </motion.button>
      </div>
    </motion.div>
  )
}
