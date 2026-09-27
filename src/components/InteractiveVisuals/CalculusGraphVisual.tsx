import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { Bot } from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const CalculusGraphVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [xPoint, setXPoint] = useState(2.0); // Point x0
  const [funcType, setFuncType] = useState<'cubic' | 'sine'>('cubic');
  const [showIntegral, setShowIntegral] = useState(false);

  // Cubic function: f(x) = 0.2*x^3 - x^2 + x + 2
  // f'(x) = 0.6*x^2 - 2*x + 1
  const f = (x: number) => {
    if (funcType === 'cubic') {
      return 0.15 * Math.pow(x, 3) - 0.7 * Math.pow(x, 2) + 0.8 * x + 3.0;
    } else {
      return 2.5 * Math.sin(0.8 * x) + 3.0;
    }
  };

  const fPrime = (x: number) => {
    if (funcType === 'cubic') {
      return 0.45 * Math.pow(x, 2) - 1.4 * x + 0.8;
    } else {
      return 2.5 * 0.8 * Math.cos(0.8 * x);
    }
  };

  const currentY = f(xPoint);
  const slope = fPrime(xPoint);

  // SVG coordinate transform
  const originX = 50;
  const originY = 220;
  const scaleX = 80;
  const scaleY = 35;

  // Tangent line endpoints
  const tanX1 = xPoint - 1.5;
  const tanY1 = currentY - slope * 1.5;
  const tanX2 = xPoint + 1.5;
  const tanY2 = currentY + slope * 1.5;

  // Generate curve path points
  const points: [number, number][] = [];
  for (let x = 0; x <= 5.5; x += 0.1) {
    points.push([originX + x * scaleX, originY - f(x) * scaleY]);
  }
  const pathD = points.reduce((acc, [px, py], i) => (i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`), '');

  // Shaded area path for integral from 0.5 to xPoint
  const integralPoints = [];
  for (let x = 0.5; x <= xPoint; x += 0.05) {
    integralPoints.push(`${originX + x * scaleX},${originY - f(x) * scaleY}`);
  }
  integralPoints.push(`${originX + xPoint * scaleX},${originY}`);
  integralPoints.push(`${originX + 0.5 * scaleX},${originY}`);
  const integralAreaD = `M ${integralPoints.join(' L ')} Z`;

  return (
    <div className="bg-[#14243A] text-slate-100 rounded-xl p-5 border border-slate-700/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-700">
        <div>
          <span className="text-xs tracking-wider uppercase font-semibold text-[#167D82]">
            Applied Mathematics Visual
          </span>
          <h4 className="text-lg font-bold text-white">
            Calculus Derivative Tangent & Definite Integral Area
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIntegral(!showIntegral)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              showIntegral ? 'bg-[#167D82] text-white border-[#167D82]' : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {showIntegral ? 'Hide Integral Area' : 'Show Definite Integral ∫'}
          </button>
          {onOpenTutor && (
            <button
              onClick={() => {
                const prompt =
                  language === 'tl'
                    ? `Engr. Ramos, paki-explain sa akin ang derivative (slope/tangent) at integral (area under curve) sa Tagalog na parang 10 years old ako.`
                    : language === 'ceb'
                    ? `Engr. Ramos, palihog i-explain sa akoa ang derivative (slope/tangent) ug integral (area under curve) sa Bisaya nga morag 10 anyos ko.`
                    : `Engr. Ramos, please explain how the tangent slope represents rate of change and integral represents accumulated area in simple words!`;
                onOpenTutor('Calculus Derivative & Integral', prompt);
              }}
              className="px-3 py-1 rounded-lg bg-[#167D82] hover:bg-[#167D82]/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span>
                {language === 'tl' ? 'Ipaliwanag ang Calculus' : language === 'ceb' ? 'I-explain ang Calculus' : 'Explain Calculus'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative bg-slate-950/80 rounded-lg p-3 border border-slate-800 flex items-center justify-center">
        <svg viewBox="0 0 540 260" className="w-full max-w-[540px] h-auto select-none">
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map((gx) => (
            <line
              key={gx}
              x1={originX + gx * scaleX}
              y1={20}
              x2={originX + gx * scaleX}
              y2={originY}
              stroke="#1e293b"
              strokeWidth="1"
            />
          ))}
          {[1, 2, 3, 4, 5, 6].map((gy) => (
            <line
              key={gy}
              x1={originX}
              y1={originY - gy * scaleY}
              x2={500}
              y2={originY - gy * scaleY}
              stroke="#1e293b"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line x1={originX} y1={originY} x2={510} y2={originY} stroke="#475569" strokeWidth="2" />
          <line x1={originX} y1={originY + 10} x2={originX} y2={20} stroke="#475569" strokeWidth="2" />
          <text x={515} y={originY + 4} fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
          <text x={originX - 10} y={15} fill="#94a3b8" fontSize="11" fontWeight="bold">f(x)</text>

          {/* Shaded Integral Area */}
          {showIntegral && (
            <path d={integralAreaD} fill="#167D82" fillOpacity="0.3" stroke="#167D82" strokeWidth="1" />
          )}

          {/* Curve */}
          <path d={pathD} fill="none" stroke="#38bdf8" strokeWidth="3" />

          {/* Tangent line at xPoint */}
          <line
            x1={originX + tanX1 * scaleX}
            y1={originY - tanY1 * scaleY}
            x2={originX + tanX2 * scaleX}
            y2={originY - tanY2 * scaleY}
            stroke="#fbbf24"
            strokeWidth="2.5"
            strokeDasharray="4,2"
          />

          {/* Point on curve */}
          <circle
            cx={originX + xPoint * scaleX}
            cy={originY - currentY * scaleY}
            r="6"
            fill="#fbbf24"
            stroke="#020617"
            strokeWidth="2"
          />

          {/* Dropped dashed line to x-axis */}
          <line
            x1={originX + xPoint * scaleX}
            y1={originY - currentY * scaleY}
            x2={originX + xPoint * scaleX}
            y2={originY}
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />
          <text
            x={originX + xPoint * scaleX}
            y={originY + 16}
            fill="#fbbf24"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
          >
            x = {xPoint.toFixed(1)}
          </text>
        </svg>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Point Coordinates</div>
          <div className="text-lg font-bold text-sky-400">({xPoint.toFixed(1)}, {currentY.toFixed(2)})</div>
          <div className="text-[11px] text-slate-400">Instantaneous state</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Derivative Slope (dy/dx)</div>
          <div className="text-lg font-bold text-amber-400">{slope.toFixed(3)}</div>
          <div className="text-[11px] text-slate-400">
            {slope > 0 ? 'Function increasing ↗' : slope < 0 ? 'Function decreasing ↘' : 'Critical point (m = 0)'}
          </div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Tangent Line Equation</div>
          <div className="text-xs font-mono text-emerald-400 mt-1 font-semibold truncate">
            y = {slope.toFixed(2)}x + {(currentY - slope * xPoint).toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400">Point-slope formula</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Engineering Use</div>
          <div className="text-xs font-semibold text-white mt-1">di/dt = v/L</div>
          <div className="text-[11px] text-slate-400">Rate of change / RMS area</div>
        </div>
      </div>

      {/* Slider */}
      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
        <div className="flex justify-between mb-1 text-xs">
          <span className="text-slate-400">Drag x₀ position along the curve:</span>
          <span className="font-mono text-amber-400 font-semibold">x = {xPoint.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="5.0"
          step="0.05"
          value={xPoint}
          onChange={(e) => setXPoint(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
      </div>
    </div>
  );
};
