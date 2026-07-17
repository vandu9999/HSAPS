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
  SlidersHorizontal 
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
        <div className="mx-auto max-w-[1440px] space-y-10">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#2d1220] via-[#1a1016] to-[#2d1220] p-8 sm:p-12 rounded-3xl text-white shadow-md relative overflow-hidden border border-[#ec297b]/20">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#ec297b] blur-2xl"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-500 blur-2xl"></div>
            </div>
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest bg-[#ec297b]/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm text-pink-300 border border-[#ec297b]/30">
                Mạng lưới liên kết
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Đối tác &amp; Nhà tài trợ
              </h1>
              <p className="text-sm sm:text-base text-pink-100 max-w-xl font-medium leading-relaxed">
                Đồng hành cùng HSAPS trong việc cập nhật thiết bị y khoa tiên tiến, vật liệu tạo hình cao cấp và phát triển công nghệ thẩm mỹ an toàn tại Việt Nam.
              </p>
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
