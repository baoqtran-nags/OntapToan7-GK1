export interface ExamProgress {
  examId: string;
  mcAnswers: Record<string, number>; // questionId -> selectedOption (0..3)
  mcChecked: Record<string, boolean>; // questionId -> boolean
  essayScores: Record<string, number>; // subQuestionId -> score
  essayCompleted: Record<string, boolean>; // subQuestionId -> boolean (viewed solution or scored)
  essayNotes: Record<string, string>; // subQuestionId -> student note
  lastUpdated: string;
}

export type AllExamsProgress = Record<string, ExamProgress>;

const STORAGE_KEY = 'toan7_exams_progress_v1';

export const loadAllProgress = (): AllExamsProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return {};
  }
};

export const saveExamProgress = (
  examId: string,
  progress: Partial<ExamProgress>
): AllExamsProgress => {
  try {
    const current = loadAllProgress();
    const existing = current[examId] || {
      examId,
      mcAnswers: {},
      mcChecked: {},
      essayScores: {},
      essayCompleted: {},
      essayNotes: {},
      lastUpdated: new Date().toISOString(),
    };

    current[examId] = {
      ...existing,
      ...progress,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current;
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
    return {};
  }
};

export const clearAllProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
};
