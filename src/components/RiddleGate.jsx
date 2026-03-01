import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RiddleGate({ onSolved }) {
  const [answer, setAnswer] = useState('')
  const [shaking, setShaking] = useState(false)
  const [hint, setHint] = useState(false)

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
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 28px',
        background: 'linear-gradient(180deg, #fdf6ee 0%, #f8e8ff 100%)',
        gap: 28,
      }}
    >
      <div style={{ fontSize: 56 }}>🔮</div>

      <div style={{ textAlign: 'center' }}>
        <h2
          className="font-display"
          style={{ fontSize: 26, fontWeight: 700, color: '#2d1b69', lineHeight: 1.3, marginBottom: 10 }}
        >
          One small question first…
        </h2>
        <p style={{ color: '#7c6a9e', fontSize: 15, lineHeight: 1.6 }}>
          Prove it's really you 🥚
        </p>
      </div>

      <motion.div
        animate={shaking ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: '#fff',
          border: '2px solid #e8d5f5',
          borderRadius: 20,
          padding: '24px 20px',
          width: '100%',
          boxShadow: '0 4px 24px rgba(124,106,158,0.1)',
        }}
      >
        <p
          className="font-display"
          style={{ fontSize: 19, fontWeight: 600, color: '#3d2b6e', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.5 }}
        >
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
            width: '100%',
            padding: '16px 18px',
            borderRadius: 14,
            border: '2px solid #e8d5f5',
            fontSize: 16,
            background: '#fff',
            color: '#2d1b69',
            outline: 'none',
          }}
          autoFocus
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: 999,
            border: 'none',
            background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            boxShadow: '0 6px 24px rgba(124,58,237,0.35)',
          }}
        >
          Reveal the date ✨
        </motion.button>
      </form>

      <button
        onClick={() => setHint(v => !v)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: 13,
          color: '#b4a0cc',
          textDecoration: 'underline dotted',
        }}
      >
        {hint ? 'Hide hint' : 'I need a hint 🙈'}
      </button>
      {hint && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 13, color: '#9c82b8', textAlign: 'center', fontStyle: 'italic' }}
        >
          Think about the very beginning ✨
        </motion.p>
      )}
    </motion.div>
  )
}
