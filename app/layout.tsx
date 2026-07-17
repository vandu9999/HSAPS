import type {Metadata} from 'next';
import { Manrope } from 'next/font/google';
import './globals.css'; // Global styles
import ConditionalLayout from '@/components/ConditionalLayout';
import Providers from '@/components/Providers';

const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
  description: 'Kết nối chuyên gia, phát triển khoa học và thiết lập tiêu chuẩn vàng trong y học thẩm mỹ.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${manrope.variable}`}>
      <body className="bg-background-light dark:bg-background-dark text-text-main dark:text-white antialiased font-sans" suppressHydrationWarning>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
