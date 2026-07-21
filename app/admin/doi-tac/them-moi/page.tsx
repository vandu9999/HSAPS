'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Handshake, Plus, X } from 'lucide-react';
import { Toast, useToast } from '../../components/Toast';
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploadField from '../../components/ImageUploadField';
import { savePartner } from '@/app/actions/partner';
import { isDbConnected } from '@/app/actions/dbCheck';

type Product = { name: string; description: string; imageUrl: string };

type Partner = {
  id: string;
  name: string;
  category: 'Kim cương' | 'Vàng' | 'Bạc' | 'Đồng hành';
  description: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  introduction: string;
  products: Product[];
  logoType?: string;
  logoUrl?: string;
};

const EMPTY_PARTNER: Partner = {
  id: '', name: '', category: 'Bạc', description: '', website: '',
  phone: '', email: '', address: '', introduction: '', products: [],
  logoUrl: '',
};

const SECTIONS = [
  { id: 'info', label: 'Thông tin chung' },
  { id: 'products', label: 'Sản phẩm' },
] as const;

function TextField({ label, value, onChange, multiline = false, rows = 3, placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number; placeholder?: string;
}) {
  const cls = "w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all resize-none";
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={cls} placeholder={placeholder} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      }
    </div>
  );
}

export default function ThemDoiTacPage() {
  const router = useRouter();
  const [form, setForm] = useState<Partner>(EMPTY_PARTNER);
  const [activeSection, setActiveSection] = useState<'info' | 'products'>('info');
  const { toast, showToast, closeToast } = useToast();
  const [dbActive, setDbActive] = useState(false);

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbActive(connected);
    });
  }, []);

  const up = (key: keyof Partner) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const updateProduct = (i: number, key: keyof Product, v: string) => {
    setForm(f => {
      const products = [...f.products];
      products[i] = { ...products[i], [key]: v };
      return { ...f, products };
    });
  };

  const addProduct = () => setForm(f => ({ ...f, products: [...f.products, { name: '', description: '', imageUrl: '' }] }));
  const removeProduct = (i: number) => setForm(f => ({ ...f, products: f.products.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    if (!form.name.trim()) return;
    
    if (dbActive) {
      const res = await savePartner({
        name: form.name,
        category: form.category,
        description: form.description,
        website: form.website,
        phone: form.phone,
        email: form.email,
        address: form.address,
        introduction: form.introduction,
        logoType: form.logoType,
        logoUrl: form.logoUrl,
        products: form.products,
      });
      if (res.success) {
        showToast('✅ Đã thêm đối tác mới thành công!', 'success');
        setTimeout(() => router.push('/admin/doi-tac'), 800);
      } else {
        showToast('❌ Lỗi: ' + res.error, 'error');
      }
    } else {
      const saved = localStorage.getItem('cms_doi_tac');
      let list: Partner[] = [];
      if (saved) {
        try { list = JSON.parse(saved); } catch {}
      }
      const newItem = { ...form, id: Date.now().toString() };
      localStorage.setItem('cms_doi_tac', JSON.stringify([...list, newItem]));
      showToast('✅ Đã thêm đối tác mới (local)!', 'success');
      setTimeout(() => router.push('/admin/doi-tac'), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white pb-12">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/doi-tac')}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all">
              <ArrowLeft className="size-4" /> Quay lại
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-white/30 mb-0.5">
                <span>Admin</span><span>/</span><span>Đối tác</span><span>/</span>
                <span className="text-white/60">Thêm mới</span>
              </div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <Handshake className="size-5 text-amber-400" />
                Thêm đối tác mới
              </h1>
            </div>
          </div>
          <button onClick={handleSave} disabled={!form.name.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all disabled:opacity-40">
            <Save className="size-3.5" /> Lưu đối tác
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-1 rounded-xl bg-[#161b22] border border-white/[0.06] p-1 mb-6 w-fit">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSection(s.id)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  activeSection === s.id
                    ? 'bg-[#ec297b] text-white shadow-md'
                    : 'text-white/40 hover:text-white/75'
                }`}
              >
                {s.label} {s.id === 'products' && `(${form.products.length})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-5">
              {activeSection === 'info' && (
                <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
                  <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Thông tin đối tác</h2>
                  
                  <TextField label="Tên đối tác *" value={form.name} onChange={up('name')} placeholder="Tên công ty hoặc thương hiệu..." />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Hạng đối tác</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value as Partner['category'] }))}
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all"
                    >
                      {['Kim cương', 'Vàng', 'Bạc', 'Đồng hành'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <TextField label="Mô tả ngắn" value={form.description} onChange={up('description')} multiline rows={2} placeholder="Mô tả ngắn gọn về đối tác..." />
                  <RichTextEditor label="Giới thiệu chi tiết" value={form.introduction} onChange={up('introduction')} placeholder="Thông tin giới thiệu chi tiết..." />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Website" value={form.website} onChange={up('website')} placeholder="https://..." />
                    <TextField label="Email liên hệ" value={form.email} onChange={up('email')} placeholder="partner@example.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Số điện thoại" value={form.phone} onChange={up('phone')} placeholder="09xx.xxx.xxx" />
                    <TextField label="Địa chỉ văn phòng" value={form.address} onChange={up('address')} placeholder="Địa chỉ trụ sở chính..." />
                  </div>
                </div>
              )}

              {activeSection === 'products' && (
                <div className="space-y-4">
                  {form.products.map((product, i) => (
                    <div key={i} className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-4 relative">
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                        <p className="text-sm font-bold text-white/70">Sản phẩm #{i + 1}</p>
                        <button
                          type="button"
                          onClick={() => removeProduct(i)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <X className="size-4" />
                        </button>
                      </div>

                      <TextField label="Tên sản phẩm" value={product.name} onChange={v => updateProduct(i, 'name', v)} placeholder="Nhập tên sản phẩm thiết bị..." />
                      <TextField label="Mô tả sản phẩm" value={product.description} onChange={v => updateProduct(i, 'description', v)} multiline rows={2} placeholder="Mô tả tính năng công nghệ của sản phẩm..." />
                      
                      <ImageUploadField
                        label="Hình ảnh sản phẩm"
                        value={product.imageUrl}
                        onChange={v => updateProduct(i, 'imageUrl', v)}
                        recommendedSize="600 x 400 px (Tỷ lệ 3:2)"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addProduct}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-4 text-xs font-semibold text-white/40 hover:text-white/70 hover:border-white/20 transition-all bg-white/[0.01]"
                  >
                    <Plus className="size-4" />
                    Thêm sản phẩm của đối tác
                  </button>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="col-span-1">
              <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-4">
                <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Logo thương hiệu</h2>
                <ImageUploadField
                  label="Tải lên Logo đối tác"
                  value={form.logoUrl || ''}
                  onChange={up('logoUrl')}
                  recommendedSize="400 × 400 px (PNG/SVG nền trong suốt)"
                />
                {/* Category badge preview */}
                <div className="flex items-center gap-2 px-1">
                  <div className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    form.category === 'Kim cương' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                    form.category === 'Vàng' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    form.category === 'Bạc' ? 'bg-slate-400/10 text-slate-300 border-slate-400/20' :
                    'bg-white/5 text-white/40 border-white/10'
                  }`}>{form.category}</div>
                </div>
                <p className="text-[10px] text-white/30 leading-relaxed">
                  Dùng file PNG hoặc SVG có nền trong suốt để logo hiển thị đẹp nhất trên website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
