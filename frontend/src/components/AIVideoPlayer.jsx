import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, RotateCcw, Languages, Headphones, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIVideoPlayer = ({ videoUrl, englishAudioUrl, tamilAudioUrl, englishScript, tamilScript }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [language, setLanguage] = useState('english'); // 'english' or 'tamil'
    const [showScript, setShowScript] = useState(true);
    
    const videoRef = useRef(null);
    const englishAudioRef = useRef(null);
    const tamilAudioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
            englishAudioRef.current.pause();
            tamilAudioRef.current.pause();
        } else {
            videoRef.current.play();
            if (language === 'english') {
                englishAudioRef.current.play();
            } else {
                tamilAudioRef.current.play();
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleLanguageSwitch = (lang) => {
        setLanguage(lang);
        const currentTime = videoRef.current.currentTime;
        
        // Sync audio
        englishAudioRef.current.pause();
        tamilAudioRef.current.pause();
        
        if (lang === 'english') {
            englishAudioRef.current.currentTime = currentTime;
            if (isPlaying) englishAudioRef.current.play();
        } else {
            tamilAudioRef.current.currentTime = currentTime;
            if (isPlaying) tamilAudioRef.current.play();
        }
    };

    const handleTimeUpdate = () => {
        const current = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        setProgress((current / duration) * 100);

        // Keep audio in sync periodically
        if (isPlaying) {
            const activeAudio = language === 'english' ? englishAudioRef.current : tamilAudioRef.current;
            if (Math.abs(activeAudio.currentTime - current) > 0.3) {
                activeAudio.currentTime = current;
            }
        }
    };

    return (
        <div className="w-full space-y-6">
            <div className="relative aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl group border border-white/10">
                <video 
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    muted // Video is always muted, audio comes from separate tracks
                />

                {/* Hidden Audio Tracks */}
                <audio ref={englishAudioRef} src={englishAudioUrl} />
                <audio ref={tamilAudioRef} src={tamilAudioUrl} />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all z-20">
                    {/* Progress Bar */}
                    <div className="relative h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer overflow-hidden backdrop-blur-md">
                        <div 
                            className="absolute left-0 top-0 h-full bg-[#A3B18A] rounded-full" 
                            style={{ width: `${progress}%` }} 
                        />
                    </div>

                    <div className="flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-6">
                            <button onClick={togglePlay} className="text-white hover:text-[#A3B18A] transition-colors p-2">
                                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                            </button>
                            <button onClick={() => videoRef.current.currentTime -= 10} className="text-white hover:text-white/70 transition-colors">
                                <RotateCcw size={20} />
                            </button>
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                                <Volume2 size={18} className="text-white" />
                                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-white" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-md border border-white/10">
                                <button 
                                    onClick={() => handleLanguageSwitch('english')}
                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${language === 'english' ? 'bg-[#A3B18A] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                                >
                                    English
                                </button>
                                <button 
                                    onClick={() => handleLanguageSwitch('tamil')}
                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${language === 'tamil' ? 'bg-[#A3B18A] text-white shadow-lg' : 'text-white/60 hover:text-white'}`}
                                >
                                    Tamil
                                </button>
                            </div>
                            <button 
                                onClick={() => setShowScript(!showScript)}
                                className={`p-2 rounded-xl border transition-all ${showScript ? 'bg-[#A3B18A] border-[#A3B18A] text-white' : 'border-white/20 text-white'}`}
                            >
                                <Layout size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Big Play Button Overlay */}
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl">
                                <Play size={48} className="fill-white translate-x-1" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Script Display */}
            {showScript && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-[32px] border border-[#DAD7CD]/30 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Headphones className="text-[#A3B18A]" size={20} />
                            <h4 className="text-[14px] font-bold text-[#2F3E46] uppercase tracking-widest">Narration Script</h4>
                        </div>
                        <span className="text-[10px] font-black bg-[#F4F7F5] px-3 py-1 rounded-full text-[#A3B18A] uppercase border border-[#DAD7CD]/30">
                            {language === 'english' ? 'English (Global)' : 'Tamil (Regional)'}
                        </span>
                    </div>
                    <div className="p-6 bg-[#F4F7F5]/50 rounded-2xl border border-[#DAD7CD]/20 min-h-[100px] relative overflow-hidden">
                        <p className="text-[15px] leading-relaxed text-[#2F3E46] relative z-10 font-medium">
                            {language === 'english' ? englishScript : tamilScript}
                        </p>
                        <div className="absolute -bottom-6 -right-6 text-[#A3B18A]/5">
                            <Languages size={120} />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AIVideoPlayer;
