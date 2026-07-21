'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Home,
  CalendarDays,
  Users,
  Handshake,
  Settings,
  ChevronRight,
  Stethoscope,
  BookOpen,
  Newspaper,
  Tags,
  Sun,
  Moon,
} from 'lucide-react';
import { getDoctorByEmail } from '@/app/actions/doctor';

export default function AdminSidebar({
  theme,
  toggleTheme
}: {
  theme?: 'light' | 'dark';
  toggleTheme?: () => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = ((session?.user as any)?.role || 'GUEST').toUpperCase();
  const userName = session?.user?.name || 'Thành viên';
  const userEmail = session?.user?.email || '';
  
  const [myDoctorId, setMyDoctorId] = useState<string | null>(null);

  useEffect(() => {
    if (userEmail && userRole === 'EDITOR') {
      getDoctorByEmail(userEmail).then(doc => {
        if (doc) setMyDoctorId(doc.id);
      });
    }
  }, [userEmail, userRole]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  // Build nav items dynamically based on roles
  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      exact: true,
    },
    ...(userRole === 'ADMIN' ? [
      {
        label: 'Trang chủ',
        href: '/admin/trang-chu',
        icon: Home,
        description: 'Hero, thống kê, CTA',
      }
    ] : []),
    {
      label: 'Tin tức',
      href: '/admin/tin-tuc',
      icon: Newspaper,
      description: 'Bài viết & thông báo',
    },
    {
      label: 'Sự kiện',
      href: '/admin/su-kien',
      icon: CalendarDays,
      description: 'Quản lý sự kiện',
    },
    ...(userRole === 'ADMIN' ? [
      {
        label: 'Hội viên',
        href: '/admin/hoi-vien',
        icon: Users,
        description: 'Danh sách bác sĩ',
      }
    ] : []),
    ...(userRole === 'EDITOR' && myDoctorId ? [
      {
        label: 'Hồ sơ của tôi',
        href: `/admin/hoi-vien/${myDoctorId}`,
        icon: Users,
        description: 'Thông tin cá nhân bác sĩ',
      }
    ] : []),
    ...(userRole === 'ADMIN' ? [
      {
        label: 'Đối tác',
        href: '/admin/doi-tac',
        icon: Handshake,
        description: 'Quản lý đối tác',
      }
    ] : []),
    {
      label: 'Báo cáo KH',
      href: '/admin/bao-cao',
      icon: BookOpen,
      description: 'Báo cáo khoa học',
    },
    ...(userRole === 'ADMIN' ? [
      {
        label: 'Danh mục',
        href: '/admin/danh-muc',
        icon: Tags,
        description: 'Quản lý phân loại',
      }
    ] : []),
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d1117] border-r border-white/[0.06] flex flex-col z-50 shadow-2xl">
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ec297b] to-[#c2185f] shadow-lg shadow-pink-500/20">
            <Stethoscope className="size-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white tracking-tight">HSAPS</p>
            <p className="text-[10px] text-white/40 font-medium">Portal Quản trị</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 py-2 mt-1">
          Quản lý nội dung
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                active
                  ? 'bg-[#ec297b]/15 text-[#ec297b]'
                  : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'
              }`}
            >
              <Icon className={`size-4 shrink-0 ${active ? 'text-[#ec297b]' : ''}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-none ${active ? 'text-[#ec297b]' : ''}`}>
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-[10px] text-white/30 mt-0.5 leading-none">{item.description}</p>
                )}
              </div>
              {active && <ChevronRight className="size-3 text-[#ec297b] shrink-0" />}
            </Link>
          );
        })}

        {userRole === 'ADMIN' && (
          <div className="pt-3">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 py-2">
              Hệ thống
            </p>
            <Link
              href="/admin/cai-dat"
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                isActive('/admin/cai-dat')
                  ? 'bg-[#ec297b]/15 text-[#ec297b]'
                  : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'
              }`}
            >
              <Settings className={`size-4 shrink-0 ${isActive('/admin/cai-dat') ? 'text-[#ec297b]' : ''}`} />
              <div className="flex-1">
                <p className={`text-sm font-semibold ${isActive('/admin/cai-dat') ? 'text-[#ec297b]' : ''}`}>
                  Cài đặt hệ thống
                </p>
                <p className="text-[10px] text-white/30 mt-0.5 leading-none">Cấu hình chung</p>
              </div>
            </Link>
          </div>
        )}
      </nav>

      {/* Footer */}
      {toggleTheme && (
        <div className="p-4 border-t border-white/[0.06]">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all text-xs font-semibold"
          >
            <span className="flex items-center gap-2">
              {theme === 'light' ? <Moon className="size-3.5" /> : <Sun className="size-3.5 text-amber-400" />}
              {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
            </span>
            <span className="rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider">
              {theme === 'light' ? 'Dark' : 'Light'}
            </span>
          </button>
        </div>
      )}
    </aside>
  );
}
