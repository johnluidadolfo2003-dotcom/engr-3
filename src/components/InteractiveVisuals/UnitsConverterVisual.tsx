import React, { useState } from 'react';
import { AppLanguage } from '../../types';
import {
  ArrowRight,
  RotateCcw,
  Bot,
  Zap,
  CheckCircle2,
  Sliders,
  Scale,
  Hash,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

interface PrefixItem {
  prefix: string;
  symbol: string;
  power: number;
  multiplier: number;
  example: string;
  engineeringUsage: string;
}

const PREFIXES: PrefixItem[] = [
  { prefix: 'Giga', symbol: 'G', power: 9, multiplier: 1e9, example: '1 GW = 1,000,000,000 W', engineeringUsage: 'National grid power generation' },
  { prefix: 'Mega', symbol: 'M', power: 6, multiplier: 1e6, example: '1 MVA = 1,000,000 VA', engineeringUsage: 'Substation transformer capacity' },
  { prefix: 'kilo', symbol: 'k', power: 3, multiplier: 1e3, example: '1 kV = 1,000 V', engineeringUsage: 'Distribution lines (13.8 kV, 34.5 kV)' },
  { prefix: 'base', symbol: '—', power: 0, multiplier: 1, example: '1 V, 1 A, 1 Ω, 1 W', engineeringUsage: 'Standard SI fundamental units' },
  { prefix: 'milli', symbol: 'm', power: -3, multiplier: 1e-3, example: '1 mA = 0.001 A', engineeringUsage: 'Sensor currents, leakage currents' },
  { prefix: 'micro', symbol: 'µ', power: -6, multiplier: 1e-6, example: '1 µF = 0.000001 F', engineeringUsage: 'Capacitor sizing, motor start caps' },
  { prefix: 'nano', symbol: 'n', power: -9, multiplier: 1e-9, example: '1 nH = 0.000000001 H', engineeringUsage: 'High-frequency coil inductance' },
  { prefix: 'pico', symbol: 'p', power: -12, multiplier: 1e-12, example: '1 pF = 10⁻¹² F', engineeringUsage: 'Transmission line shunt capacitance' },
];

export const UnitsConverterVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [selectedUnitType, setSelectedUnitType] = useState<'voltage' | 'current' | 'capacitance' | 'power'>('capacitance');
  const [inputValue, setInputValue] = useState<number>(470);
  const [fromPrefixIndex, setFromPrefixIndex] = useState<number>(5); // 'micro' (index 5)
  const [toPrefixIndex, setToPrefixIndex] = useState<number>(3); // 'base' (index 3)

  const fromPrefix = PREFIXES[fromPrefixIndex];
  const toPrefix = PREFIXES[toPrefixIndex];

  // Base unit value
  const baseValue = inputValue * fromPrefix.multiplier;
  // Converted value
  const convertedValue = baseValue / toPrefix.multiplier;

  // Power of 10 step differences
  const powerDiff = fromPrefix.power - toPrefix.power;

  const unitLabels = {
    voltage: { name: 'Voltage', unit: 'V (Volts)' },
    current: { name: 'Current', unit: 'A (Amperes)' },
    capacitance: { name: 'Capacitance', unit: 'F (Farads)' },
    power: { name: 'Power', unit: 'W (Watts)' },
  }[selectedUnitType];

  return (
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-[10px] font-bold tracking-wider">
              FOUNDATION 1: ARITHMETIC & UNITS
            </span>
            <span className="text-xs text-slate-400">
              Metric Prefixes, Scientific Notation & Unit Conversion
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Interactive Metric Ladder & Engineering Unit Converter
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Never lose board exam points to mm vs m or µF vs F traps.
          </p>
        </div>

        <button
          onClick={() => {
            const prompt =
              language === 'tl'
                ? 'Engr. Ramos, pakipaliwanag po kung paano ang mabilis at sigurado na pag-convert ng metric prefixes (kilo, milli, micro, nano) gamit ang Casio fx-991 ENG button.'
                : 'Please explain the fastest, fail-safe way to handle metric prefixes (kilo, milli, micro, nano) and scientific notation on the Casio fx-991.';
            onOpenTutor?.('Metric Prefixes & Units', prompt);
          }}
          className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Bot className="w-3.5 h-3.5 text-cyan-200" />
          <span>Ask Tutor</span>
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Unit Type Selection */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {(
            [
              { id: 'capacitance', label: 'Capacitance (µF, nF, pF)' },
              { id: 'voltage', label: 'Voltage (kV, V, mV)' },
              { id: 'current', label: 'Current (A, mA, µA)' },
              { id: 'power', label: 'Power (MW, kW, W)' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedUnitType(t.id);
                if (t.id === 'capacitance') {
                  setInputValue(470);
                  setFromPrefixIndex(5); // micro
                  setToPrefixIndex(3); // base Farad
                } else if (t.id === 'voltage') {
                  setInputValue(13.8);
                  setFromPrefixIndex(2); // kilo
                  setToPrefixIndex(3); // Volts
                } else if (t.id === 'current') {
                  setInputValue(25);
                  setFromPrefixIndex(4); // milli
                  setToPrefixIndex(3); // Amps
                } else {
                  setInputValue(2.5);
                  setFromPrefixIndex(1); // Mega
                  setToPrefixIndex(3); // Watts
                }
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                selectedUnitType === t.id
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Live Conversion Sandbox */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Live Unit Bridge Conversion
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Input Value & From Prefix */}
            <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-[11px] font-mono text-cyan-400 font-bold block">
                FROM: Enter Value & Prefix
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-sm focus:outline-hidden focus:border-cyan-500"
                />
                <select
                  value={fromPrefixIndex}
                  onChange={(e) => setFromPrefixIndex(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-cyan-300 font-mono text-xs focus:outline-hidden focus:border-cyan-500"
                >
                  {PREFIXES.map((p, i) => (
                    <option key={p.prefix} value={i}>
                      {p.symbol} ({p.prefix}) 10^{p.power}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                = {inputValue} {fromPrefix.symbol !== '—' ? fromPrefix.symbol : ''}
                {unitLabels.unit}
              </div>
            </div>

            {/* Conversion Operator Symbol */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
              <div className="w-9 h-9 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold">
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                × 10^{powerDiff >= 0 ? `+${powerDiff}` : powerDiff}
              </span>
            </div>

            {/* Target Converted Value */}
            <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono text-emerald-400 font-bold">
                  TO: Resulting Converted Value
                </label>
                <select
                  value={toPrefixIndex}
                  onChange={(e) => setToPrefixIndex(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-emerald-300 font-mono text-xs focus:outline-hidden focus:border-emerald-500"
                >
                  {PREFIXES.map((p, i) => (
                    <option key={p.prefix} value={i}>
                      {p.symbol} ({p.prefix}) 10^{p.power}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-mono text-base font-bold truncate">
                {convertedValue < 0.0001 || convertedValue > 1000000
                  ? convertedValue.toExponential(4)
                  : convertedValue.toLocaleString(undefined, { maximumFractionDigits: 6 })}{' '}
                <span className="text-white text-xs font-normal">
                  {toPrefix.symbol !== '—' ? toPrefix.symbol : ''}
                  {unitLabels.unit}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Scientific: {convertedValue.toExponential(4)}
              </div>
            </div>
          </div>

          {/* Unit Cancellation Bridge Step */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-cyan-400 font-mono text-[11px] uppercase tracking-wider block">
              Unit Cancellation Method (The Board Exam Fail-Safe):
            </span>
            <div className="font-mono text-xs text-white bg-slate-900/80 p-2 rounded border border-slate-800 overflow-x-auto">
              {inputValue} {fromPrefix.symbol} ×{' '}
              <span className="text-cyan-400">(10^{fromPrefix.power} base / 1 {fromPrefix.symbol})</span> ×{' '}
              <span className="text-emerald-400">(1 {toPrefix.symbol} / 10^{toPrefix.power} base)</span> ={' '}
              <strong className="text-amber-300">
                {convertedValue.toExponential(4)} {toPrefix.symbol}
              </strong>
            </div>
          </div>
        </div>

        {/* The 8 Metric Prefix Ladder */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase tracking-wider">
              The 8 Standard Metric Prefixes in Electrical Engineering
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Powers of 10</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PREFIXES.map((p) => {
              const isFrom = p.prefix === fromPrefix.prefix;
              const isTo = p.prefix === toPrefix.prefix;
              return (
                <div
                  key={p.prefix}
                  className={`p-3 rounded-xl border text-left transition-colors ${
                    isFrom
                      ? 'bg-cyan-950 border-cyan-700 text-white'
                      : isTo
                      ? 'bg-emerald-950 border-emerald-700 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                    <span className="text-base text-cyan-400">{p.symbol}</span>
                    <span className="text-[11px] text-slate-400">10^{p.power}</span>
                  </div>
                  <div className="text-xs font-bold">{p.prefix}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{p.engineeringUsage}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
