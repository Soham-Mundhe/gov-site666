import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Filter, AlertCircle, CheckCircle, Info, RefreshCw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HOSPITALS, DISTRICT_TRENDS } from '../mockData';

interface HospitalDetailPageProps {
  hospitalId: string;
  onBack: () => void;
}

const HospitalDetailPage: React.FC<HospitalDetailPageProps> = ({ hospitalId, onBack }) => {
  const [diseaseFilter, setDiseaseFilter] = useState('dengue');
  const [timeframe, setTimeframe] = useState('7');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const hospital = HOSPITALS.find(h => h.id === hospitalId) || HOSPITALS[0];
  
  const COLORS = ['#6366f1', '#f8fafc'];
  
  const bedData = [
    { name: 'Occupied', value: hospital.occupiedBeds },
    { name: 'Available', value: hospital.totalBeds - hospital.occupiedBeds },
  ];

  const icuData = [
    { name: 'Occupied', value: hospital.icuOccupied },
    { name: 'Available', value: hospital.icuTotal - hospital.icuOccupied },
  ];

  // Dynamic Chart Data based on selectors
  const chartData = useMemo(() => {
    // In a real app, this would be a fresh API call. 
    // Here we simulate timeframe by slicing or repeating data if needed.
    if (timeframe === '7') return DISTRICT_TRENDS.slice(-7);
    
    // Simulate 30 days of data by repeating and jittering the mock data
    const fullData = [...DISTRICT_TRENDS];
    for(let i=1; i<4; i++) {
        DISTRICT_TRENDS.forEach(d => {
            fullData.push({
                ...d,
                date: `${d.date} ${i}`,
                [diseaseFilter]: Math.max(0, (d[diseaseFilter as keyof typeof d] as number) + (Math.random() * 10 - 5))
            });
        });
    }
    return fullData.slice(0, 30);
  }, [diseaseFilter, timeframe]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all hover:scale-105 shadow-sm">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">{hospital.name}</h2>
          <div className="flex items-center mt-1 space-x-3 text-sm">
             <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">District ID: {hospital.id.toUpperCase()}</span>
             <span className="text-slate-300">|</span>
             <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">Last Link established: {hospital.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Control Bar (Highlighted in screenshot) */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-[2.5rem] border border-slate-200 gap-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-8">
           <div className="flex items-center space-x-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Filter size={16} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyze Vector:</span>
              <select 
                value={diseaseFilter}
                onChange={(e) => setDiseaseFilter(e.target.value)}
                className="text-xs border-none bg-slate-50 rounded-xl px-4 py-2 outline-none font-black text-indigo-600 uppercase tracking-widest cursor-pointer hover:bg-indigo-50 transition-colors"
              >
                <option value="fever">Fever/ILI</option>
                <option value="dengue">Dengue</option>
                <option value="diarrhea">Diarrhea</option>
                <option value="malaria">Malaria</option>
              </select>
           </div>
           <div className="flex items-center space-x-4 border-l border-slate-100 pl-8">
              <div className="p-2 bg-slate-50 text-slate-500 rounded-xl">
                <Calendar size={16} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temporal Window:</span>
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="text-xs border-none bg-slate-50 rounded-xl px-4 py-2 outline-none font-black text-slate-900 uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
              </select>
           </div>
        </div>
        <div className="flex items-center space-x-6">
           <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Next cycle in 4m 20s</span>
           <button 
            onClick={handleRefresh}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all flex items-center space-x-3 shadow-lg shadow-slate-200"
           >
             <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
             <span>{isRefreshing ? 'Syncing...' : 'Establish Link'}</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Trend Analysis */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between mb-12">
             <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 uppercase italic">Vector Flow Analysis</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{diseaseFilter} incident tracking</p>
             </div>
             <div className="flex items-center space-x-3 text-rose-600 text-[10px] font-black uppercase tracking-widest bg-rose-50 px-5 py-2.5 rounded-2xl border border-rose-100">
                <AlertCircle size={14} />
                <span>Critical Deviation Detected</span>
             </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                    <linearGradient id="colorIncidence" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: '1px solid #f1f5f9', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey={diseaseFilter} stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorIncidence)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Telemetry */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 space-y-12">
          <div className="space-y-8">
            <h3 className="text-sm font-black text-slate-900 text-center uppercase tracking-[0.4em] italic">Inpatient Flux</h3>
            <div className="h-40 relative flex items-center justify-center">
               <div className="w-32 h-32 rounded-full border-[12px] border-slate-50 relative">
                  <div 
                    className="absolute inset-[-12px] rounded-full border-[12px] border-indigo-600" 
                    style={{ clipPath: `inset(0 0 0 0 round 50%)`, mask: `conic-gradient(#000 ${hospital.occupiedBeds/hospital.totalBeds*100}%, transparent 0)`}}
                  ></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900">{Math.round((hospital.occupiedBeds / hospital.totalBeds) * 100)}%</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Load</span>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                  <p className="text-xl font-black text-slate-900 italic">{hospital.totalBeds}</p>
               </div>
               <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 text-center">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Available</p>
                  <p className="text-xl font-black text-indigo-600 italic">{hospital.totalBeds - hospital.occupiedBeds}</p>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-black text-slate-900 text-center uppercase tracking-[0.4em] italic">Critical Nodes (ICU)</h3>
            <div className="h-40 relative flex items-center justify-center">
               <div className="w-32 h-32 rounded-full border-[12px] border-slate-50 relative">
                  <div 
                    className="absolute inset-[-12px] rounded-full border-[12px] border-rose-500" 
                    style={{ clipPath: `inset(0 0 0 0 round 50%)`, mask: `conic-gradient(#000 ${hospital.icuOccupied/hospital.icuTotal*100}%, transparent 0)`}}
                  ></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-rose-600">{Math.round((hospital.icuOccupied / hospital.icuTotal) * 100)}%</span>
                    <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Critical</span>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total ICU</p>
                  <p className="text-xl font-black text-slate-900 italic">{hospital.icuTotal}</p>
               </div>
               <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100 text-center">
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-1">Available</p>
                  <p className="text-xl font-black text-rose-600 italic">{hospital.icuTotal - hospital.icuOccupied}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Intelligence Summary */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
        <h3 className="text-lg font-black text-slate-900 mb-10 uppercase italic">Command Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="flex space-x-6 group">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                 <AlertCircle size={28} />
              </div>
              <div>
                 <h4 className="font-black text-slate-900 uppercase text-xs mb-3">Capacity Strain Alert</h4>
                 <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider italic">Node is operating at 92% occupancy. Patient discharge rate is currently sub-optimal relative to incoming vectors.</p>
              </div>
           </div>
           <div className="flex space-x-6 group">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                 <CheckCircle size={28} />
              </div>
              <div>
                 <h4 className="font-black text-slate-900 uppercase text-xs mb-3">Resource Integrity</h4>
                 <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider italic">Strategic stockpile and oxygen reserves confirmed for 14-day operational window. No supply intervention required.</p>
              </div>
           </div>
           <div className="flex space-x-6 group">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                 <Info size={28} />
              </div>
              <div>
                 <h4 className="font-black text-slate-900 uppercase text-xs mb-3">Registry Protocol</h4>
                 <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider italic">Reporting cadence is synchronized with district master. All telemetry headers are valid and verified.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailPage;