import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Book, Brain, GraduationCap, FileText, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const FloatingIcon = ({ icon: Icon, top, left, size, delay, opacity }) => {
  return (
    <div 
      className="absolute animate-float pointer-events-none blur-[1px]"
      style={{ 
        top: top, 
        left: left, 
        width: size, 
        height: size, 
        animationDelay: delay,
        opacity: opacity 
      }}
    >
      <div className="w-full h-full p-4 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-2xl">
        <Icon className="w-1/2 h-1/2 text-primary dark:text-white" />
      </div>
    </div>
  );
};

const VisualEngine = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const elements = [
    { icon: Book, top: '15%', left: '10%', size: 120, delay: '0s', opacity: 0.3 },
    { icon: Brain, top: '25%', left: '75%', size: 140, delay: '2s', opacity: 0.4 },
    { icon: GraduationCap, top: '65%', left: '15%', size: 100, delay: '4s', opacity: 0.3 },
    { icon: FileText, top: '75%', left: '80%', size: 130, delay: '1s', opacity: 0.25 },
    { icon: Sparkles, top: '10%', left: '50%', size: 90, delay: '3s', opacity: 0.5 },
    // Extra elements for large screens
    { icon: Book, top: '45%', left: '85%', size: 110, delay: '5s', opacity: 0.2, desktopOnly: true },
    { icon: Brain, top: '80%', left: '40%', size: 100, delay: '6s', opacity: 0.15, desktopOnly: true },
  ];

  const visibleElements = isMobile ? elements.filter(e => !e.desktopOnly) : elements;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-slate-200/50 dark:from-slate-950 dark:via-[#020617] dark:to-slate-900 transition-colors duration-1000 opacity-100 dark:opacity-90" />
      
      {visibleElements.map((el, index) => (
        <FloatingIcon 
          key={index} 
          {...el} 
          size={isMobile ? el.size * 0.7 : el.size} 
          opacity={isDarkMode ? el.opacity * 0.5 : el.opacity}
        />
      ))}
    </div>
  );
};

export default VisualEngine;
