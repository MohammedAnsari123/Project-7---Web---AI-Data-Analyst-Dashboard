import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Eye, 
  Moon, 
  Globe, 
  Shield, 
  Database,
  ChevronRight,
  Sparkles,
  Smartphone
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-12 animate-fade-in relative selection:bg-[#E6D5B8]/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F1F1F1] pb-10 gap-6">
        <div>
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Core Parameters</p>
          <h1 className="text-5xl font-serif text-slate-900 font-bold tracking-tight">System Settings</h1>
        </div>
        <div className="flex items-center gap-3 py-2 px-6 bg-[#FDFCFB] border border-[#F1F1F1] rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-400">
           <Sparkles size={14} className="text-[#C5A059]" />
           Neural Sync Verified
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <SettingsSection title="Intelligence Interface" icon={<Eye size={20} />}>
            <ToggleOption label="High-Fidelity Visualizations" desc="Render complex data vectors with maximum precision." defaultChecked />
            <ToggleOption label="Concierge Voice Assistance" desc="Enable auditory intelligence feedback loops." />
            <ToggleOption label="Dark Mode Integration" desc="Synchronize UI with deep space aesthetics." />
          </SettingsSection>

          <SettingsSection title="Security & Access" icon={<Shield size={20} />}>
            <ToggleOption label="Two-Factor Neural Handshake" desc="Require biometric verification for asset extraction." defaultChecked />
            <ToggleOption label="Login Notification Cycle" desc="Receive alerts for each executive session initiation." defaultChecked />
            <ToggleOption label="Force AES-256 Protocol" desc="Mandate high-grade encryption for all data streams." defaultChecked />
          </SettingsSection>

          <SettingsSection title="Asset Management" icon={<Database size={20} />}>
            <div className="flex items-center justify-between py-6">
               <div>
                  <h4 className="text-[15px] font-bold text-slate-800 leading-none mb-2">Automated Data Expiry</h4>
                  <p className="text-[13px] text-slate-400 font-light">Sets the duration before assets are purged from the cache.</p>
               </div>
               <select className="bg-white border border-[#F1F1F1] rounded-xl px-4 py-2 text-[12px] font-bold text-slate-600 outline-none focus:border-[#C5A059] transition-all cursor-pointer">
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>Permanent</option>
               </select>
            </div>
          </SettingsSection>
          
          <div className="flex justify-end gap-6 pt-10 border-t border-[#F1F1F1]">
             <button className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Discard Alterations</button>
             <button className="btn-premium px-12 py-4 rounded-2xl text-xs shadow-xl shadow-gold/10">Synchronize Core</button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="luxury-card p-10 bg-slate-900 border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform">
                 <SettingsIcon size={100} />
              </div>
              <h4 className="text-sm font-bold text-[#E6D5B8] uppercase tracking-widest mb-10 border-b border-white/5 pb-4">Version Control</h4>
              <div className="space-y-8">
                 <VersionRow label="Dashboard Core" value="v4.2.0-Production" />
                 <VersionRow label="Neural Engine" value="v9.8.4-Executive" />
                 <VersionRow label="Security Patch" value="2026.04.09" />
              </div>
              <div className="mt-10 pt-10 border-t border-white/5">
                 <button className="w-full py-4 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white hover:border-[#C5A059] hover:text-[#C5A059] transition-all">
                    Check for Updates
                 </button>
              </div>
           </div>

           <div className="p-10 luxury-card bg-[#FDFCFB] border-[#F1F1F1] flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-slate-50 flex items-center justify-center text-slate-100 mb-6">
                 <Smartphone size={32} />
              </div>
              <h5 className="text-xl font-serif text-slate-900 font-bold mb-4">Mobile Hub</h5>
              <p className="text-[13px] text-slate-400 font-light leading-relaxed mb-8">Synchronize your parameters with the LuxeAnalyst mobile application.</p>
              <button className="text-[#C5A059] font-bold text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2">
                 Generate Access Code <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const SettingsSection = ({ title, icon, children }) => (
  <div className="luxury-card p-8 md:p-10 bg-white border-[#F1F1F1]">
    <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
      <div className="w-10 h-10 rounded-2xl bg-[#FDFCFB] border border-slate-50 flex items-center justify-center text-[#C5A059]">
        {icon}
      </div>
      <h3 className="text-lg font-serif text-slate-900 font-bold tracking-tight">{title}</h3>
    </div>
    <div className="space-y-2 divide-y divide-slate-50">
      {children}
    </div>
  </div>
);

const ToggleOption = ({ label, desc, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-6">
      <div className="pr-10">
        <h4 className="text-[14px] font-bold text-slate-800 leading-none mb-2">{label}</h4>
        <p className="text-[12px] text-slate-400 font-light leading-relaxed">{desc}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-14 h-7 rounded-full relative transition-all duration-300 ${checked ? 'bg-[#C5A059]' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${checked ? 'left-8' : 'left-1'}`} />
      </button>
    </div>
  );
};

const VersionRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-[10px] font-bold tracking-tight">
    <span className="text-slate-500 uppercase tracking-widest">{label}</span>
    <span className="text-[#E6D5B8] font-mono group-hover:text-white transition-all">{value}</span>
  </div>
);

export default Settings;
