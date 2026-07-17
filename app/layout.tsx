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
  metadataBase: new URL('https://hsaps.org.vn'),
  title: {
    default: 'HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
    template: '%s | HSAPS'
  },
  description: 'Website chính thức của Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh (HSAPS). Nơi kết nối chuyên gia y học thẩm mỹ, công bố bài báo khoa học y học và thiết lập các tiêu chuẩn vàng chuyên môn.',
  keywords: [
    'HSAPS',
    'Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
    'Ho Chi Minh City Society of Aesthetic Plastic Surgery',
    'phẫu thuật thẩm mỹ',
    'phẫu thuật tạo hình',
    'y học thẩm mỹ',
    'bác sĩ thẩm mỹ uy tín',
    'bài báo khoa học thẩm mỹ',
    'đào tạo y khoa liên tục',
    'LMS thẩm mỹ'
  ],
  authors: [{ name: 'HSAPS Board' }],
  creator: 'HSAPS',
  publisher: 'Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
    description: 'Kết nối chuyên gia, phát triển khoa học và thiết lập tiêu chuẩn vàng trong y học thẩm mỹ.',
    url: 'https://hsaps.org.vn',
    siteName: 'HSAPS Portal',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
    description: 'Nâng cao chất lượng chuyên môn và đạo đức nghề nghiệp trong y học thẩm mỹ.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
