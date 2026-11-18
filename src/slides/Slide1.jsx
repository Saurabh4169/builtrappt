import React from 'react';
import { motion } from 'framer-motion';
import { BRAND, NAVY, GREY, easeCurve } from '../components/shared';

export default function Slide1({ onNavigate }) {
  // 17 module section names for bottom marquee ticker
  const sectionList = [
    'HR Dashboard', 'Employees', 'Leave', 'Payroll', 'Attendance', 'Loan',
    'Salary Increment', 'Salary Discrepancy', 'Disciplinary Action', 'Ticket Management',
    'Digital Forms', 'Clearance Form', 'Employee Rejoining', 'Report',
    'Meeting Arrangements', 'Audit Logs', 'Payroll Settings',
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        overflow: 'hidden',
        background: '#FFFFFF', // Pure solid white, NO gradient wash
      }}
    >
      {/* 3px Top Brand Progress Line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'rgba(11, 31, 75, 0.06)', zIndex: 300,
      }}>
        <div style={{ height: '100%', width: '9%', background: BRAND }} />
      </div>

      {/* Dotted Grid Background */}
      <div
        className="dotted-grid"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Area (Strict Safe Zone: margins 96px, top 100px, bottom 72px) */}
      <div style={{
        position: 'absolute',
        top: 100,
        left: 96,
        right: 96,
        bottom: 72,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        {/* Top Split: Left Content + Right Laptop & Phone Mockup */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
          gap: 40,
        }}>
          {/* Left Column (Content Block) */}
          <div style={{
            width: '46%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 15,
          }}>
            {/* Eyebrow: HR MANAGEMENT SYSTEM */}
            <div style={{ marginBottom: 20 }}>
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: easeCurve }}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: BRAND,
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 8,
                }}
              >
                HR MANAGEMENT SYSTEM
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 56 }}
                transition={{ duration: 0.5, delay: 0.3, ease: easeCurve }}
                style={{ height: 2, background: BRAND, borderRadius: 1 }}
              />
            </div>

            {/* Title: "One platform for people, time and pay." (78px, weight 800) */}
            <div style={{
              fontSize: 78,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.08,
              color: NAVY,
              fontFamily: "'Inter', sans-serif",
              marginBottom: 24,
            }}>
              <motion.div
                className="shine"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4, ease: easeCurve }}
              >
                One platform for
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5, ease: easeCurve }}
                style={{
                  color: BRAND,
                  display: 'inline-block',
                }}
                className="shine-brand"
              >
                people, time
              </motion.div>

              <motion.div
                className="shine"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.6, ease: easeCurve }}
              >
                and pay.
              </motion.div>
            </div>

            {/* Intro Line: 22px grey */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.7, ease: easeCurve }}
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: GREY,
                marginBottom: 36,
                fontFamily: "'Inter', sans-serif",
                maxWidth: 620,
                lineHeight: 1.4,
              }}
            >
              A comprehensive enterprise HR workspace uniting all 17 modules into one seamless platform.
            </motion.div>

            {/* Glass Pill Button "Explore Presentation →" */}
            <motion.button
              onClick={() => onNavigate(1, 1)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.45, delay: 0.85, ease: easeCurve }}
              className="glass"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 34px',
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 700,
                color: NAVY,
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 8px 24px rgba(11, 31, 75, 0.08), inset 0 1px 0 #FFFFFF',
                cursor: 'pointer',
                outline: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>Explore Presentation</span>
              <span style={{ color: BRAND, fontSize: 20 }}>→</span>
            </motion.button>
          </div>

          {/* Right Column (Hero Laptop + Phone Mockup Container - Precisely sized, Static, Sharp) */}
          <div style={{
            width: '54%',
            height: 600,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Soft Brand Glow behind the devices */}
            <div style={{
              position: 'absolute',
              width: 580,
              height: 440,
              top: '48%',
              left: '52%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 55% 45%, rgba(239, 20, 78, 0.08) 0%, transparent 68%)',
              pointerEvents: 'none',
              zIndex: 1,
            }} />

            {/* Soft Oval Shadow Under Laptop Base */}
            <div style={{
              position: 'absolute',
              bottom: 60,
              left: '48%',
              transform: 'translateX(-50%)',
              width: 440,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.13)',
              filter: 'blur(16px)',
              pointerEvents: 'none',
              zIndex: 2,
            }} />

            {/* Hero Mockup Wrapper (Reduced balanced size ~680px, No animation, Crystal clear) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeCurve }}
              style={{
                width: 680,
                height: 448,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <img
                src="/assets/hero/device-mockup.png"
                alt="Builtraa HR Platform on Laptop and Mobile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  imageRendering: '-webkit-optimize-contrast',
                  filter: 'drop-shadow(0 16px 36px rgba(11, 31, 75, 0.12))',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Strip: Slow moving row of 17 section names as chips */}
        <div style={{
          marginTop: 18,
          paddingTop: 14,
          borderTop: '1px solid #E2E8F0',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Edge fade gradients */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 48,
            background: 'linear-gradient(to right, #FFFFFF, transparent)', zIndex: 5, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 48,
            background: 'linear-gradient(to left, #FFFFFF, transparent)', zIndex: 5, pointerEvents: 'none',
          }} />

          {/* Marquee ticker */}
          <div style={{ display: 'flex', gap: 14, overflow: 'hidden' }}>
            <motion.div
              animate={{ x: [0, -1600] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 40,
                  ease: 'linear',
                },
              }}
              style={{ display: 'flex', gap: 12, flexShrink: 0 }}
            >
              {[...sectionList, ...sectionList].map((name, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    borderRadius: 999,
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    fontSize: 13,
                    fontWeight: 600,
                    color: NAVY,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 6px rgba(11, 31, 75, 0.03)',
                  }}
                >
                  <span style={{ color: BRAND, fontWeight: 700 }}>
                    {String((idx % 17) + 1).padStart(2, '0')}
                  </span>
                  <span>{name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
