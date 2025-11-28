import React, { useState } from 'react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Doctor Registration',
      icon: '👨‍⚕️',
      description: 'Healthcare professionals can register and verify their credentials to share knowledge and engage with patients.',
      features: [
        'Verified professional profiles',
        'Specialty-based categorization',
        'License verification',
        'Professional networking'
      ]
    },
    {
      id: 2,
      title: 'Patient Registration',
      icon: '👥',
      description: 'Patients can create accounts to access medical information, participate in discussions, and connect with doctors.',
      features: [
        'Secure patient profiles',
        'Health interest preferences',
        'Personalized content feed',
        'Privacy controls'
      ]
    },
    {
      id: 3,
      title: 'Medical Studies Repository',
      icon: '📚',
      description: 'Doctors can upload and share recent medical studies, research papers, and clinical findings with the community.',
      features: [
        'Upload research papers',
        'Disease-specific categorization',
        'Search and filter studies',
        'Citation and references'
      ]
    },
    {
      id: 4,
      title: 'Discussion Forums',
      icon: '💬',
      description: 'Interactive forums where doctors and patients can discuss diseases, treatments, and health topics.',
      features: [
        'Topic-based discussions',
        'Q&A sections',
        'Comment and reply system',
        'Moderated content'
      ]
    },
    {
      id: 5,
      title: 'Disease Information',
      icon: '🏥',
      description: 'Comprehensive database of diseases with symptoms, treatments, and latest research updates.',
      features: [
        'Detailed disease profiles',
        'Symptom checkers',
        'Treatment options',
        'Prevention guidelines'
      ]
    },
    {
      id: 6,
      title: 'Community Support',
      icon: '🤝',
      description: 'Connect with others facing similar health challenges and share experiences in a supportive environment.',
      features: [
        'Support groups',
        'Experience sharing',
        'Peer support',
        'Mental health resources'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl">Comprehensive healthcare solutions for everyone</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <button className="text-blue-600 font-semibold hover:text-blue-800">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Service Details */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-5xl mb-2">{selectedService.icon}</div>
                <h2 className="text-3xl font-bold">{selectedService.title}</h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-700 text-lg mb-6">{selectedService.description}</p>

            <h3 className="text-xl font-bold mb-4">Key Features:</h3>
            <ul className="space-y-3 mb-6">
              {selectedService.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedService(null)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Services?</h2>
          <p className="text-xl mb-8">Join thousands of doctors and patients already benefiting from Dr. Online</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
