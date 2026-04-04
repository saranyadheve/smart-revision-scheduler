import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Library,
  FileQuestion,
  GraduationCap,
  CheckCircle2,
  Lightbulb,
  ChevronRight,
  ArrowRight,
  Zap,
  Info,
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import { upscData } from '../data/upscStructuredData';
import PYQModule from '../components/PYQModule';

// ─── Stage Tab Button ──────────────────────────────────────────────────────────
const StageTab = ({ stage, isActive, onClick }) => {
  const Icon = stage.icon;
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-4 flex items-center justify-center gap-2.5 rounded-full transition-all font-black uppercase tracking-[0.3em] text-[10px] md:text-xs italic
        ${isActive
          ? 'bg-primary text-white shadow-lg shadow-primary/30'
          : 'text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
        }`}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
      {stage.label}
    </button>
  );
};

// ─── Subject / Topic Card (expand/collapse) ────────────────────────────────────
const SubjectCard = ({ subject, index }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = subject.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`glass rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-xl
        ${expanded
          ? 'border-primary/30 bg-primary/5 dark:bg-primary/5'
          : 'border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 hover:border-primary/20'
        }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Card Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-lg flex-shrink-0 transition-transform ${expanded ? 'scale-110' : ''}`}>
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white italic tracking-tighter uppercase leading-tight">
              {subject.title}
            </h3>
            {(subject.weightage || subject.marks) && (
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border mt-1 inline-block
                ${expanded ? 'text-primary border-primary/30 bg-primary/10' : 'text-slate-500 border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-white/5'}`}>
                {subject.weightage || subject.marks}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-xl transition-colors ${expanded ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:text-primary'}`}>
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {/* Expanded Topic Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-primary/10">
              <div className="space-y-3 mt-4">
                {(subject.topics || []).map((topic, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 dark:text-white italic tracking-tight leading-tight">
                          {topic.name}
                        </p>
                        {topic.detail && (
                          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                            {topic.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Interview Area Card ───────────────────────────────────────────────────────
const InterviewCard = ({ area, index }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = area.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass rounded-3xl border transition-all cursor-pointer shadow-sm hover:shadow-xl
        ${expanded
          ? 'border-primary/30 bg-primary/5'
          : 'border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 hover:border-primary/20'
        }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary flex-shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">{area.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1 max-w-sm">{area.desc}</p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180 text-primary' : ''}`} />
      </div>

      <AnimatePresence>
        {expanded && area.tips && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-primary/10 pt-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" /> Pro Tips
              </p>
              <div className="space-y-2">
                {area.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Recommended Books Panel ───────────────────────────────────────────────────
const BooksPanel = () => (
  <section className="glass rounded-[3rem] border border-slate-200/20 dark:border-white/5 bg-white/30 dark:bg-white/5 backdrop-blur-3xl p-8 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[80px] pointer-events-none" />
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <Library className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">Recommended Library</h3>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">Standard Reference Books for UPSC</p>
        </div>
      </div>

      <div className="space-y-3">
        {upscData.books.map((book, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${book.color}`}>
                    {book.tag}
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{book.subject}</span>
                </div>
                <p className="text-sm font-black text-slate-800 dark:text-white italic tracking-tight leading-tight">{book.title}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">by {book.author}</p>
              </div>
              <BookOpen className="w-4 h-4 text-slate-300 dark:text-white/20 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── PYQ Quick View ───────────────────────────────────────────────────────────
const PYQQuickPanel = ({ onOpenFull }) => (
  <section className="glass rounded-[3rem] border border-slate-200/20 dark:border-white/5 bg-primary/5 p-8 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 blur-[60px] pointer-events-none" />
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <FileQuestion className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">PYQ Bank</h3>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-0.5">Previous Year Questions</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {upscData.pyqs.slice(0, 4).map((pyq, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200/30 dark:border-white/5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                {pyq.year}
              </span>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{pyq.stage}</span>
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed italic line-clamp-2">{pyq.question}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onOpenFull}
        className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
      >
        <Zap className="w-4 h-4" />
        Practice PYQ Drill
      </button>
    </div>
  </section>
);

// ─── Main UPSC Page ────────────────────────────────────────────────────────────
const UPSC = () => {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState('prelims');
  const [showPYQDrill, setShowPYQDrill] = useState(false);

  const stages = [
    { id: 'prelims', label: 'Prelims', icon: Target },
    { id: 'mains', label: 'Mains', icon: BookOpen },
    { id: 'interview', label: 'Interview', icon: GraduationCap },
  ];

  const currentStage = upscData[activeStage];
  const renderItems = activeStage === 'interview' ? currentStage.areas : currentStage.subjects;

  return (
    <div className="relative w-full min-h-screen pt-24 pb-16 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden font-sans">
      <VisualEngine />

      {/* ── Page Header ── */}
      <header className="max-w-7xl mx-auto text-center relative z-10 mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 shadow-xl shadow-primary/5"
        >
          <Target className="w-3 h-3 fill-primary" />
          Civil Services Preparation Engine
          <Target className="w-3 h-3 fill-primary" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-9xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase leading-none mb-6"
        >
          UPSC <span className="text-primary">MASTER.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-10"
        >
          Structured syllabus · Recommended books · Previous Year Questions
        </motion.p>

        {/* Stage Summary Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { label: 'Prelims Papers', value: '2' },
            { label: 'Mains Papers', value: '9' },
            { label: 'Interview Marks', value: '275' },
          ].map((s, i) => (
            <div key={i} className="glass p-4 rounded-2xl border-white/5 flex flex-col items-center gap-1">
              <span className="text-2xl font-black text-primary italic">{s.value}</span>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </header>

      {/* ── Stage Navigation Tabs ── */}
      <div className="max-w-3xl mx-auto relative z-10 mb-12">
        <div className="glass p-2 rounded-full border border-slate-200/20 dark:border-white/10 flex bg-white/40 dark:bg-white/5 backdrop-blur-3xl shadow-xl gap-1">
          {stages.map(stage => (
            <StageTab
              key={stage.id}
              stage={stage}
              isActive={activeStage === stage.id}
              onClick={() => setActiveStage(stage.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Stage Info Banner ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="max-w-7xl mx-auto relative z-10 mb-10"
        >
          <div className="glass p-6 rounded-3xl border border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">
                {currentStage.title}
              </h2>
              <p className="text-xs font-medium text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
                {currentStage.description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Main Content Grid ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">

        {/* Left: Subject/Topic Cards */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid gap-4 ${
                activeStage === 'interview'
                  ? 'grid-cols-1'
                  : 'grid-cols-1 md:grid-cols-2'
              }`}
            >
              {activeStage === 'interview'
                ? renderItems.map((area, i) => (
                    <InterviewCard key={area.title} area={area} index={i} />
                  ))
                : renderItems.map((subject, i) => (
                    <SubjectCard key={subject.id} subject={subject} index={i} />
                  ))
              }
            </motion.div>
          </AnimatePresence>

          {/* Navigate to Mock Test CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 glass p-8 rounded-3xl border border-slate-200/20 dark:border-white/5 bg-gradient-to-r from-primary/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Ready to Test Yourself?</p>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter">
                Take a UPSC Mock Exam
              </h3>
              <p className="text-xs text-slate-500 mt-1">Timed simulation with 30 minutes & 5 questions — just like the real exam.</p>
            </div>
            <button
              onClick={() => navigate('/mock/upsc')}
              className="flex-shrink-0 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-3 whitespace-nowrap"
            >
              Start Mock <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* PYQ Quick View or Full Drill */}
          {showPYQDrill ? (
            <div>
              <button
                onClick={() => setShowPYQDrill(false)}
                className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors flex items-center gap-2"
              >
                <ChevronRight className="w-3 h-3 rotate-180" /> Back to Overview
              </button>
              <PYQModule course="UPSC" topic="all" />
            </div>
          ) : (
            <PYQQuickPanel onOpenFull={() => setShowPYQDrill(true)} />
          )}

          {/* Recommended Books */}
          <BooksPanel />
        </div>
      </div>
    </div>
  );
};

export default UPSC;
