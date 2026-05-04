import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Sparkles, BookOpen, Brain, Terminal } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex items-center justify-center p-4">
      <VisualEngine />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white/80 p-12 md:p-16 text-center border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] backdrop-blur-xl"
      >
        <div className="flex justify-center mb-8">
            <div className="w-20 h-20 p-4 rounded-3xl bg-[#EAF0EA] border border-[#A3B18A]/20 shadow-sm">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#A3B18A]/10 text-[#588157] text-[11px] font-semibold uppercase tracking-widest mb-6 border border-[#A3B18A]/20"
        >
            The Future of Learning
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-[#2F3E46] font-poppins tracking-tight leading-tight">
          Master Your <br/> <span className="text-[#A3B18A]">Revision.</span>
        </h1>
        
        <p className="text-[#6B7A7A] text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto font-inter">
          Experience the world's first AI-powered <span className="text-[#588157] font-semibold">Smart Revise</span> environment tailored to your unique cognitive rhythm.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={handleCTA}
            className="btn-primary px-10 py-4 text-[16px]"
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
            <ArrowRight size={20} />
          </button>
          
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-[#DAD7CD] flex items-center justify-center shadow-sm">
                        <User className="w-4 h-4 text-[#2F3E46]" />
                    </div>
                ))}
            </div>
            <span className="text-[12px] text-[#6B7A7A] font-semibold uppercase tracking-wider">+2.5k preparing</span>
          </div>
        </div>

        {/* Feature badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
            {[
                { icon: Brain, label: 'AI Logic' },
                { icon: Terminal, label: 'Real-time' },
                { icon: BookOpen, label: 'Adaptive' }
            ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[#6B7A7A]/60">
                    <f.icon size={16} />
                    <span className="text-[11px] font-semibold uppercase tracking-widest">{f.label}</span>
                </div>
            ))}
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
    </div>
  );
};

// Simple User icon as fallback
const User = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default Home;
