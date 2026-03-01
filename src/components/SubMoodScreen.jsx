import { motion } from 'framer-motion'
import { subMoods } from '../data/dates'

const moodColors = [
  { bg: '#fff0f3', border: '#ffc0cb', text: '#9b2545' },
  { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
  { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
]

export default function SubMoodScreen({ category, onSelect, onBack }) {
  const moods = subMoods[category] || []

  return (
    <motion.div
      key="submood"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-full"
      style={{ background: '#fdf6ee' }}
    >
      {/* Back + Header */}
      <div style={{ padding: '48px 24px 28px' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: 14,
            color: '#7c6a9e',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          ← Back
        </button>
        <h2
          className="font-display"
          style={{ fontSize: 30, fontWeight: 700, color: '#1e1030', lineHeight: 1.2 }}
        >
          What's the mood?
        </h2>
        <p style={{ marginTop: 8, color: '#7c6a9e', fontSize: 15 }}>
          Fine-tune the vibe
        </p>
      </div>

      {/* Mood cards */}
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {moods.map((mood, i) => {
          const colors = moodColors[i % moodColors.length]
          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelect(mood.id)}
              style={{
                background: colors.bg,
                border: `2px solid ${colors.border}`,
                borderRadius: 20,
                padding: '22px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                textAlign: 'left',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                width: '100%',
              }}
            >
              <span style={{ fontSize: 36 }}>{mood.emoji}</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>{mood.label}</div>
                <div style={{ fontSize: 13, color: '#9b8ab0', marginTop: 2 }}>{mood.description}</div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
