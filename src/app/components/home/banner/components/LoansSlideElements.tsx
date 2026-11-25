'use client'

import { motion } from 'framer-motion'
import { Home, Building2, CheckCircle2, TrendingUp } from 'lucide-react'
import FloatingInfoCard from './FloatingInfoCard'
import TrustIndicator from './TrustIndicator'

/* Animated growth chart SVG drawn in-place */
function GrowthChart() {
  return (
    <svg viewBox="0 0 120 60" className="w-28 h-14" fill="none">
      <motion.polyline
        points="4,56 30,38 55,44 85,20 116,8"
        stroke="rgba(74,222,128,0.85)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
      />
      <motion.polyline
        points="100,4 116,8 112,24"
        stroke="rgba(74,222,128,0.85)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
      />
      {[{ cx: 30, cy: 38 }, { cx: 55, cy: 44 }, { cx: 85, cy: 20 }].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="3"
          fill="rgba(74,222,128,0.7)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.3, duration: 0.3 }}
        />
      ))}
    </svg>
  )
}

export default function LoansSlideElements() {
  return (
    <>
      {/* ── Right-side floating house illustration ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute right-[14%] top-[18%] z-20 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* House SVG */}
          <svg viewBox="0 0 90 90" className="w-20 h-20 drop-shadow-2xl" fill="none">
            <path d="M45 8L10 38v44h22V58h26v24h22V38L45 8z"
              fill="rgba(96,165,250,0.15)" stroke="rgba(147,197,253,0.6)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M37 82V60h16v22" stroke="rgba(147,197,253,0.5)" strokeWidth="2" />
            <rect x="38" y="44" width="14" height="12" rx="2"
              fill="rgba(96,165,250,0.35)" stroke="rgba(96,165,250,0.8)" strokeWidth="1.5" />
            {/* Roof accent */}
            <path d="M45 8L10 38" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
            <path d="M45 8L80 38" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Growth chart (top-right) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute right-[8%] top-[12%] z-20 hidden lg:block"
      >
        <GrowthChart />
      </motion.div>

      {/* ── Loan card (floating right-middle) ── */}
      <FloatingInfoCard
        icon={<Home size={16} />}
        label="Home Loan"
        value="₹45 Lakh"
        sub="8.5% p.a. • 20 yrs"
        badge="✓ Approved"
        badgeColor="bg-green-500/20 text-green-300 border-green-500/30"
        className="right-[6%] top-[32%]"
        delay={0.35}
        floatAmplitude={5}
      />

      {/* ── EMI card (bottom-right) ── */}
      <FloatingInfoCard
        icon={<TrendingUp size={16} />}
        label="Monthly EMI"
        value="₹38,850"
        sub="Zero prepayment charges"
        className="right-[18%] bottom-[18%]"
        delay={0.5}
        floatAmplitude={4}
      />

      {/* ── Approval indicator ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute right-[6%] bottom-[28%] z-20 hidden md:flex items-center gap-2 bg-green-500/15 backdrop-blur-md border border-green-400/30 rounded-full px-3 py-1.5"
      >
        <CheckCircle2 size={14} className="text-green-400" />
        <span className="text-green-300 text-[11px] font-semibold">Quick Approval · 48hrs</span>
      </motion.div>

      {/* ── Building icon (decorative) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute right-[32%] top-[10%] z-10 hidden xl:block"
      >
        <Building2 size={40} className="text-blue-300" />
      </motion.div>

      {/* ── Trust indicator (passed to left column via render) ── */}
      <div className="absolute left-[6%] bottom-[16%] z-20">
        <TrustIndicator
          avatarInitials={['RK', 'AM', 'SS', 'PJ']}
          count="12,000+"
          label="customers approved this year"
          delay={0.55}
        />
      </div>
    </>
  )
}
