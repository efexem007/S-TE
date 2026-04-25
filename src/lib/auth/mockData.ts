import { UserRole, User, CoachProfile, StudentProfile } from './types';

// Mock password hash (in production, use bcrypt)
const MOCK_PASSWORD = 'admin123';

export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@duemwework.com': {
    password: MOCK_PASSWORD,
    user: {
      id: 'admin-1',
      email: 'admin@duemwework.com',
      name: 'Site Sahibi',
      role: 'admin' as UserRole,
      avatar: undefined,
    },
  },
  'coach@duemwework.com': {
    password: MOCK_PASSWORD,
    user: {
      id: 'coach-1',
      email: 'coach@duemwework.com',
      name: 'Ahmet Koç',
      role: 'coach' as UserRole,
      avatar: undefined,
    },
  },
  'student@duemwework.com': {
    password: MOCK_PASSWORD,
    user: {
      id: 'student-1',
      email: 'student@duemwework.com',
      name: 'Elif Öğrenci',
      role: 'student' as UserRole,
      avatar: undefined,
    },
  },
};

export const MOCK_COACH_PROFILES: Record<string, CoachProfile> = {
  'coach-1': {
    id: 'coach-1',
    email: 'coach@duemwework.com',
    name: 'Ahmet Koç',
    role: 'coach',
    assignedStudents: ['student-1', 'student-2'],
    specialty: 'TYT/AYT Matematik',
    experience: 5,
  },
};

export const MOCK_STUDENT_PROFILES: Record<string, StudentProfile> = {
  'student-1': {
    id: 'student-1',
    email: 'student@duemwework.com',
    name: 'Elif Öğrenci',
    role: 'student',
    assignedCoach: 'coach-1',
    targetUniversity: 'Boğaziçi Üniversitesi',
    targetDepartment: 'Bilgisayar Mühendisliği',
    examYear: 2026,
    progress: {
      tytNet: 85,
      aytNet: 72,
      completedTopics: ['Sayı Basamakları', 'Asal Sayılar', 'Bölünebilme'],
      weeklyStudyHours: 42,
    },
  },
  'student-2': {
    id: 'student-2',
    email: 'student2@duemwework.com',
    name: 'Can Yılmaz',
    role: 'student',
    assignedCoach: 'coach-1',
    targetUniversity: 'ODTÜ',
    targetDepartment: 'Endüstri Mühendisliği',
    examYear: 2026,
    progress: {
      tytNet: 78,
      aytNet: 65,
      completedTopics: ['Paragraf', 'Cümlede Anlam'],
      weeklyStudyHours: 35,
    },
  },
};

export function verifyMockLogin(email: string, password: string, role: UserRole): User | null {
  const record = MOCK_USERS[email];
  if (!record) return null;
  if (record.password !== password) return null;
  if (record.user.role !== role) return null;
  return record.user;
}

export function getStudentProfile(userId: string): StudentProfile | null {
  return MOCK_STUDENT_PROFILES[userId] || null;
}

export function getCoachProfile(userId: string): CoachProfile | null {
  return MOCK_COACH_PROFILES[userId] || null;
}

export function getAllStudents(): StudentProfile[] {
  return Object.values(MOCK_STUDENT_PROFILES);
}

export function getAllCoaches(): CoachProfile[] {
  return Object.values(MOCK_COACH_PROFILES);
}

export function getStudentsByCoach(coachId: string): StudentProfile[] {
  return Object.values(MOCK_STUDENT_PROFILES).filter(
    (s) => s.assignedCoach === coachId
  );
}
