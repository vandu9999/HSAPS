'use client';

import { useState, useEffect } from 'react';
import {
  Tags, Plus, Pencil, Trash2, Save, X, CalendarDays, Newspaper, Users, BookOpen,
  GripVertical, Check, RefreshCw
} from 'lucide-react';
import { Toast, useToast } from '../components/Toast';
import { getCategories, saveCategory, deleteCategory } from '@/app/actions/category';
import { isDbConnected } from '@/app/actions/dbCheck';

type Category = {
  id: string;
  name: string;
  color?: string;
  description?: string;
};

type Module = 'su-kien' | 'tin-tuc' | 'hoi-vien' | 'bao-cao';

const DEFAULTS: Record<Module, Category[]> = {
  'su-kien': [
    { id: '1', name: 'Hội nghị', color: '#ec297b', description: 'Hội nghị khoa học lớn, thường niên' },
    { id: '2', name: 'Workshop', color: '#6366f1', description: 'Đào tạo kỹ năng thực hành' },
    { id: '3', name: 'CME', color: '#0ea5e9', description: 'Cập nhật y khoa liên tục (CME)' },
    { id: '4', name: 'Đào tạo', color: '#f59e0b', description: 'Khóa học & chương trình đào tạo' },
    { id: '5', name: 'Hợp tác quốc tế', color: '#10b981', description: 'Sự kiện hợp tác với tổ chức quốc tế' },
    { id: '6', name: 'Webinar', color: '#a855f7', description: 'Hội thảo trực tuyến' },
  ],
  'tin-tuc': [
    { id: '1', name: 'Báo cáo', color: '#ec297b', description: 'Thông báo & báo cáo hoạt động' },
    { id: '2', name: 'Hợp tác quốc tế', color: '#0ea5e9', description: 'Tin hợp tác nước ngoài' },
    { id: '3', name: 'Khuyến cáo', color: '#f59e0b', description: 'Hướng dẫn lâm sàng & khuyến cáo' },
    { id: '4', name: 'Hoạt động Hội', color: '#10b981', description: 'Sinh hoạt & hoạt động nội bộ' },
    { id: '5', name: 'Sự kiện', color: '#6366f1', description: 'Sự kiện sắp diễn ra' },
    { id: '6', name: 'Thông báo', color: '#f43f5e', description: 'Thông báo chung từ Ban thư ký' },
  ],
  'hoi-vien': [
    { id: '1', name: 'Hội viên chính thức', color: '#10b981', description: 'Bác sĩ đã được xét duyệt đầy đủ' },
    { id: '2', name: 'Hội viên liên kết', color: '#6366f1', description: 'Thành viên liên kết, đang xét duyệt' },
    { id: '3', name: 'Ban Chấp hành', color: '#ec297b', description: 'Thành viên Ban chấp hành Hội' },
    { id: '4', name: 'Hội đồng Cố vấn', color: '#f59e0b', description: 'Chuyên gia cố vấn cao cấp' },
    { id: '5', name: 'Thẩm mỹ Vùng Mặt', color: '#0ea5e9', description: 'Chuyên khoa mắt, mũi, cằm, hàm' },
    { id: '6', name: 'Thẩm mỹ Vóc Dáng', color: '#a855f7', description: 'Ngực, hút mỡ, bụng, mông' },
    { id: '7', name: 'Trẻ hóa da', color: '#f43f5e', description: 'Da liễu thẩm mỹ, Filler, Botox' },
  ],
  'bao-cao': [
    { id: '1', name: 'Phẫu thuật tạo hình', color: '#ec297b', description: 'Nghiên cứu phẫu thuật tạo hình' },
    { id: '2', name: 'Thẩm mỹ nội khoa', color: '#6366f1', description: 'Filler, Botox, laser thẩm mỹ' },
    { id: '3', name: 'Da liễu thẩm mỹ', color: '#0ea5e9', description: 'Điều trị da và sắc tố' },
    { id: '4', name: 'Tổng quan hệ thống', color: '#f59e0b', description: 'Systematic review & Meta-analysis' },
    { id: '5', name: 'Ca lâm sàng', color: '#10b981', description: 'Báo cáo ca bệnh (Case Report)' },
    { id: '6', name: 'Đào tạo Y khoa', color: '#a855f7', description: 'Nghiên cứu giáo dục y khoa' },
    { id: '7', name: 'An toàn thủ thuật', color: '#f43f5e', description: 'Phòng ngừa biến chứng, an toàn' },
  ],
};

const STORAGE_KEYS: Record<Module, string> = {
  'su-kien': 'cms_cat_su_kien',
  'tin-tuc': 'cms_cat_tin_tuc',
  'hoi-vien': 'cms_cat_hoi_vien',
  'bao-cao': 'cms_cat_bao_cao',
};

const MODULES: { id: Module; label: string; icon: any; color: string }[] = [
  { id: 'su-kien', label: 'Sự kiện', icon: CalendarDays, color: '#0ea5e9' },
  { id: 'tin-tuc', label: 'Tin tức', icon: Newspaper, color: '#ec297b' },
  { id: 'hoi-vien', label: 'Hội viên', icon: Users, color: '#6366f1' },
  { id: 'bao-cao', label: 'Báo cáo KH', icon: BookOpen, color: '#10b981' },
];

const PRESET_COLORS = [
  '#ec297b', '#f43f5e', '#f59e0b', '#10b981',
  '#0ea5e9', '#6366f1', '#a855f7', '#64748b',
];

function ColorDot({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={`relative h-6 w-6 rounded-full transition-all ${selected ? 'ring-2 ring-offset-2 ring-offset-[#161b22] ring-white scale-110' : 'hover:scale-110'}`}
    >
      {selected && <Check className="absolute inset-0 m-auto size-3 text-white" strokeWidth={3} />}
    </button>
  );
}

// ─── Inline Form Component ───
function CategoryFormPanel({
  form,
  onChange,
  onSave,
  onCancel,
  isEdit
}: {
  form: Category;
  onChange: (f: Category) => void;
  onSave: () => void;
  onCancel: () => void;
  isEdit: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#161b22] p-4 space-y-4 shadow-xl">
      <p className="text-xs font-bold text-white/50 uppercase tracking-wider">
        {isEdit ? 'Chỉnh sửa danh mục' : 'Tạo danh mục mới'}
      </p>

      {/* Name */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-white/40">Tên danh mục *</label>
        <input
          type="text"
          value={form.name}
          onChange={e => onChange({ ...form, name: e.target.value })}
          placeholder="Ví dụ: Hội nghị, Đào tạo..."
          className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all"
        />
      </div>

      {/* Color Preset */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-white/40">Màu sắc</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map(c => (
            <ColorDot key={c} color={c} selected={form.color === c} onClick={() => onChange({ ...form, color: c })} />
          ))}
          <input
            type="color"
            value={form.color || '#ec297b'}
            onChange={e => onChange({ ...form, color: e.target.value })}
            className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-white/40">Mô tả ngắn</label>
        <input
          type="text"
          value={form.description || ''}
          onChange={e => onChange({ ...form, description: e.target.value })}
          placeholder="Nhập mô tả..."
          className="w-full rounded-xl bg-[#0d1117] border border-white/10 px-4 py-2 text-sm text-white placeholder-white/20 focus:border-[#ec297b]/50 focus:outline-none transition-all"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.04]">
        <button
          onClick={onCancel}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          Hủy
        </button>
        <button
          onClick={onSave}
          disabled={!form.name.trim()}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-4 py-1.5 text-xs font-bold text-white shadow-lg disabled:opacity-40 transition-all"
        >
          <Save className="size-3" />
          Lưu
        </button>
      </div>
    </div>
  );
}

// ─── Module Categories (State & Operations) ───
function ModuleCategories({ moduleId, moduleLabel }: { moduleId: Module; moduleLabel: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [addingNew, setAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<Category>({ id: '', name: '', color: '#ec297b', description: '' });
  const [hasDb, setHasDb] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast, showToast, closeToast } = useToast();

  useEffect(() => {
    let active = true;
    setLoading(true);
    isDbConnected().then(connected => {
      if (!active) return;
      setHasDb(connected);
      if (connected) {
        getCategories(moduleId).then(data => {
          if (!active) return;
          setCategories(data as Category[]);
          setLoading(false);
        }).catch(err => {
          if (!active) return;
          console.error(err);
          loadLocalFallback();
          setLoading(false);
        });
      } else {
        loadLocalFallback();
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [moduleId]);

  const loadLocalFallback = () => {
    const saved = localStorage.getItem(STORAGE_KEYS[moduleId]);
    if (saved) {
      try {
        setCategories(JSON.parse(saved));
        return;
      } catch {}
    }
    setCategories(DEFAULTS[moduleId]);
  };

  const persist = (list: Category[]) => {
    setCategories(list);
    localStorage.setItem(STORAGE_KEYS[moduleId], JSON.stringify(list));
  };

  const handleSaveNew = async () => {
    if (!form.name.trim()) return;
    if (hasDb) {
      try {
        const res = await saveCategory({
          type: moduleId,
          name: form.name,
          color: form.color || '#ec297b',
          description: form.description
        });
        if (res.success) {
          const nextList = await getCategories(moduleId);
          setCategories(nextList as Category[]);
          showToast('✅ Đã thêm danh mục mới', 'success');
        } else {
          showToast(`❌ Lỗi: ${res.error || 'Không thể lưu'}`, 'error');
        }
      } catch (err: any) {
        showToast(`❌ Lỗi: ${err.message || 'Không thể lưu'}`, 'error');
      }
    } else {
      const newCat = { ...form, id: Date.now().toString() };
      const nextList = [...categories, newCat];
      persist(nextList);
      showToast('✅ Đã thêm danh mục mới (Local)', 'success');
    }
    setAddingNew(false);
    setForm({ id: '', name: '', color: '#ec297b', description: '' });
  };

  const handleSaveEdit = async () => {
    if (!form.name.trim() || !editingId) return;
    if (hasDb) {
      try {
        const res = await saveCategory({
          id: editingId,
          type: moduleId,
          name: form.name,
          color: form.color || '#ec297b',
          description: form.description
        });
        if (res.success) {
          const nextList = await getCategories(moduleId);
          setCategories(nextList as Category[]);
          showToast('✅ Đã cập nhật danh mục', 'success');
        } else {
          showToast(`❌ Lỗi: ${res.error || 'Không thể lưu'}`, 'error');
        }
      } catch (err: any) {
        showToast(`❌ Lỗi: ${err.message || 'Không thể lưu'}`, 'error');
      }
    } else {
      const nextList = categories.map(c => c.id === editingId ? form : c);
      persist(nextList);
      showToast('✅ Đã cập nhật danh mục (Local)', 'success');
    }
    setEditingId(null);
    setForm({ id: '', name: '', color: '#ec297b', description: '' });
  };

  const handleDelete = async (id: string) => {
    if (hasDb) {
      try {
        const res = await deleteCategory(id);
        if (res.success) {
          const nextList = await getCategories(moduleId);
          setCategories(nextList as Category[]);
          showToast('Đã xóa danh mục', 'success');
        } else {
          showToast(`❌ Lỗi: ${res.error || 'Không thể xóa'}`, 'error');
        }
      } catch (err: any) {
        showToast(`❌ Lỗi: ${err.message || 'Không thể xóa'}`, 'error');
      }
    } else {
      persist(categories.filter(c => c.id !== id));
      showToast('Đã xóa danh mục (Local)', 'success');
    }
    setConfirmDeleteId(null);
  };

  const handleReset = async () => {
    if (hasDb) {
      try {
        setLoading(true);
        // Clear all from DB for this module
        for (const cat of categories) {
          await deleteCategory(cat.id).catch(() => {});
        }
        // Save default categories
        for (const def of DEFAULTS[moduleId]) {
          await saveCategory({
            type: moduleId,
            name: def.name,
            color: def.color || '#ec297b',
            description: def.description
          });
        }
        const nextList = await getCategories(moduleId);
        setCategories(nextList as Category[]);
        showToast('Đã khôi phục danh mục mặc định', 'success');
      } catch (err: any) {
        showToast(`❌ Lỗi khôi phục: ${err.message || 'Không thể reset'}`, 'error');
      } finally {
        setLoading(false);
      }
    } else {
      persist(DEFAULTS[moduleId]);
      showToast('Đã khôi phục danh mục mặc định (Local)', 'success');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
        <p className="text-sm text-white/50">
          Danh mục hiện tại: <span className="font-bold text-white">{categories.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={loading}
            className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/40 hover:text-white hover:border-white/20 transition-all disabled:opacity-40"
          >
            Đặt lại mặc định
          </button>
          {!addingNew && (
            <button
              onClick={() => {
                setAddingNew(true);
                setEditingId(null);
                setForm({ id: '', name: '', color: '#ec297b', description: '' });
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] px-4 py-1.5 text-xs font-bold text-white shadow-lg"
            >
              <Plus className="size-3.5" />
              Thêm danh mục
            </button>
          )}
        </div>
      </div>

      {/* Add New Panel (Inline) */}
      {addingNew && (
        <div className="animate-in slide-in-from-top-2 fade-in duration-200">
          <CategoryFormPanel
            form={form}
            onChange={setForm}
            onSave={handleSaveNew}
            onCancel={() => setAddingNew(false)}
            isEdit={false}
          />
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="size-8 text-[#ec297b] animate-spin mb-2" />
            <p className="text-sm text-white/40">Đang tải danh mục...</p>
          </div>
        ) : (
          categories.map((cat, idx) => {
            const isEditingThis = editingId === cat.id;

            if (isEditingThis) {
              return (
                <div key={cat.id} className="animate-in fade-in duration-200">
                  <CategoryFormPanel
                    form={form}
                    onChange={setForm}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingId(null)}
                    isEdit={true}
                  />
                </div>
              );
            }

            return (
              <div
                key={cat.id}
                className="group flex items-center gap-3 rounded-xl bg-[#0d1117] border border-white/[0.06] px-4 py-3 hover:border-white/10 transition-all"
              >
                <GripVertical className="size-4 text-white/10 shrink-0 group-hover:text-white/20" />
                
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-[9px] font-bold text-white/30">
                  {idx + 1}
                </span>

                <span
                  className="h-3 w-3 rounded-full shrink-0 border border-white/10"
                  style={{ backgroundColor: cat.color || '#ec297b' }}
                />

                <span
                  style={{
                    backgroundColor: `${cat.color || '#ec297b'}18`,
                    color: cat.color || '#ec297b',
                    borderColor: `${cat.color || '#ec297b'}35`
                  }}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border shrink-0"
                >
                  {cat.name}
                </span>

                <p className="flex-1 text-xs text-white/30 min-w-0 truncate">
                  {cat.description || '—'}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {confirmDeleteId === cat.id ? (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-2.5 py-1 text-xs">
                      <span className="text-[10px] text-red-400 font-bold uppercase">Xóa?</span>
                      <button onClick={() => handleDelete(cat.id)} className="text-[10px] font-bold text-red-400 hover:text-red-300">Có</button>
                      <button onClick={() => setConfirmDeleteId(null)} className="text-[10px] font-semibold text-white/40 hover:text-white">Không</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setAddingNew(false);
                          setForm(cat);
                        }}
                        className="flex items-center gap-1 rounded-lg bg-white/[0.04] hover:bg-[#ec297b]/10 hover:text-[#ec297b] px-2.5 py-1.5 text-[11px] font-semibold text-white/40 transition-all"
                      >
                        <Pencil className="size-3" />
                        Sửa
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(cat.id)}
                        className="flex items-center gap-1 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 px-2 py-1.5 text-[11px] font-semibold text-white/40 transition-all"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {!loading && categories.length === 0 && !addingNew && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-12 text-center">
            <Tags className="size-10 text-white/10 mb-3" />
            <p className="text-sm text-white/30">Chưa có danh mục nào</p>
            <button
              onClick={() => {
                setAddingNew(true);
                setForm({ id: '', name: '', color: '#ec297b', description: '' });
              }}
              className="mt-3 text-xs text-[#ec297b] hover:underline font-semibold"
            >
              + Thêm danh mục đầu tiên
            </button>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
    </div>
  );
}

export default function DanhMucPage() {
  const [activeModule, setActiveModule] = useState<Module>('su-kien');
  const active = MODULES.find(m => m.id === activeModule)!;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Tags className="size-5 text-[#ec297b]" />
              Quản lý Danh mục
            </h1>
            <p className="text-xs text-white/40 mt-0.5">
              Thêm, sửa, xóa danh mục dùng trong Sự kiện, Tin tức, Hội viên và Báo cáo KH
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Module Tab Selector */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {MODULES.map(mod => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`group flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? 'border-white/15 bg-[#161b22] shadow-lg'
                    : 'border-white/[0.06] bg-[#0d1117] hover:border-white/10 hover:bg-[#161b22]/60'
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'}`}
                  style={{ backgroundColor: `${mod.color}20` }}
                >
                  <Icon className="size-5" style={{ color: mod.color }} />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}>
                    {mod.label}
                  </p>
                  {isActive && (
                    <p className="text-[10px] text-white/30 mt-0.5">Đang chỉnh sửa</p>
                  )}
                </div>
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: mod.color }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Module Panel */}
        <div className="rounded-2xl bg-[#161b22] border border-white/[0.06] p-6">
          {/* Panel Header */}
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${active.color}20` }}
            >
              <active.icon className="size-4.5" style={{ color: active.color }} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Danh mục — {active.label}
              </h2>
              <p className="text-xs text-white/40 mt-0.5">
                Các danh mục này sẽ hiển thị trong dropdown khi tạo/sửa nội dung {active.label.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Category list for active module */}
          <ModuleCategories
            key={activeModule}
            moduleId={activeModule}
            moduleLabel={active.label}
          />
        </div>

        {/* Usage Note */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.04] bg-[#161b22]/40 p-4">
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">💡 Ghi chú sử dụng</p>
            <ul className="space-y-1.5 text-xs text-white/40">
              <li>• Danh mục được lưu vào <span className="text-white/60 font-mono">localStorage</span> và tự động áp dụng vào các trang CMS tương ứng.</li>
              <li>• Màu nhãn sẽ được dùng để phân biệt trực quan khi hiển thị danh sách.</li>
              <li>• Nhấn <strong className="text-white/60">Đặt lại mặc định</strong> để khôi phục danh sách ban đầu nếu cần.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/[0.04] bg-[#161b22]/40 p-4">
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">🔗 Liên kết nhanh</p>
            <div className="grid grid-cols-2 gap-2">
              {MODULES.map(m => {
                const Icon = m.icon;
                const routeMap: Record<Module, string> = {
                  'su-kien': '/admin/su-kien',
                  'tin-tuc': '/admin/tin-tuc',
                  'hoi-vien': '/admin/hoi-vien',
                  'bao-cao': '/admin/bao-cao',
                };
                return (
                  <a
                    key={m.id}
                    href={routeMap[m.id]}
                    className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-xs font-semibold text-white/40 hover:text-white hover:border-white/10 hover:bg-white/[0.04] transition-all"
                  >
                    <Icon className="size-3.5" style={{ color: m.color }} />
                    {m.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
