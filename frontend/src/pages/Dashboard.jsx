import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { 
  Database, 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDatasets: 0,
    totalRows: 0,
    avgColumns: 0,
    recentReports: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/datasets');
      const datasets = res.data;
      const totalRows = datasets.reduce((acc, d) => acc + d.rowCount, 0);
      const avgCols = datasets.length ? (datasets.reduce((acc, d) => acc + d.columns.length, 0) / datasets.length).toFixed(1) : 0;
      
      setStats({
        totalDatasets: datasets.length,
        totalRows,
        avgColumns: avgCols,
        recentDatasets: datasets.slice(0, 3)
      });
    } catch (err) {
      console.error('Data sync failed:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#E6D5B8] border-t-[#C5A059] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Executive Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#F1F1F1] pb-10 gap-6">
        <div>
          <p className="text-[#C5A059] text-[11px] font-bold uppercase tracking-[0.3em] mb-3">Executive Summary</p>
          <h1 className="text-5xl font-serif text-slate-900 font-bold tracking-tight">Intelligence Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/upload" className="btn-premium px-8 py-3.5 rounded-2xl flex items-center gap-2 group text-sm">
            <Plus size={18} /> New Integration
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          icon={<Database className="text-[#C5A059]" />} 
          label="Total Assets" 
          value={stats.totalDatasets} 
          trend="+12%"
        />
        <StatCard 
          icon={<TrendingUp className="text-emerald-500" />} 
          label="Data Volume" 
          value={stats.totalRows.toLocaleString()} 
          trend="Secure"
        />
        <StatCard 
          icon={<TrendingUp className="text-[#C5A059]" />} 
          label="Analysis Latency" 
          value="1.2ms" 
          trend="Optimal"
        />
        <StatCard 
          icon={<Sparkles className="text-amber-400" />} 
          label="AI Sync" 
          value="v4.2" 
          trend="Active"
        />
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* Recent Activity Wall */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif text-slate-900 font-bold">Recent Intelligence Nodes</h3>
            <Link to="/datasets" className="text-[12px] font-bold text-[#C5A059] uppercase tracking-widest hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {stats.recentDatasets.map((ds) => (
              <Link key={ds._id} to={`/analyze/${ds._id}`} className="group block">
                <div className="luxury-card p-6 flex flex-col sm:flex-row items-center justify-between hover:bg-[#FDFCFB] transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl gold-gradient flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif text-slate-900 font-bold group-hover:text-[#C5A059] transition-colors">{ds.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                        Node ID: {ds._id.slice(-8).toUpperCase()} &bull; {ds.rowCount.toLocaleString()} Rows
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 sm:mt-0">
                    <div className="hidden sm:block text-right">
                       <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-none mb-1">Last Sync</p>
                       <p className="text-xs text-slate-500 font-medium">{new Date(ds.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System Analytics Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <h3 className="text-xl font-serif text-slate-900 font-bold">Neural Core Telemetry</h3>
          <div className="luxury-card p-8 bg-slate-900 border-none relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-6 text-white/5 group-hover:scale-110 transition-transform">
               <Sparkles size={120} />
            </div>
            
            <div className="space-y-8 relative z-10">
              <TelemetryRow label="Encryption Layer" value="AES-GLOBAL" />
              <TelemetryRow label="Compute Cluster" value="Cluster_01" />
              <TelemetryRow label="Buffer Consistency" value="99.9%" />
              
              <div className="pt-6 mt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  <span>Resource Saturation</span>
                  <span className="text-[#C5A059]">Optimized</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    className="h-full gold-gradient rounded-full shadow-[0_0_10px_rgba(197,160,89,0.3)]"
                  />
                </div>
              </div>

              <Link to="/upload" className="block w-full text-center py-4 rounded-xl border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:border-[#C5A059] hover:text-[#C5A059] transition-all">
                 System Diagnostics
              </Link>
            </div>
          </div>

          <div className="p-8 border-2 border-dashed border-[#F1F1F1] rounded-[32px] text-center">
            <Clock size={32} className="mx-auto text-slate-100 mb-4" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Next Automated Sync in 12:45</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }) => (
  <div className="luxury-card group transition-all duration-500">
    <div className="flex items-start justify-between mb-8">
      <div className="w-12 h-12 rounded-2xl bg-[#FDFCFB] border border-slate-50 flex items-center justify-center transition-transform group-hover:scale-110">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{trend}</span>
    </div>
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] leading-none mb-1">{label}</p>
      <h2 className="text-4xl font-serif text-slate-900 font-bold leading-tight group-hover:text-[#C5A059] transition-colors">{value}</h2>
    </div>
  </div>
);

const TelemetryRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-[11px] font-medium tracking-tight">
    <span className="text-slate-500 uppercase tracking-widest font-bold">{label}</span>
    <span className="text-[#E6D5B8] font-mono group-hover:text-white transition-colors">{value}</span>
  </div>
);

export default Dashboard;
