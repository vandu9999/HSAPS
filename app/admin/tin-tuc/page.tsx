'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Newspaper, Plus, Pencil, Trash2, ImageIcon, Search, Eye } from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import { isDbConnected } from '@/app/actions/dbCheck';
import { getNews, saveNews, deleteNews } from '@/app/actions/news';

export type NewsItem = {
  id: string;
  imageUrl: string;
  category: string;
  categoryColor: 'primary' | 'secondary';
  date: string;
  title: string;
  excerpt: string;
  published: boolean;
};

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    category: 'Báo cáo',
    categoryColor: 'primary',
    date: '10 Tháng 11, 2024',
    title: 'Thông báo về việc nộp bài báo khoa học quý IV/2024',
    excerpt: 'Ban biên soạn tạp chí HSAPS chính thức tiếp nhận các công trình nghiên cứu và bài báo khoa học chuẩn bị xuất bản số cuối năm.',
    published: true,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    category: 'Hợp tác quốc tế',
    categoryColor: 'secondary',
    date: '05 Tháng 11, 2024',
    title: 'Lễ ký kết hợp tác chiến lược với Hội Phẫu thuật thẩm mỹ Hàn Quốc (KAPS)',
    excerpt: 'Sự kiện đánh dấu cột mốc quan trọng trong trao đổi học thuật, chuyển giao công nghệ và công nhận tín chỉ CME song phương.',
    published: true,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    category: 'Khuyến cáo',
    categoryColor: 'primary',
    date: '01 Tháng 11, 2024',
    title: 'Hướng dẫn lâm sàng về phòng ngừa biến chứng tiêm chất làm đầy (Filler)',
    excerpt: 'Khuyến cáo đồng thuận mới nhất của Hội đồng Y khoa HSAPS nhằm tăng cường tính an toàn và giảm thiểu rủi ro trong thẩm mỹ nội khoa.',
    published: true,
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    category: 'Hoạt động Hội',
    categoryColor: 'secondary',
    date: '28 Tháng 10, 2024',
    title: 'Đoàn đại biểu đại diện HSAPS tham dự Hội nghị Thẩm mỹ Quốc tế IMCAS Châu Á',
    excerpt: 'Đoàn chuyên gia hàng đầu Việt Nam báo cáo các chuyên đề khoa học và chia sẻ những kỹ thuật tạo hình thẩm mỹ đặc trưng khu vực.',
    published: true,
  },
];

export default function TinTucCMS() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [dbConnected, setDbConnected] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    isDbConnected().then(connected => {
      setDbConnected(connected);
      if (connected) {
        getNews().then(data => {
          setNews(data as NewsItem[]);
        });
      } else {
        const saved = localStorage.getItem('cms_tin_tuc');
        if (saved) {
          try {
            setNews(JSON.parse(saved));
            return;
          } catch {}
        }
        setNews(DEFAULT_NEWS);
      }
    });
  }, []);

  const handleDelete = async (item: NewsItem) => {
    if (dbConnected) {
      const res = await deleteNews(item.id);
      if (res.success) {
        setNews(prev => prev.filter(x => x.id !== item.id));
        setConfirmDeleteId(null);
        showToast('Đã xóa tin tức', 'success');
      } else {
        showToast(res.error || 'Lỗi khi xóa tin tức', 'error');
      }
    } else {
      const updatedList = news.filter(x => x.id !== item.id);
      setNews(updatedList);
      localStorage.setItem('cms_tin_tuc', JSON.stringify(updatedList));
      setConfirmDeleteId(null);
      showToast('Đã xóa tin tức (Local)', 'success');
    }
  };

  const togglePublish = async (item: NewsItem) => {
    const updated = { ...item, published: !item.published };
    if (dbConnected) {
      const res = await saveNews(updated);
      if (res.success) {
        setNews(prev => prev.map(x => x.id === item.id ? (res.news as NewsItem) : x));
        showToast(updated.published ? '✅ Đã xuất bản' : 'Đã chuyển về nháp', 'success');
      } else {
        showToast(res.error || 'Lỗi khi cập nhật trạng thái', 'error');
      }
    } else {
      const updatedList = news.map(x => x.id === item.id ? updated : x);
      setNews(updatedList);
      localStorage.setItem('cms_tin_tuc', JSON.stringify(updatedList));
      showToast(updated.published ? '✅ Đã xuất bản (Local)' : 'Đã chuyển về nháp (Local)', 'success');
    }
  };

  const filtered = news.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterPublished === 'all' ||
      (filterPublished === 'published' && n.published) ||
      (filterPublished === 'draft' && !n.published);
    return matchSearch && matchFilter;
  });

  const publishedCount = news.filter(n => n.published).length;
  const draftCount = news.filter(n => !n.published).length;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Newspaper className="size-5 text-rose-400" />
              Quản lý Tin tức
            </h1>
            <p className="text-xs text-white/40 mt-0.5">
              {news.length} bài viết • {publishedCount} đã xuất bản • {draftCount} nháp
            </p>
          </div>
          <Link
            href="/admin/tin-tuc/them-moi"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all"
          >
            <Plus className="size-4" />
            Thêm tin tức
          </Link>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Tổng bài viết', value: news.length, color: 'text-white' },
            { label: 'Đã xuất bản', value: publishedCount, color: 'text-emerald-400' },
            { label: 'Bản nháp', value: draftCount, color: 'text-amber-400' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-4 flex items-center gap-4">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-white/40 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/30" />
            <input
              type="text" placeholder="Tìm kiếm tin tức, danh mục..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl bg-[#161b22] border border-white/[0.06] pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#ec297b]/40 focus:outline-none transition-all"
            />
          </div>
          <div className="flex gap-1 rounded-xl bg-[#161b22] border border-white/[0.06] p-1">
            {[
              ['all', 'Tất cả'],
              ['published', 'Đã xuất bản'],
              ['draft', 'Bản nháp'],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setFilterPublished(v as typeof filterPublished)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filterPublished === v ? 'bg-[#ec297b] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* News List */}
        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <div key={item.id} className="group flex gap-4 rounded-2xl bg-[#161b22] border border-white/[0.06] p-4 hover:border-white/10 transition-all">
              {/* Order badge */}
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[10px] font-bold text-white/30 self-center">
                {idx + 1}
              </div>

              {/* Image */}
              <div className="relative h-20 w-32 shrink-0 rounded-xl overflow-hidden bg-white/5">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="size-6 text-white/10" />
                  </div>
                )}
                {/* Category badge */}
                {item.category && (
                  <div className={`absolute top-1.5 left-1.5 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide ${
                    item.categoryColor === 'primary' ? 'bg-[#ec297b] text-white' : 'bg-[#fcd34d] text-[#2d1a24]'
                  }`}>
                    {item.category}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.published ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Đã xuất bản
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          Bản nháp
                        </span>
                      )}
                      <span className="text-[10px] text-white/30">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white/80 line-clamp-1 mb-1">{item.title}</h3>
                    <p className="text-xs text-white/40 line-clamp-2">{item.excerpt}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => togglePublish(item)}
                      title={item.published ? 'Chuyển về nháp' : 'Xuất bản'}
                      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                        item.published
                          ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                          : 'bg-white/[0.04] text-white/40 hover:bg-amber-500/10 hover:text-amber-400'
                      }`}
                    >
                      <Eye className="size-3" />
                      {item.published ? 'Ẩn' : 'Hiện'}
                    </button>
                    <Link
                      href={`/admin/tin-tuc/${item.id}`}
                      className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-[#ec297b]/10 hover:text-[#ec297b] px-2.5 py-1.5 text-xs font-semibold text-white/50 transition-all"
                    >
                      <Pencil className="size-3" />
                      Sửa
                    </Link>
                    
                    {confirmDeleteId === item.id ? (
                      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-1.5">
                        <span className="text-xs text-red-400 font-semibold">Xóa?</span>
                        <button onClick={() => handleDelete(item)} className="text-xs font-bold text-red-400 hover:text-red-300">Có</button>
                        <button onClick={() => setConfirmDeleteId(null)} className="text-xs font-semibold text-white/40 hover:text-white">Không</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 px-2.5 py-1.5 text-xs font-semibold text-white/50 transition-all"
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

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
              <Newspaper className="size-12 text-white/10 mb-3" />
              <p className="text-sm text-white/30 font-medium">Không tìm thấy bài viết nào</p>
              <Link
                href="/admin/tin-tuc/them-moi"
                className="mt-4 text-xs text-[#ec297b] hover:underline font-semibold"
              >
                + Thêm tin tức đầu tiên
              </Link>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}
