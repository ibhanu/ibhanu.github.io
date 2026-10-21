'use client';

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; label: string; caption?: string }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
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
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot lightbox"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* TOP BAR */}
      <div
        className="w-full max-w-4xl flex items-center justify-between text-white z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4F1F]" />
          <div>
            <h3 className="text-sm sm:text-base font-bold tracking-tight text-white">
              {currentImg.label}
            </h3>
            {currentImg.caption && (
              <p className="text-xs text-[#9DA4B0] font-mono hidden sm:block">
                {currentImg.caption}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[#9DA4B0] px-2.5 py-1 rounded bg-white/10">
            {currentIndex + 1} / {images.length}
          </span>
          <a
            href={currentImg.url}
            download
            target="_blank"
            rel="noreferrer"
            aria-label="Download high-resolution image"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lightbox"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-[#FF4F1F] text-white hover:bg-[#e04318] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CENTER IMAGE STAGE */}
      <div
        className="relative flex-1 w-full max-w-3xl flex items-center justify-center p-2 my-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImg.url}
          alt={currentImg.label}
          className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/15"
        />

        {/* PREV / NEXT TOUCH CONTROLS */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
              aria-label="Previous screenshot"
              className="absolute left-2 sm:left-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 text-white border border-white/20 hover:bg-black/80 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate((currentIndex + 1) % images.length)}
              aria-label="Next screenshot"
              className="absolute right-2 sm:right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-black/60 text-white border border-white/20 hover:bg-black/80 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* BOTTOM THUMBNAIL STRIP */}
      <div
        className="w-full max-w-xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onNavigate(idx)}
            className={`flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              currentIndex === idx
                ? 'border-[#FF4F1F] scale-105'
                : 'border-white/20 opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
