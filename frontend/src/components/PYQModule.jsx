import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Target, Database } from 'lucide-react';
import { pyqData } from '../data/pyqData';

const PYQModule = ({ course, topic }) => {
  // Filter questions based on course and topic (if topic is 'all', return all course questions)
  const questions = pyqData.filter(
    (q) => q.course.toLowerCase() === course.toLowerCase() && 
           (topic.toLowerCase() === 'all' || q.topic.toLowerCase() === topic.toLowerCase())
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="glass rounded-[3rem] p-10 border-slate-200/20 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 backdrop-blur-3xl shadow-xl h-full flex flex-col items-center justify-center text-center opacity-80 min-h-[400px]">
        <Database className="w-16 h-16 text-slate-400 mb-6 animate-pulse" />
        <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-2">Archive Expanding</h3>
        <p className="text-xs font-bold text-slate-500 max-w-sm">No Previous Year Questions have been uploaded for {topic} yet. Check back soon.</p>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  const handleSelect = (opt) => {
    if (selectedOpt) return; // Prevent changing answer
    setSelectedOpt(opt);
    if (opt === currentQ.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="glass rounded-[3rem] p-10 border-slate-200/20 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 backdrop-blur-3xl shadow-xl h-full flex flex-col justify-center items-center text-center min-h-[400px]">
        <Target className="w-16 h-16 text-emerald-500 mb-6" />
        <h2 className="text-4xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-2">Module Complete!</h2>
        <p className="text-lg font-bold text-slate-500 mb-8 tracking-widest uppercase text-[10px]">
          Mastery Score: <span className="text-emerald-500 text-2xl">{score} / {questions.length}</span>
        </p>
        <button 
          onClick={handleRestart}
          className="px-8 py-4 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          Restart Drill
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-[3rem] p-10 border-slate-200/20 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 backdrop-blur-3xl shadow-xl h-full flex flex-col justify-between min-h-[400px]">
      <div>
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-lg shadow-primary/20">
                    <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">Training Arena</h2>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Question {currentIdx + 1} of {questions.length}
            </span>
        </div>

        <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed mb-8">
            <span className="text-primary mr-2 italic">Q.</span>{currentQ.question}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = currentQ.answer === opt;
                const showCorrectness = selectedOpt !== null;
                
                let btnClass = "border-slate-200/40 dark:border-white/10 hover:border-primary/50 hover:bg-primary/5 text-slate-600 dark:text-slate-300";
                
                if (showCorrectness) {
                    if (isCorrect) {
                        btnClass = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/20";
                    } else if (isSelected && !isCorrect) {
                        btnClass = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 opacity-60";
                    } else {
                        btnClass = "border-slate-200/20 dark:border-white/5 opacity-40 grayscale";
                    }
                }

                return (
                    <button 
                        key={opt}
                        onClick={() => handleSelect(opt)}
                        disabled={selectedOpt !== null}
                        className={`p-5 rounded-2xl border text-sm font-bold text-left transition-all duration-300 flex items-center justify-between ${btnClass}`}
                    >
                        <span>{opt}</span>
                        {showCorrectness && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {showCorrectness && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                );
            })}
        </div>

        <AnimatePresence>
            {selectedOpt && (
                <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    className="mt-6 p-6 rounded-2xl bg-white/40 dark:bg-slate-900 border border-slate-200 dark:border-white/5"
                >
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Explanation</span>
                    <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-primary pl-4">
                        {currentQ.explanation}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedOpt === null}
          className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all
            ${selectedOpt !== null 
                ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 hover:scale-105 shadow-xl hover:shadow-2xl' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed'
            }`}
        >
          {currentIdx + 1 === questions.length ? 'Finish Module' : 'Next Protocol'} 
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PYQModule;
