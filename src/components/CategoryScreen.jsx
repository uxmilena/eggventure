import { motion } from 'framer-motion'
import { categories } from '../data/dates'

const cardColors = {
  romance: { bg: '#fff0f3', border: '#ffc0cb', emoji_bg: '#ffe4ec', text: '#9b2545' },
  fun: { bg: '#fffbeb', border: '#fde68a', emoji_bg: '#fef3c7', text: '#92400e' },
  adventure: { bg: '#f0fdf4', border: '#bbf7d0', emoji_bg: '#dcfce7', text: '#166534' },
  food: { bg: '#fff7ed', border: '#fed7aa', emoji_bg: '#ffedd5', text: '#9a3412' },
  roadtrip: { bg: '#f8fafc', border: '#cbd5e1', emoji_bg: '#f1f5f9', text: '#475569' },
}

function CategoryCard({ cat, onSelect, unlockedRoadTrips, onLocked }) {
  const colors = cardColors[cat.id]
  const isLocked = cat.locked && unlockedRoadTrips.length === 0

  function handleTap() {
    if (isLocked) {
      onLocked()
    } else {
      onSelect(cat.id)
    }
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03, y: -2 }}
      onClick={handleTap}
      style={{
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        borderRadius: 20,
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        position: 'relative',
        opacity: isLocked ? 0.65 : 1,
        filter: isLocked ? 'grayscale(0.3)' : 'none',
        transition: 'opacity 0.2s',
        width: '100%',
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          background: colors.emoji_bg,
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
        }}
      >
        {isLocked ? '🔒' : cat.emoji}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{cat.label}</span>
      {isLocked && (
        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Secret
        </span>
      )}
    </motion.button>
  )
}

export default function CategoryScreen({ onSelect, onRoadTripLocked, unlockedRoadTrips, gameState }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div
      key="category"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-full"
      style={{ background: '#fdf6ee', padding: '0 0 32px' }}
    >
      {/* Header */}
      <div style={{ padding: '48px 24px 24px' }}>
        <h2
          className="font-display"
          style={{ fontSize: 32, fontWeight: 700, color: '#1e1030', lineHeight: 1.2 }}
        >
          What kind of<br />adventure?
        </h2>
        <p style={{ marginTop: 8, color: '#7c6a9e', fontSize: 15 }}>
          Pick a vibe and let's go 🥚
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          padding: '0 24px',
        }}
      >
        {categories.map(cat => (
          <motion.div key={cat.id} variants={item}>
            <CategoryCard
              cat={cat}
              onSelect={onSelect}
              unlockedRoadTrips={unlockedRoadTrips}
              onLocked={onRoadTripLocked}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
