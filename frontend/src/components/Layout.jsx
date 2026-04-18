import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Use the .main-content class from index.css for stability */}
      <div className="main-content flex flex-col">
        <Header toggleSidebar={toggleSidebar} title={title} />
        
        <main className="flex-grow p-4 md:p-8">
          <div className="max-w-[1400px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>

        <footer className="px-8 py-10 border-t border-[#F1F1F1] text-center">
          <p className="text-slate-400 text-[10px] tracking-[0.3em] font-bold uppercase transition-colors hover:text-[#C5A059]">
            &copy; {new Date().getFullYear()} LuxeAnalyst &mdash; Premium Data Intelligence
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
