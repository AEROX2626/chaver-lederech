"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedCounter({ target, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hasAnimated = false;
    let observer: IntersectionObserver;

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            let start = 0;
            const duration = 1600;
            let startTime: number | null = null;

            const animate = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              // easeOutCubic
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(ease * target);
              
              setCount(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(animate);
            if (ref.current) observer.unobserve(ref.current);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [target]);

  return (
    <div ref={ref}>
      {prefix}
      {count.toLocaleString("he-IL")}
      {suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-12 sm:px-12 sm:py-14">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              <div className="text-center">
                <div className="t-display text-4xl text-slate-900 sm:text-5xl">
                  <AnimatedCounter target={4200} />
                </div>
                <p className="mt-3 text-[12.5px] font-medium text-slate-500">
                  שיחות אישיות
                </p>
              </div>

              <div className="text-center">
                <div className="t-display text-4xl text-slate-900 sm:text-5xl">
                  <AnimatedCounter target={97} suffix="%" />
                </div>
                <p className="mt-3 text-[12.5px] font-medium text-slate-500">
                  מרגישים בנוח מהשיחה הראשונה
                </p>
              </div>

              <div className="text-center">
                <div className="t-display text-4xl text-slate-900 sm:text-5xl">
                  <AnimatedCounter target={180} suffix="+" />
                </div>
                <p className="mt-3 text-[12.5px] font-medium text-slate-500">
                  מדריכים בגובה העיניים
                </p>
              </div>

              <div className="text-center">
                <div className="t-display text-4xl gradient-text sm:text-5xl">
                  ₪0
                </div>
                <p className="mt-3 text-[12.5px] font-medium text-slate-500">
                  עלות. תמיד.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
