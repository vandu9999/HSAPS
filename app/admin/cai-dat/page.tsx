'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Settings, Save, RefreshCw, Globe, Phone, Mail, MapPin,
  Facebook, Youtube, Search, Palette, Layout, LinkIcon, ImageIcon,
  Shield, AlignLeft, AlignCenter
} from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import ImageUploadField from '../components/ImageUploadField';

// ─── Default Settings ─────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  general: {
    siteName: 'HSAPS',
    siteFullName: 'Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
    slogan: 'Kết nối chuyên gia, phát triển khoa học và thiết lập tiêu chuẩn vàng trong y học thẩm mỹ.',
    logoUrl: '',
    faviconUrl: '',
    language: 'vi',
    timezone: 'Asia/Ho_Chi_Minh',
    maintenanceMode: false,
  },
  contact: {
    phone: '028.3823.5678',
    hotline: '1800.6868',
    email: 'info@hsaps.org.vn',
    contactEmail: 'contact@hsaps.org.vn',
    address: '268 Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh',
    workingHours: 'Thứ 2 - Thứ 6: 08:00 - 17:00',
    googleMapsUrl: '',
  },
  social: {
    facebook: 'https://facebook.com/hsaps.org.vn',
    youtube: 'https://youtube.com/@hsaps',
    linkedin: '',
    twitter: '',
    instagram: '',
    zalo: '',
  },
  seo: {
    metaTitle: 'HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh',
    metaDescription: 'Kết nối chuyên gia, phát triển khoa học và thiết lập tiêu chuẩn vàng trong y học thẩm mỹ tại Việt Nam.',
    metaKeywords: 'phẫu thuật thẩm mỹ, HSAPS, hội thẩm mỹ, bác sĩ thẩm mỹ, TP.HCM',
    ogImageUrl: '',
    canonicalUrl: 'https://hsaps.org.vn',
    googleAnalyticsId: '',
  },
  appearance: {
    primaryColor: '#ec297b',
    secondaryColor: '#fcd34d',
    darkModePrimary: '#ec297b',
    fontFamily: 'Manrope',
    borderRadius: '12',
    showDarkModeToggle: true,
    defaultTheme: 'light' as 'light' | 'dark',
  },
  header: {
    logoUrl: '',
    logoText: 'HSAPS',
    showSearchBar: true,
    stickyHeader: true,
    showMemberBtn: true,
    memberBtnText: 'Đăng ký Hội viên',
    memberBtnLink: '/login',
    navItems: [
      { label: 'Trang chủ', href: '/' },
      { label: 'Giới thiệu', href: '/gioi-thieu' },
      { label: 'Sự kiện', href: '/su-kien' },
      { label: 'Hội viên', href: '/hoi-vien' },
      { label: 'Đối tác', href: '/doi-tac' },
      { label: 'Báo cáo KH', href: '/bao-cao-khoa-hoc' },
    ],
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} HSAPS - Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh. Bảo lưu mọi quyền.`,
    showSocial: true,
    showAddress: true,
    showPhone: true,
    description: 'Tổ chức khoa học - kỹ thuật y tế chuyên ngành phẫu thuật tạo hình thẩm mỹ tại TP.HCM.',
  },
};

type Settings = typeof DEFAULT_SETTINGS;

const TABS = [
  { id: 'general', label: 'Thông tin chung', icon: Globe },
  { id: 'contact', label: 'Liên hệ', icon: Phone },
  { id: 'social', label: 'Mạng xã hội', icon: LinkIcon },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'appearance', label: 'Giao diện', icon: Palette },
  { id: 'header', label: 'Header', icon: Layout },
  { id: 'footer', label: 'Footer', icon: AlignCenter },
] as const;

type TabId = typeof TABS[number]['id'];

// ─── Field Components ─────────────────────────────────────────────────────────

function Field({ label, value, onChange, type = 'text', hint, multiline = false, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; hint?: string; multiline?: boolean; rows?: number;
}) {
  const cls = "w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all resize-none";
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
      {hint && <p className="text-[11px] text-white/30">{hint}</p>}
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={cls} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }: {
  label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
      <div>
        <p className="text-sm font-semibold text-white/80">{label}</p>
        {desc && <p className="text-xs text-white/40 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-all duration-200 ${checked ? 'bg-[#ec297b]' : 'bg-white/10'}`}
      >
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-200 ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}



function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
      <h3 className="text-sm font-bold text-white/60 border-b border-white/[0.06] pb-3">{title}</h3>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CaiDatPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('cms_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cms_settings', JSON.stringify(settings));
    showToast('✅ Đã lưu cài đặt hệ thống thành công!', 'success');
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem('cms_settings');
    showToast('Đã khôi phục cài đặt mặc định', 'success');
  };

  const upGeneral = useCallback((key: string, value: unknown) => {
    setSettings(s => ({ ...s, general: { ...s.general, [key]: value } }));
  }, []);

  const upContact = useCallback((key: string, value: string) => {
    setSettings(s => ({ ...s, contact: { ...s.contact, [key]: value } }));
  }, []);

  const upSocial = useCallback((key: string, value: string) => {
    setSettings(s => ({ ...s, social: { ...s.social, [key]: value } }));
  }, []);

  const upSeo = useCallback((key: string, value: string) => {
    setSettings(s => ({ ...s, seo: { ...s.seo, [key]: value } }));
  }, []);

  const upAppearance = useCallback((key: string, value: unknown) => {
    setSettings(s => ({ ...s, appearance: { ...s.appearance, [key]: value } }));
  }, []);

  const upHeader = useCallback((key: string, value: unknown) => {
    setSettings(s => ({ ...s, header: { ...s.header, [key]: value } }));
  }, []);

  const upFooter = useCallback((key: string, value: unknown) => {
    setSettings(s => ({ ...s, footer: { ...s.footer, [key]: value } }));
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Settings className="size-5 text-violet-400" />
              Cài đặt Hệ thống
            </h1>
            <p className="text-xs text-white/40 mt-0.5">Cấu hình toàn bộ hệ thống HSAPS</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleReset} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all">
              <RefreshCw className="size-3.5" />
              Đặt lại
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all">
              <Save className="size-3.5" />
              Lưu cài đặt
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-0 min-h-[calc(100vh-73px)]">
        {/* Left Tab Navigation */}
        <div className="w-52 shrink-0 border-r border-white/[0.06] p-4 space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-[#ec297b]/15 text-[#ec297b]'
                    : 'text-white/40 hover:bg-white/[0.04] hover:text-white/70'
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 space-y-6 overflow-y-auto">

          {/* ── General ── */}
          {activeTab === 'general' && (
            <>
              <SectionCard title="Thông tin website">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Tên viết tắt" value={settings.general.siteName} onChange={v => upGeneral('siteName', v)} hint="Hiển thị trên logo text, tab trình duyệt" />
                  <Field label="Tên đầy đủ" value={settings.general.siteFullName} onChange={v => upGeneral('siteFullName', v)} />
                </div>
                <Field label="Slogan / Mô tả ngắn" value={settings.general.slogan} onChange={v => upGeneral('slogan', v)} multiline rows={2} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Ngôn ngữ</label>
                    <select value={settings.general.language} onChange={e => upGeneral('language', e.target.value)}
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all">
                      <option value="vi">Tiếng Việt (vi)</option>
                      <option value="en">English (en)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Múi giờ</label>
                    <select value={settings.general.timezone} onChange={e => upGeneral('timezone', e.target.value)}
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all">
                      <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
                      <option value="UTC">UTC (GMT+0)</option>
                    </select>
                  </div>
                </div>
              </SectionCard>
              <SectionCard title="Logo & Favicon">
                <ImageUploadField label="Tải lên Logo chính" value={settings.general.logoUrl} onChange={v => upGeneral('logoUrl', v)} recommendedSize="200 x 60 px (PNG/SVG nền trong suốt)" />
                <ImageUploadField label="Tải lên Favicon" value={settings.general.faviconUrl} onChange={v => upGeneral('faviconUrl', v)} recommendedSize="32 x 32 px (ICO hoặc PNG)" />
              </SectionCard>
              <SectionCard title="Trạng thái hệ thống">
                <Toggle
                  label="Chế độ bảo trì"
                  desc="Khi bật, người dùng sẽ thấy trang thông báo bảo trì"
                  checked={settings.general.maintenanceMode}
                  onChange={v => upGeneral('maintenanceMode', v)}
                />
                {settings.general.maintenanceMode && (
                  <div className="flex items-center gap-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3">
                    <Shield className="size-4 text-amber-400 shrink-0" />
                    <p className="text-xs text-amber-300">Hệ thống đang ở chế độ bảo trì. Admin vẫn có thể truy cập bình thường.</p>
                  </div>
                )}
              </SectionCard>
            </>
          )}

          {/* ── Contact ── */}
          {activeTab === 'contact' && (
            <>
              <SectionCard title="Thông tin liên hệ chính">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Số điện thoại" value={settings.contact.phone} onChange={v => upContact('phone', v)} hint="Hiển thị trên header và footer" />
                  <Field label="Đường dây nóng" value={settings.contact.hotline} onChange={v => upContact('hotline', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email thông tin" value={settings.contact.email} onChange={v => upContact('email', v)} type="email" />
                  <Field label="Email liên hệ" value={settings.contact.contactEmail} onChange={v => upContact('contactEmail', v)} type="email" />
                </div>
                <Field label="Địa chỉ" value={settings.contact.address} onChange={v => upContact('address', v)} multiline rows={2} />
                <Field label="Giờ làm việc" value={settings.contact.workingHours} onChange={v => upContact('workingHours', v)} hint="Ví dụ: Thứ 2 - Thứ 6: 08:00 - 17:00" />
                <Field label="URL Google Maps Embed" value={settings.contact.googleMapsUrl} onChange={v => upContact('googleMapsUrl', v)} hint="Link Google Maps nhúng vào trang liên hệ" />
              </SectionCard>
            </>
          )}

          {/* ── Social ── */}
          {activeTab === 'social' && (
            <SectionCard title="Tài khoản mạng xã hội">
              <div className="space-y-4">
                {[
                  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
                  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
                  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
                  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
                  { key: 'twitter', label: 'Twitter / X', placeholder: 'https://x.com/...' },
                  { key: 'zalo', label: 'Zalo OA', placeholder: 'https://zalo.me/...' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
                    <input type="url" value={(settings.social as Record<string, string>)[key]}
                      onChange={e => upSocial(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* ── SEO ── */}
          {activeTab === 'seo' && (
            <>
              <SectionCard title="Meta Tags">
                <Field label="Meta Title" value={settings.seo.metaTitle} onChange={v => upSeo('metaTitle', v)} hint="Tối đa 60 ký tự" />
                <div className="text-right text-[11px] text-white/30 -mt-3">{settings.seo.metaTitle.length}/60 ký tự</div>
                <Field label="Meta Description" value={settings.seo.metaDescription} onChange={v => upSeo('metaDescription', v)} multiline rows={3} hint="Tối đa 160 ký tự" />
                <div className="text-right text-[11px] text-white/30 -mt-3">{settings.seo.metaDescription.length}/160 ký tự</div>
                <Field label="Meta Keywords" value={settings.seo.metaKeywords} onChange={v => upSeo('metaKeywords', v)} hint="Phân cách bằng dấu phẩy" />
              </SectionCard>
              <SectionCard title="Open Graph (Social Share)">
                <ImageUploadField label="Tải lên OG Image" value={settings.seo.ogImageUrl} onChange={v => upSeo('ogImageUrl', v)} recommendedSize="1200 x 630 px (Ảnh chia sẻ mạng xã hội)" />
                <Field label="Canonical URL" value={settings.seo.canonicalUrl} onChange={v => upSeo('canonicalUrl', v)} hint="URL gốc của website" />
              </SectionCard>
              <SectionCard title="Analytics">
                <Field label="Google Analytics ID" value={settings.seo.googleAnalyticsId} onChange={v => upSeo('googleAnalyticsId', v)} hint="Ví dụ: G-XXXXXXXXXX" />
              </SectionCard>
            </>
          )}

          {/* ── Appearance ── */}
          {activeTab === 'appearance' && (
            <>
              <SectionCard title="Màu sắc chủ đạo">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Màu chính (Primary)</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={settings.appearance.primaryColor}
                        onChange={e => upAppearance('primaryColor', e.target.value)}
                        className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
                      />
                      <input type="text" value={settings.appearance.primaryColor}
                        onChange={e => upAppearance('primaryColor', e.target.value)}
                        className="flex-1 rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white font-mono focus:border-[#ec297b]/50 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="h-8 w-full rounded-lg" style={{ backgroundColor: settings.appearance.primaryColor }} />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Màu phụ (Secondary)</label>
                    <div className="flex items-center gap-3">
                      <input type="color" value={settings.appearance.secondaryColor}
                        onChange={e => upAppearance('secondaryColor', e.target.value)}
                        className="h-10 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
                      />
                      <input type="text" value={settings.appearance.secondaryColor}
                        onChange={e => upAppearance('secondaryColor', e.target.value)}
                        className="flex-1 rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white font-mono focus:border-[#ec297b]/50 focus:outline-none transition-all"
                      />
                    </div>
                    <div className="h-8 w-full rounded-lg" style={{ backgroundColor: settings.appearance.secondaryColor }} />
                  </div>
                </div>
              </SectionCard>
              <SectionCard title="Font chữ & Hình dạng">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Font chính</label>
                    <select value={settings.appearance.fontFamily} onChange={e => upAppearance('fontFamily', e.target.value)}
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all">
                      {['Manrope', 'Inter', 'Roboto', 'Outfit', 'Nunito'].map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Bo góc (px)</label>
                    <input type="number" min={0} max={32} value={settings.appearance.borderRadius}
                      onChange={e => upAppearance('borderRadius', e.target.value)}
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </SectionCard>
              <SectionCard title="Dark Mode">
                <Toggle label="Hiển thị nút chuyển đổi Dark Mode" checked={settings.appearance.showDarkModeToggle} onChange={v => upAppearance('showDarkModeToggle', v)} />
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Giao diện mặc định</label>
                  <div className="flex gap-3">
                    {[['light', 'Sáng (Light)'], ['dark', 'Tối (Dark)']].map(([v, l]) => (
                      <button
                        key={v}
                        onClick={() => upAppearance('defaultTheme', v)}
                        className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-all ${settings.appearance.defaultTheme === v ? 'border-[#ec297b]/40 bg-[#ec297b]/10 text-[#ec297b]' : 'border-white/10 text-white/40 hover:text-white/70'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </SectionCard>
            </>
          )}

          {/* ── Header ── */}
          {activeTab === 'header' && (
            <>
              <SectionCard title="Logo Header">
                <ImageUploadField label="Tải lên Logo Header" value={settings.header.logoUrl} onChange={v => upHeader('logoUrl', v)} recommendedSize="200 x 60 px (để trống để dùng logo text)" />
                <Field label="Logo Text (nếu không có ảnh)" value={settings.header.logoText} onChange={v => upHeader('logoText', v)} />
              </SectionCard>
              <SectionCard title="Tùy chọn Header">
                <Toggle label="Header dính khi cuộn (Sticky)" checked={settings.header.stickyHeader} onChange={v => upHeader('stickyHeader', v)} />
                <Toggle label="Hiển thị thanh tìm kiếm" checked={settings.header.showSearchBar} onChange={v => upHeader('showSearchBar', v)} />
                <Toggle label="Hiển thị nút Đăng ký Hội viên" checked={settings.header.showMemberBtn} onChange={v => upHeader('showMemberBtn', v)} />
                {settings.header.showMemberBtn && (
                  <div className="grid grid-cols-2 gap-4 ml-4">
                    <Field label="Nội dung nút" value={settings.header.memberBtnText} onChange={v => upHeader('memberBtnText', v)} />
                    <Field label="Link nút" value={settings.header.memberBtnLink} onChange={v => upHeader('memberBtnLink', v)} />
                  </div>
                )}
              </SectionCard>
              <SectionCard title="Menu điều hướng">
                <div className="space-y-2">
                  {settings.header.navItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
                      <span className="text-xs text-white/30 font-mono w-5">{i + 1}</span>
                      <input type="text" value={item.label}
                        onChange={e => {
                          const items = [...settings.header.navItems];
                          items[i] = { ...items[i], label: e.target.value };
                          upHeader('navItems', items);
                        }}
                        placeholder="Tên menu"
                        className="flex-1 rounded-lg bg-[#0d1117] border border-white/10 px-3 py-1.5 text-sm text-white focus:border-[#ec297b]/40 focus:outline-none transition-all"
                      />
                      <input type="text" value={item.href}
                        onChange={e => {
                          const items = [...settings.header.navItems];
                          items[i] = { ...items[i], href: e.target.value };
                          upHeader('navItems', items);
                        }}
                        placeholder="/duong-dan"
                        className="flex-1 rounded-lg bg-[#0d1117] border border-white/10 px-3 py-1.5 text-sm text-white font-mono focus:border-[#ec297b]/40 focus:outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>
              </SectionCard>
            </>
          )}

          {/* ── Footer ── */}
          {activeTab === 'footer' && (
            <>
              <SectionCard title="Nội dung Footer">
                <Field label="Bản quyền" value={settings.footer.copyright} onChange={v => upFooter('copyright', v)} hint={`Có thể dùng © ${new Date().getFullYear()}`} />
                <Field label="Mô tả ngắn về tổ chức" value={settings.footer.description} onChange={v => upFooter('description', v)} multiline rows={3} />
              </SectionCard>
              <SectionCard title="Hiển thị thông tin">
                <Toggle label="Hiển thị icon mạng xã hội" checked={settings.footer.showSocial} onChange={v => upFooter('showSocial', v)} />
                <Toggle label="Hiển thị địa chỉ" checked={settings.footer.showAddress} onChange={v => upFooter('showAddress', v)} />
                <Toggle label="Hiển thị số điện thoại" checked={settings.footer.showPhone} onChange={v => upFooter('showPhone', v)} />
              </SectionCard>

              {/* Live Preview */}
              <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6">
                <h3 className="text-sm font-bold text-white/60 border-b border-white/[0.06] pb-3 mb-4">Preview Footer</h3>
                <div className="rounded-xl bg-[#2d1a24]/60 p-6 text-center">
                  <p className="text-xs text-white/50 mb-2">{settings.footer.description}</p>
                  {settings.footer.showSocial && (
                    <div className="flex justify-center gap-3 mb-3">
                      <span className="text-[10px] text-[#ec297b]">FB</span>
                      <span className="text-[10px] text-[#ec297b]">YT</span>
                      <span className="text-[10px] text-[#ec297b]">LI</span>
                    </div>
                  )}
                  {settings.footer.showAddress && (
                    <p className="text-[10px] text-white/30 mb-1">📍 {settings.contact.address}</p>
                  )}
                  {settings.footer.showPhone && (
                    <p className="text-[10px] text-white/30 mb-3">📞 {settings.contact.phone}</p>
                  )}
                  <p className="text-[10px] text-white/20">{settings.footer.copyright}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
