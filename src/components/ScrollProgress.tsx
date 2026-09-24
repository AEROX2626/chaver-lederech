"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop || document.body.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      if (total > 0) {
        setProgress((scrolled / total) * 100);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="progress"
      className="fixed top-0 right-0 h-[2px] z-[80] transition-[width] duration-100 ease-linear bg-gradient-to-r from-sky-500 to-indigo-500"
      style={{ width: `${progress}%` }}
    />
  );
}
