import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courseData } from '../data/courseData';
import { 
  Play, 
  FileText, 
  CheckCircle, 
  ArrowLeft,
  Sparkles,
  Download,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Video
} from 'lucide-react';
import VisualEngine from '../components/VisualEngine';
import AIVideoPlayer from '../components/AIVideoPlayer';

const CourseSubjectView = () => {
    const { track, subjectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('video');

    const trackData = courseData[track];
    const subject = trackData?.subjects?.find(s => s.id === subjectId) || 
                    trackData?.categories?.find(c => c.id === subjectId);

    if (!subject) {
        return (
            <div className="p-10 pt-24 text-center">
                <h2 className="text-2xl font-bold">Subject not found</h2>
                <button onClick={() => navigate('/notes/courses')} className="mt-4 text-[#588157] font-bold">Back to Courses</button>
            </div>
        );
    }

    // Asset mapping for AI visuals
    const visuals = {
        science_ai_visual: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=1200",
        history_ai_visual: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=1200",
        gate_ai_visual: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
    };

    return (
        <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5] font-poppins relative overflow-hidden">
            <VisualEngine />
            <div className="max-w-7xl mx-auto relative z-10">
                <button 
                    onClick={() => navigate('/notes/courses')}
                    className="flex items-center gap-2 text-[#6B7A7A] hover:text-[#2F3E46] mb-8 font-bold text-[13px] transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Courses
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Visual/Content Player */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-[#DAD7CD]/30 group">
                            {activeTab === 'video' ? (
                                <AIVideoPlayer 
                                    subject={subject.title} 
                                    summary={subject.summary} 
                                    persona={subject.id.length % 2 === 0 ? 'female' : 'male'} 
                                />
                            ) : (
                                <div className="p-12 text-center py-32">
                                    <FileText size={64} className="mx-auto text-[#DAD7CD] mb-6 opacity-40" />
                                    <h3 className="text-[20px] font-bold text-[#2F3E46] mb-2">{subject.title} Notes</h3>
                                    <p className="text-[#6B7A7A] mb-8">Download and study the structured notes for this module.</p>
                                    <a 
                                        href={subject.notes} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-[#588157] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#2F3E46] transition-all inline-flex items-center gap-2"
                                    >
                                        <Download size={18} /> Open Original PDF
                                    </a>
                                </div>
                            )}
                            
                            <div className="p-8 border-t border-[#F4F7F5] bg-white">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#A3B18A]">{track?.toUpperCase()} Module</span>
                                    <div className="flex gap-1">
                                        {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#588157] rounded-full opacity-30" />)}
                                    </div>
                                </div>
                                <h1 className="text-[28px] font-bold text-[#2F3E46]">{subject.title}</h1>
                                <p className="text-[#6B7A7A] mt-2 leading-relaxed">Detailed conceptual walkthrough and practical implementation strategies for {subject.title}.</p>
                            </div>
                        </div>

                        {/* Quick Navigation Tabs */}
                        <div className="flex gap-4 mt-6">
                            <button 
                                onClick={() => setActiveTab('video')}
                                className={`flex-grow py-4 rounded-2xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 border ${activeTab === 'video' ? 'bg-[#588157] text-white border-transparent shadow-lg' : 'bg-white text-[#6B7A7A] border-[#DAD7CD]/30'}`}
                            >
                                <Sparkles size={18} /> AI Walkthrough
                            </button>
                            <button 
                                onClick={() => setActiveTab('notes')}
                                className={`flex-grow py-4 rounded-2xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 border ${activeTab === 'notes' ? 'bg-[#588157] text-white border-transparent shadow-lg' : 'bg-white text-[#6B7A7A] border-[#DAD7CD]/30'}`}
                            >
                                <FileText size={18} /> Study Material
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sidebar (Other Subjects & Practice) */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        <div className="bg-[#2F3E46] p-8 rounded-[40px] text-white shadow-2xl">
                             <div className="flex items-center gap-3 mb-6">
                                <CheckCircle size={22} className="text-[#A3B18A]" />
                                <h3 className="text-[18px] font-bold">Practice Prep</h3>
                             </div>
                             <p className="text-[#A3B18A] text-[13px] mb-8 font-medium italic opacity-80">"Knowledge is of no value unless you put it into practice."</p>
                             
                             <button 
                                onClick={() => navigate(subject.practice)}
                                className="w-full bg-white/10 hover:bg-white hover:text-[#2F3E46] p-5 rounded-[24px] border border-white/5 font-bold text-[14px] transition-all flex items-center justify-between"
                             >
                                <span>Go to Practice Drill</span>
                                <ExternalLink size={18} />
                             </button>
                        </div>

                        <div className="bg-white p-8 rounded-[40px] border border-[#DAD7CD]/30 shadow-sm">
                            <h3 className="text-[18px] font-bold text-[#2F3E46] mb-6">Other Modules</h3>
                            <div className="space-y-3">
                                {(trackData.subjects || trackData.categories || []).filter(s => s.id !== subjectId).map(s => (
                                    <div 
                                        key={s.id}
                                        onClick={() => navigate(`/notes/courses/${track}/${s.id}`)}
                                        className="p-4 rounded-2xl border border-[#DAD7CD]/10 hover:bg-[#F4F7F5] cursor-pointer group flex items-center justify-between transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-xl bg-[#F4F7F5] flex items-center justify-center text-[#588157] group-hover:bg-[#588157] group-hover:text-white transition-all">
                                                <Play size={14} />
                                            </div>
                                            <span className="text-[13px] font-bold text-[#2F3E46] group-hover:translate-x-1 transition-transform">{s.title}</span>
                                        </div>
                                        <ChevronRight size={16} className="text-[#DAD7CD]" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSubjectView;
