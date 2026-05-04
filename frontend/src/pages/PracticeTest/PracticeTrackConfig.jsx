import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowLeft, Layers, Target, Clock, AlertCircle } from 'lucide-react';
import { TRACKS_CONFIG } from '../../services/PracticeTestEngine';
import VisualEngine from '../../components/VisualEngine';

const PracticeTrackConfig = () => {
    const { track } = useParams();
    const navigate = useNavigate();
    
    // Validate Track
    const decodedTrack = track ? decodeURIComponent(track) : '';
    const config = TRACKS_CONFIG[decodedTrack];

    const [testType, setTestType] = useState('MIXED'); // 'MIXED' | 'TOPIC'
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedSubtopic, setSelectedSubtopic] = useState('');

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5] flex-col gap-4">
                <AlertCircle className="text-red-500" size={48} />
                <h2 className="text-xl font-semibold">Track Not Found</h2>
                <button onClick={() => navigate('/practice-tests')} className="text-[#588157] underline">Return to Tracks</button>
            </div>
        );
    }

    const availableSubjects = Object.keys(config.subjects);
    const availableSubtopics = selectedSubject ? config.subjects[selectedSubject] : [];

    const handleStart = () => {
        let url = `/practice-tests/${encodeURIComponent(decodedTrack)}/run`;
        const params = new URLSearchParams();
        if (testType === 'TOPIC') {
            if (selectedSubject) params.set('subject', selectedSubject);
            if (selectedSubtopic) params.set('subtopic', selectedSubtopic);
        }
        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        navigate(url);
    };

    const isReady = testType === 'MIXED' || (testType === 'TOPIC' && selectedSubject);

    return (
        <div className="relative w-full min-h-screen pt-24 pb-12 px-6 flex flex-col items-center bg-[#F4F7F5]">
            <VisualEngine />
            <div className="max-w-3xl w-full relative z-10">
                <button 
                    onClick={() => navigate('/practice-tests')}
                    className="flex items-center gap-2 text-[13px] font-semibold tracking-widest uppercase text-[#6B7A7A] hover:text-[#588157] transition-colors mb-8"
                >
                    <ArrowLeft size={16} /> Back to Tracks
                </button>

                <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#DAD7CD]/30 shadow-[0_8px_24px_rgba(0,0,0,0.04)] mb-8 flex flex-col items-center text-center">
                    <h1 className="text-3xl font-bold text-[#2F3E46] font-poppins mb-2">{config.title}</h1>
                    <p className="text-[#6B7A7A] mb-8 max-w-lg">
                        Customize your practice session. Choose between a full mixed test simulating the real exam, or focus on a specific subject.
                    </p>

                    <div className="flex w-full max-w-sm rounded-xl p-1 bg-[#EAF0EA] mb-8">
                        <button
                            onClick={() => { setTestType('MIXED'); setSelectedSubject(''); setSelectedSubtopic(''); }}
                            className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${testType === 'MIXED' ? 'bg-white text-[#588157] shadow-sm' : 'text-[#6B7A7A] hover:text-[#588157]'}`}
                        >
                            Common Mixed Test
                        </button>
                        <button
                            onClick={() => setTestType('TOPIC')}
                            className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${testType === 'TOPIC' ? 'bg-white text-[#588157] shadow-sm' : 'text-[#6B7A7A] hover:text-[#588157]'}`}
                        >
                            Topic-Wise Drill
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {testType === 'TOPIC' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="w-full text-left overflow-hidden flex flex-col gap-5 mb-8"
                            >
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-semibold text-[#6B7A7A] uppercase tracking-wider pl-1">Target Subject *</label>
                                    <select 
                                        className="w-full bg-[#F4F7F5] border border-[#DAD7CD]/50 rounded-xl p-3.5 outline-none focus:border-[#A3B18A] focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-[#2F3E46] text-sm"
                                        value={selectedSubject}
                                        onChange={(e) => { setSelectedSubject(e.target.value); setSelectedSubtopic(''); }}
                                    >
                                        <option value="">-- Choose Subject --</option>
                                        {availableSubjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                    </select>
                                </div>

                                {selectedSubject && (
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[12px] font-semibold text-[#6B7A7A] uppercase tracking-wider pl-1">Subtopic Drill (Optional)</label>
                                        <select 
                                            className="w-full bg-[#F4F7F5] border border-[#DAD7CD]/50 rounded-xl p-3.5 outline-none focus:border-[#A3B18A] focus:ring-2 focus:ring-[#A3B18A]/20 transition-all text-[#2F3E46] text-sm"
                                            value={selectedSubtopic}
                                            onChange={(e) => setSelectedSubtopic(e.target.value)}
                                        >
                                            <option value="">-- Complete Subject --</option>
                                            {availableSubtopics.map(subt => <option key={subt} value={subt}>{subt}</option>)}
                                        </select>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10 text-left">
                        <div className="bg-[#F4F7F5] p-4 rounded-xl flex flex-col items-center md:items-start text-center md:text-left">
                            <Layers className="text-[#A3B18A] mb-2" size={20} />
                            <span className="text-[18px] font-semibold text-[#2F3E46]">30</span>
                            <span className="text-[11px] font-medium text-[#6B7A7A] uppercase tracking-widest mt-1">Questions</span>
                        </div>
                        <div className="bg-[#F4F7F5] p-4 rounded-xl flex flex-col items-center md:items-start text-center md:text-left">
                            <Clock className="text-[#A3B18A] mb-2" size={20} />
                            <span className="text-[18px] font-semibold text-[#2F3E46]">30m</span>
                            <span className="text-[11px] font-medium text-[#6B7A7A] uppercase tracking-widest mt-1">Time Limit</span>
                        </div>
                        <div className="bg-[#F4F7F5] p-4 rounded-xl flex flex-col items-center md:items-start text-center md:text-left">
                            <Target className="text-[#A3B18A] mb-2" size={20} />
                            <span className="text-[18px] font-semibold text-[#2F3E46]">MCQ</span>
                            <span className="text-[11px] font-medium text-[#6B7A7A] uppercase tracking-widest mt-1">Format</span>
                        </div>
                        <div className="bg-[#F4F7F5] p-4 rounded-xl flex flex-col items-center md:items-start text-center md:text-left">
                            <AlertCircle className="text-[#A3B18A] mb-2" size={20} />
                            <span className="text-[18px] font-semibold text-[#2F3E46]">Auto</span>
                            <span className="text-[11px] font-medium text-[#6B7A7A] uppercase tracking-widest mt-1">Submit</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleStart}
                        disabled={!isReady}
                        className="w-full md:w-auto px-12 py-4 bg-[#588157] text-white rounded-xl font-semibold uppercase tracking-widest text-[13px] hover:bg-[#3A5A40] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#588157]/20 flex items-center justify-center gap-3"
                    >
                        <Play size={18} fill="currentColor" /> Initialize Assessment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PracticeTrackConfig;
