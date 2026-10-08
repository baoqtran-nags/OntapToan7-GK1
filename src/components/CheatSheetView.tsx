import React, { useState } from 'react';
import { CHEAT_SHEET_DATA } from '../data/cheatSheetData';
import { Search, BookMarked, Check, Copy } from 'lucide-react';

export const CheatSheetView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const filteredChapters = CHEAT_SHEET_DATA.filter((c) => {
    if (selectedChapter !== 'all' && c.chapter !== selectedChapter) return false;
    return true;
  }).map((c) => {
    const matchingItems = c.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.note.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...c, items: matchingItems };
  }).filter((c) => c.items.length > 0);

  const handleCopy = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Sổ Tay Công Thức & Kiến Thức Trọng Tâm Giữa Kỳ I
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tổng hợp toàn bộ quy tắc, công thức tính toán và định lý hình học cần nhớ theo GDPT 2018.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          {/* Chapter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedChapter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                selectedChapter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả các chương
            </button>
            <button
              onClick={() => setSelectedChapter('Chương 1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                selectedChapter === 'Chương 1'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Chương 1: Số hữu tỉ
            </button>
            <button
              onClick={() => setSelectedChapter('Chương 2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                selectedChapter === 'Chương 2'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Chương 2: Số thực & Làm tròn
            </button>
            <button
              onClick={() => setSelectedChapter('Chương 4')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                selectedChapter === 'Chương 4'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Chương 4: Góc & Song song
            </button>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[240px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm công thức, định lý..."
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Chapters list */}
      <div className="space-y-6">
        {filteredChapters.map((chap, cIdx) => (
          <div key={cIdx} className="space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-base sm:text-lg">
              <BookMarked size={20} className="text-blue-600" />
              <span>{chap.chapter}: {chap.title}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chap.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.name}
                    </div>

                    {/* Formula highlighted block */}
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-blue-700 flex items-center justify-between group">
                      <span className="font-semibold">{item.formula}</span>
                      <button
                        onClick={() => handleCopy(item.formula)}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Sao chép công thức"
                      >
                        {copiedFormula === item.formula ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.note}
                    </p>
                  </div>

                  {item.example && (
                    <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 font-mono">
                      <span className="text-slate-400 font-sans">Ví dụ: </span>
                      {item.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredChapters.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">
              Không tìm thấy công thức nào phù hợp với từ khóa &quot;{searchTerm}&quot;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
