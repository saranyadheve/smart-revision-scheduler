import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
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
      newErrors.email = 'Invalid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Min 8 characters required';
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
        setServerError(result.message || 'Registration failed.');
        setIsLoading(false);
      }
    } catch (error) {
      setServerError('A network error occurred.');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-6 bg-[#F4F7F5]">
      <VisualEngine />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[480px] bg-white p-10 md:p-12 rounded-[32px] border border-[#DAD7CD]/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[#A3B18A]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#A3B18A] border border-[#A3B18A]/10">
            <UserPlus size={28} />
          </div>
          <h2 className="text-[28px] font-semibold text-[#2F3E46] font-poppins tracking-tight mb-2">Begin Your Mastery</h2>
          <p className="text-[#6B7A7A] text-[14px] font-medium">Join a focused community of scholars.</p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 bg-[#EAF0EA] rounded-full flex items-center justify-center mx-auto mb-6 text-[#588157]">
                <Mail size={40} />
              </div>
              <h2 className="text-2xl font-semibold text-[#2F3E46] mb-4 font-poppins">Success!</h2>
              <p className="text-[#6B7A7A] text-[14px] mb-10 leading-relaxed max-w-[300px] mx-auto">
                Verification link sent to <span className="text-[#588157] font-semibold">{email}</span>.
                Check your inbox to activate your account.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary w-full justify-center"
              >
                Continue to Login
              </button>
            </motion.div>
          ) : (
            <motion.div key="form">
              {serverError && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-500 text-[12px] font-medium flex items-center gap-3">
                  <AlertCircle size={18} />
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A] ml-1">Username</label>
                  <div className="relative group">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.username ? 'text-red-400' : 'text-[#DAD7CD] group-focus-within:text-[#A3B18A]'}`} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      className={`w-full bg-[#F4F7F5]/50 border rounded-xl py-3.5 pl-12 pr-4 !text-[#2F3E46] focus:outline-none transition-all placeholder:text-[#DAD7CD] text-[15px] font-medium ${errors.username ? 'border-red-300' : 'border-[#DAD7CD]/30 focus:border-[#A3B18A] focus:bg-white'}`}
                      placeholder="Choose a study name"
                    />
                  </div>
                  {errors.username && <p className="text-[10px] text-red-500 font-semibold uppercase tracking-widest ml-1">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A] ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-red-400' : 'text-[#DAD7CD] group-focus-within:text-[#A3B18A]'}`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className={`w-full bg-[#F4F7F5]/50 border rounded-xl py-3.5 pl-12 pr-4 text-[#2F3E46] focus:outline-none transition-all placeholder:text-[#DAD7CD] text-[15px] font-medium ${errors.email ? 'border-red-300' : 'border-[#DAD7CD]/30 focus:border-[#A3B18A] focus:bg-white'}`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 font-semibold uppercase tracking-widest ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A] ml-1">Password</label>
                  <div className="relative group">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? 'text-red-400' : 'text-[#DAD7CD] group-focus-within:text-[#A3B18A]'}`} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className={`w-full bg-[#F4F7F5]/50 border rounded-xl py-3.5 pl-12 pr-4 text-[#2F3E46] focus:outline-none transition-all placeholder:text-[#DAD7CD] text-[15px] font-medium ${errors.password ? 'border-red-300' : 'border-[#DAD7CD]/30 focus:border-[#A3B18A] focus:bg-white'}`}
                      placeholder="Min 8 characters required"
                    />
                  </div>
                  {errors.password && <p className="text-[10px] text-red-500 font-semibold uppercase tracking-widest ml-1">{errors.password}</p>}
                </div>

                <div className="flex items-center gap-3 ml-1">
                  <input type="checkbox" required disabled={isLoading} className="rounded border-[#DAD7CD] text-[#A3B18A] focus:ring-[#A3B18A] w-4 h-4 cursor-pointer" />
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A]">I agree to the Study Terms</label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all font-semibold uppercase tracking-widest text-[13px] shadow-lg outline-none ${isLoading ? 'bg-[#F4F7F5] text-[#DAD7CD]' : 'btn-primary'}`}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                  {!isLoading && <Sparkles size={18} />}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 text-center">
          <p className="text-[#6B7A7A] text-[13px] font-medium">
            Already preparing?{' '}
            <Link to="/login" className="text-[#A3B18A] font-semibold hover:text-[#588157] ml-1">Log In Instead</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
