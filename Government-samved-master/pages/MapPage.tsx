
import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight, Layers, Globe, ArrowLeft, ZoomIn, ZoomOut, Maximize2, Activity, TrendingUp, AlertOctagon,
  Users
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { CITIES, DISTRICTS, DISTRICT_TRENDS } from '../mockData';

interface MapPageProps {
  onSelectCity: (id: string) => void;
}

type MapLevel = 'state' | 'district';

const MapPage: React.FC<MapPageProps> = ({ onSelectCity }) => {
  const [mapLevel, setMapLevel] = useState<MapLevel>('state');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // ViewBox State for robust Zoom/Pan
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Dynamic District Mesh Connections
  const DISTRICT_CONNECTIONS: Record<string, string[][]> = {
    'solapur': [
      ['karmala', 'madha'],
      ['madha', 'barshi'],
      ['madha', 'mohol'],
      ['mohol', 'barshi'],
      ['mohol', 'solapur-city'],
      ['malshiras', 'pandharpur'],
      ['malshiras', 'madha'],
      ['pandharpur', 'sangola'],
      ['pandharpur', 'solapur-city'],
      ['solapur-city', 'akkalkot'],
      ['karmala', 'malshiras'],
    ],
    'pune': [
      ['pune-city', 'lonavala'],
      ['pune-city', 'saswad'],
      ['pune-city', 'shirur'],
      ['shirur', 'daund'],
      ['daund', 'baramati'],
      ['baramati', 'indapur'],
      ['saswad', 'baramati'],
    ],
    'mumbai': [
      ['south-mumbai', 'dadar'],
      ['dadar', 'bandra'],
      ['dadar', 'ghatkopar'],
      ['bandra', 'andheri'],
      ['andheri', 'borivali'],
      ['ghatkopar', 'thane-city'],
      ['andheri', 'ghatkopar'], // Cross connection
    ],
    'nashik': [
      ['nashik-city', 'trimbak'],
      ['nashik-city', 'igatpuri'],
      ['nashik-city', 'sinnar'],
      ['nashik-city', 'niphad'],
      ['niphad', 'malegaon'],
      ['niphad', 'yeola'],
      ['sinnar', 'yeola'],
    ],
    'sangli': [
      ['sangli-city', 'miraj'],
      ['sangli-city', 'tasgaon'],
      ['sangli-city', 'islampur'],
      ['tasgaon', 'vita'],
      ['tasgaon', 'palus'],
      ['palus', 'islampur'],
    ]
  };

  const getCityPos = (id: string) => {
    const city = CITIES.find(c => c.id === id);
    return city?.coordinates || { x: 0, y: 0 };
  };

  const getDistrictPos = (id: string) => {
    const district = DISTRICTS.find(d => d.id === id);
    return district?.coordinates || { x: 0, y: 0 };
  };

  const getStatusColor = (risk: string) => {
    switch (risk) {
      case 'High': return '#f43f5e';
      case 'Moderate': return '#f59e0b';
      default: return '#10b981';
    }
  };

  // Dynamic Centering Logic
  const calculateOptimalViewBox = (level: MapLevel, districtId: string | null) => {
    let padding = 15; // default padding
    let items: { x: number, y: number }[] = [];

    if (level === 'state') {
      items = DISTRICTS.map(d => d.coordinates);
      padding = 10;
    } else if (level === 'district' && districtId) {
      items = CITIES.filter(c => c.districtId === districtId).map(c => c.coordinates);
      padding = 20; // more padding for district view
    }

    if (items.length === 0) return { x: 0, y: 0, width: 100, height: 100 };

    const minX = Math.min(...items.map(i => i.x));
    const maxX = Math.max(...items.map(i => i.x));
    const minY = Math.min(...items.map(i => i.y));
    const maxY = Math.max(...items.map(i => i.y));

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // Ensure aspect ratio isn't too skewed and we have minimum zoom
    // We want to fit into a roughly square or landscape aspect ratio
    const width = Math.max(contentWidth + (padding * 2), 40); // Minimum width 40
    const height = Math.max(contentHeight + (padding * 2), 40); // Minimum height 40

    // Center the content
    const centerX = minX + contentWidth / 2;
    const centerY = minY + contentHeight / 2;

    return {
      x: centerX - width / 2,
      y: centerY - height / 2,
      width: width,
      height: height
    };
  };

  const handleDistrictClick = (districtId: string) => {
    setSelectedDistrict(districtId);
    setMapLevel('district');
    setHoveredItem(null);
  };

  const handleBackToState = () => {
    setMapLevel('state');
    setSelectedDistrict(null);
    setHoveredItem(null);
  };

  // Zoom Logic - ViewBox based
  const handleZoom = (factor: number) => {
    setViewBox(prev => {
      const newWidth = prev.width * factor;
      const newHeight = prev.height * factor;

      // Limit zoom (Min width 10 = very zoomed in, Max width 200)
      if (newWidth < 10) return prev;
      if (newWidth > 300) return prev;

      // Keep center stable
      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;

      return {
        x: centerX - newWidth / 2,
        y: centerY - newHeight / 2,
        width: newWidth,
        height: newHeight
      };
    });
  };

  const handleZoomIn = () => handleZoom(0.8);
  const handleZoomOut = () => handleZoom(1.25);

  const handleResetZoom = () => {
    const optimalView = calculateOptimalViewBox(mapLevel, selectedDistrict);
    setViewBox(optimalView);
  };

  // Handle wheel for zoom (Native listener to prevent page scroll)
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.05 : 0.95;
      handleZoom(factor);
    };

    svgEl.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      svgEl.removeEventListener('wheel', handleWheelNative);
    };
  }, [viewBox.width]);


  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      e.preventDefault();
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setDragStart({ x: e.clientX, y: e.clientY });

      // Convert px to svg units
      if (svgRef.current) {
        const { clientWidth } = svgRef.current;
        // viewBox width / pixel width = units per pixel
        const scale = viewBox.width / clientWidth;
        const sensitivity = 1.0;

        setViewBox(prev => ({
          ...prev,
          x: prev.x - dx * scale * sensitivity,
          y: prev.y - dy * scale * sensitivity
        }));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Auto-Center when changing map levels or districts
  useEffect(() => {
    handleResetZoom();
  }, [mapLevel, selectedDistrict]);

  // Determine what to display based on map level
  const currentData = mapLevel === 'state'
    ? DISTRICTS.find(d => d.id === hoveredItem)
    : CITIES.find(c => c.id === hoveredItem);

  const selectedDistrictData = selectedDistrict ? DISTRICTS.find(d => d.id === selectedDistrict) : null;

  const itemPos = hoveredItem
    ? (mapLevel === 'state' ? getDistrictPos(hoveredItem) : getCityPos(hoveredItem))
    : null;

  const isTopSide = itemPos && itemPos.y < 40;

  // Derive zoom level for display and stroke width
  const zoomPercent = Math.round(100 * (100 / viewBox.width));
  const invZoom = viewBox.width / 100;

  return (
    <div className={`relative w-full ${mapLevel === 'district' ? 'h-full min-h-[85vh] overflow-y-auto' : 'h-[85vh] overflow-hidden'} bg-white rounded-[3rem] border border-slate-200 shadow-2xl animate-in fade-in duration-1000`}>
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid.png')]"></div>

      {/* District Detail View Header & Trends */}
      {mapLevel === 'district' && selectedDistrictData && (
        <div className="relative z-20 p-8 space-y-8 bg-white/50 backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToState}
                className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-xl group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{selectedDistrictData.name} District</h2>
                <p className="text-slate-500 font-bold tracking-wide text-sm">Real-time epidemiological surveillance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3">
                <Users className="text-indigo-500" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Cases</p>
                  <p className="text-xl font-black text-slate-800">{selectedDistrictData.totalCases.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3">
                <Activity className="text-rose-500" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Risk Level</p>
                  <p className={`text-xl font-black ${selectedDistrictData.risk === 'High' ? 'text-rose-500' : selectedDistrictData.risk === 'Moderate' ? 'text-amber-500' : 'text-emerald-500'}`}>{selectedDistrictData.risk.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trends Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp size={18} className="text-indigo-600" />
                  <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest">Weekly Disease Trend</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Last 7 Days</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DISTRICT_TRENDS}>
                    <defs>
                      <linearGradient id="colorFever" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorDengue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="fever" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorFever)" />
                    <Area type="monotone" dataKey="dengue" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorDengue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <AlertOctagon className="text-amber-400" />
                  <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest">Key Insights</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Dominant Strain</p>
                    <p className="text-3xl font-black text-white">Dengue Type-2</p>
                    <p className="text-sm text-slate-400 mt-2">Active transmission clusters identified in 3 zones.</p>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Growth Rate</p>
                      <p className="text-xl font-black text-emerald-400">-12% ▼</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Hospitals Full</p>
                      <p className="text-xl font-black text-amber-400">2 / 14</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Scroll down for Geospatial View</p>
          </div>
        </div>
      )}



      <div className={`relative w-full ${mapLevel === 'district' ? 'h-[600px] border-t border-slate-100' : 'h-full'}`}>
        {/* Zoom Controls - Stay Top Right */}
        <div className="absolute top-10 right-10 z-30 flex flex-col gap-3">
          <button
            onClick={handleZoomIn}
            className="p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl group"
            title="Zoom In"
          >
            <ZoomIn size={20} className="text-slate-700 group-hover:text-indigo-600" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl group"
            title="Zoom Out"
          >
            <ZoomOut size={20} className="text-slate-700 group-hover:text-indigo-600" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-4 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl group"
            title="Reset View"
          >
            <Maximize2 size={20} className="text-slate-700 group-hover:text-indigo-600" />
          </button>
          <div className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-black text-center">
            {zoomPercent}%
          </div>
        </div>

        {/* Strategic Legend - Moved to Bottom Left */}
        <div className="absolute bottom-10 left-10 z-30 bg-white/90 backdrop-blur-xl border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 w-64 space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <Layers size={16} className="text-indigo-600" />
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategic Legend</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-[10px] font-black text-slate-900 uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-[#f43f5e] mr-4 shadow-lg shadow-rose-200"></span> Critical Load
            </div>
            <div className="flex items-center text-[10px] font-black text-slate-900 uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] mr-4 shadow-lg shadow-amber-200"></span> High Pressure
            </div>
            <div className="flex items-center text-[10px] font-black text-slate-900 uppercase tracking-widest">
              <span className="w-3 h-3 rounded-full bg-[#10b981] mr-4 shadow-lg shadow-emerald-200"></span> Capacity OK
            </div>
          </div>
        </div>
        <svg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          className={`w-full h-full p-10 drop-shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}


          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            {/* Shadow filter */}
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
              <feOffset dx="0" dy="2" result="offsetblur" />
              <feComponentTransfer><feFuncA type="linear" slope="0.1" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Map background gradient */}
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f8fafc', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#f1f5f9', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#e2e8f0', stopOpacity: 1 }} />
            </linearGradient>

            {/* Border gradient */}
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.6 }} />
              <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0.6 }} />
            </linearGradient>

            {/* Pattern for map texture */}
            <pattern id="mapPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.3" fill="#cbd5e1" opacity="0.3" />
            </pattern>
          </defs>

          <g>
            {/* Map Boundary for Context removed */}

            {/* Render based on map level */}
            {mapLevel === 'district' && selectedDistrict && DISTRICT_CONNECTIONS[selectedDistrict]?.map(([from, to], i) => {
              const start = getCityPos(from);
              const end = getCityPos(to);

              // Skip if coordinates are missing (0,0)
              if ((start.x === 0 && start.y === 0) || (end.x === 0 && end.y === 0)) return null;

              return (
                <line
                  key={i}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="#E2E8F0"
                  strokeWidth={0.5 * invZoom}
                  strokeDasharray={`${2 * invZoom}, ${2 * invZoom}`}
                />
              );
            })}

            {mapLevel === 'state' ? (
              // State Level - Show Districts
              DISTRICTS.map((district) => {
                const pos = getDistrictPos(district.id);
                const color = getStatusColor(district.risk);
                const isHovered = hoveredItem === district.id;

                const outerRadius = (isHovered ? 4.5 : 4) * invZoom;
                const innerRadius = (isHovered ? 2.8 : 2.5) * invZoom;
                const fontSize = (isHovered ? 2.5 : 2.2) * invZoom;
                const textOffset = (isHovered ? 8 : 7.5) * invZoom;

                return (
                  <g
                    key={district.id}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredItem(district.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => handleDistrictClick(district.id)}
                  >
                    <circle cx={pos.x} cy={pos.y} r={outerRadius} fill="white" filter="url(#softShadow)" className="transition-all duration-300" />
                    <circle cx={pos.x} cy={pos.y} r={innerRadius} fill={color} className="transition-all duration-300" />
                    <text
                      x={pos.x}
                      y={pos.y + textOffset}
                      textAnchor="middle"
                      fontSize={fontSize}
                      fontWeight="900"
                      className={`uppercase tracking-[0.1em] transition-all duration-300 ${isHovered ? 'fill-indigo-600' : 'fill-slate-500'}`}
                      style={{ pointerEvents: 'none' }}
                    >
                      {district.name}
                    </text>
                  </g>
                );
              })
            ) : (
              // District Level - Show Cities
              CITIES
                .filter(city => city.districtId === selectedDistrict)
                .map((city) => {
                  const pos = getCityPos(city.id);
                  const color = getStatusColor(city.risk);
                  const isHovered = hoveredItem === city.id;

                  const outerRadius = (isHovered ? 4.5 : 4) * invZoom;
                  const innerRadius = (isHovered ? 2.8 : 2.5) * invZoom;
                  const fontSize = (isHovered ? 2.5 : 2.2) * invZoom;
                  const textOffset = (isHovered ? 8 : 7.5) * invZoom;

                  return (
                    <g
                      key={city.id}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredItem(city.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => onSelectCity(city.id)}
                    >
                      <circle cx={pos.x} cy={pos.y} r={outerRadius} fill="white" filter="url(#softShadow)" className="transition-all duration-300" />
                      <circle cx={pos.x} cy={pos.y} r={innerRadius} fill={color} className="transition-all duration-300" />
                      <text
                        x={pos.x}
                        y={pos.y + textOffset}
                        textAnchor="middle"
                        fontSize={fontSize}
                        fontWeight="900"
                        className={`uppercase tracking-[0.1em] transition-all duration-300 ${isHovered ? 'fill-indigo-600' : 'fill-slate-500'}`}
                        style={{ pointerEvents: 'none' }}
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })
            )}
          </g>
        </svg>

        {/* Tooltip */}
        {hoveredItem && currentData && itemPos && (() => {
          // Calculate position relative to container (0-100%)
          const screenX = (itemPos.x - viewBox.x) / viewBox.width * 100;
          const screenY = (itemPos.y - viewBox.y) / viewBox.height * 100;

          // Determine quadrants to avoid clipping
          const isRightSide = screenX > 75;
          const isLeftSide = screenX < 25;
          const isTopSide = screenY < 30; // Closer to top edge, so push down

          let transformClass = 'translate(-50%, -120%)'; // Default: Centered Above

          if (isRightSide) {
            transformClass = isTopSide ? 'translate(-90%, 20%)' : 'translate(-90%, -120%)';
          } else if (isLeftSide) {
            transformClass = isTopSide ? 'translate(-10%, 20%)' : 'translate(-10%, -120%)';
          } else if (isTopSide) {
            transformClass = 'translate(-50%, 20%)';
          }

          return (
            <div
              className="absolute z-50 bg-[#0B0F19] border border-white/5 rounded-[2rem] shadow-2xl w-72 animate-in fade-in zoom-in-95 pointer-events-auto"
              style={{
                left: `${screenX}%`,
                top: `${screenY}%`,
                transform: transformClass
              }}
            >
              <div className="p-7 space-y-5">
                <h5 className="font-black text-lg tracking-tight text-white uppercase italic">{currentData.name}</h5>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-slate-400">Active Cases</span>
                    <span className="text-white text-sm">{currentData.totalCases}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                    <span className="text-slate-400">Risk Vector</span>
                    <span className={`${currentData.risk === 'High' ? 'text-[#f43f5e]' :
                      currentData.risk === 'Moderate' ? 'text-[#f59e0b]' :
                        'text-[#10b981]'
                      } text-sm font-black`}>
                      {currentData.risk.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (mapLevel === 'state') {
                        handleDistrictClick(hoveredItem);
                      } else {
                        onSelectCity(hoveredItem);
                      }
                    }}
                    className="w-full flex items-center justify-between text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {mapLevel === 'state' ? 'View District' : 'Access Command Link'}
                    </span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Status Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-8 px-10 py-4 bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-full shadow-2xl shadow-slate-200/50">
          <div className="flex items-center space-x-3">
            <Globe size={16} className="text-indigo-600" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">
              {mapLevel === 'state' ? 'Maharashtra State View' : 'District Mesh Synchronized'}
            </span>
          </div>
          <div className="w-px h-4 bg-slate-200"></div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sector OK</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alerts Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
