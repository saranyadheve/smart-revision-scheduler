import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { logRevisionSession } from '../services/api';
import { 
  X as CloseIcon,
  CheckCircle2
} from 'lucide-react';

const LogSessionModal = ({ isOpen, onClose, onLogged, defaultTopic = "" }) => {
  const { user } = useAuth();
  const [topic, setTopic] = useState(defaultTopic);
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await logRevisionSession({
        user: { id: user.id },
        topicName: topic,
        durationMinutes: parseInt(duration),
        difficultyLevel: parseInt(difficulty)
      });
      onLogged(response.data);
      onClose();
    } catch (error) {
      console.error("Logging failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass w-full max-w-md p-8 rounded-[2.5rem] border-white/10 relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <CloseIcon className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 italic">
          <CheckCircle2 className="text-primary" />
          Log Study Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Topic Name</label>
            <input 
              type="text" 
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Current Affairs"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Duration (Min)</label>
              <input 
                type="number" 
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Difficulty (1-5)</label>
              <input 
                type="number" 
                min="1" max="5"
                required
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Confirm Study Session'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default LogSessionModal;
