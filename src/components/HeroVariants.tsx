'use client';

import React, { useState } from 'react';
import IPhoneMockup from './IPhoneMockup';
import { PROFILE_DATA } from '@/data/portfolioData';
import { ExternalLink, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface HeroVariantsProps {
  onOpenResume: () => void;
}

export type HeroDirection = 'dimensional' | 'triptych' | 'spec';

export default function HeroVariants({ onOpenResume }: HeroVariantsProps) {
  const [variant, setVariant] = useState<HeroDirection>('dimensional');
  const [activeTriptych, setActiveTriptych] = useState<number>(1);
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

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

  const siliconLayers = [
    {
      title: 'Layer 01 // Impeller & Skia Custom Painters',
      subtitle: 'Zero dropped frames on low-tier 60Hz and 120Hz ProMotion displays.',
      spec: 'RenderObject boundary isolation · Custom shaders · Text rasterization caching',
      badge: '60 FPS STABLE',
    },
    {
      title: 'Layer 02 // Reactive Domain & Background Isolates',
      subtitle: 'WebSocket message parsing and encryption offloaded from main UI thread.',
      spec: 'Isolate thread pools · Zero cold-start state hydration · Latency dropped to 200ms',
      badge: '200ms LATENCY',
    },
    {
      title: 'Layer 03 // Native MethodChannels & Dart:FFI',
      subtitle: 'Zero-copy native memory exchange for low-latency media & audio pipelines.',
      spec: 'Platform channels · Cashfree/Razorpay unified adapter · DigiLocker KYC bridge',
      badge: '$5M+ PAYMENT VOL',
    },
    {
      title: 'Layer 04 // Apple Metal & Android NDK Silicon',
      subtitle: 'Low-level hardware inspection eliminating memory retention leaks.',
      spec: 'Instruments & Studio Profiler · AVFoundation · Kotlin MediaCodec pipelines',
      badge: '-65% CRASH RATE',
    },
  ];

  return (
    <div className="relative w-full">
      {/* Interactive Direction Switcher Pill */}
      <div
        data-ui="preview-switcher"
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 p-2.5 bg-[#12141D] rounded-2xl border border-[#222533]"
      >
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2 h-2 rounded-full bg-[#FF5520]" />
          <span className="text-[13px] font-semibold text-white">Compare Hero Directions:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setVariant('dimensional')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-[background-color,color] duration-150 ${
              variant === 'dimensional'
                ? 'bg-[#D93800] text-white'
                : 'bg-[#181A24] text-[#A2A3B0] hover:text-white'
            }`}
          >
            1. Dimensional 3-Plane (Recommended)
          </button>
          <button
            type="button"
            onClick={() => setVariant('triptych')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-[background-color,color] duration-150 ${
              variant === 'triptych'
                ? 'bg-[#D93800] text-white'
                : 'bg-[#181A24] text-[#A2A3B0] hover:text-white'
            }`}
          >
            2. Multi-App Triptych
          </button>
          <button
            type="button"
            onClick={() => setVariant('spec')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-[background-color,color] duration-150 ${
              variant === 'spec'
                ? 'bg-[#D93800] text-white'
                : 'bg-[#181A24] text-[#A2A3B0] hover:text-white'
            }`}
          >
            3. Silicon Engineering Spec
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DIRECTION 1: 3-PLANE DIMENSIONAL HERO (/scroll-craft)     */}
      {/* ======================================================== */}
      {variant === 'dimensional' && (
        <div className="relative">
          {/* Deep Background Plane: Monumental Structural Type */}
          <div
            data-ui="background-decor"
            aria-hidden="true"
            className="absolute -right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.04] text-[160px] sm:text-[230px] lg:text-[280px] font-bold font-display uppercase tracking-tighter text-white overflow-hidden leading-none z-0"
          >
            900K+
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Monumental Title & Datum Strip */}
            <div className="lg:col-span-7 space-y-6">
              {/* Coordinates Header Tag */}
              <div className="flex items-center gap-3 text-sm text-[#A2A3B0] font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Staff Mobile &amp; Systems Engineering Leadership</span>
                <span className="text-[#A2A3B0] hidden sm:inline">12.9716° N, 77.5946° E</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F5F7] leading-[0.95] font-display uppercase">
                Mobile Systems at 900K+ Scale
              </h1>

              <p className="text-base sm:text-lg text-[#E0E0E6] leading-relaxed max-w-2xl">
                Engineering creator monetization engines, 200ms background isolate pipelines,
                and multi-platform Indic speech SDKs from Bengaluru, India.
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
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg text-base font-semibold bg-[#161822] text-[#F5F5F7] hover:bg-[#202230] transition-[background-color] duration-150"
                >
                  GitHub Systems
                </a>
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

            {/* Right Column: Physical Handset with Layered Telemetry Badges */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] transform lg:-rotate-1 transition-transform duration-300">
                <IPhoneMockup
                  screenshotUrl="/screenshots/bigbang-1.webp"
                  alt="BigBang.Social Production Handset"
                  className="w-full"
                />

                {/* Floating Architectural Badge: Top Right */}
                <div
                  data-ui="telemetry-pill"
                  className="absolute -top-3 -right-3 sm:-right-6 bg-[#1A1C28] px-3.5 py-1.5 rounded-xl text-[13px] text-[#E0E0E6] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>Dart Isolates · 200ms</span>
                </div>

                {/* Floating Architectural Badge: Bottom Left */}
                <div
                  data-ui="telemetry-pill"
                  className="absolute -bottom-3 -left-3 sm:-left-6 bg-[#1A1C28] px-3.5 py-1.5 rounded-xl text-[13px] text-[#E0E0E6] flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF5520]" />
                  <span>Impeller · 60 FPS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DIRECTION 2: MULTI-APP PRODUCTION TRIPTYCH              */}
      {/* ======================================================== */}
      {variant === 'triptych' && (
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Multi-Platform Authority Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 text-sm text-[#A2A3B0] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5520]" />
              <span>Multi-Platform Production Triptych</span>
              <span className="text-[#A2A3B0] hidden sm:inline">3 Shipped Systems</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] leading-[0.95] font-display uppercase">
              3 Production Platforms at Scale
            </h1>

            <p className="text-base sm:text-lg text-[#E0E0E6] leading-relaxed max-w-2xl">
              From Collective Artists Network creator fintech to Under 25 student social feeds and Sarvam AI
              Indic speech pipelines: architecture spanning millions of events daily.
            </p>

            {/* Quick System Switcher Tabs */}
            <div className="space-y-2 pt-1">
              <div className="text-[13px] font-semibold text-[#A2A3B0] uppercase tracking-wider">
                Select Platform to Focus:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {triptychApps.map((app, idx) => {
                  const isActive = activeTriptych === idx;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setActiveTriptych(idx)}
                      className={`p-3 rounded-xl text-left transition-[background-color,border-color] duration-150 border ${
                        isActive
                          ? 'bg-[#1A1C27] border-[#D93800] text-white'
                          : 'bg-[#12131A] border-[#202230] text-[#9A9BA8] hover:text-white'
                      }`}
                    >
                      <div className="text-sm font-bold truncate">{app.name}</div>
                      <div className="text-xs text-[#A2A3B0] mt-0.5 truncate">{app.role}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Focused App Context Note */}
            <div className="p-4 rounded-xl bg-[#14151E] border border-[#222432] space-y-1">
              <div className="text-sm font-semibold text-white">
                {triptychApps[activeTriptych].name} Platform Focus
              </div>
              <p className="text-base text-[#D1D1DB] leading-relaxed">
                Metric: <span className="text-[#FF5520] font-semibold">{triptychApps[activeTriptych].metric}</span>.
                Tap any handset on the right to bring it into the center focal plane.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#showcase-rail"
                className="px-6 py-3 rounded-lg text-base font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-[background-color] duration-150"
              >
                Explore Full Case Studies
              </a>
              <button
                onClick={onOpenResume}
                type="button"
                className="px-5 py-3 rounded-lg text-base font-semibold bg-[#161822] text-[#F5F5F7] hover:bg-[#202230] transition-[background-color] duration-150"
              >
                Credentials (PDF)
              </button>
            </div>
          </div>

          {/* Right Column: 3-Device Fanned Perspective Triptych */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[480px]">
            <div className="relative w-full max-w-[440px] flex items-center justify-center h-[520px]">
              {triptychApps.map((app, idx) => {
                const isActive = activeTriptych === idx;
                // Calculate position offsets based on index
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
                    className={`absolute top-4 w-[210px] sm:w-[230px] cursor-pointer transition-[transform,opacity] duration-300 ${transformStyle} ${opacity}`}
                    style={{ zIndex }}
                  >
                    <div className="relative">
                      <IPhoneMockup
                        screenshotUrl={app.screenshot}
                        alt={app.alt}
                        className="w-full"
                      />
                      <div className="mt-2 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-[#14151D] text-white border border-[#222430]">
                          {app.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DIRECTION 3: SILICON ENGINEERING SPEC & HUD             */}
      {/* ======================================================== */}
      {variant === 'spec' && (
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Technical Invariants & Spec Sheet */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-sm text-[#A2A3B0]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="font-semibold">MOBILE SYSTEMS KERNEL</span>
              <span className="text-[#A2A3B0]">REV 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] leading-[0.95] font-display uppercase">
              High-Performance Mobile Infrastructure
            </h1>

            <p className="text-base sm:text-lg text-[#E0E0E6] leading-relaxed max-w-2xl">
              Architectural leadership bridging Flutter reactive frameworks down to native iOS Swift and Android NDK silicon.
            </p>

            {/* Core Invariants Spec Block */}
            <div className="space-y-3 pt-1">
              <div className="text-[13px] font-semibold uppercase tracking-wider text-[#FF5520]">
                Verified Engineering Invariants:
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-[#12141D] border border-[#202230] flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Deterministic Background Threading</div>
                    <p className="text-base text-[#D1D1DB] leading-relaxed mt-0.5">
                      Offloaded JSON deserialization and WebSocket streaming to isolate pools, sustaining 60 FPS under peak load.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#12141D] border border-[#202230] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#FF5520] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-white">Production Crash Reduction (-65%)</div>
                    <p className="text-base text-[#D1D1DB] leading-relaxed mt-0.5">
                      Xcode Instruments texture profiling eliminated lifecycle leaks, dropping crashes from 2.1% to 0.7%.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#architecture"
                className="px-6 py-3 rounded-lg text-base font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-[background-color] duration-150"
              >
                Inspect Wafer Architecture
              </a>
              <button
                onClick={onOpenResume}
                type="button"
                className="px-5 py-3 rounded-lg text-base font-semibold bg-[#161822] text-[#F5F5F7] hover:bg-[#202230] transition-[background-color] duration-150"
              >
                Technical Resume (PDF)
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Silicon Wafer Stack Diagram */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-[13px] text-[#A2A3B0] pb-1">
              <span className="font-semibold">ACTIVE SILICON WAFER STACK</span>
              <span>TAP LAYER TO INSPECT</span>
            </div>

            <div className="space-y-2.5">
              {siliconLayers.map((layer, idx) => {
                const isSelected = selectedLayer === idx;
                return (
                  <div
                    key={layer.title}
                    onClick={() => setSelectedLayer(idx)}
                    className={`p-4 rounded-xl cursor-pointer transition-[background-color,border-color] duration-150 border ${
                      isSelected
                        ? 'bg-[#191C28] border-[#FF5520]'
                        : 'bg-[#111218] border-[#1E202C] hover:border-[#2C2E3E]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-white">{layer.title}</div>
                      <span className="px-2 py-0.5 rounded text-[11px] bg-[#1E202E] text-[#FF5520] font-semibold">
                        {layer.badge}
                      </span>
                    </div>
                    <div className="text-xs text-[#A2A3B0] mt-1">{layer.subtitle}</div>
                    {isSelected && (
                      <div className="mt-2.5 pt-1 text-xs text-[#10B981]">
                        SPEC: {layer.spec}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
