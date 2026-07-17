'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  Menu,
  ChevronRight,
  Search,
  Filter,
  BadgeCheck,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Building,
  Award,
  IdCard,
  UserPlus,
  X,
  Clock,
  ArrowRight,
  CheckCircle2,
  FileText
} from 'lucide-react';

import { Doctor, DOCTORS_DATA } from '@/lib/data';


// Specialization Groups for filter
const SPECIALTY_GROUPS = [
  { value: 'all', label: 'Tất cả chuyên khoa' },
  { value: 'facial', label: 'Thẩm mỹ Vùng Mặt (Mắt, Mũi, Cằm, Hàm)' },
  { value: 'body', label: 'Thẩm mỹ Vóc Dáng (Ngực, Hút mỡ, Bụng, Mông)' },
  { value: 'skin', label: 'Trẻ hóa da & Thẩm mỹ Nội khoa' }
];

// Title Groups for filter
const TITLE_GROUPS = [
  { value: 'all', label: 'Tất cả học vị' },
  { value: 'PGS.TS.BS', label: 'PGS.TS.BS' },
  { value: 'TS.BS', label: 'TS.BS' },
  { value: 'BSCKII', label: 'BSCKII / BSCKI' },
  { value: 'ThS.BS', label: 'Thạc sĩ Bác sĩ (ThS.BS)' }
];

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedTitle, setSelectedTitle] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  // Form State for becoming a member
  const [regForm, setRegForm] = useState({
    name: '',
    title: 'BS',
    cchn: '',
    phone: '',
    email: '',
    hospital: '',
    specialty: '',
    message: ''
  });
  const [isRegSubmitted, setIsRegSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');
  const [submittedTime, setSubmittedTime] = useState('');

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedId(`HSAPS-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmittedTime(`${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN')}`);
    setIsRegSubmitted(true);
    setTimeout(() => {
      // Reset form after a while
      setRegForm({
        name: '',
        title: 'BS',
        cchn: '',
        phone: '',
        email: '',
        hospital: '',
        specialty: '',
        message: ''
      });
    }, 4000);
  };

  // Helper function to match specialty groups
  const matchesSpecialtyGroup = (doctorSpecs: string[], groupValue: string): boolean => {
    if (groupValue === 'all') return true;

    const lowerSpecs = doctorSpecs.map(s => s.toLowerCase());

    if (groupValue === 'facial') {
      return lowerSpecs.some(s =>
        s.includes('mặt') || s.includes('mắt') || s.includes('mũi') || s.includes('cằm') || s.includes('hàm')
      );
    }
    if (groupValue === 'body') {
      return lowerSpecs.some(s =>
        s.includes('ngực') || s.includes('mông') || s.includes('mỡ') || s.includes('bụng') || s.includes('body')
      );
    }
    if (groupValue === 'skin') {
      return lowerSpecs.some(s =>
        s.includes('da') || s.includes('trẻ hóa') || s.includes('filler') || s.includes('botox') || s.includes('laser') || s.includes('nội khoa')
      );
    }
    return false;
  };

  // Filtered Doctors List
  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter((doc) => {
      // 1. Search Query Match
      const searchStr = `${doc.name} ${doc.title} ${doc.clinic} ${doc.specialty.join(' ')}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());

      // 2. Specialty Match
      const matchesSpec = matchesSpecialtyGroup(doc.specialty, selectedSpecialty);

      // 3. Title Match
      let matchesTitle = true;
      if (selectedTitle !== 'all') {
        if (selectedTitle === 'BSCKII') {
          matchesTitle = doc.title === 'BSCKII' || doc.title === 'BSCKI';
        } else {
          matchesTitle = doc.title === selectedTitle;
        }
      }

      return matchesSearch && matchesSpec && matchesTitle;
    });
  }, [searchQuery, selectedSpecialty, selectedTitle]);

  // Statistics
  const statistics = useMemo(() => {
    const total = DOCTORS_DATA.length;
    const pgs = DOCTORS_DATA.filter(d => d.title.includes('PGS')).length;
    const ts = DOCTORS_DATA.filter(d => d.title === 'TS.BS').length;
    const specs = new Set(DOCTORS_DATA.flatMap(d => d.specialty)).size;
    return { total, pgs, ts, specs };
  }, []);

  return (
    <div className="bg-background-light font-sans text-text-main antialiased dark:bg-background-dark dark:text-white min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-purple-950/90 mix-blend-multiply"></div>
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest w-fit mb-4 backdrop-blur-sm">
              Cổng thông tin HSAPS
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Danh sách <span className="text-accent">Hội viên Chính thức</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 font-medium leading-relaxed mb-6 opacity-95">
              Danh bạ tra cứu chính thức các Giáo sư, Tiến sĩ, Bác sĩ chuyên khoa Phẫu thuật Tạo hình và Thẩm mỹ được cấp phép hành nghề hợp pháp, là thành viên chính thức thuộc Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS).
            </p>
            <div className="flex flex-wrap gap-4 items-center text-xs text-pink-100">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <BadgeCheck className="size-4 text-accent" />
                Tiêu chuẩn y khoa hàng đầu
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <IdCard className="size-4 text-accent" />
                Chứng chỉ hành nghề BYT hợp lệ
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs with Realtime Statistics */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link className="transition-colors hover:text-primary" href="/">
              Trang chủ
            </Link>
            <ChevronRight className="size-4" />
            <span className="font-semibold text-primary">Hội viên</span>
          </div>

          {/* Core Stat Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
            <div className="bg-pink-50/50 dark:bg-pink-950/20 px-4 py-2 rounded-xl text-center md:text-left border border-pink-100/30">
              <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Tổng Hội viên</p>
              <p className="text-xl font-bold text-primary">{statistics.total * 64}+ <span className="text-xs font-normal text-gray-500">BS</span></p>
            </div>
            <div className="bg-amber-50/50 dark:bg-amber-950/20 px-4 py-2 rounded-xl text-center md:text-left border border-amber-100/30">
              <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Phó Giáo Sư</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{statistics.pgs * 12}+ <span className="text-xs font-normal text-gray-500">Thầy thuốc</span></p>
            </div>
            <div className="bg-purple-50/50 dark:bg-purple-950/20 px-4 py-2 rounded-xl text-center md:text-left border border-purple-100/30">
              <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Tiến sĩ Y Khoa</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{statistics.ts * 24}+ <span className="text-xs font-normal text-gray-500">Tiến sĩ</span></p>
            </div>
            <div className="bg-teal-50/50 dark:bg-teal-950/20 px-4 py-2 rounded-xl text-center md:text-left border border-teal-100/30">
              <p className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400">Bệnh viện & PK</p>
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400">120+ <span className="text-xs font-normal text-gray-500">Cơ sở</span></p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1200px] w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        
        {/* Interactive Search & Multi-Filters Panel */}
        <section className="mb-10 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-pink-50 dark:border-pink-900/10">
          <div className="flex flex-col gap-6">
            
            {/* Row 1: Heading and Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter className="size-5 text-primary" />
                  Bộ lọc tra cứu chuyên nghiệp
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tìm kiếm theo tên bác sĩ, bệnh viện làm việc, hoặc số giấy phép hành nghề</p>
              </div>
              
              {/* Search input */}
              <div className="relative w-full lg:max-w-md">
                <input
                  type="text"
                  placeholder="Nhập tên bác sĩ, cơ sở công tác, chuyên khoa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-medium"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 dark:bg-gray-800"></div>

            {/* Row 2: Selectable Filter Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Filter Specialty */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Chuyên khoa sâu</label>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTY_GROUPS.map((spec) => (
                    <button
                      key={spec.value}
                      onClick={() => setSelectedSpecialty(spec.value)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        selectedSpecialty === spec.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {spec.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Title/Education */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Học vị / Học hàm</label>
                <div className="flex flex-wrap gap-2">
                  {TITLE_GROUPS.map((title) => (
                    <button
                      key={title.value}
                      onClick={() => setSelectedTitle(title.value)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        selectedTitle === title.value
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {title.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Quick Helper Count */}
            <div className="flex justify-between items-center bg-pink-50/20 dark:bg-pink-950/10 px-4 py-2.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 border border-pink-100/10">
              <div>
                Đang hiển thị <span className="font-bold text-primary">{filteredDoctors.length}</span> trên <span className="font-bold">{DOCTORS_DATA.length}</span> bác sĩ nổi bật của ban chấp hành và hội viên.
              </div>
              {(searchQuery || selectedSpecialty !== 'all' || selectedTitle !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSpecialty('all');
                    setSelectedTitle('all');
                  }}
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Đặt lại bộ lọc
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Doctor Grid Directory */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doc, idx) => (
              <motion.div
                layout
                key={doc.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                className="group relative flex flex-col justify-between bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/60 hover:shadow-xl hover:border-pink-100/50 dark:hover:border-pink-900/20 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${doc.isOfficial ? 'bg-gradient-to-r from-primary to-pink-400' : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600'}`} />

                {/* Card Content */}
                <div className="p-6">

                  {/* Doctor Profile Header */}
                  <div className="flex gap-4 mb-5 items-start">
                    <div className="relative size-20 shrink-0 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md bg-gray-50">
                      <Image
                        src={doc.avatar}
                        alt={`Bác sĩ ${doc.name}`}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      {/* Role badge */}
                      {doc.role && (
                        <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                          {doc.role}
                        </span>
                      )}
                      {/* Học hàm / Học vị — dòng 1 */}
                      <p className="text-[11px] font-bold text-primary/80 dark:text-primary/70 uppercase tracking-widest leading-none mb-1">
                        {doc.title}
                      </p>
                      {/* Họ và tên — dòng 2 */}
                      <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug line-clamp-1">
                        {doc.name}
                      </h3>
                      {/* CCHN */}
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-1.5 font-mono">
                        <IdCard className="size-3 text-gray-400 shrink-0" />
                        CCHN: {doc.cchn}
                      </p>
                      {/* Membership badge — dưới tên, không đè */}
                      {doc.isOfficial ? (
                        <div className="mt-2 inline-flex items-center gap-1 bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-full text-[9px] font-bold border border-teal-100/60 dark:border-teal-900/40 uppercase tracking-wide">
                          <BadgeCheck className="size-3 fill-teal-600 text-white dark:fill-teal-400 shrink-0" />
                          Hội viên chính thức
                        </div>
                      ) : (
                        <div className="mt-2 inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 px-2 py-0.5 rounded-full text-[9px] font-bold border border-gray-200/60 dark:border-gray-700 uppercase tracking-wide">
                          Hội viên liên kết
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clinic and Work Location */}
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-gray-800/60 pt-4 mb-5">
                    <div className="flex items-start gap-2">
                      <Building className="size-4 text-primary shrink-0 mt-0.5" />
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs line-clamp-1">
                        {doc.clinic}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <MapPin className="size-4 text-gray-400 shrink-0" />
                      <span className="text-gray-500 dark:text-gray-400 line-clamp-1">
                        {doc.address}
                      </span>
                    </div>
                  </div>

                  {/* Specialties Tag Cloud */}
                  <div className="space-y-1.5 mb-5">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Chuyên khoa thế mạnh</span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specialty.map((spec, i) => (
                        <span
                          key={i}
                          className="bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-[11px] font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer of Card */}
                <div className="border-t border-gray-100 dark:border-gray-800/60 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Clock className="size-3" />
                    Gia nhập: {doc.joinedYear}
                  </div>
                  <Link
                    href={`/hoi-vien/${doc.id}`}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:text-pink-700 transition-all cursor-pointer group/btn"
                  >
                    Xem chi tiết
                    <ArrowRight className="size-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredDoctors.length === 0 && (
            <div className="col-span-full py-16 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
              <div className="mx-auto size-16 rounded-full bg-pink-50 dark:bg-pink-950/20 flex items-center justify-center text-primary mb-4">
                <Search className="size-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Không tìm thấy bác sĩ phù hợp</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto px-4">
                Thử nhập từ khóa khác, hoặc làm sạch bộ lọc để xem lại danh sách tất cả các hội viên chính thức của Hội.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('all');
                  setSelectedTitle('all');
                }}
                className="mt-4 px-5 py-2.5 bg-primary text-white rounded-lg text-xs font-bold shadow-md hover:bg-pink-700 transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </section>

        {/* CTA Banner: Join HSAPS */}
        <section className="mt-20 relative bg-gradient-to-r from-primary to-pink-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-xl shadow-primary/10">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-300 via-pink-500 to-purple-800"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest w-fit mb-4 backdrop-blur-sm">
              Đồng hành cùng ngành PTTM Việt Nam
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
              Đăng ký Gia nhập HSAPS <br/>Khẳng định Uy tín Chuyên môn
            </h2>
            <p className="text-sm md:text-base text-pink-50 mb-8 leading-relaxed max-w-2xl">
              HSAPS mở rộng chào đón các Bác sĩ chuyên ngành Phẫu thuật Tạo hình, Thẩm mỹ, Da liễu Thẩm mỹ đăng ký hội viên chính thức hoặc hội viên liên kết để cùng nhau nâng tầm tay nghề, cập nhật y khoa quốc tế định kỳ.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsRegistrationModalOpen(true)}
                className="bg-white text-primary hover:bg-pink-50 text-sm font-bold h-12 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Gửi Hồ sơ Đăng ký
              </button>
              <Link
                href="/gioi-thieu"
                className="border border-white/40 hover:border-white text-white hover:bg-white/10 text-sm font-bold h-12 px-8 rounded-full transition-all flex items-center justify-center"
              >
                Tìm hiểu Điều lệ Hội
              </Link>
            </div>
          </div>
        </section>

      </main>



      {/* --- POPUP 1: DOCTOR DETAILED INFO MODAL --- */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute right-4 top-4 z-20 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-full bg-gray-50 dark:bg-gray-800 transition-colors"
              >
                <X className="size-5" />
              </button>

              {/* Main Body (Scrollable) */}
              <div className="overflow-y-auto flex-grow p-6 md:p-8">
                
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left border-b border-gray-100 dark:border-gray-800 pb-6">
                  <div className="relative size-28 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/20 bg-gray-50 shadow-md">
                    <Image
                      src={selectedDoctor.avatar}
                      alt={selectedDoctor.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-2">
                    {selectedDoctor.role && (
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                        {selectedDoctor.role}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedDoctor.title}. {selectedDoctor.name}
                    </h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <IdCard className="size-3.5 text-primary" />
                        CCHN: {selectedDoctor.cchn}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5 text-primary" />
                        Hội viên từ {selectedDoctor.joinedYear}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Information Sections */}
                <div className="mt-6 space-y-6">
                  
                  {/* Bio */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                      <Award className="size-4" />
                      Giới thiệu & Kinh nghiệm lâm sàng
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl">
                      {selectedDoctor.experience}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                      <Stethoscope className="size-4" />
                      Chuyên khoa sâu phụ trách
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.specialty.map((spec, i) => (
                        <span
                          key={i}
                          className="bg-pink-50/60 dark:bg-pink-950/20 text-primary border border-pink-100/20 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education details */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                      <GraduationCap className="size-4" />
                      Học vấn & Quá trình đào tạo
                    </h4>
                    <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
                      {selectedDoctor.education.map((edu, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <CheckCircle2 className="size-4.5 text-teal-500 shrink-0 mt-0.5" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Work location contact */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                      <Building className="size-4" />
                      Cơ sở công tác & Liên hệ công việc
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex gap-2 items-center">
                        <Building className="size-4 text-primary shrink-0" />
                        <span className="font-bold">{selectedDoctor.clinic}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <MapPin className="size-4 text-gray-400 shrink-0" />
                        <span>{selectedDoctor.address}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-gray-100 dark:border-gray-800/50 mt-2">
                        <div className="flex gap-2 items-center font-mono">
                          <Mail className="size-4 text-gray-400 shrink-0" />
                          <span>{selectedDoctor.email}</span>
                        </div>
                        <div className="flex gap-2 items-center font-mono">
                          <Phone className="size-4 text-gray-400 shrink-0" />
                          <span>{selectedDoctor.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom footer bar */}
              <div className="bg-gray-50 dark:bg-gray-800/30 px-6 py-4 flex gap-3 justify-end border-t border-gray-100 dark:border-gray-800/60">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Đóng lại
                </button>
                <a
                  href={`mailto:${selectedDoctor.email}`}
                  className="px-5 py-2.5 bg-primary hover:bg-pink-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Mail className="size-3.5" />
                  Gửi thư liên hệ
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- POPUP 2: MEMBERSHIP APPLICATION WORKFLOW MODAL --- */}
      <AnimatePresence>
        {isRegistrationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsRegistrationModalOpen(false);
                setIsRegSubmitted(false);
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsRegistrationModalOpen(false);
                  setIsRegSubmitted(false);
                }}
                className="absolute right-4 top-4 z-20 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-full bg-gray-50 dark:bg-gray-800 transition-colors"
              >
                <X className="size-5" />
              </button>

              {/* Success Screen */}
              {isRegSubmitted ? (
                <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="size-16 rounded-full bg-teal-50 dark:bg-teal-950/20 text-teal-500 flex items-center justify-center mb-2">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Đăng ký Hồ sơ Thành công!</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm">
                    Cảm ơn Bác sĩ đã gửi thông tin ứng tuyển tham gia HSAPS. Văn phòng hội sẽ tiếp nhận, tiến hành đối chiếu thông tin chứng chỉ hành nghề với Bộ Y Tế và gửi phản hồi chính thức qua email trong vòng 3-5 ngày làm việc.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-xs text-gray-500 w-full text-left font-mono space-y-1">
                    <p><span className="font-bold">Mã hồ sơ:</span> {submittedId}</p>
                    <p><span className="font-bold">Thời gian nhận:</span> {submittedTime}</p>
                    <p><span className="font-bold">Email hỗ trợ:</span> vanphong@hsaps.org.vn</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsRegistrationModalOpen(false);
                      setIsRegSubmitted(false);
                    }}
                    className="mt-6 px-6 py-2.5 bg-primary hover:bg-pink-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Hoàn tất & Đóng
                  </button>
                </div>
              ) : (
                /* Form screen */
                <form onSubmit={handleRegSubmit} className="flex flex-col max-h-[85vh]">
                  
                  <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-pink-50/30 dark:bg-pink-950/10">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <UserPlus className="size-5 text-primary" />
                      Ứng tuyển Hội viên HSAPS
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Vui lòng nhập đầy đủ và chính xác thông tin học hàm học vị lâm sàng phục vụ quy trình kiểm duyệt nội bộ.
                    </p>
                  </div>

                  <div className="overflow-y-auto p-6 space-y-4 flex-grow">
                    
                    {/* Name Input & Title Selector */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1 space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Chức danh</label>
                        <select
                          value={regForm.title}
                          onChange={(e) => setRegForm({ ...regForm, title: e.target.value })}
                          className="w-full h-10 px-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        >
                          <option value="BS" className="dark:bg-gray-900">Bác sĩ (BS)</option>
                          <option value="ThS.BS" className="dark:bg-gray-900">ThS.BS</option>
                          <option value="BSCKI" className="dark:bg-gray-900">BSCKI</option>
                          <option value="BSCKII" className="dark:bg-gray-900">BSCKII</option>
                          <option value="TS.BS" className="dark:bg-gray-900">TS.BS</option>
                          <option value="PGS.TS.BS" className="dark:bg-gray-900">PGS.TS.BS</option>
                        </select>
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Họ và tên bác sĩ</label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Văn Hải"
                          value={regForm.name}
                          onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Practice Certificate Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Số Chứng chỉ hành nghề (CCHN) Bộ Y Tế cấp</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: 012345/BYT-CCHN"
                        value={regForm.cchn}
                        onChange={(e) => setRegForm({ ...regForm, cchn: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent font-mono"
                      />
                    </div>

                    {/* Contact details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Số điện thoại liên hệ</label>
                        <input
                          type="tel"
                          required
                          placeholder="09xx.xxx.xxx"
                          value={regForm.phone}
                          onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Địa chỉ Email</label>
                        <input
                          type="email"
                          required
                          placeholder="bacsi@example.com"
                          value={regForm.email}
                          onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                          className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Workplace Clinic */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Cơ sở y tế công tác hiện tại</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Khoa tạo hình thẩm mỹ - Bệnh viện..."
                        value={regForm.hospital}
                        onChange={(e) => setRegForm({ ...regForm, hospital: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    {/* Specialties */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Chuyên ngành phẫu thuật lâm sàng thế mạnh</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Nâng ngực nội soi, Tạo hình mũi cấu trúc"
                        value={regForm.specialty}
                        onChange={(e) => setRegForm({ ...regForm, specialty: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    {/* Introduction Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Thông điệp hoặc đề đạt nguyện vọng gửi Ban chấp hành</label>
                      <textarea
                        rows={2}
                        placeholder="Nội dung khác nếu có..."
                        value={regForm.message}
                        onChange={(e) => setRegForm({ ...regForm, message: e.target.value })}
                        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-sm dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex gap-2 items-start mt-2">
                      <input type="checkbox" required id="reg-terms" className="mt-0.5 rounded text-primary focus:ring-primary" />
                      <label htmlFor="reg-terms" className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                        Tôi cam kết mọi thông tin cung cấp bên trên hoàn toàn trùng khớp với bằng cấp lâm sàng và chịu mọi trách nhiệm pháp lý trước Bộ Y Tế & Điều lệ Hội HSAPS.
                      </label>
                    </div>

                  </div>

                  {/* Submit bar */}
                  <div className="bg-gray-50 dark:bg-gray-800/30 px-6 py-4 flex gap-3 justify-end border-t border-gray-100 dark:border-gray-800/60">
                    <button
                      type="button"
                      onClick={() => setIsRegistrationModalOpen(false)}
                      className="px-5 py-2.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary hover:bg-pink-700 text-white text-xs font-bold rounded-lg transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="size-3.5" />
                      Gửi Hồ sơ Ứng tuyển
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
