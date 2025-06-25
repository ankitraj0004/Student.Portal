import React from 'react';
import { X, BookOpen, FileText, BookmarkPlus, Clock, Download, Users, Settings, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All Materials', icon: BookOpen },
    { id: 'notes', name: 'Handwritten Notes', icon: FileText },
    { id: 'textbooks', name: 'Textbooks', icon: BookOpen },
    { id: 'assignments', name: 'Assignments', icon: FileText },
    { id: 'exams', name: 'Past Exams', icon: FileText },
    { id: 'projects', name: 'Projects', icon: FileText },
  ];

  const branches = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Electronics & Communication'
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Categories</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeCategory === category.name
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {category.name}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Engineering Branches
              </h3>
              <div className="mt-2 space-y-1">
                {branches.map((branch) => (
                  <button
                    key={branch}
                    onClick={() => handleCategoryClick(branch)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                      activeCategory === branch
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{branch}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Your Library
              </h3>
              <div className="mt-2 space-y-1">
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                  <BookmarkPlus className="mr-3 h-5 w-5" />
                  Saved Materials
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                  <Clock className="mr-3 h-5 w-5" />
                  Recently Viewed
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
                  <Download className="mr-3 h-5 w-5" />
                  Downloads
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100">
              <Users className="mr-3 h-5 w-5" />
              Invite Friends
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;