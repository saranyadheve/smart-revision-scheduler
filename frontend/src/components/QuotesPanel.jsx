import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "Knowledge is power. Information is liberating.", author: "Kofi Annan" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { text: "Consistency is more important than perfection.", author: "Unknown" },
  { text: "Your only limit is your mind.", author: "Unknown" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Arise, awake, and stop not until the goal is reached.", author: "Swami Vivekananda" },
];

const QuotesPanel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-40 flex items-center justify-center p-6 glass rounded-[2.5rem] border-white/5 bg-gradient-to-tr from-primary/5 to-transparent overflow-hidden">
      <div className="absolute top-4 left-6 opacity-20">
        <Quote className="w-8 h-8 text-primary" />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-lg"
        >
          <p className="text-lg md:text-xl font-medium text-slate-100 italic mb-3 tracking-tight">
            "{quotes[index].text}"
          </p>
          <cite className="text-[10px] font-black uppercase tracking-[0.4em] text-primary not-italic">
            — {quotes[index].author}
          </cite>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuotesPanel;
