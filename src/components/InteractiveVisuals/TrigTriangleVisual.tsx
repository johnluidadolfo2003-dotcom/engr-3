import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import {
  Compass,
  RotateCcw,
  Bot,
  Sliders,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const TrigTriangleVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  // Base triangle angle θ in degrees (10° to 80°)
  const [angleDeg, setAngleDeg] = useState<number>(36.87); // Default 3-4-5 triangle
  const [hypotenuse, setHypotenuse] = useState<number>(5); // Default 5
  const [angleUnit, setAngleUnit] = useState<'deg' | 'rad'>('deg');

  const angleRad = (angleDeg * Math.PI) / 180;
  const adjacent = hypotenuse * Math.cos(angleRad); // Base X
  const opposite = hypotenuse * Math.sin(angleRad); // Height Y

  // Trig ratios
  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  const tanVal = Math.tan(angleRad);

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-[10px] font-bold tracking-wider">
              FOUNDATION 3: GEOMETRY & TRIGONOMETRY
            </span>
            <span className="text-xs text-slate-400">
              Right Triangles, SOH-CAH-TOA, Radians & AC Vector Resolution
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Interactive Right Triangle & Vector Resolver
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            The mathematical backbone of impedance triangles, power triangles, and AC phasors.
          </p>
        </div>

        <button
          onClick={() => {
            const prompt =
              language === 'tl'
                ? 'Engr. Ramos, pakipaliwanag po kung paano nagagamit ang SOH-CAH-TOA at Pythagorean Theorem sa pag-solve ng AC circuits at Power Triangle sa board exam.'
                : 'Please explain how right triangle trigonometry (SOH-CAH-TOA) directly turns into AC impedance triangles and the Power Triangle.';
            onOpenTutor?.('Trigonometry in Electrical Engineering', prompt);
          }}
          className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-200" />
          <span>Ask Tutor</span>
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Presets Bar: Classic Triangles */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-mono pl-1">Famous Triangles:</span>
          {[
            { name: '3-4-5 Triangle (θ ≈ 36.87°)', deg: 36.87, hyp: 5 },
            { name: '30°-60°-90° (θ = 30°)', deg: 30, hyp: 10 },
            { name: '45°-45°-90° (θ = 45°)', deg: 45, hyp: 10 },
            { name: '5-12-13 Triangle (θ ≈ 22.62°)', deg: 22.62, hyp: 13 },
            { name: 'Low pf Load (θ = 60°, pf = 0.5)', deg: 60, hyp: 10 },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setAngleDeg(preset.deg);
                setHypotenuse(preset.hyp);
              }}
              className="py-1 px-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Triangle Canvas & Vector Decomposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* SVG Right Triangle Canvas */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                Right Triangle Dynamic Geometry
              </span>
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                <button
                  onClick={() => setAngleUnit('deg')}
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    angleUnit === 'deg' ? 'bg-cyan-700 text-white' : 'text-slate-400'
                  }`}
                >
                  DEG
                </button>
                <button
                  onClick={() => setAngleUnit('rad')}
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    angleUnit === 'rad' ? 'bg-cyan-700 text-white' : 'text-slate-400'
                  }`}
                >
                  RAD
                </button>
              </div>
            </div>

            <div className="relative w-full h-56 sm:h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 450 220" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="trig-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="450" height="220" fill="url(#trig-grid)" />

                {/* Triangle Origin at bottom-left */}
                {(() => {
                  const ox = 70;
                  const oy = 180;
                  const maxDisplayWidth = 280;
                  const maxDisplayHeight = 140;

                  // Scale coordinates to fit nicely inside canvas
                  const scale = Math.min(
                    maxDisplayWidth / (Math.max(1, adjacent) || 1),
                    maxDisplayHeight / (Math.max(1, opposite) || 1)
                  );

                  const bx = ox + adjacent * scale;
                  const by = oy;
                  const tx = bx;
                  const ty = oy - opposite * scale;

                  return (
                    <g>
                      {/* Triangle fill */}
                      <polygon
                        points={`${ox},${oy} ${bx},${by} ${tx},${ty}`}
                        fill="#0369a1"
                        fillOpacity="0.18"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />

                      {/* Right angle square indicator */}
                      <rect
                        x={bx - 14}
                        y={by - 14}
                        width="14"
                        height="14"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <circle cx={bx - 7} cy={by - 7} r="2" fill="#94a3b8" />

                      {/* Angle θ Arc at origin */}
                      <path
                        d={`M ${ox + 35} ${oy} A 35 35 0 0 0 ${ox + 35 * Math.cos(angleRad)} ${
                          oy - 35 * Math.sin(angleRad)
                        }`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                      />
                      <text
                        x={ox + 45}
                        y={oy - 12}
                        fill="#f59e0b"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        θ = {angleUnit === 'deg' ? `${angleDeg.toFixed(1)}°` : `${angleRad.toFixed(3)} rad`}
                      </text>

                      {/* Base / Adjacent side (X = R cos θ) */}
                      <line x1={ox} y1={oy + 12} x2={bx} y2={by + 12} stroke="#38bdf8" strokeWidth="2" />
                      <text
                        x={(ox + bx) / 2}
                        y={oy + 28}
                        fill="#38bdf8"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        Adjacent (X) = {adjacent.toFixed(2)}
                      </text>

                      {/* Height / Opposite side (Y = R sin θ) */}
                      <line x1={bx + 14} y1={by} x2={tx + 14} y2={ty} stroke="#34d399" strokeWidth="2" />
                      <text
                        x={bx + 20}
                        y={(by + ty) / 2 + 4}
                        fill="#34d399"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="start"
                      >
                        Opposite (Y) = {opposite.toFixed(2)}
                      </text>

                      {/* Hypotenuse side (Magnitude Z) */}
                      <text
                        x={(ox + tx) / 2 - 16}
                        y={(oy + ty) / 2 - 10}
                        fill="#fcd34d"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        Hypotenuse (R) = {hypotenuse.toFixed(1)}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Slider Controls */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-amber-400">Angle (θ):</span>
                  <span className="font-mono text-white">{angleDeg.toFixed(1)}°</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="85"
                  step="0.5"
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-cyan-400">Hypotenuse (Length):</span>
                  <span className="font-mono text-white">{hypotenuse}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={hypotenuse}
                  onChange={(e) => setHypotenuse(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Right: SOH-CAH-TOA & Electrical Equivalents Card */}
          <div className="lg:col-span-5 space-y-3">
            {/* The SOH-CAH-TOA Definition Grid */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                The 3 Core Trigonometric Ratios (SOH - CAH - TOA)
              </div>

              <div className="space-y-2 font-mono text-xs">
                {/* SOH */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">sin(θ) = Opp ÷ Hyp</span>
                  <span className="text-slate-300">
                    {opposite.toFixed(2)} ÷ {hypotenuse} = <strong className="text-white">{sinVal.toFixed(3)}</strong>
                  </span>
                </div>

                {/* CAH */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">cos(θ) = Adj ÷ Hyp</span>
                  <span className="text-slate-300">
                    {adjacent.toFixed(2)} ÷ {hypotenuse} = <strong className="text-white">{cosVal.toFixed(3)}</strong>
                  </span>
                </div>

                {/* TOA */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-amber-400 font-bold">tan(θ) = Opp ÷ Adj</span>
                  <span className="text-slate-300">
                    {opposite.toFixed(2)} ÷ {adjacent.toFixed(2)} = <strong className="text-white">{tanVal.toFixed(3)}</strong>
                  </span>
                </div>
              </div>

              {/* Pythagorean Theorem Check */}
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Pythagorean Check:</span>
                <span className="font-mono text-white">
                  √({adjacent.toFixed(2)}² + {opposite.toFixed(2)}²) ={' '}
                  <strong className="text-amber-300">
                    {Math.sqrt(adjacent * adjacent + opposite * opposite).toFixed(2)}
                  </strong>
                </span>
              </div>
            </div>

            {/* Direct Electrical Meaning */}
            <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-xs space-y-1.5">
              <span className="font-bold text-cyan-300 uppercase tracking-wider block">
                How this translates directly into AC circuits:
              </span>
              <ul className="space-y-1 text-slate-300 text-[11px] leading-relaxed">
                <li>• <strong>Adjacent side:</strong> Real Resistance (R) or Real Power (P in kW).</li>
                <li>• <strong>Opposite side:</strong> Reactance (X) or Reactive Power (Q in kVAR).</li>
                <li>• <strong>Hypotenuse:</strong> Total Impedance (Z) or Apparent Power (S in kVA).</li>
                <li>• <strong>Power Factor:</strong> Simply <strong className="text-white">cos(θ) = P / S = Adj / Hyp</strong>!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
