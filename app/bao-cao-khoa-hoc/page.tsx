'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  Filter,
  ChevronRight,
  Calendar,
  User,
  Tag,
  Eye,
  ArrowRight,
  FileText,
  RotateCcw,
  BookOpenCheck
} from 'lucide-react';
import { SCIENTIFIC_REPORTS_DATA, ScientificReport } from '@/lib/data';

const CATEGORIES = [
  'Tất cả',
  'Phẫu thuật sọ mặt',
  'Phẫu thuật vóc dáng',
  'Thẩm mỹ nội khoa',
  'Tái tạo & Vi phẫu',
  'Xu hướng & Công nghệ'
];

function ScientificReportsList() {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedTag, setSelectedTag] = useState<string | null>(tagParam);
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  // Collect all unique tags for the sidebar tag cloud
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    SCIENTIFIC_REPORTS_DATA.forEach((report) => {
      report.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter and sort reports
  const filteredAndSortedReports = useMemo(() => {
    let result = [...SCIENTIFIC_REPORTS_DATA];

    // Search term filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (report) =>
          report.title.toLowerCase().includes(term) ||
          report.abstract.toLowerCase().includes(term) ||
          report.authors.some((author) => author.toLowerCase().includes(term)) ||
          report.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Category filter
    if (selectedCategory !== 'Tất cả') {
      result = result.filter((report) => report.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter((report) => report.tags.includes(selectedTag));
    }

    // Sorting
    if (sortBy === 'newest') {
      // Sort by date (assuming DD/MM/YYYY format)
      result.sort((a, b) => {
        const dateA = a.date.split('/').reverse().join('-');
        const dateB = b.date.split('/').reverse().join('-');
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.views - a.views);
    }

    return result;
  }, [searchTerm, selectedCategory, selectedTag, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedTag(null);
    setSortBy('newest');
  };

  // Helper to style category badges
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Phẫu thuật sọ mặt':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30';
      case 'Phẫu thuật vóc dáng':
        return 'bg-pink-50 text-primary dark:bg-pink-950/30 dark:text-pink-400 border border-pink-100/50 dark:border-pink-900/30';
      case 'Thẩm mỹ nội khoa':
        return 'bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400 border border-teal-100/50 dark:border-teal-900/30';
      case 'Tái tạo & Vi phẫu':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/30';
      default:
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-background-light font-sans text-text-main antialiased dark:bg-background-dark dark:text-white">
      
      {/* Hero Banner Section */}
      <section className="relative h-[240px] w-full overflow-hidden bg-gray-900 md:h-[280px]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-purple-950/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Dynamic backdrop accent */}
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-secondary/10 blur-3xl"></div>
        
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 text-white lg:px-10">
          <span className="mb-3 inline-block w-fit rounded-full border border-secondary/40 bg-secondary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary backdrop-blur-sm">
            Nghiên cứu y khoa
          </span>
          <h1 className="mb-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Báo cáo Khoa học
          </h1>
          <p className="max-w-2xl text-sm font-medium text-gray-200 opacity-90 md:text-base">
            Tổng hợp các đề tài nghiên cứu, sáng kiến kỹ thuật lâm sàng và báo cáo khoa học thường niên uy tín từ hội viên Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS).
          </p>
        </div>
      </section>

      {/* Breadcrumbs Navigation */}
      <div className="border-b border-gray-100 bg-white dark:border-gray-800/50 dark:bg-background-dark/30">
        <div className="mx-auto max-w-[1440px] px-6 py-3 lg:px-10">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Link className="hover:text-primary transition-colors" href="/">
              Trang chủ
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="font-bold text-gray-800 dark:text-white">
              Bài báo khoa học
            </span>
          </div>
        </div>
      </div>

      {/* Main Listing Layout */}
      <main className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* LEFT SIDE: LISTING & SEARCH */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search Bar & Stats */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên bài báo, tóm tắt hoặc tác giả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-gray-200 dark:border-gray-850 bg-gray-50 dark:bg-gray-800/40 text-text-main dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-gray-850 transition-all"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 font-mono">
                  {filteredAndSortedReports.length} BÀI BÁO CÁO
                </span>
                
                {/* Reset button if any filter active */}
                {(searchTerm || selectedCategory !== 'Tất cả' || selectedTag) && (
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    <RotateCcw className="size-3" />
                    Đặt lại
                  </button>
                )}
              </div>
            </div>

            {/* Active Tag filter notice */}
            {selectedTag && (
              <div className="flex items-center gap-2 bg-[#ec297b]/5 dark:bg-[#ec297b]/10 border border-[#ec297b]/20 px-4 py-2.5 rounded-xl">
                <span className="text-xs text-text-main dark:text-pink-100">
                  Đang lọc theo tag: <strong className="text-primary font-mono bg-white dark:bg-gray-850 px-2 py-0.5 rounded border border-[#ec297b]/20">#{selectedTag}</strong>
                </span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-xs text-primary font-bold hover:underline ml-auto"
                >
                  Xóa lọc
                </button>
              </div>
            )}

            {/* Scientific Reports Grid */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedReports.length > 0 ? (
                  filteredAndSortedReports.map((report) => (
                    <motion.div
                      key={report.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all hover:border-[#ec297b]/20 flex flex-col md:flex-row gap-6"
                    >
                      {/* Left Thumbnail Image */}
                      {report.imageUrl && (
                        <div className="relative w-full md:w-[200px] h-[150px] md:h-auto shrink-0 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50 dark:bg-gray-800/40">
                          <Image
                            src={report.imageUrl}
                            alt={report.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 200px"
                          />
                        </div>
                      )}

                      {/* Right Details Block */}
                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        <div>
                          {/* Top Header info */}
                          <div className="flex flex-wrap items-center gap-2.5 mb-3">
                            <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${getCategoryStyles(report.category)}`}>
                              {report.category}
                            </span>
                            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 font-mono truncate max-w-[250px]">
                              {report.journal}
                            </span>
                          </div>

                          {/* Title */}
                          <Link href={`/bao-cao-khoa-hoc/${report.id}`} className="block mb-2">
                            <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug">
                              {report.title}
                            </h2>
                          </Link>

                          {/* Authors */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs font-semibold text-gray-600 dark:text-gray-300">
                            <User className="size-3.5 text-gray-400" />
                            <span>Tác giả:</span>
                            <div className="flex gap-2">
                              {report.authors.map((author, index) => {
                                const matchId = report.authorIds?.[index];
                                return matchId ? (
                                  <Link
                                    key={author}
                                    href={`/hoi-vien/${matchId}`}
                                    className="text-primary hover:underline hover:text-pink-600 transition-colors"
                                  >
                                    {author}
                                  </Link>
                                ) : (
                                  <span key={author} className="text-gray-700 dark:text-gray-200">
                                    {author}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Abstract Preview */}
                          <p className="text-xs md:text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
                            {report.abstract}
                          </p>
                        </div>

                        <div>
                          {/* Divider */}
                          <div className="h-px bg-gray-100 dark:bg-gray-800/80 my-3.5"></div>

                          {/* Footer Actions */}
                          <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3.5 text-gray-400" />
                                {report.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="size-3.5 text-gray-400" />
                                {report.views} lượt xem
                              </span>
                            </div>
                            
                            <Link
                              href={`/bao-cao-khoa-hoc/${report.id}`}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[#ec297b]/5 hover:bg-[#ec297b] text-[#ec297b] hover:text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer group/btn shadow-sm hover:shadow"
                            >
                              <span>Đọc báo cáo</span>
                              <ArrowRight className="size-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl text-center p-6 shadow-sm"
                  >
                    <div className="size-16 rounded-full bg-pink-50 dark:bg-pink-950/30 text-primary flex items-center justify-center mb-4">
                      <BookOpenCheck className="size-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Không tìm thấy báo cáo nào</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-450 max-w-sm mb-6 leading-relaxed">
                      Chúng tôi không tìm thấy kết quả phù hợp với từ khóa hoặc bộ lọc của bạn. Thử tìm kiếm khác hoặc đặt lại bộ lọc.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:bg-pink-700 transition-all cursor-pointer"
                    >
                      Đặt lại tất cả bộ lọc
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDEBAR: FILTERS */}
          <div className="space-y-6">
            
            {/* Sort & Quick Actions Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-[#2d1a24] dark:text-pink-100 tracking-wider">
                Sắp xếp theo
              </h3>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setSortBy('newest')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    sortBy === 'newest'
                      ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  Mới nhất
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    sortBy === 'popular'
                      ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  Xem nhiều
                </button>
              </div>
            </div>

            {/* Categories Selector */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-extrabold uppercase text-[#2d1a24] dark:text-pink-100 tracking-wider mb-2">
                Chuyên mục đề tài
              </h3>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSelectedTag(null); }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left border ${
                      selectedCategory === cat
                        ? 'bg-primary border-transparent text-white font-bold'
                        : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`size-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      selectedCategory === cat 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                    }`}>
                      {cat === 'Tất cả' 
                        ? SCIENTIFIC_REPORTS_DATA.length 
                        : SCIENTIFIC_REPORTS_DATA.filter((r) => r.category === cat).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-extrabold uppercase text-[#2d1a24] dark:text-pink-100 tracking-wider mb-2">
                Từ khóa phổ biến
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isActive ? null : tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border font-mono transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#ec297b]/10 text-primary border-[#ec297b]/30 font-bold scale-105 shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-800/40 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:text-primary'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}

export default function ScientificReportsListingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-[#1a1016]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <ScientificReportsList />
    </Suspense>
  );
}
