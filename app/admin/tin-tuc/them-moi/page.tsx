'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Newspaper, Image as ImageIcon } from 'lucide-react';
import { Toast, useToast } from '../../components/Toast';
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploadField from '../../components/ImageUploadField';
import { isDbConnected } from '@/app/actions/dbCheck';
import { saveNews } from '@/app/actions/news';

type NewsItem = {
  id: string;
  imageUrl: string;
  category: string;
  categoryColor: 'primary' | 'secondary';
  date: string;
  title: string;
  excerpt: string;
  published: boolean;
};

const EMPTY_NEWS: NewsItem = {
  id: '',
  imageUrl: '',
  category: '',
  categoryColor: 'primary',
  date: '',
  title: '',
  excerpt: '',
  published: true,
};

const CATEGORY_SUGGESTIONS = [
  'Báo cáo', 'Hợp tác quốc tế', 'Khuyến cáo', 'Hoạt động Hội',
  'Sự kiện', 'Đào tạo', 'Y khoa', 'Thông báo',
];

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

export default function ThemTinTucPage() {
  const router = useRouter();
  const [form, setForm] = useState<NewsItem>(EMPTY_NEWS);
  const [categories, setCategories] = useState<string[]>(CATEGORY_SUGGESTIONS);
  const [dbConnected, setDbConnected] = useState(false);
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbConnected(connected);
    });

    if (typeof window !== 'undefined') {
      const cats = localStorage.getItem('cms_cat_tin_tuc');
      if (cats) {
        try {
          const parsed = JSON.parse(cats);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCategories(parsed.map((c: any) => c.name));
          }
        } catch {}
      }
    }
  }, []);

  const up = (key: keyof NewsItem) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const handleSave = async () => {
    if (!form.title.trim()) return;
    const finalDate = form.date || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' });
    const payload = {
      imageUrl: form.imageUrl,
      category: form.category,
      categoryColor: form.categoryColor,
      date: finalDate,
      title: form.title,
      excerpt: form.excerpt,
      published: form.published,
    };

    if (dbConnected) {
      const res = await saveNews(payload);
      if (res.success) {
        showToast('✅ Đã thêm tin tức mới!', 'success');
        setTimeout(() => router.push('/admin/tin-tuc'), 800);
      } else {
        showToast(res.error || 'Lỗi khi lưu tin tức', 'error');
      }
    } else {
      const saved = localStorage.getItem('cms_tin_tuc');
      let list: NewsItem[] = [];
      if (saved) {
        try { list = JSON.parse(saved); } catch {}
      }
      const newItem: NewsItem = {
        ...form,
        id: Date.now().toString(),
        date: finalDate,
      };
      localStorage.setItem('cms_tin_tuc', JSON.stringify([...list, newItem]));
      showToast('✅ Đã thêm tin tức mới (Local)!', 'success');
      setTimeout(() => router.push('/admin/tin-tuc'), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white pb-12">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/tin-tuc')}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all">
              <ArrowLeft className="size-4" /> Quay lại
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-white/30 mb-0.5">
                <span>Admin</span><span>/</span><span>Tin tức</span><span>/</span>
                <span className="text-white/60">Thêm mới</span>
              </div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <Newspaper className="size-5 text-rose-400" />
                Thêm tin tức mới
              </h1>
            </div>
          </div>
          <button onClick={handleSave} disabled={!form.title.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all disabled:opacity-40">
            <Save className="size-3.5" /> Lưu tin tức
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6 max-w-5xl">
          {/* Left Column */}
          <div className="col-span-2 space-y-5">
            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Nội dung bài viết</h2>
              
              <TextField label="Tiêu đề bài viết *" value={form.title} onChange={up('title')} placeholder="Nhập tiêu đề tin tức..." />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Danh mục</label>
                  <input
                    type="text" value={form.category}
                    onChange={e => up('category')(e.target.value)}
                    placeholder="Nhập hoặc chọn danh mục..."
                    list="category-suggestions"
                    className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all"
                  />
                  <datalist id="category-suggestions">
                    {categories.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Màu badge danh mục</label>
                  <div className="flex gap-2 pt-1">
                    {[
                      { value: 'primary', label: 'Hồng', bg: 'bg-[#ec297b]' },
                      { value: 'secondary', label: 'Vàng', bg: 'bg-[#fcd34d]' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, categoryColor: opt.value as NewsItem['categoryColor'] }))}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                          form.categoryColor === opt.value
                            ? 'border-white/30 bg-white/10 text-white'
                            : 'border-white/[0.06] text-white/40 hover:text-white/60'
                        }`}
                      >
                        <span className={`h-2.5 w-2.5 rounded-full ${opt.bg}`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <TextField label="Ngày đăng (để trống sẽ lấy ngày hiện tại)" value={form.date} onChange={up('date')} placeholder="Ví dụ: 10 Tháng 11, 2026" />
              <RichTextEditor label="Tóm tắt ngắn (excerpt)" value={form.excerpt} onChange={up('excerpt')} placeholder="Mô tả ngắn gọn nội dung bài viết hiển thị trên trang chủ..." />
            </div>

            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white/80">Trạng thái xuất bản</p>
                  <p className="text-xs text-white/40 mt-0.5">Hiển thị bài viết ngay lập tức trên trang chủ</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                  className={`relative h-6 w-11 rounded-full transition-all duration-200 ${form.published ? 'bg-[#ec297b]' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-200 ${form.published ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-4">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Thumbnail</h2>
              <ImageUploadField
                label="Tải lên ảnh đại diện"
                value={form.imageUrl}
                onChange={up('imageUrl')}
                recommendedSize="800 x 600 px (Tỷ lệ 4:3)"
              />
            </div>

            {/* Live Preview Card */}
            {(form.title || form.imageUrl) && (
              <div className="rounded-2xl border border-white/[0.06] bg-[#161b22] overflow-hidden">
                <p className="px-5 py-3 text-[10px] font-bold text-white/30 uppercase tracking-wider border-b border-white/[0.06]">Live Card Preview</p>
                <div className="p-5 flex gap-3">
                  <div className="relative h-16 w-24 shrink-0 rounded-lg overflow-hidden bg-white/5">
                    {form.imageUrl ? (
                      <img src={form.imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center"><ImageIcon className="size-5 text-white/10" /></div>
                    )}
                    {form.category && (
                      <div className={`absolute top-1 left-1 rounded px-1 text-[7px] font-bold uppercase ${form.categoryColor === 'primary' ? 'bg-[#ec297b] text-white' : 'bg-[#fcd34d] text-[#2d1a24]'}`}>
                        {form.category}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-white/30 mb-0.5">{form.date || 'Hôm nay'}</p>
                    <p className="text-xs font-bold text-white/80 line-clamp-2 leading-tight">{form.title || 'Tiêu đề tin tức...'}</p>
                    <p className="text-[10px] text-white/40 mt-1 line-clamp-1">{form.excerpt || 'Nội dung tóm tắt...'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
