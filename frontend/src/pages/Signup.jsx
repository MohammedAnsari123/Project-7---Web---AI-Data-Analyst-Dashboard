import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Key, 
  Mail, 
  ChevronRight, 
  ShieldCheck, 
  User, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post('https://project-7-web-ai-data-analyst-dashboard-rwm8.onrender.com/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Provisioning failed. Please verify your data strings.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-[#E6D5B8]/30 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -z-10 w-[50vw] h-[50vw] bg-[#FDFCFB] rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 -z-10 w-[30vw] h-[30vw] bg-[#C5A059]/5 rounded-full blur-3xl opacity-30" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px]"
      >
        <div className="luxury-card p-10 md:p-14 bg-white relative overflow-hidden text-center border-[#F1F1F1]">
          {/* Top Gold Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 gold-gradient" />
          
          <div className="mb-12">
            <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-white shadow-xl mx-auto mb-8 transform rotate-6 hover:rotate-0 transition-transform duration-500">
              <Sparkles size={32} />
            </div>
            <h1 className="text-4xl font-serif text-slate-900 font-bold mb-3 tracking-tight">Access Provisioning</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Establish New Executive Credential</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Full Identity Designation"
                  required
                  className="w-full bg-[#FDFCFB] border border-[#F1F1F1] rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-[#C5A059] focus:bg-white transition-all text-sm text-slate-700 placeholder:text-slate-300 shadow-inner"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Official Email Key"
                  required
                  className="w-full bg-[#FDFCFB] border border-[#F1F1F1] rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-[#C5A059] focus:bg-white transition-all text-sm text-slate-700 placeholder:text-slate-300 shadow-inner"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
                  <Key size={18} />
                </div>
                <input
                  type="password"
                  placeholder="Secure Access Credential"
                  required
                  className="w-full bg-[#FDFCFB] border border-[#F1F1F1] rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-[#C5A059] focus:bg-white transition-all text-sm text-slate-700 placeholder:text-slate-300 shadow-inner"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-[11px] font-bold uppercase tracking-widest bg-rose-50 py-3 px-4 rounded-xl border border-rose-100">
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-premium py-5 rounded-2xl flex items-center justify-center gap-4 text-sm font-bold shadow-xl shadow-gold/20 relative group mt-4"
            >
              <span className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}>Initialize Credential</span>
              {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              
              {isLoading && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 </div>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-50">
             <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <span>Already Inducted?</span>
                <Link to="/login" className="text-[#C5A059] hover:underline flex items-center gap-2">
                   Secure Login <ChevronRight size={14} />
                </Link>
             </div>
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
           &copy; {new Date().getFullYear()} LuxeAnalyst &bull; Crafted for Excellence
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
