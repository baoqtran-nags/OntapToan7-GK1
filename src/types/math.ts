export type ExamModeType = 'dashboard' | 'practice' | 'exam' | 'review' | 'advanced' | 'cheatsheet';

export interface DiagramConfig {
  type: 'intersecting_lines' | 'parallel_perpendicular' | 'parallel_transversal' | 'adjacent_supplementary' | 'zigzag_angle' | 'triangle_angle';
  title?: string;
  labels?: Record<string, string>;
  angles?: Record<string, number | string>;
  customData?: any;
}

export interface MultipleChoiceQuestion {
  id: string;
  number: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  points: number; // 0.25
  topic: 'SoHuuTi' | 'SoThuc' | 'HinhHoc';
  diagram?: DiagramConfig;
}

export interface EssaySubQuestion {
  id: string;
  label: string; // "a", "b", "c"
  question: string;
  points: number;
  finalAnswer: string;
  stepByStepSolution: string[];
  rubric: { step: string; points: number }[];
  commonMistakes?: string[];
  keyConcept?: string;
}

export interface EssayQuestion {
  id: string;
  number: number; // 1, 2, 3, 4, 5
  title: string;
  totalPoints: number;
  topic: 'SoHuuTi' | 'SoThuc' | 'HinhHoc' | 'ThucTe';
  diagram?: DiagramConfig;
  subQuestions: EssaySubQuestion[];
}

export interface Exam {
  id: string;
  title: string;
  code: string;
  type: 'sample' | 'reference';
  description: string;
  durationMinutes: number; // usually 60 or 90
  multipleChoice: MultipleChoiceQuestion[];
  essay: EssayQuestion[];
}

export interface AdvancedProblem {
  id: string;
  title: string;
  category: 'Phân số quy luật' | 'So sánh lũy thừa' | 'Giá trị tuyệt đối' | 'Hình học kẻ đường phụ' | 'Cực trị phân số';
  difficulty: 'Vận dụng cao' | 'Điểm 9 - 10';
  problemText: string;
  hints: string[];
  solution: string[];
  takeaways: string[];
  diagram?: DiagramConfig;
}

export interface FormulaTopic {
  chapter: string;
  title: string;
  items: {
    name: string;
    formula: string;
    note: string;
    example?: string;
  }[];
}
