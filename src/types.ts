export interface SyllabusTopic {
  title: string;
  subtopics: string[];
}

export interface Board {
  id: string;
  name: string;
  subtitle: string;
  curriculum: string;
  timeZone: string;
  priceInr: number;
  priceUsd: number;
  iconName: 'menu_book' | 'public' | 'school';
  colorClass: string;
  topics: SyllabusTopic[];
  keyFeatures: string[];
}

export interface Booking {
  id: string;
  parentName: string;
  studentName: string;
  grade: string;
  boardId: string;
  date: string;
  timeSlot: string;
  contactNumber: string;
  email: string;
  status: 'pending' | 'confirmed';
  socialId?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface Review {
  id: string;
  studentName: string;
  gradeClass: string;
  board: string;
  rating: number;
  reviewText: string;
  date: string;
  avatarUrl: string;
  isVerified: boolean;
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Formula {
  id: string;
  category: 'Algebra' | 'Geometry' | 'Trigonometry' | 'Calculus' | 'Arithmetic';
  name: string;
  equation: string;
  description: string;
}
