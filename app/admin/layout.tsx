import type { Metadata } from 'next';
import AdminThemeWrapper from './components/AdminThemeWrapper';

export const metadata: Metadata = {
  title: 'HSAPS Admin - Quản trị nội dung',
  description: 'Hệ thống quản trị nội dung HSAPS',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeWrapper>
      {children}
    </AdminThemeWrapper>
  );
}
