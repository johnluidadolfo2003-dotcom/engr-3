import React, { useState } from 'react';
import { QuestionAttempt, REESubjectId } from '../types';
import { STUDY_TOPIC_GROUPS } from '../data/prcCoverage';

interface Props { attempts: QuestionAttempt[]; onSelectTopicForPractice: (topicId: string) => void; }
export const ProgressView: React.FC<Props> = ({ attempts, onSelectTopicForPractice }) => {
  const [subject, setSubject] = useState<REESubjectId | 'ALL'>('ALL');
  const correct = attempts.filter(a => a.isCorrect).length;
  const accuracy = attempts.length ? Math.round(100 * correct / attempts.length) : 0;
  const average = attempts.length ? Math.round(attempts.reduce((sum, a) => sum + a.timeSpentSeconds, 0) / attempts.length) : 0;
  const groups = STUDY_TOPIC_GROUPS.filter(g => subject === 'ALL' || g.subjectId === subject);
  const studied = new Set(attempts.map(a => a.topicGroupId)).size;
  return <div className="max-w-5xl mx-auto pb-12 space-y-5">
    <header className="bg-white rounded-2xl border border-slate-200 p-6"><span className="text-xs uppercase font-semibold text-cyan-700">Your practice</span><h1 className="text-2xl font-bold mt-1">Progress</h1><p className="text-sm text-slate-500 mt-1">Use mistakes to choose what to study next.</p></header>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{[
      ['Questions answered', attempts.length], ['Accuracy', `${accuracy}%`], ['Average time', `${average}s`], ['Study categories tried', studied],
    ].map(([label, value]) => <div key={label} className="bg-white border border-slate-200 rounded-xl p-4"><span className="block text-xs text-slate-500">{label}</span><strong className="text-2xl">{value}</strong></div>)}</div>
    <section className="bg-white border border-slate-200 rounded-2xl p-5">
      <h2 className="text-lg font-bold">Review by study category</h2><p className="text-xs text-slate-500 mt-1">These are learning categories. See the official PRC topic counts on the Today page.</p>
      <div className="flex gap-2 flex-wrap mt-4">{(['ALL','MATH','ESAS','EE'] as const).map(id => <button key={id} onClick={() => setSubject(id)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${subject === id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}>{id === 'ALL' ? 'All' : id}</button>)}</div>
      <div className="divide-y divide-slate-100 mt-3">{groups.map(g => {
        const scores = attempts.filter(a => a.topicGroupId === g.id);
        return <div key={g.id} className="py-3 flex items-center justify-between gap-3"><div><strong className="text-sm">{g.name}</strong><span className="block text-xs text-slate-500">{scores.length ? `${scores.filter(a => a.isCorrect).length} correct / ${scores.length} attempts` : 'No practice yet'}</span></div><button onClick={() => onSelectTopicForPractice(g.id)} className="text-xs font-semibold text-cyan-700 whitespace-nowrap">{scores.length ? 'Retry' : 'Practice'} →</button></div>;
      })}</div>
    </section>
  </div>;
};
