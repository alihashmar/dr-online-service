import React, { useState } from 'react';

const Discussions = () => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'Understanding Type 2 Diabetes Management',
      author: 'Dr. Sara',
      userType: 'Doctor',
      category: 'Diabetes',
      replies: 24,
      views: 156,
      lastActivity: '2 hours ago',
      content: 'Let\'s discuss the latest approaches to managing Type 2 Diabetes...'
    },
    {
      id: 2,
      title: 'COVID-19 Long-term Effects',
      author: 'Dr. Ali Hussein',
      userType: 'Doctor',
      category: 'Infectious Diseases',
      replies: 45,
      views: 289,
      lastActivity: '5 hours ago',
      content: 'Sharing recent studies on long-term effects of COVID-19...'
    },
    {
      id: 3,
      title: 'Dealing with Anxiety - Patient Experience',
      author: 'John Smith',
      userType: 'Patient',
      category: 'Mental Health',
      replies: 18,
      views: 134,
      lastActivity: '1 day ago',
      content: 'I want to share my experience with anxiety management...'
    },
    {
      id: 4,
      title: 'Hypertension Treatment Options',
      author: 'Dr. Jad',
      userType: 'Doctor',
      category: 'Cardiology',
      replies: 32,
      views: 201,
      lastActivity: '3 hours ago',
      content: 'Recent study on hypertension treatment approaches...'
    }
  ]);

  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    category: '',
    content: ''
  });
  const [newReply, setNewReply] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Diabetes', 'Cardiology', 'Mental Health', 'Infectious Diseases', 'Neurology', 'Pediatrics'];

  const handleNewTopicChange = (e) => {
    setNewTopic({ ...newTopic, [e.target.name]: e.target.value });
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    const topic = {
      id: discussions.length + 1,
      ...newTopic,
      author: 'Current User',
      userType: 'Doctor',
      replies: 0,
      views: 0,
      lastActivity: 'Just now'
    };
    setDiscussions([topic, ...discussions]);
    setShowNewTopic(false);
    setNewTopic({ title: '', category: '', content: '' });
    alert('Topic created successfully!');
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    alert('Reply posted successfully!');
    setNewReply('');
    const updated = discussions.map(d => 
      d.id === selectedDiscussion.id 
        ? { ...d, replies: d.replies + 1, lastActivity: 'Just now' }
        : d
    );
    setDiscussions(updated);
    setSelectedDiscussion({ ...selectedDiscussion, replies: selectedDiscussion.replies + 1 });
  };

  const filteredDiscussions = filterCategory === 'All' 
    ? discussions 
    : discussions.filter(d => d.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Discussion Forums</h1>
          <p className="text-xl">Connect, Share, and Learn Together</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowNewTopic(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            + Create New Topic
          </button>
        </div>

        {/* Discussions List */}
        {!selectedDiscussion && (
          <div className="space-y-4">
            {filteredDiscussions.map(discussion => (
              <div
                key={discussion.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedDiscussion(discussion)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-blue-600 hover:text-blue-800">
                      {discussion.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        {discussion.userType === 'Doctor' ? '👨‍⚕️' : '👤'}
                        <span className="font-medium">{discussion.author}</span>
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {discussion.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{discussion.content}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex gap-6">
                    <span>💬 {discussion.replies} replies</span>
                    <span>👁️ {discussion.views} views</span>
                  </div>
                  <span>🕒 {discussion.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Discussion Detail View */}
        {selectedDiscussion && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={() => setSelectedDiscussion(null)}
              className="text-blue-600 mb-4 hover:text-blue-800"
            >
              ← Back to Discussions
            </button>
            
            <div className="border-b pb-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">{selectedDiscussion.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  {selectedDiscussion.userType === 'Doctor' ? '👨‍⚕️' : '👤'}
                  <span className="font-medium">{selectedDiscussion.author}</span>
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {selectedDiscussion.category}
                </span>
                <span>🕒 {selectedDiscussion.lastActivity}</span>
              </div>
              <p className="text-gray-700 text-lg">{selectedDiscussion.content}</p>
            </div>

            {/* Sample Replies */}
            <div className="space-y-6 mb-8">
              <h3 className="text-xl font-bold">Replies ({selectedDiscussion.replies})</h3>
              
              <div className="border-l-4 border-blue-200 pl-6 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Dr. Fatima</span>
                  <span className="text-sm text-gray-500">5 hours ago</span>
                </div>
                <p className="text-gray-700">Great topic! I've seen similar cases in my practice...</p>
              </div>

              <div className="border-l-4 border-green-200 pl-6 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Nour</span>
                  <span className="text-sm text-gray-500">3 hours ago</span>
                </div>
                <p className="text-gray-700">Thank you for sharing this information. Very helpful!</p>
              </div>
            </div>

            {/* Reply Form */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Post a Reply</h3>
              <form onSubmit={handleReplySubmit}>
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  rows="4"
                  placeholder="Share your thoughts..."
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Post Reply
                </button>
              </form>
            </div>
          </div>
        )}

        {/* New Topic Modal */}
        {showNewTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Discussion Topic</h2>
                <button
                  onClick={() => setShowNewTopic(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitTopic} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Topic Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={newTopic.title}
                    onChange={handleNewTopicChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={newTopic.category}
                    onChange={handleNewTopicChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    name="content"
                    value={newTopic.content}
                    onChange={handleNewTopicChange}
                    rows="6"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Create Topic
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussions;
