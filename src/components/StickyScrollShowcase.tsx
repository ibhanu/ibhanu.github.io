'use client';

import React, { useRef, useEffect, useState } from 'react';
import IPhoneMockup from './IPhoneMockup';
import { ArrowRight, Sparkles, Smartphone, Layers, CheckCircle2 } from 'lucide-react';

interface StickyShowcaseItem {
  id: string;
  appName: string;
  role: string;
  headline: string;
  caption: string;
  screenshotUrl: string;
  accentColor: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  linkId: string;
}

const SHOWCASE_ITEMS: StickyShowcaseItem[] = [
  {
    id: 'bigbang-social',
    appName: 'BigBang.Social',
    role: 'Tech Lead App · Collective Artists Network',
    headline: 'Creator Collaborations & Instant Invoicing',
    caption:
      'Custom payment abstraction over Cashfree & Razorpay processing $5M+ in creator payouts across 500,000+ downloads with zero dropped transactions.',
    screenshotUrl: '/screenshots/bigbang-1.webp',
    accentColor: '#FF4F1F',
    metric: '$5M+',
    metricLabel: 'Annual creator payouts',
    tags: ['Flutter', 'MethodChannels', 'DigiLocker KYC', 'Razorpay', 'Fastlane'],
    linkId: 'bigbang',
  },
  {
    id: 'under-25',
    appName: 'Under 25 Universe',
    role: 'Senior Flutter Dev · Student Super-App',
    headline: 'Real-Time Campus Missions & Collectibles',
    caption:
      'WebSocket chat engine with background isolate serialization cutting latency from 500ms to 200ms for 400K+ students and $20M+ platform earnings.',
    screenshotUrl: '/screenshots/under25-1.webp',
    accentColor: '#10B981',
    metric: '400K+',
    metricLabel: 'Active campus students',
    tags: ['Flutter', 'WebSockets', 'Dart Isolates', '30+ Widget System', 'A/B Tests'],
    linkId: 'under25',
  },
  {
    id: 'aura-dating',
    appName: 'Aura Dating',
    role: 'Creator & Lead Architect · Open Source',
    headline: '60 FPS Swipe Physics Discovery Deck',
    caption:
      'Clean 3-Layer architecture (Data / Domain / Presentation) with custom spring card-swipe physics & real-time Supabase messaging.',
    screenshotUrl: '/screenshots/aura-discovery.webp',
    accentColor: '#FF4800',
    metric: '60 FPS',
    metricLabel: 'Spring gesture physics',
    tags: ['Flutter 3.32', 'Dart 3.8', 'Supabase Realtime', 'Clean Arch', 'GetX'],
    linkId: 'opensource',
  },
  {
    id: 'mango-affirmation',
    appName: 'Mango — Mind Architected',
    role: 'Creator & Lead Architect · Open Source',
    headline: 'Parallax Affirmation & Native iOS Widgets',
    caption:
      'Multi-layer sensor parallax background compositor, streak mascot system, and native iOS Home/Lockscreen WidgetKit bridge via App Groups.',
    screenshotUrl: '/screenshots/mango-home.webp',
    accentColor: '#F59E0B',
    metric: 'Swift',
    metricLabel: 'Native iOS WidgetKit bridge',
    tags: ['Flutter', 'iOS WidgetKit', 'Parallax Engine', 'Custom Shaders', 'Haptics'],
    linkId: 'opensource',
  },
];

export default function StickyScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Smooth lerp state for momentum translation
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let isRunning = true;

    const updatePhysics = () => {
      // Exponential momentum smoothing
      currentXRef.current += (targetXRef.current - currentXRef.current) * 0.14;

      if (railRef.current) {
        railRef.current.style.transform = `translate3d(${currentXRef.current.toFixed(2)}px, 0, 0)`;
      }

      if (isRunning) {
        raf = requestAnimationFrame(updatePhysics);
      }
    };

    const handleScroll = () => {
      if (!containerRef.current || !railRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const totalScrollableDistance = containerHeight - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollableDistance));
      setProgress(p);

      const cardIdx = Math.min(SHOWCASE_ITEMS.length - 1, Math.max(0, Math.floor(p * (SHOWCASE_ITEMS.length + 0.5))));
      setActiveCardIndex(cardIdx);

      // Horizontal travel target
      const railWidth = railRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxScrollX = Math.max(0, railWidth - windowWidth + 60);

      targetXRef.current = -(p * maxScrollX);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    raf = requestAnimationFrame(updatePhysics);

    return () => {
      isRunning = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="showcase-rail"
      data-sc-act="pan"
      data-sc-span="3.5"
      className="relative z-20 w-full"
      style={{ height: '350vh' }}
    >
      {/* PINNED STAGE (Sticky Viewport Container) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#07080B]/90 backdrop-blur-xl border-y border-[#F4F0EA]/10">
        
        {/* Subtle Ambient Radial Glow reacting to active card */}
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-700 opacity-30"
          style={{
            background: `radial-gradient(circle at 45% 50%, ${SHOWCASE_ITEMS[activeCardIndex]?.accentColor || '#FF4F1F'}30, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* Top Progress Tracker Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-white/5 z-40">
          <div
            className="h-full bg-gradient-to-r from-[#FF4F1F] via-[#F59E0B] to-[#10B981] transition-all duration-75"
            style={{ width: `${(progress * 100).toFixed(1)}%` }}
          />
        </div>

        {/* Floating Editorial Watermark Number */}
        <div
          className="absolute right-8 bottom-4 text-[12vw] font-black text-white/[0.025] select-none pointer-events-none font-mono"
          aria-hidden="true"
        >
          0{activeCardIndex + 1}
        </div>

        {/* HORIZONTAL RAIL TRACK */}
        <div
          ref={railRef}
          className="flex items-center gap-6 sm:gap-10 px-6 sm:px-16 will-change-transform"
        >
          {/* 1. LEAD CARD (Styled like the nateherk.com rail lead plate) */}
          <div className="flex-shrink-0 w-[85vw] sm:w-[480px] p-7 sm:p-10 rounded-3xl bg-[#0F1218]/90 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F1F]/15 border border-[#FF4F1F]/30 font-mono text-xs text-[#FF4F1F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shipped Products Showcase</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F0EA] leading-[1.12]">
              Same engineering in every room.
            </h2>

            <p className="text-sm sm:text-base text-[#9DA4B0] leading-relaxed">
              On iOS, on Android, and in open-source Flutter. Consumer scale
              handling 900,000+ users, 60 FPS spring physics, and $25M+ in creator payouts.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-[#FF4F1F]">
              <span>Scroll down to pan through hardware</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9DA4B0]">
              <span>4 Flagship Apps</span>
              <span>12 Real Screenshots</span>
            </div>
          </div>

          {/* 2. PRODUCT CARDS WITH REAL IPHONE 15 PRO MODELS */}
          {SHOWCASE_ITEMS.map((item, index) => {
            const isCurrent = activeCardIndex === index;
            return (
              <div
                key={item.id}
                className={`flex-shrink-0 w-[88vw] sm:w-[640px] p-6 sm:p-8 rounded-3xl bg-[#0F1218]/85 border backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center gap-6 sm:gap-8 transition-all duration-300 ${
                  isCurrent
                    ? 'border-white/30 scale-[1.01]'
                    : 'border-white/10 opacity-90'
                }`}
              >
                {/* Left: Real iPhone 15 Pro Model with Pointer-Reactive Glare */}
                <div className="flex-shrink-0 w-[210px] sm:w-[250px] transform hover:scale-[1.02] transition-transform duration-300">
                  <IPhoneMockup
                    screenshotUrl={item.screenshotUrl}
                    alt={`${item.appName} — ${item.headline}`}
                    accentColor={item.accentColor}
                  />
                </div>

                {/* Right: Architectural Content & Metric Plate */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="font-mono text-xs uppercase tracking-wider font-semibold"
                      style={{ color: item.accentColor }}
                    >
                      0{index + 1} · {item.appName}
                    </span>
                    <a
                      href={`#${item.linkId}`}
                      className="text-xs font-mono text-[#9DA4B0] hover:text-[#F4F0EA] flex items-center gap-1 hover:translate-x-0.5 transition-all"
                    >
                      <span>Deep dive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="text-xs font-mono text-[#9DA4B0]">
                    {item.role}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#F4F0EA] tracking-tight leading-snug">
                    {item.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9DA4B0] leading-relaxed">
                    {item.caption}
                  </p>

                  {/* Key Metric Badge */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div
                        className="text-lg sm:text-xl font-bold font-mono"
                        style={{ color: item.accentColor }}
                      >
                        {item.metric}
                      </div>
                      <div className="text-[11px] font-mono text-[#9DA4B0]">
                        {item.metricLabel}
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-white/30" />
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 3. CLOSING / TRANSITION RAIL CARD */}
          <div className="flex-shrink-0 w-[80vw] sm:w-[420px] p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#12151D] to-[#0A0C10] border border-white/15 backdrop-blur-2xl shadow-2xl space-y-5 text-center flex flex-col justify-center items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FF4F1F]/15 border border-[#FF4F1F]/40 flex items-center justify-center text-[#FF4F1F]">
              <Layers className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F0EA] tracking-tight">
              Production Architecture
            </h3>

            <p className="text-xs sm:text-sm text-[#9DA4B0] leading-relaxed">
              Every app is engineered with strict separation of concerns, automated CI/CD releases via Fastlane, and zero dropped frames.
            </p>

            <a
              href="#bigbang"
              className="px-5 py-2.5 rounded-lg bg-[#FF4F1F] text-white font-mono text-xs font-semibold hover:bg-[#e04318] transition-colors flex items-center gap-2"
            >
              <span>Explore In-Depth Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
