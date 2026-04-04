import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Timer, ArrowRight, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getQuestionsByCategory } from '../services/api';
import { saveTestResult } from '../services/activityTracker';
import VisualEngine from '../components/VisualEngine';

const DUMMY_QUESTIONS = [
    { content: "Under which Article of the Constitution can the President declare a National Emergency?", optionA: "Article 352", optionB: "Article 356", optionC: "Article 360", optionD: "Article 370", correctAnswer: "A" },
    { content: "Which schedule of the Indian Constitution contains provisions related to anti-defection?", optionA: "Eighth Schedule", optionB: "Ninth Schedule", optionC: "Tenth Schedule", optionD: "Eleventh Schedule", correctAnswer: "C" },
    { content: "Who was the first Governor-General of independent India?", optionA: "C. Rajagopalachari", optionB: "Lord Mountbatten", optionC: "Dr. Rajendra Prasad", optionD: "Jawaharlal Nehru", correctAnswer: "B" },
    { content: "The Reserve Bank of India was established on:", optionA: "1 April 1935", optionB: "1 January 1949", optionC: "26 January 1950", optionD: "15 August 1947", correctAnswer: "A" },
    { content: "Which of the following lines separates India from China?", optionA: "Radcliffe Line", optionB: "Durand Line", optionC: "MacMahon Line", optionD: "Maginot Line", correctAnswer: "C" }
];

const UPSCMockTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [status, setStatus] = useState('QUIZ'); // 'QUIZ' | 'RESULT'
    const [timeLeft, setTimeLeft] = useState(0);

    // Refs so timer callbacks and submit always read the latest values
    // (avoids ALL stale-closure issues without nested state updater calls)
    const timerRef = useRef(null);
    const submitFiredRef = useRef(false);
    const questionsRef = useRef([]);
    const answersRef = useRef({});

    // Keep refs in sync with state
    useEffect(() => { questionsRef.current = questions; }, [questions]);
    useEffect(() => { answersRef.current = answers; }, [answers]);

    // ── Score calculation (always reads from ref — safe at any point) ──────────
    const calculateScore = useCallback(() => {
        const qs = questionsRef.current;
        const ans = answersRef.current;
        if (!qs.length) return { correct: 0, total: 0, percent: 0 };
        const correct = qs.reduce((acc, q, i) => acc + (ans[i] === q.correctAnswer ? 1 : 0), 0);
        return {
            correct,
            total: qs.length,
            percent: Math.round((correct / qs.length) * 100),
        };
    }, []);

    // ── Submit handler — reads from refs, never from stale closure ─────────────
    const handleSubmit = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        const { correct, total } = calculateScore();
        saveTestResult('UPSC', correct, total);
        setStatus('RESULT');
    }, [calculateScore]);

    // ── Quiz initialization ────────────────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;

        const startQuiz = async () => {
            let loadedQuestions = DUMMY_QUESTIONS;
            let duration = 30 * 60;

            try {
                const response = await getQuestionsByCategory('UPSC');
                if (response?.data?.length > 0) {
                    loadedQuestions = response.data;
                    duration = response.data.length * 60;
                }
            } catch {
                console.warn('API unavailable — using built-in UPSC Mock data.');
            }

            duration = loadedQuestions.length * 60;

            if (cancelled) return;

            setQuestions(loadedQuestions);
            setAnswers({});
            setCurrentIndex(0);
            setTimeLeft(duration);
            submitFiredRef.current = false;

            if (timerRef.current) clearInterval(timerRef.current);

            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        // Guard against double-fire
                        if (!submitFiredRef.current) {
                            submitFiredRef.current = true;
                            // Read from refs — always fresh, zero stale-closure risk
                            const qs = questionsRef.current;
                            const ans = answersRef.current;
                            const correct = qs.reduce(
                                (acc, q, i) => acc + (ans[i] === q.correctAnswer ? 1 : 0), 0
                            );
                            saveTestResult('UPSC', correct, qs.length);
                            setStatus('RESULT');
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        startQuiz();

        return () => {
            cancelled = true;
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Answer selection ───────────────────────────────────────────────────────
    const handleAnswer = (option) => {
        setAnswers(prev => ({ ...prev, [currentIndex]: option }));
    };

    // ── Time formatter ─────────────────────────────────────────────────────────
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // ── Loading screen ─────────────────────────────────────────────────────────
    if (questions.length === 0) {
        return (
            <div className="relative w-full min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
                <VisualEngine />
                <div className="animate-pulse text-2xl font-black italic text-primary">
                    Hydrating Exam Constraints...
                </div>
            </div>
        );
    }

    // ── Quiz screen ────────────────────────────────────────────────────────────
    if (status === 'QUIZ') {
        const q = questions[currentIndex];
        const isTimeLow = timeLeft <= 60;

        return (
            <div className="relative w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-slate-50 dark:bg-slate-950">
                <VisualEngine />
                <div className="max-w-4xl w-full relative z-10">

                    {/* Header Bar */}
                    <header className="flex justify-between items-center mb-12 glass p-6 rounded-3xl border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-xl">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.4em]">
                                UPSC PRELIMS MOCK
                            </span>
                            <div className="w-1 h-1 bg-slate-400 rounded-full" />
                            <span className="text-[10px] md:text-xs font-black text-slate-500">
                                QUE {currentIndex + 1} OF {questions.length}
                            </span>
                        </div>
                        {/* Timer — turns red when under 60 s */}
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

                    {/* Question Card */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 md:p-16 rounded-[3.5rem] border-slate-200/20 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 shadow-2xl backdrop-blur-3xl mb-8"
                    >
                        <h2 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white leading-relaxed mb-12 italic tracking-tight">
                            <span className="text-primary mr-3">Q{currentIndex + 1}.</span>
                            {q.content}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {['A', 'B', 'C', 'D'].map((opt) => {
                                const isSelected = answers[currentIndex] === opt;
                                return (
                                    <button
                                        key={opt}
                                        onClick={() => handleAnswer(opt)}
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
                                            {opt}
                                        </div>
                                        <span className="flex-grow font-semibold text-base md:text-lg">
                                            {q[`option${opt}`]}
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
                            className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-slate-400 hover:text-primary disabled:opacity-20 transition-all"
                        >
                            PREV QUESTION
                        </button>

                        {currentIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-4 md:px-12 md:py-5 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 hover:scale-105"
                            >
                                Complete Exam
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

                    {/* Answer progress dots */}
                    <div className="flex items-center justify-center gap-2 mt-10">
                        {questions.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`rounded-full transition-all ${
                                    i === currentIndex
                                        ? 'w-6 h-2.5 bg-primary'
                                        : answers[i]
                                            ? 'w-2.5 h-2.5 bg-emerald-500'
                                            : 'w-2.5 h-2.5 bg-slate-300 dark:bg-white/10'
                                }`}
                                title={`Question ${i + 1}${answers[i] ? ' (answered)' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // ── Result screen ──────────────────────────────────────────────────────────
    if (status === 'RESULT') {
        const score = calculateScore();
        const passed = score.percent >= 60;

        return (
            <div className="relative w-full min-h-screen pt-32 px-6 flex flex-col items-center bg-slate-50 dark:bg-slate-950">
                <VisualEngine />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl w-full glass p-10 md:p-16 rounded-[4rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-2xl text-center relative z-10 overflow-hidden"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[80px] -z-10" />

                    <Trophy className={`w-24 h-24 mx-auto mb-10 drop-shadow-2xl ${passed ? 'text-amber-500' : 'text-slate-400'}`} />
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-2">
                        Exam Completed
                    </h2>
                    <p className={`font-black uppercase tracking-[0.4em] text-[10px] mb-12 ${passed ? 'text-emerald-500' : 'text-rose-400'}`}>
                        {passed ? '✓ Cleared the cutoff' : '✗ Below cutoff — keep practising'}
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
                        <div className={`p-6 md:p-8 rounded-[2.5rem] border shadow-inner ${passed ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10' : 'bg-rose-50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/10'}`}>
                            <div className={`text-4xl md:text-5xl font-black italic mb-2 tracking-tighter ${passed ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {score.percent}%
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                Accuracy
                            </span>
                        </div>
                    </div>

                    {/* Accuracy progress bar */}
                    <div className="mb-12">
                        <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            <span>Score</span>
                            <span>Cutoff: 60%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${score.percent}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                                className={`h-full rounded-full ${passed ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-rose-500 to-orange-400'}`}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/mock-tests')}
                            className="w-full py-4 md:py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                        >
                            <Trophy className="w-4 h-4" /> Return to Mock Tests
                        </button>
                        <button
                            onClick={() => {
                                setStatus('QUIZ');
                                setAnswers({});
                                setCurrentIndex(0);
                                setTimeLeft(questions.length * 60);
                                submitFiredRef.current = false;
                                if (timerRef.current) clearInterval(timerRef.current);
                                timerRef.current = setInterval(() => {
                                    setTimeLeft(prev => {
                                        if (prev <= 1) {
                                            clearInterval(timerRef.current);
                                            if (!submitFiredRef.current) {
                                                submitFiredRef.current = true;
                                                const qs = questionsRef.current;
                                                const ans = answersRef.current;
                                                const correct = qs.reduce((acc, q, i) => acc + (ans[i] === q.correctAnswer ? 1 : 0), 0);
                                                saveTestResult('UPSC', correct, qs.length);
                                                setStatus('RESULT');
                                            }
                                            return 0;
                                        }
                                        return prev - 1;
                                    });
                                }, 1000);
                            }}
                            className="w-full py-4 md:py-5 bg-white/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-700 dark:text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            ↺ Retry Exam
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return null;
};

export default UPSCMockTest;
