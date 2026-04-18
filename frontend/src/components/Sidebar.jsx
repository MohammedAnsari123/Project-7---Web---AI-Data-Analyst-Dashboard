import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Database, 
  FileText, 
  PieChart, 
  Settings,
  X,
  Sparkles,
  Command
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Intelligence Hub', icon: PieChart, path: '/datasets' },
    { name: 'Injection Vector', icon: Upload, path: '/upload' },
    { name: 'Report Archives', icon: FileText, path: '/reports' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-500"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-[#F1F1F1] z-50
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        w-[280px] ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex flex-col h-full relative overflow-hidden">
          {/* Subtle Texture */}
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#C5A059]/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-16 relative z-10">
            <div className="flex flex-col">
              <span className="text-2xl font-serif gold-text-gradient font-bold tracking-tight">
                LuxeAnalyst
              </span>
              <span className="text-[9px] text-slate-400 uppercase tracking-[0.3em] font-bold mt-1.5 leading-none">
                Intelligence Core
              </span>
            </div>
            <button className="lg:hidden text-slate-300 hover:text-[#C5A059] transition-colors" onClick={toggleSidebar}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-2 relative z-10">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-[#FDFCFB] text-[#C5A059] shadow-sm border border-[#E6D5B8]/30' 
                    : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                <div className={`
                  w-7 h-7 rounded-xl flex items-center justify-center transition-all
                  ${({ isActive }) => isActive ? 'bg-white shadow-sm' : 'bg-transparent'}
                `}>
                  <item.icon size={17} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
                </div>
                <span className={`text-[12px] uppercase tracking-widest font-bold`}>
                  {item.name}
                </span>
                {item.path === '/datasets' && (item.name === 'Analyze Data') && (
                   <span className="ml-auto flex h-1.5 w-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-6 border-t border-slate-50 relative z-10">
            <NavLink
              to="/settings"
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-2xl transition-all
                ${isActive ? 'bg-[#FDFCFB] text-[#C5A059]' : 'text-slate-400 hover:text-slate-900'}
              `}
            >
              <Settings size={17} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Parameters</span>
            </NavLink>
            
            <div className="mt-6 p-5 rounded-[24px] bg-slate-900 text-white relative overflow-hidden group">
               <div className="absolute -right-2 -bottom-2 text-white/5 group-hover:scale-110 transition-all">
                  <Sparkles size={48} />
               </div>
               <p className="text-[9px] text-[#E6D5B8] uppercase tracking-widest font-bold mb-2">AI Cluster</p>
               <h5 className="text-[11px] font-serif font-bold italic group-hover:text-[#C5A059] transition-colors">v4.2 Executive Nova</h5>
               <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 gold-gradient rounded-full" />
               </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
