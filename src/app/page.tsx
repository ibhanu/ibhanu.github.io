'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  PROFILE_DATA,
  MOBILE_APPS,
  SARVAM_SDK_TABS,
} from '@/data/portfolioData';
import { ChronographWorld3D } from '@/components/three/TriptychWorld3D';
import ResumeModal from '@/components/ResumeModal';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const NAV_ITEMS = [
  { id: 'intro', label: 'Intro' },
  { id: 'bigbang', label: 'BigBang.Social' },
  { id: 'under25', label: 'Under 25' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'sdks', label: 'SDKs & Backend' },
  { id: 'contact', label: 'Contact' },
];

export default function BhanuDeveloperPortfolio() {
  const scrollProgressRef = useRef(0);
  const activeSectionRef = useRef('intro');
  const pointerRef = useRef({ x: 0, y: 0 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedSdkTab, setSelectedSdkTab] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [orbitMode, setOrbitMode] = useState(false);

  // Manual screen overrides when the user clicks a screen pill or hovers
  const [screenOverrides, setScreenOverrides] = useState<Record<string, number>>({});

  // Scrollcraft Engine: tracks normalized scroll progress, active DOM section, and velocity
  useEffect(() => {
    let raf = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const updateScrollEngine = () => {
      raf = 0;
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const currentY = window.scrollY;
      const velocity = Math.min(1, Math.abs(currentY - lastScrollY) / (dt * 2.5));
      lastScrollY = currentY;
      lastTime = now;

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const p = clamp01(currentY / maxScroll);
      scrollProgressRef.current = p;
      setScrollProgress(p);

      document.documentElement.style.setProperty('--sc-p', p.toFixed(4));
      document.documentElement.style.setProperty('--sc-v', velocity.toFixed(3));

      // Determine active section by actual viewport center
      const probeY = window.innerHeight * 0.38;
      let currentSec = 'intro';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY) {
            currentSec = item.id;
          }
        }
      }
      activeSectionRef.current = currentSec;
      setActiveSection(currentSec);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateScrollEngine);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      pointerRef.current.y = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
    };

    updateScrollEngine();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  const bigbangApp = MOBILE_APPS[0];
  const under25App = MOBILE_APPS[1];
  const auraApp = MOBILE_APPS[2];
  const mangoApp = MOBILE_APPS[3];
  const activeSdk = SARVAM_SDK_TABS[selectedSdkTab] || SARVAM_SDK_TABS[0];

  // Auto-calculated active screen index for BigBang & Under25 based on scroll if not overridden
  const bbActiveScreen =
    screenOverrides.bigbang !== undefined
      ? screenOverrides.bigbang
      : scrollProgress < 0.22
      ? 0
      : scrollProgress < 0.28
      ? 1
      : 2;

  const u25ActiveScreen =
    screenOverrides.under25 !== undefined
      ? screenOverrides.under25
      : scrollProgress < 0.42
      ? 0
      : scrollProgress < 0.48
      ? 1
      : 2;

  const auraActiveScreen = screenOverrides.aura ?? 0;
  const mangoActiveScreen = screenOverrides.mango ?? 0;

  const isPaperGround = activeSection === 'sdks';

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isPaperGround
          ? 'bg-[#F4F0EA]/90 text-[#111318]'
          : 'bg-transparent text-[#F4F0EA]'
      }`}
    >
      {/* 3D WebGL Product Stage (Fixed Behind Story Content) */}
      <ChronographWorld3D
        scrollProgressRef={scrollProgressRef}
        activeSectionRef={activeSectionRef}
        pointerRef={pointerRef}
        activeScreenOverrides={screenOverrides}
        orbitMode={orbitMode}
      />

      {/* TOP NAVIGATION BAR */}
      <header
        className={`fixed top-0 inset-x-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
          isPaperGround
            ? 'bg-[#F4F0EA]/90 border-[#111318]/10 text-[#111318]'
            : 'bg-[#07080B]/85 border-[#F4F0EA]/10 text-[#F4F0EA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a
            href="#intro"
            className="flex items-center gap-3 font-semibold tracking-tight text-base"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF4F1F]" />
            <span>Bhanu Pratap</span>
            <span
              className={`hidden sm:inline font-mono text-xs ${
                isPaperGround ? 'text-[#111318]/60' : 'text-[#9DA4B0]'
              }`}
            >
              Bengaluru, India
            </span>
          </a>

          <nav
            aria-label="Portfolio sections"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    isActive
                      ? 'bg-[#FF4F1F] text-[#F4F0EA] font-medium'
                      : isPaperGround
                      ? 'text-[#111318]/70 hover:text-[#111318]'
                      : 'text-[#9DA4B0] hover:text-[#F4F0EA]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className={`px-3.5 py-1.5 rounded-md font-mono text-xs border transition-colors ${
                isPaperGround
                  ? 'border-[#111318]/20 text-[#111318] hover:bg-[#111318]/5'
                  : 'border-[#F4F0EA]/20 text-[#F4F0EA] hover:bg-[#F4F0EA]/10'
              }`}
            >
              Resume PDF
            </button>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="px-3.5 py-1.5 rounded-md font-mono text-xs font-medium bg-[#FF4F1F] text-[#F4F0EA] hover:bg-[#e04318] transition-colors"
            >
              Email Me
            </a>
          </div>
        </div>
      </header>

      {/* MAIN SCROLL STORY */}
      <main className="relative z-10">
        {/* ===================================================================
            ACT I: HERO (Scrollcraft Device: Layered Parallax Hero)
            =================================================================== */}
        <section
          id="intro"
          data-sc-parallax="hero"
          className="min-h-screen pt-28 pb-20 flex items-center"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 bg-[#07080B]/80 lg:bg-[#07080B]/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-[#F4F0EA]/10">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#FF4F1F]/15 border border-[#FF4F1F]/30 font-mono text-xs text-[#FF4F1F]">
                <span className="w-2 h-2 rounded-full bg-[#FF4F1F]" />
                <span>Senior Flutter & Mobile Engineer, 5+ Years</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.06]">
                I build consumer mobile apps used by hundreds of thousands of
                people.
              </h1>

              <p className="text-base sm:text-lg text-[#9DA4B0] max-w-[62ch] leading-relaxed">
                I am Bhanu Pratap, a mobile engineer in Bengaluru. Over the last
                five years I led app engineering at{' '}
                <strong className="text-[#F4F0EA] font-medium">
                  BigBang.Social
                </strong>{' '}
                (500,000+ downloads, $5M+ annual creator payouts) and{' '}
                <strong className="text-[#F4F0EA] font-medium">Under 25</strong>{' '}
                (400,000+ students, $20M+ platform earnings). I also build
                open-source Flutter apps and the 4-platform mobile SDKs for{' '}
                <strong className="text-[#F4F0EA] font-medium">
                  Sarvam AI
                </strong>
                .
              </p>

              {/* Concrete Numbers from Resume */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-[#F4F0EA]/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F4F0EA] tabular-nums">
                    900K+
                  </div>
                  <div className="text-xs font-mono text-[#9DA4B0] mt-1">
                    Users across iOS & Android
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#FF4F1F] tabular-nums">
                    $25M+
                  </div>
                  <div className="text-xs font-mono text-[#9DA4B0] mt-1">
                    Creator & student payouts
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#10B981] tabular-nums">
                    2.1% to 0.7%
                  </div>
                  <div className="text-xs font-mono text-[#9DA4B0] mt-1">
                    Crash rate cut by 65%
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F59E0B] tabular-nums">
                    200ms
                  </div>
                  <div className="text-xs font-mono text-[#9DA4B0] mt-1">
                    WebSocket chat latency
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#bigbang"
                  className="px-5 py-3 rounded-lg bg-[#FF4F1F] text-[#F4F0EA] font-medium text-sm hover:bg-[#e04318] transition-colors"
                >
                  See Shipped Work
                </a>
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(true)}
                  className="px-4 py-3 rounded-lg border border-[#FF4F1F]/40 bg-[#FF4F1F]/10 text-[#FF4F1F] font-mono text-sm hover:bg-[#FF4F1F]/20 transition-colors"
                >
                  View Resume (PDF)
                </button>
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-lg border border-[#F4F0EA]/20 text-sm font-mono hover:bg-[#F4F0EA]/10 transition-colors"
                >
                  GitHub (@ibhanu)
                </a>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-lg border border-[#F4F0EA]/20 text-sm font-mono hover:bg-[#F4F0EA]/10 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right column leaves breathing room for the 3D phones on desktop, and shows real screenshots on mobile */}
            <div className="lg:col-span-5 lg:hidden grid grid-cols-3 gap-3">
              <img
                src="/screenshots/bigbang-2.jpg"
                alt="BigBang.Social app screen"
                className="rounded-xl border border-[#F4F0EA]/15 w-full h-auto"
              />
              <img
                src="/screenshots/under25-1.jpg"
                alt="Under 25 app screen"
                className="rounded-xl border border-[#F4F0EA]/15 w-full h-auto"
              />
              <img
                src="/screenshots/aura-discovery.png"
                alt="Aura app screen"
                className="rounded-xl border border-[#F4F0EA]/15 w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* ===================================================================
            ACT II: BIGBANG.SOCIAL (Scrollcraft Device: Pinned Stage + Screen Switcher)
            =================================================================== */}
        <section
          id="bigbang"
          data-sc-pin="bigbang"
          className="scroll-mt-20 py-24 sm:py-32 border-t border-[#F4F0EA]/10"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8 bg-[#07080B]/85 backdrop-blur-md p-6 sm:p-9 rounded-2xl border border-[#F4F0EA]/10">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4F0EA]/10 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#FF4F1F]">
                    Tech Lead App, Jul 2023 to Apr 2026
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1">
                    BigBang.Social
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {bigbangApp.appStoreUrl && (
                    <a
                      href={bigbangApp.appStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-md bg-[#F4F0EA]/10 hover:bg-[#F4F0EA]/20 font-mono text-xs"
                    >
                      App Store
                    </a>
                  )}
                  {bigbangApp.playStoreUrl && (
                    <a
                      href={bigbangApp.playStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-md bg-[#F4F0EA]/10 hover:bg-[#F4F0EA]/20 font-mono text-xs"
                    >
                      Google Play
                    </a>
                  )}
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#9DA4B0] leading-relaxed max-w-[65ch]">
                Creator monetization platform by Collective Artists Network. As
                Tech Lead for the mobile app, I built the payment abstraction
                layer, native social and KYC integrations, and CI/CD release
                pipeline while mentoring a team of 4 Flutter engineers.
              </p>

              {/* Interactive Screen Switcher (Syncs with the 3D Phone on the right & thumbnail preview) */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#9DA4B0]">
                  Select a screen to preview it on the 3D phone:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {bigbangApp.screens.map((scr, idx) => {
                    const isSelected = bbActiveScreen === idx;
                    return (
                      <button
                        key={scr.id}
                        type="button"
                        onClick={() =>
                          setScreenOverrides((prev) => ({
                            ...prev,
                            bigbang: idx,
                          }))
                        }
                        className={`text-left p-3.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#FF4F1F]/15 border-[#FF4F1F] text-[#F4F0EA]'
                            : 'bg-[#0F1218] border-[#F4F0EA]/10 text-[#9DA4B0] hover:border-[#F4F0EA]/30'
                        }`}
                      >
                        <div className="font-mono text-xs text-[#FF4F1F]">
                          Screen 0{idx + 1}
                        </div>
                        <div className="font-semibold text-sm text-[#F4F0EA] mt-1">
                          {scr.label}
                        </div>
                        <div className="text-xs text-[#9DA4B0] mt-1">
                          {scr.caption}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Plain, factual engineering work from Bhanu's resume, no bold labels per Humanizer §19 */}
              <div className="space-y-4 pt-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#9DA4B0]">
                  What I Built and Shipped
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-[#F4F0EA]/90 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-[#FF4F1F] font-mono">01</span>
                    <span>
                      Built custom payment abstraction layers over Cashfree and
                      Razorpay that processed $5M+ in annual creator payouts
                      across 500,000+ downloads.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FF4F1F] font-mono">02</span>
                    <span>
                      Wrote custom iOS and Android platform channels for
                      real-time media processing and connected Instagram,
                      YouTube, and DigiLocker to remove manual KYC delays.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FF4F1F] font-mono">03</span>
                    <span>
                      Ran memory profiling and lifecycle fixes that cut the app
                      crash rate by 65%, from 2.1% down to 0.7%, and sped up
                      cold start times.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#FF4F1F] font-mono">04</span>
                    <span>
                      Integrated Mixpanel, Firebase Analytics, AppsFlyer, and
                      CleverTap for user segmentation, lifting Day-30 retention
                      by 18%, and set up Fastlane and GitHub Actions CI/CD to
                      cut deployment time by 75%.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Mobile / Inline Screenshot Gallery so users always see the real app clearly */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {bigbangApp.screens.map((scr, idx) => (
                  <button
                    key={scr.id}
                    type="button"
                    onClick={() =>
                      setScreenOverrides((prev) => ({ ...prev, bigbang: idx }))
                    }
                    className={`overflow-hidden rounded-xl border transition-all ${
                      bbActiveScreen === idx
                        ? 'border-[#FF4F1F] ring-2 ring-[#FF4F1F]/40'
                        : 'border-[#F4F0EA]/15 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={scr.url}
                      alt={scr.label}
                      className="w-full h-44 sm:h-56 object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            ACT III: UNDER 25 UNIVERSE (Scrollcraft Device: Split Stage)
            =================================================================== */}
        <section
          id="under25"
          data-sc-pin="under25"
          className="scroll-mt-20 py-24 sm:py-32 border-t border-[#F4F0EA]/10"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8 bg-[#07080B]/85 backdrop-blur-md p-6 sm:p-9 rounded-2xl border border-[#F4F0EA]/10">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4F0EA]/10 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#10B981]">
                    Senior Flutter Developer, Oct 2021 to Jun 2023
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1">
                    Under 25 Universe
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {under25App.appStoreUrl && (
                    <a
                      href={under25App.appStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-md bg-[#F4F0EA]/10 hover:bg-[#F4F0EA]/20 font-mono text-xs"
                    >
                      App Store
                    </a>
                  )}
                  {under25App.playStoreUrl && (
                    <a
                      href={under25App.playStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-md bg-[#F4F0EA]/10 hover:bg-[#F4F0EA]/20 font-mono text-xs"
                    >
                      Google Play
                    </a>
                  )}
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#9DA4B0] leading-relaxed max-w-[65ch]">
                Student community and earning app. I led the Flutter mobile
                experience for 400,000+ students completing missions, joining
                campus spaces, and earning over $20M+ on the platform.
              </p>

              {/* Interactive Screen Switcher for Under 25 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {under25App.screens.map((scr, idx) => {
                  const isSelected = u25ActiveScreen === idx;
                  return (
                    <button
                      key={scr.id}
                      type="button"
                      onClick={() =>
                        setScreenOverrides((prev) => ({
                          ...prev,
                          under25: idx,
                        }))
                      }
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#10B981]/15 border-[#10B981] text-[#F4F0EA]'
                          : 'bg-[#0F1218] border-[#F4F0EA]/10 text-[#9DA4B0] hover:border-[#F4F0EA]/30'
                      }`}
                    >
                      <div className="font-mono text-xs text-[#10B981]">
                        Screen 0{idx + 1}
                      </div>
                      <div className="font-semibold text-sm text-[#F4F0EA] mt-1">
                        {scr.label}
                      </div>
                      <div className="text-xs text-[#9DA4B0] mt-1">
                        {scr.caption}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#9DA4B0]">
                  What I Built and Shipped
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-[#F4F0EA]/90 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-[#10B981] font-mono">01</span>
                    <span>
                      Built the real-time chat system on WebSockets with
                      background isolate threading, dropping message latency
                      from 500ms to 200ms.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#10B981] font-mono">02</span>
                    <span>
                      Standardized state management and created a shared library
                      of 30+ reusable widgets, cutting feature development time
                      by 30% and reducing cross-feature UI bugs.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#10B981] font-mono">03</span>
                    <span>
                      Cut redundant API calls for low-bandwidth campus networks,
                      built custom A/B testing pipelines, and removed rendering
                      bottlenecks to keep scrolling at 60 FPS.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {under25App.screens.map((scr, idx) => (
                  <button
                    key={scr.id}
                    type="button"
                    onClick={() =>
                      setScreenOverrides((prev) => ({ ...prev, under25: idx }))
                    }
                    className={`overflow-hidden rounded-xl border transition-all ${
                      u25ActiveScreen === idx
                        ? 'border-[#10B981] ring-2 ring-[#10B981]/40'
                        : 'border-[#F4F0EA]/15 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={scr.url}
                      alt={scr.label}
                      className="w-full h-44 sm:h-56 object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            ACT IV: OPEN-SOURCE CONSUMER APPS (AURA & MANGO)
            =================================================================== */}
        <section
          id="opensource"
          data-sc-pan="opensource"
          className="scroll-mt-20 py-24 sm:py-32 border-t border-[#F4F0EA]/10"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8 bg-[#07080B]/88 backdrop-blur-md p-6 sm:p-9 rounded-2xl border border-[#F4F0EA]/10">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#F59E0B]">
                  Open-Source Consumer Products
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-1">
                  Aura Dating & Mango
                </h2>
                <p className="text-base text-[#9DA4B0] mt-3 max-w-[62ch]">
                  Outside of my full-time roles, I design and ship full-stack
                  Flutter apps end to end, from gesture physics and iOS home
                  screen widgets to Supabase backends.
                </p>
              </div>

              {/* Project 1: Aura */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#0F1218] border border-[#F4F0EA]/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#F4F0EA]">
                      {auraApp.name}
                    </h3>
                    <p className="text-xs font-mono text-[#FF4F1F]">
                      Flutter 3.32, Supabase Realtime, Clean Architecture
                    </p>
                  </div>
                  {auraApp.githubUrl && (
                    <a
                      href={auraApp.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-md bg-[#FF4F1F] text-[#F4F0EA] font-mono text-xs"
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
                <p className="text-sm text-[#9DA4B0] leading-relaxed">
                  Open-source dating app in Flutter and Supabase. Includes a
                  card discovery deck with custom spring-physics swipe gestures,
                  real-time Postgres chat, and freemium paywall flows separated
                  into data, domain, and presentation layers.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {auraApp.screens.map((scr, idx) => (
                    <button
                      key={scr.id}
                      type="button"
                      onClick={() =>
                        setScreenOverrides((prev) => ({ ...prev, aura: idx }))
                      }
                      className={`overflow-hidden rounded-lg border text-left transition-all ${
                        auraActiveScreen === idx
                          ? 'border-[#FF4F1F] ring-2 ring-[#FF4F1F]/40'
                          : 'border-[#F4F0EA]/10 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={scr.url}
                        alt={scr.label}
                        className="w-full h-36 sm:h-44 object-cover object-top"
                      />
                      <div className="p-2 text-[11px] font-mono text-[#F4F0EA] truncate">
                        {scr.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Project 2: Mango */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#0F1218] border border-[#F4F0EA]/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#F4F0EA]">
                      Mango: Daily Affirmations
                    </h3>
                    <p className="text-xs font-mono text-[#F59E0B]">
                      Flutter, Native iOS WidgetKit, 60 FPS Parallax
                    </p>
                  </div>
                  {mangoApp.githubUrl && (
                    <a
                      href={mangoApp.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-md bg-[#F59E0B] text-[#111318] font-mono text-xs font-semibold"
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
                <p className="text-sm text-[#9DA4B0] leading-relaxed">
                  Consumer daily affirmation app with multi-layer parallax
                  backgrounds, a streak mascot progression system, custom theme
                  studio, and native iOS Home Screen and Lock Screen widgets
                  built with Swift WidgetKit.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {mangoApp.screens.map((scr, idx) => (
                    <button
                      key={scr.id}
                      type="button"
                      onClick={() =>
                        setScreenOverrides((prev) => ({ ...prev, mango: idx }))
                      }
                      className={`overflow-hidden rounded-lg border text-left transition-all ${
                        mangoActiveScreen === idx
                          ? 'border-[#F59E0B] ring-2 ring-[#F59E0B]/40'
                          : 'border-[#F4F0EA]/10 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={scr.url}
                        alt={scr.label}
                        className="w-full h-36 sm:h-44 object-cover object-top"
                      />
                      <div className="p-2 text-[11px] font-mono text-[#F4F0EA] truncate">
                        {scr.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            ACT V: HARD GROUND CUT TO WARM PAPER — SARVAM AI SDKs & GO BACKEND
            (Scrollcraft Device: Hard Ground Cut `data-sc-ground="paper"`)
            =================================================================== */}
        <section
          id="sdks"
          data-sc-ground="paper"
          className="scroll-mt-20 py-24 sm:py-32 bg-[#F4F0EA] text-[#111318] border-t border-[#111318]/15"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
            <div className="max-w-3xl space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#FF4F1F] font-semibold">
                Multi-Platform SDKs & Backend Boilerplates
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111318]">
                Sarvam AI Mobile SDKs & Go Microservices
              </h2>
              <p className="text-base sm:text-lg text-[#111318]/75 leading-relaxed">
                Alongside consumer apps, I built the 4-platform mobile SDK suite
                for Sarvam AI (Flutter, iOS SwiftPM, Android Kotlin, and React
                Native) with 97.8% test coverage, plus a production Go
                microservice template with JWT auth, Prisma PostgreSQL, and
                Docker.
              </p>
            </div>

            {/* Interactive Code Explorer across all 5 languages */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                {SARVAM_SDK_TABS.map((tab, idx) => {
                  const active = selectedSdkTab === idx;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedSdkTab(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        active
                          ? 'bg-[#111318] text-[#F4F0EA] border-[#111318] shadow-md'
                          : 'bg-white/70 text-[#111318] border-[#111318]/15 hover:border-[#111318]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-base">{tab.label}</span>
                        <span
                          className={`font-mono text-xs px-2 py-0.5 rounded ${
                            active
                              ? 'bg-[#FF4F1F] text-[#F4F0EA]'
                              : 'bg-[#111318]/10 text-[#111318]'
                          }`}
                        >
                          {tab.packageBadge}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-2 leading-relaxed ${
                          active ? 'text-[#F4F0EA]/80' : 'text-[#111318]/70'
                        }`}
                      >
                        {tab.architectureNote}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 rounded-2xl bg-[#0B0D12] text-[#F4F0EA] border border-[#111318]/20 overflow-hidden shadow-xl">
                <div className="px-5 py-3.5 bg-[#131720] border-b border-[#F4F0EA]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF4F1F]" />
                    <span className="font-mono text-xs text-[#F4F0EA]">
                      {activeSdk.label} ({activeSdk.packageBadge})
                    </span>
                  </div>
                  <a
                    href={activeSdk.packageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-[#FF4F1F] hover:underline"
                  >
                    View on GitHub
                  </a>
                </div>
                <pre className="p-5 sm:p-6 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-[#F4F0EA]/90">
                  <code>{activeSdk.code}</code>
                </pre>
              </div>
            </div>

            {/* Complete Skills & Education Row from Resume */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-[#111318]/15">
              <div className="p-5 rounded-xl bg-white/80 border border-[#111318]/10">
                <div className="font-mono text-xs uppercase text-[#FF4F1F] font-semibold">
                  Mobile
                </div>
                <div className="font-bold text-base mt-1">
                  Flutter & Native OS
                </div>
                <p className="text-sm text-[#111318]/75 mt-2 leading-relaxed">
                  Flutter, Dart, iOS (Swift, WidgetKit), Android (Kotlin),
                  Platform Channels, BLoC, Riverpod, Provider, GetX, MVC/MVVM.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/80 border border-[#111318]/10">
                <div className="font-mono text-xs uppercase text-[#FF4F1F] font-semibold">
                  Backend & Real-Time
                </div>
                <div className="font-bold text-base mt-1">
                  Go, Supabase & Sockets
                </div>
                <p className="text-sm text-[#111318]/75 mt-2 leading-relaxed">
                  Golang, WebSockets, WebRTC, Supabase, Firebase, REST, GraphQL,
                  PostgreSQL (Prisma), React.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/80 border border-[#111318]/10">
                <div className="font-mono text-xs uppercase text-[#FF4F1F] font-semibold">
                  DevOps & Analytics
                </div>
                <div className="font-bold text-base mt-1">
                  CI/CD & Retention
                </div>
                <p className="text-sm text-[#111318]/75 mt-2 leading-relaxed">
                  Fastlane, GitHub Actions, Docker, Jenkins, Mixpanel,
                  CleverTap, AppsFlyer, Firebase Crashlytics, Sentry, SonarQube.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/80 border border-[#111318]/10">
                <div className="font-mono text-xs uppercase text-[#FF4F1F] font-semibold">
                  Education
                </div>
                <div className="font-bold text-base mt-1">
                  B.Tech in Computer Science
                </div>
                <p className="text-sm text-[#111318]/75 mt-2 leading-relaxed">
                  Sri Venkateshwara College of Engineering, Bengaluru (2017 to
                  2021).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            ACT VI: CONTACT & RESUME (Scrollcraft Device: Spotlight Close)
            =================================================================== */}
        <section
          id="contact"
          data-sc-spotlight="contact"
          className="py-24 sm:py-32 bg-[#07080B] text-[#F4F0EA] border-t border-[#F4F0EA]/10"
        >
          <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 font-mono text-xs text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>Open to Senior and Lead Mobile Engineering Roles</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Let&apos;s build your next mobile app.
            </h2>

            <p className="text-base sm:text-lg text-[#9DA4B0] max-w-xl mx-auto leading-relaxed">
              Based in Bengaluru, India. Reach out directly by email or phone,
              or download my resume below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="px-6 py-3.5 rounded-xl bg-[#FF4F1F] text-[#F4F0EA] font-medium text-sm sm:text-base hover:bg-[#e04318] transition-colors"
              >
                {PROFILE_DATA.email}
              </a>
              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="px-6 py-3.5 rounded-xl border border-[#FF4F1F]/40 bg-[#FF4F1F]/15 font-mono text-sm text-[#FF4F1F] hover:bg-[#FF4F1F]/25 transition-colors"
              >
                View Verified Resume
              </button>
              <a
                href={PROFILE_DATA.resumeUrl}
                download="Bhanu_Pratap_Resume.pdf"
                className="px-6 py-3.5 rounded-xl border border-[#F4F0EA]/20 font-mono text-sm hover:bg-[#F4F0EA]/10 transition-colors"
              >
                Download Resume PDF
              </a>
              <a
                href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, '')}`}
                className="px-6 py-3.5 rounded-xl border border-[#F4F0EA]/20 font-mono text-sm hover:bg-[#F4F0EA]/10 transition-colors"
              >
                {PROFILE_DATA.phone}
              </a>
            </div>

            <div className="pt-10 border-t border-[#F4F0EA]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9DA4B0]">
              <div>Bhanu Pratap, Bengaluru, India</div>
              <div className="flex items-center gap-6">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F4F0EA]"
                >
                  GitHub: ibhanu
                </a>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#F4F0EA]"
                >
                  LinkedIn: itsbhanupratap
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING 3D INTERACTION HUD */}
      <aside aria-label="3D Controls" className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-full bg-[#07080B]/90 border border-[#F4F0EA]/15 backdrop-blur-md shadow-2xl">
        <button
          type="button"
          onClick={() => setOrbitMode(!orbitMode)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors flex items-center gap-2 ${
            orbitMode
              ? 'bg-[#FF4F1F] text-white font-medium shadow-md shadow-[#FF4F1F]/20'
              : 'text-[#9DA4B0] hover:text-[#F4F0EA]'
          }`}
          title={orbitMode ? 'Click to re-enable scroll camera' : 'Click to inspect phones in 3D'}
        >
          <span className={`w-2 h-2 rounded-full ${orbitMode ? 'bg-white animate-pulse' : 'bg-[#FF4F1F]'}`} />
          <span>{orbitMode ? '3D Orbit: Active (Drag Handsets)' : 'Inspect in 3D'}</span>
        </button>
      </aside>

      {/* RESUME VIEWER MODAL */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
