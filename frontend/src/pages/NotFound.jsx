import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VisualEngine from '../components/VisualEngine';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            <VisualEngine />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl text-center relative z-10 glass p-12 md:p-16 rounded-[4rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl"
            >
                <div className="w-24 h-24 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-rose-500/20">
                    <AlertCircle className="w-12 h-12 text-rose-500" />
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase mb-4">
                    404
                </h1>
                
                <h2 className="text-xl md:text-2xl font-bold text-slate-600 dark:text-slate-300 italic tracking-tight mb-4">
                    Signal Lost in Processing
                </h2>
                
                <p className="text-xs font-medium text-slate-500 mb-10 leading-relaxed">
                    The requested simulation module or file pathway could not be located in our databanks. The link may be broken or the module removed.
                </p>
                
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center justify-center gap-3 w-full py-5 rounded-[2rem] bg-primary text-white font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Return to Base
                </button>
            </motion.div>
        </div>
    );
};

export default NotFound;
