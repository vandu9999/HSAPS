import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  ArrowLeft, 
  ChevronRight, 
  Layers, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PARTNERS_DATA } from '@/lib/data';
import PartnerLogo from '@/components/PartnerLogo';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PartnerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const partner = PARTNERS_DATA.find((p) => p.id === id);

  if (!partner) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white font-sans selection:bg-[#fce7f3] selection:text-[#ec297b]">
      
      {/* HEADER HERO SECTION: Deep indigo-pink gradient block */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1016] via-[#240e1b] to-[#150a10] text-white py-12 lg:py-16 border-b border-gray-900 shadow-inner">
        {/* Abstract vector glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ec297b] blur-3xl opacity-20"></div>
          <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500 blur-3xl opacity-10"></div>
        </div>

        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 relative z-10 space-y-6">
          {/* Back link */}
          <div>
            <Link 
              href="/doi-tac" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 backdrop-blur-sm"
            >
              <ArrowLeft size={14} /> Quay lại danh sách đối tác
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            
            {/* Left side: Text Details */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-xl px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest border ${
                  partner.category === 'Kim cương'
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/30'
                    : partner.category === 'Vàng'
                    ? 'bg-amber-600/30 text-amber-300 border-amber-500/30'
                    : 'bg-slate-600/30 text-slate-300 border-slate-500/30'
                }`}>
                  Nhà tài trợ {partner.category}
                </span>
                <span className="flex items-center gap-1 bg-[#ec297b]/20 text-pink-300 px-3 py-1 rounded-lg text-[10px] font-extrabold border border-[#ec297b]/30">
                  <ShieldCheck size={12} />
                  Đối tác chính thức của HSAPS
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                {partner.name}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Globe size={16} className="text-[#ec297b]" />
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                    {partner.website} <ExternalLink size={12} />
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone size={16} className="text-[#ec297b]" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail size={16} className="text-[#ec297b]" />
                  <span>{partner.email}</span>
                </div>
              </div>
            </div>

            {/* Right side: Large Vector Logo Box */}
            <div className="lg:col-span-4 relative flex items-center justify-center bg-white dark:bg-gray-950 p-8 rounded-3xl border border-white/10 shadow-2xl h-44">
              <PartnerLogo 
                logoType={partner.logoType} 
                className="h-14 w-auto text-[#2d1a24] dark:text-white" 
              />
            </div>

          </div>
        </div>
      </section>

      {/* MAIN LAYOUT BODY */}
      <main className="flex-grow py-8 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Company Info & Products */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* SECTION: Giới thiệu doanh nghiệp */}
              <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#ec297b]/10 dark:border-[#ec297b]/5">
                  <Building2 className="size-5 text-[#ec297b]" />
                  <h2 className="text-base sm:text-lg font-extrabold text-[#2d1a24] dark:text-white tracking-tight uppercase">
                    Giới thiệu doanh nghiệp
                  </h2>
                </div>
                <div 
                  className="text-sm sm:text-base leading-relaxed text-gray-650 dark:text-gray-300 space-y-2 rich-text-content"
                  dangerouslySetInnerHTML={{ __html: partner.introduction }}
                />
              </section>

              {/* SECTION: Sản phẩm & Giải pháp nổi bật */}
              <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-[#ec297b]/15 dark:border-[#ec297b]/10 shadow-sm space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-[#ec297b]/10 dark:border-[#ec297b]/5">
                  <Layers className="size-5 text-[#ec297b]" />
                  <h2 className="text-base sm:text-lg font-extrabold text-[#2d1a24] dark:text-white tracking-tight uppercase">
                    Sản phẩm &amp; Giải pháp chuyển giao
                  </h2>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  {partner.products.map((product, index) => (
                    <div 
                      key={index}
                      className="group flex flex-col bg-gray-50/50 dark:bg-gray-850/10 rounded-2xl border border-[#ec297b]/10 dark:border-[#ec297b]/5 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20"
                    >
                      {/* Product Image Cover */}
                      <div className="relative w-full aspect-[16/10] bg-gray-150">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover transition-transform duration-750 group-hover:scale-103"
                        />
                      </div>
                      
                      {/* Product Content info */}
                      <div className="p-5 flex-grow space-y-2">
                        <h4 className="text-sm sm:text-base font-extrabold text-text-main dark:text-white leading-snug group-hover:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN: Sidebar Info Contact Widget */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Contact card detail */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-[#ec297b]/20 dark:border-[#ec297b]/15 shadow-md p-6 space-y-6 sticky top-24">
                <h3 className="text-sm font-extrabold text-[#ec297b] uppercase tracking-wider font-mono">Thông tin liên hệ</h3>
                
                <div className="space-y-4 text-xs font-semibold text-gray-650 dark:text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#ec297b] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold block text-xs text-text-main dark:text-white mb-0.5">Địa chỉ trụ sở</span>
                      <span className="leading-relaxed">{partner.address}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-t border-[#ec297b]/10 dark:border-[#ec297b]/5 pt-3">
                    <Globe size={18} className="text-[#ec297b] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold block text-xs text-text-main dark:text-white mb-0.5">Website chính thức</span>
                      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-0.5">
                        {partner.website} <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-t border-[#ec297b]/10 dark:border-[#ec297b]/5 pt-3">
                    <Phone size={18} className="text-[#ec297b] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold block text-xs text-text-main dark:text-white mb-0.5">Đường dây nóng hỗ trợ</span>
                      <span>{partner.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-t border-[#ec297b]/10 dark:border-[#ec297b]/5 pt-3">
                    <Mail size={18} className="text-[#ec297b] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold block text-xs text-text-main dark:text-white mb-0.5">Thư điện tử (Email)</span>
                      <span>{partner.email}</span>
                    </div>
                  </div>
                </div>

                {/* Website direct button action */}
                <div className="pt-2">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="w-full rounded-2xl bg-gradient-to-r from-[#ec297b] to-secondary hover:opacity-90 text-white py-4 font-black text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer">
                    Tru cập Website <ExternalLink size={16} />
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
