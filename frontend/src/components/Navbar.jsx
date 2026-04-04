import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User, ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Ready to pause your study journey? Your progress is saved.")) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 glass border-b border-slate-200/10 dark:border-white/5 py-4 px-8 flex justify-between items-center transition-all bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-12 h-12 p-1 rounded-2xl bg-white/10 dark:bg-white/5 border border-slate-200/20 dark:border-white/10 shadow-xl shadow-black/5 group-hover:scale-110 transition-transform overflow-hidden flex items-center justify-center">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain mix-blend-normal" />
        </div>
        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-white/50 tracking-tighter italic">
          Smart Revise
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        {user ? (
          <>
            <div className="hidden md:flex gap-6">
              <Link to="/dashboard" className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin-dashboard" className="text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                  <ShieldCheck className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/5">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">{user.username}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5 group border border-red-500/10"
                title="Logout"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-6 py-2.5 rounded-xl glass border-slate-200 dark:border-white/10 hover:border-primary text-[10px] font-black uppercase tracking-widest transition-all text-slate-700 dark:text-slate-300">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2.5 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
