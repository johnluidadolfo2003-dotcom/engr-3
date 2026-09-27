import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../../types';
import {
  Zap,
  Bot,
  RotateCcw,
  Sliders,
  Activity,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Factory,
  Layers,
  Sparkles,
  Calculator,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

type PowerTriangleTab = 'physical_wire' | 'triangle_morph' | 'board_solver' | 'comparison';

export const PowerTrianglePhasorVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [activeTab, setActiveTab] = useState<PowerTriangleTab>('physical_wire');

  // Core Parameters
  const [realPowerP, setRealPowerP] = useState(120); // kW (Fixed shaft work)
  const [initialPf, setInitialPf] = useState(0.70); // uncorrected lagging pf
  const [targetPf, setTargetPf] = useState(0.95); // corrected target pf
  const [enableCapacitor, setEnableCapacitor] = useState(true);
  const [systemVoltage] = useState(480); // 3-phase 480 V

  // Animation ticks for electron and energy sloshing
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 3600);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Rigorous Calculations
  const theta1Rad = Math.acos(initialPf);
  const theta1Deg = (theta1Rad * 180) / Math.PI;
  const initialS = realPowerP / initialPf; // kVA
  const initialQ = Math.sqrt(Math.max(0, initialS * initialS - realPowerP * realPowerP)); // kVAR
  const initialLineCurrent = (initialS * 1000) / (Math.sqrt(3) * systemVoltage); // A

  const theta2Rad = Math.acos(targetPf);
  const theta2Deg = (theta2Rad * 180) / Math.PI;
  const targetS = realPowerP / targetPf; // kVA
  const targetQ = Math.sqrt(Math.max(0, targetS * targetS - realPowerP * realPowerP)); // kVAR
  const requiredQC = Math.max(0, initialQ - targetQ); // kVAR of capacitor bank
  const correctedLineCurrent = (targetS * 1000) / (Math.sqrt(3) * systemVoltage); // A

  // Active displayed values
  const currentPf = enableCapacitor ? targetPf : initialPf;
  const currentS = enableCapacitor ? targetS : initialS;
  const currentQ = enableCapacitor ? targetQ : initialQ;
  const currentLineAmps = enableCapacitor ? correctedLineCurrent : initialLineCurrent;
  const currentThetaDeg = enableCapacitor ? theta2Deg : theta1Deg;
  const ampsSavedPercent = ((initialLineCurrent - correctedLineCurrent) / initialLineCurrent) * 100;
  const kvaSaved = initialS - targetS;

  // Language texts
  const tStrings = {
    en: {
      badge: 'INTUITIVE AC POWER CONCEPT',
      title: 'Power Triangle & Capacitor Bank Explained',
      sub: 'Why electric motors overload power lines, and how a capacitor bank fixes it locally',
      tabPhysical: '1. What Happens in the Wires (Physical Model)',
      tabTriangle: '2. The Power Triangle (Geometry)',
      tabSolver: '3. Board Exam Formula Solver',
      tabComparison: '4. Before vs After Comparison',
      realPowerDesc: 'Real Work (P in kW): Turns the motor shaft, generates heat and light. Useful output.',
      reactiveDesc: 'Magnetizing Burden (Q in kVAR): Magnetic field sloshes back & forth. Does zero net work.',
      apparentDesc: 'Total Grid Demand (S in kVA): The total wire capacity the power company must supply.',
      pfDesc: 'Power Factor (pf): Efficiency ratio = Real Work (P) ÷ Total Grid Demand (S).',
      capOffText: 'Capacitor Bank is OFF: Heavy magnetic sloshing current travels all the way from the distant power plant.',
      capOnText: 'Capacitor Bank is ON: Motor and Capacitor trade magnetic energy locally! The long utility line is relieved.',
    },
    tl: {
      badge: 'INTUITIBONG KONSEPTO SA AC POWER',
      title: 'Power Triangle at Capacitor Bank (Paliwanag)',
      sub: 'Bakit nagkakarga ng mabigat na kuryente ang mga motor, at paano ito nilulutas ng capacitor',
      tabPhysical: '1. Ano ang Nangyayari sa Kable (Aktwal)',
      tabTriangle: '2. Ang Power Triangle (Hugis)',
      tabSolver: '3. Solver ng Formula sa Board Exam',
      tabComparison: '4. Pagkukumpara (Bago at Pagkatapos)',
      realPowerDesc: 'Real Work (P sa kW): Nagpapaikot ng motor, gumagawa ng totoong trabaho at liwanag.',
      reactiveDesc: 'Magnetizing Load (Q sa kVAR): Magnetic field na pabalik-balik sa motor. Walang nagagawang trabaho.',
      apparentDesc: 'Kabuuang Karga sa Grid (S sa kVA): Ang laking kable at kuryenteng kailangang ibigay ng Meralco.',
      pfDesc: 'Power Factor (pf): Episyensya = Totoong Trabaho (P) ÷ Kabuuang Karga (S).',
      capOffText: 'Naka-OFF ang Capacitor: Ang pabalik-balik na magnetizing current ay dumadaan sa buong kable mula sa planta.',
      capOnText: 'Naka-ON ang Capacitor: Ang motor at capacitor ay nagpapalitan ng magnetic energy nang lokal sa pabrika!',
    },
    ceb: {
      badge: 'YANO NGA PASABOT SA AC POWER',
      title: 'Power Triangle ug Capacitor Bank (Gipasabot)',
      sub: 'Nganong bug-at ang karga sa mga motor sa alambre, ug giunsa kini pag-ayo sa capacitor',
      tabPhysical: '1. Unsay Nahitabo sa Alambre (Tinuod nga Dagan)',
      tabTriangle: '2. Ang Power Triangle (Porma)',
      tabSolver: '3. Solver sa Formula sa Board Exam',
      tabComparison: '4. Pagtandi (Sa Una ug Human)',
      realPowerDesc: 'Real Work (P sa kW): Nagpatuyok sa motor ug naghatag og tinuod nga trabaho.',
      reactiveDesc: 'Magnetizing Load (Q sa kVAR): Magnetic field nga magbalik-balik. Walay mahimong trabaho.',
      apparentDesc: 'Tibuok Karga sa Grid (S sa kVA): Ang gidak-on sa kuryente nga kinahanglang ihatag sa planta.',
      pfDesc: 'Power Factor (pf): Epektibo = Tinuod nga Trabaho (P) ÷ Tibuok Karga (S).',
      capOffText: 'Naka-OFF ang Capacitor: Ang magnetic current magbalik-balik gikan pa sa layong planta.',
      capOnText: 'Naka-ON ang Capacitor: Ang motor ug capacitor magbinayloay sa magnetic energy sulod ra sa pabrika!',
    },
  }[language];

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-sans">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-400 font-mono text-[10px] font-bold tracking-wider">
              {tStrings.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              480 V Industrial 3-Phase Model
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {tStrings.title}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">{tStrings.sub}</p>
        </div>

        {/* Global Capacitor Switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEnableCapacitor(!enableCapacitor)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all shadow-xs ${
              enableCapacitor
                ? 'bg-emerald-700 hover:bg-emerald-600 border-emerald-500 text-white'
                : 'bg-red-950/80 hover:bg-red-900 border-red-700 text-red-200'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>{enableCapacitor ? 'CAPACITOR BANK: ON (Corrected)' : 'CAPACITOR BANK: OFF (Lagging)'}</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="p-2 bg-slate-900 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'physical_wire', label: tStrings.tabPhysical, icon: Factory },
          { id: 'triangle_morph', label: tStrings.tabTriangle, icon: Layers },
          { id: 'board_solver', label: tStrings.tabSolver, icon: Calculator },
          { id: 'comparison', label: tStrings.tabComparison, icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PowerTriangleTab)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isActive
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* TAB 1: THE PHYSICAL WIRE MODEL (THE REAL MYSTERY SOLVED) */}
      {/* ======================================================== */}
      {activeTab === 'physical_wire' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Quick Summary Card */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
              enableCapacitor
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                : 'bg-red-950/60 border-red-800 text-red-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Zap className={`w-5 h-5 shrink-0 mt-0.5 ${enableCapacitor ? 'text-emerald-400' : 'text-red-400'}`} />
              <div>
                <div className="font-bold text-sm text-white">
                  {enableCapacitor ? 'Capacitor Bank Active (Local Magnetizing Swap)' : 'Capacitor Bank Disconnected (Grid Overload)'}
                </div>
                <div className="mt-0.5 text-slate-300">
                  {enableCapacitor ? tStrings.capOnText : tStrings.capOffText}
                </div>
              </div>
            </div>
            <div className="shrink-0 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 text-right">
              <div className="text-[10px] text-slate-400 font-mono">Transmission Wire Current:</div>
              <div className={`text-base font-bold font-mono ${enableCapacitor ? 'text-emerald-400' : 'text-red-400'}`}>
                {currentLineAmps.toFixed(1)} Amperes
              </div>
            </div>
          </div>

          {/* Interactive Visual Power Plant to Factory Diagram */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-300">
                Live Electric Grid Flow Diagram
              </span>
              <span className="font-mono text-cyan-400">
                Utility Wire Burden: {currentS.toFixed(1)} kVA ({currentPf.toFixed(2)} pf)
              </span>
            </div>

            {/* SVG Grid Diagram */}
            <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 650 260" preserveAspectRatio="xMidYMid meet">
                {/* 1. POWER PLANT (Left) */}
                <rect x="20" y="50" width="110" height="150" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <rect x="35" y="70" width="80" height="40" rx="4" fill="#0f172a" />
                <text x="75" y="95" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  POWER PLANT
                </text>
                <text x="75" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Generator
                </text>
                <text x="75" y="170" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono">
                  {currentS.toFixed(0)} kVA Gen
                </text>

                {/* 2. LONG TRANSMISSION POWER LINES */}
                {/* Top power wire */}
                <line x1="130" y1="90" x2="380" y2="90" stroke={enableCapacitor ? '#38bdf8' : '#ef4444'} strokeWidth={enableCapacitor ? 3 : 5} />
                {/* Bottom power wire */}
                <line x1="130" y1="170" x2="380" y2="170" stroke={enableCapacitor ? '#38bdf8' : '#ef4444'} strokeWidth={enableCapacitor ? 3 : 5} />

                {/* Animated Moving Charges in Long Lines */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const xPos = 140 + ((i * 45 + tick * 3) % 230);
                  return (
                    <g key={i}>
                      <circle cx={xPos} cy="90" r={enableCapacitor ? 4 : 5.5} fill={enableCapacitor ? '#38bdf8' : '#ef4444'} />
                      <circle cx={370 - ((i * 45 + tick * 3) % 230)} cy="170" r={enableCapacitor ? 4 : 5.5} fill={enableCapacitor ? '#38bdf8' : '#ef4444'} />
                    </g>
                  );
                })}

                <text x="255" y="75" fill={enableCapacitor ? '#38bdf8' : '#ef4444'} fontSize="11" fontWeight="bold" textAnchor="middle">
                  {enableCapacitor ? 'Cool Wires (Pure Active Work: 120 kW)' : 'HOT WIRES! Overloaded with Magnetic Slosh'}
                </text>
                <text x="255" y="195" fill="#cbd5e1" fontSize="10" textAnchor="middle" className="font-mono">
                  Transmission Current: {currentLineAmps.toFixed(1)} A
                </text>

                {/* 3. FACTORY BOUNDARY (Right) */}
                <rect x="380" y="30" width="250" height="200" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
                <text x="395" y="48" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                  FACTORY PREMISES (480 V)
                </text>

                {/* Motor (Inductive Load) */}
                <rect x="420" y="65" width="90" height="70" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                <text x="465" y="95" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  MOTOR COILS
                </text>
                <text x="465" y="115" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Work: {realPowerP} kW
                </text>

                {/* Capacitor Bank (Beside Motor) */}
                <rect
                  x="540"
                  y="65"
                  width="80"
                  height="70"
                  rx="6"
                  fill={enableCapacitor ? '#064e3b' : '#1e293b'}
                  stroke={enableCapacitor ? '#10b981' : '#475569'}
                  strokeWidth="2"
                />
                <text x="580" y="95" fill={enableCapacitor ? '#6ee7b7' : '#64748b'} fontSize="11" fontWeight="bold" textAnchor="middle">
                  CAPACITOR
                </text>
                <text x="580" y="115" fill={enableCapacitor ? '#ffffff' : '#64748b'} fontSize="10" textAnchor="middle">
                  {enableCapacitor ? `Qc: ${requiredQC.toFixed(0)} kVAR` : 'DISCONNECTED'}
                </text>

                {/* Local Energy Exchange Loop between Motor and Capacitor */}
                {enableCapacitor && (
                  <>
                    <path
                      d="M 510 90 C 525 70, 530 70, 540 90"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <path
                      d="M 540 110 C 530 130, 525 130, 510 110"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    {/* Animated green dots circulating between motor & capacitor */}
                    <circle cx={510 + ((tick * 3) % 30)} cy={80 - Math.sin(((tick * 3) % 30) * 0.1) * 6} r="3.5" fill="#10b981" />
                    <circle cx={540 - ((tick * 3) % 30)} cy={120 + Math.sin(((tick * 3) % 30) * 0.1) * 6} r="3.5" fill="#10b981" />
                    <text x="525" y="150" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">
                      Local Magnetic Ping-Pong
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* The 3 Direct Explanations */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block">1. Active Power (P = {realPowerP} kW)</span>
                <p className="text-slate-400 leading-relaxed">
                  The actual mechanical work turning the motor shaft. Must come from the fuel burned at the power plant.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-red-400 block">2. Reactive Power (Q₁ = {initialQ.toFixed(1)} kVAR)</span>
                <p className="text-slate-400 leading-relaxed">
                  Magnetic energy needed to magnetize motor iron cores. It does zero net work, but clogs transmission lines.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block">3. Capacitor Bank ({requiredQC.toFixed(1)} kVAR)</span>
                <p className="text-slate-400 leading-relaxed">
                  Supplies magnetizing energy locally inside the factory. Utility wires are freed from carrying ghost current!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: THE POWER TRIANGLE MORPH (GEOMETRY) */}
      {/* ======================================================== */}
      {activeTab === 'triangle_morph' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Controls to adjust P, initial pf, and target pf */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="text-amber-400 font-bold">Real Work (P):</span>
                <span className="text-white font-bold">{realPowerP} kW</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="10"
                value={realPowerP}
                onChange={(e) => setRealPowerP(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Base width of the triangle</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="text-red-400 font-bold">Raw pf₁ (Uncorrected):</span>
                <span className="text-white font-bold">{initialPf.toFixed(2)} lag</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="0.85"
                step="0.01"
                value={initialPf}
                onChange={(e) => setInitialPf(Number(e.target.value))}
                className="w-full accent-red-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Determines initial height Q₁</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span className="text-emerald-400 font-bold">Target pf₂ (With Qc):</span>
                <span className="text-white font-bold">{targetPf.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.00"
                step="0.01"
                value={targetPf}
                onChange={(e) => setTargetPf(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-slate-950 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Goal after capacitor correction</span>
            </div>
          </div>

          {/* SVG Power Triangle Diagram */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white uppercase tracking-wider">
                Geometric Power Vector Canvas
              </span>
              <span className="font-mono text-cyan-400">
                Phase Angle θ: {currentThetaDeg.toFixed(1)}° (cos θ = {currentPf.toFixed(2)})
              </span>
            </div>

            <div className="relative w-full h-72 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4">
              <svg viewBox="0 0 500 240" className="w-full h-full select-none">
                {/* Horizontal Baseline P */}
                <line x1="50" y1="210" x2="330" y2="210" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
                <text x="190" y="230" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Active Power Base: P = {realPowerP} kW
                </text>

                {/* Original Uncorrected Height Q1 (Red) */}
                <line
                  x1="330"
                  y1="210"
                  x2="330"
                  y2={210 - Math.min(180, initialQ * 0.8)}
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray={enableCapacitor ? '4,4' : undefined}
                  opacity={enableCapacitor ? 0.35 : 1}
                />
                <text
                  x="340"
                  y={210 - initialQ * 0.4}
                  fill="#ef4444"
                  fontSize="11"
                  fontWeight="bold"
                  opacity={enableCapacitor ? 0.4 : 1}
                >
                  Q₁ = {initialQ.toFixed(1)} kVAR (Motor Burden)
                </text>

                {/* Original Hypotenuse S1 */}
                <line
                  x1="50"
                  y1="210"
                  x2="330"
                  y2={210 - Math.min(180, initialQ * 0.8)}
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeDasharray={enableCapacitor ? '4,4' : undefined}
                  opacity={enableCapacitor ? 0.3 : 1}
                />
                <text
                  x="160"
                  y={210 - initialQ * 0.4 - 10}
                  fill="#0284c7"
                  fontSize="11"
                  fontWeight="bold"
                  opacity={enableCapacitor ? 0.4 : 1}
                >
                  S₁ = {initialS.toFixed(1)} kVA
                </text>

                {/* Capacitor Bank Correction Qc (Green Arrow pulling downward) */}
                {enableCapacitor && (
                  <>
                    <line
                      x1="330"
                      y1={210 - initialQ * 0.8}
                      x2="330"
                      y2={210 - targetQ * 0.8}
                      stroke="#10b981"
                      strokeWidth="5"
                    />
                    <polygon
                      points={`324,${210 - targetQ * 0.8 - 6} 336,${210 - targetQ * 0.8 - 6} 330,${210 - targetQ * 0.8}`}
                      fill="#10b981"
                    />
                    <text
                      x="340"
                      y={210 - (initialQ + targetQ) * 0.4}
                      fill="#10b981"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      Q_c = -{requiredQC.toFixed(1)} kVAR (Capacitor Bank)
                    </text>

                    {/* Corrected Net Height Q2 */}
                    <line
                      x1="330"
                      y1="210"
                      x2="330"
                      y2={210 - targetQ * 0.8}
                      stroke="#06b6d4"
                      strokeWidth="3.5"
                    />

                    {/* Corrected Reduced Hypotenuse S2 */}
                    <line
                      x1="50"
                      y1="210"
                      x2="330"
                      y2={210 - targetQ * 0.8}
                      stroke="#06b6d4"
                      strokeWidth="4"
                    />
                    <text
                      x="160"
                      y={210 - targetQ * 0.4 - 10}
                      fill="#06b6d4"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      S₂ = {targetS.toFixed(1)} kVA (Reduced by {kvaSaved.toFixed(1)} kVA!)
                    </text>
                  </>
                )}

                {/* Angle θ Arc */}
                <path
                  d="M 100 210 A 50 50 0 0 0 95 190"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <text x="110" y="200" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                  θ = {currentThetaDeg.toFixed(1)}°
                </text>
              </svg>
            </div>

            {/* Direct Numerical Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Useful Work (P)</span>
                <span className="font-mono text-base font-bold text-amber-400">{realPowerP} kW</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Net Magnetizing (Q)</span>
                <span className="font-mono text-base font-bold text-cyan-400">{currentQ.toFixed(1)} kVAR</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Total Grid kVA (S)</span>
                <span className="font-mono text-base font-bold text-white">{currentS.toFixed(1)} kVA</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase block">Line Amperes (480V)</span>
                <span className="font-mono text-base font-bold text-emerald-400">{currentLineAmps.toFixed(1)} A</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: BOARD EXAM FORMULA SOLVER (ONE-FORMULA MIRACLE) */}
      {/* ======================================================== */}
      {activeTab === 'board_solver' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                PRC Board Exam Standard Method
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                The Master Capacitor Bank Sizing Formula
              </h4>
            </div>

            {/* Master Formula Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono">
              <div className="text-lg sm:text-xl font-bold text-emerald-400">
                {'Q_c = P × [ tan(θ₁) - tan(θ₂) ]'}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {'Where θ₁ = arccos(pf₁) and θ₂ = arccos(pf₂)'}
              </div>
            </div>

            {/* Step-by-Step Live Numbers */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-900 text-cyan-200 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </div>
                <div>
                  <div className="font-bold text-white">{'Step 1: Find Initial Angle θ₁'}</div>
                  <div className="font-mono text-cyan-300 mt-0.5">
                    {`θ₁ = arccos(${initialPf.toFixed(2)}) = ${theta1Deg.toFixed(2)}° → tan(${theta1Deg.toFixed(2)}°) = ${Math.tan(theta1Rad).toFixed(4)}`}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-900 text-cyan-200 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </div>
                <div>
                  <div className="font-bold text-white">{'Step 2: Find Target Angle θ₂'}</div>
                  <div className="font-mono text-cyan-300 mt-0.5">
                    {`θ₂ = arccos(${targetPf.toFixed(2)}) = ${theta2Deg.toFixed(2)}° → tan(${theta2Deg.toFixed(2)}°) = ${Math.tan(theta2Rad).toFixed(4)}`}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-200 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  3
                </div>
                <div>
                  <div className="font-bold text-white">{'Step 3: Compute Required Capacitor Bank (Q_c)'}</div>
                  <div className="font-mono text-emerald-300 mt-0.5">
                    {`Q_c = ${realPowerP} × (${Math.tan(theta1Rad).toFixed(4)} - ${Math.tan(theta2Rad).toFixed(4)}) = `}
                    <strong className="text-emerald-400 text-sm">{requiredQC.toFixed(2)} kVAR</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Casio fx-991 Keystroke Tip */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-amber-400 block mb-0.5">Casio fx-991 Single-Line Keystroke:</span>
                <span className="font-mono text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  {realPowerP} × ( tan(cos⁻¹({initialPf})) - tan(cos⁻¹({targetPf})) ) =
                </span>
              </div>
              <span className="font-mono font-bold text-emerald-400 text-sm">{requiredQC.toFixed(1)} kVAR</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: BEFORE VS AFTER COMPARISON TABLE */}
      {/* ======================================================== */}
      {activeTab === 'comparison' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Before vs After Power Factor Correction
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="py-2.5 px-3">Parameter</th>
                    <th className="py-2.5 px-3 text-red-400">Before (0.70 pf Lagging)</th>
                    <th className="py-2.5 px-3 text-emerald-400">After ({targetPf.toFixed(2)} pf With Qc)</th>
                    <th className="py-2.5 px-3 text-cyan-400">Direct Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-300">Useful Work (P)</td>
                    <td className="py-2.5 px-3 text-amber-300">{realPowerP} kW</td>
                    <td className="py-2.5 px-3 text-amber-300">{realPowerP} kW</td>
                    <td className="py-2.5 px-3 text-slate-400">Identical shaft work</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-300">Grid Demand (S)</td>
                    <td className="py-2.5 px-3 text-slate-200">{initialS.toFixed(1)} kVA</td>
                    <td className="py-2.5 px-3 text-cyan-300">{targetS.toFixed(1)} kVA</td>
                    <td className="py-2.5 px-3 text-cyan-400">-{kvaSaved.toFixed(1)} kVA (-{((kvaSaved / initialS) * 100).toFixed(1)}%)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-300">Line Current (480V)</td>
                    <td className="py-2.5 px-3 text-red-400">{initialLineCurrent.toFixed(1)} A</td>
                    <td className="py-2.5 px-3 text-emerald-400">{correctedLineCurrent.toFixed(1)} A</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">-{ampsSavedPercent.toFixed(1)}% Amp Burden</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-300">Wire I²R Heating Losses</td>
                    <td className="py-2.5 px-3 text-red-400">100% (Baseline)</td>
                    <td className="py-2.5 px-3 text-emerald-400">{((correctedLineCurrent / initialLineCurrent) ** 2 * 100).toFixed(0)}%</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-bold">-{(100 - (correctedLineCurrent / initialLineCurrent) ** 2 * 100).toFixed(0)}% Less Heat in Wires</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-300">Electric Utility Penalty</td>
                    <td className="py-2.5 px-3 text-red-400">High Penalty Surcharge</td>
                    <td className="py-2.5 px-3 text-emerald-400">Zero Penalty (Qualifies for Rebate)</td>
                    <td className="py-2.5 px-3 text-emerald-400">Lower Monthly Bills</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
