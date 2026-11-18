import React from 'react';
import { motion } from 'framer-motion';
import { SlideLayout, SlideTitle, BRAND, NAVY, ROYAL, GREY, easeCurve } from '../components/shared';
import { SLIDES_DATA } from '../slidesData';

export default function Slide2({ slideIndex = 2, totalSlides = 11, onNavigate }) {
  const slideData = SLIDES_DATA.find((s) => s.slideNumber === 2);

  if (!slideData) return null;

  return (
    <SlideLayout
      slideNumber={slideIndex}
      totalSlides={totalSlides}
      speakerNotes={slideData.speakerNotes}
    >
      {/* Title */}
      <SlideTitle
        eyebrow={slideData.eyebrow}
        titleNavy={slideData.titleNavy}
        titleBrand={slideData.titleBrand}
        intro={slideData.intro}
        slideIndex={slideIndex}
      />

      {/* 4 Equal-Sized Glass Group Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 22,
        flex: 1,
        alignItems: 'stretch',
        minHeight: 0,
        margin: '12px 0',
      }}>
        {slideData.categories.map((category, catIdx) => {
          const CatIcon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + catIdx * 0.08, ease: easeCurve }}
              style={{
                borderRadius: 20,
                padding: '20px 18px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(11, 31, 75, 0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Category Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: '1px solid #E2E8F0',
              }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: catIdx === 0 || catIdx === 1
                    ? 'linear-gradient(135deg, rgba(239, 20, 78, 0.1) 0%, rgba(29, 78, 216, 0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(29, 78, 216, 0.1) 0%, rgba(239, 20, 78, 0.08) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <CatIcon size={20} color={catIdx === 0 || catIdx === 1 ? BRAND : ROYAL} strokeWidth={2} />
                </div>
                <div style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: NAVY,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {category.title}
                </div>
              </div>

              {/* Section Chips */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 9,
                flex: 1,
                justifyContent: 'flex-start',
              }}>
                {category.sections.map((sec, secIdx) => {
                  const targetSlideNum = String(sec.slide).padStart(2, '0');
                  return (
                    <motion.div
                      key={sec.name}
                      whileHover={{ scale: 1.025, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onNavigate && onNavigate(sec.slide - 1, 1)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '11px 14px',
                        borderRadius: 12,
                        border: '1px solid #E2E8F0',
                        background: '#F8FAFC',
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(11, 31, 75, 0.02)',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                    >
                      <span style={{
                        fontSize: 14.5,
                        fontWeight: 600,
                        color: NAVY,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {sec.name}
                      </span>
                      <span style={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: BRAND,
                        fontFamily: "'Inter', sans-serif",
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: 'rgba(239, 20, 78, 0.08)',
                      }}>
                        {targetSlideNum}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        fontSize: 14,
        color: GREY,
        fontFamily: "'Inter', sans-serif",
      }}>
        <span>Click any section above to jump directly to its slide.</span>
        <span
          onClick={() => onNavigate && onNavigate(2, 1)}
          style={{
            color: BRAND,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Next: HR Dashboard & Employees (Slide 03) →
        </span>
      </div>
    </SlideLayout>
  );
}
