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
}

export interface AdminProfile extends User {
  role: 'admin';
}
