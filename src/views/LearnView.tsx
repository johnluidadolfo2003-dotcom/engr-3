import React, { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Zap,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Compass,
  Bot,
  Activity,
  Sliders,
} from 'lucide-react';
import { LessonContent, REESubjectId, AppLanguage } from '../types';
import { OFFICIAL_TOPIC_GROUPS, REE_SUBJECTS } from '../data/prcCoverage';
import { LESSONS_DATA } from '../data/lessonsData';
import {
  SUPPORTED_LANGUAGES,
  t,
  getLessonSimplifiedGuide,
  getLessonConceptName,
  getLessonPlainExplanation,
} from '../data/translations';
import { MathView } from '../components/MathView';
import { AbsoluteBasicsVisual } from '../components/InteractiveVisuals/AbsoluteBasicsVisual';
import { DcCircuitSimVisual } from '../components/InteractiveVisuals/DcCircuitSimVisual';
import { CircuitSimVisual } from '../components/InteractiveVisuals/CircuitSimVisual';
import { PowerTrianglePhasorVisual } from '../components/InteractiveVisuals/PowerTrianglePhasorVisual';
import { TransformerMachineVisual } from '../components/InteractiveVisuals/TransformerMachineVisual';
import { TransmissionLineVisual } from '../components/InteractiveVisuals/TransmissionLineVisual';
import { CalculusGraphVisual } from '../components/InteractiveVisuals/CalculusGraphVisual';
import { MechanicsFbdVisual } from '../components/InteractiveVisuals/MechanicsFbdVisual';
import { AlgebraVisual } from '../components/InteractiveVisuals/AlgebraVisual';
import { UnitsConverterVisual } from '../components/InteractiveVisuals/UnitsConverterVisual';
import { TrigTriangleVisual } from '../components/InteractiveVisuals/TrigTriangleVisual';
import { ComplexNumbersVisual } from '../components/InteractiveVisuals/ComplexNumbersVisual';
import { FIVE_UNLOCK_FOUNDATIONS } from '../data/foundationCurriculum';

interface Props {
  selectedLessonId?: string;
  onSelectLesson: (id: string) => void;
  onPracticeQuestion: (questionId: string) => void;
  onOpenTutor: (topic?: string, lessonContext?: any) => void;
  onOpenTerm: (term: string) => void;
  language?: AppLanguage;
  onSelectLanguage?: (lang: AppLanguage) => void;
}

export const LearnView: React.FC<Props> = ({
  selectedLessonId,
  onSelectLesson,
  onPracticeQuestion,
  onOpenTutor,
  onOpenTerm,
  language = 'en',
  onSelectLanguage,
}) => {
  const [activeSubject, setActiveSubject] = useState<REESubjectId>('EE');
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(true); // Default to Simple Mode for easiest learning
  const [showExplainMore, setShowExplainMore] = useState(false);
  const [showFullDerivation, setShowFullDerivation] = useState(false);
  const [quickCheckAnswer, setQuickCheckAnswer] = useState<number | null>(null);
  const [showSimExplainer, setShowSimExplainer] = useState(false);

  // Active lesson
  const currentLesson: LessonContent =
    LESSONS_DATA.find((l) => l.id === selectedLessonId) ||
    LESSONS_DATA.find((l) => {
      const group = OFFICIAL_TOPIC_GROUPS.find((g) => g.id === l.topicGroupId);
      return group?.subjectId === activeSubject;
    }) ||
    LESSONS_DATA[0];

  const currentTopicGroup = OFFICIAL_TOPIC_GROUPS.find(
    (g) => g.id === currentLesson.topicGroupId
  );

  const currentLang = language;
  const simpleGuide = getLessonSimplifiedGuide(currentLesson, currentLang);
  const localizedConceptName = getLessonConceptName(currentLesson, currentLang);
  const localizedPlainExplanation = getLessonPlainExplanation(currentLesson, currentLang);

  // Render the appropriate interactive visual component
  const renderVisual = (type: string) => {
    switch (type) {
      case 'basics_zero':
        return <AbsoluteBasicsVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'units_converter':
        return <UnitsConverterVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'trig_triangle':
        return <TrigTriangleVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'complex_numbers':
        return <ComplexNumbersVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'dc_circuit':
        return <DcCircuitSimVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'circuit':
        return <CircuitSimVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'phasor':
        return <PowerTrianglePhasorVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'transformer':
        return <TransformerMachineVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'transmission':
        return <TransmissionLineVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'calculus':
        return <CalculusGraphVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'algebra':
        return <AlgebraVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      case 'mechanics':
        return <MechanicsFbdVisual language={currentLang} onOpenTutor={onOpenTutor} />;
      default:
        return <DcCircuitSimVisual language={currentLang} onOpenTutor={onOpenTutor} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-16">
      {/* THE 5 UNLOCK FOUNDATIONS COMPACT QUICK BAR */}
      <div className="bg-slate-900 text-white rounded-xl p-3 border border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded shrink-0">
            Core 5
          </span>
          <span className="text-xs font-bold text-white hidden sm:inline">Foundational Sequence:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {FIVE_UNLOCK_FOUNDATIONS.map((f) => {
            const isCurrent = currentLesson.id === f.lessonId;
            return (
              <button
                key={f.step}
                onClick={() => {
                  const targetLesson = LESSONS_DATA.find((l) => l.id === f.lessonId);
                  if (targetLesson) {
                    const g = OFFICIAL_TOPIC_GROUPS.find((tg) => tg.id === targetLesson.topicGroupId);
                    if (g) setActiveSubject(g.subjectId);
                  }
                  onSelectLesson(f.lessonId);
                }}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-cyan-700 border-cyan-500 text-white shadow-xs'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400">#0{f.step}</span>
                <span className="truncate max-w-[130px]">{f.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Filter, Mode Switch & Language Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5">
          {(['EE', 'MATH', 'ESAS'] as REESubjectId[]).map((subId) => {
            const sub = REE_SUBJECTS[subId];
            const isActive = activeSubject === subId;
            return (
              <button
                key={subId}
                onClick={() => {
                  setActiveSubject(subId);
                  const firstInSub = LESSONS_DATA.find((l) => {
                    const g = OFFICIAL_TOPIC_GROUPS.find((tg) => tg.id === l.topicGroupId);
                    return g?.subjectId === subId;
                  });
                  if (firstInSub) onSelectLesson(firstInSub.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{sub.name}</span>
                <span className="ml-1 opacity-70">({sub.weightPercent}%)</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* LANGUAGE SELECTOR */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.id}
                onClick={() => onSelectLanguage?.(l.id)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                  currentLang === l.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
                title={l.nativeName}
              >
                <span>{l.shortCode}</span>
              </button>
            ))}
          </div>

          {/* MODE TOGGLE */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setIsSimpleMode(true)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                isSimpleMode
                  ? 'bg-cyan-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Intuitive Concept</span>
            </button>
            <button
              onClick={() => setIsSimpleMode(false)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                !isSimpleMode
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Technical Formulas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Selector Carousel / Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {LESSONS_DATA.map((lesson) => {
          const group = OFFICIAL_TOPIC_GROUPS.find((g) => g.id === lesson.topicGroupId);
          const isCurrent = lesson.id === currentLesson.id;
          const lessonName = getLessonConceptName(lesson, currentLang);
          return (
            <button
              key={lesson.id}
              onClick={() => {
                onSelectLesson(lesson.id);
                setShowExplainMore(false);
                setShowFullDerivation(false);
                setQuickCheckAnswer(null);
                if (group) setActiveSubject(group.subjectId);
              }}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isCurrent
                  ? 'bg-cyan-700 border-cyan-700 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span className="font-mono text-[10px] opacity-80">{group?.id}</span>
              <span>{lessonName}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN LESSON CONTAINER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Lesson Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-0.5">
              <span>{currentTopicGroup?.subjectId}</span>
              <span>·</span>
              <span>{currentTopicGroup?.name}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              {localizedConceptName}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const prompt = `Please provide a concise step-by-step engineering walkthrough for ${currentLesson.conceptName} with real values and board exam practice.`;
                onOpenTutor(localizedConceptName, prompt);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask Tutor</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* EE-01 PROGRESSIVE STEP-BY-STEP LADDER */}
          {currentTopicGroup?.id === 'EE-01' && (
            <div className="bg-slate-900 text-slate-100 rounded-xl p-3 border border-slate-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  {
                    level: 'Level 0',
                    id: 'lesson-ee-absolute-basics-zero',
                    title: 'Fundamentals',
                    sub: 'V, I, R & Loops',
                  },
                  {
                    level: 'Level 1',
                    id: 'lesson-ee-basic-dc-circuits',
                    title: 'DC Networks',
                    sub: 'Series & Parallel',
                  },
                  {
                    level: 'Level 2',
                    id: 'lesson-ee-ac-circuits-power-triangle',
                    title: 'AC & Phasors',
                    sub: 'Power Triangle',
                  },
                  {
                    level: 'Level 3',
                    id: 'lesson-ee-three-phase-wye-delta',
                    title: '3-Phase Systems',
                    sub: 'Wye & Delta',
                  },
                ].map((step) => {
                  const isCurrent = currentLesson.id === step.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => onSelectLesson(step.id)}
                      className={`p-2 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-cyan-950 border-cyan-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                        <span className={isCurrent ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                          {step.level}
                        </span>
                        {isCurrent && (
                          <span className="text-cyan-300 text-[9px] font-bold">●</span>
                        )}
                      </div>
                      <div className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                        {step.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive Simulation Mount (Rendered Once) */}
          <section className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700 uppercase tracking-wide">
                Interactive Simulation Studio
              </span>
              <span className="font-mono text-[11px]">{currentLesson.visualCaption.slice(0, 50)}...</span>
            </div>
            {renderVisual(currentLesson.seeItType)}
          </section>

          {/* Governing Mathematical Formulas */}
          <section className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                Governing Equations
              </span>
              <span className="text-[10px] font-mono text-slate-400">SI Units & Formulas</span>
            </div>

            <div className="py-2 overflow-x-auto text-center">
              <MathView math={currentLesson.formulaLatex} block={true} className="text-base sm:text-lg font-mono text-cyan-300" />
            </div>

            {/* Symbols Table */}
            {currentLesson.symbols && currentLesson.symbols.length > 0 && (
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {currentLesson.symbols.map((sym, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="font-mono font-bold text-amber-400">{sym.symbol}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{sym.unit}</span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium truncate">{sym.name}</div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ZERO ALGEBRA FOUNDATION HELPER */}
          <section className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base">⚖️</span>
                <span className="font-bold text-amber-950 uppercase tracking-wide">
                  Zero-Algebra Quick Rules (Simple Math Method)
                </span>
              </div>
              <button
                onClick={() => {
                  const prompt = `Engr. Ramos, I do not have a strong foundation in algebra. Please explain the math for ${localizedConceptName} step-by-step using super simple numbers and no complex equations!`;
                  onOpenTutor(localizedConceptName, prompt);
                }}
                className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-[11px] transition-colors shadow-xs"
              >
                Ask Tutor: Explain Math Simply
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-amber-900 block">1. Balance Scale Rule</span>
                <span className="text-slate-600 leading-snug block">An = sign is a balanced scale. Whatever move you do on the left side, do the exact same on the right.</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-amber-900 block">2. Crossing the = Sign</span>
                <span className="text-slate-600 leading-snug block">To move a multiplied number across =, divide! To move a divided number, multiply! To move +, subtract!</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-amber-900 block">3. The Triangle Cover Trick</span>
                <span className="text-slate-600 leading-snug block">For 3-part equations like V = I · R: cover the unknown variable with your thumb to see the exact formula!</span>
              </div>
            </div>
          </section>

          {/* Technical Concept & Physical Mechanism */}
          <section className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Core Technical Principle
            </div>

            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              {currentLesson.plainExplanation}
            </p>

            {simpleGuide?.realLifeMetaphor && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">
                  Physical Mechanism: {simpleGuide.realLifeMetaphor.title}
                </span>
                <p className="text-slate-600 leading-relaxed">{simpleGuide.realLifeMetaphor.story}</p>
              </div>
            )}
          </section>

          {/* Worked Example */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Step-by-Step Problem Solution
              </span>
              <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                Standard Analysis
              </span>
            </div>

            <div className="text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
              {currentLesson.workedExample.problemStatement}
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              {currentLesson.workedExample.stepByStep.map((step, idx) => (
                <div key={idx} className="leading-relaxed flex items-start gap-2 bg-slate-50/60 p-2 rounded-lg border border-slate-100">
                  <span className="text-cyan-700 font-bold">•</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs">
                <span className="font-bold text-slate-900">Final Result: </span>
                <span className="font-mono font-bold text-cyan-700 text-sm">
                  {currentLesson.workedExample.answerWithUnits}
                </span>
              </div>
            </div>
          </section>

          {/* Quick Concept Check */}
          <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Concept Verification
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Quick Check</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-900 font-medium">
              {currentLesson.quickCheck.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentLesson.quickCheck.choices.map((choice, cIdx) => {
                const isSelected = quickCheckAnswer === cIdx;
                const isCorrect = cIdx === currentLesson.quickCheck.correctIndex;
                const hasAnswered = quickCheckAnswer !== null;

                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                if (hasAnswered) {
                  if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold';
                  else if (isSelected) btnStyle = 'bg-red-50 border-red-400 text-red-800';
                  else btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }

                return (
                  <button
                    key={cIdx}
                    disabled={hasAnswered}
                    onClick={() => setQuickCheckAnswer(cIdx)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                  >
                    <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + cIdx)}.</span>
                    <span>{choice}</span>
                  </button>
                );
              })}
            </div>

            {quickCheckAnswer !== null && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  quickCheckAnswer === currentLesson.quickCheck.correctIndex
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {quickCheckAnswer === currentLesson.quickCheck.correctIndex ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">
                    {quickCheckAnswer === currentLesson.quickCheck.correctIndex ? 'Correct' : 'Explanation'}
                  </div>
                  <div>{currentLesson.quickCheck.explanation}</div>
                </div>
              </div>
            )}

            {/* Practice Button */}
            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onPracticeQuestion(currentLesson.boardStyleQuestionId)}
                className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Practice Technical Problem</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
