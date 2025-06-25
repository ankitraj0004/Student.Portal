import React from 'react';
import { BookOpen, Target, Users, Award, Globe, Lightbulb, Heart, Star, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Course Management',
      description: 'Easy enrollment and tracking of your academic journey'
    },
    {
      icon: Users,
      title: 'Student Community',
      description: 'Connect with peers and collaborate on projects'
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Track your progress and celebrate achievements'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your portal anywhere, anytime'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '500+', label: 'Courses Available' },
    { number: '50+', label: 'Expert Faculty' },
    { number: '95%', label: 'Student Satisfaction' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for academic excellence and continuous improvement in everything we do.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology to enhance the learning experience.'
    },
    {
      icon: Heart,
      title: 'Support',
      description: 'Providing comprehensive support to help every student succeed.'
    },
    {
      icon: Star,
      title: 'Quality',
      description: 'Maintaining the highest standards in education and student services.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Dean of Engineering',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: '15+ years in engineering education'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Head of Computer Science',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'AI and Machine Learning expert'
    },
    {
      name: 'Dr. Lisa Anderson',
      role: 'Director of Student Affairs',
      image: 'https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Dedicated to student success'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 inline-block">
              <BookOpen className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">About EduPortal</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Empowering the next generation of engineers through innovative technology, 
            comprehensive resources, and unwavering support for academic excellence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
            <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-6">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To provide engineering students with a comprehensive, user-friendly digital platform 
              that streamlines their academic journey, fosters collaboration, and enables them to 
              achieve their full potential in their chosen field of engineering.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Accessible learning resources</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Seamless course management</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Academic progress tracking</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
            <div className="bg-purple-100 text-purple-600 rounded-full p-4 inline-block mb-6">
              <Lightbulb className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To become the leading student portal platform that transforms engineering education 
              through innovative technology, creating a connected community of learners who will 
              shape the future of technology and society.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Innovation-driven learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Global student community</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">Future-ready graduates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 flex items-start space-x-4"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full p-3 flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2 flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">2020 - The Beginning</h3>
                <p className="text-gray-600">
                  EduPortal was founded with the vision of creating a comprehensive digital platform 
                  for engineering students, addressing the need for streamlined academic management.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 text-green-600 rounded-full p-2 flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">2021 - First Launch</h3>
                <p className="text-gray-600">
                  We launched our beta version with core features including course enrollment, 
                  grade tracking, and basic student services integration.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 text-purple-600 rounded-full p-2 flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">2022 - Rapid Growth</h3>
                <p className="text-gray-600">
                  Expanded to serve over 50 universities and 10,000+ students, introducing 
                  advanced features like real-time collaboration and AI-powered recommendations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 text-orange-600 rounded-full p-2 flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">2024 - Leading Innovation</h3>
                <p className="text-gray-600">
                  Today, we continue to innovate and expand our platform, setting new standards 
                  for student portal technology and academic excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;