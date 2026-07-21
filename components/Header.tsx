'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope, Search, X, User, LogOut, Settings,
  ChevronDown, Shield, ArrowRight, Menu,
  CalendarDays, Users, BookOpen, Handshake, Phone, Info,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { label: 'Giới thiệu', href: '/gioi-thieu', icon: Info },
    { label: 'Hội viên', href: '/hoi-vien', icon: Users },
    { label: 'Bài báo khoa học', href: '/bao-cao-khoa-hoc', icon: BookOpen },
    { label: 'LMS', href: '#', icon: Shield },
    { label: 'Sự kiện', href: '/su-kien', icon: CalendarDays },
    { label: 'Đối tác', href: '/doi-tac', icon: Handshake },
    { label: 'Liên hệ', href: '/lien-he', icon: Phone },
  ];

  const userRole = ((session?.user as any)?.role || '').toUpperCase();
  const canAccessDashboard = userRole === 'ADMIN' || userRole === 'EDITOR';
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Tài khoản';
  const userEmail = session?.user?.email || '';
  const avatarInitial = userName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-accent-bg bg-white/90 backdrop-blur-md dark:border-pink-900/30 dark:bg-background-dark/95">
        <div className="mx-auto flex h-16 sm:h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">

          {/* ── Logo ────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity">
            <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Stethoscope className="size-5 sm:size-6" />
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl font-bold leading-tight tracking-tight text-text-main dark:text-white">HSAPS</h1>
              <p className="text-[9px] sm:text-[10px] font-medium text-text-secondary uppercase tracking-widest hidden sm:block">Ho Chi Minh City Society</p>
            </div>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = item.href !== '#' && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));
              return (
                <Link
                  key={item.label}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? 'text-primary' : 'text-text-main hover:text-primary dark:text-gray-200'
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Actions ───────────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <button className="flex items-center justify-center rounded-full p-2 text-text-secondary hover:bg-accent-bg hover:text-primary transition-colors dark:hover:bg-gray-800">
              <Search className="size-4 sm:size-5" />
            </button>

            {/* Desktop: Auth / User menu */}
            <div className="hidden sm:flex items-center gap-2">
              {status === 'loading' ? (
                <div className="h-10 w-32 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ) : session ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 hover:border-primary/50 hover:bg-pink-50 dark:hover:bg-gray-800 transition-all cursor-pointer"
                  >
                    <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ec297b] to-[#c2185f] text-white text-xs font-black shadow-sm">
                      {session.user?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={session.user.image} alt={userName} className="size-8 rounded-full object-cover" />
                      ) : (
                        avatarInitial
                      )}
                    </div>
                    <div className="text-left hidden md:block">
                      <p className="text-xs font-bold text-text-main dark:text-white leading-tight max-w-[100px] truncate">{userName}</p>
                      <p className="text-[10px] text-text-secondary dark:text-gray-400 leading-tight max-w-[100px] truncate">{userEmail}</p>
                    </div>
                    <ChevronDown className={`size-3.5 text-text-secondary transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-pink-50 to-white dark:from-gray-800 dark:to-gray-900">
                          <p className="text-xs font-black text-text-main dark:text-white truncate">{userName}</p>
                          <p className="text-[10px] text-text-secondary dark:text-gray-400 truncate">{userEmail}</p>
                        </div>
                        <div className="p-2">
                          <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-main dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-primary transition-colors">
                            <User className="size-4 text-text-secondary" /> Quản lý tài khoản
                          </Link>
                          <Link href="/register-profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-main dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-primary transition-colors">
                            <Settings className="size-4 text-text-secondary" /> Cài đặt tài khoản
                          </Link>
                          <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
                          <button onClick={handleSignOut} className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer">
                            <LogOut className="size-4" /> Đăng xuất
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login?tab=login" className="flex h-9 items-center justify-center rounded-lg bg-accent-bg px-4 text-sm font-bold text-text-main transition-colors hover:bg-pink-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    Đăng nhập
                  </Link>
                  <Link href="/login?tab=register" className="flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              className="lg:hidden flex items-center justify-center rounded-xl w-9 h-9 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-main hover:bg-pink-50 hover:border-primary/30 hover:text-primary dark:text-white dark:hover:bg-gray-800 transition-all"
            >
              {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[85vw] max-w-[340px] flex flex-col bg-white dark:bg-[#0d1117] shadow-2xl lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Stethoscope className="size-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main dark:text-white">HSAPS</p>
                    <p className="text-[9px] text-text-secondary uppercase tracking-widest">Portal</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex size-8 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 text-text-secondary hover:text-primary hover:border-primary/30 hover:bg-pink-50 dark:hover:bg-white/5 transition-all"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                <p className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Điều hướng</p>
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = item.href !== '#' && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-text-main dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary'
                        }`}
                      >
                        <div className={`flex size-8 items-center justify-center rounded-lg ${isActive ? 'bg-primary/15 text-primary' : 'bg-gray-100 dark:bg-white/[0.06] text-gray-500 dark:text-white/40'}`}>
                          <Icon className="size-4" />
                        </div>
                        <span className="text-sm font-semibold">{item.label}</span>
                        {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Auth section at bottom */}
              <div className="px-4 py-5 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/50 dark:bg-white/[0.02]">
                {status === 'loading' ? (
                  <div className="h-12 rounded-xl bg-gray-100 dark:bg-white/5 animate-pulse" />
                ) : session ? (
                  <div className="space-y-2">
                    {/* User info */}
                    <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-gradient-to-r from-pink-50 to-white dark:from-pink-500/5 dark:to-transparent border border-pink-100 dark:border-pink-500/10">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ec297b] to-[#c2185f] text-white text-sm font-black shadow-sm">
                        {session.user?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={session.user.image} alt={userName} className="size-10 rounded-full object-cover" />
                        ) : avatarInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-text-main dark:text-white truncate">{userName}</p>
                        <p className="text-[10px] text-text-secondary dark:text-gray-400 truncate">{userEmail}</p>
                      </div>
                    </div>

                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full h-10 rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 px-3 text-sm font-semibold text-text-main dark:text-white hover:border-primary/30 hover:text-primary transition-all"
                    >
                      <User className="size-4" /> Quản lý tài khoản
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full h-10 rounded-xl border border-red-200 dark:border-red-900/30 px-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all cursor-pointer"
                    >
                      <LogOut className="size-4" /> Đăng xuất
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login?tab=login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-gray-100 dark:bg-white/[0.06] text-sm font-bold text-text-main dark:text-white hover:bg-pink-50 hover:text-primary transition-all"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/login?tab=register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-primary text-sm font-bold text-white shadow-md hover:bg-primary-dark transition-all"
                    >
                      Đăng ký Hội viên
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
