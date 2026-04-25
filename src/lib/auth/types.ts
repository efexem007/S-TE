export type UserRole = 'admin' | 'coach' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface CoachProfile extends User {
  role: 'coach';
  assignedStudents: string[];
  specialty: string;
  experience: number;
  // wwakademi-style
  university: string;
  ranking: number;
  universityYear: number;
  quota: number;
  quotaFilled: boolean;
  rating: number; // 1-5, miletakademi puanlama
  totalSessions: number;
  bio: string;
}

export interface ExamResult {
  name: string;
  date: string;
  tytNet: number;
  aytNet: number;
  subjectNets: Record<string, number>;
}

export interface DailyTask {
  id: string;
  subject: string;
  topic: string;
  done: boolean;
  date: string;
}

export interface TopicProgress {
  subject: string;
  topic: string;
  status: 'not-started' | 'in-progress' | 'done' | 'mastered';
  lastStudied?: string;
}

export interface StudentProfile extends User {
  role: 'student';
  assignedCoach: string | null;
  targetUniversity: string;
  targetDepartment: string;
  examYear: number;
  progress: {
    tytNet: number;
    aytNet: number;
    completedTopics: string[];
    weeklyStudyHours: number;
  };
  // miletakademi-style portal data
  examHistory: ExamResult[];
  topicProgress: TopicProgress[];
  dailyTasks: DailyTask[];
  streakDays: number;
  packageType: 'basic' | 'pro' | 'enterprise';
  startDate: string;
  notes: string[];
}

export interface AdminProfile extends User {
  role: 'admin';
}

export interface Session {
  id: string;
  coachId: string;
  studentId: string;
  date: string;
  duration: number;
  type: 'Birebir Görüşme' | 'TYT Değerlendirme' | 'AYT Değerlendirme' | 'Motivasyon Seansı' | 'Konu Anlatımı';
  status: 'onaylandı' | 'bekliyor' | 'tamamlandı' | 'iptal';
  notes?: string;
}

export interface CoachRating {
  studentId: string;
  coachId: string;
  week: string;
  rating: number;
  comment?: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone?: string;
  targetExam: 'YKS' | 'LGS';
  grade: string;
  packageType: 'basic' | 'pro' | 'enterprise';
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
