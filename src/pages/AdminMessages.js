import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('api_token') || '');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.contacts);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch messages');
      setMessages(data.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;
      const res = await fetch(`${API_ENDPOINTS.contacts}/${id}`, { method: 'DELETE', headers });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }
      setMessages((m) => m.filter((x) => x.id !== id));
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const doLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setError('');
    try {
      const res = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!data.success || !data.user) throw new Error(data.error || 'Login failed');
      const t = data.token || '';
      setToken(t);
      localStorage.setItem('api_token', t);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      {!token && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Admin login</h2>
          <form onSubmit={doLogin} className="flex gap-2 items-center flex-wrap">
            <input className="border px-2 py-1 rounded" placeholder="email" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
            <input className="border px-2 py-1 rounded" placeholder="password" type="password" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />
            <button className="bg-blue-600 text-white px-3 py-1 rounded" disabled={loggingIn}>{loggingIn? 'Logging…' : 'Login'}</button>
          </form>
        </div>
      )}
      {loading && <p>Loading messages…</p>}
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
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
            {token && (
              <div className="absolute top-3 right-3">
                <button onClick={() => handleDelete(m.id)} className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;

