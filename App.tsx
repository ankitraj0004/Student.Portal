import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Page } from './types';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import LoadingSpinner from './components/LoadingSpinner';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    if (!user && !isLoading) {
      setCurrentPage('auth');
    } else if (user && currentPage === 'auth') {
      setCurrentPage('home');
    }
  }, [user, isLoading, currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleAuthSuccess = () => {
    setCurrentPage('home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onSuccess={handleAuthSuccess} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'courses':
        return <CoursesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;