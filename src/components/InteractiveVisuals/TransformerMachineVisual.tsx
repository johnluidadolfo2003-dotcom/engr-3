import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { Bot } from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const TransformerMachineVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [vPrimary, setVPrimary] = useState(2400); // Volts
  const [turnsN1, setTurnsN1] = useState(1000);
  const [turnsN2, setTurnsN2] = useState(100);
  const [loadResistance, setLoadResistance] = useState(4); // Ohms
  const [coreLossWatts, setCoreLossWatts] = useState(150); // W

  const turnsRatioA = turnsN1 / turnsN2; // a = N1/N2 = 10
  const vSecondary = vPrimary / turnsRatioA; // 240 V
  const iSecondary = vSecondary / loadResistance; // 60 A
  const iPrimaryLoad = iSecondary / turnsRatioA; // 6 A
  const reflectedZ1 = turnsRatioA * turnsRatioA * loadResistance; // a^2 * ZL = 100 * 4 = 400 ohms
  const copperLossWatts = (iPrimaryLoad * iPrimaryLoad * 1.5) + (iSecondary * iSecondary * 0.015);
  const totalPowerOut = vSecondary * iSecondary; // W
  const totalPowerIn = totalPowerOut + copperLossWatts + coreLossWatts;
  const efficiency = (totalPowerOut / totalPowerIn) * 100;

  return (
    <div className="bg-[#14243A] text-slate-100 rounded-xl p-5 border border-slate-700/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-700">
        <div>
          <span className="text-xs tracking-wider uppercase font-semibold text-[#167D82]">
            Electrical Machines & Energy Conversion
          </span>
          <h4 className="text-lg font-bold text-white">
            Single-Phase Step-Down Transformer & Reflected Impedance
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-cyan-400">
            Turns Ratio a = N₁ / N₂ = {turnsRatioA.toFixed(2)} : 1
          </div>
          {onOpenTutor && (
            <button
              onClick={() => {
                const prompt =
                  language === 'tl'
                    ? `Engr. Ramos, paki-explain sa akin ang single-phase step-down transformer at turns ratio sa Tagalog na parang 10 years old ako.`
                    : language === 'ceb'
                    ? `Engr. Ramos, palihog i-explain sa akoa ang single-phase step-down transformer ug turns ratio sa Bisaya nga morag 10 anyos ko.`
                    : `Engr. Ramos, please explain how this step-down transformer transfers power through mutual magnetic flux in simple words!`;
                onOpenTutor('Step-Down Transformer', prompt);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#167D82] hover:bg-[#167D82]/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span>
                {language === 'tl' ? 'Ipaliwanag ang Transformer' : language === 'ceb' ? 'I-explain ang Transformer' : 'Explain Transformer'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* SVG Transformer Core Visual */}
      <div className="relative bg-slate-950/80 rounded-lg p-3 border border-slate-800 flex items-center justify-center">
        <svg viewBox="0 0 540 260" className="w-full max-w-[540px] h-auto select-none">
          {/* Laminated Iron Core */}
          <rect x="150" y="30" width="240" height="200" rx="12" fill="#334155" stroke="#475569" strokeWidth="3" />
          <rect x="210" y="80" width="120" height="100" rx="8" fill="#020617" stroke="#475569" strokeWidth="2" />

          {/* Magnetic Flux Path Loop (Dashed Teal with arrow) */}
          <rect
            x="180"
            y="55"
            width="180"
            height="150"
            rx="8"
            fill="none"
            stroke="#167D82"
            strokeWidth="2.5"
            strokeDasharray="6,4"
          />
          <text x="270" y="70" fill="#2dd4bf" fontSize="11" fontWeight="bold" textAnchor="middle">
            Mutual Flux Φ(t)
          </text>

          {/* Primary Coil (Left Leg) */}
          <g transform="translate(140, 60)">
            {[0, 20, 40, 60, 80, 100, 120].map((y, idx) => (
              <path
                key={idx}
                d={`M 0 ${y} Q -20 ${y + 5} 0 ${y + 12}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
          </g>
          {/* Primary Leads */}
          <path d="M 60 70 L 140 70" stroke="#f59e0b" strokeWidth="3" />
          <path d="M 60 190 L 140 190" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="60" cy="70" r="4" fill="#f59e0b" />
          <circle cx="60" cy="190" r="4" fill="#f59e0b" />
          <text x="50" y="135" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
            V₁ = {vPrimary}V
          </text>
          <text x="50" y="152" fill="#94a3b8" fontSize="10" textAnchor="middle">
            I₁ = {iPrimaryLoad.toFixed(2)}A
          </text>
          <text x="110" y="45" fill="#f59e0b" fontSize="10" fontWeight="bold">
            N₁ = {turnsN1}t
          </text>

          {/* Secondary Coil (Right Leg) */}
          <g transform="translate(390, 80)">
            {[0, 24, 48, 72].map((y, idx) => (
              <path
                key={idx}
                d={`M 0 ${y} Q 20 ${y + 6} 0 ${y + 14}`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ))}
          </g>
          {/* Secondary Leads & Load */}
          <path d="M 390 90 L 460 90 L 460 120" stroke="#38bdf8" strokeWidth="3" />
          <path d="M 390 170 L 460 170 L 460 150" stroke="#38bdf8" strokeWidth="3" />
          {/* Resistor Load */}
          <rect x="448" y="120" width="24" height="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="460" y="139" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
            {loadResistance}Ω
          </text>
          <text x="495" y="115" fill="#7dd3fc" fontSize="11" fontWeight="bold">
            V₂ = {vSecondary.toFixed(0)}V
          </text>
          <text x="495" y="135" fill="#94a3b8" fontSize="10">
            I₂ = {iSecondary.toFixed(1)}A
          </text>
          <text x="400" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold">
            N₂ = {turnsN2}t
          </text>
        </svg>
      </div>

      {/* Engineering Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Secondary Voltage</div>
          <div className="text-lg font-bold text-sky-400">{vSecondary.toFixed(0)} V</div>
          <div className="text-[11px] text-slate-400">V₂ = V₁ / a</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Secondary Current</div>
          <div className="text-lg font-bold text-white">{iSecondary.toFixed(1)} A</div>
          <div className="text-[11px] text-slate-400">P_out = {(totalPowerOut / 1000).toFixed(2)} kW</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Reflected Impedance (Z₁')</div>
          <div className="text-lg font-bold text-amber-400">{reflectedZ1.toFixed(1)} Ω</div>
          <div className="text-[11px] text-slate-400">Z₁' = a² · Z_L</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Efficiency (η)</div>
          <div className="text-lg font-bold text-emerald-400">{efficiency.toFixed(2)}%</div>
          <div className="text-[11px] text-slate-400">Losses: {(copperLossWatts + coreLossWatts).toFixed(0)} W</div>
        </div>
      </div>

      {/* Sliders */}
      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Primary Turns (N₁):</span>
              <span className="font-mono text-amber-400 font-semibold">{turnsN1} turns</span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={turnsN1}
              onChange={(e) => setTurnsN1(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Secondary Turns (N₂):</span>
              <span className="font-mono text-sky-400 font-semibold">{turnsN2} turns</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="10"
              value={turnsN2}
              onChange={(e) => setTurnsN2(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Load Resistance (R_L):</span>
              <span className="font-mono text-emerald-400 font-semibold">{loadResistance} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={loadResistance}
              onChange={(e) => setLoadResistance(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
