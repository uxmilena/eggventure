import { motion } from 'framer-motion'
import { categories, dates } from '../data/dates'

const cardColors = {
  romance:  { bg: '#FFF0EE', border: '#E8A598', emoji_bg: '#FFE0DC', text: '#7A3828' },
  fun:      { bg: '#FFFAED', border: '#F5C842', emoji_bg: '#FFF3C0', text: '#7A5800' },
  adventure:{ bg: '#F0F5E8', border: '#8FAF6A', emoji_bg: '#DFF0C8', text: '#3A5A18' },
  food:     { bg: '#FFF5EC', border: '#F0A868', emoji_bg: '#FFE4CC', text: '#7A3A10' },
  roadtrip: { bg: '#F5F0E8', border: '#C8B880', emoji_bg: '#EDE4CC', text: '#5C4A1E' },
}

function isCategoryExhausted(catId, time, completedDates) {
  if (catId === 'roadtrip') return false // road trips have their own lock logic
  const pool = dates.filter(
    d => d.category === catId &&
      (d.time === time || d.time === 'any') &&
      d.title !== 'Coming soon 🥚'
  )
  if (pool.length === 0) return false
  return pool.every(d => completedDates.includes(d.id))
}

function CategoryCard({ cat, onSelect, unlockedRoadTrips, onLocked, time, completedDates }) {
  const colors    = cardColors[cat.id]
  const isLocked  = cat.locked && unlockedRoadTrips.length === 0
  const exhausted = !isLocked && isCategoryExhausted(cat.id, time, completedDates)
  const isWide    = cat.id === 'roadtrip'

  function handlePress() {
    if (isLocked) return onLocked()
    if (exhausted) return
    onSelect(cat.id)
  }

  if (isWide) {
    return (
      <motion.button
        whileTap={!exhausted ? { scale: 0.97 } : {}}
        whileHover={!exhausted ? { scale: 1.01, y: -2 } : {}}
        onClick={handlePress}
        style={{
          background: exhausted ? '#F5F0E8' : colors.bg,
          border: `2.5px solid ${exhausted ? '#E0D8C8' : colors.border}`,
          borderRadius: 24,
          padding: '20px 24px',
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 18,
          boxShadow: '0 3px 14px rgba(92,61,30,0.09)',
          opacity: isLocked ? 0.65 : 1,
          filter: isLocked ? 'grayscale(0.2)' : 'none',
          transition: 'opacity 0.2s',
          width: '100%',
          cursor: exhausted ? 'default' : 'pointer',
        }}
      >
        <div style={{ width: 56, height: 56, background: exhausted ? '#EDE8DC' : colors.emoji_bg, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
          {isLocked ? '🔒' : exhausted ? '🥺' : cat.emoji}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: exhausted ? '#C4A882' : colors.text }}>{cat.label}</span>
          {isLocked && (
            <span style={{ fontSize: 10, color: '#C4A882', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Enter code to unlock
            </span>
          )}
          {exhausted && (
            <span style={{ fontSize: 10, color: '#C4A882', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              More coming soon
            </span>
          )}
        </div>
      </motion.button>
    )
  }

  return (
    <motion.button
      whileTap={!exhausted ? { scale: 0.94 } : {}}
      whileHover={!exhausted ? { scale: 1.03, y: -2 } : {}}
      onClick={handlePress}
      style={{
        background: exhausted ? '#F5F0E8' : colors.bg,
        border: `2.5px solid ${exhausted ? '#E0D8C8' : colors.border}`,
        borderRadius: 24,
        padding: '22px 12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        boxShadow: '0 3px 14px rgba(92,61,30,0.09)',
        opacity: isLocked ? 0.6 : 1,
        filter: isLocked ? 'grayscale(0.25)' : 'none',
        transition: 'opacity 0.2s',
        width: '100%',
        cursor: exhausted ? 'default' : 'pointer',
      }}
    >
      <div style={{ width: 56, height: 56, background: exhausted ? '#EDE8DC' : colors.emoji_bg, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
        {isLocked ? '🔒' : exhausted ? '🥺' : cat.emoji}
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: exhausted ? '#C4A882' : colors.text }}>{cat.label}</span>
      {isLocked && (
        <span style={{ fontSize: 10, color: '#C4A882', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Secret
        </span>
      )}
      {exhausted && (
        <span style={{ fontSize: 10, color: '#C4A882', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          More coming soon
        </span>
      )}
    </motion.button>
  )
}

export default function CategoryScreen({ onSelect, onRoadTripLocked, unlockedRoadTrips, onBack, time, completedDates }) {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 22 } } }

  return (
    <motion.div
      key="category"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-full"
      style={{ background: '#FFF8E7', padding: '0 0 36px' }}
    >
      <div style={{ padding: '48px 24px 24px' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', padding: 0, fontSize: 14, color: '#C4A882', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20, fontWeight: 700 }}
        >
          ← Back
        </button>
        <h2 className="font-display" style={{ fontSize: 34, color: '#3D2B0A', lineHeight: 1.2 }}>
          What kind of<br />adventure?
        </h2>
        <p style={{ marginTop: 8, color: '#8B6340', fontSize: 15, fontWeight: 600 }}>
          Pick a vibe and let's go 🥚
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '0 24px' }}
      >
        {categories.map(cat => (
          <motion.div key={cat.id} variants={item} style={cat.id === 'roadtrip' ? { gridColumn: '1 / -1' } : {}}>
            <CategoryCard
              cat={cat}
              onSelect={onSelect}
              unlockedRoadTrips={unlockedRoadTrips}
              onLocked={onRoadTripLocked}
              time={time}
              completedDates={completedDates}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
