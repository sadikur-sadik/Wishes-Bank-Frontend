'use client'

import { motion } from 'framer-motion'
import { Wallet, ArrowRightLeft, CheckCircle2, Zap } from 'lucide-react'
import FloatingInfoCard from './FloatingInfoCard'

function TransferArrows() {
  return (
    <svg viewBox="0 0 110 56" className="w-24 h-12" fill="none">
      <motion.path
        d="M8 18 Q55 6 100 18"
        stroke="rgba(110,231,183,0.85)"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
      />
      <motion.polygon
        points="100,12 100,24 108,18"
        fill="rgba(110,231,183,0.9)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.7, delay: 1.3, repeat: Infinity }}
      />
      <motion.path
        d="M100 38 Q55 50 8 38"
        stroke="rgba(147,197,253,0.85)"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
      />
      <motion.polygon
        points="8,32 8,44 0,38"
        fill="rgba(147,197,253,0.9)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.7, delay: 1.8, repeat: Infinity }}
      />
    </svg>
  )
}

function CurrencyOrbs() {
  const symbols = ['$', '€', '£', '¥']
  const positions = [
    'right-[24%] top-[12%]',
    'right-[8%] top-[16%]',
    'right-[18%] top-[34%]',
    'right-[28%] top-[42%]',
  ]
  const delays = [0.2, 0.35, 0.5, 0.65]
  return (
    <>
      {symbols.map((sym, i) => (
        <motion.div
          key={sym}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: delays[i], duration: 0.4 }}
          className={`absolute z-20 hidden lg:flex ${positions[i]}`}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: delays[i] }}
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/85 font-bold text-xs shadow-md"
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
      {/* ── Top transfer animation ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute right-[12%] top-[12%] z-20 hidden lg:block"
      >
        <TransferArrows />
      </motion.div>

      <CurrencyOrbs />

      {/* ── Card 1: Completed transfer status ── */}
      <FloatingInfoCard
        icon={<ArrowRightLeft size={16} />}
        label="Sent to London (GBP)"
        value="£2,400.00"
        sub="Fee: ₹0 · Completed in 4s"
        badge="✓ Completed"
        badgeColor="bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
        className="right-[5%] top-[18%]"
        delay={0.3}
        floatAmplitude={4}
      />

      {/* ── Card 2: Multi-currency wallet balance ── */}
      <FloatingInfoCard
        icon={<Wallet size={16} />}
        label="Available Balance"
        value="₹1,24,500"
        sub="Multi-currency active"
        className="right-[16%] bottom-[14%]"
        delay={0.45}
        floatAmplitude={5}
      />

      {/* ── Real-time tracking status pill ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.55 }}
        className="absolute right-[5%] bottom-[16%] z-20 hidden md:flex items-center gap-2 bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 rounded-full px-3 py-1.5 shadow-lg"
      >
        <Zap size={13} className="text-emerald-400" />
        <span className="text-emerald-200 text-[11px] font-semibold">Instant Settlement · 24/7 Live</span>
      </motion.div>

      {/* ── Success badge check ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.65, type: 'spring', stiffness: 200 }}
        className="absolute right-[34%] top-[14%] z-20 hidden xl:flex w-9 h-9 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 items-center justify-center"
      >
        <CheckCircle2 size={17} className="text-emerald-400" />
      </motion.div>
    </>
  )
}
