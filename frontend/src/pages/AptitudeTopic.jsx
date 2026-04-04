import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Zap, BookOpen, PenTool } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import PYQModule from '../components/PYQModule';

const AptitudeTopic = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  // Format the ID to a readable title
  const title = topicId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden font-sans">
      <VisualEngine />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/courses/aptitude')}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.3em] bg-white/40 dark:bg-white/5 py-2 px-4 rounded-full border border-slate-200/20 dark:border-white/5 w-fit"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Modules
        </button>

        <header className="mb-16">
          <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-4 shadow-2xl shadow-primary/5"
          >
              <Zap className="w-4 h-4 fill-primary" /> Topic Drill
          </motion.div>
          <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase leading-none"
          >
              {title}
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Core Theory & Formulas Placeholder */}
            <div className="lg:col-span-4 space-y-8">
                <div className="glass rounded-[3rem] p-8 border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Core Concepts</h2>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 animate-pulse text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
                        Syncing Formulas...
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-4 italic">
                        This section represents the future scalable module where core theory and dynamic formulas will be injected via database.
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
