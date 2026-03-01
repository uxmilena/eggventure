import { motion } from 'framer-motion'

// Deterministic clouds
function Cloud({ left, right, top, scale = 1 }) {
  return (
    <div style={{ position: 'absolute', left, right, top, transformOrigin: 'center', transform: `scaleX(${scale})`, pointerEvents: 'none' }}>
      <div style={{ position: 'relative', width: 100, height: 34 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.88)', borderRadius: 50 }} />
        <div style={{ position: 'absolute', top: -20, left: 12, width: 52, height: 52, background: 'rgba(255,255,255,0.88)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: -14, left: 44, width: 40, height: 40, background: 'rgba(255,255,255,0.88)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: -9, left: 70, width: 28, height: 28, background: 'rgba(255,255,255,0.84)', borderRadius: '50%' }} />
      </div>
    </div>
  )
}

function HillsScene() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
      <svg viewBox="0 0 430 140" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 140 }}>
        {/* Back rolling hill */}
        <path d="M-5,78 C50,40 120,62 200,46 C280,30 350,56 440,40 L440,145 L-5,145 Z" fill="#A8C47A" />
        {/* Trees back */}
        <ellipse cx="85" cy="60" rx="15" ry="12" fill="#6B8F44" />
        <ellipse cx="85" cy="48" rx="11" ry="10" fill="#6B8F44" />
        <ellipse cx="85" cy="39" rx="8" ry="8" fill="#6B8F44" />
        <rect x="82" y="62" width="6" height="16" rx="3" fill="#6B8F44" />

        <ellipse cx="200" cy="53" rx="16" ry="13" fill="#6B8F44" />
        <ellipse cx="200" cy="40" rx="12" ry="10" fill="#6B8F44" />
        <ellipse cx="200" cy="30" rx="8" ry="8" fill="#6B8F44" />
        <rect x="197" y="55" width="6" height="17" rx="3" fill="#6B8F44" />

        <ellipse cx="330" cy="48" rx="14" ry="11" fill="#6B8F44" />
        <ellipse cx="330" cy="38" rx="10" ry="9" fill="#6B8F44" />
        <ellipse cx="330" cy="29" rx="7" ry="7" fill="#6B8F44" />
        <rect x="327" y="50" width="6" height="14" rx="3" fill="#6B8F44" />

        {/* Front rolling hill */}
        <path d="M-5,95 C45,70 105,86 175,72 C245,58 310,80 375,65 C405,57 425,64 440,60 L440,145 L-5,145 Z" fill="#7A9F52" />
        {/* Trees front */}
        <ellipse cx="48" cy="78" rx="15" ry="12" fill="#527A30" />
        <ellipse cx="48" cy="66" rx="11" ry="10" fill="#527A30" />
        <ellipse cx="48" cy="56" rx="8" ry="8" fill="#527A30" />
        <rect x="45" y="80" width="6" height="16" rx="3" fill="#527A30" />

        <ellipse cx="168" cy="70" rx="17" ry="13" fill="#527A30" />
        <ellipse cx="168" cy="57" rx="12" ry="11" fill="#527A30" />
        <ellipse cx="168" cy="46" rx="8" ry="8" fill="#527A30" />
        <rect x="165" y="72" width="6" height="18" rx="3" fill="#527A30" />

        <ellipse cx="290" cy="66" rx="15" ry="12" fill="#527A30" />
        <ellipse cx="290" cy="55" rx="11" ry="10" fill="#527A30" />
        <ellipse cx="290" cy="45" rx="7" ry="7" fill="#527A30" />
        <rect x="287" y="68" width="6" height="15" rx="3" fill="#527A30" />

        <ellipse cx="388" cy="60" rx="13" ry="11" fill="#527A30" />
        <ellipse cx="388" cy="50" rx="9" ry="9" fill="#527A30" />
        <ellipse cx="388" cy="41" rx="6" ry="6" fill="#527A30" />
        <rect x="385" y="62" width="6" height="13" rx="3" fill="#527A30" />
      </svg>
    </div>
  )
}

export default function LandingScreen({ onStart }) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#FFF8E7' }}
    >
      {/* Sky scene */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #7BBDD4 0%, #A8CEDF 30%, #C8E4F0 62%, #FFE8C0 100%)' }}>

        {/* Sun */}
        <div style={{ position: 'absolute', left: 28, top: 48, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: -28, background: 'radial-gradient(circle, rgba(245,200,66,0.5) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ width: 58, height: 58, background: 'radial-gradient(circle at 40% 40%, #FFF176 25%, #F5C842 55%, #E8A520 100%)', borderRadius: '50%', boxShadow: '0 0 36px 14px rgba(245,180,40,0.55)' }} />
        </div>

        {/* Warm horizon glow */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(0deg, rgba(245,200,66,0.38) 0%, transparent 100%)', pointerEvents: 'none' }} />

        {/* Clouds */}
        <Cloud left="8%" top="20%" />
        <Cloud left="46%" top="10%" scale={0.78} />
        <Cloud right="4%" top="30%" scale={0.68} />

        {/* Hills + trees */}
        <HillsScene />

        {/* Centre title */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, gap: 10, pointerEvents: 'none' }}>
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 60, filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.14))' }}
          >
            🥚
          </motion.div>
          <h1
            className="font-display"
            style={{ fontSize: 52, lineHeight: 1, color: '#3D2B0A', textShadow: '0 2px 20px rgba(255,255,255,0.8)', letterSpacing: '0.01em' }}
          >
            Eggventure
          </h1>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'rgba(92,61,30,0.65)', letterSpacing: '0.02em' }}>
            Choose your adventure
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '24px 20px 44px', background: '#FFF8E7', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          style={{
            width: '100%', padding: '20px 0', borderRadius: 999, border: 'none',
            background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)',
            color: '#3D2B0A', fontSize: 18, fontWeight: 800,
            boxShadow: '0 8px 28px rgba(245,200,66,0.38)',
          }}
        >
          Start your adventure 🥚
        </motion.button>
      </div>
    </motion.div>
  )
}
