'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarDays, Plus, Pencil, Trash2, ImageIcon, Search } from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import { SCIENTIFIC_EVENTS_DATA } from '@/lib/data';
import { getEvents, deleteEvent } from '@/app/actions/event';
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

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  upcoming: { label: 'Sắp diễn ra', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  ongoing: { label: 'Đang diễn ra', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  completed: { label: 'Đã kết thúc', color: 'bg-white/5 text-white/40 border-white/10' },
};

export default function SuKienCMS() {
  const [events, setEvents] = useState<Event[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { toast, showToast, closeToast } = useToast();
  const [dbActive, setDbActive] = useState(false);

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbActive(connected);
      if (connected) {
        getEvents().then(data => setEvents(data as any));
      } else {
        const saved = localStorage.getItem('cms_su_kien');
        if (saved) {
          try { setEvents(JSON.parse(saved)); return; } catch {}
        }
        // Initialize with default data
        const defaults: Event[] = SCIENTIFIC_EVENTS_DATA.map(e => ({
          id: e.id, title: e.title, type: e.type, date: e.date, time: e.time,
          location: e.location, imageUrl: e.imageUrl, description: e.description,
          registrationFee: e.registrationFee, status: e.status as any,
          cmeHours: e.cmeHours, capacityText: e.capacityText, progress: e.progress,
          speakers: e.speakers,
        }));
        setEvents(defaults);
      }
    });
  }, []);

  const handleDelete = async (event: Event) => {
    if (dbActive) {
      const res = await deleteEvent(event.id);
      if (res.success) {
        setEvents(events.filter(e => e.id !== event.id));
        showToast('✅ Đã xóa sự kiện thành công!', 'success');
      } else {
        showToast('❌ Lỗi: ' + res.error, 'error');
      }
    } else {
      const newList = events.filter(e => e.id !== event.id);
      setEvents(newList);
      localStorage.setItem('cms_su_kien', JSON.stringify(newList));
      showToast('✅ Đã xóa sự kiện (local)!', 'success');
    }
    setConfirmDeleteId(null);
  };

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <CalendarDays className="size-5 text-sky-400" />
              Quản lý Sự kiện
            </h1>
            <p className="text-xs text-white/40 mt-0.5">{events.length} sự kiện trong hệ thống</p>
          </div>
          <Link
            href="/admin/su-kien/them-moi"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
          >
            <Plus className="size-4" />
            Thêm sự kiện
          </Link>
        </div>
      </div>

      <div className="p-8">
        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#161b22] border border-white/[0.06] pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ec297b]/40 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/10 transition-all"
          />
        </div>

        {/* Events Grid */}
        <div className="space-y-4">
          {filtered.map((event) => {
            const status = STATUS_LABELS[event.status];
            return (
              <div key={event.id} className="group flex gap-5 rounded-2xl bg-[#161b22] border border-white/[0.06] p-5 hover:border-white/10 transition-all">
                {/* Image */}
                <div className="relative h-28 w-40 shrink-0 rounded-xl overflow-hidden bg-white/5">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="size-8 text-white/10" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
                          {status.label}
                        </span>
                        <span className="text-[10px] text-white/30 font-medium">{event.type}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 mb-2">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
                        <span>📅 {event.date}</span>
                        {event.time && <span>🕐 {event.time}</span>}
                        {event.location && <span>📍 {event.location}</span>}
                      </div>
                      {event.cmeHours && (
                        <p className="text-[11px] text-sky-400/70 mt-1">{event.cmeHours}</p>
                      )}
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/su-kien/${event.id}`}
                        className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-[#ec297b]/10 hover:text-[#ec297b] px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                      >
                        <Pencil className="size-3" />
                        Sửa
                      </Link>
                      
                      {confirmDeleteId === event.id ? (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-1.5">
                          <span className="text-xs text-red-400 font-semibold">Xóa?</span>
                          <button onClick={() => handleDelete(event)} className="text-xs font-bold text-red-400 hover:text-red-300">Có</button>
                          <button onClick={() => setConfirmDeleteId(null)} className="text-xs font-semibold text-white/40 hover:text-white">Không</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(event.id)}
                          className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                        >
                          <Trash2 className="size-3" />
                          Xóa
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Progress */}
                  {event.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-white/30">{event.capacityText}</span>
                        <span className="text-[10px] text-white/40 font-mono">{event.progress}%</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#ec297b] to-[#fcd34d]"
                          style={{ width: `${event.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <CalendarDays className="size-10 text-white/10 mb-3" />
              <p className="text-sm text-white/30 font-medium">Không tìm thấy sự kiện nào</p>
              <Link href="/admin/su-kien/them-moi" className="mt-4 text-xs text-[#ec297b] hover:underline font-semibold">
                + Thêm sự kiện đầu tiên
              </Link>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
