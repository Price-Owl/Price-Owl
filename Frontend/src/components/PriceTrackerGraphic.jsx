import React from 'react';

const PriceTrackerGraphic = () => {
  return (
    <div className="relative w-full max-w-[480px] aspect-square rounded-3xl border border-white/[0.06] bg-[#0E0E11]/40 p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.03)] overflow-hidden flex flex-col justify-between group">
      
      {/* Floating animations custom CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s infinite ease-in-out;
        }
      `}</style>

      {/* Ambient background blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/10 transition-all duration-700"></div>

      {/* Mockup Browser Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
        </div>
        <div className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
          live_monitor_v2.0
        </div>
      </div>

      {/* Metric Header */}
      <div className="flex items-end justify-between mt-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Active Target</span>
          <span className="text-sm font-semibold text-white/95">iPhone 16 Pro Max</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium tracking-wide flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Alert Sent
          </span>
          <span className="text-xs text-gray-500 line-through">₹1,44,900</span>
        </div>
      </div>

      {/* Main Price Drop Highlight */}
      <div className="my-2 text-center">
        <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Current Price</span>
        <div className="inline-flex items-center gap-3">
          <span className="text-4xl font-bold tracking-tight text-white">₹1,29,999</span>
          <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg">
            -10.2%
          </span>
        </div>
      </div>

      {/* Chart Graphic Area */}
      <div className="relative flex-1 min-h-[140px] mt-2 flex items-center justify-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-t border-l border-white"></div>
          ))}
        </div>

        {/* SVG Animated Chart Line */}
        <svg className="w-full h-full" viewBox="0 0 400 150">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0"/>
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6"/>
              <stop offset="50%" stopColor="#6366F1"/>
              <stop offset="100%" stopColor="#10B981"/>
            </linearGradient>
          </defs>

          {/* Area under the line */}
          <path 
            d="M 10 30 Q 100 20 180 80 T 390 120 L 390 150 L 10 150 Z" 
            fill="url(#chartGradient)"
          />

          {/* Glowing line path */}
          <path 
            d="M 10 30 Q 100 20 180 80 T 390 120" 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Target Pulsing Radar Ring */}
          <circle cx="390" cy="120" r="10" fill="#10B981" fillOpacity="0.2" className="animate-ping" />
          <circle cx="390" cy="120" r="5" fill="#10B981" />
        </svg>

        {/* Floating Email Notification Mockup */}
        <div className="absolute top-2 left-6 bg-white/[0.02] border border-white/[0.08] rounded-xl p-2.5 backdrop-blur-md shadow-lg animate-float flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-xs">
            📧
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-400">Email Dispatched</span>
            <span className="text-[10px] font-medium text-white/90">Price fell below target!</span>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-white/[0.06] pt-4 mt-2 flex justify-between items-center text-[9px] text-gray-500 tracking-wider font-mono">
        <span>STABLE CONNECTION</span>
        <span>REFRESH: 12H</span>
      </div>
    </div>
  );
};

export default PriceTrackerGraphic;