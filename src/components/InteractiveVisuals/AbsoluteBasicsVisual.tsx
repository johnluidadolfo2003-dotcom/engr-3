import React, { useState, useEffect, useRef } from 'react';
import { AppLanguage } from '../../types';
import {
  Zap,
  Activity,
  Sliders,
  RotateCcw,
  Bot,
  Lightbulb,
  Layers,
  ArrowRight,
  Battery,
  AlertOctagon,
  CheckCircle2,
  HelpCircle,
  Play,
  Pause,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

type BasicMode = 'ohms_law' | 'simple_circuit' | 'circuit_states' | 'series_parallel' | 'water_analogy';

export const AbsoluteBasicsVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [activeMode, setActiveMode] = useState<BasicMode>('ohms_law');

  // Mode 1: Ohm's Law state
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(4); // Ohms
  const current = Number((voltage / (resistance || 0.1)).toFixed(2)); // Amperes
  const power = Number((voltage * current).toFixed(2)); // Watts

  // Mode 2: Simple Circuit state
  const [switchClosed, setSwitchClosed] = useState(true);
  const [batteryCells, setBatteryCells] = useState(2); // 1 = 1.5V, 2 = 3V, 4 = 6V, 8 = 12V
  const simpleCircuitVoltage = batteryCells * 1.5;
  const bulbResistance = 3; // Ohms
  const simpleCurrent = switchClosed ? Number((simpleCircuitVoltage / bulbResistance).toFixed(2)) : 0;
  const bulbBrightnessPercent = Math.min(100, Math.round((simpleCurrent / 4) * 100));

  // Mode 3: Circuit States
  const [circuitState, setCircuitState] = useState<'normal' | 'open' | 'short'>('normal');

  // Mode 4: Series vs Parallel
  const [connectionType, setConnectionType] = useState<'series' | 'parallel'>('series');
  const [bulb1Broken, setBulb1Broken] = useState(false);
  const [bulb2Broken, setBulb2Broken] = useState(false);

  // Animation ticks
  const [tick, setTick] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 3600);
    }, 40);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Dynamic electron animation offset calculation
  const speedMultiplier = Math.min(5, Math.max(0.2, current * 0.4));
  const electronOffset = (tick * speedMultiplier * 3) % 200;

  // Text translations
  const langText = {
    en: {
      tag: 'LEVEL 0 FUNDAMENTALS',
      title: 'Electricity From Scratch',
      subtitle: 'The absolute intuitive foundation: Push (V), Flow (I), and Squeeze (R)',
      modeOhms: "1. Ohm's Law Laboratory",
      modeSimple: '2. Battery & Bulb Loop',
      modeStates: '3. Normal vs Open vs Short',
      modeSeriesParallel: '4. Series vs Parallel Bulbs',
      modeWater: '5. Water Pipe Comparison',
      voltageLabel: 'Voltage (V) — The Push Force',
      resistanceLabel: 'Resistance (R) — The Squeeze',
      currentResult: 'Current (I) = Actual Electron Flow',
      powerResult: 'Power (P) = Work & Heat Done',
      switchLabel: 'Knife Switch:',
      switchOn: 'CLOSED (Circuit Complete)',
      switchOff: 'OPEN (Circuit Broken)',
      bulbBrightness: 'Bulb Filament Brightness',
      askTutorPrompt: 'Explain this basic concept in plain words',
    },
    tl: {
      tag: 'LEVEL 0: PINAKAPUNDASYON',
      title: 'Kuryente Mula sa Simula',
      subtitle: 'Ang pinakasimpleng konsepto: Tulak (V), Daloy (I), at Harang (R)',
      modeOhms: "1. Lab ng Batas ni Ohm",
      modeSimple: '2. Baterya at Bombilya',
      modeStates: '3. Normal vs Putol vs Short',
      modeSeriesParallel: '4. Series vs Parallel',
      modeWater: '5. Tubig at Tubo',
      voltageLabel: 'Voltage (V) — Ang Tulak ng Baterya',
      resistanceLabel: 'Resistance (R) — Ang Harang o Sikip',
      currentResult: 'Current (I) = Aktwal na Daloy ng Kuryente',
      powerResult: 'Power (P) = Liwanag at Init',
      switchLabel: 'Switch:',
      switchOn: 'NAKASARA (Buo ang Loop)',
      switchOff: 'NAKABUKAS (Putol ang Kuryente)',
      bulbBrightness: 'Liwanag ng Bombilya',
      askTutorPrompt: 'Engr. Ramos, ipaliwanag ang pinakapundasyon sa Tagalog',
    },
    ceb: {
      tag: 'LEVEL 0: SINUGDANAN SA KURYENTE',
      title: 'Kuryente Gikan sa Sinugdanan',
      subtitle: 'Ang kinayanoang pundasyon: Tukmod (V), Agas (I), ug Babag (R)',
      modeOhms: "1. Batas ni Ohm Lab",
      modeSimple: '2. Baterya ug Suga',
      modeStates: '3. Normal vs Putol vs Short',
      modeSeriesParallel: '4. Series vs Parallel nga Suga',
      modeWater: '5. Pagtandi sa Tubo sa Tubig',
      voltageLabel: 'Voltage (V) — Ang Tukmod sa Baterya',
      resistanceLabel: 'Resistance (R) — Ang Babag sa Alambre',
      currentResult: 'Current (I) = Ang Agas sa Kuryente',
      powerResult: 'Power (P) = Hayag ug Kainit',
      switchLabel: 'Switch:',
      switchOn: 'SIRADO (Kompleto ang Alambre)',
      switchOff: 'ABLI (Putol ang Kuryente)',
      bulbBrightness: 'Kahayag sa Suga',
      askTutorPrompt: 'Engr. Ramos, ipasabot ang pinakasimpleng kuryente sa Bisaya',
    },
  }[language];

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-sans">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-[10px] font-bold tracking-wider">
              {langText.tag}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Zero Prior Math Needed · Visual Physical Mental Models
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {langText.title}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">{langText.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title={isPaused ? 'Resume electron flow' : 'Pause electron flow'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isPaused ? 'Play' : 'Pause'}</span>
          </button>

          <button
            onClick={() => {
              const prompt =
                language === 'tl'
                  ? 'Engr. Ramos, pakipaliwanag po sa akin sa pinakasimpleng paraan sa Tagalog: Ano ba talaga ang Voltage, Current, at Resistance at paano gumagana ang circuit?'
                  : language === 'ceb'
                  ? 'Engr. Ramos, paki-explain sa pinakasimpleng paagi sa Bisaya: Unsa man gyud ang Voltage, Current, ug Resistance?'
                  : 'Please explain the absolute physical basics of electricity (Voltage as push, Current as electron flow, Resistance as friction) in simple, crystal-clear intuitive terms with real-world examples.';
              onOpenTutor?.('Electricity From Scratch', prompt);
            }}
            className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-200" />
            <span>{language === 'tl' ? 'Tanungin ang Guro' : language === 'ceb' ? 'Pangutana sa Guro' : 'Ask Tutor'}</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="p-2 bg-slate-900 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {(
          [
            { id: 'ohms_law', label: langText.modeOhms, icon: Sliders },
            { id: 'simple_circuit', label: langText.modeSimple, icon: Lightbulb },
            { id: 'circuit_states', label: langText.modeStates, icon: AlertOctagon },
            { id: 'series_parallel', label: langText.modeSeriesParallel, icon: Layers },
            { id: 'water_analogy', label: langText.modeWater, icon: Activity },
          ] as const
        ).map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isActive
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* MODE 1: OHM'S LAW LABORATORY */}
      {activeMode === 'ohms_law' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Top 3 Core Concepts Pill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-800/80">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-400 mb-1">
                <span>VOLTAGE (V)</span>
                <span className="font-mono text-cyan-300 text-sm">{voltage} V</span>
              </div>
              <div className="text-xs font-semibold text-white">The PUSH Force</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                The battery or generator exerting electrical pressure on electrons.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-800/80">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
                <span>RESISTANCE (R)</span>
                <span className="font-mono text-amber-300 text-sm">{resistance} Ω</span>
              </div>
              <div className="text-xs font-semibold text-white">The SQUEEZE Obstacle</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Friction and constriction fighting against the movement of charges.
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
                <span>CURRENT (I)</span>
                <span className="font-mono text-emerald-300 text-sm">{current} A</span>
              </div>
              <div className="text-xs font-semibold text-white">The ACTUAL FLOW</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                How many electrons pass through every second: <strong>I = V ÷ R</strong>.
              </div>
            </div>
          </div>

          {/* Interactive Mechanical Pipe Simulation Canvas */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-slate-300">
                Visual Flow Simulation
              </span>
              <span className="font-mono text-cyan-400">
                Flow Rate: {current} Coulombs / second ({current} Amperes)
              </span>
            </div>

            {/* SVG Interactive Pipe */}
            <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Grid pattern */}
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="600" height="200" fill="url(#grid)" />

                {/* Main Pipe Outer Tube */}
                <rect x="50" y="60" width="500" height="80" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                {/* Left side: Voltage Piston / Pump */}
                <rect
                  x="50"
                  y="62"
                  width={30 + voltage * 3}
                  height="76"
                  fill="#0369a1"
                  opacity="0.85"
                />
                <line
                  x1={80 + voltage * 3}
                  y1="60"
                  x2={80 + voltage * 3}
                  y2="140"
                  stroke="#38bdf8"
                  strokeWidth="4"
                />
                <text
                  x={60 + voltage * 1.5}
                  y="105"
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  PUSH: {voltage}V
                </text>

                {/* Middle: Resistance Constriction Valve / Squeeze */}
                {/* Upper squeeze clamp */}
                <rect
                  x="280"
                  y="60"
                  width="40"
                  height={Math.min(32, resistance * 2.8)}
                  fill="#92400e"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                />
                {/* Lower squeeze clamp */}
                <rect
                  x="280"
                  y={140 - Math.min(32, resistance * 2.8)}
                  width="40"
                  height={Math.min(32, resistance * 2.8)}
                  fill="#92400e"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                />
                <text x="300" y="105" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {resistance}Ω
                </text>

                {/* Animated Moving Electrons (Blue spheres passing through pipe) */}
                {Array.from({ length: 14 }).map((_, i) => {
                  const baseSpacing = 35;
                  const xPos = 60 + ((i * baseSpacing + electronOffset) % 470);
                  const isSqueezed = xPos >= 270 && xPos <= 330;
                  const yPos = isSqueezed
                    ? 100 + Math.sin(i * 1.5) * (8 - Math.min(6, resistance * 0.4))
                    : 100 + Math.sin(i * 1.2) * 22;

                  return (
                    <g key={i}>
                      <circle
                        cx={xPos}
                        cy={yPos}
                        r={isSqueezed ? 3.5 : 5}
                        fill="#38bdf8"
                        stroke="#0284c7"
                        strokeWidth="1"
                      />
                      <text
                        x={xPos}
                        y={yPos + 3}
                        fill="#0f172a"
                        fontSize="8"
                        fontWeight="black"
                        textAnchor="middle"
                      >
                        e⁻
                      </text>
                    </g>
                  );
                })}

                {/* Labels */}
                <text x="70" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  ▲ 1. BATTERY VOLTAGE (PUSH)
                </text>
                <text x="300" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ▲ 2. RESISTOR PINCH (OBSTACLE)
                </text>
                <text x="520" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="end">
                  ▲ 3. RESULTING CURRENT (FLOW)
                </text>
              </svg>
            </div>

            {/* Dynamic Sizing Mathematical Formula */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
              <div>
                <div className="text-[11px] text-slate-400 font-mono mb-1">Ohm's Law Equation:</div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center justify-center gap-2">
                  <span className="text-emerald-400">I</span>
                  <span>=</span>
                  <div className="inline-flex flex-col items-center">
                    <span className="text-cyan-400 border-b-2 border-slate-600 px-2">{voltage} V</span>
                    <span className="text-amber-400 px-2">{resistance} Ω</span>
                  </div>
                  <span>=</span>
                  <span className="text-emerald-400 bg-emerald-950 px-3 py-1 rounded-lg border border-emerald-800">
                    {current} Amperes
                  </span>
                </div>
              </div>

              <div className="text-left text-xs text-slate-300 border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-5 space-y-1">
                <div>
                  • <strong>Double the Push (Voltage):</strong> Current doubles from {current} A to {(current * 2).toFixed(1)} A.
                </div>
                <div>
                  • <strong>Double the Squeeze (Resistance):</strong> Current cuts in half to {(current / 2).toFixed(1)} A.
                </div>
                <div>
                  • <strong>Power Dissipated (Heat / Work):</strong> P = V × I = {voltage} × {current} = <strong className="text-amber-300">{power} Watts</strong>.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Parameter Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <Battery className="w-4 h-4" />
                  <span>Battery Push (Voltage: V)</span>
                </span>
                <span className="font-mono text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {voltage} Volts
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 V (Gentle push)</span>
                <span>12 V (Car battery)</span>
                <span>24 V (Truck push)</span>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>Wire Squeeze (Resistance: R)</span>
                </span>
                <span className="font-mono text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {resistance} Ohms (Ω)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={resistance}
                onChange={(e) => setResistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 Ω (Wide open pipe)</span>
                <span>6 Ω (Standard load)</span>
                <span>12 Ω (Tight squeeze)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SIMPLE CIRCUIT LOOP (BATTERY + SWITCH + BULB) */}
      {activeMode === 'simple_circuit' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                1. Battery Power Source
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono text-cyan-400">
                  {simpleCircuitVoltage} V
                </span>
                <span className="text-xs text-slate-400">
                  ({batteryCells} × 1.5V AA cells)
                </span>
              </div>
              <div className="flex gap-1.5 pt-1">
                {[1, 2, 4, 8].map((cells) => (
                  <button
                    key={cells}
                    onClick={() => setBatteryCells(cells)}
                    className={`flex-1 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                      batteryCells === cells
                        ? 'bg-cyan-700 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cells * 1.5}V
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                2. Knife Switch State
              </div>
              <button
                onClick={() => setSwitchClosed(!switchClosed)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                  switchClosed
                    ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                    : 'bg-red-900/80 hover:bg-red-800 text-red-200 border border-red-700'
                }`}
              >
                <span>{switchClosed ? langText.switchOn : langText.switchOff}</span>
              </button>
              <div className="text-[11px] text-slate-400 text-center">
                {switchClosed
                  ? 'Complete continuous loop for electrons'
                  : 'Air gap prevents any electron movement'}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wide text-slate-400">
                3. Light Bulb Output
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Current Flow:</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {simpleCurrent} A
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Brightness:</span>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {bulbBrightnessPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Circuit Schematic SVG */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 240" preserveAspectRatio="xMidYMid meet">
                {/* Copper Wires Loop */}
                {/* Top wire */}
                <line x1="120" y1="50" x2="380" y2="50" stroke="#d97706" strokeWidth="4" />
                {/* Bottom wire */}
                <line x1="120" y1="190" x2="380" y2="190" stroke="#d97706" strokeWidth="4" />
                {/* Left wire */}
                <line x1="120" y1="50" x2="120" y2="90" stroke="#d97706" strokeWidth="4" />
                <line x1="120" y1="150" x2="120" y2="190" stroke="#d97706" strokeWidth="4" />
                {/* Right wire */}
                <line x1="380" y1="50" x2="380" y2="90" stroke="#d97706" strokeWidth="4" />
                <line x1="380" y1="150" x2="380" y2="190" stroke="#d97706" strokeWidth="4" />

                {/* Left: Battery Source */}
                <rect x="100" y="90" width="40" height="60" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <line x1="110" y1="105" x2="130" y2="105" stroke="#ffffff" strokeWidth="3" />
                <line x1="120" y1="95" x2="120" y2="115" stroke="#ffffff" strokeWidth="3" />
                <line x1="112" y1="135" x2="128" y2="135" stroke="#ffffff" strokeWidth="3" />
                <text x="80" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="end">
                  {simpleCircuitVoltage}V
                </text>

                {/* Top: Knife Switch */}
                <circle cx="230" cy="50" r="5" fill="#d97706" />
                <circle cx="270" cy="50" r="5" fill="#d97706" />
                {switchClosed ? (
                  <line x1="230" y1="50" x2="270" y2="50" stroke="#22c55e" strokeWidth="4" />
                ) : (
                  <line x1="230" y1="50" x2="265" y2="28" stroke="#ef4444" strokeWidth="4" />
                )}
                <text x="250" y="20" fill={switchClosed ? '#22c55e' : '#ef4444'} fontSize="10" fontWeight="bold" textAnchor="middle">
                  {switchClosed ? 'SWITCH CLOSED' : 'SWITCH OPEN'}
                </text>

                {/* Right: Light Bulb with Radial Glow */}
                {switchClosed && (
                  <circle
                    cx="380"
                    cy="120"
                    r={20 + bulbBrightnessPercent * 0.3}
                    fill="#fbbf24"
                    opacity={0.15 + (bulbBrightnessPercent / 100) * 0.4}
                  />
                )}
                <circle
                  cx="380"
                  cy="120"
                  r="18"
                  fill={switchClosed ? '#fef08a' : '#334155'}
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
                {/* Bulb Filament */}
                <path
                  d="M 374 125 L 378 112 L 382 112 L 386 125"
                  fill="none"
                  stroke={switchClosed ? '#dc2626' : '#64748b'}
                  strokeWidth="2"
                />
                <text x="410" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  {bulbResistance}Ω Load
                </text>

                {/* Moving Electrons when switch is closed */}
                {switchClosed && (
                  <>
                    {/* Top wire electrons moving left-to-right or right-to-left */}
                    <circle cx={140 + ((tick * 4) % 220)} cy="50" r="4" fill="#38bdf8" />
                    <circle cx={140 + (((tick * 4) + 70) % 220)} cy="50" r="4" fill="#38bdf8" />
                    <circle cx={140 + (((tick * 4) + 140) % 220)} cy="50" r="4" fill="#38bdf8" />

                    {/* Bottom wire electrons */}
                    <circle cx={360 - ((tick * 4) % 220)} cy="190" r="4" fill="#38bdf8" />
                    <circle cx={360 - (((tick * 4) + 70) % 220)} cy="190" r="4" fill="#38bdf8" />
                    <circle cx={360 - (((tick * 4) + 140) % 220)} cy="190" r="4" fill="#38bdf8" />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: NORMAL VS OPEN VS SHORT CIRCUIT */}
      {activeMode === 'circuit_states' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Selector for 3 Circuit States */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setCircuitState('normal')}
              className={`p-4 rounded-xl border text-left transition-colors ${
                circuitState === 'normal'
                  ? 'bg-emerald-950/80 border-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>1. Normal Circuit</span>
              </div>
              <div className="text-xs text-slate-300">
                Safe load resistance ({resistance} Ω). Safe controlled current flows.
              </div>
            </button>

            <button
              onClick={() => setCircuitState('open')}
              className={`p-4 rounded-xl border text-left transition-colors ${
                circuitState === 'open'
                  ? 'bg-amber-950/80 border-amber-600 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-amber-400 mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>2. Open Circuit</span>
              </div>
              <div className="text-xs text-slate-300">
                Broken wire or switch off (R = ∞). 0 Amperes flow. No power used.
              </div>
            </button>

            <button
              onClick={() => setCircuitState('short')}
              className={`p-4 rounded-xl border text-left transition-colors ${
                circuitState === 'short'
                  ? 'bg-red-950/80 border-red-600 text-white shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-red-400 mb-1">
                <AlertOctagon className="w-4 h-4" />
                <span>3. Short Circuit (Danger!)</span>
              </div>
              <div className="text-xs text-slate-300">
                Direct copper path with R ≈ 0 Ω. Dangerous current surge (Trips breaker).
              </div>
            </button>
          </div>

          {/* Demonstration Canvas */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider">
                Condition Analysis
              </span>
              <span
                className={`font-mono font-bold px-2.5 py-1 rounded ${
                  circuitState === 'normal'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : circuitState === 'open'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-red-950 text-red-300 border border-red-800'
                }`}
              >
                {circuitState === 'normal' && 'Status: SAFE LOAD OPERATING'}
                {circuitState === 'open' && 'Status: CIRCUIT BROKEN (0 AMPS)'}
                {circuitState === 'short' && 'Status: SHORT CIRCUIT OVERLOAD'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              {circuitState === 'normal' && (
                <p>
                  In a <strong>Normal Circuit</strong>, the load resistor provides healthy opposition.
                  Current is limited to <strong className="text-emerald-400">I = V ÷ R = 12V ÷ 4Ω = 3.0 Amperes</strong>.
                  Energy is converted safely into light and useful work.
                </p>
              )}
              {circuitState === 'open' && (
                <p>
                  In an <strong>Open Circuit</strong>, there is a physical gap in the conductor. Air has nearly infinite resistance ($R = \infty$).
                  According to Ohm's Law: <strong className="text-amber-400">I = 12V ÷ ∞ = 0.00 Amperes</strong>.
                  Zero current moves and no equipment operates.
                </p>
              )}
              {circuitState === 'short' && (
                <p className="text-red-300">
                  In a <strong>Short Circuit</strong>, a direct accidental bypass touches (+) to (-) with no load ($R \to 0.01\ \Omega$).
                  Ohm's Law forces current to skyrocket: <strong className="text-red-400">I = 12V ÷ 0.01Ω = 1,200 Amperes!</strong>
                  This causes rapid overheating, melted wires, and fire hazard if not stopped by a circuit breaker.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: SERIES VS PARALLEL */}
      {activeMode === 'series_parallel' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setConnectionType('series');
                setBulb1Broken(false);
                setBulb2Broken(false);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                connectionType === 'series'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Series Connection (Single Line)
            </button>
            <button
              onClick={() => {
                setConnectionType('parallel');
                setBulb1Broken(false);
                setBulb2Broken(false);
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                connectionType === 'parallel'
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Parallel Connection (Independent Branches)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interactive Bulb Removal Controls */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Interactive Bulb Testing
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setBulb1Broken(!bulb1Broken)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    bulb1Broken
                      ? 'bg-red-950 border border-red-700 text-red-200'
                      : 'bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span>Bulb 1 Status:</span>
                  <span className="font-bold">{bulb1Broken ? 'UNSCREWED / BURNT OUT' : 'WORKING (6Ω)'}</span>
                </button>

                <button
                  onClick={() => setBulb2Broken(!bulb2Broken)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                    bulb2Broken
                      ? 'bg-red-950 border border-red-700 text-red-200'
                      : 'bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span>Bulb 2 Status:</span>
                  <span className="font-bold">{bulb2Broken ? 'UNSCREWED / BURNT OUT' : 'WORKING (6Ω)'}</span>
                </button>
              </div>
            </div>

            {/* Live Comparison Output */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {connectionType === 'series' ? 'Series Behavior:' : 'Parallel Behavior:'}
              </div>
              {connectionType === 'series' ? (
                <div className="space-y-1.5 text-slate-300">
                  <div>• <strong>Current has only 1 path:</strong> R_total = 6Ω + 6Ω = 12Ω.</div>
                  <div>• <strong>Voltage divides:</strong> Each bulb gets 6V (Half brightness).</div>
                  <div className="text-amber-300">
                    • <strong>If one bulb fails:</strong> The entire loop breaks! Both bulbs turn OFF.
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 text-slate-300">
                  <div>• <strong>Current has 2 separate lanes:</strong> R_total = (6 × 6) ÷ (6 + 6) = 3Ω.</div>
                  <div>• <strong>Both get full voltage:</strong> Each bulb receives full 12V (Full brightness).</div>
                  <div className="text-emerald-300">
                    • <strong>If one bulb fails:</strong> The other bulb continues shining with zero interruption! (How house wiring works).
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: WATER PIPE ANALOGY */}
      {activeMode === 'water_analogy' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-cyan-400 font-bold text-xs uppercase mb-1">Water Pressure</div>
              <div className="text-white font-semibold">= VOLTAGE (Volts)</div>
              <p className="text-slate-400 text-[11px] mt-1">
                The higher the water tank, the more gravitational pressure pushes water through the pipes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-amber-400 font-bold text-xs uppercase mb-1">Pipe Narrowing / Valve</div>
              <div className="text-white font-semibold">= RESISTANCE (Ohms)</div>
              <p className="text-slate-400 text-[11px] mt-1">
                A narrow straw or partially closed faucet restricts how fast water can pass.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-emerald-400 font-bold text-xs uppercase mb-1">Liters per Second</div>
              <div className="text-white font-semibold">= CURRENT (Amperes)</div>
              <p className="text-slate-400 text-[11px] mt-1">
                The actual rate of water volume (or electrons) flowing out the end per second.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
