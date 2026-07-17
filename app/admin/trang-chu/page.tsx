'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Save, ImageIcon, Home, Megaphone, BarChart3, RefreshCw, ExternalLink, Newspaper } from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import ImageUploadField from '../components/ImageUploadField';

// ─── Default Data ────────────────────────────────────────────────────────────

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
  cta: {
    title: 'Trở thành thành viên của HSAPS',
    description: 'Tham gia cùng chúng tôi để tiếp cận các cơ hội học tập, kết nối với các chuyên gia hàng đầu và nâng cao uy tín nghề nghiệp của bạn.',
    btn1Text: 'Đăng ký ngay',
    btn2Text: 'Liên hệ tư vấn',
  },
};

function TextField({ label, value, onChange, multiline = false, rows = 3 }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const baseClass = "w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all resize-none";
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-white/60 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={baseClass}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      )}
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'hero', label: 'Hero Banner', icon: Home },
  { id: 'stats', label: 'Thống kê', icon: BarChart3 },
  { id: 'cta', label: 'CTA Section', icon: Megaphone },
];

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TrangChuCMS() {
  const [activeTab, setActiveTab] = useState('hero');
  const [data, setData] = useState(DEFAULT_DATA);
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('cms_trang_chu');
    if (saved) {
      try { setData(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cms_trang_chu', JSON.stringify(data));
    showToast('✅ Đã lưu nội dung trang chủ thành công!', 'success');
  };

  const handleReset = () => {
    setData(DEFAULT_DATA);
    localStorage.removeItem('cms_trang_chu');
    showToast('Đã khôi phục dữ liệu mặc định', 'success');
  };

  const updateHero = useCallback((key: string, value: string) => {
    setData(d => ({ ...d, hero: { ...d.hero, [key]: value } }));
  }, []);

  const updateStats = useCallback((key: string, value: string) => {
    setData(d => ({ ...d, stats: { ...d.stats, [key]: value } }));
  }, []);

  const updateCta = useCallback((key: string, value: string) => {
    setData(d => ({ ...d, cta: { ...d.cta, [key]: value } }));
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Home className="size-5 text-[#ec297b]" />
              CMS Trang chủ
            </h1>
            <p className="text-xs text-white/40 mt-0.5">Quản lý hình ảnh và nội dung trang chủ</p>
          </div>
          <div className="flex items-center gap-3">
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

      <div className="p-8">
        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-[#161b22] border border-white/[0.06] p-1 mb-8 w-fit">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#ec297b] text-white shadow-lg shadow-pink-500/20'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Fields */}
            <div className="space-y-5 rounded-2xl bg-[#161b22] border border-white/[0.06] p-6">
              <h3 className="text-sm font-bold text-white/80 border-b border-white/[0.06] pb-3">Nội dung văn bản</h3>
              <TextField label="Badge thông báo" value={data.hero.badge} onChange={(v) => updateHero('badge', v)} />
              <TextField label="Tiêu đề chính (H1)" value={data.hero.title} onChange={(v) => updateHero('title', v)} />
              <TextField label="Tiêu đề nổi bật (màu hồng)" value={data.hero.titleHighlight} onChange={(v) => updateHero('titleHighlight', v)} />
              <TextField label="Mô tả" value={data.hero.description} onChange={(v) => updateHero('description', v)} multiline rows={4} />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Nút CTA chính" value={data.hero.btn1Text} onChange={(v) => updateHero('btn1Text', v)} />
                <TextField label="Nút CTA phụ" value={data.hero.btn2Text} onChange={(v) => updateHero('btn2Text', v)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Tiêu đề sự kiện (badge)" value={data.hero.eventBadgeTitle} onChange={(v) => updateHero('eventBadgeTitle', v)} />
                <TextField label="Ngày & địa điểm" value={data.hero.eventBadgeDate} onChange={(v) => updateHero('eventBadgeDate', v)} />
              </div>
            </div>

            {/* Image + Preview */}
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
                <h3 className="text-sm font-bold text-white/80 border-b border-white/[0.06] pb-3">Hình ảnh</h3>
                <ImageUploadField
                  label="Tải lên ảnh Hero banner"
                  value={data.hero.imageUrl}
                  onChange={(v) => updateHero('imageUrl', v)}
                  recommendedSize="1200 x 900 px (Tỷ lệ 4:3)"
                />
                <TextField label="Alt text (SEO)" value={data.hero.imageAlt} onChange={(v) => updateHero('imageAlt', v)} />
              </div>

              {/* Preview */}
              <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6">
                <h3 className="text-sm font-bold text-white/80 border-b border-white/[0.06] pb-3 mb-4">Preview ảnh</h3>
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-white/5">
                  {data.hero.imageUrl ? (
                    <img
                      src={data.hero.imageUrl}
                      alt={data.hero.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-white/20">
                      <ImageIcon className="size-10" />
                      <p className="text-xs">Nhập URL ảnh để xem preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 max-w-2xl">
            <h3 className="text-sm font-bold text-white/80 border-b border-white/[0.06] pb-3 mb-6">Thống kê trang chủ</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <TextField
                    label={`Số liệu ${i}`}
                    value={(data.stats as Record<string,string>)[`stat${i}Value`]}
                    onChange={(v) => updateStats(`stat${i}Value`, v)}
                  />
                  <TextField
                    label={`Nhãn ${i}`}
                    value={(data.stats as Record<string,string>)[`stat${i}Label`]}
                    onChange={(v) => updateStats(`stat${i}Label`, v)}
                  />
                </div>
              ))}
            </div>
            {/* Preview */}
            <div className="mt-6 flex items-center gap-8 border-t border-dashed border-white/10 pt-6 justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-white">{(data.stats as Record<string,string>)[`stat${i}Value`]}</p>
                  <p className="text-xs text-white/40 mt-1">{(data.stats as Record<string,string>)[`stat${i}Label`]}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* News redirect banner */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/15">
                <Newspaper className="size-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Quản lý Tin tức đã được tách riêng</h3>
                <p className="text-xs text-white/50 mt-0.5">Tin tức nay có module riêng với đầy đủ tính năng CRUD, xuất bản/nháp và tìm kiếm.</p>
              </div>
            </div>
            <Link
              href="/admin/tin-tuc"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/20 px-4 py-2.5 text-sm font-bold text-rose-400 transition-all"
            >
              Đến module Tin tức
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* CTA Tab */}
        {activeTab === 'cta' && (
          <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 max-w-2xl space-y-5">
            <h3 className="text-sm font-bold text-white/80 border-b border-white/[0.06] pb-3">Section kêu gọi hành động</h3>
            <TextField label="Tiêu đề" value={data.cta.title} onChange={(v) => updateCta('title', v)} />
            <TextField label="Mô tả" value={data.cta.description} onChange={(v) => updateCta('description', v)} multiline rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Nút 1 (nổi bật)" value={data.cta.btn1Text} onChange={(v) => updateCta('btn1Text', v)} />
              <TextField label="Nút 2 (phụ)" value={data.cta.btn2Text} onChange={(v) => updateCta('btn2Text', v)} />
            </div>
            {/* Preview */}
            <div className="mt-4 rounded-xl bg-gradient-to-r from-[#ec297b]/20 to-[#c2185f]/10 border border-[#ec297b]/20 p-6 text-center">
              <h4 className="text-lg font-bold text-white mb-2">{data.cta.title}</h4>
              <p className="text-sm text-white/60 mb-4">{data.cta.description}</p>
              <div className="flex gap-3 justify-center">
                <span className="rounded-lg bg-[#fcd34d] px-4 py-2 text-sm font-bold text-[#2d1a24]">{data.cta.btn1Text}</span>
                <span className="rounded-lg border border-white/30 px-4 py-2 text-sm font-bold text-white">{data.cta.btn2Text}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
