import { motion } from 'framer-motion'

// ── Palettes ────────────────────────────────────────────────────────────────

export const LANDING_PALETTE = {
  bg:       'linear-gradient(180deg, #9272C8 0%, #6A48A8 20%, #4E2E88 45%, #3C1E72 70%, #2A1258 100%)',
  glow:     'rgba(248,148,18,0.92)',
  glowMid:  'rgba(220,90,10,0.45)',
  glow2:    null,
  glowSize: 300,
  tree:     '#18093C',
  s1: '#F5A623', s2: '#E88018', s3: '#F5C842',
  fp: '#C044A8', fs: '#D060C0', fd: '#8B2890',
  l1: '#2D6B28', l2: '#3A8030',
  honey:    '#C87808',
  stars:    false,
}

export const DAY_PALETTE = {
  bg:       'linear-gradient(180deg, #B898E0 0%, #9068C8 20%, #7048B0 45%, #9878C8 70%, #C89840 100%)',
  glow:     'rgba(255,220,60,0.94)',
  glowMid:  'rgba(240,160,20,0.52)',
  glow2:    null,
  glowSize: 330,
  tree:     '#1E0848',
  s1: '#F5C842', s2: '#FFE066', s3: '#F0A828',
  fp: '#E858C8', fs: '#F878D8', fd: '#C03898',
  l1: '#285828', l2: '#388038',
  honey:    '#E89808',
  stars:    false,
}

export const NIGHT_PALETTE = {
  bg:       'linear-gradient(180deg, #080518 0%, #100820 20%, #181038 45%, #0E0A22 70%, #050314 100%)',
  glow:     'rgba(130,88,210,0.58)',
  glowMid:  'rgba(60,20,130,0.28)',
  glow2:    'rgba(200,110,18,0.32)',
  glowSize: 260,
  tree:     '#040112',
  s1: '#9878D8', s2: '#7858B8', s3: '#C89830',
  fp: '#581870', fs: '#7828A0', fd: '#401060',
  l1: '#0A1A08', l2: '#121E10',
  honey:    '#9A6010',
  stars:    true,
}

// ── Floating bees ────────────────────────────────────────────────────────────
const BEES = [
  { id: 0, left: '34%', top: '40%', dx:  4, dy: -5, dur: 2.8 },
  { id: 1, left: '58%', top: '37%', dx: -3, dy: -6, dur: 3.2 },
  { id: 2, left: '26%', top: '53%', dx:  5, dy: -4, dur: 2.5 },
  { id: 3, left: '66%', top: '50%', dx: -4, dy: -5, dur: 3.5 },
  { id: 4, left: '49%', top: '60%', dx:  3, dy: -7, dur: 2.2 },
]

// ── Main component ────────────────────────────────────────────────────────────
export default function EnchantedScene({ p }) {
  return (
    <>
      {/* Background gradient */}
      <div style={{ position: 'absolute', inset: 0, background: p.bg }} />

      {/* Primary centre glow */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '44%',
        transform: 'translate(-50%, -50%)',
        width: p.glowSize, height: Math.round(p.glowSize * 0.85),
        background: `radial-gradient(ellipse, ${p.glow} 0%, ${p.glowMid} 40%, transparent 70%)`,
        filter: 'blur(32px)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Secondary warm glow (night only) */}
      {p.glow2 && (
        <div style={{
          position: 'absolute',
          left: '52%', top: '52%',
          transform: 'translate(-50%, -50%)',
          width: 130, height: 110,
          background: `radial-gradient(ellipse, ${p.glow2} 0%, transparent 70%)`,
          filter: 'blur(22px)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />
      )}

      {/* SVG illustration */}
      <svg
        viewBox="0 0 430 760"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
      >
        {/* ── TREE MASSES ── */}

        {/* Left forest wall */}
        <path d="M0,0 L0,580 C18,555 28,525 22,492 C16,459 0,435 8,400 C16,365 32,342 28,308 C24,274 8,252 12,218 C16,184 38,158 32,122 C26,86 8,56 0,0 Z" fill={p.tree} />
        {/* Left branches extending into scene */}
        <path d="M0,88  C55,68  108,58 132,84  C156,110 150,146 122,158 C94,170  50,152 26,134 Z" fill={p.tree} />
        <path d="M0,188 C42,172 84,163 104,186 C124,209 118,238 96,246  C74,254  38,236 18,220 Z" fill={p.tree} />
        <path d="M0,305 C48,288 94,278 114,296 C134,314 128,344 106,352 C84,360  46,342 22,327 Z" fill={p.tree} />

        {/* Right forest wall */}
        <path d="M430,0 L430,580 C412,555 402,525 408,492 C414,459 430,435 422,400 C414,365 398,342 402,308 C406,274 422,252 418,218 C414,184 392,158 398,122 C404,86 422,56 430,0 Z" fill={p.tree} />
        {/* Right branches */}
        <path d="M430,88  C375,68  322,58 298,84  C274,110 280,146 308,158 C336,170 380,152 404,134 Z" fill={p.tree} />
        <path d="M430,188 C388,172 346,163 326,186 C306,209 312,238 334,246 C356,254 392,236 412,220 Z" fill={p.tree} />
        <path d="M430,305 C382,288 336,278 316,296 C296,314 302,344 324,352 C346,360 384,342 408,327 Z" fill={p.tree} />

        {/* Top canopy */}
        <path d="M0,0 L430,0 C418,24 396,8 368,30 C340,52 312,24 282,34 C252,44 236,12 215,8 C194,4 174,30 142,24 C110,18 84,40 54,28 C28,18 10,8 0,0 Z" fill={p.tree} />
        {/* Hanging branches from top */}
        <path d="M98,0  C86,36  76,72  96,94  C116,116 148,110 158,86  C168,62 152,28 126,14 Z" fill={p.tree} />
        <path d="M248,0 C264,30 280,65 268,90 C256,115 228,120 214,96 C200,72 212,36 238,20 Z" fill={p.tree} />
        <path d="M356,0 C368,34 382,72 362,94 C342,116 310,108 302,84 C294,60 314,28 342,16 Z" fill={p.tree} />

        {/* ── NIGHT STARS (tunnel sky area) ── */}
        {p.stars && (
          <g>
            <circle cx="182" cy="142" r="1.5" fill="#FFF0A0" opacity="0.90" />
            <circle cx="215" cy="118" r="2.0" fill="#FFFFFF"  opacity="0.80" />
            <circle cx="252" cy="148" r="1.5" fill="#FFF0A0" opacity="0.88" />
            <circle cx="193" cy="172" r="1.0" fill="#FFE580" opacity="0.75" />
            <circle cx="238" cy="165" r="1.0" fill="#FFE580" opacity="0.80" />
            <circle cx="205" cy="200" r="1.5" fill="#FFFFFF"  opacity="0.65" />
            <circle cx="226" cy="192" r="1.0" fill="#FFF0A0" opacity="0.70" />
            <circle cx="215" cy="222" r="1.2" fill="#FFE580" opacity="0.62" />
            <circle cx="200" cy="242" r="0.8" fill="#FFFFFF"  opacity="0.55" />
            <circle cx="230" cy="235" r="0.8" fill="#FFF0A0" opacity="0.58" />
          </g>
        )}

        {/* ── HONEY SWIRLS ── */}

        {/* Right large swirl */}
        <path
          d="M215,400 C258,362 308,336 336,288 C364,240 358,184 322,176 C286,168 263,202 261,244 C259,286 280,311 270,338"
          stroke={p.s1} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.82"
        />
        <path
          d="M215,400 C250,366 292,344 316,304 C340,264 336,218 306,214 C276,210 262,238 264,268"
          stroke={p.s2} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55"
        />

        {/* Left large swirl */}
        <path
          d="M215,400 C172,362 122,336 94,288 C66,240 72,184 108,176 C144,168 167,202 169,244 C171,286 150,311 160,338"
          stroke={p.s1} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.82"
        />
        <path
          d="M215,400 C180,366 138,344 114,304 C90,264 94,218 124,214 C154,210 168,238 166,268"
          stroke={p.s2} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.55"
        />

        {/* Top connecting arch */}
        <path
          d="M162,250 C175,180 195,142 215,132 C235,122 258,154 272,224"
          stroke={p.s3} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.72"
        />

        {/* Small curly swirl ends */}
        <path d="M270,338 C288,350 310,356 314,342 C318,328 306,314 290,320" stroke={p.s1} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.68" />
        <path d="M160,338 C142,350 120,356 116,342 C112,328 124,314 140,320" stroke={p.s1} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.68" />

        {/* Pollen sparkle dots */}
        <circle cx="178" cy="325" r="3.0" fill={p.s3} opacity="0.75" />
        <circle cx="254" cy="314" r="2.5" fill={p.s3} opacity="0.70" />
        <circle cx="158" cy="285" r="2.0" fill={p.s3} opacity="0.62" />
        <circle cx="273" cy="294" r="2.0" fill={p.s3} opacity="0.62" />
        <circle cx="200" cy="264" r="2.5" fill={p.s3} opacity="0.55" />
        <circle cx="232" cy="258" r="2.0" fill={p.s3} opacity="0.55" />

        {/* ── HONEY DRIPS ── */}
        <path d="M215,404 C215,432 214,462 216,488 C218,514 215,540 215,565" stroke={p.honey} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.78" />
        <ellipse cx="215" cy="570" rx="6" ry="8" fill={p.honey} opacity="0.68" />
        <path d="M195,412 C193,436 192,464 194,488 C195,504 193,516 193,526" stroke={p.honey} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.58" />
        <ellipse cx="193" cy="530" rx="4" ry="6" fill={p.honey} opacity="0.48" />
        <path d="M235,412 C237,438 238,468 236,492 C235,508 237,520 237,530" stroke={p.honey} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.58" />
        <ellipse cx="237" cy="534" rx="4" ry="6" fill={p.honey} opacity="0.48" />

        {/* ── FOREGROUND FLOWERS ── */}

        {/* Left cluster */}
        <circle cx="66"  cy="698" r="22" fill={p.fp} />
        <circle cx="46"  cy="676" r="16" fill={p.fs} />
        <circle cx="90"  cy="680" r="14" fill={p.fd} />
        <circle cx="52"  cy="718" r="12" fill={p.fs} />
        <ellipse cx="74"  cy="724" rx="20" ry="9" fill={p.l1} transform="rotate(-28 74 724)" />
        <ellipse cx="96"  cy="715" rx="16" ry="7" fill={p.l2} transform="rotate(16 96 715)" />
        <ellipse cx="54"  cy="738" rx="14" ry="6" fill={p.l1} transform="rotate(-12 54 738)" />

        {/* Right cluster */}
        <circle cx="364" cy="698" r="22" fill={p.fp} />
        <circle cx="384" cy="676" r="16" fill={p.fs} />
        <circle cx="340" cy="680" r="14" fill={p.fd} />
        <circle cx="378" cy="718" r="12" fill={p.fs} />
        <ellipse cx="356" cy="724" rx="20" ry="9" fill={p.l1} transform="rotate(28 356 724)" />
        <ellipse cx="334" cy="715" rx="16" ry="7" fill={p.l2} transform="rotate(-16 334 715)" />
        <ellipse cx="376" cy="738" rx="14" ry="6" fill={p.l1} transform="rotate(12 376 738)" />

        {/* Small mid flowers */}
        <circle cx="146" cy="712" r="10" fill={p.fs} />
        <circle cx="136" cy="700" r="7"  fill={p.fp} />
        <circle cx="284" cy="712" r="10" fill={p.fs} />
        <circle cx="294" cy="700" r="7"  fill={p.fp} />
      </svg>

      {/* ── FLOATING BEES ── */}
      {BEES.map((b, i) => (
        <motion.div
          key={b.id}
          animate={{ y: [0, b.dy, 0], x: [0, b.dx, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.38 }}
          style={{
            position: 'absolute', left: b.left, top: b.top,
            fontSize: 14, pointerEvents: 'none', zIndex: 3, opacity: 0.88,
          }}
        >
          🐝
        </motion.div>
      ))}
    </>
  )
}
