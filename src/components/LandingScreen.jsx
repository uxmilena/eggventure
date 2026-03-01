import { useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

// ── Deterministic stars (warm golden tint for harvest-moon night) ──
const STARS = [
  { id: 0,  x: 10, y: 7,  s: 2.0, d: 0.2, dur: 3.2 },
  { id: 1,  x: 25, y: 16, s: 1.3, d: 0.9, dur: 2.5 },
  { id: 2,  x: 42, y: 5,  s: 2.4, d: 0.1, dur: 3.9 },
  { id: 3,  x: 58, y: 20, s: 1.6, d: 1.2, dur: 2.8 },
  { id: 4,  x: 75, y: 9,  s: 1.1, d: 0.5, dur: 4.1 },
  { id: 5,  x: 87, y: 26, s: 1.9, d: 0.3, dur: 3.5 },
  { id: 6,  x: 4,  y: 33, s: 1.4, d: 1.4, dur: 2.7 },
  { id: 7,  x: 18, y: 42, s: 2.1, d: 0.7, dur: 3.4 },
  { id: 8,  x: 33, y: 36, s: 1.2, d: 1.0, dur: 4.0 },
  { id: 9,  x: 50, y: 46, s: 1.7, d: 0.4, dur: 2.6 },
  { id: 10, x: 65, y: 38, s: 1.4, d: 1.3, dur: 3.7 },
  { id: 11, x: 80, y: 50, s: 2.2, d: 0.6, dur: 2.9 },
  { id: 12, x: 91, y: 14, s: 1.5, d: 1.0, dur: 4.2 },
  { id: 13, x: 7,  y: 56, s: 1.8, d: 0.2, dur: 3.1 },
  { id: 14, x: 22, y: 61, s: 1.3, d: 1.5, dur: 2.5 },
  { id: 15, x: 38, y: 68, s: 2.0, d: 0.8, dur: 3.6 },
  { id: 16, x: 55, y: 63, s: 1.1, d: 1.3, dur: 4.3 },
  { id: 17, x: 70, y: 71, s: 1.6, d: 0.1, dur: 3.0 },
  { id: 18, x: 84, y: 58, s: 1.3, d: 0.9, dur: 3.8 },
  { id: 19, x: 94, y: 44, s: 1.9, d: 0.4, dur: 2.7 },
  { id: 20, x: 13, y: 77, s: 1.4, d: 1.1, dur: 3.9 },
  { id: 21, x: 30, y: 80, s: 2.1, d: 0.6, dur: 3.0 },
  { id: 22, x: 46, y: 86, s: 1.2, d: 0.3, dur: 4.4 },
  { id: 23, x: 62, y: 79, s: 1.7, d: 1.4, dur: 2.6 },
  { id: 24, x: 77, y: 84, s: 1.5, d: 0.7, dur: 3.8 },
]

// ── Puffy Pooh-style cloud ──
function Cloud({ left, right, top, scale = 1, opacity }) {
  return (
    <motion.div
      animate={{ opacity }}
      transition={{ duration: 1.4 }}
      style={{ position: 'absolute', left, right, top, transformOrigin: 'center', transform: `scaleX(${scale})`, pointerEvents: 'none' }}
    >
      <div style={{ position: 'relative', width: 100, height: 34 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.92)', borderRadius: 50 }} />
        <div style={{ position: 'absolute', top: -20, left: 12, width: 52, height: 52, background: 'rgba(255,255,255,0.92)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: -14, left: 44, width: 40, height: 40, background: 'rgba(255,255,255,0.92)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: -9, left: 70, width: 28, height: 28, background: 'rgba(255,255,255,0.88)', borderRadius: '50%' }} />
      </div>
    </motion.div>
  )
}

// ── Hundred Acre Wood hills + trees (SVG) ──
function HillsScene({ isNight }) {
  const hillBack  = isNight ? '#1A2410' : '#A8C47A'
  const hillFront = isNight ? '#0E1808' : '#7A9F52'
  const treeBack  = isNight ? '#141E0C' : '#6B8F44'
  const treeFront = isNight ? '#0A1406' : '#527A30'

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
      <svg
        viewBox="0 0 430 130"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 130 }}
      >
        {/* ── Back rolling hill ── */}
        <path
          d="M-5,75 C50,38 120,60 200,44 C280,28 350,54 440,38 L440,135 L-5,135 Z"
          fill={hillBack}
        />

        {/* Trees on back hill */}
        {/* Tree @ x=85 */}
        <ellipse cx="85" cy="57" rx="15" ry="12" fill={treeBack} />
        <ellipse cx="85" cy="46" rx="11" ry="10" fill={treeBack} />
        <ellipse cx="85" cy="37" rx="8"  ry="8"  fill={treeBack} />
        <rect x="82" y="59" width="6" height="16" rx="3" fill={treeBack} />

        {/* Tree @ x=200 */}
        <ellipse cx="200" cy="50" rx="16" ry="13" fill={treeBack} />
        <ellipse cx="200" cy="38" rx="12" ry="10" fill={treeBack} />
        <ellipse cx="200" cy="28" rx="8"  ry="8"  fill={treeBack} />
        <rect x="197" y="52" width="6" height="17" rx="3" fill={treeBack} />

        {/* Tree @ x=330 */}
        <ellipse cx="330" cy="46" rx="14" ry="11" fill={treeBack} />
        <ellipse cx="330" cy="36" rx="10" ry="9"  fill={treeBack} />
        <ellipse cx="330" cy="27" rx="7"  ry="7"  fill={treeBack} />
        <rect x="327" y="48" width="6" height="14" rx="3" fill={treeBack} />

        {/* ── Front rolling hill ── */}
        <path
          d="M-5,92 C45,68 105,84 175,70 C245,56 310,78 375,63 C405,55 425,62 440,58 L440,135 L-5,135 Z"
          fill={hillFront}
        />

        {/* Trees on front hill */}
        {/* Tree @ x=48 */}
        <ellipse cx="48" cy="76" rx="15" ry="12" fill={treeFront} />
        <ellipse cx="48" cy="65" rx="11" ry="10" fill={treeFront} />
        <ellipse cx="48" cy="55" rx="8"  ry="8"  fill={treeFront} />
        <rect x="45" y="78" width="6" height="16" rx="3" fill={treeFront} />

        {/* Tree @ x=168 */}
        <ellipse cx="168" cy="68" rx="17" ry="13" fill={treeFront} />
        <ellipse cx="168" cy="55" rx="12" ry="11" fill={treeFront} />
        <ellipse cx="168" cy="44" rx="8"  ry="8"  fill={treeFront} />
        <rect x="165" y="70" width="6" height="18" rx="3" fill={treeFront} />

        {/* Tree @ x=290 */}
        <ellipse cx="290" cy="64" rx="15" ry="12" fill={treeFront} />
        <ellipse cx="290" cy="53" rx="11" ry="10" fill={treeFront} />
        <ellipse cx="290" cy="43" rx="7"  ry="7"  fill={treeFront} />
        <rect x="287" y="66" width="6" height="15" rx="3" fill={treeFront} />

        {/* Tree @ x=388 */}
        <ellipse cx="388" cy="58" rx="13" ry="11" fill={treeFront} />
        <ellipse cx="388" cy="48" rx="9"  ry="9"  fill={treeFront} />
        <ellipse cx="388" cy="39" rx="6"  ry="6"  fill={treeFront} />
        <rect x="385" y="60" width="6" height="13" rx="3" fill={treeFront} />
      </svg>
    </div>
  )
}

export default function LandingScreen({ onStart }) {
  const [selected, setSelected]     = useState(null)
  const [phase, setPhase]           = useState('day')   // 'day' | 'sunset' | 'night'
  const [starsVisible, setStars]    = useState(false)
  const [moonVisible, setMoon]      = useState(false)
  const sunControls                 = useAnimation()

  const isNight  = phase === 'night'
  const isSunset = phase === 'sunset'

  async function handleSelectNight() {
    if (selected === 'night') return
    setSelected('night')
    setPhase('sunset')

    sunControls.start({
      x: [0, 90, 210, 340],
      y: [0, -60, -42, 150],
      opacity: [1, 1, 0.8, 0],
      transition: { duration: 2.0, ease: [0.4, 0, 0.6, 1], times: [0, 0.22, 0.62, 1] },
    })

    setTimeout(() => {
      setPhase('night')
      setStars(true)
      setMoon(true)
    }, 980)
  }

  function handleSelectDay() {
    if (selected === 'day') return
    setSelected('day')
    setPhase('day')
    setStars(false)
    setMoon(false)
    sunControls.start({ x: 0, y: 0, opacity: 1, transition: { duration: 1.1, ease: 'easeOut' } })
  }

  const dayOpacity    = phase === 'day'    ? 1 : 0
  const sunsetOpacity = phase === 'sunset' ? 1 : 0
  const nightOpacity  = phase === 'night'  ? 1 : 0

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', background: '#FFF8E7' }}>

      {/* ══════════ SKY SCENE — 60% ══════════ */}
      <div style={{ height: '60dvh', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>

        {/* Sky gradient layers */}
        <motion.div animate={{ opacity: dayOpacity }} transition={{ duration: 1.6 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #7BBDD4 0%, #A8CEDF 30%, #C8E4F0 60%, #FFE8C0 100%)' }} />

        <motion.div animate={{ opacity: sunsetOpacity }} transition={{ duration: 0.8 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #D4601A 0%, #E8841C 22%, #F5A830 48%, #F5C842 72%, #FFF3C0 100%)' }} />

        <motion.div animate={{ opacity: nightOpacity }} transition={{ duration: 1.3, delay: 0.1 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #080508 0%, #120D0A 35%, #1E1508 65%, #2D1E08 100%)' }} />

        {/* Warm horizon glow (day) */}
        <motion.div animate={{ opacity: isNight ? 0 : 0.7 }} transition={{ duration: 1.5 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(0deg, rgba(245,200,66,0.45) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

        {/* Stars — warm golden tint */}
        <AnimatePresence>
          {starsVisible && STARS.map(s => (
            <motion.div key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              exit={{ opacity: 0 }}
              transition={{ delay: s.d * 0.35, duration: s.dur, repeat: Infinity, repeatType: 'reverse' }}
              style={{
                position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
                width: s.s, height: s.s, background: '#FFE580', borderRadius: '50%',
                boxShadow: `0 0 ${s.s * 3}px rgba(255,220,100,0.9)`,
                pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Puffy clouds */}
        <Cloud left="5%"  top="18%" opacity={isNight || isSunset ? 0 : 1}   />
        <Cloud left="44%" top="9%"  scale={0.78} opacity={isNight || isSunset ? 0 : 0.88} />
        <Cloud right="3%" top="28%" scale={0.68} opacity={isNight || isSunset ? 0 : 0.78} />

        {/* Sun — bottom-left, arcs across sky */}
        <motion.div animate={sunControls}
          style={{ position: 'absolute', left: 24, bottom: 100, pointerEvents: 'none' }}
        >
          <div style={{ position: 'absolute', inset: -28, background: 'radial-gradient(circle, rgba(245,200,66,0.5) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ width: 62, height: 62, background: 'radial-gradient(circle at 40% 40%, #FFF176 25%, #F5C842 55%, #E8A520 100%)', borderRadius: '50%', boxShadow: '0 0 36px 14px rgba(245,180,40,0.6)' }} />
        </motion.div>

        {/* Harvest moon */}
        <AnimatePresence>
          {moonVisible && (
            <motion.div key="moon"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
              style={{ position: 'absolute', right: 40, top: 40, pointerEvents: 'none' }}
            >
              <div style={{ position: 'absolute', inset: -18, background: 'radial-gradient(circle, rgba(245,180,40,0.28) 0%, transparent 70%)', borderRadius: '50%' }} />
              <div style={{ width: 60, height: 60, background: 'radial-gradient(circle at 38% 38%, #FFE066 35%, #F5A623 70%, #D4841A 100%)', borderRadius: '50%', boxShadow: '0 0 28px 8px rgba(245,166,35,0.38)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '26%', left: '52%', width: 11, height: 11, background: 'rgba(180,100,20,0.3)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', top: '52%', left: '20%', width: 8,  height: 8,  background: 'rgba(180,100,20,0.22)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', top: '66%', left: '58%', width: 5,  height: 5,  background: 'rgba(180,100,20,0.18)', borderRadius: '50%' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rolling hills + trees — Hundred Acre Wood */}
        <HillsScene isNight={isNight} />

        {/* App title — centred over sky */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10, gap: 6 }}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: 56, filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.15))' }}
          >
            🥚
          </motion.div>
          <motion.h1
            animate={{ color: isNight ? '#FFE580' : '#3D2B0A' }}
            transition={{ duration: 1.2 }}
            className="font-display"
            style={{
              fontSize: 50, lineHeight: 1,
              textShadow: isNight ? '0 2px 24px rgba(0,0,0,0.7)' : '0 2px 20px rgba(255,255,255,0.8)',
              letterSpacing: '0.01em',
            }}
          >
            Eggventure
          </motion.h1>
          <motion.p
            animate={{ color: isNight ? 'rgba(255,220,120,0.75)' : 'rgba(92,61,30,0.65)' }}
            transition={{ duration: 1.2 }}
            className="font-display"
            style={{ fontSize: 15, letterSpacing: '0.02em' }}
          >
            Choose your adventure, Eggy
          </motion.p>
        </div>
      </div>

      {/* ══════════ BOTTOM SECTION — 40% ══════════ */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 20px 32px', gap: 14, background: '#FFF8E7' }}>

        <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#C4A882', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          When are you going?
        </p>

        {/* Tap targets */}
        <div style={{ display: 'flex', gap: 12 }}>
          {/* Daytime */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectDay}
            style={{
              flex: 1, padding: '18px 12px', borderRadius: 24,
              border: `2.5px solid ${selected === 'day' ? '#F5C842' : '#E8DCC8'}`,
              background: selected === 'day' ? 'linear-gradient(145deg, #FFFAED 0%, #FFF3C0 100%)' : '#FFFDF5',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
              boxShadow: selected === 'day' ? '0 4px 20px rgba(245,200,66,0.32)' : '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.25s',
            }}
          >
            <span style={{ fontSize: 34 }}>☀️</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: selected === 'day' ? '#7A5800' : '#8B6340' }}>Daytime</span>
          </motion.button>

          {/* Nighttime */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectNight}
            style={{
              flex: 1, padding: '18px 12px', borderRadius: 24,
              border: `2.5px solid ${selected === 'night' ? '#F5A623' : '#E8DCC8'}`,
              background: selected === 'night' ? 'linear-gradient(145deg, #1A1208 0%, #2D1E08 100%)' : '#FFFDF5',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
              boxShadow: selected === 'night' ? '0 4px 20px rgba(200,120,20,0.35)' : '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.25s',
            }}
          >
            <span style={{ fontSize: 34 }}>🌙</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: selected === 'night' ? '#FFE066' : '#8B6340' }}>Nighttime</span>
          </motion.button>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 'auto' }}>
          <motion.button
            whileTap={selected ? { scale: 0.97 } : {}}
            animate={{
              background: selected
                ? selected === 'night'
                  ? 'linear-gradient(135deg, #2D1E08 0%, #4A3010 100%)'
                  : 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)'
                : '#F0E8D4',
              boxShadow: selected ? '0 8px 28px rgba(0,0,0,0.18)' : '0 0 0 rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.3 }}
            onClick={() => selected && onStart(selected)}
            style={{
              width: '100%', padding: '18px 0', borderRadius: 999, border: 'none',
              color: selected ? (selected === 'night' ? '#FFE066' : '#3D2B0A') : '#C4A882',
              fontSize: 17, fontWeight: 800,
              cursor: selected ? 'pointer' : 'default',
            }}
          >
            {selected ? 'Choose your path →' : 'Pick a time first'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
