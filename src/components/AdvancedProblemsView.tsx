import React, { useState } from 'react';
import { ADVANCED_PROBLEMS, DRIVE_FOLDER_URL } from '../data/advancedTopics';
import { MathText } from './MathText';
import { Sparkles, ExternalLink, Lightbulb, CheckCircle2, ChevronDown, ChevronUp, Bot, BookOpen } from 'lucide-react';

interface Props {
  onOpenAITutor: (context: string, title: string) => void;
}

export const AdvancedProblemsView: React.FC<Props> = ({ onOpenAITutor }) => {
  const [expandedId, setExpandedId] = useState<string | null>('adv-1');
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleHint = (id: string) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Banner with Google Drive Link */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-5 sm:p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full">
              Chuyên Đề Nâng Cao
            </span>
            <span className="text-xs text-blue-200">Chinh phục Điểm 9 - 10</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Tuyển Tập Dạng Bài Vận Dụng Cao Giữa Kỳ I
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Các chuyên đề trọng điểm: Dãy phân số quy luật sai phân, so sánh lũy thừa số mũ lớn,
            giá trị tuyệt đối, bài toán góc zích-zắc kẻ đường phụ song song và cực trị phân số.
          </p>
        </div>

        <a
          href={DRIVE_FOLDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 group"
        >
          <BookOpen size={16} className="text-blue-600" />
          <span>Mở Thư Mục Tài Liệu Drive</span>
          <ExternalLink size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* List of Advanced Problems */}
      <div className="space-y-4">
        {ADVANCED_PROBLEMS.map((prob) => {
          const isExpanded = expandedId === prob.id;
          const showHint = revealedHints[prob.id];

          return (
            <div
              key={prob.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Problem Card Header */}
              <div
                onClick={() => toggleExpand(prob.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {prob.category}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                      {prob.difficulty}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {prob.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAITutor(
                        `Đề bài nâng cao: ${prob.title}\nNội dung: ${prob.problemText}`,
                        prob.title
                      );
                    }}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                    title="Hỏi trợ lý AI về bài này"
                  >
                    <Bot size={18} />
                  </button>
                  <div className="p-1 text-slate-400">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-5">
                  {/* Problem statement */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 leading-relaxed">
                    <MathText content={prob.problemText} />
                  </div>

                  {/* Hints */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleHint(prob.id)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors"
                    >
                      <Lightbulb size={15} className="text-amber-500" />
                      {showHint ? 'Ẩn gợi ý định hướng' : 'Xem gợi ý định hướng cách làm'}
                    </button>
                    {showHint && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 space-y-1">
                        {prob.hints.map((h, hIdx) => (
                          <div key={hIdx} className="leading-relaxed">
                            • <MathText content={h} inline />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Full Solution */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Lời Giải Chi Tiết:
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {prob.solution.map((sol, solIdx) => (
                        <div key={solIdx}>
                          <MathText content={sol} inline />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Golden Takeaways */}
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 text-xs sm:text-sm text-blue-950">
                    <div className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles size={15} className="text-blue-600" />
                      Bí quyết / Phương pháp cốt lõi:
                    </div>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      {prob.takeaways.map((t, tIdx) => (
                        <li key={tIdx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
