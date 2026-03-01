import { motion } from 'framer-motion'

// Simple CSS cloud
function Cloud({ style }) {
  return (
    <div className="absolute" style={style}>
      <div
        style={{
          width: 80,
          height: 28,
          background: 'rgba(255,255,255,0.85)',
          borderRadius: 50,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -14,
            left: 16,
            width: 40,
            height: 40,
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -8,
            left: 34,
            width: 28,
            height: 28,
            background: 'rgba(255,255,255,0.85)',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  )
}

export default function LandingScreen({ onStart }) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-between min-h-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #7ec8e3 0%, #a8d8ea 40%, #ffecd2 100%)',
      }}
    >
      {/* Sky decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sun */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 60,
            right: 40,
            width: 64,
            height: 64,
            background: 'radial-gradient(circle, #ffe066 60%, #ffb347 100%)',
            borderRadius: '50%',
            boxShadow: '0 0 40px 12px rgba(255,220,80,0.45)',
          }}
        />
        {/* Clouds */}
        <motion.div animate={{ x: [0, 12, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <Cloud style={{ top: 48, left: 20 }} />
        </motion.div>
        <motion.div animate={{ x: [0, -8, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
          <Cloud style={{ top: 100, right: 120 }} />
        </motion.div>
        <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
          <Cloud style={{ top: 160, left: 60 }} />
        </motion.div>

        {/* Ground / horizon gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: 'linear-gradient(0deg, rgba(255,220,180,0.5) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Top spacer */}
      <div className="flex-1" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center gap-4">
        {/* Egg icon */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 72, lineHeight: 1, filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' }}
        >
          🥚
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display"
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#2d1b69',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          Eggventure
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            fontSize: 17,
            color: '#4a3a6e',
            fontStyle: 'italic',
            fontWeight: 400,
          }}
          className="font-display"
        >
          Choose your adventure, Eggy
        </motion.p>
      </div>

      {/* CTA */}
      <div className="relative z-10 w-full px-8 pb-16 pt-10">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          onClick={onStart}
          style={{
            width: '100%',
            padding: '18px 0',
            borderRadius: 999,
            border: 'none',
            background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8c42 100%)',
            color: '#fff',
            fontSize: 20,
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(255,107,157,0.4)',
            letterSpacing: '0.01em',
          }}
        >
          Let's go 🥚
        </motion.button>
      </div>
    </motion.div>
  )
}
