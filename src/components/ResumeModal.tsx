'use client';

import React, { useEffect } from 'react';
import { X, Download, Copy, Check, ExternalLink, Briefcase, GraduationCap, Code2, Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import { PROFILE_DATA } from '@/data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        data-ui="modal"
        className="relative w-full max-w-4xl max-h-[96vh] sm:max-h-[92vh] bg-[#0E0E12] text-[#F5F5F7] rounded-xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-[#14151B]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5520]" />
            <h2 id="resume-title" className="text-base sm:text-xl font-bold tracking-tight">
              Bhanu Pratap: Verified Credentials
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-sm bg-[#1E2028] text-[#F5F5F7] hover:bg-[#282A36] transition-colors"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981] hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy Email</span>
                </>
              )}
            </button>
            <a
              href={PROFILE_DATA.resumeUrl}
              download="Bhanu_Pratap_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-lg text-sm font-semibold bg-[#FF5520] text-white hover:bg-[#D94212] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#9596A3] hover:text-white hover:bg-[#1E2028] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8 text-base leading-relaxed text-[#F5F5F7] overscroll-contain">
          {/* PROFILE SUMMARY */}
          <div className="space-y-3 pb-6 bg-[#121318] p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
                  Bhanu Pratap
                </h1>
                <p className="text-sm font-medium text-[#FF5520] mt-1">
                  Senior Mobile & Systems Architect, Bengaluru, India
                </p>
              </div>
              <div className="flex flex-wrap sm:flex-col gap-2 sm:gap-1 text-sm text-[#9596A3]">
                <a href={`mailto:${PROFILE_DATA.email}`} className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-4 h-4 text-[#FF5520]" />
                  <span>{PROFILE_DATA.email}</span>
                </a>
                <a href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-white">
                  <Phone className="w-4 h-4 text-[#10B981]" />
                  <span>{PROFILE_DATA.phone}</span>
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#F59E0B]" />
                  <span>Bengaluru, India</span>
                </span>
              </div>
            </div>

            <p className="text-[#9596A3] text-sm sm:text-base leading-relaxed pt-2">
              Senior Flutter engineer specializing in creator economy platforms and deep mobile OS integrations.
              Built and shipped apps with <strong className="text-white">500,000+ downloads</strong> and{' '}
              <strong className="text-white">$5M+ annual transactions</strong>: from payments abstraction and
              native KYC pipelines to real-time media processing. Known for measurable impact:{' '}
              <span className="text-[#10B981] font-semibold">65% crash reduction</span>,{' '}
              <span className="text-[#10B981] font-semibold">18% retention lift</span>,{' '}
              <span className="text-[#10B981] font-semibold">75% faster deployments</span>.
            </p>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#FF5520]">
              <Briefcase className="w-4 h-4" />
              <span>Professional Experience</span>
            </div>

            {/* ROLE 1: BIGBANG.SOCIAL */}
            <div className="p-5 rounded-xl bg-[#14151B] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Tech Lead App</h3>
                  <div className="text-sm text-[#FF5520]">BigBang.Social, Bengaluru, India</div>
                </div>
                <div className="text-[13px] text-[#9596A3] self-start px-2.5 py-1 rounded bg-[#1E2028]">
                  Jul 2023 to Apr 2026
                </div>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-[#9596A3]">
                <li className="flex gap-2">
                  <span className="text-[#FF5520] font-bold">•</span>
                  <span>
                    Architected a creator monetization platform, driving{' '}
                    <strong className="text-white">500,000+ downloads</strong> and processing{' '}
                    <strong className="text-white">$5M+ annually</strong> via custom payments abstraction layers
                    (Cashfree, Razorpay).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF5520] font-bold">•</span>
                  <span>
                    Built deep OS integrations (Instagram, YouTube, DigiLocker) and engineered custom platform channels
                    for real-time native media processing, eliminating manual KYC bottlenecks.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF5520] font-bold">•</span>
                  <span>
                    Executed low-level memory profiling and lifecycle optimization, slashing application crash rates by{' '}
                    <strong className="text-[#10B981]">65% (2.1% to 0.7%)</strong> and cutting cold start latency.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF5520] font-bold">•</span>
                  <span>
                    Integrated an observability and telemetry pipeline (Mixpanel, Firebase Analytics,
                    AppsFlyer, CleverTap), enabling cohort segmentation that{' '}
                    <strong className="text-[#10B981]">boosted Day-30 retention by 18%</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF5520] font-bold">•</span>
                  <span>
                    Mentored an engineering team in TDD while establishing automated Fastlane and
                    GitHub Actions CI/CD pipelines, <strong className="text-[#10B981]">reducing deployment time by 75%</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* ROLE 2: UNDER 25 */}
            <div className="p-5 rounded-xl bg-[#14151B] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Senior Flutter Developer</h3>
                  <div className="text-sm text-[#10B981]">Under 25 Universe, Bengaluru, India</div>
                </div>
                <div className="text-[13px] text-[#9596A3] self-start px-2.5 py-1 rounded bg-[#1E2028]">
                  Oct 2021 to Jun 2023
                </div>
              </div>
              <ul className="space-y-2 text-sm sm:text-base text-[#9596A3]">
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>
                    Spearheaded the mobile experience for a rapidly scaling student platform, supporting{' '}
                    <strong className="text-white">400,000+ users</strong> and facilitating over{' '}
                    <strong className="text-white">$20M+ in platform earnings</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>
                    Architected a real-time chat system utilizing WebSockets with background isolate serialization, dropping latency from{' '}
                    <strong className="text-[#10B981]">500ms to 200ms</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>
                    Standardized state management patterns and built a shared
                    UI component library of 30+ reusable widgets, cutting feature delivery cycles by{' '}
                    <strong className="text-[#10B981]">30%</strong> and eliminating cross-feature regressions.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>
                    Optimized critical API and caching layers to maintain a responsive user experience in low-bandwidth campus network environments.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>
                    Directed custom A/B testing pipelines and eliminated frame bottlenecks to sustain fluid <strong className="text-[#10B981]">60 FPS rendering</strong>.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* KEY PROJECTS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#FF5520]">
              <Code2 className="w-4 h-4" />
              <span>Flagship Projects</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#14151B] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm sm:text-base">Sarvam AI Mobile SDKs</h4>
                  <span className="text-[13px] text-[#FF5520] bg-[#FF5520]/15 px-2 py-0.5 rounded font-semibold">97.8% Tests</span>
                </div>
                <p className="text-sm text-[#9596A3]">
                  Official 4-platform mobile monorepo (Flutter, iOS SwiftPM, Android Kotlin, React Native) with
                  shared Rust FFI core under 600 KB.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14151B] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm sm:text-base">Aura Dating</h4>
                  <span className="text-[13px] text-[#FF5520] bg-[#FF5520]/15 px-2 py-0.5 rounded font-semibold">Flutter + Supabase</span>
                </div>
                <p className="text-sm text-[#9596A3]">
                  Open-source dating app with spring-physics card swipe discovery, realtime chat, and clean architecture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14151B] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm sm:text-base">Mango: Affirmations</h4>
                  <span className="text-[13px] text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded font-semibold">60 FPS Parallax</span>
                </div>
                <p className="text-sm text-[#9596A3]">
                  Consumer app with accelerometer parallax, streak mascot progression, and native iOS WidgetKit widgets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#14151B] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm sm:text-base">Go Microservice Template</h4>
                  <span className="text-[13px] text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded font-semibold">Clean Architecture</span>
                </div>
                <p className="text-sm text-[#9596A3]">
                  Production Go 1.24 microservice template with JWT auth, PostgreSQL via Prisma, and Docker Compose.
                </p>
              </div>
            </div>
          </div>

          {/* TECHNICAL SKILLS MATRIX */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#FF5520]">
              <Sparkles className="w-4 h-4" />
              <span>Technical Skills</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-4 rounded-xl bg-[#14151B]">
                <span className="text-[#FF5520] font-semibold block mb-1">Mobile Systems</span>
                <span className="text-[#9596A3]">
                  Flutter, Dart, iOS (Swift, WidgetKit), Android (Kotlin), Platform Channels, MVC/MVVM, Provider,
                  Riverpod, BLoC, GetX
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#14151B]">
                <span className="text-[#10B981] font-semibold block mb-1">Backend & Real-Time</span>
                <span className="text-[#9596A3]">
                  Golang, React, WebSockets, WebRTC, Supabase, Firebase, REST, GraphQL, PostgreSQL (Prisma), Docker
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#14151B]">
                <span className="text-[#F59E0B] font-semibold block mb-1">DevOps & CI/CD</span>
                <span className="text-[#9596A3]">
                  Fastlane, GitHub Actions, Jenkins, Docker, Unit/Integration Testing, SonarQube
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#14151B]">
                <span className="text-[#3B82F6] font-semibold block mb-1">Observability & Tools</span>
                <span className="text-[#9596A3]">
                  Mixpanel, Firebase Analytics, AppsFlyer, CleverTap, Sentry, Jira, Figma
                </span>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="p-4 rounded-xl bg-[#14151B] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm text-[#9596A3]">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-[#FF5520] flex-shrink-0" />
              <span className="text-white font-semibold">B.Tech in Computer Science</span>
              <span className="hidden sm:inline">, Sri Venkateshwara College of Engineering, Bengaluru</span>
            </div>
            <div>2017 to 2021</div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 sm:px-8 py-3.5 bg-[#14151B] flex items-center justify-between gap-3 text-sm text-[#9596A3]">
          <span className="truncate hidden xs:inline">Bengaluru, India</span>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={PROFILE_DATA.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1.5 min-h-[44px] px-3 font-medium"
            >
              <span>Raw PDF</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 min-h-[44px] rounded-lg bg-[#1E2028] text-white hover:bg-[#282A36] transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
