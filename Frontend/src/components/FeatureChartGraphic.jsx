import React from 'react';

const FeatureChartGraphic = () => {
  return (
    <div className="relative w-full max-w-[450px] aspect-square rounded-3xl border border-white/[0.06] bg-[#0E0E11]/60 p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.03)] overflow-hidden flex flex-col justify-between group">
      
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-line {
          animation: drawLine 3.5s ease-out forwards;
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float-card {
          animation: floatCard 4s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
          <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-mono">Price Trend Monitor</span>
        </div>
        <span className="text-[9px] text-gray-500 font-mono">TARGET: ₹75,000</span>
      </div>

      {/* Main Metric */}
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-[9px] text-gray-500 uppercase tracking-widest block">Lowest Price Detected</span>
          <span className="text-3xl font-bold tracking-tight text-white mt-1">₹71,499</span>
        </div>
        <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full animate-pulse">
          Saved ₹8,500
        </span>
      </div>

      {/* SVG Chart Area */}
      <div className="relative flex-1 min-h-[160px] mt-4 flex items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 opacity-[0.02] pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="border-t border-l border-white"></div>
          ))}
        </div>

        <svg className="w-full h-full" viewBox="0 0 400 150">
          <defs>
            <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0"/>
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06B6D4"/>
              <stop offset="60%" stopColor="#3B82F6"/>
              <stop offset="100%" stopColor="#10B981"/>
            </linearGradient>
          </defs>

          {/* Shaded area under graph */}
          <path d="M 10 30 Q 120 20 200 90 T 390 120 L 390 150 L 10 150 Z" fill="url(#glowGrad)" />

          {/* Animated line */}
          <path 
            d="M 10 30 Q 120 20 200 90 T 390 120" 
            fill="none" 
            stroke="url(#lineGrad)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className="animate-draw-line"
            style={{
              strokeDasharray: '600',
              strokeDashoffset: '600',
            }}
          />

          {/* Target dashed line */}
          <line x1="10" y1="100" x2="390" y2="100" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
          <text x="15" y="93" fill="#EF4444" fontSize="8" fontFamily="monospace" opacity="0.6">TARGET PRICE REACHED</text>

          {/* Trigger point pulse */}
          <circle cx="390" cy="120" r="10" fill="#10B981" fillOpacity="0.2" className="animate-ping" />
          <circle cx="390" cy="120" r="4.5" fill="#10B981" />
        </svg>

        {/* Floating Success Card */}
        <div className="absolute bottom-4 right-2 bg-black/80 border border-white/[0.08] rounded-2xl p-3 backdrop-blur-md shadow-xl animate-float-card max-w-[200px] flex gap-2.5 items-center">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-xs">
            💸
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] text-gray-500 uppercase tracking-widest font-mono">Dispatched</span>
            <span className="text-[10px] font-medium text-white/90 leading-tight">Price drop email sent!</span>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="border-t border-white/[0.06] pt-4 mt-2 flex justify-between items-center text-[9px] text-gray-500 tracking-wider font-mono">
        <span>STATUS: LIVE</span>
        <span>UPDATES: INSTANT</span>
      </div>
    </div>
  );
};

export default FeatureChartGraphic;