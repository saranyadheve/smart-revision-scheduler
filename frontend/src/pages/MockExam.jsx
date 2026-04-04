import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, 
  Timer, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  ChevronRight,
  Activity,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getQuestionsByCategory } from '../services/api';
import { saveTestResult } from '../services/activityTracker';
import VisualEngine from '../components/VisualEngine';

const MockExam = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [status, setStatus] = useState('LANDING'); // LANDING, QUIZ, RESULT
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef(null);

    const startQuiz = async (cat) => {
        try {
            const response = await getQuestionsByCategory(cat);
            if (response && response.data && response.data.length > 0) {
                setQuestions(response.data);
                setTimeLeft(response.data.length * 60);
            } else {
                throw new Error("No data");
            }
        } catch (error) {
            console.warn("API unavailable, using dummy data for simulation.");
            const dummyData = [
                { content: "Which of the following is an example of an Operating System?", optionA: "Google Chrome", optionB: "Windows 11", optionC: "Microsoft Word", optionD: "Intel Core i7", correctAnswer: "B" },
                { content: "What is the primary function of a CPU?", optionA: "Storage", optionB: "Processing", optionC: "Cooling", optionD: "Display", correctAnswer: "B" },
                { content: "Which algorithm is used for finding the shortest path in a graph?", optionA: "Bubble Sort", optionB: "Dijkstra's", optionC: "Binary Search", optionD: "KMP Algorithm", correctAnswer: "B" },
                { content: "What does HTML stand for?", optionA: "Hyper Text Markup Language", optionB: "High Tech Modern Language", optionC: "Hyperlink and Text Markup Language", optionD: "Home Tool Markup Language", correctAnswer: "A" },
                { content: "Which data structure operates on a First In First Out (FIFO) principle?", optionA: "Stack", optionB: "Tree", optionC: "Queue", optionD: "Graph", correctAnswer: "C" }
            ];
            setQuestions(dummyData);
            setTimeLeft(30 * 60); // 30 minutes as requested
        }

        setCategory(cat);
        setAnswers({});
        setCurrentIndex(0);
        setStatus('QUIZ');
        
        if (timerRef.current) clearInterval(timerRef.current);
        // Use a ref flag to avoid stale-closure issues in the timer callback
        const submitFired = { current: false };
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    if (!submitFired.current) {
                        submitFired.current = true;
                        setStatus('RESULT');
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleAnswer = (option) => {
        setAnswers({ ...answers, [currentIndex]: option });
    };

    const handleSubmit = () => {
        clearInterval(timerRef.current);
        // Calculate score inline so we always have fresh answer state
        setAnswers(currentAnswers => {
            setQuestions(currentQuestions => {
                const correct = currentQuestions.reduce(
                    (acc, q, i) => acc + (currentAnswers[i] === q.correctAnswer ? 1 : 0), 0
                );
                saveTestResult(category || 'GENERAL', correct, currentQuestions.length);
                return currentQuestions;
            });
            return currentAnswers;
        });
        setStatus('RESULT');
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.correctAnswer) correct++;
        });
        return {
            correct,
            total: questions.length,
            percent: Math.round((correct / questions.length) * 100)
        };
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (status === 'LANDING') return (
        <div className="relative w-full min-h-screen pt-24 px-6 flex flex-col items-center bg-slate-50 dark:bg-slate-950 transition-colors">
            <VisualEngine />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl text-center relative z-10">
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white italic tracking-tighter uppercase mb-6">Assessment Center</h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs mb-16">High-Fidelity Competitive Simulations</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {['UPSC', 'GATE', 'IPS'].map((cat, i) => (
                        <motion.div 
                            key={cat}
                            whileHover={{ y: -10 }}
                            onClick={() => startQuiz(cat)}
                            className="glass p-10 rounded-[3rem] border-white/5 cursor-pointer group hover:bg-white/10 transition-all"
                        >
                            <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center mb-8 mx-auto border border-primary/20 shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform">
                                <ClipboardCheck className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-white italic tracking-widest">{cat}</h3>
                            <button className="mt-6 flex items-center gap-2 mx-auto text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-primary transition-colors">
                                Start Simulation <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );

    if (status === 'QUIZ') {
        const q = questions[currentIndex];
        return (
            <div className="relative w-full min-h-screen pt-24 px-6 flex flex-col items-center">
                <VisualEngine />
                <div className="max-w-4xl w-full relative z-10">
                    <header className="flex justify-between items-center mb-12 glass p-6 rounded-3xl border-white/5">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-primary uppercase tracking-[0.4em]">{category} SIMULATION</span>
                            <div className="w-1 h-1 bg-slate-700 rounded-full" />
                            <span className="text-xs font-black text-slate-400">QUE {currentIndex + 1} OF {questions.length}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-red-500/10 px-6 py-2 rounded-2xl border border-red-500/20">
                            <Timer className="w-5 h-5 text-red-500 animate-pulse" />
                            <span className="text-xl font-black text-white italic tabular-nums">{formatTime(timeLeft)}</span>
                        </div>
                    </header>

                    <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-10 md:p-16 rounded-[3.5rem] border-white/5 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-12 italic tracking-tight">
                            {q.content}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['A', 'B', 'C', 'D'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleAnswer(opt)}
                                    className={`p-6 rounded-[2rem] border text-left flex items-center gap-6 transition-all group ${
                                        answers[currentIndex] === opt 
                                        ? 'bg-primary/20 border-primary shadow-xl shadow-primary/10' 
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                                        answers[currentIndex] === opt ? 'bg-primary text-white' : 'bg-white/5 text-slate-600'
                                    }`}>
                                        {opt}
                                    </div>
                                    <span className="flex-grow font-semibold text-lg">{q[`option${opt}`]}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="flex justify-between items-center px-4">
                        <button 
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white disabled:opacity-30 transition-all"
                        >
                            PREV QUESTION
                        </button>
                        {currentIndex === questions.length - 1 ? (
                            <button onClick={handleSubmit} className="px-12 py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-xs hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20">
                                Complete Exam
                            </button>
                        ) : (
                            <button onClick={() => setCurrentIndex(prev => prev + 1)} className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-xs transition-all">
                                NEXT QUESTION
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'RESULT') {
        const score = calculateScore();
        return (
            <div className="relative w-full min-h-screen pt-32 px-6 flex flex-col items-center">
                <VisualEngine />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-2xl w-full glass p-16 rounded-[4rem] border-white/5 text-center relative z-10 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/20 blur-[80px] -z-10" />
                    <Trophy className="w-24 h-24 text-amber-500 mx-auto mb-10 drop-shadow-2xl" />
                    <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Exam Completed</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-12">Performance Summary</p>
                    
                    <div className="grid grid-cols-2 gap-8 mb-16">
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5">
                            <div className="text-5xl font-black text-white italic mb-2 tracking-tighter">{score.correct}/{score.total}</div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Correct Response</span>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5">
                            <div className="text-5xl font-black text-primary italic mb-2 tracking-tighter">{score.percent}%</div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button onClick={() => setStatus('LANDING')} className="w-full py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-[0.4em] text-xs hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                            New Attempt
                        </button>
                        <button onClick={() => navigate('/dashboard')} className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-xs transition-all">
                            Back to Dashboard
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }
};

export default MockExam;
