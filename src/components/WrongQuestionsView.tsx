import React, { useState } from 'react';
import { WrongQuestionItem, removeWrongQuestion, markQuestionResolved, clearAllWrongQuestions } from '../utils/wrongQuestionsStorage';
import { MathText } from './MathText';
import { GeometryDiagram } from './GeometryDiagram';
import { 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Trash2, 
  Sparkles, 
  Bot, 
  Check, 
  XCircle, 
  Filter, 
  BookOpen, 
  ChevronRight 
} from 'lucide-react';

interface Props {
  items: WrongQuestionItem[];
  onRefresh: () => void;
  onOpenAITutor: (context: string, title: string) => void;
}

export const WrongQuestionsView: React.FC<Props> = ({ items, onRefresh, onOpenAITutor }) => {
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'mc' | 'essay'>('all');
  const [retryAnswers, setRetryAnswers] = useState<Record<string, number>>({});
  const [retryChecked, setRetryChecked] = useState<Record<string, boolean>>({});
  const [essayRetryInputs, setEssayRetryInputs] = useState<Record<string, string>>({});
  const [essayRetryRevealed, setEssayRetryRevealed] = useState<Record<string, boolean>>({});

  const filteredItems = items.filter((item) => {
    if (selectedExamFilter !== 'all' && item.examId !== selectedExamFilter) return false;
    if (selectedTypeFilter !== 'all' && item.type !== selectedTypeFilter) return false;
    return true;
  });

  const pendingCount = items.filter((i) => !i.resolved).length;
  const resolvedCount = items.filter((i) => i.resolved).length;

  const handleSelectRetryOption = (itemId: string, optIdx: number) => {
    setRetryAnswers((prev) => ({ ...prev, [itemId]: optIdx }));
  };

  const handleCheckRetry = (item: WrongQuestionItem) => {
    const selected = retryAnswers[item.id];
    setRetryChecked((prev) => ({ ...prev, [item.id]: true }));

    if (selected === Number(item.correctAnswer)) {
      markQuestionResolved(item.id);
      onRefresh();
    }
  };

  const handleResolveEssay = (itemId: string) => {
    markQuestionResolved(itemId);
    onRefresh();
  };

  const handleRemove = (id: string) => {
    removeWrongQuestion(id);
    onRefresh();
  };

  const handleClearAll = () => {
    if (window.confirm('Em có chắc chắn muốn xóa tất cả câu hỏi trong danh sách Các câu hỏi cần luyện tập lại?')) {
      clearAllWrongQuestions();
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <AlertCircle size={14} />
              Sổ Tay Khắc Phục Lỗi Sai Tự Động
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Các Câu Hỏi Cần Luyện Tập Lại
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hệ thống tự động tập hợp tất cả các câu làm chưa chính xác ở các chế độ (Luyện tập từng câu & Thi thử tính giờ). Em có thể làm lại ngay dưới đây cho đến khi đạt điểm 10 trọn vẹn!
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {items.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} />
                Xóa tất cả
              </button>
            )}
          </div>
        </div>

        {/* Counter & Filter pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">
              Chưa khắc phục: <strong className="text-rose-600 font-mono text-sm">{pendingCount}</strong> câu
            </span>
            <span>·</span>
            <span className="text-xs font-semibold text-slate-700">
              Đã sửa đúng: <strong className="text-emerald-600 font-mono text-sm">{resolvedCount}</strong> câu
            </span>
          </div>

          {/* Type & Exam Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Type selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedTypeFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedTypeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả loại
              </button>
              <button
                onClick={() => setSelectedTypeFilter('mc')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedTypeFilter === 'mc' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Trắc nghiệm
              </button>
              <button
                onClick={() => setSelectedTypeFilter('essay')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedTypeFilter === 'essay' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tự luận
              </button>
            </div>

            {/* Exam selector */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {['all', 'de-1', 'de-2', 'de-3', 'de-4', 'de-5', 'de-6'].map((id) => {
                const label = id === 'all' ? 'Tất cả đề' : id.replace('de-', 'Đề 0');
                const countForId = id === 'all' ? items.length : items.filter((i) => i.examId === id).length;

                if (id !== 'all' && countForId === 0) return null;

                return (
                  <button
                    key={id}
                    onClick={() => setSelectedExamFilter(id)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                      selectedExamFilter === id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {label} ({countForId})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isRetrySelected = retryAnswers[item.id] !== undefined;
          const isRetryChecked = retryChecked[item.id];
          const isRetryCorrect = retryAnswers[item.id] === Number(item.correctAnswer);
          const isEssayRevealed = essayRetryRevealed[item.id];

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs space-y-4 transition-all ${
                item.resolved
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                    {item.examCode}
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {item.type === 'mc' ? `Câu ${item.number} (Trắc nghiệm)` : `Bài ${item.number}${item.label ? ` (${item.label})` : ''} (Tự luận)`}
                  </span>
                  {item.resolved ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      Đã khắc phục thành công!
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <AlertCircle size={13} />
                      Cần luyện lại
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      onOpenAITutor(
                        `Em đang làm lại câu hỏi này trong phần Các câu hỏi cần luyện tập lại:\n${item.question}\nĐáp án đúng là: ${item.correctAnswerText}\nLời giải: ${item.explanation}`,
                        `${item.examCode} - ${item.type === 'mc' ? `Câu ${item.number}` : `Bài ${item.number}`}`
                      )
                    }
                    className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    title="Nhờ Gia Sư AI giải thích câu này"
                  >
                    <Bot size={15} />
                    <span className="hidden sm:inline">Hỏi AI</span>
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Xóa câu này khỏi danh sách"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                <MathText content={item.question} />
              </div>

              {/* Diagram if available */}
              {item.diagram && <GeometryDiagram config={item.diagram} />}

              {/* Multiple Choice interactive retry options */}
              {item.type === 'mc' && item.options && (
                <div className="space-y-3 pt-1">
                  <div className="text-xs font-semibold text-slate-600">
                    Chọn lại đáp án đúng:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.options.map((opt, optIdx) => {
                      const label = ['A', 'B', 'C', 'D'][optIdx];
                      const isSelected = retryAnswers[item.id] === optIdx;
                      const isCorrectOpt = optIdx === Number(item.correctAnswer);

                      let btnStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/20';
                      if (isSelected && !isRetryChecked) {
                        btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold';
                      }
                      if (isRetryChecked) {
                        if (isCorrectOpt) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isSelected && !isCorrectOpt) {
                          btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                        } else {
                          btnStyle = 'opacity-50 border-slate-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isRetryChecked}
                          onClick={() => handleSelectRetryOption(item.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-center gap-2.5 transition-all ${btnStyle}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {label}
                          </span>
                          <span className="flex-1">
                            <MathText content={opt} inline />
                          </span>
                          {isRetryChecked && isCorrectOpt && (
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          )}
                          {isRetryChecked && isSelected && !isCorrectOpt && (
                            <XCircle size={16} className="text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Retry action buttons */}
                  {!isRetryChecked ? (
                    <div className="flex justify-end pt-1">
                      <button
                        disabled={!isRetrySelected}
                        onClick={() => handleCheckRetry(item)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check size={14} />
                        Kiểm tra câu trả lời
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <div className="font-semibold">
                        {isRetryCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 size={15} /> Tuyệt vời! Em đã sửa đúng câu này.
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <XCircle size={15} /> Vẫn chưa đúng, hãy đọc kỹ lời giải bên dưới nhé.
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          setRetryChecked((prev) => ({ ...prev, [item.id]: false }));
                          setRetryAnswers((prev) => {
                            const copy = { ...prev };
                            delete copy[item.id];
                            return copy;
                          });
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCcw size={12} /> Thử lại lần nữa
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Essay interactive retry section */}
              {item.type === 'essay' && (
                <div className="space-y-3 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Làm lại bài tự luận / Nhập kết quả rút gọn của em:
                    </label>
                    <input
                      type="text"
                      value={essayRetryInputs[item.id] || ''}
                      onChange={(e) => setEssayRetryInputs((prev) => ({ ...prev, [item.id]: e.target.value }))}
                      placeholder="Nhập đáp số hoặc lời giải tóm tắt của em..."
                      className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() =>
                        setEssayRetryRevealed((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                      }
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen size={14} />
                      {isEssayRevealed ? 'Ẩn đáp số chuẩn' : 'Đối chiếu đáp số & lời giải'}
                    </button>

                    <button
                      onClick={() => handleResolveEssay(item.id)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                        item.resolved
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <CheckCircle2 size={14} />
                      {item.resolved ? 'Đã đánh dấu hoàn thành' : 'Em đã hiểu và làm đúng'}
                    </button>
                  </div>

                  {isEssayRevealed && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm flex items-center justify-between">
                      <span className="font-semibold text-emerald-900">Đáp số chuẩn:</span>
                      <span className="font-mono font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded border border-emerald-200">
                        <MathText content={item.correctAnswerText} inline />
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Explanation */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-700">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-blue-600" />
                  Đáp án chuẩn & Lời giải chi tiết:
                </div>
                <div className="text-slate-800 leading-relaxed pl-5 border-l-2 border-blue-400">
                  <MathText content={item.explanation} />
                </div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Tuyệt Vời! Không Có Câu Hỏi Nào Cần Luyện Lại
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Em chưa làm sai câu hỏi nào (hoặc đã khắc phục hết các lỗi sai). Hãy tiếp tục thử sức với các bộ đề thi khác để đạt điểm 10 trọn vẹn nhé!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
