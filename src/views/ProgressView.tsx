import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Filter,
  BarChart3,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { OFFICIAL_TOPIC_GROUPS, REE_SUBJECTS, PRC_LEGAL_METADATA } from '../data/prcCoverage';
import { QuestionAttempt, REESubjectId, MistakeCause } from '../types';

interface Props {
  attempts: QuestionAttempt[];
  onSelectTopicForPractice: (topicId: string) => void;
}

export const ProgressView: React.FC<Props> = ({ attempts, onSelectTopicForPractice }) => {
  const [selectedSubject, setSelectedSubject] = useState<REESubjectId | 'ALL'>('ALL');
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  // Overall statistics
  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((a) => a.isCorrect).length;
  const overallAccuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  const totalTimeSeconds = attempts.reduce((acc, a) => acc + a.timeSpentSeconds, 0);
  const avgTimeSeconds = totalAttempts > 0 ? Math.round(totalTimeSeconds / totalAttempts) : 0;

  // Mistake cause counts
  const mistakeCounts: Record<MistakeCause, number> = {
    missing_concept: 0,
    wrong_formula: 0,
    algebra: 0,
    units: 0,
    calculator: 0,
    time_pressure: 0,
  };

  attempts
    .filter((a) => !a.isCorrect && a.mistakeCause)
    .forEach((a) => {
      if (a.mistakeCause) mistakeCounts[a.mistakeCause]++;
    });

  // Coverage statistics across 30 official groups
  const attemptedTopicMap: Record<string, { total: number; correct: number; totalTime: number }> = {};
  attempts.forEach((a) => {
    if (!attemptedTopicMap[a.topicGroupId]) {
      attemptedTopicMap[a.topicGroupId] = { total: 0, correct: 0, totalTime: 0 };
    }
    attemptedTopicMap[a.topicGroupId].total++;
    if (a.isCorrect) attemptedTopicMap[a.topicGroupId].correct++;
    attemptedTopicMap[a.topicGroupId].totalTime += a.timeSpentSeconds;
  });

  const filteredGroups = OFFICIAL_TOPIC_GROUPS.filter((g) => {
    if (selectedSubject === 'ALL') return true;
    return g.subjectId === selectedSubject;
  });

  const causeLabels: Record<MistakeCause, { label: string; color: string }> = {
    missing_concept: { label: 'Missing Concept', color: 'bg-red-500' },
    wrong_formula: { label: 'Wrong Formula', color: 'bg-amber-500' },
    algebra: { label: 'Algebra Error', color: 'bg-purple-500' },
    units: { label: 'Units / Conversion', color: 'bg-blue-500' },
    calculator: { label: 'Computation Slip', color: 'bg-orange-500' },
    time_pressure: { label: 'Time Pressure', color: 'bg-rose-500' },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#167D82] font-semibold mb-1">
              <span>PRC Enhanced Table of Specifications (Annex A)</span>
              <span>·</span>
              <span>PRBEE Res. 40 s. 2024</span>
            </div>
            <h2 className="text-xl font-bold text-[#14243A]">
              PRC REE Official Coverage & Performance Progress
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-mono bg-[#F7F6F2] px-3.5 py-2 rounded-xl border border-slate-200">
            Passing Criteria: GWA ≥ 70%, no subject &lt; 50% (RA 7920 Sec. 18)
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          Factual coverage tracking against the 30 official topic groups prescribed by the Professional Regulatory Board of Electrical Engineering.
          Item counts total exactly 100 items per subject in their respective Tables of Specifications.
        </p>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 mb-1">Total Answered</div>
          <div className="text-2xl font-bold text-[#14243A] font-mono">{totalAttempts}</div>
          <div className="text-[11px] text-slate-400 mt-1">Practice & Drill attempts</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 mb-1">Overall Accuracy</div>
          <div className="text-2xl font-bold text-[#167D82] font-mono">{overallAccuracy}%</div>
          <div className="text-[11px] text-slate-400 mt-1">{correctAttempts} of {totalAttempts} correct</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 mb-1">Average Time / Item</div>
          <div className="text-2xl font-bold text-amber-600 font-mono">{avgTimeSeconds}s</div>
          <div className="text-[11px] text-slate-400 mt-1">Board target: 90 - 150s</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 mb-1">TOS Groups Attempted</div>
          <div className="text-2xl font-bold text-purple-700 font-mono">
            {Object.keys(attemptedTopicMap).length} / 30
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {Math.round((Object.keys(attemptedTopicMap).length / 30) * 100)}% Syllabus breadth
          </div>
        </div>
      </div>

      {/* MISTAKES BREAKDOWN BY CAUSE */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#14243A] uppercase tracking-wide">
              Mistakes Tracked by Root Cause
            </h3>
            <p className="text-xs text-slate-500">
              Categorizing errors ensures your study plan addresses actual deficits (e.g. computation slip vs conceptual gap).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {(Object.keys(causeLabels) as MistakeCause[]).map((causeKey) => {
            const count = mistakeCounts[causeKey];
            const meta = causeLabels[causeKey];
            return (
              <div
                key={causeKey}
                className="bg-[#F7F6F2] p-3 rounded-2xl border border-slate-200 text-center space-y-1"
              >
                <div className="text-xs font-bold text-[#14243A] truncate">{meta.label}</div>
                <div className="text-xl font-bold font-mono text-slate-800">{count}</div>
                <div className="text-[10px] text-slate-400">tagged mistakes</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 30 OFFICIAL TOPIC GROUPS TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#14243A]">
              The 30 Official PRC Table of Specifications Groups
            </h3>
            <p className="text-xs text-slate-500">
              Source: PRBEE Res. 40 s. 2024 · 100 items per subject TOS
            </p>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1 bg-[#F7F6F2] p-1 rounded-xl border border-slate-200">
            {(
              [
                { id: 'ALL', label: 'All 30 Groups' },
                { id: 'EE', label: 'EE (10 Groups, 45%)' },
                { id: 'MATH', label: 'Math (10 Groups, 25%)' },
                { id: 'ESAS', label: 'ESAS (10 Groups, 30%)' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedSubject(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedSubject === f.id
                    ? 'bg-white text-[#14243A] shadow-xs'
                    : 'text-slate-600 hover:text-[#14243A]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Groups List */}
        <div className="divide-y divide-slate-100">
          {filteredGroups.map((group) => {
            const stats = attemptedTopicMap[group.id];
            const accuracy = stats && stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null;
            const avgTime = stats && stats.total > 0 ? Math.round(stats.totalTime / stats.total) : null;
            const isExpanded = expandedGroupId === group.id;

            return (
              <div key={group.id} className="py-3.5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div
                    onClick={() => setExpandedGroupId(isExpanded ? null : group.id)}
                    className="flex items-center gap-3 cursor-pointer group flex-1 min-w-[260px]"
                  >
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-[#14243A] group-hover:bg-[#167D82] group-hover:text-white transition-colors">
                      {group.id}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#14243A] group-hover:text-[#167D82] transition-colors">
                        {group.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2">
                        <span>Group #{group.groupNumber}</span>
                        <span>·</span>
                        <span className="font-semibold text-slate-700">{group.allocatedItems} items in Subject TOS ({group.weightInSubjectPercent}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance pill */}
                  <div className="flex items-center gap-3">
                    {stats ? (
                      <div className="text-right text-xs">
                        <div className="font-mono font-bold text-[#167D82]">{accuracy}% correct</div>
                        <div className="text-[10px] text-slate-400">{stats.total} attempted · avg {avgTime}s</div>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Not attempted</span>
                    )}

                    <button
                      onClick={() => onSelectTopicForPractice(group.id)}
                      className="px-3 py-1.5 bg-[#F7F6F2] hover:bg-[#167D82] hover:text-white border border-slate-200 text-[#14243A] rounded-xl text-xs font-semibold transition-all"
                    >
                      Practice
                    </button>

                    <button
                      onClick={() => setExpandedGroupId(isExpanded ? null : group.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details: Bloom's Distribution, Subtopics, Legal Source */}
                {isExpanded && (
                  <div className="p-4 bg-[#F7F6F2] rounded-2xl border border-slate-200 text-xs space-y-3 mt-2 animate-in fade-in duration-150">
                    <div>
                      <div className="font-bold text-[#14243A] mb-1">Learning Subtopics (PRBEE Specification):</div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-600 list-disc list-inside">
                        {group.subtopics.map((st, idx) => (
                          <li key={idx} className="leading-snug">{st}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                      <div>
                        <span className="font-bold text-slate-700">Bloom's Taxonomy Weights: </span>
                        <span>Remembering {group.bloomDistribution.remembering}% · Understanding {group.bloomDistribution.understanding}% · Applying {group.bloomDistribution.applying}% · Analyzing {group.bloomDistribution.analyzing}%</span>
                      </div>
                      <div className="font-mono text-[#167D82]">
                        Source: {group.legalSource} ({group.promulgationDate})
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
