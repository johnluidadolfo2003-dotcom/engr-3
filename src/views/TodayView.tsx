import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { QuestionAttempt, DiagnosticResult, StudyPlanConfig, AppLanguage, REESubjectId } from '../types';
import { FIVE_UNLOCK_FOUNDATIONS } from '../data/foundationCurriculum';
import { OFFICIAL_EXAM_MAP, PRC_ANNEX_A_URL } from '../data/officialExamMap';

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

const labels: Record<REESubjectId, string> = { MATH: 'Mathematics', ESAS: 'ESAS', EE: 'Electrical Engineering' };
export const TodayView: React.FC<Props> = ({ onNavigate, onOpenDiagnostic, onOpenStudyPlan, onSelectLesson, onStartDrill, onOpenTutor, diagnosticResult, studyPlan, attempts }) => {
  const [subject, setSubject] = useState<REESubjectId>('MATH');
  const examDate = studyPlan.targetExamDate ? new Date(studyPlan.targetExamDate + 'T00:00:00') : null;
  const validDate = examDate && !Number.isNaN(examDate.getTime()) && examDate.getTime() >= new Date().setHours(0, 0, 0, 0);
  const todayCount = attempts.filter(a => new Date(a.attemptedAt).toDateString() === new Date().toDateString()).length;
  const group = OFFICIAL_EXAM_MAP.find(s => s.subject === subject)!;

  return <div className="max-w-5xl mx-auto space-y-5 pb-12">
    <header className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
      <span className="text-xs uppercase tracking-widest text-cyan-300">Your REE review desk</span>
      <h1 className="text-2xl sm:text-3xl font-bold mt-2">Start with the basics. Build toward the board.</h1>
      <p className="text-slate-300 text-sm mt-2">See it → try it → solve it → review mistakes.</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <button onClick={() => onSelectLesson(FIVE_UNLOCK_FOUNDATIONS[0].lessonId)} className="bg-cyan-600 hover:bg-cyan-500 rounded-lg px-5 py-2.5 font-semibold text-sm flex items-center gap-2">Start: Units & conversions <ArrowRight size={16}/></button>
        <button onClick={() => onOpenTutor('Basic mathematics')} className="border border-slate-500 rounded-lg px-4 py-2.5 text-sm">Ask the tutor</button>
      </div>
    </header>
    <div className="grid sm:grid-cols-3 gap-3">
      <div className="bg-white border border-slate-200 rounded-xl p-4"><span className="text-xs text-slate-500">Practice today</span><strong className="block text-2xl mt-1">{todayCount}</strong><button onClick={() => onStartDrill()} className="text-xs font-semibold text-cyan-700 mt-2">Open practice →</button></div>
      <div className="bg-white border border-slate-200 rounded-xl p-4"><span className="text-xs text-slate-500">Diagnostic</span><strong className="block text-sm mt-2">{diagnosticResult ? 'Complete' : 'Ready when you are'}</strong><button onClick={onOpenDiagnostic} className="text-xs font-semibold text-cyan-700 mt-2">{diagnosticResult ? 'Try again' : 'Check my starting point'} →</button></div>
      <div className="bg-white border border-slate-200 rounded-xl p-4"><span className="text-xs text-slate-500">Exam target</span><strong className="block text-sm mt-2">{validDate ? examDate.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Choose your date'}</strong><button onClick={onOpenStudyPlan} className="text-xs font-semibold text-cyan-700 mt-2">Set date →</button></div>
    </div>
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
      <span className="text-xs font-semibold text-cyan-700 uppercase">Start here</span><h2 className="text-lg font-bold mb-4">Five foundations</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">{FIVE_UNLOCK_FOUNDATIONS.map(f => <button key={f.step} onClick={() => onSelectLesson(f.lessonId)} className="border border-slate-200 hover:border-cyan-600 hover:bg-cyan-50 rounded-xl p-3 text-left"><span className="text-cyan-700 font-mono text-xs">0{f.step}</span><strong className="block text-sm mt-2 leading-snug">{f.title}</strong><ArrowRight className="mt-3 text-slate-400" size={15}/></button>)}</div>
      <button onClick={() => onNavigate('learn')} className="text-sm text-cyan-700 font-semibold mt-5">Browse all lessons →</button>
    </section>
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap justify-between gap-2"><div><span className="text-xs font-semibold text-cyan-700 uppercase">PRC Annex A</span><h2 className="text-lg font-bold">Official exam coverage</h2></div><a href={PRC_ANNEX_A_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-700 flex items-center gap-1">View PRC source <ExternalLink size={13}/></a></div>
      <div className="flex flex-wrap gap-2 mt-4">{OFFICIAL_EXAM_MAP.map(s => <button key={s.subject} onClick={() => setSubject(s.subject)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${subject === s.subject ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>{labels[s.subject]} · {s.weight}%</button>)}</div>
      <div className="grid sm:grid-cols-2 gap-x-6 mt-4">{group.topics.map(t => <div key={t.name} className="flex justify-between gap-3 border-b border-slate-100 py-2 text-xs"><span>{t.name}</span><strong className="whitespace-nowrap">{t.items} / 100</strong></div>)}</div>
      <p className="text-xs text-slate-500 mt-3">The lessons and sample questions are study aids. These counts describe the exam, not this app’s question bank.</p>
    </section>
    <div className="flex flex-wrap gap-4 text-sm"><button onClick={() => onNavigate('progress')} className="text-cyan-700 font-semibold">View progress →</button><button onClick={() => onNavigate('terms')} className="text-cyan-700 font-semibold">Review terms →</button></div>
  </div>;
};
