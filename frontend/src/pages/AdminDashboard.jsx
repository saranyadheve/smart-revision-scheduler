import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Trash2, 
  BarChart3, 
  Settings, 
  RefreshCw, 
  UserCheck,
  UserX,
  Database
} from 'lucide-react';
import { getAllNotes, createNote, deleteNote, retrainModel, getAllUsers, toggleUserStatus } from '../services/api';
import VisualEngine from '../components/VisualEngine';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'users' | 'analytics'
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState({ title: '', subject: '', pdfUrl: '', description: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'resources') {
        const response = await getAllNotes();
        setNotes(response.data);
      } else if (activeTab === 'users') {
        const response = await getAllUsers();
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      await createNote(newNote);
      setNewNote({ title: '', subject: '', pdfUrl: '', description: '' });
      fetchData();
      window.alert('Resource deployed to scholars successfully.');
    } catch (error) {
      window.alert('Deployment failed. Connection error.');
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm("Purge this resource from all scholar databases?")) {
      try {
        await deleteNote(id);
        fetchData();
        window.alert('Resource purged from network.');
      } catch (error) {
        window.alert('Extraction failed.');
      }
    }
  };

  const handleToggleUser = async (id) => {
    try {
      await toggleUserStatus(id);
      fetchData();
      window.alert('Scholar status synchronized.');
    } catch (error) {
      window.alert('Sync failed.');
    }
  };

  const handleRetrain = async () => {
    try {
      await retrainModel();
      window.alert('AI Neural core recalibrated.');
    } catch (error) {
      window.alert('Recalibration failed.');
    }
  };

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 md:px-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <VisualEngine />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10 bg-slate-900/5 dark:bg-white/5 p-10 rounded-[3.5rem] glass border-slate-200/10 dark:border-white/5">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center border border-primary/20 shadow-2xl">
                <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <div>
                <h1 className="text-5xl font-black text-slate-800 dark:text-white italic tracking-tighter uppercase mb-2">Admin Command Center</h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">Real-time preparation analytics & logic</p>
            </div>
          </div>
          <button 
            onClick={handleRetrain}
            className="flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary-dark transition-all shadow-2xl shadow-primary/20 group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-1000" />
            Recalibrate AI
          </button>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4">
            <TabButton active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} icon={Database} label="Knowledge Resources" />
            <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={Users} label="Scholar Management" />
            <TabButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={BarChart3} label="Neural Analytics" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <AnimatePresence mode="wait">
            {activeTab === 'resources' && (
              <motion.div 
                key="resources"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-10"
              >
                {/* Resource Form */}
                <div className="lg:col-span-4">
                  <div className="glass rounded-[3rem] p-10 border-slate-200/10 dark:border-white/5 bg-slate-900/5 dark:bg-white/5">
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white italic mb-10 uppercase flex items-center gap-4">
                      <Plus className="text-primary w-6 h-6" />
                      Add Document
                    </h2>
                    <form onSubmit={handleAddNote} className="space-y-6">
                      <AdminInput label="Document Title" value={newNote.title} onChange={e => setNewNote({...newNote, title: e.target.value})} placeholder="e.g. UPSC Geography Vol 1" />
                      <AdminInput label="Examination Category" value={newNote.subject} onChange={e => setNewNote({...newNote, subject: e.target.value})} placeholder="UPSC / GATE / IT" />
                      <AdminInput label="Cloud Storage URL" value={newNote.pdfUrl} onChange={e => setNewNote({...newNote, pdfUrl: e.target.value})} placeholder="https://drive.google.com/..." />
                      <div className="space-y-2.5">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Description</label>
                          <textarea 
                              value={newNote.description}
                              onChange={e => setNewNote({...newNote, description: e.target.value})}
                              className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/10 rounded-[2rem] p-5 text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 text-sm h-32 resize-none transition-all"
                              placeholder="Brief abstract..."
                          />
                      </div>
                      <button type="submit" className="w-full py-5 bg-slate-800 dark:bg-white/5 hover:bg-slate-700 dark:hover:bg-white/10 border border-slate-200/20 dark:border-white/10 text-slate-800 dark:text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl">
                          Release to Network
                      </button>
                    </form>
                  </div>
                </div>

                {/* Resource Table */}
                <div className="lg:col-span-8">
                  <div className="glass rounded-[3rem] p-10 border-slate-200/10 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 h-full overflow-hidden">
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white italic mb-10 uppercase flex items-center gap-4">
                          <Settings className="text-slate-400 w-6 h-6" />
                          Knowledge Base
                      </h2>
                      <div className="overflow-x-auto h-[500px] pr-4 custom-scrollbar">
                          <table className="w-full text-left">
                              <thead>
                                  <tr className="border-b border-slate-200/10 dark:border-white/5">
                                      <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Identification</th>
                                      <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                                      <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right px-4">Extraction</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200/10 dark:divide-white/5">
                                  {notes.map((note) => (
                                      <tr key={note.id} className="group hover:bg-primary/5 transition-colors">
                                          <td className="py-6 pr-6">
                                              <div className="font-black text-slate-800 dark:text-slate-200 italic uppercase m-0 leading-tight mb-1">{note.title}</div>
                                              <div className="text-[9px] text-slate-500 truncate max-w-sm font-medium tracking-wide">CID: {note.pdfUrl}</div>
                                          </td>
                                          <td className="py-6">
                                              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest italic">{note.subject}</span>
                                          </td>
                                          <td className="py-6 text-right px-4">
                                              <button 
                                                  onClick={() => handleDeleteNote(note.id)}
                                                  className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all"
                                              >
                                                  <Trash2 className="w-5 h-5" />
                                              </button>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div 
                key="users"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-12"
              >
                  <div className="glass rounded-[3.5rem] p-12 border-slate-200/10 dark:border-white/5 bg-slate-900/5 dark:bg-white/5">
                      <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black text-slate-800 dark:text-white italic uppercase flex items-center gap-5">
                            <Users className="text-primary w-8 h-8" />
                            Scholar Network
                        </h2>
                        <div className="px-6 py-2 rounded-2xl bg-primary/10 text-primary font-black uppercase text-[10px] tracking-widest border border-primary/20">
                            {users.length} Active nodes
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {users.map(u => (
                              <div key={u.id} className="relative group overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <div className="relative glass p-8 rounded-[2.5rem] border-slate-200/10 dark:border-white/5 flex flex-col items-center text-center">
                                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-2 ${u.enabled ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                          <Users className="w-8 h-8" />
                                      </div>
                                      <div className="text-xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-1">{u.username}</div>
                                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">{u.role} NODE</div>
                                      
                                      <div className="w-full flex items-center justify-between gap-4">
                                          <div className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border ${u.enabled ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                              {u.enabled ? 'Sync Active' : 'Off-Grid'}
                                          </div>
                                          <button 
                                              onClick={() => handleToggleUser(u.id)}
                                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 transition-all"
                                          >
                                              {u.enabled ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                                              {u.enabled ? 'Deactivate' : 'Restore'}
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
                <motion.div 
                    key="analytics"
                    className="lg:col-span-12 flex items-center justify-center py-32 glass rounded-[3.5rem] border-white/5 italic text-slate-500 uppercase font-black tracking-[0.5em] text-sm"
                >
                    Neural Data Rendering...
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] transition-all whitespace-nowrap border-2 ${
            active 
            ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/20 scale-105' 
            : 'bg-slate-900/5 dark:bg-white/5 text-slate-500 border-transparent hover:bg-slate-900/10 dark:hover:bg-white/10'
        }`}
    >
        <Icon className={`w-5 h-5 ${active ? 'animate-bounce-slow' : ''}`} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
    </button>
);

const AdminInput = ({ label, value, onChange, placeholder }) => (
    <div className="space-y-2.5">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{label}</label>
        <input 
            type="text" 
            value={value} 
            onChange={onChange}
            className="w-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/20 dark:border-white/10 rounded-[2rem] px-6 py-4 text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 text-sm placeholder:text-slate-700 transition-all"
            placeholder={placeholder}
        />
    </div>
);

const ShieldCheck = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default AdminDashboard;
