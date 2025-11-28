import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';

const Home = () => {
  const [userType, setUserType] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    licenseNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showToast(`Successfully registered as ${userType}! Welcome aboard.`, 'success');
      setShowRegister(false);
      setFormData({ name: '', email: '', password: '', specialty: '', licenseNumber: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-slide-down">Welcome to Dr. Online</h1>
          <p className="text-xl mb-8 animate-slide-up">
            Connecting Doctors and Patients for Better Healthcare
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => { setUserType('Doctor'); setShowRegister(true); }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register as Doctor
            </button>
            <button 
              onClick={() => { setUserType('Patient'); setShowRegister(true); }}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Register as Patient
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4 animate-bounce">👨‍⚕️</div>
            <h3 className="text-xl font-bold mb-2">Expert Doctors</h3>
            <p className="text-gray-600">
              Connect with verified healthcare professionals from various specialties.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4 animate-bounce" style={{animationDelay: '0.1s'}}>📚</div>
            <h3 className="text-xl font-bold mb-2">Medical Studies</h3>
            <p className="text-gray-600">
              Access latest medical research and studies shared by doctors.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="text-blue-600 text-4xl mb-4 animate-bounce" style={{animationDelay: '0.2s'}}>💬</div>
            <h3 className="text-xl font-bold mb-2">Discussion Forums</h3>
            <p className="text-gray-600">
              Engage in meaningful discussions about health topics and diseases.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-8 max-w-md w-full animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Register as {userType}</h2>
              <button 
                onClick={() => setShowRegister(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              {userType === 'Doctor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Specialty</label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]'
                } text-white`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Registering...</span>
                  </div>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of healthcare professionals and patients today!
          </p>
          <Link 
            to="/discussions"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Discussions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
