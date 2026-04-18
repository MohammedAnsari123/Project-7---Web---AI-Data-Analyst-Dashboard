import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  ChevronRight
} from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-[#E6D5B8]/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between border-b border-slate-50 bg-white/80 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-xl font-serif gold-text-gradient font-bold tracking-tight">LuxeAnalyst</span>
          <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold leading-none mt-1">Premium Intelligence</span>
        </div>
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/login" className="text-[13px] font-bold text-slate-400 hover:text-[#C5A059] uppercase tracking-widest transition-colors">Sign In</Link>
          <Link to="/signup" className="btn-premium py-2.5 px-6 rounded-full text-[11px] h-auto min-h-0">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 md:pt-56 pb-24 px-6 md:px-12 overflow-hidden flex flex-col items-center">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 -z-10 w-[60vw] h-[60vw] bg-gradient-to-bl from-[#FDFCFB] to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 -z-10 w-[40vw] h-[40vw] bg-gradient-to-tr from-[#C5A059]/5 to-transparent rounded-full blur-3xl opacity-30" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#E6D5B8] bg-[#FDFCFB] mb-12 shadow-sm"
          >
            <Sparkles size={14} className="text-[#C5A059]" />
            <span className="text-[10px] font-extrabold text-[#C5A059] uppercase tracking-[0.25em]">v4.2 Analysis Engine &bull; Enterprise Ready</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-slate-900 leading-[0.95] md:leading-[0.85] mb-12 tracking-tight"
          >
            Elegance in <br />
            <span className="gold-text-gradient italic">Intelligence.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-16 leading-relaxed font-light px-4"
          >
            Transform raw data into sophisticated narratives. Our AI-driven analyst core 
            delivers premium insights with high-fidelity visualizations, tailored for the most discerning eyes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/signup" className="btn-premium px-12 py-5 rounded-full text-sm group flex items-center gap-3 shadow-2xl shadow-gold/20">
              Begin Exploration <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="px-10 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-[#C5A059] transition-all flex items-center gap-2 border border-slate-50 hover:border-[#F1F1F1] rounded-full bg-white">
              Executive Dashboard <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6 md:px-12 bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<BarChart3 />}
              title="Predictive Clarity"
              desc="Our neural sync models identify patterns before they become trends, providing a clear vision of your future data landscape."
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Sovereign Security"
              desc="Enterprise-grade encryption with a minimalist footprint. Your data remains your own, protected by our luxury security architecture."
            />
            <FeatureCard 
              icon={<Layers />}
              title="Seamless Integration"
              desc="Deploy with absolute ease. Our API-first approach ensures that sophisticated analysis is always just a few lines away."
            />
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="py-24 px-6 md:px-12 border-t border-slate-50 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-12">
            <span className="text-2xl font-serif gold-text-gradient font-bold tracking-tight">LuxeAnalyst</span>
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase mt-5">Redefining the standard of data intelligence</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-[#C5A059] transition-colors">Platform</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Intelligence</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Documentation</a>
          </div>
          <div className="w-12 h-px bg-[#E6D5B8] mb-10 opacity-50" />
          <p className="text-slate-300 text-[10px] tracking-tight uppercase">&copy; {new Date().getFullYear()} LuxeAnalyst &mdash; Crafted for Excellence</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group luxury-card transition-all duration-700 hover:-translate-y-3 bg-white border-slate-50">
    <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-white mb-10 shadow-xl group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-3xl font-serif text-slate-900 font-bold mb-5 tracking-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-light text-[15px]">
      {desc}
    </p>
    <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-2 text-[#C5A059] font-bold text-[11px] tracking-widest uppercase opacity-20 group-hover:opacity-100 transition-all">
      Learn More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

export default Landing;
