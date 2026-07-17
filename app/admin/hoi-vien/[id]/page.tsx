'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Users } from 'lucide-react';
import { Toast, useToast } from '../../components/Toast';
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploadField from '../../components/ImageUploadField';
import { getDoctorById, saveDoctor } from '@/app/actions/doctor';
import { isDbConnected } from '@/app/actions/dbCheck';
import { DOCTORS_DATA } from '@/lib/data';

type Doctor = {
  id: string;
  name: string;
  title: string;
  role?: string;
  avatar: string;
  cchn: string;
  clinic: string;
  address: string;
  specialty: string[];
  education: string[];
  experience: string;
  email: string;
  phone: string;
  isOfficial: boolean;
  joinedYear: number;
  biography?: string[];
};

const SECTIONS = [
  { id: 'basic', label: 'Thông tin cơ bản' },
  { id: 'details', label: 'Chuyên môn & Học vấn' },
  { id: 'bio', label: 'Tiểu sử' },
] as const;

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

export default function SuaHoiVienPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<Doctor | null>(null);
  const [specialtyRaw, setSpecialtyRaw] = useState('');
  const [educationRaw, setEducationRaw] = useState('');
  const [bioRaw, setBioRaw] = useState('');
  const [activeSection, setActiveSection] = useState<'basic' | 'details' | 'bio'>('basic');
  const { toast, showToast, closeToast } = useToast();
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbConnected(connected);
      if (connected) {
        getDoctorById(id).then(item => {
          if (item) {
            const doc = item as Doctor;
            setForm(doc);
            setSpecialtyRaw((doc.specialty || []).join('\n'));
            setEducationRaw((doc.education || []).join('\n'));
            setBioRaw((doc.biography || []).join('\n\n'));
          } else {
            setForm(null);
          }
        });
      } else {
        const saved = localStorage.getItem('cms_hoi_vien');
        let list: Doctor[] = [];
        if (saved) {
          try {
            list = JSON.parse(saved);
          } catch {}
        } else {
          list = DOCTORS_DATA as Doctor[];
        }
        setDoctors(list);
        const item = list.find(d => d.id === id);
        if (item) {
          setForm(item);
          setSpecialtyRaw((item.specialty || []).join('\n'));
          setEducationRaw((item.education || []).join('\n'));
          setBioRaw((item.biography || []).join('\n\n'));
        }
      }
    });
  }, [id]);

  const up = (key: keyof Doctor) => (v: string) => {
    if (form) setForm({ ...form, [key]: v });
  };

  const handleSave = async () => {
    if (!form || !form.name.trim()) return;

    const specialty = specialtyRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const education = educationRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const biography = bioRaw.split('\n\n').map(s => s.trim()).filter(Boolean);

    if (dbConnected) {
      const res = await saveDoctor({
        id: form.id,
        name: form.name,
        title: form.title,
        role: form.role,
        avatar: form.avatar,
        cchn: form.cchn,
        clinic: form.clinic,
        address: form.address,
        specialty,
        education,
        experience: form.experience,
        email: form.email,
        phone: form.phone,
        isOfficial: form.isOfficial,
        joinedYear: form.joinedYear,
        biography,
      });

      if (res.success) {
        showToast('✅ Đã cập nhật thông tin hội viên thành công!', 'success');
        setTimeout(() => router.push('/admin/hoi-vien'), 800);
      } else {
        showToast(res.error || 'Lỗi khi cập nhật hội viên', 'error');
      }
    } else {
      const updatedItem: Doctor = {
        ...form,
        specialty,
        education,
        biography,
      };
      const newList = doctors.map(d => d.id === id ? updatedItem : d);
      localStorage.setItem('cms_hoi_vien', JSON.stringify(newList));
      showToast('✅ Đã cập nhật thông tin hội viên thành công!', 'success');
      setTimeout(() => router.push('/admin/hoi-vien'), 800);
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-sm">Không tìm thấy hội viên hoặc dữ liệu đang tải...</p>
        <button onClick={() => router.push('/admin/hoi-vien')} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-all">
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
            <button onClick={() => router.push('/admin/hoi-vien')}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 transition-all">
              <ArrowLeft className="size-4" /> Quay lại
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-white/30 mb-0.5">
                <span>Admin</span><span>/</span><span>Hội viên</span><span>/</span>
                <span className="text-white/60">Chỉnh sửa</span>
              </div>
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="size-5 text-[#6366f1]" />
                Chỉnh sửa thông tin hội viên
              </h1>
            </div>
          </div>
          <button onClick={handleSave} disabled={!form.name.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all disabled:opacity-40">
            <Save className="size-3.5" /> Lưu thay đổi
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-5xl">
          {/* Section Tabs */}
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
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-5">
              {activeSection === 'basic' && (
                <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
                  <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Thông tin định danh</h2>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Học hàm/vị</label>
                      <select
                        value={form.title}
                        onChange={e => setForm(f => f ? ({ ...f, title: e.target.value }) : null)}
                        className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-3 py-2.5 text-sm text-white focus:border-[#ec297b]/50 focus:outline-none transition-all"
                      >
                        {['GS.TS.BS','PGS.TS.BS','TS.BS','ThS.BS','BSCKII','BSCKI','BS'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <TextField label="Họ và tên *" value={form.name} onChange={up('name')} placeholder="Ví dụ: Nguyễn Văn Hải..." />
                    </div>
                  </div>

                  <TextField label="Vai trò trong hội" value={form.role || ''} onChange={up('role')} placeholder="Ví dụ: Ủy viên Ban Chấp hành..." />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Email liên hệ" value={form.email} onChange={up('email')} placeholder="bacsi@example.com" />
                    <TextField label="Số điện thoại" value={form.phone} onChange={up('phone')} placeholder="09xx.xxx.xxx" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <TextField label="Số CCHN (Chứng chỉ hành nghề)" value={form.cchn} onChange={up('cchn')} placeholder="012345/BYT-CCHN" />
                    <TextField label="Năm gia nhập hội" value={String(form.joinedYear)} onChange={v => setForm(f => f ? ({ ...f, joinedYear: Number(v) || 2024 }) : null)} type="number" placeholder="2024" />
                  </div>

                  <TextField label="Cơ sở công tác chính" value={form.clinic} onChange={up('clinic')} placeholder="Bệnh viện Đại học Y Dược TP.HCM" />
                  <TextField label="Địa chỉ cơ sở" value={form.address} onChange={up('address')} placeholder="215 Hồng Bàng, Quận 5, TP.HCM" />
                </div>
              )}

              {activeSection === 'details' && (
                <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
                  <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Chuyên môn sâu & Đào tạo</h2>
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Chuyên khoa thế mạnh (mỗi dòng 1 mục)</label>
                    <textarea
                      value={specialtyRaw}
                      onChange={e => setSpecialtyRaw(e.target.value)}
                      rows={4}
                      placeholder="Nâng ngực nội soi&#10;Tạo hình mũi cấu trúc&#10;Hút mỡ bụng"
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Học vấn & Đào tạo (mỗi dòng 1 mục)</label>
                    <textarea
                      value={educationRaw}
                      onChange={e => setEducationRaw(e.target.value)}
                      rows={4}
                      placeholder="Tốt nghiệp Bác sĩ Y khoa - Đại học Y Dược TP.HCM&#10;Tu nghiệp Phẫu thuật thẩm mỹ tại Đại học Seoul, Hàn Quốc"
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <RichTextEditor label="Tóm tắt kinh nghiệm lâm sàng" value={form.experience} onChange={up('experience')} placeholder="Ví dụ: Hơn 15 năm hoạt động trong lĩnh vực tạo hình thẩm mỹ, thực hiện thành công hơn 5000 ca..." />
                </div>
              )}

              {activeSection === 'bio' && (
                <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-5">
                  <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Tiểu sử chi tiết</h2>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">Tiểu sử cá nhân (phân cách bằng dòng trống)</label>
                    <textarea
                      value={bioRaw}
                      onChange={e => setBioRaw(e.target.value)}
                      rows={12}
                      placeholder="Bác sĩ Nguyễn Văn Hải sinh năm 1975...&#10;&#10;Năm 2010, ông được bổ nhiệm làm Phó trưởng khoa..."
                      className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all resize-none"
                    />
                    <p className="text-[11px] text-white/30">Mỗi đoạn văn cách nhau bởi một dòng trống (ấn Enter 2 lần)</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {/* Avatar upload */}
              <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-4">
                <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Ảnh chân dung</h2>
                <ImageUploadField
                  label="Tải lên ảnh chân dung"
                  value={form.avatar}
                  onChange={up('avatar')}
                  recommendedSize="400 x 400 px (Tỷ lệ 1:1)"
                />
              </div>

              {/* Status */}
              <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6 space-y-4">
                <h2 className="text-sm font-bold text-white/70 border-b border-white/[0.06] pb-3">Phân loại hội viên</h2>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <input
                    type="checkbox"
                    id="isOfficial"
                    checked={form.isOfficial}
                    onChange={e => setForm(f => f ? ({ ...f, isOfficial: e.target.checked }) : null)}
                    className="h-4 w-4 rounded border-white/20 bg-[#0d1117] accent-[#ec297b]"
                  />
                  <label htmlFor="isOfficial" className="text-sm text-white/70 font-semibold cursor-pointer select-none">
                    Hội viên chính thức
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
