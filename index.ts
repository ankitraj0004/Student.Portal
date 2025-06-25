export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  major: string;
  year: string;
  profileImage?: string;
  enrolledCourses: string[];
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  description: string;
  credits: number;
  semester: string;
  capacity: number;
  enrolled: number;
  schedule: string;
  category: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'success' | 'error';
  author: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type AuthMode = 'login' | 'signup' | 'forgot';
export type Page = 'home' | 'courses' | 'profile' | 'contact' | 'about' | 'auth';