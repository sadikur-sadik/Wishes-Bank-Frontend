'use client'

import { motion } from 'framer-motion'
import { Wallet, ArrowRightLeft, CheckCircle2, Zap } from 'lucide-react'
import FloatingInfoCard from './FloatingInfoCard'

/* Animated transfer arrow SVG */
function TransferArrows() {
  return (
    <svg viewBox="0 0 120 70" className="w-28 h-16" fill="none">
      {/* Top arrow: left → right */}
      <motion.path
        d="M10 22 Q60 8 110 22"
        stroke="rgba(96,165,250,0.85)"
        strokeWidth="2"
        strokeDasharray="6 4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
      />
      <motion.polygon
        points="110,16 110,28 120,22"
        fill="rgba(96,165,250,0.9)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.7, delay: 1.3, repeat: Infinity }}
      />
      {/* Bottom arrow: right → left */}
      <motion.path
        d="M110 48 Q60 62 10 48"
        stroke="rgba(167,243,208,0.85)"
        strokeWidth="2"
        strokeDasharray="6 4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
      />
      <motion.polygon
        points="10,42 10,54 0,48"
        fill="rgba(167,243,208,0.9)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.7, delay: 1.9, repeat: Infinity }}
      />
    </svg>
  )
}

/* Currency symbols floating */
function CurrencyOrbs() {
  const symbols = ['$', '€', '£', '¥']
  const positions = [
    'right-[28%] top-[14%]',
    'right-[10%] top-[22%]',
    'right-[20%] top-[38%]',
    'right-[32%] top-[48%]',
  ]
  const delays = [0.2, 0.4, 0.6, 0.8]
  return (
    <>
      {symbols.map((sym, i) => (
        <motion.div
          key={sym}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: delays[i], duration: 0.5 }}
          className={`absolute z-20 hidden lg:flex ${positions[i]}`}
        >
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: delays[i] }}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 font-bold text-sm shadow-lg"
          >
            {sym}
          </motion.div>
        </motion.div>
      ))}
    </>
  )
}

export default function TransferSlideElements() {
  return (
    <>
      {/* ── Transfer arrows (center-right) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute right-[8%] top-[18%] z-20 hidden lg:block"
      >
        <TransferArrows />
      </motion.div>

      {/* ── Currency orbs ── */}
      <CurrencyOrbs />

      {/* ── Transaction card ── */}
      <FloatingInfoCard
        icon={<ArrowRightLeft size={16} />}
        label="Sent to London"
        value="£2,400.00"
        sub="Fee: ₹0 · 14s ago"
        badge="✓ Success"
        badgeColor="bg-green-500/20 text-green-300 border-green-500/30"
        className="right-[6%] top-[32%]"
        delay={0.35}
        floatAmplitude={5}
      />

      {/* ── Wallet card ── */}
      <FloatingInfoCard
        icon={<Wallet size={16} />}
        label="Available Balance"
        value="₹1,24,500"
        sub="Updated just now"
        className="right-[20%] bottom-[20%]"
        delay={0.5}
        floatAmplitude={6}
      />

      {/* ── Live status pill ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute right-[6%] bottom-[28%] z-20 hidden md:flex items-center gap-2 bg-blue-500/15 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1.5"
      >
        <Zap size={13} className="text-blue-400" />
        <span className="text-blue-200 text-[11px] font-semibold">Real-time Tracking · 24/7</span>
      </motion.div>

      {/* ── CheckCircle success indicator ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        className="absolute right-[38%] top-[15%] z-20 hidden xl:flex w-10 h-10 rounded-full bg-green-500/20 backdrop-blur-md border border-green-400/40 items-center justify-center"
      >
        <CheckCircle2 size={18} className="text-green-400" />
      </motion.div>
    </>
  )
}
