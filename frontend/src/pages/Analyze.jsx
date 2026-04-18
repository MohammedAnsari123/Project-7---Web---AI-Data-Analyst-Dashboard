import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import {
  Send,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  MessageSquare,
  Download,
  Binary,
  Activity,
  Sparkles,
  ChevronRight,
  Database,
  Info,
  ChevronLeft,
  X,
  Maximize2,
  Trash2,
  RefreshCcw,
  LayoutDashboard
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area, ScatterChart, Scatter, ZAxis
} from 'recharts';

const Analyze = () => {
  const { datasetId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [dataset, setDataset] = useState(null);
  const [autoInsights, setAutoInsights] = useState([]);
  const [queriedVisuals, setQueriedVisuals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInsightsLoading, setIsInsightsLoading] = useState(true);
  const [showStage, setShowStage] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchDataset();
    fetchAutoInsights();
    setMessages([{
      role: 'assistant',
      content: 'Welcome to your private analysis suite. I have synchronized with your data assets and am ready to resolve any inquiries you may have regarding this intelligence unit.',
      type: 'text'
    }]);
  }, [datasetId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchDataset = async () => {
    try {
      const res = await api.get(`/datasets/${datasetId}`);
      setDataset(res.data);
    } catch (err) {
      console.error('Data acquisition failed:', err);
    }
  };

  const fetchAutoInsights = async () => {
    try {
      setIsInsightsLoading(true);
      const res = await api.get(`/data/${datasetId}/auto-insights`);
      setAutoInsights(res.data);
    } catch (err) {
      console.error('Auto insights failed:', err);
    } finally {
      setIsInsightsLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userQuery, type: 'text' }]);
    setIsLoading(true);

    try {
      const res = await api.post(`/data/${datasetId}/query`, { queryText: userQuery });
      const { results, query, structuredQuery } = res.data;

      const newVisual = {
        title: query,
        vizType: structuredQuery.visualization || (structuredQuery.operation === 'count' ? 'pie' : 'bar'),
        data: results,
        timestamp: new Date().toLocaleTimeString()
      };

      setQueriedVisuals(prev => [newVisual, ...prev]);
      setShowStage(true);

      const assistantMsg = {
        role: 'assistant',
        content: `Neural pattern for "${query}" synchronized. Visualization deployed to the Intelligence Stage.`,
        type: 'text'
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Synchronization error. Critical failure in pattern extraction.',
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const luxuryColors = ['#C5A059', '#1A1C20', '#64748B', '#E6D5B8', '#8E6E34'];

  const renderChart = (vizType, data) => (
    <ResponsiveContainer width="100%" height="100%">
      {vizType === 'bar' ? (
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
          <XAxis dataKey="_id" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f1f1', borderRadius: '12px', fontSize: '10px' }} />
          <Bar dataKey="value" fill="#C5A059" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      ) : vizType === 'line' ? (
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
          <XAxis dataKey="_id" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f1f1', borderRadius: '12px', fontSize: '10px' }} />
          <Line type="monotone" dataKey="value" stroke="#C5A059" strokeWidth={3} dot={{ fill: '#C5A059', r: 4 }} />
        </LineChart>
      ) : vizType === 'area' ? (
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C5A059" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#C5A059" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
          <XAxis dataKey="_id" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f1f1', borderRadius: '12px', fontSize: '10px' }} />
          <Area type="monotone" dataKey="value" stroke="#C5A059" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
        </AreaChart>
      ) : vizType === 'scatter' ? (
        <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
          <XAxis type="category" dataKey="_id" name="Category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis type="number" dataKey="value" name="Value" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f1f1', borderRadius: '12px', fontSize: '10px' }} />
          <Scatter name="Intelligence" data={data} fill="#C5A059" />
        </ScatterChart>
      ) : (
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="_id" cx="50%" cy="50%" outerRadius={70} innerRadius={45} stroke="#fff" strokeWidth={2}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={luxuryColors[index % luxuryColors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f1f1', borderRadius: '12px', fontSize: '10px' }} />
        </PieChart>
      )}
    </ResponsiveContainer>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in relative space-y-6">

      {/* 1. Intelligence Stage - LITERALLY OUTSIDE THE CHIP DIV */}
      <AnimatePresence>
        {showStage && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            className="w-full flex flex-col gap-4 z-10"
          >
            <div className="luxury-card bg-[#FDFCFB]/80 backdrop-blur-md border-[#E6D5B8]/30 p-6">
              <div className="flex items-center justify-between mb-6 border-b border-[#E6D5B8]/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center text-white shadow-md">
                    <LayoutDashboard size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-[0.3em]">Neural Intelligence Stage</h4>
                    <p className="text-[8px] text-[#C5A059] font-bold uppercase tracking-widest mt-1">Real-time Visual Synchronization</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {queriedVisuals.length > 0 && (
                    <button onClick={() => setQueriedVisuals([])} className="text-slate-300 hover:text-red-400 transition-colors uppercase text-[9px] font-bold tracking-widest flex items-center gap-2">
                      <Trash2 size={12} /> Clear Session
                    </button>
                  )}
                  <button onClick={() => setShowStage(false)} className="text-slate-300 hover:text-slate-900 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Automatic Insights */}
                {autoInsights.map((insight, idx) => (
                  <motion.div
                    key={`auto-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm h-[280px] flex flex-col"
                  >
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 truncate">{insight.title}</span>
                    <div className="flex-1 min-h-0">
                      {renderChart(insight.vizType, insight.data)}
                    </div>
                  </motion.div>
                ))}

                {/* Queried Insights (Live Results) */}
                {queriedVisuals.map((visual, idx) => (
                  <motion.div
                    key={`query-${idx}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-4 rounded-xl border-2 border-[#C5A059]/20 shadow-lg h-[280px] flex flex-col relative"
                  >
                    <div className="flex items-center justify-between mb-3 truncate">
                      <span className="text-[9px] font-bold text-slate-900 uppercase tracking-widest">{visual.title}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    </div>
                    <div className="flex-1 min-h-0">
                      {renderChart(visual.vizType, visual.data)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-grow grid grid-cols-12 gap-8 overflow-hidden">
        {/* Main Conversation Area */}
        <div className="col-span-12 lg:col-span-9 flex flex-col luxury-card bg-white relative p-0 overflow-hidden border-[#F1F1F1]">
          {/* Internal Header */}
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-[#FDFCFB]/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl gold-gradient flex items-center justify-center text-white shadow-lg">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-serif text-slate-900 font-bold leading-none">Neural Hub</h3>
                <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest mt-1">Authorized Node Session</p>
              </div>
            </div>
            {!showStage && (
              <button
                onClick={() => setShowStage(true)}
                className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all shadow-sm"
              >
                Deploy Stage
              </button>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-grow overflow-y-auto px-6 md:px-10 py-10 space-y-8 custom-scrollbar">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'w-full text-left'}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2 ml-1">
                      <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.2em]">Excellence Core</span>
                    </div>
                  )}

                  <div className={`
                    inline-block px-6 py-4 rounded-[20px] text-[14px] leading-relaxed shadow-sm transition-all
                    ${msg.role === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none border border-slate-800'
                      : 'bg-[#FDFCFB] text-slate-700 border border-[#F1F1F1] rounded-tl-none font-light'}
                  `}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3 text-[#C5A059] px-4">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-[#C5A059] animate-bounce" />
                  <div className="w-1 h-1 rounded-full bg-[#C5A059] animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1 h-1 rounded-full bg-[#C5A059] animate-bounce [animation-delay:-0.3s]" />
                </div>
                <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Processing Logic...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-[#F1F1F1]">
            <form onSubmit={handleSend} className="relative flex items-center gap-4">
              <div className="flex-grow relative group">
                <input
                  type="text"
                  placeholder="Query your data assets..."
                  className="w-full bg-[#FDFCFB] border border-[#F1F1F1] rounded-2xl py-5 px-8 outline-none focus:border-[#C5A059] focus:bg-white transition-all text-slate-700 placeholder:text-slate-300 font-light text-sm shadow-inner"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors">
                  <Activity size={18} />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-premium w-16 h-16 rounded-2xl flex items-center justify-center p-0 shadow-xl"
              >
                <Send size={22} className={isLoading ? 'animate-pulse' : ''} />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: Schema */}
        <div className="hidden lg:flex col-span-3 flex-col gap-6 overflow-hidden">
          <div className="luxury-card p-8 bg-white h-full flex flex-col border-[#F1F1F1]">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-5">
              <Database size={18} className="text-[#C5A059]" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest leading-none">Intelligence Buffer</h3>
            </div>
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-3">
              {dataset?.columns.map(col => (
                <div key={col} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#FDFCFB] border border-transparent hover:border-[#F1F1F1] transition-all group">
                  <span className="text-[11px] text-slate-500 font-medium group-hover:text-slate-900 transition-colors uppercase tracking-tight">{col}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-[#C5A059] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
