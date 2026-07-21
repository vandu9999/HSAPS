'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoHeaderFooter = pathname?.startsWith('/admin') || pathname === '/login';

  if (isNoHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="pb-14 lg:pb-0">
        {children}
      </div>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
