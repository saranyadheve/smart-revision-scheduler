import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Filter, 
  Star, 
  FileText, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { getAllNotes } from '../services/api';
import VisualEngine from '../components/VisualEngine';

const StudyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('sr_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    localStorage.setItem('sr_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                          note.subject.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'ALL' || note.subject === category || (category === 'BOOKMARKED' && bookmarks.includes(note.id));
    return matchesSearch && matchesCategory;
  });

  const categories = ['ALL', 'UPSC', 'GATE', 'IT', 'BOOKMARKED'];

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <VisualEngine />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 text-center">
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase mb-4"
            >
                Knowledge Reservoir
            </motion.h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-[10px]">Access premium curated resources for your prep</p>
        </header>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between glass p-6 rounded-[2.5rem] border-slate-200/20 dark:border-white/5 bg-white/40 dark:bg-white/5 backdrop-blur-xl transition-all">
            <div className="relative w-full md:max-w-md group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by topic or subject..."
                    className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 transition-all text-sm"
                />
            </div>

            <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                {categories.map(c => (
                    <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                            category === c 
                            ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' 
                            : 'bg-slate-900/5 dark:bg-white/5 text-slate-500 border-slate-200/20 dark:border-white/10 hover:border-primary'
                        }`}
                    >
                        {c}
                    </button>
                ))}
            </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
                {filteredNotes.map((note) => (
                    <motion.div
                        layout
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ translateY: -10 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                        <div className="relative glass p-8 rounded-[3rem] border-slate-200/20 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl flex flex-col h-full border-2 border-transparent group-hover:border-primary/20 transition-all">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <button 
                                    onClick={() => toggleBookmark(note.id)}
                                    className={`p-3 rounded-2xl transition-all ${
                                        bookmarks.includes(note.id) 
                                        ? 'bg-amber-400/20 text-amber-500 border border-amber-400/20' 
                                        : 'bg-slate-900/5 dark:bg-white/5 text-slate-400 hover:text-amber-500 border border-transparent'
                                    }`}
                                >
                                    <Star className={`w-5 h-5 ${bookmarks.includes(note.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="mb-2 px-3 py-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/5 text-[8px] font-black uppercase tracking-[0.3em] inline-block w-fit text-slate-500 dark:text-slate-400">
                                {note.subject}
                            </div>
                            
                            <h3 className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter leading-tight mb-4 group-hover:text-primary transition-colors">
                                {note.title}
                            </h3>
                            
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-8 line-clamp-3">
                                {note.description || "In-depth study resources curated for high-efficiency learning and strategic revision."}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-200/10 dark:border-white/5">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    12 MB PDF
                                </div>
                                <a 
                                    href={note.pdfUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:gap-4 transition-all"
                                >
                                    Access Cloud
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {filteredNotes.length === 0 && !loading && (
                <div className="col-span-full py-24 text-center">
                    <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-800 mx-auto mb-6 opacity-20" />
                    <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-xs italic">No matching resources found in logic stream.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default StudyNotes;
