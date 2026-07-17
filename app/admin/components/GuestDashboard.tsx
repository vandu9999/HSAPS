'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, CheckCircle, Clock, CreditCard, PenTool, 
  HelpCircle, ChevronRight, Stethoscope, Mail, ShieldAlert
} from 'lucide-react';
import { getDoctorByEmail } from '@/app/actions/doctor';

export default function GuestDashboard({ email, name }: { email: string; name: string }) {
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

  if (loading) {
    return (
      <div className="p-8 space-y-6 animate-pulse">
        <div className="h-48 rounded-3xl bg-gray-200 dark:bg-gray-800" />
        <div className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-800" />
      </div>
    );
  }

  // Nếu đã đăng ký làm Doctor nhưng chưa được duyệt chính thức
  const isPendingDoctor = !!doctorInfo;

  return (
    <div className="min-h-screen bg-gray-50/80 dark:bg-[#090b0e] text-gray-900 dark:text-slate-100 p-8 space-y-6">
      
      {/* Pending status / Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 p-8 shadow-xl text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_40%)]" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <User className="size-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Tài khoản đăng ký mới
                </span>
                <span className="flex items-center gap-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold">
                  Chờ xác minh
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">Xin chào, {name}</h2>
              <p className="text-xs text-white/70 mt-1 max-w-lg">
                Cảm ơn bạn đã quan tâm và đăng ký tài khoản trên HSAPS Portal.
              </p>
            </div>
          </div>
          <div>
            <Link
              href="/register-profile"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:opacity-95 transition-all"
            >
              <Stethoscope className="size-3.5" />
              Hoàn thiện hồ sơ Hội viên
            </Link>
          </div>
        </div>
      </div>

      {/* Main instruction block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Status step */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Registration steps */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 dark:text-white mb-6">Các bước kích hoạt tài khoản Bác sĩ Hội viên</h3>
            
            <div className="relative border-l-2 border-dashed border-gray-200 dark:border-gray-800 ml-4 pl-6 space-y-6">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <CheckCircle className="size-3" />
                </div>
                <h4 className="text-sm font-bold text-gray-800 dark:text-white">Bước 1: Đăng ký tài khoản hệ thống</h4>
                <p className="text-xs text-gray-400 mt-1">Đã hoàn thành đăng ký qua email: {email}</p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className={`absolute -left-[33px] top-0 size-5 rounded-full flex items-center justify-center ${
                  isPendingDoctor ? 'bg-emerald-505 bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
                }`}>
                  {isPendingDoctor ? <CheckCircle className="size-3" /> : <Clock className="size-3" />}
                </div>
                <h4 className="text-sm font-bold text-gray-800 dark:text-white">Bước 2: Hoàn thiện hồ sơ y khoa</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {isPendingDoctor 
                    ? `Đã gửi hồ sơ của bác sĩ (${doctorInfo.title}. ${doctorInfo.name}) với mã CCHN: ${doctorInfo.cchn}` 
                    : 'Điền thông tin học vị, CCHN, nơi công tác, tải lên ảnh chữ ký và biên lai đóng niên liễm hội viên.'
                  }
                </p>
                {!isPendingDoctor && (
                  <Link href="/register-profile" className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-2 hover:underline">
                    Điền hồ sơ ngay <ChevronRight className="size-3" />
                  </Link>
                )}
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[33px] top-0 size-5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-650 flex items-center justify-center">
                  <Clock className="size-3" />
                </div>
                <h4 className="text-sm font-bold text-gray-800 dark:text-white">Bước 3: Ban chấp hành HSAPS phê duyệt</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {isPendingDoctor 
                    ? 'Hồ sơ của bạn đang được Ban thư ký HSAPS đối soát thông tin CCHN và chứng từ đóng hội phí. Kết quả phê duyệt sẽ được gửi qua email.' 
                    : 'Sau khi hoàn thành bước 2, Ban chấp hành sẽ kiểm tra tính chính danh và kích hoạt tài khoản chính thức.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Pending Profile details if any */}
          {isPendingDoctor && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <h3 className="text-base font-black text-gray-800 dark:text-white mb-4">Thông tin hồ sơ đã gửi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-gray-400 font-medium">Họ và tên bác sĩ:</span>
                  <p className="font-bold text-gray-800 dark:text-white">{doctorInfo.title}. {doctorInfo.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Mã chứng chỉ CCHN:</span>
                  <p className="font-bold text-gray-800 dark:text-white">{doctorInfo.cchn || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Nơi làm việc:</span>
                  <p className="font-bold text-gray-800 dark:text-white">{doctorInfo.clinic || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Số điện thoại liên hệ:</span>
                  <p className="font-bold text-gray-800 dark:text-white">{doctorInfo.phone || 'Chưa cập nhật'}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Support and Contacts */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-black text-gray-800 dark:text-white mb-4">Liên hệ hỗ trợ</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Nếu bạn gặp khó khăn trong quá trình gửi hồ sơ hoặc đóng hội phí, vui lòng liên hệ Ban thư ký HSAPS qua các kênh sau:
            </p>
            <div className="space-y-3 text-sm font-semibold">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Mail className="size-4 text-primary" />
                <span>office@hsaps.org.vn</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="size-4 text-primary" />
                <span>Hotline: 0909-XXX-XXX</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20 p-6 rounded-2xl flex gap-3 items-start">
            <ShieldAlert className="size-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-black text-amber-500 dark:text-amber-400">Yêu cầu về CCHN</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Hội viên chính thức của HSAPS bắt buộc phải có Chứng chỉ hành nghề khám bệnh, chữa bệnh chuyên khoa Phẫu thuật tạo hình thẩm mỹ hợp lệ.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
