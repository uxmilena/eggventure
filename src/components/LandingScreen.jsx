import { motion } from 'framer-motion'
import EnchantedScene, { LANDING_PALETTE } from './EnchantedScene'

export default function LandingScreen({ onStart }) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Full-screen illustration */}
      <EnchantedScene p={LANDING_PALETTE} />

      {/* Readability gradient at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: 'linear-gradient(0deg, rgba(20,8,50,0.97) 0%, rgba(20,8,50,0.65) 52%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />

      {/* Content overlaid on top */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, minHeight: '100dvh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 20px 52px',
      }}>
        {/* Floating egg */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            textAlign: 'center', fontSize: 64, marginBottom: 14,
            filter: 'drop-shadow(0 0 22px rgba(248,150,18,0.72))',
          }}
        >
          🥚
        </motion.div>

        <h1
          className="font-display"
          style={{
            fontSize: 52, lineHeight: 1, textAlign: 'center', marginBottom: 8,
            color: '#FFE580',
            textShadow: '0 2px 30px rgba(248,150,18,0.65), 0 4px 60px rgba(100,40,200,0.4)',
          }}
        >
          Eggventure
        </h1>

        <p style={{
          textAlign: 'center', fontSize: 14, fontWeight: 600, marginBottom: 32,
          color: 'rgba(220,190,255,0.75)',
        }}>
          Choose your adventure
        </p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{
            width: '100%', padding: '20px 0', borderRadius: 999, border: 'none',
            background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)',
            color: '#3D2B0A', fontSize: 18, fontWeight: 800,
            boxShadow: '0 8px 32px rgba(248,150,18,0.52)',
          }}
        >
          Start your adventure 🥚
        </motion.button>
      </div>
    </motion.div>
  )
}
