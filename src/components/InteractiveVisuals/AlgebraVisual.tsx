import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { HelpCircle, Sparkles, TrendingUp, CheckCircle2, Bot } from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const AlgebraVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);
  const [mode, setMode] = useState<'quadratic' | 'wordProblem'>('quadratic');

  // Work problem state: Pipe A fills in x hours, Pipe B in y hours
  const [rateA, setRateA] = useState(3); // hours
  const [rateB, setRateB] = useState(6); // hours

  // Discriminant and roots
  const discriminant = b * b - 4 * a * c;
  let root1: string = '';
  let root2: string = '';
  let natureOfRoots = '';

  if (discriminant > 0) {
    const r1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const r2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    root1 = r1.toFixed(2);
    root2 = r2.toFixed(2);
    natureOfRoots = 'Two Real & Distinct Roots (crosses x-axis twice)';
  } else if (Math.abs(discriminant) < 1e-6) {
    const r = -b / (2 * a);
    root1 = r.toFixed(2);
    root2 = r.toFixed(2);
    natureOfRoots = 'One Real Repeated Root (tangent to x-axis)';
  } else {
    const realPart = (-b / (2 * a)).toFixed(2);
    const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
    root1 = `${realPart} + j${imagPart}`;
    root2 = `${realPart} - j${imagPart}`;
    natureOfRoots = 'Complex Conjugate Roots (never touches x-axis; transient oscillation)';
  }

  // Vertex
  const h = -b / (2 * a);
  const k = a * h * h + b * h + c;

  // SVG dimensions
  const width = 500;
  const height = 240;
  const originX = width / 2;
  const originY = height / 2 + 30;
  const scaleX = 22;
  const scaleY = 12;

  // Generate parabola points
  const points: [number, number][] = [];
  for (let xVal = -9; xVal <= 9; xVal += 0.2) {
    const yVal = a * xVal * xVal + b * xVal + c;
    const px = originX + xVal * scaleX;
    const py = originY - yVal * scaleY;
    if (py >= -20 && py <= height + 20) {
      points.push([px, py]);
    }
  }
  const pathD = points.reduce((acc, [px, py], i) => (i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`), '');

  // Work problem combined time: 1/T = 1/A + 1/B => T = (A*B)/(A+B)
  const combinedWorkTime = (rateA * rateB) / (rateA + rateB);

  return (
    <div className="bg-[#14243A] text-slate-100 rounded-xl p-5 border border-slate-700/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-700">
        <div>
          <span className="text-xs tracking-wider uppercase font-semibold text-[#167D82]">
            Applied Mathematics · Stage 1 Visual
          </span>
          <h4 className="text-lg font-bold text-white">
            {mode === 'quadratic'
              ? 'Quadratic Equation Parabola & Discriminant Roots'
              : 'Algebraic Work & Rate Problems (Visual Flow)'}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('quadratic')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              mode === 'quadratic'
                ? 'bg-[#167D82] text-white border-[#167D82]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            Quadratic & Roots
          </button>
          <button
            onClick={() => setMode('wordProblem')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              mode === 'wordProblem'
                ? 'bg-[#167D82] text-white border-[#167D82]'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            Work & Rate Problems
          </button>
        </div>
      </div>

      {/* Friendly Plain-English Analogy Callout */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-300">
        <div className="flex items-start gap-2.5 max-w-xl">
          <span className="text-xl shrink-0">{mode === 'quadratic' ? '🏀' : '🚰'}</span>
          <div>
            {mode === 'quadratic' ? (
              <p className="leading-relaxed">
                <strong className="text-sky-300">Basketball Shot Metaphor:</strong> Think of the curve as the flight path of a thrown basketball! The <span className="text-amber-400 font-bold">yellow dot</span> is the highest peak of your throw. The <span className="text-emerald-400 font-bold">green dots (Roots)</span> are where the ball hits the floor! Positive <span className="font-mono text-sky-400">a</span> smiles like a bowl, negative <span className="font-mono text-sky-400">a</span> frowns like a thrown ball.
              </p>
            ) : (
              <p className="leading-relaxed">
                <strong className="text-emerald-300">Two Pipes Pouring Water:</strong> Notice how Pipe A alone takes {rateA} hrs and Pipe B alone takes {rateB} hrs, but turning BOTH on fills the tank in only {((rateA * rateB) / (rateA + rateB)).toFixed(2)} hrs! Two workers together always finish faster than the fastest person alone!
              </p>
            )}
          </div>
        </div>

        {onOpenTutor && (
          <button
            onClick={() => {
              const prompt =
                language === 'tl'
                  ? `Engr. Ramos, paki-explain sa akin ang ${mode === 'quadratic' ? 'parabola at mga root ng quadratic equation' : 'work at rate problem'} sa Tagalog na parang 10 years old ako.`
                  : language === 'ceb'
                  ? `Engr. Ramos, palihog i-explain sa akoa ang ${mode === 'quadratic' ? 'parabola ug mga root sa quadratic equation' : 'work ug rate problem'} sa Bisaya nga morag 10 anyos ko.`
                  : `Engr. Ramos, please explain this ${mode === 'quadratic' ? 'quadratic parabola and roots' : 'work problem rate equation'} to me in super simple words!`;
              onOpenTutor(mode === 'quadratic' ? 'Quadratic Parabola' : 'Work & Rate Problems', prompt);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#167D82] hover:bg-[#167D82]/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-300" />
            <span>
              {language === 'tl' ? 'Ipaliwanag ang Graph' : language === 'ceb' ? 'I-explain ang Graph' : 'Explain This Graph'}
            </span>
          </button>
        )}
      </div>

      {mode === 'quadratic' ? (
        <>
          {/* SVG Graph for Parabola */}
          <div className="relative bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex items-center justify-center">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[500px] h-auto select-none">
              {/* Grid Lines */}
              {[-6, -4, -2, 2, 4, 6].map((gx) => (
                <line
                  key={gx}
                  x1={originX + gx * scaleX}
                  y1={10}
                  x2={originX + gx * scaleX}
                  y2={height - 10}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              ))}
              {[-6, -3, 3, 6, 9, 12].map((gy) => (
                <line
                  key={gy}
                  x1={20}
                  y1={originY - gy * scaleY}
                  x2={width - 20}
                  y2={originY - gy * scaleY}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              ))}

              {/* Axes */}
              <line x1={20} y1={originY} x2={width - 20} y2={originY} stroke="#475569" strokeWidth="1.5" />
              <line x1={originX} y1={height - 10} x2={originX} y2={10} stroke="#475569" strokeWidth="1.5" />
              <text x={width - 15} y={originY + 4} fill="#94a3b8" fontSize="10" fontWeight="bold">x</text>
              <text x={originX + 8} y={16} fill="#94a3b8" fontSize="10" fontWeight="bold">f(x)</text>

              {/* Parabola Curve */}
              <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

              {/* Vertex Point */}
              <circle
                cx={originX + h * scaleX}
                cy={originY - k * scaleY}
                r="5"
                fill="#f59e0b"
                stroke="#020617"
                strokeWidth="2"
              />

              {/* Real Root Points if discriminant >= 0 */}
              {discriminant >= 0 && (
                <>
                  <circle
                    cx={originX + ((-b + Math.sqrt(discriminant)) / (2 * a)) * scaleX}
                    cy={originY}
                    r="5"
                    fill="#10b981"
                    stroke="#020617"
                    strokeWidth="2"
                  />
                  <circle
                    cx={originX + ((-b - Math.sqrt(discriminant)) / (2 * a)) * scaleX}
                    cy={originY}
                    r="5"
                    fill="#10b981"
                    stroke="#020617"
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Discriminant (b² - 4ac)</div>
              <div className={`text-xl font-bold font-mono ${discriminant > 0 ? 'text-emerald-400' : discriminant === 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                {discriminant.toFixed(1)}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {discriminant > 0 ? 'Δ > 0 (2 Real)' : discriminant === 0 ? 'Δ = 0 (Repeated)' : 'Δ < 0 (Complex)'}
              </div>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Root x₁</div>
              <div className="text-lg font-bold font-mono text-emerald-400 truncate">{root1}</div>
              <div className="text-[10px] text-slate-400">First solution</div>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Root x₂</div>
              <div className="text-lg font-bold font-mono text-emerald-400 truncate">{root2}</div>
              <div className="text-[10px] text-slate-400">Second solution</div>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Parabola Vertex (h, k)</div>
              <div className="text-base font-bold font-mono text-amber-400">({h.toFixed(1)}, {k.toFixed(1)})</div>
              <div className="text-[10px] text-slate-400">Peak / Minimum point</div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-300">
              Adjust Coefficients in: <span className="font-mono text-sky-400">{a}x² + ({b})x + ({c}) = 0</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Curve Shape (<span className="text-sky-300">a</span>):</span>
                  <span className="font-mono text-sky-400 font-bold">{a > 0 ? `+${a} (Smile)` : `${a} (Frown)`}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value) || 1)}
                  className="w-full accent-[#167D82] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Left/Right Tilt (<span className="text-sky-300">b</span>):</span>
                  <span className="font-mono text-sky-400 font-bold">{b}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="1"
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full accent-[#167D82] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Starting Height (<span className="text-sky-300">c</span>):</span>
                  <span className="font-mono text-sky-400 font-bold">{c}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="15"
                  step="1"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full accent-[#167D82] cursor-pointer"
                />
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex items-center gap-2">
              <span className="font-semibold text-amber-400">Board Insight:</span>
              <span>
                {natureOfRoots} — in RLC transient analysis, Δ &gt; 0 gives overdamped response, Δ = 0 is critically damped, and Δ &lt; 0 gives underdamped sinusoidal ringing!
              </span>
            </div>
          </div>
        </>
      ) : (
        /* Work / Rate Problems Visual */
        <div className="space-y-4">
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="text-sm font-semibold text-white">
              Two Pumps Filling an Industrial Storage Tank:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-semibold">Pump A Time Alone:</span>
                  <span className="font-mono text-emerald-400 font-bold">{rateA} hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={rateA}
                  onChange={(e) => setRateA(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 mt-1">
                  Hourly Rate: <span className="font-mono text-white">1/{rateA}</span> tank per hour
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300 font-semibold">Pump B Time Alone:</span>
                  <span className="font-mono text-sky-400 font-bold">{rateB} hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={rateB}
                  onChange={(e) => setRateB(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 mt-1">
                  Hourly Rate: <span className="font-mono text-white">1/{rateB}</span> tank per hour
                </div>
              </div>
            </div>

            {/* Visual Tank Filling Simulation */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Combined Work Equation</div>
                <div className="text-base font-mono text-amber-300 font-bold">
                  1/T = 1/{rateA} + 1/{rateB} = {(1 / rateA + 1 / rateB).toFixed(3)} tank/hr
                </div>
                <div className="text-xs text-slate-300">
                  Total Time Working Together:
                  <span className="font-bold text-emerald-400 text-lg ml-2 font-mono">
                    {combinedWorkTime.toFixed(2)} hours ({Math.round(combinedWorkTime * 60)} mins)
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Notice that the combined time is <strong className="text-white">always less</strong> than the fastest individual worker!
                </div>
              </div>

              {/* Tank Graphic */}
              <div className="w-28 h-36 border-2 border-slate-500 rounded-b-xl relative bg-slate-950/60 overflow-hidden flex flex-col justify-end p-1">
                <div
                  className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-b-lg transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ height: '75%' }}
                >
                  FULL TANK
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
