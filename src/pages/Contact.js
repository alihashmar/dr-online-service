import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const getFieldError = (fieldName) => {
    if (!touched[fieldName]) return '';
    if (!formData[fieldName]) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    if (fieldName === 'email' && !formData.email.includes('@')) return 'Please enter a valid email';
    return '';
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!isFormValid) {
      setError('Please fill in all fields');
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setLoading(true);
    setError('');
    setSubmitted(false);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Contact error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-blue-100">We're here to help and answer any question you might have</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form - Spans 2 columns on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl p-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <span className="inline-block bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">✉️</span>
                Send us a Message
              </h2>
              
              {/* Success Message */}
              {submitted && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6 animate-pulse">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">✓</span>
                    <div>
                      <p className="text-green-800 font-bold text-lg">Message Sent Successfully!</p>
                      <p className="text-green-700 text-sm">Thank you for contacting us. We'll respond within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">⚠️</span>
                    <div>
                      <p className="text-red-800 font-bold text-lg">Error</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      getFieldError('name') 
                        ? 'border-red-500 bg-red-50 focus:border-red-600' 
                        : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50'
                    }`}
                  />
                  {getFieldError('name') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span> {getFieldError('name')}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      getFieldError('email') 
                        ? 'border-red-500 bg-red-50 focus:border-red-600' 
                        : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50'
                    }`}
                  />
                  {getFieldError('email') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span> {getFieldError('email')}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="How can we help?"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      getFieldError('subject') 
                        ? 'border-red-500 bg-red-50 focus:border-red-600' 
                        : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50'
                    }`}
                  />
                  {getFieldError('subject') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span> {getFieldError('subject')}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Please share your message or question..."
                    rows="6"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition resize-none ${
                      getFieldError('message') 
                        ? 'border-red-500 bg-red-50 focus:border-red-600' 
                        : 'border-gray-300 focus:border-blue-500 focus:bg-blue-50'
                    }`}
                  />
                  {getFieldError('message') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span> {getFieldError('message')}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs mt-2">{formData.message.length}/500 characters</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition transform ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2">⏳</span> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">📤</span> Send Message
                    </span>
                  )}
                </button>

                <p className="text-center text-gray-500 text-sm">
                  <span className="text-red-500">*</span> All fields are required
                </p>
              </form>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Contact Info */}
            <div className="bg-white rounded-xl shadow-xl p-8 mb-6 sticky top-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Phone</h4>
                    <p className="text-blue-600 font-semibold">+961 71 135828</p>
                    <p className="text-gray-600 text-sm">Available 24/7</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Email</h4>
                    <p className="text-blue-600 font-semibold text-sm">info@dronline.com</p>
                    <p className="text-blue-600 font-semibold text-sm">support@dronline.com</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Location</h4>
                    <p className="text-gray-600">Beirut, Lebanon</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-4">
                    <span className="text-2xl">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Hours</h4>
                    <p className="text-gray-600 text-sm">Mon-Fri: 9 AM - 6 PM</p>
                    <p className="text-gray-600 text-sm">Sat: 10 AM - 4 PM</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                <p className="text-sm text-gray-700">
                  <span className="font-bold">⚡ Response Time:</span> We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 bg-white rounded-xl shadow-lg p-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">🏥 How do I register as a doctor?</h3>
              <p className="text-gray-600">Click on "Register as Doctor" on the home page and fill in your credentials and license information. Verification may take 24-48 hours.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">💰 Is the platform free?</h3>
              <p className="text-gray-600">Yes, basic features are free for all users. Premium features are available with an optional subscription for enhanced services.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">💬 How can I start a discussion?</h3>
              <p className="text-gray-600">Navigate to the Discussions page and click "Create New Topic" to start a conversation with other professionals.</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">🔒 Is my data secure?</h3>
              <p className="text-gray-600">Yes, we use industry-standard encryption (TLS) to protect all user data and medical communications 24/7.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
