import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, User, MessageCircle } from 'lucide-react';
import { ContactForm } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store the message (in a real app, this would be sent to a server)
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      subDetails: 'Mon-Fri 8:00-17:00'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'support@eduportal.edu',
      subDetails: 'We\'ll respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 University Ave',
      subDetails: 'Engineering Building, Room 204'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon-Fri 9:00-16:00',
      subDetails: 'Walk-ins welcome'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Course Registration',
    'Technical Support',
    'Academic Advising',
    'Financial Aid',
    'Campus Services',
    'Other'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-pulse w-full"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Redirecting...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-600 rounded-lg p-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <p className="text-gray-700">{info.details}</p>
                        <p className="text-sm text-gray-500">{info.subDetails}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
              <ul className="space-y-2 text-sm">
                <li>• Include your student ID for faster assistance</li>
                <li>• Be specific about technical issues</li>
                <li>• Check our FAQ section first</li>
                <li>• Screenshots help us understand problems better</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 ${
                      errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Please describe your question or issue in detail..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <p className="text-red-600 text-sm">{errors.message}</p>
                    ) : (
                      <div></div>
                    )}
                    <p className="text-sm text-gray-500">
                      {formData.message.length}/500 characters
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> For urgent matters, please call our support line. 
                    We typically respond to messages within 24 hours during business days.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do I reset my password?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your inbox.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do I add or drop courses?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Visit the Courses page and use the enroll/unenroll buttons. Changes are effective immediately during the registration period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Where can I find my grades?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Grades are displayed on your dashboard and in the detailed course view. You'll receive notifications when new grades are posted.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical issues with the portal?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Try clearing your browser cache first. If issues persist, contact our technical support team with details about your browser and the specific problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;