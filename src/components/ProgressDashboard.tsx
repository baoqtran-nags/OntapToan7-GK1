import React from 'react';
import { EXAMS_DATA } from '../data/examsData';
import { AllExamsProgress } from '../utils/progressStorage';
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Sparkles,
  PieChart,
  BookOpen,
  AlertCircle
} from 'lucide-react';

interface Props {
  progress: AllExamsProgress;
  onSelectExam: (examId: string) => void;
  onResetProgress: () => void;
  wrongCount?: number;
  onNavigateToReview?: () => void;
}

export const ProgressDashboard: React.FC<Props> = ({
  progress,
  onSelectExam,
  onResetProgress,
  wrongCount = 0,
  onNavigateToReview,
}) => {
  // Aggregate calculations
  let totalQuestionsCount = 0;
  let totalCompletedQuestions = 0;
  let totalPossibleScore = 0;
  let totalEarnedScore = 0;
  let completedExamsCount = 0;

  // Topic metrics
  const topicStats: Record<string, { total: number; completed: number; correct: number }> = {
    SoHuuTi: { total: 0, completed: 0, correct: 0 },
    SoThuc: { total: 0, completed: 0, correct: 0 },
    HinhHoc: { total: 0, completed: 0, correct: 0 },
    ThucTe: { total: 0, completed: 0, correct: 0 },
  };

  const examDetails = EXAMS_DATA.map((exam) => {
    const examProg = progress[exam.id] || {
      examId: exam.id,
      mcAnswers: {},
      mcChecked: {},
      essayScores: {},
      essayCompleted: {},
      essayNotes: {},
      lastUpdated: '',
    };

    const mcTotal = exam.multipleChoice.length;
    const mcCompletedCount = Object.keys(examProg.mcChecked || {}).filter(
      (k) => examProg.mcChecked[k]
    ).length;
    const mcCorrectCount = exam.multipleChoice.filter(
      (q) => examProg.mcChecked[q.id] && examProg.mcAnswers[q.id] === q.correctAnswer
    ).length;
    const mcScore = +(mcCorrectCount * 0.25).toFixed(2);

    // Count essay subquestions
    let essaySubTotal = 0;
    let essaySubCompleted = 0;
    let essayScore = 0;

    exam.essay.forEach((essayQ) => {
      essayQ.subQuestions.forEach((sub) => {
        essaySubTotal++;
        if (examProg.essayCompleted[sub.id] || (examProg.essayScores[sub.id] !== undefined)) {
          essaySubCompleted++;
        }
        if (examProg.essayScores[sub.id] !== undefined) {
          essayScore += examProg.essayScores[sub.id];
        }
      });
    });

    essayScore = +essayScore.toFixed(2);
    const totalExamQuestions = mcTotal + essaySubTotal;
    const completedExamQuestions = mcCompletedCount + essaySubCompleted;
    const percent = Math.min(100, Math.round((completedExamQuestions / totalExamQuestions) * 100));
    const totalScore = +(mcScore + essayScore).toFixed(2);

    if (percent === 100) completedExamsCount++;

    totalQuestionsCount += totalExamQuestions;
    totalCompletedQuestions += completedExamQuestions;
    totalPossibleScore += 10.0;
    totalEarnedScore += totalScore;

    // Track topic stats
    exam.multipleChoice.forEach((q) => {
      if (topicStats[q.topic]) {
        topicStats[q.topic].total++;
        if (examProg.mcChecked[q.id]) {
          topicStats[q.topic].completed++;
          if (examProg.mcAnswers[q.id] === q.correctAnswer) {
            topicStats[q.topic].correct++;
          }
        }
      }
    });

    exam.essay.forEach((eq) => {
      if (topicStats[eq.topic]) {
        eq.subQuestions.forEach((sub) => {
          topicStats[eq.topic].total++;
          if (examProg.essayCompleted[sub.id] || examProg.essayScores[sub.id] !== undefined) {
            topicStats[eq.topic].completed++;
          }
        });
      }
    });

    return {
      exam,
      mcTotal,
      mcCompletedCount,
      mcCorrectCount,
      mcScore,
      essaySubTotal,
      essaySubCompleted,
      essayScore,
      totalExamQuestions,
      completedExamQuestions,
      percent,
      totalScore,
    };
  });

  const overallPercent = totalQuestionsCount > 0
    ? Math.round((totalCompletedQuestions / totalQuestionsCount) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Overview Metric Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <TrendingUp size={14} />
              Bảng Tiến Độ Học Tập Cá Nhân
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Tổng Quan Quá Trình Ôn Luyện Toán 7
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hệ thống tự động lưu trữ tiến độ làm bài, câu đúng/sai và điểm số tự đánh giá theo từng đề.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={onResetProgress}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition-all flex items-center gap-1.5"
              title="Xóa toàn bộ lịch sử tiến độ để ôn lại từ đầu"
            >
              <RotateCcw size={14} />
              Đặt lại tiến độ
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Tiến độ tổng thể</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
              {overallPercent}%
            </div>
            <div className="text-[11px] text-slate-500">
              {totalCompletedQuestions} / {totalQuestionsCount} câu hỏi
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Đề đã hoàn thành 100%</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {completedExamsCount} <span className="text-sm font-normal text-slate-400">/ 6 đề</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {6 - completedExamsCount} đề đang tiếp tục
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Tổng điểm tích lũy</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              {totalEarnedScore.toFixed(1)} <span className="text-sm font-normal text-slate-400">/ 60.0 đ</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Thang 10 điểm mỗi đề
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs text-slate-500 font-medium">Độ chính xác trắc nghiệm</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
              {examDetails.reduce((a, b) => a + b.mcCompletedCount, 0) > 0
                ? `${Math.round(
                    (examDetails.reduce((a, b) => a + b.mcCorrectCount, 0) /
                      examDetails.reduce((a, b) => a + b.mcCompletedCount, 0)) *
                      100
                  )}%`
                : '0%'}
            </div>
            <div className="text-[11px] text-slate-500">
              {examDetails.reduce((a, b) => a + b.mcCorrectCount, 0)} câu đúng
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700">Mức độ hoàn thành toàn bộ chương trình ôn tập:</span>
            <span className="text-blue-600 font-mono font-bold">{overallPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Review Banner Card for Wrong Questions */}
      <div className={`rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
        wrongCount > 0
          ? 'bg-gradient-to-r from-rose-50 to-orange-50/60 border-rose-200 shadow-xs'
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
            wrongCount > 0 ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
          }`}>
            <AlertCircle size={22} />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-base">
                Các Câu Hỏi Cần Luyện Tập Lại
              </h3>
              {wrongCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold font-mono">
                  {wrongCount} câu cần khắc phục
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  Hoàn hảo
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              {wrongCount > 0
                ? `Hệ thống đã tự động gom ${wrongCount} câu hỏi em làm chưa chính xác ở các chế độ để em rèn luyện lại cho đến khi thành thạo.`
                : 'Tất cả các câu đã làm đều chính xác hoặc em đã khắc phục hết các lỗi sai. Tuyệt vời!'}
            </p>
          </div>
        </div>

        {onNavigateToReview && (
          <button
            onClick={onNavigateToReview}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-xs ${
              wrongCount > 0
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>{wrongCount > 0 ? 'Luyện tập lại ngay' : 'Xem sổ tay câu sai'}</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* Progress Cards Per Exam (6 Bộ Đề) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
            <BookOpen size={18} className="text-blue-600" />
            Chi Tiết Tiến Độ Từng Bộ Đề Thi
          </h3>
          <span className="text-xs text-slate-500">Bao gồm 3 đề mẫu chuẩn & 3 đề mới</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examDetails.map((item) => {
            const isCompleted = item.percent === 100;
            const isStarted = item.percent > 0;

            return (
              <div
                key={item.exam.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-mono font-extrabold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                          {item.exam.code}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            item.exam.type === 'sample'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-indigo-50 text-indigo-700'
                          }`}
                        >
                          {item.exam.type === 'sample' ? 'Đề Mẫu' : 'Biên Soạn Mới'}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                        {item.exam.title}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-extrabold text-blue-600 font-mono">
                        {item.percent}%
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar for this Exam */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isStarted
                          ? 'bg-blue-600'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>

                  {/* Metrics breakdown */}
                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Trắc nghiệm:</span>
                      <span className="font-semibold text-slate-900">
                        {item.mcCompletedCount}/{item.mcTotal} câu{' '}
                        {item.mcCompletedCount > 0 && (
                          <span className="text-emerald-600 font-normal">
                            ({item.mcCorrectCount} đúng)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tự luận:</span>
                      <span className="font-semibold text-slate-900">
                        {item.essaySubCompleted}/{item.essaySubTotal} ý bài
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-slate-800">
                      <span className="font-semibold">Điểm tạm tính:</span>
                      <span className="font-bold text-blue-600 font-mono">
                        {item.totalScore.toFixed(2)} / 10.0 đ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectExam(item.exam.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : isStarted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={15} />
                      Xem lại đề thi này
                    </>
                  ) : isStarted ? (
                    <>
                      Tiếp tục làm bài ({item.percent}%)
                      <ArrowRight size={14} />
                    </>
                  ) : (
                    <>
                      Bắt đầu làm đề này
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Mastery Radar / Category Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <PieChart size={18} className="text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Mức Độ Nắm Vững Theo Chuyên Đề Ma Trận
            </h3>
          </div>
          <span className="text-xs text-slate-500">Chuẩn GDPT 2018</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Chương 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-xs text-slate-700">
              Chương 1: Số hữu tỉ
            </div>
            <div className="text-lg font-bold text-blue-600">
              {topicStats.SoHuuTi.total > 0
                ? Math.round((topicStats.SoHuuTi.completed / topicStats.SoHuuTi.total) * 100)
                : 0}
              %
            </div>
            <div className="text-[11px] text-slate-500">
              Đã làm {topicStats.SoHuuTi.completed}/{topicStats.SoHuuTi.total} câu
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${
                    topicStats.SoHuuTi.total > 0
                      ? (topicStats.SoHuuTi.completed / topicStats.SoHuuTi.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Chương 2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-xs text-slate-700">
              Chương 2: Số thực & Làm tròn
            </div>
            <div className="text-lg font-bold text-emerald-600">
              {topicStats.SoThuc.total > 0
                ? Math.round((topicStats.SoThuc.completed / topicStats.SoThuc.total) * 100)
                : 0}
              %
            </div>
            <div className="text-[11px] text-slate-500">
              Đã làm {topicStats.SoThuc.completed}/{topicStats.SoThuc.total} câu
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{
                  width: `${
                    topicStats.SoThuc.total > 0
                      ? (topicStats.SoThuc.completed / topicStats.SoThuc.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Chương 4 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-xs text-slate-700">
              Chương 4: Góc & Song song
            </div>
            <div className="text-lg font-bold text-indigo-600">
              {topicStats.HinhHoc.total > 0
                ? Math.round((topicStats.HinhHoc.completed / topicStats.HinhHoc.total) * 100)
                : 0}
              %
            </div>
            <div className="text-[11px] text-slate-500">
              Đã làm {topicStats.HinhHoc.completed}/{topicStats.HinhHoc.total} câu
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{
                  width: `${
                    topicStats.HinhHoc.total > 0
                      ? (topicStats.HinhHoc.completed / topicStats.HinhHoc.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Bài toán thực tế */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-semibold text-xs text-slate-700">
              Bài toán thực tế (1,0 đ)
            </div>
            <div className="text-lg font-bold text-amber-600">
              {topicStats.ThucTe.total > 0
                ? Math.round((topicStats.ThucTe.completed / topicStats.ThucTe.total) * 100)
                : 0}
              %
            </div>
            <div className="text-[11px] text-slate-500">
              Đã làm {topicStats.ThucTe.completed}/{topicStats.ThucTe.total} bài
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{
                  width: `${
                    topicStats.ThucTe.total > 0
                      ? (topicStats.ThucTe.completed / topicStats.ThucTe.total) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
