export interface FoundationTopic {
  id: string;
  stageNumber: number;
  stageName: string;
  topicTitle: string;
  summary: string;
  keyConcepts: string[];
  lessonId?: string; // Linked lesson in lessonsData.ts
  isUnlockFoundation?: boolean; // One of the 5 starting points
  unlockOrder?: number; // 1 to 5
}

export interface FoundationStage {
  stageNumber: number;
  stageName: string;
  stageShortTitle: string;
  description: string;
  mentalModel?: string;
  topics: FoundationTopic[];
}

export const FIVE_UNLOCK_FOUNDATIONS = [
  {
    step: 1,
    title: 'Unit Conversions & Metric Prefixes',
    why: 'Handling mm vs m, kV vs V, µF vs F accurately to prevent errors in equations.',
    lessonId: 'lesson-esas-engineering-units',
  },
  {
    step: 2,
    title: 'Algebraic Rearrangement',
    why: 'Rearranging formulas (such as V = IR to I = V/R) and isolating unknown variables.',
    lessonId: 'lesson-math-algebra-fundamentals',
  },
  {
    step: 3,
    title: 'Geometry & Trigonometry',
    why: 'Right triangles, sine, cosine, tangent, and radians forming the foundation of AC phasors.',
    lessonId: 'lesson-math-trigonometry-triangles',
  },
  {
    step: 4,
    title: 'Complex Numbers & Vectors',
    why: 'Converting rectangular (R + jX) to polar (Z ∠ θ) form for AC circuit analysis.',
    lessonId: 'lesson-math-complex-numbers',
  },
  {
    step: 5,
    title: 'DC Circuits (Ohm’s Law & Loops)',
    why: 'Voltage drives, Current flows, Resistance opposes. Core equations V = IR and P = VI.',
    lessonId: 'lesson-ee-absolute-basics-zero',
  },
];

export const FIVE_STEP_ROUTINE = [
  {
    step: 1,
    name: 'Understand a Diagram',
    description: 'Look at the visual schematic or physical flow first. Form a clear mental picture before touching equations.',
  },
  {
    step: 2,
    name: 'Solve an Easy Example',
    description: 'Test the concept with friendly, small numbers (1, 2, 4, 12) so you can do the arithmetic in your head.',
  },
  {
    step: 3,
    name: 'Solve a Standard Problem',
    description: 'Tackle a standard textbook or review center problem with realistic engineering values and units.',
  },
  {
    step: 4,
    name: 'Timed Practice Problem',
    description: 'Solve an engineering multiple-choice problem under a focused 2 to 3-minute target time.',
  },
  {
    step: 5,
    name: 'Review Mistake & Analytical Insight',
    description: 'Analyze why wrong choices appeared plausible and consolidate the direct analytical solution.',
  },
];

export const FOUNDATION_STAGES: FoundationStage[] = [
  {
    stageNumber: 1,
    stageName: 'Math You Will Use Everywhere',
    stageShortTitle: 'Everyday Engineering Math',
    description:
      'The foundational mathematical tools needed in every single electrical calculation. Master these first to eliminate algebra stumbling blocks.',
    topics: [
      {
        id: 'math-arithmetic-units',
        stageNumber: 1,
        stageName: 'Math You Will Use Everywhere',
        topicTitle: 'Arithmetic & Units',
        summary: 'Fractions, percentages, ratios, powers of 10, scientific notation, and metric unit conversions (k, M, m, µ, n, p).',
        keyConcepts: ['Metric prefixes (k, M, G, m, µ, n, p)', 'Scientific notation', 'Unit cancellation method', 'Fractions & ratios'],
        lessonId: 'lesson-esas-engineering-units',
        isUnlockFoundation: true,
        unlockOrder: 1,
      },
      {
        id: 'math-algebra-rearrange',
        stageNumber: 1,
        stageName: 'Math You Will Use Everywhere',
        topicTitle: 'Algebra & Rearranging Formulas',
        summary: 'Rearranging equations, isolating variables, exponents, logarithms, quadratic equations, and simultaneous linear systems.',
        keyConcepts: ['Isolating variables', 'System of linear equations (2 & 3 unknowns)', 'Quadratic formula', 'Logarithms & decibels (dB)'],
        lessonId: 'lesson-math-algebra-fundamentals',
        isUnlockFoundation: true,
        unlockOrder: 2,
      },
      {
        id: 'math-trig-triangles',
        stageNumber: 1,
        stageName: 'Math You Will Use Everywhere',
        topicTitle: 'Geometry & Trigonometry',
        summary: 'Right triangles, Pythagorean theorem, sine, cosine, tangent, inverse trig, angles, and radians.',
        keyConcepts: ['SOH-CAH-TOA', 'Pythagorean triple: 3-4-5, 5-12-13', 'Degrees vs Radians (π rad = 180°)', 'Vector components (X = R cos θ, Y = R sin θ)'],
        lessonId: 'lesson-math-trigonometry-triangles',
        isUnlockFoundation: true,
        unlockOrder: 3,
      },
      {
        id: 'math-complex-vectors',
        stageNumber: 1,
        stageName: 'Math You Will Use Everywhere',
        topicTitle: 'Complex Numbers & Vectors',
        summary: 'Rectangular (a + jb) and polar (r ∠ θ) representations, vector addition, complex multiplication, conjugates, and phasor transformations.',
        keyConcepts: ['j = √(-1)', 'Rectangular to Polar conversion', 'Phasor multiplication and division', 'Impedance representation (Z = R + jX)'],
        lessonId: 'lesson-math-complex-numbers',
        isUnlockFoundation: true,
        unlockOrder: 4,
      },
      {
        id: 'math-calculus-meaning',
        stageNumber: 1,
        stageName: 'Math You Will Use Everywhere',
        topicTitle: 'Calculus & Physical Meaning',
        summary: 'Derivatives as rates of change (i = dq/dt, v = L di/dt) and integrals as accumulation (q = ∫ i dt, energy = ∫ p dt).',
        keyConcepts: ['Rate of change (dq/dt)', 'Accumulation of energy', 'Inductor voltage: v = L di/dt', 'Capacitor current: i = C dv/dt'],
        lessonId: 'lesson-math-calculus',
      },
      {
        id: 'math-further-eng',
        stageNumber: 1,
        stageName: 'Math You Will Use Everywhere',
        topicTitle: 'Further Engineering Math',
        summary: 'Matrices and determinants, basic probability & statistics, differential equations, numerical methods, and Laplace transforms.',
        keyConcepts: ['Cramer’s rule for mesh analysis', 'First-order differential equations', 'Laplace s-domain (s = jω)', 'Mean, standard deviation'],
      },
    ],
  },
  {
    stageNumber: 2,
    stageName: 'Physical Ideas Behind Electricity',
    stageShortTitle: 'Physics of Electricity & ESAS',
    description:
      'The physical reality of charges and fields. A useful picture to hold in mind: voltage drives, current flows, resistance opposes, and power tells you how fast energy is used.',
    mentalModel: 'Voltage drives, Current flows, Resistance opposes, and Power tells you how fast energy is used.',
    topics: [
      {
        id: 'phys-charge-voltage',
        stageNumber: 2,
        stageName: 'Physical Ideas Behind Electricity',
        topicTitle: 'Electric Charge, Voltage & Current',
        summary: 'Electric charge (Coulombs), current as flow of charges (dq/dt), voltage as electric potential difference (Joules/Coulomb).',
        keyConcepts: ['Electron charge: 1.602 × 10⁻¹⁹ C', 'Current: 1 Ampere = 1 Coulomb/sec', 'Voltage: 1 Volt = 1 Joule/Coulomb', 'Electromotive force (EMF)'],
        lessonId: 'lesson-ee-absolute-basics-zero',
        isUnlockFoundation: true,
        unlockOrder: 5,
      },
      {
        id: 'phys-energy-power',
        stageNumber: 2,
        stageName: 'Physical Ideas Behind Electricity',
        topicTitle: 'Energy, Work & Electric Power',
        summary: 'Power as the rate of using energy (Watts = Joules/second). Conservation of energy: power delivered equals power absorbed.',
        keyConcepts: ['P = V · I = I²R = V² / R', 'Work and energy in Joules & kWh', '1 kWh = 3.6 × 10⁶ Joules', 'Thermal dissipation (Joule heating)'],
        lessonId: 'lesson-ee-absolute-basics-zero',
      },
      {
        id: 'phys-fields-induction',
        stageNumber: 2,
        stageName: 'Physical Ideas Behind Electricity',
        topicTitle: 'Electric Fields, Magnetic Fields & Induction',
        summary: 'Coulomb’s law, magnetic flux, Faraday’s law of electromagnetic induction (e = -N dΦ/dt), and Lenz’s law.',
        keyConcepts: ['Electric field intensity (E = V / d)', 'Magnetic flux (Φ = B · A)', 'Faraday’s law of induction', 'Lenz’s law (opposing direction)'],
      },
      {
        id: 'phys-esas-allied',
        stageNumber: 2,
        stageName: 'Physical Ideas Behind Electricity',
        topicTitle: 'Mechanics, Heat, Fluids & Chemistry (ESAS)',
        summary: 'Engineering Sciences: forces, torque, work, thermal expansion, specific heat, fluid pressure, and chemical reactions for battery storage.',
        keyConcepts: ['Torque: T = F · r (N·m)', 'Heat energy: Q = m · c · ΔT', 'Fluid head pressure (P = ρgh)', 'Battery electrochemistry (lead-acid, lithium)'],
      },
    ],
  },
  {
    stageNumber: 3,
    stageName: 'Circuit Fundamentals',
    stageShortTitle: 'DC Circuit Fundamentals (Sequence)',
    description:
      'Mastery check: Given a simple circuit diagram, you can find its currents, voltages, and power—and explain whether each answer makes physical sense.',
    topics: [
      {
        id: 'circ-symbols-connections',
        stageNumber: 3,
        stageName: 'Circuit Fundamentals',
        topicTitle: '1. Circuit Symbols, Units, Series & Parallel',
        summary: 'Standard schematic symbols, series string behavior (voltages add), and parallel branch behavior (currents add).',
        keyConcepts: ['Schematic symbols (resistor, battery, switch, ground)', 'Series: R_total = R1 + R2 + ...', 'Parallel: 1/R_total = 1/R1 + 1/R2 + ...', 'Voltage identical across parallel branches'],
        lessonId: 'lesson-ee-basic-dc-circuits',
      },
      {
        id: 'circ-ohms-law-power',
        stageNumber: 3,
        stageName: 'Circuit Fundamentals',
        topicTitle: '2. Ohm’s Law & Electric Power',
        summary: 'V = IR and the power formulas P = VI, P = I²R, P = V²/R. Understanding how changing resistance alters current and heat.',
        keyConcepts: ['V = I · R', 'P = V · I', 'P = I² · R (heating loss)', 'P = V² / R'],
        lessonId: 'lesson-ee-absolute-basics-zero',
      },
      {
        id: 'circ-kirchhoff-laws',
        stageNumber: 3,
        stageName: 'Circuit Fundamentals',
        topicTitle: '3. Kirchhoff’s Current & Voltage Laws (KCL & KVL)',
        summary: 'KCL (Conservation of Charge): ΣI entering = ΣI leaving. KVL (Conservation of Energy): ΣV in any closed loop = 0.',
        keyConcepts: ['KCL at junction nodes', 'KVL around closed loops', 'Sign conventions for voltage drops and rises', 'Voltage divider: Vx = Vs · (Rx / R_total)'],
        lessonId: 'lesson-ee-basic-dc-circuits',
      },
      {
        id: 'circ-node-mesh',
        stageNumber: 3,
        stageName: 'Circuit Fundamentals',
        topicTitle: '4. Node and Mesh Analysis',
        summary: 'Systematic circuit solving using Node Voltage Method (KCL equations) and Mesh Current Method (KVL equations).',
        keyConcepts: ['Reference ground node', 'Essential nodes & supernodes', 'Mesh currents & supermesh', 'Matrix equation formulation'],
      },
      {
        id: 'circ-thevenin-norton',
        stageNumber: 3,
        stageName: 'Circuit Fundamentals',
        topicTitle: '5. Thevenin & Norton Equivalents',
        summary: 'Simplifying any linear circuit into an equivalent voltage source (Vth) in series with Rth, or current source (In) in parallel with Rth.',
        keyConcepts: ['Open-circuit voltage (Voc = Vth)', 'Short-circuit current (Isc = In)', 'Thevenin resistance (Rth = Voc / Isc)', 'Maximum power transfer: R_load = Rth'],
      },
      {
        id: 'circ-capacitors-inductors',
        stageNumber: 3,
        stageName: 'Circuit Fundamentals',
        topicTitle: '6. Capacitors, Inductors & Stored Energy',
        summary: 'Capacitor electric field storage (E = ½CV²) and inductor magnetic field storage (E = ½LI²). Continuity of state.',
        keyConcepts: ['Capacitor: i = C dv/dt, voltage cannot change instantly', 'Inductor: v = L di/dt, current cannot change instantly', 'Capacitors in parallel add (C1 + C2)', 'Inductors in series add (L1 + L2)'],
      },
      {
        id: 'circ-transients',
        stageNumber: 3,
        stageName: 'Circuit Fundamentals',
        topicTitle: '7. Circuit Switching & Transient Response',
        summary: 'First-order RC and RL transient response. Time constant τ = RC and τ = L/R. Exponential charging and discharging curves.',
        keyConcepts: ['Time constant: τ = R · C (seconds)', 'Time constant: τ = L / R (seconds)', '5τ rule (steady state reached at 5 time constants)', 'Charging formula: v(t) = V_final + (V_initial - V_final) · e^(-t/τ)'],
      },
    ],
  },
  {
    stageNumber: 4,
    stageName: 'AC Circuits',
    stageShortTitle: 'AC Circuits & Power Systems Bridge',
    description:
      'Build from sine waves → frequency and phase → phasors → impedance → AC circuit analysis. Then study resonance, power factor, real/reactive/apparent power, and single-phase and three-phase systems. This is the bridge to transformers, motors, generators, and power systems.',
    topics: [
      {
        id: 'ac-sine-phasors',
        stageNumber: 4,
        stageName: 'AC Circuits',
        topicTitle: 'Sine Waves, Frequency, Phase & Phasors',
        summary: 'Sinusoidal AC voltage and current: v(t) = Vm sin(ωt + φ). Angular frequency ω = 2πf, RMS values (Vrms = Vm / √2).',
        keyConcepts: ['Philippine grid frequency: f = 60 Hz (ω = 377 rad/s)', 'V_rms = V_peak / √2 ≈ 0.707 V_peak', 'Phase difference (lead vs lag)', 'Phasor transformation into complex plane'],
      },
      {
        id: 'ac-impedance-analysis',
        stageNumber: 4,
        stageName: 'AC Circuits',
        topicTitle: 'AC Impedance & R-L-C Circuit Analysis',
        summary: 'Inductive reactance (XL = 2πfL) and capacitive reactance (XC = 1 / (2πfC)). Total impedance Z = R + j(XL - XC).',
        keyConcepts: ['XL = 2πfL (causes current to lag by 90°)', 'XC = 1 / (2πfC) (causes current to lead by 90°)', 'Impedance magnitude: |Z| = √(R² + X²)', 'Phase angle: θ = arctan(X / R)'],
        lessonId: 'lesson-ee-rlc-circuits',
      },
      {
        id: 'ac-resonance',
        stageNumber: 4,
        stageName: 'AC Circuits',
        topicTitle: 'AC Resonance (Series & Parallel)',
        summary: 'Resonance condition where inductive and capacitive reactances cancel (XL = XC). Net impedance is purely resistive (Z = R).',
        keyConcepts: ['Resonant frequency: fr = 1 / [2π√(LC)]', 'Unity power factor at resonance (pf = 1.0)', 'Series resonance: minimum impedance, maximum current', 'Parallel resonance: maximum impedance, minimum line current'],
        lessonId: 'lesson-ee-rlc-circuits',
      },
      {
        id: 'ac-power-triangle',
        stageNumber: 4,
        stageName: 'AC Circuits',
        topicTitle: 'Real, Reactive, Apparent Power & Power Factor',
        summary: 'The Power Triangle: Real power P (kW), Reactive power Q (kVAR), Apparent power S (kVA). Power factor cos θ and shunt capacitor sizing.',
        keyConcepts: ['P = S · cos θ (working active power in kW)', 'Q = S · sin θ (magnetizing reactive power in kVAR)', 'S = √(P² + Q²) = V · I (apparent power in kVA)', 'Capacitor sizing: Qc = P · (tan θ1 - tan θ2)'],
        lessonId: 'lesson-ee-power-factor',
      },
      {
        id: 'ac-three-phase',
        stageNumber: 4,
        stageName: 'AC Circuits',
        topicTitle: 'Three-Phase Systems (Wye & Delta Connections)',
        summary: 'Balanced 3-phase circuits. Wye connection (V_line = √3 · V_phase, I_line = I_phase) and Delta connection (V_line = V_phase, I_line = √3 · I_phase). Total 3-phase power S = √3 · V_LL · I_L.',
        keyConcepts: ['Wye (Y): Line-to-line voltage is √3 × Phase voltage', 'Delta (Δ): Line current is √3 × Phase current', 'Total 3-Phase Real Power: P = √3 · V_LL · I_L · cos θ', 'Neutral wire in 4-wire Wye carry zero current in balanced load'],
      },
    ],
  },
  {
    stageNumber: 5,
    stageName: 'Electrical Equipment & Power',
    stageShortTitle: 'Equipment, Power Systems & Code',
    description:
      'Transformers, electric machines, generation, transmission, distribution, protection, and practical Philippine Electrical Code (PEC) design.',
    topics: [
      {
        id: 'eq-transformers',
        stageNumber: 5,
        stageName: 'Electrical Equipment & Power',
        topicTitle: 'Magnetic Circuits & Transformers',
        summary: 'Magnetic flux, turns ratio (a = N1/N2 = V1/V2 = I2/I1), reflected impedance (Z1 = a² · Z2), open-circuit and short-circuit tests, efficiency.',
        keyConcepts: ['Turns ratio: a = V1 / V2 = I2 / I1', 'Impedance reflection: Z1 = a² · Z2', 'Transformer losses: Core loss (hysteresis + eddy current) + Copper loss (I²R)', 'Efficiency: η = Output / (Output + Losses)'],
        lessonId: 'lesson-ee-transformer',
      },
      {
        id: 'eq-machines-motors',
        stageNumber: 5,
        stageName: 'Electrical Equipment & Power',
        topicTitle: 'Electric Machines (DC & AC Motors / Generators)',
        summary: 'DC machines (shunt, series, compound), 3-phase induction motors (slip, torque-speed curve), synchronous machines, starters, speed control.',
        keyConcepts: ['Synchronous speed: Ns = 120 · f / P', 'Slip: s = (Ns - Nr) / Ns', 'Rotor frequency: fr = s · f', 'Motor horsepower: 1 HP = 746 Watts'],
      },
      {
        id: 'eq-power-systems',
        stageNumber: 5,
        stageName: 'Electrical Equipment & Power',
        topicTitle: 'Power Systems: Generation, Transmission & Grid',
        summary: 'Generation, transmission lines (ABCD parameters, Ferranti effect), distribution, substations, fault analysis, and system grounding.',
        keyConcepts: ['Per-unit system (pu)', 'Transmission line voltage regulation (%VR)', 'Ferranti effect (voltage rise on unloaded long lines)', 'Symmetrical fault current calculation: If = V_th / Z_th'],
        lessonId: 'lesson-ee-transmission',
      },
      {
        id: 'eq-electronics-controls',
        stageNumber: 5,
        stageName: 'Electrical Equipment & Power',
        topicTitle: 'Electronics, Power Electronics & Controls',
        summary: 'Diodes, half-wave and full-wave rectifiers, smoothing filters, transistors (BJT, MOSFET), thyristors, and basic feedback control.',
        keyConcepts: ['Rectifier DC output voltage: Vdc = 2 Vm / π (Full-wave)', 'Peak Inverse Voltage (PIV)', 'Filter ripple factor', 'Closed loop transfer function'],
      },
      {
        id: 'eq-pec-practical-design',
        stageNumber: 5,
        stageName: 'Electrical Equipment & Power',
        topicTitle: 'Practical Design & Philippine Electrical Code (PEC)',
        summary: 'PEC rules: branch circuit sizing, feeder ampacity, overcurrent protection, grounding conductor sizing, illumination, and voltage drop limits.',
        keyConcepts: ['Maximum branch circuit voltage drop: 3% (5% overall with feeder)', 'Continuous load factor: 125% ampacity rating', 'Conductor ampacity tables (PEC Table 3.10)', 'Standard breaker trip ratings (15A, 20A, 30A, 40A, 50A...)'],
      },
    ],
  },
  {
    stageNumber: 6,
    stageName: 'Applied Problem Solving & Engineering Standards',
    stageShortTitle: 'Applied Problem Solving',
    description:
      'Curriculum organized across Electrical Engineering Subjects (45%), Engineering Sciences and Allied Subjects (30%), and Applied Mathematics (25%). For each topic, follow the structured 5-step problem workflow.',
    topics: [
      {
        id: 'board-five-step-routine',
        stageNumber: 6,
        stageName: 'Applied Problem Solving & Engineering Standards',
        topicTitle: 'The 5-Step Solving Routine for Every Topic',
        summary: '1. Understand a diagram -> 2. Solve an easy example -> 3. Solve a standard problem -> 4. Timed problem analysis -> 5. Review mistake & analytical insight.',
        keyConcepts: ['Direct physical check', 'Order of magnitude check', 'Time management: 2 to 3 minutes per question', 'Direct analytical derivation'],
      },
      {
        id: 'board-engineering-economics',
        stageNumber: 6,
        stageName: 'Board-Exam Knowledge & Solving Skills',
        topicTitle: 'Engineering Economics (ESAS)',
        summary: 'Time value of money, simple and compound interest, present worth, future worth, annuities, depreciation, and rate of return.',
        keyConcepts: ['Future worth: F = P(1 + i)ⁿ', 'Uniform series present worth (P/A, i, n)', 'Straight-line depreciation: d = (C - Sv) / n', 'Capitalized cost'],
      },
      {
        id: 'board-law-ethics',
        stageNumber: 6,
        stageName: 'Board-Exam Knowledge & Solving Skills',
        topicTitle: 'RA 7920 (New Electrical Engineering Law) & Code of Ethics',
        summary: 'Republic Act 7920: Qualifications, board powers, practice scopes (PEE, REE, RME), penalties, and professional code of ethics.',
        keyConcepts: ['RA 7920 promulgation date and provisions', 'Field of practice for PEE, REE, RME', 'Illegal practice penalties', 'Board of Electrical Engineering composition'],
      },
    ],
  },
];
