'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  PROFILE_DATA,
  MOBILE_APPS,
  SARVAM_SDK_TABS,
  ARCHITECTURE_LAYERS,
} from '@/data/portfolioData';
import ResumeModal from '@/components/ResumeModal';
import ImageLightbox from '@/components/ImageLightbox';
import StickyScrollShowcase from '@/components/StickyScrollShowcase';
import IPhoneMockup from '@/components/IPhoneMockup';
import {
  Menu,
  X,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

export default function BhanuDeveloperPortfolio() {
  const [selectedSdkTab, setSelectedSdkTab] = useState(0);
  const [activeArchLayer, setActiveArchLayer] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Pinned kinetic scroll refs & state
  const bigbangRef = useRef<HTMLElement>(null);
  const [bigbangStep, setBigbangStep] = useState(0);

  const under25Ref = useRef<HTMLElement>(null);
  const [under25Step, setUnder25Step] = useState(0);

  const archRef = useRef<HTMLElement>(null);
  const [archProgress, setArchProgress] = useState(0);

  const sarvamRef = useRef<HTMLElement>(null);
  const [sarvamProgress, setSarvamProgress] = useState(0);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<{ url: string; label: string; caption?: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: { url: string; label: string; caption?: string }[], index: number = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const copyCodeToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const copyEmailToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  useEffect(() => {
    let raf = 0;
    const updateKineticScroll = () => {
      const windowH = window.innerHeight;

      // 1. BigBang Case Study Pinned Milestone Scrub
      if (bigbangRef.current) {
        const rect = bigbangRef.current.getBoundingClientRect();
        const total = bigbangRef.current.offsetHeight - windowH;
        if (total > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / total));
          const step = Math.min(2, Math.floor(p * 3));
          setBigbangStep(step);
        }
      }

      // 2. Under 25 Concurrency Pinned Milestone Scrub
      if (under25Ref.current) {
        const rect = under25Ref.current.getBoundingClientRect();
        const total = under25Ref.current.offsetHeight - windowH;
        if (total > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / total));
          const step = Math.min(2, Math.floor(p * 3));
          setUnder25Step(step);
        }
      }

      // 3. Silicon Architecture Pinned Layer Scrub
      if (archRef.current) {
        const rect = archRef.current.getBoundingClientRect();
        const total = archRef.current.offsetHeight - windowH;
        if (total > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / total));
          setArchProgress(p);
          const layerIdx = Math.min(ARCHITECTURE_LAYERS.length - 1, Math.floor(p * ARCHITECTURE_LAYERS.length));
          setActiveArchLayer(layerIdx);
        }
      }

      // 4. Sarvam AI Studio Pinned Multi-Platform Code Scrub
      if (sarvamRef.current) {
        const rect = sarvamRef.current.getBoundingClientRect();
        const total = sarvamRef.current.offsetHeight - windowH;
        if (total > 0) {
          const p = Math.max(0, Math.min(1, -rect.top / total));
          setSarvamProgress(p);
          const tabIdx = Math.min(SARVAM_SDK_TABS.length - 1, Math.floor(p * SARVAM_SDK_TABS.length));
          setSelectedSdkTab(tabIdx);
        }
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateKineticScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateKineticScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const currentTab = SARVAM_SDK_TABS[selectedSdkTab] || SARVAM_SDK_TABS[0];
  const currentLayer = ARCHITECTURE_LAYERS[activeArchLayer] || ARCHITECTURE_LAYERS[0];

  return (
    <div className="relative min-h-[100dvh] bg-[#0A0A0D] text-[#F5F5F7] selection:bg-[#D93800] selection:text-white">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#0A0A0D]/95">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
          
          {/* Brand & Coordinates */}
          <a
            href="#top"
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800] rounded-lg"
          >
            <span className="w-3 h-3 rounded-full bg-[#D93800]" />
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-display uppercase block">
                Bhanu Pratap
              </span>
              <span className="text-[13px] text-[#A2A3B0] block">
                Bengaluru, India
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Strict Single Line) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] xl:text-sm font-medium text-[#E0E0E6] whitespace-nowrap" aria-label="Main">
            <a href="#showcase-rail" className="whitespace-nowrap hover:text-white transition-colors">
              Showcase
            </a>
            <a href="#bigbang" className="whitespace-nowrap hover:text-white transition-colors">
              BigBang.Social
            </a>
            <a href="#under25" className="whitespace-nowrap hover:text-white transition-colors">
              Under 25
            </a>
            <a href="#architecture" className="whitespace-nowrap hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#sarvam" className="whitespace-nowrap hover:text-white transition-colors">
              Sarvam AI
            </a>
            <a href="#opensource" className="whitespace-nowrap hover:text-white transition-colors">
              Consumer Apps
            </a>
            <a href="#contact" className="whitespace-nowrap hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsResumeOpen(true)}
              type="button"
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#181920] text-[#F5F5F7] hover:bg-[#22232D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800]"
            >
              Verified Credentials
            </button>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800]"
            >
              Direct Inquiries
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#181920] text-[#F5F5F7]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121318] px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 text-base font-medium text-[#E0E0E6]">
              <a
                href="#showcase-rail"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Production Showcase
              </a>
              <a
                href="#bigbang"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                BigBang.Social
              </a>
              <a
                href="#under25"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Under 25 Universe
              </a>
              <a
                href="#architecture"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Systems Architecture
              </a>
              <a
                href="#sarvam"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Sarvam AI SDKs
              </a>
              <a
                href="#opensource"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Consumer Craft
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-white transition-colors py-1"
              >
                Contact
              </a>
            </nav>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                type="button"
                className="w-full text-center py-3 rounded-lg text-sm font-semibold bg-[#181920] text-[#F5F5F7]"
              >
                Verified Credentials
              </button>
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="w-full text-center py-3 rounded-lg text-sm font-semibold bg-[#D93800] text-white"
              >
                Direct Inquiries
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main id="top" className="pt-24 space-y-32 md:space-y-44">

        {/* 2. ACT 1: THE DIMENSIONAL MONUMENT HERO */}
        <section
          data-sc-act="layered-depth"
          className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-20 sc-enter"
        >
          {/* Coordinates Header Tag */}
          <div className="flex items-center gap-3 text-sm text-[#A2A3B0] font-medium mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span>Staff Mobile & Systems Engineering Leadership</span>
            <span className="text-[#A2A3B0] hidden sm:inline">12.9716° N, 77.5946° E</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Monumental Title & Value Proposition */}
            <div className="lg:col-span-7 space-y-7">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5F5F7] leading-[0.95] font-display uppercase">
                Mobile Systems at 900K+ Scale
              </h1>

              <p className="text-lg sm:text-xl text-[#E0E0E6] leading-relaxed max-w-2xl">
                Engineering creator monetization engines, 200ms background isolate pipelines,
                and multi-platform Indic speech SDKs from Bengaluru, India.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#showcase-rail"
                  className="px-6 py-3.5 rounded-lg text-base font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800]"
                >
                  Inspect Shipped Systems
                </a>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  type="button"
                  className="px-6 py-3.5 rounded-lg text-base font-semibold bg-[#121318] text-[#F5F5F7] hover:bg-[#1A1B22] transition-colors"
                >
                  Verified Credentials (PDF)
                </button>
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-lg text-base font-semibold bg-[#121318] text-[#F5F5F7] hover:bg-[#1A1B22] transition-colors"
                >
                  GitHub Systems
                </a>
              </div>

              {/* Verified Telemetry Instrumentation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
                <div className="p-5 rounded-xl bg-[#121318] space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                    900K+
                  </div>
                  <div className="text-sm text-[#A2A3B0] leading-tight">
                    Store Downloads
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#121318] space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#FF5520] font-display">
                    $25M+
                  </div>
                  <div className="text-sm text-[#A2A3B0] leading-tight">
                    Platform Volume
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#121318] space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#10B981] font-display">
                    200ms
                  </div>
                  <div className="text-sm text-[#A2A3B0] leading-tight">
                    Socket Latency
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#121318] space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#F59E0B] font-display">
                    65%
                  </div>
                  <div className="text-sm text-[#A2A3B0] leading-tight">
                    Crash Reduction
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Physical Titanium Hardware Handset */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[320px] sm:max-w-[340px]">
                <IPhoneMockup
                  screenshotUrl="/screenshots/bigbang-1.webp"
                  alt="BigBang.Social Flagship Creator Hub"
                  appName="BigBang.Social Production Handset"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. ACT 2: HORIZONTAL PINNED SHOWCASE RAIL */}
        <StickyScrollShowcase />

        {/* 4. ACT 3: BIGBANG.SOCIAL FLAGSHIP DEEP-DIVE */}
        <section
          id="bigbang"
          ref={bigbangRef}
          data-sc-act="case-study"
          className="scroll-mt-20 relative w-full lg:min-h-[200vh]"
        >
          <div className="lg:sticky lg:top-16 w-full min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-4 sm:py-6 overflow-hidden bg-[#0C0D12]">
            <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center">
              
              {/* Architecture Highlights & Large Handset Display Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
                
                {/* Left Column: Header + Systems Engineering Milestones */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5">
                  
                  {/* Header Plate */}
                  <div className="space-y-2 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
                          BigBang.Social Super-App
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <a
                          href="https://apps.apple.com/us/app/bigbang-social/id6450163388"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-lg text-[13px] font-semibold bg-[#1C1E26] text-white hover:bg-[#282A36] transition-colors flex items-center gap-1.5 border border-[#2A2C38]"
                        >
                          <span>App Store</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.collectiveartists.bigbangsocial"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-lg text-[13px] font-semibold bg-[#1C1E26] text-white hover:bg-[#282A36] transition-colors flex items-center gap-1.5 border border-[#2A2C38]"
                        >
                          <span>Google Play</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <p className="text-base text-[#D1D1DB] leading-relaxed max-w-2xl">
                      Creator monetization platform by Collective Artists Network handling 500,000+ downloads &amp; $5M+ annual volume (Milestone {bigbangStep + 1} of 3).
                    </p>
                  </div>

                  {/* Milestones Header */}
                  <div className="flex items-center justify-between pt-0.5">
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      Core Engineering Milestones
                    </h3>
                    <span className="text-[13px] text-[#A2A3B0] hidden sm:inline">
                      Scrubbing Milestone {bigbangStep + 1} of 3
                    </span>
                  </div>

                  {/* Interactive Milestone Cards */}
                  <div className="space-y-2">
                    <div
                      onClick={() => setBigbangStep(0)}
                      className={`p-3 sm:p-3.5 rounded-xl transition-[background-color,border-color,opacity] duration-200 cursor-pointer ${
                        bigbangStep === 0
                          ? 'bg-[#181A22] border-l-4 border-[#D93800] text-white'
                          : 'bg-[#12131A] opacity-75 hover:opacity-100 text-[#D1D1DB]'
                      }`}
                    >
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        Payment Abstraction Layer ($5M+ Annual Volume)
                      </h4>
                      <p className="text-base leading-relaxed mt-0.5 text-[#E0E0E6]">
                        Engineered a resilient multi-gateway adapter unifying Cashfree and Razorpay APIs with zero dropped transactions.
                      </p>
                    </div>

                    <div
                      onClick={() => setBigbangStep(1)}
                      className={`p-3 sm:p-3.5 rounded-xl transition-[background-color,border-color,opacity] duration-200 cursor-pointer ${
                        bigbangStep === 1
                          ? 'bg-[#181A22] border-l-4 border-[#D93800] text-white'
                          : 'bg-[#12131A] opacity-75 hover:opacity-100 text-[#D1D1DB]'
                      }`}
                    >
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        65% Crash Reduction via Memory Profiling
                      </h4>
                      <p className="text-base leading-relaxed mt-0.5 text-[#E0E0E6]">
                        Conducted low-level memory inspection in Instruments, eliminating texture retention leaks and dropping crash rates to 0.7%.
                      </p>
                    </div>

                    <div
                      onClick={() => setBigbangStep(2)}
                      className={`p-3 sm:p-3.5 rounded-xl transition-[background-color,border-color,opacity] duration-200 cursor-pointer ${
                        bigbangStep === 2
                          ? 'bg-[#181A22] border-l-4 border-[#D93800] text-white'
                          : 'bg-[#12131A] opacity-75 hover:opacity-100 text-[#D1D1DB]'
                      }`}
                    >
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        Deep OS Integrations &amp; Automated KYC
                      </h4>
                      <p className="text-base leading-relaxed mt-0.5 text-[#E0E0E6]">
                        Constructed custom platform channels bridging native media engines with Instagram APIs and DigiLocker instant verification.
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {['Flutter', 'MethodChannels', 'DigiLocker KYC', 'Cashfree', 'Razorpay', 'Fastlane', 'Mixpanel'].map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md text-[13px] bg-[#14151D] text-[#D1D1DB] border border-[#222430]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Heroic Large Handset Screenshot fitted to viewport */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-2.5">
                  <div className="text-xs sm:text-sm font-semibold text-white flex items-center justify-between w-full max-w-[320px]">
                    <span>Production Handset Display</span>
                    <span className="text-[13px] text-[#FF5520]">Screen {bigbangStep + 1} of 3</span>
                  </div>

                  {/* Handset Frame with Large Screenshot, constrained cleanly by viewport height */}
                  <div
                    onClick={() => openLightbox(MOBILE_APPS[0].screens, bigbangStep)}
                    className="h-[min(540px,calc(100dvh-15rem))] max-h-[72vh] aspect-[1206/2622] cursor-pointer group flex items-center justify-center"
                  >
                    <IPhoneMockup
                      screenshotUrl={MOBILE_APPS[0].screens[bigbangStep].url}
                      alt={MOBILE_APPS[0].screens[bigbangStep].label}
                      appName="BigBang.Social Production"
                      className="h-full aspect-[1206/2622]"
                    />
                  </div>

                  {/* Synchronized Screen Selector Pills */}
                  <div className="flex items-center gap-1.5 pt-0.5 w-full max-w-[300px]">
                    {MOBILE_APPS[0].screens.map((screen, idx) => {
                      const isActive = bigbangStep === idx;
                      return (
                        <button
                          key={screen.id}
                          type="button"
                          onClick={() => {
                            setBigbangStep(idx);
                            openLightbox(MOBILE_APPS[0].screens, idx);
                          }}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[13px] font-semibold transition-colors truncate ${
                            isActive
                              ? 'bg-[#D93800] text-white'
                              : 'bg-[#181920] text-[#E0E0E6] hover:bg-[#22232D] hover:text-white'
                          }`}
                        >
                          {screen.label.replace(' BigBang.Social', '')}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[13px] text-[#A2A3B0] text-center max-w-[280px]">
                    Current Screen: <span className="text-white font-medium">{MOBILE_APPS[0].screens[bigbangStep].label}</span>. Tap to inspect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ACT 4: UNDER 25 UNIVERSE DEEP-DIVE */}
        <section
          id="under25"
          ref={under25Ref}
          data-sc-act="case-study"
          className="scroll-mt-20 relative w-full lg:min-h-[200vh]"
        >
          <div className="lg:sticky lg:top-16 w-full min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-4 sm:py-6 overflow-hidden bg-[#0A0B10]">
            <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center">
              
              {/* Architecture Highlights: Symmetrical Inverted Grid (Large Screens Left, Milestones Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-12 items-center">
                
                {/* Left Column: Heroic Large Handset Screenshot fitted to viewport */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-2.5 order-2 lg:order-1">
                  <div className="text-xs sm:text-sm font-semibold text-white flex items-center justify-between w-full max-w-[320px]">
                    <span>Production Handset Display</span>
                    <span className="text-[13px] text-[#10B981]">Screen {under25Step + 1} of 3</span>
                  </div>

                  {/* Handset Frame with Large Screenshot, constrained cleanly by viewport height */}
                  <div
                    onClick={() => openLightbox(MOBILE_APPS[1].screens, under25Step)}
                    className="h-[min(540px,calc(100dvh-15rem))] max-h-[72vh] aspect-[1206/2622] cursor-pointer group flex items-center justify-center"
                  >
                    <IPhoneMockup
                      screenshotUrl={MOBILE_APPS[1].screens[under25Step].url}
                      alt={MOBILE_APPS[1].screens[under25Step].label}
                      appName="Under 25 Universe Production"
                      className="h-full aspect-[1206/2622]"
                    />
                  </div>

                  {/* Synchronized Screen Selector Pills */}
                  <div className="flex items-center gap-1.5 pt-0.5 w-full max-w-[300px]">
                    {MOBILE_APPS[1].screens.map((screen, idx) => {
                      const isActive = under25Step === idx;
                      return (
                        <button
                          key={screen.id}
                          type="button"
                          onClick={() => {
                            setUnder25Step(idx);
                            openLightbox(MOBILE_APPS[1].screens, idx);
                          }}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[13px] font-semibold transition-colors truncate ${
                            isActive
                              ? 'bg-[#10B981] text-white'
                              : 'bg-[#181920] text-[#E0E0E6] hover:bg-[#22232D] hover:text-white'
                          }`}
                        >
                          {screen.label.replace(' Under 25', '')}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[13px] text-[#A2A3B0] text-center max-w-[280px]">
                    Current Screen: <span className="text-white font-medium">{MOBILE_APPS[1].screens[under25Step].label}</span>. Tap to inspect.
                  </p>
                </div>

                {/* Right Column: Header + Systems Engineering Milestones */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5 order-1 lg:order-2">
                  
                  {/* Header Plate */}
                  <div className="space-y-2 pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
                          Under 25 Universe Ecosystem
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <a
                          href="https://apps.apple.com/us/app/under-25/id1580357687"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-lg text-[13px] font-semibold bg-[#181A22] text-white hover:bg-[#242632] transition-colors flex items-center gap-1.5 border border-[#262836]"
                        >
                          <span>App Store</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.under25universe.under25app"
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-lg text-[13px] font-semibold bg-[#181A22] text-white hover:bg-[#242632] transition-colors flex items-center gap-1.5 border border-[#262836]"
                        >
                          <span>Google Play</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <p className="text-base text-[#D1D1DB] leading-relaxed max-w-2xl">
                      Student super-app mobile architecture supporting 400,000+ users &amp; $20M+ campus platform earnings (Milestone {under25Step + 1} of 3).
                    </p>
                  </div>

                  {/* Milestones Header */}
                  <div className="flex items-center justify-between pt-0.5">
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      Core Engineering Milestones
                    </h3>
                    <span className="text-[13px] text-[#A2A3B0] hidden sm:inline">
                      Scrubbing Milestone {under25Step + 1} of 3
                    </span>
                  </div>

                  {/* Interactive Milestone Cards */}
                  <div className="space-y-2">
                    <div
                      onClick={() => setUnder25Step(0)}
                      className={`p-3 sm:p-3.5 rounded-xl transition-[background-color,border-color,opacity] duration-200 cursor-pointer ${
                        under25Step === 0
                          ? 'bg-[#161E1A] border-l-4 border-[#10B981] text-white'
                          : 'bg-[#101217] opacity-75 hover:opacity-100 text-[#D1D1DB]'
                      }`}
                    >
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        200ms Low-Latency WebSocket Chat Engine
                      </h4>
                      <p className="text-base leading-relaxed mt-0.5 text-[#E0E0E6]">
                        Offloaded message JSON parsing and socket multiplexing to dedicated background Dart Isolates, dropping latency to 200ms.
                      </p>
                    </div>

                    <div
                      onClick={() => setUnder25Step(1)}
                      className={`p-3 sm:p-3.5 rounded-xl transition-[background-color,border-color,opacity] duration-200 cursor-pointer ${
                        under25Step === 1
                          ? 'bg-[#161E1A] border-l-4 border-[#10B981] text-white'
                          : 'bg-[#101217] opacity-75 hover:opacity-100 text-[#D1D1DB]'
                      }`}
                    >
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        30+ Reusable Design System Component Library
                      </h4>
                      <p className="text-base leading-relaxed mt-0.5 text-[#E0E0E6]">
                        Standardized core widgets across missions, wallets, and community feeds, accelerating feature delivery cycles by 30%.
                      </p>
                    </div>

                    <div
                      onClick={() => setUnder25Step(2)}
                      className={`p-3 sm:p-3.5 rounded-xl transition-[background-color,border-color,opacity] duration-200 cursor-pointer ${
                        under25Step === 2
                          ? 'bg-[#161E1A] border-l-4 border-[#10B981] text-white'
                          : 'bg-[#101217] opacity-75 hover:opacity-100 text-[#D1D1DB]'
                      }`}
                    >
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        60 FPS Rendering in Low-Bandwidth Networks
                      </h4>
                      <p className="text-base leading-relaxed mt-0.5 text-[#E0E0E6]">
                        Implemented custom local caching layers and repaint boundaries, preventing layout thrashing on budget Android devices.
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {['Flutter', 'WebSockets', 'Dart Isolates', '30+ Widget System', 'A/B Testing Engine', '60 FPS Profiling'].map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md text-[13px] bg-[#12141A] text-[#D1D1DB] border border-[#1E2028]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ACT 5: ARCHITECTURAL LAYERS & SILICON BRIDGE */}
        <section
          id="architecture"
          ref={archRef}
          data-sc-act="curtain-reveal"
          className="scroll-mt-24 relative w-full lg:min-h-[260vh]"
        >
          <div className="lg:sticky lg:top-0 min-h-[100dvh] flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 lg:py-10">
            <div className="space-y-6">
              
              {/* Header Plate with Kinetic Progress Scrubber */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
                    Flutter to Silicon Internals
                  </h2>
                  <p className="text-base text-[#E0E0E6] max-w-2xl mt-1 leading-relaxed">
                    Execution path from Dart widgets down to Apple Silicon Metal &amp; Vulkan GPU pipelines (Layer {activeArchLayer + 1} of 4).
                  </p>
                </div>

                {/* Kinetic Progress Bar */}
                <div className="w-full md:w-64 bg-[#181920] rounded-full h-3 p-0.5 overflow-hidden">
                  <div
                    className="bg-[#D93800] h-full rounded-full transition-[width] duration-150"
                    style={{ width: `${Math.round(archProgress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Silicon Stack Console: Left Stack Diagram + Right Invariant Blueprint */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Column: Visual 4-Tier Interactive Silicon Stack */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <div className="text-sm font-semibold text-white flex items-center justify-between pb-1">
                    <span>Silicon Architecture Stack</span>
                    <span className="text-[13px] text-[#A2A3B0]">Scroll to Scrub</span>
                  </div>

                  {ARCHITECTURE_LAYERS.map((layer, idx) => {
                    const isSelected = activeArchLayer === idx;
                    const layerShortNames = [
                      'UI & Impeller Shaders',
                      'Reactive Domain & Isolates',
                      'Native C-FFI & Channels',
                      'Silicon GPU & Kernel Bridge',
                    ];
                    return (
                      <button
                        key={layer.id}
                        type="button"
                        onClick={() => setActiveArchLayer(idx)}
                        className={`p-4 rounded-xl text-left transition-[background-color,border-color,opacity] duration-200 ${
                          isSelected
                            ? 'bg-[#1E2028] text-white border-2 border-[#D93800]'
                            : 'bg-[#121318] text-[#E0E0E6] border-2 border-transparent hover:bg-[#181920] hover:text-white opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[13px] font-semibold text-[#FF5520]">
                            Tier 0{idx + 1}
                          </span>
                          <span className="text-[13px] text-[#A2A3B0] font-medium">
                            {layer.metrics.split('•')[0].trim()}
                          </span>
                        </div>
                        <div className="text-base font-bold text-white font-display">
                          {layerShortNames[idx] || layer.name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Active Tier Blueprint (Only What Matters!) */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#121318] flex flex-col justify-between space-y-5">
                  
                  {/* Layer Header & Hard Telemetry Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 bg-[#181920] p-4 sm:p-5 rounded-xl">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                        {currentLayer.name.replace(/LAYER \d+ \/\/ /, '')}
                      </h3>
                      <p className="text-sm text-[#FF5520] mt-0.5">
                        {currentLayer.subtitle}
                      </p>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-lg bg-[#22232D] text-sm text-[#F5F5F7] font-semibold self-start sm:self-auto">
                      {currentLayer.metrics}
                    </div>
                  </div>

                  {/* 2 Punchy Engineered Invariants (Replaces 3 Bloated Paragraphs) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-xl bg-[#181920] space-y-1">
                      <div className="text-[13px] text-[#A2A3B0] font-semibold">
                        Engineered Mechanism
                      </div>
                      <p className="text-sm text-[#E0E0E6] leading-relaxed">
                        {currentLayer.details[0]}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#181920] space-y-1">
                      <div className="text-[13px] text-[#A2A3B0] font-semibold">
                        Memory &amp; Frame Invariant
                      </div>
                      <p className="text-sm text-[#E0E0E6] leading-relaxed">
                        {currentLayer.details[1]}
                      </p>
                    </div>
                  </div>

                  {/* Verified Native Low-Level Code Contract Snippet */}
                  <div
                    data-ui="code-block"
                    className="rounded-xl overflow-hidden bg-[#070709] p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-[#A2A3B0]">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#FF5520]" />
                        <span>Low-Level Systems Contract</span>
                      </span>
                      <span>Verified Implementation</span>
                    </div>

                    <pre className="text-xs sm:text-[13px] text-[#F5F5F7] overflow-x-auto leading-relaxed pt-1">
                      <code>
                        {activeArchLayer === 0 && `// RenderObject Layout: zero rebuild pass\nvoid paint(PaintingContext context, Offset offset) {\n  context.pushClipRect(needsCompositing, offset, clipBounds, (ctx, off) {\n    ctx.canvas.drawPicture(cachedImpellerPicture);\n  });\n}`}
                        {activeArchLayer === 1 && `// Background Dart Isolate: 200ms socket demux\nfinal p = ReceivePort();\nawait Isolate.spawn(_decodeSocketStream, IsolateInitMessage(p.sendPort, socketStream));\nfinal result = await p.first as ProcessedFrame;`}
                        {activeArchLayer === 2 && `// Zero-Copy Dynamic C-FFI Pointer Bridge\nfinal Pointer<Uint8> pcmBuffer = calloc<Uint8>(frameSize);\nnativeSpeechEngine.processPcmStream(pcmBuffer, sampleRate: 16000);\ncalloc.free(pcmBuffer);`}
                        {activeArchLayer === 3 && `// Direct Metal 3 / Apple Silicon GPU Presentation\nid<MTLCommandBuffer> cmdBuffer = [commandQueue commandBuffer];\n[cmdBuffer presentDrawable:drawable afterMinimumDuration:1.0/60.0];\n[cmdBuffer commit];`}
                      </code>
                    </pre>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentLayer.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-md text-[13px] bg-[#181920] text-[#E0E0E6]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. ACT 6: SARVAM AI STUDIO (THE PEAK — PINNED KINETIC WORKBENCH) */}
        <section
          id="sarvam"
          ref={sarvamRef}
          data-sc-act="interactive-stage"
          className="scroll-mt-24 relative w-full lg:min-h-[260vh]"
        >
          <div className="lg:sticky lg:top-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8">
            <div className="space-y-6">
              
              {/* Peak Header with Scroll Scrubber Bar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                    Sarvam AI Mobile SDKs
                  </h2>
                  <p className="text-base text-[#E0E0E6] max-w-2xl mt-1">
                    Author of the official client SDK monorepo for Sarvam AI&apos;s Indic-first speech and language platform.
                    Clean Architecture across iOS, Android, Flutter, React Native, and Go with 97.8% test coverage (Platform {selectedSdkTab + 1} of 5: {currentTab.label}).
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <a
                    href="https://github.com/ibhanu/sarvam-mobile"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-lg text-sm font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-colors flex items-center gap-2 self-start md:self-auto"
                  >
                    <span>Inspect Monorepo on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Kinetic Progress Bar */}
                  <div className="w-full md:w-56 bg-[#181920] rounded-full h-2.5 p-0.5 overflow-hidden">
                    <div
                      className="bg-[#10B981] h-full rounded-full transition-[width] duration-150"
                      style={{ width: `${Math.round(sarvamProgress * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Multi-Platform Code Workbench */}
              <div className="p-6 sm:p-10 rounded-2xl bg-[#121318] space-y-6">
                
                {/* Platform Selector Tabs (Scrubbed on scroll or clickable) */}
                <div className="flex flex-wrap gap-2">
                  {SARVAM_SDK_TABS.map((tab, idx) => {
                    const isSelected = selectedSdkTab === idx;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedSdkTab(idx)}
                        className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                          isSelected
                            ? 'bg-[#D93800] text-white'
                            : 'bg-[#181920] text-[#E0E0E6] hover:bg-[#22232D] hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Header Plate */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#181920] p-4 rounded-xl">
                  <div>
                    <span className="text-base font-bold text-white block">
                      {currentTab.packageBadge}
                    </span>
                    <span className="text-sm text-[#A2A3B0]">
                      {currentTab.architectureNote}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyCodeToClipboard(currentTab.code)}
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-[#22232D] text-[#F5F5F7] hover:bg-[#2C2E3B] transition-colors"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-4 h-4 text-[#10B981]" />
                          <span className="text-[#10B981]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                    <a
                      href={currentTab.packageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm bg-[#22232D] text-[#F5F5F7] hover:bg-[#2C2E3B] transition-colors"
                    >
                      <span>Package</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Verified Production Code Block */}
                <div
                  data-ui="code-block"
                  className="relative rounded-xl overflow-hidden bg-[#070709] p-5 sm:p-7"
                >
                  <div className="flex items-center justify-between pb-3 text-sm text-[#A2A3B0]">
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#FF5520]" />
                      <span>Production Implementation Snippet ({currentTab.language})</span>
                    </span>
                    <span>97.8% Tested</span>
                  </div>

                  <pre className="text-sm text-[#F5F5F7] overflow-x-auto leading-relaxed pt-2 px-2">
                    <code>{currentTab.code}</code>
                  </pre>
                </div>

                {/* Telemetry Footnote */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#181920]">
                    <div className="text-base font-bold text-white">4 Client SDKs</div>
                    <div className="text-sm text-[#A2A3B0] mt-0.5">Flutter, SwiftPM, Kotlin, and React Native TurboModules</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#181920]">
                    <div className="text-base font-bold text-[#10B981]">97.8% Coverage</div>
                    <div className="text-sm text-[#A2A3B0] mt-0.5">Automated unit and integration test suites with CI/CD</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#181920]">
                    <div className="text-base font-bold text-[#FF5520]">10+ Indic Languages</div>
                    <div className="text-sm text-[#A2A3B0] mt-0.5">Real-time PCM voice streaming for Hindi, Tamil, Kannada, and more</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. ACT 7: CONSUMER CRAFT (AURA DATING & MANGO AFFIRMATIONS) */}
        <section
          id="opensource"
          data-sc-act="panoramic-flow"
          className="scroll-mt-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 sc-enter"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                Gesture Physics & Native Widgets
              </h2>
              <p className="text-base text-[#E0E0E6] max-w-2xl mt-2">
                Production-grade consumer applications engineered with custom 60 FPS physics engines,
                native iOS WidgetKit bridges, and Supabase real-time architectures.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Product 1: Aura Dating */}
              <div className="p-8 rounded-2xl bg-[#121318] space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      Aura Dating
                    </h3>
                    <p className="text-sm text-[#FF5520] mt-0.5">
                      60 FPS Spring Card Swipe Physics & Realtime Chat
                    </p>
                  </div>
                  <a
                    href="https://github.com/ibhanu/aura"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-[#181920] text-white hover:bg-[#22232D] transition-colors"
                    aria-label="Aura Dating GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-base text-[#E0E0E6] leading-relaxed">
                  Engineered with Clean Architecture (Data / Domain / Presentation), custom velocity-aware swipe
                  physics, real-time Supabase messaging, and dark profile workflows.
                </p>

                <div className="grid grid-cols-3 gap-2.5">
                  {MOBILE_APPS[2].screens.map((screen, idx) => (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => openLightbox(MOBILE_APPS[2].screens, idx)}
                      className="group rounded-lg overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800]"
                    >
                      <img
                        src={screen.url}
                        alt={screen.label}
                        className="w-full aspect-[1206/2622] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['Flutter 3.32', 'Dart 3.8', 'Supabase Realtime', 'Clean Architecture', 'GetX'].map((t) => (
                    <span key={t} className="px-3 py-1 rounded text-sm bg-[#181920] text-[#F5F5F7]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product 2: Mango Affirmations */}
              <div className="p-8 rounded-2xl bg-[#121318] space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      Mango: Mind Architected
                    </h3>
                    <p className="text-sm text-[#F59E0B] mt-0.5">
                      60 FPS Parallax Engine & Native iOS WidgetKit
                    </p>
                  </div>
                  <a
                    href="https://github.com/ibhanu/mango"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-[#181920] text-white hover:bg-[#22232D] transition-colors"
                    aria-label="Mango GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-base text-[#E0E0E6] leading-relaxed">
                  Features multi-layer sensor/scroll parallax backgrounds, an evolving mascot streak system,
                  and a native Swift WidgetKit bridge syncing daily affirmations to Home and Lock screens.
                </p>

                <div className="grid grid-cols-3 gap-2.5">
                  {MOBILE_APPS[3].screens.map((screen, idx) => (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => openLightbox(MOBILE_APPS[3].screens, idx)}
                      className="group rounded-lg overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                    >
                      <img
                        src={screen.url}
                        alt={screen.label}
                        className="w-full aspect-[1206/2622] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {['Flutter', 'iOS WidgetKit', 'Parallax Engine', 'Custom Shaders', 'Haptics'].map((t) => (
                    <span key={t} className="px-3 py-1 rounded text-sm bg-[#181920] text-[#F5F5F7]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. ACT 8: BENGALURU SYSTEMS CLOSE & EDITORIAL FOOTER */}
        <footer
          id="contact"
          data-sc-act="monument-resolve"
          className="scroll-mt-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-20 space-y-14 sc-enter"
        >
          {/* Monumental Closing Statement */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display uppercase leading-[0.95]">
              Building the Next Mobile Frontier.
            </h2>
            <p className="text-lg text-[#E0E0E6] leading-relaxed pt-1 max-w-2xl">
              Available for Staff / Principal Mobile Engineering Leadership,
              high-scale mobile system audits, and select 0-to-1 product architecture partnerships.
            </p>
          </div>

          {/* Full-Width Monumental Signature Plate */}
          <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-black font-display tracking-tight text-[#16171E] hover:text-[#20222A] select-none transition-colors uppercase leading-[0.85] py-2">
            BHANU PRATAP
          </div>

          {/* Structured Asymmetric Editorial Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Contact & Live Availability */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#10B981]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Available for Staff &amp; Principal Leadership</span>
              </div>

              <div>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="text-2xl sm:text-3xl font-bold text-white hover:text-[#D93800] transition-colors font-display block"
                >
                  {PROFILE_DATA.email}
                </a>
              </div>

              <div className="text-sm text-[#A2A3B0] space-y-1">
                <div>Bengaluru, Karnataka, India • 12.9716° N, 77.5946° E</div>
                <div>Direct Line: +91 7089265084 • Timezone: IST (UTC+5:30)</div>
              </div>
            </div>

            {/* Right Column: Verified Profiles & Direct Engineering Actions */}
            <div className="lg:col-span-6 space-y-5 lg:pl-6">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="px-6 py-3.5 rounded-lg text-sm font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800]"
                >
                  Start an Engineering Conversation
                </a>
                <button
                  onClick={copyEmailToClipboard}
                  type="button"
                  className="px-5 py-3.5 rounded-lg text-sm font-semibold bg-[#181920] text-[#F5F5F7] hover:bg-[#22232D] transition-colors"
                >
                  {copiedEmail ? 'Email Copied' : 'Copy Email'}
                </button>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  type="button"
                  className="px-5 py-3.5 rounded-lg text-sm font-semibold bg-[#181920] text-[#F5F5F7] hover:bg-[#22232D] transition-colors"
                >
                  Verified Credentials (PDF)
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-[#E0E0E6] pt-1 font-medium">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub Systems</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PROFILE_DATA.resumeUrl}
                  download="Bhanu_Pratap_Resume.pdf"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Resume PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#top"
                  className="hover:text-white transition-colors text-[#A2A3B0]"
                >
                  Back to Top ↑
                </a>
              </div>
            </div>
          </div>

          {/* Colophon Baseline */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#A2A3B0]">
            <div>
              © 2026 Bhanu Pratap. Engineered with Next.js 14, React 18 &amp; Clean Systems Architecture.
            </div>
            <div>
              Zero dropped frames • 60 FPS Impeller frame budget.
            </div>
          </div>
        </footer>
      </main>

      {/* 10. REUSABLE RESUME MODAL */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* 11. REUSABLE IMAGE LIGHTBOX */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
