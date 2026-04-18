import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Database, ArrowLeft, BarChart3, Binary, Activity, Sparkles, ChevronLeft, Download, Info } from 'lucide-react';

const DatasetDetail = () => {
  const { datasetId } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 animate-fade-in relative selection:bg-[#E6D5B8]/30">
      <Link 
        to="/datasets" 
        className="inline-flex items-center gap-3 text-slate-400 hover:text-[#C5A059] transition-all text-[12px] font-bold uppercase tracking-widest group"
      >
        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
           <ChevronLeft size={16} />
        </div>
        Return to Asset Vault
      </Link>
      
      <div className="luxury-card p-12 md:p-16 bg-white relative overflow-hidden text-center border-[#F1F1F1]">
        {/* Decorative Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 gold-gradient" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl opacity-50" />
        
        <div className="relative z-10">
          <div className="mb-12 w-24 h-24 rounded-3xl gold-gradient flex items-center justify-center text-white shadow-2xl mx-auto transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <Database size={40} />
          </div>
          
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.4em] mb-6">Data Intelligence Node</p>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 font-bold tracking-tight mb-8 leading-[1.1]">
             Asset Neural <span className="gold-text-gradient italic">Buffer</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] mb-16 text-[10px] bg-[#FDFCFB] py-3 px-6 rounded-full inline-block border border-slate-50">
             Extraction ID: <span className="text-slate-900 font-mono">#{datasetId.toUpperCase()}</span> &bull; Status: Synchronized
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
             <Link 
              to={`/analyze/${datasetId}`} 
              className="flex-grow btn-premium px-10 py-5 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold shadow-xl shadow-gold/10 group"
             >
                Initialize Analysis <BarChart3 size={20} className="group-hover:scale-110 transition-transform" />
             </Link>
             <button className="flex-grow px-10 py-5 bg-white border border-[#F1F1F1] text-slate-600 rounded-2xl text-sm font-bold hover:border-[#C5A059] hover:text-[#C5A059] transition-all flex items-center justify-center gap-3">
                Export Metadata <Download size={18} />
             </button>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-slate-50 flex items-center justify-center gap-12 md:gap-24 flex-wrap">
           <DetailStat label="Parity Bit" value="Optimal" />
           <DetailStat label="Uplink Sync" value="Stable" />
           <DetailStat label="Core Version" value="v4.2-Lux" />
        </div>
      </div>

      <div className="p-8 rounded-[32px] bg-[#C5A059]/5 border border-[#C5A059]/10 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#C5A059] shadow-sm flex-shrink-0">
          <Info size={24} />
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-sm font-bold text-slate-800 mb-2 font-serif">Deep Intelligence Mode Active</h4>
          <p className="text-[13px] text-slate-500 leading-relaxed font-light">
            This asset is fully indexed and ready for complex natural language queries. 
            Engagement with the Neural Buffer will log activity under your current executive session.
          </p>
        </div>
      </div>
    </div>
  );
};

const DetailStat = ({ label, value }) => (
  <div className="text-center min-w-[100px]">
     <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3 leading-none">{label}</div>
     <div className="text-lg font-serif text-[#C5A059] font-bold italic">{value}</div>
  </div>
);

export default DatasetDetail;
