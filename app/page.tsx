import Image from 'next/image';
import Link from 'next/link';
import EventSlider from '@/components/EventSlider';
import { PARTNERS_DATA } from '@/lib/data';
import PartnerLogo from '@/components/PartnerLogo';
import {
  Stethoscope,
  Search,
  Menu,
  UserPlus,
  ArrowRight,
  Calendar,
  GraduationCap,
  Library,
  Users,
  ExternalLink,
  Eye,
  ArrowLeft,
  Globe,
  Mail,
  MapPin,
  Phone,
  BookOpen,
  FileText
} from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <section className="relative bg-white dark:bg-background-dark py-8 lg:py-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary dark:bg-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Hội nghị thường niên 2024 sắp diễn ra
              </div>
              <h1 className="font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-text-main dark:text-white sm:text-5xl lg:text-6xl">
                Hội Phẫu thuật Thẩm mỹ <span className="text-primary">TP. Hồ Chí Minh</span>
              </h1>
              <p className="text-lg leading-relaxed text-text-secondary dark:text-gray-400">
                Kết nối chuyên gia, phát triển khoa học và thiết lập tiêu chuẩn vàng trong y học thẩm mỹ. Chúng tôi cam kết nâng cao chất lượng chuyên môn và đạo đức nghề nghiệp.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Link href="/login" className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-primary-dark active:scale-95">
                  <UserPlus className="size-5" />
                  Đăng ký Hội viên
                </Link>
                <button className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 text-base font-bold text-text-main shadow-sm transition-colors hover:bg-gray-50 hover:border-gray-300 dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                  <span>Tìm hiểu thêm</span>
                  <ArrowRight className="size-5" />
                </button>
              </div>
              <div className="mt-8 flex items-center gap-8 border-t border-dashed border-gray-200 pt-8 dark:border-gray-800">
                <div>
                  <p className="text-2xl font-bold text-text-main dark:text-white">500+</p>
                  <p className="text-sm font-medium text-text-secondary">Hội viên chính thức</p>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <p className="text-2xl font-bold text-text-main dark:text-white">15+</p>
                  <p className="text-sm font-medium text-text-secondary">Năm thành lập</p>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div>
                  <p className="text-2xl font-bold text-text-main dark:text-white">1k+</p>
                  <p className="text-sm font-medium text-text-secondary">Bài báo khoa học</p>
                </div>
              </div>
            </div>
            <div className="relative h-full w-full lg:order-last">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg_M1QqpsqHCiiFhJe4wr_ONf116fKj6vJI9ZO1saSahiRj_Dkp7uqG4fG5tS9OBfUIYfdJkyO_EqcC23AIwc9PpZO8rsygLSs32_lsB1g-9TJnU1O0U3lDY0wMCn30jHGn4DzMTMFFwaWIs3omXENizDxcQCGeD73v8ie1Lr6wmFu8pB67MzCQ2wEoZIIpaYDNZiwCCUVBPmONzfw63Q8QkPQpdZpWVXjJf35xSTEPL5Lo1jtx59t2lWzND4cF2GZvhFBGAlyDVY"
                  alt="Group of surgeons in operating room discussing procedure"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20 rounded-xl bg-white/95 p-4 backdrop-blur shadow-lg dark:bg-gray-900/90 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs border-l-4 border-secondary">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-50 text-primary">
                      <Calendar className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Sự kiện sắp tới</p>
                      <h3 className="mt-1 text-sm font-bold text-text-main dark:text-white">Hội nghị Khoa học Quốc tế HSAPS 2024</h3>
                      <p className="mt-1 text-xs text-text-secondary">20/12/2024 • GEM Center</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-12 -top-12 -z-10 h-64 w-64 rounded-full bg-pink-100 dark:bg-pink-900/20 blur-3xl opacity-60"></div>
              <div className="absolute -left-12 -bottom-12 -z-10 h-48 w-48 rounded-full bg-yellow-100 dark:bg-yellow-900/20 blur-3xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-light dark:bg-background-dark py-10 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="mb-12 flex flex-col gap-4 text-center sm:text-left sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-text-main dark:text-white sm:text-4xl">
                Lĩnh vực hoạt động
              </h2>
              <p className="mt-4 text-lg text-text-secondary dark:text-gray-400">
                HSAPS định hướng phát triển toàn diện ngành phẫu thuật thẩm mỹ thông qua các hoạt động nghiên cứu khoa học, đào tạo liên tục và kết nối chuyên gia.
              </p>
            </div>
            <Link className="hidden sm:flex items-center gap-1 font-bold text-primary hover:text-primary-dark transition-colors" href="/gioi-thieu">
              Xem chi tiết hoạt động
              <ArrowRight className="size-5" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-50 text-primary dark:bg-pink-900/30">
                <Calendar className="size-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-text-main dark:text-white">1. Hội nghị khoa học</h3>
                <p className="text-base text-text-secondary dark:text-gray-400">
                  Diễn đàn thường niên quy tụ hàng trăm chuyên gia đầu ngành trong và ngoài nước để chia sẻ báo cáo, kinh nghiệm thực tiễn.
                </p>
              </div>
              <a className="mt-auto flex items-center text-sm font-bold text-primary group-hover:underline" href="#">
                Xem sự kiện <ArrowRight className="ml-1 size-4" />
              </a>
            </div>

            <div className="group relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-secondary dark:bg-amber-900/30">
                <BookOpen className="size-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-text-main dark:text-white">2. Tạp chí Y khoa</h3>
                <p className="text-base text-text-secondary dark:text-gray-400">
                  Ấn phẩm khoa học chuyên ngành thẩm mỹ uy tín, công bố các nghiên cứu lâm sàng, bài viết học thuật chất lượng.
                </p>
              </div>
              <a className="mt-auto flex items-center text-sm font-bold text-secondary group-hover:underline" href="#">
                Đọc tạp chí <ArrowRight className="ml-1 size-4" />
              </a>
            </div>

            <div className="group relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-50 text-primary dark:bg-pink-900/30">
                <GraduationCap className="size-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-text-main dark:text-white">3. Đào tạo liên tục (CME)</h3>
                <p className="text-base text-text-secondary dark:text-gray-400">
                  Các lớp học cập nhật kiến thức liên tục và đào tạo chuyên sâu cấp chứng chỉ CME, đáp ứng các tiêu chuẩn khắt khe.
                </p>
              </div>
              <a className="mt-auto flex items-center text-sm font-bold text-primary group-hover:underline" href="#">
                Tham gia khóa học <ArrowRight className="ml-1 size-4" />
              </a>
            </div>

            <div className="group relative flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-secondary dark:bg-amber-900/30">
                <FileText className="size-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-text-main dark:text-white">4. Báo cáo khoa học</h3>
                <p className="text-base text-text-secondary dark:text-gray-400">
                  Tổng hợp đề tài sáng kiến y học đột phá, báo cáo ca lâm sàng điển hình và các cải tiến kỹ thuật thực tiễn.
                </p>
              </div>
              <a className="mt-auto flex items-center text-sm font-bold text-secondary group-hover:underline" href="#">
                Xem báo cáo <ArrowRight className="ml-1 size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: SỰ KIỆN NỔI BẬT */}
      <section className="bg-white dark:bg-background-dark py-10 lg:py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-text-main dark:text-white sm:text-3xl">
              Sự kiện nổi bật
            </h2>
          </div>
          <EventSlider />
        </div>
      </section>

      {/* SECTION: TIN TỨC Y KHOA */}
      <section className="bg-gray-50/30 dark:bg-[#150d11]/30 py-10 lg:py-16 border-t border-gray-100 dark:border-gray-850">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight text-text-main dark:text-white sm:text-3xl">
              Tin tức Y khoa
            </h2>
            <Link href="/bao-cao-khoa-hoc" className="text-sm font-bold text-primary hover:underline flex items-center gap-1.5 transition-all">
              Tất cả tin tức <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* News 1 */}
            <article className="group cursor-pointer flex flex-col gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-all duration-300">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
                  alt="Scientific publications review"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
                  Báo cáo
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <span className="text-[10px] font-bold font-mono text-gray-400">10 Tháng 11, 2024</span>
                <h3 className="text-base font-bold leading-snug text-text-main group-hover:text-primary transition-colors dark:text-white line-clamp-2">
                  Thông báo về việc nộp bài báo khoa học quý IV/2024
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                  Ban biên soạn tạp chí HSAPS chính thức tiếp nhận các công trình nghiên cứu và bài báo khoa học chuẩn bị xuất bản số cuối năm.
                </p>
              </div>
            </article>

            {/* News 2 */}
            <article className="group cursor-pointer flex flex-col gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-all duration-300">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
                  alt="Medical collaboration agreement"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-600 backdrop-blur">
                  Hợp tác quốc tế
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <span className="text-[10px] font-bold font-mono text-gray-400">05 Tháng 11, 2024</span>
                <h3 className="text-base font-bold leading-snug text-text-main group-hover:text-primary transition-colors dark:text-white line-clamp-2">
                  Lễ ký kết hợp tác chiến lược với Hội Phẫu thuật thẩm mỹ Hàn Quốc (KAPS)
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                  Sự kiện đánh dấu cột mốc quan trọng trong trao đổi học thuật, chuyển giao công nghệ và công nhận tín chỉ CME song phương.
                </p>
              </div>
            </article>

            {/* News 3 */}
            <article className="group cursor-pointer flex flex-col gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-all duration-300">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
                  alt="Safety in medical practice"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
                  Khuyến cáo
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <span className="text-[10px] font-bold font-mono text-gray-400">01 Tháng 11, 2024</span>
                <h3 className="text-base font-bold leading-snug text-text-main group-hover:text-primary transition-colors dark:text-white line-clamp-2">
                  Hướng dẫn lâm sàng về phòng ngừa biến chứng tiêm chất làm đầy (Filler)
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                  Khuyến cáo đồng thuận mới nhất của Hội đồng Y khoa HSAPS nhằm tăng cường tính an toàn và giảm thiểu rủi ro trong thẩm mỹ nội khoa.
                </p>
              </div>
            </article>

            {/* News 4 */}
            <article className="group cursor-pointer flex flex-col gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-all duration-300">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                  alt="International medical conference delegates"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-600 backdrop-blur">
                  Hoạt động Hội
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-grow">
                <span className="text-[10px] font-bold font-mono text-gray-400">28 Tháng 10, 2024</span>
                <h3 className="text-base font-bold leading-snug text-text-main group-hover:text-primary transition-colors dark:text-white line-clamp-2">
                  Đoàn đại biểu đại diện HSAPS tham dự Hội nghị Thẩm mỹ Quốc tế IMCAS Châu Á
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">
                  Đoàn chuyên gia hàng đầu Việt Nam báo cáo các chuyên đề khoa học và chia sẻ những kỹ thuật tạo hình thẩm mỹ đặc trưng khu vực.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* CTA section: Become member */}
      <section className="relative overflow-hidden bg-primary py-12 text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-300 blur-3xl"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <h2 className="mb-6 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Trở thành thành viên của HSAPS
          </h2>
          <p className="mb-10 text-lg text-pink-100 sm:text-xl">
            Tham gia cùng chúng tôi để tiếp cận các cơ hội học tập, kết nối với các chuyên gia hàng đầu và nâng cao uy tín nghề nghiệp của bạn.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="w-full sm:w-auto min-w-[200px] rounded-lg bg-secondary px-8 py-4 text-base font-bold text-text-main shadow-lg transition-transform hover:scale-105 active:scale-95 hover:bg-yellow-300">
              Đăng ký ngay
            </button>
            <button className="w-full sm:w-auto min-w-[200px] rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: LIÊN KẾT CỦA CHÚNG TÔI */}
      <section className="bg-white dark:bg-[#1a1016]/40 py-16 border-t border-gray-100 dark:border-gray-850">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2d1a24] dark:text-white mb-10 tracking-tight text-center md:text-left">
            Liên kết của chúng tôi
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
            {/* Logo 1 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#0072bc" strokeWidth="2"/>
                <circle cx="50" cy="50" r="41" fill="none" stroke="#0072bc" strokeWidth="1" strokeDasharray="3 2"/>
                <circle cx="50" cy="50" r="32" fill="#0072bc" />
                <path d="M43 45 L50 35 L57 45 Z" fill="white" />
                <path d="M45 42 Q50 34 55 42" stroke="white" strokeWidth="1.5" fill="none"/>
                <path d="M45 48 Q50 56 55 48" stroke="white" strokeWidth="1.5" fill="none"/>
                <line x1="47" y1="43" x2="47" y2="47" stroke="white" strokeWidth="1"/>
                <line x1="50" y1="40" x2="50" y2="50" stroke="white" strokeWidth="1"/>
                <line x1="53" y1="43" x2="53" y2="47" stroke="white" strokeWidth="1"/>
                <path d="M40 50 C40 62, 60 62, 60 50 C60 45, 56 42, 50 42" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="50" cy="62" r="4" fill="white" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                Đại học Y Dược TP.HCM
              </span>
            </div>

            {/* Logo 2 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <rect x="18" y="10" width="64" height="64" rx="10" fill="#0a7c3f" />
                <path d="M50 78 L82 50 L82 20 L18 20 L18 50 Z" fill="#0a7c3f" />
                <text x="50" y="44" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="900">PNT</text>
                <path d="M50 48 L50 72" stroke="#eab308" strokeWidth="3" />
                <circle cx="50" cy="46" r="3" fill="#eab308" />
                <path d="M42 56 Q50 50 58 56 Q50 62 42 56" fill="none" stroke="#eab308" strokeWidth="1.5" />
                <path d="M44 64 Q50 58 56 64 Q50 70 44 64" fill="none" stroke="#eab308" strokeWidth="1.5" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                ĐH Y khoa Phạm Ngọc Thạch
              </span>
            </div>

            {/* Logo 3 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#e11d48" strokeWidth="2"/>
                <circle cx="50" cy="48" r="22" fill="none" stroke="#eab308" strokeWidth="1.5" />
                <path d="M50 26 C54 36, 46 36, 50 48" stroke="#1d4ed8" strokeWidth="2.5" fill="none"/>
                <path d="M50 26 C46 36, 54 36, 50 48" stroke="#e11d48" strokeWidth="2.5" fill="none"/>
                <path d="M28 48 C38 52, 38 44, 50 48" stroke="#059669" strokeWidth="2.5" fill="none"/>
                <path d="M28 48 C38 44, 38 52, 50 48" stroke="#eab308" strokeWidth="2.5" fill="none"/>
                <path d="M72 48 C62 44, 62 52, 50 48" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
                <path d="M50 70 C46 60, 54 60, 50 48" stroke="#10b981" strokeWidth="2.5" fill="none"/>
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                ASEAN Congress of Plastic Surgery
              </span>
            </div>

            {/* Logo 4 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <rect x="10" y="10" width="80" height="80" rx="8" fill="#0f2c59" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="white" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="26" fill="none" stroke="white" strokeWidth="0.75" strokeDasharray="2 2" />
                <path d="M50 18 Q62 50 50 82" stroke="white" strokeWidth="0.75" fill="none"/>
                <path d="M50 18 Q38 50 50 82" stroke="white" strokeWidth="0.75" fill="none"/>
                <line x1="18" y1="50" x2="82" y2="50" stroke="white" strokeWidth="0.75" />
                <rect x="25" y="44" width="50" height="12" rx="2" fill="#0f2c59" />
                <text x="50" y="52" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" letterSpacing="1">OSAPS</text>
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                OSAPS (Aesthetic Plastic Surgery)
              </span>
            </div>

            {/* Logo 5 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#2563eb" strokeWidth="2"/>
                <circle cx="50" cy="50" r="38" fill="#e11d48" />
                <path d="M42 50 H58 M50 42 V58" stroke="white" strokeWidth="10" strokeLinecap="square" />
                <circle cx="50" cy="50" r="14" fill="#2563eb" />
                <line x1="50" y1="40" x2="50" y2="60" stroke="white" strokeWidth="2" />
                <path d="M46 54 Q50 48 50 43 Q50 38 54 44" stroke="#eab308" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                BV Đại học Y Dược Cần Thơ
              </span>
            </div>

            {/* Logo 6 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#1d4ed8" strokeWidth="2"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="3 3"/>
                <circle cx="50" cy="50" r="30" fill="#1d4ed8" />
                <path d="M40 50 C40 60, 60 60, 60 50 C60 40, 50 42, 50 36 L50 64" stroke="white" strokeWidth="2" fill="none" />
                <path d="M44 44 Q50 38 56 44" stroke="#fcd34d" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                Đại học Y Dược Cần Thơ
              </span>
            </div>

            {/* Logo 7 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#ec297b" strokeWidth="2"/>
                <circle cx="50" cy="50" r="40" fill="#fef08a" />
                <path d="M42 35 C46 30, 56 30, 60 38 C60 45, 52 46, 50 50 C48 54, 52 58, 48 64 C44 70, 36 62, 42 35 Z" fill="#ec297b" opacity="0.85"/>
                <circle cx="58" cy="42" r="2" fill="white" />
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                Hội Phẫu thuật Thẩm mỹ TP.HCM
              </span>
            </div>

            {/* Logo 8 */}
            <div className="flex flex-col items-center text-center gap-2 group">
              <svg viewBox="0 0 100 100" className="size-16 sm:size-20 drop-shadow-sm transition-transform hover:scale-105 duration-300">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#e11d48" strokeWidth="2"/>
                <circle cx="50" cy="50" r="40" fill="#ffffff" />
                <path d="M50 25 C48 30, 48 35, 51 40 C52 45, 49 50, 49 55 C49 60, 52 65, 51 75 C53 72, 53 60, 52 55 Z" fill="#e11d48" />
                <text x="50" y="44" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">VAPS</text>
              </svg>
              <span className="text-[10px] sm:text-xs font-bold text-gray-650 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[110px] line-clamp-2">
                VAPS / VSAPS Việt Nam
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ĐỐI TÁC */}
      <section className="bg-gray-50/50 dark:bg-[#150d11] py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2d1a24] dark:text-white mb-10 tracking-tight text-center md:text-left">
            Đối tác
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {PARTNERS_DATA.map((partner) => (
              <Link 
                key={partner.id}
                href={`/doi-tac/${partner.id}`}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-2xl border border-[#ec297b]/10 dark:border-gray-800 shadow-sm w-full max-w-[240px] h-20 transition-all hover:shadow-md hover:border-primary/20 hover:scale-[1.03]"
              >
                <PartnerLogo 
                  logoType={partner.logoType} 
                  className="h-10 w-auto grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data for SEO / AI Search Engine Optimization (LLMO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "@id": "https://hsaps.org.vn/#organization",
            "name": "Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh",
            "alternateName": ["HSAPS", "Ho Chi Minh City Society of Aesthetic Plastic Surgery"],
            "url": "https://hsaps.org.vn",
            "logo": "https://hsaps.org.vn/logo.png",
            "description": "Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh (HSAPS) là tổ chức phi lợi nhuận của các chuyên gia y học thẩm mỹ nhằm nâng cao kỹ năng chuyên môn, nghiên cứu khoa học y học và đảm bảo các tiêu chuẩn an toàn trong phẫu thuật thẩm mỹ.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Thành phố Hồ Chí Minh",
              "addressCountry": "VN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "",
              "contactType": "customer service",
              "email": "contact@hsaps.org.vn"
            },
            "sameAs": [
              "https://www.facebook.com/hsaps.org.vn"
            ]
          })
        }}
      />
    </div>
  );
}
