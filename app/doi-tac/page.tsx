'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Search, 
  ChevronRight, 
  SlidersHorizontal,
  Sparkles,
  FileText,
  Share2,
  CheckCircle2,
  ExternalLink,
  Layers,
  Archive,
  BarChart2,
  BadgeCheck,
  ShieldCheck,
  Megaphone
} from 'lucide-react';
import { PARTNERS_DATA } from '@/lib/data';
import PartnerLogo from '@/components/PartnerLogo';

const CATEGORIES = ['Tất cả', 'Kim cương', 'Vàng', 'Bạc'];

export default function PartnersListingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Filter partners based on search term and category
  const filteredPartners = useMemo(() => {
    let result = PARTNERS_DATA;

    if (selectedCategory !== 'Tất cả') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.address.toLowerCase().includes(term)
      );
    }

    return result;
  }, [searchTerm, selectedCategory]);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white font-sans">
      
      <main className="flex-grow py-8 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px] space-y-12">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#2d1220] via-[#1a1016] to-[#2d1220] p-8 sm:p-12 rounded-3xl text-white shadow-md relative overflow-hidden border border-[#ec297b]/20">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#ec297b] blur-2xl"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-500 blur-2xl"></div>
            </div>
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest bg-[#ec297b]/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm text-pink-300 border border-[#ec297b]/30 inline-flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Mạng lưới liên kết & Hợp tác Doanh nghiệp
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Đối tác &amp; Nhà tài trợ
              </h1>
              <p className="text-sm sm:text-base text-pink-100 max-w-xl font-medium leading-relaxed">
                Đồng hành cùng HSAPS trong việc cập nhật thiết bị y khoa tiên tiến, vật liệu tạo hình cao cấp và nâng cao vị thế thương hiệu trên cổng thông tin chính thống.
              </p>
            </div>
          </div>

          {/* SECTION: BẢNG QUYỀN LỢI ĐỒNG HÀNH & TÀI TRỢ DOANH NGHIỆP */}
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block rounded-full bg-pink-100 px-3.5 py-1 text-xs font-bold text-primary dark:bg-pink-900/30 dark:text-pink-300">
                Giá Trị Thương Hiệu Lâu Dài
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2d1a24] dark:text-white">
                Quyền Lợi Doanh Nghiệp Đồng Hành Cùng Website HSAPS
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Gia tăng độ uy tín, bảo chứng y khoa và tiếp cận vĩnh viễn cộng đồng bác sĩ chuyên khoa trên nền tảng chính thức của Hội
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Quyền lợi 1 */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-pink-50 text-primary dark:bg-pink-950/40">
                    <Megaphone className="size-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Quyền lợi 01</span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                      Hiển thị Thương hiệu & Banner
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Logo trang trọng:</strong> Hiển thị liên tục tại Footer &amp; Section Đối tác chiến lược trang chủ.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Banner VIP:</strong> Gói Kim Cương/Vàng đặt banner tĩnh/động tại Header/Sidebar liên kết website thương hiệu.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span><strong>Phân cấp danh vị:</strong> Sắp xếp vị trí logo chuẩn xác theo gói Kim Cương, Vàng, Bạc, Đồng hành.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quyền lợi 2 */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40">
                    <FileText className="size-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest">Quyền lợi 02</span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                      Bài viết PR &amp; Truyền thông SEO
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Trang doanh nghiệp riêng:</strong> Bài viết chi tiết dòng sản phẩm &amp; chứng nhận chất lượng (FDA, CE, ISO,...).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Bài viết chuyên môn &amp; Case Study:</strong> Công bố nghiên cứu lâm sàng, công nghệ mới tiếp cận trực tiếp bác sĩ.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>Gắn Backlink SEO:</strong> Bài viết đính kèm link dofollow/nofollow chuẩn SEO về website chính doanh nghiệp.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quyền lợi 3 */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/40">
                    <ShieldCheck className="size-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-widest">Quyền lợi 03</span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                      Bảo chứng &amp; Uy tín Y khoa
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>Bảo chứng chính thống:</strong> Khẳng định sản phẩm/công nghệ chính hãng, an toàn và đạt tiêu chuẩn lưu hành.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-purple-600 shrink-0 mt-0.5" />
                      <span><strong>Bộ nhận diện chính thức:</strong> Được cấp quyền sử dụng danh xưng &quot;Nhà tài trợ / Đơn vị đồng hành cùng HSAPS năm...&quot;.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quyền lợi 4 */}
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40">
                    <Archive className="size-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest">Quyền lợi 04</span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">
                      Duy trì Truyền thông Vĩnh viễn
                    </h3>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Lưu trữ Kỷ yếu sự kiện:</strong> Hình ảnh &amp; Logo đồng hành sự kiện lưu trữ vĩnh viễn trên website để tra cứu.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Tích hợp Kênh Social &amp; Newsletter:</strong> Chia sẻ thông tin tài trợ lên Fanpage, Zalo OA và Email Newsletter bác sĩ.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white dark:bg-gray-900/60 p-4 sm:p-6 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-6">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-450 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Tìm tên đối tác, thương hiệu, sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pl-11 pr-4 text-xs font-semibold placeholder-gray-400 transition-colors focus:border-primary focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-850/50 dark:focus:bg-gray-900"
              />
            </div>

            {/* Filters Info */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400">
              <SlidersHorizontal className="size-4 text-primary" />
              <span>Hiển thị {filteredPartners.length} đối tác</span>
            </div>
          </div>

          {/* Grid Layout (Type Tabs + Partners List Cards) */}
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Sidebar Category Filters */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-extrabold uppercase text-[#2d1a24] dark:text-pink-100 tracking-wider mb-2">
                  Hạng mục tài trợ
                </h3>
                <div className="flex flex-col gap-1.5">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left border ${
                        selectedCategory === category
                          ? 'bg-primary border-transparent text-white font-bold'
                          : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{category === 'Tất cả' ? 'Tất cả đối tác' : `Nhà tài trợ ${category}`}</span>
                      <span className={`size-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                        selectedCategory === category 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}>
                        {category === 'Tất cả' 
                          ? PARTNERS_DATA.length 
                          : PARTNERS_DATA.filter((p) => p.category === category).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call for Sponsorship CTA Box */}
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-2xl text-white space-y-3 shadow-md">
                <BadgeCheck className="size-8 text-yellow-300" />
                <h4 className="text-sm font-extrabold">Đăng ký trở thành Nhà tài trợ HSAPS</h4>
                <p className="text-xs text-pink-100 leading-relaxed">
                  Nhận trọn bộ hồ sơ mời tài trợ hội nghị &amp; cơ hội hợp tác truyền thông y khoa chính thống.
                </p>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white text-primary text-xs font-bold rounded-xl shadow hover:bg-pink-50 transition-colors"
                >
                  Liên hệ hợp tác
                </Link>
              </div>
            </div>

            {/* Partners Cards Grid */}
            <div className="lg:col-span-9 space-y-6">
              {filteredPartners.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 p-8 shadow-sm">
                  <p className="text-gray-500 font-semibold mb-2">Không tìm thấy đối tác phù hợp</p>
                  <p className="text-xs text-gray-400">Vui lòng thử lại với từ khóa hoặc chuyên mục lọc khác.</p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                  {filteredPartners.map((partner) => (
                    <article 
                      key={partner.id}
                      className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Logo Header Block */}
                      <div className="p-6 bg-gray-50/50 dark:bg-gray-850/20 rounded-t-2xl border-b border-gray-100 dark:border-gray-800 flex items-center justify-center min-h-[120px] relative">
                        <PartnerLogo 
                          logoType={partner.logoType} 
                          className="h-10 w-auto text-[#2d1a24] dark:text-white transition-all duration-300 group-hover:scale-105" 
                        />
                        <span className={`absolute top-4 right-4 rounded-xl px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest shadow-sm border ${
                          partner.category === 'Kim cương'
                            ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 border-purple-100 dark:border-purple-950/30'
                            : partner.category === 'Vàng'
                            ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-100 dark:border-amber-950/30'
                            : 'bg-slate-50 dark:bg-slate-900 text-slate-500 border-slate-200'
                        }`}>
                          {partner.category}
                        </span>
                      </div>

                      {/* Content Card Body */}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <Link href={`/doi-tac/${partner.id}`}>
                            <h3 className="text-base sm:text-lg font-extrabold leading-snug text-text-main group-hover:text-primary transition-colors dark:text-white line-clamp-1 cursor-pointer">
                              {partner.name}
                            </h3>
                          </Link>

                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                            {partner.description}
                          </p>

                          <div className="space-y-1.5 text-xs text-gray-650 dark:text-gray-300 pt-2 border-t border-gray-50 dark:border-gray-850">
                            <div className="flex items-center gap-1.5">
                              <Globe size={13} className="text-[#ec297b] flex-shrink-0" />
                              <span className="font-semibold text-gray-400">Website:</span>
                              <a href={partner.website} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary truncate">
                                {partner.website.replace('https://', '')}
                              </a>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <MapPin size={13} className="text-[#ec297b] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">
                                <span className="font-semibold text-gray-400">Địa chỉ:</span> {partner.address}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-[#ec297b]/10 dark:border-[#ec297b]/5">
                          <span className="text-[10px] font-bold text-gray-400">
                            {partner.products.length} Sản phẩm trưng bày
                          </span>
                          <Link href={`/doi-tac/${partner.id}`} className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Xem chi tiết sản phẩm <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>

                    </article>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
