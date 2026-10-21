'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, RotateCcw, Smartphone, Sparkles, Layers } from 'lucide-react';

interface IPhone3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScreen?: 'bigbang' | 'under25' | 'sarvam' | 'aura';
}

const PRODUCTION_SCREENS = [
  {
    id: 'bigbang',
    name: 'BigBang.Social',
    metric: '$5M+ Volume',
    tag: 'Payment Engine',
    screenshotUrl: '/screenshots/bigbang/creator-needs-v3.webp',
  },
  {
    id: 'under25',
    name: 'Under 25 Universe',
    metric: '200ms Latency',
    tag: 'WebSocket Chat',
    screenshotUrl: '/screenshots/under25/under25-community.webp',
  },
  {
    id: 'sarvam',
    name: 'Sarvam Voice AI',
    metric: '97.8% Tests',
    tag: 'Rust FFI Audio',
    screenshotUrl: '/screenshots/sarvam/voice-streaming.webp',
  },
  {
    id: 'aura',
    name: 'Aura Dating',
    metric: '60 FPS Physics',
    tag: 'Clean Arch',
    screenshotUrl: '/screenshots/aura/screen-discovery.webp',
  },
];

export default function IPhone3DModal({
  isOpen,
  onClose,
  initialScreen = 'bigbang',
}: IPhone3DModalProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [activeScreen, setActiveScreen] = useState(initialScreen);
  const modalRef = useRef<HTMLDivElement>(null);

  // Synchronize initialScreen prop
  useEffect(() => {
    setActiveScreen(initialScreen);
  }, [initialScreen]);

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      setIframeLoaded(false);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentScreenData =
    PRODUCTION_SCREENS.find((s) => s.id === activeScreen) || PRODUCTION_SCREENS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="iphone-3d-title"
      data-ui="modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-[#0A0A0D]/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        data-ui="modal-content"
        className="relative w-full max-w-5xl h-[88vh] max-h-[860px] bg-[#121318] rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#181920]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#800020]" />
            <div>
              <h3
                id="iphone-3d-title"
                className="text-base sm:text-lg font-bold text-white font-display"
              >
                iPhone 18 Pro Max • Deep Burgundy 3D Hardware Inspector
              </h3>
              <p className="text-[13px] text-[#A2A3B0]">
                Titanium Grade 5 Frame • 360° Real-time Orbit & Inspection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://sketchfab.com/3d-models/apple-iphone-18-pro-max-burgundy-2026-604acc18b5d5455d820a16359b45b003"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold bg-[#22232D] text-[#E0E0E6] hover:bg-[#2C2E3B] transition-colors"
            >
              <span>3D Model Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              type="button"
              aria-label="Close 3D hardware inspector"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#22232D] text-white hover:bg-[#D93800] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Model Viewport Area */}
        <div className="relative flex-1 bg-[#070709] overflow-hidden flex flex-col md:flex-row">
          
          {/* Main 3D Interactive Viewport */}
          <div className="relative flex-1 w-full h-full min-h-[340px]">
            {/* Loading placeholder */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070709] text-[#A2A3B0] z-10">
                <div className="w-8 h-8 rounded-full bg-[#181920] flex items-center justify-center text-[#D93800]">
                  <RotateCcw className="w-4 h-4 animate-spin" />
                </div>
                <span className="text-sm font-medium tracking-wide">
                  Initializing 3D Hardware Shader Context...
                </span>
              </div>
            )}

            {/* Embedded Sketchfab 3D Model: Apple iPhone 18 Pro Max Burgundy */}
            <iframe
              title="Apple iPhone 18 Pro Max Burgundy 2026 3D Model"
              src="https://sketchfab.com/models/604acc18b5d5455d820a16359b45b003/embed?autostart=1&preload=1&ui_controls=1&ui_infos=0&ui_inspector=0&ui_watermark=0&ui_theme=dark&transparent=0"
              className="w-full h-full border-0 bg-[#070709]"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              onLoad={() => setIframeLoaded(true)}
            />

            {/* Overlay Gesture Cue */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 bg-[#181920] px-3.5 py-1.5 rounded-lg text-[13px] text-[#A2A3B0]">
              <RotateCcw className="w-3.5 h-3.5 text-[#D93800]" />
              <span>Drag to rotate 360° • Pinch / Scroll to zoom</span>
            </div>
          </div>

          {/* Right Rail: Verified Production App Context */}
          <div className="w-full md:w-80 bg-[#14151B] p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#D93800]">
                <Smartphone className="w-4 h-4" />
                <span>Active Target Handset</span>
              </div>

              <div className="space-y-1">
                <div className="text-xl font-bold text-white font-display">
                  Apple iPhone 18 Pro Max
                </div>
                <div className="text-sm text-[#A2A3B0]">
                  Deep Burgundy Edition • 2026 Industrial Concept
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-3.5 rounded-xl bg-[#181920] space-y-2 text-[13px]">
                <div className="flex justify-between text-[#A2A3B0]">
                  <span>Frame Architecture</span>
                  <span className="font-semibold text-white">Grade 5 Titanium</span>
                </div>
                <div className="flex justify-between text-[#A2A3B0]">
                  <span>Display System</span>
                  <span className="font-semibold text-white">120 Hz ProMotion</span>
                </div>
                <div className="flex justify-between text-[#A2A3B0]">
                  <span>Production Target</span>
                  <span className="font-semibold text-[#10B981]">60 FPS Fluidity</span>
                </div>
              </div>

              {/* Shipped Systems Quick Selector */}
              <div className="space-y-2 pt-2">
                <span className="text-[13px] font-semibold text-[#E0E0E6] block">
                  Shipped Production Systems
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {PRODUCTION_SCREENS.map((screen) => {
                    const isSelected = activeScreen === screen.id;
                    return (
                      <button
                        key={screen.id}
                        type="button"
                        onClick={() => setActiveScreen(screen.id as any)}
                        className={`w-full text-left p-2.5 rounded-lg text-[13px] transition-colors flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#1E2028] text-white'
                            : 'bg-[#181920] text-[#A2A3B0] hover:bg-[#1E2028] hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{screen.name}</div>
                          <div className="text-[#A2A3B0] text-[13px]">{screen.tag}</div>
                        </div>
                        <span className="text-[13px] font-bold text-[#FF5520]">
                          {screen.metric}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Attribution note required by Sketchfab CC BY 4.0 */}
            <div className="pt-4 text-[13px] text-[#A2A3B0]">
              <span>3D Model: </span>
              <a
                href="https://sketchfab.com/AakashMansukhani"
                target="_blank"
                rel="noreferrer"
                className="text-[#E0E0E6] hover:underline"
              >
                Aakash Mansukhani
              </a>
              <span> on Sketchfab (CC BY 4.0).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
