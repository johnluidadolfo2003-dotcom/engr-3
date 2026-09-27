import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { DiagnosticResult, REESubjectId } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: DiagnosticResult) => void;
}

interface DiagQuestion {
  id: string;
  subject: REESubjectId;
  foundationTopic: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  trapNote: string;
}

const DIAG_QUESTIONS: DiagQuestion[] = [
  {
    id: 'diag-1',
    subject: 'MATH',
    foundationTopic: 'Trigonometry & Phasor Angles',
    prompt: 'In a balanced 3-phase Wye (Y) system, what is the mathematical relationship between the Line-to-Line voltage (V_LL) and Line-to-Neutral phase voltage (V_LN)?',
    choices: [
      'V_LL = V_LN / √3',
      'V_LL = √3 · V_LN ∠+30°',
      'V_LL = 3 · V_LN',
      'V_LL = V_LN (they are identical in Wye)',
    ],
    correctIndex: 1,
    trapNote: 'Confusing Wye with Delta: In Wye, V_LL is √3 larger than V_LN and leads by 30°.',
  },
  {
    id: 'diag-2',
    subject: 'MATH',
    foundationTopic: 'Calculus Optimization',
    prompt: 'At what condition does a power transformer or DC generator achieve its absolute maximum electrical efficiency?',
    choices: [
      'When copper losses are equal to zero',
      'When variable copper losses equal constant core losses',
      'When operating at exactly 100% full nameplate kVA rating',
      'When power factor is strictly 0.80 lagging',
    ],
    correctIndex: 1,
    trapNote: 'Maximum efficiency occurs where variable I²R loss equals constant iron loss.',
  },
  {
    id: 'diag-3',
    subject: 'EE',
    foundationTopic: 'AC Circuit Resonance',
    prompt: 'When a series R-L-C circuit operates at its resonant frequency (f₀ = 1 / [2π√LC]), what is the total circuit impedance Z?',
    choices: [
      'Z = 0 Ω (short circuit)',
      'Z = R Ω at unity power factor',
      'Z = √(R² + (XL + XC)²)',
      'Z is purely imaginary (jX)',
    ],
    correctIndex: 1,
    trapNote: 'At resonance, XL = XC, so net reactance cancels to zero and Z = R.',
  },
  {
    id: 'diag-4',
    subject: 'EE',
    foundationTopic: 'Transformer Impedance Reflection',
    prompt: 'A 2400/240 V step-down transformer (turns ratio a = 10) has a 5 Ω resistor connected across its 240 V secondary. What resistance is seen by the 2400 V primary source?',
    choices: [
      '0.05 Ω',
      '50 Ω',
      '500 Ω',
      '5 Ω',
    ],
    correctIndex: 2,
    trapNote: 'Impedance scales by a²: Z₁’ = a² · Z_L = 10² · 5 = 500 Ω.',
  },
  {
    id: 'diag-5',
    subject: 'ESAS',
    foundationTopic: 'Philippine Electrical Law (RA 7920)',
    prompt: 'Under R.A. 7920 (The New Electrical Engineering Law), what is the statutory passing grade for the REE Board Licensure Examination?',
    choices: [
      'General Weighted Average of at least 70% with no grade below 50% in any subject',
      'At least 75% in all three examination subjects',
      'General Weighted Average of at least 70% with no grade below 60%',
      'Overall average of 70% regardless of individual subject scores',
    ],
    correctIndex: 0,
    trapNote: 'RA 7920 Sec. 18 mandates GWA ≥ 70% with no subject below 50%.',
  },
  {
    id: 'diag-6',
    subject: 'ESAS',
    foundationTopic: 'Philippine Electrical Code (PEC 1)',
    prompt: 'When multiple current-carrying conductors are installed in a single raceway, what does the Philippine Electrical Code require to prevent dangerous overheating?',
    choices: [
      'Increase the circuit breaker trip rating by 125%',
      'Derate the conductor table ampacity using conduit fill adjustment factors',
      'Switch all copper conductors to bare aluminum',
      'Use zero derating as long as insulation is THHN',
    ],
    correctIndex: 1,
    trapNote: 'PEC 3.10 requires both ambient temperature derating and conduit fill adjustment.',
  },
  {
    id: 'diag-7',
    subject: 'EE',
    foundationTopic: 'Transmission Line Dynamics',
    prompt: 'What causes the Ferranti Effect (receiving end voltage exceeding sending end voltage) on long high-voltage transmission lines?',
    choices: [
      'Heavy inductive lagging motor loads at the receiving substation',
      'Line capacitive charging current flowing through the series inductive reactance under no-load',
      'Extreme atmospheric lightning discharges',
      'Transformer core saturation at the sending generator',
    ],
    correctIndex: 1,
    trapNote: 'Capacitive charging current produces a negative voltage drop (voltage rise).',
  },
  {
    id: 'diag-8',
    subject: 'MATH',
    foundationTopic: 'Complex Numbers & Vectors',
    prompt: 'What is the polar form of the complex impedance Z = 30 + j40 Ω?',
    choices: [
      '50 ∠36.87° Ω',
      '50 ∠53.13° Ω',
      '70 ∠45.00° Ω',
      '35 ∠30.00° Ω',
    ],
    correctIndex: 1,
    trapNote: 'Magnitude = √(30² + 40²) = 50. Angle = arctan(40/30) = 53.13° (not 36.87°).',
  },
];

export const DiagnosticModal: React.FC<Props> = ({ isOpen, onClose, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = DIAG_QUESTIONS[currentIdx];
  const hasSelected = selectedAnswers[currentIdx] !== undefined;

  const handleSelect = (choiceIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: choiceIdx }));
  };

  const handleNext = () => {
    if (currentIdx < DIAG_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Evaluate results
      evaluateAndFinish();
    }
  };

  const evaluateAndFinish = () => {
    let mathCorrect = 0;
    let mathTotal = 0;
    let esasCorrect = 0;
    let esasTotal = 0;
    let eeCorrect = 0;
    let eeTotal = 0;
    const weakFoundations: string[] = [];

    DIAG_QUESTIONS.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctIndex;
      if (q.subject === 'MATH') {
        mathTotal++;
        if (isCorrect) mathCorrect++;
        else weakFoundations.push(q.foundationTopic);
      } else if (q.subject === 'ESAS') {
        esasTotal++;
        if (isCorrect) esasCorrect++;
        else weakFoundations.push(q.foundationTopic);
      } else {
        eeTotal++;
        if (isCorrect) eeCorrect++;
        else weakFoundations.push(q.foundationTopic);
      }
    });

    const totalCorrect = mathCorrect + esasCorrect + eeCorrect;
    const overallScore = Math.round((totalCorrect / DIAG_QUESTIONS.length) * 100);

    const result: DiagnosticResult = {
      completedAt: new Date().toISOString(),
      overallScore,
      subjectScores: {
        MATH: Math.round((mathCorrect / (mathTotal || 1)) * 100),
        ESAS: Math.round((esasCorrect / (esasTotal || 1)) * 100),
        EE: Math.round((eeCorrect / (eeTotal || 1)) * 100),
      },
      weakFoundations,
      recommendedStartingTopic:
        weakFoundations.length > 0 ? weakFoundations[0] : 'AC Circuits & Power Factor',
    };

    setIsFinished(true);
    onComplete(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#14243A] text-slate-100 w-full max-w-xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#167D82]" />
            <div>
              <h3 className="font-bold text-white text-base">
                REE Foundation Diagnostic Assessment
              </h3>
              <p className="text-xs text-slate-400">
                Identify foundational gaps & adapt your six-month review path
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {!isFinished ? (
            <div>
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>
                  Question {currentIdx + 1} of {DIAG_QUESTIONS.length}
                </span>
                <span className="font-semibold text-[#167D82]">
                  {currentQ.subject} · {currentQ.foundationTopic}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mb-6 overflow-hidden">
                <div
                  className="bg-[#167D82] h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / DIAG_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question prompt */}
              <h4 className="text-base font-medium text-white mb-5 leading-relaxed">
                {currentQ.prompt}
              </h4>

              {/* Choices */}
              <div className="space-y-2.5 mb-6">
                {currentQ.choices.map((choice, cIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === cIdx;
                  return (
                    <button
                      key={cIdx}
                      onClick={() => handleSelect(cIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#167D82]/20 border-[#167D82] text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-[#167D82] text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + cIdx)}
                      </div>
                      <span className="flex-1 leading-snug">{choice}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation button */}
              <div className="flex justify-end">
                <button
                  disabled={!hasSelected}
                  onClick={handleNext}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                    hasSelected
                      ? 'bg-[#167D82] text-white hover:bg-[#167D82]/90 shadow-md'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>{currentIdx === DIAG_QUESTIONS.length - 1 ? 'Analyze Foundation' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-600/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Diagnostic Completed!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your diagnostic results have been incorporated into your personalized six-month study path.
                Weak foundations have been scheduled for priority review.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#167D82] hover:bg-[#167D82]/90 text-white font-semibold rounded-xl text-sm transition-all"
              >
                Go to Study Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
