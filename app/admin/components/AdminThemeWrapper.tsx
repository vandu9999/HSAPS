'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import {
  BarChart3, Bell, Clock, Sun, Moon,
} from 'lucide-react';

// ─── Global Admin Top Bar ─────────────────────────────────────────────────────

function GlobalTopBar({
  theme,
  toggleTheme,
}: {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const timeStr = time.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.05] bg-[#0d1117]/90 px-6 backdrop-blur-2xl">
      {/* Left: branding */}
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#ec297b] to-[#c2185f] shadow shadow-pink-500/30">
          <BarChart3 className="size-3.5 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">
            HSAPS
          </p>
          <p className="text-xs font-bold text-white leading-tight">Admin Portal</p>
        </div>
      </div>

      {/* Right: toolbar */}
      <div className="flex items-center gap-2">
        {/* Live clock */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-white/[0.05] bg-white/[0.03] px-3 py-1.5">
          <Clock className="size-3 text-white/30" />
          <span className="font-mono text-[11px] text-white/40">{timeStr}</span>
        </div>

        {/* System online */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[11px] font-semibold text-emerald-400">Online</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Chuyển sáng' : 'Chuyển tối'}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
        >
          {theme === 'dark' ? (
            <Sun className="size-3.5 text-amber-400" />
          ) : (
            <Moon className="size-3.5" />
          )}
        </button>

        {/* Notification */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
          <Bell className="size-3.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#ec297b]" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-white/[0.06]" />

        {/* Account dropdown */}
        <AdminHeader />
      </div>
    </header>
  );
}

// ─── Theme Wrapper ────────────────────────────────────────────────────────────

export default function AdminThemeWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cms_admin_theme');
    setTheme(saved === 'light' ? 'light' : 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('cms_admin_theme', next);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-[#0d1117] font-sans">
        <div className="fixed left-0 top-0 h-screen w-64 border-r border-white/[0.06] bg-[#080c10]" />
        <div className="ml-64 flex flex-1 flex-col">
          <div className="h-14 border-b border-white/[0.05] bg-[#0d1117]/90" />
          <main className="flex-1 overflow-auto" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen font-sans transition-colors duration-300 ${
        theme === 'light' ? 'light-theme bg-[#f8fafc]' : 'bg-[#080c10] dark'
      }`}
    >
      {/* Sidebar */}
      <AdminSidebar theme={theme} toggleTheme={toggleTheme} />

      {/* Main area */}
      <div className="ml-64 flex flex-1 flex-col min-w-0">
        {/* Global persistent header */}
        <GlobalTopBar theme={theme} toggleTheme={toggleTheme} />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
