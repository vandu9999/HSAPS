import HomepageClient from '@/components/HomepageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
  description: 'Website chính thức của Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh (HSAPS). Kết nối chuyên gia y học thẩm mỹ, công bố bài báo khoa học và thiết lập các tiêu chuẩn vàng chuyên môn.',
};

export default function Home() {
  return (
    <>
      <HomepageClient />
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            '@id': 'https://hsaps.org.vn/#organization',
            name: 'Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
            alternateName: ['HSAPS', 'Ho Chi Minh City Society of Aesthetic Plastic Surgery'],
            url: 'https://hsaps.org.vn',
            logo: 'https://hsaps.org.vn/logo.png',
            description: 'Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh (HSAPS) là tổ chức phi lợi nhuận của các chuyên gia y học thẩm mỹ nhằm nâng cao kỹ năng chuyên môn, nghiên cứu khoa học y học và đảm bảo các tiêu chuẩn an toàn trong phẫu thuật thẩm mỹ.',
            address: { '@type': 'PostalAddress', addressLocality: 'Thành phố Hồ Chí Minh', addressCountry: 'VN' },
            contactPoint: { '@type': 'ContactPoint', telephone: '', contactType: 'customer service', email: 'contact@hsaps.org.vn' },
            sameAs: ['https://www.facebook.com/hsaps.org.vn'],
          }),
        }}
      />
    </>
  );
}
