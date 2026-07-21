'use client';

import Image from 'next/image';
import Link from 'next/link';
import EventSlider from '@/components/EventSlider';
import { PARTNERS_DATA } from '@/lib/data';
import PartnerLogo from '@/components/PartnerLogo';
import { useCmsData } from '@/lib/useCmsData';
import {
  UserPlus, ArrowRight, Calendar, GraduationCap,
  BookOpen, FileText, ExternalLink,
} from 'lucide-react';

// Map icon name string → component
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar, GraduationCap, BookOpen, FileText,
};

const CATEGORY_COLOR: Record<string, string> = {
  primary: 'text-primary',
  yellow: 'text-yellow-600',
  blue: 'text-blue-600',
  green: 'text-green-600',
};

export default function HomepageClient() {
  const cms = useCmsData();
  const { hero, stats, activities, events, news, cta, organizations, partners } = cms;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">

      {/* ① HERO BANNER ─────────────────────────────────────────────────── */}
      <section className="relative bg-white dark:bg-background-dark py-8 lg:py-12">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left: Text */}
            <div className="flex flex-col gap-5 sm:gap-6 max-w-2xl">
              {/* Badge */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary dark:bg-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {hero.badge}
              </div>

              {/* H1 */}
              <h1 className="fluid-h1 font-display font-extrabold text-text-main dark:text-white">
                {hero.title} <span className="text-primary">{hero.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="fluid-body leading-relaxed text-text-secondary dark:text-gray-400">
                {hero.description}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/login"
                  className="flex h-11 flex-1 sm:flex-none sm:min-w-[160px] items-center justify-center gap-2 rounded-lg bg-primary px-5 sm:px-6 text-sm sm:text-base font-bold text-white shadow-md transition-transform hover:scale-105 hover:bg-primary-dark active:scale-95"
                >
                  <UserPlus className="size-4 sm:size-5" />
                  {hero.btn1Text}
                </Link>
                <button className="flex h-11 flex-1 sm:flex-none sm:min-w-[160px] items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 sm:px-6 text-sm sm:text-base font-bold text-text-main shadow-sm transition-colors hover:bg-gray-50 hover:border-gray-300 dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                  <span>{hero.btn2Text}</span>
                  <ArrowRight className="size-4 sm:size-5" />
                </button>
              </div>

              {/* Stats */}
              <div className="mt-2 flex items-center gap-4 sm:gap-8 border-t border-dashed border-gray-200 pt-5 sm:pt-7 dark:border-gray-800">
                {[
                  { value: stats.stat1Value, label: stats.stat1Label },
                  { value: stats.stat2Value, label: stats.stat2Label },
                  { value: stats.stat3Value, label: stats.stat3Label },
                ].map((s, i) => (
                  <div key={i} className={i > 0 ? 'flex items-center gap-4 sm:gap-8' : ''}>
                    {i > 0 && <div className="h-7 w-px bg-gray-200 dark:bg-gray-800" />}
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-text-main dark:text-white">{s.value}</p>
                      <p className="text-xs sm:text-sm font-medium text-text-secondary">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative h-full w-full lg:order-last">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                {hero.imageUrl && (
                  <Image
                    src={hero.imageUrl}
                    alt={hero.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    unoptimized={hero.imageUrl.startsWith('data:')}
                  />
                )}
                {/* Event badge overlay */}
                {(hero.eventBadgeTitle || hero.eventBadgeDate) && (
                  <div className="absolute bottom-4 left-4 right-4 z-20 rounded-xl bg-white/95 p-3 sm:p-4 backdrop-blur shadow-lg dark:bg-gray-900/90 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs border-l-4 border-secondary">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-primary">
                        <Calendar className="size-4 sm:size-5" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-text-secondary">Sự kiện sắp tới</p>
                        <h3 className="mt-0.5 text-xs sm:text-sm font-bold text-text-main dark:text-white line-clamp-2">{hero.eventBadgeTitle}</h3>
                        <p className="mt-0.5 text-[10px] sm:text-xs text-text-secondary">{hero.eventBadgeDate}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -right-12 -top-12 -z-10 h-64 w-64 rounded-full bg-pink-100 dark:bg-pink-900/20 blur-3xl opacity-60" />
              <div className="absolute -left-12 -bottom-12 -z-10 h-48 w-48 rounded-full bg-yellow-100 dark:bg-yellow-900/20 blur-3xl opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* ② LĨNH VỰC HOẠT ĐỘNG ─────────────────────────────────────────── */}
      <section className="bg-background-light dark:bg-background-dark py-10 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mb-10 flex flex-col gap-3 text-center sm:text-left sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="fluid-h2 font-display font-bold text-text-main dark:text-white">
                {activities.sectionTitle}
              </h2>
              <p className="mt-3 fluid-body text-text-secondary dark:text-gray-400">
                {activities.sectionDescription}
              </p>
            </div>
            <Link className="hidden sm:flex items-center gap-1 font-bold text-primary hover:text-primary-dark transition-colors" href="/gioi-thieu">
              Xem chi tiết hoạt động <ArrowRight className="size-5" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activities.cards.map((card) => {
              const Icon = ICON_MAP[card.icon] || Calendar;
              const isPink = card.iconColor === 'pink';
              return (
                <div key={card.id} className="group relative flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${isPink ? 'bg-pink-50 text-primary dark:bg-pink-900/30' : 'bg-amber-50 text-secondary dark:bg-amber-900/30'}`}>
                    <Icon className="size-6 sm:size-8" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="fluid-h3 font-bold text-text-main dark:text-white">{card.title}</h3>
                    <p className="text-sm sm:text-base text-text-secondary dark:text-gray-400">{card.description}</p>
                  </div>
                  <a className={`mt-auto flex items-center text-sm font-bold group-hover:underline ${isPink ? 'text-primary' : 'text-secondary'}`} href="#">
                    {card.linkText} <ArrowRight className="ml-1 size-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ③ SỰ KIỆN NỔI BẬT ────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-background-dark py-10 lg:py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10 flex items-center justify-between">
            <h2 className="fluid-h2 font-display font-bold text-text-main dark:text-white">
              {events.sectionTitle}
            </h2>
          </div>
          <EventSlider />
        </div>
      </section>

      {/* ④ TIN TỨC Y KHOA ──────────────────────────────────────────────── */}
      <section className="bg-gray-50/30 dark:bg-[#150d11]/30 py-10 lg:py-16 border-t border-gray-100 dark:border-gray-850">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-10 flex items-center justify-between">
            <h2 className="fluid-h2 font-display font-bold text-text-main dark:text-white">
              {news.sectionTitle}
            </h2>
            <Link href="/bao-cao-khoa-hoc" className="text-sm font-bold text-primary hover:underline flex items-center gap-1.5 transition-all shrink-0">
              Tất cả tin tức <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {news.items.map((item) => (
              <article key={item.id} className="group cursor-pointer flex flex-col gap-3 sm:gap-4 bg-white dark:bg-gray-900 p-3.5 sm:p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-sm transition-all duration-300">
                <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized={item.imageUrl.startsWith('data:')}
                    />
                  )}
                  <div className={`absolute top-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur ${CATEGORY_COLOR[item.categoryColor] || 'text-primary'}`}>
                    {item.category}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-grow">
                  <span className="text-[10px] font-bold font-mono text-gray-400">{item.date}</span>
                  <h3 className="text-sm font-bold leading-snug text-text-main group-hover:text-primary transition-colors dark:text-white line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-12 text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-300 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-4 sm:mb-6 fluid-h2 font-display font-bold text-white">
            {cta.title}
          </h2>
          <p className="mb-8 sm:mb-10 fluid-body text-pink-100">
            {cta.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button className="w-full sm:w-auto min-w-[200px] rounded-lg bg-secondary px-8 py-4 text-base font-bold text-text-main shadow-lg transition-transform hover:scale-105 active:scale-95 hover:bg-yellow-300">
              {cta.btn1Text}
            </button>
            <button className="w-full sm:w-auto min-w-[200px] rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              {cta.btn2Text}
            </button>
          </div>
        </div>
      </section>

      {/* ⑥ LIÊN KẾT ────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#1a1016]/40 py-12 sm:py-16 border-t border-gray-100 dark:border-gray-850">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#2d1a24] dark:text-white mb-8 sm:mb-10 tracking-tight text-center md:text-left">
            {organizations.sectionTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-8 items-center justify-items-center">
            {organizations.items.map((org) => (
              <div key={org.id} className="flex flex-col items-center text-center gap-2 group">
                {org.logoUrl ? (
                  <div className="size-14 sm:size-20 overflow-hidden rounded-xl drop-shadow-sm transition-transform hover:scale-105 duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={org.logoUrl} alt={org.name} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="size-14 sm:size-20 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center drop-shadow-sm transition-transform hover:scale-105 duration-300">
                    <span className="text-xs font-bold text-gray-400">{org.name.split(' ').map(w => w[0]).join('').slice(0, 3)}</span>
                  </div>
                )}
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors max-w-[90px] sm:max-w-[110px] line-clamp-2">
                  {org.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ ĐỐI TÁC ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50/50 dark:bg-[#150d11] py-12 sm:py-16 border-t border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#2d1a24] dark:text-white mb-8 sm:mb-10 tracking-tight text-center md:text-left">
            {partners.sectionTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-8 items-center justify-items-center">
            {PARTNERS_DATA.map((partner) => (
              <Link
                key={partner.id}
                href={`/doi-tac/${partner.id}`}
                className="flex items-center justify-center p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-2xl border border-[#ec297b]/10 dark:border-gray-800 shadow-sm w-full max-w-[240px] h-16 sm:h-20 transition-all hover:shadow-md hover:border-primary/20 hover:scale-[1.03]"
              >
                <PartnerLogo
                  logoType={partner.logoType}
                  className="h-8 sm:h-10 w-auto grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
