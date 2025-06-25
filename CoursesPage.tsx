import React, { useState } from 'react';
import { BookOpen, Users, Clock, Calendar, Search, Filter, CheckCircle, XCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockData';
import { Course } from '../types';

const CoursesPage: React.FC = () => {
  const { user, enrollInCourse, unenrollFromCourse } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = ['All', ...new Set(mockCourses.map(course => course.category))];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleEnrollment = (courseId: string) => {
    if (user?.enrolledCourses?.includes(courseId)) {
      unenrollFromCourse(courseId);
    } else {
      enrollInCourse(courseId);
    }
  };

  const getEnrollmentStatus = (courseId: string) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const getCapacityColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Catalog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore and enroll in engineering courses for Fall 2024 semester
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses, instructors, or course codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">
              Showing {filteredCourses.length} of {mockCourses.length} courses
            </span>
            {user?.enrolledCourses && user.enrolledCourses.length > 0 && (
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {user.enrolledCourses.length} enrolled
              </span>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = getEnrollmentStatus(course.id);
            const isFull = course.enrolled >= course.capacity;
            
            return (
              <div
                key={course.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="p-6">
                  {/* Course Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{course.code}</h3>
                      <h4 className="text-md font-semibold text-gray-700 mb-2">{course.name}</h4>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {course.category}
                      </span>
                    </div>
                    <div className="text-right">
                      {isEnrolled && (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      )}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{course.semester}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>{course.credits} Credits</span>
                    </div>
                  </div>

                  {/* Enrollment Status */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-600">Enrollment</span>
                      <span className={getCapacityColor(course.enrolled, course.capacity)}>
                        {course.enrolled}/{course.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEnrollment(course.id)}
                      disabled={isFull && !isEnrolled}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isEnrolled
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : isFull
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                      }`}
                    >
                      {isEnrolled ? 'Unenroll' : isFull ? 'Full' : 'Enroll'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedCourse.code}</h2>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{selectedCourse.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {selectedCourse.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <XCircle className="h-8 w-8" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Instructor</div>
                      <div className="font-medium">{selectedCourse.instructor}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Schedule</div>
                      <div className="font-medium">{selectedCourse.schedule}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Semester</div>
                      <div className="font-medium">{selectedCourse.semester}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <BookOpen className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Credits</div>
                      <div className="font-medium">{selectedCourse.credits} Credits</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Enrollment</div>
                      <div className={`font-medium ${getCapacityColor(selectedCourse.enrolled, selectedCourse.capacity)}`}>
                        {selectedCourse.enrolled}/{selectedCourse.capacity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Course Description</h4>
                <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleEnrollment(selectedCourse.id);
                    setSelectedCourse(null);
                  }}
                  disabled={selectedCourse.enrolled >= selectedCourse.capacity && !getEnrollmentStatus(selectedCourse.id)}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    getEnrollmentStatus(selectedCourse.id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : selectedCourse.enrolled >= selectedCourse.capacity
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                  }`}
                >
                  {getEnrollmentStatus(selectedCourse.id) ? 'Unenroll' : 
                   selectedCourse.enrolled >= selectedCourse.capacity ? 'Course Full' : 'Enroll Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;