import React from 'react';
import { ExamModeType } from '../types/math';
import { EXAMS_DATA } from '../data/examsData';
import { AllExamsProgress } from '../utils/progressStorage';
import { BookOpen, GraduationCap, Sparkles, FileText, Bot, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  currentMode: ExamModeType;
  onChangeMode: (mode: ExamModeType) => void;
  selectedExamId: string;
  onSelectExam: (examId: string) => void;
  onToggleAITutor: () => void;
  progress: AllExamsProgress;
  wrongCount?: number;
}

export const Navbar: React.FC<Props> = ({
  currentMode,
  onChangeMode,
  selectedExamId,
  onSelectExam,
  onToggleAITutor,
  progress,
  wrongCount = 0,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main top bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & App title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight flex items-center gap-2">
                Toán 7 GDPT 2018
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  Giữa Kỳ I
                </span>
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                Ứng dụng ôn tập & thi thử thông minh chuẩn ma trận 10 điểm
              </div>
            </div>
          </div>

          {/* Right side: AI Tutor Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onToggleAITutor}
              className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Bot size={17} />
              <span>Gia Sư AI</span>
              <Sparkles size={14} className="text-amber-300 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation: Mode Switcher & Exam Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-t border-slate-100 gap-3">
          {/* Main Mode Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => onChangeMode('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                currentMode === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp size={15} />
              Bảng Tiến Độ
            </button>
            <button
              onClick={() => onChangeMode('practice')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                currentMode === 'practice'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText size={15} />
              Luyện Tập Từng Câu
            </button>
            <button
              onClick={() => onChangeMode('exam')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                currentMode === 'exam'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <GraduationCap size={15} />
              Thi Thử Tính Giờ
            </button>
            <button
              onClick={() => onChangeMode('review')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                currentMode === 'review'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <AlertCircle size={15} className={currentMode === 'review' ? 'text-white' : 'text-rose-500'} />
              <span>Câu Cần Luyện Lại</span>
              {wrongCount > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                    currentMode === 'review' ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {wrongCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onChangeMode('advanced')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                currentMode === 'advanced'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles size={15} className="text-amber-500" />
              Điểm 9 - 10 Nâng Cao
            </button>
            <button
              onClick={() => onChangeMode('cheatsheet')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 ${
                currentMode === 'cheatsheet'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen size={15} />
              Sổ Tay Công Thức
            </button>
          </div>

          {/* Exam Selector Pill dropdown or buttons (when in practice or exam mode) */}
          {(currentMode === 'practice' || currentMode === 'exam') && (
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-xs font-medium text-slate-500 shrink-0">Chọn đề:</span>
              <div className="flex items-center gap-1">
                {EXAMS_DATA.map((exam) => {
                  const isSelected = exam.id === selectedExamId;
                  const isSample = exam.type === 'sample';
                  const p = progress[exam.id];

                  // Calculate quick completion percent
                  let comp = 0;
                  if (p) {
                    const mcDone = Object.keys(p.mcChecked || {}).filter((k) => p.mcChecked[k]).length;
                    const essayDone = Object.keys(p.essayCompleted || {}).filter(
                      (k) => p.essayCompleted[k] || (p.essayScores && p.essayScores[k] !== undefined)
                    ).length;
                    const totalQ = exam.multipleChoice.length + exam.essay.reduce((acc, q) => acc + q.subQuestions.length, 0);
                    comp = Math.min(100, Math.round(((mcDone + essayDone) / totalQ) * 100));
                  }

                  return (
                    <button
                      key={exam.id}
                      onClick={() => onSelectExam(exam.id)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-xs'
                          : isSample
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                      title={exam.title}
                    >
                      <span>
                        {exam.code}
                        {isSample ? ' (Mẫu)' : ' (Mới)'}
                      </span>
                      {comp > 0 && (
                        <span
                          className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                            comp === 100
                              ? 'bg-emerald-500 text-white'
                              : isSelected
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {comp}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

