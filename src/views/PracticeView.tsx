import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  HelpCircle,
  Flag,
} from 'lucide-react';
import {
  PracticeQuestion,
  QuestionAttempt,
  MistakeCause,
  REESubjectId,
  AppLanguage,
} from '../types';
import { PRACTICE_QUESTIONS } from '../data/practiceQuestions';
import { OFFICIAL_TOPIC_GROUPS, REE_SUBJECTS } from '../data/prcCoverage';
import { MathView } from '../components/MathView';

interface Props {
  initialQuestionId?: string;
  onOpenTutor: (topic?: string, questionContext?: any) => void;
  onRecordAttempt: (attempt: QuestionAttempt) => void;
  attempts: QuestionAttempt[];
  language?: AppLanguage;
}

export const PracticeView: React.FC<Props> = ({
  initialQuestionId,
  onOpenTutor,
  onRecordAttempt,
  attempts,
  language = 'en',
}) => {
  const [practiceMode, setPracticeMode] = useState<
    'untimed' | 'drill' | 'mixed' | 'timed_mock'
  >('untimed');
  const [activeSubject, setActiveSubject] = useState<REESubjectId | 'ALL'>('ALL');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [selectedMistakeCause, setSelectedMistakeCause] = useState<MistakeCause | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());

  // Timer
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  // Filter questions based on subject & mode
  const filteredQuestions = PRACTICE_QUESTIONS.filter((q) => {
    if (activeSubject === 'ALL') return true;
    return q.subjectId === activeSubject;
  });

  // Handle initial question selection
  useEffect(() => {
    if (initialQuestionId) {
      const idx = filteredQuestions.findIndex((q) => q.id === initialQuestionId);
      if (idx !== -1) {
        setCurrentIdx(idx);
        setSelectedChoice(null);
        setIsAnswerSubmitted(false);
        setSelectedMistakeCause(null);
        setSecondsSpent(0);
      }
    }
  }, [initialQuestionId]);

  // Active question
  const currentQ: PracticeQuestion =
    filteredQuestions[currentIdx] || filteredQuestions[0] || PRACTICE_QUESTIONS[0];

  const currentTopicGroup = OFFICIAL_TOPIC_GROUPS.find(
    (g) => g.id === currentQ.topicGroupId
  );

  // Stop / count timer
  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isAnswerSubmitted) {
      interval = setInterval(() => {
        setSecondsSpent((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isAnswerSubmitted]);

  // Submit Answer
  const handleSubmit = () => {
    if (!selectedChoice || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    setTimerActive(false);

    const isCorrect = selectedChoice === currentQ.correctAnswer;

    const attempt: QuestionAttempt = {
      questionId: currentQ.id,
      topicGroupId: currentQ.topicGroupId,
      subjectId: currentQ.subjectId,
      userAnswer: selectedChoice,
      isCorrect,
      timeSpentSeconds: secondsSpent,
      attemptedAt: new Date().toISOString(),
      bookmarked: bookmarkedIds.has(currentQ.id),
    };

    onRecordAttempt(attempt);
  };

  const handleAssignMistakeCause = (cause: MistakeCause) => {
    setSelectedMistakeCause(cause);
    // update attempt record
    const attempt: QuestionAttempt = {
      questionId: currentQ.id,
      topicGroupId: currentQ.topicGroupId,
      subjectId: currentQ.subjectId,
      userAnswer: selectedChoice || 'A',
      isCorrect: false,
      timeSpentSeconds: secondsSpent,
      mistakeCause: cause,
      attemptedAt: new Date().toISOString(),
      bookmarked: bookmarkedIds.has(currentQ.id),
    };
    onRecordAttempt(attempt);
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedChoice(null);
      setIsAnswerSubmitted(false);
      setSelectedMistakeCause(null);
      setSecondsSpent(0);
      setTimerActive(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setSelectedChoice(null);
      setIsAnswerSubmitted(false);
      setSelectedMistakeCause(null);
      setSecondsSpent(0);
      setTimerActive(true);
    }
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFlag = (id: string) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const isCorrect = selectedChoice === currentQ.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-16">
      {/* Top Controller Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Practice Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {(
            [
              { id: 'untimed', label: 'Untimed Learning' },
              { id: 'drill', label: 'Focused Drill' },
              { id: 'mixed', label: 'Mixed Set' },
              { id: 'timed_mock', label: 'Timed Board Simulation' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setPracticeMode(m.id);
                setSelectedChoice(null);
                setIsAnswerSubmitted(false);
                setSecondsSpent(0);
                setTimerActive(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                practiceMode === m.id
                  ? 'bg-white text-[#14243A] shadow-xs'
                  : 'text-slate-600 hover:text-[#14243A]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Subject filter */}
        <div className="flex items-center gap-2">
          <select
            value={activeSubject}
            onChange={(e) => {
              setActiveSubject(e.target.value as any);
              setCurrentIdx(0);
              setSelectedChoice(null);
              setIsAnswerSubmitted(false);
            }}
            className="bg-[#F7F6F2] border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-[#14243A] font-medium"
          >
            <option value="ALL">All REE Subjects (100% TOS)</option>
            <option value="EE">EE Professional (45%)</option>
            <option value="MATH">Mathematics (25%)</option>
            <option value="ESAS">ESAS & Code (30%)</option>
          </select>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Question Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-[#F7F6F2]/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#14243A] text-white">
              Q {currentIdx + 1} of {filteredQuestions.length}
            </span>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-[#14243A]">{currentTopicGroup?.name}</span>
              <span className="mx-1.5 text-slate-400">·</span>
              <span className="text-[11px] text-slate-500 font-mono">{currentTopicGroup?.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Timer */}
            <div className="flex items-center gap-1.5 font-mono text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#167D82]" />
              <span className={secondsSpent > currentQ.targetSeconds ? 'text-red-600 font-bold' : ''}>
                {formatTimer(secondsSpent)}
              </span>
              <span className="text-[10px] text-slate-400">/ {currentQ.targetSeconds}s target</span>
            </div>

            {/* Flag button */}
            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                flaggedIds.has(currentQ.id)
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title="Flag question for review"
            >
              <Flag className="w-4 h-4" />
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(currentQ.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                bookmarkedIds.has(currentQ.id)
                  ? 'bg-teal-50 border-teal-300 text-[#167D82]'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title="Bookmark question"
            >
              {bookmarkedIds.has(currentQ.id) ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Question Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Question Prompt */}
          <div className="text-base sm:text-lg font-medium text-[#14243A] leading-relaxed">
            {currentQ.prompt}
          </div>

          {/* Multiple Choices Grid */}
          <div className="space-y-3">
            {(['A', 'B', 'C', 'D'] as const).map((letter) => {
              const text = currentQ.choices[letter];
              const isSelected = selectedChoice === letter;
              const isCorrectChoice = currentQ.correctAnswer === letter;

              let choiceStyle =
                'bg-white border-slate-200 text-[#14243A] hover:bg-slate-50 hover:border-slate-300';
              let badgeStyle = 'bg-slate-100 text-slate-600';

              if (isAnswerSubmitted) {
                if (isCorrectChoice) {
                  choiceStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected) {
                  choiceStyle = 'bg-red-50 border-red-400 text-red-950';
                  badgeStyle = 'bg-red-600 text-white';
                } else {
                  choiceStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                choiceStyle = 'bg-[#167D82]/10 border-[#167D82] text-[#14243A] shadow-xs';
                badgeStyle = 'bg-[#167D82] text-white';
              }

              return (
                <button
                  key={letter}
                  disabled={isAnswerSubmitted}
                  onClick={() => setSelectedChoice(letter)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-start gap-3.5 ${choiceStyle}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${badgeStyle}`}
                  >
                    {letter}
                  </div>
                  <span className="flex-1 leading-snug pt-0.5">{text}</span>
                </button>
              );
            })}
          </div>

          {/* Submit / Action Bar */}
          {!isAnswerSubmitted ? (
            <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-100">
              <button
                onClick={() => {
                  const promptExtra =
                    language === 'tl'
                      ? 'Engr. Ramos, paki-bigyan mo ako ng pahiwatig (hint) sa Tagalog para sa tanong na ito nang hindi sinasabi ang sagot.'
                      : language === 'ceb'
                      ? 'Engr. Ramos, hatagi palihog ko og hint sa Bisaya para ani nga pangutana nga dili nimo isulti ang tubag.'
                      : undefined;
                  onOpenTutor(currentQ.subtopic, {
                    prompt: currentQ.prompt,
                    choices: currentQ.choices,
                    selected: selectedChoice,
                    userRequest: promptExtra,
                  });
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#167D82] hover:bg-teal-50 border border-teal-200 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {language === 'tl'
                    ? 'Humingi ng Hint kay Engr. Ramos'
                    : language === 'ceb'
                    ? 'Pangayo og Hint kang Engr. Ramos'
                    : 'Ask Tutor for a Socratic Hint'}
                </span>
              </button>

              <button
                disabled={!selectedChoice}
                onClick={handleSubmit}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all ${
                  selectedChoice
                    ? 'bg-[#167D82] hover:bg-[#167D82]/90 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {language === 'tl'
                  ? 'Isumite ang Sagot'
                  : language === 'ceb'
                  ? 'I-submit ang Tubag'
                  : 'Submit Answer'}
              </button>
            </div>
          ) : (
            /* Post-Answer Comprehensive Breakdown */
            <div className="pt-6 border-t border-slate-200 space-y-6 animate-in fade-in duration-200">
              {/* Result Indicator Banner */}
              <div
                className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-red-50 border-red-300 text-red-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm">
                      {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
                    </h4>
                    <p className="text-xs opacity-80">
                      The correct choice is{' '}
                      <span className="font-bold underline">{currentQ.correctAnswer}</span> (
                      {currentQ.choices[currentQ.correctAnswer]}). Solved in {secondsSpent} seconds.
                    </p>
                  </div>
                </div>

                {/* If incorrect: Record mistake cause tagger */}
                {!isCorrect && (
                  <div className="w-full pt-3 mt-2 border-t border-red-200/80">
                    <div className="text-xs font-bold text-red-900 mb-2">
                      Tag Root Cause of Mistake (Builds your daily Review Next queue):
                    </div>
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {(
                        [
                          { id: 'missing_concept', label: 'Missing Concept' },
                          { id: 'wrong_formula', label: 'Wrong Formula' },
                          { id: 'algebra', label: 'Algebra Error' },
                          { id: 'units', label: 'Units / Conversion' },
                          { id: 'calculator', label: 'Computation / Arithmetic Slip' },
                          { id: 'time_pressure', label: 'Time Pressure' },
                        ] as const
                      ).map((cause) => (
                        <button
                          key={cause.id}
                          onClick={() => handleAssignMistakeCause(cause.id)}
                          className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${
                            selectedMistakeCause === cause.id
                              ? 'bg-red-600 border-red-600 text-white'
                              : 'bg-white border-red-200 text-red-800 hover:bg-red-100'
                          }`}
                        >
                          {cause.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Shortest Valid Solution Box */}
              <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wide">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Shortest Valid Solution ({currentQ.shortestSolution.methodName})</span>
                  </div>
                  {currentQ.shortestSolution.calcSequence && (
                    <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-amber-300 text-amber-800">
                      fx-991: {currentQ.shortestSolution.calcSequence}
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-amber-950 font-mono pt-1">
                  {currentQ.shortestSolution.steps.map((st, sIdx) => (
                    <div key={sIdx}>{st}</div>
                  ))}
                </div>

                <div className="pt-2 border-t border-amber-200/80 text-[11px] text-amber-800 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-bold">Conditions: </span>
                    {currentQ.shortestSolution.validityCondition}
                  </div>
                  <div>
                    <span className="font-bold">When Full Method Is Safer: </span>
                    {currentQ.shortestSolution.whenFullMethodIsSafer}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Solution */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#14243A]">
                  Step-by-Step Rigorous Derivation
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {currentQ.stepByStepSolution.map((s, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Traps & Why Tempting Wrong Choices Fail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traps */}
                <div className="bg-red-50/50 rounded-2xl p-4 border border-red-200 space-y-2 text-xs">
                  <div className="font-bold text-red-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Common PRC Board Traps</span>
                  </div>
                  <ul className="space-y-1 text-red-800 list-disc list-inside">
                    {currentQ.commonTraps.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Wrong Choices Analysis */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-[#14243A]">
                    Why Tempting Distractors Fail:
                  </div>
                  <div className="space-y-1.5 text-slate-600">
                    {Object.entries(currentQ.wrongChoiceFailReasons).map(([lettr, reason]) => (
                      <div key={lettr}>
                        <span className="font-mono font-bold text-[#14243A]">Choice {lettr}: </span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Question Provenance & Attribution Bar */}
              <div className="p-3 bg-[#F7F6F2] rounded-xl border border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-slate-700">Provenance: </span>
                  <span>{currentQ.provenance}</span>
                  <span className="mx-1">·</span>
                  <span>{currentQ.sourceAttribution}</span>
                </div>
                <div className="text-[#167D82] font-semibold">
                  TOS Group: {currentTopicGroup?.name}
                </div>
              </div>

              {/* Navigation to next question */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                    currentIdx === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIdx === filteredQuestions.length - 1}
                  className={`px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all ${
                    currentIdx === filteredQuestions.length - 1
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-[#167D82] hover:bg-[#167D82]/90 text-white'
                  }`}
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
