import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const MouseParallax = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(mousePos.x, springConfig);
  const mouseY = useSpring(mousePos.y, springConfig);

  // Transformations for background elements
  const x1 = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
  const y1 = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Decorative Parallax Blobs */}
      <motion.div 
        style={{ x: x1, y: y1 }}
        className="fixed top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-[-2]"
      />
      <motion.div 
        style={{ x: useTransform(mouseX, [0, window.innerWidth], [30, -30]), y: useTransform(mouseY, [0, window.innerHeight], [30, -30]) }}
        className="fixed bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-[-2]"
      />
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default MouseParallax;
