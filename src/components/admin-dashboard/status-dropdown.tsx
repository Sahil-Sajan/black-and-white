"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface StatusDropdownProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  disabled?: boolean;
}

const statusOptions = [
  { value: "PENDING", label: "PENDING", bg: "bg-amber-100", text: "text-amber-600", dot: "bg-amber-500" },
  { value: "SHIPPED", label: "SHIPPED", bg: "bg-blue-100", text: "text-blue-600", dot: "bg-blue-500" },
  { value: "DELIVERED", label: "DELIVERED", bg: "bg-emerald-100", text: "text-emerald-600", dot: "bg-emerald-500" },
  { value: "CANCELLED", label: "CANCELLED", bg: "bg-slate-100", text: "text-slate-500", dot: "bg-slate-500" },
];

const StatusDropdown = ({ currentStatus, onStatusChange, disabled }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = statusOptions.find((opt) => opt.value === currentStatus) || statusOptions[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (status: string) => {
    if (status !== currentStatus) {
      onStatusChange(status);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between gap-3 px-5 py-2.5 rounded-xl
          text-[10px] font-black uppercase tracking-widest transition-all duration-300
          border border-slate-200/50 shadow-sm min-w-[140px]
          ${selectedOption.bg} ${selectedOption.text}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md hover:scale-[1.02]"}
          ${isOpen ? "ring-2 ring-blue-500/20 scale-[1.02]" : ""}
        `}
      >
        <span className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${selectedOption.dot} animate-pulse`} />
          {selectedOption.label}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute left-0 top-full z-[100] mt-2 min-w-[180px] overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white p-1.5 shadow-2xl shadow-slate-200/50"
          >
            <div className="flex flex-col gap-0.5">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                    hover:bg-slate-50 relative group
                    ${currentStatus === option.value ? "bg-slate-50/50" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${option.dot} ${currentStatus === option.value ? "scale-100" : "scale-0 group-hover:scale-75 transition-transform"}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStatus === option.value ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`}>
                      {option.label}
                    </span>
                  </div>
                  {currentStatus === option.value && (
                    <Check size={14} className="text-slate-900" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusDropdown;
