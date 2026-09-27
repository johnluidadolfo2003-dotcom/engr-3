export type AppLanguage = 'en' | 'tl' | 'ceb';

export type REESubjectId = 'MATH' | 'ESAS' | 'EE';

export interface REESubject {
  id: REESubjectId;
  name: string;
  officialTitle: string;
  weightPercent: number; // 25, 30, 45
  officialItems: number; // 100
  timeLimitHours: number; // Math: 5h, ESAS: 4h, EE: 6h
  passingGradePercent: number; // 50 min subject, 70 GWA
  color: string;
  description: string;
}

export interface BloomDistribution {
  remembering: number; // %
  understanding: number; // %
  applying: number; // %
  analyzing: number; // %
  evaluatingAndCreating: number; // %
}

export interface OfficialTopicGroup {
  id: string; // e.g. "MATH-01"
  groupNumber: number; // 1 to 30
  subjectId: REESubjectId;
  name: string; // Exact official name
  allocatedItems: number; // Total allocated items in 100-item TOS
  weightInSubjectPercent: number;
  bloomDistribution: BloomDistribution;
  subtopics: string[];
  foundationRelevance: string;
  legalSource: string;
  promulgationDate: string;
}

export interface SymbolDefinition {
  symbol: string;
  name: string;
  unit: string;
  description: string;
}

export interface SimplifiedLessonGuide {
  oneSentenceSummary: string;
  realLifeMetaphor: {
    title: string;
    story: string;
    iconEmoji: string;
    visualTip?: string;
  };
  whyItMatters: string;
  keyTakeaways: string[];
  babyStepExample: {
    title: string;
    friendlyNumbers: string;
    steps: {
      stepNumber: number;
      action: string;
      math: string;
      plainWhy: string;
    }[];
    bottomLine: string;
  };
  calculatorQuickButtons?: string;
  dontPanicTip: string;
}

export interface LessonContent {
  id: string;
  topicGroupId: string;
  subtopicTitle: string;
  conceptName: string;
  seeItType:
    | 'basics_zero'
    | 'units_converter'
    | 'trig_triangle'
    | 'complex_numbers'
    | 'dc_circuit'
    | 'circuit'
    | 'phasor'
    | 'transformer'
    | 'transmission'
    | 'calculus'
    | 'mechanics'
    | 'thermo'
    | 'algebra';
  visualCaption: string;
  plainExplanation: string;
  explainMore: string;
  formulaLatex: string;
  symbols: SymbolDefinition[];
  simplifiedGuide?: SimplifiedLessonGuide;
  workedExample: {
    problemStatement: string;
    given: string;
    find: string;
    stepByStep: string[];
    answerWithUnits: string;
    calculatorTip?: string;
  };
  fasterShortcut: {
    name: string;
    shortcutFormula: string;
    conditions: string;
    warningWhenToUseFull: string;
  };
  quickCheck: {
    question: string;
    choices: string[];
    correctIndex: number;
    explanation: string;
  };
  boardStyleQuestionId: string;
}

export type MistakeCause =
  | 'missing_concept'
  | 'wrong_formula'
  | 'algebra'
  | 'units'
  | 'calculator'
  | 'time_pressure';

export type QuestionProvenance =
  | 'PRC Past Concept Analysis (Verified Format)'
  | 'Review-Center Verified Question'
  | 'Original Board-Style Written';

export interface PracticeQuestion {
  id: string;
  topicGroupId: string;
  subjectId: REESubjectId;
  subtopic: string;
  prompt: string;
  diagramSvg?: string;
  choices: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  shortestSolution: {
    methodName: string;
    steps: string[];
    calcSequence?: string;
    validityCondition: string;
    whenFullMethodIsSafer: string;
  };
  stepByStepSolution: string[];
  keyConcept: string;
  commonTraps: string[];
  wrongChoiceFailReasons: {
    A?: string;
    B?: string;
    C?: string;
    D?: string;
  };
  provenance: QuestionProvenance;
  sourceAttribution: string;
  difficulty: 'Foundation' | 'Moderate' | 'Board-Standard';
  targetSeconds: number; // e.g. 90-180 seconds
}

export interface TermItem {
  id: string;
  term: string;
  subjectId: REESubjectId;
  topicGroupId: string;
  oneLineMeaning: string;
  symbolOrUnit: string;
  commonConfusion: string;
  boardStyleUse: string;
  relatedFormula?: string;
}

export interface StudyPlanConfig {
  targetExamDate: string; // ISO date string
  startDate: string;
  dailyStudyMinutes: number; // e.g. 180 (3 hours)
  reviewCenterSchedule: {
    attendingReviewCenter: boolean;
    centerName: string; // e.g. "Multi-Vector" | "Excel" | "Brainbox" | "Self-Study"
    meetingDays: string[]; // e.g. ["Saturday", "Sunday"]
    dailyHoursAtCenter: number;
  };
  weeklySchedule: {
    [key: string]: {
      subjectFocus: REESubjectId;
      plannedMinutes: number;
    };
  };
}

export interface QuestionAttempt {
  questionId: string;
  topicGroupId: string;
  subjectId: REESubjectId;
  userAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpentSeconds: number;
  mistakeCause?: MistakeCause;
  attemptedAt: string;
  bookmarked: boolean;
  notes?: string;
}

export interface DiagnosticResult {
  completedAt: string;
  overallScore: number;
  subjectScores: {
    MATH: number;
    ESAS: number;
    EE: number;
  };
  weakFoundations: string[];
  recommendedStartingTopic: string;
}
