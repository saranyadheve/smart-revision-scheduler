import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, X, Save, FileText, Search, Sparkles, Clock } from 'lucide-react';

const PersonalNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const getStorageKey = () => `sr_personal_notes_${user?.id || 'guest'}`;

  useEffect(() => {
    fetchNotes();
  }, [user?.id]);

  const fetchNotes = () => {
    try {
      const stored = localStorage.getItem(getStorageKey());
      if (stored) {
        setNotes(JSON.parse(stored));
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error("Failed to fetch notes from local storage", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Title + Content validation
    if (!currentNote.title.trim() || !currentNote.content.trim()) {
      alert("Please provide both a title and content for your note.");
      return;
    }

    try {
      let updatedNotes = [...notes];
      
      if (currentNote.id) {
        // Update existing
        updatedNotes = updatedNotes.map(n => 
          n.id === currentNote.id ? { ...currentNote, updatedAt: new Date().toISOString() } : n
        );
      } else {
        // Create new
        const newNote = {
          ...currentNote,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        updatedNotes = [newNote, ...updatedNotes];
      }
      
      localStorage.setItem(getStorageKey(), JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setIsModalOpen(false);
      setCurrentNote({ title: '', content: '' });
      
    } catch (err) {
      console.error("Failed to save note", err);
      alert("Failed to save note. Please try again.");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const updatedNotes = notes.filter(note => note.id !== id);
      localStorage.setItem(getStorageKey(), JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete note. Try again.");
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 pt-24 min-h-screen bg-[#F4F7F5]">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-[28px] font-semibold text-[#2F3E46] font-poppins">Personal Archive</h1>
            <p className="text-[#6B7A7A] mt-1">Search or create titles to access your knowledge bank.</p>
          </div>
          <button 
            onClick={() => { setCurrentNote({ title: '', content: '' }); setIsModalOpen(true); }}
            className="btn-primary"
          >
            <Plus size={20} />
            Quick Add
          </button>
        </header>

        {/* Search & Accessibility Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7A7A]" size={18} />
                <input 
                    type="text" 
                    placeholder="Search note by title to access..." 
                    className="w-full pl-12 pr-4 py-4 bg-white border border-[#DAD7CD]/30 rounded-[16px] focus:outline-none focus:border-[#588157] transition-all text-[14px] shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <motion.div 
              key={note.id} 
              layout
              className="bg-white p-6 rounded-[24px] shadow-sm flex flex-col group border border-[#DAD7CD]/10 hover:border-[#588157]/20 transition-all hover:shadow-md cursor-pointer"
              onClick={() => setSelectedNote(note)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] flex items-center justify-center text-[#588157]">
                  <FileText size={20} />
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setCurrentNote(note); setIsModalOpen(true); }}
                    className="p-2 text-[#6B7A7A] hover:text-[#588157] transition-colors bg-[#F4F7F5] rounded-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                    className="p-2 text-[#6B7A7A] hover:text-red-500 transition-colors bg-[#F4F7F5] rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="text-[18px] font-bold text-[#2F3E46] mb-2 font-poppins group-hover:text-[#588157] transition-colors">{note.title}</h3>
              <p className="text-[14px] text-[#6B7A7A] line-clamp-3 leading-relaxed flex-grow opacity-80">{note.content}</p>
              <div className="mt-6 pt-4 border-t border-[#F4F7F5] flex items-center justify-between">
                <span className="text-[10px] text-[#6B7A7A] font-black uppercase tracking-widest">
                   Access: /{note.title?.toLowerCase().replace(/\s+/g, '-')}
                </span>
                <span className="text-[10px] text-[#A3B18A] font-bold">
                    {new Date(note.updatedAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}

          {!loading && filteredNotes.length === 0 && (
            <div className="col-span-full py-20 bg-white/50 border-2 border-dashed border-[#DAD7CD]/50 rounded-[20px] flex flex-col items-center justify-center text-center">
              <FileText size={48} className="text-[#A3B18A]/30 mb-4" />
              <p className="text-[#6B7A7A] font-medium">No notes found.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-[#A3B18A] text-[13px] font-semibold mt-2 hover:underline"
              >
                Create your first note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-sm bg-black/10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-[20px] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-[#DAD7CD]/30 flex items-center justify-between">
                <h2 className="text-[20px] font-semibold text-[#2F3E46] font-poppins">
                  {currentNote.id ? 'Edit Note' : 'New Note'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-[#6B7A7A] hover:text-[#2F3E46]">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-6">
                <div>
                  <label className="block text-[12px] font-semibold text-[#6B7A7A] uppercase tracking-widest mb-2">Title</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-[#F4F7F5] border-none rounded-[12px] focus:ring-2 focus:ring-[#A3B18A]/30 text-[#2F3E46] font-medium"
                    value={currentNote.title}
                    onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                    placeholder="Enter note title..."
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#6B7A7A] uppercase tracking-widest mb-2">Content</label>
                  <textarea 
                    rows={8}
                    required
                    className="w-full px-4 py-3 bg-[#F4F7F5] border-none rounded-[12px] focus:ring-2 focus:ring-[#A3B18A]/30 text-[#2F3E46] leading-relaxed"
                    value={currentNote.content}
                    onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                    placeholder="Start typing your notes here..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-[14px] text-[#6B7A7A] font-medium hover:bg-[#F4F7F5] rounded-[10px]">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Save size={18} />
                    {currentNote.id ? 'Update Note' : 'Save Note'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Focused Access Modal */}
      <AnimatePresence>
        {selectedNote && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12 bg-[#2F3E46]/95 backdrop-blur-xl">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 50 }}
               className="w-full max-w-4xl h-full max-h-[85vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
                <div className="p-8 border-b border-[#F4F7F5] flex items-center justify-between bg-white/50 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#588157] flex items-center justify-center text-white">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-[22px] font-bold text-[#2F3E46] leading-none mb-1">{selectedNote.title}</h2>
                            <p className="text-[11px] font-black uppercase tracking-widest text-[#A3B18A]">Personal Archive • Access: /{selectedNote.title?.toLowerCase().replace(/\s+/g, '-')}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedNote(null)}
                        className="w-12 h-12 rounded-full border border-[#DAD7CD]/30 flex items-center justify-center text-[#6B7A7A] hover:bg-[#F4F7F5] transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="flex-grow p-10 overflow-y-auto custom-scrollbar bg-[#F4F7F5]/30">
                    <div className="max-w-2xl mx-auto py-10">
                        <div className="flex items-center gap-2 mb-8 opacity-40">
                            {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#588157]" />)}
                        </div>
                        <p className="text-[18px] text-[#2F3E46] leading-[1.8] font-medium whitespace-pre-wrap">
                            {selectedNote.content}
                        </p>
                    </div>
                </div>
                <div className="p-8 bg-white border-t border-[#F4F7F5] flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[12px] font-bold text-[#6B7A7A]">
                        <Clock size={14} /> Created: {new Date(selectedNote.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                    <button 
                        onClick={() => { setCurrentNote(selectedNote); setSelectedNote(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-8 py-3 bg-[#2F3E46] text-white rounded-2xl font-bold hover:bg-[#588157] transition-all"
                    >
                        <Edit2 size={16} /> Edit this Archive
                    </button>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalNotes;
