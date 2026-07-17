'use client';

import { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, Heading3, RefreshCw } from 'lucide-react';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ label, value, onChange, placeholder = '' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync editor content from value prop
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (command: string, arg = '') => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">{label}</label>
      <div className="rounded-xl bg-[#0d1117] border border-white/10 overflow-hidden focus-within:border-[#ec297b]/50 focus-within:ring-1 focus-within:ring-[#ec297b]/20 transition-all flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-1 bg-[#161b22] border-b border-white/10 px-2 py-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            title="Đậm"
          >
            <Bold className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            title="Nghiêng"
          >
            <Italic className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            title="Gạch chân"
          >
            <Underline className="size-3.5" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            title="Danh sách"
          >
            <List className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h3>')}
            className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            title="Tiêu đề H3"
          >
            <Heading3 className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('removeFormat')}
            className="p-1.5 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors ml-auto"
            title="Xóa định dạng"
          >
            <RefreshCw className="size-3" />
          </button>
        </div>
        
        {/* Editor Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder}
          className="min-h-[180px] max-h-[350px] overflow-y-auto px-4 py-3 text-sm text-white focus:outline-none leading-relaxed"
          style={{ outline: 'none' }}
        />
      </div>
    </div>
  );
}
