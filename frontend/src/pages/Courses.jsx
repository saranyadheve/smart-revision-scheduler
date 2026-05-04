import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, ShieldCheck, Brain, Code, ChevronRight, BookOpen } from 'lucide-react';

const CourseListItem = ({ title, description, icon: Icon, path, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(path)}
      className="bg-white p-5 rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-transparent hover:border-[#A3B18A]/30 transition-all cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 group mb-4"
    >
      <div className="flex items-center gap-6 flex-1">
        <div className="w-12 h-12 rounded-[12px] bg-[#F4F7F5] flex items-center justify-center text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-[18px] font-semibold text-[#2F3E46] font-poppins">{title}</h3>
          <p className="text-[14px] text-[#6B7A7A] mt-1 leading-relaxed max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end text-right mr-4">
          <span className="text-[10px] font-semibold text-[#A3B18A] uppercase tracking-widest">Available Now</span>
          <span className="text-[11px] text-[#6B7A7A]">Self-paced learning</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#F4F7F5] flex items-center justify-center text-[#6B7A7A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all">
          <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const Courses = () => {
  const courses = [
    {
      title: 'UPSC Prime',
      description: 'The ultimate guide for Civil Services. Detailed modules on History, Geography, Polity, and Economy with previous year question analysis.',
      icon: Target,
      path: '/courses/upsc'
    },
    {
      title: 'TNPSC Focus',
      description: 'Specialized curriculum for Tamil Nadu Public Service Commission exams, focusing on state history, administration, and language.',
      icon: BookOpen,
      path: '/courses/tnpsc'
    },
    {
      title: 'GATE 2025',
      description: 'Deep technical dives into Computer Science and Engineering. Master Algorithms, Data Structures, and Core OS concepts.',
      icon: Code,
      path: '/courses/gate'
    },
    {
      title: 'IT Interview Prep',
      description: 'Prepare for top tech companies with focused sessions on Problem Solving, System Design, and Behavioral rounds.',
      icon: Brain,
      path: '/courses/interview'
    }
  ];

  return (
    <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5]">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-[#A3B18A]/10 text-[#588157] text-[11px] font-semibold uppercase tracking-widest mb-4"
          >
            Syllabus Hub
          </motion.div>
          <h1 className="text-[32px] font-semibold text-[#2F3E46] font-poppins">Choose Your <span className="text-[#A3B18A]">Path.</span></h1>
          <p className="text-[#6B7A7A] mt-2 max-w-2xl">Select a course to view detailed syllabus, practice questions, and generate your personalized study plan.</p>
        </header>

        <div className="space-y-4">
          {courses.map((course, index) => (
            <CourseListItem key={course.path} {...course} index={index} />
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-[#DAD7CD]/30 text-center">
          <p className="text-[13px] text-[#6B7A7A]">Can't find what you're looking for? <span className="text-[#A3B18A] cursor-pointer hover:underline">Contact Support</span></p>
        </footer>
      </div>
    </div>
  );
};

export default Courses;
