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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[96vh] sm:max-h-[92vh] bg-[#0C0E14] text-[#F4F0EA] border border-[#F4F0EA]/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER (RESPONSIVE & TOUCH-FRIENDLY) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#F4F0EA]/10 bg-[#07080B]/95">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4F1F]" />
            <h2 id="resume-title" className="text-sm sm:text-lg font-bold tracking-tight truncate">
              Bhanu Pratap <span className="text-[#9DA4B0] font-normal hidden xs:inline">— Resume</span>
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-mono border border-[#F4F0EA]/15 hover:bg-[#F4F0EA]/10 active:bg-[#F4F0EA]/20 transition-colors"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981] hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Email</span>
                </>
              )}
            </button>
            <a
              href={PROFILE_DATA.resumeUrl}
              download="Bhanu_Pratap_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-mono font-medium bg-[#FF4F1F] text-white hover:bg-[#e04318] active:bg-[#cc3912] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close modal"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#9DA4B0] hover:text-white hover:bg-[#F4F0EA]/10 active:bg-[#F4F0EA]/20 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE RESUME CONTENT WITH SMOOTH TOUCH SCROLLING) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 text-sm leading-relaxed text-[#F4F0EA]/90 overscroll-contain">
          {/* PROFILE SUMMARY */}
          <div className="space-y-3 pb-5 border-b border-[#F4F0EA]/10">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                  Bhanu Pratap
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[#FF4F1F] mt-0.5">
                  Senior Mobile & Systems Engineer • Bengaluru, India
                </p>
              </div>
              <div className="flex flex-wrap sm:flex-col gap-2 sm:gap-1 text-xs font-mono text-[#9DA4B0]">
                <a href={`mailto:${PROFILE_DATA.email}`} className="flex items-center gap-1 hover:text-white">
                  <Mail className="w-3.5 h-3.5 text-[#FF4F1F]" />
                  <span>{PROFILE_DATA.email}</span>
                </a>
                <a href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:text-white">
                  <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{PROFILE_DATA.phone}</span>
                </a>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Bengaluru, India</span>
                </span>
              </div>
            </div>

            <p className="text-[#9DA4B0] text-xs sm:text-base leading-relaxed pt-2">
              Senior Flutter engineer specializing in creator economy platforms and deep mobile OS integrations.
              Built and shipped apps with <strong className="text-white">500K+ downloads</strong> and{' '}
              <strong className="text-white">$5M+ annual transactions</strong> — from payments abstraction and
              native KYC pipelines to real-time media processing. Known for measurable impact:{' '}
              <span className="text-[#10B981] font-mono font-medium">65% crash reduction</span>,{' '}
              <span className="text-[#10B981] font-mono font-medium">18% retention lift</span>,{' '}
              <span className="text-[#10B981] font-mono font-medium">75% faster deployments</span>.
            </p>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF4F1F]">
              <Briefcase className="w-4 h-4" />
              <span>Professional Experience</span>
            </div>

            {/* ROLE 1: BIGBANG.SOCIAL */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#131620] border border-[#F4F0EA]/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">Tech Lead App</h3>
                  <div className="text-xs font-mono text-[#FF4F1F]">BigBang.Social • Bengaluru, India</div>
                </div>
                <div className="text-xs font-mono text-[#9DA4B0] self-start px-2 py-0.5 rounded bg-[#07080B] border border-white/5">
                  Jul 2023 – Apr 2026
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#9DA4B0]">
                <li className="flex gap-2">
                  <span className="text-[#FF4F1F] font-mono font-bold">•</span>
                  <span>
                    Architected a scalable creator monetization platform, driving{' '}
                    <strong className="text-[#F4F0EA]">500,000+ downloads</strong> and processing{' '}
                    <strong className="text-[#F4F0EA]">$5M+ annually</strong> via custom payments abstraction layers
                    (Cashfree, Razorpay).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF4F1F] font-mono font-bold">•</span>
                  <span>
                    Built deep OS integrations (Instagram, YouTube, DigiLocker) and engineered custom platform channels
                    for real-time native media processing, eliminating manual KYC bottlenecks.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF4F1F] font-mono font-bold">•</span>
                  <span>
                    Executed low-level memory profiling and lifecycle optimization, slashing application crash rates by{' '}
                    <strong className="text-[#10B981]">65% (2.1% → 0.7%)</strong> and significantly reducing cold start times.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF4F1F] font-mono font-bold">•</span>
                  <span>
                    Integrated a comprehensive observability and engagement stack (Mixpanel, Firebase Analytics,
                    AppsFlyer, CleverTap), enabling precise user segmentation that{' '}
                    <strong className="text-[#10B981]">boosted Day-30 retention by 18%</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF4F1F] font-mono font-bold">•</span>
                  <span>
                    Mentored a team of 4 engineers in TDD and MVC architecture while establishing robust Fastlane and
                    GitHub Actions CI/CD pipelines, <strong className="text-[#10B981]">reducing deployment time by 75%</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* ROLE 2: UNDER 25 */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#131620] border border-[#F4F0EA]/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">Senior Flutter Developer</h3>
                  <div className="text-xs font-mono text-[#10B981]">Under25 • Bengaluru, India</div>
                </div>
                <div className="text-xs font-mono text-[#9DA4B0] self-start px-2 py-0.5 rounded bg-[#07080B] border border-white/5">
                  Oct 2021 – Jun 2023
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#9DA4B0]">
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-mono font-bold">•</span>
                  <span>
                    Spearheaded the mobile experience for a rapidly scaling student platform, supporting{' '}
                    <strong className="text-[#F4F0EA]">400,000+ users</strong> and facilitating over{' '}
                    <strong className="text-[#F4F0EA]">$20M+ in platform earnings</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-mono font-bold">•</span>
                  <span>
                    Architected a real-time chat system utilizing WebSockets, implementing optimized threading and
                    networking that drastically reduced message latency from{' '}
                    <strong className="text-[#10B981]">500ms to 200ms</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-mono font-bold">•</span>
                  <span>
                    Accelerated team development cycles by standardizing state management patterns and building a shared
                    UI component library of 30+ reusable widgets, cutting feature development time by{' '}
                    <strong className="text-[#10B981]">30%</strong> and reducing cross-feature bugs.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-mono font-bold">•</span>
                  <span>
                    Optimized critical API and network layers to minimize redundant calls, maintaining a seamless and
                    responsive user experience in low-bandwidth connectivity environments.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#10B981] font-mono font-bold">•</span>
                  <span>
                    Directed implementation of custom A/B testing pipelines and resolved production bottlenecks,
                    eliminating UI jank to ensure fluid <strong className="text-[#10B981]">60 FPS frame rendering</strong>.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* KEY PROJECTS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF4F1F]">
              <Code2 className="w-4 h-4" />
              <span>Flagship Projects</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#131620] border border-[#F4F0EA]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs sm:text-sm">Sarvam AI Mobile SDKs</h4>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#FF4F1F] bg-[#FF4F1F]/10 px-1.5 py-0.5 rounded">97.8% Tests</span>
                </div>
                <p className="text-xs text-[#9DA4B0]">
                  Official 4-platform mobile monorepo (Flutter, iOS SwiftPM, Android Kotlin, React Native) with
                  shared Rust FFI core (&lt;600 KB).
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#131620] border border-[#F4F0EA]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs sm:text-sm">Aura Dating</h4>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#FF4F1F] bg-[#FF4F1F]/10 px-1.5 py-0.5 rounded">Flutter + Supabase</span>
                </div>
                <p className="text-xs text-[#9DA4B0]">
                  Open-source dating app with spring-physics card swipe discovery, realtime chat, and clean architecture.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#131620] border border-[#F4F0EA]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs sm:text-sm">Mango: Affirmations</h4>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded">60 FPS Parallax</span>
                </div>
                <p className="text-xs text-[#9DA4B0]">
                  Consumer app with accelerometer parallax, streak mascot progression, and native iOS WidgetKit widgets.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#131620] border border-[#F4F0EA]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs sm:text-sm">Go Microservice Template</h4>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded">Clean Arch</span>
                </div>
                <p className="text-xs text-[#9DA4B0]">
                  Production Go 1.24 microservice template with JWT auth, PostgreSQL via Prisma, and Docker Compose.
                </p>
              </div>
            </div>
          </div>

          {/* TECHNICAL SKILLS MATRIX */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF4F1F]">
              <Sparkles className="w-4 h-4" />
              <span>Technical Skills</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#131620] border border-[#F4F0EA]/10">
                <span className="font-mono text-[#FF4F1F] font-semibold block mb-1">Mobile</span>
                <span className="text-[#9DA4B0]">
                  Flutter, Dart, iOS (Swift, WidgetKit), Android (Kotlin), Platform Channels, MVC/MVVM, Provider,
                  Riverpod, BLoC, GetX
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#131620] border border-[#F4F0EA]/10">
                <span className="font-mono text-[#10B981] font-semibold block mb-1">Backend & Web</span>
                <span className="text-[#9DA4B0]">
                  Golang, React, WebSockets, WebRTC, Supabase, Firebase, REST, GraphQL, PostgreSQL (Prisma), Docker
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#131620] border border-[#F4F0EA]/10">
                <span className="font-mono text-[#F59E0B] font-semibold block mb-1">DevOps & CI/CD</span>
                <span className="text-[#9DA4B0]">
                  Fastlane, GitHub Actions, Jenkins, Docker, Unit/Integration Testing, SonarQube
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#131620] border border-[#F4F0EA]/10">
                <span className="font-mono text-[#3B82F6] font-semibold block mb-1">Observability & Tools</span>
                <span className="text-[#9DA4B0]">
                  Mixpanel, Firebase Analytics, AppsFlyer, CleverTap, Sentry, Jira, Figma
                </span>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="pt-2 border-t border-[#F4F0EA]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono text-[#9DA4B0]">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF4F1F] flex-shrink-0" />
              <span className="text-white font-semibold">B.Tech in Computer Science</span>
              <span className="hidden sm:inline">— Sri Venkateshwara College of Engineering, Bengaluru</span>
            </div>
            <div>2017 – 2021</div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#F4F0EA]/10 bg-[#07080B] flex items-center justify-between gap-3 text-xs font-mono text-[#9DA4B0]">
          <span className="truncate hidden xs:inline">Bengaluru, India</span>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={PROFILE_DATA.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1 min-h-[44px] px-2"
            >
              <span>Raw PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 min-h-[44px] rounded-lg bg-[#F4F0EA]/10 text-white hover:bg-[#F4F0EA]/20 active:bg-[#F4F0EA]/30 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
