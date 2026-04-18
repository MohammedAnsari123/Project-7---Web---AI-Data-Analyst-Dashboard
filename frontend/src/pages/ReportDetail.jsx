import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Download, ShieldCheck, Activity, Lock, ChevronLeft, ArrowUpRight, Info } from 'lucide-react';

const ReportDetail = () => {
  const { reportId } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 animate-fade-in relative selection:bg-[#E6D5B8]/30">
      <Link 
        to="/reports" 
        className="inline-flex items-center gap-3 text-slate-400 hover:text-[#C5A059] transition-all text-[12px] font-bold uppercase tracking-widest group"
      >
        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-[#C5A059] transition-colors">
           <ChevronLeft size={16} />
        </div>
        Return to Archives
      </Link>
      
      <div className="luxury-card p-12 md:p-16 bg-white relative overflow-hidden text-center border-[#F1F1F1]">
        {/* Decorative Gold Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 gold-gradient" />
        
        <div className="relative z-10">
          <div className="mb-12 w-24 h-24 rounded-3xl gold-gradient flex items-center justify-center text-white shadow-2xl mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <FileText size={40} />
          </div>
          
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.4em] mb-6">Historical Insight Node</p>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 font-bold tracking-tight mb-8 leading-[1.1]">
             Analysis <span className="gold-text-gradient italic">Narrative</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] mb-16 text-[10px] bg-[#FDFCFB] py-3 px-6 rounded-full inline-block border border-slate-50">
             Record Spec: <span className="text-slate-900 font-mono">#{reportId.toUpperCase()}</span> &bull; Security: AES-256
          </p>
          
          <div className="w-full max-w-2xl mx-auto bg-[#FDFCFB] border border-[#F1F1F1] rounded-[32px] p-8 md:p-10 mb-16 text-left space-y-6 relative overflow-hidden">
             {/* Subtle Pattern Background */}
             <div className="absolute right-0 top-0 p-8 text-slate-50 opacity-10 pointer-events-none">
                <Lock size={120} />
             </div>
             
             <div className="flex items-center gap-3 text-[11px] font-bold text-[#C5A059] tracking-[0.3em] uppercase">
                <Lock size={16} /> Decrypted Protocol
             </div>
             <p className="text-slate-600 font-light text-[15px] leading-relaxed italic border-l-2 border-[#C5A059] pl-6 py-2">
                The neural core has finalized extraction protocols for this historical record. 
                All vector patterns have been validated against the centralized storage cluster. 
                This snapshot is available for immediate executive review and external synchronization.
             </p>
             <div className="flex gap-2">
                <div className="h-1 w-16 gold-gradient rounded-full shadow-sm" />
                <div className="h-1 w-2 bg-slate-100 rounded-full" />
                <div className="h-1 w-2 bg-slate-100 rounded-full" />
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
             <button className="flex-grow btn-premium px-10 py-5 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold shadow-xl shadow-gold/10 group">
                Export Narrative <Download size={20} className="group-hover:translate-y-1 transition-transform" />
             </button>
             <button className="flex-grow px-10 py-5 bg-white border border-[#F1F1F1] text-slate-600 rounded-2xl text-sm font-bold hover:border-[#C5A059] hover:text-[#C5A059] transition-all flex items-center justify-center gap-3">
                Sync External <ArrowUpRight size={18} />
             </button>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-slate-50 flex items-center justify-center gap-10 md:gap-24 flex-wrap">
           <DetailStat label="Hash Integrity" value="Validated" />
           <DetailStat label="Sync Protocol" value="0xFA42" />
           <DetailStat label="Visibility" value="Private" />
        </div>
      </div>

      <div className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-6 text-white overflow-hidden relative group">
        <div className="absolute right-0 top-0 p-6 text-white/5 group-hover:scale-110 transition-transform">
           <Activity size={80} />
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C5A059] flex-shrink-0">
          <ShieldCheck size={24} />
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-sm font-bold mb-2 font-serif text-white">Encrypted Archive Node</h4>
          <p className="text-[13px] text-slate-400 leading-relaxed font-light max-w-lg">
            This narrative is protected by end-to-end encryption. Any modifications or 
            synchronization events are logged to the executive security ledger.
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

export default ReportDetail;
