import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getUserTodos, toggleTodo } from '../services/api';
import { upscData } from '../data/upscStructuredData';
import { tnpscData } from '../data/tnpscStructuredData';
import { gateData } from '../data/gateStructuredData';
import { interviewData } from '../data/interviewStructuredData';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  BookOpen, 
  Target, 
  Sparkles, 
  Plus, 
  Trash2, 
  Calendar, 
  Zap, 
  Flame, 
  BarChart3,
  PieChart,
  ArrowRight,
  Shield,
  Globe
} from 'lucide-react';

const TopicSection = ({ section, todos, onToggle, courseId }) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!section) return null;

  return (
    <div className="bg-white rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#DAD7CD]/20 overflow-hidden mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-[#F4F7F5]/30 hover:bg-[#F4F7F5]/50 transition-all font-poppins"
      >
        <div className="flex items-center gap-3 text-left">
          <BookOpen size={20} className="text-[#A3B18A] flex-shrink-0" />
          <span className="text-[17px] font-bold text-[#2F3E46] leading-tight">{section.title}</span>
        </div>
        <ChevronDown size={18} className={`text-[#6B7A7A] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-8">
              {(section.subjects || section.areas || []).map((subject) => (
                <div key={subject.id || subject.title} className="mb-0 last:mb-0">
                  <h4 className="text-[12px] font-bold text-[#588157] uppercase tracking-widest mb-4 px-1 border-l-4 border-l-[#A3B18A] pl-3">
                    {subject.title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(subject.topics || subject.tips || []).map((topic) => {
                      const hasSubtopics = topic.subtopics && Array.isArray(topic.subtopics);
                      
                      if (hasSubtopics) {
                        return (
                          <div key={topic.name} className="col-span-full mt-4 first:mt-0 bg-[#F4F7F5]/20 p-4 rounded-2xl border border-[#DAD7CD]/10">
                            <h5 className="text-[11px] font-bold text-[#A3B18A] mb-3 flex items-center gap-2 uppercase tracking-wider">
                              <Sparkles size={12} /> {topic.name}
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {topic.subtopics.map((sub) => {
                                const isComp = todos.some(t => t.courseId === courseId && t.topicId === subject.id && t.subtopicId === sub && t.completed);
                                return (
                                  <div key={sub} onClick={() => onToggle(subject.id, sub, !isComp)} className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-all ${isComp ? 'bg-[#EAF0EA]/60 border-[#588157]/20 text-[#588157]' : 'bg-white border-[#DAD7CD]/30 text-[#6B7A7A] hover:border-[#A3B18A]/40 hover:bg-[#F4F7F5]/30'}`}>
                                    {isComp ? <CheckCircle2 size={16} /> : <Circle size={16} className="opacity-30" />}
                                    <span className={`text-[12px] ${isComp ? 'line-through opacity-70' : 'font-medium'}`}>{sub}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }

                      const tName = typeof topic === 'string' ? topic : topic.name;
                      const isComp = todos.some(t => t.courseId === courseId && t.topicId === (subject.id || subject.title) && t.subtopicId === tName && t.completed);

                      return (
                        <div key={tName} onClick={() => onToggle(subject.id || subject.title, tName, !isComp)} className={`flex items-center gap-3 p-3.5 rounded-[12px] border cursor-pointer transition-all ${isComp ? 'bg-[#EAF0EA]/50 border-[#A3B18A]/30 text-[#588157]' : 'bg-white border-[#DAD7CD]/30 text-[#6B7A7A] hover:border-[#A3B18A]/30'}`}>
                          {isComp ? <CheckCircle2 size={18} className="text-[#A3B18A]" /> : <Circle size={18} className="text-[#DAD7CD]" />}
                          <span className="text-[13px] font-medium leading-tight">{tName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SubtopicTodo = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [activeCourse, setActiveCourse] = useState('UPSC');
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Persistence
  const [customTasks, setCustomTasks] = useState(() => JSON.parse(localStorage.getItem('sr_custom_tasks') || '{}'));
  const [routineProgress, setRoutineProgress] = useState(() => JSON.parse(localStorage.getItem('sr_routine_progress') || '{}'));
  const [newTaskText, setNewTaskText] = useState('');

  const fetchTodos = React.useCallback(async () => {
    console.log(`[SubtopicTodo] fetchTodos called for user ${user.id}`);
    try {
      const res = await getUserTodos(user.id);
      setTodos(prev => {
        const newTodos = res.data || [];
        if (JSON.stringify(prev) === JSON.stringify(newTodos)) return prev;
        return newTodos;
      });
      setApiError(false);
    } catch (err) { 
      console.error("Failed to fetch todos:", err); 
      setApiError(true);
    }
    finally { setLoading(false); }
  }, [user.id]);

  useEffect(() => {
    console.log("[SubtopicTodo] setup effect running.");
    if (location.state?.activeCourse) {
        setActiveCourse(prev => prev !== location.state.activeCourse ? location.state.activeCourse : prev);
    }
    fetchTodos();
  }, [location.state?.activeCourse, fetchTodos]);

  const handleToggle = async (topicId, subtopicId, newStatus) => {
    try {
      const updated = newStatus 
        ? [...todos, { courseId: activeCourse, topicId, subtopicId, completed: true }]
        : todos.filter(t => t.subtopicId !== subtopicId || t.topicId !== topicId || t.courseId !== activeCourse);
      setTodos(updated);
      await toggleTodo(user.id, { courseId: activeCourse, topicId, subtopicId, completed: newStatus });
      fetchTodos();
    } catch (err) { fetchTodos(); }
  };

  const routines = {
    UPSC: [
      { id: 'u1', text: "Read The Hindu / Indian Express Editorial", cat: 'Daily' },
      { id: 'u2', text: "Answer Writing Practice (1 Question)", cat: 'Daily' },
      { id: 'u3', text: "Monthly Current Affairs Magazine Revision", cat: 'Daily' },
      { id: 'u4', text: "CSAT Quantitative Aptitude Drill", cat: 'Weekly' },
      { id: 'u5', text: "Ethics Case Study Analysis", cat: 'Weekly' }
    ],
    TNPSC: [
      { id: 't1', text: "Tamil Nadu Specific Current Affairs", cat: 'Daily' },
      { id: 't2', text: "Mental Ability & Aptitude (20 MCQs)", cat: 'Daily' },
      { id: 't3', text: "Unit 8 & 9 (Economy/Soc History) Revision", cat: 'Daily' },
      { id: 't4', text: "General Tamil/English Literature Review", cat: 'Daily' }
    ],
    GATE: [
      { id: 'g1', text: "Solve 5 High-Level Math Problems", cat: 'Daily' },
      { id: 'g2', text: "Previous Year Question (PYQ) Drill", cat: 'Daily' },
      { id: 'g3', text: "General Aptitude & Reasoning Revision", cat: 'Daily' },
      { id: 'g4', text: "Short Note Making for Technical Subject", cat: 'Weekly' }
    ],
    Interview: [
      { id: 'i1', text: "2 LeetCode Medium Problems", cat: 'Daily' },
      { id: 'i2', text: "System Design Design Principles Revision", cat: 'Daily' },
      { id: 'i3', text: "Behavioural (STAR) Mock Recording", cat: 'Weekly' },
      { id: 'i4', text: "Project Deep Dive & Edge Case Prep", cat: 'Weekly' }
    ]
  };

  const toggleRoutine = (id) => {
    const updated = { ...routineProgress, [id]: !routineProgress[id] };
    localStorage.setItem('sr_routine_progress', JSON.stringify(updated));
    setRoutineProgress(updated);
  };

  const addCustomTask = () => {
    if (!newTaskText.trim()) return;
    const ut = { ...customTasks, [activeCourse]: [...(customTasks[activeCourse] || []), { id: Date.now(), text: newTaskText, completed: false }] };
    localStorage.setItem('sr_custom_tasks', JSON.stringify(ut));
    setCustomTasks(ut);
    setNewTaskText('');
  };

  const deleteCustomTask = (id) => {
    const ut = { ...customTasks, [activeCourse]: customTasks[activeCourse].filter(t => t.id !== id) };
    localStorage.setItem('sr_custom_tasks', JSON.stringify(ut));
    setCustomTasks(ut);
  };

  const toggleCustomTask = (id) => {
    const ut = { ...customTasks, [activeCourse]: customTasks[activeCourse].map(t => t.id === id ? { ...t, completed: !t.completed } : t) };
    localStorage.setItem('sr_custom_tasks', JSON.stringify(ut));
    setCustomTasks(ut);
  };

  const sections = useMemo(() => {
    if (activeCourse === 'UPSC') return [upscData.prelims, upscData.mains, upscData.interview];
    if (activeCourse === 'TNPSC') return [tnpscData.main];
    if (activeCourse === 'GATE') return [gateData.main];
    if (activeCourse === 'Interview') return [interviewData.main];
    return [];
  }, [activeCourse]);

  // Unified Progress Calculation based on subtopics
  const totalSubtopics = useMemo(() => {
    let count = 0;
    sections.forEach(s => {
      (s.subjects || s.areas || []).forEach(sub => {
        (sub.topics || []).forEach(top => {
          if (top.subtopics) count += top.subtopics.length;
          else count += 1;
        });
      });
    });
    return count || 1;
  }, [sections]);

  const completedCount = todos.filter(t => t.courseId === activeCourse && t.completed).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalSubtopics) * 100));

  return (
    <div className="p-6 md:p-12 pt-28 min-h-screen bg-[#F4F7F5] selection:bg-[#A3B18A]/30 font-inter">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16">
          <div className="flex items-center gap-8">
             <div className="w-20 h-20 rounded-[32px] bg-[#2F3E46] flex items-center justify-center text-[#A3B18A] shadow-2xl shadow-[#2F3E46]/20">
                <Target size={40} />
             </div>
             <div>
                <h1 className="text-[34px] md:text-[46px] font-bold text-[#2F3E46] font-poppins tracking-tighter leading-none mb-3">Focus Hub.</h1>
                <div className="flex items-center gap-3">
                   <p className="text-[#6B7A7A] font-medium">Tracking roadmap for</p>
                   <span className="px-4 py-1 bg-[#588157] text-white text-[12px] font-black rounded-full uppercase tracking-widest">{activeCourse}</span>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-4">
             <div className="bg-white p-6 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm min-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                   <Flame size={16} className="text-orange-400" />
                   <span className="text-[11px] font-black text-[#6B7A7A] uppercase tracking-widest">Syllabus Progress</span>
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-[28px] font-bold text-[#2F3E46] font-poppins">{progressPercent}%</span>
                   <span className="text-[12px] font-bold text-[#A3B18A]">{completedCount}/{totalSubtopics} Topics</span>
                </div>
                <div className="w-full h-1.5 bg-[#F4F7F5] rounded-full mt-4 overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} className="h-full bg-[#588157]" />
                </div>
             </div>
             
             <div className="bg-[#588157] p-6 rounded-[32px] shadow-xl shadow-[#588157]/20 flex flex-col justify-center min-w-[180px]">
                <span className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-1">Consistency</span>
                <span className="text-[24px] font-bold text-white font-poppins">Level {Math.floor(progressPercent / 10) + 1}</span>
                <p className="text-[10px] text-white/50 font-bold mt-2">Next reward at {Math.ceil((progressPercent + 1) / 10) * 10}%</p>
             </div>
          </div>
        </header>

        {apiError && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 border border-red-200 rounded-[20px] flex items-center justify-center gap-2 font-medium shadow-sm">
                <Globe size={18} /> Network disconnected. Tracking locally (Offline Mode). Changes won't sync until reconnected.
            </div>
        )}

        {/* Dynamic Track Switcher */}
        <div className="flex flex-wrap items-center gap-3 mb-12 bg-white/40 p-2.5 rounded-[28px] w-fit border border-[#DAD7CD]/30 shadow-sm backdrop-blur-xl">
           {[
             { id: 'UPSC', icon: Shield },
             { id: 'TNPSC', icon: Globe },
             { id: 'GATE', icon: Zap },
             { id: 'Interview', icon: Sparkles }
           ].map(c => (
             <button 
               key={c.id} 
               onClick={() => setActiveCourse(c.id)} 
               className={`flex items-center gap-3 px-10 py-4 rounded-[20px] text-[14px] font-bold transition-all ${activeCourse === c.id ? 'bg-[#588157] text-white shadow-lg shadow-[#588157]/30 scale-105' : 'text-[#6B7A7A] hover:bg-white hover:text-[#2F3E46]'}`}
             >
               <c.icon size={18} />
               {c.id}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
            {/* Main Syllabus Content */}
            <div className="xl:col-span-8">
                <div className="flex items-center gap-3 mb-8 px-2">
                    <BarChart3 size={22} className="text-[#588157]" />
                    <h3 className="text-[22px] font-bold text-[#2F3E46] font-poppins">Curriculum Progress</h3>
                </div>
                <div className="space-y-8">
                    {sections.map((s, idx) => (
                        <TopicSection key={`${activeCourse}-${idx}`} section={s} todos={todos} onToggle={handleToggle} courseId={activeCourse} />
                    ))}
                </div>
            </div>

            {/* Right Sidebar - Routine & Personal Goals */}
            <div className="xl:col-span-4 space-y-10 lg:sticky lg:top-32">
                {/* Daily Routine Card */}
                <div className="bg-[#2F3E46] p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                        <Calendar size={180} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                    <PieChart size={20} className="text-[#A3B18A]" />
                                </div>
                                <h3 className="text-[20px] font-bold font-poppins">Daily Routine</h3>
                             </div>
                             <span className="text-[11px] font-black text-[#A3B18A] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">Active</span>
                        </div>
                        <div className="space-y-4">
                            {routines[activeCourse]?.map(h => (
                                <div 
                                  key={h.id} 
                                  onClick={() => toggleRoutine(h.id)} 
                                  className={`p-5 rounded-3xl flex items-center gap-4 cursor-pointer transition-all border ${routineProgress[h.id] ? 'bg-white/5 border-white/5 opacity-40' : 'bg-white/10 border-white/10 hover:bg-white/15'}`}
                                >
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${routineProgress[h.id] ? 'bg-[#A3B18A]' : 'border-2 border-white/30'}`}>
                                        {routineProgress[h.id] && <CheckCircle2 size={14} className="text-[#2F3E46]" />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-[14px] font-bold ${routineProgress[h.id] ? 'line-through text-white/50' : 'text-white'}`}>{h.text}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#A3B18A]/70">{h.cat}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="w-full mt-8 flex items-center justify-center gap-3 py-5 rounded-[24px] bg-[#A3B18A] text-[#2F3E46] text-[13px] font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-xl shadow-black/10">
                           <Calendar size={16} /> Routine Calendar <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Personal Goals Card */}
                <div className="bg-white p-10 rounded-[48px] border border-[#DAD7CD]/40 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-[#F4F7F5] flex items-center justify-center">
                                <Zap size={20} className="text-[#588157]" />
                            </div>
                            <h3 className="text-[20px] font-bold text-[#2F3E46] font-poppins">Priority Goals</h3>
                         </div>
                    </div>
                    
                    <div className="space-y-4 mb-8 max-h-[360px] overflow-y-auto pr-3 custom-scrollbar">
                        {(customTasks[activeCourse] || []).length === 0 && (
                            <div className="bg-[#F4F7F5] p-8 rounded-3xl text-center">
                                <p className="text-[13px] text-[#6B7A7A] font-medium leading-relaxed italic">"The secret to getting ahead is getting started."</p>
                                <p className="text-[11px] font-black text-[#A3B18A] mt-3 uppercase tracking-widest">Add your first custom goal</p>
                            </div>
                        )}
                        {(customTasks[activeCourse] || []).map(t => (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={t.id} className={`p-5 rounded-3xl flex items-center justify-between group transition-all border ${t.completed ? 'bg-[#F4F7F5] border-transparent' : 'bg-white border-[#DAD7CD]/30'}`}>
                                <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => toggleCustomTask(t.id)}>
                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${t.completed ? 'bg-[#A3B18A]' : 'border-2 border-[#DAD7CD]'}`}>
                                        {t.completed && <CheckCircle2 size={12} className="text-white" />}
                                    </div>
                                    <span className={`text-[14px] font-bold transition-all ${t.completed ? 'line-through text-[#6B7A7A]/60' : 'text-[#2F3E46]'}`}>{t.text}</span>
                                </div>
                                <button onClick={() => deleteCustomTask(t.id)} className="p-2 text-[#DAD7CD] hover:text-red-400 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex gap-3 bg-[#F4F7F5] p-2 rounded-[28px] border border-[#DAD7CD]/30">
                        <input 
                          type="text" 
                          value={newTaskText} 
                          onChange={e => setNewTaskText(e.target.value)} 
                          onKeyPress={e => e.key === 'Enter' && addCustomTask()} 
                          placeholder="What needs to be done?" 
                          className="flex-grow bg-transparent px-5 py-4 text-[14px] font-medium text-[#2F3E46] outline-none placeholder:text-[#6B7A7A]/50" 
                        />
                        <button onClick={addCustomTask} className="bg-[#2F3E46] text-white p-4 rounded-[22px] shadow-lg hover:scale-105 active:scale-95 transition-all"><Plus size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SubtopicTodo;
