'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Pencil, Trash2, Search, Tag, ImageIcon } from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import { SCIENTIFIC_REPORTS_DATA as REPORTS_DATA } from '@/lib/data';
import { getReports, deleteReport } from '@/app/actions/report';
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

export default function BaoCaoCMS() {
  const [reports, setReports] = useState<Report[]>([]);
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbConnected(connected);
      if (connected) {
        getReports().then(data => {
          setReports(data as Report[]);
        });
      } else {
        const saved = localStorage.getItem('cms_bao_cao');
        if (saved) {
          try { setReports(JSON.parse(saved)); return; } catch {}
        }
        const defaults: Report[] = REPORTS_DATA.map(r => ({
          id: r.id, title: r.title, authors: r.authors, abstract: r.abstract,
          category: r.category, date: r.date, journal: r.journal,
          imageUrl: r.imageUrl ?? '', tags: r.tags, doi: r.doi ?? '', views: r.views,
        }));
        setReports(defaults);
        localStorage.setItem('cms_bao_cao', JSON.stringify(defaults));
      }
    });
  }, []);

  const handleDelete = async (r: Report) => {
    if (dbConnected) {
      const res = await deleteReport(r.id);
      if (res.success) {
        setReports(prev => prev.filter(x => x.id !== r.id));
        showToast('Đã xóa báo cáo', 'success');
      } else {
        showToast(res.error || 'Lỗi xóa báo cáo', 'error');
      }
    } else {
      const updated = reports.filter(x => x.id !== r.id);
      setReports(updated);
      localStorage.setItem('cms_bao_cao', JSON.stringify(updated));
      showToast('Đã xóa báo cáo', 'success');
    }
    setConfirmDeleteId(null);
  };

  const filtered = reports.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.authors.some(a => a.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="size-5 text-emerald-400" />
              Báo cáo Khoa học
            </h1>
            <p className="text-xs text-white/40 mt-0.5">{reports.length} báo cáo trong hệ thống</p>
          </div>
          <Link
            href="/admin/bao-cao/them-moi"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
          >
            <Plus className="size-4" />
            Thêm báo cáo
          </Link>
        </div>
      </div>

      <div className="p-8">
        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
          <input type="text" placeholder="Tìm kiếm báo cáo, tác giả..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#161b22] border border-white/[0.06] pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ec297b]/40 focus:outline-none transition-all" />
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Báo cáo</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Tác giả</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Danh mục</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Ngày</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold text-white/30 uppercase tracking-wider">Lượt xem</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map(report => (
                  <tr key={report.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 max-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 shrink-0 rounded-lg overflow-hidden bg-white/5 border border-white/[0.06]">
                          {report.imageUrl
                            ? <img src={report.imageUrl} alt="" className="h-full w-full object-cover" />
                            : <div className="flex h-full items-center justify-center"><ImageIcon className="size-4 text-white/10" /></div>
                          }
                        </div>
                        <p className="text-sm font-semibold text-white/80 line-clamp-2">{report.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-white/50">{report.authors.slice(0, 2).join(', ')}{report.authors.length > 2 ? '...' : ''}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#ec297b]/10 px-2.5 py-1 text-[10px] font-bold text-[#ec297b] border border-[#ec297b]/20">
                        <Tag className="size-2.5" />
                        {report.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-white/40">{report.date}</td>
                    <td className="px-5 py-4 text-xs text-white/40">{report.views.toLocaleString()}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/admin/bao-cao/${report.id}`}
                          className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-[#ec297b]/10 hover:text-[#ec297b] px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                        >
                          <Pencil className="size-3" /> Sửa
                        </Link>
                        
                        {confirmDeleteId === report.id ? (
                          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-1.5">
                            <span className="text-xs text-red-400 font-semibold">Xóa?</span>
                            <button onClick={() => handleDelete(report)} className="text-xs font-bold text-red-400 hover:text-red-300">Có</button>
                            <button onClick={() => setConfirmDeleteId(null)} className="text-xs font-semibold text-white/40 hover:text-white">Không</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(report.id)}
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
              <BookOpen className="size-10 text-white/10 mb-3" />
              <p className="text-sm text-white/30">Không tìm thấy báo cáo nào</p>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
