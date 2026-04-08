"use client";

import { useRef, useEffect, useState } from "react";
import { Users, Calendar, Award, Activity } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Total Runners",
    duration: 2.5
  },
  {
    icon: Calendar,
    value: 4,
    suffix: " Tahun",
    label: "Event Berjalan",
    duration: 2
  },
  {
    icon: Activity,
    value: 500000,
    suffix: " KM",
    label: "Total Jarak Ditempuh",
    duration: 2.8
  }
];

const RunningEventStats = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = stat.duration * 1000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, stepDuration);
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-black text-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">OUR JOURNEY</h1>
          <p className="text-xl text-white/70">Bersama Membangun Komunitas Pelari Terbesar</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl lg:text-6xl font-bold mb-3 bg-blue-500 bg-clip-text text-transparent">
                    {formatNumber(counters[index])}{stat.suffix}
                  </div>
                  <div className="text-white/60 font-medium text-lg tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Achievement Highlight */}
        <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/30 border-2 border-blue-500/50 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Award className="w-10 h-10 text-yellow-500 " />
            <h2 className="text-3xl lg:text-4xl font-bold">EVENT TERBESAR DI KALIMANTAN</h2>
            <Award className="w-10 h-10 text-yellow-500 " />
          </div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan pelari dari berbagai negara dalam event running terbesar di Kalimantan. 
            Bersama kita ciptakan prestasi dan membangun gaya hidup sehat yang berkelanjutan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RunningEventStats;