import React, { useEffect, useState } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/api/contacts`)
      .then((r) => r.json())
      .then((data) => { setMessages(data); setLoading(false); })
      .catch((e) => { setError(String(e)); setLoading(false); });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    try {
      const res = await fetch(`${apiUrl}/api/contacts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      // optimistic update
      setMessages((m) => m.filter((x) => x.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      {loading && <p>Loading messages…</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !messages.length && <p>No messages found.</p>}
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="border rounded p-4 bg-white shadow relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{m.name} <span className="text-sm text-gray-500">&lt;{m.email}&gt;</span></h3>
                {m.subject && <p className="text-sm text-gray-600">Subject: {m.subject}</p>}
              </div>
              <div className="text-sm text-gray-500">{new Date(m.created_at).toLocaleString()}</div>
            </div>
            <p className="mt-3 whitespace-pre-wrap">{m.message}</p>
            <div className="absolute top-3 right-3">
              <button onClick={() => handleDelete(m.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
