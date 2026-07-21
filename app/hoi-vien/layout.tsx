import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quyền lợi Hội viên | HSAPS',
  description:
    'Khám phá toàn bộ 9 quyền lợi dành cho Hội viên HSAPS: nâng cao chuyên môn, bảo vệ pháp lý, kết nối cộng đồng và quyền đóng góp xây dựng ngành phẫu thuật thẩm mỹ.',
  keywords: [
    'hội viên HSAPS',
    'đăng ký hội viên phẫu thuật thẩm mỹ',
    'quyền lợi hội viên',
    'CME phẫu thuật thẩm mỹ',
    'hội nghị khoa học thẩm mỹ',
    'bảo vệ hành nghề bác sĩ',
  ],
  openGraph: {
    title: 'Trở thành Hội viên HSAPS – Đặc quyền chuyên gia hàng đầu',
    description: '9 đặc quyền toàn diện: học thuật, pháp lý, kết nối và đóng góp định hướng ngành.',
    url: 'https://hsaps.org.vn/hoi-vien',
    type: 'website',
  },
};

export default function HoiVienLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
