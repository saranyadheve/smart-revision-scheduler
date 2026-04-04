import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, ShieldCheck, Brain, ChevronRight } from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const CourseCard = ({ title, description, icon: Icon, path, delay }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate(path)}
      className="glass p-10 rounded-[3rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl group cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all flex flex-col justify-between h-full shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent blur-[80px] -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div>
        <div className="w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-white bg-gradient-to-br from-primary to-indigo-500 shadow-xl mb-8 group-hover:scale-110 transition-transform">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Explore Module</span>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const courses = [
    {
      title: 'UPSC Prime',
      description: 'Master the Civil Services Examination with strategic deep-dives into History, Polity, Geography, and Economy.',
      icon: Target,
      path: '/courses/upsc'
    },
    {
      title: 'IPS Core',
      description: 'The blueprint for leadership and internal security. Master Criminal Law, Ethics, and Physical Readiness.',
      icon: ShieldCheck,
      path: '/courses/ips'
    },
    {
      title: 'Aptitude Mastery',
      description: 'Sharpen your quantitative, logical, and verbal reasoning skills. The ultimate toolkit for clearing preliminary hurdles.',
      icon: Brain,
      path: '/courses/aptitude'
    }
  ];

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      <VisualEngine />
      
      <header className="max-w-7xl mx-auto text-center relative z-10 mb-20">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block px-10 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6 shadow-2xl shadow-primary/5"
        >
            Curriculum Hub
        </motion.div>
        <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase leading-none mb-6"
        >
            Select Your <span className="text-primary italic">Course.</span>
        </motion.h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px]">
            Target your specific career goals with our highly optimized learning engines.
        </p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {courses.map((course, index) => (
          <CourseCard key={course.path} {...course} delay={index * 0.15} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
