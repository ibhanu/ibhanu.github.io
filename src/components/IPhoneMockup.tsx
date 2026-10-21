'use client';

import React, { useState } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface IPhoneMockupProps {
  screenshotUrl: string;
  alt: string;
  appName?: string;
  statusColor?: 'dark' | 'light';
  className?: string;
  priority?: boolean;
  accentColor?: string;
  interactiveGlow?: boolean;
}

export default function IPhoneMockup({
  screenshotUrl,
  alt,
  appName,
  statusColor = 'light',
  className = '',
  accentColor = '#FF4F1F',
  interactiveGlow = true,
}: IPhoneMockupProps) {
  const isDarkStatus = statusColor === 'dark';
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveGlow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none transition-all duration-300 group ${className}`}
      style={{
        filter: isHovered
          ? `drop-shadow(0 28px 45px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 25px ${accentColor}25)`
          : 'drop-shadow(0 24px 38px rgba(0, 0, 0, 0.5))',
      }}
    >
      {/* Physical Hardware Buttons */}
      {/* Left: Action Button */}
      <div className="absolute -left-[3px] top-[72px] w-[3px] h-[22px] bg-gradient-to-r from-[#2A2B30] to-[#1C1D21] rounded-l-[2px]" />
      {/* Left: Volume Up */}
      <div className="absolute -left-[3px] top-[108px] w-[3px] h-[36px] bg-gradient-to-r from-[#2A2B30] to-[#1C1D21] rounded-l-[2px]" />
      {/* Left: Volume Down */}
      <div className="absolute -left-[3px] top-[154px] w-[3px] h-[36px] bg-gradient-to-r from-[#2A2B30] to-[#1C1D21] rounded-l-[2px]" />
      {/* Right: Power / Side Button */}
      <div className="absolute -right-[3px] top-[120px] w-[3px] h-[54px] bg-gradient-to-l from-[#2A2B30] to-[#1C1D21] rounded-r-[2px]" />

      {/* Grade 5 Titanium Outer Chassis with Curvature & Specular Highlight */}
      <div className="relative rounded-[48px] p-[10px] bg-gradient-to-b from-[#3E4048] via-[#1E2025] to-[#141518] border border-[#555861]/40 shadow-2xl overflow-hidden">
        {/* Dynamic Edge Specular Sweep */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.18), transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Inner Black Bezel */}
        <div className="relative rounded-[40px] overflow-hidden bg-black border border-black/80 aspect-[1206/2622] flex flex-col justify-between">
          
          {/* iOS Status Bar Overlay */}
          <div
            className={`absolute top-0 inset-x-0 z-30 px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold tracking-tight ${
              isDarkStatus ? 'text-black' : 'text-white'
            }`}
          >
            {/* Time */}
            <span className="font-mono text-[12px] font-medium tracking-tight">9:41</span>

            {/* Dynamic Island Pill with Interactive Audio Waveform / Camera */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[92px] h-[26px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md border border-white/5">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0a0f1d] border border-[#1b2234]/60" />
                {/* Live Audio Activity Bars */}
                <div className="flex items-end gap-[1.5px] h-2">
                  <span className="w-[1.5px] h-1.5 bg-[#FF4F1F] rounded-full animate-pulse" />
                  <span className="w-[1.5px] h-2.5 bg-[#FF4F1F] rounded-full animate-pulse delay-75" />
                  <span className="w-[1.5px] h-1 bg-[#FF4F1F] rounded-full animate-pulse delay-150" />
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#060912]" />
            </div>

            {/* Icons: Cellular, Wifi, Battery */}
            <div className="flex items-center gap-1.5 opacity-90">
              <div className="flex items-end gap-[1.5px] h-2.5">
                <span className="w-[2.5px] h-1 bg-current rounded-xs" />
                <span className="w-[2.5px] h-1.5 bg-current rounded-xs" />
                <span className="w-[2.5px] h-2 bg-current rounded-xs" />
                <span className="w-[2.5px] h-2.5 bg-current rounded-xs" />
              </div>
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center gap-0.5">
                <Battery className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Real App Screenshot Image */}
          <img
            src={screenshotUrl}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />

          {/* Pointer-Reactive Glass Specular Glare Reflection */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{
              background: `linear-gradient(${105 + (mousePos.x - 50) * 0.4}deg, transparent 20%, rgba(255, 255, 255, 0.08) ${mousePos.y}%, transparent 80%)`,
              opacity: isHovered ? 0.9 : 0.6,
            }}
            aria-hidden="true"
          />

          {/* iOS Bottom Home Bar Indicator */}
          <div
            className="absolute bottom-1.5 inset-x-0 z-30 flex justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-28 h-1 bg-white/70 rounded-full backdrop-blur-sm" />
          </div>
        </div>
      </div>

      {appName && (
        <div className="mt-3 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#16181E] text-[#9DA4B0] border border-white/10 shadow-sm">
            {appName}
          </span>
        </div>
      )}
    </div>
  );
}
