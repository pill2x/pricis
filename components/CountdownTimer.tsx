"use client";

import { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: string;
}

export default function CountdownTimer({ targetDate = "2026-09-15T12:00:00Z" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const destination = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = destination - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse text-center">
        <span className="text-slate-400 text-sm font-body">Loading countdown...</span>
      </div>
    );
  }

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div id="countdown" className="w-full max-w-3xl mx-auto my-6 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0D1526] to-[#080D1A] border border-blue-500/20 p-6 md:p-8 shadow-[0_10px_40px_-15px_rgba(37,99,235,0.25)] text-center">
        {/* Glowing background highlights */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-center gap-2 mb-4 text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-400 font-body">
          <Clock size={16} className="animate-spin-slow text-cyan-400" />
          <span>Official Launch Countdown — Mid September 2026</span>
          <Sparkles size={14} className="text-amber-400" />
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white mb-6 font-display">
          Pricis AI Workspace is Launching In:
        </h3>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-[1/1] sm:h-20 bg-slate-900/90 border border-slate-700/60 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"></div>
                <span className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight group-hover:scale-105 transition-transform duration-200">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 mt-2 tracking-widest font-body">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-6 font-body">
          Target Date: <span className="text-blue-300 font-semibold">{new Date(targetDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span> (Subject to final quality assurance)
        </p>
      </div>
    </div>
  );
}
