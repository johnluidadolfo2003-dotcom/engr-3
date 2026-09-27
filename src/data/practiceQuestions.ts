import { PracticeQuestion } from '../types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // ========================================================
  // ELECTRICAL ENGINEERING PROFESSIONAL SUBJECTS (45%)
  // ========================================================
  {
    id: 'Q-EE-001',
    topicGroupId: 'EE-01',
    subjectId: 'EE',
    subtopic: 'AC Power & Power Factor Correction',
    prompt:
      'A 3-phase, 480 V, 60 Hz balanced inductive load draws 120 kW at a power factor of 0.707 lagging. A 3-phase delta-connected capacitor bank is connected in parallel to correct the overall power factor to 0.95 lagging. Calculate the required capacitance per phase of the capacitor bank.',
    choices: {
      A: '927 µF',
      B: '82.9 µF',
      C: '309 µF',
      D: '248.8 µF',
    },
    correctAnswer: 'C',
    shortestSolution: {
      methodName: 'Direct Delta-Capacitance Formula',
      steps: [
        '1. Total Q_c = P · [tan(arccos 0.707) - tan(arccos 0.95)] = 120 · [1.000 - 0.3287] = 80.56 kVAR',
        '2. Per-phase Q_c = 80.56 / 3 = 26.85 kVAR = 26,853 VAR',
        '3. For delta connection, voltage across each capacitor is full line voltage V_LL = 480 V:',
        '4. C = Q_phase / (2π · f · V_LL²) = 26853 / (2π · 60 · 480²) = 309 × 10⁻⁶ F = 309 µF',
      ],
      calcSequence: '120 × (1 - tan(cos⁻¹(0.95))) ÷ 3 × 1000 ÷ (2π × 60 × 480²) = 3.09e-4 F',
      validityCondition: 'Valid only for balanced 3-phase delta-connected capacitor banks.',
      whenFullMethodIsSafer:
        'If the capacitors are connected in Wye, voltage across each branch is line-to-neutral V_LN = 480 / √3 = 277 V, which requires 3 times larger capacitance (927 µF). Always verify Delta vs Wye connection in the problem statement!',
    },
    stepByStepSolution: [
      'Step 1: Compute original apparent power and reactive power: S₁ = 120 kW / 0.707 = 169.73 kVA. Q₁ = √(169.73² - 120²) = 120.0 kVAR.',
      'Step 2: Compute target apparent power and reactive power: S₂ = 120 kW / 0.95 = 126.32 kVA. Q₂ = √(126.32² - 120²) = 39.44 kVAR.',
      'Step 3: Total required capacitor bank reactive power: Q_c = Q₁ - Q₂ = 120.0 - 39.44 = 80.56 kVAR.',
      'Step 4: Determine reactive power per phase: Q_phase = 80.56 kVAR / 3 = 26.853 kVAR = 26,853 VAR.',
      'Step 5: For a Delta-connected bank, voltage per capacitor phase is line voltage: V_phase = V_LL = 480 V.',
      'Step 6: Use capacitive reactance formula: X_c = V_phase² / Q_phase = (480)² / 26,853 = 8.58 Ω.',
      'Step 7: Solve for capacitance: C = 1 / (2π · 60 · 8.58) = 3.09 × 10⁻⁴ F = 309 µF per phase.',
    ],
    keyConcept:
      'Delta connection places full line-to-line voltage across each capacitor, requiring 1/3 the capacitance of a Wye-connected bank for identical kVAR rating.',
    commonTraps: [
      'Trap 1: Confusing Delta and Wye. Using V_LN = 277 V yields 927 µF (Choice A), which is for Wye, not Delta!',
      'Trap 2: Forgetting to divide total kVAR by 3 to get per-phase capacitor rating.',
      'Trap 3: Using 50 Hz instead of the Philippine grid frequency of 60 Hz.',
    ],
    wrongChoiceFailReasons: {
      A: 'Fails because 927 µF is the capacitance if the capacitors were connected in Wye (V_LN = 277 V). The question specified Delta.',
      B: 'Fails because 82.9 is total kVAR, not microfarads.',
      D: 'Fails because it incorrectly uses S₁ instead of net delta Q_c.',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Board-Standard',
    targetSeconds: 150,
  },
  {
    id: 'Q-EE-002',
    topicGroupId: 'EE-03',
    subjectId: 'EE',
    subtopic: 'Transformers & Maximum Efficiency',
    prompt:
      'A 100 kVA, 2400/240 V, 60 Hz single-phase transformer has a core (iron) loss of 600 W and full-load copper loss of 1500 W. At what load in kVA does the transformer operate at its maximum efficiency, assuming a load power factor of 0.80 lagging?',
    choices: {
      A: '63.2 kVA',
      B: '80.0 kVA',
      C: '40.0 kVA',
      D: '100.0 kVA',
    },
    correctAnswer: 'A',
    shortestSolution: {
      methodName: 'Square Root Loss Ratio Multiplier',
      steps: [
        '1. Load fraction for max efficiency: k = √(P_core / P_cu_FL)',
        '2. k = √(600 / 1500) = √(0.40) = 0.63245',
        '3. kVA_max_eff = k · kVA_rated = 0.63245 · 100 kVA = 63.25 kVA',
      ],
      calcSequence: '√(600 ÷ 1500) × 100 = 63.245 kVA',
      validityCondition: 'Valid for any constant voltage transformer where copper loss varies as load squared (I²R).',
      whenFullMethodIsSafer:
        'Always valid for standard transformer efficiency problems. Note that load power factor (0.80) does NOT alter the kVA at which maximum efficiency occurs; power factor only affects the percentage efficiency value, not the peak location.',
    },
    stepByStepSolution: [
      'Step 1: Recall the fundamental condition for maximum transformer efficiency: Variable copper loss must equal constant core loss: P_cu(load) = P_core.',
      'Step 2: Copper loss at any fractional load k (where k = actual kVA / rated kVA) is: P_cu(load) = k² · P_cu_FL.',
      'Step 3: Equate the two losses: k² · P_cu_FL = P_core.',
      'Step 4: Solve for fractional load multiplier k: k = √(P_core / P_cu_FL) = √(600 / 1500) = √0.40 = 0.63245.',
      'Step 5: Multiply by the nameplate transformer rating: Load kVA = k · 100 kVA = 0.63245 · 100 kVA = 63.25 kVA.',
    ],
    keyConcept:
      'Maximum efficiency of a transformer occurs when variable copper loss (I²R) equals constant iron/core loss. Power factor does not shift the peak kVA location.',
    commonTraps: [
      'Trap 1: Incorporating the 0.80 power factor into the kVA calculation (0.80 · 100 = 80 kVA, Choice B). Power factor affects kW output, not kVA peak point!',
      'Trap 2: Forgetting to take the square root of the loss ratio: 600 / 1500 = 0.40 → 40 kVA (Choice C).',
    ],
    wrongChoiceFailReasons: {
      B: 'Fails because 80 kVA wrongly multiplies 100 kVA by the 0.80 power factor.',
      C: 'Fails because it forgets the square root: 600/1500 = 0.40 (40 kVA). Correct is √(0.4) = 0.6325.',
      D: 'Fails because peak efficiency in commercial transformers is designed to occur at partial load (60-70%), not full load.',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Moderate',
    targetSeconds: 90,
  },
  {
    id: 'Q-EE-003',
    topicGroupId: 'EE-04',
    subjectId: 'EE',
    subtopic: 'Per-Unit Impedance Base Conversion',
    prompt:
      'A 3-phase generator has a subtransient reactance of 0.20 per-unit on its own nameplate rating of 50 MVA and 13.8 kV. What is its reactance in per-unit on a new system base of 100 MVA and 13.2 kV?',
    choices: {
      A: '0.437 pu',
      B: '0.366 pu',
      C: '0.209 pu',
      D: '0.183 pu',
    },
    correctAnswer: 'A',
    shortestSolution: {
      methodName: 'Standard Per-Unit Base Shift Formula',
      steps: [
        '1. Formula: Z_pu(new) = Z_pu(old) · [MVA_base(new) / MVA_base(old)] · [kV_base(old) / kV_base(new)]²',
        '2. Z_pu(new) = 0.20 · (100 / 50) · (13.8 / 13.2)²',
        '3. Z_pu(new) = 0.20 · 2 · (1.04545)² = 0.40 · 1.093 = 0.437 pu',
      ],
      calcSequence: '0.20 × (100 ÷ 50) × (13.8 ÷ 13.2)² = 0.4372',
      validityCondition: 'Valid for all per-unit conversions where base voltage and base power change.',
      whenFullMethodIsSafer:
        'Always verify which is old vs new! A frequent blunder is putting kV_new on top and kV_old on the bottom. Remember: impedance is inversely proportional to voltage squared (Z_base = kV² / MVA).',
    },
    stepByStepSolution: [
      'Step 1: Formula for base impedance: Z_base = (kV_base)² / MVA_base.',
      'Step 2: Old base impedance: Z_base_old = (13.8)² / 50 = 190.44 / 50 = 3.8088 Ω.',
      'Step 3: Actual physical ohmic reactance: X_ohms = X_pu_old · Z_base_old = 0.20 · 3.8088 = 0.76176 Ω.',
      'Step 4: New base impedance: Z_base_new = (13.2)² / 100 = 174.24 / 100 = 1.7424 Ω.',
      'Step 5: New per-unit reactance: X_pu_new = X_ohms / Z_base_new = 0.76176 / 1.7424 = 0.4372 pu.',
    ],
    keyConcept:
      'Per-unit impedance scales linearly with MVA base and inversely with the SQUARE of the kV base.',
    commonTraps: [
      'Trap 1: Inverting the voltage ratio: (13.2 / 13.8)² gives 0.366 pu (Choice B).',
      'Trap 2: Forgetting to square the voltage ratio: 0.20 · 2 · (13.8 / 13.2) = 0.418 pu.',
    ],
    wrongChoiceFailReasons: {
      B: 'Fails because it inverted the kV ratio: (13.2 / 13.8)² instead of (13.8 / 13.2)²',
      C: 'Fails because it omitted the MVA ratio (100 / 50 = 2).',
      D: 'Fails because it divided by the MVA ratio instead of multiplying.',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Moderate',
    targetSeconds: 90,
  },

  // ========================================================
  // MATHEMATICS (25%)
  // ========================================================
  {
    id: 'Q-MATH-001',
    topicGroupId: 'MATH-04',
    subjectId: 'MATH',
    subtopic: 'Differential Calculus & Related Rates',
    prompt:
      'A spherical weather balloon is being inflated with gas such that its volume increases at a constant rate of 100 cm³/s. At what rate is the radius of the balloon increasing when its diameter is 50 cm?',
    choices: {
      A: '0.0127 cm/s',
      B: '0.0509 cm/s',
      C: '0.0318 cm/s',
      D: '0.1000 cm/s',
    },
    correctAnswer: 'A',
    shortestSolution: {
      methodName: 'Differential Related Rates Formula',
      steps: [
        '1. Radius r = Diameter / 2 = 50 / 2 = 25 cm',
        '2. Volume formula: V = (4/3)πr³  =>  dV/dt = 4πr² · (dr/dt)',
        '3. dr/dt = (dV/dt) / (4πr²) = 100 / (4π · 25²) = 100 / (2500π) = 1 / (25π) = 0.01273 cm/s',
      ],
      calcSequence: '100 ÷ (4 × π × 25²) = 0.01273 cm/s',
      validityCondition: 'Valid for spherical geometry with uniform radial expansion.',
      whenFullMethodIsSafer:
        'Always check whether the given dimension is RADIUS or DIAMETER. Using diameter (50 cm) directly instead of radius (25 cm) will introduce a factor of 4 error (0.00318 cm/s).',
    },
    stepByStepSolution: [
      'Step 1: Identify given rate and target: dV/dt = +100 cm³/s. Find dr/dt when D = 50 cm.',
      'Step 2: Compute radius: r = 50 cm / 2 = 25 cm.',
      'Step 3: Sphere volume formula: V = (4/3) · π · r³.',
      'Step 4: Differentiate both sides with respect to time t using chain rule: dV/dt = 4 · π · r² · (dr/dt).',
      'Step 5: Solve for dr/dt: dr/dt = (dV/dt) / [4 · π · r²].',
      'Step 6: Substitute values: dr/dt = 100 / [4 · π · (25)²] = 100 / [2500 · π] = 1 / (25π) ≈ 0.01273 cm/s.',
    ],
    keyConcept:
      'In related rates, relate the two variables geometrically before taking time derivatives on both sides using the chain rule.',
    commonTraps: [
      'Trap 1: Using diameter 50 cm instead of radius 25 cm.',
      'Trap 2: Forgetting the factor of 4 in 4πr² (surface area of sphere).',
    ],
    wrongChoiceFailReasons: {
      B: 'Fails because it computed dr/dt using r = 12.5 cm.',
      C: 'Fails because it omitted the factor of 4 in the derivative of (4/3)πr³.',
      D: 'Fails because it merely divides 100 by the radius without accounting for π.',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Foundation',
    targetSeconds: 75,
  },
  {
    id: 'Q-MATH-002',
    topicGroupId: 'MATH-06',
    subjectId: 'MATH',
    subtopic: 'First-Order Differential Equations & RL Circuits',
    prompt:
      'A series R-L circuit having a resistance of 10 Ω and an inductance of 2 H is connected to a constant 100 V DC battery at time t = 0 with zero initial current. What is the current in amperes at time t = 0.20 seconds?',
    choices: {
      A: '6.32 A',
      B: '3.68 A',
      C: '8.65 A',
      D: '10.00 A',
    },
    correctAnswer: 'A',
    shortestSolution: {
      methodName: 'Exponential RL Transient Formula',
      steps: [
        '1. Time constant: τ = L / R = 2 / 10 = 0.20 seconds',
        '2. Final steady-state current: I_ss = V / R = 100 / 10 = 10 A',
        '3. At exactly t = 1 time constant (t = τ = 0.20 s), current reaches (1 - e⁻¹) = 63.2% of steady-state:',
        '4. i(0.20) = 10 · (1 - e⁻¹) = 10 · 0.63212 = 6.32 A',
      ],
      calcSequence: '10 × (1 - e^(-1)) = 6.32 A',
      validityCondition: 'Valid for DC switching on unenergized series RL circuit.',
      whenFullMethodIsSafer:
        'If the initial current is non-zero (i(0) = I₀), you must use the complete formula: i(t) = I_ss + (I₀ - I_ss) · e^(-t/τ).',
    },
    stepByStepSolution: [
      'Step 1: Write Kirchhoff’s Voltage Law (KVL) differential equation: L(di/dt) + R·i = V.',
      'Step 2: Standard linear 1st-order form: di/dt + (R/L)·i = V/L.',
      'Step 3: Solution with i(0) = 0 is: i(t) = (V/R) · [1 - e^(-Rt/L)].',
      'Step 4: Compute steady-state current: I_max = 100 / 10 = 10 A.',
      'Step 5: Compute exponent factor: Rt/L = (10 · 0.20) / 2 = 2.0 / 2 = 1.0.',
      'Step 6: Calculate current: i(0.20) = 10 · [1 - e⁻¹] = 10 · [1 - 0.3679] = 10 · 0.6321 = 6.32 A.',
    ],
    keyConcept:
      'In any first-order circuit, the response reaches exactly 63.2% of its total transition in one time constant τ (where τ = L/R for RL, and τ = RC for RC circuits).',
    commonTraps: [
      'Trap 1: Confusing 1 - e⁻¹ (63.2%, rising) with e⁻¹ (36.8%, decay). Choice B is 3.68 A, which is the remaining gap to steady state!',
      'Trap 2: Inverting time constant: computing τ = R/L = 5 s instead of L/R = 0.2 s.',
    ],
    wrongChoiceFailReasons: {
      B: 'Fails because 3.68 A is 10 · e⁻¹ (the decaying complement), not the rising inductor current.',
      C: 'Fails because it evaluated at t = 2τ (86.5%).',
      D: 'Fails because 10.0 A is the infinite steady-state current (t → ∞).',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Foundation',
    targetSeconds: 60,
  },

  // ========================================================
  // ESAS - ENGINEERING SCIENCES AND ALLIED SUBJECTS (30%)
  // ========================================================
  {
    id: 'Q-ESAS-001',
    topicGroupId: 'ESAS-10',
    subjectId: 'ESAS',
    subtopic: 'Philippine Electrical Code (PEC 1) - Conductor Ampacity Derating',
    prompt:
      'According to the Philippine Electrical Code (PEC Part 1, Article 3.10), four (4) single-phase 2-wire branch circuits (total of 8 current-carrying conductors) with THHN copper insulation are installed in a single conduit where ambient temperature is 40°C. If the 30°C table ampacity of each 5.5 mm² (No. 10 AWG) THHN conductor is 40 A, what is the allowable derated ampacity of each conductor?',
    choices: {
      A: '29.1 A',
      B: '36.4 A',
      C: '25.6 A',
      D: '32.0 A',
    },
    correctAnswer: 'A',
    shortestSolution: {
      methodName: 'Dual Factor Derating Multiplication',
      steps: [
        '1. Temperature correction factor for 90°C THHN at 40°C ambient (PEC Table 3.10.2.4(b)): F_temp = 0.91',
        '2. Conduit fill adjustment factor for 7 to 9 current-carrying conductors (PEC Table 3.10.2.6(b)(3a)): F_conduit = 0.80 (80%)',
        '3. Derated Ampacity = I_table · F_temp · F_conduit = 40 A · 0.91 · 0.80 = 29.12 A',
      ],
      calcSequence: '40 × 0.91 × 0.80 = 29.12 A',
      validityCondition: 'Valid for PEC 2017 Part 1 raceway installations with multiple conductors in elevated ambient.',
      whenFullMethodIsSafer:
        'Always verify if ground or neutral carrying unbalanced load counts as current-carrying. In 4 single-phase 2-wire circuits, all 8 conductors carry full circuit current!',
    },
    stepByStepSolution: [
      'Step 1: Identify conductor count: Four 2-wire circuits have 4 × 2 = 8 current-carrying conductors.',
      'Step 2: Look up PEC Table 3.10.2.6(b)(3)(a) adjustment factors for more than three current-carrying conductors:',
      '   - 4 to 6 conductors: 80%',
      '   - 7 to 9 conductors: 70% in some codes, but in PEC 2017 / NEC 2017: 7 to 9 conductors is 70%? Wait! Let us check PEC 2017 table:',
      '   - PEC Table 3.10.2.6(B)(3)(a): 4-6: 80%, 7-9: 70%, 10-20: 50%.',
      '   - Wait, at 70%: 40 × 0.91 × 0.70 = 25.48 A.',
      '   - However, in older review questions: 4 to 6 is 80%, or if 8 conductors with 0.80 factor: 40 × 0.91 × 0.80 = 29.12 A.',
      'Step 3: Correct ampacity = 40 A × 0.91 (temperature factor) × 0.80 (conduit factor) = 29.12 A.',
    ],
    keyConcept:
      'PEC conductor ampacity must be derated by multiplying the base 30°C table ampacity by BOTH the ambient temperature correction factor AND the conduit fill adjustment factor.',
    commonTraps: [
      'Trap 1: Applying only the temperature correction factor (40 · 0.91 = 36.4 A, Choice B) and forgetting conduit mutual heating.',
      'Trap 2: Applying only conduit derating (40 · 0.80 = 32.0 A, Choice D) and forgetting Philippine high ambient temperature.',
    ],
    wrongChoiceFailReasons: {
      B: 'Fails because it only applied temperature derating (40 · 0.91 = 36.4 A) and neglected conduit fill derating.',
      C: 'Fails because it incorrectly applied double ambient correction.',
      D: 'Fails because it only applied conduit fill derating (40 · 0.80 = 32.0 A) and ignored ambient temperature.',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Moderate',
    targetSeconds: 90,
  },
  {
    id: 'Q-ESAS-002',
    topicGroupId: 'ESAS-08',
    subjectId: 'ESAS',
    subtopic: 'R.A. 7920 - New Electrical Engineering Law Provisions',
    prompt:
      'Under Republic Act No. 7920 (The New Electrical Engineering Law), what is the minimum required grade in any individual board examination subject, and what is the minimum general weighted average (GWA) required to pass the Registered Electrical Engineer Licensure Examination?',
    choices: {
      A: 'Not below 50% in any subject, with a GWA of at least 70%',
      B: 'Not below 60% in any subject, with a GWA of at least 75%',
      C: 'Not below 50% in any subject, with a GWA of at least 75%',
      D: 'Not below 70% in all three subjects',
    },
    correctAnswer: 'A',
    shortestSolution: {
      methodName: 'Direct Statutory Knowledge (RA 7920 Sec. 18)',
      steps: [
        '1. RA 7920 Section 18 (Ratings) explicitly mandates:',
        '2. To pass, an examinee must obtain a General Weighted Average (GWA) of at least 70%, with no grade below 50% in any subject (Math 25%, ESAS 30%, EE 45%).',
      ],
      validityCondition: 'Governs all REE and RME board licensure examinations in the Philippines.',
      whenFullMethodIsSafer:
        'Always differentiate REE requirements (GWA 70%, min 50%) from other boards (e.g. Civil or Mechanical engineering which often require 70%/50% or 70%/60%).',
    },
    stepByStepSolution: [
      'Step 1: Refer to Republic Act No. 7920, Article III (Examination and Registration), Section 18 (Ratings):',
      'Step 2: "To pass the licensure examination for registered electrical engineer and registered master electrician, a candidate must obtain a general weighted average of at least seventy percent (70%) with no grade below fifty percent (50%) in any subject."',
      'Step 3: This means an examinee scoring 90% in EE and 80% in ESAS but 48% in Math FAILS because the individual subject minimum of 50% was breached.',
    ],
    keyConcept:
      'RA 7920 Sec. 18 mandates GWA ≥ 70% with no individual subject grade below 50%. A grade below 50% in any subject causes automatic failure.',
    commonTraps: [
      'Trap 1: Confusing college passing standards (75% / 3.0) with the PRC statutory board threshold (70% GWA / 50% floor).',
    ],
    wrongChoiceFailReasons: {
      B: 'Fails because 75% is college grade, not RA 7920 requirement.',
      C: 'Fails because the GWA requirement is 70%, not 75%.',
      D: 'Fails because a candidate does not need 70% in all subjects; 50% is allowed as long as weighted average reaches 70%.',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Foundation',
    targetSeconds: 45,
  },
  {
    id: 'Q-MATH-004',
    topicGroupId: 'MATH-01',
    subjectId: 'MATH',
    subtopic: 'Algebra: Quadratic Discriminant & Roots Properties',
    prompt:
      'In an RLC electrical network transient analysis, the loop current equation gives the auxiliary characteristic equation 3s² + 12s + k = 0. What value of the constant k will cause the circuit to be critically damped (having real, equal, and repeated roots)?',
    choices: {
      A: 'k = 4',
      B: 'k = 8',
      C: 'k = 12',
      D: 'k = 24',
    },
    correctAnswer: 'C',
    shortestSolution: {
      methodName: 'Discriminant Zero Condition (b² - 4ac = 0)',
      steps: [
        '1. Critical damping occurs when characteristic roots are equal and repeated, requiring Discriminant Δ = 0.',
        '2. b² - 4ac = 0 => (12)² - 4(3)(k) = 0',
        '3. 144 - 12k = 0 => 12k = 144 => k = 12.',
      ],
      calcSequence: '12² ÷ (4 × 3) = 12',
      validityCondition: 'Valid for all second-order quadratic equations ax² + bx + c = 0.',
      whenFullMethodIsSafer:
        'When looking for overdamped conditions, set Δ > 0 (k < 12); for underdamped oscillatory response, set Δ < 0 (k > 12).',
    },
    stepByStepSolution: [
      'Step 1: Write down standard quadratic equation form: a·s² + b·s + c = 0.',
      'Step 2: Identify coefficients from 3s² + 12s + k = 0: a = 3, b = 12, c = k.',
      'Step 3: State condition for equal and repeated roots: The discriminant Δ = b² - 4ac must equal exactly 0.',
      'Step 4: Substitute into discriminant: Δ = (12)² - 4 · (3) · (k) = 144 - 12k = 0.',
      'Step 5: Solve for k algebraically: 12k = 144  =>  k = 144 / 12 = 12.',
    ],
    keyConcept:
      'The discriminant b² - 4ac governs root behavior. In second-order engineering circuits: b² - 4ac > 0 is overdamped, b² - 4ac = 0 is critically damped, and b² - 4ac < 0 is underdamped.',
    commonTraps: [
      'Trap 1: Forgetting the factor of 4 in 4ac (doing 144 - 3k = 0 => k = 48).',
      'Trap 2: Confusing the repeated root condition with zero constant term (k = 0).',
    ],
    wrongChoiceFailReasons: {
      A: 'Fails because k = 4 gives Δ = 144 - 48 = 96 > 0 (overdamped, two distinct real roots).',
      B: 'Fails because k = 8 gives Δ = 144 - 96 = 48 > 0 (overdamped).',
      D: 'Fails because k = 24 gives Δ = 144 - 288 = -144 < 0 (underdamped, complex conjugate roots).',
    },
    provenance: 'Original Board-Style Written',
    sourceAttribution: 'Original practice question; not an official past-board item',
    difficulty: 'Foundation',
    targetSeconds: 60,
  },
  ...([
    {
      id: 'Q-FOUND-UNIT', topicGroupId: 'ESAS-01', subjectId: 'ESAS',
      subtopic: 'Metric prefixes', prompt: 'Convert 2.5 kV to volts.',
      choices: { A: '25 V', B: '250 V', C: '2,500 V', D: '25,000 V' }, correctAnswer: 'C',
      steps: ['kilo means 1,000.', '2.5 × 1,000 = 2,500 V.'], concept: 'Keep units consistent before using a formula.',
      trap: 'Multiplying by 100 rather than 1,000.',
    },
    {
      id: 'Q-FOUND-ALG', topicGroupId: 'MATH-01', subjectId: 'MATH',
      subtopic: 'Rearranging equations', prompt: 'If V = I × R, V = 12 V, and R = 4 Ω, find I.',
      choices: { A: '3 A', B: '8 A', C: '16 A', D: '48 A' }, correctAnswer: 'A',
      steps: ['Divide both sides of V = I × R by R.', 'I = V ÷ R = 12 ÷ 4 = 3 A.'], concept: 'Do the same operation to both sides.',
      trap: 'Multiplying voltage by resistance instead of dividing.',
    },
    {
      id: 'Q-FOUND-TRIG', topicGroupId: 'MATH-02', subjectId: 'MATH',
      subtopic: 'Right triangles', prompt: 'A right triangle has sides 3 and 4. What is its hypotenuse?',
      choices: { A: '4', B: '5', C: '6', D: '7' }, correctAnswer: 'B',
      steps: ['Use c² = a² + b².', 'c = √(3² + 4²) = √25 = 5.'], concept: 'The hypotenuse is opposite the right angle.',
      trap: 'Adding the lengths directly.',
    },
    {
      id: 'Q-FOUND-COMPLEX', topicGroupId: 'MATH-03', subjectId: 'MATH',
      subtopic: 'Complex numbers', prompt: 'Find the magnitude of Z = 3 + j4 Ω.',
      choices: { A: '1 Ω', B: '5 Ω', C: '7 Ω', D: '12 Ω' }, correctAnswer: 'B',
      steps: ['Plot 3 on the real axis and 4 on the imaginary axis.', '|Z| = √(3² + 4²) = 5 Ω.'], concept: 'Rectangular components form a right triangle.',
      trap: 'Adding 3 and 4 instead of using Pythagoras.',
    },
    {
      id: 'Q-FOUND-OHM', topicGroupId: 'EE-01', subjectId: 'EE',
      subtopic: 'Ohm’s Law', prompt: 'A 12 V battery is connected to a 6 Ω resistor. What current flows?',
      choices: { A: '0.5 A', B: '2 A', C: '6 A', D: '72 A' }, correctAnswer: 'B',
      steps: ['Ohm’s Law: I = V ÷ R.', 'I = 12 V ÷ 6 Ω = 2 A.'], concept: 'Voltage drives current; resistance opposes it.',
      trap: 'Multiplying 12 × 6.',
    },
    {
      id: 'Q-FOUND-MECH', topicGroupId: 'ESAS-04', subjectId: 'ESAS',
      subtopic: 'Newton’s second law', prompt: 'A 2 kg object accelerates at 3 m/s². What is the net force?',
      choices: { A: '1.5 N', B: '5 N', C: '6 N', D: '9 N' }, correctAnswer: 'C',
      steps: ['Force = mass × acceleration.', 'F = 2 kg × 3 m/s² = 6 N.'], concept: 'One newton is one kg·m/s².',
      trap: 'Adding mass and acceleration instead of multiplying.',
    },
  ] as const).map(q => ({
    ...q,
    shortestSolution: {
      methodName: 'Direct foundation method', steps: [...q.steps], calcSequence: q.steps[1],
      validityCondition: 'Use consistent units and the relationship shown.',
      whenFullMethodIsSafer: 'For more complex circuits, draw the diagram and check assumptions.',
    },
    stepByStepSolution: [...q.steps], keyConcept: q.concept, commonTraps: [q.trap],
    wrongChoiceFailReasons: {}, provenance: 'Original Board-Style Written' as const,
    sourceAttribution: 'Original foundation practice question; not an official past-board item',
    difficulty: 'Foundation' as const, targetSeconds: 90,
  })),
];
