import React, { useState } from 'react';
import { Search, BookOpen, AlertCircle, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { TERMS_LIBRARY } from '../data/termsLibrary';
import { REESubjectId, TermItem } from '../types';
import { REE_SUBJECTS, OFFICIAL_TOPIC_GROUPS } from '../data/prcCoverage';
import { MathView } from '../components/MathView';

interface Props {
  onSelectTermLesson: (topicGroupId: string) => void;
  onOpenTutor: (termName: string) => void;
}

export const TermsView: React.FC<Props> = ({ onSelectTermLesson, onOpenTutor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<REESubjectId | 'ALL'>('ALL');

  const filteredTerms = TERMS_LIBRARY.filter((item) => {
    const matchesSubject = selectedSubject === 'ALL' || item.subjectId === selectedSubject;
    const matchesQuery =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.oneLineMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbolOrUnit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.commonConfusion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#14243A]">
            Technical Terms & Symbols Library
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Searchable definitions, SI units, standard symbols, common board confusions, and exam applications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search term, symbol, SI unit, or concept (e.g. power factor, slip, lux)..."
              className="w-full bg-[#F7F6F2] border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#14243A] placeholder-slate-400 focus:outline-hidden focus:border-[#167D82]"
            />
          </div>

          {/* Subject Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#F7F6F2] p-1 rounded-xl border border-slate-200">
            {(
              [
                { id: 'ALL', label: 'All Subjects' },
                { id: 'EE', label: 'EE (45%)' },
                { id: 'MATH', label: 'Math (25%)' },
                { id: 'ESAS', label: 'ESAS (30%)' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSubject(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedSubject === tab.id
                    ? 'bg-white text-[#14243A] shadow-xs'
                    : 'text-slate-600 hover:text-[#14243A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Terms Grid */}
      <div className="space-y-4">
        {filteredTerms.map((item) => {
          const topicGroup = OFFICIAL_TOPIC_GROUPS.find((g) => g.id === item.topicGroupId);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#167D82]/50 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono mb-1">
                    <span className="font-semibold text-[#167D82]">{item.subjectId}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{topicGroup?.name}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#14243A]">{item.term}</h3>
                </div>

                <div className="text-xs font-mono font-semibold text-slate-800 bg-[#F7F6F2] px-3 py-1.5 rounded-xl border border-slate-200">
                  {item.symbolOrUnit}
                </div>
              </div>

              {/* One-line meaning */}
              <div className="text-xs text-slate-700 leading-relaxed font-medium bg-[#F7F6F2]/70 p-3 rounded-xl border border-slate-200/80">
                {item.oneLineMeaning}
              </div>

              {/* Formula if available */}
              {item.relatedFormula && (
                <div className="p-2.5 bg-slate-900 text-white rounded-xl text-center font-mono overflow-x-auto text-xs">
                  <MathView math={item.relatedFormula} block={true} className="text-cyan-300" />
                </div>
              )}

              {/* Grid: Common Confusion & Board-Style Use */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-red-50/70 p-3 rounded-xl border border-red-200/80 text-red-900">
                  <div className="font-bold flex items-center gap-1.5 text-red-800 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Common Confusion / Trap:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">{item.commonConfusion}</p>
                </div>

                <div className="bg-teal-50/70 p-3 rounded-xl border border-teal-200/80 text-teal-950">
                  <div className="font-bold text-[#167D82] mb-1">
                    Board-Style Examination Use:
                  </div>
                  <p className="text-[11px] leading-relaxed text-teal-900">{item.boardStyleUse}</p>
                </div>
              </div>

              {/* Footer action links */}
              <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-100">
                <button
                  onClick={() => onOpenTutor(item.term)}
                  className="text-slate-500 hover:text-[#167D82] font-semibold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#167D82]" />
                  <span>Ask Engr. Ramos about this term</span>
                </button>

                <button
                  onClick={() => onSelectTermLesson(item.topicGroupId)}
                  className="text-[#167D82] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Go to Topic Lesson</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTerms.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500">No terms match your search query "{searchQuery}".</p>
          </div>
        )}
      </div>
    </div>
  );
};
