'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Bell, ChevronDown, LogOut, KeyRound, UserCircle2,
  Shield, CheckCircle, Eye, EyeOff, Loader2, X,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// ─── Change Password Modal ────────────────────────────────────────────────────

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();

  const strength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strengthLabel = ['Quá yếu', 'Yếu', 'Trung bình', 'Mạnh', 'Rất mạnh'];
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-amber-400', 'bg-emerald-500', 'bg-emerald-400'];
  const s = strength(next);

  const handleSubmit = async () => {
    setError('');
    if (!current || !next || !confirm) { setError('Vui lòng điền đầy đủ thông tin.'); return; }
    if (next.length < 8) { setError('Mật khẩu mới phải có ít nhất 8 ký tự.'); return; }
    if (next !== confirm) { setError('Mật khẩu xác nhận không khớp.'); return; }
    if (s < 2) { setError('Mật khẩu quá yếu. Thêm chữ hoa, số hoặc ký tự đặc biệt.'); return; }

    setLoading(true);
    try {
      const email = session?.user?.email;
      if (!email) throw new Error('Không tìm thấy tài khoản đăng nhập.');

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase chưa được cấu hình. Liên hệ quản trị viên.');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Verify current password first
      const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password: current });
      if (signInErr) { throw new Error('Mật khẩu hiện tại không đúng.'); }

      // Update password
      const { error: updateErr } = await supabase.auth.updateUser({ password: next });
      if (updateErr) { throw new Error(updateErr.message); }

      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (e: any) {
      setError(e.message || 'Đổi mật khẩu thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#161b22] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ec297b]/10">
              <KeyRound className="size-4 text-[#ec297b]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Đổi mật khẩu</h2>
              <p className="text-[11px] text-white/40">Cập nhật mật khẩu tài khoản HSAPS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {success ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle className="size-7 text-emerald-400" />
              </div>
              <p className="text-sm font-bold text-white">Đổi mật khẩu thành công!</p>
              <p className="text-xs text-white/40">Đang đóng cửa sổ...</p>
            </div>
          ) : (
            <>
              {/* Current password */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider">Mật khẩu hiện tại</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={current}
                    onChange={e => setCurrent(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại..."
                    className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider">Mật khẩu mới</label>
                <div className="relative">
                  <input
                    type={showNext ? 'text' : 'password'}
                    value={next}
                    onChange={e => setNext(e.target.value)}
                    placeholder="Tối thiểu 8 ký tự..."
                    className="w-full rounded-xl border border-white/10 bg-[#0d1117] px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNext(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showNext ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>

                {/* Strength bar */}
                {next && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map(i => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < s ? strengthColor[s] : 'bg-white/10'}`}
                        />
                      ))}
                    </div>
                    <p className={`text-[10px] font-semibold ${s <= 1 ? 'text-red-400' : s <= 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {strengthLabel[s]}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-white/50 uppercase tracking-wider">Xác nhận mật khẩu mới</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới..."
                    className={`w-full rounded-xl border bg-[#0d1117] px-4 py-2.5 pr-10 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 transition-all ${
                      confirm && confirm !== next
                        ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-[#ec297b]/50 focus:ring-[#ec297b]/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {confirm && confirm !== next && (
                  <p className="text-[10px] text-red-400 font-semibold">Mật khẩu không khớp</p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <X className="size-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-300">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading || !current || !next || !confirm}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/20 hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="size-4 animate-spin" /> Đang cập nhật...</>
                ) : (
                  <><KeyRound className="size-4" /> Đổi mật khẩu</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Account Dropdown ─────────────────────────────────────────────────────────

export default function AdminHeader() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const userName = session?.user?.name || 'Quản trị viên';
  const userEmail = session?.user?.email || '';
  const userRole = ((session?.user as any)?.role || 'GUEST').toUpperCase();
  const initial = (userName || 'A').charAt(0).toUpperCase();

  // Close dropdown on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const roleLabel = userRole === 'ADMIN' ? 'Ban Quản Trị' : 'Bác sĩ Hội viên';
  const roleColor = userRole === 'ADMIN' ? 'text-[#ec297b]' : 'text-violet-400';
  const roleBg = userRole === 'ADMIN' ? 'bg-[#ec297b]/10 border-[#ec297b]/20' : 'bg-violet-500/10 border-violet-500/20';

  return (
    <>
      {/* Account button */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all"
        >
          {/* Avatar */}
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#ec297b] to-[#c2185f] text-[11px] font-black text-white shadow shadow-pink-500/30">
            {initial}
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-white/80 leading-none">{userName}</p>
            <p className={`text-[9px] font-bold uppercase tracking-wider leading-tight mt-0.5 ${roleColor}`}>{roleLabel}</p>
          </div>

          <ChevronDown className={`size-3.5 text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/[0.08] bg-[#161b22] shadow-2xl shadow-black/60 overflow-hidden z-50">
            {/* Profile card */}
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ec297b] to-[#c2185f] text-lg font-black text-white shadow-lg shadow-pink-500/30">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">{userName}</p>
                  <p className="text-xs text-white/40 truncate mt-0.5">{userEmail}</p>
                  <span className={`inline-flex items-center gap-1 mt-1.5 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${roleBg} ${roleColor}`}>
                    <Shield className="size-2.5" />
                    {roleLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              <button
                onClick={() => { setOpen(false); setShowChangePw(true); }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/[0.04] hover:text-white transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ec297b]/10">
                  <KeyRound className="size-4 text-[#ec297b]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Đổi mật khẩu</p>
                  <p className="text-[10px] text-white/30">Cập nhật bảo mật tài khoản</p>
                </div>
              </button>

              <button
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/[0.04] hover:text-white transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                  <UserCircle2 className="size-4 text-violet-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Hồ sơ cá nhân</p>
                  <p className="text-[10px] text-white/30">Xem và cập nhật thông tin</p>
                </div>
              </button>
            </div>

            {/* Divider + Logout */}
            <div className="border-t border-white/[0.06] p-2">
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                  <LogOut className="size-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Đăng xuất</p>
                  <p className="text-[10px] text-red-400/50">Thoát khỏi hệ thống quản trị</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showChangePw && <ChangePasswordModal onClose={() => setShowChangePw(false)} />}
    </>
  );
}
