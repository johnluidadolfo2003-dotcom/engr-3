import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import {
  Activity,
  RotateCcw,
  Bot,
  Sliders,
  CheckCircle2,
  Layers,
  Zap,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const ComplexNumbersVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  // Complex number: Z = R + jX
  const [realPart, setRealPart] = useState<number>(4); // Resistance R in Ohms
  const [imagPart, setImagPart] = useState<number>(3); // Reactance X in Ohms (positive = inductive, negative = capacitive)

  // Magnitude |Z| and Angle θ in degrees
  const magnitude = Math.sqrt(realPart * realPart + imagPart * imagPart);
  const angleRad = Math.atan2(imagPart, realPart);
  const angleDeg = (angleRad * 180) / Math.PI;

  // Second impedance for series addition demo: Z2
  const [r2, setR2] = useState<number>(2);
  const [x2, setX2] = useState<number>(-5);

  const totalReal = realPart + r2;
  const totalImag = imagPart + x2;
  const totalMag = Math.sqrt(totalReal * totalReal + totalImag * totalImag);
  const totalAngleDeg = (Math.atan2(totalImag, totalReal) * 180) / Math.PI;

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-[10px] font-bold tracking-wider">
              FOUNDATION 4: COMPLEX NUMBERS & VECTORS
            </span>
            <span className="text-xs text-slate-400">
              Rectangular Form (R + jX) vs Polar Form (Z ∠ θ) & Casio CMPLX Mode
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Interactive Argand Plane & AC Phasor Vector Studio
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            The foundation for all AC circuits, transmission lines, and 3-phase power calculations.
          </p>
        </div>

        <button
          onClick={() => {
            const prompt =
              language === 'tl'
                ? 'Engr. Ramos, pakipaliwanag po kung bakit kailangan ng imaginary number j sa AC circuits, at paano ang shortcut sa Casio fx-991 MODE 2 (CMPLX).'
                : 'Please explain why we use the imaginary operator j in AC circuits, and how to master Casio fx-991 MODE 2 (CMPLX) operations.';
            onOpenTutor?.('Complex Numbers & Phasors', prompt);
          }}
          className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-200" />
          <span>Ask Tutor</span>
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Dual Form Comparison Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rectangular Form Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider">
                1. Rectangular Form (Best for Addition)
              </span>
              <span className="text-slate-400 font-mono text-[10px]">R + jX</span>
            </div>
            <div className="text-xl font-mono font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">{realPart}</span>
              <span>{imagPart >= 0 ? '+' : '−'}</span>
              <span className="text-amber-400">j{Math.abs(imagPart)}</span>
              <span className="text-slate-400 text-sm">Ω</span>
            </div>
            <div className="text-[11px] text-slate-400">
              • <strong>Real Part:</strong> Pure Resistance R = {realPart} Ω (causes heat loss).
              <br />• <strong>Imaginary Part:</strong> Reactance X = {imagPart} Ω{' '}
              {imagPart > 0 ? '(Inductive +j, coils)' : imagPart < 0 ? '(Capacitive -j, caps)' : '(Pure resistor)'}.
            </div>
          </div>

          {/* Polar Form Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider">
                2. Polar Form (Best for Multiply & Divide)
              </span>
              <span className="text-slate-400 font-mono text-[10px]">|Z| ∠ θ</span>
            </div>
            <div className="text-xl font-mono font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">{magnitude.toFixed(2)}</span>
              <span className="text-slate-400 text-sm">∠</span>
              <span className="text-amber-400">{angleDeg.toFixed(2)}°</span>
              <span className="text-slate-400 text-sm">Ω</span>
            </div>
            <div className="text-[11px] text-slate-400">
              • <strong>Magnitude |Z|:</strong> Total opposition = √({realPart}² + {imagPart}²) = {magnitude.toFixed(2)} Ω.
              <br />• <strong>Phase Angle θ:</strong> Phase shift = arctan({imagPart}/{realPart}) = {angleDeg.toFixed(2)}°.
            </div>
          </div>
        </div>

        {/* Argand Complex Plane Vector Canvas */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300 uppercase tracking-wider">
              Complex Plane (Argand Diagram)
            </span>
            <span className="font-mono text-cyan-400">
              Horizontal: Real Axis (R) | Vertical: Imaginary Axis (jX)
            </span>
          </div>

          {/* SVG Complex Plane */}
          <div className="relative w-full h-64 sm:h-72 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 500 260" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="complex-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="500" height="260" fill="url(#complex-grid)" />

              {/* Origin at (200, 130) */}
              {(() => {
                const ox = 200;
                const oy = 130;
                const scale = 14;

                const vx = ox + realPart * scale;
                const vy = oy - imagPart * scale;

                return (
                  <g>
                    {/* Axes */}
                    <line x1="30" y1={oy} x2="470" y2={oy} stroke="#475569" strokeWidth="1.5" />
                    <line x1={ox} y1="20" x2={ox} y2="240" stroke="#475569" strokeWidth="1.5" />

                    {/* Axis Labels */}
                    <text x="460" y={oy - 8} fill="#94a3b8" fontSize="10" fontWeight="bold">
                      +Real (R)
                    </text>
                    <text x="40" y={oy - 8} fill="#64748b" fontSize="10">
                      -Real
                    </text>
                    <text x={ox + 8} y="32" fill="#94a3b8" fontSize="10" fontWeight="bold">
                      +j (Inductive +jX_L)
                    </text>
                    <text x={ox + 8} y="235" fill="#94a3b8" fontSize="10" fontWeight="bold">
                      -j (Capacitive -jX_C)
                    </text>

                    {/* Triangle projection lines */}
                    <line
                      x1={vx}
                      y1={oy}
                      x2={vx}
                      y2={vy}
                      stroke="#94a3b8"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <line
                      x1={ox}
                      y1={vy}
                      x2={vx}
                      y2={vy}
                      stroke="#94a3b8"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />

                    {/* Vector Z Arrow */}
                    <line
                      x1={ox}
                      y1={oy}
                      x2={vx}
                      y2={vy}
                      stroke="#38bdf8"
                      strokeWidth="3.5"
                    />
                    <circle cx={vx} cy={vy} r="5" fill="#38bdf8" />

                    {/* Vector label */}
                    <text
                      x={vx + 10}
                      y={vy + (imagPart >= 0 ? -6 : 14)}
                      fill="#38bdf8"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      Z = {realPart} {imagPart >= 0 ? '+' : '−'} j{Math.abs(imagPart)}
                    </text>

                    {/* Angle arc */}
                    {magnitude > 0.5 && (
                      <path
                        d={`M ${ox + 25} ${oy} A 25 25 0 0 ${imagPart >= 0 ? 0 : 1} ${
                          ox + 25 * Math.cos(angleRad)
                        } ${oy - 25 * Math.sin(angleRad)}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                    )}
                    <text
                      x={ox + 32}
                      y={oy + (imagPart >= 0 ? -8 : 16)}
                      fill="#f59e0b"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      θ = {angleDeg.toFixed(1)}°
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Interactive Sliders for R and X */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-cyan-400">Real Resistance (R):</span>
                <span className="font-mono text-white bg-slate-800 px-2 py-0.5 rounded">
                  {realPart} Ω
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={realPart}
                onChange={(e) => setRealPart(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400">Imaginary Reactance (X):</span>
                <span className="font-mono text-white bg-slate-800 px-2 py-0.5 rounded">
                  {imagPart >= 0 ? `+${imagPart}` : imagPart} Ω
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                value={imagPart}
                onChange={(e) => setImagPart(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>-10 Ω (Capacitor)</span>
                <span>0 Ω (Resistor)</span>
                <span>+10 Ω (Inductor)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Series Addition of Impedances Demonstration */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Series Impedance Addition (Z_total = Z₁ + Z₂)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Impedance Z₁:</span>
              <span className="text-cyan-400 text-sm font-bold">
                {realPart} {imagPart >= 0 ? '+' : '−'} j{Math.abs(imagPart)} Ω
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Impedance Z₂:</span>
              <span className="text-amber-400 text-sm font-bold">
                {r2} {x2 >= 0 ? '+' : '−'} j{Math.abs(x2)} Ω
              </span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800">
              <span className="text-emerald-300 block text-[10px]">Z_total = Z₁ + Z₂:</span>
              <span className="text-emerald-300 text-sm font-bold">
                {totalReal} {totalImag >= 0 ? '+' : '−'} j{Math.abs(totalImag)} Ω
              </span>
              <span className="text-slate-300 text-[11px] block mt-0.5">
                = {totalMag.toFixed(2)} ∠ {totalAngleDeg.toFixed(1)}° Ω
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
