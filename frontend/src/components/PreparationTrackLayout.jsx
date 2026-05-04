import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles, Layout } from 'lucide-react';
import VisualEngine from './VisualEngine';

const PreparationTrackLayout = ({ 
  title, 
  subtitle, 
  description, 
  icon: Icon,
  tabs = [], 
  activeTab, 
  setActiveTab, 
  children,
  headerBadge = "Strategic Intelligence"
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Main track options for consistent navigation between paths
  const tracks = [
    { name: 'UPSC Hub', path: '/notes/upsc' },
    { name: 'TNPSC Hub', path: '/notes/tnpsc' },
    { name: 'GATE Tech', path: '/notes/gate' },
    { name: 'IT Interview', path: '/notes/it-interview' }
  ];

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5] transition-all overflow-hidden selection:bg-[#A3B18A]/30">
      <VisualEngine />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation / Back */}
        <div className="mb-10 flex items-center justify-between gap-4 flex-wrap">
           <button 
             onClick={() => navigate('/dashboard')}
             className="flex items-center gap-2 text-[#6B7A7A] hover:text-[#588157] transition-all text-[11px] font-bold uppercase tracking-[0.2em] bg-white/60 py-3 px-6 rounded-2xl border border-[#DAD7CD]/30 w-fit backdrop-blur-md shadow-sm active:scale-95"
           >
             <ChevronLeft size={16} /> Hub Dashboard
           </button>

           <div className="flex items-center gap-2 bg-white/40 p-1.5 rounded-2xl border border-[#DAD7CD]/30 backdrop-blur-md shadow-sm">
             {tracks.map(track => (
               <button
                 key={track.path}
                 onClick={() => navigate(track.path)}
                 className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                   location.pathname === track.path 
                   ? 'bg-[#588157] text-white shadow-md' 
                   : 'text-[#6B7A7A] hover:bg-white hover:text-[#2F3E46]'
                 }`}
               >
                 {track.name}
               </button>
             ))}
           </div>
        </div>

        {/* Global Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[10px] font-black text-[#A3B18A] uppercase tracking-[0.3em] mb-4 bg-white/40 px-4 py-1.5 rounded-full border border-[#DAD7CD]/20 w-fit">
             <Sparkles size={12} /> {headerBadge}
          </div>
          <h1 className="text-[34px] md:text-[48px] font-semibold text-[#2F3E46] font-poppins tracking-tighter leading-tight flex items-center gap-4">
            {title} <span className="text-[#A3B18A]/60">{subtitle}</span>
          </h1>
          <p className="text-[#6B7A7A] text-[15px] max-w-2xl mt-4 leading-relaxed font-inter">
            {description}
          </p>
        </header>

        {/* Top-Level Tab Navigation (if tabs exist) */}
        {tabs.length > 0 && (
          <div className="flex items-center gap-2 mb-12 bg-white/40 p-2 rounded-[24px] border border-[#DAD7CD]/30 w-fit backdrop-blur-xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-8 py-3.5 rounded-[18px] text-[13px] font-bold transition-all
                  ${activeTab === tab.id 
                    ? 'bg-[#588157] text-white shadow-xl shadow-[#588157]/20 scale-105' 
                    : 'text-[#6B7A7A] hover:text-[#2F3E46] hover:bg-white'}
                `}
              >
                <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 1.5} />
                {tab.name}
              </button>
            ))}
          </div>
        )}

        {/* Content with Animation */}
        <div className="relative">
          <AnimatePresence mode="wait">
             <motion.div
               key={activeTab || 'static'}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ duration: 0.3, ease: 'easeOut' }}
             >
                {children}
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PreparationTrackLayout;
