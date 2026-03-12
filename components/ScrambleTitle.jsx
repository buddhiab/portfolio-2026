"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";

export default function ScrambleTitle({ text, className }) {
  const ref = useRef(null);
  
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const [activeText, setActiveText] = useState("");

  useEffect(() => {
    if (isInView) {
      setActiveText(text); 
    }
  }, [isInView, text]);

  const scrambledText = useTextScramble(activeText);

  return (
    <h2 ref={ref} className={className}>
      {scrambledText || <span className="text-zinc-800">___________</span>}
    </h2>
  );
}