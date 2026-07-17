'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Quote,
  Code, Minus, Undo, Redo, X, Loader2,
  Upload, Maximize2, Minimize2, Table, HighlighterIcon,
} from 'lucide-react';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  minHeight?: number;
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────

function ToolBtn({
  onClick, title, active = false, children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      title={title}
      className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${
        active
          ? 'bg-[#ec297b] text-white shadow-sm shadow-pink-500/30'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="h-5 w-px bg-gray-200 mx-0.5" />;
}

// ─── Link Modal ───────────────────────────────────────────────────────────────

function LinkModal({ onInsert, onClose }: { onInsert: (url: string, text: string) => void; onClose: () => void }) {
  const [url, setUrl] = useState('https://');
  const [text, setText] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl bg-white border border-gray-100 shadow-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <LinkIcon className="size-4 text-[#ec297b]" /> Chèn liên kết
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="size-4" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Văn bản hiển thị</label>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="Tên liên kết..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-mono focus:border-[#ec297b]/50 focus:outline-none focus:ring-1 focus:ring-[#ec297b]/20 transition-all" />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all">Huỷ</button>
          <button onClick={() => { onInsert(url, text); onClose(); }}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#ec297b] to-[#c2185f] py-2 text-sm font-bold text-white hover:opacity-90 transition-all">
            Chèn
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Table Modal ──────────────────────────────────────────────────────────────

function TableModal({ onInsert, onClose }: { onInsert: (rows: number, cols: number) => void; onClose: () => void }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [hover, setHover] = useState<[number, number]>([0, 0]);
  const grid = Array.from({ length: 6 }, (_, r) => Array.from({ length: 8 }, (_, c) => [r, c]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-auto rounded-2xl bg-white border border-gray-100 shadow-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Table className="size-4 text-[#ec297b]" /> Chèn bảng
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="size-4" /></button>
        </div>
        <div className="flex flex-col gap-1 mb-3">
          {grid.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map(([r, c]) => (
                <div
                  key={c}
                  onMouseEnter={() => setHover([r + 1, c + 1])}
                  onMouseLeave={() => setHover([0, 0])}
                  onClick={() => { onInsert(r + 1, c + 1); onClose(); }}
                  className={`h-6 w-6 rounded border cursor-pointer transition-all ${
                    r < hover[0] && c < hover[1]
                      ? 'bg-[#ec297b]/20 border-[#ec297b]/40'
                      : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-gray-400 font-medium">
          {hover[0] > 0 ? `${hover[0]} × ${hover[1]} bảng` : 'Di chuột để chọn kích thước'}
        </p>
      </div>
    </div>
  );
}

// ─── Main Editor ──────────────────────────────────────────────────────────────

export default function RichTextEditor({
  label, value, onChange, placeholder = 'Nhập nội dung...', minHeight = 280,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedSelRef = useRef<Range | null>(null);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});
  const [wordCount, setWordCount] = useState(0);
  const [fontSize, setFontSize] = useState('3');

  // ── Sync value → editor (one-way, only on external change) ─────────────────
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || '';
      updateCounts(el);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Save/restore selection so modals don't lose it ──────────────────────────
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) savedSelRef.current = sel.getRangeAt(0).cloneRange();
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedSelRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelRef.current);
    }
  };

  // ── execCommand wrapper ─────────────────────────────────────────────────────
  const exec = useCallback((cmd: string, arg = '') => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, arg || undefined);
    flush();
  }, []);

  const flush = () => {
    const el = editorRef.current;
    if (!el) return;
    onChange(el.innerHTML);
    updateFormats();
    updateCounts(el);
  };

  const updateFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      justifyFull: document.queryCommandState('justifyFull'),
    });
  };

  const updateCounts = (el: HTMLElement) => {
    const text = el.innerText || '';
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
  };

  // ── Heading ─────────────────────────────────────────────────────────────────
  const setHeading = (tag: string) => exec('formatBlock', tag);

  // ── Color / Highlight ───────────────────────────────────────────────────────
  const applyColor = (color: string) => exec('foreColor', color);
  const applyHighlight = (color: string) => exec('hiliteColor', color);

  // ── Link ────────────────────────────────────────────────────────────────────
  const handleInsertLink = (url: string, text: string) => {
    restoreSelection();
    if (text) {
      exec('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#ec297b;text-decoration:underline;">${text}</a>`);
    } else {
      exec('createLink', url);
    }
  };

  // ── Table ───────────────────────────────────────────────────────────────────
  const handleInsertTable = (rows: number, cols: number) => {
    restoreSelection();
    const headerRow = `<tr>${Array(cols).fill('<th style="border:1px solid #e5e7eb;padding:8px 12px;background:#f9fafb;font-weight:600;text-align:left;">Tiêu đề</th>').join('')}</tr>`;
    const dataRows = Array(rows - 1).fill(
      `<tr>${Array(cols).fill('<td style="border:1px solid #e5e7eb;padding:8px 12px;">Nội dung</td>').join('')}</tr>`
    ).join('');
    const table = `<table style="border-collapse:collapse;width:100%;margin:12px 0;"><thead>${headerRow}</thead><tbody>${dataRows}</tbody></table><p><br></p>`;
    exec('insertHTML', table);
  };

  // ── Divider ─────────────────────────────────────────────────────────────────
  const insertDivider = () => exec('insertHTML', '<hr style="border:none;border-top:2px solid #e5e7eb;margin:20px 0;" /><p><br></p>');

  // ── Image upload ────────────────────────────────────────────────────────────
  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      restoreSelection();
      exec('insertHTML', `<img src="${data.url}" alt="" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0;" /><p><br></p>`);
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ── Drag & drop image ───────────────────────────────────────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) handleImageFile(file);
  };

  // ── Paste image ─────────────────────────────────────────────────────────────
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) { saveSelection(); handleImageFile(file); }
        return;
      }
    }
    // Plain text paste from clipboard — let default happen
  };

  const editorContent = (
    <div
      className={`flex flex-col bg-white overflow-hidden ${fullscreen ? 'fixed inset-0 z-50 rounded-none' : 'rounded-xl border border-gray-200 focus-within:border-[#ec297b]/50 focus-within:ring-2 focus-within:ring-[#ec297b]/10 transition-all shadow-sm'}`}
    >
      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 bg-gray-50/80 px-2 py-1.5">

        {/* Undo / Redo */}
        <ToolBtn onClick={() => exec('undo')} title="Hoàn tác (Ctrl+Z)"><Undo className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('redo')} title="Làm lại (Ctrl+Y)"><Redo className="size-3.5" /></ToolBtn>
        <Divider />

        {/* Heading group */}
        <ToolBtn onClick={() => setHeading('<h1>')} title="Tiêu đề lớn H1"><Heading1 className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => setHeading('<h2>')} title="Tiêu đề vừa H2"><Heading2 className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => setHeading('<h3>')} title="Tiêu đề nhỏ H3"><Heading3 className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => setHeading('<p>')} title="Đoạn văn thường">
          <span className="text-[10px] font-bold leading-none">¶</span>
        </ToolBtn>
        <Divider />

        {/* Font size */}
        <select
          value={fontSize}
          onChange={e => { setFontSize(e.target.value); exec('fontSize', e.target.value); }}
          className="h-7 rounded-md border border-gray-200 bg-white px-1 text-xs text-gray-600 focus:outline-none focus:border-[#ec297b]/50 cursor-pointer"
          title="Cỡ chữ"
        >
          <option value="1">Nhỏ (8pt)</option>
          <option value="2">Bình thường (10pt)</option>
          <option value="3">Vừa (12pt)</option>
          <option value="4">To (14pt)</option>
          <option value="5">Rất to (18pt)</option>
          <option value="6">Lớn (24pt)</option>
          <option value="7">Cực lớn (36pt)</option>
        </select>
        <Divider />

        {/* Text format */}
        <ToolBtn onClick={() => exec('bold')} title="In đậm (Ctrl+B)" active={activeFormats.bold}><Bold className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('italic')} title="In nghiêng (Ctrl+I)" active={activeFormats.italic}><Italic className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('underline')} title="Gạch chân (Ctrl+U)" active={activeFormats.underline}><Underline className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('strikeThrough')} title="Gạch ngang" active={activeFormats.strikeThrough}><Strikethrough className="size-3.5" /></ToolBtn>
        <Divider />

        {/* Color pickers */}
        <div className="relative group" title="Màu chữ">
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 transition-all">
            <span className="text-[11px] font-black" style={{ borderBottom: '2px solid #ec297b', lineHeight: 1 }}>A</span>
          </button>
          <div className="absolute left-0 top-full mt-1 hidden group-hover:flex bg-white border border-gray-100 shadow-xl rounded-xl p-2 gap-1 flex-wrap w-36 z-30">
            {['#111111','#ec297b','#ef4444','#f59e0b','#10b981','#0ea5e9','#8b5cf6','#6366f1','#ffffff'].map(c => (
              <button key={c} type="button" onMouseDown={e => { e.preventDefault(); applyColor(c); }}
                className="h-5 w-5 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: c }} title={c} />
            ))}
          </div>
        </div>

        <div className="relative group" title="Màu nền chữ">
          <button type="button" className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 transition-all">
            <HighlighterIcon className="size-3.5" />
          </button>
          <div className="absolute left-0 top-full mt-1 hidden group-hover:flex bg-white border border-gray-100 shadow-xl rounded-xl p-2 gap-1 flex-wrap w-36 z-30">
            {['#fef08a','#bbf7d0','#bae6fd','#fecaca','#e9d5ff','#fed7aa','transparent'].map(c => (
              <button key={c} type="button" onMouseDown={e => { e.preventDefault(); applyHighlight(c); }}
                className="h-5 w-5 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: c === 'transparent' ? '#fff' : c, backgroundImage: c === 'transparent' ? 'repeating-conic-gradient(#ddd 0% 25%, white 0% 50%)' : undefined }}
                title={c === 'transparent' ? 'Bỏ màu' : c} />
            ))}
          </div>
        </div>
        <Divider />

        {/* Alignment */}
        <ToolBtn onClick={() => exec('justifyLeft')} title="Căn trái" active={activeFormats.justifyLeft}><AlignLeft className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('justifyCenter')} title="Căn giữa" active={activeFormats.justifyCenter}><AlignCenter className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('justifyRight')} title="Căn phải" active={activeFormats.justifyRight}><AlignRight className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('justifyFull')} title="Căn đều" active={activeFormats.justifyFull}><AlignJustify className="size-3.5" /></ToolBtn>
        <Divider />

        {/* Lists */}
        <ToolBtn onClick={() => exec('insertUnorderedList')} title="Danh sách không thứ tự" active={activeFormats.insertUnorderedList}><List className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('insertOrderedList')} title="Danh sách có thứ tự" active={activeFormats.insertOrderedList}><ListOrdered className="size-3.5" /></ToolBtn>
        <Divider />

        {/* Block elements */}
        <ToolBtn onClick={() => exec('formatBlock', '<blockquote>')} title="Trích dẫn"><Quote className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={() => exec('formatBlock', '<pre>')} title="Khối mã (Code)"><Code className="size-3.5" /></ToolBtn>
        <ToolBtn onClick={insertDivider} title="Đường kẻ ngang"><Minus className="size-3.5" /></ToolBtn>
        <Divider />

        {/* Link */}
        <ToolBtn onClick={() => { saveSelection(); setShowLinkModal(true); }} title="Chèn liên kết"><LinkIcon className="size-3.5" /></ToolBtn>

        {/* Table */}
        <ToolBtn onClick={() => { saveSelection(); setShowTableModal(true); }} title="Chèn bảng"><Table className="size-3.5" /></ToolBtn>

        {/* Image upload */}
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); saveSelection(); fileInputRef.current?.click(); }}
          title="Chèn hình ảnh"
          disabled={uploading}
          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all disabled:opacity-40"
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin text-[#ec297b]" /> : <ImageIcon className="size-3.5" />}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
          const f = e.target.files?.[0]; if (f) handleImageFile(f);
        }} />
        <Divider />

        {/* Clear format */}
        <ToolBtn onClick={() => exec('removeFormat')} title="Xoá định dạng">
          <span className="text-[10px] font-black text-gray-400">✕</span>
        </ToolBtn>

        {/* Fullscreen toggle */}
        <button
          type="button"
          onMouseDown={e => { e.preventDefault(); setFullscreen(f => !f); }}
          title={fullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
        >
          {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
        </button>
      </div>

      {/* ── Editor Area ────────────────────────────────────────────────────── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={flush}
        onKeyUp={updateFormats}
        onMouseUp={updateFormats}
        onBlur={flush}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className="flex-1 overflow-y-auto px-5 py-4 text-sm text-gray-800 leading-relaxed focus:outline-none"
        style={{
          minHeight: fullscreen ? 'calc(100vh - 100px)' : minHeight,
          // Prose-like styles applied via global CSS below
        }}
      />

      {/* ── Status Bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/60 px-4 py-1.5">
        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
          <span>{wordCount} từ</span>
          {uploading && (
            <span className="flex items-center gap-1 text-[#ec297b]">
              <Loader2 className="size-3 animate-spin" /> Đang tải ảnh...
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-300">
          <span>Ctrl+B Đậm</span>
          <span>·</span>
          <span>Ctrl+I Nghiêng</span>
          <span>·</span>
          <span>Kéo thả / Dán ảnh trực tiếp</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable] h1 { font-size: 1.75rem; font-weight: 800; margin: 1rem 0 0.5rem; color: #111; }
        [contenteditable] h2 { font-size: 1.375rem; font-weight: 700; margin: 0.875rem 0 0.5rem; color: #1f2937; }
        [contenteditable] h3 { font-size: 1.125rem; font-weight: 700; margin: 0.75rem 0 0.375rem; color: #374151; }
        [contenteditable] p  { margin: 0.25rem 0; }
        [contenteditable] blockquote {
          border-left: 4px solid #ec297b; padding: 0.5rem 1rem;
          margin: 0.75rem 0; background: #fdf2f8; color: #6b7280;
          border-radius: 0 8px 8px 0; font-style: italic;
        }
        [contenteditable] pre {
          background: #1e293b; color: #e2e8f0; padding: 1rem;
          border-radius: 8px; font-family: monospace; font-size: 0.8rem;
          overflow-x: auto; margin: 0.75rem 0;
        }
        [contenteditable] ul { list-style: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        [contenteditable] ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5rem 0; }
        [contenteditable] li { margin: 0.2rem 0; }
        [contenteditable] a  { color: #ec297b; text-decoration: underline; }
        [contenteditable] table { border-collapse: collapse; width: 100%; margin: 0.75rem 0; }
        [contenteditable] th, [contenteditable] td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
        [contenteditable] th { background: #f9fafb; font-weight: 600; }
        [contenteditable] hr { border: none; border-top: 2px solid #e5e7eb; margin: 1rem 0; }
        [contenteditable] img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; }
      `}</style>

      <div className="space-y-1.5 w-full">
        {label && (
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
        )}
        {editorContent}
      </div>

      {/* Drag-over indicator when fullscreen */}
      {showLinkModal && <LinkModal onInsert={handleInsertLink} onClose={() => setShowLinkModal(false)} />}
      {showTableModal && <TableModal onInsert={handleInsertTable} onClose={() => setShowTableModal(false)} />}
    </>
  );
}
