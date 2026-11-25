'use client'

import Image, { type StaticImageData } from 'next/image'
import React, { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'

import Banner_1 from '@/../public/Banner_1.jpg'
import Banner_2 from '@/../public/Banner_2.jpg'
import Banner_3 from '@/../public/Banner_3.jpg'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setActiveIndex, setHovered } from '@/store/slices/bannerSlice'

import HeroBadge from './components/HeroBadge'
import TrustIndicator from './components/TrustIndicator'
import LoansSlideElements from './components/LoansSlideElements'
import TransferSlideElements from './components/TransferSlideElements'
import SavingsSlideElements from './components/SavingsSlideElements'

// ─────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────
interface SlideConfig {
  id: number
  src: StaticImageData
  alt: string
  imgPosition: string
  badge: string
  headingLines: (string | React.ReactNode)[]
  description: string
  primaryBtn: string
  secondaryBtn: string
  overlay: string
  trust?: {
    avatarInitials: string[]
    count: string
    label: string
  }
  Elements: React.ComponentType
}

// ─────────────────────────────────────────────────────────────────
// Slide data
// ─────────────────────────────────────────────────────────────────
const SLIDES: SlideConfig[] = [
  {
    id: 0,
    src: Banner_1,
    alt: 'Financial consultant reviewing loan documents and charts',
    imgPosition: 'object-[center_30%]',
    badge: 'Smart Banking · Since 1998',
    headingLines: [
      'Loans Tailored',
      <>For Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Goals</span></>,
    ],
    description:
      'From home loans to education finance — flexible plans, low rates, quick approvals.',
    primaryBtn: 'Apply for a Loan',
    secondaryBtn: 'Calculate EMI',
    overlay:
      'linear-gradient(100deg, rgba(5,15,40,0.88) 0%, rgba(5,15,40,0.65) 45%, rgba(5,15,40,0.15) 100%)',
    trust: {
      avatarInitials: ['RK', 'AM', 'SS', 'PJ'],
      count: '12,000+',
      label: 'loans approved this year',
    },
    Elements: LoansSlideElements,
  },
  {
    id: 1,
    src: Banner_2,
    alt: 'ATM and cash withdrawal representing money transfer services',
    imgPosition: 'object-center',
    badge: 'Instant Transfers · 24/7',
    headingLines: [
      <>Send Money <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Anywhere</span>,</>,
      'Instantly',
    ],
    description:
      'Transfer funds locally or internationally in seconds — 24/7, with real-time tracking.',
    primaryBtn: 'Send Money Now',
    secondaryBtn: 'View Rates',
    overlay:
      'linear-gradient(100deg, rgba(5,15,40,0.90) 0%, rgba(5,15,40,0.60) 48%, rgba(5,15,40,0.12) 100%)',
    trust: {
      avatarInitials: ['MA', 'SB', 'TR', 'KC'],
      count: '500K+',
      label: 'transfers completed daily',
    },
    Elements: TransferSlideElements,
  },
  {
    id: 2,
    src: Banner_3,
    alt: 'Bank building representing safe savings and financial security',
    imgPosition: 'object-[center_40%]',
    badge: 'Secure Savings · Zero Fees',
    headingLines: [
      'Your Money,',
      <>Safe &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">Growing</span></>,
    ],
    description:
      'Open a savings account today and earn competitive returns with zero hidden fees.',
    primaryBtn: 'Open an Account',
    secondaryBtn: 'Learn More',
    overlay:
      'linear-gradient(100deg, rgba(5,15,40,0.88) 0%, rgba(5,15,40,0.58) 46%, rgba(5,15,40,0.14) 100%)',
    trust: {
      avatarInitials: ['AN', 'VR', 'DM', 'SK'],
      count: '₹5,000 Cr+',
      label: 'in savings deposits',
    },
    Elements: SavingsSlideElements,
  },
]

// ─────────────────────────────────────────────────────────────────
// Text animation variants
// ─────────────────────────────────────────────────────────────────
const textVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.28 } },
}

// ─────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────
export default function Banner() {
  const shouldReduceMotion = useReducedMotion()
  const dispatch = useAppDispatch()
  const { activeIndex, isHovered } = useAppSelector((s) => s.banner)

  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])

  // Sync embla → Redux
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    dispatch(setActiveIndex(emblaApi.selectedScrollSnap()))
  }, [emblaApi, dispatch])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  // Hover → pause / resume autoplay
  const handleMouseEnter = useCallback(() => {
    dispatch(setHovered(true))
    autoplay.current.stop()
  }, [dispatch])

  const handleMouseLeave = useCallback(() => {
    dispatch(setHovered(false))
    autoplay.current.play()
  }, [dispatch])

  const goTo = useCallback(
    (i: number) => {
      emblaApi?.scrollTo(i)
      autoplay.current.reset()
    },
    [emblaApi]
  )

  const slide = SLIDES[activeIndex]
  const { Elements } = slide

  return (
    <section
      className="hero-slider"
      aria-label="Homepage hero banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Embla track ── */}
      <div className="hero-slider__viewport" ref={emblaRef}>
        <div className="hero-slider__container">
          {SLIDES.map((s, idx) => (
            <div className="hero-slider__slide" key={s.id} aria-hidden={idx !== activeIndex}>
              <div className="hero-slider__inner">
                {/* Background image */}
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  className={`hero-slider__img ${s.imgPosition}`}
                  priority={idx === 0}
                  quality={90}
                />
                {/* Gradient overlay */}
                <div
                  className="hero-slider__overlay"
                  style={{ background: s.overlay }}
                />
                {/* Subtle dark bottom vignette for dots readability */}
                <div className="hero-slider__vignette" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Content layer (above carousel) ── */}
      <div className="hero-slider__content-layer">

        {/* Left content column */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${activeIndex}`}
            className="hero-slider__left"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Badge */}
            <motion.div custom={0} variants={textVariant}>
              <HeroBadge delay={0}>{slide.badge}</HeroBadge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-slider__heading"
              custom={1}
              variants={textVariant}
            >
              {slide.headingLines.map((line, i) => (
                <span key={i} className="block leading-[1.08]">
                  {line}
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="hero-slider__desc"
              custom={2}
              variants={textVariant}
            >
              {slide.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="hero-slider__btns"
              custom={3}
              variants={textVariant}
            >
              <motion.button
                className="hero-btn hero-btn--primary"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                {slide.primaryBtn}
                <ArrowRight size={16} className="inline ml-2 -mb-0.5" />
              </motion.button>

              <motion.button
                className="hero-btn hero-btn--ghost"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                {slide.secondaryBtn}
                <ChevronRight size={16} className="inline ml-1 -mb-0.5" />
              </motion.button>
            </motion.div>

            {/* Trust indicator */}
            {slide.trust && (
              <motion.div custom={4} variants={textVariant}>
                <TrustIndicator
                  avatarInitials={slide.trust.avatarInitials}
                  count={slide.trust.count}
                  label={slide.trust.label}
                  delay={0}
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Right decorative elements — keyed to activeIndex */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`elements-${activeIndex}`}
            className="hero-slider__right-elements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Elements />
          </motion.div>
        </AnimatePresence>

        {/* ── Dot pagination ── */}
        <div className="hero-slider__dots" role="tablist" aria-label="Slide indicators">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`hero-slider__dot ${i === activeIndex ? 'hero-slider__dot--active' : ''}`}
            />
          ))}
        </div>

        {/* ── Slide counter ── */}
        <div className="hero-slider__counter" aria-live="polite" aria-atomic>
          <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="text-white/35 mx-1">/</span>
          <span className="text-white/35">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

        {/* ── Hover paused indicator ── */}
        {isHovered && (
          <div className="hero-slider__paused" aria-live="polite">
            ⏸ Paused
          </div>
        )}
      </div>
    </section>
  )
}
