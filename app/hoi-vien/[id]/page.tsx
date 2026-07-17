'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  Menu,
  ChevronRight,
  Search,
  BadgeCheck,
  Globe,
  Share2,
  FileText,
  GraduationCap,
  MapPin,
  User,
  Sparkles,
  History,
  Award,
  Send,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  ChevronLeft,
  X,
  Sparkle
} from 'lucide-react';

import { Doctor, DOCTORS_DATA } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MemberDetailPage({ params }: PageProps) {
  // Unwrap parameters
  const { id } = use(params);

  // Find the doctor from our unified mock database
  const doctor = DOCTORS_DATA.find((doc) => doc.id === id);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Form Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({ name: '', phone: '', message: '' });
    setIsSubmitted(false);
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="size-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 flex items-center justify-center mx-auto mb-4">
            <User className="size-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Không tìm thấy hội viên</h2>
          <p className="text-[#6b4c5d] dark:text-gray-400 mb-6 text-sm">
            Hội viên y khoa yêu cầu không tồn tại hoặc hồ sơ đang được cập nhật bởi Ban chấp hành HSAPS.
          </p>
          <Link
            href="/hoi-vien"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary bg-[#ec297b] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#c2185f] transition-all"
          >
            <ChevronLeft className="size-4" />
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  // Get full specialty list (fallbacks if empty)
  const specialties = doctor.specialty || ['Phẫu thuật Tạo hình Thẩm mỹ'];

  // Get full bio paragraphs (fallbacks if empty)
  const biographyParagraphs = doctor.biography || [
    `${doctor.title} ${doctor.name} tốt nghiệp Đại học Y Dược và đã có nhiều năm tu nghiệp chuyên sâu về phẫu thuật tạo hình thẩm mỹ. Bác sĩ luôn nỗ lực cập nhật các công nghệ, xu hướng thẩm mỹ tiên tiến để mang đến kết quả hoàn hảo và an toàn nhất cho người bệnh.`,
    `Hiện tại, bác sĩ đang công tác tại các đơn vị y tế uy tín và tham gia tích cực hoạt động khoa học thường niên cùng Hội HSAPS.`,
    `Với triết lý y đức vẹn toàn, bác sĩ luôn lắng nghe tâm tư và tư vấn chi tiết từng giải pháp tạo dáng an toàn, phù hợp cho mọi cá nhân.`
  ];

  // Get work history (fallbacks if empty)
  const workHistory = doctor.workHistory || [
    { period: `${doctor.joinedYear} - Nay`, position: 'Bác sĩ điều trị chuyên khoa', organization: doctor.clinic },
    { period: 'Trước đó', position: 'Bác sĩ lâm sàng Ngoại khoa', organization: 'Đơn vị Y khoa Đa khoa uy tín' }
  ];

  // Get awards / certificates (fallbacks if empty)
  const awards = doctor.awards || [
    { title: 'Chứng chỉ hành nghề KCB', subtitle: `Bộ Y tế cấp - Số: ${doctor.cchn}` },
    { title: 'Thành viên chính thức', subtitle: `Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS) - Từ ${doctor.joinedYear}` },
    { title: 'Chứng nhận liên kết y khoa', subtitle: 'Hoàn thành các chương trình CME đào tạo liên tục thường niên' }
  ];

  // Get clinic hours (fallbacks if empty)
  const clinicHours = doctor.clinicHours || [
    'Thứ 2 - Thứ 6: 08:00 - 17:00',
    'Thứ 7: 08:00 - 12:00'
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fdf8fa] dark:bg-[#1a1016] text-[#2d1a24] dark:text-white font-sans selection:bg-[#fce7f3] selection:text-[#ec297b]">
      
      {/* MAIN CONTAINER */}
      <main className="flex-grow py-8 lg:py-12 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center text-sm text-[#6b4c5d] dark:text-pink-200/60 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none">
            <Link className="hover:text-[#ec297b] transition-colors" href="/">
              Trang chủ
            </Link>
            <ChevronRight className="size-4 mx-1.5 shrink-0" />
            <Link className="hover:text-[#ec297b] transition-colors" href="/hoi-vien">
              Hội viên
            </Link>
            <ChevronRight className="size-4 mx-1.5 shrink-0" />
            <span className="font-bold text-[#2d1a24] dark:text-white truncate">
              {doctor.title}. {doctor.name}
            </span>
          </nav>

          {/* DYNAMIC HERO CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg mb-10">
            {/* Background Blob Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-50 to-yellow-50 dark:from-pink-950/10 dark:to-yellow-950/10 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              
              {/* Doctor Avatar Block */}
              <div className="shrink-0 relative">
                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                  <Image
                    alt={`${doctor.title} ${doctor.name}`}
                    className="w-full h-full object-cover object-top"
                    src={doctor.avatar}
                    fill
                    sizes="(max-width: 768px) 160px, 192px"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </div>
                {doctor.isOfficial && (
                  <div className="absolute bottom-2 right-2 bg-[#fcd34d] text-[#2d1a24] p-1.5 rounded-full shadow-md border-2 border-white dark:border-gray-800 flex items-center justify-center" title="Hội viên chính thức">
                    <BadgeCheck className="size-5 fill-[#fcd34d] text-primary" />
                  </div>
                )}
              </div>

              {/* Doctor Title Details */}
              <div className="flex-1 w-full">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ec297b]/10 text-[#ec297b] text-xs font-bold uppercase tracking-wider mb-3">
                      {doctor.role || 'Hội viên chính thức'}
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-[#2d1a24] dark:text-white mb-2 tracking-tight">
                      {doctor.title}. {doctor.name}
                    </h1>
                    <p className="text-lg lg:text-xl text-[#ec297b] font-bold mb-4">
                      Chuyên khoa Phẫu thuật Tạo hình &amp; Thẩm mỹ
                    </p>
                    <div 
                      className="text-[#6b4c5d] dark:text-gray-300 max-w-2xl leading-relaxed mb-6 text-sm sm:text-base space-y-2 rich-text-content"
                      dangerouslySetInnerHTML={{ __html: doctor.experience }}
                    />
                  </div>

                  {/* Social Buttons */}
                  <div className="flex justify-center md:justify-start gap-3">
                    <a
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-[#ec297b] hover:text-white text-[#6b4c5d] transition-all dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
                      href="#"
                      title="Website Phòng khám"
                    >
                      <Globe className="size-5" />
                    </a>
                    <a
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-[#6b4c5d] transition-all dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
                      href="#"
                      title="Facebook Cá nhân"
                    >
                      <svg className="size-5 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.79-5 4.8V8z"/>
                      </svg>
                    </a>
                    <a
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white text-[#6b4c5d] transition-all dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
                      href="#"
                      title="Chia sẻ hồ sơ"
                    >
                      <Share2 className="size-5" />
                    </a>
                  </div>
                </div>

                {/* Micro statistics */}
                <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-12 pt-6 border-t border-gray-100 dark:border-gray-800 mt-2 text-left justify-start">
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl dark:bg-amber-950/30 dark:text-amber-400">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6b4c5d] dark:text-gray-400">Kinh nghiệm</p>
                      <p className="font-bold text-[#2d1a24] dark:text-white text-sm sm:text-base">
                        {doctor.id === '10' ? '15+ Năm' : `${new Date().getFullYear() - doctor.joinedYear + 10}+ Năm`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-pink-50 text-[#ec297b] p-2.5 rounded-xl dark:bg-pink-900/20 dark:text-pink-400">
                      <GraduationCap className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6b4c5d] dark:text-gray-400">Học vị cao nhất</p>
                      <p className="font-bold text-[#2d1a24] dark:text-white text-sm sm:text-base">
                        {doctor.title === 'PGS.TS.BS' ? 'Phó Giáo sư Y học' : doctor.title === 'TS.BS' ? 'Tiến sĩ Y khoa' : doctor.title === 'BSCKII' ? 'Bác sĩ CKII' : 'Thạc sĩ Y khoa'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl dark:bg-blue-900/20 dark:text-blue-400">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#6b4c5d] dark:text-gray-400">Đơn vị công tác</p>
                      <p className="font-bold text-[#2d1a24] dark:text-white text-sm sm:text-base truncate max-w-[200px]" title={doctor.clinic}>
                        {doctor.clinic.replace('Bệnh viện Phẫu thuật Thẩm mỹ ', 'BV ').replace('Bệnh viện Thẩm mỹ ', 'BV ')}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID DETAIL */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT COLUMN: ABOUT, TIMELINE, BIO */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Section Biography */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ec297b]/10 text-[#ec297b]">
                    <User className="size-5" />
                  </span>
                  <h2 className="text-2xl font-bold text-[#2d1a24] dark:text-white tracking-tight">
                    Tiểu sử &amp; Giới thiệu
                  </h2>
                </div>
                
                <div className="text-[#6b4c5d] dark:text-gray-300 space-y-4 leading-relaxed text-sm sm:text-base">
                  {biographyParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Section Specialty Skills */}
              <div className="rounded-2xl border-2 border-[#ec297b]/20 bg-gradient-to-br from-white to-pink-50 p-6 sm:p-8 shadow-lg relative overflow-hidden dark:from-gray-900 dark:to-pink-900/10 dark:border-pink-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ec297b]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                
                <h3 className="text-2xl lg:text-3xl font-extrabold text-[#2d1a24] dark:text-white mb-6 flex items-center gap-3">
                  <Sparkles className="size-7 text-[#ec297b] animate-pulse" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec297b] to-[#c2185f]">
                    Chuyên môn sâu
                  </span>
                </h3>
                
                <div className="flex flex-wrap gap-3 relative z-10">
                  {specialties.map((spec, index) => (
                    <span
                      key={index}
                      className="px-4 py-2.5 rounded-xl bg-white text-[#ec297b] text-sm font-bold border border-pink-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all dark:bg-gray-800 dark:border-pink-900/50"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section Career Timeline */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-8">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    <History className="size-5" />
                  </span>
                  <h2 className="text-2xl font-bold text-[#2d1a24] dark:text-white tracking-tight">
                    Quá trình công tác &amp; Đào tạo
                  </h2>
                </div>

                <div className="relative pl-8 space-y-8 border-l-2 border-[#ec297b]/20 dark:border-pink-900/30 ml-3">
                  {workHistory.map((item, index) => (
                    <div className="relative" key={index}>
                      {/* Timeline Node Dot */}
                      <div className={`absolute -left-[41px] top-0 h-6 w-6 rounded-full border-4 border-white dark:border-gray-900 shadow-sm ${
                        index === 0 ? 'bg-[#ec297b]' : index === 1 ? 'bg-yellow-400' : 'bg-gray-300'
                      }`} />
                      
                      <div>
                        <span className="text-xs font-bold text-[#ec297b] bg-[#ec297b]/5 px-2 py-0.5 rounded">
                          {item.period}
                        </span>
                        <h3 className="text-lg font-bold text-[#2d1a24] dark:text-white mt-1.5 leading-snug">
                          {item.position}
                        </h3>
                        <p className="text-[#6b4c5d] dark:text-gray-400 text-sm mt-0.5">
                          {item.organization}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN: CERTIFICATES & DIRECT ENQUIRY */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Section Certifications & Medals */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-[#ec297b] dark:bg-pink-900/30">
                    <Award className="size-4" />
                  </span>
                  <h2 className="text-lg font-bold text-[#2d1a24] dark:text-white tracking-tight">
                    Chứng chỉ &amp; Giải thưởng
                  </h2>
                </div>

                <div className="flex flex-col gap-3.5">
                  {awards.map((award, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#fdf8fa] dark:bg-[#1a1016]/50 border border-transparent hover:border-pink-200/50 hover:shadow-sm transition-all"
                    >
                      <Sparkle className="size-5 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm text-[#2d1a24] dark:text-white leading-snug">
                          {award.title}
                        </h4>
                        <p className="text-xs text-[#6b4c5d] dark:text-gray-400 mt-0.5">
                          {award.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STICKY SECTION CONTACT & CLINIC */}
              <div className="space-y-6 lg:sticky lg:top-24">
                
                {/* Contact Enquiries Form */}
                <div className="rounded-2xl border border-pink-100 bg-gradient-to-b from-white to-pink-50/40 p-6 shadow-md dark:from-gray-900 dark:to-gray-900/80 dark:border-gray-800">
                  <h3 className="text-xl font-bold text-[#2d1a24] dark:text-white mb-2">
                    Liên hệ bác sĩ
                  </h3>
                  <p className="text-xs text-[#6b4c5d] dark:text-gray-400 mb-6 leading-relaxed">
                    Gửi tin nhắn trực tiếp để được tư vấn sơ bộ hoặc đề xuất đặt lịch hẹn khám trực tiếp.
                  </p>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 dark:bg-green-950/15 border border-green-200 dark:border-green-900/30 p-5 rounded-xl text-center space-y-3"
                    >
                      <div className="size-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                        <ShieldCheck className="size-7" />
                      </div>
                      <h4 className="font-bold text-sm text-green-800 dark:text-green-300">Gửi tin nhắn thành công!</h4>
                      <p className="text-xs text-green-700 dark:text-green-400 leading-relaxed">
                        Thông tin của bạn đã được chuyển tiếp trực tiếp đến thư ký riêng của bác sĩ. Chúng tôi sẽ phản hồi trong 24 giờ làm việc.
                      </p>
                      <button
                        onClick={handleResetForm}
                        className="text-xs text-[#ec297b] font-bold hover:underline"
                      >
                        Gửi tin nhắn mới
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1" htmlFor="name">
                          Họ và tên <span className="text-[#ec297b]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1" htmlFor="phone">
                          Số điện thoại <span className="text-[#ec297b]">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="09xx xxx xxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1" htmlFor="message">
                          Nội dung tin nhắn
                        </label>
                        <textarea
                          id="message"
                          placeholder="Tôi muốn tư vấn về dịch vụ nâng mũi cấu trúc hoặc dời khớp cắn..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-[#ec297b] py-3 px-4 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-[#c2185f] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec297b] focus:ring-offset-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                        <Send className="size-4" />
                      </button>
                    </form>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200/60 dark:border-gray-800 flex items-center justify-center gap-1.5 text-[11px] text-[#6b4c5d] dark:text-gray-400">
                    <ShieldCheck className="size-4 text-green-600 shrink-0" />
                    <span>Thông tin của bạn được bảo mật tuyệt đối</span>
                  </div>
                </div>

                {/* Clinic details block */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <h4 className="font-bold text-[#2d1a24] dark:text-white mb-4 text-xs uppercase tracking-wider">
                    Thông tin phòng khám
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <MapPin className="size-5 text-[#ec297b] shrink-0 mt-0.5" />
                      <p className="text-sm text-[#6b4c5d] dark:text-gray-300 leading-normal">
                        {doctor.address}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="size-5 text-[#ec297b] shrink-0 mt-0.5" />
                      <div className="text-sm text-[#6b4c5d] dark:text-gray-300 space-y-1">
                        {clinicHours.map((hours, index) => (
                          <p key={index}>{hours}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-white dark:bg-[#1a1016] pt-16 pb-8 border-t border-pink-100 dark:border-pink-950/20 mt-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded bg-[#ec297b] text-white">
                  <Stethoscope className="size-4" />
                </div>
                <span className="text-xl font-bold text-[#2d1a24] dark:text-white">HSAPS</span>
              </div>
              <p className="text-sm leading-relaxed text-[#6b4c5d] dark:text-gray-400">
                Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh.<br/>
                Kết nối, chia sẻ và phát triển.
              </p>
              <div className="flex gap-4 mt-2">
                <a className="text-[#6b4c5d] hover:text-[#ec297b] transition-colors" href="#"><Globe className="size-4" /></a>
                <a className="text-[#6b4c5d] hover:text-[#ec297b] transition-colors" href="#"><Mail className="size-4" /></a>
                <a className="text-[#6b4c5d] hover:text-[#ec297b] transition-colors" href="#"><Phone className="size-4" /></a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#2d1a24] dark:text-white">Về HSAPS</h4>
              <nav className="flex flex-col gap-2">
                <Link className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="/gioi-thieu">Giới thiệu chung</Link>
                <a className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="#">Ban chấp hành</a>
                <a className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="#">Điều lệ hội</a>
                <a className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="#">Đối tác</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#2d1a24] dark:text-white">Chuyên môn</h4>
              <nav className="flex flex-col gap-2">
                <a className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="#">Đào tạo CME</a>
                <a className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="#">Thư viện khoa học</a>
                <a className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="#">Hội nghị &amp; Hội thảo</a>
                <a className="text-sm text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-400 dark:hover:text-white" href="#">Tin tức y học</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#2d1a24] dark:text-white">Liên hệ</h4>
              <div className="flex flex-col gap-3 text-sm text-[#6b4c5d] dark:text-gray-400">
                <p className="flex items-start gap-2">
                  <MapPin className="size-4 shrink-0 mt-0.5 text-[#ec297b]" />
                  123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-[#ec297b]" />
                  (028) 3939 3939
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0 text-[#ec297b]" />
                  info@hsaps.org.vn
                </p>
              </div>
            </div>

          </div>

          <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-8 sm:flex-row gap-4">
            <p className="text-xs text-[#6b4c5d] dark:text-gray-500">
              © {new Date().getFullYear()} HSAPS. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a className="text-xs text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-500 dark:hover:text-white" href="#">Chính sách bảo mật</a>
              <a className="text-xs text-[#6b4c5d] hover:text-[#ec297b] dark:text-gray-500 dark:hover:text-white" href="#">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
