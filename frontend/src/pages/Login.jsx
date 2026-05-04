import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, LogIn, ArrowRight, AlertCircle, Key, RefreshCw, CheckCircle2 } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import { verifyPasscode, resendPasscode } from '../services/api';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (identifier && password) {
      const result = await login({ username: identifier, password });
      if (result.success) {
        navigate(result.user.role === 'ADMIN' ? '/admin-dashboard' : '/dashboard');
      } else {
        if (result.message === 'ACCOUNT_UNVERIFIED') {
          setNeedsVerification(true);
          setError('Account not verified. Please enter the 4-digit code sent to your email.');
        } else {
          setError(result.message || 'Invalid credentials.');
        }
      }
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleVerifyPasscode = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!passcode || passcode.length !== 4) {
      setError('Please enter a valid 4-digit passcode.');
      return;
    }

    try {
      const response = await verifyPasscode({ email: identifier, passcode });
      setSuccess(response.data.message);
      setTimeout(() => {
        setNeedsVerification(false);
        setPasscode('');
        setError(null);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
    }
  };

  const handleResend = async () => {
    if (isResending) return;
    setIsResending(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await resendPasscode(identifier);
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend passcode.');
    } finally {
      setTimeout(() => setIsResending(false), 5000); // 5s cooldown
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-6 bg-[#F4F7F5]">
      <VisualEngine />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[420px] bg-white p-10 md:p-12 rounded-[32px] border border-[#DAD7CD]/30 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-[#A3B18A]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#A3B18A] border border-[#A3B18A]/10">
            {needsVerification ? <Key size={28} /> : <LogIn size={28} />}
          </div>
          <h2 className="text-[28px] font-semibold text-[#2F3E46] font-poppins tracking-tight mb-2">
            {needsVerification ? 'Verify Account' : 'Welcome Back'}
          </h2>
          <p className="text-[#6B7A7A] text-[14px] font-medium">
            {needsVerification ? 'Enter your 4-digit verification code.' : 'Continue your path toward mastery.'}
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="mb-6 bg-red-50 border border-red-100 text-red-500 text-[12px] font-medium p-4 rounded-xl flex items-center gap-3 w-full"
          >
            <AlertCircle size={18} className="flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="mb-6 bg-green-50 border border-green-100 text-[#588157] text-[12px] font-medium p-4 rounded-xl flex items-center gap-3 w-full"
          >
            <CheckCircle2 size={18} className="flex-shrink-0" />
            <span>{success}</span>
          </motion.div>
        )}

        {!needsVerification ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A] ml-1">Username or Email</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DAD7CD] group-focus-within:text-[#A3B18A] transition-colors" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#F4F7F5]/50 border border-[#DAD7CD]/30 rounded-xl py-3.5 pl-12 pr-4 !text-[#2F3E46] focus:outline-none focus:border-[#A3B18A] focus:bg-white transition-all placeholder:text-[#DAD7CD] text-[15px] font-medium"
                  placeholder="Enter username or email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A] ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DAD7CD] group-focus-within:text-[#A3B18A] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F4F7F5]/50 border border-[#DAD7CD]/30 rounded-xl py-3.5 pl-12 pr-4 !text-[#2F3E46] focus:outline-none focus:border-[#A3B18A] focus:bg-white transition-all placeholder:text-[#DAD7CD] text-[15px] font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-[11px] font-semibold uppercase tracking-widest text-[#A3B18A] hover:text-[#588157] transition-all">Forgot Password?</button>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4 justify-center"
            >
              Log In
              <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyPasscode} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7A7A] text-center block w-full">4-Digit Passcode</label>
              <div className="flex justify-center gap-4">
                <input
                  type="text"
                  maxLength="4"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full max-w-[180px] bg-[#F4F7F5]/50 border border-[#A3B18A]/30 rounded-2xl py-5 text-center text-3xl font-bold tracking-[0.5em] text-[#2F3E46] focus:outline-none focus:border-[#A3B18A] focus:bg-white transition-all shadow-inner"
                  placeholder="0000"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <button
                type="submit"
                className="w-full btn-primary py-4 justify-center shadow-lg"
              >
                Verify & Activate
                <CheckCircle2 size={18} />
              </button>
              
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className={`w-full flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all ${isResending ? 'text-[#DAD7CD]' : 'text-[#6B7A7A] hover:text-[#A3B18A]'}`}
              >
                <RefreshCw size={14} className={isResending ? 'animate-spin' : ''} />
                {isResending ? 'Sending...' : 'Resend Passcode'}
              </button>

              <button
                type="button"
                onClick={() => setNeedsVerification(false)}
                className="w-full text-[11px] font-bold uppercase tracking-widest text-[#DAD7CD] hover:text-[#2F3E46] pt-2"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        <div className="mt-10 text-center">
          <p className="text-[#6B7A7A] text-[13px] font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#A3B18A] font-semibold hover:text-[#588157] ml-1">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
