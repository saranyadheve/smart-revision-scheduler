import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getStats, predictSession } from '../services/api';
import { getActivity, getAccuracy, clearActivity } from '../services/activityTracker';
import { 
  Zap, 
  Clock, 
  BarChart, 
  Activity, 
  Shield, 
  Cpu, 
  Target, 
  ArrowRight, 
  Brain,
  Calendar,
  AlertCircle,
  BarChart3,
  Newspaper,
  ExternalLink,
  Milestone,
  Lightbulb,
  ClipboardCheck,
  TrendingUp,
  BookOpen,
  Percent,
  History,
  Trash2
} from 'lucide-react';
import QuotesPanel from '../components/QuotesPanel';

const SubjectCard = ({ icon: Icon, title, desc, path, color }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(path)}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-indigo-500/50 rounded-[2.5rem] blur opacity-0 group-hover:opacity-30 transition duration-500" />
      <div className="relative bg-white/50 dark:bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 backdrop-blur-2xl flex flex-col items-center text-center h-full transition-colors">
        <div className={`p-5 rounded-[1.8rem] mb-6 bg-gradient-to-br ${color} shadow-2xl shadow-black/10 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-3">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
        
        <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">
          Launch Preparation
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Activity Panel ────────────────────────────────────────────────────────────
const ActivityPanel = () => {
  const [activity, setActivity] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const refresh = () => setActivity(getActivity());

  useEffect(() => {
    refresh();
    // Re-read whenever the tab regains focus (user returns from a test)
    window.addEventListener('focus', refresh);
    // Also poll every 3 s so same-tab navigation updates live
    const interval = setInterval(refresh, 3000);
    return () => {
      window.removeEventListener('focus', refresh);
      clearInterval(interval);
    };
  }, []);

  const handleClear = () => {
    if (window.confirm('Reset all activity data?')) {
      clearActivity();
      refresh();
    }
  };

  if (!activity) return null;

  const accuracy = getAccuracy(activity);
  const topicCount = activity.topicsCovered.length;

  const statItems = [
    {
      icon: ClipboardCheck,
      value: activity.testsTaken,
      label: 'Tests Taken',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: Percent,
      value: `${accuracy}%`,
      label: 'Accuracy',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: BookOpen,
      value: topicCount,
      label: 'Topics',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20'
    },
  ];

  return (
    <section className="glass p-8 rounded-[3rem] border-slate-200/10 dark:border-white/5 relative overflow-hidden bg-white/30 dark:bg-white/5">
      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Activity
          </h3>
          <div className="flex items-center gap-3">
            {activity.testsTaken > 0 && (
              <button
                onClick={() => setShowHistory(v => !v)}
                title="Toggle history"
                className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-primary/10 border border-slate-200 dark:border-white/5 text-slate-500 hover:text-primary transition-all"
              >
                <History className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleClear}
              title="Reset activity"
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-rose-500/10 border border-slate-200 dark:border-white/5 text-slate-500 hover:text-rose-400 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {statItems.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`flex flex-col items-center p-4 rounded-2xl border ${s.bg}`}
            >
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <span className="text-2xl font-black text-slate-800 dark:text-white italic">{s.value}</span>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-0.5 text-center">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Accuracy bar */}
        {activity.testsTaken > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest mb-2">
              <span>Overall Accuracy</span>
              <span className="text-emerald-400 italic">{accuracy}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Topics covered badges */}
        {topicCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activity.topicsCovered.map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Empty state */}
        {activity.testsTaken === 0 && (
          <div className="flex flex-col items-center py-6 text-center">
            <ClipboardCheck className="w-10 h-10 text-slate-300 dark:text-white/10 mb-3" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No tests yet</p>
            <p className="text-[10px] text-slate-400 mt-1">Complete a mock test to track your progress</p>
          </div>
        )}

        {/* History list */}
        <AnimatePresence>
          {showHistory && activity.history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-slate-200/30 dark:border-white/5 space-y-2 overflow-hidden"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">Recent History</p>
              {activity.history.slice(0, 5).map((h, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[8px] font-black uppercase tracking-wide">{h.topic}</span>
                    <span className="text-[10px] font-bold text-slate-500">{h.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-200">{h.correct}/{h.total}</span>
                    <span className={`text-[9px] font-black ${h.percent >= 60 ? 'text-emerald-400' : 'text-rose-400'}`}>{h.percent}%</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
// ──────────────────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ fatigueScore: 0.15, nextRevision: 'Loading...', emailStatus: 'Active user' });
  const [prediction, setPrediction] = useState(null);
  const [sessionInput, setSessionInput] = useState({ duration: 60, difficulty: 3 });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatRevisionDate = (dateData) => {
    if (!dateData) return 'N/A';
    if (typeof dateData === 'string') return dateData;
    if (Array.isArray(dateData)) return dateData.join('-');
    if (typeof dateData === 'object' && dateData.year) {
      return `${dateData.year}-${String(dateData.monthValue || dateData.month).padStart(2, '0')}-${String(dateData.dayOfMonth).padStart(2, '0')}`;
    }
    return 'Scheduled';
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, newsRes] = await Promise.all([
        getStats(user.id),
        Promise.resolve([
          { id: 1, title: 'UPSC 2024 Prelims Notification Released', category: 'UPSC', date: '2024-03-25' },
          { id: 2, title: 'New Gate Syllabus for CS 2025', category: 'GATE', date: '2024-03-24' },
          { id: 3, title: 'Top 10 Interview Questions for Big Tech', category: 'IT', date: '2024-03-23' }
        ])
      ]);
      setStats({
          fatigueScore: statsRes.data.fatigueScore * 100,
          nextRevision: formatRevisionDate(statsRes.data.revisionDate),
          emailStatus: statsRes.data.emailStatus
      });
      setNews(newsRes);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    try {
      const res = await predictSession(sessionInput.duration, sessionInput.difficulty);
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error("Prediction failed");
    }
  };

  return (
    <div className="p-8 md:p-12 mt-12 w-full max-w-7xl mx-auto space-y-10 transition-colors">
      {/* Hero Header */}
      <header className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-12 rounded-[3.5rem] glass border-slate-200/10 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6 justify-center lg:justify-start"
          >
            <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.4em] ${stats.emailStatus === 'Active user' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
              Status: {stats.emailStatus}
            </div>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-800 dark:text-white mb-6 italic tracking-tighter leading-none">
            Welcome, <br/> <span className="text-primary italic">{user?.username || 'Scholar'}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.5em] text-[10px]">Your learning engine is optimized and ready.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full lg:w-auto relative z-10">
          <StatMini icon={Activity} value={`${stats.fatigueScore}%`} label="Fatigue" color="text-red-400" />
          <StatMini icon={Calendar} value={stats.nextRevision} label="Revision" color="text-blue-400" />
          <StatMini icon={Zap} value="14 Days" label="Streak" color="text-yellow-400" />
        </div>
      </header>

      {/* Quotes Section */}
      <QuotesPanel />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content: Subjects */}
        <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter flex items-center gap-4">
                    <Milestone className="w-8 h-8 text-primary" />
                    Preparation Paths
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SubjectCard 
                    title="UPSC Prelims" 
                    desc="Master Indian History, Polity, and Geography with AI insights." 
                    path="/courses/upsc" 
                    color="from-orange-500 to-red-500" 
                    icon={Target} 
                />
                <SubjectCard 
                    title="GATE 2025" 
                    desc="Technical depth in Computer Science & Engineering modules." 
                    path="/gate" 
                    color="from-blue-500 to-indigo-500" 
                    icon={Cpu} 
                />
                <SubjectCard 
                    title="IPS Prep" 
                    desc="Dedicated focus on Ethics, Aptitude, and Physical Law." 
                    path="/courses/ips" 
                    color="from-emerald-500 to-teal-500" 
                    icon={Shield} 
                />
                <SubjectCard 
                    title="Aptitude" 
                    desc="Crack quantitative, logical, and verbal reasoning with our speed drills." 
                    path="/courses/aptitude" 
                    color="from-purple-500 to-pink-500" 
                    icon={Brain} 
                />
            </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-10">
            {/* 🔴 Real Activity Tracking Panel */}
            <ActivityPanel />

            {/* AI Session Predictor */}
            <section className="glass p-8 rounded-[3rem] border-slate-200/10 dark:border-white/5 relative overflow-hidden bg-primary/5">
                <div className="relative z-10">
                    <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase mb-8 flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        AI Focus Lab
                    </h3>
                    <div className="space-y-6">
                        <PredictInput label="Session Duration (min)" val={sessionInput.duration} set={v => setSessionInput({...sessionInput, duration: v})} min={15} max={240} />
                        <PredictInput label="Topic Difficulty (1-5)" val={sessionInput.difficulty} set={v => setSessionInput({...sessionInput, difficulty: v})} min={1} max={5} />
                        
                        <button 
                            onClick={handlePredict}
                            className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-primary/10"
                        >
                            Predict Neural Fatigue
                        </button>

                        <AnimatePresence>
                            {prediction !== null && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-6 border-t border-white/5"
                                >
                                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">
                                        <span>Estimated Fatigue</span>
                                        <span className="text-primary italic">{Math.round(prediction * 100)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${prediction * 100}%` }}
                                            className="h-full bg-primary rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* News Feed */}
            <section className="glass p-8 rounded-[3rem] border-slate-200/10 dark:border-white/5">
                <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase mb-8 flex items-center gap-3">
                    <Newspaper className="w-5 h-5 text-blue-400" />
                    Daily Feed
                </h3>
                <div className="space-y-6">
                    {news.map(item => (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-primary mb-1">
                                <span>{item.category}</span>
                                <span className="opacity-40">{item.date}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors flex items-center gap-2">
                                {item.title}
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h4>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

const StatMini = ({ icon: Icon, value, label, color }) => (
    <div className="flex flex-col items-center p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/5 hover:bg-white/10 transition-colors shadow-sm">
        <Icon className={`w-6 h-6 ${color} mb-3`} />
        <span className="text-xl font-black text-slate-800 dark:text-white italic">{value}</span>
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">{label}</span>
    </div>
);

const PredictInput = ({ label, val, set, min, max }) => (
    <div className="space-y-3">
        <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">
            <span>{label}</span>
            <span className="text-primary italic">{val}</span>
        </div>
        <input 
            type="range" 
            min={min} 
            max={max} 
            value={val} 
            onChange={e => set(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-900/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
        />
    </div>
);

export default Dashboard;
