import React, { useState, useEffect, useRef } from 'react';
import { AppLanguage } from '../../types';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  X,
  Bot,
  Info,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onOpenTutor?: (topic?: string, context?: any) => void;
}

export const CircuitSimVisual: React.FC<Props> = ({ language = 'en', onOpenTutor }) => {
  const [circuitType, setCircuitType] = useState<'series' | 'parallel'>('series');
  const [voltage, setVoltage] = useState(230); // Volts RMS
  const [resistance, setResistance] = useState(30); // Ohms
  const [inductance, setInductance] = useState(80); // mH
  const [capacitance, setCapacitance] = useState(50); // uF
  const [frequency, setFrequency] = useState(60); // Hz (Philippine grid standard)
  const [showHowToRead, setShowHowToRead] = useState(true);
  const [activeExperiment, setActiveExperiment] = useState<string>('normal');
  const [tourStep, setTourStep] = useState<number | null>(null); // null = not in tour, 0..3 = tour steps
  const [inspectedComponent, setInspectedComponent] = useState<
    'source' | 'resistor' | 'inductor' | 'capacitor' | 'dots' | null
  >(null);

  // Computed parameters
  const omega = 2 * Math.PI * frequency;
  const XL = omega * (inductance / 1000); // Ohms
  const XC = 1 / (omega * (capacitance / 1000000)); // Ohms

  let Z = 0;
  let phaseAngleDeg = 0;
  let currentRMS = 0;
  let realPowerP = 0;
  let reactivePowerQ = 0;

  if (circuitType === 'series') {
    const netReactance = XL - XC;
    Z = Math.sqrt(resistance * resistance + netReactance * netReactance);
    phaseAngleDeg = (Math.atan2(netReactance, resistance) * 180) / Math.PI;
    currentRMS = voltage / (Z || 0.001);
    realPowerP = currentRMS * currentRMS * resistance;
    reactivePowerQ = currentRMS * currentRMS * netReactance;
  } else {
    // Parallel RLC: Y = 1/R + j(1/XC - 1/XL) = G + j(BC - BL)
    const G = 1 / resistance;
    const BL = 1 / (XL || 0.001);
    const BC = 1 / (XC || 0.001);
    const Bnet = BC - BL;
    const Y = Math.sqrt(G * G + Bnet * Bnet);
    Z = 1 / (Y || 0.001);
    phaseAngleDeg = (-Math.atan2(Bnet, G) * 180) / Math.PI;
    currentRMS = voltage * Y;
    realPowerP = voltage * voltage * G;
    reactivePowerQ = voltage * voltage * -Bnet;
  }

  const powerFactor = Math.cos((phaseAngleDeg * Math.PI) / 180);
  const isResonant = Math.abs(XL - XC) < 1.5;
  const fResonant = 1 / (2 * Math.PI * Math.sqrt((inductance / 1000) * (capacitance / 1000000)));

  // Animation for electron flow
  const [animTime, setAnimTime] = useState(0);
  const reqRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      // speed proportional to current magnitude
      setAnimTime((prev) => (prev + dt * Math.min(currentRMS * 4, 30)) % 100);
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [currentRMS]);

  // Preset action helper
  const handleApplyExperiment = (type: 'squeeze' | 'wide' | 'resonance' | 'voltage' | 'reset') => {
    setActiveExperiment(type);
    if (type === 'squeeze') {
      setResistance(120);
      setVoltage(230);
    } else if (type === 'wide') {
      setResistance(10);
      setVoltage(230);
    } else if (type === 'resonance') {
      // At 60Hz: L=80mH => XL=30.16. Set C=88uF => XC=30.14
      setInductance(80);
      setCapacitance(88);
      setResistance(20);
      setVoltage(230);
    } else if (type === 'voltage') {
      setVoltage(440);
      setResistance(25);
    } else {
      setResistance(30);
      setInductance(80);
      setCapacitance(50);
      setVoltage(230);
    }
  };

  // Dynamic live explanation text
  const getLiveExplanation = () => {
    if (isResonant) {
      if (language === 'tl') {
        return '⚡ PERPEKTONG RESONANCE! Nagkapantay ang Inductor at Capacitor (XL = XC). Ganap nilang kinansela ang isa’t isa! Nawala ang reaktansya kaya pinakamabilis ang takbo ng mga asul na tuldok (kuryente)!';
      }
      if (language === 'ceb') {
        return '⚡ HINGPIT NGA RESONANCE! Nagkatakdo ang Inductor ug Capacitor (XL = XC). Nagkansenlasay silang duha! Nawala ang babag mao nga kinapaspasan ang dagan sa mga asul nga tuldok (kuryente)!';
      }
      return '⚡ PERFECT RESONANCE! Inductive and capacitive reactances cancel out (XL = XC). Total impedance dropped to pure resistance and current is at its maximum peak!';
    }

    if (resistance >= 90) {
      if (language === 'tl') {
        return `🚧 Mataas ang Resistance (${resistance} Ω)! Napansin mo bang bumagal nang husto ang mga asul na tuldok? Parang inapakan mo ang hose ng tubig kaya humina ang daloy (I = V / R).`;
      }
      if (language === 'ceb') {
        return `🚧 Taas kaayo ang Resistance (${resistance} Ω)! Namatikdan ba nimo nga mihinay pag-ayo ang mga asul nga tuldok? Morag imong gitumban ang hose sa tubig mao nga mihinay ang agay (I = V / R).`;
      }
      return `🚧 High Resistance (${resistance} Ω)! Notice how the blue dots slowed down to a crawl. High resistance acts like a kinked hose, choking the current flow (I = V / R).`;
    }

    if (resistance <= 15) {
      if (language === 'tl') {
        return `🌊 Maluwag ang Daanan (${resistance} Ω)! Napakabilis ng takbo ng mga asul na tuldok dahil halos walang pumipigil sa daloy ng kuryente.`;
      }
      if (language === 'ceb') {
        return `🌊 Hawan kaayo ang Dalan (${resistance} Ω)! Paspas kaayo ang dagan sa mga asul nga tuldok tungod kay halos walay nagbabag sa agay sa kuryente.`;
      }
      return `🌊 Low Resistance (${resistance} Ω)! The blue dots are zooming because the electric bottleneck was removed, allowing huge current to surge!`;
    }

    if (voltage >= 380) {
      if (language === 'tl') {
        return `🚀 Malakas na Presyon / Boltahe (${voltage} V)! Kapag malakas ang tulak ng baterya, mas maraming kuryente ang napipilitang dumaan sa kawad.`;
      }
      if (language === 'ceb') {
        return `🚀 Kusog nga Presyon / Boltahe (${voltage} V)! Kon kusog ang duso sa baterya, mas daghang kuryente ang mapugos sa pag-agi sa alambre.`;
      }
      return `🚀 High Voltage Pump (${voltage} V)! Stronger electric pressure forces more charge through the wire, speeding up the current dots.`;
    }

    if (language === 'tl') {
      return `💡 Normal na Takbo: Subukang i-click ang mga buttons sa ibaba ("Ipitin ang Hose", "Resonance Peak", atbp.) para makita kung paano nagbabago ang bilis ng mga tuldok!`;
    }
    if (language === 'ceb') {
      return `💡 Normal nga Dagan: Sulayi pag-click ang mga buttons sa ubos ("Pioton ang Hose", "Resonance Peak", ug uban pa) aron makita giunsa pagbag-o sa dagan sa mga tuldok!`;
    }
    return `💡 Normal Operation: Try clicking the Experiment buttons below ("Squeeze the Hose", "Hit Resonance", etc.) to see the blue dots react instantly!`;
  };

  // Guided tour steps definitions
  const tourSteps = [
    {
      title:
        language === 'tl'
          ? '1. Ang AC Boltahe (Pinagmumulan / Pump)'
          : language === 'ceb'
          ? '1. Ang AC Boltahe (Gigikanan / Pump)'
          : '1. The AC Voltage Source (The Pump)',
      target: 'source',
      explanation:
        language === 'tl'
          ? 'Ito ang nagbibigay ng tulak sa kuryente (230 Volts, 60 Hz). Tulad ng bomba ng tubig na nagtutulak pabalik-balik 60 beses bawat segundo.'
          : language === 'ceb'
          ? 'Mao kini ang naghatag og duso sa kuryente (230 Volts, 60 Hz). Sama sa bomba sa tubig nga magduso balik-balik 60 ka beses matag segundo.'
          : 'This is the electric pump (230 Volts, 60 Hz). Just like a water pump pushing water back and forth 60 times every second.',
      actionHint:
        language === 'tl'
          ? 'Subukang itaas ang boltahe upang makitang mas bumilis ang tulak!'
          : language === 'ceb'
          ? 'Sulayi pagpataas sa boltahe aron makita nga mas mokusog ang duso!'
          : 'Try increasing voltage to see a stronger electric push!',
    },
    {
      title:
        language === 'tl'
          ? '2. Ang mga Asul na Tuldok (Daloy ng Kuryente / Current)'
          : language === 'ceb'
          ? '2. Ang mga Asul nga Tuldok (Agay sa Kuryente / Current)'
          : '2. The Moving Blue Dots (Electric Current / Amperes)',
      target: 'dots',
      explanation:
        language === 'tl'
          ? 'Ang bawat asul na tuldok ay karga ng kuryente (electrons). Ang bilis ng kanilang pagtakbo ang sumusukat sa Amperes (I). Mabilis = maraming kuryente!'
          : language === 'ceb'
          ? 'Ang matag asul nga tuldok mao ang karga sa kuryente (electrons). Ang kapaspas sa ilang dagan maoy sukod sa Amperes (I). Paspas = daghang kuryente!'
          : 'Each blue dot represents electrical charges. Their speed shows Current in Amperes (I). Fast movement = high current; crawling = low current!',
      actionHint:
        language === 'tl'
          ? 'Panoorin kung paano bumibilis o bumabagal ang mga tuldok kapag may ginalaw kang piyesa.'
          : language === 'ceb'
          ? 'Tan-awa giunsa pagpaspas o paghinay sa mga tuldok kon duna kay lihokon nga piyesa.'
          : 'Watch how their speed changes immediately when you touch any component slider.',
    },
    {
      title:
        language === 'tl'
          ? '3. Ang Resistor (Harang / Ipit sa Hose)'
          : language === 'ceb'
          ? '3. Ang Resistor (Babag / Piot sa Hose)'
          : '3. The Resistor (Friction & Resistance R)',
      target: 'resistor',
      explanation:
        language === 'tl'
          ? 'Ang Resistor ay parang pag-ipit sa hose ng tubig o buhangin sa tubo. Pinapahirapan nito ang pagdaloy ng mga asul na tuldok (I = V / R).'
          : language === 'ceb'
          ? 'Ang Resistor morag pagpiot sa hose sa tubig. Gipalisod niini ang agay sa mga asul nga tuldok (I = V / R).'
          : 'The resistor creates electrical friction. Just like stepping on a garden hose, higher resistance restricts the flow of electrons.',
      actionHint:
        language === 'tl'
          ? 'Pindutin ang "Ipitin ang Hose" sa ibaba upang makitang bumagal ang mga tuldok!'
          : language === 'ceb'
          ? 'Pindota ang "Pioton ang Hose" sa ubos aron makit-ang mohinay ang mga tuldok!'
          : 'Click "Squeeze Hose" below to see the dots slow right down!',
    },
    {
      title:
        language === 'tl'
          ? '4. Coil & Capacitor (Reaktansya at Resonance)'
          : language === 'ceb'
          ? '4. Coil & Capacitor (Reaktansya ug Resonance)'
          : '4. Inductor & Capacitor (Reactance & Resonance)',
      target: 'inductor',
      explanation:
        language === 'tl'
          ? 'Ang Inductor (Coil) at Capacitor ay magkasalungat. Kapag nagkapantay ang lakas nila (XL = XC), kinakansela nila ang isa’t isa! Ito ang tinatawag na RESONANCE — sumisirit ang kuryente sa pinakamabilis!'
          : language === 'ceb'
          ? 'Ang Inductor (Coil) ug Capacitor magkasumpaki. Kon magkaparehas ang ilang kusog (XL = XC), magkansenlasay sila! Mao kini ang gitawag nga RESONANCE — mosirit ang kuryente sa kinapaspasan!'
          : 'The Inductor and Capacitor oppose each other. When their reactances match (XL = XC), they cancel out completely! This is RESONANCE — current surges to maximum!',
      actionHint:
        language === 'tl'
          ? 'I-click ang "Resonance Peak" upang maranasan ang perpektong balanse!'
          : language === 'ceb'
          ? 'I-click ang "Resonance Peak" aron masinati ang hingpit nga balanse!'
          : 'Click "Resonance Peak" to see them cancel out and watch the dots fly!',
    },
  ];

  // Component details for Inspector
  const getComponentInfo = (comp: string) => {
    switch (comp) {
      case 'source':
        return {
          title: language === 'tl' ? 'AC Boltahe (230V)' : language === 'ceb' ? 'AC Boltahe (230V)' : 'AC Voltage Source (230V)',
          analogy: language === 'tl' ? 'Bomba ng tubig na nagtutulak pabalik-balik (60Hz)' : language === 'ceb' ? 'Bomba sa tubig nga magduso balik-balik (60Hz)' : 'Water pump pushing back and forth at 60 cycles/sec',
          formula: 'v(t) = V_peak * sin(2πft)',
          role: language === 'tl' ? 'Ang nagpapatakbo sa buong circuit. Kung walang boltahe, walang kuryente.' : language === 'ceb' ? 'Ang nagpadagan sa tibuok circuit. Kon walay boltahe, walay kuryente.' : 'Provides the electrical pressure that drives all current.',
        };
      case 'resistor':
        return {
          title: language === 'tl' ? `Resistor (${resistance} Ω)` : language === 'ceb' ? `Resistor (${resistance} Ω)` : `Resistor (${resistance} Ω)`,
          analogy: language === 'tl' ? 'Pag-ipit sa hose o buhangin sa tubo (Friction)' : language === 'ceb' ? 'Pagpiot sa hose o balas sa tubo (Friction)' : 'Pinching a hose or sand inside a pipe (Friction)',
          formula: 'V_R = I * R',
          role: language === 'tl' ? 'Pumipigil sa kuryente at ginagawang init ang enerhiya (tulad ng plantsa o heater).' : language === 'ceb' ? 'Nagbabag sa kuryente ug gihimong kainit ang enerhiya (sama sa plantsa).' : 'Dissipates electrical energy as heat (like a toaster or lightbulb filament).',
        };
      case 'inductor':
        return {
          title: language === 'tl' ? `Inductor / Coil (L = ${inductance} mH, XL = ${XL.toFixed(1)} Ω)` : language === 'ceb' ? `Inductor / Coil (L = ${inductance} mH, XL = ${XL.toFixed(1)} Ω)` : `Inductor / Coil (L = ${inductance} mH, XL = ${XL.toFixed(1)} Ω)`,
          analogy: language === 'tl' ? 'Mabigat na flywheel / gulong na ayaw agad umikot o huminto' : language === 'ceb' ? 'Bug-at nga ligid nga dili gusto dayon motuyok o mohunong' : 'A heavy flywheel that resists sudden changes in motion',
          formula: 'X_L = 2π * f * L',
          role: language === 'tl' ? 'Nag-iimbak ng enerhiya sa magnetic field. Nagpapahuli (lag) sa daloy ng kuryente.' : language === 'ceb' ? 'Nagtipig og enerhiya sa magnetic field. Nagpahinay (lag) sa agay sa kuryente.' : 'Stores magnetic energy. Causes current to lag behind voltage.',
        };
      case 'capacitor':
        return {
          title: language === 'tl' ? `Capacitor (C = ${capacitance} µF, XC = ${XC.toFixed(1)} Ω)` : language === 'ceb' ? `Capacitor (C = ${capacitance} µF, XC = ${XC.toFixed(1)} Ω)` : `Capacitor (C = ${capacitance} µF, XC = ${XC.toFixed(1)} Ω)`,
          analogy: language === 'tl' ? 'Tangke ng tubig na may goma o spring (Spring bouncer)' : language === 'ceb' ? 'Tangke sa tubig nga may gomang untol (Spring bouncer)' : 'A flexible rubber diaphragm or spring storing pressure',
          formula: 'X_C = 1 / (2π * f * C)',
          role: language === 'tl' ? 'Nag-iimbak ng kuryente sa electric field. Nagpapauna (lead) sa kuryente.' : language === 'ceb' ? 'Nagtipig og kuryente sa electric field. Nagpauna (lead) sa kuryente.' : 'Stores electrostatic charge. Causes current to lead voltage.',
        };
      case 'dots':
        return {
          title: language === 'tl' ? `Kuryente (I_rms = ${currentRMS.toFixed(2)} Amperes)` : language === 'ceb' ? `Kuryente (I_rms = ${currentRMS.toFixed(2)} Amperes)` : `Electric Current (I_rms = ${currentRMS.toFixed(2)} Amps)`,
          analogy: language === 'tl' ? 'Dami at bilis ng tubig na dumadaloy sa loob ng tubo bawat segundo' : language === 'ceb' ? 'Kadaghan ug kapaspas sa tubig nga nag-agay sa tubo matag segundo' : 'The flow rate of water through the pipe (gallons/second)',
          formula: 'I = V / Z',
          role: language === 'tl' ? 'Ito ang gumagawa ng trabaho sa circuit. Sinusukat sa Amperes gamit ang ammeter.' : language === 'ceb' ? 'Mao kini ang naghimo sa trabaho sa circuit. Gisukod sa Amperes.' : 'The actual moving charge that powers devices and turns motors.',
        };
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#14243A] text-slate-100 rounded-2xl p-4 sm:p-6 border border-slate-700/60 shadow-lg space-y-4">
      {/* Header & Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-wider uppercase font-semibold text-[#167D82]">
              {language === 'tl'
                ? 'Interactive na Circuit Simulator'
                : language === 'ceb'
                ? 'Interactive nga Circuit Simulator'
                : 'Interactive Circuit Simulation'}
            </span>
            <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
              {language === 'tl' ? 'Pambaguhan' : language === 'ceb' ? 'Alang sa Nagsugod' : 'Beginner Friendly'}
            </span>
          </div>
          <h4 className="text-lg font-bold text-white">
            {language === 'tl'
              ? `AC ${circuitType === 'series' ? 'Series' : 'Parallel'} RLC Behavior at Pagdaloy ng Kuryente`
              : language === 'ceb'
              ? `AC ${circuitType === 'series' ? 'Series' : 'Parallel'} RLC Behavior ug Agay sa Kuryente`
              : `AC ${circuitType === 'series' ? 'Series' : 'Parallel'} RLC Behavior & Impedance`}
          </h4>
        </div>

        {/* Buttons: Tour, Guide, Series/Parallel */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Guided Tour Launcher */}
          <button
            onClick={() => setTourStep(tourStep === null ? 0 : null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
              tourStep !== null
                ? 'bg-purple-600 border-purple-400 text-white shadow-xs'
                : 'bg-purple-900/40 hover:bg-purple-800/50 text-purple-300 border-purple-700/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {tourStep !== null
                ? language === 'tl'
                  ? 'Tapusin ang Tour'
                  : language === 'ceb'
                  ? 'Tapusa ang Tour'
                  : 'Exit Tour'
                : language === 'tl'
                ? '▶️ May Gabay na Tour'
                : language === 'ceb'
                ? '▶️ Giniyahan nga Tour'
                : '▶️ 4-Step Guided Tour'}
            </span>
          </button>

          {/* Toggle 30s Guide */}
          <button
            onClick={() => setShowHowToRead(!showHowToRead)}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 flex items-center gap-1.5 transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {language === 'tl'
                ? showHowToRead
                  ? 'Itago ang Gabay'
                  : 'Paano ito Gamitin?'
                : language === 'ceb'
                ? showHowToRead
                  ? 'Itago ang Giya'
                  : 'Unsaon kini Pagbasa?'
                : showHowToRead
                ? 'Hide Guide'
                : 'How to Read This?'}
            </span>
            {showHowToRead ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Series / Parallel Selector */}
          <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
            <button
              onClick={() => setCircuitType('series')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                circuitType === 'series' ? 'bg-[#167D82] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Series R-L-C
            </button>
            <button
              onClick={() => setCircuitType('parallel')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                circuitType === 'parallel' ? 'bg-[#167D82] text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Parallel R-L-C
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE GUIDED TOUR CARD (WHEN ACTIVE) */}
      {tourStep !== null && (
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-2 border-purple-400/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
              <span>
                {language === 'tl'
                  ? `Gabay sa Simulator (Hakbang ${tourStep + 1} ng 4)`
                  : language === 'ceb'
                  ? `Giya sa Simulator (Lakang ${tourStep + 1} sa 4)`
                  : `Simulator Tour (Step ${tourStep + 1} of 4)`}
              </span>
            </div>
            <button
              onClick={() => setTourStep(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-base font-bold text-white">{tourSteps[tourStep].title}</h3>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-purple-900/50">
            {tourSteps[tourStep].explanation}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-amber-300 flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{tourSteps[tourStep].actionHint}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={tourStep === 0}
                onClick={() => setTourStep(tourStep - 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                  tourStep === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'tl' ? 'Bumalik' : language === 'ceb' ? 'Balik' : 'Previous'}</span>
              </button>

              {tourStep < tourSteps.length - 1 ? (
                <button
                  onClick={() => setTourStep(tourStep + 1)}
                  className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <span>{language === 'tl' ? 'Susunod' : language === 'ceb' ? 'Sunod' : 'Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setTourStep(null)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <span>{language === 'tl' ? 'Tapos Na!' : language === 'ceb' ? 'Human Na!' : 'Got It, Finish!'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BEGINNER ZERO-CONFUSION GUIDE (EXPANDABLE) */}
      {showHowToRead && (
        <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border border-amber-400/50 rounded-xl p-4 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'tl'
                  ? 'Paano Intindihin ang Simulation na Ito (Sa Loob ng 30 Segundo):'
                  : language === 'ceb'
                  ? 'Unsaon Pagsabot Niining Simulation (Sulod sa 30 Segundo):'
                  : 'How to Understand this Simulation (in 30 seconds):'}
              </span>
            </div>
            <span className="text-[10px] text-amber-400/80 font-mono">
              {language === 'tl' ? 'Pindutin ang piyesa para sa impormasyon' : language === 'ceb' ? 'Pindota ang piyesa alang sa detalye' : 'Tap any component in schematic'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
            <button
              onClick={() => setInspectedComponent('dots')}
              className="bg-slate-900/90 hover:bg-slate-800/90 text-left p-2.5 rounded-lg border border-slate-800 hover:border-cyan-500/50 transition-all space-y-1"
            >
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                <span>
                  {language === 'tl' ? '1. Asul na Tuldok' : language === 'ceb' ? '1. Asul nga Tuldok' : '1. Blue Moving Dots'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {language === 'tl'
                  ? 'Ito ang kuryente (Current). Mas mabilis tumakbo = mas malakas ang kuryente!'
                  : language === 'ceb'
                  ? 'Mao kini ang kuryente (Current). Mas paspas modagan = mas kusog ang kuryente!'
                  : 'These are electrons (Current). Faster movement = more electricity flowing!'}
              </p>
            </button>

            <button
              onClick={() => setInspectedComponent('resistor')}
              className="bg-slate-900/90 hover:bg-slate-800/90 text-left p-2.5 rounded-lg border border-slate-800 hover:border-amber-500/50 transition-all space-y-1"
            >
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <span>🚧</span>
                <span>
                  {language === 'tl' ? '2. Resistor (R)' : language === 'ceb' ? '2. Resistor (R)' : '2. Resistor (R)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {language === 'tl'
                  ? 'Parang pag-ipit sa hose. Kapag pinalaki mo ang R, babagal ang mga tuldok.'
                  : language === 'ceb'
                  ? 'Morag pagpiot sa hose. Kon padak-on nimo ang R, mohinay ang mga tuldok.'
                  : 'Like stepping on a water hose. Higher R chokes the blue dots.'}
              </p>
            </button>

            <button
              onClick={() => setInspectedComponent('inductor')}
              className="bg-slate-900/90 hover:bg-slate-800/90 text-left p-2.5 rounded-lg border border-slate-800 hover:border-purple-500/50 transition-all space-y-1"
            >
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <span>🌀</span>
                <span>
                  {language === 'tl' ? '3. Coil & Capacitor' : language === 'ceb' ? '3. Coil ug Capacitor' : '3. Coil & Capacitor'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {language === 'tl'
                  ? 'Ang Coil (L) at Capacitor (C) ay nag-aaway. Kapag nagkapantay sila, nagkakanselahan!'
                  : language === 'ceb'
                  ? 'Ang Coil (L) ug Capacitor (C) magbangi. Kon magkaparehas sila, magkansenlasay!'
                  : 'Inductor & Capacitor fight each other. When balanced, they cancel out!'}
              </p>
            </button>

            <button
              onClick={() => handleApplyExperiment('resonance')}
              className="bg-slate-900/90 hover:bg-slate-800/90 text-left p-2.5 rounded-lg border border-slate-800 hover:border-emerald-500/50 transition-all space-y-1"
            >
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <span>⚡</span>
                <span>
                  {language === 'tl' ? '4. Ang Layunin (Goal)' : language === 'ceb' ? '4. Ang Tumong (Goal)' : '4. The Goal (Resonance)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {language === 'tl'
                  ? 'Pindutin ang "Resonance Peak" sa ibaba para makitang sumirit ang kuryente sa maximum!'
                  : language === 'ceb'
                  ? 'Pindota ang "Resonance Peak" sa ubos aron makit-ang mosirit ang kuryente sa kinatas-an!'
                  : 'Click "Resonance Peak" below to see the current burst to maximum speed!'}
              </p>
            </button>
          </div>
        </div>
      )}

      {/* COMPONENT INSPECTOR DRAWER (WHEN A COMPONENT IS CLICKED) */}
      {inspectedComponent && (
        <div className="bg-slate-900 border-2 border-cyan-400/80 rounded-xl p-4 space-y-2 animate-in fade-in duration-150">
          {(() => {
            const info = getComponentInfo(inspectedComponent);
            if (!info) return null;
            return (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">{info.title}</h4>
                  </div>
                  <button
                    onClick={() => setInspectedComponent(null)}
                    className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-amber-400">
                      {language === 'tl' ? 'Sa Totoong Buhay' : language === 'ceb' ? 'Sa Tinuod nga Kinabuhi' : 'Real-Life Analogy'}
                    </div>
                    <div className="text-slate-200 mt-0.5">{info.analogy}</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-cyan-400">
                      {language === 'tl' ? 'Ano ang Ginagawa Nito?' : language === 'ceb' ? 'Unsay Gibuhat Niini?' : 'What It Does'}
                    </div>
                    <div className="text-slate-200 mt-0.5">{info.role}</div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="text-[10px] uppercase font-bold text-emerald-400">
                      {language === 'tl' ? 'Pormula sa Board Exam' : language === 'ceb' ? 'Pormula sa Board Exam' : 'Governing Board Formula'}
                    </div>
                    <div className="font-mono text-emerald-300 font-bold mt-0.5">{info.formula}</div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* 1-CLICK EXPERIMENT PRESETS (TRY THIS!) */}
      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
            <span>🎮</span>
            <span>
              {language === 'tl'
                ? 'Subukan Ito (1-Click na Eksperimento):'
                : language === 'ceb'
                ? 'Sulayi Kini (1-Click nga Eksperimento):'
                : 'Try These 1-Click Experiments (Instant Discovery):'}
            </span>
          </span>
          <span className="text-[10px] text-slate-400">
            {language === 'tl'
              ? 'Pumili ng isa para makita agad ang reaksyon'
              : language === 'ceb'
              ? 'Pagpili og usa aron makita dayon ang reaksyon'
              : 'Click to see immediate cause-and-effect'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleApplyExperiment('squeeze')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
              activeExperiment === 'squeeze'
                ? 'bg-amber-600 border-amber-400 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            <span>🚰</span>
            <span>
              {language === 'tl'
                ? 'Ipitin ang Hose (Mataas na R = 120Ω)'
                : language === 'ceb'
                ? 'Pioton ang Hose (Taas nga R = 120Ω)'
                : 'Squeeze Hose (High R = 120Ω)'}
            </span>
          </button>

          <button
            onClick={() => handleApplyExperiment('wide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
              activeExperiment === 'wide'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
          >
            <span>🌊</span>
            <span>
              {language === 'tl'
                ? 'Maluwag na Hose (Mababang R = 10Ω)'
                : language === 'ceb'
                ? 'Luag nga Hose (Ubos nga R = 10Ω)'
                : 'Open Wide (Low R = 10Ω)'}
            </span>
          </button>

          <button
            onClick={() => handleApplyExperiment('resonance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
              activeExperiment === 'resonance'
                ? 'bg-purple-600 border-purple-400 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-purple-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {language === 'tl'
                ? '⚡ Resonance Peak (Mabilis na Kuryente!)'
                : language === 'ceb'
                ? '⚡ Resonance Peak (Paspas nga Kuryente!)'
                : '⚡ Resonance Peak (Max Speed!)'}
            </span>
          </button>

          <button
            onClick={() => handleApplyExperiment('voltage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
              activeExperiment === 'voltage'
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-cyan-300'
            }`}
          >
            <span>🚀</span>
            <span>
              {language === 'tl' ? 'Malakas na Boltahe (440V)' : language === 'ceb' ? 'Kusog nga Boltahe (440V)' : 'Strong Pump (440V)'}
            </span>
          </button>

          <button
            onClick={() => handleApplyExperiment('reset')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white flex items-center gap-1"
            title="Reset"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* LIVE "ENGR. RAMOS' COMMENTARY" BANNER WITH ASK TUTOR BUTTON */}
      <div className="bg-slate-900 border-2 border-[#167D82]/60 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-100 shadow-inner">
        <div className="flex items-start gap-2.5 max-w-2xl">
          <span className="text-2xl shrink-0">👨‍🏫</span>
          <div className="leading-relaxed">
            <strong className="text-teal-300 font-bold block mb-0.5">
              {language === 'tl'
                ? 'Komentaryo ni Engr. Ramos:'
                : language === 'ceb'
                ? 'Komentaryo ni Engr. Ramos:'
                : "Engr. Ramos' Live Commentary:"}
            </strong>
            <span>{getLiveExplanation()}</span>
          </div>
        </div>

        {onOpenTutor && (
          <button
            onClick={() => {
              const prompt =
                language === 'tl'
                  ? `Engr. Ramos, paki-explain sa akin ang circuit simulation na ito sa Tagalog: May 230V source, R=${resistance}Ω, L=${inductance}mH, C=${capacitance}µF, at kasalukuyang current=${currentRMS.toFixed(2)}A. Bakit ito ganito tumatakbo at paano ito makatutulong sa PRC board exam?`
                  : language === 'ceb'
                  ? `Engr. Ramos, palihog i-explain sa akoa kining circuit simulation sa Binisaya: Adunay 230V source, R=${resistance}Ω, L=${inductance}mH, C=${capacitance}µF, ug kasamtangang current=${currentRMS.toFixed(2)}A. Nganong ingon ani ang dagan ug unsaon man kini pagtabang sa PRC board exam?`
                  : `Engr. Ramos, please walk me through this circuit simulator in plain words: Voltage=${voltage}V, Resistance=${resistance}Ω, Inductance=${inductance}mH, Capacitance=${capacitance}µF, and Current=${currentRMS.toFixed(2)}A. Explain what is happening and why it matters for the board exam!`;
              onOpenTutor(
                language === 'tl'
                  ? 'Paliwanag sa Circuit Simulator'
                  : language === 'ceb'
                  ? 'Pagpasabot sa Circuit Simulator'
                  : 'Circuit Simulator Walkthrough',
                prompt
              );
            }}
            className="shrink-0 px-3.5 py-2 rounded-xl bg-[#167D82] hover:bg-[#167D82]/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-300" />
            <span>
              {language === 'tl'
                ? 'Ipaliwanag itong Simulator'
                : language === 'ceb'
                ? 'I-explain kining Simulator'
                : 'Explain This Simulator'}
            </span>
          </button>
        )}
      </div>

      {/* SVG Circuit Schematic Canvas */}
      <div className="relative bg-slate-950/80 rounded-xl p-3 border border-slate-800 flex flex-col items-center justify-center overflow-hidden">
        {/* Helper overlay hint */}
        <div className="text-[10px] text-slate-500 mb-1 flex items-center gap-1">
          <span>👆</span>
          <span>
            {language === 'tl'
              ? 'I-click ang Source, Resistor, Coil, o Capacitor para makita ang detalye nito'
              : language === 'ceb'
              ? 'I-click ang Source, Resistor, Coil, o Capacitor aron makita ang detalye'
              : 'Click any component on the diagram to inspect what it does'}
          </span>
        </div>

        <svg viewBox="0 0 600 300" className="w-full max-w-[620px] h-auto select-none">
          {/* Grid lines background */}
          <pattern id="circ-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="300" fill="url(#circ-grid)" />

          {/* Circuit wire loop */}
          {circuitType === 'series' ? (
            <>
              {/* Main loop wire */}
              <path
                d="M 50 150 L 50 50 L 170 50 M 230 50 L 320 50 M 380 50 L 460 50 M 520 50 L 550 50 L 550 250 L 50 250 L 50 170"
                fill="none"
                stroke="#64748b"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* AC Source symbol at x=50, y=160 (clickable) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setInspectedComponent('source')}
              >
                <circle
                  cx="50"
                  cy="160"
                  r="20"
                  fill="#0f172a"
                  stroke={tourStep === 0 || inspectedComponent === 'source' ? '#38bdf8' : '#167D82'}
                  strokeWidth={tourStep === 0 || inspectedComponent === 'source' ? '3.5' : '2.5'}
                />
                <path d="M 42 160 Q 46 153 50 160 T 58 160" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="12" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  {voltage}V
                </text>
                <text x="15" y="178" fill="#94a3b8" fontSize="9">
                  60Hz
                </text>
              </g>

              {/* Resistor symbol at x=170 to 230 (clickable) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setInspectedComponent('resistor')}
              >
                <rect x="165" y="25" width="70" height="45" fill="transparent" />
                <path
                  d="M 170 50 L 178 40 L 186 60 L 194 40 L 202 60 L 210 40 L 218 60 L 224 40 L 230 50"
                  fill="none"
                  stroke={tourStep === 2 || inspectedComponent === 'resistor' ? '#fbbf24' : '#D99532'}
                  strokeWidth={tourStep === 2 || inspectedComponent === 'resistor' ? '3.5' : '2.5'}
                />
                <text x="180" y="28" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  R = {resistance}Ω
                </text>
              </g>

              {/* Inductor symbol at x=320 to 380 (clickable) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setInspectedComponent('inductor')}
              >
                <rect x="315" y="25" width="70" height="45" fill="transparent" />
                <path
                  d="M 320 50 C 325 35, 335 35, 340 50 C 345 35, 355 35, 360 50 C 365 35, 375 35, 380 50"
                  fill="none"
                  stroke={tourStep === 3 || inspectedComponent === 'inductor' ? '#c4b5fd' : '#a78bfa'}
                  strokeWidth={tourStep === 3 || inspectedComponent === 'inductor' ? '3.5' : '2.5'}
                />
                <text x="325" y="28" fill="#c4b5fd" fontSize="11" fontWeight="bold">
                  X_L = {XL.toFixed(1)}Ω
                </text>
                <text x="332" y="70" fill="#94a3b8" fontSize="9">
                  ({inductance} mH)
                </text>
              </g>

              {/* Capacitor symbol at x=460 to 520 (clickable) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setInspectedComponent('capacitor')}
              >
                <rect x="460" y="25" width="60" height="50" fill="transparent" />
                <path d="M 460 50 L 485 50" stroke="#64748b" strokeWidth="3" />
                <line
                  x1="485"
                  y1="36"
                  x2="485"
                  y2="64"
                  stroke={tourStep === 3 || inspectedComponent === 'capacitor' ? '#6ee7b7' : '#34d399'}
                  strokeWidth="3.5"
                />
                <line
                  x1="495"
                  y1="36"
                  x2="495"
                  y2="64"
                  stroke={tourStep === 3 || inspectedComponent === 'capacitor' ? '#6ee7b7' : '#34d399'}
                  strokeWidth="3.5"
                />
                <path d="M 495 50 L 520 50" stroke="#64748b" strokeWidth="3" />
                <text x="465" y="28" fill="#6ee7b7" fontSize="11" fontWeight="bold">
                  X_C = {XC.toFixed(1)}Ω
                </text>
                <text x="473" y="70" fill="#94a3b8" fontSize="9">
                  ({capacitance} µF)
                </text>
              </g>
            </>
          ) : (
            <>
              {/* Parallel circuit wiring */}
              <path
                d="M 50 150 L 50 50 L 500 50 M 50 170 L 50 250 L 500 250"
                fill="none"
                stroke="#64748b"
                strokeWidth="3"
              />
              {/* Source */}
              <circle
                cx="50"
                cy="160"
                r="20"
                fill="#0f172a"
                stroke="#167D82"
                strokeWidth="2.5"
                className="cursor-pointer"
                onClick={() => setInspectedComponent('source')}
              />
              <path d="M 42 160 Q 46 153 50 160 T 58 160" fill="none" stroke="#167D82" strokeWidth="2" />
              <text x="12" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">
                {voltage}V
              </text>

              {/* Branch 1: Resistor */}
              <g className="cursor-pointer" onClick={() => setInspectedComponent('resistor')}>
                <path
                  d="M 200 50 L 200 120 L 190 128 L 210 136 L 190 144 L 210 152 L 190 160 L 200 168 L 200 250"
                  fill="none"
                  stroke="#D99532"
                  strokeWidth="2.5"
                />
                <text x="175" y="42" fill="#fbbf24" fontSize="11" fontWeight="bold">
                  R ({resistance}Ω)
                </text>
              </g>

              {/* Branch 2: Inductor */}
              <g className="cursor-pointer" onClick={() => setInspectedComponent('inductor')}>
                <path
                  d="M 350 50 L 350 120 C 335 125, 335 135, 350 140 C 335 145, 335 155, 350 160 C 335 165, 335 175, 350 180 L 350 250"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2.5"
                />
                <text x="325" y="42" fill="#c4b5fd" fontSize="11" fontWeight="bold">
                  X_L ({XL.toFixed(1)}Ω)
                </text>
              </g>

              {/* Branch 3: Capacitor */}
              <g className="cursor-pointer" onClick={() => setInspectedComponent('capacitor')}>
                <path
                  d="M 500 50 L 500 140 M 488 140 L 512 140 M 488 150 L 512 150 M 500 150 L 500 250"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  fill="none"
                />
                <text x="475" y="42" fill="#6ee7b7" fontSize="11" fontWeight="bold">
                  X_C ({XC.toFixed(1)}Ω)
                </text>
              </g>
            </>
          )}

          {/* Animated electron dots along the wires */}
          {[0, 20, 40, 60, 80].map((offset, i) => {
            const progress = (animTime + offset) % 100;
            const x = progress < 50 ? 50 + (progress / 50) * 500 : 550 - ((progress - 50) / 50) * 500;
            const y = progress < 50 ? 50 : 250;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={tourStep === 1 || inspectedComponent === 'dots' ? '5' : '3.5'}
                fill="#38bdf8"
                className="cursor-pointer transition-all duration-75"
                onClick={() => setInspectedComponent('dots')}
                opacity={currentRMS > 0.1 ? 0.95 : 0.2}
              />
            );
          })}

          {/* Live resonance indicator badge */}
          {isResonant && (
            <g transform="translate(240, 140)">
              <rect x="0" y="0" width="120" height="30" rx="8" fill="#167D82" opacity="0.95" />
              <text x="60" y="19" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                ⚡ RESONANCE (X_L = X_C)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Numerical Metrics Bar with Plain Intuition */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">
            {language === 'tl' ? 'Kabuuang Harang |Z|' : language === 'ceb' ? 'Kinatibuk-ang Babag |Z|' : 'Impedance |Z|'}
          </div>
          <div className="text-lg font-bold text-white">{Z.toFixed(2)} Ω</div>
          <div className="text-[11px] text-slate-400">
            Phase: {phaseAngleDeg > 0 ? `+${phaseAngleDeg.toFixed(1)}°` : `${phaseAngleDeg.toFixed(1)}°`}
          </div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">
            {language === 'tl' ? 'Kuryente (Current I)' : language === 'ceb' ? 'Kuryente (Current I)' : 'Current I_rms'}
          </div>
          <div className="text-lg font-bold text-[#38bdf8]">{currentRMS.toFixed(2)} A</div>
          <div className="text-[11px] text-slate-400">
            {phaseAngleDeg > 1 ? 'Current lags (Inductive)' : phaseAngleDeg < -1 ? 'Current leads (Capacitive)' : 'In Phase (Unity)'}
          </div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">
            {language === 'tl' ? 'Tunay na Trabaho (P)' : language === 'ceb' ? 'Tinuod nga Trabaho (P)' : 'Real Power (P)'}
          </div>
          <div className="text-lg font-bold text-[#fbbf24]">{realPowerP.toFixed(1)} W</div>
          <div className="text-[11px] text-slate-400">pf = {powerFactor.toFixed(3)}</div>
        </div>

        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase tracking-wider">
            {language === 'tl' ? 'Resonant Frequency' : language === 'ceb' ? 'Resonant Frequency' : 'Resonant Frequency'}
          </div>
          <div className="text-lg font-bold text-[#34d399]">{fResonant.toFixed(1)} Hz</div>
          <div className="text-[11px] text-slate-400 font-mono">f₀ = 1 / (2π√LC)</div>
        </div>
      </div>

      {/* Sliders for Interactive Discovery */}
      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            {language === 'tl'
              ? 'Igalaw ang mga Pihitan (Tingnan kung paano nagbabago ang kuryente):'
              : language === 'ceb'
              ? 'Lihoka ang mga Pihitán (Tan-awa giunsa pagbag-o sa kuryente):'
              : 'Adjust Parameters (Observe current, phase angle, and resonance):'}
          </div>
          <span className="text-[11px] text-slate-400">
            {language === 'tl' ? 'I-drag pakanan o pakaliwa' : language === 'ceb' ? 'I-drag patuo o pawala' : 'Drag left or right'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">
                Resistance (R) — <span className="text-amber-300">Ohmic Resistance</span>:
              </span>
              <span className="font-mono text-amber-400 font-semibold">{resistance} Ω</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              value={resistance}
              onChange={(e) => {
                setResistance(Number(e.target.value));
                setActiveExperiment('custom');
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">
                Inductance (L) — <span className="text-purple-300">Inductive Reactance (X_L = {XL.toFixed(1)}Ω)</span>:
              </span>
              <span className="font-mono text-purple-400 font-semibold">{inductance} mH</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              value={inductance}
              onChange={(e) => {
                setInductance(Number(e.target.value));
                setActiveExperiment('custom');
              }}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">
                Capacitance (C) — <span className="text-emerald-300">Capacitive Reactance (X_C = {XC.toFixed(1)}Ω)</span>:
              </span>
              <span className="font-mono text-emerald-400 font-semibold">{capacitance} µF</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={capacitance}
              onChange={(e) => {
                setCapacitance(Number(e.target.value));
                setActiveExperiment('custom');
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">
                Source Voltage (V) — <span className="text-cyan-300">AC Potential (RMS)</span>:
              </span>
              <span className="font-mono text-cyan-400 font-semibold">{voltage} V</span>
            </div>
            <input
              type="range"
              min="50"
              max="480"
              value={voltage}
              onChange={(e) => {
                setVoltage(Number(e.target.value));
                setActiveExperiment('custom');
              }}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
