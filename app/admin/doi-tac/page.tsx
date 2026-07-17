'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Handshake, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import { PARTNERS_DATA } from '@/lib/data';
import { getPartners, deletePartner } from '@/app/actions/partner';
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
};

const CATEGORY_COLORS: Record<string, string> = {
  'Kim cương': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Vàng': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Bạc': 'bg-slate-400/10 text-slate-300 border-slate-400/20',
  'Đồng hành': 'bg-white/5 text-white/40 border-white/10',
};

export default function DoiTacCMS() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const { toast, showToast, closeToast } = useToast();
  const [dbActive, setDbActive] = useState(false);

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbActive(connected);
      if (connected) {
        getPartners().then(data => setPartners(data as any));
      } else {
        const saved = localStorage.getItem('cms_doi_tac');
        if (saved) {
          try { setPartners(JSON.parse(saved)); return; } catch {}
        }
        setPartners(PARTNERS_DATA as Partner[]);
      }
    });
  }, []);

  const handleDelete = async (partner: Partner) => {
    if (dbActive) {
      const res = await deletePartner(partner.id);
      if (res.success) {
        setPartners(partners.filter(p => p.id !== partner.id));
        showToast('✅ Đã xóa đối tác thành công!', 'success');
      } else {
        showToast('❌ Lỗi: ' + res.error, 'error');
      }
    } else {
      const newList = partners.filter(p => p.id !== partner.id);
      setPartners(newList);
      localStorage.setItem('cms_doi_tac', JSON.stringify(newList));
      showToast('✅ Đã xóa đối tác (local)!', 'success');
    }
    setConfirmDeleteId(null);
  };

  const filtered = partners.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['Kim cương', 'Vàng', 'Bạc', 'Đồng hành'];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Handshake className="size-5 text-amber-400" />
              Quản lý Đối tác
            </h1>
            <p className="text-xs text-white/40 mt-0.5">{partners.length} đối tác chiến lược</p>
          </div>
          <Link
            href="/admin/doi-tac/them-moi"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
          >
            <Plus className="size-4" />
            Thêm đối tác
          </Link>
        </div>
      </div>

      <div className="p-8">
        {/* Search */}
        <div className="relative mb-6 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
          <input type="text" placeholder="Tìm kiếm đối tác..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl bg-[#161b22] border border-white/[0.06] pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ec297b]/40 focus:outline-none transition-all"
          />
        </div>

        {/* By Category */}
        {categories.map(cat => {
          const catPartners = filtered.filter(p => p.category === cat);
          if (catPartners.length === 0) return null;
          return (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${CATEGORY_COLORS[cat]}`}>{cat}</span>
                <div className="flex-1 h-px bg-white/[0.04]" />
                <span className="text-xs text-white/30">{catPartners.length} đối tác</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {catPartners.map(partner => (
                  <div key={partner.id} className="group flex gap-5 rounded-2xl bg-[#161b22] border border-white/[0.06] p-5 hover:border-white/10 transition-all">
                    {/* Logo Placeholder */}
                    <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <span className="text-[10px] font-bold text-white/30 uppercase text-center px-2 leading-tight">{partner.name.split(' ').slice(0,2).join(' ')}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-white/80 mb-1">{partner.name}</h3>
                          <p className="text-xs text-white/40 line-clamp-2">{partner.description}</p>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/30">
                            {partner.website && <span>🌐 {partner.website}</span>}
                            {partner.email && <span>✉️ {partner.email}</span>}
                            {partner.phone && <span>📞 {partner.phone}</span>}
                          </div>
                          {partner.products.length > 0 && (
                            <p className="text-[11px] text-amber-400/70 mt-1">{partner.products.length} sản phẩm</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Link
                            href={`/admin/doi-tac/${partner.id}`}
                            className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-[#ec297b]/10 hover:text-[#ec297b] px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                          >
                            <Pencil className="size-3" /> Sửa
                          </Link>
                          
                          {confirmDeleteId === partner.id ? (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-1.5">
                              <span className="text-xs text-red-400 font-semibold">Xóa?</span>
                              <button onClick={() => handleDelete(partner)} className="text-xs font-bold text-red-400 hover:text-red-300">Có</button>
                              <button onClick={() => setConfirmDeleteId(null)} className="text-xs font-semibold text-white/40 hover:text-white">Không</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(partner.id)}
                              className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 px-3 py-1.5 text-xs font-semibold text-white/50 transition-all"
                            >
                              <Trash2 className="size-3" />
                              Xóa
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 text-center">
            <Handshake className="size-10 text-white/10 mb-3" />
            <p className="text-sm text-white/30">Không tìm thấy đối tác nào</p>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
