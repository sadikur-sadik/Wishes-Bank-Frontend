'use client'

import { motion } from 'framer-motion'
import { Shield, PiggyBank, TrendingUp, BadgeCheck } from 'lucide-react'
import FloatingInfoCard from './FloatingInfoCard'

function SavingsChart() {
  const bars = [
    { h: 20, delay: 0.25 },
    { h: 30, delay: 0.35 },
    { h: 26, delay: 0.45 },
    { h: 42, delay: 0.55 },
    { h: 50, delay: 0.65 },
  ]
  return (
    <svg viewBox="0 0 100 58" className="w-24 h-14" fill="none">
      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={6 + i * 18}
          y={54 - bar.h}
          width="12"
          height={bar.h}
          rx="3"
          fill={`rgba(16,185,129,${0.35 + i * 0.12})`}
          stroke={`rgba(110,231,183,${0.5 + i * 0.1})`}
          strokeWidth="1"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: bar.delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${14 + i * 18}px 54px` }}
        />
      ))}
      <line x1="2" y1="56" x2="98" y2="56" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    </svg>
  )
}

function FloatingCoin({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`absolute z-20 hidden lg:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0], rotateY: [0, 180, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
        className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-600/20 border border-emerald-400/40 backdrop-blur-md flex items-center justify-center shadow-lg"
      >
        <span className="text-emerald-300 text-xs font-black">₹</span>
      </motion.div>
    </motion.div>
  )
}

export default function SavingsSlideElements() {
  return (
    <>
      {/* ── Top-right growth visualization ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
        className="absolute right-[18%] top-[14%] z-20 hidden lg:block"
      >
        <SavingsChart />
      </motion.div>

      {/* ── Primary card: Savings balance ── */}
      <FloatingInfoCard
        icon={<PiggyBank size={16} />}
        label="High-Yield Savings"
        value="₹2,84,500"
        sub="+₹1,850 credited this month"
        badge="↑ 8.5% p.a."
        badgeColor="bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
        className="right-[5%] top-[18%]"
        delay={0.3}
        floatAmplitude={4}
      />

      {/* ── Secondary card: Returns earned ── */}
      <FloatingInfoCard
        icon={<TrendingUp size={16} />}
        label="Total Returns"
        value="₹24,183"
        sub="Compounded monthly"
        className="right-[16%] bottom-[14%]"
        delay={0.45}
        floatAmplitude={5}
      />

      {/* ── Security Trust Indicator Pill ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.55, type: 'spring', stiffness: 180 }}
        className="absolute right-[5%] bottom-[16%] z-20 hidden md:flex items-center gap-2 bg-card/90 dark:bg-emerald-950/40 backdrop-blur-md border border-border dark:border-emerald-500/30 rounded-full px-3 py-1.5 shadow-md"
      >
        <Shield size={13} className="text-primary dark:text-emerald-400" />
        <span className="text-foreground dark:text-emerald-200 text-[11px] font-semibold">RBI Insured · DICGC Protected</span>
      </motion.div>

      {/* ── Verified badge (decorative) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.65, type: 'spring', stiffness: 200 }}
        className="absolute right-[35%] top-[12%] z-20 hidden xl:flex w-9 h-9 rounded-full bg-emerald-500/15 backdrop-blur-md border border-emerald-400/30 items-center justify-center"
      >
        <BadgeCheck size={17} className="text-emerald-300" />
      </motion.div>

      {/* ── Subtle animated floating coins ── */}
      <FloatingCoin className="right-[30%] top-[28%]" delay={0.35} />
      <FloatingCoin className="right-[8%] top-[56%]" delay={0.6} />
    </>
  )
}
