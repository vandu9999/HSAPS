'use client';

import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronDown,
  MessageSquare, FileText, Award, HelpCircle
} from 'lucide-react';

const DEPARTMENTS = [
  { id: 'sec', name: 'Ban Thư ký Hội (Hồ sơ, Thủ tục)' },
  { id: 'edu', name: 'Ban Đào tạo & Khoa học (CME, Nghiên cứu)' },
  { id: 'sponsor', name: 'Ban Hợp tác & Tài trợ (Doanh nghiệp, Đối tác)' },
  { id: 'tech', name: 'Hỗ trợ kỹ thuật hệ thống (LMS, Tài khoản)' },
];

const FAQS = [
  {
    q: 'Làm thế nào để đăng ký trở thành Hội viên chính thức?',
    a: 'Bác sĩ cần chuẩn bị bản scan Chứng chỉ hành nghề y tế, các văn bằng chuyên khoa và nộp hồ sơ trực tuyến qua mục "Đăng ký Hội viên" hoặc liên hệ Ban thư ký để được hướng dẫn xét duyệt chuyên môn.'
  },
  {
    q: 'Thời gian xét duyệt hồ sơ hội viên thường mất bao lâu?',
    a: 'Thông thường, hồ sơ sẽ được thẩm định qua Hội đồng Chuyên môn và phản hồi kết quả trong vòng 7 - 10 ngày làm việc kể từ lúc tiếp nhận đầy đủ tài liệu.'
  },
  {
    q: 'Làm sao để nhận chứng chỉ đào tạo CME sau sự kiện?',
    a: 'Sau khi kết thúc hội nghị/workshop, Ban thư ký sẽ kiểm tra số giờ tham gia thực tế qua quét mã check-in và gửi chứng nhận CME bản điện tử/bản cứng sau 15 ngày.'
  },
];

export default function LienHePage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', dept: 'sec', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setSubmitting(true);
    try {
      const selectedDept = DEPARTMENTS.find(d => d.id === form.dept)?.name || form.dept;
      const res = await fetch('/api/lien-he', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          department: selectedDept,
          subject: form.subject || 'Liên hệ từ website',
          message: form.message,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Lỗi gửi tin nhắn liên hệ');
      }

      setSuccess(true);
      setForm({ name: '', email: '', phone: '', dept: 'sec', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Không thể gửi tin nhắn liên hệ. Vui lòng thử lại sau.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f9] dark:bg-[#0f0a0d] text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 border-b border-gray-100 dark:border-pink-950/20 bg-gradient-to-b from-pink-50/30 to-transparent dark:from-pink-950/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Liên hệ ban thư ký
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Kết nối với chúng tôi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base lg:text-lg text-gray-500 dark:text-gray-400">
            HSAPS luôn sẵn sàng lắng nghe, giải đáp các thắc mắc và tiếp nhận các yêu cầu hợp tác y học, học thuật từ quý đồng nghiệp và đối tác.
          </p>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="py-16 mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left Column: Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="size-5 text-primary" />
              Thông tin liên hệ chính thức
            </h2>

            {/* Address Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-pink-950/20 bg-white dark:bg-background-dark p-6 hover:shadow-xl dark:hover:shadow-pink-950/5 transition-all duration-300">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Địa chỉ văn phòng</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    123 Đường Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & Email Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-pink-950/20 bg-white dark:bg-background-dark p-6 hover:shadow-xl dark:hover:shadow-pink-950/5 transition-all duration-300">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ec297b]/10 text-primary">
                  <Phone className="size-5" />
                </div>
                <div className="w-full">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Hotline & Email</h3>
                  <div className="mt-2 space-y-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <p className="flex items-center justify-between">
                      <span>Điện thoại:</span>
                      <a href="tel:02839393939" className="font-bold text-gray-800 dark:text-white hover:text-primary">(028) 3939 3939</a>
                    </p>
                    <p className="flex items-center justify-between border-t border-gray-50 dark:border-white/[0.03] pt-1.5">
                      <span>Thư điện tử:</span>
                      <a href="mailto:info@hsaps.org.vn" className="font-bold text-gray-800 dark:text-white hover:text-primary">info@hsaps.org.vn</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-pink-950/20 bg-white dark:bg-background-dark p-6 hover:shadow-xl dark:hover:shadow-pink-950/5 transition-all duration-300">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-500">
                  <Clock className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">Giờ làm việc ban thư ký</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    Thứ Hai – Thứ Sáu: 08:00 – 17:00<br/>
                    Thứ Bảy & Chủ Nhật: Nghỉ (trừ các ngày tổ chức sự kiện CME)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-gray-100 dark:border-pink-950/20 bg-white dark:bg-background-dark p-8 lg:p-10 shadow-lg">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Gửi thư liên hệ</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Vui lòng điền thông tin vào mẫu bên dưới, yêu cầu của bạn sẽ được chuyển tiếp trực tiếp đến ban phụ trách chuyên môn tương ứng.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Họ và tên *</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Ví dụ: BSCKII. Nguyễn Văn A"
                      className="w-full rounded-xl bg-gray-50 dark:bg-[#0d1117]/80 border border-gray-200/60 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Số điện thoại</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="09xx.xxx.xxx"
                      className="w-full rounded-xl bg-gray-50 dark:bg-[#0d1117]/80 border border-gray-200/60 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Địa chỉ Email *</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full rounded-xl bg-gray-50 dark:bg-[#0d1117]/80 border border-gray-200/60 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bộ phận tiếp nhận</label>
                    <div className="relative">
                      <select
                        value={form.dept}
                        onChange={e => setForm({ ...form, dept: e.target.value })}
                        className="w-full rounded-xl bg-gray-50 dark:bg-[#0d1117]/80 border border-gray-200/60 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-primary/50 focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        {DEPARTMENTS.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tiêu đề thư</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="Vấn đề bạn cần hỗ trợ..."
                    className="w-full rounded-xl bg-gray-50 dark:bg-[#0d1117]/80 border border-gray-200/60 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nội dung chi tiết *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Quý đồng nghiệp cần hỗ trợ thông tin gì..."
                    className="w-full rounded-xl bg-gray-50 dark:bg-[#0d1117]/80 border border-gray-200/60 dark:border-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-pink-500/10 hover:bg-primary-dark hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send className="size-4" />
                      Gửi yêu cầu liên hệ
                    </>
                  )}
                </button>

                {/* Success Message Alert */}
                {success && (
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/40 p-4 text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-300">
                    <CheckCircle2 className="size-5 shrink-0" />
                    <span className="text-xs font-bold leading-normal">
                      Gửi thư thành công! Ban thư ký sẽ phản hồi lại email của bạn trong thời gian sớm nhất.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Direction Section */}
      <section className="py-12 bg-gray-50 dark:bg-[#150d11]/30">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="rounded-3xl border border-gray-150 dark:border-pink-950/20 bg-white dark:bg-background-dark p-6 overflow-hidden">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="size-4.5 text-primary" />
              Bản đồ định vị văn phòng Hội
            </h3>
            
            {/* Stylized Google Map Placeholder */}
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#0d1117] border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center p-6">
              <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(#ec297b_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 space-y-3 max-w-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary mx-auto animate-bounce">
                  <MapPin className="size-6" />
                </div>
                <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">Văn phòng đại diện HSAPS</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-normal">
                  Quận 5, TP. Hồ Chí Minh (Gần ngã tư Nguyễn Văn Cừ & An Dương Vương)
                </p>
                <a
                  href="https://maps.google.com" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline pt-2"
                >
                  Mở Google Maps <Send className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 mx-auto max-w-[800px] px-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white text-center mb-8 flex items-center justify-center gap-2">
          <HelpCircle className="size-6 text-primary" />
          Câu hỏi thường gặp (FAQs)
        </h2>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-150 dark:border-pink-950/20 bg-white dark:bg-background-dark overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 dark:text-white text-sm focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`size-4.5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 border-t border-gray-50 dark:border-white/[0.03] text-xs text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-white/[0.01]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
