import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
  FileText, 
  ChevronRight, 
  Activity, 
  Calendar, 
  Download, 
  Database, 
  Lock,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get('/reports');
      setReports(res.data);
    } catch (err) {
      console.error('Archive synchronization failed:', err);
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
    <div className="space-y-12 animate-fade-in relative selection:bg-[#E6D5B8]/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F1F1F1] pb-10 gap-6">
        <div>
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Historical Data</p>
          <h1 className="text-5xl font-serif text-slate-900 font-bold tracking-tight">Intelligence Archives</h1>
        </div>
        
        <div className="relative group max-w-sm w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search archives..." 
            className="w-full bg-white border border-[#F1F1F1] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#C5A059] focus:bg-[#FDFCFB] transition-all text-[13px] text-slate-700 shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-6">
        {reports.map((report, idx) => (
          <motion.div 
            key={report._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="luxury-card group transition-all duration-500 hover:scale-[1.01] overflow-hidden p-0 bg-white border-[#F1F1F1]">
              <div className="flex flex-col md:flex-row">
                {/* Visual Accent */}
                <div className="w-full md:w-1.5 h-1.5 md:h-auto gold-gradient opacity-20 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex-grow p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#FDFCFB] border border-slate-50 flex items-center justify-center text-[#C5A059] transition-transform group-hover:scale-110 shadow-sm">
                      <FileText size={24} />
                    </div>
                    
                    <div className="space-y-2 overflow-hidden">
                       <h3 className="text-lg md:text-xl font-serif text-slate-900 font-bold group-hover:text-[#C5A059] transition-colors truncate">
                          {report.queryContext || 'Intelligence Narrative'}
                       </h3>
                       <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                          <span className="flex items-center gap-2"><Database size={12} className="text-[#E6D5B8]" /> Dataset: <span className="text-slate-500">{report.datasetId?.name || 'Asset Redacted'}</span></span>
                          <span className="flex items-center gap-2"><Calendar size={12} className="text-[#E6D5B8]" /> Resolved: <span className="text-slate-500">{new Date(report.createdAt).toLocaleDateString()}</span></span>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto md:ml-0">
                    <Link 
                      to={`/reports/${report._id}`}
                      className="px-6 py-3 bg-white border border-[#F1F1F1] text-slate-500 text-[11px] font-bold tracking-widest uppercase rounded-xl hover:border-[#C5A059] hover:text-[#C5A059] transition-all flex items-center gap-3 bg-white"
                    >
                      Open Archive <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {reports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-[#F1F1F1] rounded-[40px] text-center bg-white/50">
             <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-100 mb-8">
                <FileText size={32} />
             </div>
             <h3 className="text-2xl font-serif text-slate-400 font-bold mb-4">Historical Vault Empty</h3>
             <p className="text-sm text-slate-300 font-medium mb-10 max-w-sm px-6">No intelligence reports have been archived yet. Your analysis history will appear here.</p>
             <Link to="/datasets" className="text-[#C5A059] font-bold text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
                Initiate New Analysis <ChevronRight size={14} />
             </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
