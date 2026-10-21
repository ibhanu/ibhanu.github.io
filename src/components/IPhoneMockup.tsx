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
}

export default function IPhoneMockup({
  screenshotUrl,
  alt,
  appName,
  statusColor = 'light',
  className = '',
}: IPhoneMockupProps) {
  const isDarkStatus = statusColor === 'dark';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-ui="device-mockup"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none group ${className}`}
    >
      {/* Physical Hardware Buttons */}
      <div className="absolute -left-[3px] top-[72px] w-[3px] h-[22px] bg-[#2A2B32] rounded-l-[2px]" />
      <div className="absolute -left-[3px] top-[108px] w-[3px] h-[36px] bg-[#2A2B32] rounded-l-[2px]" />
      <div className="absolute -left-[3px] top-[154px] w-[3px] h-[36px] bg-[#2A2B32] rounded-l-[2px]" />
      <div className="absolute -right-[3px] top-[120px] w-[3px] h-[54px] bg-[#2A2B32] rounded-r-[2px]" />

      {/* Grade 5 Titanium Chassis */}
      <div className="relative rounded-[44px] sm:rounded-[48px] p-[8px] sm:p-[10px] bg-[#22242B] overflow-hidden h-full flex flex-col justify-center">
        
        {/* Inner Screen Bezel */}
        <div className="relative rounded-[36px] sm:rounded-[40px] overflow-hidden bg-black aspect-[1206/2622] h-full w-auto max-w-full flex flex-col justify-between mx-auto">
          
          {/* iOS Status Bar Overlay */}
          <div
            className={`absolute top-0 inset-x-0 z-30 px-6 pt-3 pb-1 flex items-center justify-between text-[13px] font-semibold tracking-tight ${
              isDarkStatus ? 'text-black' : 'text-white'
            }`}
          >
            {/* Time */}
            <span className="text-[13px] font-medium tracking-tight">9:41</span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[92px] h-[26px] bg-black rounded-full flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0E1017]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#07090E]" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 opacity-90">
              <div className="flex items-end gap-[1.5px] h-2.5">
                <span className="w-[2.5px] h-1 bg-current" />
                <span className="w-[2.5px] h-1.5 bg-current" />
                <span className="w-[2.5px] h-2 bg-current" />
                <span className="w-[2.5px] h-2.5 bg-current" />
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

          {/* iOS Bottom Home Indicator */}
          <div
            className="absolute bottom-2 inset-x-0 z-30 flex justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-28 h-1 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>

      {appName && (
        <div className="mt-3 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-[13px] font-medium bg-[#161820] text-[#9596A3]">
            {appName}
          </span>
        </div>
      )}
    </div>
  );
}
