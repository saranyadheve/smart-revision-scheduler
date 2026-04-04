import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, LogIn, ArrowRight, AlertCircle } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (identifier && password) {
      const result = await login({ username: identifier, password });
      if (result.success) {
        if (result.user.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.message || 'Invalid credentials.');
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4">
      <VisualEngine />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 italic">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400 font-light text-sm italic">Continue your journey toward mastery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold p-4 rounded-xl flex items-center gap-3 w-full"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 ml-1">Username or Email</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400 font-medium"
                placeholder="Enter username or email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800 transition-all placeholder:text-slate-400 font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-[10px] uppercase tracking-widest text-primary hover:underline font-black outline-none italic">Forgot Password?</button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 group outline-none"
          >
            Log In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-black hover:underline italic ml-1 outline-none">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
