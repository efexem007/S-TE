import { UserRole, User, CoachProfile, StudentProfile, Session, CoachRating, Application, TopicProgress } from './types';

// Mock password hash (in production, use bcrypt)
const MOCK_PASSWORD = 'admin123';

export let MOCK_USERS: Record<string, { password: string; user: User }> = {
  'mefe0055@gmail.com': {
    password: 'AsDAQ@108574',
    user: {
      id: 'admin-1',
      email: 'mefe0055@gmail.com',
      name: 'Kurucu',
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
    university: 'Dokuz Eylül Üniversitesi Tıp Fakültesi',
    ranking: 5878,
    universityYear: 2021,
    quota: 5,
    quotaFilled: true,
    rating: 4.8,
    totalSessions: 1240,
    bio: 'Dokuz Eylül Tıp Fakültesi öğrencisi. 5 yıllık YKS koçluk deneyimi. Sayısal puan türünde 5878. sıralama. Öğrencilerime analitik düşünme ve soru çözüm stratejileri kazandırmaya odaklanıyorum.',
  },
  'coach-2': {
    id: 'coach-2',
    email: 'mehmet@duemwework.com',
    name: 'Mehmet Yılmaz',
    role: 'coach',
    assignedStudents: ['student-3'],
    specialty: 'TYT Türkçe-Paragraf',
    experience: 3,
    university: 'Eskişehir Osmangazi Üniversitesi Tıp Fakültesi',
    ranking: 7605,
    universityYear: 2021,
    quota: 6,
    quotaFilled: false,
    rating: 4.6,
    totalSessions: 680,
    bio: 'Eskişehir Osmangazi Tıp Fakültesi 4. sınıf öğrencisi. Paragraf ve Türkçe konularında uzmanlaşmış, öğrencilerin netlerini ortalama +15 artırmıştır.',
  },
  'coach-3': {
    id: 'coach-3',
    email: 'zeynep@duemwework.com',
    name: 'Zeynep Kaya',
    role: 'coach',
    assignedStudents: [],
    specialty: 'AYT Fen Bilimleri',
    experience: 4,
    university: 'Dokuz Eylül Üniversitesi Tıp Fakültesi',
    ranking: 4929,
    universityYear: 2020,
    quota: 4,
    quotaFilled: false,
    rating: 4.9,
    totalSessions: 920,
    bio: 'Dokuz Eylül Tıp Fakültesi mezunu. Fizik, Kimya ve Biyoloji konularında derinlemesine bilgi. Öğrencilerime konseptüel öğrenme teknikleri öğretiyorum.',
  },
};

const commonTopics: Record<string, string[]> = {
  'Matematik': ['Sayılar', 'Bölünebilme', 'Rasyonel Sayılar', 'Basit Eşitsizlik', 'Mutlak Değer', 'Üslü Sayılar', 'Köklü Sayılar', 'Çarpanlara Ayırma', 'Oran-Orantı'],
  'Geometri': ['Doğru ve Açı', 'Üçgende Açılar', 'Özel Üçgenler', 'Dik Üçgen', 'Sinüs Kosinüs', 'Alanlar', 'Çemberde Açı'],
  'Fizik': ['Vektörler', 'Kuvvet ve Hareket', 'İş Enerji', 'Momentum', 'Basit Makineler', 'Isı ve Sıcaklık', 'Elektrostatik'],
  'Kimya': ['Atom Yapısı', 'Periyodik Sistem', 'Kimyasal Bağlar', 'Asit-Baz', 'Tuzu', 'Redoks', 'Organik Kimya'],
  'Biyoloji': ['Hücre', 'Ekosistem', 'DNA ve RNA', 'Genetik', 'Solunum Sistemi', 'Dolaşım Sistemi', 'Sindirim Sistemi'],
  'Türkçe': ['Paragraf', 'Cümlede Anlam', 'Sözcükte Anlam', 'Yazım Kuralları', 'Noktalama İşaretleri', 'Sözel Mantık'],
  'Tarih': ['Tarih Bilimi', 'İslamiyet Öncesi', 'İlk ve Orta Çağda Türk-İslam', 'Osmanlı Kuruş ve Yükselme', 'Osmanlı Duraklama ve Gerileme'],
  'Coğrafya': ['Doğa ve İnsan', 'İklim Bilgisi', 'Yer Şekilleri', 'Nüfus ve Yerleşme', 'Türkiye Coğrafyası', 'Çevre ve Toplum'],
};

function generateTopicProgress(): StudentProfile['topicProgress'] {
  const topics: StudentProfile['topicProgress'] = [];
  Object.entries(commonTopics).forEach(([subject, subjectTopics]) => {
    subjectTopics.forEach((topic, idx) => {
      const rand = Math.random();
      let status: TopicProgress['status'] = 'not-started';
      if (rand > 0.7) status = 'done';
      else if (rand > 0.4) status = 'in-progress';
      else if (rand > 0.2) status = 'mastered';
      topics.push({
        subject,
        topic,
        status,
        lastStudied: status !== 'not-started' ? `2026-04-${10 + Math.floor(Math.random() * 15)}` : undefined,
      });
    });
  });
  return topics;
}

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
      completedTopics: ['Sayı Basamakları', 'Asal Sayılar', 'Bölünebilme', 'Paragraf', 'Cümlede Anlam'],
      weeklyStudyHours: 42,
    },
    examHistory: [
      { name: 'TYT-1', date: '2026-01-15', tytNet: 65, aytNet: 0, subjectNets: { Matematik: 12, Türkçe: 15, Fen: 18, Sosyal: 20 } },
      { name: 'TYT-2', date: '2026-02-10', tytNet: 72, aytNet: 0, subjectNets: { Matematik: 15, Türkçe: 17, Fen: 20, Sosyal: 20 } },
      { name: 'TYT-3', date: '2026-03-05', tytNet: 78, aytNet: 0, subjectNets: { Matematik: 18, Türkçe: 18, Fen: 21, Sosyal: 21 } },
      { name: 'AYT-1', date: '2026-03-20', tytNet: 80, aytNet: 58, subjectNets: { Matematik: 28, Fizik: 12, Kimya: 10, Biyoloji: 8 } },
      { name: 'Genel-1', date: '2026-04-05', tytNet: 82, aytNet: 65, subjectNets: { Matematik: 30, Fizik: 14, Kimya: 11, Biyoloji: 10 } },
      { name: 'Genel-2', date: '2026-04-20', tytNet: 85, aytNet: 72, subjectNets: { Matematik: 32, Fizik: 15, Kimya: 13, Biyoloji: 12 } },
    ],
    topicProgress: generateTopicProgress(),
    dailyTasks: [
      { id: '1', subject: 'TYT Matematik', topic: 'Sayı Basamakları', done: true, date: '2026-04-25' },
      { id: '2', subject: 'TYT Türkçe', topic: 'Paragraf Çözümü', done: true, date: '2026-04-25' },
      { id: '3', subject: 'TYT Fizik', topic: 'Vektörler', done: false, date: '2026-04-25' },
      { id: '4', subject: 'AYT Matematik', topic: 'Limit', done: false, date: '2026-04-25' },
      { id: '5', subject: 'TYT Kimya', topic: 'Atom Yapısı', done: false, date: '2026-04-25' },
    ],
    streakDays: 12,
    packageType: 'pro',
    startDate: '2026-01-01',
    notes: [
      '2026-04-20: TYT Matematik netleri istikrarlı artıyor. Geometriye daha fazla zaman ayırmalı.',
      '2026-04-15: Motivasyon seansı sonrası çalışma saatleri %20 arttı.',
    ],
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
      completedTopics: ['Paragraf', 'Cümlede Anlam', 'Sayılar'],
      weeklyStudyHours: 35,
    },
    examHistory: [
      { name: 'TYT-1', date: '2026-01-15', tytNet: 55, aytNet: 0, subjectNets: { Matematik: 10, Türkçe: 12, Fen: 16, Sosyal: 17 } },
      { name: 'TYT-2', date: '2026-02-10', tytNet: 62, aytNet: 0, subjectNets: { Matematik: 12, Türkçe: 14, Fen: 18, Sosyal: 18 } },
      { name: 'TYT-3', date: '2026-03-05', tytNet: 70, aytNet: 0, subjectNets: { Matematik: 15, Türkçe: 16, Fen: 19, Sosyal: 20 } },
      { name: 'AYT-1', date: '2026-03-20', tytNet: 75, aytNet: 50, subjectNets: { Matematik: 22, Fizik: 10, Kimya: 9, Biyoloji: 9 } },
      { name: 'Genel-1', date: '2026-04-05', tytNet: 76, aytNet: 60, subjectNets: { Matematik: 25, Fizik: 12, Kimya: 11, Biyoloji: 12 } },
      { name: 'Genel-2', date: '2026-04-20', tytNet: 78, aytNet: 65, subjectNets: { Matematik: 27, Fizik: 13, Kimya: 12, Biyoloji: 13 } },
    ],
    topicProgress: generateTopicProgress(),
    dailyTasks: [
      { id: '1', subject: 'TYT Matematik', topic: 'Rasyonel Sayılar', done: true, date: '2026-04-25' },
      { id: '2', subject: 'TYT Türkçe', topic: 'Sözcükte Anlam', done: false, date: '2026-04-25' },
      { id: '3', subject: 'TYT Tarih', topic: 'Osmanlı Kuruluş', done: false, date: '2026-04-25' },
    ],
    streakDays: 5,
    packageType: 'basic',
    startDate: '2026-02-01',
    notes: [
      '2026-04-18: Temel konularda eksikler var. TYT Türkçe netlerini artırmak için ek çalışma planı yapıldı.',
    ],
  },
  'student-3': {
    id: 'student-3',
    email: 'student3@duemwework.com',
    name: 'Zeynep Demir',
    role: 'student',
    assignedCoach: 'coach-2',
    targetUniversity: 'İstanbul Üniversitesi',
    targetDepartment: 'Hukuk',
    examYear: 2026,
    progress: {
      tytNet: 92,
      aytNet: 80,
      completedTopics: ['Paragraf', 'Cümlede Anlam', 'Sözcükte Anlam', 'Yazım Kuralları', 'Sayılar', 'Bölünebilme', 'Rasyonel Sayılar'],
      weeklyStudyHours: 50,
    },
    examHistory: [
      { name: 'TYT-1', date: '2026-01-15', tytNet: 80, aytNet: 0, subjectNets: { Matematik: 18, Türkçe: 20, Fen: 22, Sosyal: 20 } },
      { name: 'TYT-2', date: '2026-02-10', tytNet: 85, aytNet: 0, subjectNets: { Matematik: 20, Türkçe: 20, Fen: 22, Sosyal: 23 } },
      { name: 'TYT-3', date: '2026-03-05', tytNet: 88, aytNet: 0, subjectNets: { Matematik: 21, Türkçe: 21, Fen: 23, Sosyal: 23 } },
      { name: 'AYT-1', date: '2026-03-20', tytNet: 90, aytNet: 72, subjectNets: { Matematik: 30, Fizik: 15, Kimya: 14, Biyoloji: 13 } },
      { name: 'Genel-1', date: '2026-04-05', tytNet: 91, aytNet: 76, subjectNets: { Matematik: 32, Fizik: 16, Kimya: 14, Biyoloji: 14 } },
      { name: 'Genel-2', date: '2026-04-20', tytNet: 92, aytNet: 80, subjectNets: { Matematik: 34, Fizik: 17, Kimya: 15, Biyoloji: 14 } },
    ],
    topicProgress: generateTopicProgress(),
    dailyTasks: [
      { id: '1', subject: 'AYT Matematik', topic: 'Limit', done: true, date: '2026-04-25' },
      { id: '2', subject: 'AYT Fizik', topic: 'Kuvvet ve Hareket', done: true, date: '2026-04-25' },
      { id: '3', subject: 'TYT Coğrafya', topic: 'İklim Bilgisi', done: true, date: '2026-04-25' },
      { id: '4', subject: 'TYT Tarih', topic: 'Osmanlı Yükselme', done: false, date: '2026-04-25' },
    ],
    streakDays: 24,
    packageType: 'enterprise',
    startDate: '2025-09-01',
    notes: [
      '2026-04-22: Çok başarılı öğrenci. AYT netlerini 85+ çıkarması hedefleniyor.',
    ],
  },
};

export const MOCK_SESSIONS: Session[] = [
  { id: 's1', coachId: 'coach-1', studentId: 'student-1', date: '2026-04-25T15:00:00', duration: 60, type: 'Birebir Görüşme', status: 'onaylandı', notes: 'TYT Matematik değerlendirmesi ve eksik konuların belirlenmesi' },
  { id: 's2', coachId: 'coach-1', studentId: 'student-2', date: '2026-04-26T10:00:00', duration: 45, type: 'TYT Değerlendirme', status: 'bekliyor' },
  { id: 's3', coachId: 'coach-1', studentId: 'student-1', date: '2026-04-26T14:00:00', duration: 60, type: 'Motivasyon Seansı', status: 'onaylandı' },
  { id: 's4', coachId: 'coach-1', studentId: 'student-1', date: '2026-04-28T16:00:00', duration: 90, type: 'Konu Anlatımı', status: 'onaylandı' },
  { id: 's5', coachId: 'coach-2', studentId: 'student-3', date: '2026-04-25T11:00:00', duration: 60, type: 'Birebir Görüşme', status: 'tamamlandı', notes: 'Paragraf netleri değerlendirildi. Yeni stratejiler konuşuldu.' },
  { id: 's6', coachId: 'coach-2', studentId: 'student-3', date: '2026-04-27T13:00:00', duration: 60, type: 'AYT Değerlendirme', status: 'onaylandı' },
];

export const MOCK_COACH_RATINGS: CoachRating[] = [
  { studentId: 'student-1', coachId: 'coach-1', week: '2026-W16', rating: 5, comment: 'Çok ilgili ve bilgili bir koç. Matematik konularını çok güzel açıklıyor.' },
  { studentId: 'student-2', coachId: 'coach-1', week: '2026-W16', rating: 4, comment: 'Seanslar verimli geçiyor ama bazen daha fazla kaynak paylaşabilir.' },
  { studentId: 'student-1', coachId: 'coach-1', week: '2026-W15', rating: 5, comment: 'Haftalık planlama çok iyi gidiyor.' },
  { studentId: 'student-3', coachId: 'coach-2', week: '2026-W16', rating: 5, comment: 'Türkçe netlerim 3 haftada 15 arttı!' },
];

export const MOCK_APPLICATIONS: Application[] = [
  { id: 'app-1', name: 'Mehmet Kaya', email: 'mehmet@email.com', phone: '0555 111 22 33', targetExam: 'YKS', grade: '12. Sınıf', packageType: 'pro', message: 'Matematik netlerimi artırmak istiyorum.', status: 'pending', createdAt: '2026-04-24T10:00:00' },
  { id: 'app-2', name: 'Ayşe Yılmaz', email: 'ayse@email.com', phone: '0555 444 55 66', targetExam: 'YKS', grade: 'Mezun', packageType: 'basic', message: 'TYT Türkçe ve paragraf için destek almak istiyorum.', status: 'pending', createdAt: '2026-04-23T14:30:00' },
  { id: 'app-3', name: 'Burak Şahin', email: 'burak@email.com', targetExam: 'LGS', grade: '8. Sınıf', packageType: 'enterprise', status: 'approved', createdAt: '2026-04-20T09:00:00' },
  { id: 'app-4', name: 'Selin Koç', email: 'selin@email.com', phone: '0555 777 88 99', targetExam: 'YKS', grade: '11. Sınıf', packageType: 'pro', message: 'Tıp hedefim var. Sayısal netlerimi yükseltmem lazım.', status: 'pending', createdAt: '2026-04-25T08:15:00' },
];

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

export function getSessionsByCoach(coachId: string): Session[] {
  return MOCK_SESSIONS.filter((s) => s.coachId === coachId);
}

export function getSessionsByStudent(studentId: string): Session[] {
  return MOCK_SESSIONS.filter((s) => s.studentId === studentId);
}

export function getCoachRatings(coachId: string): CoachRating[] {
  return MOCK_COACH_RATINGS.filter((r) => r.coachId === coachId);
}

export function getPendingApplications(): Application[] {
  return MOCK_APPLICATIONS.filter((a) => a.status === 'pending');
}

export function changePassword(email: string, currentPassword: string, newPassword: string): boolean {
  const record = MOCK_USERS[email];
  if (!record) return false;
  if (record.password !== currentPassword) return false;
  MOCK_USERS = {
    ...MOCK_USERS,
    [email]: {
      ...record,
      password: newPassword,
    },
  };
  return true;
}
