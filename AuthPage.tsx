import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, Mail, Lock, User, GraduationCap, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthMode } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

interface AuthPageProps {
  onSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const { login, signup, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    major: '',
    year: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      const success = await login(formData.email, formData.password);
      if (success) {
        onSuccess();
      } else {
        setError('Invalid email or password');
      }
    } else if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      const success = await signup({
        name: formData.name,
        email: formData.email,
        studentId: formData.studentId,
        major: formData.major,
        year: formData.year,
      });

      if (success) {
        onSuccess();
      } else {
        setError('Email already exists');
      }
    } else if (mode === 'forgot') {
      // Simulate forgot password
      setSuccess('Password reset instructions sent to your email');
      setTimeout(() => setMode('login'), 2000);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      studentId: '',
      major: '',
      year: '',
    });
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-4">
              <BookOpen className="h-12 w-12" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' && 'Sign in to your student portal'}
            {mode === 'signup' && 'Join the engineering student community'}
            {mode === 'forgot' && 'Enter your email to reset password'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={mode === 'signup'}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                      Student ID
                    </label>
                    <input
                      id="studentId"
                      name="studentId"
                      type="text"
                      required={mode === 'signup'}
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., ENG2024001"
                    />
                  </div>
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <select
                      id="year"
                      name="year"
                      required={mode === 'signup'}
                      value={formData.year}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                    Major
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="major"
                      name="major"
                      required={mode === 'signup'}
                      value={formData.major}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your major</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Chemical Engineering">Chemical Engineering</option>
                      <option value="Biomedical Engineering">Biomedical Engineering</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={mode === 'signup'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" color="white" />
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                <>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </>
              )}
            </button>
          </form>

          {/* Mode Switch */}
          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => switchMode('forgot')}
                  className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Forgot your password?
                </button>
                <div className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => switchMode('signup')}
                    className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
                  >
                    Sign up
                  </button>
                </div>
              </>
            )}

            {mode === 'signup' && (
              <div className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>
            )}

            {mode === 'forgot' && (
              <div className="text-sm text-gray-600">
                Remember your password?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
          <div className="text-yellow-800 font-medium mb-1">Demo Credentials:</div>
          <div className="text-yellow-700">
            Email: student@example.com<br />
            Password: password123<br />
            <span className="text-xs">(Or create a new account)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;