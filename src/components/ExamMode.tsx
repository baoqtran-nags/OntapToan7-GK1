import React, { useState, useEffect } from 'react';
import { Exam, EssaySubQuestion } from '../types/math';
import { GeometryDiagram } from './GeometryDiagram';
import { MathText } from './MathText';
import { ExamProgressBar } from './ExamProgressBar';
import { saveExamProgress, loadAllProgress } from '../utils/progressStorage';
import { addOrUpdateWrongQuestion, markQuestionResolved } from '../utils/wrongQuestionsStorage';
import { Clock, CheckCircle2, AlertCircle, Award, RotateCcw, ChevronRight, BookOpen, Sparkles, XCircle } from 'lucide-react';

interface Props {
  exam: Exam;
  onOpenAITutor: (context: string, title: string) => void;
  onProgressChange?: () => void;
  onWrongQuestionsChange?: () => void;
}

export const ExamMode: React.FC<Props> = ({ 
  exam, 
  onOpenAITutor, 
  onProgressChange,
  onWrongQuestionsChange,
}) => {
  // Timer state (seconds)
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Instant Check setting (Default: true as requested by user)
  const [instantCheckMode, setInstantCheckMode] = useState<boolean>(true);
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [revealedEssaySub, setRevealedEssaySub] = useState<Record<string, boolean>>({});

  // Student answers
  const [mcAnswers, setMcAnswers] = useState<Record<string, number>>({});
  const [essayTextAnswers, setEssayTextAnswers] = useState<Record<string, string>>({});
  const [essaySubScores, setEssaySubScores] = useState<Record<string, number>>({});

  useEffect(() => {
    setTimeLeft(exam.durationMinutes * 60);
    setIsSubmitted(false);
    setIsTimerRunning(true);
    setMcAnswers({});
    setEssayTextAnswers({});
    setEssaySubScores({});
    setRevealedExplanations({});
    setRevealedEssaySub({});
  }, [exam.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectMc = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    const updated = { ...mcAnswers, [qId]: optIdx };
    setMcAnswers(updated);

    // Instant validation & wrong question recording
    const targetQ = exam.multipleChoice.find((q) => q.id === qId);
    if (targetQ) {
      const isCorrect = optIdx === targetQ.correctAnswer;
      if (!isCorrect) {
        addOrUpdateWrongQuestion({
          id: targetQ.id,
          examId: exam.id,
          examCode: exam.code,
          examTitle: exam.title,
          type: 'mc',
          number: targetQ.number,
          question: targetQ.question,
          options: targetQ.options,
          userAnswer: optIdx,
          correctAnswer: targetQ.correctAnswer,
          correctAnswerText: `${['A', 'B', 'C', 'D'][targetQ.correctAnswer]}. ${targetQ.options[targetQ.correctAnswer]}`,
          explanation: targetQ.explanation,
          topic: targetQ.topic,
          diagram: targetQ.diagram,
        });
      } else {
        markQuestionResolved(targetQ.id);
      }
      if (onWrongQuestionsChange) onWrongQuestionsChange();
    }

    saveExamProgress(exam.id, {
      mcAnswers: updated,
    });
    if (onProgressChange) onProgressChange();
  };

  const handleEssayChange = (subId: string, val: string) => {
    if (isSubmitted) return;
    setEssayTextAnswers((prev) => ({ ...prev, [subId]: val }));
  };

  const handleScoreSub = (sub: EssaySubQuestion, essayNumber: number, essayTopic: string, score: number) => {
    const updatedScores = { ...essaySubScores, [sub.id]: score };
    setEssaySubScores(updatedScores);
    saveExamProgress(exam.id, {
      essayScores: updatedScores,
    });
    if (onProgressChange) onProgressChange();

    if (score < sub.points) {
      addOrUpdateWrongQuestion({
        id: sub.id,
        examId: exam.id,
        examCode: exam.code,
        examTitle: exam.title,
        type: 'essay',
        number: essayNumber,
        label: sub.label,
        question: sub.question,
        userAnswer: essayTextAnswers[sub.id] || `Đạt ${score}/${sub.points} đ`,
        correctAnswer: sub.finalAnswer,
        correctAnswerText: sub.finalAnswer,
        explanation: sub.stepByStepSolution.join('\n'),
        topic: essayTopic,
      });
    } else {
      markQuestionResolved(sub.id);
    }
    if (onWrongQuestionsChange) onWrongQuestionsChange();
  };

  const handleSubmitExam = () => {
    if (window.confirm('Em có chắc chắn muốn nộp bài thi không? Sau khi nộp, hệ thống sẽ tổng kết bảng điểm và xếp loại.')) {
      setIsSubmitted(true);
      setIsTimerRunning(false);

      const checkedMap: Record<string, boolean> = {};
      exam.multipleChoice.forEach((q) => {
        checkedMap[q.id] = true;
      });

      saveExamProgress(exam.id, {
        mcAnswers,
        mcChecked: checkedMap,
        essayNotes: essayTextAnswers,
      });
      if (onProgressChange) onProgressChange();
    }
  };

  const handleRetake = () => {
    if (window.confirm('Em có muốn làm lại đề thi này từ đầu không?')) {
      setTimeLeft(exam.durationMinutes * 60);
      setIsSubmitted(false);
      setIsTimerRunning(true);
      setMcAnswers({});
      setEssayTextAnswers({});
      setEssaySubScores({});
    }
  };

  // Score Calculations
  const mcCorrectCount = exam.multipleChoice.filter(
    (q) => mcAnswers[q.id] === q.correctAnswer
  ).length;
  const mcTotalScore = +(mcCorrectCount * 0.25).toFixed(2);

  const totalEssaySubQuestions = exam.essay.reduce((acc, q) => acc + q.subQuestions.length, 0);
  const essayCompletedCount = Object.keys(essaySubScores).length;
  const essayTotalScore = +Object.values(essaySubScores).reduce((a, b) => a + b, 0).toFixed(2);
  const totalScore = +(mcTotalScore + essayTotalScore).toFixed(2);

  const getRank = (score: number) => {
    if (score >= 9.0) return { title: 'Xuất sắc! 🎉', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 8.0) return { title: 'Giỏi! 🌟', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (score >= 6.5) return { title: 'Khá! 👍', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (score >= 5.0) return { title: 'Đạt yêu cầu 😊', color: 'text-slate-700 bg-slate-50 border-slate-200' };
    return { title: 'Cần cố gắng ôn luyện thêm! 💪', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const rank = getRank(totalScore);

  return (
    <div className="space-y-6">
      {/* Real-time Exam Progress Bar */}
      <ExamProgressBar
        examCode={exam.code}
        examTitle={exam.title}
        mcCompleted={Object.keys(mcAnswers).length}
        mcTotal={exam.multipleChoice.length}
        mcCorrect={mcCorrectCount}
        essayCompleted={essayCompletedCount}
        essayTotal={totalEssaySubQuestions}
        currentScore={totalScore}
      />

      {/* Sticky Header Bar with Timer & Controls */}
      <div className="sticky top-2 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
            {exam.code}
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
              Chế độ Thi Thử: {exam.title}
            </h2>
            <div className="text-xs text-slate-500">
              Thời gian làm bài: {exam.durationMinutes} phút · Thang điểm: 10,0
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
          {/* Instant check toggle */}
          <div className="flex items-center gap-1.5 bg-blue-50/80 border border-blue-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="font-semibold text-blue-900 flex items-center gap-1">
              <Sparkles size={13} className="text-amber-500" />
              Kiểm tra ngay sau mỗi câu:
            </span>
            <button
              onClick={() => setInstantCheckMode((prev) => !prev)}
              className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                instantCheckMode
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-700'
              }`}
              title="Bật để xem đáp án đúng/sai và lời giải ngay khi làm từng câu"
            >
              {instantCheckMode ? 'BẬT' : 'TẮT'}
            </button>
          </div>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-bold ${
              timeLeft < 300
                ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          >
            <Clock size={16} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitExam}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Nộp Bài Thi
            </button>
          ) : (
            <button
              onClick={handleRetake}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={15} />
              Làm lại
            </button>
          )}
        </div>
      </div>

      {/* RESULT REPORT CARD (When Submitted) */}
      {isSubmitted && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Kết Quả Bài Thi
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-blue-600">
                  {totalScore}
                </span>
                <span className="text-lg text-slate-400 font-medium">/ 10,0 điểm</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${rank.color} max-w-sm`}>
              <div className="font-bold text-sm sm:text-base flex items-center gap-2">
                <Award size={18} />
                Xếp loại: {rank.title}
              </div>
              <div className="text-xs mt-1 leading-relaxed opacity-90">
                {totalScore >= 8.0
                  ? 'Em nắm rất vững kiến thức trọng tâm Số hữu tỉ, Số thực và Hình học! Tiếp tục phát huy trong đề thi thật nhé.'
                  : 'Em hãy xem kỹ lại các câu sai ở phần Lời giải chi tiết bên dưới và rèn thêm các bài toán hình học / chuyển vế nhé.'}
              </div>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase">
                Phần I: Trắc nghiệm (8 câu)
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900">
                  {mcTotalScore} <span className="text-xs text-slate-400 font-normal">/ 2,0 đ</span>
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  Đúng {mcCorrectCount}/8 câu
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase">
                Phần II: Tự luận (5 bài)
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900">
                  {essayTotalScore} <span className="text-xs text-slate-400 font-normal">/ 8,0 đ</span>
                </span>
                <span className="text-xs text-slate-500">
                  (Dựa trên tự chấm theo barem chuẩn)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          FULL EXAM CONTENT: PART I - TRẮC NGHIỆM
         ========================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            PHẦN I. TRẮC NGHIỆM KHÁCH QUAN (2,0 ĐIỂM)
          </h3>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
            8 câu · 0,25 đ/câu
          </span>
        </div>

        <div className="space-y-6">
          {exam.multipleChoice.map((q) => {
            const isCorrect = mcAnswers[q.id] === q.correctAnswer;
            const isSelected = mcAnswers[q.id] !== undefined;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                    <span className="text-blue-600 font-bold mr-2">Câu {q.number}.</span>
                    <MathText content={q.question} inline />
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 font-medium">0,25 đ</span>
                </div>

                {/* Diagram if available */}
                {q.diagram && <GeometryDiagram config={q.diagram} />}

                {/* Options 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                  {q.options.map((opt, optIdx) => {
                    const label = ['A', 'B', 'C', 'D'][optIdx];
                    const selected = mcAnswers[q.id] === optIdx;
                    const isRightOption = optIdx === q.correctAnswer;

                    let btnClass = 'border-slate-200 hover:border-blue-300';
                    if (selected && !isSubmitted && !instantCheckMode) {
                      btnClass = 'border-blue-600 bg-blue-50 font-bold text-blue-900';
                    }
                    if (isSubmitted || (isSelected && instantCheckMode)) {
                      if (isRightOption) {
                        btnClass = 'border-emerald-500 bg-emerald-100/70 font-bold text-emerald-950';
                      } else if (selected && !isRightOption) {
                        btnClass = 'border-rose-400 bg-rose-100 text-rose-900 font-bold';
                      } else {
                        btnClass = 'opacity-60 border-slate-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectMc(q.id, optIdx)}
                        className={`p-2.5 rounded-xl border text-left text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer ${btnClass}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                            selected
                              ? isSubmitted || instantCheckMode
                                ? isRightOption
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-rose-600 text-white'
                                : 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {label}
                        </span>
                        <span className="flex-1">
                          <MathText content={opt} inline />
                        </span>
                        {(isSubmitted || (isSelected && instantCheckMode)) && isRightOption && (
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                        )}
                        {(isSubmitted || (isSelected && instantCheckMode)) && selected && !isRightOption && (
                          <XCircle size={16} className="text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback right after selection */}
                {isSelected && !isSubmitted && instantCheckMode && (
                  <div className={`mt-3 p-3.5 rounded-xl border text-xs space-y-2 ${
                    isCorrect
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/80 border-rose-200 text-rose-900'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold">
                      <div className="flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 size={16} className="text-emerald-600" />
                            <span>Chính xác! (+0,25 đ)</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} className="text-rose-600" />
                            <span>
                              Chưa chính xác! Đáp án đúng là:{' '}
                              <strong className="text-blue-700">
                                {['A', 'B', 'C', 'D'][q.correctAnswer]}. <MathText content={q.options[q.correctAnswer]} inline />
                              </strong>
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!isCorrect && (
                          <span className="text-[10px] bg-rose-200/80 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                            Đã lưu vào câu cần luyện lại
                          </span>
                        )}
                        <button
                          onClick={() => setRevealedExplanations((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="text-[11px] font-semibold text-blue-700 hover:text-blue-900 underline flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen size={12} />
                          {revealedExplanations[q.id] ? 'Ẩn lời giải' : 'Xem lời giải ngay'}
                        </button>
                      </div>
                    </div>

                    {revealedExplanations[q.id] && (
                      <div className="pt-2 border-t border-slate-200/60 text-slate-800 leading-relaxed pl-4 border-l-2 border-blue-400">
                        <div className="font-semibold text-slate-900 mb-1">Lời giải chi tiết:</div>
                        <MathText content={q.explanation} />
                      </div>
                    )}
                  </div>
                )}

                {/* Post-submission solution (if not instant or after submitting) */}
                {isSubmitted && !instantCheckMode && (
                  <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700">
                    <div className="font-semibold text-slate-900 mb-0.5">
                      Đáp án đúng:{' '}
                      <span className="text-emerald-700 font-bold">
                        {['A', 'B', 'C', 'D'][q.correctAnswer]}. <MathText content={q.options[q.correctAnswer]} inline />
                      </span>
                    </div>
                    <div className="text-slate-600 mt-1">
                      <MathText content={q.explanation} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ==========================================================
          FULL EXAM CONTENT: PART II - TỰ LUẬN
         ========================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            PHẦN II. TỰ LUẬN (8,0 ĐIỂM)
          </h3>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
            5 bài
          </span>
        </div>

        <div className="space-y-8">
          {exam.essay.map((q) => (
            <div key={q.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-base">
                  {q.title}
                </h4>
                <span className="text-xs font-semibold text-slate-500">
                  {q.totalPoints.toFixed(1)} điểm
                </span>
              </div>

              {/* Diagram */}
              {q.diagram && <GeometryDiagram config={q.diagram} />}

              {/* Sub-questions */}
              <div className="space-y-4 pl-2">
                {q.subQuestions.map((sub) => {
                  const currentSubScore = essaySubScores[sub.id] || 0;

                  return (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-medium text-slate-900">
                          <span className="font-bold text-blue-600 mr-2">{sub.label})</span>
                          <MathText content={sub.question} inline />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-semibold text-slate-500">
                            ({sub.points.toFixed(2)} đ)
                          </span>
                          {!isSubmitted && (
                            <button
                              onClick={() =>
                                setRevealedEssaySub((prev) => ({ ...prev, [sub.id]: !prev[sub.id] }))
                              }
                              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                                revealedEssaySub[sub.id]
                                  ? 'bg-slate-200 text-slate-800'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                              }`}
                            >
                              <BookOpen size={13} />
                              {revealedEssaySub[sub.id] ? 'Ẩn đối chiếu' : 'Kiểm tra câu này ngay'}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Student scratch/answer box */}
                      <div>
                        <textarea
                          rows={2}
                          disabled={isSubmitted}
                          value={essayTextAnswers[sub.id] || ''}
                          onChange={(e) => handleEssayChange(sub.id, e.target.value)}
                          placeholder={
                            isSubmitted
                              ? 'Chưa nhập bài làm'
                              : 'Gõ bài làm hoặc kết quả tóm tắt của em vào đây...'
                          }
                          className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Reveal barem & self-scoring (when submitted OR when instant checked) */}
                      {(isSubmitted || revealedEssaySub[sub.id]) && (
                        <div className="mt-3 pt-3 border-t border-slate-200 space-y-3">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="font-semibold text-slate-800">Đáp số chuẩn:</span>
                            <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <MathText content={sub.finalAnswer} inline />
                            </span>
                          </div>

                          <div className="text-xs text-slate-700 space-y-1">
                            <div className="font-semibold text-slate-900">Các bước giải:</div>
                            <ul className="list-disc list-inside space-y-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                              {sub.stepByStepSolution.map((s, idx) => (
                                <li key={idx}>
                                  <MathText content={s} inline />
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Self Assessment */}
                          <div className="p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-700">
                                Chấm điểm ý này:
                              </span>
                              {essaySubScores[sub.id] !== undefined && (
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                  currentSubScore === sub.points
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}>
                                  {currentSubScore === sub.points
                                    ? 'Đã đạt trọn vẹn điểm'
                                    : 'Đã lưu vào câu cần luyện lại'}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleScoreSub(sub, q.number, q.topic, 0)}
                                className={`px-2 py-0.5 text-xs rounded font-medium cursor-pointer ${
                                  currentSubScore === 0 && essaySubScores[sub.id] !== undefined
                                    ? 'bg-rose-600 text-white font-bold'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                0 đ
                              </button>
                              <button
                                onClick={() =>
                                  handleScoreSub(sub, q.number, q.topic, +(sub.points / 2).toFixed(2))
                                }
                                className={`px-2 py-0.5 text-xs rounded font-medium cursor-pointer ${
                                  currentSubScore === +(sub.points / 2).toFixed(2) && essaySubScores[sub.id] !== undefined
                                    ? 'bg-amber-600 text-white font-bold'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                +{(sub.points / 2).toFixed(2)} đ
                              </button>
                              <button
                                onClick={() => handleScoreSub(sub, q.number, q.topic, sub.points)}
                                className={`px-2 py-0.5 text-xs rounded font-medium cursor-pointer ${
                                  currentSubScore === sub.points && essaySubScores[sub.id] !== undefined
                                    ? 'bg-emerald-600 text-white font-bold'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                +{sub.points.toFixed(2)} đ
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
