import React, { useState, useEffect } from 'react';
import { AppLanguage } from '../../types';
import {
  Zap,
  Activity,
  Sliders,
  RotateCcw,
  Bot,
  ToggleLeft,
  ToggleRight,
  Lightbulb,
  Cpu,
  Split,
  Layers,
  TrendingUp,
  Battery,
  Flame,
  ArrowRight,
  CheckCircle2,
  Gauge,
  HelpCircle,
  X,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

type CircuitMode = 'single' | 'series' | 'parallel' | 'combination' | 'max_power';

export const DcCircuitSimVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [mode, setMode] = useState<CircuitMode>('single');
  const [voltage, setVoltage] = useState(12); // Volts DC
  const [r1, setR1] = useState(4); // Ohms
  const [r2, setR2] = useState(6); // Ohms
  const [r3, setR3] = useState(12); // Ohms
  const [internalR, setInternalR] = useState(2); // Ohms
  const [isSwitchClosed, setIsSwitchClosed] = useState(true);
  const [showBulbView, setShowBulbView] = useState(true);
  const [showQuickRules, setShowQuickRules] = useState(false);
  const [animTime, setAnimTime] = useState(0);

  // Animation Loop for Electron Flow
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setAnimTime((prev) => (prev + 1) % 1000);
      animId = requestAnimationFrame(animate);
    };
    if (isSwitchClosed) {
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isSwitchClosed]);

  // Calculations based on mode
  let totalResistance = 0;
  let totalCurrent = 0;
  let totalPower = 0;

  let vR1 = 0;
  let iR1 = 0;
  let pR1 = 0;

  let vR2 = 0;
  let iR2 = 0;
  let pR2 = 0;

  let vR3 = 0;
  let iR3 = 0;
  let pR3 = 0;

  let pLoad = 0;
  let pInternal = 0;

  if (isSwitchClosed) {
    if (mode === 'single') {
      totalResistance = r1;
      totalCurrent = voltage / Math.max(0.001, totalResistance);
      totalPower = voltage * totalCurrent;
      vR1 = voltage;
      iR1 = totalCurrent;
      pR1 = totalPower;
    } else if (mode === 'series') {
      totalResistance = r1 + r2;
      totalCurrent = voltage / Math.max(0.001, totalResistance);
      totalPower = voltage * totalCurrent;

      vR1 = totalCurrent * r1;
      iR1 = totalCurrent;
      pR1 = vR1 * iR1;

      vR2 = totalCurrent * r2;
      iR2 = totalCurrent;
      pR2 = vR2 * iR2;
    } else if (mode === 'parallel') {
      totalResistance = (r1 * r2) / Math.max(0.001, r1 + r2);
      iR1 = voltage / Math.max(0.001, r1);
      vR1 = voltage;
      pR1 = vR1 * iR1;

      iR2 = voltage / Math.max(0.001, r2);
      vR2 = voltage;
      pR2 = vR2 * iR2;

      totalCurrent = iR1 + iR2;
      totalPower = voltage * totalCurrent;
    } else if (mode === 'combination') {
      const rParallel23 = (r2 * r3) / Math.max(0.001, r2 + r3);
      totalResistance = r1 + rParallel23;
      totalCurrent = voltage / Math.max(0.001, totalResistance);
      totalPower = voltage * totalCurrent;

      vR1 = totalCurrent * r1;
      iR1 = totalCurrent;
      pR1 = vR1 * iR1;

      const vParallel = voltage - vR1;
      vR2 = vParallel;
      iR2 = vParallel / Math.max(0.001, r2);
      pR2 = vR2 * iR2;

      vR3 = vParallel;
      iR3 = vParallel / Math.max(0.001, r3);
      pR3 = vR3 * iR3;
    } else if (mode === 'max_power') {
      totalResistance = internalR + r1;
      totalCurrent = voltage / Math.max(0.001, totalResistance);
      totalPower = voltage * totalCurrent;

      vR1 = totalCurrent * r1;
      iR1 = totalCurrent;
      pLoad = vR1 * iR1;

      const vInt = totalCurrent * internalR;
      pInternal = vInt * totalCurrent;
      pR1 = pLoad;
    }
  }

  // Maximum power transfer curve
  const maxPowerPoints: { rL: number; pL: number }[] = [];
  if (mode === 'max_power') {
    for (let rl = 0.5; rl <= 10; rl += 0.5) {
      const iL = voltage / (internalR + rl);
      const p = iL * iL * rl;
      maxPowerPoints.push({ rL: rl, pL: p });
    }
  }
  const maxPossiblePower = (voltage * voltage) / (4 * Math.max(0.001, internalR));

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-md space-y-3.5">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center text-cyan-400">
            <Battery className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              DC Fundamentals
            </div>
            <h4 className="text-base font-bold text-white">
              {mode === 'single' && "Ohm's Law: V = I · R"}
              {mode === 'series' && "Series Circuit (KVL: ΣV = 0)"}
              {mode === 'parallel' && "Parallel Circuit (KCL: ΣI = 0)"}
              {mode === 'combination' && "Series-Parallel Bridge"}
              {mode === 'max_power' && "Max Power Transfer (R_L = r_int)"}
            </h4>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsSwitchClosed(!isSwitchClosed)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              isSwitchClosed
                ? 'bg-emerald-950/80 border-emerald-600/70 text-emerald-300'
                : 'bg-red-950/80 border-red-600/70 text-red-300'
            }`}
          >
            {isSwitchClosed ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            <span>{isSwitchClosed ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setShowBulbView(!showBulbView)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              showBulbView
                ? 'bg-amber-950/80 border-amber-600/70 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showBulbView ? 'Bulb' : 'Resistor'}</span>
          </button>

          <button
            onClick={() => setShowQuickRules(!showQuickRules)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Formulas"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Circuit Topologies Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
        <button
          onClick={() => {
            setMode('single');
            setR1(4);
            setVoltage(12);
          }}
          className={`px-3 py-2 rounded-lg border font-semibold transition-colors flex items-center gap-2 ${
            mode === 'single'
              ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
              : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">1. Single V=I·R</span>
        </button>

        <button
          onClick={() => {
            setMode('series');
            setR1(4);
            setR2(6);
            setVoltage(12);
          }}
          className={`px-3 py-2 rounded-lg border font-semibold transition-colors flex items-center gap-2 ${
            mode === 'series'
              ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
              : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">2. Series (KVL)</span>
        </button>

        <button
          onClick={() => {
            setMode('parallel');
            setR1(6);
            setR2(12);
            setVoltage(12);
          }}
          className={`px-3 py-2 rounded-lg border font-semibold transition-colors flex items-center gap-2 ${
            mode === 'parallel'
              ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
              : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
          }`}
        >
          <Split className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">3. Parallel (KCL)</span>
        </button>

        <button
          onClick={() => {
            setMode('combination');
            setR1(3);
            setR2(6);
            setR3(12);
            setVoltage(12);
          }}
          className={`px-3 py-2 rounded-lg border font-semibold transition-colors flex items-center gap-2 ${
            mode === 'combination'
              ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
              : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="truncate">4. Bridge</span>
        </button>

        <button
          onClick={() => {
            setMode('max_power');
            setInternalR(2);
            setR1(2);
            setVoltage(12);
          }}
          className={`px-3 py-2 rounded-lg border font-semibold transition-colors flex items-center gap-2 ${
            mode === 'max_power'
              ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
              : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-300'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">5. Max Power</span>
        </button>
      </div>

      {/* Formulas Accordion */}
      {showQuickRules && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs flex items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-[11px] font-mono">
            <div>
              <span className="text-amber-400 font-bold block">Ohm's Law:</span>
              <span className="text-slate-300">V = I · R | P = V · I = I²R</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold block">KVL (Series):</span>
              <span className="text-slate-300">R_total = R₁ + R₂ | V_s = V₁ + V₂</span>
            </div>
            <div>
              <span className="text-emerald-400 font-bold block">KCL (Parallel):</span>
              <span className="text-slate-300">1/R_p = 1/R₁ + 1/R₂ | I_s = I₁ + I₂</span>
            </div>
          </div>
          <button onClick={() => setShowQuickRules(false)} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Schematic Canvas */}
      <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
        <svg viewBox="0 0 540 240" className="w-full max-w-[540px] h-auto select-none">
          {/* Main Loop Wires */}
          <line x1="60" y1="60" x2="60" y2="105" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="60" y1="140" x2="60" y2="190" stroke="#0284c7" strokeWidth="2.5" />

          {/* Battery DC Symbol */}
          <g>
            <line x1="42" y1="110" x2="78" y2="110" stroke="#dc2626" strokeWidth="3.5" />
            <line x1="50" y1="135" x2="70" y2="135" stroke="#0284c7" strokeWidth="5" />
            <text x="25" y="126" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="end">
              {voltage}V DC
            </text>
          </g>

          {/* Top Line with Switch */}
          <line x1="60" y1="60" x2="130" y2="60" stroke="#0284c7" strokeWidth="2.5" />
          <g className="cursor-pointer" onClick={() => setIsSwitchClosed(!isSwitchClosed)}>
            <circle cx="130" cy="60" r="3.5" fill="#f59e0b" />
            <circle cx="170" cy="60" r="3.5" fill="#f59e0b" />
            {isSwitchClosed ? (
              <line x1="130" y1="60" x2="170" y2="60" stroke="#f59e0b" strokeWidth="3" />
            ) : (
              <line x1="130" y1="60" x2="165" y2="40" stroke="#dc2626" strokeWidth="3" />
            )}
            <text x="150" y="34" fill="#94a3b8" fontSize="9" textAnchor="middle">
              Switch ({isSwitchClosed ? 'CLOSED' : 'OPEN'})
            </text>
          </g>
          <line x1="170" y1="60" x2="220" y2="60" stroke="#0284c7" strokeWidth="2.5" />

          {/* Bottom Wire */}
          <line x1="60" y1="190" x2="470" y2="190" stroke="#0284c7" strokeWidth="2.5" />

          {/* Single Load */}
          {mode === 'single' && (
            <>
              <line x1="220" y1="60" x2="430" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="430" y1="60" x2="430" y2="95" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="430" y1="155" x2="430" y2="190" stroke="#0284c7" strokeWidth="2.5" />

              {showBulbView ? (
                <g transform="translate(430, 125)">
                  <circle
                    cx="0"
                    cy="0"
                    r="20"
                    fill={isSwitchClosed ? `rgba(245, 158, 11, ${Math.min(1, pR1 / 35)})` : '#1e293b'}
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                  <path d="M -7 7 Q 0 -10 7 7" stroke="#fef08a" strokeWidth="1.5" fill="none" />
                  <text x="28" y="4" fill="#f59e0b" fontSize="11" fontWeight="bold">
                    R₁ = {r1}Ω ({pR1.toFixed(1)}W)
                  </text>
                </g>
              ) : (
                <g transform="translate(430, 125)">
                  <rect x="-12" y="-25" width="24" height="50" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                  <text x="0" y="4" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {r1}Ω
                  </text>
                  <text x="20" y="4" fill="#94a3b8" fontSize="10">
                    {vR1.toFixed(1)}V, {iR1.toFixed(2)}A
                  </text>
                </g>
              )}
            </>
          )}

          {/* Series Load */}
          {mode === 'series' && (
            <>
              <line x1="220" y1="60" x2="270" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              {/* R1 */}
              <g transform="translate(305, 60)">
                <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="0" y="3" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                  R₁ = {r1}Ω
                </text>
                <text x="0" y="-16" fill="#f59e0b" fontSize="9" textAnchor="middle">
                  V₁ = {vR1.toFixed(1)}V
                </text>
              </g>
              <line x1="335" y1="60" x2="385" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              {/* R2 */}
              <g transform="translate(420, 60)">
                <rect x="-30" y="-12" width="60" height="24" rx="4" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                <text x="0" y="3" fill="#0ea5e9" fontSize="10" fontWeight="bold" textAnchor="middle">
                  R₂ = {r2}Ω
                </text>
                <text x="0" y="-16" fill="#0ea5e9" fontSize="9" textAnchor="middle">
                  V₂ = {vR2.toFixed(1)}V
                </text>
              </g>
              <line x1="450" y1="60" x2="470" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="470" y1="60" x2="470" y2="190" stroke="#0284c7" strokeWidth="2.5" />
            </>
          )}

          {/* Parallel Load */}
          {mode === 'parallel' && (
            <>
              <line x1="220" y1="60" x2="450" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              {/* Branch 1 */}
              <circle cx="320" cy="60" r="3.5" fill="#0284c7" />
              <line x1="320" y1="60" x2="320" y2="95" stroke="#0284c7" strokeWidth="2" />
              <g transform="translate(320, 125)">
                <rect x="-12" y="-25" width="24" height="50" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="0" y="4" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {r1}Ω
                </text>
                <text x="18" y="-5" fill="#f59e0b" fontSize="9">
                  I₁={iR1.toFixed(2)}A
                </text>
              </g>
              <line x1="320" y1="155" x2="320" y2="190" stroke="#0284c7" strokeWidth="2" />
              <circle cx="320" cy="190" r="3.5" fill="#0284c7" />

              {/* Branch 2 */}
              <circle cx="450" cy="60" r="3.5" fill="#0284c7" />
              <line x1="450" y1="60" x2="450" y2="95" stroke="#0284c7" strokeWidth="2" />
              <g transform="translate(450, 125)">
                <rect x="-12" y="-25" width="24" height="50" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="0" y="4" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {r2}Ω
                </text>
                <text x="18" y="-5" fill="#10b981" fontSize="9">
                  I₂={iR2.toFixed(2)}A
                </text>
              </g>
              <line x1="450" y1="155" x2="450" y2="190" stroke="#0284c7" strokeWidth="2" />
              <circle cx="450" cy="190" r="3.5" fill="#0284c7" />
            </>
          )}

          {/* Combination Load */}
          {mode === 'combination' && (
            <>
              <line x1="220" y1="60" x2="250" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              <g transform="translate(280, 60)">
                <rect x="-25" y="-12" width="50" height="24" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="0" y="3" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                  R₁={r1}Ω
                </text>
              </g>
              <line x1="305" y1="60" x2="370" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="370" cy="60" r="3" fill="#0284c7" />
              <line x1="370" y1="60" x2="460" y2="60" stroke="#0284c7" strokeWidth="2" />

              {/* R2 */}
              <line x1="370" y1="60" x2="370" y2="95" stroke="#0284c7" strokeWidth="1.5" />
              <g transform="translate(370, 125)">
                <rect x="-12" y="-22" width="24" height="44" rx="4" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
                <text x="0" y="3" fill="#0ea5e9" fontSize="9" fontWeight="bold" textAnchor="middle">
                  {r2}Ω
                </text>
              </g>
              <line x1="370" y1="150" x2="370" y2="190" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="370" cy="190" r="3" fill="#0284c7" />

              {/* R3 */}
              <line x1="460" y1="60" x2="460" y2="95" stroke="#0284c7" strokeWidth="1.5" />
              <g transform="translate(460, 125)">
                <rect x="-12" y="-22" width="24" height="44" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                <text x="0" y="3" fill="#a855f7" fontSize="9" fontWeight="bold" textAnchor="middle">
                  {r3}Ω
                </text>
              </g>
              <line x1="460" y1="150" x2="460" y2="190" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="460" cy="190" r="3" fill="#0284c7" />
            </>
          )}

          {/* Max Power Load */}
          {mode === 'max_power' && (
            <>
              {/* Internal r */}
              <line x1="220" y1="60" x2="240" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              <g transform="translate(270, 60)">
                <rect x="-25" y="-12" width="50" height="24" rx="4" fill="#334155" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="0" y="3" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">
                  r={internalR}Ω
                </text>
              </g>
              <line x1="295" y1="60" x2="430" y2="60" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="430" y1="60" x2="430" y2="95" stroke="#0284c7" strokeWidth="2.5" />

              {/* Variable Load RL */}
              <g transform="translate(430, 125)">
                <rect
                  x="-14"
                  y="-25"
                  width="28"
                  height="50"
                  rx="4"
                  fill="#0f172a"
                  stroke={r1 === internalR ? '#10b981' : '#f59e0b'}
                  strokeWidth="2.5"
                />
                <line x1="-18" y1="28" x2="18" y2="-28" stroke="#f8fafc" strokeWidth="1.5" />
                <text x="0" y="4" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                  R_L={r1}Ω
                </text>
                <text x="24" y="4" fill="#10b981" fontSize="10" fontWeight="bold">
                  P_L = {pLoad.toFixed(2)}W
                </text>
              </g>
              <line x1="430" y1="155" x2="430" y2="190" stroke="#0284c7" strokeWidth="2.5" />
            </>
          )}

          {/* Animated Electron Flow Dots */}
          {isSwitchClosed &&
            totalCurrent > 0.05 &&
            [0, 20, 40, 60, 80].map((offset, i) => {
              const speedFactor = Math.min(2.5, Math.max(0.6, totalCurrent));
              const progress = ((animTime * speedFactor + offset * 8) % 360) / 360;

              let dotX = 60;
              let dotY = 60;

              if (progress < 0.35) {
                dotX = 60 + (progress / 0.35) * 370;
                dotY = 60;
              } else if (progress < 0.5) {
                dotX = 430;
                dotY = 60 + ((progress - 0.35) / 0.15) * 130;
              } else if (progress < 0.85) {
                dotX = 430 - ((progress - 0.5) / 0.35) * 370;
                dotY = 190;
              } else {
                dotX = 60;
                dotY = 190 - ((progress - 0.85) / 0.15) * 130;
              }

              return <circle key={i} cx={dotX} cy={dotY} r="3" fill="#38bdf8" opacity="0.85" />;
            })}
        </svg>

        {/* Max Power Curve Inset */}
        {mode === 'max_power' && (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 mt-2 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300">
              Peak occurs when <strong className="text-emerald-400 font-bold">R_L = r_int ({internalR}Ω)</strong>
            </span>
            <span className="font-mono text-emerald-400 font-bold">
              Max P_L = {maxPossiblePower.toFixed(2)} W
            </span>
          </div>
        )}
      </div>

      {/* Numerical Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Resistance R_eq</div>
            <div className="text-base font-bold text-white font-mono">{totalResistance.toFixed(2)} Ω</div>
          </div>
          <Gauge className="w-4 h-4 text-slate-500" />
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Current I_total</div>
            <div className="text-base font-bold text-cyan-400 font-mono">
              {isSwitchClosed ? totalCurrent.toFixed(2) : '0.00'} A
            </div>
          </div>
          <Activity className="w-4 h-4 text-cyan-500" />
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Power (P = V·I)</div>
            <div className="text-base font-bold text-amber-400 font-mono">
              {isSwitchClosed ? totalPower.toFixed(1) : '0.0'} W
            </div>
          </div>
          <Flame className="w-4 h-4 text-amber-500" />
        </div>

        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Status</div>
            <div className="text-base font-bold text-emerald-400 font-mono">
              {isSwitchClosed ? (mode === 'max_power' && r1 === internalR ? 'MATCHED' : 'ACTIVE') : 'OPEN'}
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
      </div>

      {/* Sliders Controls (Clean & Minimal) */}
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Parameters</span>
          </span>
          <button
            onClick={() => {
              setVoltage(12);
              setR1(4);
              setR2(6);
              setR3(12);
              setInternalR(2);
            }}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset 12V</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Voltage */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <Battery className="w-3 h-3 text-cyan-400" /> Voltage (V_s):
              </span>
              <span className="font-mono text-cyan-400 font-bold">{voltage} V</span>
            </div>
            <input
              type="range"
              min="1"
              max="48"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* R1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">
                {mode === 'max_power' ? 'Load R_L:' : 'Resistor R₁:'}
              </span>
              <span className="font-mono text-amber-400 font-bold">{r1} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              value={r1}
              onChange={(e) => setR1(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* R2 / Internal r */}
          {mode === 'max_power' ? (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Internal r_int:</span>
                <span className="font-mono text-emerald-400 font-bold">{internalR} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={internalR}
                onChange={(e) => setInternalR(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          ) : mode !== 'single' ? (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Resistor R₂:</span>
                <span className="font-mono text-emerald-400 font-bold">{r2} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={r2}
                onChange={(e) => setR2(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          ) : (
            <div className="flex items-center text-[11px] text-slate-500 font-mono">
              I = {voltage}V / {r1}Ω = {totalCurrent.toFixed(2)}A
            </div>
          )}
        </div>
      </div>

      {/* Tutor Action Button */}
      {onOpenTutor && (
        <div className="flex justify-end pt-0.5">
          <button
            onClick={() => {
              const prompt = `Explain this DC circuit setup: Mode=${mode}, Voltage=${voltage}V, R1=${r1}Ω, R2=${r2}Ω, InternalR=${internalR}Ω. Please provide step-by-step calculations for total current, voltages, and power.`;
              onOpenTutor(`DC Circuit: ${mode.toUpperCase()}`, prompt);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Step-by-Step Solver</span>
          </button>
        </div>
      )}
    </div>
  );
};
