import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Brain, 
  Sparkles, 
  User, 
  Bot, 
  ChevronLeft, 
  Loader2,
  Settings,
  X,
  PlusCircle,
  Hash,
  Activity,
  Zap,
  Cpu,
  RefreshCw,
  List,
  BookOpen
} from 'lucide-react';
import axios from 'axios';
import VisualEngine from '../components/VisualEngine';
import { logAIInteraction } from '../services/activityTracker';
import { useAuth } from '../context/AuthContext';
import { commonQuestions } from '../data/questionBank';
import qaDataset from '../data/qa_dataset.json';

const MessageBubble = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className={`flex gap-3 mb-6 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md shrink-0 ${isUser ? 'bg-[#588157] text-white' : 'bg-white text-[#A3B18A] border border-[#DAD7CD]/30'}`}>
        {isUser ? <User size={16} /> : <div className="text-[12px] font-bold">A</div>}
    </div>
    <div className={`max-w-[85%] p-4 rounded-[20px] shadow-sm relative overflow-hidden group ${
        isUser 
        ? 'bg-[#A3B18A] text-white rounded-tr-none' 
        : 'bg-white border border-[#DAD7CD]/30 text-[#2F3E46] rounded-tl-none'
    }`}>
        <p className="text-[14px] leading-relaxed whitespace-pre-wrap font-medium">{message.text}</p>
        {!isUser && <Sparkles className="absolute -bottom-4 -right-4 w-12 h-12 text-[#A3B18A]/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </div>
  </motion.div>
);

const AIStudyRoom = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const [selectedCourse, setSelectedCourse] = useState(localStorage.getItem('sr_selected_course') || null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSelection, setShowSelection] = useState(!selectedCourse);
    const [showBank, setShowBank] = useState(false);
    const [randomSuggestions, setRandomSuggestions] = useState([]);

    useEffect(() => {
        if (selectedCourse) {
            const allQ = commonQuestions[selectedCourse.toLowerCase()] || [];
            const shuffled = [...allQ].sort(() => 0.5 - Math.random());
            setRandomSuggestions(shuffled.slice(0, 6));
        }
    }, [selectedCourse]);

    // Initial Greeting
    useEffect(() => {
        greetNewUser();
    }, [user?.username]);

    const greetNewUser = () => {
        const msg = {
            id: 'greet-new',
            text: `Hi, this is AstraMind 👋\nWelcome back, ${user?.username || 'Scholar'}!\n\nI’m here to help you with your preparation.\nPlease choose your course to get started.`,
            isUser: false
        };
        setMessages([msg]);
        setShowSelection(true);
    };

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
        localStorage.setItem('sr_selected_course', course);
        setShowSelection(false);
        
        const msg = {
            id: Date.now(),
            text: `Great choice, ${user?.username || 'Scholar'}!\nYou're now in ${course.toUpperCase()} preparation mode.\n\nYou can ask me anything related to this course.`,
            isUser: false
        };
        setMessages(prev => [...prev, msg]);
    };

    const handleSwitch = () => {
        setSelectedCourse(null);
        localStorage.removeItem('sr_selected_course');
        greetNewUser();
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = async (e, textOverride = null) => {
        if (e) e.preventDefault();
        const messageText = textOverride || input;
        
        if (!messageText.trim() || loading) return;

        const lowerMsg = messageText.toLowerCase().trim();
        if (lowerMsg === "switch" || lowerMsg === "change course" || lowerMsg === "hi" || lowerMsg === "hello" || lowerMsg === "hey") {
            handleSwitch();
            setInput("");
            return;
        }

        const userMsg = { id: Date.now(), text: messageText, isUser: true };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        setSuggestions([]);

        // Normalize text to ignore spaces, punctuation, and question marks
        const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedInput = normalizeText(messageText);

        // Check against static Question Bank first
        let staticMatch = null;
        for (const category of Object.keys(qaDataset)) {
            const match = qaDataset[category].find(q => normalizeText(q.question) === normalizedInput);
            if (match) {
                staticMatch = match;
                break;
            }
        }

        if (staticMatch) {
            setTimeout(() => {
                const aiMsg = { 
                    id: Date.now() + 1, 
                    text: staticMatch.answer, 
                    isUser: false 
                };
                setMessages(prev => [...prev, aiMsg]);
                setLoading(false);
            }, 600); // Small delay to simulate AI thinking
            return;
        }

        try {
            logAIInteraction(); 
            const token = localStorage.getItem('sr_token');
            const res = await axios.post("/api/ai/chat", {
                message: messageText,
                course: selectedCourse || "upsc"
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const aiMsg = { 
                id: Date.now() + 1, 
                text: res.data.reply || "Sorry, I couldn't process that right now. Please try again.", 
                isUser: false 
            };
            setMessages(prev => [...prev, aiMsg]);
            if (res.data.suggestions) {
                setSuggestions(res.data.suggestions);
            }
        } catch (err) {
            console.error("Chat Error", err);
            const errMsg = { id: Date.now() + 1, text: "Sorry, I couldn't process that right now. Please try again.", isUser: false };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen bg-[#F4F7F5] overflow-hidden flex flex-col pt-20">
            <VisualEngine />
            
            {/* Header */}
            <div className="max-w-4xl mx-auto w-full px-6 flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white border border-[#DAD7CD]/30 rounded-xl flex items-center justify-center text-[#6B7A7A] hover:text-[#588157] transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-[20px] font-bold text-[#2F3E46]">AstraMind</h1>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest">Online Tutor</span>
                        </div>
                    </div>
                </div>

                {selectedCourse && (
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setShowBank(true)}
                            className="px-4 py-2 bg-white border border-[#DAD7CD]/30 rounded-xl text-[10px] font-black text-[#588157] uppercase tracking-widest hover:border-[#A3B18A] transition-all flex items-center gap-1.5 shadow-sm"
                        >
                            <BookOpen size={14} />
                            FAQs
                        </button>
                        <button 
                            onClick={handleSwitch}
                            className="px-4 py-2 bg-white border border-[#DAD7CD]/30 rounded-xl text-[10px] font-black text-[#6B7A7A] uppercase tracking-widest hover:border-[#A3B18A] transition-all shadow-sm"
                        >
                            Switch Course: {selectedCourse}
                        </button>
                    </div>
                )}
            </div>

            {/* Chat Container */}
            <div className="flex-grow max-w-4xl mx-auto w-full px-6 mb-6 relative z-10 flex flex-col overflow-hidden">
                <div 
                    ref={scrollRef}
                    className="flex-grow overflow-y-auto px-6 py-8 custom-scrollbar space-y-2 rounded-[32px] bg-white/40 backdrop-blur-md border border-[#DAD7CD]/20 shadow-xl"
                >
                    <AnimatePresence>
                        {messages.map(msg => (
                            <MessageBubble key={msg.id} message={msg} isUser={msg.isUser} />
                        ))}
                    </AnimatePresence>
                    
                    {showSelection && (
                        <div className="flex flex-wrap gap-3 mt-4">
                            {['upsc', 'tnpsc', 'gate', 'it interview'].map(course => (
                                <button
                                    key={course}
                                    onClick={() => handleCourseSelect(course)}
                                    className="px-6 py-3 bg-white border border-[#A3B18A]/30 text-[#2F3E46] rounded-2xl text-[13px] font-bold hover:bg-[#588157] hover:text-white transition-all shadow-sm"
                                >
                                    {course.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    )}

                    {loading && (
                        <div className="flex gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-white text-[#A3B18A] border border-[#DAD7CD]/30 flex items-center justify-center shadow-md animate-bounce">
                                <Brain size={16} />
                            </div>
                            <div className="bg-white/50 border border-[#DAD7CD]/30 px-5 py-3 rounded-[20px] rounded-tl-none flex items-center gap-2 shadow-sm">
                                <span className="text-[12px] font-bold text-[#6B7A7A] italic animate-pulse">AstraMind is thinking...</span>
                            </div>
                        </div>
                    )}

                    {!loading && suggestions.length > 0 && (
                        <div className="pt-4 flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-[#A3B18A] uppercase tracking-widest px-1">You can also ask:</span>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => handleSend(null, s)}
                                        className="text-[12px] font-medium text-[#588157] bg-white border border-[#A3B18A]/20 px-4 py-2 rounded-xl hover:bg-[#F4F7F5] transition-all"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                {!showSelection && (
                    <div className="mt-4 flex flex-col gap-3 relative z-10">
                        {/* Suggestion Chips */}
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1">
                            <button
                                onClick={() => setShowBank(true)}
                                className="px-5 py-2.5 bg-gradient-to-r from-[#588157] to-[#A3B18A] text-white rounded-2xl text-[13px] font-bold shadow-md flex items-center gap-2 shrink-0 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                                <BookOpen size={16} /> Question Bank (50)
                            </button>
                            {randomSuggestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(null, q)}
                                    className="px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#DAD7CD]/50 text-[#2F3E46] rounded-2xl text-[13px] font-medium hover:border-[#588157] hover:text-[#588157] shadow-sm shrink-0 whitespace-nowrap hover:-translate-y-0.5 transition-all"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>

                        <form 
                            onSubmit={handleSend}
                            className="relative"
                        >
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Type your message...`}
                                className="w-full bg-white border border-[#DAD7CD]/30 rounded-[32px] py-5 px-8 pr-20 focus:outline-none focus:border-[#588157] shadow-xl text-[14px] font-medium placeholder-[#6B7A7A]/40"
                            />
                            <button 
                                type="submit"
                                disabled={!input.trim() || loading}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                                    !input.trim() || loading 
                                    ? 'bg-[#DAD7CD]/30 text-[#6B7A7A]' 
                                    : 'bg-[#588157] text-white hover:bg-[#2F3E46] shadow-lg'
                                }`}
                            >
                               <Send size={20} />
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Question Bank Sidebar */}
            <AnimatePresence>
                {showBank && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowBank(false)}
                            className="absolute inset-0 bg-[#2F3E46]/20 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-80 md:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-[#DAD7CD]/50"
                        >
                            <div className="p-6 border-b border-[#DAD7CD]/30 flex justify-between items-center bg-gradient-to-r from-[#F4F7F5] to-white">
                                <div>
                                    <h3 className="text-[18px] font-bold text-[#2F3E46] flex items-center gap-2">
                                        <BookOpen size={20} className="text-[#588157]" />
                                        Question Bank
                                    </h3>
                                    <p className="text-[12px] text-[#6B7A7A] mt-1 font-medium">Top 50 Frequently Asked Questions</p>
                                </div>
                                <button 
                                    onClick={() => setShowBank(false)} 
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#DAD7CD]/50 text-[#6B7A7A] hover:text-[#e63946] hover:border-[#e63946]/30 hover:bg-[#e63946]/5 transition-all"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <div className="flex-grow overflow-y-auto p-4 custom-scrollbar space-y-2">
                                {selectedCourse && commonQuestions[selectedCourse.toLowerCase()]?.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            handleSend(null, q);
                                            setShowBank(false);
                                        }}
                                        className="w-full text-left p-4 rounded-xl bg-white border border-[#DAD7CD]/50 hover:border-[#A3B18A] hover:bg-[#F4F7F5] transition-all text-[13px] font-medium text-[#2F3E46] group shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-center gap-3">
                                            <span className="leading-relaxed pr-2">{q}</span>
                                            <div className="w-8 h-8 rounded-full bg-[#588157]/10 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                                                <Send size={14} className="text-[#588157]" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Aesthetics */}
            <Brain size={300} className="absolute -bottom-20 -left-20 text-[#A3B18A] opacity-[0.03] rotate-12 pointer-events-none" />
            <Sparkles size={150} className="absolute top-20 -right-10 text-[#588157] opacity-[0.02] pointer-events-none" />
        </div>
    );
};

export default AIStudyRoom;
