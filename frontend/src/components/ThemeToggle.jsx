import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all group shadow-xl"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-400 group-hover:-rotate-12 transition-transform" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
