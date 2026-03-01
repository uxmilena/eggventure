import { useState } from 'react'
import { motion } from 'framer-motion'
import bgDefault from '../assets/landing.jpg'
import bgDay from '../assets/Daytime.jpg'
import bgNight from '../assets/Nightime.jpg'

export default function DayNightScreen({ onSelect }) {
  const [selected, setSelected] = useState(null)
  const isNight = selected === 'night'

  return (
    <motion.div
      key="daynight"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Default background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgDefault})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {/* Daytime layer */}
      <motion.div
        animate={{ opacity: selected === 'day' ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgDay})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Nighttime layer */}
      <motion.div
        animate={{ opacity: selected === 'night' ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgNight})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Bottom overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '54%',
        background: 'linear-gradient(0deg, rgba(20,8,50,0.96) 0%, rgba(20,8,50,0.6) 52%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />

      {/* UI controls — overlaid at bottom */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, minHeight: '100dvh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '0 20px 52px',
      }}>
        <motion.h2
          animate={{ color: isNight ? '#C8A8FF' : '#FFE580' }}
          transition={{ duration: 1.2 }}
          className="font-display"
          style={{
            textAlign: 'center', fontSize: 30, marginBottom: 22,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          When shall we go?
        </motion.h2>

        {/* Day / Night toggles */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected('day')}
            style={{
              flex: 1, padding: '16px 12px', borderRadius: 24,
              border: `2.5px solid ${selected === 'day' ? 'rgba(245,200,66,0.85)' : 'rgba(255,255,255,0.18)'}`,
              background: selected === 'day' ? 'rgba(245,200,66,0.16)' : 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              transition: 'border-color 0.25s, background 0.25s',
            }}
          >
            <span style={{ fontSize: 32 }}>☀️</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: selected === 'day' ? '#FFE580' : 'rgba(255,255,255,0.6)' }}>
              Daytime
            </span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected('night')}
            style={{
              flex: 1, padding: '16px 12px', borderRadius: 24,
              border: `2.5px solid ${selected === 'night' ? 'rgba(180,140,255,0.85)' : 'rgba(255,255,255,0.18)'}`,
              background: selected === 'night' ? 'rgba(160,100,255,0.16)' : 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              transition: 'border-color 0.25s, background 0.25s',
            }}
          >
            <span style={{ fontSize: 32 }}>🌙</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: selected === 'night' ? '#C8A8FF' : 'rgba(255,255,255,0.6)' }}>
              Nighttime
            </span>
          </motion.button>
        </div>

        {/* CTA */}
        <motion.button
          whileTap={selected ? { scale: 0.97 } : {}}
          onClick={() => selected && onSelect(selected)}
          style={{
            width: '100%', padding: '18px 0', borderRadius: 999, border: 'none',
            background: selected
              ? selected === 'night'
                ? 'linear-gradient(135deg, #6040B0 0%, #9060D8 100%)'
                : 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)'
              : 'rgba(255,255,255,0.12)',
            backdropFilter: !selected ? 'blur(10px)' : 'none',
            color: selected
              ? selected === 'night' ? '#E8D0FF' : '#3D2B0A'
              : 'rgba(255,255,255,0.4)',
            fontSize: 17, fontWeight: 800,
            boxShadow: selected
              ? selected === 'night'
                ? '0 8px 28px rgba(120,60,220,0.48)'
                : '0 8px 28px rgba(245,200,66,0.48)'
              : 'none',
            cursor: selected ? 'pointer' : 'default',
            transition: 'background 0.3s, box-shadow 0.3s, color 0.3s',
          }}
        >
          {selected ? "Let's go →" : 'Pick a time first'}
        </motion.button>
      </div>
    </motion.div>
  )
}
