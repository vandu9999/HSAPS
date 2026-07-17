'use client';

import { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  recommendedSize: string;
}

export default function ImageUploadField({ label, value, onChange, recommendedSize }: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn tệp hình ảnh hợp lệ (png, jpg, jpeg, webp)');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Lỗi tải ảnh lên server');
      }

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Lỗi kết nối mạng, vui lòng thử lại');
    } finally {
      setUploading(false);
    }
  };

  const triggerSelect = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  const removeImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
      
      <div className="rounded-xl bg-[#161b22] border border-white/10 p-4 transition-all flex flex-col items-center justify-center min-h-[160px] relative">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center justify-center py-6 text-white/40 gap-2">
            <Loader2 className="size-6 animate-spin text-[#ec297b]" />
            <p className="text-xs font-semibold">Đang tải ảnh lên server...</p>
          </div>
        ) : value ? (
          <div className="w-full relative flex flex-col items-center gap-3">
            {/* Image Preview */}
            <div className="relative w-full aspect-[16/10] max-h-[180px] rounded-lg overflow-hidden border border-white/5 bg-[#0d1117]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Upload Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-all"
                title="Xóa hình ảnh"
              >
                <X className="size-3.5" />
              </button>
            </div>
            
            <button
              type="button"
              onClick={triggerSelect}
              className="text-xs font-bold text-[#ec297b] hover:underline"
            >
              Thay đổi hình ảnh khác
            </button>
          </div>
        ) : (
          <div
            onClick={triggerSelect}
            className="w-full flex flex-col items-center justify-center py-6 cursor-pointer border border-dashed border-white/10 hover:border-[#ec297b]/50 rounded-lg group transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-white/60 group-hover:bg-[#ec297b]/10 group-hover:text-[#ec297b] transition-all mb-3">
              <Upload className="size-4.5" />
            </div>
            <p className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">
              Nhấp để chọn ảnh tải lên
            </p>
            <p className="text-[10px] text-white/40 mt-1">Hỗ trợ PNG, JPG, JPEG hoặc WEBP</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-[10px] font-semibold text-red-400 mt-2 text-center">{error}</p>
        )}
      </div>
      
      {/* Recommended Size Note */}
      <p className="text-[10px] text-white/40 leading-normal italic">
        * Kích thước khuyến nghị: <span className="font-semibold text-white/60">{recommendedSize}</span>
      </p>
    </div>
  );
}
