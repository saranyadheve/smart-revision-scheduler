import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb,
  Clock,
  Target,
  Trophy,
  ArrowRight,
  Activity
} from 'lucide-react';
import { generateQuestions } from '../services/AptitudeGenerator';
import VisualEngine from '../components/VisualEngine';
import { saveTestResult } from '../services/activityTracker';

const AptitudePracticeSession = () => {
  const { module, subtopicId } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('practice'); // 'practice' or 'timed'
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins defaults
  const [sessionFinished, setSessionFinished] = useState(false);

  const cacheKey = `aptitude_cache_${module}_${subtopicId}`;

  useEffect(() => {
    const initSession = () => {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setQuestions(JSON.parse(cached));
      } else {
        const generated = generateQuestions(module, subtopicId, 35);
        setQuestions(generated);
        localStorage.setItem(cacheKey, JSON.stringify(generated));
      }
      setLoading(false);
    };

    initSession();
  }, [module, subtopicId, cacheKey]);

  // Timer for Timed Mode
  useEffect(() => {
    let timer;
    if (mode === 'timed' && !sessionFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setSessionFinished(true);
    }
    return () => clearInterval(timer);
  }, [mode, sessionFinished, timeLeft]);

  // Sync with global activity tracker
  useEffect(() => {
    if (sessionFinished) {
      const score = calculateScore();
      saveTestResult(module, score, questions.length);
    }
  }, [sessionFinished]);

  const handleOptionSelect = (option) => {
    if (sessionFinished) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: option
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setShowSolution(false);
    } else {
      setSessionFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setShowSolution(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetSession = () => {
    if (window.confirm("Are you sure you want to reset? Current progress will be lost.")) {
      localStorage.removeItem(cacheKey);
      window.location.reload();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
      <div className="flex flex-col items-center gap-4">
        <RotateCcw className="animate-spin text-[#A3B18A]" size={40} />
        <p className="text-[13px] font-bold text-[#6B7A7A] uppercase tracking-widest">Generating Curriculum...</p>
      </div>
    </div>
  );

  const currentQ = questions[currentIndex];
  const title = subtopicId.replace(/-/g, ' ');
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (sessionFinished) {
    const score = calculateScore();
    return (
      <div className="relative min-h-screen pt-24 pb-12 px-6 bg-[#F4F7F5] flex items-center justify-center">
        <VisualEngine />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white p-12 rounded-[48px] border border-[#DAD7CD]/40 shadow-2xl text-center relative z-10"
        >
          <div className="w-24 h-24 bg-[#588157]/10 rounded-[32px] flex items-center justify-center text-[#588157] mx-auto mb-8">
            <Trophy size={48} />
          </div>
          <h2 className="text-4xl font-bold text-[#2F3E46] font-poppins mb-4 tracking-tight">Session Complete.</h2>
          <p className="text-[#6B7A7A] mb-10 text-[15px] font-medium uppercase tracking-[0.2em]">{title}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-[#F4F7F5] p-6 rounded-3xl border border-[#DAD7CD]/30">
              <span className="text-[11px] font-black text-[#A3B18A] uppercase tracking-widest block mb-2">Final Score</span>
              <span className="text-3xl font-bold text-[#2F3E46] font-poppins">{score} / {questions.length}</span>
            </div>
            <div className="bg-[#F4F7F5] p-6 rounded-3xl border border-[#DAD7CD]/30">
              <span className="text-[11px] font-black text-[#A3B18A] uppercase tracking-widest block mb-2">Accuracy</span>
              <span className="text-3xl font-bold text-[#2F3E46] font-poppins">{Math.round((score/questions.length)*100)}%</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/aptitude')}
            className="w-full py-5 bg-[#2F3E46] text-white rounded-[24px] font-bold uppercase tracking-widest text-[13px] hover:bg-[#588157] transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            Back to Hub <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5] font-inter overflow-x-hidden">
      <VisualEngine />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/aptitude')}
              className="w-10 h-10 rounded-xl bg-white border border-[#DAD7CD]/30 flex items-center justify-center text-[#6B7A7A] hover:bg-[#F4F7F5] transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#2F3E46] font-poppins tracking-tighter capitalize">{title}</h1>
              <span className="text-[10px] font-black text-[#A3B18A] uppercase tracking-[0.3em]">{module.replace(/-/g, ' ')} Module</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-[20px] border border-[#DAD7CD]/30">
            <button 
              onClick={() => setMode('practice')}
              className={`px-6 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all ${mode === 'practice' ? 'bg-[#588157] text-white shadow-lg' : 'text-[#6B7A7A] hover:bg-[#F4F7F5]'}`}
            >
              <HelpCircle size={14} className="inline mr-2" /> Practice
            </button>
            <button 
              onClick={() => { setMode('timed'); if (timeLeft === 1800) setTimeLeft(1800); }}
              className={`px-6 py-2.5 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all ${mode === 'timed' ? 'bg-[#2F3E46] text-white shadow-lg' : 'text-[#6B7A7A] hover:bg-[#F4F7F5]'}`}
            >
              <Clock size={14} className="inline mr-2" /> {mode === 'timed' ? formatTime(timeLeft) : 'Timed'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#DAD7CD]/30 rounded-full mb-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#588157]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Question Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-10 md:p-14 rounded-[48px] border border-[#DAD7CD]/30 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="px-4 py-1.5 bg-[#F4F7F5] rounded-full text-[10px] font-black text-[#A3B18A] uppercase tracking-widest border border-[#DAD7CD]/20">
                    Question {currentIndex + 1} / {questions.length}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    currentQ.difficulty === 'Easy' ? 'bg-green-50 text-green-600 border-green-100' :
                    currentQ.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                    'bg-red-50 text-red-600 border-red-100'
                  }`}>
                    {currentQ.difficulty} Level
                  </span>
                </div>

                <h3 className="text-[20px] md:text-[24px] font-semibold text-[#2F3E46] leading-relaxed mb-12 font-poppins tracking-tight">
                  {currentQ.question}
                </h3>

                <div className="space-y-4">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[currentIndex] === opt;
                    const isCorrect = showAnswer && opt === currentQ.correctAnswer;
                    const isWrong = showAnswer && isSelected && opt !== currentQ.correctAnswer;

                    return (
                      <button 
                        key={idx}
                        onClick={() => handleOptionSelect(opt)}
                        disabled={showAnswer}
                        className={`w-full p-6 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                          isCorrect ? 'bg-green-50 border-green-200 text-green-700' :
                          isWrong ? 'bg-red-50 border-red-200 text-red-700' :
                          isSelected ? 'bg-[#2F3E46] border-[#2F3E46] text-white shadow-xl scale-[1.02]' :
                          'bg-white border-[#DAD7CD]/50 hover:border-[#A3B18A]/50 hover:bg-[#F4F7F5] text-[#4A5D5D]'
                        }`}
                      >
                        <span className="text-[15px] font-medium transition-colors">
                          {opt}
                        </span>
                        {isCorrect && <CheckCircle2 size={20} />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => setShowAnswer(!showAnswer)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all ${showAnswer ? 'bg-[#A3B18A]/20 text-[#588157]' : 'bg-[#F4F7F5] text-[#6B7A7A] hover:bg-[#DAD7CD]/30'}`}
                  >
                    <CheckCircle2 size={16} /> {showAnswer ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  <button 
                    onClick={() => setShowSolution(!showSolution)}
                    disabled={!showAnswer}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all disabled:opacity-30 ${showSolution ? 'bg-[#588157]/20 text-[#588157]' : 'bg-[#F4F7F5] text-[#6B7A7A] hover:bg-[#DAD7CD]/30'}`}
                  >
                    <Lightbulb size={16} /> Solution
                  </button>
                  <button 
                    onClick={resetSession}
                    className="ml-auto text-[#DAD7CD] hover:text-red-400 transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>

                <AnimatePresence>
                  {showSolution && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-8 p-8 bg-[#F4F7F5] rounded-3xl border border-dashed border-[#DAD7CD] overflow-hidden"
                    >
                      <div className="flex items-center gap-3 mb-4 text-[#A3B18A]">
                        <Lightbulb size={18} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Step-by-Step Logic</span>
                      </div>
                      <p className="text-[14px] text-[#2F3E46] leading-relaxed font-medium">
                        {currentQ.solution}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="mt-10 flex items-center justify-between">
              <button 
                onClick={handlePrev}
                className="flex items-center gap-3 px-10 py-5 bg-white border border-[#DAD7CD]/30 rounded-[20px] text-[13px] font-bold uppercase tracking-widest text-[#6B7A7A] hover:bg-[#F4F7F5] transition-all disabled:opacity-20"
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={18} /> Prev
              </button>
              <button 
                onClick={handleNext}
                className="flex items-center gap-3 px-12 py-5 bg-[#2F3E46] text-white rounded-[20px] text-[13px] font-bold uppercase tracking-widest hover:bg-[#588157] transition-all shadow-xl shadow-[#2F3E46]/10"
              >
                {currentIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Sidebar - Stats & Shortcuts */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
            <div className="bg-[#2F3E46] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <Target size={120} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[18px] font-bold font-poppins mb-8 flex items-center gap-3">
                  <Activity className="text-[#A3B18A]" size={20} /> Live Stats
                </h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-[#A3B18A] mb-3">
                      <span>Accuracy</span>
                      <span>{calculateScore()} / {Object.keys(selectedAnswers).length || 0}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ width: `${(calculateScore() / (Object.keys(selectedAnswers).length || 1)) * 100}%` }}
                        className="h-full bg-[#A3B18A]" 
                      />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Answered</span>
                      <span className="text-xl font-bold font-poppins">{Object.keys(selectedAnswers).length}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Remaining</span>
                      <span className="text-xl font-bold font-poppins">{questions.length - currentIndex}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-[#DAD7CD]/40 shadow-sm">
                <h4 className="text-[14px] font-black text-[#2F3E46] uppercase tracking-widest mb-6">Quick Navigation</h4>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-full aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                        currentIndex === i ? 'bg-[#2F3E46] text-white' :
                        selectedAnswers[i] ? 'bg-[#A3B18A]/20 text-[#588157]' :
                        'bg-[#F4F7F5] text-[#6B7A7A] hover:bg-[#DAD7CD]/30'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudePracticeSession;
