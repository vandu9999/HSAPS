'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';
import { Toast, useToast } from '../../components/Toast';
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploadField from '../../components/ImageUploadField';
import { saveReport } from '@/app/actions/report';
import { isDbConnected } from '@/app/actions/dbCheck';

type Report = {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  category: string;
  date: string;
  journal: string;
  imageUrl: string;
  tags: string[];
  doi: string;
  views: number;
};

const CATEGORIES = ['Phẫu thuật Tạo hình', 'Thẩm mỹ nội khoa', 'Tái tạo & Vi phẫu', 'Xu hướng & Công nghệ', 'Đào tạo Y khoa'];

const EMPTY_REPORT: Report = {
  id: '', title: '', authors: [], abstract: '',
  category: 'Phẫu thuật Tạo hình', date: '', journal: '', imageUrl: '',
  tags: [], doi: '', views: 0,
};

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

export default function ThemBaoCaoPage() {
  const router = useRouter();
  const [form, setForm] = useState<Report>(EMPTY_REPORT);
  const [authorsRaw, setAuthorsRaw] = useState('');
  const [tagsRaw, setTagsRaw] = useState('');
  const [categories, setCategories] = useState<string[]>(CATEGORIES);
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    isDbConnected().then(setDbConnected);

    const cats = localStorage.getItem('cms_cat_bao_cao');
    if (cats) {
      try {
        const parsed = JSON.parse(cats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed.map((c: any) => c.name));
        }
      } catch {}
    }
  }, []);

  const up = (key: keyof Report) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const handleSave = async () => {
    if (!form.title.trim()) return;

    const authors = authorsRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const tags = tagsRaw.split(',').map(s => s.trim()).filter(Boolean);
    const date = form.date || new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit' });

    if (dbConnected) {
      const res = await saveReport({
        title: form.title,
        authors,
        abstract: form.abstract,
        category: form.category,
        date,
        journal: form.journal,
        imageUrl: form.imageUrl,
        tags,
        doi: form.doi,
        views: 0
      });
      if (res.success) {
        showToast('✅ Đã thêm báo cáo khoa học mới!', 'success');
        setTimeout(() => router.push('/admin/bao-cao'), 800);
      } else {
        showToast(res.error || 'Lỗi thêm báo cáo', 'error');
      }
    } else {
      const saved = localStorage.getItem('cms_bao_cao');
      let list: Report[] = [];
      if (saved) {
        try { list = JSON.parse(saved); } catch {}
      }
      const newItem: Report = {
        ...form,
        id: Date.now().toString(),
        authors,
        tags,
        date,
      };
      localStorage.setItem('cms_bao_cao', JSON.stringify([...list, newItem]));
      showToast('✅ Đã thêm báo cáo khoa học mới!', 'success');
      setTimeout(() => router.push('/admin/bao-cao'), 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white pb-12">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/bao-cao')}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all">
              <ArrowLeft className="size-4" /> Quay lại
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-white/30 mb-0.5">
                <span>Admin</span><span>/</span><span>Báo cáo</span><span>/</span>
                <span className="text-white/60">Thêm mới</span>
              </div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="size-5 text-emerald-400" />
                Thêm báo cáo mới
              </h1>
            </div>
          </div>
          <button onClick={handleSave} disabled={!form.title.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all disabled:opacity-40">
            <Save className="size-3.5" /> Lưu báo cáo
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6 max-w-5xl">
          {/* Left Column */}
          <div className="col-span-2 space-y-5">
            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Nội dung học thuật</h2>
              
              <TextField label="Tiêu đề báo cáo *" value={form.title} onChange={up('title')} placeholder="Ví dụ: Nghiên cứu ứng dụng sụn sườn trong tạo hình mũi..." />
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Danh mục</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Tác giả (mỗi dòng 1 người)</label>
                <textarea value={authorsRaw} onChange={e => setAuthorsRaw(e.target.value)} rows={3} placeholder="TS.BS Nguyễn Văn A&#10;PGS.TS.BS Trần Thị B"
                  className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all resize-none" />
              </div>

              <RichTextEditor label="Tóm tắt (Abstract)" value={form.abstract} onChange={up('abstract')} placeholder="Abstract của bài viết báo cáo khoa học..." />
            </div>

            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Metadata & Xuất bản</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Tạp chí xuất bản" value={form.journal} onChange={up('journal')} placeholder="Y học TP.HCM / Tạp chí Thẩm mỹ..." />
                <TextField label="Tháng/Năm xuất bản" value={form.date} onChange={up('date')} placeholder="12/2026" />
              </div>

              <TextField label="Chỉ số DOI (Digital Object Identifier)" value={form.doi} onChange={up('doi')} placeholder="https://doi.org/10.1007/..." />
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Tags / Từ khóa (phân cách bằng dấu phẩy)</label>
                <input type="text" value={tagsRaw} onChange={e => setTagsRaw(e.target.value)}
                  placeholder="Ví dụ: Phẫu thuật mũi, Sụn tự thân, Thẩm mỹ..."
                  className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-4">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Ảnh bìa báo cáo</h2>
              <ImageUploadField
                label="Tải lên ảnh bìa"
                value={form.imageUrl}
                onChange={up('imageUrl')}
                recommendedSize="600 x 800 px (Ảnh bìa dọc 3:4)"
              />
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
