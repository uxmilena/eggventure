import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RiddleScreen({ riddle, onSolved }) {
  const [answer, setAnswer]   = useState('')
  const [shaking, setShaking] = useState(false)
  const [error, setError]     = useState('')
  const [solved, setSolved]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!answer.trim()) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }
    if (answer.trim().toLowerCase() === riddle.answer.toLowerCase()) {
      setSolved(true)
      setTimeout(() => onSolved(), 1100)
    } else {
      setError('Hmm, think again… 🍯')
      setShaking(true)
      setTimeout(() => {
        setShaking(false)
        setError('')
      }, 600)
    }
  }

  return (
    <motion.div
      key="riddle"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      style={{
        minHeight: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 28px', gap: 28,
        background: 'linear-gradient(180deg, #FFF8E7 0%, #FFF3C0 100%)',
      }}
    >
      <AnimatePresence mode="wait">
        {solved ? (
          <motion.div
            key="solved"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
          >
            <div style={{ fontSize: 72 }}>✨</div>
            <p className="font-display" style={{ fontSize: 28, color: '#3D2B0A', lineHeight: 1.3 }}>
              That's the one!
            </p>
            <p style={{ fontSize: 15, color: '#8B6340', fontWeight: 600 }}>
              Let's pick your adventure…
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="riddle-content"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}
          >
            {/* Honey jar */}
            <div style={{ fontSize: 58 }}>🍯</div>

            {/* Title */}
            <div style={{ textAlign: 'center' }}>
              <h2 className="font-display" style={{ fontSize: 26, color: '#3D2B0A', lineHeight: 1.3, marginBottom: 8 }}>
                Prove it's you first
              </h2>
              <p style={{ color: '#8B6340', fontSize: 14, lineHeight: 1.6, fontWeight: 600 }}>
                Answer this to unlock your date 🥚
              </p>
            </div>

            {/* Riddle card */}
            <motion.div
              animate={shaking ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: '#FFFDF5', border: '2.5px solid #F5C842',
                borderRadius: 24, padding: '24px 20px', width: '100%',
                boxShadow: '0 4px 24px rgba(245,200,66,0.18)',
              }}
            >
              <p className="font-display" style={{ fontSize: 19, color: '#3D2B0A', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.55 }}>
                "{riddle.question}"
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="text"
                value={answer}
                onChange={e => { setAnswer(e.target.value); setError('') }}
                placeholder="Your answer…"
                autoFocus
                style={{
                  width: '100%', padding: '16px 18px', borderRadius: 16,
                  border: `2.5px solid ${error ? '#E8A598' : '#F0E4C8'}`,
                  fontSize: 16, background: '#FFFDF5', color: '#3D2B0A', outline: 'none',
                  fontFamily: 'Nunito, sans-serif', transition: 'border-color 0.2s',
                }}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 13, color: '#C47A6A', textAlign: 'center', fontWeight: 700 }}
                >
                  {error}
                </motion.p>
              )}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                style={{
                  width: '100%', padding: '16px 0', borderRadius: 999, border: 'none',
                  background: 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)',
                  color: '#3D2B0A', fontSize: 16, fontWeight: 800,
                  boxShadow: '0 6px 24px rgba(245,200,66,0.4)',
                }}
              >
                That's my answer 🐝
              </motion.button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
