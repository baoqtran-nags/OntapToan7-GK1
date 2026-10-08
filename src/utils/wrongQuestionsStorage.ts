import { DiagramConfig } from '../types/math';

export interface WrongQuestionItem {
  id: string; // e.g. 'de1-mc-2' or 'de1-es-2a'
  examId: string;
  examCode: string;
  examTitle: string;
  type: 'mc' | 'essay';
  number: number;
  label?: string; // for essay subquestions e.g. 'a', 'b'
  question: string;
  options?: string[];
  userAnswer: string | number;
  correctAnswer: string | number;
  correctAnswerText: string;
  explanation: string;
  topic: string;
  addedAt: string;
  resolved: boolean;
  diagram?: DiagramConfig;
}

const STORAGE_KEY = 'toan7_wrong_questions_v1';

export const loadWrongQuestions = (): WrongQuestionItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load wrong questions', e);
    return [];
  }
};

export const saveWrongQuestions = (items: WrongQuestionItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save wrong questions', e);
  }
};

export const addOrUpdateWrongQuestion = (item: Omit<WrongQuestionItem, 'addedAt' | 'resolved'>): WrongQuestionItem[] => {
  const current = loadWrongQuestions();
  const existingIndex = current.findIndex((q) => q.id === item.id);

  const newItem: WrongQuestionItem = {
    ...item,
    addedAt: new Date().toISOString(),
    resolved: false,
  };

  let updated: WrongQuestionItem[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = newItem;
  } else {
    updated = [newItem, ...current];
  }

  saveWrongQuestions(updated);
  return updated;
};

export const removeWrongQuestion = (id: string): WrongQuestionItem[] => {
  const current = loadWrongQuestions();
  const updated = current.filter((q) => q.id !== id);
  saveWrongQuestions(updated);
  return updated;
};

export const markQuestionResolved = (id: string): WrongQuestionItem[] => {
  const current = loadWrongQuestions();
  const updated = current.map((q) => (q.id === id ? { ...q, resolved: true } : q));
  saveWrongQuestions(updated);
  return updated;
};

export const clearAllWrongQuestions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear wrong questions', e);
  }
};
