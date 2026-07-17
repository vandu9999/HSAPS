'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, CalendarDays } from 'lucide-react';
import { Toast, useToast } from '../../components/Toast';
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploadField from '../../components/ImageUploadField';
import { getEventById, saveEvent, getEvents } from '@/app/actions/event';
import { isDbConnected } from '@/app/actions/dbCheck';

type Event = {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  description: string;
  registrationFee: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  cmeHours: string;
  capacityText: string;
  progress: number;
  speakers: string[];
};

const EVENT_TYPES = ['Hội nghị', 'Workshop', 'CME', 'Đào tạo', 'Webinar', 'Hội thảo chuyên đề'];

function TextField({ label, value, onChange, multiline = false, rows = 3, type = 'text', placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number; type?: string; placeholder?: string;
}) {
  const cls = "w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all resize-none";
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} className={cls} placeholder={placeholder} />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />
      }
    </div>
  );
}

export default function SuaSuKienPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Event | null>(null);
  const [speakersRaw, setSpeakersRaw] = useState('');
  const [eventTypes, setEventTypes] = useState<string[]>(EVENT_TYPES);
  const { toast, showToast, closeToast } = useToast();
  const [dbActive, setDbActive] = useState(false);

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbActive(connected);
      if (connected) {
        getEventById(id).then(item => {
          if (item) {
            setForm(item as any);
            setSpeakersRaw((item.speakers || []).join('\n'));
          }
        });
        getEvents().then(data => setEvents(data as any));
      } else {
        const saved = localStorage.getItem('cms_su_kien');
        if (saved) {
          try {
            const list: Event[] = JSON.parse(saved);
            setEvents(list);
            const item = list.find(e => e.id === id);
            if (item) {
              setForm(item);
              setSpeakersRaw((item.speakers || []).join('\n'));
            }
          } catch {}
        }
      }
    });

    const cats = localStorage.getItem('cms_cat_su_kien');
    if (cats) {
      try {
        const parsed = JSON.parse(cats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEventTypes(parsed.map((c: any) => c.name));
        }
      } catch {}
    }
  }, [id]);

  const up = (key: keyof Event) => (v: string) => {
    if (form) setForm({ ...form, [key]: v });
  };

  const handleSave = async () => {
    if (!form || !form.title.trim()) return;
    
    const speakers = speakersRaw.split('\n').map(s => s.trim()).filter(Boolean);

    if (dbActive) {
      const res = await saveEvent({
        ...form,
        speakers,
      });
      if (res.success) {
        showToast('✅ Đã cập nhật sự kiện thành công!', 'success');
        setTimeout(() => router.push('/admin/su-kien'), 800);
      } else {
        showToast('❌ Lỗi: ' + res.error, 'error');
      }
    } else {
      const updatedItem: Event = {
        ...form,
        speakers,
      };
      const newList = events.map(e => e.id === id ? updatedItem : e);
      localStorage.setItem('cms_su_kien', JSON.stringify(newList));
      showToast('✅ Đã cập nhật sự kiện (local) thành công!', 'success');
      setTimeout(() => router.push('/admin/su-kien'), 800);
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-sm">Không tìm thấy sự kiện hoặc dữ liệu đang tải...</p>
        <button onClick={() => router.push('/admin/su-kien')} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white pb-12">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/admin/su-kien')}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all">
              <ArrowLeft className="size-4" /> Quay lại
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-white/30 mb-0.5">
                <span>Admin</span><span>/</span><span>Sự kiện</span><span>/</span>
                <span className="text-white/60">Chỉnh sửa</span>
              </div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarDays className="size-5 text-sky-400" />
                Chỉnh sửa sự kiện
              </h1>
            </div>
          </div>
          <button onClick={handleSave} disabled={!form.title.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all disabled:opacity-40">
            <Save className="size-3.5" /> Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6 max-w-5xl">
          {/* Left Column: Form info */}
          <div className="col-span-2 space-y-5">
            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Thông tin chung</h2>
              <TextField label="Tiêu đề sự kiện *" value={form.title} onChange={up('title')} placeholder="Ví dụ: Hội nghị Thẩm mỹ Quốc tế 2026..." />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Loại sự kiện</label>
                  <input
                    type="text"
                    value={form.type}
                    onChange={e => up('type')(e.target.value)}
                    list="event-types"
                    placeholder="Chọn hoặc nhập loại..."
                    className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all"
                  />
                  <datalist id="event-types">
                    {eventTypes.map(t => <option key={t} value={t} />)}
                  </datalist>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Trạng thái</label>
                  <select
                    value={form.status}
                    onChange={e => setForm(f => f ? ({ ...f, status: e.target.value as Event['status'] }) : null)}
                    className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all"
                  >
                    <option value="upcoming">Sắp diễn ra</option>
                    <option value="ongoing">Đang diễn ra</option>
                    <option value="completed">Đã kết thúc</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField label="Ngày diễn ra" value={form.date} onChange={up('date')} placeholder="20/12/2026" />
                <TextField label="Giờ diễn ra" value={form.time} onChange={up('time')} placeholder="08:00 - 17:30" />
              </div>

              <TextField label="Địa điểm" value={form.location} onChange={up('location')} placeholder="GEM Center, Quận 1, TP.HCM" />
              <RichTextEditor label="Mô tả sự kiện" value={form.description} onChange={up('description')} placeholder="Mô tả tóm tắt nội dung sự kiện..." />
            </div>

            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Học thuật & Đăng ký</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <TextField label="Phí đăng ký" value={form.registrationFee} onChange={up('registrationFee')} placeholder="Miễn phí / 1.000.000đ..." />
                <TextField label="Số giờ CME" value={form.cmeHours} onChange={up('cmeHours')} placeholder="4 giờ CME..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField label="Thông tin chỗ ngồi" value={form.capacityText} onChange={up('capacityText')} placeholder="Đã đăng ký 150/200 chỗ..." />
                <TextField label="% Đã đăng ký" value={String(form.progress)} onChange={v => setForm(f => f ? ({ ...f, progress: Number(v) || 0 }) : null)} type="number" placeholder="75" />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Diễn giả (mỗi dòng 1 tên)</label>
                <textarea
                  value={speakersRaw}
                  onChange={e => setSpeakersRaw(e.target.value)}
                  rows={4}
                  placeholder="PGS.TS.BS Nguyễn Văn A&#10;TS.BS Trần Thị B"
                  className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Images + preview */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-4">
              <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Ảnh sự kiện</h2>
              <ImageUploadField
                label="Tải lên ảnh đại diện"
                value={form.imageUrl}
                onChange={up('imageUrl')}
                recommendedSize="1200 x 675 px (Tỷ lệ 16:9)"
              />
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
