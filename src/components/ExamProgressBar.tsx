import React from 'react';
import { CheckCircle2, Award } from 'lucide-react';

interface Props {
  examCode: string;
  examTitle: string;
  mcCompleted: number;
  mcTotal: number;
  mcCorrect: number;
  essayCompleted: number;
  essayTotal: number;
  currentScore: number;
  className?: string;
}

export const ExamProgressBar: React.FC<Props> = ({
  examCode,
  examTitle,
  mcCompleted,
  mcTotal,
  mcCorrect,
  essayCompleted,
  essayTotal,
  currentScore,
  className = '',
}) => {
  const totalQuestions = mcTotal + essayTotal;
  const completedQuestions = mcCompleted + essayCompleted;
  const percent = totalQuestions > 0 ? Math.min(100, Math.round((completedQuestions / totalQuestions) * 100)) : 0;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
            {examCode}
          </span>
          <span className="text-xs font-semibold text-slate-800 truncate">
            Tiến độ hoàn thành:
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-slate-600">
            Trắc nghiệm: <strong className="text-slate-900">{mcCompleted}/{mcTotal}</strong>
            {mcCompleted > 0 && <span className="text-emerald-600 font-semibold ml-1">({mcCorrect} đúng)</span>}
          </div>
          <div className="text-slate-600">
            Tự luận: <strong className="text-slate-900">{essayCompleted}/{essayTotal}</strong>
          </div>
          <div className="text-blue-700 font-bold bg-blue-50/70 px-2 py-0.5 rounded-md border border-blue-100 font-mono">
            {currentScore.toFixed(2)} / 10.0 đ
          </div>
        </div>
      </div>

      {/* Progress Bar with smooth fill */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>{completedQuestions} / {totalQuestions} câu hỏi đã giải</span>
          <span className="font-mono font-bold text-blue-600">{percent}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              percent === 100
                ? 'bg-emerald-500'
                : percent > 0
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                : 'bg-slate-200'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
