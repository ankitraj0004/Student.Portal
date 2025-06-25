import React from 'react';
import { Download, BookmarkPlus, Share2, FileText, BookOpen, File } from 'lucide-react';
import { Material } from '../types';

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const getIcon = () => {
    switch (material.type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'doc':
        return <File className="h-6 w-6 text-blue-500" />;
      case 'handwritten':
        return <FileText className="h-6 w-6 text-purple-500" />;
      case 'textbook':
        return <BookOpen className="h-6 w-6 text-green-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              {getIcon()}
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{material.title}</h3>
              <p className="text-sm text-gray-500">{material.category}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <button className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50">
              <BookmarkPlus size={18} />
            </button>
          </div>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{material.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              {material.author.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">{material.author}</span>
          </div>
          <span className="text-xs text-gray-500">{material.uploadDate}</span>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xs font-medium text-gray-500">{material.type.toUpperCase()} • {material.size}</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50">
            <Share2 size={16} />
          </button>
          <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;