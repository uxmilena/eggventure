import { motion } from 'framer-motion'
import bgImage from '../assets/Landing1.jpg'

const rules = [
  { emoji: '🎲', text: 'Answer the riddle to unlock your next date' },
  { emoji: '🗺️', text: 'Choose your Eggventure wisely — no going back' },
  { emoji: '⏳', text: 'Once a date is chosen, the game resets for 24 hours' },
  { emoji: '🔐', text: 'Some adventures are secret — find the code word to unlock them' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
}

export default function HowToPlayScreen({ onContinue }) {
  return (
    <motion.div
      key="howtoplay"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      style={{
        minHeight: '100%', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden', padding: '0 24px 52px',
      }}
    >
      {/* Background image — faded */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.12,
      }} />

      {/* Top section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 64, position: 'relative', zIndex: 1 }}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ textAlign: 'center', fontSize: 52, marginBottom: 20 }}
        >
          🐝
        </motion.div>

        <h2
          className="font-display"
          style={{ fontSize: 32, color: '#3D2B0A', textAlign: 'center', marginBottom: 8 }}
        >
          How to play
        </h2>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#C4A882', fontWeight: 600, marginBottom: 40 }}>
          A few things before we begin…
        </p>

        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {rules.map((rule, i) => (
            <motion.li
              key={i}
              variants={item}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                background: '#FFFDF5', borderRadius: 20,
                border: '2px solid #F0E4C8',
                padding: '16px 18px',
              }}
            >
              <span style={{ fontSize: 24, flexShrink: 0, lineHeight: 1.3 }}>{rule.emoji}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#5C3D1E', lineHeight: 1.6 }}>{rule.text}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileTap={{ scale: 0.97 }}
        onClick={onContinue}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', padding: '20px 0', borderRadius: 999, border: 'none',
          background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)',
          color: '#3D2B0A', fontSize: 18, fontWeight: 800,
          boxShadow: '0 8px 32px rgba(248,150,18,0.45)',
          marginTop: 32,
        }}
      >
        🥚 Let's go!
      </motion.button>
    </motion.div>
  )
}
