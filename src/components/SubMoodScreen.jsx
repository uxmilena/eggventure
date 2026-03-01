import { motion } from 'framer-motion'
import { subMoods } from '../data/dates'
import bgDay from '../assets/Daytime.jpg'
import bgNight from '../assets/Nightime.jpg'

const moodColors = [
  { bg: '#FFF0EE', border: '#E8A598', text: '#7A3828' },
  { bg: '#FFFAED', border: '#F5C842', text: '#7A5800' },
  { bg: '#F0F5E8', border: '#8FAF6A', text: '#3A5A18' },
]

export default function SubMoodScreen({ category, time, onSelect, onBack }) {
  const moods = subMoods[category] || []

  return (
    <motion.div
      key="submood"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-full"
      style={{ background: '#FFF8E7', position: 'relative', overflow: 'hidden' }}
    >
      {/* Time-of-day background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url(${time === 'night' ? bgNight : bgDay})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.1,
      }} />

      <div style={{ padding: '48px 24px 28px', position: 'relative' }}>
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', padding: 0, fontSize: 14, color: '#C4A882', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20, fontWeight: 700 }}
        >
          ← Back
        </button>
        <h2 className="font-display" style={{ fontSize: 32, color: '#3D2B0A', lineHeight: 1.2 }}>
          What's the mood?
        </h2>
        <p style={{ marginTop: 8, color: '#8B6340', fontSize: 15, fontWeight: 600 }}>
          Fine-tune the vibe
        </p>
      </div>

      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
        {moods.map((mood, i) => {
          const colors = moodColors[i % moodColors.length]
          return (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, type: 'spring', stiffness: 280, damping: 22 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelect(mood.id)}
              style={{
                background: colors.bg,
                border: `2.5px solid ${colors.border}`,
                borderRadius: 24,
                padding: '22px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
                textAlign: 'left',
                boxShadow: '0 3px 14px rgba(92,61,30,0.08)',
                width: '100%',
              }}
            >
              <span style={{ fontSize: 38 }}>{mood.emoji}</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>{mood.label}</div>
                <div style={{ fontSize: 13, color: '#C4A882', marginTop: 3, fontWeight: 600 }}>{mood.description}</div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
