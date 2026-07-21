'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CalendarDays, Users, Handshake, Settings, TrendingUp,
  Edit3, BookOpen, ArrowRight, Activity, CheckCircle,
  Newspaper, Tags, Home, ArrowUpRight,
  FileText, Globe, Zap, Shield, Eye, MousePointerClick,
  AlertCircle, ChevronRight, Star, Award, ChevronLeft,
  MapPin, Sparkles,
} from 'lucide-react';
import DoctorDashboard from './components/DoctorDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import GuestDashboard from './components/GuestDashboard';
import HcmcSkyline from '@/components/HcmcSkyline';

// ─── Static Data ──────────────────────────────────────────────────────────────

const STATS = [
  {
    label: 'Hội viên Bác sĩ',
    value: '127',
    change: '+12',
    icon: Users,
    gradient: 'from-violet-500 to-indigo-600',
    glow: 'shadow-violet-500/20',
    light: 'bg-violet-50',
    color: 'text-violet-600',
    border: 'border-violet-100',
    badge: 'bg-violet-50 border-violet-200 text-violet-600',
  },
  {
    label: 'Sự kiện đang mở',
    value: '8',
    change: '+3',
    icon: CalendarDays,
    gradient: 'from-sky-500 to-cyan-500',
    glow: 'shadow-sky-500/20',
    light: 'bg-sky-50',
    color: 'text-sky-600',
    border: 'border-sky-100',
    badge: 'bg-sky-50 border-sky-200 text-sky-600',
  },
  {
    label: 'Bài báo khoa học',
    value: '1,024',
    change: '+38',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/20',
    light: 'bg-emerald-50',
    color: 'text-emerald-600',
    border: 'border-emerald-100',
    badge: 'bg-emerald-50 border-emerald-200 text-emerald-600',
  },
  {
    label: 'Đối tác chiến lược',
    value: '24',
    change: '+2',
    icon: Handshake,
    gradient: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/20',
    light: 'bg-amber-50',
    color: 'text-amber-600',
    border: 'border-amber-100',
    badge: 'bg-amber-50 border-amber-200 text-amber-600',
  },
];

const QUICK_ACTIONS = [
  { href: '/admin/tin-tuc/them-moi', label: 'Viết bài mới', icon: FileText, color: '#ec297b', bg: 'bg-pink-50', hot: true },
  { href: '/admin/su-kien/them-moi', label: 'Tạo sự kiện', icon: CalendarDays, color: '#0ea5e9', bg: 'bg-sky-50', hot: false },
  { href: '/admin/hoi-vien/them-moi', label: 'Thêm hội viên', icon: Users, color: '#8b5cf6', bg: 'bg-violet-50', hot: false },
  { href: '/admin/bao-cao/them-moi', label: 'Đăng báo cáo', icon: BookOpen, color: '#10b981', bg: 'bg-emerald-50', hot: false },
];

const NAV_MODULES = [
  { href: '/admin/trang-chu', icon: Home, label: 'Trang chủ', desc: 'Hero, thống kê, CTA', color: '#ec297b', badge: null },
  { href: '/admin/tin-tuc', icon: Newspaper, label: 'Tin tức', desc: 'Bài viết & thông báo', color: '#f43f5e', badge: '5 nháp' },
  { href: '/admin/su-kien', icon: CalendarDays, label: 'Sự kiện', desc: 'Lịch hội nghị, workshop', color: '#0ea5e9', badge: null },
  { href: '/admin/hoi-vien', icon: Users, label: 'Hội viên', desc: 'Danh sách bác sĩ', color: '#8b5cf6', badge: '3 chờ duyệt' },
  { href: '/admin/doi-tac', icon: Handshake, label: 'Đối tác', desc: 'Logo, thông tin đối tác', color: '#f59e0b', badge: null },
  { href: '/admin/bao-cao', icon: BookOpen, label: 'Báo cáo KH', desc: 'Nghiên cứu khoa học', color: '#10b981', badge: null },
  { href: '/admin/danh-muc', icon: Tags, label: 'Danh mục', desc: 'Phân loại nội dung', color: '#f59e0b', badge: null },
  { href: '/admin/cai-dat', icon: Settings, label: 'Cài đặt', desc: 'Cấu hình hệ thống', color: '#a855f7', badge: null },
];

const RECENT_ACTIVITIES = [
  { action: 'Cập nhật ảnh hero trang chủ', time: '2 giờ trước', icon: Home, type: 'edit' },
  { action: 'Thêm sự kiện: Workshop HIFU 2025', time: '5 giờ trước', icon: CalendarDays, type: 'create' },
  { action: 'Chỉnh sửa thông tin BS. Nguyễn Văn A', time: 'Hôm qua 14:22', icon: Users, type: 'edit' },
  { action: 'Cập nhật thông tin đối tác Motiva', time: '2 ngày trước', icon: Handshake, type: 'edit' },
  { action: 'Đăng báo cáo KH: Công nghệ laser mới', time: '3 ngày trước', icon: BookOpen, type: 'create' },
  { action: 'Thêm hội viên mới: TS.BS. Trần Văn B', time: '4 ngày trước', icon: Users, type: 'create' },
];

const UPCOMING_EVENTS = [
  { name: 'Hội nghị Khoa học Quốc tế HSAPS 2025', date: '20 Tháng 12, 2025', location: 'GEM Center, TP.HCM', status: 'Đang mở đăng ký', attendees: 342 },
  { name: 'Workshop: Kỹ thuật Nâng ngực nội soi', date: '05 Tháng 01, 2026', location: 'Khách sạn REX, TP.HCM', status: 'Sắp diễn ra', attendees: 85 },
  { name: 'Webinar: Ứng dụng AI trong thẩm mỹ', date: '15 Tháng 01, 2026', location: 'Online - Zoom', status: 'Sắp diễn ra', attendees: 210 },
];

const SYSTEM_HEALTH = [
  { label: 'Trạng thái Database', value: 'Kết nối tốt', icon: Shield, status: 'ok' },
  { label: 'Supabase Storage', value: 'Hoạt động', icon: Globe, status: 'ok' },
  { label: 'API Server', value: 'Online', icon: Zap, status: 'ok' },
  { label: 'Email Service', value: 'Chưa cấu hình', icon: AlertCircle, status: 'warn' },
];

// ─── Sparkline Bar ────────────────────────────────────────────────────────────

function SparkBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-1 rounded-sm transition-all opacity-30"
          style={{ height: `${(v / max) * 100}%`, backgroundColor: color }}
        />
      ))}
      <div
        className="w-1 rounded-sm opacity-100"
        style={{ height: `${(data[data.length - 1] / max) * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ─── Hero Event Slider Component ──────────────────────────────────────────────

const HERO_SLIDER_EVENTS = [
  {
    id: 'evt-1',
    title: 'Hội nghị Khoa học Quốc tế HSAPS 2025',
    date: '20 Tháng 12, 2025',
    location: 'GEM Center, TP.HCM',
    badge: 'Đang mở đăng ký',
    cme: '12 CME',
    href: '/admin/su-kien',
  },
  {
    id: 'evt-2',
    title: 'Workshop: Kỹ thuật Nâng ngực nội soi',
    date: '05 Tháng 01, 2026',
    location: 'Khách sạn REX, TP.HCM',
    badge: 'Sắp diễn ra',
    cme: '6 CME',
    href: '/admin/su-kien',
  },
  {
    id: 'evt-3',
    title: 'Webinar: Ứng dụng AI trong phẫu thuật thẩm mỹ',
    date: '15 Tháng 01, 2026',
    location: 'Trực tuyến (Zoom Pro)',
    badge: 'Miễn phí Hội viên',
    cme: '4 CME',
    href: '/admin/su-kien',
  },
];

function HeroEventSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDER_EVENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentEvent = HERO_SLIDER_EVENTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDER_EVENTS.length) % HERO_SLIDER_EVENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDER_EVENTS.length);
  };

  return (
    <div className="hidden lg:block relative min-w-[290px] max-w-[330px]">
      <div className="relative overflow-hidden rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 p-5 shadow-2xl shadow-black/20 text-white">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-3 border-b border-white/15 pb-2.5">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300">
            <Sparkles className="size-3" />
            Sự kiện nổi bật
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="flex size-6 items-center justify-center rounded-lg bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
              title="Sự kiện trước"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-white/70 px-1">
              {currentIndex + 1}/{HERO_SLIDER_EVENTS.length}
            </span>
            <button
              onClick={handleNext}
              className="flex size-6 items-center justify-center rounded-lg bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer"
              title="Sự kiện tiếp"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Animated Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/30">
                {currentEvent.badge}
              </span>
              <span className="rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 text-[10px] font-black">
                {currentEvent.cme}
              </span>
            </div>

            <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 min-h-[40px]">
              {currentEvent.title}
            </h4>

            <div className="space-y-1 text-xs text-white/80 font-medium pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-3.5 text-pink-300 shrink-0" />
                <span>{currentEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-sky-300 shrink-0" />
                <span className="truncate">{currentEvent.location}</span>
              </div>
            </div>

            <Link
              href={currentEvent.href}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#ec297b] shadow hover:bg-white/90 transition-all group"
            >
              Xem chi tiết sự kiện
              <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
          {HERO_SLIDER_EVENTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Chào buổi sáng' : h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối');
    return () => clearInterval(tick);
  }, []);

  const sparkData = [40, 55, 48, 70, 62, 80, 75, 90, 85, 95, 88, 100];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/80 dark:bg-[#090b0e]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 border-4 border-[#ec297b] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-500">Đang tải cấu hình dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/80 dark:bg-[#090b0e] p-6 text-center">
        <div className="size-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
          <AlertCircle className="size-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Chưa đăng nhập</h3>
        <p className="text-sm text-gray-400 mt-2 max-w-sm">Vui lòng đăng nhập tài khoản HSAPS để truy cập trang làm việc của bạn.</p>
        <Link href="/login" className="mt-5 inline-flex items-center justify-center rounded-xl bg-primary px-6 h-11 text-sm font-bold text-white shadow-md hover:bg-primary-dark transition-all">
          Đến trang đăng nhập
        </Link>
      </div>
    );
  }

  const role = ((session.user as any)?.role || 'GUEST').toUpperCase();
  const email = session.user?.email || '';
  const name = session.user?.name || '';

  // Phân quyền dashboard dựa trên vai trò
  if (role === 'EDITOR') {
    return <DoctorDashboard email={email} name={name} />;
  }

  if (role === 'PARTNER') {
    return <PartnerDashboard email={email} name={name} />;
  }

  if (role === 'GUEST') {
    return <GuestDashboard email={email} name={name} />;
  }

  // Giao diện của ADMIN
  return (
    <div className="min-h-screen bg-gray-50/80 text-gray-900">
      <div className="p-8 space-y-6">

        {/* ── Welcome Hero ───────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ec297b] to-[#9c1ab1] p-8 shadow-xl shadow-pink-500/20">
          {/* Decorative bubbles & HCMC Skyline background */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
          <div className="pointer-events-none absolute right-48 top-4 h-20 w-20 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-24 bottom-4 h-12 w-12 rounded-full bg-white/15" />
          
          {/* TP. Hồ Chí Minh Skyline Background */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 opacity-30">
            <HcmcSkyline className="w-full h-full text-white" />
          </div>

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold text-white uppercase tracking-widest">
                  <Star className="size-3" />
                  {greeting}, Admin
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-white leading-tight drop-shadow">
                Hệ thống CMS
                <span className="block text-white/80 font-medium text-xl mt-1">
                  HSAPS Portal
                </span>
              </h2>
              <p className="mt-2 text-sm text-white/70 max-w-md">
                Quản lý nội dung y khoa, hội viên bác sĩ, sự kiện khoa học và đối tác chiến lược.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <Link
                  href="/admin/tin-tuc/them-moi"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#ec297b] shadow-lg hover:bg-white/90 transition-all"
                >
                  <Edit3 className="size-3.5" />
                  Tạo nội dung mới
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  <Eye className="size-3.5" />
                  Xem trang công khai
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* Event Carousel Slider Widget */}
            <HeroEventSlider />
          </div>
        </div>

        {/* ── KPI Stats ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            // pick a solid representative color for sparkbar
            const sparkColor = stat.gradient.includes('violet') ? '#8b5cf6'
              : stat.gradient.includes('sky') ? '#0ea5e9'
              : stat.gradient.includes('emerald') ? '#10b981'
              : '#f59e0b';
            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.glow}`}>
                    <Icon className="size-5 text-white" />
                  </div>
                  <div className={stat.color}>
                    <SparkBar data={sparkData} color={sparkColor} />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-3xl font-black text-gray-800 tracking-tight">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</p>
                </div>

                <div className="mt-3">
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${stat.badge}`}>
                    <TrendingUp className="size-2.5" />
                    {stat.change} tháng này
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Main 3-Col Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-6">

          {/* Left: Quick Actions + Module Nav */}
          <div className="col-span-2 space-y-6">

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-700">Thao tác nhanh</h3>
                <Zap className="size-4 text-amber-500" />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {QUICK_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="group relative flex flex-col items-center gap-2.5 rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:border-gray-200 hover:bg-white hover:shadow-md transition-all"
                    >
                      {action.hot && (
                        <span className="absolute -right-1.5 -top-1.5 rounded-full bg-[#ec297b] px-1.5 py-0.5 text-[9px] font-black text-white uppercase tracking-wide">HOT</span>
                      )}
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.bg}`} style={{ color: action.color }}>
                        <Icon className="size-5" />
                      </div>
                      <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-800 text-center transition-colors">{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Module Navigation */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-700">Quản lý nội dung</h3>
                <MousePointerClick className="size-4 text-gray-300" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {NAV_MODULES.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <Link
                      key={mod.href}
                      href={mod.href}
                      className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3.5 hover:border-gray-200 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${mod.color}18`, color: mod.color }}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors leading-tight">{mod.label}</p>
                        <p className="text-[10px] text-gray-400 truncate">{mod.desc}</p>
                      </div>
                      {mod.badge ? (
                        <span className="shrink-0 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-bold text-amber-600 whitespace-nowrap">{mod.badge}</span>
                      ) : (
                        <ChevronRight className="size-3.5 text-gray-200 group-hover:text-gray-400 transition-colors shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Recent Activity */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-700">Hoạt động gần đây</h3>
                <Activity className="size-4 text-gray-300" />
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-100" />
                <div className="space-y-4">
                  {RECENT_ACTIVITIES.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex gap-3 relative">
                        <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                          item.type === 'create'
                            ? 'border-emerald-200 bg-emerald-50'
                            : 'border-gray-100 bg-white'
                        }`}>
                          <Icon className={`size-3.5 ${item.type === 'create' ? 'text-emerald-500' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className="text-xs text-gray-600 leading-snug font-medium line-clamp-2">{item.action}</p>
                          <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                            <CheckCircle className="size-2.5 text-emerald-500 shrink-0" />
                            {item.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="mt-5 w-full rounded-xl border border-gray-100 py-2 text-xs font-semibold text-gray-400 hover:text-gray-600 hover:border-gray-200 hover:bg-gray-50 transition-all">
                Xem tất cả →
              </button>
            </div>

            {/* System Health */}
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-700">Trạng thái hệ thống</h3>
                <Shield className="size-4 text-gray-300" />
              </div>
              <div className="space-y-2.5">
                {SYSTEM_HEALTH.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className={`flex items-center gap-3 rounded-xl border p-3 ${
                      item.status === 'ok'
                        ? 'border-gray-100 bg-gray-50/60'
                        : 'border-amber-100 bg-amber-50'
                    }`}>
                      <Icon className={`size-4 shrink-0 ${item.status === 'ok' ? 'text-emerald-500' : 'text-amber-500'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-500 leading-none">{item.label}</p>
                        <p className={`text-[10px] mt-0.5 font-medium ${item.status === 'ok' ? 'text-emerald-600' : 'text-amber-600'}`}>{item.value}</p>
                      </div>
                      <div className={`h-2 w-2 rounded-full shrink-0 ${item.status === 'ok' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Upcoming Events Table ───────────────────────────────────────────── */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50">
                <CalendarDays className="size-4 text-sky-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-700">Sự kiện sắp tới</h3>
                <p className="text-[11px] text-gray-400">Các hội nghị và workshop sắp diễn ra</p>
              </div>
            </div>
            <Link
              href="/admin/su-kien"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all"
            >
              Xem tất cả
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sự kiện</th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ngày</th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Địa điểm</th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Đăng ký</th>
                  <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {UPCOMING_EVENTS.map((event, i) => (
                  <tr key={i} className="group hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50">
                          <Award className="size-4 text-sky-500" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors max-w-[240px] truncate">
                          {event.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-500">{event.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-400">{event.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                            style={{ width: `${Math.min((event.attendees / 400) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-500">{event.attendees}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold border ${
                        event.status === 'Đang mở đăng ký'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                          : 'bg-sky-50 border-sky-200 text-sky-600'
                      }`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${event.status === 'Đang mở đăng ký' ? 'bg-emerald-400 animate-pulse' : 'bg-sky-400'}`} />
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href="/admin/su-kien"
                        className="inline-flex items-center gap-1 rounded-lg bg-gray-100 hover:bg-pink-50 hover:text-[#ec297b] px-3 py-1.5 text-[11px] font-bold text-gray-400 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Edit3 className="size-3" />
                        Sửa
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-[11px] text-gray-300">
            HSAPS CMS v2.0 — Hội Phẫu thuật Tạo hình Thẩm mỹ TP.HCM
          </p>
          <p className="text-[11px] text-gray-300">
            Powered by Next.js · Supabase · Prisma
          </p>
        </div>
      </div>
    </div>
  );
}
