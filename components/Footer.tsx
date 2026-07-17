'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-[#150d11] pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo & Contact details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded bg-primary text-white">
                <Stethoscope className="size-5" />
              </div>
              <span className="font-display text-xl font-bold text-text-main dark:text-white">HSAPS</span>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary dark:text-gray-400">
              Hội Phẫu thuật Thẩm mỹ TP. Hồ Chí Minh.<br/>
              Kết nối, chia sẻ và phát triển.
            </p>
            <div className="flex gap-4 mt-2">
              <a className="text-text-secondary hover:text-primary transition-colors" href="#"><Globe className="size-5" /></a>
              <a className="text-text-secondary hover:text-primary transition-colors" href="mailto:info@hsaps.org.vn"><Mail className="size-5" /></a>
              <a className="text-text-secondary hover:text-primary transition-colors" href="tel:02839393939"><Phone className="size-5" /></a>
            </div>
          </div>

          {/* Links: About */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-white">Về HSAPS</h4>
            <nav className="flex flex-col gap-2">
              <Link className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white" href="/gioi-thieu">
                Giới thiệu chung
              </Link>
              <Link className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white" href="/hoi-vien">
                Danh sách Hội viên
              </Link>
              <Link className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white" href="/bao-cao-khoa-hoc">
                Bài báo khoa học
              </Link>
              <Link className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white" href="/lien-he">
                Liên hệ ban thư ký
              </Link>
              {['Điều lệ hội', 'Đối tác'].map(item => (
                <a key={item} className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white" href="#">{item}</a>
              ))}
            </nav>
          </div>

          {/* Links: Specialty */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-white">Chuyên môn</h4>
            <nav className="flex flex-col gap-2">
              {['Đào tạo CME', 'Thư viện khoa học', 'Hội nghị & Hội thảo', 'Tin tức y học'].map(item => (
                <a key={item} className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-white" href="#">{item}</a>
              ))}
            </nav>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-main dark:text-white">Liên hệ</h4>
            <div className="flex flex-col gap-3 text-sm text-text-secondary dark:text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="size-5 shrink-0 mt-0.5" />
                123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-5 shrink-0" />
                (028) 3939 3939
              </p>
              <p className="flex items-center gap-2">
                <Mail className="size-5 shrink-0" />
                info@hsaps.org.vn
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-gray-200 dark:border-gray-850 pt-8 sm:flex-row gap-4">
          <p className="text-xs text-text-secondary dark:text-gray-500 font-mono">
            © {new Date().getFullYear()} HSAPS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a className="text-xs text-text-secondary hover:text-primary dark:text-gray-500 dark:hover:text-white" href="#">Chính sách bảo mật</a>
            <a className="text-xs text-text-secondary hover:text-primary dark:text-gray-500 dark:hover:text-white" href="#">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
