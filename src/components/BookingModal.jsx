import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import emailjs from '@emailjs/browser'
import 'react-day-picker/dist/style.css'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

function formatDates(days) {
  if (!days || days.length === 0) return 'No dates selected'
  return days
    .sort((a, b) => a - b)
    .map(d => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
    .join(', ')
}

export default function BookingModal({ date, onConfirm, onClose }) {
  const [selectedDays, setSelectedDays] = useState([])
  const [note, setNote]                 = useState('')
  const [status, setStatus]             = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (selectedDays.length === 0) return
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { date_title: date.title, date_description: date.description, available_dates: formatDates(selectedDays), note: note || 'No note added' },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setTimeout(() => onConfirm(), 1800)
    } catch {
      setStatus('error')
      setTimeout(() => onConfirm(), 2500)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="booking-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
        style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,10,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 300 }}
      >
        <motion.div
          key="booking-sheet"
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ background: '#FFF8E7', borderRadius: '32px 32px 0 0', width: '100%', maxWidth: 430, maxHeight: '92dvh', overflowY: 'auto', paddingBottom: 44 }}
        >
          {/* Handle */}
          <div style={{ padding: '16px 0 0', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 4, background: '#E8DCC8', borderRadius: 99 }} />
          </div>

          {/* Header */}
          <div style={{ padding: '20px 24px 8px' }}>
            <h2 className="font-display" style={{ fontSize: 24, color: '#3D2B0A', marginBottom: 4 }}>Lock it in 🥚</h2>
            <p style={{ fontSize: 14, color: '#C4A882', fontWeight: 600 }}>{date.title}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Calendar */}
            <div style={{ padding: '8px 16px 0' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#8B6340', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, paddingLeft: 8 }}>
                When are you free?
              </p>
              <div style={{ background: '#FFFDF5', borderRadius: 24, border: '2.5px solid #F0E4C8', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <DayPicker
                  mode="multiple"
                  selected={selectedDays}
                  onSelect={setSelectedDays}
                  disabled={{ before: new Date() }}
                  showOutsideDays={false}
                  style={{ margin: '0 auto' }}
                  styles={{
                    root: { fontFamily: 'Nunito, sans-serif' },
                    day_selected: { background: 'linear-gradient(135deg, #F5C842, #E8A520)', color: '#3D2B0A', borderRadius: 99 },
                    day_today: { fontWeight: 800, color: '#C8941A' },
                  }}
                />
              </div>
              {selectedDays.length > 0 && (
                <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 12, color: '#C8941A', marginTop: 8, paddingLeft: 8, lineHeight: 1.6, fontWeight: 700 }}
                >
                  ✓ {formatDates(selectedDays)}
                </motion.p>
              )}
            </div>

            {/* Note */}
            <div style={{ padding: '16px 24px 0' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#8B6340', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
                Add a note (optional)
              </p>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Any thoughts, requests, or excitement…"
                rows={3}
                style={{ width: '100%', padding: '14px 16px', borderRadius: 18, border: '2.5px solid #F0E4C8', background: '#FFFDF5', fontSize: 15, color: '#3D2B0A', fontFamily: 'Nunito, sans-serif', resize: 'none', outline: 'none', lineHeight: 1.5 }}
              />
            </div>

            {/* Submit */}
            <div style={{ padding: '20px 24px 0' }}>
              {status === 'sent' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '20px 0', fontSize: 16, color: '#8B6340', fontWeight: 800 }}
                >
                  ✉️ Sent! Get excited 🥚
                </motion.div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={selectedDays.length === 0 || status === 'sending'}
                  style={{
                    width: '100%', padding: '18px 0', borderRadius: 999, border: 'none',
                    background: selectedDays.length === 0 ? '#F0E8D4' : 'linear-gradient(135deg, #F5C842 0%, #E8A520 100%)',
                    color: selectedDays.length === 0 ? '#C4A882' : '#3D2B0A',
                    fontSize: 17, fontWeight: 800,
                    boxShadow: selectedDays.length > 0 ? '0 8px 28px rgba(245,200,66,0.38)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Sending… ✉️' : "Let's do this 🥚"}
                </motion.button>
              )}
              {status === 'error' && (
                <p style={{ textAlign: 'center', fontSize: 13, color: '#C47A6A', marginTop: 10, fontWeight: 600 }}>
                  Something went wrong — check your EmailJS config.
                </p>
              )}
              <button type="button" onClick={onClose}
                style={{ width: '100%', padding: '14px 0', background: 'none', border: 'none', fontSize: 14, color: '#C4A882', marginTop: 8, fontWeight: 700 }}
              >
                Not yet
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
