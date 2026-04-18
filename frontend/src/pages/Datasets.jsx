import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
  Database, 
  Binary, 
  ChevronRight, 
  Activity, 
  Calendar, 
  Plus, 
  HardDrive,
  MoreVertical,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Datasets = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const res = await api.get('/datasets');
      setDatasets(res.data);
    } catch (err) {
      console.error('Data acquisition interrupted:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#E6D5B8] border-t-[#C5A059] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F1F1F1] pb-10 gap-6">
        <div>
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Storage Vault</p>
          <h1 className="text-5xl font-serif text-slate-900 font-bold tracking-tight">Intelligence Assets</h1>
        </div>
        <Link to="/upload" className="btn-premium px-8 py-3.5 rounded-2xl flex items-center gap-3 text-sm shadow-xl shadow-gold/10 group">
          <Plus size={18} /> New Integration
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {datasets.map((ds, idx) => (
          <motion.div
            key={ds._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link to={`/analyze/${ds._id}`} className="group block h-full">
              <div className="luxury-card p-10 h-full flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 bg-white">
                <div className="flex justify-between items-start mb-10 pb-6 border-b border-slate-50">
                  <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                    <HardDrive size={28} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mb-2 leading-none">Reference Node</p>
                    <p className="text-[11px] text-[#C5A059] font-bold font-mono tracking-tighter">#{ds._id.slice(-8).toUpperCase()}</p>
                    <div className="flex items-center gap-1.5 justify-end mt-3">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                       <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Synchronized</span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow space-y-10">
                  <div>
                    <h3 className="text-3xl font-serif text-slate-900 font-bold group-hover:text-[#C5A059] transition-colors line-clamp-2">{ds.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-3">High-Fidelity Signal Buffer</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pb-2">
                    <div className="bg-[#FDFCFB] p-5 rounded-2xl border border-slate-50 border-l-2 border-l-[#C5A059]">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Dataset Rows</span>
                       <span className="text-2xl font-serif text-slate-800 font-bold leading-none">{ds.rowCount.toLocaleString()}</span>
                    </div>
                    <div className="bg-[#FDFCFB] p-5 rounded-2xl border border-slate-50 border-l-2 border-l-[#C5A059]">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Attributes</span>
                       <span className="text-2xl font-serif text-slate-800 font-bold leading-none">{ds.columns.length}</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[12px] text-slate-400 font-medium">
                      <Calendar size={14} className="text-[#E6D5B8]" />
                      <span>{new Date(ds.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        
        <Link to="/upload" className="group flex flex-col items-center justify-center luxury-card border-dashed border-[#E6D5B8] min-h-[450px] relative transition-all hover:bg-[#FDFCFB] hover:border-[#C5A059] p-12 overflow-hidden bg-white">
           {/* Decorative Background Icon */}
           <div className="absolute -right-12 -bottom-12 text-[#E6D5B8]/5 group-hover:scale-110 transition-transform">
              <Plus size={240} />
           </div>
           
           <div className="mb-10 w-24 h-24 rounded-full border border-[#E6D5B8]/30 flex items-center justify-center text-[#E6D5B8] group-hover:text-[#C5A059] group-hover:border-[#C5A059] group-hover:scale-110 transition-all">
              <Plus size={48} />
           </div>
           <div className="text-center group-hover:-translate-y-2 transition-transform relative z-10">
             <h4 className="text-2xl font-serif text-slate-400 group-hover:text-slate-900 font-bold mb-3 transition-colors">Instate New Asset</h4>
             <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-300 group-hover:text-[#C5A059] transition-colors leading-relaxed">
               Neural Buffer Alignment
             </p>
           </div>
        </Link>
      </div>
    </div>
  );
};

export default Datasets;
