'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Stethoscope,
  ChevronRight,
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
  Sparkle,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Info,
  Check
} from 'lucide-react';

// Preset Avatars for quick professional picking
const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
];

// Quick Specialty Presets
const SPECIALTY_PRESETS = [
  'Phẫu thuật Nâng mũi cấu trúc',
  'Tạo hình Mắt hai mí',
  'Nâng ngực nội soi đặt túi',
  'Hút mỡ tạo dáng toàn thân',
  'Căng da mặt trẻ hóa',
  'Gọt hàm V-line tạo dáng',
  'Thẩm mỹ Nội khoa (Filler/Botox)',
  'Điện di tế bào gốc chăm sóc da'
];

interface TimelineItem {
  period: string;
  position: string;
  organization: string;
}

interface AwardItem {
  title: string;
  subtitle: string;
}

function RegisterProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load query params safely
  const initialName = searchParams.get('name') || '';
  const initialEmail = searchParams.get('email') || '';
  const initialPhone = searchParams.get('phone') || '';
  const initialCchn = searchParams.get('cchn') || '';

  // Step state
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showPreviewMobile, setShowPreviewMobile] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Doctor Form State
  const [title, setTitle] = useState('ThS.BS');
  const [name, setName] = useState(initialName || 'Nguyễn Văn A');
  const [role, setRole] = useState('Hội viên liên kết');
  const [experience, setExperience] = useState('Có hơn 10 năm kinh nghiệm chuyên sâu trong lĩnh vực phẫu thuật tạo hình và tái cấu trúc khuôn mặt.');
  const [clinic, setClinic] = useState('Bệnh viện Phẫu thuật Thẩm mỹ HSAPS Sài Gòn');
  const [clinicHours, setClinicHours] = useState<string[]>([
    'Thứ 2 - Thứ 6: 08:00 - 17:00',
    'Thứ 7: 08:00 - 12:00'
  ]);
  const [address, setAddress] = useState('123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM');
  const [phone, setPhone] = useState(initialPhone || '0901 234 567');
  const [email, setEmail] = useState(initialEmail || 'bacsia@hsaps.org.vn');
  const [joinedYear, setJoinedYear] = useState('2024');
  const [cchn, setCchn] = useState(initialCchn || '001234/BYT-CCHN');
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [customAvatar, setCustomAvatar] = useState('');
  
  // Selected specialties
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
    'Phẫu thuật Nâng mũi cấu trúc',
    'Tạo hình Mắt hai mí'
  ]);

  // Biography paragraphs
  const [bioParagraphs, setBioParagraphs] = useState<string[]>([
    'Tốt nghiệp xuất sắc hệ đào tạo Bác sĩ nội trú chuyên khoa Tạo hình Thẩm mỹ, luôn đi đầu trong việc học hỏi các kỹ thuật tinh tế từ các hội nghị quốc tế.',
    'Bác sĩ đã thực hiện thành công hơn 3,000 ca đại phẫu nâng mũi, kiến tạo dáng mũi thanh tú tự nhiên phù hợp với nhân tướng học người Việt.',
    'Với triết lý làm việc bằng cả trái tim, mỗi khách hàng đều là một tác phẩm nghệ thuật cần sự tỉ mỉ, chuẩn xác và an toàn tuyệt đối.'
  ]);

  // Quá trình công tác & Đào tạo
  const [workHistory, setWorkHistory] = useState<TimelineItem[]>([
    { period: '2024 - Nay', position: 'Bác sĩ chuyên khoa chính', organization: 'Bệnh viện Thẩm mỹ HSAPS Sài Gòn' },
    { period: '2020 - 2023', position: 'Bác sĩ lâm sàng cao cấp', organization: 'Khoa Phẫu thuật Tạo hình - Bệnh viện Đại học Y Dược' },
    { period: '2016 - 2019', position: 'Học viên nội trú Ngoại khoa', organization: 'Đại học Y Dược TP.HCM' }
  ]);

  // Chứng chỉ & Giải thưởng
  const [awards, setAwards] = useState<AwardItem[]>([
    { title: 'Chứng chỉ hành nghề KCB', subtitle: `Bộ Y tế cấp - Số: ${initialCchn || '001234/BYT-CCHN'}` },
    { title: 'Thành viên chính thức', subtitle: 'Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS) - Đăng ký mới' },
    { title: 'Báo cáo viên xuất sắc', subtitle: 'Hội nghị khoa học thường niên HSAPS toàn quốc' }
  ]);

  // Synchronize CCHN input to award subtitle automatically
  const handleCchnChange = (newCchn: string) => {
    setCchn(newCchn);
    setAwards(prev => prev.map((item, idx) => {
      if (idx === 0 && item.title.includes('Chứng chỉ hành nghề')) {
        return { ...item, subtitle: `Bộ Y tế cấp - Số: ${newCchn || 'Đang cập nhật'}` };
      }
      return item;
    }));
  };

  // Handlers for dynamic lists
  const handleAddSpecialty = (spec: string) => {
    if (selectedSpecialties.includes(spec)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== spec));
    } else {
      setSelectedSpecialties([...selectedSpecialties, spec]);
    }
  };

  const handleAddCustomSpecialty = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = e.currentTarget.value.trim();
      if (val && !selectedSpecialties.includes(val)) {
        setSelectedSpecialties([...selectedSpecialties, val]);
        e.currentTarget.value = '';
      }
    }
  };

  // Biography updates
  const handleBioChange = (index: number, value: string) => {
    const updated = [...bioParagraphs];
    updated[index] = value;
    setBioParagraphs(updated);
  };

  const handleAddBioParagraph = () => {
    setBioParagraphs([...bioParagraphs, '']);
  };

  const handleRemoveBioParagraph = (index: number) => {
    if (bioParagraphs.length === 1) return;
    setBioParagraphs(bioParagraphs.filter((_, i) => i !== index));
  };

  // Timeline updates
  const handleTimelineChange = (index: number, field: keyof TimelineItem, value: string) => {
    const updated = [...workHistory];
    updated[index] = { ...updated[index], [field]: value };
    setWorkHistory(updated);
  };

  const handleAddTimeline = () => {
    setWorkHistory([...workHistory, { period: 'Thời gian', position: 'Chức vụ', organization: 'Đơn vị công tác' }]);
  };

  const handleRemoveTimeline = (index: number) => {
    setWorkHistory(workHistory.filter((_, i) => i !== index));
  };

  // Awards updates
  const handleAwardChange = (index: number, field: keyof AwardItem, value: string) => {
    const updated = [...awards];
    updated[index] = { ...updated[index], [field]: value };
    setAwards(updated);
  };

  const handleAddAward = () => {
    setAwards([...awards, { title: 'Tên chứng chỉ / giải thưởng', subtitle: 'Chi tiết cấp / năm' }]);
  };

  const handleRemoveAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* HEADER BAR */}
      <div className="bg-white dark:bg-[#1a1016] border-b border-[#fce7f3] dark:border-pink-900/20 py-4 px-6 flex items-center justify-between sticky top-20 z-40">
        <div>
          <h1 className="text-xl font-extrabold text-[#2d1a24] dark:text-white flex items-center gap-2">
            <Sparkles className="size-5 text-[#ec297b]" />
            Hoàn thiện Hồ sơ Khoa học Bác sĩ
          </h1>
          <p className="text-xs text-[#6b4c5d] dark:text-gray-400">
            Cung cấp thông tin chuyên sâu để hoàn thành đăng ký thành viên chính thức HSAPS
          </p>
        </div>

        {/* Desktop Step Indicators */}
        <div className="hidden md:flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                activeStep === step
                  ? 'bg-[#ec297b] text-white ring-4 ring-[#ec297b]/10'
                  : activeStep > step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {activeStep > step ? <Check className="size-4" /> : step}
            </button>
          ))}
          
          <button
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#fce7f3] dark:bg-gray-800 text-xs font-bold text-[#ec297b] dark:text-white rounded-lg"
          >
            <Eye className="size-4" />
            {showPreviewMobile ? 'Sửa thông tin' : 'Xem trước Live'}
          </button>
        </div>
      </div>

      {/* WORKSPACE SIDE-BY-SIDE GRID */}
      <div className="flex-1 grid lg:grid-cols-12 min-h-[calc(100vh-210px)] relative">
        
        {/* LEFT COLUMN: EDIT FORM PANELS */}
        <div className={`lg:col-span-6 p-6 sm:p-8 space-y-8 bg-[#fdf8fa]/50 dark:bg-[#1a1016]/40 overflow-y-auto border-r border-[#fce7f3] dark:border-pink-900/10 ${
          showPreviewMobile ? 'hidden lg:block' : 'block'
        }`}>
          
          {/* Progress bar on mobile */}
          <div className="md:hidden flex items-center justify-between mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold text-[#ec297b]">Bước {activeStep} / 5:</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === activeStep ? 'w-6 bg-[#ec297b]' : s < activeStep ? 'w-2 bg-green-500' : 'w-2 bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setShowPreviewMobile(true)}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#ec297b]/10 text-xs font-bold text-[#ec297b] rounded-lg"
            >
              <Eye className="size-3.5" /> Live Preview
            </button>
          </div>

          <form onSubmit={handleSubmitProfile} className="space-y-8">
            
            {/* STEP 1: BASIC PROFESSIONAL DATA */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-lg font-bold text-[#2d1a24] dark:text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 rounded-lg bg-[#ec297b]/10 text-[#ec297b] text-sm font-bold">1</span>
                    Thông tin cơ bản &amp; Học hàm học vị
                  </h3>
                  <p className="text-xs text-[#6b4c5d] dark:text-gray-400 mt-1">Thông tin này hiển thị lớn ở phần đầu trang cá nhân bác sĩ</p>
                </div>

                {/* Avatar Picker */}
                <div className="space-y-3">
                  <label className="block text-xs font-extrabold text-[#2d1a24] dark:text-gray-300 uppercase tracking-wider">
                    Ảnh đại diện bác sĩ
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="relative size-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-[#ec297b]">
                      <Image
                        src={customAvatar || avatar}
                        alt="Avatar Preview"
                        fill
                        sizes="80px"
                        className="object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-xs text-[#6b4c5d] dark:text-gray-400">Chọn nhanh mẫu ảnh chuyên nghiệp hoặc nhập link ảnh của bạn:</p>
                      <div className="flex gap-2">
                        {AVATAR_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => { setAvatar(preset); setCustomAvatar(''); }}
                            className={`relative size-10 rounded-full overflow-hidden border-2 transition-all ${
                              avatar === preset && !customAvatar ? 'border-[#ec297b] scale-110 shadow' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                          >
                            <Image src={preset} fill sizes="40px" alt={`Preset ${idx}`} className="object-cover object-top" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                      <input
                        type="url"
                        placeholder="Hoặc dán URL ảnh cá nhân tại đây..."
                        value={customAvatar}
                        onChange={(e) => {
                          setCustomAvatar(e.target.value);
                          if (e.target.value) setAvatar(e.target.value);
                        }}
                        className="w-full text-xs rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-1.5 focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Title and Name */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Học hàm / Học vị</label>
                    <select
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    >
                      <option value="PGS.TS.BS">PGS. TS. BS</option>
                      <option value="TS.BS">TS. BS</option>
                      <option value="ThS.BS">ThS. BS</option>
                      <option value="BSCKII">BS. CKII</option>
                      <option value="BSCKI">BS. CKI</option>
                      <option value="Bác sĩ">Bác sĩ</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Họ và tên bác sĩ *</label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                      placeholder="TS. BS. Nguyễn Văn A"
                    />
                  </div>
                </div>

                {/* Role / Joined Year */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Vai trò thành viên</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    >
                      <option value="Hội viên liên kết">Hội viên liên kết</option>
                      <option value="Hội viên chính thức">Hội viên chính thức</option>
                      <option value="Ủy viên Ban chấp hành">Ủy viên Ban chấp hành</option>
                      <option value="Phó Chủ tịch Hội">Phó Chủ tịch Hội</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Năm gia nhập hội</label>
                    <input
                      type="number"
                      min="1990"
                      max={new Date().getFullYear().toString()}
                      value={joinedYear}
                      onChange={(e) => setJoinedYear(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    />
                  </div>
                </div>

                {/* Practicing Certificate number (CCHN) */}
                <div>
                  <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">
                    Số chứng chỉ hành nghề (CCHN) *
                  </label>
                  <input
                    required
                    type="text"
                    value={cchn}
                    onChange={(e) => handleCchnChange(e.target.value)}
                    className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white font-mono"
                    placeholder="001234/BYT-CCHN"
                  />
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                    <Info className="size-3 shrink-0" />
                    Bắt buộc để ban chấp hành xác minh pháp lý với cơ sở y tế Bộ Y Tế.
                  </p>
                </div>

                {/* Short Experience Intro */}
                <div>
                  <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">
                    Tóm tắt kinh nghiệm làm việc nổi bật (ngắn gọn)
                  </label>
                  <textarea
                    rows={3}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white placeholder:text-gray-400"
                    placeholder="Bác sĩ có hơn 15 năm công tác, là cố vấn cấp cao về tạo hình cơ xương mặt..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="px-6 py-2.5 bg-[#ec297b] text-white text-sm font-bold rounded-lg hover:bg-[#c2185f] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Tiếp theo
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CLINIC & CONTACT DATA */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-lg font-bold text-[#2d1a24] dark:text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 rounded-lg bg-[#ec297b]/10 text-[#ec297b] text-sm font-bold">2</span>
                    Đơn vị công tác &amp; Phòng khám
                  </h3>
                  <p className="text-xs text-[#6b4c5d] dark:text-gray-400 mt-1">Thông tin kết nối bệnh nhân và lịch tư vấn lâm sàng của bác sĩ</p>
                </div>

                {/* Organization name / Clinic name */}
                <div>
                  <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Bệnh viện / Đơn vị công tác chính *</label>
                  <input
                    required
                    type="text"
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                    className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    placeholder="Bệnh viện Phẫu thuật Thẩm mỹ HSAPS"
                  />
                </div>

                {/* Clinic address */}
                <div>
                  <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Địa chỉ phòng khám / Cơ sở làm việc *</label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    placeholder="123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Số điện thoại liên hệ *</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300 mb-1">Email y khoa công việc *</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2.5 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    />
                  </div>
                </div>

                {/* Clinic Hours */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300">Giờ hoạt động phòng khám (lên tới 2 dòng)</label>
                  <input
                    type="text"
                    value={clinicHours[0] || ''}
                    onChange={(e) => setClinicHours([e.target.value, clinicHours[1] || ''])}
                    className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    placeholder="Thứ 2 - Thứ 6: 08:00 - 17:00"
                  />
                  <input
                    type="text"
                    value={clinicHours[1] || ''}
                    onChange={(e) => setClinicHours([clinicHours[0] || '', e.target.value])}
                    className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    placeholder="Thứ 7: 08:00 - 12:00"
                  />
                </div>

                {/* Specialties Selecting */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300">
                    Chuyên môn thế mạnh sâu (Bấm để chọn nhiều)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SPECIALTY_PRESETS.map((spec) => {
                      const isSelected = selectedSpecialties.includes(spec);
                      return (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => handleAddSpecialty(spec)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-[#ec297b] border-[#ec297b] text-white shadow'
                              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-pink-50/50'
                          }`}
                        >
                          {spec}
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    <input
                      type="text"
                      onKeyDown={handleAddCustomSpecialty}
                      placeholder="Thêm chuyên ngành khác... (Nhấn Enter)"
                      className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2 text-xs focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="px-5 py-2.5 border border-gray-200 text-[#6b4c5d] dark:text-white rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="size-4" />
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-2.5 bg-[#ec297b] text-white text-sm font-bold rounded-lg hover:bg-[#c2185f] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Tiếp theo
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: BIOGRAPHY PARAGRAPHS */}
            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-lg font-bold text-[#2d1a24] dark:text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 rounded-lg bg-[#ec297b]/10 text-[#ec297b] text-sm font-bold">3</span>
                    Tiểu sử &amp; Giới thiệu bản thân
                  </h3>
                  <p className="text-xs text-[#6b4c5d] dark:text-gray-400 mt-1">Viết lời tự sự giới thiệu y đức, phong cách làm việc của bác sĩ</p>
                </div>

                <div className="space-y-4">
                  {bioParagraphs.map((para, index) => (
                    <div key={index} className="space-y-1.5 relative group">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#6b4c5d] dark:text-gray-300">
                          Đoạn văn {index + 1}
                        </label>
                        {bioParagraphs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveBioParagraph(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                            title="Xóa đoạn này"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => handleBioChange(index, e.target.value)}
                        className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-[#ec297b] focus:ring-[#ec297b] dark:text-white placeholder:text-gray-400"
                        placeholder="Mô tả quá trình học tập hoặc nghiên cứu khoa học của bác sĩ..."
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddBioParagraph}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 border-2 border-dashed border-pink-200 hover:border-[#ec297b] text-[#ec297b] rounded-xl text-xs font-bold transition-all"
                  >
                    <Plus className="size-4" />
                    Thêm đoạn văn mới
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="px-5 py-2.5 border border-gray-200 text-[#6b4c5d] dark:text-white rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="size-4" />
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2.5 bg-[#ec297b] text-white text-sm font-bold rounded-lg hover:bg-[#c2185f] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Tiếp theo
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: WORK HISTORY TIMELINE */}
            {activeStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-lg font-bold text-[#2d1a24] dark:text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 rounded-lg bg-[#ec297b]/10 text-[#ec297b] text-sm font-bold">4</span>
                    Lịch sử công tác &amp; Đào tạo y khoa
                  </h3>
                  <p className="text-xs text-[#6b4c5d] dark:text-gray-400 mt-1">Hiển thị dưới dạng dòng thời gian chuyên nghiệp (Timeline)</p>
                </div>

                <div className="space-y-5">
                  {workHistory.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl relative space-y-3 shadow-sm group"
                    >
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleRemoveTimeline(index)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-gray-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[10px] font-extrabold text-[#6b4c5d] uppercase mb-1">Giai đoạn</label>
                          <input
                            type="text"
                            required
                            value={item.period}
                            onChange={(e) => handleTimelineChange(index, 'period', e.target.value)}
                            className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-2.5 py-1.5 text-xs font-mono focus:border-[#ec297b] dark:text-white"
                            placeholder="2018 - 2021"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-extrabold text-[#6b4c5d] uppercase mb-1">Chức vụ / Học vị đạt được</label>
                          <input
                            type="text"
                            required
                            value={item.position}
                            onChange={(e) => handleTimelineChange(index, 'position', e.target.value)}
                            className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-2.5 py-1.5 text-xs focus:border-[#ec297b] dark:text-white"
                            placeholder="Phó trưởng khoa tạo hình"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-extrabold text-[#6b4c5d] uppercase mb-1">Cơ sở đào tạo / Bệnh viện công tác</label>
                        <input
                          type="text"
                          required
                          value={item.organization}
                          onChange={(e) => handleTimelineChange(index, 'organization', e.target.value)}
                          className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-2.5 py-1.5 text-xs focus:border-[#ec297b] dark:text-white"
                          placeholder="Bệnh viện Chợ Rẫy TP.HCM"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddTimeline}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 border-2 border-dashed border-pink-200 hover:border-[#ec297b] text-[#ec297b] rounded-xl text-xs font-bold transition-all"
                  >
                    <Plus className="size-4" />
                    Thêm mốc lịch sử mới
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="px-5 py-2.5 border border-gray-200 text-[#6b4c5d] dark:text-white rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="size-4" />
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(5)}
                    className="px-6 py-2.5 bg-[#ec297b] text-white text-sm font-bold rounded-lg hover:bg-[#c2185f] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    Tiếp theo
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: AWARDS & DECORATIONS */}
            {activeStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                  <h3 className="text-lg font-bold text-[#2d1a24] dark:text-white flex items-center gap-2">
                    <span className="flex items-center justify-center size-7 rounded-lg bg-[#ec297b]/10 text-[#ec297b] text-sm font-bold">5</span>
                    Chứng chỉ y khoa &amp; Giải thưởng uy tín
                  </h3>
                  <p className="text-xs text-[#6b4c5d] dark:text-gray-400 mt-1">Các chứng minh bổ túc tay nghề giúp tăng điểm y tín hồ sơ</p>
                </div>

                <div className="space-y-5">
                  {awards.map((award, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl relative space-y-3 shadow-sm group"
                    >
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleRemoveAward(index)}
                          className="p-1 text-gray-400 hover:text-red-500 rounded hover:bg-gray-50"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-extrabold text-[#6b4c5d] uppercase mb-1">Tên chứng nhận / Giải thưởng</label>
                          <input
                            type="text"
                            required
                            value={award.title}
                            disabled={index === 0} // Keep first CCHN sync-locked
                            onChange={(e) => handleAwardChange(index, 'title', e.target.value)}
                            className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-2.5 py-1.5 text-xs focus:border-[#ec297b] dark:text-white disabled:opacity-60"
                            placeholder="Chứng chỉ CME Thẩm mỹ mắt"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold text-[#6b4c5d] uppercase mb-1">Cơ quan cấp / Chi tiết bổ sung</label>
                          <input
                            type="text"
                            required
                            value={award.subtitle}
                            disabled={index === 0} // Keep first CCHN sync-locked
                            onChange={(e) => handleAwardChange(index, 'subtitle', e.target.value)}
                            className="w-full rounded-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-2.5 py-1.5 text-xs focus:border-[#ec297b] dark:text-white disabled:opacity-60"
                            placeholder="Hội HSAPS Sài Gòn cấp - 2023"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddAward}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 border-2 border-dashed border-pink-200 hover:border-[#ec297b] text-[#ec297b] rounded-xl text-xs font-bold transition-all"
                  >
                    <Plus className="size-4" />
                    Thêm chứng chỉ mới
                  </button>
                </div>

                {/* Submitting Notice */}
                <div className="bg-[#ec297b]/5 rounded-2xl p-4 border border-[#ec297b]/10 text-xs text-[#6b4c5d] dark:text-pink-100 leading-relaxed space-y-2">
                  <p className="font-bold text-[#ec297b]">🔒 Hồ sơ bảo mật cao cấp</p>
                  <p>Thông tin hồ sơ sau khi gửi sẽ được Ban chấp hành HSAPS mã hóa chữ ký số và đối chứng với cổng lưu trữ hành nghề y quốc gia trước khi kích hoạt hiển thị tìm kiếm thành viên chính thức.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="px-5 py-2.5 border border-gray-200 text-[#6b4c5d] dark:text-white rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="size-4" />
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#ec297b] text-white text-sm font-extrabold rounded-lg hover:bg-[#c2185f] shadow-lg shadow-[#ec297b]/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? 'Đang gửi hồ sơ...' : 'Xác nhận &amp; Gửi hồ sơ'}
                    <Send className="size-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </form>
        </div>

        {/* RIGHT COLUMN: LIVE DYNAMIC PREVIEW WORKSPACE */}
        <div className={`lg:col-span-6 bg-[#fdf8fa] dark:bg-[#110a0e] p-6 sm:p-8 overflow-y-auto ${
          showPreviewMobile ? 'block' : 'hidden lg:block'
        }`}>
          
          {/* Header on mobile to switch back */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Xem trước hiển thị trực tuyến</span>
            <button
              onClick={() => setShowPreviewMobile(false)}
              className="flex items-center gap-1 px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-xs font-bold text-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <ChevronLeft className="size-3.5" /> Trở lại sửa
            </button>
          </div>

          <div className="sticky top-28 space-y-4">
            
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ec297b] bg-[#ec297b]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                <span className="size-2 rounded-full bg-green-500 animate-ping" />
                Live Preview
              </span>
              <span className="text-xs text-gray-400">Xem trực quan hồ sơ của bạn sẽ hiển thị với người dùng</span>
            </div>

            {/* DOCTOR DETAIL REPLICATED LAYOUT */}
            <div className="border border-pink-100 dark:border-pink-950/20 rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-gray-900 transition-all">
              
              {/* Profile Card Header */}
              <div className="relative p-6 md:p-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-50 to-amber-50 dark:from-pink-950/5 dark:to-amber-950/5 rounded-full blur-3xl opacity-70 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                  
                  {/* Doctor Avatar */}
                  <div className="shrink-0 relative">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                      <Image
                        alt={`${title} ${name}`}
                        className="w-full h-full object-cover object-top"
                        src={customAvatar || avatar}
                        fill
                        sizes="128px"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#fcd34d] text-white p-1 rounded-full shadow border-2 border-white dark:border-gray-800" title="Hội viên chính thức">
                      <BadgeCheck className="size-4 fill-[#fcd34d] text-[#ec297b]" />
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ec297b]/10 text-[#ec297b] text-[10px] font-bold uppercase tracking-wider mb-2">
                      {role}
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-[#2d1a24] dark:text-white leading-tight mb-1 truncate">
                      {title}. {name || 'Chưa nhập họ tên'}
                    </h2>
                    <p className="text-xs text-[#ec297b] font-bold mb-3">
                      Chuyên khoa Phẫu thuật Tạo hình &amp; Thẩm mỹ
                    </p>
                    <p className="text-xs text-[#6b4c5d] dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {experience || 'Mô tả kinh nghiệm của bác sĩ...'}
                    </p>

                    {/* Social quicklinks */}
                    <div className="flex justify-center md:justify-start gap-2 mt-4">
                      <div className="size-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400"><Globe className="size-3.5" /></div>
                      <div className="size-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                        <svg className="size-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.9 0-5 1.79-5 4.8V8z"/></svg>
                      </div>
                      <div className="size-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400"><Share2 className="size-3.5" /></div>
                    </div>
                  </div>
                </div>

                {/* Micro Statistics Replicated */}
                <div className="grid grid-cols-3 gap-2 pt-5 border-t border-gray-150 dark:border-gray-850 mt-5 text-left">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 p-1.5 rounded-lg shrink-0">
                      <Clock className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-[#6b4c5d] dark:text-gray-400">Kinh nghiệm</p>
                      <p className="font-bold text-[#2d1a24] dark:text-white text-xs truncate">
                        {joinedYear ? `${new Date().getFullYear() - parseInt(joinedYear) + 10}+ Năm` : '10+ Năm'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-pink-50 dark:bg-pink-950/20 text-[#ec297b] p-1.5 rounded-lg shrink-0">
                      <GraduationCap className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-[#6b4c5d] dark:text-gray-400">Học vị</p>
                      <p className="font-bold text-[#2d1a24] dark:text-white text-xs truncate">
                        {title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 dark:bg-blue-950/20 text-blue-600 p-1.5 rounded-lg shrink-0">
                      <MapPin className="size-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-[#6b4c5d] dark:text-gray-400">Đơn vị</p>
                      <p className="font-bold text-[#2d1a24] dark:text-white text-xs truncate" title={clinic}>
                        {clinic.replace('Bệnh viện Phẫu thuật Thẩm mỹ ', 'BV ').replace('Bệnh viện Thẩm mỹ ', 'BV ') || 'Chưa nhập'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Profile Card Body Details */}
              <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 space-y-6 text-left">
                
                {/* Biography Paragraphs */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-[#2d1a24] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <User className="size-3.5 text-[#ec297b]" />
                    Giới thiệu tóm lược
                  </h4>
                  <div className="text-xs text-[#6b4c5d] dark:text-gray-300 space-y-2 leading-relaxed">
                    {bioParagraphs.filter(Boolean).map((para, index) => (
                      <p key={index}>{para}</p>
                    ))}
                    {bioParagraphs.filter(Boolean).length === 0 && (
                      <p className="text-gray-400 italic">Chưa nhập tiểu sử...</p>
                    )}
                  </div>
                </div>

                {/* Specialties Tags */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-[#2d1a24] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-pink-500" />
                    Dịch vụ thế mạnh sâu
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSpecialties.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded bg-white dark:bg-gray-800 text-[#ec297b] text-[10px] font-bold border border-pink-100 dark:border-pink-950/25"
                      >
                        {spec}
                      </span>
                    ))}
                    {selectedSpecialties.length === 0 && (
                      <span className="text-xs text-gray-400 italic">Chưa chọn dịch vụ nào...</span>
                    )}
                  </div>
                </div>

                {/* Quá trình công tác */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-[#2d1a24] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <History className="size-3.5 text-yellow-500" />
                    Quá trình công tác
                  </h4>
                  <div className="pl-4 border-l border-pink-200/50 dark:border-pink-900/30 space-y-3 ml-1.5">
                    {workHistory.map((item, index) => (
                      <div key={index} className="relative text-xs">
                        <div className="absolute -left-[21px] top-1 size-2 rounded-full bg-[#ec297b]" />
                        <span className="text-[10px] text-[#ec297b] font-bold bg-[#ec297b]/5 px-1 py-0.2 rounded font-mono">
                          {item.period}
                        </span>
                        <h5 className="font-bold text-[#2d1a24] dark:text-white mt-0.5 leading-tight">{item.position}</h5>
                        <p className="text-[11px] text-[#6b4c5d] dark:text-gray-400 leading-tight">{item.organization}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chứng chỉ & Awards */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-[#2d1a24] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="size-3.5 text-amber-500" />
                    Chứng chỉ &amp; Bằng cấp
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {awards.map((award, index) => (
                      <div key={index} className="flex gap-2 p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-850 rounded-xl">
                        <Sparkle className="size-4 text-amber-500 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <h6 className="font-bold text-[11px] text-[#2d1a24] dark:text-white leading-tight truncate">{award.title}</h6>
                          <p className="text-[9px] text-[#6b4c5d] dark:text-gray-400 truncate">{award.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact and address box replicated */}
                <div className="p-4 bg-pink-50/20 dark:bg-gray-850/50 rounded-2xl border border-pink-200/20 space-y-3">
                  <div className="flex gap-2.5">
                    <MapPin className="size-4 text-[#ec297b] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[#6b4c5d] dark:text-gray-300 leading-normal">
                      {address || 'Chưa nhập địa chỉ phòng khám'}
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <Clock className="size-4 text-[#ec297b] shrink-0 mt-0.5" />
                    <div className="text-[11px] text-[#6b4c5d] dark:text-gray-300 space-y-0.5">
                      {clinicHours.filter(Boolean).map((hours, index) => (
                        <p key={index}>{hours}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2.5 pt-1.5 border-t border-gray-100 dark:border-gray-800 text-[11px] text-[#6b4c5d] dark:text-gray-400 justify-between">
                    <span className="flex items-center gap-1"><Phone className="size-3 text-[#ec297b]" /> {phone}</span>
                    <span className="flex items-center gap-1 truncate max-w-[150px]"><Mail className="size-3 text-[#ec297b]" /> {email}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* REGISTRATION SUCCESS OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative space-y-6"
            >
              <div className="size-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                <CheckCircle className="size-12 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-[#2d1a24] dark:text-white tracking-tight">
                  Gửi Hồ Sơ Thành Công!
                </h2>
                <p className="text-sm text-[#ec297b] font-bold">
                  Học vị: {title} - Bác sĩ: {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mã số tiếp nhận: <span className="font-mono font-bold">HSAPS-{cchn.replace(/[^0-9]/g, '') || '9876'}</span>
                </p>
              </div>

              <div className="bg-[#fdf8fa] dark:bg-[#110a0e] p-5 rounded-2xl border border-pink-100 dark:border-pink-900/15 text-left space-y-3.5 text-xs text-[#6b4c5d] dark:text-gray-300 leading-relaxed">
                <p className="font-bold text-[#2d1a24] dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-green-500 shrink-0" />
                  Quy trình duyệt hồ sơ tự động &amp; Thủ công
                </p>
                <div className="space-y-2 border-l-2 border-pink-200/50 dark:border-pink-900/30 pl-3.5 ml-1">
                  <p>
                    <strong>Bước 1:</strong> Hệ thống đối chiếu số CCHN <code className="font-mono bg-pink-50 px-1 rounded text-[#ec297b]">{cchn}</code> với Cơ sở dữ liệu Bộ Y Tế.
                  </p>
                  <p>
                    <strong>Bước 2:</strong> Ban thẩm định hội HSAPS (Ủy viên điều hành) rà soát bằng cấp, thời gian công tác và thế mạnh chuyên khoa.
                  </p>
                  <p>
                    <strong>Bước 3:</strong> Sau khi kích hoạt thành công (dự kiến trong 24-48 giờ), hồ sơ của bác sĩ sẽ hiển thị công khai trên công cụ tra cứu quốc gia và nhận thẻ hội viên số hóa.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/hoi-vien"
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-[#2d1a24] font-bold rounded-xl text-sm transition-all text-center"
                >
                  Xem danh sách Hội viên
                </Link>
                <Link
                  href="/"
                  className="flex-1 py-3 px-4 bg-[#ec297b] hover:bg-[#c2185f] text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all text-center"
                >
                  Quay lại Trang chủ
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function RegisterProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fdf8fa] dark:bg-[#1a1016]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ec297b] mx-auto"></div>
          <p className="text-xs text-[#6b4c5d]">Đang tải dữ liệu thiết lập hồ sơ...</p>
        </div>
      </div>
    }>
      <RegisterProfileContent />
    </Suspense>
  );
}
