import React from 'react';

const LiveTrackerGraphic = () => {
  return (
    <div className="relative w-full max-w-[450px] aspect-square rounded-3xl border border-white/[0.06] bg-[#0E0E11]/60 p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.03)] overflow-hidden flex flex-col justify-between group">
      
      <style>{`
        @keyframes scanLines {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220px); }
        }
        .animate-scan {
          animation: scanLines 5s linear infinite;
        }
      `}</style>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <span className="text-[10px] uppercase tracking-widest text-purple-400 font-mono">Live Scraper Engine</span>
        </div>
        <span className="text-[9px] text-gray-500 font-mono">DAEMON: ACTIVE</span>
      </div>

      {/* Monitoring Logs Console Mockup */}
      <div className="relative flex-1 bg-black/50 border border-white/[0.04] rounded-2xl p-4.5 font-mono text-[9px] text-gray-400 mt-4 overflow-hidden flex flex-col gap-3.5">
        {/* Laser scanner line */}
        <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40 animate-scan"></div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">[14:38:12]</span>
          <span className="text-white/80">Checking amazon.in...</span>
          <span className="text-emerald-400">200 OK</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">[14:38:14]</span>
          <span className="text-white/80">Checking flipkart.com...</span>
          <span className="text-emerald-400">200 OK</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">[14:38:18]</span>
          <span className="text-purple-400">Parsing JSON-LD Metadata...</span>
          <span className="text-gray-500">done</span>
        </div>

        <div className="flex items-center justify-between bg-purple-500/5 border border-purple-500/10 p-2 rounded-lg mt-1 relative z-10">
          <span className="text-purple-300 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
            ★ price drop detected
          </span>
          <span className="text-purple-300 font-mono">-₹4,500</span>
        </div>

        <div className="flex items-center justify-between opacity-50">
          <span className="text-gray-600">[14:38:22]</span>
          <span className="text-white/80">Queueing email alert...</span>
          <span className="text-blue-400">sent</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] pt-4 mt-4 flex justify-between items-center text-[9px] text-gray-500 tracking-wider font-mono">
        <span>RUNTIME: 2.1s</span>
        <span>THREADS: MULTI</span>
      </div>
    </div>
  );
};

export default LiveTrackerGraphic;