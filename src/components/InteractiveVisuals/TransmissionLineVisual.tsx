import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import { Bot } from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const TransmissionLineVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [lineLengthKm, setLineLengthKm] = useState(250); // km
  const [loadMva, setLoadMva] = useState(15); // Light load vs heavy load
  const [loadPf, setLoadPf] = useState(0.85); // lagging
  const [lineKv, setLineKv] = useState(230); // 230 kV Philippine grid (NGCP standard)

  // Parameters per km for typical 230 kV line
  const rPerKm = 0.08; // ohm/km
  const xPerKm = 0.45; // ohm/km
  const bPerKm = 3.2e-6; // S/km

  const totalR = rPerKm * lineLengthKm;
  const totalX = xPerKm * lineLengthKm;
  const totalB = bPerKm * lineLengthKm;

  // Receiving end calculations
  const vrLnKv = lineKv / Math.sqrt(3); // 132.8 kV line-to-neutral
  const isLightLoad = loadMva < 40;

  // Ferranti voltage boost formula: deltaV_no_load = 0.5 * omega^2 * L * C * VR
  const omega = 2 * Math.PI * 60;
  const ferrantiRiseKv = 0.5 * (totalX * totalB) * vrLnKv;

  // Actual load current
  const irAmp = (loadMva * 1e6) / (Math.sqrt(3) * lineKv * 1e3);
  const sinPf = Math.sqrt(1 - loadPf * loadPf);
  // Voltage drop = IR*cos(theta) + IX*sin(theta) - 0.5*I_charging*X
  const loadVoltageDropKv = (irAmp * (totalR * loadPf + totalX * sinPf)) / 1000;
  const netDeltaVKv = loadVoltageDropKv - ferrantiRiseKv;

  const vsLnKv = vrLnKv + netDeltaVKv;
  const vsLineKv = vsLnKv * Math.sqrt(3);
  const voltageRegulationPercent = ((vsLnKv - vrLnKv) / vrLnKv) * 100;

  // Profile points along line
  const points = [];
  const segments = 10;
  for (let i = 0; i <= segments; i++) {
    const frac = i / segments;
    const dist = frac * lineLengthKm;
    // Quadratic Ferranti rise vs linear resistance drop
    const vAtDist = vrLnKv + (netDeltaVKv * (1 - frac)) + (ferrantiRiseKv * Math.sin((frac * Math.PI) / 2));
    points.push({ frac, dist, v: vAtDist });
  }

  return (
    <div className="bg-[#14243A] text-slate-100 rounded-xl p-5 border border-slate-700/60 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-700">
        <div>
          <span className="text-xs tracking-wider uppercase font-semibold text-[#167D82]">
            Power Transmission & Grid Analysis
          </span>
          <h4 className="text-lg font-bold text-white">
            230 kV Transmission Voltage Profile & The Ferranti Effect
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <div className={`text-xs px-3 py-1.5 rounded-lg border font-semibold ${
            voltageRegulationPercent < 0
              ? 'bg-amber-950/60 border-amber-600/70 text-amber-300'
              : 'bg-slate-800 border-slate-700 text-cyan-400'
          }`}>
            {voltageRegulationPercent < 0
              ? '⚡ FERRANTI EFFECT (VR > VS at light load)'
              : 'NORMAL LOAD VOLTAGE DROP'}
          </div>
          {onOpenTutor && (
            <button
              onClick={() => {
                const prompt =
                  language === 'tl'
                    ? `Engr. Ramos, paki-explain sa akin ang Ferranti Effect sa 230kV transmission line sa Tagalog na parang 10 years old ako.`
                    : language === 'ceb'
                    ? `Engr. Ramos, palihog i-explain sa akoa ang Ferranti Effect sa 230kV transmission line sa Bisaya nga morag 10 anyos ko.`
                    : `Engr. Ramos, please explain the Ferranti Effect on long transmission lines in simple words!`;
                onOpenTutor('Transmission Lines & Ferranti Effect', prompt);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#167D82] hover:bg-[#167D82]/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-300" />
              <span>
                {language === 'tl' ? 'Ipaliwanag ang Linya' : language === 'ceb' ? 'I-explain ang Linya' : 'Explain Transmission'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* SVG Transmission Line Diagram */}
      <div className="relative bg-slate-950/80 rounded-lg p-3 border border-slate-800 flex items-center justify-center">
        <svg viewBox="0 0 540 220" className="w-full max-w-[540px] h-auto select-none">
          {/* Ground reference */}
          <line x1="40" y1="180" x2="500" y2="180" stroke="#334155" strokeWidth="1.5" />

          {/* Sending End Substation Tower */}
          <g transform="translate(60, 80)">
            <line x1="0" y1="100" x2="0" y2="10" stroke="#64748b" strokeWidth="3" />
            <line x1="-15" y1="35" x2="15" y2="35" stroke="#64748b" strokeWidth="2.5" />
            <line x1="-22" y1="60" x2="22" y2="60" stroke="#64748b" strokeWidth="2.5" />
            <line x1="-15" y1="100" x2="15" y2="100" stroke="#475569" strokeWidth="3" />
            <text x="0" y="0" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Sending Substation
            </text>
            <text x="0" y="118" fill="#94a3b8" fontSize="10" textAnchor="middle">
              V_S = {vsLineKv.toFixed(1)} kV
            </text>
          </g>

          {/* Receiving End Substation Tower */}
          <g transform="translate(480, 80)">
            <line x1="0" y1="100" x2="0" y2="10" stroke="#64748b" strokeWidth="3" />
            <line x1="-15" y1="35" x2="15" y2="35" stroke="#64748b" strokeWidth="2.5" />
            <line x1="-22" y1="60" x2="22" y2="60" stroke="#64748b" strokeWidth="2.5" />
            <line x1="-15" y1="100" x2="15" y2="100" stroke="#475569" strokeWidth="3" />
            <text x="0" y="0" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
              Receiving Substation
            </text>
            <text x="0" y="118" fill="#94a3b8" fontSize="10" textAnchor="middle">
              V_R = {lineKv.toFixed(0)} kV
            </text>
          </g>

          {/* Overhead conductors catenary line */}
          <path
            d="M 60 115 Q 270 145 480 115"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Voltage Profile Curve Overlay */}
          <path
            d={`M 60 ${140 - (vsLnKv - 120) * 1.5} Q 270 ${
              140 - (vrLnKv + (voltageRegulationPercent < 0 ? ferrantiRiseKv * 3 : -loadVoltageDropKv) - 120) * 1.5
            } 480 ${140 - (vrLnKv - 120) * 1.5}`}
            fill="none"
            stroke={voltageRegulationPercent < 0 ? '#f59e0b' : '#38bdf8'}
            strokeWidth="3.5"
          />

          <text
            x="270"
            y="55"
            fill={voltageRegulationPercent < 0 ? '#fbbf24' : '#38bdf8'}
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            {voltageRegulationPercent < 0
              ? `Voltage rises along line (+${ferrantiRiseKv.toFixed(2)} kV charging rise)`
              : `Voltage drops along line (-${loadVoltageDropKv.toFixed(1)} kV impedance drop)`}
          </text>
          <text x="270" y="72" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Transmission Length: {lineLengthKm} km
          </text>
        </svg>
      </div>

      {/* Engineering Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Sending End (V_S)</div>
          <div className="text-lg font-bold text-sky-400">{vsLineKv.toFixed(1)} kV</div>
          <div className="text-[11px] text-slate-400">Line-to-line</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Receiving End (V_R)</div>
          <div className="text-lg font-bold text-emerald-400">{lineKv} kV</div>
          <div className="text-[11px] text-slate-400">Nominal grid level</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Voltage Regulation (%VR)</div>
          <div className={`text-lg font-bold ${voltageRegulationPercent < 0 ? 'text-amber-400' : 'text-white'}`}>
            {voltageRegulationPercent.toFixed(2)}%
          </div>
          <div className="text-[11px] text-slate-400">
            {voltageRegulationPercent < 0 ? 'Negative (VR > VS)' : 'Positive drop'}
          </div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">Load Current</div>
          <div className="text-lg font-bold text-slate-200">{irAmp.toFixed(1)} A</div>
          <div className="text-[11px] text-slate-400">Load: {loadMva} MVA</div>
        </div>
      </div>

      {/* Sliders */}
      <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Line Length:</span>
              <span className="font-mono text-cyan-400 font-semibold">{lineLengthKm} km</span>
            </div>
            <input
              type="range"
              min="50"
              max="450"
              step="25"
              value={lineLengthKm}
              onChange={(e) => setLineLengthKm(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Load Demand:</span>
              <span className="font-mono text-amber-400 font-semibold">{loadMva} MVA</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={loadMva}
              onChange={(e) => setLoadMva(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Load Power Factor:</span>
              <span className="font-mono text-emerald-400 font-semibold">{loadPf.toFixed(2)} lag</span>
            </div>
            <input
              type="range"
              min="0.70"
              max="1.00"
              step="0.05"
              value={loadPf}
              onChange={(e) => setLoadPf(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
