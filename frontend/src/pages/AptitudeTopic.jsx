import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, BookOpen } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import PYQModule from '../components/PYQModule';

const AptitudeTopic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  // Format the ID to a readable title
  const title = topicId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5] transition-colors overflow-x-hidden font-sans">
      <VisualEngine />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/courses/aptitude')}
          className="flex items-center gap-2 text-[#6B7A7A] hover:text-[#588157] transition-all text-[11px] font-semibold uppercase tracking-widest bg-white/80 py-2.5 px-5 rounded-xl border border-[#DAD7CD]/30 w-fit shadow-sm"
        >
          <ChevronLeft size={16} /> Back to Modules
        </button>

        <header className="mb-16">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#A3B18A]/10 border border-[#A3B18A]/20 text-[#588157] font-semibold uppercase tracking-[0.3em] text-[10px] mb-6"
          >
              <Zap size={14} className="text-[#A3B18A]" /> Topic Drill
          </motion.div>
          <motion.h1 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-semibold text-[#2F3E46] font-poppins tracking-tight"
          >
              {title}
          </motion.h1>
          <div className="w-16 h-1.5 bg-[#A3B18A] rounded-full mt-6" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Core Theory & Formulas Placeholder */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-white rounded-[32px] p-8 border border-[#DAD7CD]/30 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-[#F4F7F5] text-[#A3B18A] rounded-2xl border border-[#DAD7CD]/20">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-[18px] font-semibold text-[#2F3E46] font-poppins tracking-tight uppercase tracking-wider">Core Concepts</h2>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#F4F7F5]/50 border border-[#DAD7CD]/30 text-center space-y-4">
                        <div className="flex justify-center italic text-[#A3B18A]">
                           <span className="dot animate-bounce mx-0.5 w-1.5 h-1.5 bg-[#A3B18A] rounded-full" />
                           <span className="dot animate-bounce delay-100 mx-0.5 w-1.5 h-1.5 bg-[#A3B18A] rounded-full" />
                           <span className="dot animate-bounce delay-200 mx-0.5 w-1.5 h-1.5 bg-[#A3B18A] rounded-full" />
                        </div>
                        <p className="text-[11px] font-semibold text-[#6B7A7A] uppercase tracking-widest">
                           Syncing Formulas...
                        </p>
                    </div>
                    <p className="text-[13px] text-[#6B7A7A] leading-relaxed mt-8 font-inter bg-[#F4F7F5]/30 p-5 rounded-2xl border border-dashed border-[#DAD7CD]">
                        Our database is currently optimizing core theory and dynamic shortcuts for <span className="text-[#588157] font-semibold">{title}</span>. 
                        They will be injected here automatically soon.
                    </p>
                </div>
            </div>

            {/* Questions Arena (Live PYQ Module) */}
            <div className="lg:col-span-8">
                <PYQModule course="Aptitude" topic={topicId} />
            </div>

        </div>
      </div>
    </div>
  );
};

export default AptitudeTopic;
