'use client'

import { motion } from 'framer-motion'
import { Home, Building2, CheckCircle2, TrendingUp } from 'lucide-react'
import FloatingInfoCard from './FloatingInfoCard'

function GrowthChart() {
  return (
    <svg viewBox="0 0 110 52" className="w-24 h-12" fill="none">
      <motion.polyline
        points="4,48 28,32 52,38 78,16 106,6"
        stroke="rgba(110,231,183,0.85)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
      />
      <motion.polyline
        points="92,4 106,6 102,18"
        stroke="rgba(110,231,183,0.85)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
      {[{ cx: 28, cy: 32 }, { cx: 52, cy: 38 }, { cx: 78, cy: 16 }].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="2.5"
          fill="rgba(110,231,183,0.8)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.25, duration: 0.3 }}
        />
      ))}
    </svg>
  )
}

export default function LoansSlideElements() {
  return (
    <>
      {/* ── Floating house illustration ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute right-[12%] top-[12%] z-20 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-xl" fill="none">
            <path
              d="M40 8L8 34v40h20V52h24v22h20V34L40 8z"
              fill="rgba(16,185,129,0.15)"
              stroke="rgba(110,231,183,0.7)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M33 74V54h14v20" stroke="rgba(110,231,183,0.6)" strokeWidth="2" />
            <rect
              x="34"
              y="38"
              width="12"
              height="10"
              rx="2"
              fill="rgba(16,185,129,0.35)"
              stroke="rgba(110,231,183,0.9)"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Growth chart (top-right) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.35 }}
        className="absolute right-[22%] top-[14%] z-20 hidden lg:block"
      >
        <GrowthChart />
      </motion.div>

      {/* ── Card 1: Home loan approved ── */}
      <FloatingInfoCard
        icon={<Home size={16} />}
        label="Pre-Approved Home Loan"
        value="₹45 Lakh"
        sub="8.5% p.a. • Instant Disbursal"
        badge="✓ Verified"
        badgeColor="bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
        className="right-[5%] top-[18%]"
        delay={0.3}
        floatAmplitude={4}
      />

      {/* ── Card 2: EMI calculation ── */}
      <FloatingInfoCard
        icon={<TrendingUp size={16} />}
        label="Monthly EMI"
        value="₹38,850"
        sub="Zero prepayment penalty"
        className="right-[16%] bottom-[14%]"
        delay={0.45}
        floatAmplitude={5}
      />

      {/* ── Approval SLA pill ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="absolute right-[5%] bottom-[16%] z-20 hidden md:flex items-center gap-2 bg-card/90 dark:bg-emerald-950/40 backdrop-blur-md border border-border dark:border-emerald-500/30 rounded-full px-3 py-1.5 shadow-md"
      >
        <CheckCircle2 size={13} className="text-primary dark:text-emerald-400" />
        <span className="text-foreground dark:text-emerald-200 text-[11px] font-semibold">Digital Approval · 24-48 hrs</span>
      </motion.div>

      {/* ── Building icon (decorative) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute right-[32%] top-[12%] z-10 hidden xl:block"
      >
        <Building2 size={34} className="text-emerald-300" />
      </motion.div>
    </>
  )
}
