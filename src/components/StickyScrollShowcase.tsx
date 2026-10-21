'use client';

import React, { useRef, useEffect, useState } from 'react';
import IPhoneMockup from './IPhoneMockup';
import { ArrowRight, Smartphone, Layers } from 'lucide-react';

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
    role: 'Tech Lead App, Collective Artists Network',
    headline: 'Creator Collaborations & Instant Invoicing',
    caption:
      'Custom payment abstraction over Cashfree & Razorpay processing $5M+ in creator payouts across 500,000+ downloads with zero dropped transactions.',
    screenshotUrl: '/screenshots/bigbang-1.webp',
    accentColor: '#FF5520',
    metric: '$5M+',
    metricLabel: 'Annual creator payouts',
    tags: ['Flutter', 'MethodChannels', 'DigiLocker KYC', 'Razorpay', 'Fastlane'],
    linkId: 'bigbang',
  },
  {
    id: 'under-25',
    appName: 'Under 25 Universe',
    role: 'Senior Flutter Dev, Student Super-App',
    headline: 'Real-Time Campus Missions & Spaces',
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
    role: 'Creator & Lead Architect, Open Source',
    headline: '60 FPS Swipe Physics Discovery Deck',
    caption:
      'Clean 3-Layer architecture (Data / Domain / Presentation) with custom spring card-swipe physics & real-time Supabase messaging.',
    screenshotUrl: '/screenshots/aura-discovery.webp',
    accentColor: '#FF5520',
    metric: '60 FPS',
    metricLabel: 'Spring gesture physics',
    tags: ['Flutter 3.32', 'Dart 3.8', 'Supabase Realtime', 'Clean Arch', 'GetX'],
    linkId: 'opensource',
  },
  {
    id: 'mango-affirmation',
    appName: 'Mango: Mind Architected',
    role: 'Creator & Lead Architect, Open Source',
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

  const targetXRef = useRef(0);
  const currentXRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let isRunning = true;

    const updatePhysics = () => {
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

      const cardIdx = Math.min(
        SHOWCASE_ITEMS.length - 1,
        Math.max(0, Math.floor(p * (SHOWCASE_ITEMS.length + 0.5)))
      );
      setActiveCardIndex(cardIdx);

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
      data-sc-span="2.2"
      className="relative z-20 w-full"
      style={{ height: '220vh' }}
    >
      {/* PINNED STAGE (Sticky Viewport Container) */}
      <div className="sticky top-0 min-h-[100dvh] w-full overflow-hidden flex items-center bg-[#0A0A0D]">
        
        {/* Top Progress Tracker Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#1A1B22] z-40">
          <div
            className="h-full bg-[#D93800] transition-transform duration-75"
            style={{ width: `${(progress * 100).toFixed(1)}%` }}
          />
        </div>

        {/* HORIZONTAL RAIL TRACK */}
        <div
          ref={railRef}
          className="ticker flex items-center gap-8 sm:gap-12 px-8 sm:px-16 will-change-transform"
        >
          {/* 1. LEAD CARD */}
          <div className="flex-shrink-0 w-[85vw] sm:w-[480px] p-8 sm:p-10 rounded-2xl bg-[#121318] space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F5F7] leading-tight font-display">
              Measured Mobile Architecture.
            </h2>

            <p className="text-base text-[#E0E0E6] leading-relaxed">
              On iOS, on Android, and in open-source Flutter. Consumer scale
              handling 900,000+ users, 60 FPS spring physics, and $25M+ in creator payouts.
            </p>

            <div className="pt-2 flex items-center gap-2 text-sm text-[#FF5520] font-medium">
              <span>Scroll to pan across flagship systems</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <div className="pt-4 flex items-center justify-between text-sm text-[#E0E0E6] bg-[#181920] p-3 rounded-lg">
              <span>4 Production Systems</span>
              <span>12 Verified Screens</span>
            </div>
          </div>

          {/* 2. PRODUCT CARDS WITH REAL IPHONE HARDWARE MODELS */}
          {SHOWCASE_ITEMS.map((item, index) => {
            const isCurrent = activeCardIndex === index;
            return (
              <div
                key={item.id}
                className={`flex-shrink-0 w-[88vw] sm:w-[640px] p-6 sm:p-8 rounded-2xl bg-[#121318] flex flex-col lg:flex-row items-center gap-6 sm:gap-8 transition-opacity duration-300 ${
                  isCurrent ? 'opacity-100' : 'opacity-85'
                }`}
              >
                {/* Hardware Handset */}
                <div className="flex-shrink-0 w-[210px] sm:w-[240px]">
                  <IPhoneMockup
                    screenshotUrl={item.screenshotUrl}
                    alt={`${item.appName}: ${item.headline}`}
                  />
                </div>

                {/* Architectural Content & Metric Plate */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-base font-bold text-white font-display"
                    >
                      {item.appName}
                    </span>
                    <a
                      href={`#${item.linkId}`}
                      className="text-sm text-[#E0E0E6] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Deep dive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="text-sm text-[#A2A3B0]">
                    {item.role}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F7] tracking-tight leading-snug font-display">
                    {item.headline}
                  </h3>

                  <p className="text-base text-[#E0E0E6] leading-relaxed">
                    {item.caption}
                  </p>

                  {/* Key Metric Badge */}
                  <div className="p-3.5 rounded-xl bg-[#181920] flex items-center justify-between">
                    <div>
                      <div
                        className="text-2xl sm:text-3xl font-bold text-white font-display"
                      >
                        {item.metric}
                      </div>
                      <div className="text-sm text-[#A2A3B0]">
                        {item.metricLabel}
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-white/50" />
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-[13px] bg-[#181920] text-[#E0E0E6]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 3. CLOSING RAIL CARD */}
          <div className="flex-shrink-0 w-[80vw] sm:w-[420px] p-8 sm:p-10 rounded-2xl bg-[#121318] space-y-5 text-center flex flex-col justify-center items-center">
            <div className="w-12 h-12 rounded-xl bg-[#181920] flex items-center justify-center text-[#FF5520]">
              <Layers className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F7] tracking-tight font-display">
              Production Architecture
            </h3>

            <p className="text-base text-[#E0E0E6] leading-relaxed">
              Every system is engineered with strict separation of concerns, automated CI/CD releases via Fastlane, and zero dropped frames.
            </p>

            <a
              href="#bigbang"
              className="px-5 py-3 rounded-lg bg-[#D93800] text-white text-sm font-semibold hover:bg-[#B82F00] transition-colors flex items-center gap-2"
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
