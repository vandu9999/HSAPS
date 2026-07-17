'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminThemeWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cms_admin_theme');
    if (saved === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light'); // default is light (white) as requested
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('cms_admin_theme', next);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-[#f8fafc] font-sans light-theme">
        <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200" />
        <div className="flex-1 flex flex-col min-w-0 ml-64">
          <main className="flex-1 overflow-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-200 ${theme === 'light' ? 'light-theme bg-[#f8fafc]' : 'bg-[#0d1117] dark'}`}>
      <AdminSidebar theme={theme} toggleTheme={toggleTheme} />
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
