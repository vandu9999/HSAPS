import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  ArrowLeft, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Info,
  Check,
  Share2,
  CalendarDays
} from 'lucide-react';
import { SCIENTIFIC_EVENTS_DATA, DOCTORS_DATA } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = SCIENTIFIC_EVENTS_DATA.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white font-sans selection:bg-[#fce7f3] selection:text-[#ec297b]">
      
      {/* HEADER HERO SECTION: Deep indigo-pink gradient block */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1016] via-[#2d1220] to-[#150a10] text-white py-12 lg:py-16 border-b border-gray-900 shadow-inner">
        {/* Abstract vector glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ec297b] blur-3xl opacity-20"></div>
          <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500 blur-3xl opacity-10"></div>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 relative z-10 space-y-6">
          {/* Back link */}
          <div>
            <Link 
              href="/su-kien" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm"
            >
              <ArrowLeft size={14} /> Quay lại danh sách sự kiện
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Left side: Text Details */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-[#ec297b] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                  {event.type}
                </span>
                <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-lg text-[10px] font-extrabold border border-amber-500/30">
                  <Award size={12} />
                  {event.cmeHours}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white drop-shadow-sm">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-[#ec297b]" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-[#ec297b]" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-[#ec297b]" />
                  <span className="line-clamp-1">{event.location.split(', ')[0]}</span>
                </div>
              </div>
            </div>

            {/* Right side: Large HD Image Cover */}
            <div className="lg:col-span-5 relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gray-950">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* MAIN LAYOUT BODY */}
      <main className="flex-grow py-8 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Event Academic Information */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* SECTION: Giới thiệu sự kiện */}
              <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#ec297b]/10 dark:border-[#ec297b]/5">
                  <Info className="size-5 text-[#ec297b]" />
                  <h2 className="text-base sm:text-lg font-extrabold text-[#2d1a24] dark:text-white tracking-tight uppercase">
                    Giới thiệu sự kiện
                  </h2>
                </div>
                <div 
                  className="text-sm sm:text-base leading-relaxed text-gray-650 dark:text-gray-300 space-y-2 rich-text-content"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </section>

              {/* SECTION: Chương trình chi tiết (Agenda) */}
              <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#ec297b]/10 dark:border-[#ec297b]/5">
                  <Clock className="size-5 text-[#ec297b]" />
                  <h2 className="text-base sm:text-lg font-extrabold text-[#2d1a24] dark:text-white tracking-tight uppercase">
                    Chương trình chi tiết (Agenda)
                  </h2>
                </div>
                
                {/* Advanced Timetable Layout */}
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div 
                      key={index}
                      className="group flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-850/10 border border-[#ec297b]/10 dark:border-[#ec297b]/5 hover:bg-white dark:hover:bg-gray-900 hover:shadow-sm transition-all duration-300"
                    >
                      {/* Left: Time Badge */}
                      <div className="sm:w-[150px] flex-shrink-0 flex items-start">
                        <span className="flex items-center gap-1 bg-[#ec297b]/5 dark:bg-[#ec297b]/10 text-primary px-3 py-1.5 rounded-xl text-xs font-black font-mono w-full justify-center border border-pink-100/50 dark:border-pink-900/30 shadow-inner">
                          {item.time}
                        </span>
                      </div>

                      {/* Right: Activity Content */}
                      <div className="flex-grow space-y-1.5">
                        <h4 className="text-sm sm:text-base font-extrabold text-text-main dark:text-white leading-snug group-hover:text-primary transition-colors">
                          {item.activity}
                        </h4>
                        {item.speaker && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">Báo cáo viên:</span>
                            <span className="text-xs font-bold text-[#ec297b] flex items-center gap-1">
                              <Users size={12} /> {item.speaker}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: Ban báo cáo viên & Chủ tọa */}
              <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#ec297b]/10 dark:border-[#ec297b]/5">
                  <Users className="size-5 text-[#ec297b]" />
                  <h2 className="text-base sm:text-lg font-extrabold text-[#2d1a24] dark:text-white tracking-tight uppercase">
                    Ban báo cáo viên &amp; Chủ tọa
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {event.speakers.map((speakerName) => {
                    const matchedDoctor = DOCTORS_DATA.find((doc) => 
                      speakerName.toLowerCase().includes(doc.name.toLowerCase())
                    );

                    return (
                      <div 
                        key={speakerName}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-850/20 border border-[#ec297b]/10 dark:border-[#ec297b]/5 transition-all hover:border-primary/20 hover:bg-white dark:hover:bg-gray-900"
                      >
                        <div className="relative size-16 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 flex-shrink-0">
                          <Image
                            src={matchedDoctor ? matchedDoctor.avatar : "https://lh3.googleusercontent.com/aida-public/AB6AXuBBTpt1mXuhSU1pwk3DIMyk-Ff1AjM-t0f2_tGt7NfgIh-Rd9cHbYp6Lce1-XJvcuaWlr9kwbYRkVnkz2pVK5ajbfpHCNK9PJKlVLIJZUQ2q_gjzngID_eFodVW__2YJF3xdomLzQZvKE_F8FphSEPxKNgvV9_iMvN9vi-IILpxPOMG8JvbyiGLnQM11AkBH0z8ts0e9p2wcMnzyOpRLlxnWoKbOm-HIx2iOkV85SKRfw6hhHcVxZTIkZvC3TAeuv-glEwCcJ_jmvA"}
                            alt={speakerName}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm sm:text-base font-extrabold text-text-main dark:text-white leading-tight">
                            {speakerName}
                          </h4>
                          <p className="text-xs text-[#ec297b] font-bold">
                            {matchedDoctor ? matchedDoctor.role || "Thành viên Ban chấp hành HSAPS" : "Báo cáo viên chuyên khoa / Chủ tọa"}
                          </p>
                          {matchedDoctor ? (
                            <Link 
                              href={`/hoi-vien/${matchedDoctor.id}`}
                              className="text-[11px] font-bold text-secondary hover:underline inline-flex items-center gap-0.5"
                            >
                              Xem lý lịch khoa học <ChevronRight size={12} />
                            </Link>
                          ) : (
                            <span className="text-[10px] text-gray-400 font-medium">Báo cáo viên khách mời</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION: Quyền lợi chứng nhận CME */}
              <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-[#ec297b]/10 dark:border-[#ec297b]/5">
                  <Award className="size-5 text-[#ec297b]" />
                  <h2 className="text-base sm:text-lg font-extrabold text-[#2d1a24] dark:text-white tracking-tight uppercase">
                    Chứng nhận & Quyền lợi CME
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-850/30 p-4 rounded-2xl border border-[#ec297b]/10 dark:border-[#ec297b]/5">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-extrabold block text-xs text-text-main dark:text-white">Cấp chứng chỉ chính thức</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Chứng chỉ CME có con dấu chính thức được gửi chuyển phát nhanh và email trong 7 ngày làm việc.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-850/30 p-4 rounded-2xl border border-[#ec297b]/10 dark:border-[#ec297b]/5">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="font-extrabold block text-xs text-text-main dark:text-white">Tự động tích lũy giờ học</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Thời lượng học thuật được cập nhật trực tiếp lên hệ thống tài khoản điện tử của Hội viên HSAPS.</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN: Premium Tickets Sidebar Widget */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Sticky Ticket Card Container */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-[#ec297b]/20 dark:border-[#ec297b]/15 shadow-md p-6 space-y-6 sticky top-24 relative overflow-hidden">
                {/* Visual Ticket Cut lines */}
                <div className="absolute top-1/2 left-[-10px] w-5 h-5 rounded-full bg-[#fdf8fa] dark:bg-[#1a1016] border-r border-[#ec297b]/20 dark:border-[#ec297b]/15"></div>
                <div className="absolute top-1/2 right-[-10px] w-5 h-5 rounded-full bg-[#fdf8fa] dark:bg-[#1a1016] border-l border-[#ec297b]/20 dark:border-[#ec297b]/15"></div>

                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-[#ec297b] uppercase tracking-widest font-mono">Đăng ký tham dự</span>
                  <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Lệ phí vé hội thảo</h3>
                  
                  {/* Price display block */}
                  <div className="py-3 px-4 rounded-2xl bg-pink-50/30 dark:bg-pink-950/10 border border-[#ec297b]/10 space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                      {event.registrationFee.split(' / ')[0]}
                    </div>
                    {event.registrationFee.includes(' / ') && (
                      <span className="text-[10px] text-gray-450 dark:text-gray-400 block font-semibold leading-relaxed pt-1 border-t border-gray-100 dark:border-gray-800/80 mt-1">
                        * Khách chưa hội viên: {event.registrationFee.split(' / ')[1]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Seat capacity urgeny bar */}
                <div className="space-y-2 pt-2 border-t border-dashed border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-500">{event.capacityText}</span>
                    <span className="text-primary">{event.progress}% chỗ đầy</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${event.progress}%` }}
                      className="h-full bg-gradient-to-r from-[#ec297b] to-secondary"
                    />
                  </div>
                </div>

                {/* What's included checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest font-mono block">Quyền lợi vé</span>
                  <ul className="space-y-2 text-xs font-semibold text-gray-650 dark:text-gray-300">
                    <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Vé vào cổng tham dự tất cả báo cáo</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Tiệc buffet nghỉ trưa tại hội nghị</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Chứng nhận chứng chỉ CME (nếu hợp lệ)</li>
                    <li className="flex items-center gap-2"><Check size={14} className="text-primary" /> Tài liệu khóa học, slide thuyết trình số</li>
                  </ul>
                </div>

                {/* Event meta listing summary details */}
                <div className="space-y-3 pt-4 border-t border-dashed border-[#ec297b]/20 dark:border-[#ec297b]/15 text-xs">
                  <div className="flex items-center justify-between text-gray-505 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> Ngày tổ chức</span>
                    <span className="font-bold text-text-main dark:text-white">{event.date.split(', ')[0] || event.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-550 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> Giờ bắt đầu</span>
                    <span className="font-bold text-text-main dark:text-white">{event.time.split(' (')[0] || event.time}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-550 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><Award size={14} /> Chứng chỉ</span>
                    <span className="font-bold text-text-main dark:text-white">{event.cmeHours.split(': ')[1] || event.cmeHours}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-555 dark:text-gray-400">
                    <span className="flex items-center gap-1.5"><Building2 size={14} /> Hình thức</span>
                    <span className="font-bold text-text-main dark:text-white">{event.location.includes('&') || event.location.includes('Zoom') ? 'Hybrid (Trực tiếp & Online)' : 'Trực tiếp'}</span>
                  </div>
                </div>

                {/* Big Button Action */}
                <div className="pt-2">
                  <button className="w-full rounded-2xl bg-gradient-to-r from-[#ec297b] to-secondary hover:opacity-90 text-white py-4 font-black text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer">
                    Đăng ký vé tham dự <ChevronRight size={18} />
                  </button>
                </div>

                {/* Disclaimer box */}
                <div className="p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-100/50 dark:border-amber-950/20 flex gap-2 text-[10px] leading-relaxed text-[#d97706]">
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Sự kiện chỉ dành cho nhân viên y tế chuyên khoa. Vui lòng chuẩn bị Chứng chỉ hành nghề y khoa khi làm thủ tục check-in.</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
