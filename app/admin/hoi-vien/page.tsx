'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Plus, Pencil, Trash2, Star, Mail, Phone, Search } from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import { DOCTORS_DATA } from '@/lib/data';
import { getDoctors, deleteDoctor } from '@/app/actions/doctor';
import { isDbConnected } from '@/app/actions/dbCheck';

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

export default function HoiVienCMS() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'official' | 'regular'>('all');
  const { toast, showToast, closeToast } = useToast();
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbConnected(connected);
      if (connected) {
        getDoctors().then(data => {
          setDoctors(data as Doctor[]);
        });
      } else {
        const saved = localStorage.getItem('cms_hoi_vien');
        if (saved) {
          try {
            setDoctors(JSON.parse(saved));
            return;
          } catch {}
        }
        setDoctors(DOCTORS_DATA as Doctor[]);
      }
    });
  }, []);

  const handleDelete = async (d: Doctor) => {
    if (dbConnected) {
      const res = await deleteDoctor(d.id);
      if (res.success) {
        setDoctors(doctors.filter(x => x.id !== d.id));
        showToast('Đã xóa bác sĩ khỏi danh sách', 'success');
      } else {
        showToast(res.error || 'Lỗi khi xóa hội viên', 'error');
      }
    } else {
      const newList = doctors.filter(x => x.id !== d.id);
      setDoctors(newList);
      localStorage.setItem('cms_hoi_vien', JSON.stringify(newList));
      showToast('Đã xóa bác sĩ khỏi danh sách', 'success');
    }
    setConfirmDeleteId(null);
  };

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.role ?? '').toLowerCase().includes(search.toLowerCase()) ||
      d.clinic.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'official' && d.isOfficial) || (filter === 'regular' && !d.isOfficial);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="size-5 text-indigo-400" />
              Quản lý Hội viên
            </h1>
            <p className="text-xs text-white/40 mt-0.5">{doctors.length} bác sĩ • {doctors.filter(d => d.isOfficial).length} hội viên chính thức</p>
          </div>
          <Link
            href="/admin/hoi-vien/them-moi"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
          >
            <Plus className="size-4" />
            Thêm bác sĩ
          </Link>
        </div>
      </div>

      <div className="p-8">
        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
            <input
              type="text" placeholder="Tìm kiếm bác sĩ..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl bg-[#161b22] border border-white/[0.06] pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ec297b]/40 focus:outline-none transition-all"
            />
          </div>
          <div className="flex gap-1 rounded-xl bg-[#161b22] border border-white/[0.06] p-1">
            {[
              ['all','Tất cả'],
              ['official','Chính thức'],
              ['regular','Liên kết']
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setFilter(v as typeof filter)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === v ? 'bg-[#ec297b] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Bác sĩ</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Vai trò</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Cơ sở hành nghề</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Liên hệ</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map(doctor => (
                  <tr key={doctor.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 shrink-0 rounded-full overflow-hidden bg-white/5 border border-white/10">
                          {doctor.avatar ? (
                            <img src={doctor.avatar} alt={doctor.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs font-bold text-white/30">
                              {doctor.name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white/80 text-sm">{doctor.title} {doctor.name}</p>
                          <p className="text-[11px] text-white/30">{doctor.cchn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-white/60">{doctor.role || '—'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-white/60 max-w-[180px] line-clamp-2">{doctor.clinic}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        {doctor.email && (
                          <p className="flex items-center gap-1.5 text-[11px] text-white/40"><Mail className="size-3" />{doctor.email}</p>
                        )}
                        {doctor.phone && (
                          <p className="flex items-center gap-1.5 text-[11px] text-white/40"><Phone className="size-3" />{doctor.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {doctor.isOfficial ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ec297b]/10 px-2.5 py-1 text-[10px] font-bold text-[#ec297b] border border-[#ec297b]/20">
                          <Star className="size-2.5 fill-current animate-pulse" />
                          Chính thức
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold text-white/40 border border-white/10">
                          Liên kết
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/hoi-vien/${doctor.id}`}
                          className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-[#ec297b]/10 hover:text-[#ec297b] px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                        >
                          <Pencil className="size-3" />
                          Sửa
                        </Link>
                        
                        {confirmDeleteId === doctor.id ? (
                          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-1.5">
                            <span className="text-xs text-red-400 font-semibold">Xóa?</span>
                            <button onClick={() => handleDelete(doctor)} className="text-xs font-bold text-red-400 hover:text-red-300">Có</button>
                            <button onClick={() => setConfirmDeleteId(null)} className="text-xs font-semibold text-white/40 hover:text-white">Không</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(doctor.id)}
                            className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                          >
                            <Trash2 className="size-3" />
                            Xóa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="size-10 text-white/10 mb-3" />
              <p className="text-sm text-white/30">Không tìm thấy bác sĩ nào</p>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
