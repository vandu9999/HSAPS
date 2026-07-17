'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Search, Menu, X, User, LogOut, Settings, ChevronDown, Shield } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    { label: 'Hội viên', href: '/hoi-vien' },
    { label: 'Bài báo khoa học', href: '/bao-cao-khoa-hoc' },
    { label: 'LMS', href: '#' },
    { label: 'Sự kiện', href: '#' },
    { label: 'Đối tác', href: '#' },
    { label: 'Liên hệ', href: '/lien-he' },
  ];

  const userRole = ((session?.user as any)?.role || '').toUpperCase();
  const canAccessDashboard = userRole === 'ADMIN' || userRole === 'EDITOR';
  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Tài khoản';
  const userEmail = session?.user?.email || '';

  // Lấy chữ cái đầu để hiển thị avatar
  const avatarInitial = userName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    await signOut({ redirect: false });
    router.push('/');
  };

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

          {/* Desktop: Auth buttons hoặc User menu */}
          <div className="hidden sm:flex items-center gap-3">
            {status === 'loading' ? (
              // Skeleton loading
              <div className="h-10 w-32 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ) : session ? (
              // ===== ĐÃ ĐĂNG NHẬP: Hiển thị thông tin tài khoản =====
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 hover:border-primary/50 hover:bg-pink-50 dark:hover:bg-gray-800 transition-all group cursor-pointer"
                >
                  {/* Avatar circle */}
                  <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#ec297b] to-[#c2185f] text-white text-xs font-black shadow-sm">
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={session.user.image} alt={userName} className="size-8 rounded-full object-cover" />
                    ) : (
                      avatarInitial
                    )}
                  </div>
                  {/* Tên người dùng */}
                  <div className="text-left">
                    <p className="text-xs font-bold text-text-main dark:text-white leading-tight max-w-[100px] truncate">{userName}</p>
                    <p className="text-[10px] text-text-secondary dark:text-gray-400 leading-tight max-w-[100px] truncate">{userEmail}</p>
                  </div>
                  <ChevronDown className={`size-3.5 text-text-secondary transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden"
                    >
                      {/* Header dropdown */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-pink-50 to-white dark:from-gray-800 dark:to-gray-900">
                        <p className="text-xs font-black text-text-main dark:text-white truncate">{userName}</p>
                        <p className="text-[10px] text-text-secondary dark:text-gray-400 truncate">{userEmail}</p>
                      </div>

                      {/* Menu items */}
                      <div className="p-2">
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-main dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                        >
                          <User className="size-4 text-text-secondary" />
                          Quản lý tài khoản
                        </Link>

                        <Link
                          href="/register-profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-main dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-primary transition-colors"
                        >
                          <Settings className="size-4 text-text-secondary" />
                          Cài đặt tài khoản
                        </Link>

                        <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                        >
                          <LogOut className="size-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // ===== CHƯA ĐĂNG NHẬP: Hiển thị nút Đăng nhập / Đăng ký =====
              <>
                <Link href="/login?tab=login" className="flex h-10 items-center justify-center rounded-lg bg-accent-bg px-5 text-sm font-bold text-text-main transition-colors hover:bg-pink-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                  Đăng nhập
                </Link>
                <Link href="/login?tab=register" className="flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark">
                  Đăng ký
                </Link>
              </>
            )}
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
                {session ? (
                  // Mobile: đã đăng nhập
                  <>
                    <div className="flex items-center gap-3 py-2">
                      <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ec297b] to-[#c2185f] text-white text-sm font-black">
                        {session.user?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={session.user.image} alt={userName} className="size-9 rounded-full object-cover" />
                        ) : (
                          avatarInitial
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-main dark:text-white">{userName}</p>
                        <p className="text-xs text-text-secondary dark:text-gray-400">{userEmail}</p>
                      </div>
                    </div>
                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="w-full h-10 rounded-lg bg-accent-bg text-sm font-bold text-text-main dark:bg-gray-800 dark:text-white flex items-center justify-center gap-2">
                      <User className="size-4" /> Quản lý tài khoản
                    </Link>
                    <button onClick={handleSignOut} className="w-full h-10 rounded-lg border border-red-200 dark:border-red-900/50 text-sm font-bold text-red-500 flex items-center justify-center gap-2 cursor-pointer">
                      <LogOut className="size-4" /> Đăng xuất
                    </button>
                  </>
                ) : (
                  // Mobile: chưa đăng nhập
                  <>
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
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
