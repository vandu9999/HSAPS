'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Home, Info, Users, CalendarDays, User } from 'lucide-react';

export default function MobileBottomBar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Hide on admin and login pages
  if (pathname?.startsWith('/admin') || pathname === '/login') {
    return null;
  }

  const items = [
    { label: 'Trang chủ', href: '/', icon: Home, exact: true },
    { label: 'Giới thiệu', href: '/gioi-thieu', icon: Info },
    { label: 'Hội viên', href: '/hoi-vien', icon: Users },
    { label: 'Sự kiện', href: '/su-kien', icon: CalendarDays },
    { label: session ? 'Tài khoản' : 'Đăng nhập', href: session ? '/admin' : '/login', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0d1117]/95 border-t border-gray-150 dark:border-gray-800 backdrop-blur-lg lg:hidden pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex h-14 items-center justify-around px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : item.href !== '#' && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center py-1 transition-all ${
                isActive
                  ? 'text-primary dark:text-[#ec297b] font-bold scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`size-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary dark:bg-[#ec297b]" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
