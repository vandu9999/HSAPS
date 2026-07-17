'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    { label: 'Hội viên', href: '/hoi-vien' },
    { label: 'Bài báo khoa học', href: '/bao-cao-khoa-hoc' },
    { label: 'LMS', href: '#' },
    { label: 'Sự kiện', href: '#' },
    { label: 'Đối tác', href: '#' },
    { label: 'Liên hệ', href: '/lien-he' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-accent-bg bg-white/90 backdrop-blur-md dark:border-pink-900/30 dark:bg-background-dark/95">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Stethoscope className="size-6" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold leading-tight tracking-tight text-text-main dark:text-white">HSAPS</h1>
            <p className="text-[10px] font-medium text-text-secondary uppercase tracking-widest hidden sm:block">Ho Chi Minh City Society</p>
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = item.href !== '#' && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));
            return (
              <Link
                key={item.label}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-text-main hover:text-primary dark:text-gray-200'
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-full p-2 text-text-secondary hover:bg-accent-bg hover:text-primary transition-colors dark:hover:bg-gray-800">
            <Search className="size-5" />
          </button>
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login?tab=login" className="flex h-10 items-center justify-center rounded-lg bg-accent-bg px-5 text-sm font-bold text-text-main transition-colors hover:bg-pink-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              Đăng nhập
            </Link>
            <Link href="/login?tab=register" className="flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark">
              Đăng ký
            </Link>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center rounded-lg p-2 text-text-main hover:bg-accent-bg dark:text-white dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-accent-bg bg-white dark:border-pink-900/30 dark:bg-background-dark lg:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => {
                const isActive = item.href !== '#' && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));
                return (
                  <Link
                    key={item.label}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-semibold ${
                      isActive
                        ? 'text-primary'
                        : 'text-text-main hover:text-primary dark:text-gray-200'
                    }`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-150 dark:border-gray-800">
                <Link
                  href="/login?tab=login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-10 rounded-lg bg-accent-bg text-sm font-bold text-text-main dark:bg-gray-800 dark:text-white flex items-center justify-center"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/login?tab=register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full h-10 rounded-lg bg-primary text-sm font-bold text-white shadow-sm flex items-center justify-center"
                >
                  Đăng ký
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
