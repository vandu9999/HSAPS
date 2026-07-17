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
  GraduationCap
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background-light font-sans text-text-main antialiased dark:bg-background-dark dark:text-white">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden bg-gray-900 md:h-[400px]">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmjKGf828-kH1Dt3mAz1iZvjBXBufunmF0rC-yIH1Q3v04r9DZU4GCJbldC9sYvGYFt1SzvQ_QMTC33cMfRYtDDAigQmOxnWcUCb5xbHdQG5RF11UaeJ1mh_D4SSMifh_27KUSdsVbs04pCA5FR9f_wuuf3kC6qQq7UKGAO_R6SuzbPf9SDPyC4bfKanDsBSbA-y1tEiDLWDrSWVH98-9Hb6b5wkwBlEH4T5L6IMYbe5B8h0qipCD8_kyk8-hGZs6rmqyi3N86QXk"
          alt="Doctor team in a modern medical meeting room discussing professional matters"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-center px-4 text-white sm:px-6 lg:px-8">
          <span className="mb-4 inline-block w-fit rounded-full border border-secondary/40 bg-secondary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary backdrop-blur-sm">
            Về chúng tôi
          </span>
          <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-5xl">
            Nâng tầm giá trị <br />
            <span className="text-secondary">Khẳng định vị thế</span>
          </h1>
          <p className="max-w-2xl text-lg font-medium text-gray-100 opacity-90 md:text-xl">
            Hội Phẫu thuật Thẩm mỹ TP.HCM (HSAPS) - Nơi hội tụ tinh hoa y học, nâng cao
            chuẩn mực đạo đức và chuyên môn trong ngành thẩm mỹ.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-[1200px] px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link className="transition-colors hover:text-primary" href="/">
              Trang chủ
            </Link>
            <ChevronRight className="size-4" />
            <span className="font-semibold text-primary">Giới thiệu</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="mx-auto flex max-w-[1200px] flex-col gap-20 px-4 py-12 sm:px-6 lg:px-8 md:py-20">
        {/* Ban Chấp Hành */}
        <div>
          <div className="mb-10 flex flex-col items-end justify-between gap-4 md:flex-row">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Ban Chấp Hành
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Những người dẫn dắt và định hướng phát triển cho HSAPS
              </p>
            </div>
            <a
              className="flex items-center gap-1 font-semibold text-primary hover:underline"
              href="#"
            >
              Xem toàn bộ danh sách <ArrowRight className="size-4" />
            </a>
          </div>

          {/* President Card */}
          <div className="mb-10 flex justify-center">
            <div className="relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-2xl border-t-4 border-primary bg-white p-8 text-center shadow-md dark:bg-gray-800">
              <div className="absolute right-0 top-0 rounded-bl-lg bg-primary px-3 py-1 text-xs font-bold text-white">
                CHỦ TỊCH
              </div>
              <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-pink-50 shadow-inner">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTpt1mXuhSU1pwk3DIMyk-Ff1AjM-t0f2_tGt7NfgIh-Rd9cHbYp6Lce1-XJvcuaWlr9kwbYRkVnkz2pVK5ajbfpHCNK9PJKlVLIJZUQ2q_gjzngID_eFodVW__2YJF3xdomLzQZvKE_F8FphSEPxKNgvV9_iMvN9vi-IILpxPOMG8JvbyiGLnQM11AkBH0z8ts0e9p2wcMnzyOpRLlxnWoKbOm-HIx2iOkV85SKRfw6hhHcVxZTIkZvC3TAeuv-glEwCcJ_jmvA"
                  alt="Portrait of the President of the association, a middle-aged male doctor smiling professionally"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                PGS.TS.BS Nguyễn Văn A
              </h3>
              <p className="mb-3 font-medium text-primary">Chủ tịch Hội HSAPS</p>
              <p className="text-sm italic text-gray-500 dark:text-gray-400">
                &quot;Chúng tôi cam kết xây dựng một môi trường chuyên nghiệp, nơi vẻ đẹp được
                tôn tạo dựa trên nền tảng khoa học vững chắc.&quot;
              </p>
            </div>
          </div>

          {/* Committee Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Member 1 */}
            <div className="rounded-xl border border-transparent bg-white p-4 text-center shadow-sm transition-colors hover:border-pink-100 dark:bg-gray-800 dark:hover:border-gray-700">
              <div className="mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO4rvufDxuoz1a_Lk9WjD8mZlz2VdKUS1Wg1ci5R9WrZEnEAB1ZxRNosV2XaJUcaNciPmqJzo8UdXl1j_qKJjXAgQzBc5ZFpu2f3kh605evqdtbaVOC_a0qz5_QjJ2xGBaprQmMsKImESSfjRzDNSiGLgKofzpM-gk8XTaSsIoK282aaYYnGbxBhmPn9W4TBMourGw_amlM8RVoFajsNppoDYPtzKN5vONocRSw2ivLQfawTDzV4FKgKZJHymIdRM9w3iV2owMfig"
                  alt="Portrait of a female doctor vice president"
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
                  alt="Portrait of a male doctor vice president"
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
                  alt="Portrait of a female doctor secretary"
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
                  alt="Portrait of a male doctor head of training committee"
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

        {/* Introduction & Mission/Vision */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Sứ mệnh & Tầm nhìn
              </h2>
              <div className="h-1 w-20 bg-secondary rounded-full"></div>
            </div>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Hội Phẫu thuật Thẩm mỹ TP.HCM được thành lập với tôn chỉ kết nối các bác sĩ,
              chuyên gia đầu ngành nhằm chia sẻ kiến thức, kinh nghiệm và nâng cao tay
              nghề, góp phần phát triển ngành phẫu thuật thẩm mỹ Việt Nam vươn tầm quốc tế.
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
                    Đào tạo liên tục, chuẩn hóa quy trình kỹ thuật và đạo đức nghề nghiệp,
                    bảo vệ quyền lợi hợp pháp của hội viên và an toàn cho khách hàng.
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
                    Trở thành tổ chức xã hội nghề nghiệp uy tín hàng đầu khu vực, là điểm
                    tựa vững chắc cho cộng đồng bác sĩ phẫu thuật thẩm mỹ.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative min-h-[400px] h-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk6c_Uv14LGvmM14ozsZPVRcKObyMOBrtZG2f9ViLFwmQI0j-k98prcoKsiQWPJrMFrazBQCSs27Ansi82tONs2BkGx1Hipwf-cYcgnyDqqpPVY_8ZfEO0PNOTstHvGT2XTQI1Y8sO7a1MDVZpwiNsaj7NFgmxct-4b7HModQUB0oNKxinS6kjn0XQ4zOid1pm3armuQhI4W1gx_Ev5xc70JkKfPGdQ4-aR0gWmbh_4IZ7Ss9svhVfmT6UtbN3tZoQ227Mwefe6vE"
              alt="Abstract image of medical surgery tools or a clean medical environment illustrating precision"
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
                  Cam kết chất lượng
                </span>
              </div>
              <p className="text-lg font-medium">
                &quot;Chuyên môn vững vàng - Y đức sáng ngời&quot;
              </p>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="rounded-2xl border border-pink-50 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800 md:p-12">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Lịch sử Hình thành & Phát triển
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Hành trình hơn 15 năm xây dựng và khẳng định vị thế của HSAPS trong nền y
              học nước nhà.
            </p>
          </div>
          <div className="relative">
            {/* Vertical Line */}
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
                    Được thành lập theo quyết định của UBND TP.HCM, đánh dấu bước ngoặt
                    quan trọng cho ngành PTTM tại thành phố.
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
                    Đại hội Nhiệm kỳ II
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Mở rộng quy mô hội viên, tổ chức thành công hội nghị khoa học quốc tế
                    lần đầu tiên.
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
                    2018
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Hợp tác Quốc tế Toàn diện
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Ký kết biên bản ghi nhớ (MOU) với các hội phẫu thuật thẩm mỹ Hàn
                    Quốc, Hoa Kỳ và Thái Lan.
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
                    Nay
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Phát triển bền vững
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Hơn 500 hội viên chính thức, tổ chức đào tạo CME định kỳ và các hội
                    thảo chuyên sâu hàng năm.
                  </p>
                </div>
                <div className="absolute left-0 z-10 flex size-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white bg-secondary shadow-lg dark:border-gray-800 md:left-1/2">
                  <TrendingUp className="size-4 text-white" />
                </div>
                <div className="w-full pr-0 md:w-5/12 md:pr-8 md:text-right"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Giá trị Cốt lõi
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-secondary"></div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Value 1 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-pink-50 transition-colors group-hover:bg-primary dark:bg-pink-900/30">
                <Stethoscope className="size-8 text-primary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                An toàn
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Đặt sự an toàn của bệnh nhân lên hàng đầu trong mọi quy trình y khoa.
              </p>
            </div>
            {/* Value 2 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-amber-50 transition-colors group-hover:bg-secondary dark:bg-amber-900/30">
                <Lightbulb className="size-8 text-secondary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Trí tuệ
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Không ngừng học hỏi, cập nhật kiến thức mới và công nghệ hiện đại.
              </p>
            </div>
            {/* Value 3 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-pink-50 transition-colors group-hover:bg-primary dark:bg-pink-900/30">
                <Heart className="size-8 text-primary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Y đức
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Giữ gìn phẩm chất cao quý của người thầy thuốc, tận tâm với nghề.
              </p>
            </div>
            {/* Value 4 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-amber-50 transition-colors group-hover:bg-secondary dark:bg-amber-900/30">
                <Handshake className="size-8 text-secondary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Đoàn kết
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Xây dựng tập thể vững mạnh, hỗ trợ lẫn nhau cùng phát triển.
              </p>
            </div>
          </div>
        </div>

        {/* Lĩnh vực hoạt động */}
        <div>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Lĩnh vực Hoạt động
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-secondary"></div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Field 1 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-pink-50 transition-colors group-hover:bg-primary dark:bg-pink-900/30">
                <Calendar className="size-8 text-primary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                1. Hội nghị khoa học thường niên
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Diễn đàn thường niên uy tín quy tụ hàng trăm chuyên gia PTTM trong và ngoài nước chia sẻ các báo cáo chuyên môn, cập nhật xu hướng y học tiên tiến toàn cầu.
              </p>
            </div>
            {/* Field 2 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-amber-50 transition-colors group-hover:bg-secondary dark:bg-amber-900/30">
                <BookOpen className="size-8 text-secondary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                2. Tạp chí y khoa thẩm mỹ
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Ấn phẩm xuất bản các bài viết, nghiên cứu lâm sàng chất lượng cao đạt tiêu chuẩn học thuật, giới thiệu các giải pháp và công nghệ mới cho ngành thẩm mỹ.
              </p>
            </div>
            {/* Field 3 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-pink-50 transition-colors group-hover:bg-primary dark:bg-pink-900/30">
                <GraduationCap className="size-8 text-primary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                3. Đào tạo liên tục (CME)
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Tổ chức các lớp học bồi dưỡng nâng cao chuyên môn liên tục và cấp chứng chỉ CME, đảm bảo phát triển năng lực nghề nghiệp chất lượng cao cho hội viên.
              </p>
            </div>
            {/* Field 4 */}
            <div className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-amber-50 transition-colors group-hover:bg-secondary dark:bg-amber-900/30">
                <FileText className="size-8 text-secondary transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                4. Báo cáo khoa học
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Tập hợp các sáng kiến đột phá, báo cáo nghiên cứu tình huống lâm sàng thực tiễn sâu sắc đóng góp tích cực cho nền y học và khoa học Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Contact & Footer */}
    </div>
  );
}
