import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RiddleGate({ onSolved }) {
  const [answer, setAnswer]   = useState('')
  const [shaking, setShaking] = useState(false)
  const [hint, setHint]       = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (answer.trim().length > 0) {
      onSolved()
    } else {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <motion.div
      key="riddle"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        minHeight: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 28px', gap: 28,
        background: 'linear-gradient(180deg, #FFF8E7 0%, #FFF3C0 100%)',
      }}
    >
      <div style={{ fontSize: 58 }}>🍯</div>

      <div style={{ textAlign: 'center' }}>
        <h2 className="font-display" style={{ fontSize: 28, color: '#3D2B0A', lineHeight: 1.3, marginBottom: 10 }}>
          One small question first…
        </h2>
        <p style={{ color: '#8B6340', fontSize: 15, lineHeight: 1.6, fontWeight: 600 }}>
          Prove it's really you 🥚
        </p>
      </div>

      <motion.div
        animate={shaking ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: '#FFFDF5', border: '2.5px solid #F5C842', borderRadius: 24, padding: '24px 20px', width: '100%', boxShadow: '0 4px 24px rgba(245,200,66,0.18)' }}
      >
        <p className="font-display" style={{ fontSize: 19, color: '#3D2B0A', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.55 }}>
          "What was the first thing I ever cooked you?"
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Your answer…"
          style={{
            width: '100%', padding: '16px 18px', borderRadius: 16,
            border: '2.5px solid #F0E4C8', fontSize: 16,
            background: '#FFFDF5', color: '#3D2B0A', outline: 'none',
            fontFamily: 'Nunito, sans-serif',
          }}
          autoFocus
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          style={{ width: '100%', padding: '16px 0', borderRadius: 999, border: 'none', background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)', color: '#3D2B0A', fontSize: 16, fontWeight: 800, boxShadow: '0 6px 24px rgba(245,200,66,0.4)' }}
        >
          Reveal the date ✨
        </motion.button>
      </form>

      <button
        onClick={() => setHint(v => !v)}
        style={{ background: 'none', border: 'none', fontSize: 13, color: '#C4A882', textDecoration: 'underline dotted', fontWeight: 600 }}
      >
        {hint ? 'Hide hint' : 'I need a hint 🙈'}
      </button>
      {hint && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 13, color: '#C4A882', textAlign: 'center', fontStyle: 'italic', fontWeight: 600 }}
        >
          Think about the very beginning ✨
        </motion.p>
      )}
    </motion.div>
  )
}
