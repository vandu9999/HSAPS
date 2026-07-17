'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  BookOpen, 
  Award, 
  ChevronRight, 
  SlidersHorizontal 
} from 'lucide-react';
import { SCIENTIFIC_EVENTS_DATA } from '@/lib/data';

const TYPES = ['Tất cả', 'Hội thảo chuyên đề', 'Đào tạo CME liên tục', 'Hội nghị thường niên', 'Workshop thực tế'];

export default function EventsListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tất cả');

  // Filter events based on search term and type
  const filteredEvents = useMemo(() => {
    let result = SCIENTIFIC_EVENTS_DATA;

    if (selectedType !== 'Tất cả') {
      result = result.filter((e) => e.type === selectedType);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.description.toLowerCase().includes(term) ||
          e.location.toLowerCase().includes(term) ||
          e.speakers.some((s) => s.toLowerCase().includes(term))
      );
    }

    return result;
  }, [searchTerm, selectedType]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white font-sans">
      
      <main className="flex-grow py-8 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px] space-y-10">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#ec297b] to-[#ec297b]/80 p-8 sm:p-12 rounded-3xl text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-white blur-2xl"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-yellow-300 blur-2xl"></div>
            </div>
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                HSAPS Academy
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Sự kiện & Đào tạo CME
              </h1>
              <p className="text-sm sm:text-base text-pink-100 max-w-xl font-medium leading-relaxed">
                Nâng cao chuyên môn y khoa thông qua các hội thảo chuyên đề, khóa học cấp chứng chỉ CME chất lượng cao và hội nghị khoa học thường niên cùng HSAPS.
              </p>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white dark:bg-gray-900/60 p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-6">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-450 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Tìm tên sự kiện, diễn giả, địa điểm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-xs font-semibold placeholder-gray-400 transition-colors focus:border-primary focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-850/50 dark:focus:bg-gray-900"
              />
            </div>

            {/* Filters Info */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
              <SlidersHorizontal className="size-4 text-primary" />
              <span>Hiển thị {filteredEvents.length} sự kiện</span>
            </div>
          </div>

          {/* Grid Layout (Type Tabs + Event List Cards) */}
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Sidebar Type Filters */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-[#2d1a24] dark:text-pink-100 tracking-wider mb-2">
                  Phân loại sự kiện
                </h3>
                <div className="flex flex-col gap-1.5">
                  {TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left border ${
                        selectedType === type
                          ? 'bg-primary border-transparent text-white font-bold'
                          : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{type === 'Tất cả' ? 'Tất cả sự kiện' : type}</span>
                      <span className={`size-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                        selectedType === type 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {type === 'Tất cả' 
                          ? SCIENTIFIC_EVENTS_DATA.length 
                          : SCIENTIFIC_EVENTS_DATA.filter((e) => e.type === type).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Cards Grid */}
            <div className="lg:col-span-9 space-y-6">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                  <p className="text-gray-500 font-semibold mb-2">Không tìm thấy sự kiện phù hợp</p>
                  <p className="text-xs text-gray-400">Vui lòng thử lại với từ khóa hoặc chuyên mục lọc khác.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                  {filteredEvents.map((event) => (
                    <article 
                      key={event.id}
                      className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-150/70 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Image Banner */}
                      <div className="relative w-full aspect-[16/10] rounded-t-2xl overflow-hidden bg-gray-100 border-b border-gray-100 dark:border-gray-800">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 rounded-xl bg-white/95 dark:bg-gray-950/90 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-primary shadow-sm">
                          {event.type}
                        </span>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                            <span className="bg-[#ec297b]/10 text-primary px-2.5 py-0.5 rounded font-mono text-[10px] font-bold">
                              {event.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5"><Clock size={12} /> {event.time}</span>
                          </div>

                          <Link href={`/su-kien/${event.id}`}>
                            <h3 className="text-base sm:text-lg font-extrabold leading-snug text-text-main group-hover:text-primary transition-colors dark:text-white line-clamp-2 cursor-pointer">
                              {event.title}
                            </h3>
                          </Link>

                          <div className="space-y-1.5 text-xs text-gray-650 dark:text-gray-300">
                            <div className="flex items-start gap-1.5">
                              <MapPin size={14} className="text-[#ec297b] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{event.location}</span>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <Users size={14} className="text-secondary flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">
                                <span className="font-semibold text-gray-400">Diễn giả:</span> {event.speakers.join(', ')}
                              </span>
                            </div>
                          </div>

                          {/* Progress seat bar */}
                          <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between text-[11px] font-bold">
                              <span className="text-gray-400">{event.capacityText}</span>
                              <span className="text-primary">{event.progress}% chỗ đầy</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                style={{ width: `${event.progress}%` }}
                                className="h-full bg-gradient-to-r from-[#ec297b] to-secondary"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800/80">
                          <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 text-[#d97706] px-2.5 py-1 rounded-lg text-[10px] font-extrabold border border-amber-100 dark:border-amber-950/30">
                            <Award size={12} />
                            {event.cmeHours.split(': ')[1] || event.cmeHours}
                          </span>
                          <Link href={`/su-kien/${event.id}`} className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Xem chi tiết <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>

                    </article>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
