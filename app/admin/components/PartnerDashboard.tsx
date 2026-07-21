'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Handshake, Globe, ShoppingBag, PlusCircle, ArrowUpRight, 
  Settings, Award, HelpCircle, ChevronRight, CheckCircle 
} from 'lucide-react';
import { getPartnerByEmail } from '@/app/actions/partner';
import HcmcSkyline from '@/components/HcmcSkyline';

export default function PartnerDashboard({ email, name }: { email: string; name: string }) {
  const [partnerInfo, setPartnerInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      getPartnerByEmail(email).then((partner) => {
        setPartnerInfo(partner);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [email]);

  const mockSponsorshipEvents = [
    { name: 'Hội nghị Khoa học Quốc tế HSAPS 2025', role: 'Nhà tài trợ Vàng', status: 'Đang hoạt động', date: '20/12/2025' },
    { name: 'Workshop: Kỹ thuật Nâng ngực nội soi', role: 'Nhà tài trợ Đồng hành', status: 'Đã hoàn thành', date: '05/01/2026' }
  ];

  if (loading) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-48 rounded-3xl bg-gray-200 dark:bg-gray-800" />
        <div className="grid grid-cols-3 gap-6">
          <div className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-800 col-span-2" />
          <div className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-[#090b0e] text-gray-900 dark:text-slate-100 p-8 space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f59e0b] to-[#ec297b] p-8 shadow-xl shadow-amber-500/10 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        
        {/* TP. Hồ Chí Minh Skyline Background */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 opacity-30">
          <HcmcSkyline className="w-full h-full text-white" />
        </div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl border-2 border-white/20 bg-white flex items-center justify-center text-amber-600 font-black text-2xl shrink-0">
              <Handshake className="size-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Đối tác liên kết
                </span>
                {partnerInfo?.category && (
                  <span className="rounded-full bg-amber-500/20 text-yellow-100 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold">
                    Hạng {partnerInfo.category}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black tracking-tight">{partnerInfo?.name || name}</h2>
              <p className="text-xs text-white/70 mt-1 max-w-lg">
                Kết nối & Trưng bày thiết bị, vật liệu phẫu thuật thẩm mỹ an toàn tại HSAPS Portal.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {partnerInfo?.id && (
              <>
                <Link
                  href={`/admin/doi-tac/${partnerInfo.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#ec297b] shadow-lg hover:bg-white/90 transition-all"
                >
                  <Settings className="size-3.5" />
                  Cài đặt hồ sơ đối tác
                </Link>
                <Link
                  href={`/admin/doi-tac/${partnerInfo.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur px-4 py-2 text-xs font-semibold hover:bg-white/20 transition-all"
                >
                  <PlusCircle className="size-3.5" />
                  Thêm sản phẩm mới
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Grid KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Count */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 flex items-center justify-center shrink-0">
            <ShoppingBag className="size-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sản phẩm trưng bày</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">
              {partnerInfo?.products?.length || 0} sản phẩm y khoa
            </p>
          </div>
        </div>

        {/* Website link */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 flex items-center justify-center shrink-0">
            <Globe className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Website liên kết</p>
            {partnerInfo?.website ? (
              <a href={partnerInfo.website} target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:underline flex items-center gap-1 mt-0.5 truncate">
                {partnerInfo.website} <ArrowUpRight className="size-3 shrink-0" />
              </a>
            ) : (
              <p className="text-sm font-bold text-gray-400 italic mt-0.5">Chưa cập nhật</p>
            )}
          </div>
        </div>

        {/* Level */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="size-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Đại diện chính thức</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">{partnerInfo?.email || email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: About & Sponsor events */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About Partner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 dark:text-white mb-4">Thông tin giới thiệu đối tác</h3>
            <p className="text-sm text-gray-650 dark:text-gray-400 leading-relaxed">
              {partnerInfo?.introduction || partnerInfo?.description || 'Chưa cập nhật phần giới thiệu hoạt động cho doanh nghiệp. Vui lòng truy cập trang Cài đặt hồ sơ đối tác để chỉnh sửa.'}
            </p>
          </div>

          {/* Sponsored events list */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Handshake className="size-5 text-amber-500" />
              Các sự kiện tài trợ & gian hàng triển lãm
            </h3>
            
            <div className="space-y-4">
              {mockSponsorshipEvents.map((evt, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-gray-800/80">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{evt.name}</p>
                    <p className="text-xs text-gray-400 font-medium">{evt.date} • {evt.role}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg ${
                    evt.status === 'Đang hoạt động' 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {evt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Quick operations */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 dark:text-white mb-6">Thao tác nhanh</h3>
            <div className="space-y-2">
              <Link href={`/admin/doi-tac/${partnerInfo.id}`} className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-850 hover:bg-amber-500/5 hover:text-amber-500 text-sm font-semibold transition-all group">
                <span>Quản lý danh sách sản phẩm</span>
                <ChevronRight className="size-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </Link>
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-850 hover:bg-amber-500/5 hover:text-amber-500 text-sm font-semibold transition-all group text-left cursor-pointer">
                <span>Đăng ký gian hàng triển lãm</span>
                <ChevronRight className="size-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-850 hover:bg-amber-500/5 hover:text-amber-500 text-sm font-semibold transition-all group text-left cursor-pointer">
                <span>Báo cáo hiệu quả hiển thị</span>
                <ChevronRight className="size-4 text-gray-400 group-hover:text-amber-500 transition-colors" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-pink-500/10 border border-amber-500/20 p-6 rounded-2xl">
            <h4 className="text-sm font-black text-amber-500 dark:text-amber-400 flex items-center gap-1.5">
              <CheckCircle className="size-4" /> An toàn vật liệu y tế
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              HSAPS cam kết đồng hành cùng các đơn vị cung cấp chính hãng, đạt chứng nhận FDA & CE trong y khoa thẩm mỹ.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
