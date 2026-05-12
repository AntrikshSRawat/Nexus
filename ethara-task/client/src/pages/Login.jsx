import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { saveToken, saveUser } from '../utils/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(formData);
      saveToken(res.data.token);
      saveUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-950">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-900 border-r border-surface-800 items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-surface-50 mb-3">
            <span className="text-accent-400">N</span>exus
          </h1>
          <p className="text-surface-400 text-lg leading-relaxed">
            Streamlined project management for teams that ship fast. Track tasks, manage projects, and collaborate seamlessly.
          </p>
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-surface-400">
              <div className="w-8 h-8 rounded-lg bg-accent-600/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">Role-based access control</span>
            </div>
            <div className="flex items-center gap-3 text-surface-400">
              <div className="w-8 h-8 rounded-lg bg-accent-600/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">Kanban task tracking</span>
            </div>
            <div className="flex items-center gap-3 text-surface-400">
              <div className="w-8 h-8 rounded-lg bg-accent-600/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm">Real-time analytics dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="lg:hidden mb-8">
            <h1 className="text-2xl font-bold text-surface-50">
              <span className="text-accent-400">N</span>exus
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-surface-50">Welcome back</h2>
            <p className="text-surface-500 text-sm mt-1">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-surface-300 text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-surface-700 bg-surface-800/50 text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500/40"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-surface-300 text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-surface-700 bg-surface-800/50 text-surface-100 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500/40"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-600 hover:bg-accent-500 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-surface-500 text-sm text-center mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-400 hover:text-accent-300 font-medium">
              Create one
            </Link>
          </p>

          <div className="mt-8 p-3.5 bg-surface-800/50 rounded-lg text-xs text-surface-500 border border-surface-700/50">
            <p className="font-medium mb-1.5 text-surface-400">Demo credentials</p>
            <p>Admin: admin@task.com / password123</p>
            <p>Member: john@task.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
