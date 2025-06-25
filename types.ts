export interface Material {
  id: number;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'handwritten' | 'textbook' | string;
  category: string;
  author: string;
  uploadDate: string;
  size: string;
  downloads: number;
  imageUrl: string;
}