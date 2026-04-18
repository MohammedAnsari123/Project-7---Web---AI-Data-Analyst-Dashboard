import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Binary, 
  Database,
  ShieldCheck,
  ArrowRight,
  Plus,
  ChevronLeft
} from 'lucide-react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.name.endsWith('.csv')) {
      setFile(selected);
      setError('');
    } else {
      setError('Protocol mismatch: Data asset must be in CSV format.');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name.replace('.csv', ''));


    try {
      const interval = setInterval(() => {
        setProgress(p => (p < 96 ? p + 4 : p));
      }, 50);

      const res = await api.post('/datasets/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      clearInterval(interval);
      setProgress(100);
      setSuccess(true);
      setTimeout(() => navigate(`/analyze/${res.data._id}`), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Uplink synchronization failed. Please verify your connection.');
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in relative selection:bg-[#E6D5B8]/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F1F1F1] pb-10 gap-4">
        <div>
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Asset Provisioning</p>
          <h1 className="text-5xl font-serif text-slate-900 font-bold tracking-tight">Intelligence Injection</h1>
        </div>
        <Link to="/datasets" className="text-slate-400 hover:text-[#C5A059] flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> View All Assets
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Main Upload Zone */}
        <div className="col-span-12 lg:col-span-8">
          <div className="luxury-card min-h-[500px] flex flex-col justify-center items-center p-8 md:p-12 bg-white relative overflow-hidden border-[#F1F1F1]">
            {/* Decorative Gold Detail */}
            <div className="absolute top-0 left-0 w-full h-1.5 gold-gradient opacity-20" />
            
            {!success ? (
              <div className="w-full max-w-xl space-y-12">
                <div 
                  className={`
                    flex flex-col items-center justify-center border-2 border-dashed rounded-[40px] transition-all p-12 md:p-20
                    ${file ? 'border-[#C5A059] bg-[#C5A059]/5' : 'border-[#F1F1F1] hover:border-[#E6D5B8] hover:bg-[#FDFCFB]'}
                  `}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); handleFileChange({ target: { files: e.dataTransfer.files } }); }}
                >
                  {!file ? (
                    <>
                      <div className="mb-10 w-24 h-24 rounded-full border border-slate-50 flex items-center justify-center text-slate-100 group">
                         <UploadIcon className="text-slate-200 group-hover:text-[#C5A059] transition-colors" size={48} />
                      </div>
                      <h4 className="text-2xl font-serif text-slate-400 font-bold mb-4">Signal Awaiting Capture</h4>
                      <p className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-10 text-center">Drag & Drop your CSV file</p>
                      
                      <label className="btn-premium px-10 py-4 rounded-full text-xs shadow-xl shadow-gold/10 cursor-pointer">
                        Identify Source Asset
                        <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
                      </label>
                    </>
                  ) : (
                    <div className="text-center w-full">
                      <div className="mb-10 mx-auto w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-white shadow-lg">
                        <Binary size={32} />
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-serif text-slate-900 font-bold mb-3 truncate px-8">{file.name}</h3>
                      <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Buffer synchronization ready</p>
                      
                      <button onClick={() => setFile(null)} className="text-rose-400 hover:text-rose-600 transition-colors text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 mx-auto decoration-rose-100 underline underline-offset-8">
                         <X size={14} /> Abort Injection
                      </button>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {file && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full btn-premium py-5 rounded-2xl flex items-center justify-center gap-4 text-sm font-bold shadow-xl shadow-gold/20 relative overflow-hidden group"
                      >
                        <span className="relative z-10">
                          {isUploading ? `Synchronizing: ${progress}%` : 'Commence Injection Protocol'}
                        </span>
                        {!isUploading && <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" /> }
                        
                        {isUploading && (
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-white/20 z-0" 
                            style={{ width: `${progress}%` }} 
                          />
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mb-12 mx-auto w-24 h-24 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
                </div>
                <h2 className="text-4xl font-serif text-slate-900 font-bold mb-4 tracking-tight">Access Link Established</h2>
                <p className="text-slate-400 text-sm font-medium animate-pulse uppercase tracking-widest">Integrating with Extraction Core...</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar: Technical Specs */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="luxury-card p-10 bg-[#FDFCFB]/50 border-[#F1F1F1]">
              <div className="flex items-center gap-3 mb-10 border-b border-slate-50 pb-6">
                 <ShieldCheck size={20} className="text-[#C5A059]" />
                 <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest leading-none">Intelligence Specs</h3>
              </div>
              
              <div className="space-y-10">
                 <SpecRow label="Encryption Layer" value="SSL-E2E" />
                 <SpecRow label="Asset Size" value={file ? `${(file.size / 1024).toFixed(1)} KB` : '0.0 KB'} />
                 <SpecRow label="Core Target" value="Neural Hub" />
                 
                 <div className="pt-10 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-[#F1F1F1] shadow-sm">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">Authorized access verified</span>
                    </div>
                 </div>
              </div>
           </div>

           {error && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 luxury-card border-rose-100 bg-rose-50/30 flex items-start gap-5"
              >
                <AlertCircle size={24} className="text-rose-500 shrink-0" />
                <div>
                   <h4 className="font-bold text-rose-600 text-[11px] uppercase tracking-widest mb-2">Protocol Redacted</h4>
                   <p className="text-[13px] text-rose-500/80 leading-relaxed font-medium">{error}</p>
                </div>
              </motion.div>
           )}

           <div className="p-10 luxury-card bg-slate-900 border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform">
                 <Database size={100} />
              </div>
              <h4 className="text-sm font-bold text-[#E6D5B8] uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Real-time Telemetry</h4>
              <div className="space-y-4 font-mono text-[10px] text-slate-500">
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-600">Buffer_Sync_01</span>
                    <span className="text-emerald-500/50 font-bold">STABLE</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-600">Neural_Handshake</span>
                    <span className="text-[#C5A059]/50 font-bold">READY</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-slate-600">Packet_Validation</span>
                    <span className="text-slate-700 font-bold">0xAF23</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-slate-50 pb-4">
    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</span>
    <span className="text-[15px] font-serif font-bold text-slate-800 leading-none">{value}</span>
  </div>
);

export default Upload;
