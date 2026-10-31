import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ShieldCheck, 
  Radio, 
  Truck, 
  CheckCircle2, 
  Crosshair, 
  Satellite, 
  Wifi, 
  Sparkles, 
  Cpu, 
  Play, 
  Pause, 
  Compass, 
  Clock, 
  Layers, 
  Eye, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { sound } from '../utils/soundFX';

const stages = [
  { 
    name: 'Order Placed', 
    code: 'STG-01', 
    xRatio: 0.12, 
    yRatio: 0.72,
    icon: Package, 
    eta: '00:00:00',
    altitude: 'Ground Level (0 m)',
    coords: '13.0827° N, 80.2707° E',
    statusTitle: 'Payload Cryptographic Manifest Registered',
    detail: 'Order recorded into the decentralized immutable ledger. Inventory reserved and physical goods moved to packaging bay.'
  },
  { 
    name: 'Security Verified', 
    code: 'STG-02', 
    xRatio: 0.32, 
    yRatio: 0.38,
    icon: ShieldCheck, 
    eta: '00:45:00',
    altitude: 'Inspection Bay (12 m)',
    coords: '13.0850° N, 80.2735° E',
    statusTitle: 'Anti-Tamper Molecular Seal Confirmed',
    detail: 'Automated biometric inspection completed. Smart QR tamper tag attached and passed quality assurance validation.'
  },
  { 
    name: 'Dispatched', 
    code: 'STG-03', 
    xRatio: 0.52, 
    yRatio: 0.65,
    icon: Radio, 
    eta: '02:15:00',
    altitude: 'Sub-Orbital Drone Vector (420 m)',
    coords: '13.1102° N, 80.2910° E',
    statusTitle: 'Hyper-Transit Air Fleet En Route',
    detail: 'Autonomous carrier drone departed primary fulfillment node. Real-time satellite flight path telemetry locked.'
  },
  { 
    name: 'Out for Delivery', 
    code: 'STG-04', 
    xRatio: 0.74, 
    yRatio: 0.32,
    icon: Truck, 
    eta: '00:22:00',
    altitude: 'Terminal Air Corridor (60 m)',
    coords: '13.0780° N, 80.2540° E',
    statusTitle: 'Final-Mile Courier Approaching Perimeter',
    detail: 'Carrier entered local airspace radius. Autonomous delivery rover descending toward designated drop-off coordinates.'
  },
  { 
    name: 'Completed', 
    code: 'STG-05', 
    xRatio: 0.90, 
    yRatio: 0.60,
    icon: CheckCircle2, 
    eta: 'DELIVERED',
    altitude: 'Target Destination (0 m)',
    coords: '13.0827° N, 80.2707° E',
    statusTitle: 'Delivery Handshake Authenticated',
    detail: 'Package safely placed in secure drop locker. Recipient authentication signature verified and mission fulfilled.'
  }
];

export default function OrderRadar({ currentStatus = 'Dispatched' }) {
  const radarCanvasRef = useRef(null);
  const activeIdx = Math.max(0, stages.findIndex((s) => s.name.toLowerCase() === currentStatus.toLowerCase()));
  
  const [selectedNode, setSelectedNode] = useState(activeIdx);
  const [viewMode, setViewMode] = useState('radar'); // 'radar' or 'tactical'
  const [isSimulating, setIsSimulating] = useState(false);
  const simTimerRef = useRef(null);

  useEffect(() => {
    setSelectedNode(activeIdx);
  }, [activeIdx]);

  // Automated Simulation Loop
  const toggleSimulation = () => {
    sound.playClick();
    if (isSimulating) {
      clearInterval(simTimerRef.current);
      setIsSimulating(false);
    } else {
      setIsSimulating(true);
      simTimerRef.current = setInterval(() => {
        setSelectedNode((prev) => {
          const next = (prev + 1) % stages.length;
          sound.playHover();
          return next;
        });
      }, 2400);
    }
  };

  useEffect(() => {
    return () => clearInterval(simTimerRef.current);
  }, []);

  // 360-degree Phosphorescent Radar Scanner Canvas
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let sweepAngle = 0;

    const size = 480;
    canvas.width = size * window.devicePixelRatio;
    canvas.height = size * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const cx = size / 2;
    const cy = size / 2;
    const maxRadius = 220;

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Range Concentric Rings
      [60, 115, 170, 220].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 3 ? 'rgba(236, 65, 134, 0.45)' : 'rgba(238, 84, 74, 0.16)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash(idx % 2 === 0 ? [5, 5] : []);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Range Labels on radar circles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '9px monospace';
      ctx.fillText('500m', cx + 63, cy - 4);
      ctx.fillText('1.5km', cx + 118, cy - 4);
      ctx.fillText('3.0km', cx + 173, cy - 4);
      ctx.fillText('5.0km', cx + 223, cy - 4);

      // Coordinate Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - maxRadius, cy);
      ctx.lineTo(cx + maxRadius, cy);
      ctx.moveTo(cx, cy - maxRadius);
      ctx.lineTo(cx, cy + maxRadius);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.stroke();

      // Radial Degree Markings (every 30 degrees)
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        const x1 = cx + Math.cos(a) * (maxRadius - 8);
        const y1 = cy + Math.sin(a) * (maxRadius - 8);
        const x2 = cx + Math.cos(a) * maxRadius;
        const y2 = cy + Math.sin(a) * maxRadius;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(236, 65, 134, 0.35)';
        ctx.stroke();
      }

      // Phosphor Sector Sweep
      sweepAngle += 0.024;
      const sweepSegments = 45;
      for (let i = 0; i < sweepSegments; i++) {
        const startA = sweepAngle - (i * 0.025);
        const endA = sweepAngle - ((i + 1) * 0.025);
        const alpha = (1 - i / sweepSegments) * 0.25;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxRadius, endA, startA);
        ctx.closePath();
        ctx.fillStyle = `rgba(236, 65, 134, ${alpha})`;
        ctx.fill();
      }

      // Laser Leading Sweep Beam
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweepAngle) * maxRadius, cy + Math.sin(sweepAngle) * maxRadius);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#EC4186';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Central Quantum Base Station Transponder
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#EE544A';
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#EE544A';
      ctx.fill();
      ctx.shadowBlur = 0;

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, []);

  const activeStage = stages[selectedNode];

  return (
    <div className="max-w-6xl mx-auto my-8 rounded-3xl bg-gradient-to-b from-[#2d093b]/95 via-[#1d0426]/90 to-[#0e0214]/95 border border-[#EC4186]/40 backdrop-blur-2xl p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
      
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC4186]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EE544A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Flight Control Deck Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/10 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EC4186] to-[#EE544A] flex items-center justify-center text-white shadow-[0_0_25px_rgba(236,65,134,0.6)]">
            <Crosshair size={26} className="animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black text-white tracking-wider uppercase">Live Quantum Dispatch Radar</h2>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> SATELLITE LOCK (100%)
              </span>
            </div>
            <p className="text-xs text-gray-300 font-mono mt-0.5">
              Multi-band telemetry tracing, anti-tamper verification, and automated transit tracking
            </p>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSimulation}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border transition shadow-md ${
              isSimulating
                ? 'bg-[#EE544A] text-white border-white shadow-[0_0_15px_rgba(238,84,74,0.6)] animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            {isSimulating ? <Pause size={14} /> : <Play size={14} />}
            <span>{isSimulating ? 'Pause Flight Sim' : 'Simulate Live Flight'}</span>
          </button>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => { sound.playClick(); setViewMode('radar'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
                viewMode === 'radar' ? 'bg-[#EC4186] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Compass size={13} /> Radar Scan
            </button>
            <button
              onClick={() => { sound.playClick(); setViewMode('tactical'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center gap-1.5 ${
                viewMode === 'tactical' ? 'bg-[#EC4186] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers size={13} /> Corridor Map
            </button>
          </div>
        </div>
      </div>

      {/* Main Radar & Flight Instrumentation */}
      <div className="grid lg:grid-cols-12 gap-8 my-8 items-center relative z-10">
        
        {/* LEFT: Panoramic Interactive Radar Screen */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          
          {viewMode === 'radar' ? (
            /* Mode 1: Polar Radar Scanner with Circular Positioning */
            <div className="relative w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] flex items-center justify-center">
              <canvas ref={radarCanvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

              {/* Waypoint Satellite Beacons placed dynamically on radar rings */}
              {stages.map((st, idx) => {
                const angleRad = ((idx * (360 / stages.length) - 90) * Math.PI) / 180;
                const distance = 165; // Distance from center
                const x = 240 + Math.cos(angleRad) * distance;
                const y = 240 + Math.sin(angleRad) * distance;

                const isCurrent = idx === activeIdx;
                const isSelected = idx === selectedNode;
                const isCompleted = idx < activeIdx;
                const Icon = st.icon;

                return (
                  <div
                    key={st.code}
                    onClick={() => {
                      sound.playClick();
                      setSelectedNode(idx);
                    }}
                    style={{ left: `${(x / 480) * 100}%`, top: `${(y / 480) * 100}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >
                    {isCurrent && (
                      <motion.div
                        animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-[#EC4186]"
                      />
                    )}

                    <div
                      className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-2xl ${
                        isSelected
                          ? 'bg-gradient-to-tr from-[#EC4186] to-[#EE544A] text-white border-white scale-125 shadow-[0_0_25px_rgba(236,65,134,0.9)]'
                          : isCompleted
                          ? 'bg-[#38124A] text-emerald-300 border-emerald-400 hover:scale-110'
                          : isCurrent
                          ? 'bg-[#38124A] text-[#EC4186] border-[#EC4186] hover:scale-110'
                          : 'bg-[#180422] text-gray-400 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <Icon size={20} />
                      {isCompleted && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-400 text-black rounded-full flex items-center justify-center text-[9px] font-black shadow-md">
                          ✓
                        </span>
                      )}
                    </div>

                    <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 border border-white/20 px-2.5 py-1 rounded-md text-[10px] font-mono text-white whitespace-nowrap shadow-xl pointer-events-none">
                      {st.name} ({st.code})
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Mode 2: Tactical Panoramic Corridor Trajectory View */
            <div className="relative w-full h-[400px] rounded-3xl bg-[#170321]/80 border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex justify-between items-center text-xs font-mono text-gray-400 border-b border-white/10 pb-3">
                <span className="flex items-center gap-1.5 text-white font-bold">
                  <Compass size={15} className="text-[#EC4186]" /> SUB-ORBITAL CORRIDOR ALPHA-9
                </span>
                <span className="text-emerald-400 font-bold">GRID ACCURACY: ±0.4m</span>
              </div>

              {/* Glowing Vector Trajectory Line (SVG Ribbon) */}
              <div className="relative w-full h-48 my-auto">
                <svg className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EC4186" />
                      <stop offset="50%" stopColor="#EE544A" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                  </defs>

                  {/* Base Route Track */}
                  <path
                    d="M 50 140 Q 220 30, 420 140 T 780 120"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="4"
                    strokeDasharray="6 6"
                  />

                  {/* Active Illuminated Trajectory Beam */}
                  <path
                    d="M 50 140 Q 220 30, 420 140 T 780 120"
                    fill="none"
                    stroke="url(#routeGrad)"
                    strokeWidth="4"
                    strokeDasharray="400"
                    strokeDashoffset={400 - (selectedNode / (stages.length - 1)) * 400}
                    className="transition-all duration-700"
                  />
                </svg>

                {/* Tactical Waypoint Markers across the corridor */}
                {stages.map((st, idx) => {
                  const isSelected = idx === selectedNode;
                  const isCompleted = idx < activeIdx;
                  const isCurrent = idx === activeIdx;

                  return (
                    <div
                      key={st.code}
                      onClick={() => {
                        sound.playClick();
                        setSelectedNode(idx);
                      }}
                      style={{ left: `${st.xRatio * 100}%`, top: `${st.yRatio * 100}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all shadow-xl ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white border-white scale-125 shadow-[0_0_20px_rgba(236,65,134,0.8)]'
                            : isCompleted
                            ? 'bg-[#38124A] text-emerald-300 border-emerald-400'
                            : isCurrent
                            ? 'bg-[#38124A] text-[#EC4186] border-[#EC4186] animate-pulse'
                            : 'bg-[#180422] text-gray-500 border-white/10'
                        }`}
                      >
                        <span className="font-mono text-xs font-black">0{idx + 1}</span>
                      </div>
                      <span className="block text-[10px] font-mono text-center text-gray-300 mt-2 font-bold whitespace-nowrap">
                        {st.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 pt-3 border-t border-white/10">
                <span>ORIGIN: CHENNAI TERMINAL</span>
                <span>DESTINATION: 221B BAKER STREET</span>
              </div>
            </div>
          )}

          {/* Quick Waypoint Number Navigation Selector */}
          <div className="flex gap-2 w-full max-w-md mt-6">
            {stages.map((st, i) => (
              <button
                key={st.code}
                onClick={() => {
                  sound.playClick();
                  setSelectedNode(i);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition border ${
                  selectedNode === i
                    ? 'bg-gradient-to-r from-[#EC4186] to-[#EE544A] text-white border-white shadow-[0_0_15px_rgba(236,65,134,0.6)]'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: High-Tech Diagnostic Flight Telemetry HUD */}
        <div className="lg:col-span-5 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.code}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="p-6 md:p-8 rounded-3xl bg-[#1f0528]/95 border border-[#EC4186]/40 shadow-2xl space-y-5"
            >
              {/* Waypoint ID Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-black uppercase tracking-widest text-[#EE544A] bg-[#EE544A]/15 px-3 py-1 rounded-lg border border-[#EE544A]/30">
                  BEACON {activeStage.code}
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">
                  STEP {selectedNode + 1} OF 5
                </span>
              </div>

              {/* Waypoint Name & Status */}
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                  {activeStage.statusTitle}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm font-extrabold text-[#EC4186]">{activeStage.name}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                    <Clock size={12} /> ETA: {activeStage.eta}
                  </span>
                </div>
                <p className="text-xs text-gray-200 leading-relaxed mt-3 font-sans">
                  {activeStage.detail}
                </p>
              </div>

              {/* Waypoint Real-Time Instruments */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block flex items-center gap-1">
                    <MapPin size={12} className="text-[#EC4186]" /> LAT / LONG
                  </span>
                  <span className="font-bold text-white text-xs">{activeStage.coords}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block flex items-center gap-1">
                    <Satellite size={12} className="text-[#EE544A]" /> ALTITUDE
                  </span>
                  <span className="font-bold text-white text-xs">{activeStage.altitude}</span>
                </div>
              </div>

              {/* Overall Mission Completion Meter */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">MISSION COMPLETION</span>
                  <span className="text-white font-extrabold">{Math.round(((selectedNode + 1) / 5) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden border border-white/15 p-[2px]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((selectedNode + 1) / 5) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#EC4186] via-[#EE544A] to-[#FFFFFF] shadow-[0_0_12px_rgba(236,65,134,0.8)]"
                  />
                </div>
              </div>

              {/* Verification Signature Seal */}
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span className="text-xs font-mono text-emerald-200 font-bold">Integrity Verified</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400">SHA-256: 4f8b91a...</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Flight Deck Telemetry Footer */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-300 gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <Satellite size={15} className="text-[#EC4186]" />
          <span>PRIMARY NODE: Chennai Spaceport Telemetry Uplink (Node 09)</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Wifi size={15} />
          <span>QUANTUM TELEMETRY LINK ACTIVE • 0.04ms LATENCY</span>
        </div>
      </div>

    </div>
  );
}
