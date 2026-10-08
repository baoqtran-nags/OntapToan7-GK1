import React, { useState, useEffect } from 'react';
import { Exam, MultipleChoiceQuestion, EssayQuestion, EssaySubQuestion } from '../types/math';
import { GeometryDiagram } from './GeometryDiagram';
import { MathText } from './MathText';
import { ExamProgressBar } from './ExamProgressBar';
import { loadAllProgress, saveExamProgress } from '../utils/progressStorage';
import { addOrUpdateWrongQuestion, markQuestionResolved } from '../utils/wrongQuestionsStorage';
import { CheckCircle2, XCircle, HelpCircle, Sparkles, ChevronRight, ChevronLeft, Award, Eye, AlertTriangle, AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  exam: Exam;
  onOpenAITutor: (context: string, title: string) => void;
  onProgressChange?: () => void;
  onWrongQuestionsChange?: () => void;
}

export const InteractivePractice: React.FC<Props> = ({ 
  exam, 
  onOpenAITutor, 
  onProgressChange,
  onWrongQuestionsChange,
}) => {
  const [activeSection, setActiveSection] = useState<'mc' | 'essay'>('mc');
  const [currentMcIndex, setCurrentMcIndex] = useState(0);
  const [currentEssayIndex, setCurrentEssayIndex] = useState(0);

  // Load initial progress from localStorage
  const initialProg = loadAllProgress()[exam.id] || {
    examId: exam.id,
    mcAnswers: {},
    mcChecked: {},
    essayScores: {},
    essayCompleted: {},
    essayNotes: {},
    lastUpdated: '',
  };

  const [mcSelectedAnswers, setMcSelectedAnswers] = useState<Record<string, number>>(initialProg.mcAnswers || {});
  const [mcChecked, setMcChecked] = useState<Record<string, boolean>>(initialProg.mcChecked || {});
  const [essayRevealed, setEssayRevealed] = useState<Record<string, boolean>>(initialProg.essayCompleted || {});
  const [essayScores, setEssayScores] = useState<Record<string, number>>(initialProg.essayScores || {});
  const [essayStudentNotes, setEssayStudentNotes] = useState<Record<string, string>>(initialProg.essayNotes || {});

  // Reset/sync state when exam changes
  useEffect(() => {
    const prog = loadAllProgress()[exam.id] || {
      examId: exam.id,
      mcAnswers: {},
      mcChecked: {},
      essayScores: {},
      essayCompleted: {},
      essayNotes: {},
      lastUpdated: '',
    };
    setMcSelectedAnswers(prog.mcAnswers || {});
    setMcChecked(prog.mcChecked || {});
    setEssayRevealed(prog.essayCompleted || {});
    setEssayScores(prog.essayScores || {});
    setEssayStudentNotes(prog.essayNotes || {});
    setCurrentMcIndex(0);
    setCurrentEssayIndex(0);
  }, [exam.id]);

  // Persist progress changes
  const persistProgress = (
    updatedMcAnswers = mcSelectedAnswers,
    updatedMcChecked = mcChecked,
    updatedEssayScores = essayScores,
    updatedEssayCompleted = essayRevealed,
    updatedEssayNotes = essayStudentNotes
  ) => {
    saveExamProgress(exam.id, {
      mcAnswers: updatedMcAnswers,
      mcChecked: updatedMcChecked,
      essayScores: updatedEssayScores,
      essayCompleted: updatedEssayCompleted,
      essayNotes: updatedEssayNotes,
    });
    if (onProgressChange) onProgressChange();
  };

  const currentMc: MultipleChoiceQuestion = exam.multipleChoice[currentMcIndex];
  const currentEssay: EssayQuestion = exam.essay[currentEssayIndex];

  const handleSelectOption = (qId: string, optionIndex: number) => {
    const updatedAnswers = { ...mcSelectedAnswers, [qId]: optionIndex };
    const updatedChecked = { ...mcChecked, [qId]: true };
    setMcSelectedAnswers(updatedAnswers);
    setMcChecked(updatedChecked);
    persistProgress(updatedAnswers, updatedChecked, essayScores, essayRevealed, essayStudentNotes);

    const isCorrect = optionIndex === currentMc.correctAnswer;
    if (!isCorrect) {
      addOrUpdateWrongQuestion({
        id: currentMc.id,
        examId: exam.id,
        examCode: exam.code,
        examTitle: exam.title,
        type: 'mc',
        number: currentMc.number,
        question: currentMc.question,
        options: currentMc.options,
        userAnswer: optionIndex,
        correctAnswer: currentMc.correctAnswer,
        correctAnswerText: `${['A', 'B', 'C', 'D'][currentMc.correctAnswer]}. ${currentMc.options[currentMc.correctAnswer]}`,
        explanation: currentMc.explanation,
        topic: currentMc.topic,
        diagram: currentMc.diagram,
      });
    } else {
      markQuestionResolved(currentMc.id);
    }
    if (onWrongQuestionsChange) onWrongQuestionsChange();
  };

  const handleCheckMc = (qId: string) => {
    const selected = mcSelectedAnswers[qId];
    if (selected !== undefined) {
      handleSelectOption(qId, selected);
    }
  };

  const handleRetryMc = (qId: string) => {
    const updatedChecked = { ...mcChecked, [qId]: false };
    setMcChecked(updatedChecked);
    persistProgress(mcSelectedAnswers, updatedChecked, essayScores, essayRevealed, essayStudentNotes);
  };

  const toggleEssayReveal = (subId: string) => {
    const updated = { ...essayRevealed, [subId]: !essayRevealed[subId] };
    setEssayRevealed(updated);
    persistProgress(mcSelectedAnswers, mcChecked, essayScores, updated, essayStudentNotes);
  };

  const setSelfScore = (sub: EssaySubQuestion, essayNumber: number, essayTopic: string, score: number) => {
    const updatedScores = { ...essayScores, [sub.id]: score };
    const updatedCompleted = { ...essayRevealed, [sub.id]: true };
    setEssayScores(updatedScores);
    setEssayRevealed(updatedCompleted);
    persistProgress(mcSelectedAnswers, mcChecked, updatedScores, updatedCompleted, essayStudentNotes);

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
        userAnswer: essayStudentNotes[sub.id] || `Đạt ${score}/${sub.points} đ`,
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

  const handleQuickCheckEssay = (sub: EssaySubQuestion, essayNumber: number, essayTopic: string, inputAnswer: string) => {
    const norm = (s: string) => s.toLowerCase().replace(/\s+/g, '').replace(/,/g, '.');
    const cleanedInput = norm(inputAnswer || '');
    const cleanedAns = norm(sub.finalAnswer || '');
    const isExact = cleanedInput.length > 0 && (cleanedInput === cleanedAns || cleanedAns.includes(cleanedInput));

    const updatedRevealed = { ...essayRevealed, [sub.id]: true };
    setEssayRevealed(updatedRevealed);

    if (isExact) {
      setSelfScore(sub, essayNumber, essayTopic, sub.points);
    } else {
      persistProgress(mcSelectedAnswers, mcChecked, essayScores, updatedRevealed, essayStudentNotes);
    }
  };

  const handleNoteChange = (subId: string, note: string) => {
    const updated = { ...essayStudentNotes, [subId]: note };
    setEssayStudentNotes(updated);
    persistProgress(mcSelectedAnswers, mcChecked, essayScores, essayRevealed, updated);
  };

  // Calculations for summary stats
  const totalMcAttempted = Object.keys(mcChecked).filter((k) => mcChecked[k]).length;
  const totalMcCorrect = exam.multipleChoice.filter(
    (q) => mcChecked[q.id] && mcSelectedAnswers[q.id] === q.correctAnswer
  ).length;
  const currentMcScore = +(totalMcCorrect * 0.25).toFixed(2);

  const totalEssaySubQuestions = exam.essay.reduce((acc, q) => acc + q.subQuestions.length, 0);
  const totalEssayCompleted = Object.keys(essayRevealed).filter(
    (k) => essayRevealed[k] || essayScores[k] !== undefined
  ).length;
  const totalEssaySelfScore = +Object.values(essayScores).reduce((a, b) => a + b, 0).toFixed(2);
  const totalExamScore = +(currentMcScore + totalEssaySelfScore).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Real-time Exam Progress Bar */}
      <ExamProgressBar
        examCode={exam.code}
        examTitle={exam.title}
        mcCompleted={totalMcAttempted}
        mcTotal={exam.multipleChoice.length}
        mcCorrect={totalMcCorrect}
        essayCompleted={totalEssayCompleted}
        essayTotal={totalEssaySubQuestions}
        currentScore={totalExamScore}
      />

      {/* Top Banner & Section Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-600 tracking-wider uppercase mb-1">
              Chế độ Luyện Tập Từng Câu (Interactive)
            </div>
            <h2 className="text-xl font-bold text-slate-900">{exam.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{exam.description}</p>
          </div>

          {/* Quick Score Counter */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <div className="text-[11px] text-slate-500 font-medium">Điểm Trắc nghiệm</div>
              <div className="text-sm font-bold text-blue-600">
                {currentMcScore} <span className="text-xs text-slate-400 font-normal">/ 2.0 đ</span>
              </div>
            </div>
            <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <div className="text-[11px] text-slate-500 font-medium">Điểm Tự luận</div>
              <div className="text-sm font-bold text-emerald-600">
                {totalEssaySelfScore.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ 8.0 đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveSection('mc')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeSection === 'mc'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Phần I: Trắc nghiệm (8 câu - 2,0 đ)</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-white/20">
              {totalMcCorrect}/{exam.multipleChoice.length}
            </span>
          </button>
          <button
            onClick={() => setActiveSection('essay')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeSection === 'essay'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Phần II: Tự luận (5 bài - 8,0 đ)</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          PHẦN I: TRẮC NGHIỆM
         ======================================================== */}
      {activeSection === 'mc' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          {/* Question Navigator */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {exam.multipleChoice.map((q, idx) => {
                const isAnswered = mcChecked[q.id];
                const isCorrect = isAnswered && mcSelectedAnswers[q.id] === q.correctAnswer;
                const isCurrent = idx === currentMcIndex;

                let badgeClass = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
                if (isAnswered) {
                  badgeClass = isCorrect
                    ? 'bg-emerald-500 text-white'
                    : 'bg-red-500 text-white';
                }
                if (isCurrent) {
                  badgeClass += ' ring-2 ring-blue-500 ring-offset-2';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentMcIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shrink-0 ${badgeClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMcIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentMcIndex === 0}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-semibold text-slate-600">
                {currentMcIndex + 1} / {exam.multipleChoice.length}
              </span>
              <button
                onClick={() => setCurrentMcIndex((prev) => Math.min(exam.multipleChoice.length - 1, prev + 1))}
                disabled={currentMcIndex === exam.multipleChoice.length - 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md mr-2">
                  Câu {currentMc.number}
                </span>
                <span className="text-xs font-medium text-slate-400">0,25 điểm</span>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mt-2 leading-relaxed">
                  <MathText content={currentMc.question} inline />
                </h3>
              </div>

              <button
                onClick={() =>
                  onOpenAITutor(
                    `Câu hỏi trắc nghiệm: ${currentMc.question}\nCác lựa chọn:\nA. ${currentMc.options[0]}\nB. ${currentMc.options[1]}\nC. ${currentMc.options[2]}\nD. ${currentMc.options[3]}`,
                    `Câu ${currentMc.number}: ${currentMc.question}`
                  )
                }
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Sparkles size={14} className="text-amber-600" />
                Hỏi Trợ Lý AI
              </button>
            </div>

            {/* Diagram if available */}
            {currentMc.diagram && <GeometryDiagram config={currentMc.diagram} />}

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentMc.options.map((opt, idx) => {
                const label = ['A', 'B', 'C', 'D'][idx];
                const isSelected = mcSelectedAnswers[currentMc.id] === idx;
                const isChecked = mcChecked[currentMc.id];
                const isCorrect = idx === currentMc.correctAnswer;

                let optionStyle = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/30';
                if (isSelected && !isChecked) {
                  optionStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-xs';
                }
                if (isChecked) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-red-500 bg-red-50 text-red-900';
                  } else {
                    optionStyle = 'opacity-60 border-slate-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isChecked}
                    onClick={() => handleSelectOption(currentMc.id, idx)}
                    className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center gap-3 ${optionStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
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
                    {isChecked && isCorrect && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                    {isChecked && isSelected && !isCorrect && (
                      <XCircle size={18} className="text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Check button */}
            {!mcChecked[currentMc.id] && (
              <div className="pt-2 flex justify-end">
                <button
                  disabled={mcSelectedAnswers[currentMc.id] === undefined}
                  onClick={() => handleCheckMc(currentMc.id)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Kiểm tra đáp án
                </button>
              </div>
            )}

            {/* Feedback & Step-by-Step Explanation */}
            {mcChecked[currentMc.id] && (
              <div
                className={`p-4 rounded-xl border mt-4 ${
                  mcSelectedAnswers[currentMc.id] === currentMc.correctAnswer
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                  {mcSelectedAnswers[currentMc.id] === currentMc.correctAnswer ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald-600" />
                      <span className="text-emerald-900">Chính xác! (+0,25 điểm)</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-red-600" />
                      <div className="text-amber-900">
                        Chưa chính xác! Đáp án đúng là:{' '}
                        <strong className="text-blue-700">
                          {['A', 'B', 'C', 'D'][currentMc.correctAnswer]}. <MathText content={currentMc.options[currentMc.correctAnswer]} inline />
                        </strong>
                      </div>
                    </>
                  )}
                </div>

                {mcSelectedAnswers[currentMc.id] !== currentMc.correctAnswer && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center justify-between gap-2 mb-2">
                    <span className="flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-rose-600 shrink-0" />
                      Đã lưu câu này vào <strong>&quot;Các câu hỏi cần luyện tập lại&quot;</strong>.
                    </span>
                    <button
                      onClick={() => handleRetryMc(currentMc.id)}
                      className="px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded font-semibold transition-colors flex items-center gap-1 shrink-0"
                    >
                      <RotateCcw size={12} /> Thử chọn lại
                    </button>
                  </div>
                )}

                <div className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed pl-6 border-l-2 border-blue-400">
                  <div className="font-semibold text-slate-900 mb-1">Lời giải chi tiết:</div>
                  <MathText content={currentMc.explanation} />
                </div>

                {/* Next button */}
                {currentMcIndex < exam.multipleChoice.length - 1 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setCurrentMcIndex((prev) => prev + 1)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                    >
                      Câu tiếp theo <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          PHẦN II: TỰ LUẬN
         ======================================================== */}
      {activeSection === 'essay' && (
        <div className="space-y-6">
          {/* Question tabs (Bài 1..5) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {exam.essay.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentEssayIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  idx === currentEssayIndex
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Bài {q.number} ({q.totalPoints.toFixed(1)} đ)
              </button>
            ))}
          </div>

          {/* Current Essay Problem Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{currentEssay.title}</h3>
                <span className="text-xs text-slate-500 font-medium">
                  Tổng điểm: {currentEssay.totalPoints.toFixed(1)} điểm
                </span>
              </div>

              <button
                onClick={() =>
                  onOpenAITutor(
                    `Nội dung bài tự luận: ${currentEssay.title}\nCác câu hỏi:\n${currentEssay.subQuestions
                      .map((sub) => `${sub.label}) ${sub.question}`)
                      .join('\n')}`,
                    currentEssay.title
                  )
                }
                className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Sparkles size={14} className="text-amber-600" />
                Hỏi Trợ Lý Giảng Giải
              </button>
            </div>

            {/* Geometry diagram if exists for the overall essay question */}
            {currentEssay.diagram && <GeometryDiagram config={currentEssay.diagram} />}

            {/* Sub-questions list */}
            <div className="space-y-6">
              {currentEssay.subQuestions.map((sub: EssaySubQuestion) => {
                const isRevealed = essayRevealed[sub.id];
                const studentNote = essayStudentNotes[sub.id] || '';
                const myScore = essayScores[sub.id];

                return (
                  <div key={sub.id} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                            {sub.label}
                          </span>
                          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                            {sub.points.toFixed(2)} điểm
                          </span>
                        </div>
                        <div className="text-sm sm:text-base font-medium text-slate-900 pt-1">
                          <MathText content={sub.question} />
                        </div>
                      </div>

                      <button
                        onClick={() => toggleEssayReveal(sub.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shrink-0 ${
                          isRevealed
                            ? 'bg-slate-200 text-slate-800'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Eye size={14} />
                        {isRevealed ? 'Ẩn Lời Giải' : 'Xem Lời Giải & Barem'}
                      </button>
                    </div>

                    {/* Student scratchpad / work note with Instant Check */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-700">
                          Nhập kết quả bài làm để kiểm tra ngay:
                        </label>
                        {myScore !== undefined && (
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            myScore === sub.points
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {myScore === sub.points
                              ? 'Đã đạt điểm tối đa (+ ' + sub.points + ' đ)'
                              : 'Đã lưu vào câu cần luyện lại'}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={studentNote}
                          onChange={(e) => handleNoteChange(sub.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleQuickCheckEssay(sub, currentEssay.number, currentEssay.topic, studentNote);
                            }
                          }}
                          placeholder="Ví dụ: x = -5/21, hoặc 1/2, a // b..."
                          className="flex-1 text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleQuickCheckEssay(sub, currentEssay.number, currentEssay.topic, studentNote)}
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1"
                          title="Bấm để kiểm tra câu trả lời ngay"
                        >
                          <Sparkles size={13} className="text-amber-300" />
                          <span>Kiểm tra ngay</span>
                        </button>
                      </div>
                    </div>

                    {/* Detailed Rubric & Step-by-Step Solution when revealed */}
                    {isRevealed && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                        {/* Final Answer Callout */}
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-emerald-900 font-semibold">Đáp số chuẩn:</span>
                          <span className="font-mono font-bold text-emerald-800 text-sm sm:text-base bg-white px-2.5 py-0.5 rounded-md border border-emerald-200">
                            <MathText content={sub.finalAnswer} inline />
                          </span>
                        </div>

                        {/* Step-by-Step Breakdown */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Các bước trình bày chi tiết:
                          </div>
                          <ol className="space-y-1.5 list-decimal list-inside text-xs sm:text-sm text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200">
                            {sub.stepByStepSolution.map((step, sIdx) => (
                              <li key={sIdx} className="leading-relaxed pl-1">
                                <MathText content={step} inline />
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Official Grading Rubric (Barem điểm) */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                            Barem chấm điểm chuẩn:
                          </div>
                          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs">
                            {sub.rubric.map((r, rIdx) => (
                              <div key={rIdx} className="p-2.5 flex items-center justify-between">
                                <span className="text-slate-700">
                                  <MathText content={r.step} inline />
                                </span>
                                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md shrink-0 ml-2">
                                  +{r.points.toFixed(2)} đ
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Common Mistakes Warning */}
                        {sub.commonMistakes && sub.commonMistakes.length > 0 && (
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-xs">
                            <div className="font-bold text-amber-900 flex items-center gap-1.5">
                              <AlertTriangle size={14} className="text-amber-600" />
                              Lưu ý tránh sai lầm thường gặp:
                            </div>
                            <ul className="list-disc list-inside text-amber-800 space-y-0.5 pl-1">
                              {sub.commonMistakes.map((m, mIdx) => (
                                <li key={mIdx}>{m}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Self-Assessment buttons */}
                        <div className="p-3 bg-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="text-xs font-semibold text-slate-700">
                            Tự chấm điểm phần bài làm của em:
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setSelfScore(sub, currentEssay.number, currentEssay.topic, 0)}
                              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${
                                myScore === 0
                                  ? 'bg-red-600 text-white'
                                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              0 đ
                            </button>
                            <button
                              onClick={() => setSelfScore(sub, currentEssay.number, currentEssay.topic, +(sub.points / 2).toFixed(2))}
                              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${
                                myScore === +(sub.points / 2).toFixed(2)
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              +{(sub.points / 2).toFixed(2)} đ (1 nửa)
                            </button>
                            <button
                              onClick={() => setSelfScore(sub, currentEssay.number, currentEssay.topic, sub.points)}
                              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-colors ${
                                myScore === sub.points
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              +{sub.points.toFixed(2)} đ (Tối đa)
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
        </div>
      )}
    </div>
  );
};
