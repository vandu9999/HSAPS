'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  Award 
} from 'lucide-react';
import { SCIENTIFIC_EVENTS_DATA } from '@/lib/data';

export default function EventSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % SCIENTIFIC_EVENTS_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + SCIENTIFIC_EVENTS_DATA.length) % SCIENTIFIC_EVENTS_DATA.length);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const activeEvent = SCIENTIFIC_EVENTS_DATA[activeIndex];
  const eventLink = `/su-kien/${activeEvent.id}`;

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-[-56px] right-0 flex gap-2.5 z-20">
        <button 
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-text-main transition-all hover:bg-[#ec297b]/10 hover:text-primary hover:border-[#ec297b]/30 shadow-sm cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button 
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-text-main transition-all hover:bg-[#ec297b]/10 hover:text-primary hover:border-[#ec297b]/30 shadow-sm cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>

      <div className="relative overflow-hidden min-h-[460px] md:min-h-[380px] bg-gray-50/50 dark:bg-gray-900/30 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800/80">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid gap-8 md:grid-cols-12 items-center"
          >
            {/* Event Image Banner (Column 1 - Left) */}
            <div className="md:col-span-5 relative w-full aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden shadow-inner border border-gray-100 dark:border-gray-800 flex-shrink-0 group">
              <Image
                src={activeEvent.imageUrl}
                alt={activeEvent.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 rounded-xl bg-white/95 dark:bg-gray-950/90 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary backdrop-blur-md shadow-sm border border-pink-50/50 dark:border-gray-800">
                {activeEvent.type}
              </div>
            </div>

            {/* Event Info Details (Column 2 - Right) */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
                  <span className="bg-[#ec297b]/10 text-primary px-3 py-1 rounded-lg font-mono text-[11px] font-bold">
                    {activeEvent.date}
                  </span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {activeEvent.time}</span>
                </div>

                <Link href={eventLink}>
                  <h3 className="text-xl sm:text-2xl font-extrabold leading-snug text-text-main hover:text-primary transition-colors dark:text-white mt-1 cursor-pointer">
                    {activeEvent.title}
                  </h3>
                </Link>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-650 dark:text-gray-300">
                    <MapPin size={16} className="text-[#ec297b] flex-shrink-0 mt-0.5" />
                    <span>{activeEvent.location}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-650 dark:text-gray-300">
                    <Users size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      <span className="font-semibold text-gray-400">Diễn giả:</span>
                      {activeEvent.speakers.map((s, idx) => (
                        <span key={s} className="font-bold">
                          {s}{idx < activeEvent.speakers.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar / Capacity seat count */}
                <div className="pt-3 space-y-2 max-w-md">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500 dark:text-gray-400">{activeEvent.capacityText}</span>
                    <span className="text-primary font-bold">{activeEvent.progress}% chỗ đầy</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${activeEvent.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#ec297b] to-secondary"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom bar with CME credit and Register Action */}
              <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800/80">
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/20 text-[#d97706] px-3.5 py-2 rounded-xl text-xs font-extrabold border border-amber-100 dark:border-amber-950/30">
                  <Award size={16} />
                  <span>{activeEvent.cmeHours}</span>
                </div>
                <Link href={eventLink}>
                  <button className="flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover text-white px-5 py-3 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-98 cursor-pointer">
                    Đăng ký tham dự
                    <ChevronRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators (Dots) */}
      <div className="flex justify-center gap-2 mt-5">
        {SCIENTIFIC_EVENTS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > activeIndex ? 1 : -1);
              setActiveIndex(idx);
            }}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === activeIndex 
                ? 'w-6 bg-primary' 
                : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
