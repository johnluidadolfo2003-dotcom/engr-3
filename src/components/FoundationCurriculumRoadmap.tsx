import React, { useState } from 'react';
import { AppLanguage } from '../types';
import {
  FOUNDATION_STAGES,
  FIVE_UNLOCK_FOUNDATIONS,
  FIVE_STEP_ROUTINE,
  FoundationStage,
  FoundationTopic,
} from '../data/foundationCurriculum';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Lock,
  Unlock,
  Zap,
  BookOpen,
  Layers,
  ChevronRight,
  HelpCircle,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';

interface Props {
  language?: AppLanguage;
  onSelectLesson: (lessonId: string) => void;
  onNavigate: (view: 'today' | 'learn' | 'practice' | 'terms' | 'progress') => void;
}

export const FoundationCurriculumRoadmap: React.FC<Props> = ({
  language = 'en',
  onSelectLesson,
  onNavigate,
}) => {
  const [activeStageNumber, setActiveStageNumber] = useState<number>(1);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>('math-arithmetic-units');
  const [checkedRoutineSteps, setCheckedRoutineSteps] = useState<Record<number, boolean>>({});

  const activeStage =
    FOUNDATION_STAGES.find((s) => s.stageNumber === activeStageNumber) || FOUNDATION_STAGES[0];

  const selectedTopic =
    activeStage.topics.find((t) => t.id === selectedTopicId) || activeStage.topics[0];

  const toggleRoutineStep = (stepNum: number) => {
    setCheckedRoutineSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  const handleStartTopic = (topic: FoundationTopic) => {
    if (topic.lessonId) {
      onSelectLesson(topic.lessonId);
      onNavigate('learn');
    }
  };

  // Text translations
  const langText = {
    en: {
      heroTag: 'CURRICULUM',
      heroTitle: 'Electrical Engineering Study Pathway',
      heroSubtitle:
        'A structured progression from core mathematics and physical principles to circuit networks and power systems.',
      startHereTag: 'FOUNDATIONAL MODULES',
      startHereDesc:
        'Master these five core foundations to build fluency across DC, AC, and power systems analysis:',
      stepRoutineTitle: '5-Step Problem Solving Routine',
      stepRoutineSubtitle:
        'A disciplined workflow for solving technical engineering problems:',
      curriculumStagesTitle: 'Progressive Curriculum Stages',
      startLessonButton: 'Open Lesson',
      keyConceptsLabel: 'Governing Principles:',
      mentalModelLabel: 'Physical Model:',
    },
    tl: {
      heroTag: 'KURIKULUM',
      heroTitle: 'Direksyon sa Pag-aaral ng Electrical Engineering',
      heroSubtitle:
        'Maayos at sunod-sunod na pag-aaral mula sa matematika at pisika hanggang sa circuits at power systems.',
      startHereTag: 'PANGUNAHING MGA MODYUL',
      startHereDesc:
        'Kabisaduhin ang limang pundasyong ito upang maging madali ang pagsusuri ng circuits at power:',
      stepRoutineTitle: '5-Hakbang na Proseso sa Pag-solve',
      stepRoutineSubtitle:
        'Epektibong disiplina sa paglutas ng mga teknikal na problema:',
      curriculumStagesTitle: 'Mga Yugto ng Kurikulum',
      startLessonButton: 'Buksan ang Aralin',
      keyConceptsLabel: 'Pangunahing Prinsipyo:',
      mentalModelLabel: 'Imaheng Pisikal:',
    },
    ceb: {
      heroTag: 'KURIKULUM',
      heroTitle: 'Direksyon sa Pagtuon sa Electrical Engineering',
      heroSubtitle:
        'Han-ay nga pagtuon gikan sa matematika ug pisika ngadto sa circuits ug power systems.',
      startHereTag: 'PANGUNANG MGA MODYUL',
      startHereDesc:
        'Klaroha kining lima ka pundasyon aron dali masabtan ang circuits ug power analysis:',
      stepRoutineTitle: '5-Lakang nga Proseso sa Pag-solve',
      stepRoutineSubtitle:
        'Epektibong pamaagi sa pagsulbad sa teknikal nga mga problema:',
      curriculumStagesTitle: 'Mga Yugto sa Kurikulum',
      startLessonButton: 'Ablihi ang Leksyon',
      keyConceptsLabel: 'Pangunang Prinsipyo:',
      mentalModelLabel: 'Hulagway sa Hunahuna:',
    },
  }[language];

  return (
    <div className="space-y-5">
      {/* HERO BANNER: THE EXACT PHILOSOPHY & STUDY ORDER */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                {langText.heroTag}
              </span>
              <span className="text-xs text-slate-400">
                Electrical Engineering Curriculum
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {langText.heroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {langText.heroSubtitle}
            </p>
          </div>
        </div>

        {/* 5 UNLOCK FOUNDATIONS TO START RIGHT NOW */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {langText.startHereTag}
            </h3>
          </div>
          <p className="text-xs text-slate-300 mb-2.5">{langText.startHereDesc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {FIVE_UNLOCK_FOUNDATIONS.map((f) => (
              <button
                key={f.step}
                onClick={() => {
                  onSelectLesson(f.lessonId);
                  onNavigate('learn');
                }}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-600 text-left transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 font-bold mb-1">
                    <span>STEP {f.step}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {f.why}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* THE 5-STEP SOLVING ROUTINE */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {langText.stepRoutineTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{langText.stepRoutineSubtitle}</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Standard Technical Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {FIVE_STEP_ROUTINE.map((r) => {
            const isDone = checkedRoutineSteps[r.step];
            return (
              <div
                key={r.step}
                onClick={() => toggleRoutineStep(r.step)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-colors select-none ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STEP {r.step}
                  </span>
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isDone ? 'text-emerald-600' : 'text-slate-300'
                    }`}
                  />
                </div>
                <div className="text-xs font-bold mb-1">{r.name}</div>
                <div className="text-[11px] text-slate-600 leading-snug">{r.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6-STAGE PROGRESSIVE CURRICULUM EXPLORER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Stage Selector Tabs */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {FOUNDATION_STAGES.map((s) => {
            const isActive = s.stageNumber === activeStageNumber;
            return (
              <button
                key={s.stageNumber}
                onClick={() => {
                  setActiveStageNumber(s.stageNumber);
                  setSelectedTopicId(s.topics[0]?.id || null);
                }}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'bg-cyan-700 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-cyan-300">
                  Stage {s.stageNumber}
                </span>
                <span>{s.stageShortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Stage Details & Topics Grid */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Stage Intro Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Stage {activeStage.stageNumber}: {activeStage.stageName}
              </div>
              <span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                {activeStage.topics.length} Sequential Modules
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeStage.description}
            </p>

            {activeStage.mentalModel && (
              <div className="p-3 rounded-lg bg-cyan-950 text-cyan-200 border border-cyan-800 text-xs flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">{langText.mentalModelLabel} </strong>
                  {activeStage.mentalModel}
                </div>
              </div>
            )}
          </div>

          {/* Topics List & Selected Topic Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Sequential Topic List */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Study in this exact order:
              </div>
              {activeStage.topics.map((topic, idx) => {
                const isSelected = (selectedTopicId || activeStage.topics[0].id) === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-colors flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-cyan-900/60 text-cyan-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {activeStage.stageNumber}.{idx + 1}
                        </span>
                        {topic.isUnlockFoundation && (
                          <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1 rounded">
                            Unlock #{topic.unlockOrder}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold leading-tight">{topic.topicTitle}</div>
                      <div
                        className={`text-[11px] line-clamp-1 ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {topic.summary}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-2 ${
                        isSelected ? 'text-cyan-400' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Topic Deep-Dive Box */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-700 font-bold">
                    Module Deep-Dive
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{selectedTopic.topicTitle}</h4>
                </div>
                {selectedTopic.lessonId && (
                  <button
                    onClick={() => handleStartTopic(selectedTopic)}
                    className="px-3.5 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-200" />
                    <span>{langText.startLessonButton}</span>
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedTopic.summary}
              </p>

              {/* Key Concepts */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  {langText.keyConceptsLabel}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedTopic.keyConcepts.map((kc, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{kc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Action Call-to-Action */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span>Routine: Diagram → Concept Example → Standard Problem → Timed Analysis</span>
                {selectedTopic.lessonId && (
                  <button
                    onClick={() => handleStartTopic(selectedTopic)}
                    className="text-cyan-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Open in Learn Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
