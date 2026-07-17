'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Calendar,
  Eye,
  Download,
  User,
  ChevronLeft,
  BadgeCheck,
  FileText,
  ArrowRight,
  Copy,
  Check,
  Building,
  Bookmark,
  Share2
} from 'lucide-react';
import { SCIENTIFIC_REPORTS_DATA, DOCTORS_DATA, Doctor } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ScientificReportDetailPage({ params }: PageProps) {
  // Unwrap parameters
  const { id } = use(params);

  // Find the report
  const report = SCIENTIFIC_REPORTS_DATA.find((r) => r.id === id);
  
  // PDF download simulation state
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'success'>('idle');

  // Copy DOI state
  const [copiedDoi, setCopiedDoi] = useState(false);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="size-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="size-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Không tìm thấy báo cáo</h2>
          <p className="text-[#6b4c5d] dark:text-gray-400 mb-6 text-sm">
            Bài báo cáo khoa học yêu cầu không tồn tại hoặc đã được Ban biên tập HSAPS lưu trữ nội bộ.
          </p>
          <Link
            href="/bao-cao-khoa-hoc"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#ec297b] text-white rounded-xl text-sm font-bold shadow-md hover:bg-pink-700 transition-all"
          >
            <ChevronLeft className="size-4" />
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  // Get authors detail if they exist in DOCTORS_DATA
  const matchedDoctors = (report.authorIds || []).map((authId) => {
    return DOCTORS_DATA.find((doc) => doc.id === authId);
  }).filter((doc): doc is Doctor => !!doc);

  // Get related reports (same category, excluding current)
  const relatedReports = SCIENTIFIC_REPORTS_DATA.filter(
    (r) => r.category === report.category && r.id !== report.id
  ).slice(0, 2);

  // Fallback to other reports if no reports match same category
  const fallbackRelatedReports = relatedReports.length > 0 
    ? relatedReports 
    : SCIENTIFIC_REPORTS_DATA.filter((r) => r.id !== report.id).slice(0, 2);

  // Handle simulated PDF download
  const handlePdfDownload = () => {
    if (downloadState !== 'idle') return;
    setDownloadState('loading');
    setTimeout(() => {
      setDownloadState('success');
      // Create a virtual file download
      const element = document.createElement("a");
      const file = new Blob([`HSAPS PDF Download Mock for Report ID: ${report.id}\nTitle: ${report.title}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `HSAPS-Report-${report.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      // Reset after 3 seconds
      setTimeout(() => setDownloadState('idle'), 3000);
    }, 1500);
  };

  // Copy DOI to clipboard
  const handleCopyDoi = () => {
    if (!report.doi) return;
    navigator.clipboard.writeText(report.doi);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const renderSectionAssets = (sectionName: 'methodology' | 'results' | 'conclusion') => {
    const sectionTables = (report.tables || []).filter((t) => t.section === sectionName);
    const sectionFigures = (report.figures || []).filter((f) => f.section === sectionName);

    if (sectionTables.length === 0 && sectionFigures.length === 0) return null;

    return (
      <div className="mt-6 space-y-6">
        {/* Render Figures */}
        {sectionFigures.map((fig) => (
          <div key={fig.id} className="bg-gray-50/50 dark:bg-gray-850/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3 max-w-xl mx-auto">
            <div className="relative w-full h-[220px] sm:h-[280px] rounded-xl overflow-hidden shadow-inner">
              <Image
                src={fig.imageUrl}
                alt={fig.caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 550px"
              />
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic font-semibold">
              {fig.caption}
            </p>
          </div>
        ))}

        {/* Render Tables */}
        {sectionTables.map((tbl) => (
          <div key={tbl.id} className="space-y-2 max-w-2xl mx-auto overflow-hidden">
            <div className="overflow-x-auto rounded-xl border border-gray-150 dark:border-gray-800 shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-pink-50/50 dark:bg-pink-950/20 text-[#ec297b] border-b border-gray-150 dark:border-gray-800">
                    {tbl.headers.map((h, i) => (
                      <th key={i} className="p-3 font-extrabold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {tbl.rows.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex} 
                      className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/30 dark:bg-gray-850/20'}
                    >
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-3 font-medium text-gray-700 dark:text-gray-300">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic font-semibold">
              {tbl.title}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white font-sans selection:bg-[#fce7f3] selection:text-[#ec297b]">
      
      <main className="flex-grow py-8 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center text-sm text-[#6b4c5d] dark:text-pink-200/60 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link className="hover:text-[#ec297b] transition-colors" href="/">
              Trang chủ
            </Link>
            <ChevronLeft className="size-3.5 mx-1.5 shrink-0 transform rotate-180" />
            <Link className="hover:text-[#ec297b] transition-colors" href="/bao-cao-khoa-hoc">
              Bài báo khoa học
            </Link>
            <ChevronLeft className="size-3.5 mx-1.5 shrink-0 transform rotate-180" />
            <span className="font-bold text-[#2d1a24] dark:text-white truncate max-w-xs md:max-w-md">
              {report.title}
            </span>
          </nav>

          {/* MAIN PAGE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 8-COLS: ARTICLE VIEWER */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
              
              {/* Cover Banner Context */}
              <div className="relative p-6 sm:p-8 lg:p-10 border-b border-gray-100 dark:border-gray-800/80 bg-gradient-to-br from-pink-50/50 to-white dark:from-pink-950/5 dark:to-transparent">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#ec297b]/10 text-primary">
                    {report.category}
                  </span>
                  <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 font-mono">
                    {report.journal}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2d1a24] dark:text-white leading-tight mb-4 tracking-tight">
                  {report.title}
                </h1>
                
                {/* Author list overview */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><User size={14} /> Tác giả:</span>
                  <div className="flex gap-2">
                    {report.authors.map((author, index) => {
                      const matchId = report.authorIds?.[index];
                      return matchId ? (
                        <Link
                          key={author}
                          href={`/hoi-vien/${matchId}`}
                          className="text-[#ec297b] hover:underline"
                        >
                          {author}
                        </Link>
                      ) : (
                        <span key={author} className="text-gray-700 dark:text-gray-300">
                          {author}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Report tags / keywords */}
                {report.tags && report.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/60 text-xs">
                    <span className="text-gray-400 font-semibold font-mono">Từ khóa:</span>
                    {report.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/bao-cao-khoa-hoc?tag=${encodeURIComponent(tag)}`}
                        className="bg-[#ec297b]/5 hover:bg-[#ec297b]/10 text-primary px-2.5 py-1 rounded-md transition-all font-mono text-[11px] font-bold"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Article Content (Vertical Flow) */}
              <div className="p-6 sm:p-8 lg:p-10 space-y-10">
                
                {/* Main Illustration Image */}
                {report.imageUrl && (
                  <div className="relative w-full h-[240px] sm:h-[320px] md:h-[380px] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md">
                    <Image
                      src={report.imageUrl}
                      alt={report.title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                )}

                {/* Abstract Box */}
                <div className="bg-gray-50 dark:bg-gray-850/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest mb-3 font-mono">Tóm tắt (Abstract)</h3>
                  <div 
                    className="italic font-medium text-gray-700 dark:text-gray-200 leading-relaxed space-y-2 rich-text-content"
                    dangerouslySetInnerHTML={{ __html: report.abstract }}
                  />
                </div>

                {/* Section I: Introduction */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="size-6 rounded bg-[#ec297b]/10 text-primary flex items-center justify-center text-xs font-bold font-mono">I</div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Đặt vấn đề &amp; Mục tiêu nghiên cứu</h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {report.introduction}
                  </p>
                </section>

                {/* Section II: Methodology */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="size-6 rounded bg-[#ec297b]/10 text-primary flex items-center justify-center text-xs font-bold font-mono">II</div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Đối tượng &amp; Phương pháp nghiên cứu</h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {report.methodology}
                  </p>
                  {renderSectionAssets('methodology')}
                </section>

                {/* Section III: Results */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="size-6 rounded bg-[#ec297b]/10 text-primary flex items-center justify-center text-xs font-bold font-mono">III</div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Kết quả nghiên cứu</h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {report.results}
                  </p>
                  {renderSectionAssets('results')}
                </section>

                {/* Section IV: Conclusion */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="size-6 rounded bg-[#ec297b]/10 text-primary flex items-center justify-center text-xs font-bold font-mono">IV</div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">Kết luận &amp; Bàn luận</h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    {report.conclusion}
                  </p>
                  {renderSectionAssets('conclusion')}
                  
                  {/* Medical Disclaimer */}
                  <div className="mt-8 p-4 rounded-xl bg-pink-50/50 dark:bg-pink-950/10 border border-[#ec297b]/10 text-xs">
                    <p className="font-semibold text-primary mb-1">Tuyên bố miễn trừ trách nhiệm:</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Đề tài nghiên cứu được công bố nhằm chia sẻ kinh nghiệm học thuật giữa các hội viên y khoa. Việc ứng dụng kỹ thuật lâm sàng cụ thể cần được sự tư vấn và thực hiện trực tiếp bởi bác sĩ có đầy đủ chứng chỉ hành nghề phẫu thuật tạo hình thẩm mỹ.
                    </p>
                  </div>
                </section>

              </div>

            </div>

            {/* RIGHT 4-COLS: METADATA & AUTHORS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Action: Download PDF */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-xl space-y-4 text-center">
                <div className="size-12 rounded-2xl bg-pink-50 dark:bg-pink-950/30 text-primary flex items-center justify-center mx-auto">
                  <FileText className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Tài liệu đính kèm</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Đầy đủ biểu đồ, số liệu thống kê lâm sàng (.PDF)</p>
                </div>
                
                <button
                  onClick={handlePdfDownload}
                  disabled={downloadState === 'loading'}
                  className={`w-full py-3 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    downloadState === 'loading'
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 shadow-none'
                      : downloadState === 'success'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-[#ec297b] hover:bg-pink-700 text-white'
                  }`}
                >
                  {downloadState === 'loading' ? (
                    <>
                      <div className="size-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang tải xuống...</span>
                    </>
                  ) : downloadState === 'success' ? (
                    <>
                      <Check className="size-4" />
                      <span>Đã tải xuống thành công</span>
                    </>
                  ) : (
                    <>
                      <Download className="size-4" />
                      <span>Tải về toàn văn ({report.pdfSize || '1.5 MB'})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Author Profiles Section */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-xl space-y-4">
                <h3 className="text-xs font-extrabold uppercase text-[#2d1a24] dark:text-pink-100 tracking-wider">
                  Hồ sơ tác giả
                </h3>

                {matchedDoctors.length > 0 ? (
                  <div className="space-y-4">
                    {matchedDoctors.map((doc) => (
                      <div key={doc.id} className="group relative flex gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-850/50 border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all">
                        {/* Avatar */}
                        <div className="relative size-12 shrink-0 rounded-full overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                          <Image
                            src={doc.avatar}
                            alt={doc.name}
                            fill
                            sizes="48px"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link href={`/hoi-vien/${doc.id}`} className="block">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-1">
                              {doc.title}. {doc.name}
                              {doc.isOfficial && <BadgeCheck className="size-3.5 fill-[#fcd34d] text-primary" />}
                            </h4>
                          </Link>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {doc.specialty[0] || 'Phẫu thuật Thẩm mỹ'}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 mt-1 truncate">
                            <Building size={10} />
                            <span className="truncate">{doc.clinic}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {report.authors.map((author) => (
                      <div key={author} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/50 dark:bg-gray-850/40">
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 flex items-center justify-center">
                          <User size={16} />
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{author}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Metadata Card details */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-xl space-y-4 text-xs">
                <h3 className="text-xs font-extrabold uppercase text-[#2d1a24] dark:text-pink-100 tracking-wider">
                  Thông tin xuất bản
                </h3>
                <div className="divide-y divide-gray-100 dark:divide-gray-850">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400 font-medium">Xuất bản</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{report.date}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-gray-400 font-medium">Lượt xem</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{report.views} lượt</span>
                  </div>
                  {report.doi && (
                    <div className="py-2.5 space-y-1">
                      <span className="text-gray-400 font-medium block">Mã số DOI</span>
                      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-850 p-2 rounded-lg border border-gray-100 dark:border-gray-800 font-mono text-[10px]">
                        <span className="text-gray-600 dark:text-gray-300 select-all truncate mr-2">{report.doi}</span>
                        <button
                          onClick={handleCopyDoi}
                          className="text-[#ec297b] hover:text-pink-700 p-1 cursor-pointer shrink-0"
                          title="Sao chép DOI"
                        >
                          {copiedDoi ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* RELATED PAPERS SECTION */}
          <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-12">
            <h2 className="text-xl md:text-2xl font-extrabold text-[#2d1a24] dark:text-white mb-6">
              Báo cáo khoa học liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fallbackRelatedReports.map((item) => (
                <div key={item.id} className="group flex flex-col justify-between bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-[#ec297b]/20 hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#ec297b]/10 text-primary">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                        {item.date}
                      </span>
                    </div>
                    <Link href={`/bao-cao-khoa-hoc/${item.id}`}>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                      {item.abstract}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-850 mt-4 pt-3 text-[11px]">
                    <span className="text-gray-400">Tác giả: <strong className="text-gray-600 dark:text-gray-300">{item.authors[0]}</strong></span>
                    <Link href={`/bao-cao-khoa-hoc/${item.id}`} className="text-primary font-bold hover:underline flex items-center gap-0.5">
                      <span>Đọc tiếp</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
