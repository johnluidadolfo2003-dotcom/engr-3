import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, Save, ChevronRight, CheckCircle2, Award, Zap, Compass } from 'lucide-react';
import { StudyPlanConfig } from '../types';
import { SIX_MONTH_STUDY_ROADMAP } from '../data/prcCoverage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: StudyPlanConfig;
  onSave: (newConfig: StudyPlanConfig) => void;
}

export const StudyPlanSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'roadmap'>('schedule');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  const [targetExamDate, setTargetExamDate] = useState(config.targetExamDate);
  const [dailyMinutes, setDailyMinutes] = useState(config.dailyStudyMinutes);
  const [attendingCenter, setAttendingCenter] = useState(config.reviewCenterSchedule.attendingReviewCenter);
  const [centerName, setCenterName] = useState(config.reviewCenterSchedule.centerName);
  const [centerDays, setCenterDays] = useState<string[]>(config.reviewCenterSchedule.meetingDays);

  if (!isOpen) return null;

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day: string) => {
    if (centerDays.includes(day)) {
      setCenterDays(centerDays.filter((d) => d !== day));
    } else {
      setCenterDays([...centerDays, day]);
    }
  };

  const handleSave = () => {
    const updated: StudyPlanConfig = {
      ...config,
      targetExamDate,
      dailyStudyMinutes: dailyMinutes,
      reviewCenterSchedule: {
        attendingReviewCenter: attendingCenter,
        centerName,
        meetingDays: centerDays,
        dailyHoursAtCenter: attendingCenter ? config.reviewCenterSchedule.dailyHoursAtCenter : 0,
      },
    };
    onSave(updated);
    onClose();
  };

  const currentMonthData = SIX_MONTH_STUDY_ROADMAP.find((m) => m.monthNumber === selectedMonth) || SIX_MONTH_STUDY_ROADMAP[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#14243A] text-slate-100 w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#167D82]" />
            <h3 className="font-bold text-white text-base">
              6-Month PRC Electrical Engineering Review Plan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center px-6 pt-3 bg-slate-900/60 border-b border-slate-800 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'roadmap'
                ? 'text-[#167D82] border-[#167D82] bg-slate-900 font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            6-Month Month-by-Month Roadmap
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'schedule'
                ? 'text-[#167D82] border-[#167D82] bg-slate-900 font-bold'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Exam Date & Daily Hours Settings
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm flex-1">
          {activeTab === 'roadmap' ? (
            <div className="space-y-4">
              {/* Month Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {SIX_MONTH_STUDY_ROADMAP.map((m) => {
                  const isSel = m.monthNumber === selectedMonth;
                  return (
                    <button
                      key={m.monthNumber}
                      onClick={() => setSelectedMonth(m.monthNumber)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                        isSel
                          ? 'bg-[#167D82] border-[#167D82] text-white shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Month {m.monthNumber}
                    </button>
                  );
                })}
              </div>

              {/* Month Overview Card */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#167D82]">
                    {currentMonthData.monthTitle}
                  </span>
                  <div className="flex gap-1.5">
                    {currentMonthData.targetSubjects.map((s) => (
                      <span
                        key={s}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          s === 'EE'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : s === 'MATH'
                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm font-semibold text-white">
                  Theme: {currentMonthData.focusTheme}
                </div>
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-slate-400">Core Modules: </span>
                  {currentMonthData.topicsCovered.join(' · ')}
                </div>
              </div>

              {/* 4 Weekly Milestones */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Weekly Plan & Checkpoints
                </div>
                {currentMonthData.weeklyBreakdown.map((w) => (
                  <div
                    key={w.week}
                    className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#167D82]" />
                        {w.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Week {w.week}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-5">
                      {w.description}
                    </p>
                    <div className="text-[11px] bg-slate-900/80 p-2 rounded-lg border border-slate-800/80 text-amber-300 ml-5 flex items-start gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Key Milestone:</strong> {w.keyMilestone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Target Exam Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target PRC REE Licensure Exam Date
                </label>
                <input
                  type="date"
                  value={targetExamDate}
                  onChange={(e) => setTargetExamDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-hidden focus:border-[#167D82]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  PRC typically administers the REE exam in April and September each year (6-month review cycle).
                </p>
              </div>

              {/* Daily study time */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Daily Self-Study Target (Outside Review Center)
                  </label>
                  <span className="font-mono text-amber-400 font-bold">
                    {Math.floor(dailyMinutes / 60)} hrs {dailyMinutes % 60 > 0 ? `${dailyMinutes % 60}m` : ''} / day
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="360"
                  step="30"
                  value={dailyMinutes}
                  onChange={(e) => setDailyMinutes(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Review Center Attendance */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">Review Center Attendance</div>
                    <div className="text-xs text-slate-400">
                      Align app modules with your review center curriculum
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={attendingCenter}
                    onChange={(e) => setAttendingCenter(e.target.checked)}
                    className="w-5 h-5 accent-[#167D82] rounded cursor-pointer"
                  />
                </div>

                {attendingCenter && (
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Review Center Name</label>
                      <select
                        value={centerName}
                        onChange={(e) => setCenterName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs"
                      >
                        <option value="Multi-Vector Review Center">Multi-Vector Review Center</option>
                        <option value="Excel Review Center">Excel First Review & Training Center</option>
                        <option value="Brainbox Review Center">Brainbox Electrical Review Center</option>
                        <option value="Villaruz Review">Villaruz Power Review</option>
                        <option value="Independent Review Center">Other Review Center / Self-Review</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Center Class Days</label>
                      <div className="flex flex-wrap gap-1.5">
                        {daysOfWeek.map((day) => {
                          const isSelected = centerDays.includes(day);
                          return (
                            <button
                              key={day}
                              onClick={() => toggleDay(day)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                                isSelected
                                  ? 'bg-[#167D82] border-[#167D82] text-white'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {day.slice(0, 3)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <div className="text-xs text-slate-400 hidden sm:block">
            Aligned with PRBEE Resolution No. 40, S. 2024
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#167D82] hover:bg-[#167D82]/90 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md"
            >
              <Save className="w-4 h-4" /> Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
