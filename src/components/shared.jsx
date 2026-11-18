import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ZoomIn,
  X,
  Minus,
  Plus,
  BarChart3,
  Clock,
  BellRing,
  Users,
  IdCard,
  ShieldCheck,
  CalendarDays,
  Sparkles,
  Calendar,
  Scale,
  Send,
  CheckSquare,
  CreditCard,
  Calculator,
  Coins,
  Lock,
  Sliders,
  RefreshCw,
  FilePlus,
  TrendingUp,
  History,
  AlertTriangle,
  FileWarning,
  Activity,
  FileText,
  ListOrdered,
  FolderCheck,
  PackageCheck,
  Wallet,
  UserPlus,
  Zap,
  Inbox,
  Laptop,
  PieChart,
  Download,
  Layers,
  Settings,
} from 'lucide-react';
import { SLIDES_DATA } from '../slidesData';

// ─── Design Tokens ────────────────────────────────────────────────────────────
export const BRAND = '#EF144E'; // Extracted logo dominant color
export const NAVY = '#0B1F4B';
export const ROYAL = '#1D4ED8';
export const GREY = '#64748B';
export const LIGHT_GREY = '#94A3B8';
export const BORDER = '#E2E8F0';
export const CARD_BG = '#FFFFFF';
export const CHIP_BG = '#EFF6FF';

export const easeCurve = [0.22, 1, 0.36, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: custom * 0.08, ease: easeCurve },
  }),
};

// ─── Semantic Feature Icon Resolver ──────────────────────────────────────────
export function getFeatureIcon(label = '') {
  const l = label.toLowerCase();
  if (l.includes('metric') || l.includes('headcount') || l.includes('summary')) return BarChart3;
  if (l.includes('attendance') || l.includes('time') || l.includes('shift') || l.includes('clock')) return Clock;
  if (l.includes('alert') || l.includes('expiry') || l.includes('proactive')) return BellRing;
  if (l.includes('profile') || l.includes('personal') || l.includes('id')) return IdCard;
  if (l.includes('roster') || l.includes('workforce') || l.includes('participant') || l.includes('employees')) return Users;
  if (l.includes('document') || l.includes('security') || l.includes('integrity') || l.includes('validity')) return ShieldCheck;
  if (l.includes('rule') || l.includes('rapid') || l.includes('instant')) return Sparkles;
  if (l.includes('calendar') || l.includes('room') || l.includes('booking')) return Calendar;
  if (l.includes('balance') || l.includes('limit') || l.includes('fair')) return Scale;
  if (l.includes('request') || l.includes('direct') || l.includes('send')) return Send;
  if (l.includes('approv') || l.includes('sign-off') || l.includes('resolution') || l.includes('task')) return CheckSquare;
  if (l.includes('run') || l.includes('payroll') || l.includes('card')) return CreditCard;
  if (l.includes('calculat') || l.includes('formula') || l.includes('rate')) return Calculator;
  if (l.includes('lock') || l.includes('archive')) return Lock;
  if (l.includes('recover') || l.includes('adjust') || l.includes('setting')) return Sliders;
  if (l.includes('increment') || l.includes('trend')) return TrendingUp;
  if (l.includes('history') || l.includes('continuity') || l.includes('reactivat')) return History;
  if (l.includes('discrepan') || l.includes('issue') || l.includes('incident') || l.includes('irregular')) return AlertTriangle;
  if (l.includes('template') || l.includes('form') || l.includes('records')) return FileText;
  if (l.includes('step') || l.includes('action')) return ListOrdered;
  if (l.includes('asset') || l.includes('handover')) return PackageCheck;
  if (l.includes('settlement') || l.includes('wallet') || l.includes('deduction')) return Wallet;
  if (l.includes('rejoin') || l.includes('onboard') || l.includes('hire')) return UserPlus;
  if (l.includes('queue') || l.includes('ticket')) return Inbox;
  if (l.includes('resource') || l.includes('device')) return Laptop;
  if (l.includes('export') || l.includes('download')) return Download;
  if (l.includes('pie') || l.includes('ratio')) return PieChart;
  return CheckCircle2;
}

// ─── Full-Screen Interactive Image Viewer Modal ──────────────────────────────
export function ImageViewerModal({ image, originalImage, title, onClose }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(Math.max(0.5, prev + delta), 3.5));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const imgSrc = originalImage || image;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(11, 31, 75, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Floating Control Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '8px 18px',
          borderRadius: 999,
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          zIndex: 1010,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>
          {title} · Full Resolution View
        </span>
        <span style={{ width: 1, height: 16, background: '#CBD5E1' }} />
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
          style={{
            background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '50%',
            width: 28, height: 28, cursor: 'pointer', fontWeight: 700, color: NAVY,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          title="Zoom Out"
        >
          <Minus size={14} />
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: GREY, minWidth: 42, textAlign: 'center' }}>
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.min(3.5, z + 0.25))}
          style={{
            background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '50%',
            width: 28, height: 28, cursor: 'pointer', fontWeight: 700, color: NAVY,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          title="Zoom In"
        >
          <Plus size={14} />
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          style={{
            background: '#EFF6FF', border: '1px solid #DBEAFE', borderRadius: 999,
            padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: ROYAL,
          }}
          title="Reset to Fit"
        >
          Fit
        </button>
        <span style={{ width: 1, height: 16, background: '#CBD5E1' }} />
        <button
          onClick={onClose}
          style={{
            background: BRAND, color: '#FFF', border: 'none', borderRadius: '50%',
            width: 26, height: 26, cursor: 'pointer', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          title="Close (Esc)"
        >
          <X size={15} />
        </button>
      </div>

      {/* Main Image Canvas */}
      <div
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          maxWidth: '92vw',
          maxHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          style={{
            maxWidth: '100%',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: 8,
            boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{
        position: 'absolute', bottom: 20, color: 'rgba(255,255,255,0.7)',
        fontSize: 12, fontFamily: "'Inter', sans-serif",
      }}>
        Scroll to zoom · Click & drag to pan · Press Esc to close
      </div>
    </motion.div>
  );
}

// ─── SlideLayout (Safe Zones: Margins 96px, Top 76px, Bottom 84px) ───────────
export function SlideLayout({
  children,
  slideNumber = 1,
  totalSlides = 10,
  speakerNotes = '',
}) {
  const progressPct = ((slideNumber - 1) / Math.max(1, totalSlides - 1)) * 100;

  return (
    <div
      className="slide-stage"
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        background: '#FFFFFF', // Pure solid white, NO gradient
      }}
    >
      {/* 3px Top Brand Progress Line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'rgba(11, 31, 75, 0.06)', zIndex: 300,
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: easeCurve }}
          style={{ height: '100%', background: BRAND }}
        />
      </div>

      {/* Main Content Area (Unobstructed zone: top 76px, left/right 96px, bottom 84px) */}
      <div style={{
        position: 'absolute',
        top: 76,
        left: 96,
        right: 96,
        bottom: 84,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── SlideTitle Component (Slide title: 60px/800, Intro: 20px/400) ───────────
export function SlideTitle({
  eyebrow,
  titleNavy,
  titleBrand = '',
  titleNavyAfter = '',
  intro,
  slideIndex = 2,
}) {
  const eyebrowText = eyebrow || `${String(slideIndex).padStart(2, '0')} / SECTION`;

  const navyWords = titleNavy ? titleNavy.split(' ') : [];
  const brandWords = titleBrand ? titleBrand.split(' ') : [];
  const navyAfterWords = titleNavyAfter ? titleNavyAfter.split(' ') : [];

  return (
    <div style={{ marginBottom: 12 }}>
      {/* Eyebrow: NN / CATEGORY NAME */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeCurve }}
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.14em',
            color: BRAND,
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {eyebrowText}
        </motion.div>
        {/* 56px × 2px brand-colour line drawing left to right */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 56 }}
          transition={{ duration: 0.45, delay: 0.1, ease: easeCurve }}
          style={{ height: 2, background: BRAND, borderRadius: 1 }}
        />
      </div>

      {/* Title: 60px, weight 800 */}
      <h1
        style={{
          fontSize: 60,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: NAVY,
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          columnGap: 14,
          rowGap: 2,
        }}
      >
        {navyWords.map((word, i) => (
          <motion.span
            key={`n1-${i}`}
            className="shine"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + i * 0.05, ease: easeCurve }}
          >
            {word}
          </motion.span>
        ))}

        {brandWords.length > 0 && brandWords.map((word, i) => (
          <motion.span
            key={`b-${i}`}
            className="shine-brand"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + (navyWords.length + i) * 0.05, ease: easeCurve }}
            style={{ color: BRAND }}
          >
            {word}
          </motion.span>
        ))}

        {navyAfterWords.map((word, i) => (
          <motion.span
            key={`n2-${i}`}
            className="shine"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 + (navyWords.length + brandWords.length + i) * 0.05, ease: easeCurve }}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Intro: 20px, weight 400, grey, one line */}
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: easeCurve }}
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: GREY,
            margin: '4px 0 0',
            lineHeight: 1.3,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

// ─── Module Column Card (Precise, Sleek, Uncongested Layout) ────────────────
export function ModuleColumnCard({ moduleData, delay = 0.2, side = 'left', onEnlarge }) {
  if (!moduleData) return null;
  const IconComp = moduleData.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={delay}
      initial="hidden"
      animate="visible"
      className="glass"
      style={{
        flex: 1,
        borderRadius: 20,
        padding: '22px 24px 20px 24px', // Clean, balanced card padding
        border: '1px solid #E2E8F0',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: '0 8px 24px rgba(11, 31, 75, 0.04)',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* 3.5px left brand-colour accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 3.5,
        background: BRAND,
      }} />

      {/* Top Section: Header + Image Frame */}
      <div>
        {/* Module Header: 24px/700 title + 14px/400 subtitle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 12,
        }}>
          {IconComp && (
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: CHIP_BG,
              border: '1.5px solid #DBEAFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IconComp size={18} color={ROYAL} strokeWidth={2} />
            </div>
          )}
          <div>
            <h2 style={{
              fontSize: 24, // Precise, proportional module name
              fontWeight: 700,
              color: NAVY,
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}>
              {moduleData.name}
            </h2>
            <div style={{
              fontSize: 14, // Clean subtitle
              fontWeight: 400,
              color: GREY,
              fontFamily: "'Inter', sans-serif",
              marginTop: 1,
              lineHeight: 1.25,
            }}>
              {moduleData.tagline}
            </div>
          </div>
        </div>

        {/* 21:10 Screenshot Frame (Aspect ratio: 21 / 10, sleek 250px height) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (moduleData.image && onEnlarge) {
              onEnlarge({
                image: moduleData.image,
                originalImage: moduleData.originalImage || moduleData.image,
                title: moduleData.name,
              });
            }
          }}
          style={{
            '--shot-ratio': '21 / 10',
            width: '100%',
            height: 250, // Sleek 250px frame height
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 4px 14px rgba(11, 31, 75, 0.04)',
            cursor: moduleData.image ? 'zoom-in' : 'default',
          }}
        >
          {/* Thin Browser Top Bar (22px) */}
          <div style={{
            height: 22,
            background: '#F1F5F9',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            </div>
            <span style={{ fontSize: 10.5, color: '#94A3B8', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Builtraa · {moduleData.name}
            </span>
            {moduleData.image ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 10,
                fontWeight: 600,
                color: isHovered ? ROYAL : 'transparent',
                transition: 'color 0.2s ease',
              }}>
                <ZoomIn size={11} />
                <span>Click to enlarge</span>
              </div>
            ) : (
              <div style={{ width: 20 }} />
            )}
          </div>

          {/* Image Display Area */}
          <div style={{
            flex: 1,
            width: '100%',
            height: 'calc(100% - 22px)',
            overflow: 'hidden',
            position: 'relative',
            background: '#FFFFFF',
          }}>
            {moduleData.image ? (
              <img
                src={moduleData.image}
                srcSet={`${moduleData.image} 1x, ${moduleData.image.replace('.png', '@2x.png')} 2x`}
                alt={moduleData.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top left',
                  display: 'block',
                  imageRendering: 'auto',
                  transition: 'transform 0.25s ease',
                  transform: isHovered ? 'scale(1.015)' : 'scale(1)',
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                border: '1.5px dashed #CBD5E1',
                borderRadius: 8,
                background: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                textAlign: 'center',
              }}>
                {IconComp && (
                  <IconComp size={32} color={ROYAL} style={{ marginBottom: 6, opacity: 0.55 }} strokeWidth={1.75} />
                )}
                <div style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: NAVY,
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 2,
                }}>
                  {moduleData.name}
                </div>
                <div style={{
                  fontSize: 12.5,
                  color: GREY,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}>
                  Screenshot coming soon
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle Section: 3 Mini Feature Cards with Increased Perfect Spacing & Row-by-Row Stagger */}
      <div style={{
        marginTop: 16, // Clean breathing room from image
        display: 'flex',
        flexDirection: 'column',
        gap: 14, // INCREASED PERFECT SPACING between the 3 cards (14px)
      }}>
        {moduleData.bullets.map((bullet, idx) => {
          const FeatureIcon = getFeatureIcon(bullet.label);
          // Left module card 1 appears first with right module card 1, then card 2, then card 3
          const baseDelay = 0.35;
          const rowStagger = 0.28;
          const sideOffset = side === 'right' ? 0.10 : 0;
          const cardDelay = baseDelay + idx * rowStagger + sideOffset;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: cardDelay, ease: easeCurve }}
              whileHover={{
                scale: 1.012,
                boxShadow: '0 4px 14px rgba(11, 31, 75, 0.05)',
                transition: { duration: 0.2 },
              }}
              style={{
                width: '100%',
                height: 54, // Precise, elegant 54px height
                borderRadius: 14,
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderLeft: `3.5px solid ${BRAND}`, // 3.5px brand accent line
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxShadow: '0 2px 6px rgba(11, 31, 75, 0.02)',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              {/* 34px Icon Chip */}
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: `linear-gradient(135deg, ${BRAND} 0%, ${ROYAL} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(239, 20, 78, 0.18)',
              }}>
                <FeatureIcon size={17} color="#FFFFFF" strokeWidth={2} />
              </div>

              {/* Two Lines of Crisp Text */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                lineHeight: 1.22,
              }}>
                <div style={{
                  fontSize: 15.5,
                  fontWeight: 700,
                  color: NAVY,
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}>
                  {bullet.label}
                </div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: GREY,
                  fontFamily: "'Inter', sans-serif",
                  marginTop: 1,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}>
                  {bullet.desc}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Section: Steps in ONE STRICT HORIZONTAL ROW + "Why it helps" Strip */}
      <div style={{
        marginTop: 16, // Clean breathing room
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {/* Steps Row (STRICTLY ONE HORIZONTAL ROW: flex-nowrap, evenly distributed) */}
        {moduleData.steps && moduleData.steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.25, ease: easeCurve }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: BRAND,
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              flexShrink: 0,
            }}>
              STEPS:
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexWrap: 'nowrap', // STRICTLY ONE HORIZONTAL ROW
              flex: 1,
              minWidth: 0,
            }}>
              {moduleData.steps.map((st, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    height: 28,
                    padding: '0 8px',
                    borderRadius: 999,
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    fontSize: 12,
                    color: NAVY,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                  }}
                  title={st}
                >
                  <span style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: sIdx === 0 ? BRAND : '#CBD5E1',
                    color: sIdx === 0 ? '#FFFFFF' : NAVY,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {sIdx + 1}
                  </span>
                  <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {st}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* "Why it helps" Strip (height: 40px) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.40, ease: easeCurve }}
          style={{
            height: 40,
            background: '#EFF6FF',
            border: '1px solid #DBEAFE',
            borderRadius: 10,
            padding: '0 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <CheckCircle2 size={16} color={ROYAL} strokeWidth={2.2} style={{ flexShrink: 0 }} />
          <div style={{
            fontSize: 13.5,
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}>
            <span style={{ fontWeight: 700, color: ROYAL }}>Why it helps: </span>
            <span style={{ fontWeight: 500, color: NAVY }}>{moduleData.whyItHelps}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Reusable 2-Column Slide Template with Enlarged Modal Support ───────────
export function TwoColumnSlide({ slideNumber, totalSlides = 10 }) {
  const slideData = SLIDES_DATA.find((s) => s.slideNumber === slideNumber);
  const [enlargedImage, setEnlargedImage] = useState(null);

  if (!slideData) return null;

  return (
    <>
      <SlideLayout
        slideNumber={slideNumber}
        totalSlides={totalSlides}
        speakerNotes={slideData.speakerNotes}
      >
        <SlideTitle
          eyebrow={slideData.eyebrow}
          titleNavy={slideData.titleNavy}
          titleBrand={slideData.titleBrand}
          titleNavyAfter={slideData.titleNavyAfter}
          intro={slideData.intro}
          slideIndex={slideNumber}
        />

        <div style={{
          display: 'flex',
          gap: 28, // Gap between cards: 28px
          flex: 1,
          alignItems: 'stretch',
          minHeight: 0,
        }}>
          <ModuleColumnCard
            moduleData={slideData.moduleLeft}
            side="left"
            delay={1}
            onEnlarge={setEnlargedImage}
          />
          <ModuleColumnCard
            moduleData={slideData.moduleRight}
            side="right"
            delay={2}
            onEnlarge={setEnlargedImage}
          />
        </div>
      </SlideLayout>

      {/* Full-Screen Zoom Viewer Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <ImageViewerModal
            image={enlargedImage.image}
            originalImage={enlargedImage.originalImage}
            title={enlargedImage.title}
            onClose={() => setEnlargedImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
