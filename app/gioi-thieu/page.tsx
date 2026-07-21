import Image from 'next/image';
import Link from 'next/link';
import {
  Stethoscope,
  Menu,
  ChevronRight,
  Flag,
  Eye,
  BadgeCheck,
  History,
  Users,
  Globe,
  TrendingUp,
  Lightbulb,
  Heart,
  Handshake,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  FileText,
  Calendar,
  GraduationCap,
  Shield,
  Scale,
  Award,
  Vote,
  Sparkles,
  Building2,
  CheckCircle2,
  Activity
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background-light font-sans text-text-main antialiased dark:bg-background-dark dark:text-white">
      {/* Hero Section */}
      <section className="relative h-[320px] w-full overflow-hidden bg-gray-900 md:h-[420px]">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmjKGf828-kH1Dt3mAz1iZvjBXBufunmF0rC-yIH1Q3v04r9DZU4GCJbldC9sYvGYFt1SzvQ_QMTC33cMfRYtDDAigQmOxnWcUCb5xbHdQG5RF11UaeJ1mh_D4SSMifh_27KUSdsVbs04pCA5FR9f_wuuf3kC6qQq7UKGAO_R6SuzbPf9SDPyC4bfKanDsBSbA-y1tEiDLWDrSWVH98-9Hb6b5wkwBlEH4T5L6IMYbe5B8h0qipCD8_kyk8-hGZs6rmqyi3N86QXk"
          alt="Doctor team in a modern medical meeting room discussing professional matters"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/20 px-3 py-1 text-xs font-bold text-pink-300 backdrop-blur-md">
                <Sparkles className="size-3.5" />
                Tổ chức Xã hội - Nghề nghiệp Chính thống
              </div>
              <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl lg:text-6xl leading-tight">
                Giới thiệu về <span className="text-primary">HSAPS</span>
              </h1>
              <p className="text-base text-gray-200 md:text-lg leading-relaxed max-w-2xl">
                Tên gọi chuyên môn chính thức: <strong>Liên chi hội Phẫu thuật Tạo hình Thẩm mỹ TP.HCM</strong> (trực thuộc Hội Y học TP.HCM), tiền thân nòng cốt của <strong>Hội Phẫu thuật Tạo hình Thẩm mỹ Việt Nam (VSAPS)</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10 lg:py-16">
        <div className="space-y-16 lg:space-y-24">
          
          {/* Executive Board Overview */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-10">
            <div className="mb-8 flex flex-col gap-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Bộ máy lãnh đạo</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                Ban Chấp Hành Thường Trực
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quy tụ các GS, PGS, TS, Bác sĩ chuyên khoa đầu ngành giàu kinh nghiệm và tâm huyết với chuyên ngành.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:gap-6">
              {/* Leader */}
              <div className="col-span-2 rounded-xl border border-pink-100 bg-pink-50/50 p-4 text-center shadow-sm dark:border-pink-900/30 dark:bg-pink-950/20 sm:col-span-1">
                <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-2 border-primary">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg_M1QqpsqHCiiFhJe4wr_ONf116fKj6vJI9ZO1saSahiRj_Dkp7uqG4fG5tS9OBfUIYfdJkyO_EqcC23AIwc9PpZO8rsygLSs32_lsB1g-9TJnU1O0U3lDY0wMCn30jHGn4DzMTMFFwaWIs3omXENizDxcQCGeD73v8ie1Lr6wmFu8pB67MzCQ2wEoZIIpaYDNZiwCCUVBPmONzfw63Q8QkPQpdZpWVXjJf35xSTEPL5Lo1jtx59t2lWzND4cF2GZvhFBGAlyDVY"
                    alt="PGS.TS.BS Phạm Trịnh Quốc Khanh"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  PGS.TS.BS Phạm Trịnh Quốc Khanh
                </h4>
                <p className="mt-1 text-xs font-semibold text-primary">
                  Chủ tịch Hội
                </p>
              </div>
              {/* Member 1 */}
              <div className="rounded-xl border border-transparent bg-white p-4 text-center shadow-sm transition-colors hover:border-pink-100 dark:bg-gray-800 dark:hover:border-gray-700">
                <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO4rvufDxuoz1a_Lk9WjD8mZlz2VdKUS1Wg1ci5R9WrZEnEAB1ZxRNosV2XaJUcaNciPmqJzo8UdXl1j_qKJjXAgQzBc5ZFpu2f3kh605evqdtbaVOC_a0qz5_QjJ2xGBaprQmMsKImESSfjRzDNSiGLgKofzpM-gk8XTaSsIoK282aaYYnGbxBhmPn9W4TBMourGw_amlM8RVoFajsNppoDYPtzKN5vONocRSw2ivLQfawTDzV4FKgKZJHymIdRM9w3iV2owMfig"
                    alt="TS.BS Trần Thị B"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  TS.BS Trần Thị B
                </h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Phó Chủ tịch Thường trực
                </p>
              </div>
              {/* Member 2 */}
              <div className="rounded-xl border border-transparent bg-white p-4 text-center shadow-sm transition-colors hover:border-pink-100 dark:bg-gray-800 dark:hover:border-gray-700">
                <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzpa0WuzqKVGy0lixIKTIommscF9EtYo_LUJZHh-2CrPn0Qy29_Ng9N4LYNkGBYkUuXlfCyQNJJgB5edb0jgqaup2tbZS8FY3CKs93O8dSdJAhXW_pV8PR6QuylphkM5yxkXvfacJmV9tVQPIsDQTYP02PWTitlW4zsipe3domThG0j3WDn6ayFBjPf7UZb2ng6xll-S8AV8lyFKcXGaVOWemvMHZo3QrJsAMA1zKIkXkFvkqnz_gszVZH-W5aRQvaTsBLEi3hzaY"
                    alt="BSCKII Lê Văn C"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  BSCKII Lê Văn C
                </h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Phó Chủ tịch
                </p>
              </div>
              {/* Member 3 */}
              <div className="rounded-xl border border-transparent bg-white p-4 text-center shadow-sm transition-colors hover:border-pink-100 dark:bg-gray-800 dark:hover:border-gray-700">
                <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiL29Az7ajQseZK52HR2mt-48wUNrj7_WUjUAsp4pYgpy9dH4rSSmYtKZwtU2grN_tdN-uRWxZ0dA5tE833H9hWOKsFOPgJ-p4x1clhcHvUNX5kj6HrIsXPp1oR6jkrhQZ_iVrP3AFZ1MNb9FmoYNerrFjQliNCEMmk6M845agoVNIWwJ34GWQ7L9zhof-ggJ5G7LhVMKZJpF3M9Sw8ZzKiWQkVqy1hUF_A9TpN3rUZL5BzwuTf0TyyahyGvXMOQdhr-cxjpMitPk"
                    alt="ThS.BS Phạm Thị D"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  ThS.BS Phạm Thị D
                </h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Tổng Thư ký
                </p>
              </div>
              {/* Member 4 */}
              <div className="rounded-xl border border-transparent bg-white p-4 text-center shadow-sm transition-colors hover:border-pink-100 dark:bg-gray-800 dark:hover:border-gray-700">
                <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYKYZPpTqUF46S9H8vgpFBhPIPMCmvstMMdg9vUOgd6A-dpllFEFbKoK41u6smlHn4I3ZWMXyeqkHj__LzOTh2fkzCyTMJdLx_wOIgBSnf2Pwy1kW-5lcbFzuyr9Gs5hDiZRXXGS2Ckxzk8vRHSF2I4feU4QCY96sSXMBf6RCppdFf_mmEa8nuvfjbLmjc03CIiIhOUGH8_-dYUpKHWGIw_u6ZO-nW0TFN-JA2ZdLktxPp5lBu7xCdDu0pMGSu2SQNyiLhNM9_tAQ"
                    alt="TS.BS Hoàng Văn E"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  TS.BS Hoàng Văn E
                </h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Trưởng Ban Đào tạo
                </p>
              </div>
            </div>
          </div>

          {/* Sứ mệnh & Tầm nhìn */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Sứ mệnh & Tầm nhìn
                </h2>
                <div className="h-1 w-20 bg-secondary rounded-full"></div>
              </div>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                Liên chi hội Phẫu thuật Tạo hình Thẩm mỹ TP.HCM kết nối các bác sĩ, chuyên gia đầu ngành nhằm chia sẻ kiến thức, nâng cao chuyên môn y khoa và thiết lập chuẩn mực thẩm mỹ an toàn.
              </p>
              <div className="mt-8 grid gap-6">
                {/* Mission Card */}
                <div className="flex gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-800">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-primary dark:bg-pink-900/30">
                    <Flag className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      Sứ mệnh
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Đào tạo liên tục (CME), mổ demo thực hành, chuẩn hóa quy trình kỹ thuật, bảo vệ quyền lợi hợp pháp của hội viên và đảm bảo an toàn tuyệt đối cho công chúng.
                    </p>
                  </div>
                </div>
                {/* Vision Card */}
                <div className="flex gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-800">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-secondary dark:bg-amber-900/30">
                    <Eye className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                      Tầm nhìn
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Khẳng định vị thế nòng cốt của phẫu thuật thẩm mỹ TP.HCM và Việt Nam trên bản đồ y học thẩm mỹ quốc tế (ISAPS, Hàn Quốc, Mỹ, Châu Âu).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-[400px] h-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk6c_Uv14LGvmM14ozsZPVRcKObyMOBrtZG2f9ViLFwmQI0j-k98prcoKsiQWPJrMFrazBQCSs27Ansi82tONs2BkGx1Hipwf-cYcgnyDqqpPVY_8ZfEO0PNOTstHvGT2XTQI1Y8sO7a1MDVZpwiNsaj7NFgmxct-4b7HModQUB0oNKxinS6kjn0XQ4zOid1pm3armuQhI4W1gx_Ev5xc70JkKfPGdQ4-aR0gWmbh_4IZ7Ss9svhVfmT6UtbN3tZoQ227Mwefe6vE"
                alt="Medical surgery tools or clean medical environment"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="mb-2 flex items-center gap-2">
                  <BadgeCheck className="size-5 text-secondary" />
                  <span className="text-sm font-bold uppercase text-secondary">
                    Tôn chỉ hành nghề
                  </span>
                </div>
                <p className="text-lg font-medium">
                  &quot;Chuyên môn vững vàng - Y đức sáng ngời - Chuẩn mực Y khoa&quot;
                </p>
              </div>
            </div>
          </div>

          {/* 4 MẢNG HOẠT ĐỘNG TRỌNG TÂM (CHI TIẾT VÀ CHÍNH THỨC) */}
          <div className="space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-primary dark:bg-pink-900/30 dark:text-pink-300">
                Lĩnh Vực Trọng Tâm
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                4 Mảng Hoạt Động Trọng Tâm Của Hội
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Định hướng phát triển toàn diện ngành Phẫu thuật Tạo hình Thẩm mỹ TP.HCM và Việt Nam
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Mảng 1 */}
              <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-pink-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-primary dark:bg-pink-950/40">
                      <GraduationCap className="size-7" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Mảng 01</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Đào tạo & Phát triển Chuyên môn
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Cập nhật kỹ thuật mới:</strong> Tổ chức các hội nghị khoa học, hội thảo chuyên đề trong và ngoài nước để chia sẻ báo cáo nghiên cứu, công nghệ và xu hướng phẫu thuật mới.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Đào tạo y khoa liên tục (CME):</strong> Mở các khóa tập huấn, bổ túc tay nghề, cấp chứng nhận đào tạo liên tục giúp các bác sĩ cập nhật kiến thức và đáp ứng điều kiện duy trì CCHN.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Mổ demo & Chuyển giao công nghệ:</strong> Tổ chức các phiên đào tạo thực hành, quan sát ca mổ thực tế từ các chuyên gia đầu ngành trong và ngoài nước.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mảng 2 */}
              <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-amber-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-secondary dark:bg-amber-950/40">
                      <Shield className="size-7" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-secondary">Mảng 02</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Quản lý Nghề nghiệp & Bảo vệ Hội viên
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-secondary mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Xây dựng chuẩn mực hành nghề:</strong> Thúc đẩy việc tuân thủ đạo đức nghề nghiệp (y đức), nâng cao ý thức chấp hành quy định pháp luật và an toàn y khoa.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-secondary mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Bảo vệ quyền lợi:</strong> Đại diện bảo vệ quyền và lợi ích hợp pháp của các bác sĩ, hội viên trong quá trình hành nghề chuyên môn.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-secondary mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Tư vấn & Hỗ trợ chuyên môn:</strong> Đầu mối kết nối chuyên gia tư vấn, hỗ trợ chuyên môn cho bác sĩ khi gặp các ca bệnh khó hoặc sự cố y khoa.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mảng 3 */}
              <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                      <Globe className="size-7" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Mảng 03</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Hợp tác Quốc tế & Mở rộng Mạng lưới
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-blue-600 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Kết nối quốc tế:</strong> Hợp tác với các tổ chức uy tín thế giới (Hàn Quốc, Mỹ, Châu Âu, ISAPS) trao đổi chuyên môn, giúp y học thẩm mỹ VN tiếp cận tiêu chuẩn quốc tế.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-blue-600 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Liên kết doanh nghiệp & Công nghệ:</strong> Hợp tác với các đơn vị cung cấp trang thiết bị y tế, dược phẩm, công nghệ thẩm mỹ chính hãng để ứng dụng giải pháp an toàn.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mảng 4 */}
              <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40">
                      <Building2 className="size-7" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Mảng 04</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Tuyên truyền & Định hướng Cộng đồng
                      </h3>
                    </div>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Phổ biến kiến thức làm đẹp an toàn:</strong> Cung cấp thông tin khoa học, giúp công chúng phân biệt PTTM chuẩn y khoa và các cơ sở &quot;chui&quot;, kém chất lượng.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Tư vấn chính sách:</strong> Phối hợp, đóng góp ý kiến với Sở Y tế TP.HCM và Bộ Y tế xây dựng văn bản quy phạm pháp luật, quy chuẩn kỹ thuật chuyên ngành.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Lịch sử Hình thành */}
          <div className="rounded-2xl border border-pink-50 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                Lịch sử Hình thành & Phát triển
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Hành trình hơn 15 năm xây dựng, đặt nền móng và là tiền thân nòng cốt phát triển thành Hội Phẫu thuật Tạo hình Thẩm mỹ Việt Nam (VSAPS).
              </p>
            </div>
            <div className="relative">
              <div className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 transform bg-pink-100 dark:bg-pink-900/30 md:left-1/2"></div>
              <div className="space-y-12">
                {/* Item 1 */}
                <div className="group relative flex flex-col items-center justify-between md:flex-row">
                  <div className="mb-4 w-full pl-12 pr-0 md:mb-0 md:w-5/12 md:pl-0 md:pr-8 md:text-right">
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      2007
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Thành lập Hội
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Thành lập dưới tên gọi Liên chi hội Phẫu thuật Tạo hình Thẩm mỹ TP.HCM (trực thuộc Hội Y học TP.HCM), tạo bước ngoặt pháp lý và chuyên môn cho ngành.
                    </p>
                  </div>
                  <div className="absolute left-0 z-10 flex size-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-primary shadow-lg dark:border-gray-800 md:left-1/2">
                    <History className="size-4 text-white" />
                  </div>
                  <div className="w-full pl-12 md:w-5/12 md:pl-8"></div>
                </div>

                {/* Item 2 */}
                <div className="group relative flex flex-col items-center justify-between md:flex-row-reverse">
                  <div className="mb-4 w-full pl-12 md:mb-0 md:w-5/12 md:pl-8">
                    <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">
                      2012
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Mở rộng Đào tạo CME
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Tổ chức chuỗi chương trình đào tạo y khoa liên tục (CME) và hội nghị khoa học quốc tế thường niên quy tụ các chuyên gia ISAPS, Hàn Quốc.
                    </p>
                  </div>
                  <div className="absolute left-0 z-10 flex size-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-primary bg-white shadow-lg md:left-1/2">
                    <Users className="size-4 text-primary" />
                  </div>
                  <div className="w-full pr-0 md:w-5/12 md:pr-8 md:text-right"></div>
                </div>

                {/* Item 3 */}
                <div className="group relative flex flex-col items-center justify-between md:flex-row">
                  <div className="mb-4 w-full pl-12 pr-0 md:mb-0 md:w-5/12 md:pl-0 md:pr-8 md:text-right">
                    <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                      Tiền thân VSAPS
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Khởi xướng & Kết nối Toàn quốc
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Đóng vai trò hạt nhân nòng cốt liên kết đội ngũ bác sĩ toàn quốc, đặt nền móng ra đời Hội Phẫu thuật Tạo hình Thẩm mỹ Việt Nam (VSAPS).
                    </p>
                  </div>
                  <div className="absolute left-0 z-10 flex size-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-primary bg-white shadow-lg md:left-1/2">
                    <Globe className="size-4 text-primary" />
                  </div>
                  <div className="w-full pl-12 md:w-5/12 md:pl-8"></div>
                </div>

                {/* Item 4 */}
                <div className="group relative flex flex-col items-center justify-between md:flex-row-reverse">
                  <div className="mb-4 w-full pl-12 md:mb-0 md:w-5/12 md:pl-8">
                    <span className="mb-2 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">
                      Hiện tại
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Khẳng định Tiêu chuẩn Vàng
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      Đồng hành cùng Sở Y tế và Bộ Y tế trong tư vấn chính sách, nâng cao y đức và xây dựng môi trường y học thẩm mỹ chuẩn y khoa.
                    </p>
                  </div>
                  <div className="absolute left-0 z-10 flex size-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-primary bg-white shadow-lg md:left-1/2">
                    <TrendingUp className="size-4 text-primary" />
                  </div>
                  <div className="w-full pr-0 md:w-5/12 md:pr-8 md:text-right"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Join Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-pink-600 p-8 text-white shadow-xl md:p-12">
            <div className="relative z-10 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div className="space-y-2 max-w-xl">
                <h3 className="text-2xl font-bold md:text-3xl">
                  Gia nhập Liên chi hội PTTM TP.HCM
                </h3>
                <p className="text-pink-100 text-sm md:text-base">
                  Hãy trở thành một phần của cộng đồng bác sĩ chuyên khoa chính thống, đồng hành phát triển chuyên môn và được bảo vệ quyền lợi hợp pháp.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login?tab=register"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-primary shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                  Đăng ký Hội viên
                </Link>
                <Link
                  href="/hoi-vien"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  Xem Quyền lợi
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
