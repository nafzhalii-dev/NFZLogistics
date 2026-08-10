import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  labelKey: string;
}

const STATS: Stat[] = [
  { value: 15, suffix: "+", labelKey: "stats.years" },
  { value: 250, suffix: "K+", prefix: "", labelKey: "stats.shipments" },
  { value: 98, suffix: "%", labelKey: "stats.ontime" },
  { value: 50, suffix: "+", labelKey: "stats.cities" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat }: { stat: Stat }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(stat.value, 2000, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl md:text-6xl font-bold text-white mb-3 transition-transform duration-300 group-hover:scale-105">
        <span className="text-sgreen-400">{stat.prefix}{count}{stat.suffix}</span>
      </div>
      <div className="text-white/60 text-base font-medium">{t(stat.labelKey)}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-navy-900 py-16 border-y border-navy-800">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((stat) => (
            <StatCard key={stat.labelKey} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
