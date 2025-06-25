import { Course, Announcement } from '../types';

export const mockCourses: Course[] = [
  {
    id: 'cs101',
    name: 'Introduction to Computer Science',
    code: 'CS 101',
    instructor: 'Dr. Sarah Johnson',
    description: 'Fundamental concepts of computer science including programming basics, algorithms, and data structures.',
    credits: 3,
    semester: 'Fall 2024',
    capacity: 50,
    enrolled: 32,
    schedule: 'MWF 10:00-11:00 AM',
    category: 'Computer Science'
  },
  {
    id: 'math201',
    name: 'Calculus II',
    code: 'MATH 201',
    instructor: 'Prof. Michael Chen',
    description: 'Advanced calculus topics including integration techniques, infinite series, and applications.',
    credits: 4,
    semester: 'Fall 2024',
    capacity: 40,
    enrolled: 28,
    schedule: 'TTh 2:00-3:30 PM',
    category: 'Mathematics'
  },
  {
    id: 'ee101',
    name: 'Circuit Analysis',
    code: 'EE 101',
    instructor: 'Dr. Lisa Anderson',
    description: 'Basic electrical circuit analysis including Ohm\'s law, Kirchhoff\'s laws, and AC/DC circuits.',
    credits: 3,
    semester: 'Fall 2024',
    capacity: 35,
    enrolled: 30,
    schedule: 'MWF 1:00-2:00 PM',
    category: 'Electrical Engineering'
  },
  {
    id: 'me202',
    name: 'Thermodynamics',
    code: 'ME 202',
    instructor: 'Prof. Robert Kim',
    description: 'Principles of thermodynamics, heat transfer, and energy conversion systems.',
    credits: 3,
    semester: 'Fall 2024',
    capacity: 30,
    enrolled: 25,
    schedule: 'TTh 11:00-12:30 PM',
    category: 'Mechanical Engineering'
  },
  {
    id: 'ce301',
    name: 'Structural Engineering',
    code: 'CE 301',
    instructor: 'Dr. Emma Wilson',
    description: 'Analysis and design of structural systems including beams, columns, and foundations.',
    credits: 4,
    semester: 'Fall 2024',
    capacity: 25,
    enrolled: 20,
    schedule: 'MWF 3:00-4:30 PM',
    category: 'Civil Engineering'
  },
  {
    id: 'cs302',
    name: 'Database Systems',
    code: 'CS 302',
    instructor: 'Prof. David Lee',
    description: 'Database design, SQL, normalization, and modern database technologies.',
    credits: 3,
    semester: 'Fall 2024',
    capacity: 45,
    enrolled: 38,
    schedule: 'TTh 9:30-11:00 AM',
    category: 'Computer Science'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Fall 2024 Registration Now Open',
    content: 'Registration for Fall 2024 semester is now open. Please review course offerings and register early to secure your preferred schedule.',
    date: '2024-01-15',
    type: 'info',
    author: 'Academic Office'
  },
  {
    id: '2',
    title: 'Library Hours Extended',
    content: 'The university library will extend its hours during finals week. Open 24/7 from December 10-17.',
    date: '2024-01-12',
    type: 'success',
    author: 'Library Services'
  },
  {
    id: '3',
    title: 'Campus Maintenance Notice',
    content: 'Scheduled maintenance in the Engineering building will occur this weekend. Some classrooms may be temporarily unavailable.',
    date: '2024-01-10',
    type: 'warning',
    author: 'Facilities Management'
  },
  {
    id: '4',
    title: 'Career Fair - February 20th',
    content: 'Annual Engineering Career Fair will be held in the Student Center. Over 50 companies will be participating.',
    date: '2024-01-08',
    type: 'info',
    author: 'Career Services'
  }
];