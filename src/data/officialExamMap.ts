import { REESubjectId } from '../types';

// PRBEE Resolution No. 40, s. 2024, Annex A. Counts are per 100-item subject.
export const PRC_ANNEX_A_URL = 'https://www.prc.gov.ph/sites/default/files/2024-40%20Annex%20A.pdf';
export const OFFICIAL_EXAM_MAP: { subject: REESubjectId; weight: number; topics: { name: string; items: number }[] }[] = [
  { subject: 'MATH', weight: 25, topics: [
    { name: 'Algebra & Complex Numbers', items: 5 },
    { name: 'Trigonometry', items: 5 },
    { name: 'Analytic Geometry', items: 5 },
    { name: 'Probability & Statistics', items: 5 },
    { name: 'Calculus 1', items: 15 },
    { name: 'Calculus 2', items: 15 },
    { name: 'Engineering Data Analysis', items: 20 },
    { name: 'Differential Equations', items: 15 },
    { name: 'Numerical Methods & Analysis', items: 15 },
  ] },
  { subject: 'ESAS', weight: 30, topics: [
    { name: 'Chemistry for Engineers', items: 5 },
    { name: 'Physics for Engineers', items: 15 },
    { name: 'Computer Programming, Microprocessor Systems, Logic Circuits & Switching Theory', items: 15 },
    { name: 'Materials Science, Environmental Science & Engineering', items: 5 },
    { name: 'Fluid Mechanics', items: 5 },
    { name: 'Fundamentals of Deformable Bodies', items: 5 },
    { name: 'Basic Thermodynamics', items: 5 },
    { name: 'EE Laws, Codes, Ethics, BOSH & Electrical Standards', items: 20 },
    { name: 'Engineering Economics', items: 15 },
    { name: 'Technopreneurship & Management of Engineering Projects', items: 10 },
  ] },
  { subject: 'EE', weight: 45, topics: [
    { name: 'Electromagnetism', items: 10 },
    { name: 'Electric Circuits 1', items: 10 },
    { name: 'Electric Circuits 2', items: 10 },
    { name: 'Electronic Communications, Electronics 1 & 2', items: 5 },
    { name: 'Electrical Apparatus & Devices, Industrial Electronics', items: 5 },
    { name: 'Electrical Machinery 1', items: 5 },
    { name: 'Electrical Machinery 2', items: 10 },
    { name: 'Instrumentation, Control, Feedback & Research Methods', items: 10 },
    { name: 'Electrical Systems & Illumination Engineering Design', items: 10 },
    { name: 'Power Plant, Distribution Systems & Substation Design', items: 5 },
    { name: 'Power System Analysis', items: 20 },
  ] },
];
