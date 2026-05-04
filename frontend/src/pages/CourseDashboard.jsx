import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Cpu, 
  Terminal, 
  ArrowRight,
  PlayCircle,
  Clock,
  Layers
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';

const CourseDashboard = () => {
    const navigate = useNavigate();

    const courses = [
        {
            id: 'tnpsc',
            title: 'TNPSC Exam Prep',
            desc: 'Complete coverage of Groups 1, 2, 2A, and 4. History, Polity, and Tamil modules.',
            icon: BookOpen,
            color: 'from-[#588157] to-[#3A5A40]',
            stats: '120+ Videos • 45 PDFs'
        },
        {
            id: 'gate',
            title: 'GATE CS & IT',
            desc: 'Core engineering subjects: OS, DBMS, Algorithms, and Discrete Mathematics.',
            icon: Cpu,
            color: 'from-[#A3B18A] to-[#588157]',
            stats: '85+ Videos • 30 PDFs'
        },
        {
            id: 'interview',
            title: 'IT Interview Track',
            desc: 'Data Structures, System Design, and HR preparation for top-tier tech roles.',
            icon: Terminal,
            color: 'from-[#2F3E46] to-[#1B262C]',
            stats: '60+ Videos • 25 PDFs'
        }
    ];

    return (
        <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5] font-poppins relative overflow-hidden">
            <VisualEngine />
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-12">
                    <h1 className="text-[36px] font-bold text-[#2F3E46] tracking-tight">Learning Hub.</h1>
                    <p className="text-[#6B7A7A] mt-2 font-medium opacity-80">Structured courses to master your target exam.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => navigate(`/notes/courses/${course.id}/history`)} // Default to first sub
                            className="bg-white rounded-[40px] overflow-hidden border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                        >
                            <div className={`h-40 bg-gradient-to-br ${course.color} p-8 flex items-end justify-between relative`}>
                                <course.icon size={80} className="absolute -top-4 -left-4 text-white opacity-10 group-hover:scale-110 transition-transform" />
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl text-white">
                                    <PlayCircle size={24} />
                                </div>
                            </div>
                            <div className="p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#A3B18A] mb-2 block">{course.stats}</span>
                                <h3 className="text-[22px] font-bold text-[#2F3E46] mb-3">{course.title}</h3>
                                <p className="text-[#6B7A7A] text-[14px] leading-relaxed mb-8">{course.desc}</p>
                                <div className="flex items-center justify-between border-t border-[#F4F7F5] pt-6">
                                    <div className="flex items-center gap-2 text-[#588157]">
                                        <Clock size={16} />
                                        <span className="text-[12px] font-bold">Self-Paced</span>
                                    </div>
                                    <div className="p-2 bg-[#F4F7F5] rounded-full group-hover:bg-[#588157] group-hover:text-white transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 bg-[#2F3E46] p-10 rounded-[48px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <Layers size={200} className="absolute -bottom-20 -right-20 opacity-5" />
                    <div className="relative z-10">
                        <h2 className="text-[28px] font-bold mb-3">Request a New Course</h2>
                        <p className="text-[#A3B18A] max-w-lg font-medium">Interested in a specific subject or exam? Let us know and we'll curate a structured path for you.</p>
                    </div>
                    <button className="bg-[#A3B18A] hover:bg-white hover:text-[#2F3E46] px-8 py-4 rounded-2xl text-[14px] font-bold transition-all relative z-10">
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDashboard;
