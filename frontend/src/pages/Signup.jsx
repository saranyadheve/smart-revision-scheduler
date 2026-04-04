import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, ArrowRight, Sparkles } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/\d/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup({ username, password, email });
      if (result.success) {
        setIsSuccess(true);
      } else {
        setServerError(result.message || 'Registration failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      setServerError('A network error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4">
      <VisualEngine />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-xl shadow-primary/5">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 italic">Begin Your Mastery</h2>
          <p className="text-slate-500 dark:text-slate-400 font-light max-w-xs mx-auto text-sm leading-relaxed italic">Join a community of focused scholars and unlock your true potential with AI-driven revision.</p>
        </div>

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20 shadow-xl shadow-green-500/10">
              <Mail className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Registration Successful!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
              We've sent a verification link to <span className="text-primary font-bold">{email}</span>. 
              Please check your inbox and verify your email to activate your account.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
            >
              Back to Login
            </motion.button>
          </motion.div>
        ) : (
          <>
            {serverError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center uppercase tracking-widest"
              >
                {serverError}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
               <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Username</label>
                <div className="relative group">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.username ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary'}`} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    className={`w-full bg-slate-50 dark:bg-slate-800/50 border rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 text-sm font-medium ${errors.username ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800'}`}
                    placeholder="Choose a study name"
                  />
                </div>
                {errors.username && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{errors.username}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Email Address</label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary'}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className={`w-full bg-slate-50 dark:bg-slate-800/50 border rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 text-sm font-medium ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800'}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-widest">Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary'}`} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className={`w-full bg-slate-50 dark:bg-slate-800/50 border rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 text-sm font-medium ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary/50 focus:bg-white dark:focus:bg-slate-800'}`}
                    placeholder="Min 8 characters, incl. numbers"
                  />
                </div>
                {errors.password && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">{errors.password}</p>}
              </div>

              <div className="flex items-center gap-2 ml-1 opacity-70">
                <input type="checkbox" required disabled={isLoading} className="rounded bg-white/5 border-slate-300 dark:border-white/10 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">I agree to the Study Terms of Service</label>
              </div>

              <motion.button
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl mt-4 outline-none ${isLoading ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark shadow-primary/20 group'}`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Create My Account
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </>
        )}

        <div className="mt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Already preparing?{' '}
            <Link to="/login" className="text-primary font-black hover:underline italic ml-1 outline-none">Log In Instead</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
