import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User, ShieldCheck, BookOpen } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 w-full z-20 py-4 px-8 flex justify-between items-center transition-all bg-white/80 backdrop-blur-md border-b border-[#DAD7CD]/30">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 flex items-center justify-center bg-[#A3B18A] rounded-[10px] text-white shadow-sm group-hover:scale-105 transition-transform">
          <BookOpen size={20} strokeWidth={2} />
        </div>
        <span className="text-[20px] font-semibold text-[#2F3E46] tracking-tight font-poppins">
          Smart Revise
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        {user ? (
          <>
            <div className="hidden md:flex gap-6">
              <Link to="/dashboard" className="text-[#6B7A7A] hover:text-[#588157] transition-colors flex items-center gap-2 font-semibold uppercase tracking-widest text-[11px]">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              {user.role === 'ADMIN' && (
                <Link to="/admin-dashboard" className="text-[#A3B18A] hover:text-[#588157] transition-colors flex items-center gap-2 font-semibold uppercase tracking-widest text-[11px]">
                  <ShieldCheck size={16} />
                  Admin
                </Link>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F4F7F5] border border-[#DAD7CD]/30">
                <User size={14} className="text-[#A3B18A]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#2F3E46]">{user.username}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-lg bg-[#F4F7F5] text-[#6B7A7A] hover:bg-red-50 hover:text-red-500 transition-all border border-[#DAD7CD]/30 group"
                title="Logout"
              >
                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 rounded-lg text-[12px] font-semibold uppercase tracking-widest transition-all text-[#6B7A7A] hover:text-[#588157]">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2.5 rounded-lg bg-[#588157] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#2F3E46] transition-all shadow-md shadow-[#588157]/10">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
