'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Save, ImageIcon, Home, Megaphone, BarChart3, RefreshCw, ExternalLink,
  Newspaper, CalendarDays, Grid3X3, Handshake, Users, Eye, Plus,
  Trash2, GripVertical, Check, AlertCircle, ArrowUpRight, ChevronDown, ChevronUp,
  BookOpen, Layout, Star,
} from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import ImageUploadField from '../components/ImageUploadField';

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivityCard = {
  id: string;
  icon: string;
  iconColor: 'pink' | 'amber';
  title: string;
  description: string;
  linkText: string;
};

type NewsItem = {
  id: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  description: string;
};

type OrgLogoItem = {
  id: string;
  name: string;
  logoUrl: string;
};

type PartnerItem = {
  id: string;
  name: string;
  logoUrl: string;
  href: string;
};

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
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
    ] as ActivityCard[],
  },
  events: {
    sectionTitle: 'Sự kiện nổi bật',
    note: 'Sự kiện được lấy động từ module Quản lý Sự kiện. Bạn có thể chỉnh sửa tiêu đề section tại đây.',
  },
  news: {
    sectionTitle: 'Tin tức Y khoa',
    items: [
      { id: 'n1', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800', imageAlt: 'Scientific publications review', category: 'Báo cáo', categoryColor: 'primary', date: '10 Tháng 11, 2024', title: 'Thông báo về việc nộp bài báo khoa học quý IV/2024', description: 'Ban biên soạn tạp chí HSAPS chính thức tiếp nhận các công trình nghiên cứu và bài báo khoa học chuẩn bị xuất bản số cuối năm.' },
      { id: 'n2', imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800', imageAlt: 'Medical collaboration agreement', category: 'Hợp tác quốc tế', categoryColor: 'yellow', date: '05 Tháng 11, 2024', title: 'Lễ ký kết hợp tác chiến lược với Hội Phẫu thuật thẩm mỹ Hàn Quốc (KAPS)', description: 'Sự kiện đánh dấu cột mốc quan trọng trong trao đổi học thuật, chuyển giao công nghệ và công nhận tín chỉ CME song phương.' },
      { id: 'n3', imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800', imageAlt: 'Safety in medical practice', category: 'Khuyến cáo', categoryColor: 'primary', date: '01 Tháng 11, 2024', title: 'Hướng dẫn lâm sàng về phòng ngừa biến chứng tiêm chất làm đầy (Filler)', description: 'Khuyến cáo đồng thuận mới nhất của Hội đồng Y khoa HSAPS nhằm tăng cường tính an toàn và giảm thiểu rủi ro trong thẩm mỹ nội khoa.' },
      { id: 'n4', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', imageAlt: 'International medical conference delegates', category: 'Hoạt động Hội', categoryColor: 'yellow', date: '28 Tháng 10, 2024', title: 'Đoàn đại biểu HSAPS tham dự Hội nghị Thẩm mỹ Quốc tế IMCAS Châu Á', description: 'Đoàn chuyên gia hàng đầu Việt Nam báo cáo các chuyên đề khoa học và chia sẻ những kỹ thuật tạo hình thẩm mỹ đặc trưng khu vực.' },
    ] as NewsItem[],
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
    ] as OrgLogoItem[],
  },
  partners: {
    sectionTitle: 'Đối tác',
    note: 'Danh sách đối tác được quản lý trong module Đối tác riêng. Bạn có thể chỉnh sửa tiêu đề section tại đây.',
  },
};

// ─── Reusable UI Components ───────────────────────────────────────────────────

function TextField({ label, value, onChange, multiline = false, rows = 3, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number; hint?: string;
}) {
  const base = 'w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all resize-none';
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-white/60 uppercase tracking-wider">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={base} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={base} />}
      {hint && <p className="text-[10px] text-white/30">{hint}</p>}
    </div>
  );
}

function SectionHeader({ icon: Icon, label, color = 'text-[#ec297b]' }: { icon: any; label: string; color?: string }) {
  return (
    <h3 className={`flex items-center gap-2 text-sm font-bold text-white/90 border-b border-white/[0.06] pb-3 mb-5 ${color}`}>
      <Icon className="size-4" />
      {label}
    </h3>
  );
}

function PreviewBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
      <Eye className="size-2.5" /> Preview
    </span>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 ${className}`}>
      {children}
    </div>
  );
}

// ─── Tabs Definition ──────────────────────────────────────────────────────────

const TABS = [
  { id: 'hero', label: 'Hero Banner', icon: Home, color: 'text-pink-400' },
  { id: 'stats', label: 'Thống kê', icon: BarChart3, color: 'text-violet-400' },
  { id: 'activities', label: 'Lĩnh vực HĐ', icon: Grid3X3, color: 'text-sky-400' },
  { id: 'events', label: 'Sự kiện', icon: CalendarDays, color: 'text-amber-400' },
  { id: 'news', label: 'Tin tức', icon: Newspaper, color: 'text-rose-400' },
  { id: 'cta', label: 'CTA Section', icon: Megaphone, color: 'text-emerald-400' },
  { id: 'organizations', label: 'Liên kết', icon: Users, color: 'text-blue-400' },
  { id: 'partners', label: 'Đối tác', icon: Handshake, color: 'text-orange-400' },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TrangChuCMS() {
  const [activeTab, setActiveTab] = useState('hero');
  const [data, setData] = useState(DEFAULT_DATA);
  const [expandedNews, setExpandedNews] = useState<string | null>(null);
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('cms_trang_chu_v2');
    if (saved) { try { setData(JSON.parse(saved)); } catch {} }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cms_trang_chu_v2', JSON.stringify(data));
    showToast('✅ Đã lưu nội dung trang chủ thành công!', 'success');
  };

  const handleReset = () => {
    setData(DEFAULT_DATA);
    localStorage.removeItem('cms_trang_chu_v2');
    showToast('Đã khôi phục dữ liệu mặc định', 'success');
  };

  const updateHero = useCallback((key: string, value: string) =>
    setData(d => ({ ...d, hero: { ...d.hero, [key]: value } })), []);

  const updateStats = useCallback((key: string, value: string) =>
    setData(d => ({ ...d, stats: { ...d.stats, [key]: value } })), []);

  const updateActivities = useCallback((key: string, value: any) =>
    setData(d => ({ ...d, activities: { ...d.activities, [key]: value } })), []);

  const updateActivityCard = useCallback((id: string, key: string, value: string) =>
    setData(d => ({
      ...d, activities: {
        ...d.activities,
        cards: d.activities.cards.map(c => c.id === id ? { ...c, [key]: value } : c),
      }
    })), []);

  const updateEvents = useCallback((key: string, value: string) =>
    setData(d => ({ ...d, events: { ...d.events, [key]: value } })), []);

  const updateNews = useCallback((key: string, value: any) =>
    setData(d => ({ ...d, news: { ...d.news, [key]: value } })), []);

  const updateNewsItem = useCallback((id: string, key: string, value: string) =>
    setData(d => ({
      ...d, news: {
        ...d.news,
        items: d.news.items.map(n => n.id === id ? { ...n, [key]: value } : n),
      }
    })), []);

  const addNewsItem = useCallback(() => {
    const newItem: NewsItem = { id: `n${Date.now()}`, imageUrl: '', imageAlt: '', category: 'Tin tức', categoryColor: 'primary', date: '', title: '', description: '' };
    setData(d => ({ ...d, news: { ...d.news, items: [...d.news.items, newItem] } }));
    setExpandedNews(newItem.id);
  }, []);

  const removeNewsItem = useCallback((id: string) => {
    setData(d => ({ ...d, news: { ...d.news, items: d.news.items.filter(n => n.id !== id) } }));
  }, []);

  const updateCta = useCallback((key: string, value: string) =>
    setData(d => ({ ...d, cta: { ...d.cta, [key]: value } })), []);

  const updateOrganizations = useCallback((key: string, value: any) =>
    setData(d => ({ ...d, organizations: { ...d.organizations, [key]: value } })), []);

  const updateOrgItem = useCallback((id: string, key: string, value: string) =>
    setData(d => ({
      ...d, organizations: {
        ...d.organizations,
        items: d.organizations.items.map(o => o.id === id ? { ...o, [key]: value } : o),
      }
    })), []);

  const addOrgItem = useCallback(() => {
    const newItem: OrgLogoItem = { id: `o${Date.now()}`, name: '', logoUrl: '' };
    setData(d => ({ ...d, organizations: { ...d.organizations, items: [...d.organizations.items, newItem] } }));
    setExpandedOrg(newItem.id);
  }, []);

  const removeOrgItem = useCallback((id: string) => {
    setData(d => ({ ...d, organizations: { ...d.organizations, items: d.organizations.items.filter(o => o.id !== id) } }));
  }, []);

  const updatePartners = useCallback((key: string, value: string) =>
    setData(d => ({ ...d, partners: { ...d.partners, [key]: value } })), []);

  const activeTabInfo = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">

      {/* ── Sticky Top Bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/90 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ec297b] to-[#c2185f] shadow shadow-pink-500/30">
                <Layout className="size-4 text-white" />
              </div>
              Quản lý Nội dung Trang chủ
            </h1>
            <p className="text-xs text-white/40 mt-0.5 ml-11">Chỉnh sửa từng section • Hình ảnh • Văn bản • Liên kết</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <Eye className="size-3.5" />
              Xem trang chủ
              <ArrowUpRight className="size-3" />
            </Link>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <RefreshCw className="size-3.5" />
              Đặt lại
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
            >
              <Save className="size-3.5" />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">

        {/* ── Section Overview Map ────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 p-4 rounded-2xl bg-[#161b22] border border-white/[0.06]">
          {TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 text-center transition-all ${
                  isActive
                    ? 'bg-[#ec297b]/15 border border-[#ec297b]/30 text-white'
                    : 'text-white/40 hover:bg-white/[0.04] hover:text-white/70 border border-transparent'
                }`}
              >
                <Icon className={`size-4 ${isActive ? tab.color : ''}`} />
                <span className="text-[9px] font-bold uppercase tracking-wider leading-tight">{tab.label}</span>
                <span className={`text-[8px] font-mono rounded-full px-1.5 py-0.5 ${isActive ? 'bg-[#ec297b]/20 text-[#ec297b]' : 'bg-white/5 text-white/20'}`}>
                  #{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ─────────────────────────────────────────────────────── */}

        {/* ① HERO BANNER ─────────────────────────────────────────────────────── */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Text Fields */}
              <Card>
                <SectionHeader icon={Home} label="Văn bản Hero Banner" />
                <div className="space-y-4">
                  <TextField label="🏷 Badge thông báo" value={data.hero.badge} onChange={v => updateHero('badge', v)} hint="Dòng text nhỏ hiển thị trên tiêu đề chính" />
                  <div className="grid grid-cols-1 gap-3">
                    <TextField label="📝 Tiêu đề chính (H1)" value={data.hero.title} onChange={v => updateHero('title', v)} />
                    <TextField label="✨ Phần tiêu đề nổi bật (màu hồng)" value={data.hero.titleHighlight} onChange={v => updateHero('titleHighlight', v)} hint="Phần này sẽ hiển thị màu hồng (primary) dưới tiêu đề" />
                  </div>
                  <TextField label="📋 Mô tả (Paragraph)" value={data.hero.description} onChange={v => updateHero('description', v)} multiline rows={4} />
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="🎯 Nút CTA chính" value={data.hero.btn1Text} onChange={v => updateHero('btn1Text', v)} />
                    <TextField label="🔘 Nút CTA phụ" value={data.hero.btn2Text} onChange={v => updateHero('btn2Text', v)} />
                  </div>
                  <div className="pt-2 border-t border-white/[0.06]">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3">Badge Sự kiện nổi bật (trên ảnh)</p>
                    <div className="grid grid-cols-2 gap-3">
                      <TextField label="Tên sự kiện" value={data.hero.eventBadgeTitle} onChange={v => updateHero('eventBadgeTitle', v)} />
                      <TextField label="Ngày & địa điểm" value={data.hero.eventBadgeDate} onChange={v => updateHero('eventBadgeDate', v)} />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Right: Image + Preview */}
              <div className="space-y-5">
                <Card>
                  <SectionHeader icon={ImageIcon} label="Hình ảnh Hero Banner" />
                  <div className="space-y-4">
                    <ImageUploadField
                      label="Ảnh chính (cột phải trang chủ)"
                      value={data.hero.imageUrl}
                      onChange={v => updateHero('imageUrl', v)}
                      recommendedSize="1200 × 900 px (Tỷ lệ 4:3) – Khuyến nghị"
                    />
                    <TextField label="Alt text (SEO & Accessibility)" value={data.hero.imageAlt} onChange={v => updateHero('imageAlt', v)} hint="Mô tả ảnh để tối ưu SEO và hỗ trợ người dùng khiếm thị" />
                  </div>
                </Card>
                {/* Live Preview */}
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-white/80">Xem trước ảnh</h4>
                    <PreviewBadge text="Preview" />
                  </div>
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-white/5 border border-white/5">
                    {data.hero.imageUrl ? (
                      <>
                        <img src={data.hero.imageUrl} alt={data.hero.imageAlt} className="w-full h-full object-cover" />
                        {/* Event badge overlay */}
                        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl bg-white/95 p-3 backdrop-blur shadow-lg border-l-4 border-yellow-500">
                          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Sự kiện sắp tới</p>
                          <p className="text-xs font-bold text-gray-800 mt-0.5 line-clamp-1">{data.hero.eventBadgeTitle || 'Tên sự kiện...'}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{data.hero.eventBadgeDate || 'Ngày & địa điểm...'}</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-3 text-white/20">
                        <ImageIcon className="size-10" />
                        <p className="text-xs">Nhập URL hoặc tải ảnh lên để xem preview</p>
                      </div>
                    )}
                  </div>
                  {/* Text preview */}
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.04]">
                    <span className="inline-block rounded-full bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 text-[10px] font-bold text-pink-400 mb-2">{data.hero.badge || 'Badge...'}</span>
                    <h4 className="text-base font-extrabold text-white leading-tight">
                      {data.hero.title || 'Tiêu đề...'}{' '}
                      <span className="text-[#ec297b]">{data.hero.titleHighlight || 'Nổi bật...'}</span>
                    </h4>
                    <p className="text-xs text-white/50 mt-1 line-clamp-2">{data.hero.description || 'Mô tả...'}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="rounded-lg bg-[#ec297b] px-3 py-1 text-[10px] font-bold text-white">{data.hero.btn1Text}</span>
                      <span className="rounded-lg border border-white/20 px-3 py-1 text-[10px] font-bold text-white/70">{data.hero.btn2Text}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ② THỐNG KÊ ─────────────────────────────────────────────────────────── */}
        {activeTab === 'stats' && (
          <div className="max-w-2xl space-y-5">
            <Card>
              <SectionHeader icon={BarChart3} label="Số liệu thống kê (Dưới Hero Banner)" color="text-violet-400" />
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <TextField
                      label={`📊 Số liệu ${i}`}
                      value={(data.stats as Record<string, string>)[`stat${i}Value`]}
                      onChange={v => updateStats(`stat${i}Value`, v)}
                      hint="Ví dụ: 500+, 15+"
                    />
                    <TextField
                      label={`🏷 Nhãn ${i}`}
                      value={(data.stats as Record<string, string>)[`stat${i}Label`]}
                      onChange={v => updateStats(`stat${i}Label`, v)}
                      hint="Ví dụ: Hội viên chính thức"
                    />
                  </div>
                ))}
              </div>
            </Card>
            {/* Preview */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white/70">Preview section thống kê</h4>
                <PreviewBadge text="Preview" />
              </div>
              <div className="flex items-center gap-8 justify-center py-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="text-center">
                    <p className="text-3xl font-black text-white">{(data.stats as Record<string, string>)[`stat${i}Value`]}</p>
                    <p className="text-xs text-white/40 mt-1">{(data.stats as Record<string, string>)[`stat${i}Label`]}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ③ LĨNH VỰC HOẠT ĐỘNG ──────────────────────────────────────────────── */}
        {activeTab === 'activities' && (
          <div className="space-y-5">
            <Card>
              <SectionHeader icon={Grid3X3} label="Tiêu đề Section Lĩnh vực hoạt động" color="text-sky-400" />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Tiêu đề section (H2)" value={data.activities.sectionTitle} onChange={v => updateActivities('sectionTitle', v)} />
                <TextField label="Mô tả section" value={data.activities.sectionDescription} onChange={v => updateActivities('sectionDescription', v)} multiline rows={3} />
              </div>
            </Card>

            <div className="space-y-3">
              <p className="text-xs font-bold text-white/50 uppercase tracking-widest px-1">4 thẻ hoạt động</p>
              {data.activities.cards.map((card, idx) => {
                const isExpanded = expandedActivity === card.id;
                return (
                  <Card key={card.id} className="!p-0 overflow-hidden">
                    <button
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-all"
                      onClick={() => setExpandedActivity(isExpanded ? null : card.id)}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 font-black text-sm">{idx + 1}</div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-white">{card.title || `Thẻ hoạt động ${idx + 1}`}</p>
                        <p className="text-xs text-white/40 mt-0.5 line-clamp-1">{card.description}</p>
                      </div>
                      {isExpanded ? <ChevronUp className="size-4 text-white/30" /> : <ChevronDown className="size-4 text-white/30" />}
                    </button>
                    {isExpanded && (
                      <div className="border-t border-white/[0.06] p-5 grid grid-cols-2 gap-4">
                        <TextField label="Tiêu đề thẻ" value={card.title} onChange={v => updateActivityCard(card.id, 'title', v)} />
                        <TextField label="Văn bản liên kết" value={card.linkText} onChange={v => updateActivityCard(card.id, 'linkText', v)} />
                        <div className="col-span-2">
                          <TextField label="Mô tả thẻ" value={card.description} onChange={v => updateActivityCard(card.id, 'description', v)} multiline rows={3} />
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ④ SỰ KIỆN NỔI BẬT ─────────────────────────────────────────────────── */}
        {activeTab === 'events' && (
          <div className="max-w-2xl space-y-5">
            <Card>
              <SectionHeader icon={CalendarDays} label="Section Sự kiện nổi bật" color="text-amber-400" />
              <TextField label="Tiêu đề section (H2)" value={data.events.sectionTitle} onChange={v => updateEvents('sectionTitle', v)} />
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <AlertCircle className="size-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-300">Sự kiện được lấy động từ cơ sở dữ liệu</p>
                  <p className="text-xs text-white/50 mt-1">Danh sách sự kiện được quản lý trong module <strong className="text-amber-300">Quản lý Sự kiện</strong>. Tại đây bạn chỉ cần chỉnh sửa tiêu đề section.</p>
                  <Link href="/admin/su-kien" className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-400 transition-all">
                    Đến module Sự kiện
                    <ExternalLink className="size-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ⑤ TIN TỨC Y KHOA ──────────────────────────────────────────────────── */}
        {activeTab === 'news' && (
          <div className="space-y-5">
            <Card>
              <SectionHeader icon={Newspaper} label="Tiêu đề Section Tin tức Y khoa" color="text-rose-400" />
              <TextField label="Tiêu đề section (H2)" value={data.news.sectionTitle} onChange={v => updateNews('sectionTitle', v)} />
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{data.news.items.length} bài tin tức trên trang chủ</p>
                <button
                  onClick={addNewsItem}
                  className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-400 transition-all"
                >
                  <Plus className="size-3.5" /> Thêm bài tin
                </button>
              </div>
              {data.news.items.map((item, idx) => {
                const isExpanded = expandedNews === item.id;
                return (
                  <Card key={item.id} className="!p-0 overflow-hidden">
                    {/* Accordion Header */}
                    <div className="flex items-center gap-3 p-4">
                      <button
                        className="flex-1 flex items-center gap-3 hover:opacity-80 transition-opacity"
                        onClick={() => setExpandedNews(isExpanded ? null : item.id)}
                      >
                        <div className="size-12 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/5">
                          {item.imageUrl
                            ? <img src={item.imageUrl} alt={item.imageAlt} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="size-5 text-white/20" /></div>}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[9px] font-bold text-rose-400 uppercase">{item.category || 'Chưa có loại'}</span>
                            <span className="text-[10px] text-white/30">{item.date || 'Chưa có ngày'}</span>
                          </div>
                          <p className="text-sm font-bold text-white line-clamp-1">{item.title || 'Chưa có tiêu đề...'}</p>
                        </div>
                        {isExpanded ? <ChevronUp className="size-4 text-white/30 shrink-0" /> : <ChevronDown className="size-4 text-white/30 shrink-0" />}
                      </button>
                      <button
                        onClick={() => removeNewsItem(item.id)}
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                        title="Xóa bài tin"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    {/* Expanded Edit Form */}
                    {isExpanded && (
                      <div className="border-t border-white/[0.06] p-5 space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          {/* Image Upload */}
                          <div className="space-y-3">
                            <ImageUploadField
                              label="Ảnh bài tin"
                              value={item.imageUrl}
                              onChange={v => updateNewsItem(item.id, 'imageUrl', v)}
                              recommendedSize="800 × 600 px (Tỷ lệ 4:3)"
                            />
                            <TextField label="Alt text ảnh" value={item.imageAlt} onChange={v => updateNewsItem(item.id, 'imageAlt', v)} />
                          </div>

                          {/* Text Fields */}
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <TextField
                                label="Loại bài"
                                value={item.category}
                                onChange={v => updateNewsItem(item.id, 'category', v)}
                                hint="Vd: Báo cáo, Khuyến cáo..."
                              />
                              <div className="space-y-1.5">
                                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider">Màu badge</label>
                                <select
                                  value={item.categoryColor}
                                  onChange={e => updateNewsItem(item.id, 'categoryColor', e.target.value)}
                                  className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all"
                                >
                                  <option value="primary">🩷 Hồng (primary)</option>
                                  <option value="yellow">🟡 Vàng (yellow)</option>
                                  <option value="blue">🔵 Xanh dương</option>
                                  <option value="green">🟢 Xanh lá</option>
                                </select>
                              </div>
                            </div>
                            <TextField label="📅 Ngày đăng" value={item.date} onChange={v => updateNewsItem(item.id, 'date', v)} hint="Vd: 10 Tháng 11, 2024" />
                            <TextField label="📰 Tiêu đề bài viết" value={item.title} onChange={v => updateNewsItem(item.id, 'title', v)} />
                            <TextField label="📝 Tóm tắt nội dung" value={item.description} onChange={v => updateNewsItem(item.id, 'description', v)} multiline rows={3} />
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Redirect to news module */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/15">
                  <Newspaper className="size-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Quản lý toàn bộ bài tin trong module Tin tức</p>
                  <p className="text-xs text-white/40 mt-0.5">Ở đây chỉ hiển thị bài ghim trên trang chủ. Module Tin tức có đầy đủ CRUD và xuất bản.</p>
                </div>
              </div>
              <Link href="/admin/tin-tuc" className="flex shrink-0 items-center gap-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/20 px-4 py-2 text-sm font-bold text-rose-400 transition-all">
                Module Tin tức <ExternalLink className="size-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ⑥ CTA SECTION ──────────────────────────────────────────────────────── */}
        {activeTab === 'cta' && (
          <div className="max-w-2xl space-y-5">
            <Card>
              <SectionHeader icon={Megaphone} label="Section Kêu gọi Hành động (CTA)" color="text-emerald-400" />
              <div className="space-y-4">
                <TextField label="🎯 Tiêu đề chính (H2)" value={data.cta.title} onChange={v => updateCta('title', v)} hint="Tiêu đề lớn màu trắng trên nền hồng gradient" />
                <TextField label="📋 Mô tả" value={data.cta.description} onChange={v => updateCta('description', v)} multiline rows={3} />
                <div className="grid grid-cols-2 gap-4">
                  <TextField label="🟡 Nút 1 (nổi bật – màu vàng)" value={data.cta.btn1Text} onChange={v => updateCta('btn1Text', v)} />
                  <TextField label="🔘 Nút 2 (phụ – viền trắng)" value={data.cta.btn2Text} onChange={v => updateCta('btn2Text', v)} />
                </div>
              </div>
            </Card>
            {/* Live Preview */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white/70">Preview CTA Section</h4>
                <PreviewBadge text="Preview" />
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-[#ec297b]/25 via-[#c2185f]/15 to-[#9c1ab1]/20 border border-[#ec297b]/25 p-8 text-center">
                <h4 className="text-2xl font-black text-white mb-3">{data.cta.title || 'Tiêu đề CTA...'}</h4>
                <p className="text-sm text-white/60 mb-5 max-w-md mx-auto">{data.cta.description || 'Mô tả CTA...'}</p>
                <div className="flex gap-3 justify-center">
                  <span className="rounded-xl bg-[#fcd34d] px-6 py-2.5 text-sm font-black text-[#2d1a24] shadow-lg">{data.cta.btn1Text}</span>
                  <span className="rounded-xl border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur">{data.cta.btn2Text}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ⑦ LIÊN KẾT TỔ CHỨC ───────────────────────────────────────────────── */}
        {activeTab === 'organizations' && (
          <div className="space-y-5">
            <Card>
              <SectionHeader icon={Users} label="Section Liên kết của chúng tôi" color="text-blue-400" />
              <TextField label="Tiêu đề section (H2)" value={data.organizations.sectionTitle} onChange={v => updateOrganizations('sectionTitle', v)} />
            </Card>

            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{data.organizations.items.length} tổ chức / liên kết</p>
                <button
                  onClick={addOrgItem}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-1.5 text-xs font-bold text-blue-400 transition-all"
                >
                  <Plus className="size-3.5" /> Thêm liên kết
                </button>
              </div>

              {/* Org Grid Preview */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 p-4 rounded-2xl bg-[#161b22] border border-white/[0.06]">
                {data.organizations.items.map((org) => (
                  <div key={org.id} className="flex flex-col items-center gap-1.5 text-center p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="size-12 rounded-xl bg-white/5 overflow-hidden flex items-center justify-center border border-white/10">
                      {org.logoUrl
                        ? <img src={org.logoUrl} alt={org.name} className="size-full object-cover" />
                        : <Users className="size-5 text-white/20" />}
                    </div>
                    <p className="text-[9px] text-white/50 font-medium line-clamp-2 leading-tight">{org.name || '---'}</p>
                  </div>
                ))}
              </div>

              {/* Accordion for each org */}
              {data.organizations.items.map((org, idx) => {
                const isExpanded = expandedOrg === org.id;
                return (
                  <Card key={org.id} className="!p-0 overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                      <button
                        className="flex-1 flex items-center gap-3 hover:opacity-80 transition-opacity"
                        onClick={() => setExpandedOrg(isExpanded ? null : org.id)}
                      >
                        <div className="size-10 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center">
                          {org.logoUrl
                            ? <img src={org.logoUrl} alt={org.name} className="w-full h-full object-cover" />
                            : <span className="text-sm font-black text-white/20">{idx + 1}</span>}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-bold text-white">{org.name || `Tổ chức ${idx + 1}`}</p>
                          {org.logoUrl && <p className="text-[10px] text-white/30 mt-0.5 truncate">{org.logoUrl}</p>}
                        </div>
                        {isExpanded ? <ChevronUp className="size-4 text-white/30" /> : <ChevronDown className="size-4 text-white/30" />}
                      </button>
                      <button
                        onClick={() => removeOrgItem(org.id)}
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                        title="Xóa liên kết"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="border-t border-white/[0.06] p-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <TextField label="Tên tổ chức / trường" value={org.name} onChange={v => updateOrgItem(org.id, 'name', v)} />
                        </div>
                        <div>
                          <ImageUploadField
                            label="Logo tổ chức (khuyến nghị nền trong suốt)"
                            value={org.logoUrl}
                            onChange={v => updateOrgItem(org.id, 'logoUrl', v)}
                            recommendedSize="200 × 200 px (PNG/SVG nền trong)"
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ⑧ ĐỐI TÁC ─────────────────────────────────────────────────────────── */}
        {activeTab === 'partners' && (
          <div className="max-w-2xl space-y-5">
            <Card>
              <SectionHeader icon={Handshake} label="Section Đối tác" color="text-orange-400" />
              <TextField label="Tiêu đề section (H2)" value={data.partners.sectionTitle} onChange={v => updatePartners('sectionTitle', v)} />
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
                <AlertCircle className="size-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-orange-300">Logo Đối tác được quản lý trong module Đối tác riêng</p>
                  <p className="text-xs text-white/50 mt-1">Tại đây bạn chỉ có thể chỉnh sửa tiêu đề section. Để thêm/xóa/sửa đối tác, hãy vào module Đối tác.</p>
                  <Link href="/admin/doi-tac" className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 px-3 py-1.5 text-xs font-bold text-orange-400 transition-all">
                    Đến module Đối tác
                    <ExternalLink className="size-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
