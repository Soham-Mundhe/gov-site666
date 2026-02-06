
import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Activity, Hospital, AlertCircle, MapPin, Cpu, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SummaryCard from '../components/SummaryCard';
import { CITIES, ALERTS, HOSPITALS } from '../mockData';

interface CityDashboardProps {
  cityId: string;
  onBack: () => void;
}

const CityDashboard: React.FC<CityDashboardProps> = ({ cityId, onBack }) => {
  const city = CITIES.find(c => c.id === cityId) || CITIES[0];
  const cityAlerts = ALERTS.filter(a => a.location.includes(city.name));
  const cityHospitals = HOSPITALS.filter(h => h.cityId === cityId);

  const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#64748b'];
  const diseaseBreakdown = [
    { name: 'Fever/ILI', value: Math.floor(city.totalCases * 0.45) },
    { name: 'Dengue', value: Math.floor(city.totalCases * 0.25) },
    { name: 'Diarrhea', value: Math.floor(city.totalCases * 0.15) },
    { name: 'Malaria', value: Math.floor(city.totalCases * 0.1) },
    { name: 'Other', value: Math.floor(city.totalCases * 0.05) },
  ];

  const trendData = [
    { day: 'Mon', cases: city.totalCases - 50 },
    { day: 'Tue', cases: city.totalCases - 30 },
    { day: 'Wed', cases: city.totalCases - 45 },
    { day: 'Thu', cases: city.totalCases - 10 },
    { day: 'Fri', cases: city.totalCases + 15 },
    { day: 'Sat', cases: city.totalCases + 25 },
    { day: 'Sun', cases: city.totalCases },
  ];

  const TrendIcon = city.trend === 'increasing' ? TrendingUp : city.trend === 'decreasing' ? TrendingDown : Minus;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
        <div className="flex items-center space-x-6">
          <button
            onClick={onBack}
            className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{city.name}</h2>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${city.trend === 'decreasing'
                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                : 'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                {city.trend === 'decreasing' ? 'Improving' : 'Action Required'}
              </span>
            </div>
            <p className="text-slate-500 font-bold tracking-wide text-sm mt-1">Real-time epidemiological sector analysis</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Cases Today"
          value={city.totalCases}
          icon={Activity}
          color="indigo"
        />
        <SummaryCard
          title="Overall Trend"
          value={city.trend.toUpperCase()}
          icon={TrendIcon}
          color={city.trend === 'increasing' ? 'red' : 'green'}
        />
        <SummaryCard
          title="Highest Disease"
          value={city.highestDisease}
          subtitle="Requires immediate focus"
          icon={AlertCircle}
          color="orange"
        />
        <SummaryCard
          title="Reporting Units"
          value={city.hospitalsReporting}
          subtitle="Hospitals & Clinics"
          icon={Hospital}
          color="indigo"
        />
      </div>

      {/* Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-24 bg-indigo-50 rounded-full blur-[80px] opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Incidence Trend (Daily)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <defs>
                    <linearGradient id="lineColors" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '4 4' }}
                  />
                  <Line type="monotone" dataKey="cases" stroke="url(#lineColors)" strokeWidth={4} dot={{ r: 4, fill: '#fff', strokeWidth: 3, stroke: '#6366f1' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 p-24 bg-emerald-50 rounded-full blur-[80px] opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Disease Breakdown</h3>
            <div className="h-72 flex flex-col md:flex-row items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {diseaseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="drop-shadow-sm" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  />
                  <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" wrapperStyle={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute top-1/2 left-1/2 md:left-[35%] transform -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total</p>
                <p className="text-3xl font-black text-slate-800">{city.totalCases}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* City Level Alerts */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Active Crisis Alerts</h3>
        {cityAlerts.length > 0 ? (
          <div className="space-y-4">
            {cityAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-6 bg-rose-50/50 rounded-[1.5rem] border border-rose-100 hover:shadow-lg transition-all group">
                <div className="flex items-center space-x-6">
                  <div className="p-4 bg-white text-rose-500 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    <AlertCircle size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-black text-rose-900 text-lg">{alert.type}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <p className="text-sm font-semibold text-rose-700/80">{alert.reason}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-1">
                    {alert.status}
                  </div>
                  <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{alert.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
            <ShieldCheck size={48} className="text-slate-300 mb-4" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No active alerts for this sector</p>
          </div>
        )}
      </div>

      {/* Hospital List Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Healthcare Infrastructure</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">Unit Status Report</p>
          </div>
          <div className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-indigo-100">
            {cityHospitals.length} Units Online
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Facility Name</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Occupancy</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Capacity</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">ICU Status</th>
                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cityHospitals.length > 0 ? cityHospitals.map((hospital) => {
                const occupancyPct = (hospital.occupiedBeds / hospital.totalBeds) * 100;
                return (
                  <tr key={hospital.id} className="hover:bg-indigo-50/30 transition-colors group cursor-pointer">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="font-bold text-slate-900 text-base group-hover:text-indigo-700 transition-colors">{hospital.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center mt-1.5 font-bold uppercase tracking-widest">
                        <MapPin size={10} className="mr-1.5" /> {city.name}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <span className="font-black text-slate-700">{Math.round(occupancyPct)}%</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full shadow-sm ${occupancyPct > 90 ? 'bg-rose-500' : occupancyPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${occupancyPct}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="text-slate-600 font-bold bg-slate-100 px-3 py-1 rounded-lg text-xs">{hospital.totalBeds} Beds</span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${hospital.icuOccupied / hospital.icuTotal > 0.9 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                        <Cpu size={12} className="mr-2" strokeWidth={3} />
                        {hospital.icuOccupied} / {hospital.icuTotal}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${hospital.reportingStatus === 'Submitted' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${hospital.reportingStatus === 'Submitted' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {hospital.reportingStatus}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center justify-center opacity-50">
                      <Hospital size={32} className="text-slate-400 mb-2" />
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No hospitals reporting in this sector.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CityDashboard;
