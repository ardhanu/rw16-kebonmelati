"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setWidth(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ width: `${width}%` }}
      className="fixed top-0 left-0 h-1 bg-accent z-[100] transition-all duration-100 ease-out"
    ></div>
  );
}
