import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Timer, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import VisualEngine from '../components/VisualEngine';

const MockTest = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [status, setStatus] = useState('QUIZ'); // 'QUIZ' | 'RESULT'
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
    const timerRef = useRef(null);

    // Filter questions for the test (using first 20 for demo, or all)
    const testQuestions = questions.slice(0, 20); // Adjust as needed

    useEffect(() => {
        // Start timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleAnswer = (questionId, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const handleSubmit = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setStatus('RESULT');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const calculateScore = () => {
        let correct = 0;
        testQuestions.forEach(q => {
            if (answers[q.id] === q.answer) {
                correct++;
            }
        });
        return {
            correct,
            total: testQuestions.length,
            percent: Math.round((correct / testQuestions.length) * 100)
        };
    };

    if (status === 'QUIZ') {
        const q = testQuestions[currentIndex];
        const isTimeLow = timeLeft <= 60;

        return (
            <div className="relative w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-slate-50 dark:bg-slate-950">
                <VisualEngine />
                <div className="max-w-4xl w-full relative z-10">

                    {/* Header */}
                    <header className="flex justify-between items-center mb-12 glass p-6 rounded-3xl border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-xl">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.4em]">
                                MOCK TEST
                            </span>
                            <div className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span className="text-[10px] md:text-xs font-black text-slate-500">
                                QUE {currentIndex + 1} OF {testQuestions.length}
                            </span>
                        </div>
                        <div className={`flex items-center gap-3 px-4 py-2 md:px-6 md:py-2 rounded-2xl border transition-colors ${
                            isTimeLow
                                ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 animate-pulse'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                        }`}>
                            <Timer className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="text-lg md:text-xl font-black italic tabular-nums pb-[2px]">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </header>

                    {/* Question */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 md:p-16 rounded-[3.5rem] border-slate-200/20 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 shadow-2xl backdrop-blur-3xl mb-8"
                    >
                        <h2 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white leading-relaxed mb-12 italic tracking-tight">
                            <span className="text-primary mr-3">Q{currentIndex + 1}.</span>
                            {q.question}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {q.options.map((option, idx) => {
                                const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                                const isSelected = answers[q.id] === option;
                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswer(q.id, option)}
                                        className={`p-6 rounded-[2rem] border text-left flex items-center gap-6 transition-all group shadow-sm hover:shadow-xl ${
                                            isSelected
                                                ? 'bg-primary/20 border-primary text-slate-800 dark:text-white'
                                                : 'bg-white/40 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all text-xs ${
                                            isSelected
                                                ? 'bg-primary text-white scale-110'
                                                : 'bg-slate-200 dark:bg-white/5 group-hover:bg-primary/20 group-hover:text-primary pt-[2px]'
                                        }`}>
                                            {optionLetter}
                                        </div>
                                        <span className="flex-grow font-semibold text-base md:text-lg">
                                            {option}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center px-4 md:px-8">
                        <button
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-400 hover:text-primary disabled:opacity-20 transition-all flex items-center gap-3"
                        >
                            <ArrowLeft className="w-4 h-4 hidden md:block" /> PREV QUESTION
                        </button>

                        {currentIndex === testQuestions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-4 md:px-12 md:py-5 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                            >
                                Complete Test
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentIndex(prev => prev + 1)}
                                className="px-8 py-4 md:px-12 md:py-5 bg-white shadow-xl dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/10 text-slate-800 dark:text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs transition-all flex items-center gap-3"
                            >
                                NEXT QUESTION <ArrowRight className="w-4 h-4 hidden md:block" />
                            </button>
                        )}
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center justify-center gap-2 mt-10">
                        {testQuestions.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`rounded-full transition-all ${
                                    i === currentIndex
                                        ? 'w-6 h-2.5 bg-primary'
                                        : answers[testQuestions[i].id]
                                            ? 'w-2.5 h-2.5 bg-emerald-500'
                                            : 'w-2.5 h-2.5 bg-slate-300 dark:bg-white/10'
                                }`}
                                title={`Question ${i + 1}${answers[testQuestions[i].id] ? ' (answered)' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Result screen
    if (status === 'RESULT') {
        const score = calculateScore();

        return (
            <div className="relative w-full min-h-screen pt-32 px-6 flex flex-col items-center bg-slate-50 dark:bg-slate-950">
                <VisualEngine />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl w-full glass p-10 md:p-16 rounded-[4rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl text-center relative z-10 overflow-hidden"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[80px] -z-10" />

                    <Trophy className="w-24 h-24 mx-auto mb-10 drop-shadow-2xl text-amber-500" />
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-2">
                        Test Completed
                    </h2>
                    <p className="font-black uppercase tracking-[0.4em] text-[10px] mb-12 text-emerald-500">
                        ✓ Results Ready
                    </p>

                    <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16">
                        <div className="p-6 md:p-8 rounded-[2.5rem] bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-inner">
                            <div className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white italic mb-2 tracking-tighter">
                                {score.correct}/{score.total}
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Correct Answers
                            </span>
                        </div>
                        <div className="p-6 md:p-8 rounded-[2.5rem] bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 shadow-inner">
                            <div className="text-4xl md:text-5xl font-black italic mb-2 tracking-tighter text-emerald-500">
                                {score.percent}%
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Score
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/mock-tests')}
                        className="w-full py-4 md:py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                    >
                        <Trophy className="w-4 h-4" /> Back to Mock Tests
                    </button>
                </motion.div>
            </div>
        );
    }

    return null;
};

export default MockTest;