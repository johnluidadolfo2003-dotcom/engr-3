import React from 'react';
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCcw,
  Zap,
  Layers,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { REESubjectId, QuestionAttempt, DiagnosticResult, StudyPlanConfig, AppLanguage } from '../types';
import { OFFICIAL_TOPIC_GROUPS, REE_SUBJECTS, SIX_MONTH_STUDY_ROADMAP } from '../data/prcCoverage';
import { LESSONS_DATA } from '../data/lessonsData';
import { t } from '../data/translations';

interface Props {
  onNavigate: (view: 'today' | 'learn' | 'practice' | 'terms' | 'progress') => void;
  onOpenDiagnostic: () => void;
  onOpenStudyPlan: () => void;
  onSelectLesson: (lessonId: string) => void;
  onStartDrill: (topicId?: string) => void;
  onOpenTutor: (topic?: string) => void;
  diagnosticResult: DiagnosticResult | null;
  studyPlan: StudyPlanConfig;
  attempts: QuestionAttempt[];
  language?: AppLanguage;
  onSelectLanguage?: (lang: AppLanguage) => void;
}

export const TodayView: React.FC<Props> = ({
  onNavigate,
  onOpenDiagnostic,
  onOpenStudyPlan,
  onSelectLesson,
  onStartDrill,
  onOpenTutor,
  diagnosticResult,
  studyPlan,
  attempts,
  language = 'en',
}) => {
  // Compute days until exam
  const today = new Date();
  const examDate = new Date(studyPlan.targetExamDate);
  const diffTime = examDate.getTime() - today.getTime();
  const daysUntilExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Coverage statistics across the 30 official groups
  const attemptedTopicIds = new Set(attempts.map((a) => a.topicGroupId));
  const coveredCount = OFFICIAL_TOPIC_GROUPS.filter((g) => attemptedTopicIds.has(g.id)).length;
  const coveragePercent = Math.round((coveredCount / OFFICIAL_TOPIC_GROUPS.length) * 100);

  // Subject breakdown
  const getSubjectCoverage = (subId: REESubjectId) => {
    const subGroups = OFFICIAL_TOPIC_GROUPS.filter((g) => g.subjectId === subId);
    const completed = subGroups.filter((g) => attemptedTopicIds.has(g.id)).length;
    return {
      completed,
      total: subGroups.length,
      pct: Math.round((completed / subGroups.length) * 100),
    };
  };

  const mathCoverage = getSubjectCoverage('MATH');
  const esasCoverage = getSubjectCoverage('ESAS');
  const eeCoverage = getSubjectCoverage('EE');

  // Identify weak foundation topics (from diagnostic and failed attempts)
  const failedTopicCounts: Record<string, number> = {};
  attempts
    .filter((a) => !a.isCorrect)
    .forEach((a) => {
      failedTopicCounts[a.topicGroupId] = (failedTopicCounts[a.topicGroupId] || 0) + 1;
    });

  const sortedWeakTopics = Object.entries(failedTopicCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([topicId]) => OFFICIAL_TOPIC_GROUPS.find((g) => g.id === topicId))
    .filter(Boolean);

  // Recommended topic for today
  const todayRecommendedTopic =
    sortedWeakTopics[0] ||
    OFFICIAL_TOPIC_GROUPS.find((g) => g.id === 'EE-01') ||
    OFFICIAL_TOPIC_GROUPS[0];

  const todayLesson =
    LESSONS_DATA.find((l) => l.topicGroupId === todayRecommendedTopic?.id) ||
    LESSONS_DATA[0];

  // Review Next queue
  const reviewNextQueue = [
    ...(diagnosticResult?.weakFoundations.map((wf) => ({
      title: wf,
      reason: 'Flagged in Diagnostic Assessment',
      type: 'foundation',
      topicId: 'EE-01',
    })) || []),
    ...sortedWeakTopics.slice(0, 3).map((wt) => ({
      title: wt!.name,
      reason: 'Repeated practice mistakes',
      type: 'mistake',
      topicId: wt!.id,
    })),
  ];

  // Default queue items if empty
  if (reviewNextQueue.length === 0) {
    reviewNextQueue.push(
      {
        title: 'AC Circuits: Power Factor & Delta-Wye',
        reason: 'Core REE Board Foundation (18 items)',
        type: 'foundation',
        topicId: 'EE-01',
      },
      {
        title: 'Transformers: Efficiency & Reflected Impedance',
        reason: 'High-frequency board calculation (18 items)',
        type: 'foundation',
        topicId: 'EE-03',
      },
      {
        title: 'PEC 1: Conductor Derating & Ampacity',
        reason: 'ESAS Code Compliance (18 items)',
        type: 'foundation',
        topicId: 'ESAS-10',
      }
    );
  }

  // 6 Structured Stages for Pathway list
  const pathwayStages = [
    {
      step: '1',
      title: 'Mathematics Foundations',
      desc: 'Master units, algebraic transformations, trigonometry, and polar phasor vectors.',
      lessonId: 'lesson-math-arithmetic-units',
      badge: 'Start Here',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      step: '2',
      title: 'DC Electrical Circuit Networks',
      desc: 'Understand voltage pushes, series-parallel resistor networks, and Kirchhoff’s current/voltage laws.',
      lessonId: 'lesson-ee-circuits-dc',
      badge: 'Essential Physics',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    },
    {
      step: '3',
      title: 'Alternating Current & Phasors',
      desc: 'Visualize sine waves, reactive elements (coils/capacitors), and right-triangle impedance power factor.',
      lessonId: 'lesson-math-trigonometry-triangles',
      badge: 'Core Impedance',
      badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    },
    {
      step: '4',
      title: '3-Phase Power Systems',
      desc: 'Model balanced delta-wye generator loads, line-vs-phase values, and power factor correction.',
      lessonId: 'lesson-ee-circuits-threephase',
      badge: 'High Frequency Board Topic',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    },
    {
      step: '5',
      title: 'Practice Drills & Formula Recall',
      desc: 'Test your formula recall, solve real board questions, and review custom step-by-step explanations.',
      action: () => onNavigate('practice'),
      badge: 'Active Recall',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 px-4 sm:px-6">
      {/* Dynamic Status & Countdown Header Banner */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex flex-col items-center justify-center text-cyan-400 font-mono">
            <span className="text-lg font-bold leading-none">{daysUntilExam}</span>
            <span className="text-[9px] uppercase font-bold tracking-tight text-slate-400">Days</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold font-mono">
                Study Goal countdown
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">
                {new Date(studyPlan.targetExamDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              Electrical Engineering Personal Workstation
            </h2>
            <div className="text-xs text-slate-400 flex items-center gap-2.5 mt-0.5">
              <span>{Math.floor(studyPlan.dailyStudyMinutes / 60)} hrs target daily review</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!diagnosticResult ? (
            <button
              onClick={onOpenDiagnostic}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Start diagnostic check (8 min)</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Diagnostic Complete</span>
            </div>
          )}
          <button
            onClick={onOpenStudyPlan}
            className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Target Date Settings</span>
          </button>
        </div>
      </div>

      {/* Main Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left / Main Column (Pathway Timeline) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#167D82] font-mono">
                Step-by-Step Study Pathway
              </span>
              <h3 className="text-lg font-extrabold text-[#14243A] tracking-tight mt-0.5">
                Recommended Sequential Flow (Zero to Master)
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Follow this sequence to build complete core electrical fluency. You can click any step to instantly start the corresponding interactive simulator or practice drill.
              </p>
            </div>

            {/* Vertical Flow Timeline */}
            <div className="space-y-4">
              {pathwayStages.map((stage, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (stage.lessonId) {
                      onSelectLesson(stage.lessonId);
                      onNavigate('learn');
                    } else if (stage.action) {
                      stage.action();
                    }
                  }}
                  className="group flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-[#167D82]/50 hover:bg-teal-50/20 transition-all cursor-pointer"
                >
                  {/* Number Circle */}
                  <div className="w-9 h-9 rounded-full bg-slate-900 group-hover:bg-[#167D82] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs transition-colors">
                    0{stage.step}
                  </div>

                  {/* Body */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#167D82] transition-colors">
                        {stage.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${stage.badgeColor}`}>
                        {stage.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal line-clamp-2 sm:line-clamp-none">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex items-center justify-center shrink-0 text-slate-300 group-hover:text-[#167D82] transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Six-Month Structured Milestones Block */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#167D82] font-mono">
                  Syllabus Milestones
                </span>
                <h3 className="text-lg font-bold text-[#14243A]">
                  Structured Six-Month Timeline Overview
                </h3>
              </div>
              <button
                onClick={onOpenStudyPlan}
                className="text-xs font-semibold text-[#167D82] hover:underline flex items-center gap-1"
              >
                <span>Syllabus breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SIX_MONTH_STUDY_ROADMAP.slice(0, 6).map((m) => (
                <div
                  key={m.monthNumber}
                  onClick={onOpenStudyPlan}
                  className="p-3.5 rounded-xl bg-[#F7F6F2] hover:bg-teal-50/60 border border-slate-200 hover:border-[#167D82]/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#167D82]">
                        Month {m.monthNumber}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#14243A] group-hover:text-[#167D82] line-clamp-1">
                      {m.monthTitle.split(':')[1]?.trim() || m.monthTitle}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 leading-normal line-clamp-2">
                      {m.focusTheme}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (My Daily Workstation Sidebar) */}
        <div className="space-y-6">
          
          {/* Section A: What to Study Today */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#167D82] block">
                Today's Best Action
              </span>
              <h3 className="text-base font-extrabold text-[#14243A] leading-snug tracking-tight mt-1">
                {todayLesson?.conceptName || todayRecommendedTopic?.name}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 mt-1.5 leading-relaxed">
                {todayLesson?.visualCaption || todayRecommendedTopic?.foundationRelevance}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 mt-4 space-y-1">
                <span className="font-bold text-[#14243A] block">Learning Strategy:</span>
                <span className="block leading-relaxed">See live visualization → Understand direct formulas → Solve quick questions. No complex algebra.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => onSelectLesson(todayLesson?.id)}
                className="flex-1 px-4 py-2.5 bg-[#167D82] hover:bg-[#167D82]/90 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Lesson</span>
              </button>
              <button
                onClick={() => onStartDrill(todayRecommendedTopic?.id)}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-all"
              >
                Practice
              </button>
            </div>
          </div>

          {/* Section B: Weaknesses & Mistakes Queue */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
                Weakness Checkup Queue
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                These topics are automatically prioritized based on your Diagnostic Assessment results and previous practice mistakes.
              </p>
            </div>

            <div className="space-y-2">
              {reviewNextQueue.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onStartDrill(item.topicId)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 transition-all cursor-pointer group flex items-start justify-between gap-2"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#14243A] group-hover:text-amber-800 line-clamp-1 leading-normal">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      {item.reason}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 shrink-0 mt-1" />
                </div>
              ))}
            </div>

            <button
              onClick={() => onStartDrill()}
              className="w-full px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset weaknesses queue</span>
            </button>
          </div>

          {/* Section C: PRC Syllabus Progress Check */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#14243A]">
                Syllabus Progress Check
              </span>
              <span className="text-xs font-bold text-[#167D82] font-mono">
                {coveredCount}/30 Groups ({coveragePercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#167D82] h-full transition-all duration-500"
                style={{ width: `${coveragePercent}%` }}
              />
            </div>

            {/* Breakdown lines */}
            <div className="space-y-2.5 text-[11px] text-slate-600">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-800">Mathematics (25% Weight)</span>
                  <span className="font-mono text-slate-500">{mathCoverage.completed}/10 Groups</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#167D82] h-full" style={{ width: `${mathCoverage.pct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-800">ESAS (30% Weight)</span>
                  <span className="font-mono text-slate-500">{esasCoverage.completed}/10 Groups</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: `${esasCoverage.pct}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-800">EE Professional (45% Weight)</span>
                  <span className="font-mono text-slate-500">{eeCoverage.completed}/10 Groups</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-slate-900 h-full" style={{ width: `${eeCoverage.pct}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('progress')}
              className="w-full px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Full Syllabus Progress Map</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
