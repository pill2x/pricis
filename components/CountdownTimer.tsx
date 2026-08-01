"use client";

import { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: string;
}

export default function CountdownTimer({ 
  targetDate = "2026-09-15T12:00:00Z" 
}: CountdownTimerProps) {
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
      <div className="w-full max-w-2xl mx-auto p-4 rounded-2xl border animate-pulse text-center bg-slate-50 border-slate-200">
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
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-center transition-colors border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] bg-white border-slate-200/90 text-slate-900">
        <div className="flex items-center justify-center gap-2 mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600 font-body">
          <Clock size={16} className="text-blue-600" />
          <span>Official Launch Countdown — Mid September 2026</span>
          <Sparkles size={14} className="text-amber-500" />
        </div>

        <h3 className="text-lg sm:text-2xl font-extrabold font-display mb-6 tracking-tight text-slate-900">
          Pricis Launching In:
        </h3>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-[1/1] sm:h-20 border rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group transition-all bg-slate-50 border-slate-200/80 text-slate-900">
                <span className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight group-hover:scale-105 transition-transform duration-200">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-bold mt-2 tracking-widest font-body text-slate-400">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs mt-6 font-body text-slate-500">
          Target Date: <strong className="text-blue-600 font-semibold">{new Date(targetDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong> (Subject to final quality assurance)
        </p>
      </div>
    </div>
  );
}
