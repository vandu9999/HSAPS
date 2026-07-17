'use client';

import Link from 'next/link';
import {
  Home,
  CalendarDays,
  Users,
  Handshake,
  Settings,
  TrendingUp,
  Image as ImageIcon,
  Edit3,
  BookOpen,
  ArrowRight,
  Activity,
  CheckCircle,
  Newspaper,
  Tags,
} from 'lucide-react';

const STATS = [
  { label: 'Trang được quản lý', value: '8', icon: Edit3, color: 'from-[#ec297b] to-[#c2185f]', shadow: 'shadow-pink-500/20' },
  { label: 'Hội viên bác sĩ', value: '12', icon: Users, color: 'from-[#6366f1] to-[#4f46e5]', shadow: 'shadow-indigo-500/20' },
  { label: 'Sự kiện sắp tới', value: '4', icon: CalendarDays, color: 'from-[#0ea5e9] to-[#0284c7]', shadow: 'shadow-sky-500/20' },
  { label: 'Đối tác chiến lược', value: '5', icon: Handshake, color: 'from-[#f59e0b] to-[#d97706]', shadow: 'shadow-amber-500/20' },
];

const QUICK_LINKS = [
  {
    href: '/admin/trang-chu',
    icon: Home,
    label: 'Trang chủ',
    desc: 'Hero banner, thống kê, CTA',
    color: '#ec297b',
    bg: 'bg-[#ec297b]/10',
  },
  {
    href: '/admin/tin-tuc',
    icon: Newspaper,
    label: 'Tin tức',
    desc: 'Bài viết & thông báo',
    color: '#f43f5e',
    bg: 'bg-rose-500/10',
  },
  {
    href: '/admin/su-kien',
    icon: CalendarDays,
    label: 'Sự kiện',
    desc: 'Thêm, sửa, xóa sự kiện',
    color: '#0ea5e9',
    bg: 'bg-[#0ea5e9]/10',
  },
  {
    href: '/admin/hoi-vien',
    icon: Users,
    label: 'Hội viên',
    desc: 'Quản lý danh sách bác sĩ',
    color: '#6366f1',
    bg: 'bg-[#6366f1]/10',
  },
  {
    href: '/admin/doi-tac',
    icon: Handshake,
    label: 'Đối tác',
    desc: 'Logo, thông tin đối tác',
    color: '#f59e0b',
    bg: 'bg-[#f59e0b]/10',
  },
  {
    href: '/admin/bao-cao',
    icon: BookOpen,
    label: 'Báo cáo KH',
    desc: 'Báo cáo khoa học',
    color: '#10b981',
    bg: 'bg-[#10b981]/10',
  },
  {
    href: '/admin/danh-muc',
    icon: Tags,
    label: 'Danh mục',
    desc: 'Danh mục 4 module',
    color: '#f59e0b',
    bg: 'bg-amber-500/10',
  },
  {
    href: '/admin/cai-dat',
    icon: Settings,
    label: 'Cài đặt',
    desc: 'Cấu hình hệ thống',
    color: '#a855f7',
    bg: 'bg-[#a855f7]/10',
  },
];

const RECENT_ACTIVITIES = [
  { action: 'Cập nhật ảnh hero trang chủ', time: '2 giờ trước', icon: ImageIcon, status: 'success' },
  { action: 'Thêm sự kiện mới: Workshop HIFU 2025', time: '5 giờ trước', icon: CalendarDays, status: 'success' },
  { action: 'Chỉnh sửa thông tin BS. Nguyễn Văn A', time: 'Hôm qua', icon: Users, status: 'success' },
  { action: 'Cập nhật thông tin đối tác Motiva', time: '2 ngày trước', icon: Handshake, status: 'success' },
  { action: 'Thay đổi cài đặt SEO', time: '3 ngày trước', icon: Settings, status: 'success' },
];

const PAGES_STATUS = [
  { name: 'Trang chủ', path: '/', status: 'Đã xuất bản', images: 5, lastEdit: '2 giờ trước' },
  { name: 'Tin tức', path: '/tin-tuc', status: 'Đã xuất bản', images: 4, lastEdit: '1 giờ trước' },
  { name: 'Giới thiệu', path: '/gioi-thieu', status: 'Đã xuất bản', images: 8, lastEdit: '3 ngày trước' },
  { name: 'Sự kiện', path: '/su-kien', status: 'Đã xuất bản', images: 12, lastEdit: '5 giờ trước' },
  { name: 'Hội viên', path: '/hoi-vien', status: 'Đã xuất bản', images: 24, lastEdit: 'Hôm qua' },
  { name: 'Đối tác', path: '/doi-tac', status: 'Đã xuất bản', images: 10, lastEdit: '2 ngày trước' },
  { name: 'Báo cáo KH', path: '/bao-cao-khoa-hoc', status: 'Đã xuất bản', images: 4, lastEdit: '1 tuần trước' },
];

export default function AdminDashboard() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-xs text-white/40 mt-0.5">{dateStr}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Hệ thống hoạt động
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ec297b]/20 via-[#c2185f]/10 to-[#0d1117] border border-[#ec297b]/20 p-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ec297b]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative">
            <p className="text-[#ec297b] text-xs font-bold uppercase tracking-widest mb-2">Chào mừng trở lại</p>
            <h2 className="text-2xl font-bold text-white mb-1">Hệ thống CMS HSAPS</h2>
            <p className="text-white/50 text-sm">Quản lý toàn bộ nội dung và hình ảnh hệ thống tại đây.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-5 hover:border-white/10 transition-all">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg ${stat.shadow} mb-4`}>
                  <Icon className="size-5 text-white" />
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Quick Links */}
          <div className="col-span-2 rounded-2xl bg-[#161b22] border border-white/[0.06] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">Truy cập nhanh</h3>
              <TrendingUp className="size-4 text-white/30" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {QUICK_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col gap-3 rounded-xl p-4 border border-white/[0.04] hover:border-white/10 hover:bg-white/[0.02] transition-all"
                  >
                    <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${item.bg}`} style={{ color: item.color }}>
                      <Icon className="size-4.5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{item.label}</p>
                      <p className="text-[11px] text-white/35 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                    <ArrowRight className="size-3.5 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all self-end" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">Hoạt động gần đây</h3>
              <Activity className="size-4 text-white/30" />
            </div>
            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] mt-0.5">
                      <Icon className="size-3.5 text-white/40" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/70 leading-snug font-medium">{activity.action}</p>
                      <p className="text-[10px] text-white/30 mt-1 flex items-center gap-1">
                        <CheckCircle className="size-2.5 text-emerald-400" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pages Status Table */}
        <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
            <h3 className="text-base font-bold text-white">Trạng thái các trang</h3>
            <ImageIcon className="size-4 text-white/30" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left px-6 py-3 text-[11px] font-bold text-white/30 uppercase tracking-wider">Tên trang</th>
                  <th className="text-left px-6 py-3 text-[11px] font-bold text-white/30 uppercase tracking-wider">Đường dẫn</th>
                  <th className="text-left px-6 py-3 text-[11px] font-bold text-white/30 uppercase tracking-wider">Trạng thái</th>
                  <th className="text-left px-6 py-3 text-[11px] font-bold text-white/30 uppercase tracking-wider">Hình ảnh</th>
                  <th className="text-left px-6 py-3 text-[11px] font-bold text-white/30 uppercase tracking-wider">Chỉnh sửa lần cuối</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {PAGES_STATUS.map((page) => {
                  const editHref = page.name === 'Trang chủ' ? '/admin/trang-chu'
                    : page.name === 'Sự kiện' ? '/admin/su-kien'
                    : page.name === 'Hội viên' ? '/admin/hoi-vien'
                    : page.name === 'Đối tác' ? '/admin/doi-tac'
                    : page.name === 'Báo cáo KH' ? '/admin/bao-cao'
                    : '/admin/cai-dat';
                  return (
                    <tr key={page.name} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-semibold text-white/80">{page.name}</td>
                      <td className="px-6 py-4 text-white/40 font-mono text-xs">{page.path}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/50 text-sm">{page.images} ảnh</td>
                      <td className="px-6 py-4 text-white/40 text-xs">{page.lastEdit}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={editHref}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-[#ec297b]/10 hover:text-[#ec297b] px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                        >
                          <Edit3 className="size-3" />
                          Chỉnh sửa
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
