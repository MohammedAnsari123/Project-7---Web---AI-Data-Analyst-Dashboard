import React from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  Sparkles,
  Command
} from 'lucide-react';

const Header = ({ toggleSidebar, title }) => {
  return (
    <header className="h-24 px-6 md:px-10 flex items-center justify-between border-b border-[#F1F1F1] bg-white sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-3 rounded-xl hover:bg-[#FDFCFB] transition-colors border border-transparent hover:border-slate-50 text-slate-400 hover:text-[#C5A059]"
        >
          <Menu size={22} />
        </button>
        
        <div className="flex flex-col">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 gold-gradient rounded-full" />
              <h1 className="text-xl md:text-2xl font-serif text-slate-900 font-bold leading-none tracking-tight">
                {title || 'Executive Dashboard'}
              </h1>
           </div>
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 ml-4">
              Authorized Session &bull; v4.2
           </p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-10">
        {/* Functional Search */}
        <div className="hidden md:flex items-center gap-4 px-6 py-2.5 bg-[#FDFCFB] border border-[#F1F1F1] rounded-2xl w-80 group focus-within:border-[#C5A059] focus-within:bg-white transition-all shadow-sm shadow-inner-sm">
          <Search size={16} className="text-slate-300 group-focus-within:text-[#C5A059]" />
          <input 
            type="text" 
            placeholder="Intelligence Search..." 
            className="bg-transparent border-none outline-none text-[12px] w-full font-medium placeholder:text-slate-200 text-slate-600"
          />
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-slate-50 text-[9px] font-bold text-slate-300 uppercase">
             <Command size={10} /> K
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-3 rounded-2xl hover:bg-[#FDFCFB] transition-colors text-slate-400 hover:text-[#C5A059] border border-transparent hover:border-slate-50">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#C5A059] rounded-full ring-4 ring-white" />
          </button>
          
          <div className="h-8 w-px bg-slate-100 mx-2 hidden md:block" />

          <button className="flex items-center gap-4 p-1.5 md:pl-2 md:pr-4 rounded-2xl hover:bg-[#FDFCFB] transition-all group border border-transparent hover:border-slate-50">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gold-gradient p-0.5 shadow-md">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-[#C5A059]">
                <User size={20} />
              </div>
            </div>
            <div className="hidden md:flex flex-col items-start mr-2">
              <span className="text-[13px] font-bold text-slate-900 leading-none group-hover:text-[#C5A059] transition-colors">Executive_01</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Verified Node</span>
            </div>
            <ChevronDown size={14} className="text-slate-300 group-hover:text-[#C5A059] transition-all" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
