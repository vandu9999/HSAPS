/**
 * useCmsData – reads homepage CMS content saved by the admin panel.
 * Falls back to DEFAULT_DATA if nothing is saved in localStorage yet.
 *
 * Usage (Server Component → Client boundary):
 *   In a Client Component:  const cms = useCmsData();
 */

'use client';

import { useEffect, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type CmsHero = {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  eventBadgeTitle: string;
  eventBadgeDate: string;
  btn1Text: string;
  btn2Text: string;
};

export type CmsStats = {
  stat1Value: string; stat1Label: string;
  stat2Value: string; stat2Label: string;
  stat3Value: string; stat3Label: string;
};

export type CmsActivities = {
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    id: string;
    icon: string;
    iconColor: 'pink' | 'amber';
    title: string;
    description: string;
    linkText: string;
  }[];
};

export type CmsEvents = { sectionTitle: string; note: string; };
export type CmsNews = {
  sectionTitle: string;
  items: {
    id: string; imageUrl: string; imageAlt: string;
    category: string; categoryColor: string; date: string;
    title: string; description: string;
  }[];
};

export type CmsCta = {
  title: string; description: string; btn1Text: string; btn2Text: string;
};

export type CmsOrganizations = {
  sectionTitle: string;
  items: { id: string; name: string; logoUrl: string; }[];
};

export type CmsPartners = { sectionTitle: string; note: string; };

export type CmsData = {
  hero: CmsHero;
  stats: CmsStats;
  activities: CmsActivities;
  events: CmsEvents;
  news: CmsNews;
  cta: CmsCta;
  organizations: CmsOrganizations;
  partners: CmsPartners;
};

// ─── Defaults (mirror what admin CMS stores) ──────────────────────────────────
const DEFAULT_CMS: CmsData = {
  hero: {
    badge: 'Hội nghị thường niên 2024 sắp diễn ra',
    title: 'Hội Phẫu thuật Thẩm mỹ',
    titleHighlight: 'TP. Hồ Chí Minh',
    description: 'Kết nối chuyên gia, phát triển khoa học và thiết lập tiêu chuẩn vàng trong y học thẩm mỹ. Chúng tôi cam kết nâng cao chất lượng chuyên môn và đạo đức nghề nghiệp.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg_M1QqpsqHCiiFhJe4wr_ONf116fKj6vJI9ZO1saSahiRj_Dkp7uqG4fG5tS9OBfUIYfdJkyO_EqcC23AIwc9PpZO8rsygLSs32_lsB1g-9TJnU1O0U3lDY0wMCn30jHGn4DzMTMFFwaWIs3omXENizDxcQCGeD73v8ie1Lr6wmFu8pB67MzCQ2wEoZIIpaYDNZiwCCUVBPmONzfw63Q8QkPQpdZpWVXjJf35xSTEPL5Lo1jtx59t2lWzND4cF2GZvhFBGAlyDVY',
    imageAlt: 'Group of surgeons in operating room discussing procedure',
    eventBadgeTitle: 'Hội nghị Khoa học Quốc tế HSAPS 2024',
    eventBadgeDate: '20/12/2024 • GEM Center',
    btn1Text: 'Đăng ký Hội viên',
    btn2Text: 'Tìm hiểu thêm',
  },
  stats: {
    stat1Value: '500+', stat1Label: 'Hội viên chính thức',
    stat2Value: '15+', stat2Label: 'Năm thành lập',
    stat3Value: '1k+', stat3Label: 'Bài báo khoa học',
  },
  activities: {
    sectionTitle: 'Lĩnh vực hoạt động',
    sectionDescription: 'HSAPS định hướng phát triển toàn diện ngành phẫu thuật thẩm mỹ thông qua các hoạt động nghiên cứu khoa học, đào tạo liên tục và kết nối chuyên gia.',
    cards: [
      { id: 'a1', icon: 'Calendar', iconColor: 'pink', title: '1. Hội nghị khoa học', description: 'Diễn đàn thường niên quy tụ hàng trăm chuyên gia đầu ngành trong và ngoài nước để chia sẻ báo cáo, kinh nghiệm thực tiễn.', linkText: 'Xem sự kiện' },
      { id: 'a2', icon: 'BookOpen', iconColor: 'amber', title: '2. Tạp chí Y khoa', description: 'Ấn phẩm khoa học chuyên ngành thẩm mỹ uy tín, công bố các nghiên cứu lâm sàng, bài viết học thuật chất lượng.', linkText: 'Đọc tạp chí' },
      { id: 'a3', icon: 'GraduationCap', iconColor: 'pink', title: '3. Đào tạo liên tục (CME)', description: 'Các lớp học cập nhật kiến thức liên tục và đào tạo chuyên sâu cấp chứng chỉ CME, đáp ứng các tiêu chuẩn khắt khe.', linkText: 'Tham gia khóa học' },
      { id: 'a4', icon: 'FileText', iconColor: 'amber', title: '4. Báo cáo khoa học', description: 'Tổng hợp đề tài sáng kiến y học đột phá, báo cáo ca lâm sàng điển hình và các cải tiến kỹ thuật thực tiễn.', linkText: 'Xem báo cáo' },
    ],
  },
  events: { sectionTitle: 'Sự kiện nổi bật', note: '' },
  news: {
    sectionTitle: 'Tin tức Y khoa',
    items: [
      { id: 'n1', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800', imageAlt: 'Scientific publications review', category: 'Báo cáo', categoryColor: 'primary', date: '10 Tháng 11, 2024', title: 'Thông báo về việc nộp bài báo khoa học quý IV/2024', description: 'Ban biên soạn tạp chí HSAPS chính thức tiếp nhận các công trình nghiên cứu và bài báo khoa học chuẩn bị xuất bản số cuối năm.' },
      { id: 'n2', imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800', imageAlt: 'Medical collaboration agreement', category: 'Hợp tác quốc tế', categoryColor: 'yellow', date: '05 Tháng 11, 2024', title: 'Lễ ký kết hợp tác chiến lược với Hội Phẫu thuật thẩm mỹ Hàn Quốc (KAPS)', description: 'Sự kiện đánh dấu cột mốc quan trọng trong trao đổi học thuật, chuyển giao công nghệ và công nhận tín chỉ CME song phương.' },
      { id: 'n3', imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800', imageAlt: 'Safety in medical practice', category: 'Khuyến cáo', categoryColor: 'primary', date: '01 Tháng 11, 2024', title: 'Hướng dẫn lâm sàng về phòng ngừa biến chứng tiêm chất làm đầy (Filler)', description: 'Khuyến cáo đồng thuận mới nhất của Hội đồng Y khoa HSAPS nhằm tăng cường tính an toàn và giảm thiểu rủi ro trong thẩm mỹ nội khoa.' },
      { id: 'n4', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', imageAlt: 'International medical conference delegates', category: 'Hoạt động Hội', categoryColor: 'yellow', date: '28 Tháng 10, 2024', title: 'Đoàn đại biểu HSAPS tham dự Hội nghị Thẩm mỹ Quốc tế IMCAS Châu Á', description: 'Đoàn chuyên gia hàng đầu Việt Nam báo cáo các chuyên đề khoa học và chia sẻ những kỹ thuật tạo hình thẩm mỹ đặc trưng khu vực.' },
    ],
  },
  cta: {
    title: 'Trở thành thành viên của HSAPS',
    description: 'Tham gia cùng chúng tôi để tiếp cận các cơ hội học tập, kết nối với các chuyên gia hàng đầu và nâng cao uy tín nghề nghiệp của bạn.',
    btn1Text: 'Đăng ký ngay',
    btn2Text: 'Liên hệ tư vấn',
  },
  organizations: {
    sectionTitle: 'Liên kết của chúng tôi',
    items: [
      { id: 'o1', name: 'Đại học Y Dược TP.HCM', logoUrl: '' },
      { id: 'o2', name: 'ĐH Y khoa Phạm Ngọc Thạch', logoUrl: '' },
      { id: 'o3', name: 'ASEAN Congress of Plastic Surgery', logoUrl: '' },
      { id: 'o4', name: 'OSAPS (Aesthetic Plastic Surgery)', logoUrl: '' },
      { id: 'o5', name: 'BV Đại học Y Dược Cần Thơ', logoUrl: '' },
      { id: 'o6', name: 'Đại học Y Dược Cần Thơ', logoUrl: '' },
      { id: 'o7', name: 'Hội Phẫu thuật Thẩm mỹ TP.HCM', logoUrl: '' },
      { id: 'o8', name: 'VAPS / VSAPS Việt Nam', logoUrl: '' },
    ],
  },
  partners: { sectionTitle: 'Đối tác', note: '' },
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
const CMS_KEY = 'cms_trang_chu_v2';

export function useCmsData(): CmsData {
  const [data, setData] = useState<CmsData>(DEFAULT_CMS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CMS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<CmsData>;
        // Deep-merge: saved data overrides defaults
        setData(prev => ({
          hero: { ...prev.hero, ...(parsed.hero || {}) },
          stats: { ...prev.stats, ...(parsed.stats || {}) },
          activities: {
            ...prev.activities,
            ...(parsed.activities || {}),
            cards: parsed.activities?.cards?.length
              ? parsed.activities.cards
              : prev.activities.cards,
          },
          events: { ...prev.events, ...(parsed.events || {}) },
          news: {
            ...prev.news,
            ...(parsed.news || {}),
            items: parsed.news?.items?.length
              ? parsed.news.items
              : prev.news.items,
          },
          cta: { ...prev.cta, ...(parsed.cta || {}) },
          organizations: {
            ...prev.organizations,
            ...(parsed.organizations || {}),
            items: parsed.organizations?.items?.length
              ? parsed.organizations.items
              : prev.organizations.items,
          },
          partners: { ...prev.partners, ...(parsed.partners || {}) },
        }));
      }
    } catch {
      // localStorage unavailable or parse error → use defaults
    }
  }, []);

  return data;
}

export { DEFAULT_CMS };
