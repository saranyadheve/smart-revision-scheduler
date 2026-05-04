import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { generateQuestions } from '../../services/PracticeTestEngine';
import VisualEngine from '../../components/VisualEngine';

const TEST_DURATION = 30 * 60; // 30 mins

const PracticeTestRunner = () => {
    const navigate = useNavigate();
    const { track } = useParams();
    const [searchParams] = useSearchParams();
    
    const subject = searchParams.get('subject') || '';
    const subtopic = searchParams.get('subtopic') || '';
    
    const decodedTrack = track ? decodeURIComponent(track) : '';

    const testKey = `practice_test_state_${decodedTrack}_${subject}_${subtopic}`;

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
    const [isLoaded, setIsLoaded] = useState(false);
    
    const timerRef = useRef(null);

    // Initialize test
    useEffect(() => {
        const savedState = localStorage.getItem(testKey);
        if (savedState) {
            const parsed = JSON.parse(savedState);
            setQuestions(parsed.questions);
            setAnswers(parsed.answers);
            setTimeLeft(parsed.timeLeft);
            setCurrentIndex(parsed.currentIndex);
        } else {
            const generated = generateQuestions(decodedTrack, subject, subtopic);
            setQuestions(generated);
            setTimeLeft(TEST_DURATION);
        }
        setIsLoaded(true);
    }, [decodedTrack, subject, subtopic, testKey]);

    // Timer and Auto-Save
    useEffect(() => {
        if (!isLoaded || questions.length === 0) return;

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleForceSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, questions.length]);

    // Save state to localstorage when it changes
    useEffect(() => {
        if (!isLoaded || questions.length === 0) return;
        localStorage.setItem(testKey, JSON.stringify({
            questions, answers, timeLeft, currentIndex
        }));
    }, [answers, timeLeft, currentIndex, questions, isLoaded, testKey]);

    const handleAnswer = (questionId, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    const handleForceSubmit = () => {
        localStorage.setItem(`practice_result_${decodedTrack}`, JSON.stringify({ questions, answers }));
        localStorage.removeItem(testKey);
        navigate(`/practice-tests/${encodeURIComponent(decodedTrack)}/result`);
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to submit your test?")) {
            handleForceSubmit();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isLoaded) return null;
    
    if (questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#DAD7CD]/30 text-center">
                    <p className="text-xl text-[#2F3E46] mb-4">No questions available for this configuration.</p>
                    <button onClick={() => navigate(-1)} className="text-[#588157] underline font-semibold">Go Back</button>
                </div>
            </div>
        );
    }

    const q = questions[currentIndex];
    const isTimeLow = timeLeft <= 300; // < 5 mins

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-[#F4F7F5]">
            <VisualEngine />
            <div className="max-w-5xl w-full relative z-10 flex flex-col md:flex-row gap-6 items-start">
                
                {/* Main Panel */}
                <div className="flex-1 w-full">
                    <header className="flex justify-between items-center mb-6 bg-white p-5 rounded-2xl border border-[#DAD7CD]/30 shadow-sm">
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] font-semibold text-[#588157] uppercase tracking-widest bg-[#A3B18A]/10 px-3 py-1 rounded-md hidden sm:block">
                                {subject ? subject : 'Mixed Drill'}
                            </span>
                            <div className="hidden sm:block w-[1px] h-4 bg-[#DAD7CD]" />
                            <span className="text-[13px] font-semibold text-[#2F3E46]">
                                Q {currentIndex + 1} of {questions.length}
                            </span>
                        </div>
                        <div className={`flex items-center gap-2.5 px-6 py-2 rounded-xl border transition-all ${
                            isTimeLow
                                ? 'bg-red-50 border-red-100 text-red-500 animate-pulse'
                                : 'bg-[#F4F7F5] border-[#DAD7CD]/30 text-[#2F3E46]'
                        }`}>
                            <Timer size={18} />
                            <span className="text-[18px] font-bold tracking-wider tabular-nums">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </header>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="bg-white p-8 md:p-10 rounded-[24px] border border-[#DAD7CD]/30 shadow-sm mb-6 min-h-[400px] flex flex-col"
                        >
                            <div className="text-[12px] font-semibold uppercase tracking-widest text-[#6B7A7A] mb-4">
                                {q.topic} • Difficulty {q.difficulty}/5
                            </div>
                            <h2 className="text-xl md:text-2xl font-semibold text-[#2F3E46] leading-relaxed mb-10 font-poppins">
                                {q.question}
                            </h2>

                            <div className="grid grid-cols-1 gap-4 mt-auto">
                                {q.options.map((option, idx) => {
                                    const optionLetter = String.fromCharCode(65 + idx);
                                    const isSelected = answers[q.id] === option;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(q.id, option)}
                                            className={`p-5 rounded-xl border text-left flex items-center gap-5 transition-all group ${
                                                isSelected
                                                    ? 'bg-[#EAF0EA] border-[#588157] text-[#2F3E46] shadow-[0_4px_12px_rgba(88,129,87,0.1)]'
                                                    : 'bg-white border-[#DAD7CD]/50 hover:bg-[#F4F7F5] hover:border-[#A3B18A]/50 text-[#4A5D5D]'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-[13px] transition-all flex-shrink-0 ${
                                                isSelected
                                                    ? 'bg-[#588157] text-white'
                                                    : 'bg-[#F4F7F5] text-[#6B7A7A] group-hover:bg-[#EAF0EA] group-hover:text-[#588157]'
                                            }`}>
                                                {optionLetter}
                                            </div>
                                            <span className="flex-grow font-medium text-[15px]">
                                                {option}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between items-center bg-white p-4 items-center rounded-2xl border border-[#DAD7CD]/30 shadow-sm">
                        <button
                            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentIndex === 0}
                            className="px-6 py-3 text-[13px] font-semibold uppercase tracking-widest text-[#6B7A7A] hover:bg-[#F4F7F5] rounded-xl disabled:opacity-30 transition-all flex items-center gap-2"
                        >
                            <ArrowLeft size={16} /> Prev
                        </button>
                        
                        <button
                            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                            disabled={currentIndex === questions.length - 1}
                            className="px-6 py-3 text-[13px] font-semibold uppercase tracking-widest text-[#2F3E46] hover:bg-[#F4F7F5] rounded-xl disabled:opacity-30 transition-all flex items-center gap-2"
                        >
                            Next <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Right Sidebar Nav */}
                <div className="w-full md:w-80 bg-white rounded-[24px] border border-[#DAD7CD]/30 shadow-sm p-6 shrink-0 sticky top-24">
                    <h3 className="text-[13px] font-semibold uppercase tracking-widest text-[#2F3E46] mb-5 border-b border-[#DAD7CD]/30 pb-3">Question Panel</h3>
                    
                    <div className="grid grid-cols-5 gap-2 mb-8">
                        {questions.map((_, i) => {
                            const isAnswered = !!answers[questions[i].id];
                            const isCurrent = i === currentIndex;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`w-full aspect-square rounded-lg text-[13px] font-medium flex items-center justify-center transition-all ${
                                        isCurrent 
                                            ? 'bg-[#2F3E46] text-white shadow-md scale-110 z-10' 
                                            : isAnswered 
                                                ? 'bg-[#588157]/20 text-[#588157] border border-[#588157]/30 hover:bg-[#588157]/30' 
                                                : 'bg-[#F4F7F5] text-[#6B7A7A] hover:bg-[#EAF0EA] hover:text-[#588157] border border-transparent'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="space-y-3 mb-8 text-[12px] text-[#6B7A7A] font-medium border-t border-[#DAD7CD]/30 pt-5">
                        <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#588157]/20 border border-[#588157]/30" /> Answered ({Object.keys(answers).length})</div>
                        <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-[#F4F7F5]" /> Unanswered ({questions.length - Object.keys(answers).length})</div>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        className="w-full py-4 bg-[#588157] text-white rounded-xl font-semibold uppercase tracking-widest text-[13px] hover:bg-[#3A5A40] transition-all shadow-md shadow-[#588157]/20 flex justify-center items-center gap-2 group"
                    >
                        Submit Test <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PracticeTestRunner;
