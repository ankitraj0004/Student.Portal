import React from 'react';
import { User, BookOpen, Home, MessageCircle, Info, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'courses' as Page, label: 'Courses', icon: BookOpen },
    { id: 'profile' as Page, label: 'Profile', icon: User },
    { id: 'contact' as Page, label: 'Contact', icon: MessageCircle },
    { id: 'about' as Page, label: 'About', icon: Info },
  ];

  const handleLogout = () => {
    logout();
    onNavigate('auth');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-2">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-xl font-bold text-gray-900">EduPortal</div>
              <div className="text-xs text-gray-500">Engineering Students</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.studentId}</div>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center space-x-3 ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm text-gray-500">{user?.studentId}</div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;