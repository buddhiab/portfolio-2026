"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react"; // Make sure lucide-react is installed

export default function Navbar() {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-[#030305]/60 border-b border-white/5"
    >
      {/* Left Side: Avatar & Name */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {/* Replace this div with your actual <img> avatar if you want! */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          BV
        </div>
        <span className="text-white font-semibold text-sm md:text-base tracking-wide">
          Buddhi Vichakkshana
        </span>
      </div>

      {/* Right Side: Desktop Links */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Mobile Menu Icon */}
      <button className="md:hidden text-zinc-400 hover:text-white transition-colors">
        <Menu size={24} />
      </button>
    </motion.nav>
  );
}