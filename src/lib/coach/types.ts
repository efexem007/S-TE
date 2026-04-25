export type CoachAgent = 'mentor' | 'tutor' | 'assessor' | 'planner' | 'general';

export interface StudentProfile {
  name: string;
  targetExam: 'tyt' | 'ayt' | 'lgs' | 'career' | 'general' | null;
  strongSubjects: string[];
  weakSubjects: string[];
  dailyStudyHours: number; // 0-12
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic' | null;
  stressLevel: 'low' | 'medium' | 'high' | null;
  goals: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TopicProgress {
  topic: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  mastery: number; // 0-100
  lastStudied: string | null;
  quizResults: QuizResult[];
}

export interface QuizResult {
  date: string;
  score: number; // 0-100
  totalQuestions: number;
  correctAnswers: number;
}

export interface CoachMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agent?: CoachAgent;
  timestamp: string;
  metadata?: {
    quizId?: string;
    programDraft?: StudyPlan;
    actionType?: 'quiz' | 'plan' | 'explain' | 'motivate' | 'solve';
  };
}

export interface StudyPlan {
  id: string;
  title: string;
  durationDays: number;
  dailyTasks: DailyTask[];
  createdAt: string;
}

export interface DailyTask {
  day: number;
  subject: string;
  topic: string;
  durationMinutes: number;
  type: 'study' | 'quiz' | 'review' | 'rest';
  completed: boolean;
}

export interface CoachState {
  profile: StudentProfile | null;
  messages: CoachMessage[];
  progress: TopicProgress[];
  currentPlan: StudyPlan | null;
  streak: number;
  lastActiveDate: string | null;
  currentAgent: CoachAgent;
  isPanelOpen: boolean;
  isFullscreen: boolean;
}

export const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  targetExam: null,
  strongSubjects: [],
  weakSubjects: [],
  dailyStudyHours: 4,
  learningStyle: null,
  stressLevel: null,
  goals: [],
  createdAt: '',
  updatedAt: '',
};
