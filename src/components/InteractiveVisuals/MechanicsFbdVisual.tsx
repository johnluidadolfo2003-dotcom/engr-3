import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { Bot } from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const MechanicsFbdVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [f1, setF1] = useState(80); // Newtons
  const [theta1, setTheta1] = useState(30); // degrees
  const [f2, setF2] = useState(100); // Newtons
  const [theta2, setTheta2] = useState(135); // degrees
  const [f3, setF3] = useState(60); // Newtons
  const [theta3, setTheta3] = useState(250); // degrees

  const rad = (deg: number) => (deg * Math.PI) / 180;

  // Components
  const f1x = f1 * Math.cos(rad(theta1));
  const f1y = f1 * Math.sin(rad(theta1));
  const f2x = f2 * Math.cos(rad(theta2));
  const f2y = f2 * Math.sin(rad(theta2));
  const f3x = f3 * Math.cos(rad(theta3));
  const f3y = f3 * Math.sin(rad(theta3));

  const rx = f1x + f2x + f3x;
  const ry = f1y + f2y + f3y;
  const resultantR = Math.sqrt(rx * rx + ry * ry);
  const resultantAngleDeg = (Math.atan2(ry, rx) * 180) / Math.PI;

  const originX = 260;
  const originY = 130;
  const scale = 1.0;

  return (
    <div className="bg-[#14243A] text-slate-100 rounded-xl p-5 border border-slate-700/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-700">
        <div>
          <span className="text-xs tracking-wider uppercase font-semibold text-[#167D82]">
            Engineering Mechanics (ESAS)
          </span>
          <h4 className="text-lg font-bold text-white">
            Concurrent Coplanar Force System & Resultant Vector (FBD)
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-amber-400">
            ΣF_x = {rx.toFixed(1)} N · ΣF_y = {ry.toFixed(1)} N
          </div>
          {onOpenTutor && (
            <button
              onClick={() => {
                const prompt =
                  language === 'tl'
                    ? `Engr. Ramos, paki-explain sa akin ang Free Body Diagram (FBD) at Resultant Force Vector sa Tagalog na parang 10 years old ako.`
                    : language === 'ceb'
                    ? `Engr. Ramos, palihog i-explain sa akoa ang Free Body Diagram (FBD) ug Resultant Force Vector sa Bisaya nga morag 10 anyos ko.`
                    : `Engr. Ramos, please explain how concurrent vectors add up into a single resultant force in simple words!`;
                onOpenTutor('Mechanics FBD & Resultant Vector', prompt);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#167D82] hover:bg-[#167D82]/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span>
                {language === 'tl' ? 'Ipaliwanag ang FBD' : language === 'ceb' ? 'I-explain ang FBD' : 'Explain FBD'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative bg-slate-950/80 rounded-lg p-3 border border-slate-800 flex items-center justify-center">
        <svg viewBox="0 0 520 260" className="w-full max-w-[520px] h-auto select-none">
          {/* Axis */}
          <line x1="30" y1={originY} x2="490" y2={originY} stroke="#334155" strokeWidth="1.5" />
          <line x1={originX} y1="20" x2={originX} y2="240" stroke="#334155" strokeWidth="1.5" />
          <text x="495" y={originY + 4} fill="#64748b" fontSize="11" fontWeight="bold">+x</text>
          <text x={originX - 4} y="15" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="end">+y</text>

          {/* Central Particle node */}
          <circle cx={originX} cy={originY} r="7" fill="#14243A" stroke="#167D82" strokeWidth="3" />

          {/* F1 vector (Cyan) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX + f1x * scale}
            y2={originY - f1y * scale}
            stroke="#38bdf8"
            strokeWidth="3.5"
          />
          <text
            x={originX + f1x * scale + 8}
            y={originY - f1y * scale - 4}
            fill="#38bdf8"
            fontSize="11"
            fontWeight="bold"
          >
            F₁ = {f1} N ({theta1}°)
          </text>

          {/* F2 vector (Amber) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX + f2x * scale}
            y2={originY - f2y * scale}
            stroke="#fbbf24"
            strokeWidth="3.5"
          />
          <text
            x={originX + f2x * scale - 12}
            y={originY - f2y * scale - 6}
            fill="#fbbf24"
            fontSize="11"
            fontWeight="bold"
            textAnchor="end"
          >
            F₂ = {f2} N ({theta2}°)
          </text>

          {/* F3 vector (Purple) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX + f3x * scale}
            y2={originY - f3y * scale}
            stroke="#c084fc"
            strokeWidth="3.5"
          />
          <text
            x={originX + f3x * scale - 8}
            y={originY - f3y * scale + 15}
            fill="#c084fc"
            fontSize="11"
            fontWeight="bold"
            textAnchor="end"
          >
            F₃ = {f3} N ({theta3}°)
          </text>

          {/* Resultant R vector (Emerald thick arrow) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX + rx * scale}
            y2={originY - ry * scale}
            stroke="#34d399"
            strokeWidth="4.5"
            strokeDasharray="4,2"
          />
          <circle cx={originX + rx * scale} cy={originY - ry * scale} r="4" fill="#34d399" />
          <text
            x={originX + rx * scale + 10}
            y={originY - ry * scale + (ry > 0 ? -8 : 14)}
            fill="#34d399"
            fontSize="12"
            fontWeight="bold"
          >
            R = {resultantR.toFixed(1)} N ({resultantAngleDeg.toFixed(1)}°)
          </text>
        </svg>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Resultant Magnitude (R)</div>
          <div className="text-lg font-bold text-emerald-400">{resultantR.toFixed(1)} N</div>
          <div className="text-[11px] text-slate-400">R = √(Rx² + Ry²)</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Resultant Angle (θ_R)</div>
          <div className="text-lg font-bold text-white">{resultantAngleDeg.toFixed(1)}°</div>
          <div className="text-[11px] text-slate-400">tan⁻¹(Ry / Rx)</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Equilibrant Force (-R)</div>
          <div className="text-lg font-bold text-amber-400">{resultantR.toFixed(1)} N</div>
          <div className="text-[11px] text-slate-400">Angle: {((resultantAngleDeg + 180) % 360).toFixed(1)}°</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Guy Wire / Tower Tension</div>
          <div className="text-xs font-semibold text-slate-200 mt-1">Utility Pole Anchor</div>
          <div className="text-[11px] text-slate-400">Structural balance</div>
        </div>
      </div>

      {/* Sliders */}
      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Force F₁ Angle:</span>
              <span className="font-mono text-sky-400 font-semibold">{theta1}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={theta1}
              onChange={(e) => setTheta1(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Force F₂ Angle:</span>
              <span className="font-mono text-amber-400 font-semibold">{theta2}°</span>
            </div>
            <input
              type="range"
              min="90"
              max="180"
              value={theta2}
              onChange={(e) => setTheta2(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Force F₃ Angle:</span>
              <span className="font-mono text-purple-400 font-semibold">{theta3}°</span>
            </div>
            <input
              type="range"
              min="180"
              max="360"
              value={theta3}
              onChange={(e) => setTheta3(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
