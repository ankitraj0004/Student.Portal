import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'createdAt' | 'enrolledCourses'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  enrollInCourse: (courseId: string) => void;
  unenrollFromCourse: (courseId: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('studentPortalUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('studentPortalUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem('studentPortalUsers') || '[]');
    const foundUser = storedUsers.find((u: User) => u.email === email);

    if (foundUser) {
      // In a real app, you'd verify the password hash
      const storedPassword = localStorage.getItem(`password_${foundUser.id}`);
      if (storedPassword === password) {
        setUser(foundUser);
        localStorage.setItem('studentPortalUser', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      }
    }

    setIsLoading(false);
    return false;
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt' | 'enrolledCourses'>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('studentPortalUsers') || '[]');
    const existingUser = storedUsers.find((u: User) => u.email === userData.email);

    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      enrolledCourses: [],
      createdAt: new Date().toISOString(),
    };

    // Store user
    storedUsers.push(newUser);
    localStorage.setItem('studentPortalUsers', JSON.stringify(storedUsers));
    localStorage.setItem(`password_${newUser.id}`, 'password123'); // In real app, hash the password

    setUser(newUser);
    localStorage.setItem('studentPortalUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studentPortalUser');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('studentPortalUser', JSON.stringify(updatedUser));

    // Update in users array
    const storedUsers = JSON.parse(localStorage.getItem('studentPortalUsers') || '[]');
    const updatedUsers = storedUsers.map((u: User) => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('studentPortalUsers', JSON.stringify(updatedUsers));
  };

  const enrollInCourse = (courseId: string) => {
    if (!user) return;

    if (!user.enrolledCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId]
      };
      updateProfile(updatedUser);
    }
  };

  const unenrollFromCourse = (courseId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      enrolledCourses: user.enrolledCourses.filter(id => id !== courseId)
    };
    updateProfile(updatedUser);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    enrollInCourse,
    unenrollFromCourse,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};