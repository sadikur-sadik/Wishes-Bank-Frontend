'use client'

import { motion } from 'framer-motion'
import { Shield, PiggyBank, TrendingUp, BadgeCheck } from 'lucide-react'
import FloatingInfoCard from './FloatingInfoCard'

/* Upward bar chart */
function SavingsChart() {
  const bars = [
    { h: 24, delay: 0.3 },
    { h: 36, delay: 0.45 },
    { h: 28, delay: 0.6 },
    { h: 48, delay: 0.75 },
    { h: 56, delay: 0.9 },
  ]
  return (
    <svg viewBox="0 0 100 65" className="w-24 h-16" fill="none">
      {bars.map((bar, i) => (
        <motion.rect
          key={i}
          x={6 + i * 18}
          y={60 - bar.h}
          width="12"
          height={bar.h}
          rx="3"
          fill={`rgba(96,165,250,${0.3 + i * 0.14})`}
          stroke={`rgba(147,197,253,${0.5 + i * 0.1})`}
          strokeWidth="1"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: bar.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${14 + i * 18}px 60px` }}
        />
      ))}
      <line x1="2" y1="62" x2="98" y2="62" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </svg>
  )
}

/* Animated coin */
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
        animate={{ y: [0, -7, 0], rotateY: [0, 180, 360] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }}
        className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-600/20 border border-yellow-400/40 backdrop-blur-md flex items-center justify-center shadow-lg"
      >
        <span className="text-yellow-300 text-sm font-black">₹</span>
      </motion.div>
    </motion.div>
  )
}

export default function SavingsSlideElements() {
  return (
    <>
      {/* ── Savings bar chart ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.25 }}
        className="absolute right-[8%] top-[14%] z-20 hidden lg:block"
      >
        <SavingsChart />
      </motion.div>

      {/* ── Savings account card ── */}
      <FloatingInfoCard
        icon={<PiggyBank size={16} />}
        label="Savings Balance"
        value="₹2,84,500"
        sub="+₹1,850 this month"
        badge="↑ 8.5% p.a."
        badgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
        className="right-[6%] top-[32%]"
        delay={0.35}
        floatAmplitude={5}
      />

      {/* ── Interest card ── */}
      <FloatingInfoCard
        icon={<TrendingUp size={16} />}
        label="Interest Earned"
        value="₹24,183"
        sub="Zero hidden fees"
        className="right-[20%] bottom-[22%]"
        delay={0.5}
        floatAmplitude={4}
      />

      {/* ── Shield security badge ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.55, type: 'spring', stiffness: 180 }}
        className="absolute right-[6%] bottom-[26%] z-20 hidden md:flex items-center gap-2 bg-blue-500/15 backdrop-blur-md border border-blue-400/30 rounded-full px-3 py-1.5"
      >
        <Shield size={13} className="text-blue-300" />
        <span className="text-blue-200 text-[11px] font-semibold">RBI Insured · DICGC Protected</span>
      </motion.div>

      {/* ── Verified badge ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.65, type: 'spring', stiffness: 200 }}
        className="absolute right-[36%] top-[12%] z-20 hidden xl:flex w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/40 items-center justify-center"
      >
        <BadgeCheck size={18} className="text-blue-300" />
      </motion.div>

      {/* ── Floating coins ── */}
      <FloatingCoin className="right-[28%] top-[25%]" delay={0.4} />
      <FloatingCoin className="right-[14%] top-[48%]" delay={0.65} />
    </>
  )
}
