'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import {
  GraduationCap, Shield, Users, Vote,
  CalendarCheck, BookOpen, Scale, MessageSquare,
  BadgeCheck, Network, FileText, Newspaper,
  ArrowRight, ChevronRight, Star, Check,
  UserPlus, ExternalLink, Award, Sparkles,
  TrendingUp, Globe, Heart, Zap,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Benefit = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tag?: string;
};

type BenefitGroup = {
  id: string;
  number: string;
  category: string;
  headline: string;
  color: string;
  bgLight: string;
  bgDark: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  benefits: Benefit[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const BENEFIT_GROUPS: BenefitGroup[] = [
  {
    id: 'nang-cao',
    number: '01',
    category: 'Nâng cao trình độ & Chuyên môn',
    headline: 'Học không ngừng, dẫn đầu chuyên ngành',
    color: 'from-violet-500 to-purple-700',
    bgLight: 'bg-violet-50',
    bgDark: 'dark:bg-violet-900/10',
    accent: 'text-violet-600 dark:text-violet-400',
    icon: GraduationCap,
    benefits: [
      {
        id: 'b1',
        icon: CalendarCheck,
        title: 'Tham gia hội nghị & hội thảo',
        description:
          'Đăng ký dự các hội nghị khoa học quốc tế thường niên, hội thảo chuyên đề và lớp tập huấn y khoa do Hội tổ chức hoặc hợp tác với các tổ chức thẩm mỹ quốc tế với chi phí ưu đãi hoặc miễn phí.',
        tag: 'Ưu đãi phí',
      },
      {
        id: 'b2',
        icon: BookOpen,
        title: 'Đào tạo liên tục (CME)',
        description:
          'Tiếp cận thông tin y khoa, báo cáo nghiên cứu mới nhất và tham gia các khóa đào tạo nâng cao tay nghề, cấp chứng nhận CME để duy trì điều kiện hành nghề theo quy định.',
        tag: 'Chứng nhận CME',
      },
    ],
  },
  {
    id: 'phap-ly',
    number: '02',
    category: 'Hỗ trợ Pháp lý & Bảo vệ hành nghề',
    headline: 'Hành nghề vững chắc, được pháp luật bảo hộ',
    color: 'from-sky-500 to-blue-700',
    bgLight: 'bg-sky-50',
    bgDark: 'dark:bg-sky-900/10',
    accent: 'text-sky-600 dark:text-sky-400',
    icon: Shield,
    benefits: [
      {
        id: 'b3',
        icon: Scale,
        title: 'Bảo vệ quyền lợi hợp pháp',
        description:
          'Được Hội bảo vệ quyền và lợi ích hợp pháp trong hoạt động khám chữa bệnh, hành nghề đúng quy định pháp luật; hỗ trợ xử lý các tranh chấp và tình huống pháp lý phát sinh.',
        tag: 'Bảo vệ hành nghề',
      },
      {
        id: 'b4',
        icon: MessageSquare,
        title: 'Tư vấn chuyên môn & Y khoa',
        description:
          'Nhận sự tư vấn, hỗ trợ chuyên môn từ Ban chấp hành và các chuyên gia đầu ngành khi gặp các ca bệnh khó hoặc sự cố y khoa trong phạm vi cho phép của pháp luật.',
        tag: 'Chuyên gia hỗ trợ',
      },
    ],
  },
  {
    id: 'uy-tin',
    number: '03',
    category: 'Uy tín & Kết nối cộng đồng',
    headline: 'Khẳng định vị thế, mở rộng mạng lưới',
    color: 'from-rose-500 to-pink-700',
    bgLight: 'bg-rose-50',
    bgDark: 'dark:bg-rose-900/10',
    accent: 'text-rose-600 dark:text-rose-400',
    icon: Users,
    benefits: [
      {
        id: 'b5',
        icon: BadgeCheck,
        title: 'Khẳng định thương hiệu cá nhân & đơn vị',
        description:
          'Được công nhận là thành viên chính thức của một tổ chức nghề nghiệp chính thống, nâng cao uy tín chuyên môn đối với khách hàng, bệnh nhân và cộng đồng y tế.',
        tag: 'Hội viên chính thức',
      },
      {
        id: 'b6',
        icon: Network,
        title: 'Giao lưu & Mở rộng mạng lưới',
        description:
          'Kết nối, trao đổi kinh nghiệm chuyên môn với đội ngũ y bác sĩ, chuyên gia phẫu thuật tạo hình thẩm mỹ uy tín trong và ngoài nước thông qua các sự kiện và diễn đàn của Hội.',
        tag: 'Mạng lưới quốc tế',
      },
    ],
  },
  {
    id: 'quyen-to-chuc',
    number: '04',
    category: 'Quyền tổ chức & Đóng góp ý kiến',
    headline: 'Tham gia xây dựng, định hướng phát triển ngành',
    color: 'from-emerald-500 to-teal-700',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-900/10',
    accent: 'text-emerald-600 dark:text-emerald-400',
    icon: Vote,
    benefits: [
      {
        id: 'b7',
        icon: Vote,
        title: 'Thảo luận & Đóng góp',
        description:
          'Tham gia thảo luận, đóng góp ý kiến xây dựng định hướng phát triển ngành thẩm mỹ an toàn, góp ý văn bản quy phạm pháp luật liên quan đến chuyên ngành y học thẩm mỹ.',
        tag: 'Góp ý chính sách',
      },
      {
        id: 'b8',
        icon: Award,
        title: 'Quyền ứng cử, bầu cử',
        description:
          'Bầu cử, ứng cử vào Ban Chấp hành Liên chi hội theo quy định điều lệ; tham gia vào quá trình ra quyết định và quản trị tổ chức chuyên môn cao nhất ngành.',
        tag: 'Dân chủ nội bộ',
      },
      {
        id: 'b9',
        icon: Newspaper,
        title: 'Cung cấp thông tin',
        description:
          'Được Hội cung cấp các bản tin, tạp chí khoa học và thông tin hoạt động thường kỳ; tiếp cận nghiên cứu lâm sàng, hướng dẫn điều trị và cập nhật kỹ thuật mới nhất.',
        tag: 'Thông tin thường kỳ',
      },
    ],
  },
];

const STATS = [
  { value: '500+', label: 'Hội viên chính thức', icon: Users },
  { value: '15+', label: 'Năm hoạt động', icon: TrendingUp },
  { value: '50+', label: 'Hội nghị đã tổ chức', icon: CalendarCheck },
  { value: '1.000+', label: 'Bài báo khoa học', icon: BookOpen },
];

const STEPS = [
  { number: '01', title: 'Chuẩn bị hồ sơ', desc: 'Bằng tốt nghiệp y khoa, chứng chỉ hành nghề, ảnh thẻ và các giấy tờ liên quan.' },
  { number: '02', title: 'Nộp đơn đăng ký', desc: 'Điền form online hoặc nộp trực tiếp tại văn phòng Hội kèm hồ sơ đầy đủ.' },
  { number: '03', title: 'Xét duyệt', desc: 'Ban chấp hành xem xét, thẩm định hồ sơ trong vòng 7–10 ngày làm việc.' },
  { number: '04', title: 'Cấp thẻ Hội viên', desc: 'Nhận thẻ hội viên chính thức và tận hưởng đầy đủ quyền lợi ngay lập tức.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function AnimatedCounter({ value }: { value: string }) {
  return <span>{value}</span>;
}

function BenefitCard({ benefit, accent, delay }: { benefit: Benefit; accent: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = benefit.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="group flex flex-col gap-4 rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#161b22] p-5 sm:p-6 hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl ${accent.includes('violet') ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600' : accent.includes('sky') ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600' : accent.includes('rose') ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600'}`}>
          <Icon className="size-5 sm:size-6" />
        </div>
        {benefit.tag && (
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${accent.includes('violet') ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400' : accent.includes('sky') ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' : accent.includes('rose') ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'}`}>
            {benefit.tag}
          </span>
        )}
      </div>
      <div>
        <h4 className="font-bold text-base sm:text-lg text-text-main dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-[#ec297b] transition-colors">
          {benefit.title}
        </h4>
        <p className="text-sm leading-relaxed text-text-secondary dark:text-gray-400">
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HoiVienPage() {
  const [activeGroup, setActiveGroup] = useState<string>('nang-cao');

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden">

      {/* ① HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0c16] via-[#2d0f2a] to-[#1a0c16] py-20 sm:py-28 lg:py-36">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#ec297b]/10 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-purple-700/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-rose-900/10 blur-[80px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#ec297b]/30 bg-[#ec297b]/10 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#ec297b] mb-6 sm:mb-8"
          >
            <Sparkles className="size-3.5" />
            Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mb-5 sm:mb-6 fluid-h1 font-display font-extrabold text-white"
          >
            Trở thành{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#ec297b] via-rose-400 to-[#fcd34d] bg-clip-text text-transparent">
                Hội viên HSAPS
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ec297b] to-[#fcd34d] rounded-full opacity-50" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mx-auto mb-8 sm:mb-10 max-w-2xl fluid-body text-gray-300"
          >
            Tham gia cộng đồng chuyên gia phẫu thuật thẩm mỹ hàng đầu Việt Nam. Nhận đầy đủ quyền lợi học thuật, pháp lý, kết nối và đóng góp vào định hướng phát triển ngành.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/login?tab=register"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-rose-600 px-7 sm:px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-pink-900/30 hover:shadow-xl hover:shadow-pink-900/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              <UserPlus className="size-4 sm:size-5" />
              Đăng ký Hội viên ngay
            </Link>
            <a
              href="#quyen-loi"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-7 sm:px-8 py-3.5 text-sm sm:text-base font-bold text-white backdrop-blur hover:bg-white/[0.14] transition-all"
            >
              Xem quyền lợi <ChevronRight className="size-4" />
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 mt-14 sm:mt-20 mx-auto max-w-4xl px-4 sm:px-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 sm:p-6 backdrop-blur-sm">
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center text-center gap-1.5">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[#ec297b]/10 text-[#ec297b] mb-1">
                    <Icon className="size-4" />
                  </div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium">{s.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ② NAV TABS ─────────────────────────────────────────────────────── */}
      <div id="quyen-loi" className="sticky top-16 z-30 border-b border-gray-100 dark:border-white/[0.06] bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-0 scrollbar-none">
            {BENEFIT_GROUPS.map((g) => {
              const Icon = g.icon;
              const active = activeGroup === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  className={`relative flex shrink-0 items-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${active ? 'text-primary' : 'text-text-secondary dark:text-gray-400 hover:text-text-main dark:hover:text-white'}`}
                >
                  <Icon className="size-3.5 sm:size-4" />
                  <span className="hidden sm:inline">{g.category}</span>
                  <span className="sm:hidden">{g.number}</span>
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ③ BENEFITS CONTENT ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20">
        {BENEFIT_GROUPS.map((group) => {
          if (activeGroup !== group.id) return null;
          const GroupIcon = group.icon;
          return (
            <div key={group.id} className="mx-auto max-w-6xl px-4 sm:px-6">
              {/* Group header */}
              <motion.div
                key={group.id + '-header'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10 sm:mb-12"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${group.color} text-white shadow-lg`}>
                    <GroupIcon className="size-7 sm:size-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Quyền lợi {group.number}
                      </span>
                      <div className="h-px flex-1 max-w-16 bg-gray-200 dark:bg-white/10" />
                    </div>
                    <h2 className="fluid-h2 font-display font-bold text-text-main dark:text-white mb-2">
                      {group.category}
                    </h2>
                    <p className={`text-base sm:text-lg font-semibold ${group.accent}`}>
                      {group.headline}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Benefit cards grid */}
              <div className={`grid gap-5 ${group.benefits.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                {group.benefits.map((benefit, i) => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    accent={group.accent}
                    delay={i * 0.1}
                  />
                ))}
              </div>

              {/* Visual detail block */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                className={`mt-8 rounded-2xl ${group.bgLight} ${group.bgDark} border border-gray-100 dark:border-white/[0.06] p-6 sm:p-8`}
              >
                <div className="flex items-start gap-4">
                  <div className={`hidden sm:flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${group.color} text-white`}>
                    <Star className="size-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${group.accent} mb-2`}>
                      Điểm nổi bật
                    </h3>
                    <ul className="space-y-2">
                      {group.benefits.map((b) => (
                        <li key={b.id} className="flex items-start gap-2 text-sm text-text-secondary dark:text-gray-400">
                          <Check className={`size-4 shrink-0 mt-0.5 ${group.accent}`} />
                          <span><strong className="text-text-main dark:text-white">{b.title}:</strong> {b.description.split('.')[0]}.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </section>

      {/* ④ ALL BENEFITS OVERVIEW (all groups collapsed) ─────────────────── */}
      <section className="border-t border-gray-100 dark:border-white/[0.06] bg-gray-50/60 dark:bg-[#0d1117]/60 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 sm:mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-4">
              <Zap className="size-3" /> Toàn bộ quyền lợi
            </span>
            <h2 className="fluid-h2 font-display font-bold text-text-main dark:text-white mb-3">
              4 nhóm quyền lợi, 9 đặc quyền
            </h2>
            <p className="fluid-body text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
              Hội viên HSAPS được hưởng trọn vẹn hệ thống quyền lợi toàn diện, bao gồm học thuật, pháp lý, uy tín và đóng góp.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {BENEFIT_GROUPS.map((group, gi) => {
              const GroupIcon = group.icon;
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: gi * 0.08 }}
                  className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#161b22] overflow-hidden hover:shadow-md dark:hover:shadow-black/30 transition-all"
                >
                  {/* Card header */}
                  <div className={`bg-gradient-to-r ${group.color} p-4 sm:p-5`}>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
                        <GroupIcon className="size-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Quyền lợi {group.number}</p>
                        <h3 className="text-sm sm:text-base font-bold text-white">{group.category}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Benefit list */}
                  <div className="p-4 sm:p-5 space-y-3">
                    {group.benefits.map((benefit) => {
                      const BIcon = benefit.icon;
                      return (
                        <div key={benefit.id} className="flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${group.bgLight} ${group.bgDark}`}>
                            <BIcon className={`size-4 ${group.accent}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-text-main dark:text-white">{benefit.title}</p>
                            <p className="text-xs text-text-secondary dark:text-gray-500 mt-0.5 line-clamp-2">{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <button
                      onClick={() => {
                        setActiveGroup(group.id);
                        document.getElementById('quyen-loi')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className={`flex items-center gap-1.5 text-xs font-bold ${group.accent} hover:underline transition-all`}
                    >
                      Xem chi tiết <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ⑤ ĐĂNG KÝ STEPS ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-background-dark border-t border-gray-100 dark:border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 sm:mb-16 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-4">
              <UserPlus className="size-3" /> Quy trình đăng ký
            </span>
            <h2 className="fluid-h2 font-display font-bold text-text-main dark:text-white mb-3">
              4 bước đơn giản để gia nhập HSAPS
            </h2>
            <p className="fluid-body text-text-secondary dark:text-gray-400 max-w-xl mx-auto">
              Quy trình đăng ký minh bạch, nhanh gọn — thường hoàn tất trong 7–10 ngày làm việc.
            </p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 hidden lg:block" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center gap-3"
                >
                  <div className="relative flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ec297b] to-rose-600 text-white font-extrabold text-lg shadow-lg shadow-pink-500/20 z-10">
                    {step.number}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#ec297b] to-rose-600 opacity-20 blur-sm -z-10" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-text-main dark:text-white">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ⑥ CTA BANNER ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ec297b] via-rose-600 to-[#c2185f] py-16 sm:py-20">
        {/* Decorative */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold text-white">
            <Heart className="size-3 fill-white" /> Cộng đồng chuyên nghiệp
          </div>
          <h2 className="mb-4 sm:mb-6 fluid-h2 font-display font-bold text-white">
            Sẵn sàng gia nhập<br className="hidden sm:block" /> đội ngũ HSAPS?
          </h2>
          <p className="mb-8 sm:mb-10 fluid-body text-pink-100 max-w-xl mx-auto">
            Đăng ký ngay hôm nay để tiếp cận toàn bộ 9 đặc quyền dành riêng cho Hội viên chính thức.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/login?tab=register"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm sm:text-base font-bold text-primary shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              <UserPlus className="size-4 sm:size-5" />
              Đăng ký ngay
            </Link>
            <Link
              href="/lien-he"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm sm:text-base font-bold text-white backdrop-blur hover:bg-white/20 transition-all"
            >
              <Globe className="size-4 sm:size-5" />
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>

      {/* ⑦ FAQ / CONTACT ────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-gray-50/60 dark:bg-[#0d1117]/60 border-t border-gray-100 dark:border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Điều kiện gia nhập */}
            <div className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#161b22] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-text-main dark:text-white">Điều kiện gia nhập</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Là bác sĩ có bằng tốt nghiệp y khoa hợp lệ',
                  'Có chứng chỉ hành nghề khám chữa bệnh còn hiệu lực',
                  'Đang hoặc đã hoạt động trong lĩnh vực phẫu thuật thẩm mỹ',
                  'Cam kết tuân thủ điều lệ và quy tắc đạo đức nghề nghiệp',
                  'Được ít nhất một hội viên chính thức giới thiệu (khuyến khích)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary dark:text-gray-400">
                    <Check className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Liên hệ */}
            <div className="rounded-2xl border border-gray-100 dark:border-white/[0.07] bg-white dark:bg-[#161b22] p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageSquare className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-text-main dark:text-white">Cần hỗ trợ?</h3>
              </div>
              <p className="text-sm text-text-secondary dark:text-gray-400">
                Liên hệ trực tiếp với bộ phận hội viên của HSAPS để được hướng dẫn chi tiết về quy trình đăng ký và thẩm định hồ sơ.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
                  <Globe className="size-4 text-primary shrink-0" />
                  <a href="mailto:hoivien@hsaps.org.vn" className="hover:text-primary transition-colors">hoivien@hsaps.org.vn</a>
                </div>
                <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
                  <Globe className="size-4 text-primary shrink-0" />
                  <span>Thứ 2 – Thứ 6: 8:00 – 17:00</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-auto pt-2">
                <Link
                  href="/login?tab=register"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-colors"
                >
                  <UserPlus className="size-4" /> Đăng ký ngay
                </Link>
                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 px-5 py-3 text-sm font-semibold text-text-main dark:text-white hover:border-primary/30 hover:text-primary transition-all"
                >
                  Gửi câu hỏi <ExternalLink className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
