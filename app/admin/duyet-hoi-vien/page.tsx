'use client';

import React, { useState } from 'react';
import { 
  BadgeCheck, 
  Check, 
  X, 
  Eye, 
  FileText, 
  Download, 
  QrCode, 
  Mail, 
  Search, 
  Sparkles,
  Calendar,
  ShieldCheck,
  CreditCard,
  UserCheck
} from 'lucide-react';

type PendingMember = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  clinic: string;
  email: string;
  phone: string;
  cchn: string;
  appliedDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  signatureUrl?: string;
  receiptUrl?: string;
};

const MOCK_PENDING: PendingMember[] = [
  {
    id: 'm1',
    name: 'BSCKII Nguyễn Văn Anh',
    title: 'Bác sĩ Chuyên khoa II',
    specialty: 'Phẫu thuật tạo hình vú & Mặt',
    clinic: 'Bệnh viện Đa khoa Tâm Anh TP.HCM',
    email: 'bs.nguyenvananh@gmail.com',
    phone: '0903123456',
    cchn: '001234/HCM-CCHN',
    appliedDate: '20/12/2024',
    status: 'PENDING',
    signatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/John_Hancock_signature.svg',
    receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm2',
    name: 'TS.BS Trần Thị Bích',
    title: 'Tiến sĩ Bác sĩ',
    specialty: 'Thẩm mỹ nội khoa & Laser y học',
    clinic: 'Viện Thẩm mỹ Quốc tế Star',
    email: 'dr.tranbich@yahoo.com',
    phone: '0918987654',
    cchn: '005678/HCM-CCHN',
    appliedDate: '19/12/2024',
    status: 'PENDING',
    signatureUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/John_Hancock_signature.svg',
    receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
  },
];

export default function DuyetHoiVienPage() {
  const [members, setMembers] = useState<PendingMember[]>(MOCK_PENDING);
  const [selectedMember, setSelectedMember] = useState<PendingMember | null>(null);
  const [showCardModal, setShowCardModal] = useState<PendingMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'APPROVED' } : m));
    alert('✅ Đã duyệt hồ sơ bác sĩ! Hệ thống tự động gửi Email kèm Thẻ Hội viên điện tử (QR Code).');
    setSelectedMember(null);
  };

  const handleReject = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'REJECTED' } : m));
    alert('❌ Đã từ chối hồ sơ. Email thông báo lý do đã được chuyển sang bộ phận thư ký.');
    setSelectedMember(null);
  };

  const exportExcel = () => {
    alert('📊 Đã xuất file Excel danh sách Bác sĩ Hội viên phục vụ báo cáo Sở Y tế / Bộ Y tế!');
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-[#0d1117] text-white font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#ec297b] uppercase tracking-widest mb-1">
            <BadgeCheck className="size-4" /> Quản trị Hội viên &amp; Thẻ Điện tử
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Duyệt Hồ Sơ Bác Sĩ &amp; Thẻ Điện Tử (QR Code)
          </h1>
        </div>
        <button
          onClick={exportExcel}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-all cursor-pointer w-fit"
        >
          <Download className="size-4" /> Xuất Danh Sách Báo Cáo (Excel)
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/50 font-bold uppercase">Chờ phê duyệt</p>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">
            {members.filter(m => m.status === 'PENDING').length} Hồ sơ
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/50 font-bold uppercase">Đã chính thức duyệt</p>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">
            {members.filter(m => m.status === 'APPROVED').length} Bác sĩ
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs text-white/50 font-bold uppercase">Hội phí chuẩn</p>
          <p className="text-2xl font-extrabold text-[#ec297b] mt-1">2.500.000 VNĐ / năm</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Danh sách hồ sơ nộp trực tuyến</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Tìm theo tên, CCHN..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-1.5 pl-9 pr-3 text-xs text-white placeholder-white/30 focus:border-[#ec297b] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.03] text-white/40 uppercase tracking-wider font-bold">
              <tr>
                <th className="px-5 py-3.5">Bác sĩ / Học hàm</th>
                <th className="px-5 py-3.5">Chuyên khoa &amp; Đơn vị</th>
                <th className="px-5 py-3.5">Số CCHN</th>
                <th className="px-5 py-3.5">Hội phí (2.5tr)</th>
                <th className="px-5 py-3.5">Trạng thái</th>
                <th className="px-5 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-bold text-white">
                    <p className="text-sm text-white">{m.name}</p>
                    <p className="text-[10px] text-white/40 font-normal">{m.title}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-white/80 font-medium">{m.specialty}</p>
                    <p className="text-[10px] text-white/40">{m.clinic}</p>
                  </td>
                  <td className="px-5 py-4 font-mono text-emerald-400 font-semibold">
                    {m.cchn}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      <CreditCard className="size-3" /> Đã đóng
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {m.status === 'PENDING' && (
                      <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
                        Chờ duyệt
                      </span>
                    )}
                    {m.status === 'APPROVED' && (
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                        Chính thức
                      </span>
                    )}
                    {m.status === 'REJECTED' && (
                      <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                        Đã từ chối
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedMember(m)}
                      className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                      title="Xem chi tiết nét vẽ chữ ký & hóa đơn"
                    >
                      <Eye className="size-4" />
                    </button>
                    {m.status === 'APPROVED' && (
                      <button
                        onClick={() => setShowCardModal(m)}
                        className="rounded-lg border border-pink-500/30 bg-[#ec297b]/20 p-2 text-[#ec297b] hover:bg-[#ec297b]/30 transition-all"
                        title="Xem Thẻ Hội Viên Điện Tử (QR Code)"
                      >
                        <QrCode className="size-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal (Signature & Receipt view) */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#161b22] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Chi tiết hồ sơ nộp trực tuyến</h3>
              <button onClick={() => setSelectedMember(null)} className="text-white/40 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <div>
                  <p className="text-white/40">Họ và tên bác sĩ:</p>
                  <p className="font-bold text-sm text-white mt-0.5">{selectedMember.name}</p>
                </div>
                <div>
                  <p className="text-white/40">Số CCHN:</p>
                  <p className="font-mono font-bold text-emerald-400 mt-0.5">{selectedMember.cchn}</p>
                </div>
                <div>
                  <p className="text-white/40">Email / SĐT:</p>
                  <p className="text-white/80 mt-0.5">{selectedMember.email} - {selectedMember.phone}</p>
                </div>
                <div>
                  <p className="text-white/40">Đơn vị công tác:</p>
                  <p className="text-white/80 mt-0.5">{selectedMember.clinic}</p>
                </div>
              </div>

              {/* Signature Canvas preview */}
              <div className="space-y-1.5">
                <p className="font-bold text-white/70">1. Chữ ký Canvas trực tuyến:</p>
                <div className="rounded-xl border border-white/10 bg-white p-3 flex items-center justify-center h-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedMember.signatureUrl} alt="Signature" className="max-h-20 object-contain invert" />
                </div>
              </div>

              {/* Receipt preview */}
              <div className="space-y-1.5">
                <p className="font-bold text-white/70">2. Hóa đơn chuyển khoản Hội phí (2.500.000đ):</p>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2 flex items-center justify-center h-32 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedMember.receiptUrl} alt="Receipt" className="h-full object-cover rounded-lg" />
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedMember.status === 'PENDING' && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleApprove(selectedMember.id)}
                  className="flex-1 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="size-4" /> Phê Duyệt &amp; Cấp Thẻ QR
                </button>
                <button
                  onClick={() => handleReject(selectedMember.id)}
                  className="flex-1 rounded-xl bg-rose-600/30 border border-rose-500/40 py-3 text-xs font-bold text-rose-400 hover:bg-rose-600/40 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="size-4" /> Từ Chối Hồ Sơ
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Digital Card Preview Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#1a0c16] via-[#2d0f2a] to-[#1a0c16] p-6 border border-[#ec297b]/40 shadow-2xl text-center relative overflow-hidden space-y-6">
            <button onClick={() => setShowCardModal(null)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="size-5" />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ec297b]/20 px-3 py-1 text-[10px] font-bold text-[#ec297b] border border-[#ec297b]/30">
              <Sparkles className="size-3" /> THẺ HỘI VIÊN ĐIỆN TỬ
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-extrabold text-white">{showCardModal.name}</h4>
              <p className="text-xs text-pink-300 font-semibold">{showCardModal.title}</p>
              <p className="text-[10px] text-white/50 font-mono">{showCardModal.cchn}</p>
            </div>

            {/* QR Code Graphic */}
            <div className="mx-auto size-44 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=HSAPS-MEMBER-${showCardModal.cchn}`}
                alt="QR Code"
                className="size-full object-contain"
              />
            </div>

            <div className="text-[10px] text-white/40 border-t border-white/10 pt-4">
              Hội Phẫu thuật Tạo hình Thẩm mỹ TP.HCM (HSAPS)<br />
              Thẻ có giá trị quét mã Check-in tại các Hội nghị khoa học
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
