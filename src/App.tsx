import React, { useState } from 'react';
import { ExamModeType } from './types/math';
import { EXAMS_DATA } from './data/examsData';
import { Navbar } from './components/Navbar';
import { InteractivePractice } from './components/InteractivePractice';
import { ExamMode } from './components/ExamMode';
import { AdvancedProblemsView } from './components/AdvancedProblemsView';
import { CheatSheetView } from './components/CheatSheetView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { WrongQuestionsView } from './components/WrongQuestionsView';
import { AITutorDrawer } from './components/AITutorDrawer';
import { loadAllProgress, clearAllProgress, AllExamsProgress } from './utils/progressStorage';
import { loadWrongQuestions, WrongQuestionItem } from './utils/wrongQuestionsStorage';
import { CheckCircle2, BookOpen, Sparkles, GraduationCap, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ExamModeType>('dashboard');
  const [selectedExamId, setSelectedExamId] = useState<string>('de-1');
  const [progress, setProgress] = useState<AllExamsProgress>(loadAllProgress());
  const [wrongQuestions, setWrongQuestions] = useState<WrongQuestionItem[]>(loadWrongQuestions());

  // AI Tutor drawer state
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<string>('');
  const [tutorTitle, setTutorTitle] = useState<string>('');

  const currentExam = EXAMS_DATA.find((e) => e.id === selectedExamId) || EXAMS_DATA[0];

  const handleOpenAITutor = (context: string, title: string) => {
    setTutorContext(context);
    setTutorTitle(title);
    setIsAITutorOpen(true);
  };

  const refreshProgress = () => {
    setProgress(loadAllProgress());
  };

  const refreshWrongQuestions = () => {
    setWrongQuestions(loadWrongQuestions());
  };

  const handleResetProgress = () => {
    if (window.confirm('Em có chắc chắn muốn đặt lại toàn bộ tiến độ làm bài của 6 bộ đề không? Lịch sử điểm số sẽ được làm mới.')) {
      clearAllProgress();
      setProgress({});
    }
  };

  const unresolvedWrongCount = wrongQuestions.filter((q) => !q.resolved).length;

  // Quick total completed count for banner
  let totalAnsweredCount = 0;
  let totalPossibleCount = 0;
  EXAMS_DATA.forEach((ex) => {
    totalPossibleCount += ex.multipleChoice.length + ex.essay.reduce((acc, q) => acc + q.subQuestions.length, 0);
    const p = progress[ex.id];
    if (p) {
      totalAnsweredCount += Object.keys(p.mcChecked || {}).filter((k) => p.mcChecked[k]).length;
      totalAnsweredCount += Object.keys(p.essayCompleted || {}).filter(
        (k) => p.essayCompleted[k] || (p.essayScores && p.essayScores[k] !== undefined)
      ).length;
    }
  });

  const overallPercent = totalPossibleCount > 0
    ? Math.round((totalAnsweredCount / totalPossibleCount) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentMode={currentMode}
        onChangeMode={setCurrentMode}
        selectedExamId={selectedExamId}
        onSelectExam={(id) => {
          setSelectedExamId(id);
          if (currentMode === 'dashboard') {
            setCurrentMode('practice');
          }
        }}
        onToggleAITutor={() => {
          setTutorContext('Chung: Ôn tập Toán 7 Giữa học kỳ I GDPT 2018');
          setTutorTitle('Trợ lý giảng giải');
          setIsAITutorOpen((prev) => !prev);
        }}
        progress={progress}
        wrongCount={unresolvedWrongCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Intro Welcome Card */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                <span>CHƯƠNG TRÌNH GDPT 2018</span>
                <span aria-hidden="true">·</span>
                <span>TOÁN 7 - GIỮA HỌC KỲ I</span>
                <span aria-hidden="true">·</span>
                <span>THANG ĐIỂM 10,0</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Hệ Thống Ôn Tập & Thi Thử Toán Lớp 7 Thông Minh
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bao gồm trọn vẹn 3 đề mẫu chuẩn ma trận (Đề 1, 2, 3) và 3 đề biên soạn mới bám sát
                (Đề 4, 5, 6). Kiểm tra câu trả lời ngay sau mỗi câu làm bài ở tất cả các chế độ, tự động tập hợp câu sai vào mục &quot;Các câu hỏi cần luyện tập lại&quot;.
              </p>
            </div>

            {/* Quick stats with interactive progress link */}
            <div className="flex items-center gap-2 sm:gap-3 self-start md:self-auto shrink-0 flex-wrap">
              <button
                onClick={() => setCurrentMode('dashboard')}
                className="px-3.5 py-2.5 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 rounded-xl text-center transition-colors cursor-pointer group"
                title="Bấm để xem Dashboard tiến độ chi tiết"
              >
                <div className="text-[11px] text-blue-700 font-medium flex items-center justify-center gap-1">
                  <TrendingUp size={12} />
                  Tiến độ hoàn thành
                </div>
                <div className="text-lg font-extrabold text-blue-700 font-mono">
                  {overallPercent}%
                </div>
              </button>

              {/* Wrong Questions quick pill */}
              <button
                onClick={() => setCurrentMode('review')}
                className={`px-3.5 py-2.5 border rounded-xl text-center transition-colors cursor-pointer ${
                  unresolvedWrongCount > 0
                    ? 'bg-rose-50/80 hover:bg-rose-100/80 border-rose-200 text-rose-700'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
                title="Bấm để mở danh sách Các câu hỏi cần luyện tập lại"
              >
                <div className="text-[11px] font-medium flex items-center justify-center gap-1">
                  <AlertCircle size={12} className={unresolvedWrongCount > 0 ? 'text-rose-600' : 'text-slate-500'} />
                  Cần luyện lại
                </div>
                <div className={`text-lg font-extrabold font-mono ${unresolvedWrongCount > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {unresolvedWrongCount} <span className="text-xs font-normal text-slate-400">câu</span>
                </div>
              </button>

              <div className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <div className="text-[11px] text-slate-500 font-medium">Đã giải</div>
                <div className="text-lg font-bold text-emerald-600 font-mono">
                  {totalAnsweredCount} <span className="text-xs font-normal text-slate-400">/ {totalPossibleCount}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Mode Content */}
        {currentMode === 'dashboard' && (
          <ProgressDashboard
            progress={progress}
            wrongCount={unresolvedWrongCount}
            onNavigateToReview={() => setCurrentMode('review')}
            onSelectExam={(examId) => {
              setSelectedExamId(examId);
              setCurrentMode('practice');
            }}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentMode === 'practice' && (
          <InteractivePractice
            exam={currentExam}
            onOpenAITutor={handleOpenAITutor}
            onProgressChange={refreshProgress}
            onWrongQuestionsChange={refreshWrongQuestions}
          />
        )}

        {currentMode === 'exam' && (
          <ExamMode
            exam={currentExam}
            onOpenAITutor={handleOpenAITutor}
            onProgressChange={refreshProgress}
            onWrongQuestionsChange={refreshWrongQuestions}
          />
        )}

        {currentMode === 'review' && (
          <WrongQuestionsView
            items={wrongQuestions}
            onRefresh={() => {
              refreshWrongQuestions();
              refreshProgress();
            }}
            onOpenAITutor={handleOpenAITutor}
          />
        )}

        {currentMode === 'advanced' && (
          <AdvancedProblemsView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentMode === 'cheatsheet' && <CheatSheetView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Toán 7 GDPT 2018</span>
            <span>·</span>
            <span>Ứng dụng Ôn Tập & Khảo Sát Giữa Kỳ I</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setCurrentMode('dashboard')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Xem Bảng Tiến Độ
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentMode('review')}
              className="text-rose-600 hover:underline font-medium cursor-pointer"
            >
              Các câu hỏi cần luyện tập lại ({unresolvedWrongCount})
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentMode('cheatsheet')}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Sổ tay công thức
            </button>
          </div>
        </div>
      </footer>

      {/* Floating AI Tutor Drawer */}
      <AITutorDrawer
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        activeContext={tutorContext}
        activeQuestionTitle={tutorTitle}
      />
    </div>
  );
}
