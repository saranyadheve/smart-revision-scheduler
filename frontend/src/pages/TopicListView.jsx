import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  PlayCircle, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  RefreshCw,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const TopicListView = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/learning/modules/${moduleId}/topics`);
                setTopics(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch topics", error);
                setLoading(false);
            }
        };
        fetchTopics();
    }, [moduleId]);

    const filteredTopics = topics.filter(t => 
        t.title.toLowerCase().includes(search.toLowerCase()) || 
        t.description.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
            <RefreshCw className="animate-spin text-[#A3B18A]" size={40} />
        </div>
    );

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                     <button 
                        onClick={() => navigate('/learning-hub')}
                        className="flex items-center gap-2 text-[#6B7A7A] hover:text-[#588157] transition-all text-[11px] font-black uppercase tracking-widest bg-white py-3 px-6 rounded-2xl border border-[#DAD7CD]/30 shadow-sm mb-10 w-fit"
                    >
                        <ChevronLeft size={16} /> All Academies
                    </button>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-[#A3B18A] uppercase tracking-[0.3em] mb-4">
                                <Sparkles size={12} /> Syllabus Deep Dive
                            </div>
                            <h1 className="text-[42px] font-bold text-[#2F3E46] font-poppins tracking-tighter leading-tight">
                                Curriculum <span className="text-[#A3B18A]/60">Pathways.</span>
                            </h1>
                            <p className="text-[#6B7A7A] text-[15px] mt-4 leading-relaxed max-w-xl">
                                Select a topic to launch your AI production. Each concept is synthesized into high-quality visual and bilingual audio lessons for maximum retention.
                            </p>
                        </div>

                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DAD7CD]" size={18} />
                            <input 
                                type="text"
                                placeholder="Search concepts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white border border-[#DAD7CD]/30 pl-12 pr-6 py-4 rounded-2xl text-[14px] outline-none focus:ring-2 focus:ring-[#A3B18A]/20 transition-all font-medium shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTopics.map((topic, i) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate(`/learning-hub/topic/${topic.id}`)}
                            className="bg-white p-8 rounded-[40px] border border-[#DAD7CD]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div className="w-16 h-16 bg-[#F4F7F5] rounded-3xl flex items-center justify-center text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all shadow-inner">
                                    <BookOpen size={28} />
                                </div>
                                <div className="flex items-center gap-1 text-[10px] font-black text-[#6B7A7A] bg-[#F4F7F5] px-3 py-1.5 rounded-full border border-[#DAD7CD]/30 uppercase tracking-widest">
                                    <Clock size={12} /> 12:45
                                </div>
                            </div>
                            
                            <h3 className="text-[20px] font-bold text-[#2F3E46] mb-3 font-poppins tracking-tight group-hover:text-[#588157] transition-colors">{topic.title}</h3>
                            <p className="text-[13px] text-[#6B7A7A] leading-relaxed line-clamp-3 mb-8 opacity-80">{topic.description}</p>
                            
                            <div className="pt-6 border-t border-[#F4F7F5] flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[#588157] text-[11px] font-black uppercase tracking-widest">
                                    <PlayCircle size={16} /> Play Audio/Video
                                </div>
                                <CheckCircle2 size={20} className="text-[#DAD7CD] opacity-40" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredTopics.length === 0 && (
                    <div className="py-32 text-center bg-white rounded-[48px] border border-dashed border-[#DAD7CD]/40">
                         <div className="w-20 h-20 bg-[#F4F7F5] rounded-full flex items-center justify-center mx-auto mb-6 text-[#DAD7CD]">
                             <Search size={32} />
                         </div>
                         <p className="text-[#6B7A7A] font-bold uppercase tracking-widest text-[14px]">No topics match your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicListView;
