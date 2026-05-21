"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="mt-4">
      <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest mb-2 sm:mb-3 font-semibold">
        Countdown to Race Day
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {[
          { label: "Hari", value: timeLeft.days },
          { label: "Jam", value: timeLeft.hours },
          { label: "Menit", value: timeLeft.minutes },
          { label: "Detik", value: timeLeft.seconds },
        ].map(({ label, value }, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl w-full py-2 sm:py-3 text-center">
              <span className="text-xl sm:text-3xl font-black text-white tabular-nums leading-none">
                {pad(value)}
              </span>
            </div>
            <span className="text-white/50 text-[9px] sm:text-xs mt-1 sm:mt-1.5 font-medium uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}