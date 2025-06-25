import React, { useState } from 'react';
import { User, Mail, BookOpen, Calendar, GraduationCap, Edit3, Save, X, Camera, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    major: user?.major || '',
    year: user?.year || '',
    studentId: user?.studentId || '',
  });
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      major: user?.major || '',
      year: user?.year || '',
      studentId: user?.studentId || '',
    });
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        updateProfile({ profileImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const enrolledCourses = user?.enrolledCourses
    ? mockCourses.filter(course => user.enrolledCourses.includes(course.id))
    : [];

  const totalCredits = enrolledCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Profile</h1>
          <p className="text-lg text-gray-600">Manage your academic information and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors duration-200 cursor-pointer shadow-lg">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <p className="text-gray-600 mb-2">{user?.studentId}</p>
                <div className="flex justify-center space-x-2">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {user?.year}
                  </span>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    {user?.major}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 inline-block mb-2">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-gray-600">Enrolled</div>
                  <div className="text-lg font-bold text-gray-900">{enrolledCourses.length}</div>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 text-green-600 rounded-full p-3 inline-block mb-2">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="text-sm text-gray-600">Credits</div>
                  <div className="text-lg font-bold text-gray-900">{totalCredits}</div>
                </div>
              </div>

              {/* Academic Performance */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Academic Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current GPA</span>
                    <span className="font-bold text-green-600">3.8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cumulative GPA</span>
                    <span className="font-bold text-blue-600">3.7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Class Rank</span>
                    <span className="font-bold text-purple-600">15/120</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors duration-200"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{user?.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{user?.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{user?.studentId}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                    {isEditing ? (
                      <select
                        value={editData.year}
                        onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{user?.year}</span>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                    {isEditing ? (
                      <select
                        value={editData.major}
                        onChange={(e) => setEditData({ ...editData, major: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Chemical Engineering">Chemical Engineering</option>
                        <option value="Biomedical Engineering">Biomedical Engineering</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">{user?.major}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Enrolled Courses</h2>
                <p className="text-sm text-gray-600 mt-1">Fall 2024 Semester • {totalCredits} Total Credits</p>
              </div>

              <div className="p-6">
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{course.code}</h3>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {course.credits} Credits
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">{course.name}</h4>
                            <div className="text-xs text-gray-500 space-y-1">
                              <div>Instructor: {course.instructor}</div>
                              <div>Schedule: {course.schedule}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
                    <p className="text-gray-600 text-sm">Visit the Courses page to enroll in classes</p>
                  </div>
                )}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates about courses and announcements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Get text alerts for important deadlines</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="w-full bg-red-100 text-red-700 px-4 py-3 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;