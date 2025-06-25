import React from 'react';
import { Mail, Github as GitHub, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900">EngStudyHub</h3>
            <p className="mt-2 text-sm text-gray-600">
              A comprehensive platform for engineering students to access study materials, handwritten notes, and resources.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <GitHub size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Study Materials</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Handwritten Notes</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Textbooks</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Past Exams</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Engineering Branches</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Computer Science</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Electrical Engineering</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Mechanical Engineering</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Civil Engineering</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} EngStudyHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;