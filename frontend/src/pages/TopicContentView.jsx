import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Clock, 
  Activity, 
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIVideoPlayer from '../components/AIVideoPlayer';
import axios from 'axios';
import { logInteraction } from '../services/activityTracker';

const TopicContentView = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const [topic, setTopic] = useState(null);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [jobId, setJobId] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetchTopicAndContent();
    }, [topicId]);

    const fetchTopicAndContent = async () => {
        try {
            const contentRes = await axios.get(`http://localhost:8080/api/learning/topics/${topicId}/content`);
            if (contentRes.data) {
                setContent(contentRes.data);
                setLoading(false);
            } else {
                // Content doesn't exist yet, wait for manual trigger or show generation UI
                setLoading(false);
            }
        } catch (error) {
            console.error("Failed to fetch content", error);
            setLoading(false);
        }
    };

    const startGeneration = async () => {
        setGenerating(true);
        setStatus("Initializing AI Synthesis Engine...");
        try {
            const res = await axios.post(`http://localhost:8080/api/learning/topics/${topicId}/generate`);
            setJobId(res.data.jobId);
        } catch (error) {
            console.error("Generation failed", error);
            setGenerating(false);
            setStatus("Engine failed to start. Please check AI Service.");
        }
    };

    useEffect(() => {
        let pollInterval;
        if (jobId && generating) {
            pollInterval = setInterval(async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/api/learning/jobs/${jobId}`);
                    setStatus(res.data.status);
                    
                    if (res.data.state === 'COMPLETED') {
                        clearInterval(pollInterval);
                        // Save results back to DB via backend
                        await axios.post(`http://localhost:8080/api/learning/topics/${topicId}/save-results`, res.data.result);
                        setGenerating(false);
                        fetchTopicAndContent();
                    } else if (res.data.state === 'FAILED') {
                        clearInterval(pollInterval);
                        setGenerating(false);
                        setStatus("Generation Failed: " + res.data.error);
                    }
                } catch (error) {
                    console.error("Polling error", error);
                }
            }, 2000);
        }
        return () => clearInterval(pollInterval);
    }, [jobId, generating]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
            <RefreshCw className="animate-spin text-[#A3B18A]" size={40} />
        </div>
    );

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-[#F4F7F5]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[#6B7A7A] hover:text-[#588157] transition-all text-[11px] font-black uppercase tracking-widest bg-white py-3 px-6 rounded-2xl border border-[#DAD7CD]/30 shadow-sm"
                    >
                        <ChevronLeft size={16} /> Back to Topics
                    </button>
                    <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-[#A3B18A]/10 rounded-2xl border border-[#A3B18A]/20">
                        <Activity size={16} className="text-[#A3B18A]" />
                        <span className="text-[10px] font-black text-[#588157] uppercase tracking-widest">Live Content Synthesis</span>
                    </div>
                </div>

                {!content && !generating && (
                    <div className="bg-white p-16 rounded-[48px] border border-[#DAD7CD]/30 shadow-sm text-center">
                        <div className="w-20 h-20 bg-[#F4F7F5] border border-[#DAD7CD]/30 rounded-3xl flex items-center justify-center text-[#A3B18A] mx-auto mb-8">
                            <Sparkles size={40} />
                        </div>
                        <h2 className="text-[32px] font-bold text-[#2F3E46] font-poppins mb-4 tracking-tight">AI Content Ready for Synthesis</h2>
                        <p className="text-[15px] text-[#6B7A7A] max-w-lg mx-auto mb-12 leading-relaxed">
                            This topic does not have pre-generated materials. Click below to launch the AI pipeline to create custom bilingual videos, audio, and study guides.
                        </p>
                        <button 
                            onClick={startGeneration}
                            className="px-12 py-5 bg-[#2F3E46] text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl hover:bg-black transition-all flex items-center gap-4 mx-auto border-b-4 border-black/50 active:translate-y-1 active:border-b-0"
                        >
                            <RefreshCw size={18} /> Initiate AI Generation
                        </button>
                    </div>
                )}

                {generating && (
                    <div className="bg-[#2F3E46] p-16 rounded-[48px] shadow-2xl text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <RefreshCw className="animate-spin text-[#A3B18A] mx-auto mb-8" size={64} />
                            <h2 className="text-[28px] font-bold text-white font-poppins mb-2">{status}</h2>
                            <p className="text-white/60 text-[12px] uppercase tracking-[0.3em] font-black">AI Pipeline Active • Please wait</p>
                            
                            <div className="max-w-md mx-auto mt-12 space-y-4">
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        className="w-1/2 h-full bg-[#A3B18A]"
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                                    <span>Translation</span>
                                    <span>TTS Engine</span>
                                    <span>Synthesis</span>
                                </div>
                            </div>
                        </div>
                        <Sparkles className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 opacity-20" />
                    </div>
                )}

                {content && !generating && (
                    <div className="space-y-12">
                        {/* Title Section */}
                        <div className="bg-white p-10 rounded-[40px] border border-[#DAD7CD]/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-[#F4F7F5] border border-[#DAD7CD]/30 rounded-lg text-[10px] font-black text-[#A3B18A] uppercase tracking-widest">Interactive Lesson</span>
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#A3B18A]">
                                        <Clock size={12} /> 12:45 Duration
                                    </div>
                                </div>
                                <h1 className="text-[34px] font-bold text-[#2F3E46] font-poppins tracking-tight leading-tight">AI Cinematic Session</h1>
                            </div>
                            <div className="flex gap-4">
                                <a 
                                    href={content.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-4 bg-[#F4F7F5] text-[#588157] rounded-2xl font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 border border-[#DAD7CD]/30 hover:bg-white transition-all shadow-sm"
                                >
                                    <FileText size={18} /> Study Guide
                                </a>
                                <button 
                                    className="px-6 py-4 bg-[#A3B18A] text-white rounded-2xl font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
                                    onClick={() => {
                                        logInteraction();
                                        alert("Progress saved!");
                                    }}
                                >
                                    <CheckCircle2 size={18} /> Mark Complete
                                </button>
                            </div>
                        </div>

                        {/* Player Component */}
                        <AIVideoPlayer 
                            videoUrl={content.videoUrl}
                            englishAudioUrl={content.audioEnUrl}
                            tamilAudioUrl={content.audioTaUrl}
                            englishScript={content.audioEnScript || content.videoScript}
                            tamilScript={content.audioTaScript}
                        />

                        {/* Additional Resources */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
                            <div className="bg-white p-6 rounded-[32px] border border-[#DAD7CD]/30 flex items-center gap-5 shadow-sm group hover:border-[#A3B18A] transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-[#F4F7F5] rounded-2xl flex items-center justify-center text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold text-[#2F3E46] tracking-tight">Standard Notes</h4>
                                    <p className="text-[10px] font-medium text-[#6B7A7A] uppercase tracking-widest">NCERT/Static Text</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-[#DAD7CD]/30 flex items-center gap-5 shadow-sm group hover:border-[#A3B18A] transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-[#F4F7F5] rounded-2xl flex items-center justify-center text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold text-[#2F3E46] tracking-tight">Concept Quiz</h4>
                                    <p className="text-[10px] font-medium text-[#6B7A7A] uppercase tracking-widest">Test Retention</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-[#DAD7CD]/30 flex items-center gap-5 shadow-sm group hover:border-[#A3B18A] transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-[#F4F7F5] rounded-2xl flex items-center justify-center text-[#A3B18A] group-hover:bg-[#A3B18A] group-hover:text-white transition-all">
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="text-[13px] font-bold text-[#2F3E46] tracking-tight">Doubt Hub</h4>
                                    <p className="text-[10px] font-medium text-[#6B7A7A] uppercase tracking-widest">AI Clarifications</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopicContentView;
