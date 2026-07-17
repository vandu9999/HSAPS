'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, CalendarDays, BookOpen, Award, FileText, CheckCircle, 
  Clock, Stethoscope, ChevronRight, Edit3, ArrowUpRight, Check
} from 'lucide-react';
import { getDoctorByEmail } from '@/app/actions/doctor';

export default function DoctorDashboard({ email, name }: { email: string; name: string }) {
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      getDoctorByEmail(email).then((doc) => {
        setDoctorInfo(doc);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [email]);

  const mockCmeHours = 24; // Mock CME hours for this doctor
  const mockRegisteredEvents = [
    { name: 'Hội nghị Khoa học Quốc tế HSAPS 2025', date: '20/12/2025', status: 'Đã xác nhận', cme: '12 CME' },
    { name: 'Workshop: Kỹ thuật Nâng ngực nội soi', date: '05/01/2026', status: 'Đang xử lý', cme: '6 CME' },
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ec297b] to-[#7c1ca2] p-8 shadow-xl shadow-pink-500/10 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative size-20 rounded-full border-2 border-white/20 overflow-hidden shrink-0 bg-white/10">
              {doctorInfo?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={doctorInfo.avatar} alt={name} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-2xl font-black">{name.charAt(0)}</div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Bác sĩ Hội viên
                </span>
                {doctorInfo?.isOfficial ? (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
                    <Check className="size-2.5" /> Chính thức
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold">
                    Chờ duyệt
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black tracking-tight">{doctorInfo?.title || 'BS'}. {doctorInfo?.name || name}</h2>
              <p className="text-xs text-white/70 mt-1 max-w-md">
                Phòng khám/Nơi công tác: {doctorInfo?.clinic || 'Chưa cập nhật'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {doctorInfo?.id && (
              <Link
                href={`/admin/hoi-vien/${doctorInfo.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#ec297b] shadow-lg hover:bg-white/90 transition-all"
              >
                <Edit3 className="size-3.5" />
                Cập nhật hồ sơ
              </Link>
            )}
            <Link
              href="/bao-cao-khoa-hoc"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur px-4 py-2 text-xs font-semibold hover:bg-white/20 transition-all"
            >
              <FileText className="size-3.5" />
              Gửi bài báo mới
            </Link>
          </div>
        </div>
      </div>

      {/* Grid KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CCHN Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-xl bg-pink-50 dark:bg-pink-950/30 text-primary flex items-center justify-center shrink-0">
            <Stethoscope className="size-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Mã chứng chỉ CCHN</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">{doctorInfo?.cchn || 'Chưa cập nhật'}</p>
          </div>
        </div>

        {/* CME Hours */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-xl bg-violet-50 dark:bg-violet-950/30 text-violet-600 flex items-center justify-center shrink-0">
            <Award className="size-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Điểm CME tích luỹ</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">{mockCmeHours} giờ đào tạo</p>
          </div>
        </div>

        {/* Joined Year */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="size-12 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 flex items-center justify-center shrink-0">
            <Clock className="size-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Năm tham gia Hội</p>
            <p className="text-lg font-bold text-gray-800 dark:text-white mt-0.5">Năm {doctorInfo?.joinedYear || new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns (Registered Events & Scientific Publications) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Registered Events */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-black text-gray-800 dark:text-white flex items-center gap-2">
                <CalendarDays className="size-5 text-primary" />
                Lịch trình sự kiện y khoa đã đăng ký
              </h3>
              <Link href="/login" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                Xem thêm <ChevronRight className="size-3" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {mockRegisteredEvents.map((evt, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-gray-800/80">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-white leading-snug">{evt.name}</p>
                    <p className="text-xs text-gray-400 font-medium">{evt.date} • Tích lũy {evt.cme}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg ${
                    evt.status === 'Đã xác nhận' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {evt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialties and Biography */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 dark:text-white flex items-center gap-2 mb-6">
              <Stethoscope className="size-5 text-primary" />
              Thông tin chuyên khoa & Học vấn
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Chuyên khoa hoạt động</h4>
                <div className="flex flex-wrap gap-2">
                  {doctorInfo?.specialty && doctorInfo.specialty.length > 0 ? (
                    doctorInfo.specialty.map((spec: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 text-xs font-semibold bg-pink-500/10 text-[#ec297b] dark:bg-pink-950/20 rounded-lg">
                        {spec}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">Chưa cập nhật chuyên khoa</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Quá trình đào tạo</h4>
                <ul className="space-y-1.5 text-xs text-gray-650 dark:text-gray-400 list-disc list-inside">
                  {doctorInfo?.education && doctorInfo.education.length > 0 ? (
                    doctorInfo.education.map((edu: string, idx: number) => (
                      <li key={idx} className="leading-relaxed">{edu}</li>
                    ))
                  ) : (
                    <li className="list-none italic text-gray-400">Chưa cập nhật quá trình đào tạo</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Right Columns (Fast Actions & Resources) */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 dark:text-white mb-6">Hành động nhanh</h3>
            <div className="space-y-2">
              <Link href="/register-profile" className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-850 hover:bg-pink-50 dark:hover:bg-gray-800 text-sm font-semibold transition-all group">
                <span className="text-gray-700 dark:text-gray-200">Đăng ký hồ sơ hội viên</span>
                <ChevronRight className="size-4 text-gray-400 group-hover:text-primary transition-colors" />
              </Link>
              <Link href="/bao-cao-khoa-hoc" className="flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-850 hover:bg-pink-50 dark:hover:bg-gray-800 text-sm font-semibold transition-all group">
                <span className="text-gray-700 dark:text-gray-200">Đóng góp báo cáo y khoa</span>
                <ChevronRight className="size-4 text-gray-400 group-hover:text-primary transition-colors" />
              </Link>
              <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 dark:border-gray-850 hover:bg-pink-50 dark:hover:bg-gray-800 text-sm font-semibold transition-all group text-left cursor-pointer">
                <span className="text-gray-700 dark:text-gray-200">Tải chứng nhận CME</span>
                <ChevronRight className="size-4 text-gray-400 group-hover:text-primary transition-colors" />
              </button>
            </div>
          </div>

          {/* Quick Stats / Info banner */}
          <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-6 rounded-2xl">
            <h4 className="text-sm font-black text-violet-500 dark:text-violet-400 flex items-center gap-1.5">
              <CheckCircle className="size-4" /> Y học thẩm mỹ an toàn
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              HSAPS thiết lập các quy chuẩn đào tạo y khoa liên tục (CME) nghiêm ngặt nhằm duy trì trình độ và bảo vệ sức khoẻ cộng đồng.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
