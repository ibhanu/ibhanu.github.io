'use client';

import React, { useState } from 'react';
import IPhoneMockup from './IPhoneMockup';

interface HeroTriptychProps {
  onOpenResume: () => void;
}

export default function HeroVariants({ onOpenResume }: HeroTriptychProps) {
  const [activeTriptych, setActiveTriptych] = useState<number>(1);

  const triptychApps = [
    {
      id: 'under25',
      name: 'Under 25 Universe',
      metric: '400K+ Users · $20M+ Scale',
      color: '#10B981',
      screenshot: '/screenshots/under25-1.webp',
      alt: 'Under 25 Campus Community',
      role: 'Lead Architect',
    },
    {
      id: 'bigbang',
      name: 'BigBang.Social',
      metric: '500K+ Downloads · $5M+ Vol',
      color: '#FF5520',
      screenshot: '/screenshots/bigbang-1.webp',
      alt: 'BigBang.Social Creator Platform',
      role: 'Tech Lead Mobile',
    },
    {
      id: 'aura',
      name: 'Aura AI & Sarvam Speech',
      metric: 'Dart FFI · Real-Time PCM',
      color: '#38BDF8',
      screenshot: '/screenshots/aura-chat.webp',
      alt: 'Sarvam AI Indic Audio Core',
      role: 'Native Systems Bridge',
    },
  ];

  return (
    <div className="relative w-full">
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Focused Authority Narrative & Datum Strip */}
        <div className="lg:col-span-6 space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] leading-[0.95] font-display uppercase">
            Mobile Systems at 900K+ Scale
          </h1>

          <p className="text-base sm:text-lg text-[#E0E0E6] leading-relaxed max-w-xl">
            Staff mobile systems architect directing creator monetization, real-time campus networks, and Indic AI speech pipelines from Bengaluru, India.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#showcase-rail"
              className="px-6 py-3 rounded-lg text-base font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-[background-color] duration-150"
            >
              Inspect Shipped Systems
            </a>
            <button
              onClick={onOpenResume}
              type="button"
              className="px-5 py-3 rounded-lg text-base font-semibold bg-[#161822] text-[#F5F5F7] hover:bg-[#202230] transition-[background-color] duration-150"
            >
              Verified Credentials (PDF)
            </button>
          </div>

          {/* Editorial Telemetry Datum Line */}
          <div data-ui="telemetry-strip" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-white font-display">900K+</div>
                <div className="text-[13px] text-[#A2A3B0]">Store Downloads</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF5520] font-display">$25M+</div>
                <div className="text-[13px] text-[#A2A3B0]">Platform Volume</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#10B981] font-display">200ms</div>
                <div className="text-[13px] text-[#A2A3B0]">Socket Latency</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#F59E0B] font-display">65%</div>
                <div className="text-[13px] text-[#A2A3B0]">Crash Reduction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3-Device Fanned Perspective Triptych */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[480px]">
          <div className="relative w-full max-w-[440px] flex items-center justify-center h-[490px]">
            {triptychApps.map((app, idx) => {
              const isActive = activeTriptych === idx;
              let transformStyle = '';
              let zIndex = 10;
              let opacity = 'opacity-65';

              if (idx === 0) {
                // Left Device
                transformStyle = isActive
                  ? 'translate-x-0 scale-105 z-30'
                  : '-translate-x-16 sm:-translate-x-24 scale-90 -rotate-6 z-10';
              } else if (idx === 1) {
                // Center Device
                transformStyle = isActive
                  ? 'translate-x-0 scale-105 z-30'
                  : 'translate-x-0 scale-95 z-20';
              } else {
                // Right Device
                transformStyle = isActive
                  ? 'translate-x-0 scale-105 z-30'
                  : 'translate-x-16 sm:translate-x-24 scale-90 rotate-6 z-10';
              }

              if (isActive) {
                opacity = 'opacity-100';
                zIndex = 30;
              }

              return (
                <div
                  key={app.id}
                  onClick={() => setActiveTriptych(idx)}
                  className={`absolute top-2 w-[210px] sm:w-[230px] cursor-pointer transition-[transform,opacity] duration-300 ${transformStyle} ${opacity}`}
                  style={{ zIndex }}
                >
                  <div className="relative">
                    <IPhoneMockup
                      screenshotUrl={app.screenshot}
                      alt={app.alt}
                      className="w-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Platform Telemetry Indicator */}
          <div className="w-full max-w-[340px] mt-2 flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#14151D] border border-[#222430]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: triptychApps[activeTriptych].color }} />
              <span className="text-[13px] font-semibold text-white">{triptychApps[activeTriptych].name}</span>
            </div>
            <span className="text-[13px] text-[#A2A3B0] font-medium">{triptychApps[activeTriptych].metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
