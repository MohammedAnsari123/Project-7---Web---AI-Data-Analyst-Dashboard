import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Activity, 
  Lock, 
  ChevronRight, 
  Sparkles,
  Command,
  Cpu,
  Monitor
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="space-y-12 animate-fade-in relative selection:bg-[#E6D5B8]/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F1F1F1] pb-10 gap-6">
        <div>
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Executive Administration</p>
          <h1 className="text-5xl font-serif text-slate-900 font-bold tracking-tight">Executive Profile</h1>
        </div>
        <button 
           onClick={() => setIsEditing(!isEditing)}
           className="btn-premium px-10 py-3.5 rounded-2xl flex items-center gap-3 text-sm shadow-xl shadow-gold/10 group"
        >
          {isEditing ? 'Save Parameters' : 'Modify Credentials'}
          <ChevronRight size={18} className={`transition-transform duration-500 ${isEditing ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </button>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Main Profile Card */}
        <div className="col-span-12 lg:col-span-8">
          <div className="luxury-card p-10 md:p-16 bg-white relative overflow-hidden border-[#F1F1F1]">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-full h-1.5 gold-gradient opacity-20" />
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl opacity-50" />
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
              <div className="relative group">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-[48px] gold-gradient p-1 shadow-2xl transition-transform duration-700 hover:rotate-3">
                  <div className="w-full h-full rounded-[44px] bg-white flex items-center justify-center text-[#C5A059] relative overflow-hidden">
                    <User size={80} strokeWidth={1} />
                    <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Sparkles size={32} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#C5A059] border border-slate-50 border-white/50">
                  <Shield size={24} />
                </div>
              </div>

              <div className="flex-grow space-y-8 text-center md:text-left">
                <div>
                   <h2 className="text-4xl md:text-5xl font-serif text-slate-900 font-bold mb-3 tracking-tight">Executive Identity</h2>
                   <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.4em]">Administrative Access Rank 01</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                  <ProfileField label="Identity Designation" value="Executive Director" />
                  <ProfileField label="Communication Key" value="admin@luxeanalyst.com" />
                  <ProfileField label="Last Access Vector" value="New York, US" />
                  <ProfileField label="Neural Signature" value="0x77AF..42" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Diagnostics Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="luxury-card p-10 bg-slate-900 border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform">
                 <Cpu size={100} />
              </div>
              <h4 className="text-sm font-bold text-[#E6D5B8] uppercase tracking-widest mb-10 border-b border-white/5 pb-4">Node Diagnostics</h4>
              <div className="space-y-10">
                 <DiagnosticItem label="Core Temperature" value="Optimized" progress="32%" />
                 <DiagnosticItem label="Uplink Latency" value="1.2ms" progress="12%" />
                 <DiagnosticItem label="Buffer Load" value="Minimal" progress="7%" />
              </div>
           </div>

           <div className="p-10 luxury-card bg-[#FDFCFB] border-[#F1F1F1] flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-slate-50 flex items-center justify-center text-slate-100 mb-6">
                 <Monitor size={32} />
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mb-4">Device Authorization</p>
              <h5 className="text-xl font-serif text-slate-900 font-bold mb-8">Executive Workstation_01</h5>
              <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-2 bg-emerald-50 rounded-full">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Certified Session
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none mb-2">{label}</p>
    <p className="text-[15px] font-medium text-slate-700 tracking-tight">{value}</p>
  </div>
);

const DiagnosticItem = ({ label, value, progress }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
       <span className="text-slate-500">{label}</span>
       <span className="text-[#C5A059]">{value}</span>
    </div>
    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
       <motion.div 
         initial={{ width: 0 }}
         animate={{ width: progress }}
         className="h-full gold-gradient rounded-full"
       />
    </div>
  </div>
);

export default Profile;
