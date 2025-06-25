import React from 'react';
import { Calendar, BookOpen, Users, Award, Bell, TrendingUp, Clock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockAnnouncements, mockCourses } from '../data/mockData';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'success': return 'border-green-200 bg-green-50 text-green-800';
      case 'error': return 'border-red-200 bg-red-50 text-red-800';
      default: return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getTimeGreeting()}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Welcome back to your engineering student portal
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>{user?.year} • {user?.major}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>ID: {user?.studentId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{user?.enrolledCourses?.length || 0} Enrolled Courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">{user?.enrolledCourses?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">GPA</p>
                <p className="text-2xl font-bold text-gray-900">3.8</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Hours</p>
                <p className="text-2xl font-bold text-gray-900">24/week</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <Award className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Credits</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Announcements */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Bell className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-900">Latest Announcements</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {mockAnnouncements.slice(0, 4).map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`border rounded-lg p-4 ${getAnnouncementColor(announcement.type)}`}
                  >
                    <div className="flex items-start">
                      <span className="text-lg mr-3 mt-0.5">
                        {getAnnouncementIcon(announcement.type)}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{announcement.title}</h3>
                        <p className="text-sm opacity-90 mb-2">{announcement.content}</p>
                        <div className="flex justify-between items-center text-xs opacity-75">
                          <span>{announcement.author}</span>
                          <span>{new Date(announcement.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Enrolled Courses */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg py-3 px-4 font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105">
                  View Schedule
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg py-3 px-4 font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105">
                  Check Grades
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-3 px-4 font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                  Library Resources
                </button>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Courses</h2>
              {user?.enrolledCourses && user.enrolledCourses.length > 0 ? (
                <div className="space-y-3">
                  {user.enrolledCourses.slice(0, 3).map((courseId) => {
                    const course = mockCourses.find(c => c.id === courseId);
                    if (!course) return null;
                    
                    return (
                      <div key={courseId} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-200">
                        <div className="font-medium text-gray-900 text-sm">{course.code}</div>
                        <div className="text-xs text-gray-600">{course.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{course.schedule}</div>
                      </div>
                    );
                  })}
                  {user.enrolledCourses.length > 3 && (
                    <div className="text-center pt-2">
                      <span className="text-sm text-gray-500">
                        +{user.enrolledCourses.length - 3} more courses
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No courses enrolled yet</p>
                  <p className="text-gray-400 text-xs mt-1">Visit the Courses page to enroll</p>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
              </div>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="font-medium text-gray-900 text-sm">Career Fair</div>
                  <div className="text-xs text-gray-600">February 20, 2024</div>
                  <div className="text-xs text-gray-500 mt-1">Student Center</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="font-medium text-gray-900 text-sm">Midterm Exams</div>
                  <div className="text-xs text-gray-600">March 15-22, 2024</div>
                  <div className="text-xs text-gray-500 mt-1">Various Locations</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="font-medium text-gray-900 text-sm">Spring Break</div>
                  <div className="text-xs text-gray-600">March 25-29, 2024</div>
                  <div className="text-xs text-gray-500 mt-1">No Classes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;