import React, { useState, useEffect } from 'react';
import {
  Calendar,
  BookOpen,
  CheckSquare,
  HelpCircle,
  TrendingUp,
  Menu,
  X,
  Compass,
  Zap,
  Bot,
} from 'lucide-react';
import { TodayView } from './views/TodayView';
import { LearnView } from './views/LearnView';
import { PracticeView } from './views/PracticeView';
import { TermsView } from './views/TermsView';
import { ProgressView } from './views/ProgressView';
import { DiagnosticModal } from './components/DiagnosticModal';
import { StudyPlanSettingsModal } from './components/StudyPlanSettingsModal';
import { AiTutorDrawer } from './components/AiTutorDrawer';
import { StudyPlanConfig, QuestionAttempt, DiagnosticResult, AppLanguage } from './types';
import { STUDY_TOPIC_GROUPS } from './data/prcCoverage';
import { LESSONS_DATA } from './data/lessonsData';
import { SUPPORTED_LANGUAGES, t } from './data/translations';

const DEFAULT_STUDY_PLAN: StudyPlanConfig = {
  targetExamDate: '', // Student chooses a target exam date.
  startDate: new Date().toISOString().split('T')[0],
  dailyStudyMinutes: 180, // 3 hours per day
  reviewCenterSchedule: {
    attendingReviewCenter: false,
    centerName: '',
    meetingDays: [],
    dailyHoursAtCenter: 0,
  },
  weeklySchedule: {
    Monday: { subjectFocus: 'EE', plannedMinutes: 180 },
    Tuesday: { subjectFocus: 'MATH', plannedMinutes: 180 },
    Wednesday: { subjectFocus: 'EE', plannedMinutes: 180 },
    Thursday: { subjectFocus: 'ESAS', plannedMinutes: 180 },
    Friday: { subjectFocus: 'EE', plannedMinutes: 180 },
    Saturday: { subjectFocus: 'EE', plannedMinutes: 480 },
    Sunday: { subjectFocus: 'MATH', plannedMinutes: 480 },
  },
};

export default function App() {
  const [currentView, setCurrentView] = useState<
    'today' | 'learn' | 'practice' | 'terms' | 'progress'
  >('today');

  // Persistence
  const [studyPlan, setStudyPlan] = useState<StudyPlanConfig>(() => {
    try {
      const saved = localStorage.getItem('ree_study_plan');
      if (!saved) return DEFAULT_STUDY_PLAN;
      const parsed = JSON.parse(saved);
      return parsed.targetExamDate === '2025-04-15' ? { ...parsed, targetExamDate: '' } : parsed;
    } catch {
      return DEFAULT_STUDY_PLAN;
    }
  });

  const [attempts, setAttempts] = useState<QuestionAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('ree_attempts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(() => {
    try {
      const saved = localStorage.getItem('ree_diagnostic');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Language state (English, Tagalog, Bisaya)
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('ree_language');
      if (saved === 'en' || saved === 'tl' || saved === 'ceb') return saved;
      return 'en';
    } catch {
      return 'en';
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ree_study_plan', JSON.stringify(studyPlan));
  }, [studyPlan]);

  useEffect(() => {
    localStorage.setItem('ree_attempts', JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    if (diagnosticResult) {
      localStorage.setItem('ree_diagnostic', JSON.stringify(diagnosticResult));
    }
  }, [diagnosticResult]);

  useEffect(() => {
    localStorage.setItem('ree_language', language);
  }, [language]);

  // Modal / Drawer state
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isStudyPlanOpen, setIsStudyPlanOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<{
    topic?: string;
    subject?: string;
    subtopic?: string;
    contextType: 'lesson' | 'practice' | 'term' | 'general';
    lessonContext?: any;
    questionContext?: any;
  }>({
    contextType: 'general',
  });

  // Selected lesson / question for cross-navigation
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(undefined);
  const [selectedPracticeQuestionId, setSelectedPracticeQuestionId] = useState<string | undefined>(
    undefined
  );
  const [selectedPracticeTopicId, setSelectedPracticeTopicId] = useState<string | undefined>();

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRecordAttempt = (attempt: QuestionAttempt) => {
    setAttempts((prev) => [attempt, ...prev]);
  };
  const handleUpdateAttempt = (questionId: string, attemptedAt: string, cause: QuestionAttempt['mistakeCause']) => {
    setAttempts(prev => prev.map(a => a.questionId === questionId && a.attemptedAt === attemptedAt ? { ...a, mistakeCause: cause } : a));
  };

  const handleOpenTutor = (topic?: string, extraContext?: any) => {
    setTutorContext({
      topic: topic || 'REE Board Review',
      contextType: currentView === 'practice' ? 'practice' : currentView === 'learn' ? 'lesson' : 'general',
      lessonContext: currentView === 'learn' ? extraContext : undefined,
      questionContext: currentView === 'practice' ? extraContext : undefined,
    });
    setIsTutorOpen(true);
  };

  const handleNavigateToLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentView('learn');
  };

  const handleStartDrill = (topicId?: string) => {
    setSelectedPracticeQuestionId(undefined);
    setSelectedPracticeTopicId(topicId);
    setCurrentView('practice');
  };

  const navItems = [
    { id: 'today', label: t('navToday', language), icon: Compass },
    { id: 'learn', label: t('navLearn', language), icon: BookOpen },
    { id: 'practice', label: t('navPractice', language), icon: CheckSquare },
    { id: 'terms', label: t('navTerms', language), icon: HelpCircle },
    { id: 'progress', label: t('navProgress', language), icon: TrendingUp },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-cyan-500/20 selection:text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <div
            onClick={() => setCurrentView('today')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-700 text-white flex items-center justify-center font-bold text-xs font-mono">
              EE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white">
                  Electrical Engineering Studio
                </span>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  · Circuits & Power
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Tools, Language & Tutor Triggers */}
          <div className="flex items-center gap-2">
            {/* Global Language Switcher */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLanguage(l.id)}
                  className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                    language === l.id
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={l.nativeName}
                >
                  <span>{l.shortCode}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenTutor('General Engineering')}
              className="px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
              title="Chat with Technical Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-200" />
              <span>{t('navAiTutor', language)}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-2">
            {/* Mobile Language Switcher Row */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-medium text-slate-400">Wika / Pinulongan:</span>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLanguage(l.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      language === l.id ? 'bg-[#167D82] text-white' : 'text-slate-400'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
                    isActive ? 'bg-[#167D82] text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentView === 'today' && (
          <TodayView
            onNavigate={setCurrentView}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onOpenStudyPlan={() => setIsStudyPlanOpen(true)}
            onSelectLesson={handleNavigateToLesson}
            onStartDrill={handleStartDrill}
            onOpenTutor={handleOpenTutor}
            diagnosticResult={diagnosticResult}
            studyPlan={studyPlan}
            attempts={attempts}
            language={language}
            onSelectLanguage={setLanguage}
          />
        )}

        {currentView === 'learn' && (
          <LearnView
            selectedLessonId={selectedLessonId}
            onSelectLesson={(id) => setSelectedLessonId(id)}
            onPracticeQuestion={(qId) => {
              setSelectedPracticeTopicId(undefined);
              setSelectedPracticeQuestionId(qId);
              setCurrentView('practice');
            }}
            onOpenTutor={handleOpenTutor}
            onOpenTerm={(term) => {
              setCurrentView('terms');
            }}
            language={language}
            onSelectLanguage={setLanguage}
          />
        )}

        {currentView === 'practice' && (
          <PracticeView
            initialQuestionId={selectedPracticeQuestionId}
            initialTopicGroupId={selectedPracticeTopicId}
            onOpenTutor={handleOpenTutor}
            onRecordAttempt={handleRecordAttempt}
            onUpdateAttempt={handleUpdateAttempt}
            attempts={attempts}
            language={language}
          />
        )}

        {currentView === 'terms' && (
          <TermsView
            onSelectTermLesson={(topicGroupId) => {
              const matchedLesson = STUDY_TOPIC_GROUPS.find((g) => g.id === topicGroupId);
              if (matchedLesson) {
                const lesson = LESSONS_DATA.find(l => l.topicGroupId === matchedLesson.id);
                if (lesson) handleNavigateToLesson(lesson.id);
              }
            }}
            onOpenTutor={handleOpenTutor}
          />
        )}

        {currentView === 'progress' && (
          <ProgressView
            attempts={attempts}
            onSelectTopicForPractice={(topicId) => {
              handleStartDrill(topicId);
            }}
          />
        )}
      </main>

      {/* Modals & Drawers */}
      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onComplete={(result) => setDiagnosticResult(result)}
      />

      <StudyPlanSettingsModal
        isOpen={isStudyPlanOpen}
        onClose={() => setIsStudyPlanOpen(false)}
        config={studyPlan}
        onSave={(newPlan) => setStudyPlan(newPlan)}
      />

      <AiTutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        context={tutorContext}
        appLanguage={language}
        onSelectAppLanguage={setLanguage}
      />
    </div>
  );
}
