'use client';

import React, { useState } from 'react';
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
import IPhone3DModal from '@/components/IPhone3DModal';
import {
  Menu,
  X,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function BhanuDeveloperPortfolio() {
  const [selectedSdkTab, setSelectedSdkTab] = useState(0);
  const [activeArchLayer, setActiveArchLayer] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [selected3DScreen, setSelected3DScreen] = useState<'bigbang' | 'under25' | 'sarvam' | 'aura'>('bigbang');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#E0E0E6]" aria-label="Main">
            <a href="#showcase-rail" className="hover:text-white transition-colors">
              Production Showcase
            </a>
            <a href="#bigbang" className="hover:text-white transition-colors">
              BigBang.Social
            </a>
            <a href="#under25" className="hover:text-white transition-colors">
              Under 25
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Systems Architecture
            </a>
            <a href="#sarvam" className="hover:text-white transition-colors">
              Sarvam AI SDKs
            </a>
            <a href="#opensource" className="hover:text-white transition-colors">
              Consumer Craft
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
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

              {/* Interactive 3D Hardware Inspector Trigger */}
              <button
                type="button"
                onClick={() => {
                  setSelected3DScreen('bigbang');
                  setIs3DModalOpen(true);
                }}
                className="mt-4 px-4 py-2.5 rounded-xl text-[13px] font-semibold bg-[#181920] text-[#E0E0E6] hover:bg-[#22232D] hover:text-white transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-[#D93800]" />
                <span>Inspect iPhone 18 Pro Max Burgundy 3D</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. ACT 2: HORIZONTAL PINNED SHOWCASE RAIL */}
        <StickyScrollShowcase />

        {/* 4. ACT 3: BIGBANG.SOCIAL FLAGSHIP DEEP-DIVE */}
        <section
          id="bigbang"
          data-sc-act="case-study"
          className="scroll-mt-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 sc-enter"
        >
          <div className="p-8 sm:p-12 lg:p-16 rounded-2xl bg-[#121318] space-y-12">
            
            {/* Header Plate */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 bg-[#181920] p-8 rounded-xl">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                  BigBang.Social Super-App
                </h2>
                <p className="text-base text-[#E0E0E6] max-w-2xl">
                  Architected India&apos;s premier creator monetization platform by Collective Artists Network, handling 500,000+ downloads
                  and processing over $5M+ annually through multi-gateway payment abstraction layers.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://apps.apple.com/us/app/bigbang-social/id6450163388"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#22232D] text-white hover:bg-[#2C2E3B] transition-colors flex items-center gap-2"
                >
                  <span>App Store</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.collectiveartists.bigbangsocial"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#22232D] text-white hover:bg-[#2C2E3B] transition-colors flex items-center gap-2"
                >
                  <span>Google Play</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Architecture Highlights & Verified Outcomes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Systems Engineering Details */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Core Engineering Contributions
                </h3>

                <div className="space-y-4">
                  <div className="p-6 rounded-xl bg-[#181920] space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      Payment Abstraction Layer ($5M+ Annual Volume)
                    </h4>
                    <p className="text-base text-[#E0E0E6] leading-relaxed">
                      Engineered a resilient multi-gateway adapter unifying Cashfree and Razorpay APIs.
                      Zero dropped transactions during high-concurrency brand payout drops with automated retry fallbacks.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#181920] space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      65% Crash Reduction via Memory Profiling
                    </h4>
                    <p className="text-base text-[#E0E0E6] leading-relaxed">
                      Conducted low-level memory inspection in Xcode Instruments and Android Studio Profiler,
                      eliminating texture retention leaks and dropping crash rates from 2.1% down to 0.7%.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#181920] space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      Deep OS Integrations & Automated KYC
                    </h4>
                    <p className="text-base text-[#E0E0E6] leading-relaxed">
                      Constructed custom platform channels bridging native iOS and Android media engines
                      with Instagram Graph API, YouTube Data API, and DigiLocker instant verification.
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Flutter', 'MethodChannels', 'DigiLocker KYC', 'Cashfree', 'Razorpay', 'Fastlane', 'Mixpanel', 'CleverTap'].map((t) => (
                    <span key={t} className="px-3.5 py-1.5 rounded-lg text-sm bg-[#181920] text-[#F5F5F7]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: 3 Verified Screenshots with Lightbox Trigger */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-base font-semibold text-white flex items-center justify-between">
                  <span>Production App Screens</span>
                  <span className="text-sm text-[#A2A3B0]">Tap image to inspect full-res</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {MOBILE_APPS[0].screens.map((screen, idx) => (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => openLightbox(MOBILE_APPS[0].screens, idx)}
                      className="group rounded-xl overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800]"
                    >
                      <img
                        src={screen.url}
                        alt={screen.label}
                        className="w-full aspect-[444/960] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>

                <p className="text-sm text-[#A2A3B0] pt-1">
                  Screens: Brand Collaborations Hub, Social OAuth Analytics Pipeline, and Automated DigiLocker KYC settlement.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSelected3DScreen('bigbang');
                    setIs3DModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-lg text-[13px] font-semibold bg-[#181920] text-[#E0E0E6] hover:bg-[#22232D] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D93800]" />
                  <span>Inspect BigBang.Social on iPhone 18 Pro Max 3D</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ACT 4: UNDER 25 UNIVERSE DEEP-DIVE */}
        <section
          id="under25"
          data-sc-act="case-study"
          className="scroll-mt-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 sc-enter"
        >
          <div className="p-8 sm:p-12 lg:p-16 rounded-2xl bg-[#121318] space-y-12">
            
            {/* Header Plate */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 bg-[#181920] p-8 rounded-xl">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                  Under 25 Universe Ecosystem
                </h2>
                <p className="text-base text-[#E0E0E6] max-w-2xl">
                  Spearheaded the mobile architecture for India&apos;s largest student network, supporting
                  400,000+ users and enabling over $20M+ in campus micro-missions and platform earnings.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://apps.apple.com/us/app/under-25/id1580357687"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#22232D] text-white hover:bg-[#2C2E3B] transition-colors flex items-center gap-2"
                >
                  <span>App Store</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.under25universe.under25app"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#22232D] text-white hover:bg-[#2C2E3B] transition-colors flex items-center gap-2"
                >
                  <span>Google Play</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Architecture Highlights: Inverted Grid (Screens Left, Deep Concurrency Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: 3 Verified Screenshots with 3D Inspector Trigger */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-base font-semibold text-white flex items-center justify-between">
                  <span>Student App Screens</span>
                  <span className="text-sm text-[#A2A3B0]">Tap image to inspect full-res</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {MOBILE_APPS[1].screens.map((screen, idx) => (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => openLightbox(MOBILE_APPS[1].screens, idx)}
                      className="group rounded-xl overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
                    >
                      <img
                        src={screen.url}
                        alt={screen.label}
                        className="w-full aspect-[442/960] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>

                <p className="text-sm text-[#A2A3B0] pt-1">
                  Screens: Student Gigs Feed, 200ms Real-Time Campus Spaces, and Interactive Collectibles Wallet.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSelected3DScreen('under25');
                    setIs3DModalOpen(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-lg text-[13px] font-semibold bg-[#181920] text-[#E0E0E6] hover:bg-[#22232D] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Inspect Under 25 on iPhone 18 Pro Max 3D</span>
                </button>
              </div>

              {/* Right Column: Systems Engineering Details */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Core Engineering Contributions
                </h3>

                <div className="space-y-4">
                  <div className="p-6 rounded-xl bg-[#181920] space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      200ms Low-Latency WebSocket Chat Engine
                    </h4>
                    <p className="text-base text-[#E0E0E6] leading-relaxed">
                      Offloaded message JSON parsing and socket multiplexing to dedicated background Dart Isolates,
                      dropping message latency from 500ms down to 200ms for campus discussion spaces.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#181920] space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      30+ Reusable Design System Component Library
                    </h4>
                    <p className="text-base text-[#E0E0E6] leading-relaxed">
                      Standardized core widgets across missions, wallets, and community feeds,
                      accelerating cross-team delivery cycles by 30% and eliminating visual regressions.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl bg-[#181920] space-y-2">
                    <h4 className="text-lg font-bold text-white">
                      60 FPS Rendering in Low-Bandwidth Networks
                    </h4>
                    <p className="text-base text-[#E0E0E6] leading-relaxed">
                      Implemented custom local caching layers and repaint boundaries,
                      preventing layout thrashing on budget Android devices across 400+ campus regions.
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Flutter', 'WebSockets', 'Dart Isolates', '30+ Widget System', 'A/B Testing Engine', '60 FPS Profiling'].map((t) => (
                    <span key={t} className="px-3.5 py-1.5 rounded-lg text-sm bg-[#181920] text-[#F5F5F7]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ACT 5: ARCHITECTURAL LAYERS & SILICON BRIDGE */}
        <section
          id="architecture"
          data-sc-act="curtain-reveal"
          className="scroll-mt-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 sc-enter"
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                Flutter to Silicon Internals
              </h2>
              <p className="text-base text-[#E0E0E6] max-w-2xl mt-2">
                Inspect the four architectural layers powering 60 FPS rendering, background isolates,
                and native OS bridges across production deployments.
              </p>
            </div>

            {/* Layer Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ARCHITECTURE_LAYERS.map((layer, idx) => {
                const isSelected = activeArchLayer === idx;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setActiveArchLayer(idx)}
                    className={`p-5 rounded-xl text-left transition-colors ${
                      isSelected
                        ? 'bg-[#1E2028] text-white border-2 border-[#D93800]'
                        : 'bg-[#121318] text-[#E0E0E6] hover:bg-[#181920] hover:text-white'
                    }`}
                  >
                    <div className="text-sm text-[#FF5520] font-semibold mb-1">
                      Layer {idx + 1}
                    </div>
                    <div className="text-lg font-bold text-white font-display">
                      {layer.name.replace(/LAYER \d+ \/\/ /, '')}
                    </div>
                    <div className="text-sm mt-2 text-[#A2A3B0]">
                      {layer.metrics}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Layer Architectural Breakdown */}
            <div className="p-8 sm:p-12 rounded-2xl bg-[#121318] space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 bg-[#181920] p-6 rounded-xl">
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {currentLayer.name}
                  </h3>
                  <p className="text-sm text-[#FF5520] mt-0.5">
                    {currentLayer.subtitle}
                  </p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#22232D] text-sm text-[#F5F5F7] font-semibold self-start md:self-auto">
                  {currentLayer.metrics}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-semibold text-white">
                  Architectural Specifications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentLayer.details.map((detail, i) => (
                    <div key={i} className="p-5 rounded-xl bg-[#181920] text-sm sm:text-base text-[#E0E0E6] leading-relaxed">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ambient Engine Video Loop */}
              <div className="rounded-xl overflow-hidden bg-[#070709] max-h-[240px] flex items-center justify-center">
                <video
                  src="/videos/abstract-painting-shapes-opt.mp4"
                  poster="/images/triptych-background.png"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-60"
                />
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {currentLayer.tech.map((t) => (
                  <span key={t} className="px-3.5 py-1.5 rounded-lg text-sm bg-[#181920] text-[#F5F5F7]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. ACT 6: SARVAM AI STUDIO (THE PEAK — INTERACTIVE STAGE) */}
        <section
          id="sarvam"
          data-sc-act="interactive-stage"
          className="scroll-mt-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 sc-enter"
        >
          <div className="space-y-8">
            
            {/* Peak Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display">
                  Sarvam AI Mobile SDKs
                </h2>
                <p className="text-base text-[#E0E0E6] max-w-2xl mt-2">
                  Author of the official client SDK monorepo for Sarvam AI&apos;s Indic-first speech and language platform.
                  Clean Architecture across iOS, Android, Flutter, React Native, and Go with 97.8% test coverage.
                </p>
              </div>

              <a
                href="https://github.com/ibhanu/sarvam-mobile"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-lg text-sm font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-colors flex items-center gap-2 self-start md:self-auto"
              >
                <span>Inspect Monorepo on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Interactive Multi-Platform Code Workbench */}
            <div className="p-6 sm:p-10 rounded-2xl bg-[#121318] space-y-6">
              
              {/* Platform Selector Tabs */}
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

        {/* 9. ACT 8: BENGALURU SYSTEMS CLOSE & CREDENTIALS RESOLVE */}
        <section
          id="contact"
          data-sc-act="monument-resolve"
          className="scroll-mt-24 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-24 sc-enter"
        >
          <div className="p-8 sm:p-14 lg:p-20 rounded-2xl bg-[#121318] space-y-10">
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display uppercase leading-[0.98]">
                Building the Next Mobile Frontier.
              </h2>
              <p className="text-lg text-[#E0E0E6] leading-relaxed pt-2">
                Available for Staff / Principal Mobile Engineering Leadership,
                high-scale mobile system audits, and select 0-to-1 product architecture partnerships.
              </p>
            </div>

            {/* Direct Contact & Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="px-7 py-4 rounded-lg text-base font-semibold bg-[#D93800] text-white hover:bg-[#B82F00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93800]"
              >
                Start an Engineering Conversation
              </a>
              <button
                onClick={copyEmailToClipboard}
                type="button"
                className="px-6 py-4 rounded-lg text-base font-semibold bg-[#181920] text-[#F5F5F7] hover:bg-[#22232D] transition-colors"
              >
                {copiedEmail ? 'Email Copied to Clipboard' : 'Copy Email Address'}
              </button>
              <button
                onClick={() => setIsResumeOpen(true)}
                type="button"
                className="px-6 py-4 rounded-lg text-base font-semibold bg-[#181920] text-[#F5F5F7] hover:bg-[#22232D] transition-colors"
              >
                Verified Credentials (PDF)
              </button>
            </div>

            {/* Coordinates & Links Plate */}
            <div className="pt-10 bg-[#181920] p-6 sm:p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm text-[#E0E0E6]">
              <div className="space-y-1">
                <span className="text-white font-bold block">Bhanu Pratap</span>
                <span>Bengaluru, Karnataka, India • +91 7089265084</span>
              </div>

              <div className="flex items-center gap-6 font-medium">
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={PROFILE_DATA.resumeUrl}
                  download="Bhanu_Pratap_Resume.pdf"
                  className="hover:text-white transition-colors"
                >
                  Resume PDF
                </a>
              </div>
            </div>
          </div>
        </section>
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

      {/* 12. 3D IPHONE HARDWARE INSPECTOR MODAL */}
      <IPhone3DModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        initialScreen={selected3DScreen}
      />
    </div>
  );
}
