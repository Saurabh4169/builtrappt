import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import { SLIDES_DATA } from './slidesData';
import './index.css';

export const SLIDES = [
  Slide1,  // 01: Cover Slide
  Slide2,  // 02: Overview — What this system covers
  Slide3,  // 03: People & Time — HR Dashboard & Employees
  Slide4,  // 04: People & Time — Attendance & Leave
  Slide5,  // 05: Money — Payroll & Loan
  Slide6,  // 06: Money — Salary Increment & Salary Discrepancy
  Slide7,  // 07: Money & Governance — Payroll Settings & Audit Logs
  Slide8,  // 08: Rules & Records — Disciplinary Action & Digital Forms
  Slide9,  // 09: Rules & Records — Clearance Form & Employee Rejoining
  Slide10, // 10: Support & Services — Ticket Management & Meeting Arrangements
  Slide11, // 11: Reports & Summary — Report & Executive Summary / Q&A
];

/* ─── Compact Liquid Glass Button (36px high, 13px text) ───────────────────── */
function GlassButton({ children, onClick, disabled, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: 36,
        padding: '0 16px',
        borderRadius: 999,
        border: '1px solid rgba(226, 232, 240, 0.85)',
        background: hovered
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? '0 6px 20px rgba(11, 31, 75, 0.08), inset 0 1px 0 #FFFFFF'
          : '0 3px 12px rgba(11, 31, 75, 0.04), inset 0 1px 0 #FFFFFF',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        fontSize: 13,
        fontWeight: 600,
        color: '#0B1F4B',
        fontFamily: "'Inter', sans-serif",
        letterSpacing: '0.02em',
        outline: 'none',
        transition: 'background 0.25s ease, box-shadow 0.25s ease',
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

/* ─── Brand Logo Bar (Top Right safe zone) ─────────────────────────────────── */
function LogoBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 32,
        right: 48,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        zIndex: 200,
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        padding: 0,
        boxShadow: 'none',
      }}
    >
      <img
        src="/assets/logo.png"
        alt="Builtraa"
        style={{ height: 34, objectFit: 'contain', objectPosition: 'left' }}
      />
      <div style={{
        width: 1, height: 22, background: '#CBD5E1',
        margin: '0 14px',
        flexShrink: 0,
      }} />
      <img
        src="/assets/uxdlab-logo.png"
        alt="uxdlab"
        style={{ height: 28, objectFit: 'contain' }}
      />
    </motion.div>
  );
}

/* ─── Top Left Home Button ─────────────────────────────────────────────────── */
function HomeButton({ onClick }) {
  return (
    <div style={{ position: 'fixed', top: 36, left: 48, zIndex: 200 }}>
      <GlassButton onClick={onClick}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        HOME
      </GlassButton>
    </div>
  );
}

/* ─── Bottom Navigation Pill (The ONLY Slide Counter: 01 — 10) ─────────────── */
function BottomNav({ current, total, onPrev, onNext }) {
  const pad = (n) => String(n).padStart(2, '0');
  const pct = ((current) / Math.max(1, total - 1)) * 100;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 36,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 42,
        zIndex: 200,
        background: 'rgba(255, 255, 255, 0.90)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid #E2E8F0',
        borderRadius: 999,
        padding: '0 10px',
        boxShadow: '0 4px 20px rgba(11, 31, 75, 0.05), inset 0 1px 0 #FFFFFF',
      }}
    >
      {/* Prev Button */}
      <motion.button
        onClick={onPrev}
        disabled={current === 0}
        whileHover={{ scale: current === 0 ? 1 : 1.08 }}
        whileTap={{ scale: current === 0 ? 1 : 0.94 }}
        style={{
          width: 30, height: 30, borderRadius: '50%',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: current === 0 ? 'not-allowed' : 'pointer',
          opacity: current === 0 ? 0.35 : 1,
          outline: 'none',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0B1F4B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </motion.button>

      {/* Progress & Counter (01 — 10) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 150 }}>
        <span style={{
          fontSize: 13, fontWeight: 700, color: '#0B1F4B',
          fontFamily: "'Inter', sans-serif",
        }}>
          {pad(current + 1)}
        </span>

        <div style={{
          flex: 1, height: 2.5,
          background: 'rgba(11, 31, 75, 0.08)',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              background: '#EF144E', // Brand color for progress
              borderRadius: 2,
            }}
          />
        </div>

        <span style={{
          fontSize: 13, fontWeight: 500, color: '#94A3B8',
          fontFamily: "'Inter', sans-serif",
        }}>
          {pad(total)}
        </span>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={current === total - 1}
        whileHover={{ scale: current === total - 1 ? 1 : 1.08 }}
        whileTap={{ scale: current === total - 1 ? 1 : 0.94 }}
        style={{
          width: 30, height: 30, borderRadius: '50%',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: current === total - 1 ? 'not-allowed' : 'pointer',
          opacity: current === total - 1 ? 0.35 : 1,
          outline: 'none',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0B1F4B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.button>
    </div>
  );
}

/* ─── Presenter Speaker Notes Drawer ────────────────────────────────────────── */
function SpeakerNotesDrawer({ isOpen, onClose, notes, slideNum }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass"
      style={{
        position: 'fixed',
        bottom: 90,
        right: 48,
        width: 460,
        borderRadius: 20,
        padding: '20px 24px',
        background: 'rgba(255, 255, 255, 0.96)',
        border: '1.5px solid rgba(226, 232, 240, 0.95)',
        boxShadow: '0 16px 40px rgba(11, 31, 75, 0.12), inset 0 1px 0 #FFFFFF',
        zIndex: 250,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#EF144E',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
        }}>
          SPEAKER SCRIPT · SLIDE {String(slideNum).padStart(2, '0')}
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: '#64748B',
            padding: 4,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          ✕
        </button>
      </div>

      <div style={{
        fontSize: 14.5,
        lineHeight: 1.5,
        color: '#0B1F4B',
        fontFamily: "'Inter', sans-serif",
        fontStyle: 'italic',
      }}>
        "{notes || 'No notes for this slide.'}"
      </div>
      <div style={{
        marginTop: 10,
        fontSize: 11,
        color: '#94A3B8',
        fontFamily: "'Inter', sans-serif",
      }}>
        Press [N] to toggle speaker notes anytime
      </div>
    </motion.div>
  );
}

/* ─── Main Deck Orchestrator ─────────────────────────────────────────────────── */
export default function App() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const isScrolling = useRef(false);

  // Compute exact scale to fit 1920×1080 stage inside viewport
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const sx = window.innerWidth / 1920;
      const sy = window.innerHeight / 1080;
      setScale(Math.min(sx, sy));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goTo = useCallback((idx, direction) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    if (clamped === current) return;
    if (isScrolling.current) return;
    isScrolling.current = true;
    setDir(direction !== undefined ? direction : (idx > current ? 1 : -1));
    setCurrent(clamped);
    setTimeout(() => { isScrolling.current = false; }, 550);
  }, [current]);

  const goNext = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Keyboard Navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault(); goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); goPrev();
      } else if (e.key === 'Home') {
        e.preventDefault(); goTo(0, -1);
      } else if (e.key === 'End') {
        e.preventDefault(); goTo(SLIDES.length - 1, 1);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Escape') {
        setShowNotes(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, goTo]);

  // Wheel Scroll Navigation
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (e.deltaY > 30) goNext();
      else if (e.deltaY < -30) goPrev();
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [goNext, goPrev]);

  // Touch Navigation
  useEffect(() => {
    let startY = 0;
    const onStart = (e) => { startY = e.touches[0].clientY; };
    const onEnd = (e) => {
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) dy > 0 ? goNext() : goPrev();
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [goNext, goPrev]);

  const SlideComp = SLIDES[current];
  const currentSlideData = SLIDES_DATA[current] || {};

  // Clean Fade Slide Transition
  const slideVariants = {
    enter: (d) => ({
      opacity: 0,
      y: d > 0 ? 16 : -16,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (d) => ({
      opacity: 0,
      y: d > 0 ? -16 : 16,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      background: '#FFFFFF',
    }}>
      {/* Top Bar Safe Zone: HOME (left) & Logos (right) */}
      <HomeButton onClick={() => goTo(0, -1)} />
      <LogoBar />

      {/* Fixed 1920×1080 Stage Centred with CSS transform: scale() */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#FFFFFF',
        }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              width: 1920 * scale,
              height: 1080 * scale,
              position: 'relative',
              flexShrink: 0,
              background: '#FFFFFF',
            }}
          >
            <div style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              width: 1920,
              height: 1080,
              background: '#FFFFFF',
            }}>
              <SlideComp
                slideIndex={current + 1}
                totalSlides={SLIDES.length}
                onNavigate={goTo}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Bar Safe Zone: Centred Nav Pill (ONLY counter: 01 — 10) */}
      <BottomNav
        current={current}
        total={SLIDES.length}
        onPrev={goPrev}
        onNext={goNext}
      />

      {/* Bottom-Left SKIP Button (fixed at left: 48px, bottom: 36px) */}
      <div style={{ position: 'fixed', bottom: 36, left: 48, zIndex: 200 }}>
        {current < SLIDES.length - 1 && (
          <GlassButton
            onClick={() => goTo(SLIDES.length - 1, 1)}
            style={{ letterSpacing: '0.06em' }}
          >
            SKIP&nbsp;→
          </GlassButton>
        )}
      </div>

      {/* Bottom-Right Speaker Notes Toggle Button */}
      <div style={{ position: 'fixed', bottom: 36, right: 48, zIndex: 200 }}>
        <GlassButton
          onClick={() => setShowNotes((prev) => !prev)}
          style={{
            background: showNotes ? 'rgba(239, 20, 78, 0.08)' : undefined,
            borderColor: showNotes ? '#EF144E' : undefined,
            color: showNotes ? '#EF144E' : '#0B1F4B',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          NOTES [N]
        </GlassButton>
      </div>

      {/* Slide-Up Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        notes={currentSlideData.speakerNotes}
        slideNum={current + 1}
      />
    </div>
  );
}
