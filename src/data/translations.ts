import { AppLanguage, LessonContent, SimplifiedLessonGuide } from '../types';

export interface LanguageOption {
  id: AppLanguage;
  name: string;
  nativeName: string;
  shortCode: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    shortCode: 'EN',
    flag: '🇺🇸',
  },
  {
    id: 'tl',
    name: 'Tagalog',
    nativeName: 'Tagalog (Filipino)',
    shortCode: 'TL',
    flag: '🇵🇭',
  },
  {
    id: 'ceb',
    name: 'Bisaya',
    nativeName: 'Bisaya (Cebuano)',
    shortCode: 'CEB',
    flag: '🌴',
  },
];

export const UI_STRINGS: Record<AppLanguage, Record<string, string>> = {
  en: {
    // Nav
    navToday: 'Today',
    navLearn: 'Learn',
    navPractice: 'Practice',
    navTerms: 'Terms',
    navProgress: 'Progress',
    navAiTutor: 'AI Tutor',
    boardBadge: 'EE Studio',
    appSubtitle: 'Interactive Electrical Engineering Workstation',

    // Learn Mode Toggle
    simpleModeTitle: 'Intuitive Concept',
    simpleModeBadge: 'Concepts',
    examModeTitle: 'Technical Formulas',
    langSelectLabel: 'Language',

    // Simple Mode Banner & Sections
    simpleBannerTitle: 'Intuitive Fundamentals Mode',
    zeroFearBadge: 'Fundamentals First',
    simpleBannerText:
      'Clear, practical explanations without unnecessary jargon. We break down core principles using real-world engineering concepts, step-by-step numbers, and direct visual feedback.',
    inPlainWordsTitle: 'Core Principle and Physical Meaning',
    stage1Title: 'Simulation Studio',
    stage1Subtitle: 'Interactive Visual Simulation',
    sliderHint: 'Adjust the Parameters Below',
    whatToLookFor: 'What to look for:',
    stage2Title: 'Physical Mechanism',
    whyItMatters: 'Practical Application:',
    stage3Title: 'Step-by-Step Calculation',
    friendlyNumbersOnly: 'Step-by-Step Numerical Analysis',
    theBottomLine: 'Conclusion:',
    stage4Rules: 'Governing Principles',
    stage4Calc: 'Calculator Shortcut Technique',
    stage4Panic: 'Practical Engineering Tip',
    askTutorSimpleBtn: 'Ask Tutor: Explain Clearly',

    // Exam Mode Sections
    formulaDeepDive: 'Core Governing Formulas and Mathematical Models',
    explainMoreTitle: 'Engineering In-Depth Analysis',
    symbolsTitle: 'Symbol Definitions and SI Units',
    workedExampleTitle: 'Step-by-Step Problem Solution',
    fasterShortcutTitle: 'Speed Technique / Analytical Shortcut',
    quickCheckTitle: 'Concept Verification Drill',

    // Today View
    findingHardTitle: 'Building confidence in circuit fundamentals?',
    beginnerFriendlyBadge: 'Foundational Focus',
    findingHardDesc:
      'Master core fundamentals first with our dedicated DC Circuit Simulator, Ohm’s Law breakdowns, Series/Parallel Kirchhoff solvers, and clear step-by-step examples.',
    startAlgebraBtn: 'Review Engineering Math',
    startCircuitsBtn: 'Start with DC Circuits (Ohm’s Law)',
    todayStudyPrompt: '1. What do I study today?',
    todayPracticePrompt: '2. Today’s Recommended Drill',
    todayFormulaPrompt: '3. Quick Formula Recall',
    diagnosticPromptTitle: 'Diagnostic Assessment',
    takeDiagnosticBtn: 'Take 15-Item Diagnostic',
    roadmapBtn: '6-Month Roadmap & Plan',

    // AI Tutor Chips
    tutorChipEli10: 'Explain in Simple Terms',
    tutorChipTagalog: 'Explain in Tagalog',
    tutorChipBisaya: 'Explain in Bisaya',
    tutorChipHint: 'Give Me a Hint',
    tutorChipBabySteps: 'Step-by-Step Breakdown',
    tutorChipCalculator: 'Calculator Shortcut',

    // Simulator Guide & Zero-Confusion
    simDontUnderstandBtn: "Don't understand this simulator?",
    simDontUnderstandTitle: '30-Second Simulator Guide (Zero Confusion)',
    simDotsMeaningTitle: 'What are the moving dots?',
    simDotsMeaningText: 'They represent electric charges (Current / Amperes). Fast dots = high current. Crawling dots = high resistance or choking.',
    simSlidersMeaningTitle: 'What do the sliders do?',
    simSlidersMeaningText: 'They are virtual testing knobs. Changing them lets you see how voltage, resistance, coils, and capacitors affect power in real time.',
    simFormulasMeaningTitle: 'How does this help my board exam?',
    simFormulasMeaningText: 'You see the physical cause-and-effect before calculating. Formulas like I = V / Z or P = V × I × cos(θ) become clear, visual intuitions in your mind!',
    simAskTutorHelp: 'Ask Engr. Ramos: Explain This Simulator',
    simTakeTourBtn: 'Guided Tour',
    simCloseHelp: 'Got It, Close Guide',
  },

  tl: {
    // Nav
    navToday: 'Ngayon',
    navLearn: 'Mag-aral',
    navPractice: 'Magsanay',
    navTerms: 'Termino',
    navProgress: 'Progreso',
    navAiTutor: 'AI Tutor (Guro)',
    boardBadge: 'Res. 40 s. 2024',
    appSubtitle: 'Tagasuri para sa Philippine Registered Electrical Engineer',

    // Learn Mode Toggle
    simpleModeTitle: 'Simpleng Paliwanag',
    simpleModeBadge: 'Madali',
    examModeTitle: 'Exam Formula Mode',
    langSelectLabel: 'Wika',

    // Simple Mode Banner & Sections
    simpleBannerTitle: 'Aktibo ang Simpleng Pag-aaral',
    zeroFearBadge: 'Pundasyon Muna',
    simpleBannerText:
      'Malinaw at praktikal na paliwanag. Hinihimay natin ang bawat konsepto gamit ang direktang pisikal na mekanismo, step-by-step na kalkulasyon, at calculator shortcuts.',
    inPlainWordsTitle: 'Pangunahing Konsepto at Kahulugan',
    stage1Title: 'Hakbang 1: Tingnan Mo',
    stage1Subtitle: 'Interactive na Visual Simulation',
    sliderHint: 'I-slide ang mga Kontrol',
    whatToLookFor: 'Ano ang dapat pansinin:',
    stage2Title: 'Hakbang 2: Mekanismo sa Totoong Buhay',
    whyItMatters: 'Bakit ito mahalaga sa totoong electrical systems?',
    stage3Title: 'Hakbang 3: Hakbang-hakbang na Pagkwenta',
    friendlyNumbersOnly: 'Malinaw na mga Halaga',
    theBottomLine: 'Ang Buod / Konklusyon:',
    stage4Rules: 'Mga Mahahalagang Prinsipyo (Tandaan Ito)',
    stage4Calc: 'Shortcut sa Calculator (fx-991)',
    stage4Panic: 'Praktikal na Tip sa Board Exam',
    askTutorSimpleBtn: 'Tanungin si Engr. Ramos: Ipaliwanag nang Malinaw',

    // Exam Mode Sections
    formulaDeepDive: 'Pangunahing Formula at Mathematical Models',
    explainMoreTitle: 'Malalimang Engineering at Gamit sa Pilipinas',
    symbolsTitle: 'Mga Simbolo at SI Units',
    workedExampleTitle: 'Hakbang-hakbang na Halimbawang Tanong sa Board',
    fasterShortcutTitle: 'Mabilisang Shortcut / Teknik sa Review Center',
    quickCheckTitle: 'Pagsasanay sa Konsepto',

    // Today View
    findingHardTitle: 'Kailangan ng matatag na pundasyon sa electrical circuits?',
    beginnerFriendlyBadge: 'Pundasyon',
    findingHardDesc:
      'Simulan sa mga pangunahing aralin gamit ang DC Circuit Simulator, Ohm’s Law, Kirchhoff’s Laws, at malinaw na hakbang-hakbang na kalkulasyon.',
    startAlgebraBtn: 'Balikan ang Engineering Math',
    startCircuitsBtn: 'Simulan sa DC Circuits (Ohm’s Law)',
    todayStudyPrompt: '1. Ano ang dapat kong aralin ngayon?',
    todayPracticePrompt: '2. Inirekomendang Pagsasanay Ngayon',
    todayFormulaPrompt: '3. Mabilisang Pagbabalik-aral sa Formula',
    diagnosticPromptTitle: 'Diagnostic Assessment',
    takeDiagnosticBtn: 'Kumuha ng 15-Item Diagnostic',
    roadmapBtn: '6-Buwang Plano at Roadmap',

    // AI Tutor Chips
    tutorChipEli10: 'Ipaliwanag na parang 10 anyos ako',
    tutorChipTagalog: 'Magpaliwanag sa Tagalog',
    tutorChipBisaya: 'Magpaliwanag sa Bisaya',
    tutorChipHint: 'Bigyan mo ako ng pahiwatig (Hint)',
    tutorChipBabySteps: 'Hakbang-hakbang na kwenta',
    tutorChipCalculator: 'Shortcut sa Casio Calculator',

    // Simulator Guide & Zero-Confusion
    simDontUnderstandBtn: 'Hindi mo ba maintindihan ang simulator?',
    simDontUnderstandTitle: '30-Segundong Gabay sa Simulator (Walang Kalituhan)',
    simDotsMeaningTitle: 'Ano ang mga gumagalaw na asul na tuldok?',
    simDotsMeaningText: 'Kinakatawan nila ang kuryente (Current sa Amperes). Mabilis na tuldok = malakas na kuryente. Mabagal na tuldok = mataas ang harang o resistance.',
    simSlidersMeaningTitle: 'Para saan ang mga slider?',
    simSlidersMeaningText: 'Parang mga pihitan sa laboratory testing bench. Kapag ginalaw mo, makikita mo agad kung paano binabago ng boltahe, resistance, coils, at capacitors ang kuryente.',
    simFormulasMeaningTitle: 'Paano ito makatutulong sa Board Exam?',
    simFormulasMeaningText: 'Nakikita mo muna ang totoong pisikal na reaksyon bago mag-compute. Ang mga pormula tulad ng I = V / Z at P = V × I × cos(θ) ay may malinaw nang larawan sa isip mo!',
    simAskTutorHelp: 'Tanungin si Engr. Ramos: Ipaliwanag itong Simulator',
    simTakeTourBtn: 'May Gabay na Tour',
    simCloseHelp: 'Naintindihan Ko Na, Isara',
  },

  ceb: {
    // Nav
    navToday: 'Karon',
    navLearn: 'Magtuon',
    navPractice: 'Magbansay',
    navTerms: 'Mga Termino',
    navProgress: 'Pag-uswag',
    navAiTutor: 'AI Tutor (Magtutudlo)',
    boardBadge: 'Res. 40 s. 2024',
    appSubtitle: 'Reviewer alang sa Philippine Registered Electrical Engineer',

    // Learn Mode Toggle
    simpleModeTitle: 'Yano nga Pagpasabot',
    simpleModeBadge: 'Sayon',
    examModeTitle: 'Exam Formula Mode',
    langSelectLabel: 'Pinulongan',

    // Simple Mode Banner & Sections
    simpleBannerTitle: 'Aktibo ang Yano nga Pagtuon',
    zeroFearBadge: 'Pundasyon Una',
    simpleBannerText:
      'Klaro ug praktikal nga pagpasabot. Atong gipatin-aw ang matag konsepto gamit ang direktang pisikal nga mekanismo, lakang-sa-lakang nga kwenta, ug calculator shortcuts.',
    inPlainWordsTitle: 'Pangulong Konsepto ug Kahulogan',
    stage1Title: 'Lakang 1: Tan-awa',
    stage1Subtitle: 'Interactive nga Visual Simulation',
    sliderHint: 'I-slide ang mga Kontrol',
    whatToLookFor: 'Unsay angay timan-an:',
    stage2Title: 'Lakang 2: Mekanismo sa Tinuod nga Kinabuhi',
    whyItMatters: 'Nganong importante man kini sa tinuod nga electrical systems?',
    stage3Title: 'Lakang 3: Lakang-sa-lakang nga Pagkwenta',
    friendlyNumbersOnly: 'Gagmay ug Sayon nga Numero Lamang',
    theBottomLine: 'Ang Kinatibuk-an / Konklusyon:',
    stage4Rules: 'Mga Mahinungdanong Lagda (Timan-i Kini)',
    stage4Calc: 'Shortcut sa Calculator (fx-991)',
    stage4Panic: 'Praktikal nga Tip sa Board Exam',
    askTutorSimpleBtn: 'Pangutan-a si Engr. Ramos: Ipasabot og Yano',

    // Exam Mode Sections
    formulaDeepDive: 'Pangulong mga Formula ug Mathematical Models',
    explainMoreTitle: 'Lalom nga Engineering ug Gamit sa Pilipinas',
    symbolsTitle: 'Mga Simbolo ug SI Units',
    workedExampleTitle: 'Lakang-sa-lakang nga Pananglitan sa Pangutana sa Board',
    fasterShortcutTitle: 'Paspas nga Shortcut / Pamaagi sa Review Center',
    quickCheckTitle: 'Pagsulay sa Konsepto',

    // Today View
    findingHardTitle: 'Nagkinahanglan og lig-ong pundasyon sa electrical circuits?',
    beginnerFriendlyBadge: 'Pundasyon',
    findingHardDesc:
      'Sugdi sa kinayanoang mga leksyon gamit ang DC Circuit Simulator, Batas ni Ohm, Kirchhoff’s Laws, ug klarong lakang-sa-lakang nga kwenta.',
    startAlgebraBtn: 'Baliki ang Engineering Math',
    startCircuitsBtn: 'Sugdi sa DC Circuits (Batas ni Ohm)',
    todayStudyPrompt: '1. Unsay angay nakong tun-an karon?',
    todayPracticePrompt: '2. Girekomendar nga Pagbansay Karon',
    todayFormulaPrompt: '3. Paspas nga Paghinumdom sa Formula',
    diagnosticPromptTitle: 'Diagnostic Assessment',
    takeDiagnosticBtn: 'Kuhaa ang 15-Item Diagnostic',
    roadmapBtn: '6-Ka-Bulan nga Plano ug Roadmap',

    // AI Tutor Chips
    tutorChipEli10: 'I-explain nga morag 10 anyos ko',
    tutorChipTagalog: 'I-explain sa Tagalog',
    tutorChipBisaya: 'I-explain sa Bisaya',
    tutorChipHint: 'Hatagi ko og hint / giya',
    tutorChipBabySteps: 'Lakang-sa-lakang nga kwenta',
    tutorChipCalculator: 'Shortcut sa Casio Calculator',

    // Simulator Guide & Zero-Confusion
    simDontUnderstandBtn: 'Wala ba ka kasabot sa simulator?',
    simDontUnderstandTitle: '30-Segundos nga Giya sa Simulator (Walay Libog)',
    simDotsMeaningTitle: 'Unsa man nang nagdagan nga mga asul nga tuldok?',
    simDotsMeaningText: 'Girepresentar nila ang kuryente (Current sa Amperes). Paspas nga tuldok = kusog nga kuryente. Hinay nga tuldok = dako ang babag o resistance.',
    simSlidersMeaningTitle: 'Para unsa ang mga slider?',
    simSlidersMeaningText: 'Morag mga pihitán sa lab testing bench sa electrical engineering. Kon imo kining lihokon, makita dayon nimo giunsa pag-apekto sa boltahe, resistance, coils, ug capacitors ang dagan sa kuryente.',
    simFormulasMeaningTitle: 'Unsaon man kini pagtabang sa Board Exam?',
    simFormulasMeaningText: 'Makita nimo daan ang tinuod nga pisikal nga reaksyon una ka mag-compute. Ang mga pormula sama sa I = V / Z ug P = V × I × cos(θ) adunay klarong hulagway na sa imong hunahuna!',
    simAskTutorHelp: 'Pangutana kang Engr. Ramos: I-explain kining Simulator',
    simTakeTourBtn: 'Giniyahan nga Tour',
    simCloseHelp: 'Nasabtan Na Nako, Isira',
  },
};

// ============================================================================
// LESSON TRANSLATIONS (TAGALOG & BISAYA)
// ============================================================================

export const LESSON_TRANSLATIONS: Record<
  string,
  {
    tl: {
      conceptName?: string;
      plainExplanation?: string;
      simplifiedGuide: SimplifiedLessonGuide;
    };
    ceb: {
      conceptName?: string;
      plainExplanation?: string;
      simplifiedGuide: SimplifiedLessonGuide;
    };
  }
> = {
  // 0. ABSOLUTE ZERO BASICS
  'lesson-ee-absolute-basics-zero': {
    tl: {
      conceptName: 'Level 0: Kuryente Mula sa Simula (Tulak, Daloy, at Harang)',
      plainExplanation:
        'Ang kuryente ay ang paggalaw ng mga electron sa loob ng kawad. Ang Baterya ang nagbibigay ng TULAK (Voltage V sa Volts). Ang harang o sikip sa kawad ay ang HARANG (Resistance R sa Ohms). Ang mismong dami ng kuryenteng lumulusot bawat segundo ay ang DALOY (Current I sa Amperes). Ang Batas ni Ohm ay: Daloy = Tulak ÷ Harang (I = V / R).',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Boltahe ang nagtutulak, ang Resistance ang nag-iipit sa kawad, at ang Current ang mismong kuryenteng dumadaloy!',
        realLifeMetaphor: {
          title: 'Ang Tangke ng Tubig at Gripo',
          story:
            'Isipin mo ang tangke ng tubig sa bubong. Ang taas ng tangke ang nagbibigay ng presyon (Voltage). Ang pagsikip ng gripo o pag-ipit sa hose ang harang (Resistance). Ang tubig na pumupuno sa timba bawat segundo ang daloy (Current). Kapag tinaasan mo ang presyon, bibilis ang daloy. Kapag inipit mo ang hose, babagal ang daloy.',
          iconEmoji: '🚰',
          visualTip:
            'Sa simulation sa itaas, igalaw ang Voltage slider para lumakas ang tulak, at igalaw ang Resistance para sumikip ang tubo!',
        },
        whyItMatters:
          'Lahat ng electrical appliances at kable sa bahay ay sumusunod sa simpleng batas na ito.',
        keyTakeaways: [
          'Voltage (V) = TULAK mula sa baterya (sinusukat sa Volts)',
          'Resistance (R) = HARANG o sikip sa kable (sinusukat sa Ohms Ω)',
          'Current (I) = DALOY ng kuryente (I = V ÷ R, sinusukat sa Amperes)',
          'Closed Circuit = Buo ang ikot (umiilaw ang bumbilya)',
          'Open Circuit = Putol ang kawad (0 Amperes, patay ang ilaw)',
          'Short Circuit = Walang harang na linya (sobrang lakas ng kuryente, delikado)',
        ],
        babyStepExample: {
          title: 'Simpleng Halimbawa (12V Baterya at 4Ω Bumbilya)',
          friendlyNumbers: 'Gamit ang madaling numero: 12-Volt na baterya at 4-Ohm na bumbilya.',
          steps: [
            {
              stepNumber: 1,
              action: 'Alamin ang Tulak (Voltage)',
              math: 'V = 12 Volts',
              plainWhy: 'Ang baterya ay nagbibigay ng 12 Volts na presyon.',
            },
            {
              stepNumber: 2,
              action: 'Alamin ang Harang (Resistance)',
              math: 'R = 4 Ohms (Ω)',
              plainWhy: 'Ang filament ng ilaw ay may 4 Ohms na harang.',
            },
            {
              stepNumber: 3,
              action: 'Kwenta ng Daloy (Current)',
              math: 'I = 12 ÷ 4 = 3 Amperes',
              plainWhy: '12 volts na tulak hinati sa 4 ohms na harang ay nagbibigay ng 3 Amperes na daloy.',
            },
            {
              stepNumber: 4,
              action: 'Kwenta ng Liwanag / Power',
              math: 'P = 12 × 3 = 36 Watts',
              plainWhy: '36 Watts ng kuryente ang nagiging liwanag at init.',
            },
          ],
          bottomLine:
            'Kung gusto mo ng mas malakas na kuryente, lakasan ang Voltage o luwagan ang Resistance!',
        },
        calculatorQuickButtons: 'Sa Casio fx-991: Pindutin ang [ 1 2 ] [ ÷ ] [ 4 ] [ = ] -> Sagot: 3 A',
        dontPanicTip: 'Huwag kabahan sa formulas; isipin lamang ang tulak at daloy sa kawad.',
      },
    },
    ceb: {
      conceptName: 'Level 0: Kuryente Gikan sa Sinugdanan (Tukmod, Agas, ug Babag)',
      plainExplanation:
        'Ang kuryente mao ang paglihok sa mga electron sa sulod sa alambre. Ang Baterya maoy naghatag og TUKMOD (Voltage V sa Volts). Ang babag o kapiot sa alambre mao ang BABAG (Resistance R sa Ohms). Ang gidaghanon sa kuryente nga moagas matag segundo mao ang AGAS (Current I sa Amperes). Ang Batas ni Ohm: Agas = Tukmod ÷ Babag (I = V / R).',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Boltahe maoy nagtukmod, ang Resistance maoy nagpiot sa alambre, ug ang Current maoy mismong agas sa kuryente!',
        realLifeMetaphor: {
          title: 'Ang Tangke sa Tubig ug Gripo',
          story:
            'Hunahunaa ang tangke sa tubig sa atop. Ang gihabogon sa tangke maoy naghatag og presyon (Voltage). Ang pagpiot sa gripo o hose maoy babag (Resistance). Ang tubig nga mosulod sa balde matag segundo maoy agas (Current). Kon pataason ang presyon, mas paspas ang agas. Kon pioton ang hose, mohinay ang agas.',
          iconEmoji: '🚰',
          visualTip:
            'Sa simulation sa ibabaw, lihoka ang Voltage slider aron molig-on ang tukmod, ug lihoka ang Resistance aron mapiot ang tubo!',
        },
        whyItMatters:
          'Ang tanang kagamitan sa kuryente sa balay nagsubay niining yano nga balanse.',
        keyTakeaways: [
          'Voltage (V) = TUKMOD gikan sa baterya (sa Volts)',
          'Resistance (R) = BABAG o kapiot sa alambre (sa Ohms Ω)',
          'Current (I) = AGAS sa kuryente (I = V ÷ R, sa Amperes)',
          'Closed Circuit = Kompleto ang alambre (mosiga ang suga)',
          'Open Circuit = Putol ang alambre (0 Amperes, pawong ang suga)',
          'Short Circuit = Walay babag nga linya (kusog kaayong kuryente, delikado)',
        ],
        babyStepExample: {
          title: 'Sayon nga Pananglitan (12V Baterya ug 4Ω Suga)',
          friendlyNumbers: 'Gamit ang sayon nga numero: 12-Volt nga baterya ug 4-Ohm nga suga.',
          steps: [
            {
              stepNumber: 1,
              action: 'Hibaloi ang Tukmod (Voltage)',
              math: 'V = 12 Volts',
              plainWhy: 'Ang baterya naghatag og 12 Volts nga presyon.',
            },
            {
              stepNumber: 2,
              action: 'Hibaloi ang Babag (Resistance)',
              math: 'R = 4 Ohms (Ω)',
              plainWhy: 'Ang suga adunay 4 Ohms nga babag.',
            },
            {
              stepNumber: 3,
              action: 'Kwenta sa Agas (Current)',
              math: 'I = 12 ÷ 4 = 3 Amperes',
              plainWhy: '12 volts nga tukmod gibahin sa 4 ohms nga babag naghatag og 3 Amperes nga agas.',
            },
            {
              stepNumber: 4,
              action: 'Kwenta sa Kahayag / Power',
              math: 'P = 12 × 3 = 36 Watts',
              plainWhy: '36 Watts sa kuryente ang mahimong kahayag ug kainit.',
            },
          ],
          bottomLine:
            'Kon gusto ka og mas kusog nga kuryente, pakusgi ang Voltage o pakunhuri ang Resistance!',
        },
        calculatorQuickButtons: 'Sa Casio fx-991: Pindota ang [ 1 2 ] [ ÷ ] [ 4 ] [ = ] -> Tubag: 3 A',
        dontPanicTip: 'Ayaw kabalaka sa pormula; hunahunaa lang ang tukmod ug agas sa alambre.',
      },
    },
  },
  // 1. BASIC DC CIRCUITS
  'lesson-ee-basic-dc-circuits': {
    tl: {
      conceptName: "Pangunahing Electric Circuits: Batas ni Ohm at Kirchhoff's Laws",
      plainExplanation:
        'Lahat ng kuryente ay nagsisimula sa Ohm’s Law (V = I · R). Ang boltahe (V) ang nagtutulak, ang resistance (R) ang humaharang, at ang kuryente (I) ang mismong daloy. Kapag series, nagsasama-sama ang resistance (R_total = R1 + R2). Kapag parallel, parang nagbukas ka ng bagong daanan kaya bumababa ang kabuuang resistance!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Boltahe ay ang presyon ng tubig, ang Resistance ay ang ipit sa hose, at ang Kuryente ay ang dami ng tubig na bumubuhos!',
        realLifeMetaphor: {
          title: 'Ang Gripo at Hose sa Hardin',
          story:
            'Isipin mo ang tubig na lumalabas sa hose ng gripo. Ang presyon ng tubig mula sa gripo ay ang Voltage (Volts). Kung aapakan mo ang hose o may nakabara, iyon ang Resistance (Ohms). Ang mismong dami ng tubig na tumatalsik bawat segundo ay ang Current (Amperes). Kapag pinalakas mo ang bukas ng gripo (mas mataas na Volts) → mas malakas ang buhos ng tubig. Kapag inapakan mo nang madiin (mas mataas na Ohms) → hihina ang buhos. Yan ang simpleng Batas ni Ohm: Daloy = Presyon ÷ Harang (I = V / R)!',
          iconEmoji: '🚰',
          visualTip:
            'Sa simulation sa itaas: taasan ang Resistance at panoorin kung paano bumagal ang mga asul na tuldok ng electron!',
        },
        whyItMatters:
          'Lahat ng gamit mo sa bahay (charger ng cellphone, ref, bentilador) ay idinisenyo gamit ang patakarang ito para hindi mag-overheat ang kawad at masunog ang bahay.',
        keyTakeaways: [
          '⚡ Voltage (V) = PUSH (ang tulak o presyon mula sa baterya o saksakan)',
          '🚧 Resistance (R) = IPIT (ang pumipigil o nagpapasikip sa daloy)',
          '🌊 Current (I) = BUHOS (ang dami ng kuryenteng dumadaan bawat segundo: I = V ÷ R)',
          '➡️ Series (isang linya): Nagsasama o nag-a-ADD lang ang mga Resistance (6 Ω + 6 Ω = 12 Ω)',
          '🔀 Parallel (magkatabing linya): Parang nagdagdag ka ng isa pang lane sa highway, kaya mas maluwag ang trapiko (6 Ω || 6 Ω = 3 Ω)!',
        ],
        babyStepExample: {
          title: 'Simpleng 4-Hakbang na Halimbawa gamit ang Maliliit na Numero',
          friendlyNumbers: 'Gagamit tayo ng madaling numero: Isang 12-Volt na baterya at dalawang 6-Ohm na bumbilya.',
          steps: [
            {
              stepNumber: 1,
              action: 'Ikonekta nang Series (sunod-sunod sa isang linya)',
              math: '6 Ω + 6 Ω = 12 Ω kabuuang resistance',
              plainWhy: 'Kailangang dumaan ng kuryente sa dalawang bumbilya nang sunod-sunod, kaya dumoble ang harang.',
            },
            {
              stepNumber: 2,
              action: 'Hanapin ang daloy sa Series',
              math: '12 Volts ÷ 12 Ohms = 1 Ampere',
              plainWhy: '12 volts na tulak hinati sa 12 ohms na harang ay nagbibigay ng 1 amp na daloy.',
            },
            {
              stepNumber: 3,
              action: 'Ngayon ikonekta nang Parallel (magkahiwalay na sanga)',
              math: '(6 × 6) ÷ (6 + 6) = 36 ÷ 12 = 3 Ω',
              plainWhy: 'Dahil may dalawang daanan, nagkaroon ng dobleng espasyo ang kuryente, kaya nahati sa dalawa ang harang!',
            },
            {
              stepNumber: 4,
              action: 'Hanapin ang daloy sa Parallel',
              math: '12 Volts ÷ 3 Ohms = 4 Amperes',
              plainWhy: 'Dahil lumuwag ang daan (3 Ω na lang), nakapagbomba ang baterya ng 4 na beses na mas maraming kuryente!',
            },
          ],
          bottomLine:
            'Ang Series ay nagpapalaki ng resistance (nagpapatrapik). Ang Parallel ay nagpapaliit ng resistance (nagpapaluwag ng highway).',
        },
        calculatorQuickButtons:
          'Casio parallel shortcut: Pindutin ang [ ( 6⁻¹ + 12⁻¹ )⁻¹ ] at pindutin ang [=]. Lalabas agad ang sagot na 4!',
        dontPanicTip:
          'Huwag matakot sa mahahabang circuit diagrams! Sa 90% ng mga tanong sa board exam, pinagpapares-pares mo lang ang mga resistor nang dalawahan hanggang maging isang numero na lang.',
      },
    },
    ceb: {
      conceptName: "Pangunang Electric Circuits: Balaod ni Ohm ug Kirchhoff's Laws",
      plainExplanation:
        'Ang tanang kuryente nagsugod sa Balaod ni Ohm (V = I · R). Ang boltahe (V) mao ang nagduso, ang resistance (R) mao ang nagpugong, ug ang kuryente (I) mao ang mismong agay. Sa series, magtipon ang resistance (R_total = R1 + R2). Sa parallel, sama sa nag-abli ka og dugang dalan mao nga moubos ang kinatibuk-ang resistance!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Boltahe mao ang presyon sa tubig, ang Resistance mao ang pagpiot sa hose, ug ang Kuryente mao ang gidaghanon sa tubig nga mogawas!',
        realLifeMetaphor: {
          title: 'Ang Gripo ug Hose sa Tugkaran',
          story:
            'Hunahunaa ang tubig nga nagdagayday gikan sa hose. Ang presyon sa tubig gikan sa gripo mao ang Voltage (Volts). Kung imong tumban o pioton ang hose, kana ang Resistance (Ohms). Ang gidaghanon sa tubig nga mosirit matag segundo mao ang Current (Amperes). Kung kusgon nimo ang abli sa gripo (mas taas nga Volts) → mas kusog ang sirit sa tubig. Kung pioton nimo og maayo (mas taas nga Ohms) → mohinay ang agay. Kana ang yano nga Balaod ni Ohm: Agay = Presyon ÷ Piot (I = V / R)!',
          iconEmoji: '🚰',
          visualTip:
            'Sa simulation sa ibabaw: pasakai ang Resistance ug tan-awa giunsa paghinay sa mga asul nga tuldok sa electron!',
        },
        whyItMatters:
          'Ang tanan nimong gamit sa balay (charger sa cellphone, ref, electric fan) gihimo gamit kining balaora aron dili mag-overheat ang alambre ug dili masunog ang balay.',
        keyTakeaways: [
          '⚡ Voltage (V) = TUDLO O DUSO (ang presyon gikan sa baterya o outlet)',
          '🚧 Resistance (R) = PIOT O PUGONG (ang nagbabag sa agay sa kuryente)',
          '🌊 Current (I) = AGAY (pila ka electron ang moagi matag segundo: I = V ÷ R)',
          '➡️ Series (nagsunod sa usa ka linya): I-ADD ra ang mga Resistance (6 Ω + 6 Ω = 12 Ω)',
          '🔀 Parallel (tapad nga mga linya): Morag nagdugang ka og usa pa ka lane sa karsada, mas hapsay ang agi (6 Ω || 6 Ω = 3 Ω)!',
        ],
        babyStepExample: {
          title: 'Sayon nga 4-Lakang nga Pagsabot gamit ang Gagmayng Numero',
          friendlyNumbers: 'Gamiton nato kining sayon nga numero: Usa ka 12-Volt nga baterya ug duha ka 6-Ohm nga suga.',
          steps: [
            {
              stepNumber: 1,
              action: 'Isumpay og Series (nagsunod sa usa ka linya)',
              math: '6 Ω + 6 Ω = 12 Ω kinatibuk-ang resistance',
              plainWhy: 'Kinahanglan moagi ang kuryente sa duha ka suga nga naglinya, mao nga midoble ang babag.',
            },
            {
              stepNumber: 2,
              action: 'Pangitaa ang agay sa Series',
              math: '12 Volts ÷ 12 Ohms = 1 Ampere',
              plainWhy: '12 volts nga duso gibahin sa 12 ohms nga babag naghatag og 1 amp nga agay.',
            },
            {
              stepNumber: 3,
              action: 'Karon isumpay og Parallel (magkalahi nga sanga)',
              math: '(6 × 6) ÷ (6 + 6) = 36 ÷ 12 = 3 Ω',
              plainWhy: 'Tungod kay duha na ang agianan, nakabaton og dobleng hawan ang kuryente, mao nga natunga ang babag!',
            },
            {
              stepNumber: 4,
              action: 'Pangitaa ang agay sa Parallel',
              math: '12 Volts ÷ 3 Ohms = 4 Amperes',
              plainWhy: 'Tungod kay mihawan ang dalan (3 Ω na lang), nakabomba ang baterya og 4 ka pilo nga mas daghang kuryente!',
            },
          ],
          bottomLine:
            'Ang Series makapadako sa resistance (makapahinay sa trapiko). Ang Parallel makapagamay sa resistance (makapaluag sa highway).',
        },
        calculatorQuickButtons:
          'Casio parallel shortcut: Pindota ang [ ( 6⁻¹ + 12⁻¹ )⁻¹ ] ug pindota ang [=]. Mogawas dayon ang tubag nga 4!',
        dontPanicTip:
          'Ayaw kalisang sa tag-as nga diagram sa sirkito! Sa 90% sa mga pangutana sa board exam, imo ra kining ipares-pares og tinagurha hangtod mahimong usa na lang ka numero.',
      },
    },
  },

  // 2. POWER FACTOR
  'lesson-ee-power-factor': {
    tl: {
      conceptName: 'Power Factor at Sukat ng Shunt Capacitor',
      plainExplanation:
        'Ang mga motor at transformer ay nangangailangan ng magnetic field para gumana, na lumilikha ng Reactive Power (kVAR). Hindi ito gumagawa ng totoong trabaho ngunit nagpapasikip sa mga kawad ng kuryente. Ang pagkakabit ng capacitor ay nag-aalis ng sayang na bula upang hindi ka multahan ng Meralco.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Power Factor ay ang porsyento ng masarap na inumin laban sa walang kwentang bula sa baso mo — ang capacitor ang nagpapaputok sa bula para sulit ang binabayaran mo!',
        realLifeMetaphor: {
          title: 'Ang Malamig na Baso ng Root Beer / Softdrink',
          story:
            'Isipin mong umorder ka ng isang basong root beer o serbesa. Ang masarap na likido sa ilalim ay ang Real Power (kW) — ito ang talagang umiinom at nagpapawi ng uhaw mo (nagpapaikot ng motor, nagpapailaw). Ang mabula at hangin sa ibabaw ay ang Reactive Power (kVAR) — umuukupa lang ito ng puwang sa baso pero hindi mo maiinom! Ang buong sukat ng baso ay ang Apparent Power (kVA). Kung kalahati ng baso mo ay puro bula lang, napakababa ng power factor mo (0.50). Ang pagkabit ng capacitor ay parang spray na nagpapaputok sa bula: nawawala ang bula, kaya halos 100% puro purong inumin na ang laman ng baso mo!',
          iconEmoji: '🍺',
          visualTip:
            'Sa Power Triangle sa itaas: tingnan kung paano itinutulak ng capacitor pababa ang linyang asul (kVAR bula) hanggang maging zero!',
        },
        whyItMatters:
          'Ang mga kumpanya ng kuryente (tulad ng Meralco) ay nagpapataw ng malalaking multa sa mga pabrika kapag ang power factor ay mas mababa sa 0.85 dahil napipilitan silang maglatag ng napakalalaking kable para lang maghatid ng walang kwentang bula.',
        keyTakeaways: [
          '🥤 Real Power (kW) = Ang likidong naiinom mo (ang totoong gumagawa ng mekanikal na trabaho)',
          '🫧 Reactive Power (kVAR) = Ang mabubulang bula (sayang na espasyo sa kawad ng kuryente)',
          '🍺 Apparent Power (kVA) = Ang kabuuang sukat ng baso na kailangang ihanda ng kumpanya ng kuryente',
          '🎯 Power Factor (pf) = Likido ÷ Kabuuang Baso. Ang perpektong marka ay 1.0 (100% likido, 0% bula!)',
          '⚡ Shunt Capacitor = Ang pampaputok ng bula. Kinakansela nito ang bula mismo sa loob ng pabrika.',
        ],
        babyStepExample: {
          title: 'Pagtanggal sa Bula gamit ang Capacitor',
          friendlyNumbers: 'Isang motor ang gumagamit ng 100 kW na inumin, may 0.70 power factor. Gusto nating maging 1.0 (walang bula!).',
          steps: [
            {
              stepNumber: 1,
              action: 'Kunin ang anggulo ng bula mula sa power factor',
              math: 'arccos(0.70) = 45.6°',
              plainWhy: 'Ang power factor ay cosine lang ng anggulo: cos(θ) = 0.70.',
            },
            {
              stepNumber: 2,
              action: 'Hanapin ang multiplier ng bula',
              math: 'tan(45.6°) = 1.02',
              plainWhy: 'Ibig sabihin, sa bawat 1 kW ng inumin, may 1.02 kVAR na bula!',
            },
            {
              stepNumber: 3,
              action: 'Kwenta ng sukat ng capacitor na kailangan',
              math: '100 kW × 1.02 = 102 kVAR',
              plainWhy: 'Ang 102 kVAR na capacitor bank ang magpapaputok sa lahat ng bula, kaya bababa ang kuryente ng mahigit 30%!',
            },
          ],
          bottomLine:
            'Ang motor ay tuloy pa rin sa paggawa ng parehong 100 kW na trabaho, pero malamig na ang kable at wala nang multa mula sa Meralco!',
        },
        calculatorQuickButtons:
          'Casio 1-liner: I-type ang [ 100 ] × [ tan(cos⁻¹(0.70)) - tan(cos⁻¹(0.95)) ] at pindutin ang [=]. Makukuha mo ang 82.98 kVAR sa loob ng 5 segundo!',
        dontPanicTip:
          'Siguraduhing nakasulat ang "D" (Degrees) sa itaas ng screen ng calculator mo, hindi "R" (Radians), kundi magiging mali ang mga anggulo mo.',
      },
    },
    ceb: {
      conceptName: 'Power Factor ug Gidak-on sa Shunt Capacitor',
      plainExplanation:
        'Ang mga motor ug transformer nagkinahanglan og magnetic field aron motuyok, nga nagmugna og Reactive Power (kVAR). Dili kini makahimo og tinuod nga trabaho apan makapahuot sa mga kable sa kuryente. Ang pagbutang og capacitor maoy magwagtang sa usik nga bula aron dili ka pamultahon sa kuryente.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Power Factor mao ang bahin sa tinuod nga ilimnon batok sa way kapuslanan nga bula sa imong baso — ang capacitor maoy mobuto sa bula aron sulit ang imong bayad!',
        realLifeMetaphor: {
          title: 'Ang Bugnaw nga Baso sa Root Beer / Softdrink',
          story:
            'Hunahunaa nga ni-order ka og usa ka dako nga baso sa root beer. Ang lami nga likido sa ubos mao ang Real Power (kW) — mao kini ang makatagbaw sa imong kauhaw (mopatuyok sa motor, mopasiga sa suga). Ang walay kapuslanan nga bula sa ibabaw mao ang Reactive Power (kVAR) — nag-usik lang og luna sa baso apan dili nimo mainom! Ang tibuok gidak-on sa baso mao ang Apparent Power (kVA). Kung katunga sa imong baso puro bula, ubos kaayo ang imong power factor (0.50). Ang pagbutang og capacitor morag anti-foam spray: mobuto ang mga bula, aron ang imong baso mapuno sa hapit 100% puro nga ilimnon!',
          iconEmoji: '🍺',
          visualTip:
            'Sa Power Triangle sa ibabaw: tan-awa nga ang pagdugang sa capacitor nagduso sa asul nga linya (kVAR bula) paubos ngadto sa zero!',
        },
        whyItMatters:
          'Ang mga kompanya sa kuryente mamulta og dako sa mga pabrika kon ang ilang power factor moubos sa 0.85 tungod kay mapugos sila sa paghatod og dagkong kable para lang sa walay pulos nga bula.',
        keyTakeaways: [
          '🥤 Real Power (kW) = Ang likido nga imong mainom (ang naghimo sa tinuod nga trabaho)',
          '🫧 Reactive Power (kVAR) = Ang mabula nga hangin (nausik nga luna sa alambre)',
          '🍺 Apparent Power (kVA) = Ang kinatibuk-ang gidak-on sa baso nga kinahanglan ihatag sa kompanya',
          '🎯 Power Factor (pf) = Likido ÷ Tibuok Baso. Ang hingpit nga grado 1.0 (100% likido, 0% bula!)',
          '⚡ Shunt Capacitor = Ang tigbuto sa bula. Mopakgang sa bula diha mismo sa pabrika.',
        ],
        babyStepExample: {
          title: 'Pagtangtang sa Bula gamit ang Capacitor',
          friendlyNumbers: 'Ang motor naggamit og 100 kW nga ilimnon, may 0.70 power factor. Gusto nato og 1.0 (walay bula!).',
          steps: [
            {
              stepNumber: 1,
              action: 'Kuhaa ang anggulo sa bula gikan sa power factor',
              math: 'arccos(0.70) = 45.6°',
              plainWhy: 'Ang power factor cosine ra sa anggulo: cos(θ) = 0.70.',
            },
            {
              stepNumber: 2,
              action: 'Pangitaa ang multiplier sa bula',
              math: 'tan(45.6°) = 1.02',
              plainWhy: 'Nagpasabot kini nga sa matag 1 kW nga ilimnon, aduna kay 1.02 kVAR nga bula!',
            },
            {
              stepNumber: 3,
              action: 'Kwentaha ang capacitor nga gikinahanglan',
              math: '100 kW × 1.02 = 102 kVAR',
              plainWhy: 'Ang 102 kVAR nga capacitor bank mobuto sa tanang bula, makapakunhod sa kuryente og sobra 30%!',
            },
          ],
          bottomLine:
            'Ang motor naghimo gihapon sa samang 100 kW nga trabaho, apan bugnaw na ang mga linya ug wala nay multa gikan sa kuryente!',
        },
        calculatorQuickButtons:
          'Casio 1-liner: I-type ang [ 100 ] × [ tan(cos⁻¹(0.70)) - tan(cos⁻¹(0.95)) ] ug pindota ang [=]. Mohatag og 82.98 kVAR sulod sa 5 segundos!',
        dontPanicTip:
          'Siguroha nga ang imong kalkulator nagpakita og "D" (Degrees) sa ibabaw sa screen, dili "R" (Radians), aron dili masayop ang imong mga anggulo.',
      },
    },
  },

  // 3. AC RLC CIRCUITS & RESONANCE
  'lesson-ee-rlc-circuits': {
    tl: {
      conceptName: 'AC RLC Impedance at Resonance',
      plainExplanation:
        'Sa AC circuits, ang Resistor ay nag-aaksaya ng init, habang ang Inductor (XL) at Capacitor (XC) ay nag-iimbak ng kuryente. Kapag nagkatugma ang sukat ng Inductor at Capacitor (XL = XC), kinakansela nila ang isa’t isa! Ito ang tinatawag na RESONANCE: nawawala ang harang at sumusugod ang kuryente sa pinakamataas nitong lakas.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Resonance ay parang pagtulak sa duyan sa tamang tiyempo: nagkakanselahan ang bigat ng bata at talbog ng goma, kaya sumisirit ang kuryente nang walang kahirap-hirap!',
        realLifeMetaphor: {
          title: 'Ang Duyan sa Palaruan at Trampoline',
          story:
            'Kung itutulak mo ang duyan sa maling tiyempo, sasalubungin ka nito at mabagal ang ugoy. Pero kung itutulak mo sa mismong tamang ritmo, kahit mahinang tulak lang ay lilipad ito nang napakataas! Sa electronics, ang Inductor (coil) ay parang mabigat na bata na ayaw bilisan o bagalan. Ang Capacitor ay parang trampoline na tumatalbog pabalik. Kapag ang kabagalan ng coil (XL) ay eksaktong nagtugma sa talbog ng capacitor (XC), nagkakanselahan sila! Iyan ang RESONANCE: walang laban ang circuit, at sumisirit ang kuryente sa pinakamalakas na daloy!',
          iconEmoji: '🎪',
          visualTip:
            'Sa visual sa itaas, hilahin ang Inductance o Capacitance slider hanggang magkapantay ang XL at XC: magliliwanag ang dilaw na "⚡ RESONANCE" badge at tataas ang kuryente sa tuktok!',
        },
        whyItMatters:
          'Ito ang puso ng lahat ng wireless communications: ito ang nagbibigay-daan sa radyo o cellphone mo na pumili ng 98.7 FM o 5G Wi-Fi habang binabara ang lahat ng iba pang signal sa mundo.',
        keyTakeaways: [
          '🧱 Resistor (R) = Gasgas o init (nag-aaksaya ng kuryente bilang init)',
          '🌀 Inductor (XL) = Mabigat na gulong (ayaw magbago ang kuryente: XL = 2πfL)',
          '🔋 Capacitor (XC) = Spring o bukal (nag-iimbak ng kuryente: XC = 1 / (2πfC))',
          '⚖️ Nangyayari ang Resonance kapag Coil = Spring (XL = XC)',
          '🚀 Sa series resonance, ZERO ang netong harang, at nagiging simpleng resistor na lang ang circuit (Z = R) kung saan pinakamalakas ang kuryente!',
        ],
        babyStepExample: {
          title: 'Resonance sa 3 Simpleng Numero',
          friendlyNumbers: 'Ipagpalagay na R = 10 Ω, XL = 40 Ω, at XC = 40 Ω, na may 100 V na kuryente.',
          steps: [
            {
              stepNumber: 1,
              action: 'Ibawas ang naglalabang reaktansya',
              math: 'XL - XC = 40 - 40 = 0 Ω',
              plainWhy: 'Ganap na pinawi ng coil at capacitor ang isa’t isa!',
            },
            {
              stepNumber: 2,
              action: 'Hanapin ang kabuuang impedance (harang)',
              math: 'Z = √(10² + 0²) = 10 Ω',
              plainWhy: 'Tanging ang 10 Ω na resistor na lang ang natitirang humaharang sa kuryente.',
            },
            {
              stepNumber: 3,
              action: 'Hanapin ang daloy ng kuryente',
              math: '100 V ÷ 10 Ω = 10 Amps',
              plainWhy: 'Dumadaloy ang kuryente sa pinakamataas na posibleng halaga!',
            },
          ],
          bottomLine:
            'Kailanman nagkapantay ang XL = XC, zero ang harang, pinakamababa ang impedance (Z = R), at nasa pinakamataas na tuktok ang kuryente.',
        },
        calculatorQuickButtons:
          'Casio Resonant Frequency shortcut: I-type ang [ 1 ] ÷ [ 2 × π × √( L × C ) ] at pindutin ang [=].',
        dontPanicTip:
          'Kapag sinabi ng tanong sa board exam na "circuit operates at series resonance", isulat agad: XL = XC, Z = R, at pf = 1.0. Hindi mo na kailangan ng mahabang algebra!',
      },
    },
    ceb: {
      conceptName: 'AC RLC Impedance ug Resonance',
      plainExplanation:
        'Sa AC circuits, ang Resistor mag-usik og init, samtang ang Inductor (XL) ug Capacitor (XC) magtipig og enerhiya. Kung magkatakdo ang sukod sa Inductor ug Capacitor (XL = XC), magkansenlasay sila! Mao kini ang gitawag og RESONANCE: mahanaw ang babag ug mosulbong ang kuryente sa kinatas-ang kusog.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Resonance morag pagduso sa duyan sa saktong ritmo: magkanselar ang kabug-at sa bata ug unlat sa spring, mao nga molupad ang kuryente nga walay babag!',
        realLifeMetaphor: {
          title: 'Ang Duyan sa Parke ug Trampoline',
          story:
            'Kung imong iduso ang duyan sa sayop nga higayon, magkabangga mo ug hinay ang lihok. Apan kon iduso nimo sa saktong gutlo, bisan gamayng duso makapalupad kaniya sa kahanginan! Sa electronics, ang Inductor (coil) morag bug-at nga bata nga dili gustong mopaspas o mohinay. Ang Capacitor morag trampoline nga mo-untol pabalik. Kung ang kabug-at sa coil (XL) motakdo sa untol sa capacitor (XC), magkanselar silang duha! Mao kana ang RESONANCE: walay babag ang circuit, ug ang kuryente mosirit sa labing kusog nga dagan!',
          iconEmoji: '🎪',
          visualTip:
            'Sa visual sa ibabaw, ibira ang Inductance o Capacitance slider hangtod magkaparehas ang XL ug XC: mosiga ang dalag nga "⚡ RESONANCE" badge ug mosaka ang kuryente!',
        },
        whyItMatters:
          'Mao kini ang kasingkasing sa tanang wireless communications: makapahimo sa imong cellphone sa pagpili og 98.7 FM o 5G Wi-Fi channel samtang gibabagan ang tanang ubang signal sa kalibutan.',
        keyTakeaways: [
          '🧱 Resistor (R) = Gasgas (mag-usik og enerhiya pinaagi sa init)',
          '🌀 Inductor (XL) = Bug-at nga ligid (mosukol sa kausaban sa kuryente: XL = 2πfL)',
          '🔋 Capacitor (XC) = Spring (mopundo og kuryente: XC = 1 / (2πfC))',
          '⚖️ Mahitabo ang Resonance kon Coil = Spring (XL = XC)',
          '🚀 Sa series resonance, ZERO ang babag, ug ang circuit mahisama sa yano nga resistor (Z = R) nga may kinatas-ang kuryente!',
        ],
        babyStepExample: {
          title: 'Resonance sa 3 ka Yano nga Numero',
          friendlyNumbers: 'Ibutang ta nga R = 10 Ω, XL = 40 Ω, ug XC = 40 Ω, nga may 100 V nga kuryente.',
          steps: [
            {
              stepNumber: 1,
              action: 'Iminus ang nagbangi nga reaktansya',
              math: 'XL - XC = 40 - 40 = 0 Ω',
              plainWhy: 'Hingpit nga nagpapasay ang coil ug ang capacitor!',
            },
            {
              stepNumber: 2,
              action: 'Pangitaa ang kinatibuk-ang impedance (babag)',
              math: 'Z = √(10² + 0²) = 10 Ω',
              plainWhy: 'Ang 10 Ω nga resistor na lang ang nahibilin nga nagpugong sa kuryente.',
            },
            {
              stepNumber: 3,
              action: 'Pangitaa ang kuryente',
              math: '100 V ÷ 10 Ω = 10 Amps',
              plainWhy: 'Ang kuryente modagayday sa kinatas-ang posibleng gidaghanon!',
            },
          ],
          bottomLine:
            'Kanus-a gani XL = XC, zero ang babag, labing ubos ang impedance (Z = R), ug anaa sa kinatumyan ang kuryente.',
        },
        calculatorQuickButtons:
          'Casio Resonant Frequency shortcut: I-type ang [ 1 ] ÷ [ 2 × π × √( L × C ) ] ug pindota ang [=].',
        dontPanicTip:
          'Kung moingon ang pangutana sa board exam nga "circuit operates at series resonance", isulat dayon: XL = XC, Z = R, ug pf = 1.0. Dili na kinahanglan og lisod nga algebra!',
      },
    },
  },

  // 4. TRANSFORMERS
  'lesson-ee-transformer': {
    tl: {
      conceptName: 'Pagbabago ng Impedance sa Transformer',
      plainExplanation:
        'Ang transformer ay nagpapalit ng lebel ng boltahe at kuryente. Kapag bumaba ang boltahe nang 10 beses, ang kuryente ay tataas nang 10 beses upang mapanatiling pantay ang Power. Dahil ang Resistance ay V hinati sa I, ang impedance sa kabilang panig ay nagbabago ayon sa a² (squared ng turns ratio)!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang transformer ay parang kambyo ng bisikleta: ipinagpapalit nito ang mataas na boltahe sa mataas na kuryente, kaya pantay pa rin ang lakas sa magkabilang panig!',
        realLifeMetaphor: {
          title: 'Ang 21-Speed Mountain Bike',
          story:
            'Kapag paakyat ka sa matarik na bundok gamit ang bisikleta, inilalagay mo sa mababang kambyo (low gear). Napakabilis ng padyak ng mga paa mo (mataas na bilis = mataas na kuryente), pero magaan lang ang ikot ng pedal (mababang pwersa = mababang boltahe). Kapag patag na daan, ililipat mo sa mataas na kambyo: mabagal ang padyak pero mabigat. Ang lakas ng binti mo ay pareho pa rin sa dalawang sitwasyon! Ganito mismo ang ginagawa ng transformer nang walang umiikot na piyesa: ipinagpapalit ang boltahe sa kuryente. Kapag bumaba ang boltahe ng 10 beses, tataas ang kuryente ng 10 beses. Ang Power na PUMASOK ay laging pantay sa Power na LUMABAS!',
          iconEmoji: '🚲',
          visualTip:
            'Tingnan ang visual ng transformer sa itaas: 10 ikot ng kawad sa kaliwa, 1 ikot sa kanan. Pansinin kung paano bumaba ng 10 beses ang boltahe habang tumalon ng 10 beses ang kuryente!',
        },
        whyItMatters:
          'Kung walang transformer, makakarating lang ang kuryente ng 1 o 2 kilometro mula sa planta ng kuryente bago matunaw ang mga kable dahil sa sobrang lakas ng kuryente.',
        keyTakeaways: [
          '🔄 Turns Ratio a = Ikot sa Primary ÷ Ikot sa Secondary = V1 ÷ V2',
          '⚡ Walang nasasayang: V1 × I1 = V2 × I2 (walang libreng enerhiya!)',
          '⬇️ Step-down: Bumababa ang Boltahe, Tumataas ang Kuryente',
          '📈 Ang Impedance ay pinarami sa ratio na SQUARED: Z_primary = a² × Z_secondary',
          '🧠 Tandaan: Ang panig na may mataas na boltahe ay LAGING may mas malaking resistance!',
        ],
        babyStepExample: {
          title: 'Paglilipat ng Resistance sa 2 Madaling Hakbang',
          friendlyNumbers: 'Ang transformer ay may turns ratio a = 10 (mula 2400 V pababa sa 240 V), na may 4-Ohm speaker sa secondary.',
          steps: [
            {
              stepNumber: 1,
              action: 'I-square ang turns ratio',
              math: '10² = 100',
              plainWhy: 'Dahil bumaba ang boltahe ng 10 AT tumaas ang kuryente ng 10, ang resistance ay pinarami ng 10 × 10 = 100.',
            },
            {
              stepNumber: 2,
              action: 'I-multiply sa resistance ng speaker',
              math: '100 × 4 Ω = 400 Ω',
              plainWhy: 'Para sa mataas na boltahe sa primary, ang 4-ohm speaker ay mukhang 400-ohm na karga!',
            },
          ],
          bottomLine:
            'Kailanman ililipat mo ang resistance sa panig ng mataas na boltahe, i-multiply lang sa a²: 4 Ω × 100 = 400 Ω.',
        },
        calculatorQuickButtons:
          'Casio keystroke: I-type ang [ ( V1 ÷ V2 )² × R_load ] at pindutin ang [=].',
        dontPanicTip:
          'Huwag malito kung magmu-multiply o magdi-divide sa a²: itanong lang sa sarili "Ito ba ang mataas na boltahe?" Ang mataas na boltahe ay LAGING may mas malaking resistance!',
      },
    },
    ceb: {
      conceptName: 'Pag-usab sa Impedance sa Transformer',
      plainExplanation:
        'Ang transformer mag-usab sa sukod sa boltahe ug kuryente. Kung moubos ang boltahe og 10 ka pilo, ang kuryente mosaka og 10 ka pilo aron magpabiling parehas ang Gahom (Power). Tungod kay ang Resistance mao ang V bahinon sa I, ang impedance sa pikas kilid mausab sumala sa a² (squared sa turns ratio)!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang transformer morag kambyo sa biseklita: ibaylo niini ang taas nga boltahe sa taas nga kuryente, aron magpabiling patas ang kusog sa duha ka kilid!',
        realLifeMetaphor: {
          title: 'Ang 21-Speed Mountain Bike',
          story:
            'Kung magbisikleta ka tungas sa bakilid, ibutang nimo sa ubos nga kambyo (low gear). Paspas kaayo ang imong tuyok sa tiil (taas nga tulin = taas nga kuryente), apan gaan kaayo ang pedal (gamay nga paningkamot = gamayng boltahe). Sa patag nga karsada, ibutang nimo sa taas nga kambyo: hinay ang tuyok pero bug-at. Ang kusog sa imong kaunoran parehas ra sa duha ka paagi! Mao gyud kini ang gihimo sa transformer nga walay nagtuyok nga piyesa: ibaylo ang boltahe sa kuryente. Kung ang boltahe moubos og 10 ka pilo, ang kuryente mosaka og 10 ka pilo. Ang Gahom nga MISULOD kanunayng patas sa Gahom nga MIGAWAS!',
          iconEmoji: '🚲',
          visualTip:
            'Tan-awa ang visual sa transformer sa ibabaw: 10 ka liyok sa alambre sa wala, 1 ka liyok sa tuo. Tan-awa giunsa pag-ubos sa boltahe samtang misulbong ang kuryente!',
        },
        whyItMatters:
          'Kung walay mga transformer, ang kuryente makabiyahe lamang og 1 o 2 ka kilometro gikan sa planta sa dili pa matunaw ang mga alambre tungod sa hilabihang kainit.',
        keyTakeaways: [
          '🔄 Turns Ratio a = Liyok sa Primary ÷ Liyok sa Secondary = V1 ÷ V2',
          '⚡ Way usik: V1 × I1 = V2 × I2 (walay libreng enerhiya!)',
          '⬇️ Step-down: Moubos ang Boltahe, Mosaka ang Kuryente',
          '📈 Ang Impedance modako sumala sa ratio nga SQUARED: Z_primary = a² × Z_secondary',
          '🧠 Timan-i: Ang kilid nga may taas nga boltahe KANUNAY adunay mas dako nga resistance!',
        ],
        babyStepExample: {
          title: 'Pagbalhin sa Resistance sa 2 ka Sayon nga Lakang',
          friendlyNumbers: 'Ang transformer adunay turns ratio a = 10 (gikan sa 2400 V paubos sa 240 V), nga may 4-Ohm speaker sa secondary.',
          steps: [
            {
              stepNumber: 1,
              action: 'I-square ang turns ratio',
              math: '10² = 100',
              plainWhy: 'Tungod kay ang boltahe miubos og 10 UG ang kuryente misaka og 10, ang resistance modako og 10 × 10 = 100.',
            },
            {
              stepNumber: 2,
              action: 'I-multiply sa resistance sa speaker',
              math: '100 × 4 Ω = 400 Ω',
              plainWhy: 'Alang sa taas nga boltahe sa primary, ang 4-ohm speaker morag 400-ohm nga karga!',
            },
          ],
          bottomLine:
            'Kanus-a gani nimo ibalhin ang resistance ngadto sa taas nga boltahe, i-multiply lang sa a²: 4 Ω × 100 = 400 Ω.',
        },
        calculatorQuickButtons:
          'Casio keystroke: I-type ang [ ( V1 ÷ V2 )² × R_load ] ug pindota ang [=].',
        dontPanicTip:
          'Ayaw kalibog kon mag-multiply o mag-divide sa a²: pangutan-a lang ang kaugalingon "Mao ba kini ang kilid sa taas nga boltahe?" Ang taas nga boltahe KANUNAY mas dako og resistance!',
      },
    },
  },

  // 5. TRANSMISSION LINES & FERRANTI EFFECT
  'lesson-ee-transmission': {
    tl: {
      conceptName: 'Pagtaas ng Boltahe sa Mahabang Linya ng Kuryente (Ferranti Effect)',
      plainExplanation:
        'Sa mahahabang transmission lines, kapag walang gumagamit ng kuryente (halimbawa sa hatinggabi), ang natural na capacitance ng mga nakabiting kawad ay nagpapadaloy ng charging current. Ang kuryenteng ito ay nagiging sanhi upang ang boltahe sa dulo ng linya (VR) ay maging MAS MATAAS kaysa sa boltahe ng planta (VS)! Ito ang Ferranti Effect.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Kapag ang mahabang linya ng kuryente ay walang nakasaksak na pabrika (tulad sa hatinggabi), ang boltahe sa dulong substation ay biglang lumalakas kaysa sa planta — ito ang Ferranti effect!',
        realLifeMetaphor: {
          title: 'Ang Nakasiradong Mahabang Hose sa Hardin',
          story:
            'Isipin mong may 100-metrong gomang hose ka na may saradong nozzle sa dulo. Kapag binuksan mo nang todo ang gripo sa bahay, mabilis na susugod ang tubig para banatin ang goma ng hose. Ang naipong pwersa ay nagdudulot ng biglaang pagtaas ng presyon sa saradong dulo na mas mataas pa kaysa sa mismong gripo ng bahay! Sa mahahabang linya ng kuryente sa Pilipinas, ang espasyo sa pagitan ng mga kawad at lupa ay parang elastikong goma ng hose: sa gabi kapag sarado ang mga pabrika, ang boltahe sa dulong substation ay mas mataas kaysa sa planta ng kuryente!',
          iconEmoji: '🌊',
          visualTip:
            'Sa transmission line simulator sa itaas, hilahin ang Load Current pababa sa zero: panoorin kung paano umakyat ang linya ng boltahe papunta sa receiving end!',
        },
        whyItMatters:
          'Kung hindi magbubukas ang mga inhinyero ng NGCP ng malalaking inductive coils (shunt reactors) tuwing hatinggabi, sasabog at masusunog ang mga transformer sa mga substation dahil sa sobrang boltahe.',
        keyTakeaways: [
          '🌙 Nangyayari LAMANG kapag WALANG KARGA (no-load / bukas ang dulo) o mahina ang karga',
          '📈 Ang Receiving Voltage (VR) ay hindi inaasahang MAS MATAAS kaysa sa Sending Voltage (VS)',
          '🔋 Dulot ng capacitance ng kawad na nagpapadaloy ng charging current sa inductance ng kawad',
          '🧯 Ang Solusyon: Buksan ang Shunt Reactors (malalaking inductor) para sipsipin ang sobrang boltahe',
        ],
        babyStepExample: {
          title: 'Paghahanap ng Pagtaas ng Boltahe sa 2 Madaling Hakbang',
          friendlyNumbers: 'Isang 200 kV na generator ay nakakabit sa bukas na linya na may line factor A = 0.90.',
          steps: [
            {
              stepNumber: 1,
              action: 'Kilalanin ang patakaran kapag walang karga',
              math: 'Sending Voltage = A × Receiving Voltage',
              plainWhy: 'Dahil walang gumagamit ng kuryente sa dulo (Current = 0), simple lang ang formula: VS = A × VR.',
            },
            {
              stepNumber: 2,
              action: 'Mag-divide para mahanap ang boltahe sa dulo',
              math: 'VR = 200 kV ÷ 0.90 = 222.2 kV',
              plainWhy: 'Ang dulo ay may 22.2 kV na MAS MATAAS na boltahe kaysa sa generator! Iyan ang Ferranti effect.',
            },
          ],
          bottomLine:
            'Kapag walang karga, ang Receiving Voltage VR = VS ÷ A. Laging mas mataas ito kaysa sa boltahe ng planta.',
        },
        calculatorQuickButtons:
          'Casio no-load calculation: I-type ang [ VS ÷ A ] at pindutin ang [=].',
        dontPanicTip:
          'Kapag sinabi sa tanong sa board exam na "transmission line is open-circuited at receiving end", huwag mag-panic: zero ang receiving current IR kaya mawawala nang kusa ang nakakatakot na B term!',
      },
    },
    ceb: {
      conceptName: 'Pagsaka sa Boltahe sa Taas nga Linya sa Kuryente (Ferranti Effect)',
      plainExplanation:
        'Sa tag-as nga transmission lines, kon walay naggamit og kuryente (sama sa tungang gabii), ang natural nga capacitance sa nagbitay nga mga kable magpadagayday og charging current. Kini maoy hinungdan nga ang boltahe sa tumoy sa linya (VR) mahimong MAS TAAS kay sa boltahe sa planta (VS)! Mao kini ang Ferranti Effect.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Kung ang taas nga linya sa kuryente walay nakasaksak nga karga (sama sa tungang gabii), ang boltahe sa tumoy nga substation kalit nga mosaka labaw pa sa planta — kini ang Ferranti effect!',
        realLifeMetaphor: {
          title: 'Ang Gisirad-an nga Taas nga Hose sa Tugkaran',
          story:
            'Hunahunaa nga aduna kay 100-metros nga gomang hose nga gisirad-an ang nozzle sa tumoy. Kung kusgon nimo pag-ayo ang abli sa gripo sa balay, mosirit ang tubig aron mubanat ang goma sa hose. Ang napondo nga pwersa makamugna og kalit nga pagsaka sa presyon sa sarado nga tumoy nga mas taas pa kay sa presyon sa gripo sa balay! Sa tag-as nga linya sa kuryente, ang capacitance taliwala sa mga kable ug sa yuta morag elastiko nga hose: sa gabii kon manira ang mga pabrika, ang boltahe sa tumoy nga substation mas taas kay sa planta sa kuryente!',
          iconEmoji: '🌊',
          visualTip:
            'Sa transmission line simulator sa ibabaw, ibira ang Load Current paubos ngadto sa zero: tan-awa giunsa pagsaka sa linya sa boltahe paingon sa receiving end!',
        },
        whyItMatters:
          'Kung ang mga enhinyero sa NGCP dili magpasiga og dagkong inductive coils (shunt reactors) panahon sa tungang gabii, ang mga transformer sa mga substation masunog gyud tungod sa sobrang boltahe.',
        keyTakeaways: [
          '🌙 Mahitabo LAMANG panahon sa WALAY KARGA (open-circuit) o gaan kaayo ang karga sa tag-as nga linya',
          '📈 Ang Receiving Voltage (VR) dili damha nga MAS TAAS kay sa Sending Voltage (VS)',
          '🔋 Gidala sa capacitance sa kable nga nagpadagayday og charging current agi sa inductance sa kable',
          '🧯 Ang Solusyon: Pasigaa ang Shunt Reactors (dagkong inductor) aron masuyop ang sobrang boltahe',
        ],
        babyStepExample: {
          title: 'Pagpangita sa Pagsaka sa Boltahe sa 2 ka Sayon nga Lakang',
          friendlyNumbers: 'Usa ka 200 kV nga generator konektado sa bukas nga linya nga may line factor A = 0.90.',
          steps: [
            {
              stepNumber: 1,
              action: 'Ilha ang lagda panahon nga walay karga',
              math: 'Sending Voltage = A × Receiving Voltage',
              plainWhy: 'Tungod kay walay naggamit og kuryente sa tumoy (Current = 0), yano ra ang pormula: VS = A × VR.',
            },
            {
              stepNumber: 2,
              action: 'Bahina aron makit-an ang boltahe sa tumoy',
              math: 'VR = 200 kV ÷ 0.90 = 222.2 kV',
              plainWhy: 'Ang tumoy adunay 22.2 kV nga MAS TAAS nga boltahe kay sa generator! Kana ang Ferranti effect.',
            },
          ],
          bottomLine:
            'Kon walay karga, ang Receiving Voltage VR = VS ÷ A. Kanunay kining mas taas kay sa sending voltage.',
        },
        calculatorQuickButtons:
          'Casio no-load calculation: I-type ang [ VS ÷ A ] ug pindota ang [=].',
        dontPanicTip:
          'Kon moingon ang pangutana sa board exam nga "transmission line is open-circuited at receiving end", ayaw kalisang: zero ang receiving current IR mao nga mawala ra ang B term!',
      },
    },
  },

  // 6. BASIC ALGEBRA & RATE PROBLEMS
  'lesson-math-algebra-fundamentals': {
    tl: {
      conceptName: 'Basic Algebra: Quadratic Roots at Rate Problems',
      plainExplanation:
        'Ang Algebra ang pundasyon ng buong licensure exam. Sa mga problemang may dalawang tao o makina na nagtutulungan, huwag pagsamahin ang oras nila (hindi 2 + 3 = 5)! Sa halip, i-multiply ang kanilang oras at i-divide sa kanilang sum gamit ang Product over Sum shortcut.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Algebra ay paghahanap lang ng nawawalang piraso sa puzzle: kapag dalawang tao o makina ang nagtutulungan, i-multiply ang kanilang oras at i-divide sa kanilang kabuuan!',
        realLifeMetaphor: {
          title: 'Dalawang Magkaibigang Nagpipintura ng Kwarto',
          story:
            'Kung kaya ni Alice na pinturahan ang buong kwarto sa loob ng 2 oras nang mag-isa, at si Bob naman ay 3 oras nang mag-isa, gaano katagal kung magtutulungan sila? HUWAG mong i-a-add ang 2 + 3 = 5 (kapag nagtulungan sila, lalong bibilis, hindi babagal!). Si Alice ay nakakapintura ng 1/2 ng kwarto bawat oras. Si Bob ay nakakapintura ng 1/3 bawat oras. Kapag nagsama sila, nakakapintura sila ng (1/2 + 1/3) = 5/6 ng kwarto bawat oras. Kaya matatapos ang buong kwarto sa loob ng 6/5 = 1.2 oras (1 oras at 12 minuto)!',
          iconEmoji: '🎨',
          visualTip:
            'Sa algebra simulator sa itaas, lumipat sa tab na "Word Problems (Work & Rates)" upang makita ang dalawang tubo na sabay nagbubuhos ng tubig sa tangke!',
        },
        whyItMatters:
          'Dalawang backup generator man na nagcha-charge ng baterya, dalawang bomba na nagpapatuyo ng vault, o dalawang parallel resistors, ang rate formula na ito isang kapaki-pakinabang na pattern sa engineering.',
        keyTakeaways: [
          '🤝 Pagtutulungan = I-ADD ANG KANILANG BILIS/RATES (1/T_total = 1/T1 + 1/T2)',
          '⏱️ Ang kabuuang oras ay LAGING MAS MABILIS kaysa sa pinakamabilis na tao nang mag-isa (mas mababa sa 2 oras!)',
          '⚡ Ang 5-Segundong Shortcut: Oras = (T1 × T2) ÷ (T1 + T2) [Product over Sum]',
          '🏀 Para sa quadratics: Ang mga ugat (roots) ay ang mga sandali kung kailan lumalapat ang ibinatong bola sa lupa',
        ],
        babyStepExample: {
          title: 'Ang 5-Segundong Product-Over-Sum na Diskarte',
          friendlyNumbers: 'Ang Generator A ay tumatagal ng 3 oras mag-isa. Ang Generator B ay 6 na oras mag-isa.',
          steps: [
            {
              stepNumber: 1,
              action: 'I-multiply ang dalawang oras (Product)',
              math: '3 × 6 = 18',
              plainWhy: 'I-multiply ang dalawang indibidwal na oras.',
            },
            {
              stepNumber: 2,
              action: 'I-add ang dalawang oras (Sum)',
              math: '3 + 6 = 9',
              plainWhy: 'Pagsamahin ang dalawang indibidwal na oras.',
            },
            {
              stepNumber: 3,
              action: 'I-divide ang Product sa Sum',
              math: '18 ÷ 9 = 2 oras',
              plainWhy: 'Kapag magkasama sila, eksaktong 2 oras lang ang aabutin!',
            },
          ],
          bottomLine:
            '(3 × 6) ÷ (3 + 6) = eksaktong 2 oras. Maso-solve mo ito sa isip mo bago pa matapos basahin ng iba ang tanong!',
        },
        calculatorQuickButtons:
          'Casio Equation Solver: Pindutin ang [MODE] [5] [3] (o [MENU] [A] [2] [2]). Ipasok ang a, b, c, pindutin ang [=], at lalabas agad ang quadratic roots nang walang hirap!',
        dontPanicTip:
          'Common sense check: Kung si Alice ay 2 oras mag-isa, ang sagot kapag may katulong ay DAPAT MAS MABABA sa 2 oras. Kung mas malaki ang lumabas sa calculator mo, nakalimutan mong baligtarin ang fraction!',
      },
    },
    ceb: {
      conceptName: 'Basic Algebra: Quadratic Roots ug Rate Problems',
      plainExplanation:
        'Ang Algebra mao ang pundasyon sa tibuok licensure exam. Sa mga problema nga may duha ka tawo o makina nga nagtinabangay, ayaw i-add ang ilang oras (dili 2 + 3 = 5)! Hinuon, i-multiply ang ilang oras ug i-bahin sa ilang suma gamit ang Product over Sum shortcut.',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Algebra pagpangita ra sa nawala nga piraso sa puzzle: kon duha ka tawo o makina ang magtinabangay, i-multiply ang ilang oras ug bahina sa ilang suma!',
        realLifeMetaphor: {
          title: 'Duha ka Managhigala nga Nagpintal sa Kwarto',
          story:
            'Kung si Alice makahuman og pintal sa kwarto sulod sa 2 ka oras nga mag-inusara, ug si Bob 3 ka oras nga mag-inusara, unsa kadugay kung magtinabangay sila? AYAW gyud i-add ang 2 + 3 = 5 (kon magtinabangay, mas mopaspas, dili mohinay!). Si Alice makapintal og 1/2 sa kwarto matag oras. Si Bob makapintal og 1/3 matag oras. Kon magdungan sila, makapintal sila og (1/2 + 1/3) = 5/6 sa kwarto matag oras. Busa mahuman ang tibuok kwarto sulod sa 6/5 = 1.2 ka oras (1 ka oras ug 12 minutos)!',
          iconEmoji: '🎨',
          visualTip:
            'Sa algebra simulator sa ibabaw, balhin sa tab nga "Word Problems (Work & Rates)" aron makita ang duha ka tubo nga dungan nga nagbubo og tubig sa tangke!',
        },
        whyItMatters:
          'Duha man ka backup generator nga nag-charge og baterya, duha ka bomba nga nagpahubas og tubig, o duha ka parallel resistors, kini nga rate formula mao ang mapuslanong pattern sa math sa engineering.',
        keyTakeaways: [
          '🤝 Pagtinabangay = I-ADD ANG ILANG TULIN/RATES (1/T_total = 1/T1 + 1/T2)',
          '⏱️ Ang dungan nga oras KANUNAYNG MAS DALI kay sa labing paspas nga tawo nga nag-inusara (ubos sa 2 ka oras!)',
          '⚡ Ang 5-Segundos nga Shortcut: Oras = (T1 × T2) ÷ (T1 + T2) [Product over Sum]',
          '🏀 Alang sa quadratics: Ang mga roots mao ra ang mga gutlo kon kanus-a motugpa ang gilabay nga bola sa yuta',
        ],
        babyStepExample: {
          title: 'Ang 5-Segundos nga Product-Over-Sum nga Diskarte',
          friendlyNumbers: 'Ang Generator A mokabat og 3 ka oras mag-inusara. Ang Generator B 6 ka oras mag-inusara.',
          steps: [
            {
              stepNumber: 1,
              action: 'I-multiply ang duha ka oras (Product)',
              math: '3 × 6 = 18',
              plainWhy: 'I-multiply ang mga oras sa tagsa-tagsa.',
            },
            {
              stepNumber: 2,
              action: 'I-add ang duha ka oras (Sum)',
              math: '3 + 6 = 9',
              plainWhy: 'Isumpay ang duha ka oras.',
            },
            {
              stepNumber: 3,
              action: 'I-bahin ang Product sa Sum',
              math: '18 ÷ 9 = 2 ka oras',
              plainWhy: 'Kon magdungan sila, eksakto gyung 2 ka oras ang abuton!',
            },
          ],
          bottomLine:
            '(3 × 6) ÷ (3 + 6) = 2 ka oras. Masulbad nimo kini sa imong hunahuna una pa mahuman og basa ang uban sa pangutana!',
        },
        calculatorQuickButtons:
          'Casio Equation Solver: Pindota ang [MODE] [5] [3] (o [MENU] [A] [2] [2]). Isulod ang a, b, c, pindota ang [=], ug mogawas dayon ang quadratic roots nga walay hasol!',
        dontPanicTip:
          'Panghuna-huna daan: Kon si Alice 2 ka oras mag-inusara, ang tubag kon magkuyog KINAHANGLANG UBOS sa 2 ka oras. Kon mas dako ang migawas sa imong kalkulator, nalimot ka og balit-ad sa fraction!',
      },
    },
  },

  // 7. CALCULUS MAXIMA & EFFICIENCY
  'lesson-math-calculus': {
    tl: {
      conceptName: 'Calculus Maxima, Minima at Bilis ng Pagbabago',
      plainExplanation:
        'Sa electrical engineering, palagi nating hinahanap ang pinakamagandang kondisyon: pinakamataas na efficiency ng transformer, pinakamababang kawalan sa linya, o pinakamalakas na kuryente. Sa Calculus, ang derivative ay slope lamang. Sa mismong tuktok ng bundok, patag ang lupa kaya ang slope = 0!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Calculus maxima ay parang pag-akyat sa tuktok ng bundok: sa mismong tuktok, ang lupang inaapakan mo ay pantay at patag (slope = 0)!',
        realLifeMetaphor: {
          title: 'Ang Tuktok ng Mount Pulag',
          story:
            'Kapag paakyat ka sa trail ng bundok, paahon ang lakad mo (positibong slope). Kapag pababa ka sa kabilang panig, palusong ang lakad mo (negatibong slope). Pero sa mismong tuktok, kung saan ka huminto para mag-selfie, ang lupang tinatapakan ng sapatos mo ay patag at pantay sa isang saglit! Sa calculus, ang salitang "derivative" ay nangangahulugan lamang ng slope o pagkiling. Kaya para mahanap ang pinakamataas na kahusayan (maximum efficiency), hahanapin mo lang kung saan ang slope ay ZERO!',
          iconEmoji: '🏔️',
          visualTip:
            'Sa graph sa itaas, hilahin ang slider papunta sa tuktok: pansinin na ang pulang linyang tangent ay nagiging tuwid at patag na may slope = 0.00!',
        },
        whyItMatters:
          'Ang pagpapatakbo ng mga transformer at motor sa kanilang peak efficiency point ay nakakatipid ng milyun-milyong piso sa bayarin sa kuryente bawat taon.',
        keyTakeaways: [
          '📈 Derivative = Slope o Hilig (umaakyat ba o bumababa ang linya?)',
          '⛰️ Ang Maximum o Minimum ay nangyayari kung saan ang Slope = 0 (patag na patag!)',
          '⚡ Ang Gintong Patakaran sa Transformer: Nangyayari ang maximum efficiency kapag Constant Core Loss = Variable Copper Loss (P_core = P_cu)',
          '🎯 Peak fraction shortcut: k = √(P_core ÷ P_cu)',
        ],
        babyStepExample: {
          title: 'Paghahanap ng Maximum Efficiency sa 3 Simpleng Hakbang',
          friendlyNumbers: 'Isang 100 kVA transformer ay may 500 W core loss at 2000 W copper loss sa full load.',
          steps: [
            {
              stepNumber: 1,
              action: 'I-divide ang dalawang kawalan (losses)',
              math: '500 W ÷ 2000 W = 0.25',
              plainWhy: 'I-divide ang constant core loss sa variable copper loss.',
            },
            {
              stepNumber: 2,
              action: 'Kunin ang square root',
              math: '√(0.25) = 0.50 (50% karga)',
              plainWhy: 'Pinapatunayan ng calculus na ang peak load fraction ay laging square root ng ratio.',
            },
            {
              stepNumber: 3,
              action: 'I-multiply sa kabuuang rating',
              math: '0.50 × 100 kVA = 50 kVA',
              plainWhy: 'Ang pinakamataas na efficiency ay nangyayari sa eksaktong 50 kVA (kalahating karga)!',
            },
          ],
          bottomLine:
            'Hindi mo na kailangan mag-derive sa scratch paper sa board exam: kalkulahin lang ang √(500 ÷ 2000) × 100 = 50 kVA!',
        },
        calculatorQuickButtons:
          'Casio Peak Shortcut: I-type ang [ √( 500 ÷ 2000 ) × 100 ] at pindutin ang [=]. Lalabas ang 50 kVA sa loob ng 3 segundo!',
        dontPanicTip:
          'Huwag mag-alala sa mahabang quotient rule ng calculus! Halos lahat ng problema sa optimization sa board exam ay nasosolusyunan agad gamit ang shortcut na k = √(P_core / P_cu).',
      },
    },
    ceb: {
      conceptName: 'Calculus Maxima, Minima ug Katulin sa Pagbag-o',
      plainExplanation:
        'Sa electrical engineering, kanunay natong gipangita ang labing maayo nga kahimtang: kinatas-ang efficiency sa transformer, labing ubos nga usik sa kuryente, o kinadak-ang gahom. Sa Calculus, ang derivative mao ra ang slope. Sa kinatumyan sa bukid, patag ang yuta busa ang slope = 0!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang Calculus maxima morag pagsaka sa tumoy sa bukid: sa mismong tumoy, ang yuta nga imong gitumban patag kaayo (slope = 0)!',
        realLifeMetaphor: {
          title: 'Ang Tumoy sa Bukid sa Mount Pulag',
          story:
            'Kung mosaka ka sa agianan sa bukid, tungas ang imong lakaw (positibo nga slope). Kung molugsong ka sa pikas kilid, dulhugon ang imong lakaw (negatibo nga slope). Apan sa mismong tumoy, diin mohunong ka aron mag-picture, ang yuta sa imong tiilan patag kaayo sa makadiyot! Sa calculus, ang pulong nga "derivative" nagpasabot lamang og slope o bakilid. Busa aron makit-an ang kinatas-ang efficiency, pangitaa lang kon asa ang slope katumbas sa ZERO!',
          iconEmoji: '🏔️',
          visualTip:
            'Sa graph sa ibabaw, ibira ang slider ngadto sa tumoy: tan-awa nga ang pula nga tangent line nahimong patag nga may slope = 0.00!',
        },
        whyItMatters:
          'Ang pagpadagan sa mga transformer ug motor sa ilang peak efficiency point makadaginot og minilyon ka pesos sa bayranan sa kuryente matag tuig.',
        keyTakeaways: [
          '📈 Derivative = Slope o Bakilid (nagsaka ba o naglugsong ang linya?)',
          '⛰️ Ang Maximum o Minimum mahitabo diin ang Slope = 0 (patag kaayo!)',
          '⚡ Ang Bulawanong Lagda sa Transformer: Mahitabo ang maximum efficiency kon Core Loss = Copper Loss (P_core = P_cu)',
          '🎯 Peak fraction shortcut: k = √(P_core ÷ P_cu)',
        ],
        babyStepExample: {
          title: 'Pagpangita sa Maximum Efficiency sa 3 ka Sayon nga Lakang',
          friendlyNumbers: 'Usa ka 100 kVA transformer adunay 500 W core loss ug 2000 W copper loss sa full load.',
          steps: [
            {
              stepNumber: 1,
              action: 'I-bahin ang duha ka losses',
              math: '500 W ÷ 2000 W = 0.25',
              plainWhy: 'I-bahin ang constant core loss sa variable copper loss.',
            },
            {
              stepNumber: 2,
              action: 'Kuhaa ang square root',
              math: '√(0.25) = 0.50 (50% nga karga)',
              plainWhy: 'Gipamatud-an sa calculus nga ang peak load fraction kanunayng square root sa ratio.',
            },
            {
              stepNumber: 3,
              action: 'I-multiply sa tibuok rating',
              math: '0.50 × 100 kVA = 50 kVA',
              plainWhy: 'Ang kinatas-ang efficiency mahitabo sa eksaktong 50 kVA (katunga sa karga)!',
            },
          ],
          bottomLine:
            'Dili na kinahanglan mag-derive sa papel sa adlaw sa board exam: kwentaha lang ang √(500 ÷ 2000) × 100 = 50 kVA!',
        },
        calculatorQuickButtons:
          'Casio Peak Shortcut: I-type ang [ √( 500 ÷ 2000 ) × 100 ] ug pindota ang [=]. Mohatag og 50 kVA sulod sa 3 segundos!',
        dontPanicTip:
          'Ayaw kabalaka sa lisod nga quotient rule sa calculus! Hapit tanang problema sa optimization sa board exam masulbad dayon gamit ang shortcut nga k = √(P_core / P_cu).',
      },
    },
  },

  // 8. ESAS MECHANICS & FREE-BODY DIAGRAMS
  'lesson-esas-mechanics': {
    tl: {
      conceptName: 'Pagsusuri ng Magkakasabay na Puwersa at Resultant Vector',
      plainExplanation:
        'Sa electrical engineering, mahalaga ang structural mechanics sa pagdidisenyo ng mga poste ng kuryente at transmission towers laban sa bagyo. Kapag pantay ang hila pakanan sa hila pakaliwa (ΣFx = 0), at pantay ang hila pataas sa hila pababa (ΣFy = 0), hindi babagsak ang poste!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang mga puwersa ay parang larong hilahang-lubid: kapag ang hila sa kaliwa ay pantay sa hila sa kanan, at ang hila pataas ay pantay sa pababa, nananatiling tuwid at matatag ang poste ng kuryente!',
        realLifeMetaphor: {
          title: 'Ang Hilahang-Lubid at ang Kable (Guy Wire) ng Poste',
          story:
            'Isipin mo ang isang poste ng kuryente na nakatayo sa kanto ng kalsada. Malakas itong hinihila ng mabibigat na kawad ng kuryente papunta sa kalsada. Bakit hindi nababali at bumabagsak ang poste? Dahil may nakatagilid na kable ng bakal (guy wire) na nakabaon sa semento na humihila sa eksaktong kabilang direksyon! Kung ang Team North ay humihila ng 30 kN at ang Team East ay humihila ng 40 kN, ang kanilang pinagsamang hila ay 50 kN (ang sikat na 3-4-5 triangle!). Ang kable ay kailangan lang humila ng 50 kN sa kasalungat na direksyon upang hindi gumalaw ang poste kahit isang pulgada!',
          iconEmoji: '🏗️',
          visualTip:
            'Sa Free-Body Diagram sa itaas: pansinin na kapag nagkatugma at nabalanse ang mga puwersa, nagiging berde ang bilog ng net force at hindi tutumba ang poste!',
        },
        whyItMatters:
          'Bawat poste ng kuryente at transmission tower sa daanan ng bagyo sa Pilipinas ay sinusukat gamit ang balanseng ito upang hindi ito bumagsak sa mga kabahayan kapag may malakas na hangin.',
        keyTakeaways: [
          '📐 Hatiin ang anumang pahilig na hila sa Pahalang (cos) at Patayo (sin)',
          '⚖️ Batas ng Balanse: Ang hila pakaliwa ay DAPAT maging pantay sa hila pakanan (ΣFx = 0)',
          '⬆️ Batas ng Balanse: Ang hila pataas ay DAPAT maging pantay sa hila pababa (ΣFy = 0)',
          '🔺 Para sa dalawang perpendicular na hila (90°): Kabuuang Hila = √(Hila₁² + Hila₂²)',
        ],
        babyStepExample: {
          title: 'Ang Sikat na 3-4-5 Triangle na Hila',
          friendlyNumbers: 'Puwersa 1 = 30 kN pahila sa Silangan (East); Puwersa 2 = 40 kN pahila sa Hilaga (North).',
          steps: [
            {
              stepNumber: 1,
              action: 'I-square ang parehong hila',
              math: '30² = 900,  40² = 1600',
              plainWhy: 'Pythagorean rule para sa mga perpendicular na puwersa.',
            },
            {
              stepNumber: 2,
              action: 'Pagsamahin ang dalawa',
              math: '900 + 1600 = 2500',
              plainWhy: 'Suma ng squared forces.',
            },
            {
              stepNumber: 3,
              action: 'Kunin ang square root',
              math: '√2500 = 50 kN',
              plainWhy: 'Ang pinagsamang pahilis na hila ay eksaktong 50 kN!',
            },
          ],
          bottomLine:
            'Anumang kumbinasyon ng 30 at 40 sa 90 degrees ay laging nagreresulta sa 50. Ang guy wire ay dapat humila ng 50 kN para mabalanse ito!',
        },
        calculatorQuickButtons:
          'Casio Pol Button Trick: Pindutin ang [Pol(] [30] [,] [40] [)] [=]. Lalabas agad sa calculator ang r = 50 at θ = 53.13° nang walang kailangang mahabang algebra!',
        dontPanicTip:
          'Huwag kailanman mag-mano-manong square root para sa resultant forces! Ang [Pol] button sa iyong Casio ang nagkukwenta ng pinagsamang puwersa at anggulo sa loob lamang ng isang segundo.',
      },
    },
    ceb: {
      conceptName: 'Pagsusi sa Magkadungan nga Puwersa ug Resultant Vector',
      plainExplanation:
        'Sa electrical engineering, importante ang structural mechanics sa pagdesinyo sa mga poste sa kuryente ug transmission towers batok sa mga bagyo. Kung patas ang bira paingon sa tuo ug bira paingon sa wala (ΣFx = 0), ug patas ang bira pataas ug bira paubos (ΣFy = 0), dili matumba ang poste!',
      simplifiedGuide: {
        oneSentenceSummary:
          'Ang mga puwersa morag dula nga birahay og pisi: kon ang bira sa wala patas sa bira sa tuo, ug ang bira pataas patas sa paubos, magpabiling barog ug lig-on ang poste sa kuryente!',
        realLifeMetaphor: {
          title: 'Ang Birahay sa Pisi ug ang Kable (Guy Wire) sa Poste',
          story:
            'Hunahunaa ang usa ka poste sa kuryente nga nagbarog sa kanto sa dalan. Kusog kining gibira sa bug-at nga mga kable sa kuryente paingon sa dalan. Nganong dili man mabuak ug matumba ang poste? Tungod kay adunay bakilid nga kable nga puthaw (guy wire) nga gipundo sa semento nga nagbira sa eksaktong atbang nga direksyon! Kung ang Team North mobira og 30 kN ug ang Team East mobira og 40 kN, ang ilang dungan nga bira 50 kN (ang sikat nga 3-4-5 triangle!). Ang kable kinahanglan lang mobira og 50 kN sa atbang nga direksyon aron dili molihok ang poste bisan gamay!',
          iconEmoji: '🏗️',
          visualTip:
            'Sa Free-Body Diagram sa ibabaw: tan-awa nga sa dihang nagkatakdo ug nabalanse ang mga puwersa, nahimong berde ang lingin sa net force ug dili matumba ang poste!',
        },
        whyItMatters:
          'Ang matag poste sa kuryente ug transmission tower sa agianan sa bagyo sa Pilipinas gisukod gamit kining balanse sa puwersa aron dili kini matumpag sa kabalayan panahon sa bagyo.',
        keyTakeaways: [
          '📐 Bahina ang bisan unsang bakilid nga bira ngadto sa Pababag (cos) ug Patindog (sin)',
          '⚖️ Lagda sa Balanse: Ang bira pawala KINAHANGLANG patas sa bira patuo (ΣFx = 0)',
          '⬆️ Lagda sa Balanse: Ang bira pataas KINAHANGLANG patas sa bira paubos (ΣFy = 0)',
          '🔺 Alang sa duha ka perpendicular nga bira (90°): Tibuok Bira = √(Bira₁² + Bira₂²)',
        ],
        babyStepExample: {
          title: 'Ang Sikat nga 3-4-5 Triangle nga Bira',
          friendlyNumbers: 'Puwersa 1 = 30 kN nagbira sa Sidlakan (East); Puwersa 2 = 40 kN nagbira sa Amihanan (North).',
          steps: [
            {
              stepNumber: 1,
              action: 'I-square ang duha ka bira',
              math: '30² = 900,  40² = 1600',
              plainWhy: 'Pythagorean rule alang sa perpendicular nga mga puwersa.',
            },
            {
              stepNumber: 2,
              action: 'Isumpay silang duha',
              math: '900 + 1600 = 2500',
              plainWhy: 'Suma sa squared forces.',
            },
            {
              stepNumber: 3,
              action: 'Kuhaa ang square root',
              math: '√2500 = 50 kN',
              plainWhy: 'Ang pinahilis nga dungan nga bira eksaktong 50 kN!',
            },
          ],
          bottomLine:
            'Bisan unsang kombinasyon sa 30 ug 40 sa 90 degrees kanunayng mohatag og 50. Ang guy wire kinahanglang mobira og 50 kN aron mabalanse kini!',
        },
        calculatorQuickButtons:
          'Casio Pol Button Trick: Pindota ang [Pol(] [30] [,] [40] [)] [=]. Mogawas dayon sa kalkulator ang r = 50 ug θ = 53.13° nga walay kinahanglan nga taas nga algebra!',
        dontPanicTip:
          'Ayaw gyud pagmano-mano og square root alang sa resultant forces! Ang [Pol] button sa imong Casio maoy mokwenta sa dungan nga puwersa ug anggulo sulod lang sa usa ka segundo.',
      },
    },
  },
};

/**
 * Returns localized SimplifiedLessonGuide for a given lesson and language.
 * Falls back to English if translation is missing.
 */
export function getLessonSimplifiedGuide(
  lesson: LessonContent,
  lang: AppLanguage
): SimplifiedLessonGuide | undefined {
  if (lang === 'en') return lesson.simplifiedGuide;

  const translation = LESSON_TRANSLATIONS[lesson.id]?.[lang];
  if (translation?.simplifiedGuide) {
    return translation.simplifiedGuide;
  }

  return lesson.simplifiedGuide;
}

/**
 * Returns localized Concept Name
 */
export function getLessonConceptName(lesson: LessonContent, lang: AppLanguage): string {
  if (lang === 'en') return lesson.conceptName;
  const translation = LESSON_TRANSLATIONS[lesson.id]?.[lang];
  return translation?.conceptName || lesson.conceptName;
}

/**
 * Returns localized Plain Explanation
 */
export function getLessonPlainExplanation(lesson: LessonContent, lang: AppLanguage): string {
  if (lang === 'en') return lesson.plainExplanation;
  const translation = LESSON_TRANSLATIONS[lesson.id]?.[lang];
  return translation?.plainExplanation || lesson.plainExplanation;
}

/**
 * Helper to get a UI string with fallback
 */
export function t(key: string, lang: AppLanguage): string {
  return UI_STRINGS[lang]?.[key] || UI_STRINGS['en'][key] || key;
}
