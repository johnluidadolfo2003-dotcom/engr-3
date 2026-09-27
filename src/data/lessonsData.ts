import { LessonContent } from '../types';

export const LESSONS_DATA: LessonContent[] = [
  // ----------------------------------------------------
  // LEVEL 0: GROUND ZERO ELECTRICITY FUNDAMENTALS
  // ----------------------------------------------------
  {
    id: 'lesson-ee-absolute-basics-zero',
    topicGroupId: 'EE-01',
    subtopicTitle: 'Level 0: What is Electricity? Voltage, Current, Resistance & Circuits From Scratch',
    conceptName: 'Level 0: Electricity From Scratch (Push, Flow & Squeeze)',
    seeItType: 'basics_zero',
    visualCaption:
      'Ground Zero Electricity Lab: See real-time electron flow, adjust the push force (Voltage V), wire squeeze (Resistance R), open/close knife switches, and see why bulbs light up.',
    plainExplanation:
      'Electricity is simply the physical movement of microscopic electric charges (electrons) through a conductive copper wire loop. Think of Voltage (V in Volts) as the push force from a battery, Resistance (R in Ohms) as the friction or narrow squeeze in the wire, and Current (I in Amperes) as the actual flow rate of charges passing through per second. Ohm’s Law is the most fundamental relationship in all of electrical engineering: Current = Push ÷ Squeeze (I = V / R).',
    explainMore:
      'Without a closed loop, electricity cannot flow (Open Circuit: Current = 0). When a direct copper wire connects (+) to (-) without a load resistor, resistance is near zero, causing dangerous extreme current surges (Short Circuit). In series circuits, current has only one path and voltages divide. In parallel circuits, current splits into separate branches and every device receives full voltage.',
    formulaLatex: 'I = \\frac{V}{R}, \\quad V = I \\cdot R, \\quad R = \\frac{V}{I}, \\quad P = V \\cdot I',
    symbols: [
      {
        symbol: 'V',
        name: 'Voltage (Electrical Pressure / Push)',
        unit: 'Volts (V)',
        description: 'The electromotive force that pushes electric charges forward',
      },
      {
        symbol: 'I',
        name: 'Current (Electron Flow Rate)',
        unit: 'Amperes (A)',
        description: 'The quantity of electrons passing a point each second (1 A = 1 Coulomb/sec)',
      },
      {
        symbol: 'R',
        name: 'Resistance (Friction / Obstacle)',
        unit: 'Ohms (Ω)',
        description: 'The opposition that restricts and slows down electron flow',
      },
      {
        symbol: 'P',
        name: 'Power (Work / Heat / Light Output)',
        unit: 'Watts (W)',
        description: 'The rate of energy consumed or dissipated (P = V × I)',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Voltage is the push from the battery, Resistance is the bottleneck squeezing the wire, and Current is the actual stream of electrons flowing through!',
      realLifeMetaphor: {
        title: 'The Water Tank, Pipe & Valve',
        story:
          'Imagine water flowing from a rooftop tank down a garden hose. The height of the water tank provides water pressure (Voltage). A narrow valve or kink in the hose creates restriction (Resistance). The amount of water pouring out into your bucket each second is the flow rate (Current). If you raise the tank higher (more Volts), more water shoots out. If you pinch the hose tighter (more Ohms), the water slows down.',
        iconEmoji: '🚰',
        visualTip:
          'In the simulator above, drag the Battery Voltage slider to increase push, and drag Resistance to squeeze the pipe!',
      },
      whyItMatters:
        'Every single smartphone, appliance, and electric grid operates on this simple push-and-squeeze balance.',
      keyTakeaways: [
        'Voltage (V) is the PUSH (electrical pressure from the battery)',
        'Resistance (R) is the SQUEEZE (the obstacle fighting the current)',
        'Current (I) is the FLOW (I = V ÷ R, measured in Amperes)',
        'Closed Circuit = Complete loop (current flows, bulb lights up)',
        'Open Circuit = Broken loop (current stops, 0 Amperes)',
        'Short Circuit = Direct zero-resistance path (extreme current surge, dangerous overheating)',
      ],
      babyStepExample: {
        title: 'Small Number Walkthrough (12V Battery & 4Ω Resistor)',
        friendlyNumbers: 'Let’s use small numbers: A 12-Volt car battery connected to a 4-Ohm light bulb.',
        steps: [
          {
            stepNumber: 1,
            action: 'Identify the Push (Voltage)',
            math: 'V = 12 Volts',
            plainWhy: 'The battery provides 12 Volts of electrical pressure.',
          },
          {
            stepNumber: 2,
            action: 'Identify the Squeeze (Resistance)',
            math: 'R = 4 Ohms (Ω)',
            plainWhy: 'The bulb’s filament resists the flow with 4 Ohms of opposition.',
          },
          {
            stepNumber: 3,
            action: 'Calculate the Flow (Current)',
            math: 'I = V ÷ R = 12 ÷ 4 = 3 Amperes',
            plainWhy: '12 Volts of push divided by 4 Ohms of squeeze allows exactly 3 Amperes of current to flow.',
          },
          {
            stepNumber: 4,
            action: 'Calculate the Light Power Output',
            math: 'P = V × I = 12 × 3 = 36 Watts',
            plainWhy: '36 Watts of electrical power is converted into bright light and heat.',
          },
        ],
        bottomLine:
          'Current increases with higher voltage push or lower resistance restriction.',
      },
      dontPanicTip:
        'Verify physical cause and effect: voltage is the driving potential and resistance opposes current flow.',
    },
    workedExample: {
      problemStatement:
        'A 12 V DC source is connected to a 4 Ω load resistor through a closed switch. Find: (a) the circuit current I, (b) the power P dissipated by the resistor, and (c) the current if the resistor is replaced with a 2 Ω load.',
      given: 'V = 12 V, R₁ = 4 Ω, R₂ = 2 Ω',
      find: 'I₁, P₁, I₂',
      stepByStep: [
        'Step 1: Calculate current using Ohm’s Law: I₁ = V / R₁ = 12 V / 4 Ω = 3.0 A.',
        'Step 2: Calculate power output: P₁ = V · I₁ = 12 V · 3.0 A = 36.0 W (or P = I²R = 3² · 4 = 36 W).',
        'Step 3: When resistance drops to 2 Ω: I₂ = V / R₂ = 12 V / 2 Ω = 6.0 A (current doubles because resistance halved).',
      ],
      answerWithUnits: 'I₁ = 3.0 A, P₁ = 36.0 W, I₂ = 6.0 A',
    },
    fasterShortcut: {
      name: 'Ohm’s Triangle Mental Solver',
      shortcutFormula: 'V = I \\cdot R \\iff I = \\frac{V}{R} \\iff R = \\frac{V}{I}',
      conditions: 'Valid for all pure DC linear resistive circuits',
      warningWhenToUseFull: 'For AC circuits with inductors and capacitors, replace R with impedance Z = R + jX',
    },
    quickCheck: {
      question: 'If a 10 V battery is connected to a 5 Ω resistor, what is the current flowing in the circuit?',
      choices: ['50 Amperes', '2 Amperes', '0.5 Amperes', '15 Amperes'],
      correctIndex: 1,
      explanation: 'Using Ohm’s Law: I = V / R = 10 V / 5 Ω = 2 Amperes.',
    },
    boardStyleQuestionId: 'Q-FOUND-OHM',
  },
  // ----------------------------------------------------
  // ELECTRICAL ENGINEERING: BASIC DC CIRCUITS & OHM'S LAW
  // ----------------------------------------------------
  {
    id: 'lesson-ee-basic-dc-circuits',
    topicGroupId: 'EE-01',
    subtopicTitle: 'DC Circuit Fundamentals: Ohm’s Law, Kirchhoff’s Laws & Voltage Division',
    conceptName: 'Basic Electric Circuits: Ohm’s Law & Kirchhoff’s Laws',
    seeItType: 'dc_circuit',
    visualCaption:
      'Direct Current (DC) Simulator: Explore pure Ohm’s Law (V = I·R), Series circuits (KVL voltage drop), Parallel circuits (KCL current division), and Maximum Power Transfer with live electron flow and interactive probes.',
    plainExplanation:
      'Every complex electrical system starts with Ohm’s Law (V = I · R) and Kirchhoff’s two laws (KCL: sum of currents entering a node is zero; KVL: sum of voltages around a closed loop is zero). When you connect resistors in series, current is identical everywhere, and the total resistance is simply R_total = R₁ + R₂ + ... + Rₙ. When you connect resistors in parallel, voltage across each branch is identical, and total resistance drops below the smallest resistor: 1/R_total = 1/R₁ + 1/R₂. Mastering these basic rules makes delta-wye, Thevenin’s theorem, and AC phasors completely intuitive.',
    explainMore:
      'In the PRC REE Board Examination, basic DC and AC circuit questions are important in the Electrical Engineering subject. The voltage divider formula [V_x = V_total · (R_x / R_total)] and current divider formula [I₁ = I_total · (R₂ / (R₁ + R₂))] allow you to calculate branch voltages and currents in under 15 seconds without setting up simultaneous matrix equations. Furthermore, the maximum power transfer theorem states that maximum power is delivered to a load when load resistance equals the internal Thevenin source resistance (R_L = R_th).',
    formulaLatex: 'V = I \\cdot R, \\quad P = V \\cdot I = I^2 R = \\frac{V^2}{R}, \\quad V_x = V_s \\left(\\frac{R_x}{R_1 + R_2}\\right), \\quad I_1 = I_s \\left(\\frac{R_2}{R_1 + R_2}\\right)',
    symbols: [
      {
        symbol: 'V',
        name: 'Voltage (Potential Difference)',
        unit: 'Volts (V)',
        description: 'Electrical pressure or electromotive force driving charge through the circuit',
      },
      {
        symbol: 'I',
        name: 'Electric Current',
        unit: 'Amperes (A)',
        description: 'Rate of charge flow: 1 Ampere = 1 Coulomb per second (dq/dt)',
      },
      {
        symbol: 'R',
        name: 'Electrical Resistance',
        unit: 'Ohms (Ω)',
        description: 'Opposition to current flow; converts electric energy to heat: R = ρ·L / A',
      },
      {
        symbol: 'P',
        name: 'Electric Power',
        unit: 'Watts (W) or Kilowatts (kW)',
        description: 'Rate of doing electrical work or dissipating thermal energy',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Voltage is the water pressure, Resistance is a kink in the hose, and Current is how much water actually sprays out!',
      realLifeMetaphor: {
        title: 'The Garden Hose and Faucet',
        story:
          'Imagine water flowing from your garden hose. The water pressure coming from the house faucet is Voltage (Volts). If you squeeze the hose with your fingers or put gravel inside, that bottleneck is Resistance (Ohms). The amount of water actually squirting out each second is Current (Amperes). Push with more pressure (more Volts) → more water shoots out. Squeeze the hose tighter (more Ohms) → less water flows. That simple relationship is Ohm’s Law: Flow = Pressure ÷ Squeeze (I = V / R)!',
        iconEmoji: '🚰',
        visualTip:
          'In the dynamic electron circuit above: increase Resistance and watch the little blue electron dots slow down right away!',
      },
      whyItMatters:
        'Every single device you own (phone charger, refrigerator, ceiling fan) is built using this exact rule so wires don’t overheat and cause a fire.',
      keyTakeaways: [
        '⚡ Voltage (V) = PUSH (the electric pressure from the battery or outlet)',
        '🚧 Resistance (R) = BOTTLENECK (the friction trying to block the flow)',
        '🌊 Current (I) = FLOW (how many electrons pass every second: I = V ÷ R)',
        '➡️ Series (in a single line): Resistances simply ADD together (6 Ω + 6 Ω = 12 Ω)',
        '🔀 Parallel (side-by-side lanes): Adding a second lane lets traffic flow easier, so total resistance drops (6 Ω || 6 Ω = 3 Ω)!',
      ],
      babyStepExample: {
        title: 'Super Easy 4-Step Walkthrough with Small Numbers',
        friendlyNumbers: 'Let’s use friendly numbers: A 12-Volt battery and two 6-Ohm lightbulbs.',
        steps: [
          {
            stepNumber: 1,
            action: 'Connect in Series (one after another)',
            math: '6 Ω + 6 Ω = 12 Ω total resistance',
            plainWhy: 'Electricity has to crawl through both bulbs in a single file line, so resistance doubles.',
          },
          {
            stepNumber: 2,
            action: 'Find the flow in Series',
            math: '12 Volts ÷ 12 Ohms = 1 Ampere',
            plainWhy: '12 volts of push divided by 12 ohms of obstruction gives 1 amp of flow.',
          },
          {
            stepNumber: 3,
            action: 'Now connect in Parallel (side-by-side branches)',
            math: '(6 × 6) ÷ (6 + 6) = 36 ÷ 12 = 3 Ω',
            plainWhy: 'Opening a second parallel lane gives electrons twice as much space to move, cutting resistance in half!',
          },
          {
            stepNumber: 4,
            action: 'Find the flow in Parallel',
            math: '12 Volts ÷ 3 Ohms = 4 Amperes',
            plainWhy: 'Because the path became easier (3 Ω), the battery can pump 4 times as much total flow!',
          },
        ],
        bottomLine:
          'Series connection increases equivalent resistance; parallel connection provides alternate paths and reduces equivalent resistance.',
      },
      dontPanicTip:
        'Combine resistors progressively in pairs or identifiable branches until reaching the simplified equivalent.',
    },
    workedExample: {
      problemStatement:
        'A 24 V DC source with internal resistance 0.5 Ω supplies two parallel resistors: R₁ = 6 Ω and R₂ = 12 Ω. Find: (a) equivalent external resistance, (b) total circuit current, (c) terminal voltage across the load, and (d) current flowing through R₁.',
      given: 'V_source = 24 V, R_internal = 0.5 Ω, R₁ = 6 Ω, R₂ = 12 Ω (parallel)',
      find: 'R_eq_parallel, I_total, V_terminal, I₁',
      stepByStep: [
        'Step 1: Calculate equivalent parallel resistance: R_parallel = (R₁ · R₂) / (R₁ + R₂) = (6 × 12) / (6 + 12) = 72 / 18 = 4.0 Ω',
        'Step 2: Total circuit resistance including internal battery resistance: R_total = R_parallel + R_internal = 4.0 + 0.5 = 4.5 Ω',
        'Step 3: Total battery current (Ohm’s Law): I_total = V_source / R_total = 24 V / 4.5 Ω = 5.333 A',
        'Step 4: Terminal voltage across the parallel load: V_terminal = I_total × R_parallel = 5.333 A × 4.0 Ω = 21.33 V (or V_terminal = 24 - 5.333 × 0.5 = 21.33 V)',
        'Step 5: Current through R₁ using current divider: I₁ = I_total × [R₂ / (R₁ + R₂)] = 5.333 A × [12 / 18] = 3.556 A',
      ],
      answerWithUnits: 'R_eq = 4.0 Ω; I_total = 5.33 A; V_terminal = 21.33 V; I₁ = 3.56 A',
    },
    fasterShortcut: {
      name: 'Current Divider Shortcut for Two Parallel Branches',
      shortcutFormula: 'I_1 = I_{total} \\times \\frac{R_2}{R_1 + R_2}',
      conditions:
        'Valid for two parallel resistors. Note that the numerator has the OPPOSITE resistor (R₂)!',
      warningWhenToUseFull:
        'For 3 or more parallel branches, do NOT use this formula directly; use I_k = V_parallel / R_k or conductance ratios G_k / ΣG.',
    },
    quickCheck: {
      question:
        'If three identical 12 Ω heating elements are connected in parallel across a 120 V line, what is the total equivalent resistance and total line current?',
      choices: ['36 Ω and 3.33 A', '4 Ω and 30 A', '12 Ω and 10 A', '4 Ω and 10 A'],
      correctIndex: 1,
      explanation:
        'For n identical resistors in parallel: R_eq = R / n = 12 / 3 = 4 Ω. Line current I = V / R_eq = 120 V / 4 Ω = 30 A.',
    },
    boardStyleQuestionId: 'Q-FOUND-OHM',
  },

  // ----------------------------------------------------
  // ELECTRICAL ENGINEERING: POWER FACTOR & POWER TRIANGLE
  // ----------------------------------------------------
  {
    id: 'lesson-ee-power-factor',
    topicGroupId: 'EE-01',
    subtopicTitle: 'AC Power, Power Factor Correction & The Power Triangle',
    conceptName: 'Power Factor & Shunt Capacitor Sizing',
    seeItType: 'phasor',
    visualCaption:
      'The Power Triangle: Real power P stays constant on the horizontal axis while capacitive reactive power cancels inductive VARs, pulling down the apparent power vector S and reducing line current.',
    plainExplanation:
      'Inductive loads like induction motors and transformers require magnetic fields to operate. This magnetic energy oscillates back and forth as reactive power (kVAR) without performing actual mechanical work. Low power factor forces utilities to supply larger apparent power (kVA) and higher line current, causing severe I²R copper heating and voltage drop. By connecting a shunt capacitor bank directly across the load, the capacitor supplies the local lagging VARs, immediately lowering the line current without changing active shaft power.',
    explainMore:
      'In a 3-phase balanced system, apparent power is S = √3 · V_LL · I_L. When power factor is 0.70, the line current is 35% higher than at 0.95 pf for the exact same kW output! The capacitor does not reduce the motor’s internal magnetizing VARs; it simply supplies them locally at the terminal bus so the transmission line and substation transformer do not have to carry them. In the Philippines, distribution utilities (such as Meralco) penalize industrial and commercial customers whose average monthly power factor drops below 85% or 90%.',
    formulaLatex: 'Q_c = P \\cdot (\\tan\\theta_1 - \\tan\\theta_2) = P \\cdot \\left[\\tan(\\arccos(pf_1)) - \\tan(\\arccos(pf_2))\\right]',
    symbols: [
      {
        symbol: 'Q_c',
        name: 'Capacitor Bank Rating',
        unit: 'kVAR (or VAR)',
        description: 'Total reactive power supplied by the shunt capacitor bank',
      },
      {
        symbol: 'P',
        name: 'Active Real Power',
        unit: 'kW (or Watts)',
        description: 'Constant working power consumed by the mechanical load',
      },
      {
        symbol: 'pf_1',
        name: 'Initial Power Factor',
        unit: 'Dimensionless (cos θ₁)',
        description: 'Original uncorrected lagging power factor of the load',
      },
      {
        symbol: 'pf_2',
        name: 'Target Power Factor',
        unit: 'Dimensionless (cos θ₂)',
        description: 'Desired improved power factor (e.g. 0.95 or 1.0)',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Power factor is the ratio of real soda to useless foam in your mug — adding a capacitor pops the bubbles so you get full value!',
      realLifeMetaphor: {
        title: 'The Tall Mug of Root Beer',
        story:
          'Imagine ordering a tall cold mug of root beer. The delicious liquid soda at the bottom is Real Power (kW) — it’s what actually quenches your thirst (turns motor shafts, lights bulbs). The useless bubbly foam on top is Reactive Power (kVAR) — it takes up space in your mug, but you can’t drink it! The entire glass size is Apparent Power (kVA). If half your mug is foam, you have a bad power factor (0.50). Adding a capacitor acts like an anti-foam spray: it pops the foam bubbles, so your mug is filled with almost 100% pure liquid soda!',
        iconEmoji: '🍺',
        visualTip:
          'In the Power Triangle visual above: notice that adding the capacitor pushes the vertical blue line (kVAR foam) all the way down to zero!',
      },
      whyItMatters:
        'Electric utilities (like Meralco) hit factories with huge monthly penalty fines if their power factor is below 0.85 because the utility has to send huge, fat wires just to deliver useless foam.',
      keyTakeaways: [
        '🥤 Real Power (kW) = The liquid soda you actually drink (does real mechanical work)',
        '🫧 Reactive Power (kVAR) = The bubbly magnetic foam (wasted space in the wire)',
        '🍺 Apparent Power (kVA) = The total mug size the electric company has to build for you',
        '🎯 Power Factor (pf) = Liquid ÷ Total Mug. Perfect score is 1.0 (100% liquid, 0% foam!)',
        '⚡ Shunt Capacitor = The anti-foam fix. It cancels the foam locally right at the factory.',
      ],
      babyStepExample: {
        title: 'Removing the Foam with a Capacitor',
        friendlyNumbers: 'A motor uses 100 kW of liquid soda, with 0.70 power factor. We want 1.0 (zero foam!).',
        steps: [
          {
            stepNumber: 1,
            action: 'Find the foam angle from the power factor',
            math: 'arccos(0.70) = 45.6°',
            plainWhy: 'Power factor is just the cosine of the angle: cos(θ) = 0.70.',
          },
          {
            stepNumber: 2,
            action: 'Find the foam multiplier',
            math: 'tan(45.6°) = 1.02',
            plainWhy: 'This tells us that for every 1 kW of soda, we have 1.02 kVAR of foam!',
          },
          {
            stepNumber: 3,
            action: 'Calculate the capacitor needed',
            math: '100 kW × 1.02 = 102 kVAR',
            plainWhy: 'A 102 kVAR capacitor bank pops all the foam, reducing wire current by over 30%!',
          },
        ],
        bottomLine:
          'Active power P performs mechanical work; shunt capacitors provide local magnetizing VARs and reduce feeder loading.',
      },
      dontPanicTip:
        'Verify angle units are in degrees when calculating trigonometric inverse functions.',
    },
    workedExample: {
      problemStatement:
        'A 3-phase, 480 V, 60 Hz industrial plant draws 120 kW at a power factor of 0.70 lagging. Determine the required rating of a 3-phase shunt capacitor bank in kVAR to raise the overall power factor to 0.95 lagging.',
      given: 'P = 120 kW, V_LL = 480 V, pf₁ = 0.70 lagging, pf₂ = 0.95 lagging',
      find: 'Required capacitor rating Q_c (kVAR)',
      stepByStep: [
        'Step 1: Compute original phase angle: θ₁ = arccos(0.70) = 45.573°',
        'Step 2: Compute target phase angle: θ₂ = arccos(0.95) = 18.195°',
        'Step 3: Evaluate tangents: tan(θ₁) = 1.0202, tan(θ₂) = 0.3287',
        'Step 4: Apply formula: Q_c = P · [tan(θ₁) - tan(θ₂)] = 120 · [1.0202 - 0.3287] = 120 · 0.6915 = 82.98 kVAR',
      ],
      answerWithUnits: '82.98 kVAR (select standard 85 or 90 kVAR bank)',
    },
    fasterShortcut: {
      name: 'Single-Line Tangent Ratio Shortcut',
      shortcutFormula: 'Q_c = P \\times \\left(\\frac{\\sqrt{1 - pf_1^2}}{pf_1} - \\frac{\\sqrt{1 - pf_2^2}}{pf_2}\\right)',
      conditions:
        'Valid whenever active power P remains unchanged and both initial and target power factors are lagging.',
      warningWhenToUseFull:
        'If the target is leading (e.g. over-correcting to 0.95 leading), tan(θ₂) becomes negative, so the terms ADD: Q_c = P · (tan θ₁ + |tan θ₂|). Using the shortcut blindly without sign awareness will under-rate the capacitor!',
    },
    quickCheck: {
      question:
        'If a load is operating at unity power factor (pf = 1.0), what is its reactive power Q?',
      choices: ['Equal to active power P', 'Zero kVAR', 'Negative kVAR', 'Infinite'],
      correctIndex: 1,
      explanation:
        'When pf = cos(θ) = 1.0, θ = 0°, so sin(0°) = 0. Thus Q = S · sin(θ) = 0 kVAR. All current is in phase with voltage.',
    },
    boardStyleQuestionId: 'Q-EE-001',
  },

  // ----------------------------------------------------
  // ELECTRICAL ENGINEERING: SERIES & PARALLEL AC RLC CIRCUITS
  // ----------------------------------------------------
  {
    id: 'lesson-ee-rlc-circuits',
    topicGroupId: 'EE-01',
    subtopicTitle: 'Series & Parallel AC RLC Circuits & Resonance',
    conceptName: 'AC RLC Impedance & Resonance',
    seeItType: 'circuit',
    visualCaption:
      'Dynamic Electron Flow: Observe AC electron flow, reactive opposition (XL and XC), and resonance where net reactance is eliminated and current peaks.',
    plainExplanation:
      'In AC circuits, resistance R dissipates active real power as heat, while inductance L and capacitance C store and return energy through magnetic and electric fields. Inductive reactance (XL = 2πfL) increases with frequency and causes current to lag voltage by 90°. Capacitive reactance (XC = 1/(2πfC)) decreases with frequency and causes current to lead voltage by 90°. When XL and XC balance each other out, the circuit enters Resonance, leaving only resistance R to oppose current.',
    explainMore:
      'In a series RLC circuit, total impedance is Z = R + j(XL - XC). At series resonance (fr = 1 / [2π√(LC)]), XL = XC, meaning net reactance vanishes (Z = R) and current reaches its absolute maximum. In parallel RLC circuits, resonance produces maximum total impedance and minimum line current from the source. The Philippine 60 Hz frequency standard means inductors and capacitors have fixed reactances: XL = 377 · L and XC = 1 / (377 · C).',
    formulaLatex: 'Z_{series} = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad f_r = \\frac{1}{2\\pi \\sqrt{LC}}, \\quad X_L = 2\\pi f L, \\quad X_C = \\frac{1}{2\\pi f C}',
    symbols: [
      {
        symbol: 'Z',
        name: 'Total Impedance',
        unit: 'Ohms (Ω)',
        description: 'Total opposition to AC sinusoidal current flow',
      },
      {
        symbol: 'X_L',
        name: 'Inductive Reactance',
        unit: 'Ohms (Ω)',
        description: 'Opposition due to magnetic flux in the inductor: 2πfL',
      },
      {
        symbol: 'X_C',
        name: 'Capacitive Reactance',
        unit: 'Ohms (Ω)',
        description: 'Opposition due to electric field storage in capacitor: 1/(2πfC)',
      },
      {
        symbol: 'f_r',
        name: 'Resonant Frequency',
        unit: 'Hertz (Hz)',
        description: 'Frequency at which XL = XC and circuit power factor is unity (1.0)',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Resonance is pushing a playground swing at the exact natural rhythm: the inductor’s heavy weight and capacitor’s spring cancel each other, making electricity surge effortlessly!',
      realLifeMetaphor: {
        title: 'The Playground Swing and Trampoline',
        story:
          'If you shove someone on a swing at random times, you bump into them and it’s clumsy and slow. But if you push at the exact right moment, every tiny push makes them fly sky-high effortlessly! In electronics, an Inductor (coil) is like a heavy child that hates speeding up or slowing down. A Capacitor is like a stretchy trampoline that bounces them back. When the coil’s sluggishness (XL) exactly balances the spring’s bounce (XC), they cancel each other out! That is RESONANCE: the circuit offers zero reactive fight, and current zooms through at maximum speed!',
        iconEmoji: '🎪',
        visualTip:
          'In the visual above, drag the Inductance or Capacitance sliders until XL equals XC: notice the yellow badge "⚡ RESONANCE" lights up and current spikes to its peak!',
      },
      whyItMatters:
        'This is the heart of all wireless communications: it lets your phone tune to 98.7 FM or a 5G Wi-Fi channel while blocking every other signal on earth.',
      keyTakeaways: [
        '🧱 Resistor (R) = Rough friction (wastes energy as heat)',
        '🌀 Inductor (XL) = Heavy flywheel (resists changes in current: XL = 2πfL)',
        '🔋 Capacitor (XC) = Spring (stores charge: XC = 1 / (2πfC))',
        '⚖️ Resonance occurs when Coil = Spring (XL = XC)',
        '🚀 At series resonance, net reactance is ZERO, and the circuit acts like a simple resistor (Z = R) with maximum current!',
      ],
      babyStepExample: {
        title: 'Resonance in 3 Simple Numbers',
        friendlyNumbers: 'Suppose R = 10 Ω, XL = 40 Ω, and XC = 40 Ω, with a 100 V battery.',
        steps: [
          {
            stepNumber: 1,
            action: 'Subtract the reactive fight',
            math: 'XL - XC = 40 - 40 = 0 Ω',
            plainWhy: 'The coil and capacitor completely wipe each other out!',
          },
          {
            stepNumber: 2,
            action: 'Find total impedance (opposition)',
            math: 'Z = √(10² + 0²) = 10 Ω',
            plainWhy: 'Only the 10 Ω resistor is left to slow down current.',
          },
          {
            stepNumber: 3,
            action: 'Find the current',
            math: '100 V ÷ 10 Ω = 10 Amps',
            plainWhy: 'Electricity flows at the absolute highest possible value!',
          },
        ],
        bottomLine:
          'Whenever XL = XC, net reactance is zero, impedance is minimized (Z = R), and circuit current reaches maximum.',
      },
      dontPanicTip:
        'At series resonance, set XL = XC, Z = R, and pf = 1.0 directly.',
    },
    workedExample: {
      problemStatement:
        'A series RLC circuit connected to a 230 V, 60 Hz AC source contains a 30 Ω resistor, an 80 mH inductor, and a 50 µF capacitor. Determine: (a) XL and XC, (b) total circuit impedance Z, and (c) the resonant frequency fr.',
      given: 'V = 230 V, f = 60 Hz, R = 30 Ω, L = 80 mH = 0.08 H, C = 50 µF = 50 × 10⁻⁶ F',
      find: 'XL, XC, Z, and fr',
      stepByStep: [
        'Step 1: Compute angular frequency: ω = 2π(60) ≈ 376.99 rad/s',
        'Step 2: Inductive reactance: XL = ωL = 376.99 × 0.08 = 30.16 Ω',
        'Step 3: Capacitive reactance: XC = 1 / (ωC) = 1 / (376.99 × 50 × 10⁻⁶) = 53.05 Ω',
        'Step 4: Net reactance: X_net = XL - XC = 30.16 - 53.05 = -22.89 Ω (Capacitive, current leads)',
        'Step 5: Total impedance: Z = √(R² + X_net²) = √(30² + (-22.89)²) = √(900 + 523.95) = 37.74 Ω',
        'Step 6: Resonant frequency: fr = 1 / (2π√(LC)) = 1 / (2π√(0.08 × 50 × 10⁻⁶)) = 1 / (2π × 0.002) = 79.58 Hz',
      ],
      answerWithUnits: 'XL = 30.16 Ω; XC = 53.05 Ω; Z = 37.74 Ω ∠-37.3°; fr = 79.58 Hz',
    },
    fasterShortcut: {
      name: 'Resonant Frequency LC Product Shortcut',
      shortcutFormula: 'f_r = \\frac{159.155}{\\sqrt{L \\cdot C}} \\quad (L \\text{ in H}, C \\text{ in } \\mu\\text{F} \\implies \\frac{159155}{\\sqrt{L \\cdot C_{\\mu F}}})',
      conditions:
        'Valid for all standard series RLC resonant circuit calculations.',
      warningWhenToUseFull:
        'Only applicable to pure series or ideal parallel circuits without internal coil resistance in parallel branches.',
    },
    quickCheck: {
      question:
        'At series resonance in an RLC circuit, what is the power factor of the circuit?',
      choices: ['0.0 lagging', '0.707 leading', '1.0 (Unity)', 'Zero'],
      correctIndex: 2,
      explanation:
        'At resonance, XL = XC so net reactance is zero (X = 0). The impedance is purely resistive (Z = R), making phase angle θ = 0° and power factor cos(0°) = 1.0.',
    },
    boardStyleQuestionId: 'Q-MATH-002',
  },

  // ----------------------------------------------------
  // ELECTRICAL ENGINEERING: TRANSFORMER & REFLECTED IMPEDANCE
  // ----------------------------------------------------
  {
    id: 'lesson-ee-transformer',
    topicGroupId: 'EE-03',
    subtopicTitle: 'Transformers: Turns Ratio & Reflected Impedance',
    conceptName: 'Transformer Impedance Transformation',
    seeItType: 'transformer',
    visualCaption:
      'Magnetic coupling transfers electric energy between primary and secondary. Impedance connected across the secondary reflects to the primary scaled by the square of the turns ratio: Z₁’ = a² · Z_L.',
    plainExplanation:
      'A transformer changes voltage and current levels inversely: stepping voltage down by factor a causes current to step up by factor a. Because impedance is voltage divided by current (Z = V / I), dividing voltage by a and multiplying current by a changes the impedance seen from the primary side by a factor of a²! A small resistance on the low-voltage secondary appears as a much larger resistance to the high-voltage utility source.',
    explainMore:
      'The turns ratio is defined as a = N₁ / N₂ = V₁ / V₂ = I₂ / I₁. The primary voltage is V₁ = a · V₂, while primary current is I₁ = I₂ / a. Dividing these two equations gives Z₁ = V₁ / I₁ = (a · V₂) / (I₂ / a) = a² · (V₂ / I₂) = a² · Z_L. This property is crucial in power system per-unit analysis and audio/RF maximum power transfer matching.',
    formulaLatex: 'a = \\frac{N_1}{N_2} = \\frac{V_1}{V_2}, \\quad Z_1\' = a^2 \\cdot Z_L = \\left(\\frac{N_1}{N_2}\\right)^2 \\cdot Z_L',
    symbols: [
      {
        symbol: 'a',
        name: 'Turns Ratio',
        unit: 'Dimensionless',
        description: 'Ratio of primary coil turns N₁ to secondary coil turns N₂',
      },
      {
        symbol: 'Z_L',
        name: 'Secondary Load Impedance',
        unit: 'Ohms (Ω)',
        description: 'Actual physical impedance connected across the secondary terminals',
      },
      {
        symbol: 'Z_1\'',
        name: 'Reflected Impedance (referred to primary)',
        unit: 'Ohms (Ω)',
        description: 'Equivalent impedance as seen looking into the primary terminals',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'A transformer is an electric bicycle gearbox: it trades high voltage for high current, so power stays equal on both sides!',
      realLifeMetaphor: {
        title: 'The 21-Speed Mountain Bike',
        story:
          'When riding a bike uphill, you switch into low gear. You pedal your feet super fast (high speed = high current), but your pedals turn easily with almost no leg strain (low effort = low voltage). On flat highways, you switch into high gear: you pedal slowly with strong force. Your leg muscles produce the exact same wattage either way! A transformer does the exact same thing without moving parts: it trades voltage for current. If voltage drops 10 times, current jumps 10 times. Power IN always equals Power OUT!',
        iconEmoji: '🚲',
        visualTip:
          'Look at the magnetic core visual above: 10 loops of wire on the left, 1 loop on the right. Notice how voltage steps down by 10 while current jumps by 10!',
      },
      whyItMatters:
        'Without transformers, electricity could only travel 1 or 2 kilometers from a power plant before power lines melted from heavy current.',
      keyTakeaways: [
        '🔄 Turns Ratio a = Primary turns ÷ Secondary turns = V1 ÷ V2',
        '⚡ Power is conserved: V1 × I1 = V2 × I2 (no free energy!)',
        '⬇️ Step-down: Voltage goes DOWN, Current goes UP',
        '📈 Impedance scales with ratio SQUARED: Z_primary = a² × Z_secondary',
        '🧠 Memory hook: The high-voltage side ALWAYS sees higher resistance!',
      ],
      babyStepExample: {
        title: 'Reflecting Resistance in 2 Easy Steps',
        friendlyNumbers: 'A transformer has turns ratio a = 10 (2400 V down to 240 V), with a small 4-Ohm speaker on the secondary.',
        steps: [
          {
            stepNumber: 1,
            action: 'Square the turns ratio',
            math: '10² = 100',
            plainWhy: 'Because voltage drops by 10 AND current rises by 10, resistance scales by 10 × 10 = 100.',
          },
          {
            stepNumber: 2,
            action: 'Multiply the speaker resistance',
            math: '100 × 4 Ω = 400 Ω',
            plainWhy: 'To the high-voltage utility source, that 4-ohm speaker looks like a 400-ohm load!',
          },
        ],
        bottomLine:
          'Whenever you move resistance to the high-voltage side, simply multiply by a²: 4 Ω × 100 = 400 Ω.',
      },
      dontPanicTip:
        'The high-voltage winding always exhibits the higher impedance by a factor of a² = (V₁/V₂)²',
    },
    workedExample: {
      problemStatement:
        'A single-phase 2400/240 V, 60 Hz distribution transformer supplies a 4 Ω resistive load connected across its secondary terminals. Neglecting transformer internal losses, calculate: (a) turns ratio a, (b) secondary current, and (c) reflected load resistance seen from the 2400 V primary.',
      given: 'V₁ = 2400 V, V₂ = 240 V, R_L = 4 Ω',
      find: 'a, I₂, and R₁’',
      stepByStep: [
        'Step 1: Turns ratio a = V₁ / V₂ = 2400 / 240 = 10',
        'Step 2: Secondary current I₂ = V₂ / R_L = 240 / 4 = 60 A',
        'Step 3: Primary current I₁ = I₂ / a = 60 / 10 = 6 A',
        'Step 4: Reflected resistance R₁’ = a² · R_L = (10)² · 4 = 100 · 4 = 400 Ω',
        'Check: V₁ / I₁ = 2400 V / 6 A = 400 Ω (Matches!)',
      ],
      answerWithUnits: 'a = 10; I₂ = 60 A; R₁’ = 400 Ω',
    },
    fasterShortcut: {
      name: 'Voltage-Squared Impedance Scaling',
      shortcutFormula: 'Z_1\' = Z_L \\times \\left(\\frac{V_1}{V_2}\\right)^2',
      conditions:
        'Ideal or negligible leakage impedance transformer. Directly uses voltage rating without needing turn counts.',
      warningWhenToUseFull:
        'If transformer winding resistance and leakage reactance are significant, you must add the primary winding impedance R₁ + jX₁ to the reflected secondary impedance: Z_total = (R₁ + a² R₂) + j(X₁ + a² X₂).',
    },
    quickCheck: {
      question:
        'A transformer has a turns ratio a = 5. If a 10 Ω resistor is placed on the primary, what is its value referred to the secondary?',
      choices: ['250 Ω', '50 Ω', '2 Ω', '0.4 Ω'],
      correctIndex: 3,
      explanation:
        'Referring from primary to secondary divides by a²: Z₂’ = Z₁ / a² = 10 / (5²) = 10 / 25 = 0.4 Ω. The low-voltage side always has lower impedance.',
    },
    boardStyleQuestionId: 'Q-EE-002',
  },

  // ----------------------------------------------------
  // ELECTRICAL ENGINEERING: TRANSMISSION LINE & FERRANTI EFFECT
  // ----------------------------------------------------
  {
    id: 'lesson-ee-transmission',
    topicGroupId: 'EE-04',
    subtopicTitle: 'Transmission Lines: Voltage Regulation & Ferranti Effect',
    conceptName: 'Long Transmission Line Voltage Rise',
    seeItType: 'transmission',
    visualCaption:
      'Under open-circuit or very light loads, the line charging capacitive current flowing through the series inductive reactance produces a negative voltage drop (voltage rise), causing V_R to exceed V_S.',
    plainExplanation:
      'Long high-voltage transmission lines have significant distributed capacitance between conductors and ground. When energized with no load at the receiving substation, a continuous capacitive charging current flows from the generator into the line. Because capacitive current leads voltage by 90°, flowing through the inductive reactance (jX_L) produces a phasor voltage that adds in phase to the sending voltage! As a result, the receiving-end voltage rises above the sending-end voltage.',
    explainMore:
      'The approximate no-load voltage rise is given by V_R - V_S ≈ 0.5 · (ω² · L · C) · V_R. For a 230 kV or 500 kV transmission line spanning over 200 km, this overvoltage can exceed insulation ratings and puncture transformer bushings. To mitigate the Ferranti effect, utility grid operators (like NGCP in the Philippines) switch in shunt reactors (large inductive coils) at receiving substations during low-load midnight hours to absorb the excess capacitive charging MVAR.',
    formulaLatex: '\\%VR = \\frac{|V_S/A| - |V_{R,FL}|}{|V_{R,FL}|} \\times 100\\%, \\quad \\Delta V_{no-load} \\approx \\frac{1}{2} \\omega^2 L C \\cdot V_R',
    symbols: [
      {
        symbol: '%VR',
        name: 'Percent Voltage Regulation',
        unit: 'Percentage (%)',
        description: 'Measure of transmission line voltage stability from no-load to full-load',
      },
      {
        symbol: 'V_S',
        name: 'Sending-End Voltage',
        unit: 'Volts (or kV)',
        description: 'Voltage supplied at the power plant or sending substation',
      },
      {
        symbol: 'V_R',
        name: 'Receiving-End Voltage',
        unit: 'Volts (or kV)',
        description: 'Voltage delivered at the consumer load terminal',
      },
      {
        symbol: 'A',
        name: 'ABCD Line Constant A',
        unit: 'Dimensionless complex number',
        description: 'Reverse voltage ratio parameter cosh(gamma * l) of the line',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'When long high-voltage power lines have no factory load attached (like in the middle of the night), the far end voltage surges higher than the generator — this is the Ferranti effect!',
      realLifeMetaphor: {
        title: 'The Capped Garden Hose Pressure Surge',
        story:
          'Imagine stretching out a 100-meter long rubber garden hose with the spray nozzle at the far end completely shut. When you crank open the house faucet full blast, water rushes in to expand and stretch the elastic hose. The trapped shockwave causes the pressure at the closed nozzle to spike even higher than the water pressure at the house faucet! On long electric power lines, the capacitance between the overhead wires and the earth acts like that elastic hose: at night when factories shut down, the voltage at the far receiving substation climbs higher than the power plant!',
        iconEmoji: '🌊',
        visualTip:
          'In the transmission line simulator above, drag Load Current down to zero: watch the voltage curve climb UP toward the receiving end!',
      },
      whyItMatters:
        'If NGCP engineers didn’t turn on large inductive coils (shunt reactors) during low-load midnight hours, substation transformers would literally catch fire from overvoltage.',
      keyTakeaways: [
        '🌙 Happens ONLY under NO LOAD (open-circuit) or very light load on long lines',
        '📈 Receiving Voltage (VR) is unexpectedly GREATER than Sending Voltage (VS)',
        '🔋 Caused by wire capacitance charging current flowing through wire inductance',
        '🧯 The Cure: Turn ON Shunt Reactors (big inductors) to soak up the excess voltage',
      ],
      babyStepExample: {
        title: 'Finding Voltage Rise in 2 Easy Steps',
        friendlyNumbers: 'A 200 kV generator is connected to an open transmission line with line factor A = 0.90.',
        steps: [
          {
            stepNumber: 1,
            action: 'Recognize the no-load rule',
            math: 'Sending Voltage = A × Receiving Voltage',
            plainWhy: 'Since nobody is using power at the far end (Current = 0), the equation simplifies to VS = A × VR.',
          },
          {
            stepNumber: 2,
            action: 'Divide to find the far end voltage',
            math: 'VR = 200 kV ÷ 0.90 = 222.2 kV',
            plainWhy: 'The far end has 22.2 kV HIGHER voltage than the generator! That is the Ferranti effect.',
          },
        ],
        bottomLine:
          'Under no load, Receiving Voltage VR = VS ÷ A. It is always higher than the sending voltage.',
      },
      dontPanicTip:
        'When the receiving end is open-circuited, receiving current I_R = 0, reducing the ABCD equation to V_S = A · V_R.',
    },
    workedExample: {
      problemStatement:
        'A 230 kV, 60 Hz, 3-phase, 300 km transmission line has ABCD parameters A = D = 0.90 ∠1.2° and B = 150 ∠78° Ω. If the line is open-circuited at the receiving end and the receiving end voltage is maintained at 230 kV line-to-line, calculate the required sending-end line-to-line voltage.',
      given: 'A = 0.90, V_R = 230 kV, I_R = 0 (open-circuit)',
      find: 'Sending-end line voltage V_S',
      stepByStep: [
        'Step 1: General transmission line equation: V_S = A · V_R + B · I_R',
        'Step 2: Since receiving end is open, I_R = 0, so V_S = A · V_R',
        'Step 3: Taking magnitudes: |V_S| = |A| · |V_R|',
        'Step 4: |V_S| = 0.90 · 230 kV = 207 kV',
        'Observation: V_S (207 kV) is LESS than V_R (230 kV). The receiving end is 23 kV HIGHER due to the Ferranti effect!',
      ],
      answerWithUnits: '207 kV line-to-line',
    },
    fasterShortcut: {
      name: 'No-Load ABCD Voltage Relation',
      shortcutFormula: 'V_{S,LL} = |A| \\times V_{R,LL}',
      conditions:
        'Applicable only when receiving end current is zero (open-circuit, no-load condition).',
      warningWhenToUseFull:
        'When load is connected (I_R > 0), you MUST include the B · I_R phasor drop: V_S = A · V_R + B · I_R. Do not neglect B · I_R when any megawatt load exists.',
    },
    quickCheck: {
      question:
        'What substation equipment is switched onto transmission lines to counteract the Ferranti effect during off-peak hours?',
      choices: ['Shunt capacitors', 'Shunt reactors', 'Series capacitors', 'Synchronous generators'],
      correctIndex: 1,
      explanation:
        'Shunt reactors (large inductive inductors) absorb the excess leading capacitive VARs generated by line capacitance, clamping the overvoltage.',
    },
    boardStyleQuestionId: 'Q-EE-003',
  },

  // ----------------------------------------------------
  // MATHEMATICS: BASIC ALGEBRA, QUADRATICS & WORD PROBLEMS
  // ----------------------------------------------------
  {
    id: 'lesson-math-algebra-fundamentals',
    topicGroupId: 'MATH-01',
    subtopicTitle: 'Algebra Fundamentals: Quadratic Roots, Factoring & Work-Rate Problems',
    conceptName: 'Basic Algebra: Quadratic Roots, Exponents & Rate Problems',
    seeItType: 'algebra',
    visualCaption:
      'Quadratic Parabola & Roots: See how changing coefficients a, b, and c directly shifts the parabola and alters the discriminant (b² - 4ac) between two real roots, one repeated root, and complex conjugate roots.',
    plainExplanation:
      'Algebra is the bedrock foundation of all engineering licensure problems. Every electrical formula—whether node voltages in circuits, power flow equations, or RLC characteristic equations—boils down to solving algebraic systems. For any quadratic ax² + bx + c = 0, the discriminant Δ = b² - 4ac tells you everything: if Δ > 0, you get two distinct real solutions; if Δ = 0, you get one repeated critical solution; if Δ < 0, roots are complex numbers with imaginary j components. In electrical circuits, this exact discriminant dictates whether a transient circuit rings smoothly or oscillates wildly.',
    explainMore:
      'PRC Annex A assigns 5 Mathematics items to Algebra and Complex Numbers together. These three study examples build useful skills: (1) Quadratic discriminant and root properties (Sum of roots = -b/a, Product = c/a); (2) Word problems involving rate, work, and mixtures (e.g. two generators or pumps operating in parallel where combined rate is 1/T = 1/T₁ + 1/T₂); and (3) Partial fractions decomposition, which is the mandatory stepping stone for solving Inverse Laplace Transforms in circuit transients. Practice each skill with simple examples before trying timed problems.',
    formulaLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 \\cdot x_2 = \\frac{c}{a}, \\quad \\frac{1}{T_{total}} = \\frac{1}{T_1} + \\frac{1}{T_2}',
    symbols: [
      {
        symbol: 'a, b, c',
        name: 'Polynomial Coefficients',
        unit: 'Real Constants',
        description: 'Constants in standard quadratic form ax² + bx + c = 0',
      },
      {
        symbol: 'Δ (b² - 4ac)',
        name: 'Discriminant',
        unit: 'Dimensionless',
        description: 'Determines nature of roots: >0 (real distinct), =0 (repeated), <0 (complex conjugate)',
      },
      {
        symbol: 'x₁, x₂',
        name: 'Roots / Solutions',
        unit: 'Units of variable x',
        description: 'Values of x where the equation equals zero (crosses x-axis)',
      },
      {
        symbol: 'T_total',
        name: 'Combined Time',
        unit: 'Hours, minutes, or seconds',
        description: 'Time required when multiple workers or pumps operate simultaneously',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Algebra is just finding the missing puzzle piece: when two people or machines work together, you multiply their times and divide by their sum!',
      realLifeMetaphor: {
        title: 'Two Friends Painting a Room',
        story:
          'If Alice can paint a whole bedroom in 2 hours alone, and Bob takes 3 hours alone, how long does it take if they paint together? You NEVER add 2 + 3 = 5 (working together makes it faster, not slower!). Alice paints 1/2 of the room each hour. Bob paints 1/3 of the room each hour. Together, they paint (1/2 + 1/3) = 5/6 of the room every hour. So the entire room is finished in 6/5 = 1.2 hours (1 hour and 12 minutes)!',
        iconEmoji: '🎨',
        visualTip:
          'In the interactive algebra simulator above, switch to the "Word Problems (Work & Rates)" tab to see the two pipes pouring water into the tank together!',
      },
      whyItMatters:
        'Whether it’s two backup generators charging a substation battery, two pumps draining a vault, or two resistors in parallel, this rate formula is a useful recurring engineering math pattern.',
      keyTakeaways: [
        '🤝 Working together = ADD THEIR SPEEDS/RATES (1/T_total = 1/T1 + 1/T2)',
        '⏱️ Combined time is ALWAYS LESS than the fastest person alone (less than 2 hours!)',
        '⚡ The 5-Second Shortcut: Time = (T1 × T2) ÷ (T1 + T2) [Product over Sum]',
        '🏀 For quadratics: The roots are just the moments a thrown ball touches the ground',
      ],
      babyStepExample: {
        title: 'The 5-Second Product-Over-Sum Trick',
        friendlyNumbers: 'Generator A takes 3 hours alone. Generator B takes 6 hours alone.',
        steps: [
          {
            stepNumber: 1,
            action: 'Multiply the two times (Product)',
            math: '3 × 6 = 18',
            plainWhy: 'Multiply the individual times together.',
          },
          {
            stepNumber: 2,
            action: 'Add the two times (Sum)',
            math: '3 + 6 = 9',
            plainWhy: 'Add the individual times together.',
          },
          {
            stepNumber: 3,
            action: 'Divide Product by Sum',
            math: '18 ÷ 9 = 2 hours',
            plainWhy: 'Together they take exactly 2 hours!',
          },
        ],
        bottomLine:
          '(3 × 6) ÷ (3 + 6) = 2 hours flat. You can solve it in your head before others finish reading the question!',
      },
      dontPanicTip:
        'Sanity check: Combined parallel time must be strictly less than the fastest individual rate alone.',
    },
    workedExample: {
      problemStatement:
        'A main substation backup generator can charge an emergency battery bank alone in 4 hours. A portable auxiliary generator takes 6 hours to charge the same bank alone. If both generators are operated simultaneously in parallel, how many hours and minutes will it take to fully charge the battery bank?',
      given: 'Time generator 1 alone T₁ = 4 hours; Time generator 2 alone T₂ = 6 hours',
      find: 'Combined charging time T_total',
      stepByStep: [
        'Step 1: Identify individual hourly rates (fraction of bank charged per hour):',
        '   - Rate 1: r₁ = 1 / T₁ = 1/4 = 0.25 bank/hr',
        '   - Rate 2: r₂ = 1 / T₂ = 1/6 = 0.1667 bank/hr',
        'Step 2: Add rates together because both units assist each other simultaneously:',
        '   - Combined Rate: r_total = 1/4 + 1/6 = 3/12 + 2/12 = 5/12 bank/hr',
        'Step 3: Invert combined rate to find total time:',
        '   - T_total = 1 / r_total = 12 / 5 = 2.40 hours',
        'Step 4: Convert decimal fraction to minutes:',
        '   - 0.40 hours × 60 minutes/hr = 24 minutes',
        '   - Total time = 2 hours and 24 minutes',
      ],
      answerWithUnits: '2.40 hours (2 hours, 24 minutes)',
    },
    fasterShortcut: {
      name: 'Product Over Sum Shortcut',
      shortcutFormula: 'T_{total} = \\frac{T_1 \\times T_2}{T_1 + T_2}',
      conditions:
        'Valid whenever two independent agents work simultaneously on the same task without interference (identical to two parallel resistors R₁·R₂ / (R₁ + R₂)).',
      warningWhenToUseFull:
        'If one worker starts late, or if one pump drains while the other fills, you must use the algebraic rate equation: (r₁ · t₁) ± (r₂ · t₂) = 1.0.',
    },
    quickCheck: {
      question:
        'For the quadratic equation 2x² - 8x + k = 0, what value of k makes the roots real, equal, and repeated?',
      choices: ['k = 4', 'k = 8', 'k = 16', 'k = -8'],
      correctIndex: 1,
      explanation:
        'For roots to be equal and repeated, the discriminant must be zero: b² - 4ac = 0. Here, (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => 8k = 64 => k = 8.',
    },
    boardStyleQuestionId: 'Q-FOUND-ALG',
  },

  // ----------------------------------------------------
  // MATHEMATICS: CALCULUS MAXIMA & OPTIMIZATION
  // ----------------------------------------------------
  {
    id: 'lesson-math-calculus',
    topicGroupId: 'MATH-04',
    subtopicTitle: 'Differential Calculus: Derivatives & Engineering Optimization',
    conceptName: 'Calculus Maxima, Minima & Rate of Change',
    seeItType: 'calculus',
    visualCaption:
      'The derivative dy/dx gives the slope of the tangent line. At local peaks or valleys (maxima/minima), the tangent line is horizontal and dy/dx = 0.',
    plainExplanation:
      'In electrical engineering, we constantly seek optimal operational points: maximum power transfer, maximum transformer efficiency, minimum line loss, or maximum economic dispatch. Differential calculus finds these peak conditions by setting the first derivative equal to zero (f’(x) = 0). The second derivative (f’’(x)) confirms whether the peak is a maximum (f’’ < 0, concave down) or a minimum (f’’ > 0, concave up).',
    explainMore:
      'For example, the classic Maximum Power Transfer Theorem can be directly proved using calculus: power delivered to load is P_L = I² · R_L = [V_th / (R_th + R_L)]² · R_L. Differentiating P_L with respect to R_L and setting dP_L / dR_L = 0 yields (R_th + R_L)² - 2R_L(R_th + R_L) = 0, which reduces directly to R_L = R_th!',
    formulaLatex: '\\frac{dP}{dx} = 0 \\quad [\\text{Critical Points}], \\quad \\frac{d^2P}{dx^2} < 0 \\implies \\text{Local Maximum}',
    symbols: [
      {
        symbol: 'dy/dx',
        name: 'First Derivative',
        unit: 'Units of y per unit of x',
        description: 'Instantaneous rate of change or slope of tangent line',
      },
      {
        symbol: 'd²y/dx²',
        name: 'Second Derivative',
        unit: 'Rate of change of slope',
        description: 'Determines concavity (negative = maximum, positive = minimum)',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Calculus maxima is like hiking to the top of a mountain: at the very peak, the ground beneath your feet is completely flat (slope = 0)!',
      realLifeMetaphor: {
        title: 'The Summit of Mount Pulag',
        story:
          'When hiking up a mountain trail, you walk uphill (positive slope). When hiking down the other side, you walk downhill (negative slope). But right at the very summit, where you pause to take your victory selfie, the ground under your boots is completely horizontal and level for a moment! In calculus, "derivative" simply means slope. So to find the absolute peak efficiency or maximum power, you simply find where the slope equals ZERO!',
        iconEmoji: '🏔️',
        visualTip:
          'In the interactive graph above, drag the slider to the peak: notice the red tangent line turns into a perfectly flat horizontal ruler with slope = 0.00!',
      },
      whyItMatters:
        'Operating electric transformers and motors at their peak efficiency point saves millions of pesos in electricity bills every year.',
      keyTakeaways: [
        '📈 Derivative = Slope (is the line climbing or falling?)',
        '⛰️ Maximum or Minimum happens where Slope = 0 (perfectly flat!)',
        '⚡ The Golden Transformer Rule: Maximum efficiency occurs when Constant Core Loss = Variable Copper Loss (P_core = P_cu)',
        '🎯 Peak fraction shortcut: k = √(P_core ÷ P_cu)',
      ],
      babyStepExample: {
        title: 'Finding Maximum Efficiency in 3 Baby Steps',
        friendlyNumbers: 'A 100 kVA transformer has 500 W core loss and 2000 W copper loss at full load.',
        steps: [
          {
            stepNumber: 1,
            action: 'Divide the two losses',
            math: '500 W ÷ 2000 W = 0.25',
            plainWhy: 'Divide constant core loss by variable copper loss.',
          },
          {
            stepNumber: 2,
            action: 'Take the square root',
            math: '√(0.25) = 0.50 (50% load)',
            plainWhy: 'The calculus derivation proves the peak load fraction is always the square root of the ratio.',
          },
          {
            stepNumber: 3,
            action: 'Multiply by total rating',
            math: '0.50 × 100 kVA = 50 kVA',
            plainWhy: 'Maximum efficiency happens at exactly 50 kVA (half load)!',
          },
        ],
        bottomLine:
          'Maximum efficiency occurs when variable copper loss equals constant core loss: k = √(P_core / P_cu).',
      },
      dontPanicTip:
        'Optimization problems simplify to equating variable losses to fixed losses: P_core = P_cu.',
    },
    workedExample: {
      problemStatement:
        'The efficiency of a power transformer operating at variable load current I is given by η(I) = (V·I) / (V·I + P_core + I²·R_eq). Find the condition for load current I that yields maximum efficiency.',
      given: 'P_out = V·I, Losses = P_core + I²·R_eq',
      find: 'Condition for max efficiency',
      stepByStep: [
        'Step 1: Invert expression: 1/η = 1 + (P_core / V·I) + (I·R_eq / V)',
        'Step 2: Maximizing η is equivalent to minimizing 1/η',
        'Step 3: Differentiate with respect to I and set to zero: d(1/η)/dI = -P_core / (V·I²) + R_eq / V = 0',
        'Step 4: Multiply by V: -P_core / I² + R_eq = 0  =>  P_core = I² · R_eq',
        'Conclusion: Maximum efficiency occurs when Core Loss equals Copper Loss!',
      ],
      answerWithUnits: 'P_core = P_cu (Variable loss = Constant loss)',
    },
    fasterShortcut: {
      name: 'Maximum Efficiency Load Fraction',
      shortcutFormula: 'k_{max\\_eff} = \\sqrt{\\frac{P_{core}}{P_{cu,FL}}}',
      conditions:
        'Applicable to any transformer or induction machine with constant core losses and I²R copper losses.',
      warningWhenToUseFull:
        'Only valid when core loss is constant with voltage. If supply voltage varies significantly, core loss varies as V² and full derivative is needed.',
    },
    quickCheck: {
      question:
        'A 50 kVA transformer has a core loss of 400 W and full-load copper loss of 1600 W. At what load kVA is efficiency maximum?',
      choices: ['50 kVA', '25 kVA', '35.3 kVA', '12.5 kVA'],
      correctIndex: 1,
      explanation:
        'Fraction k = √(400 / 1600) = √(0.25) = 0.5. Max efficiency occurs at 0.5 × 50 kVA = 25 kVA!',
    },
    boardStyleQuestionId: 'Q-MATH-001',
  },

  // ----------------------------------------------------
  // ESAS: STATICS & FREE-BODY DIAGRAMS
  // ----------------------------------------------------
  {
    id: 'lesson-esas-mechanics',
    topicGroupId: 'ESAS-04',
    subtopicTitle: 'Engineering Mechanics: Coplanar Equilibrium & FBD',
    conceptName: 'Concurrent Force Resolution & Resultant Vector',
    seeItType: 'mechanics',
    visualCaption:
      'Any system of concurrent forces acting on a utility pole, transmission tower, or motor shaft can be resolved into orthogonal components along x and y. Equilibrium requires ΣF_x = 0 and ΣF_y = 0.',
    plainExplanation:
      'In electrical engineering, structural mechanics is vital when designing utility distribution poles, transformer mounting pads, and overhead transmission towers. Forces exerted by wind pressure, cable tension, and dead weight must balance. By drawing a Free-Body Diagram (FBD), we resolve each angled force into horizontal (F · cos θ) and vertical (F · sin θ) components. The resultant force R gives the total pull the guy wire anchor must resist.',
    explainMore:
      'Under Newton’s First Law, a particle remains in static equilibrium if the vector sum of all forces is zero: ΣF = 0. For 2D coplanar systems, this yields two scalar equations: ΣF_x = 0 and ΣF_y = 0. When sizing guy wires for a corner utility pole where conductors change direction by 90°, the guy wire must exert an equilibrant force equal in magnitude and opposite in direction to the resultant of the two cable tensions.',
    formulaLatex: 'R_x = \\sum F_i \\cos\\theta_i, \\quad R_y = \\sum F_i \\sin\\theta_i, \\quad R = \\sqrt{R_x^2 + R_y^2}, \\quad \\theta_R = \\arctan\\left(\\frac{R_y}{R_x}\\right)',
    symbols: [
      {
        symbol: 'R',
        name: 'Resultant Force',
        unit: 'Newtons (N) or kilonewtons (kN)',
        description: 'Total combined vector sum of all applied forces',
      },
      {
        symbol: 'R_x, R_y',
        name: 'Orthogonal Components',
        unit: 'Newtons (N)',
        description: 'Sum of horizontal and vertical projections',
      },
      {
        symbol: 'θ_R',
        name: 'Resultant Direction Angle',
        unit: 'Degrees (°)',
        description: 'Angle of the resultant vector measured counterclockwise from positive x-axis',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Forces are like a game of tug-of-war: if the pull to the left equals the pull to the right, and pull up equals pull down, the utility pole stands perfectly still!',
      realLifeMetaphor: {
        title: 'Tug-of-War and the Guy Wire Anchor',
        story:
          'Picture an electric utility pole standing at a street corner. Heavy copper wires pull it strongly towards the street. Why doesn’t the wooden pole snap and collapse? Because an angled steel cable (guy wire) anchored in concrete pulls in the exact opposite direction! If Team North pulls with 30 kN and Team East pulls with 40 kN, their diagonal combined pull is 50 kN (the classic 3-4-5 triangle!). The guy wire just has to pull with 50 kN in the opposite direction so the flag in the middle doesn’t budge an inch!',
        iconEmoji: '🏗️',
        visualTip:
          'In the Free-Body Diagram above: notice that when forces balance each other out, the net force circle turns green and the pole does not tip over!',
      },
      whyItMatters:
        'Every single distribution pole and high-voltage transmission tower in the typhoon-prone Philippines is sized using this exact force balance so it doesn’t fall on houses during storms.',
      keyTakeaways: [
        '📐 Split any diagonal pull into Horizontal (cos) and Vertical (sin)',
        '⚖️ Equilibrium rule: Left pulls MUST balance Right pulls (ΣFx = 0)',
        '⬆️ Equilibrium rule: Up pulls MUST balance Down pulls (ΣFy = 0)',
        '🔺 For two perpendicular pulls (90°): Combined Pull = √(Pull₁² + Pull₂²)',
      ],
      babyStepExample: {
        title: 'The Famous 3-4-5 Triangle Pull',
        friendlyNumbers: 'Force 1 = 30 kN pulling East; Force 2 = 40 kN pulling North.',
        steps: [
          {
            stepNumber: 1,
            action: 'Square both pulls',
            math: '30² = 900,  40² = 1600',
            plainWhy: 'Pythagorean rule for perpendicular forces.',
          },
          {
            stepNumber: 2,
            action: 'Add them together',
            math: '900 + 1600 = 2500',
            plainWhy: 'Sum of the squared forces.',
          },
          {
            stepNumber: 3,
            action: 'Take the square root',
            math: '√2500 = 50 kN',
            plainWhy: 'The diagonal combined pull is exactly 50 kN!',
          },
        ],
        bottomLine:
          'Forces perpendicular to each other form a right triangle: Resultant R = √(Fx² + Fy²).',
      },
      dontPanicTip:
        'Resolve all forces into orthogonal X and Y components before computing resultant magnitude and direction.',
    },
    workedExample: {
      problemStatement:
        'A distribution utility pole at a dead-end supports three conductor tensions: F₁ = 8 kN at 0° (due East), F₂ = 12 kN at 45°, and F₃ = 6 kN at 90° (due North). Calculate the magnitude and direction of the total horizontal resultant force acting at the pole top.',
      given: 'F₁ = 8 kN (0°), F₂ = 12 kN (45°), F₃ = 6 kN (90°)',
      find: 'Resultant magnitude R and angle θ_R',
      stepByStep: [
        'Step 1: Resolve X components: R_x = 8·cos(0°) + 12·cos(45°) + 6·cos(90°) = 8 + 12(0.7071) + 0 = 8 + 8.485 = 16.485 kN',
        'Step 2: Resolve Y components: R_y = 8·sin(0°) + 12·sin(45°) + 6·sin(90°) = 0 + 12(0.7071) + 6 = 8.485 + 6 = 14.485 kN',
        'Step 3: Magnitude: R = √(16.485² + 14.485²) = √(271.76 + 209.82) = √481.58 = 21.94 kN',
        'Step 4: Direction: θ_R = arctan(14.485 / 16.485) = arctan(0.8787) = 41.3° North of East',
      ],
      answerWithUnits: 'R = 21.94 kN at 41.3°',
    },
    fasterShortcut: {
      name: 'Orthogonal Vector Composition',
      shortcutFormula: 'R = \\sqrt{R_x^2 + R_y^2}, \\quad \\theta_R = \\arctan\\left(\\frac{R_y}{R_x}\\right)',
      conditions:
        'Valid for coplanar concurrent force systems in static equilibrium or resultant calculation.',
      warningWhenToUseFull:
        'Always check quadrant signs: if Rx is negative, add 180° to obtain the correct geometric bearing.',
    },
    quickCheck: {
      question:
        'Two perpendicular cables pull on a transmission tower with tensions of 30 kN (East) and 40 kN (North). What tension must the guy wire have to keep the tower in equilibrium?',
      choices: ['70 kN', '50 kN', '10 kN', '35 kN'],
      correctIndex: 1,
      explanation:
        'Because the forces are perpendicular (3-4-5 triangle), Resultant R = √(30² + 40²) = 50 kN. The guy wire must exert an equilibrant of exactly 50 kN in the opposite direction.',
    },
    boardStyleQuestionId: 'Q-FOUND-MECH',
  },

  // ----------------------------------------------------
  // FOUNDATION 1: ARITHMETIC, UNITS & SCIENTIFIC NOTATION
  // ----------------------------------------------------
  {
    id: 'lesson-esas-engineering-units',
    topicGroupId: 'ESAS-01',
    subtopicTitle: 'Foundation 1: Arithmetic & Units (Conversions, Prefixes & Scientific Notation)',
    conceptName: 'Foundation 1: Units, Metric Prefixes & Conversions',
    seeItType: 'units_converter',
    visualCaption:
      'Metric Ladder & Unit Bridge: Practice converting between Mega, kilo, milli, micro, nano, and pico with live unit-cancellation checks and scientific notation scaling.',
    plainExplanation:
      'Accurate unit conversion is essential in electrical engineering, where quantities span gigawatts (10⁹ W) down to picofarads (10⁻¹² F). Master the metric prefixes (k = 10³, M = 10⁶, G = 10⁹, m = 10⁻³, µ = 10⁻⁶, n = 10⁻⁹, p = 10⁻¹²). The unit cancellation method ensures units in numerators cancel denominators cleanly.',
    explainMore:
      'In electrical engineering calculations, parameters frequently appear with mixed prefixes: millimeters with meters, kilovolts with volts, and microfarads with farads. For example, in capacitor energy calculations E = ½CV², converting 47 µF into 47 × 10⁻⁶ F is necessary to yield Joules. Always reduce parameters to standard SI base units prior to substituting into governing equations.',
    formulaLatex:
      '1\\text{ kW} = 10^3\\text{ W}, \\quad 1\\text{ MVA} = 10^6\\text{ VA}, \\quad 1\\ \\mu\\text{F} = 10^{-6}\\text{ F}, \\quad 1\\text{ HP} = 746\\text{ W}',
    symbols: [
      {
        symbol: 'k (kilo)',
        name: 'Kilo Prefix (10³)',
        unit: 'Multiplier × 1,000',
        description: 'Used for kV, kW, kVA, kVAR, km',
      },
      {
        symbol: 'M (Mega)',
        name: 'Mega Prefix (10⁶)',
        unit: 'Multiplier × 1,000,000',
        description: 'Used for MW, MVA, MVAR, MΩ',
      },
      {
        symbol: 'µ (micro)',
        name: 'Micro Prefix (10⁻⁶)',
        unit: 'Multiplier × 0.000001',
        description: 'Used for µF (capacitance), µH, µA',
      },
      {
        symbol: 'n (nano)',
        name: 'Nano Prefix (10⁻⁹)',
        unit: 'Multiplier × 10⁻⁹',
        description: 'Used for nF, nH, ns',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Always convert your numbers to standard base units (Volts, Amperes, Farads, Henries, Watts) before typing them into any formula!',
      realLifeMetaphor: {
        title: 'The Currency Exchange Trick',
        story:
          'If someone says they have 500 centavos and 2 dollars, you cannot add 500 + 2 = 502! You must convert both to the same base currency first. It is the exact same in electricity: if a problem gives 12 kV and 500 mA, convert to 12,000 Volts and 0.5 Amps before multiplying to find power.',
        iconEmoji: '⚖️',
        visualTip:
          'In the Metric Ladder simulator above, select Capacitance and see how 470 µF instantly becomes 0.00047 Farads!',
      },
      whyItMatters:
        'Over 15% of multiple choice trap choices in the board exam are simply correct formulas calculated with un-converted units.',
      keyTakeaways: [
        'Kilo (k) means × 1,000 (move decimal 3 places right)',
        'Mega (M) means × 1,000,000 (move decimal 6 places right)',
        'Milli (m) means ÷ 1,000 (10⁻³)',
        'Micro (µ) means ÷ 1,000,000 (10⁻⁶)',
        '1 Horsepower (HP) = 746 Watts (Mandatory memory constant)',
      ],
      babyStepExample: {
        title: '3-Step Unit Conversion (Microfarad to Farad)',
        friendlyNumbers: 'Convert 50 µF into base Farads and find stored energy at 100 V.',
        steps: [
          {
            stepNumber: 1,
            action: 'Convert Microfarads to Farads',
            math: '50 µF = 50 × 10⁻⁶ F = 0.00005 F',
            plainWhy: 'Micro means 10 to the power of negative 6.',
          },
          {
            stepNumber: 2,
            action: 'Apply the Energy Formula',
            math: 'E = ½ · C · V² = 0.5 × (50 × 10⁻⁶) × (100²)',
            plainWhy: 'Energy is stored in the electric field between plates.',
          },
          {
            stepNumber: 3,
            action: 'Calculate Final Energy in Joules',
            math: '0.5 × 0.00005 × 10,000 = 0.25 Joules',
            plainWhy: 'Always verify your answer ends in base Joules.',
          },
        ],
        bottomLine:
          'Converting microfarads to base Farads prevents scale errors.',
      },
      dontPanicTip:
        'When encountering micro (µ), replace with 10⁻⁶ prior to evaluating powers or products.',
    },
    workedExample: {
      problemStatement:
        'A 25 HP, 230 V single-phase induction motor operates at 85% full-load efficiency. Calculate: (a) the mechanical power output in kW, and (b) the electrical power input in kW taken from the supply line.',
      given: 'P_out = 25 HP, Efficiency η = 85% = 0.85, 1 HP = 746 W',
      find: 'P_out (kW), P_in (kW)',
      stepByStep: [
        'Step 1: Convert mechanical output horsepower to Watts: P_out = 25 HP × 746 W/HP = 18,650 Watts.',
        'Step 2: Convert Watts to kilowatts: P_out = 18,650 / 1,000 = 18.65 kW.',
        'Step 3: Calculate electrical power input using efficiency: P_in = P_out / η = 18.65 kW / 0.85 = 21.94 kW.',
      ],
      answerWithUnits: 'P_out = 18.65 kW, P_in = 21.94 kW',
    },
    fasterShortcut: {
      name: 'HP to kW Direct Factor',
      shortcutFormula: 'P\\text{ (kW)} = \\text{HP} \\times 0.746',
      conditions: 'Valid for all electrical machine ratings',
      warningWhenToUseFull: 'Be sure efficiency is factored: P_input = (HP × 0.746) / efficiency',
    },
    quickCheck: {
      question: 'A capacitor is rated 100 nF. What is its capacitance in microfarads (µF)?',
      choices: ['0.1 µF', '10 µF', '0.001 µF', '1.0 µF'],
      correctIndex: 0,
      explanation: '100 nF = 100 × 10⁻⁹ F = 0.1 × 10⁻⁶ F = 0.1 µF.',
    },
    boardStyleQuestionId: 'Q-FOUND-UNIT',
  },

  // ----------------------------------------------------
  // FOUNDATION 3: GEOMETRY & TRIGONOMETRY
  // ----------------------------------------------------
  {
    id: 'lesson-math-trigonometry-triangles',
    topicGroupId: 'MATH-02',
    subtopicTitle: 'Foundation 3: Geometry & Trigonometry (Right Triangles, SOH-CAH-TOA & Radians)',
    conceptName: 'Foundation 3: Geometry & Trigonometry (Right Triangles & Vectors)',
    seeItType: 'trig_triangle',
    visualCaption:
      'Right Triangle Geometry & AC Vectors: Drag angle θ and hypotenuse R to see live SOH-CAH-TOA ratios, degrees vs radians, and how horizontal X (Resistance) and vertical Y (Reactance) form total impedance Z.',
    plainExplanation:
      'All alternating current (AC) circuit analysis is founded on right triangle trigonometry. Whenever an AC voltage drives current through a circuit with both resistance R and reactance X, they do not simply add algebraically because current and voltage are 90 degrees out of phase! Instead, they form a right triangle: Resistance R is the adjacent base, Reactance X is the opposite vertical side, and total Impedance Z is the hypotenuse: Z = √(R² + X²). Power factor is simply the cosine of the angle: cos θ = R / Z.',
    explainMore:
      'In PRC board examinations, trigonometry forms the bridge between pure math and electrical engineering. You will use SOH-CAH-TOA in three major areas: (1) AC Impedance Triangles (R, X, Z); (2) The Power Triangle (P in kW, Q in kVAR, S in kVA); and (3) Resolving line and phase voltages in 3-Phase balanced systems. Memorizing standard Pythagorean triples like 3-4-5 (θ = 36.87°) and 5-12-13 (θ = 22.62°) allows you to solve board questions by inspection in under 10 seconds.',
    formulaLatex:
      '\\sin \\theta = \\frac{\\text{Opp}}{\\text{Hyp}}, \\quad \\cos \\theta = \\frac{\\text{Adj}}{\\text{Hyp}} = \\frac{R}{Z} = \\text{pf}, \\quad \\tan \\theta = \\frac{\\text{Opp}}{\\text{Adj}} = \\frac{X}{R}, \\quad Z = \\sqrt{R^2 + X^2}',
    symbols: [
      {
        symbol: 'θ (theta)',
        name: 'Phase Angle / Triangle Angle',
        unit: 'Degrees (°) or Radians (rad)',
        description: 'Angle between voltage and current; cos θ = power factor',
      },
      {
        symbol: 'Adj (R)',
        name: 'Adjacent Side (Real Component)',
        unit: 'Ohms (Ω) or kW',
        description: 'Horizontal component doing active work or pure resistance',
      },
      {
        symbol: 'Opp (X)',
        name: 'Opposite Side (Reactive Component)',
        unit: 'Ohms (Ω) or kVAR',
        description: 'Vertical component representing inductive or capacitive reactance',
      },
      {
        symbol: 'Hyp (Z)',
        name: 'Hypotenuse (Total Magnitude)',
        unit: 'Ohms (Ω) or kVA',
        description: 'Total combined magnitude: Hyp = √(Adj² + Opp²)',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'In AC circuits, Resistance and Reactance pull at a 90-degree right angle; the combined total is the diagonal hypotenuse!',
      realLifeMetaphor: {
        title: 'Walking Across a Flowing River',
        story:
          'If you try to swim straight across a river at 4 meters per second, but the river current pushes you sideways at 3 meters per second, you don’t move at 7 m/s! You travel diagonally at √(4² + 3²) = 5 meters per second! In AC electricity, Resistance is you swimming forward, Reactance is the current pushing sideways, and total Impedance is your actual diagonal path.',
        iconEmoji: '📐',
        visualTip:
          'In the simulator above, select the classic 3-4-5 triangle and see how cos(θ) = 4/5 = 0.80 power factor!',
      },
      whyItMatters:
        'Power factor, generator synchronization, and line losses all depend directly on the cosine and sine of this right triangle.',
      keyTakeaways: [
        'SOH: sin θ = Opposite / Hypotenuse (Reactive ratio: Q / S)',
        'CAH: cos θ = Adjacent / Hypotenuse (Power factor: P / S or R / Z)',
        'TOA: tan θ = Opposite / Adjacent (Reactance ratio: X / R or Q / P)',
        'Pythagoras: Z² = R² + X² (Hypotenuse squared = Base² + Height²)',
        '3-4-5 Triangle: 3² + 4² = 5², Angle θ = 36.87°, cos θ = 0.80',
      ],
      babyStepExample: {
        title: 'Small Number Walkthrough (3-4-5 AC Circuit)',
        friendlyNumbers: 'A coil has R = 4 Ω resistance and XL = 3 Ω inductive reactance.',
        steps: [
          {
            stepNumber: 1,
            action: 'Calculate Total Impedance Z',
            math: 'Z = √(4² + 3²) = √(16 + 9) = √25 = 5 Ω',
            plainWhy: 'The resistance and reactance form the perpendicular sides of a 3-4-5 right triangle.',
          },
          {
            stepNumber: 2,
            action: 'Find the Power Factor cos θ',
            math: 'cos θ = R ÷ Z = 4 ÷ 5 = 0.80 lagging',
            plainWhy: 'Cosine is Adjacent divided by Hypotenuse.',
          },
          {
            stepNumber: 3,
            action: 'Find Circuit Current with 100 V Source',
            math: 'I = V ÷ Z = 100 V ÷ 5 Ω = 20 Amperes',
            plainWhy: 'AC current equals voltage divided by total impedance Z.',
          },
        ],
        bottomLine:
          'Recognizing 3-4-5 right triangle proportions yields Z = 5 and pf = 0.80 directly.',
      },
      dontPanicTip:
        'Standard Pythagorean triples: 3-4-5 (θ = 36.87°) and 5-12-13 (θ = 22.62°).',
    },
    workedExample: {
      problemStatement:
        'An AC circuit connected to a 220 V, 60 Hz line draws 10 Amperes at a power factor of 0.80 lagging. Calculate: (a) the phase angle θ, (b) the active real power P in Watts, (c) the reactive power Q in VARs, and (d) the apparent power S in VA.',
      given: 'V = 220 V, I = 10 A, pf = cos θ = 0.80 lagging',
      find: 'θ, P (W), Q (VAR), S (VA)',
      stepByStep: [
        'Step 1: Calculate apparent power S: S = V · I = 220 V × 10 A = 2,200 VA.',
        'Step 2: Calculate real power P: P = S · cos θ = 2,200 VA × 0.80 = 1,760 Watts.',
        'Step 3: Find phase angle θ: θ = arccos(0.80) = 36.87°.',
        'Step 4: Calculate reactive power Q: Q = S · sin(36.87°) = 2,200 × 0.60 = 1,320 VAR (inductive).',
      ],
      answerWithUnits: 'θ = 36.87°, P = 1,760 W, Q = 1,320 VAR, S = 2,200 VA',
    },
    fasterShortcut: {
      name: '0.80 and 0.60 Complementary Pair',
      shortcutFormula: '\\text{If } \\cos \\theta = 0.80, \\text{ then } \\sin \\theta = 0.60 \\quad (\\text{and vice-versa})',
      conditions: 'Valid for all 3-4-5 right triangle proportions',
      warningWhenToUseFull: 'If power factor is not 0.8 or 0.6, compute sin θ = sin(arccos(pf))',
    },
    quickCheck: {
      question: 'An impedance coil has a resistance of 6 Ω and an inductive reactance of 8 Ω. What is the total impedance Z?',
      choices: ['14 Ω', '10 Ω', '2 Ω', '48 Ω'],
      correctIndex: 1,
      explanation: 'Z = √(6² + 8²) = √(36 + 64) = √100 = 10 Ω (6-8-10 is a scaled 3-4-5 triangle).',
    },
    boardStyleQuestionId: 'Q-FOUND-TRIG',
  },

  // ----------------------------------------------------
  // FOUNDATION 4: COMPLEX NUMBERS & VECTORS
  // ----------------------------------------------------
  {
    id: 'lesson-math-complex-numbers',
    topicGroupId: 'MATH-03',
    subtopicTitle: 'Foundation 4: Complex Numbers & Vectors (Rectangular and Polar Forms)',
    conceptName: 'Foundation 4: Complex Numbers & Phasor Vectors',
    seeItType: 'complex_numbers',
    visualCaption:
      'Argand Complex Plane: Visualize rectangular impedance (R + jX) and polar form (Z ∠ θ) with live vector addition and complex conjugate operations.',
    plainExplanation:
      'Complex numbers are the standard representation in electrical engineering. We use the operator j (where j = √(-1)) to represent quantities rotated 90 degrees in the complex plane. A complex impedance Z = R + jX consists of real resistance R and imaginary reactance jX. In rectangular form (R + jX), addition and subtraction sum real and imaginary components separately. In polar form (Z ∠ θ), multiplication multiplies magnitudes and adds phase angles.',
    explainMore:
      'Phasor notation simplifies steady-state AC circuit analysis by converting linear differential equations into algebraic operations. Series impedances add directly in rectangular form: Z_total = (R₁ + R₂) + j(X₁ + X₂). Parallel impedances are calculated using product-over-sum: Z_total = (Z₁ · Z₂) / (Z₁ + Z₂). Polar form enables direct Ohm’s Law division: I = V / Z = (|V|/|Z|) ∠ (θ_v - θ_z).',
    formulaLatex:
      'Z = R + jX = |Z| \\angle \\theta, \\quad |Z| = \\sqrt{R^2 + X^2}, \\quad \\theta = \\arctan\\left(\\frac{X}{R}\\right), \\quad Z_1 \\cdot Z_2 = (r_1 r_2) \\angle (\\theta_1 + \\theta_2)',
    symbols: [
      {
        symbol: 'j',
        name: 'Imaginary Operator',
        unit: 'Dimensionless (√(-1))',
        description: 'Rotates a phasor by +90° counter-clockwise',
      },
      {
        symbol: 'R + jX',
        name: 'Rectangular Form',
        unit: 'Ohms (Ω)',
        description: 'Used for series addition: Z_total = (R₁ + R₂) + j(X₁ + X₂)',
      },
      {
        symbol: '|Z| ∠ θ',
        name: 'Polar Form',
        unit: 'Ohms (Ω)',
        description: 'Used for Ohm’s Law division: I = V / Z = (|V|/|Z|) ∠ (θ_v - θ_z)',
      },
      {
        symbol: 'Z*',
        name: 'Complex Conjugate',
        unit: 'R - jX',
        description: 'Inverts imaginary sign; used in apparent power S = V · I*',
      },
    ],
    simplifiedGuide: {
      oneSentenceSummary:
        'Use Rectangular form (R + jX) when adding series impedances; use Polar form (Z ∠ θ) when multiplying or dividing.',
      realLifeMetaphor: {
        title: 'GPS Coordinates vs Compass Distance',
        story:
          'In rectangular form, you specify 4 units East and 3 units North (4 + j3). In polar form, you specify 5 units distance at 36.87 degrees (5 ∠ 36.87°). Both represent the same phasor location in the complex plane.',
        iconEmoji: '🧭',
        visualTip:
          'In the Complex Plane visualizer above, drag R and X to see how the vector rotates and changes length.',
      },
      whyItMatters:
        'AC power flow, line impedance, and transformer modeling rely on phasor calculations.',
      keyTakeaways: [
        'j = √(-1); multiplying by j rotates a vector 90° counter-clockwise',
        'j² = -1 (180° rotation)',
        '+jX is Inductive (current lags voltage)',
        '-jX is Capacitive (current leads voltage)',
        'Polar division: Divide magnitudes, subtract angles',
      ],
      babyStepExample: {
        title: 'AC Ohm’s Law in Polar Form',
        friendlyNumbers: 'An AC voltage V = 100 ∠ 0° V is applied across impedance Z = 4 + j3 Ω.',
        steps: [
          {
            stepNumber: 1,
            action: 'Convert Impedance to Polar Form',
            math: 'Z = 4 + j3 = √(4² + 3²) ∠ arctan(3/4) = 5 ∠ 36.87° Ω',
            plainWhy: 'Polar form simplifies division.',
          },
          {
            stepNumber: 2,
            action: 'Divide Voltage by Impedance',
            math: 'I = V ÷ Z = (100 ∠ 0°) ÷ (5 ∠ 36.87°)',
            plainWhy: 'Divide magnitude (100 ÷ 5 = 20) and subtract angle (0° - 36.87° = -36.87°).',
          },
          {
            stepNumber: 3,
            action: 'Write Current Phasor',
            math: 'I = 20 ∠ -36.87° A',
            plainWhy: 'Current lags voltage by 36.87 degrees.',
          },
        ],
        bottomLine:
          'AC Ohm’s Law divides magnitudes and subtracts phase angles.',
      },
      dontPanicTip:
        'Keep angles in degrees when evaluating trigonometric functions in polar calculations.',
    },
    workedExample: {
      problemStatement:
        'Two impedances Z₁ = 10 + j15 Ω and Z₂ = 6 - j8 Ω are connected in parallel across a 240 V, 60 Hz AC source. Calculate: (a) equivalent parallel impedance Z_eq, (b) total current I_total, and (c) overall power factor.',
      given: 'Z₁ = 10 + j15 Ω, Z₂ = 6 - j8 Ω, V = 240 ∠ 0° V',
      find: 'Z_eq, I_total, pf',
      stepByStep: [
        'Step 1: Calculate product: Z₁ · Z₂ = (10 + j15)(6 - j8) = 60 - j80 + j90 - j²120 = 180 + j10 Ω²',
        'Step 2: Calculate sum: Z₁ + Z₂ = (10 + 6) + j(15 - 8) = 16 + j7 Ω',
        'Step 3: Evaluate parallel ratio: Z_eq = (180 + j10) / (16 + j7) = 10.37 ∠ 8.21° Ω = 10.26 + j1.48 Ω',
        'Step 4: Calculate total current: I_total = V / Z_eq = (240 ∠ 0°) / (10.37 ∠ 8.21°) = 23.14 ∠ -8.21° A',
        'Step 5: Power factor: pf = cos(-8.21°) = 0.99 lagging',
      ],
      answerWithUnits: 'Z_eq = 10.37 ∠ 8.21° Ω, I_total = 23.14 ∠ -8.21° A, pf = 0.99 lagging',
    },
    fasterShortcut: {
      name: 'Admittance Parallel Addition',
      shortcutFormula: 'Y_{eq} = Y_1 + Y_2 = \\frac{1}{Z_1} + \\frac{1}{Z_2}, \\quad Z_{eq} = \\frac{1}{Y_{eq}}',
      conditions: 'Valid for parallel AC impedance networks.',
      warningWhenToUseFull: 'Ensure complex admittance inversion handles real conductances and imaginary susceptances correctly.',
    },
    quickCheck: {
      question: 'What is the polar form of the complex number Z = 3 + j4?',
      choices: ['5 ∠ 53.13°', '5 ∠ 36.87°', '7 ∠ 45°', '1 ∠ 90°'],
      correctIndex: 0,
      explanation: 'Magnitude |Z| = √(3² + 4²) = 5; Angle θ = arctan(4/3) = 53.13°.',
    },
    boardStyleQuestionId: 'Q-FOUND-COMPLEX',
  },
];
