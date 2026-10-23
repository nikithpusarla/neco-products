'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { filmChapters, FilmChapter } from '@/data/filmChapters';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ScrollSequenceProps {
  totalFrames?: number;
  containerHeight?: string;
}

export const ScrollSequence: React.FC<ScrollSequenceProps> = ({
  totalFrames = 240,
  containerHeight = '750vh',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames + 1).fill(null));
  const activeChapterRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const targetFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);

  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Responsive frame URLs with WebP preferred
  const getFrameUrl = useCallback((index: number, forMobile: boolean) => {
    const pad = String(index).padStart(4, '0');
    if (forMobile) {
      return `/frames/webp-mobile/frame_${pad}.webp`;
    }
    return `/frames/webp-desktop/frame_${pad}.webp`;
  }, []);

  const getFallbackUrl = useCallback((index: number) => {
    const pad = String(index).padStart(4, '0');
    return `/frames/film/frame_${pad}.jpg`;
  }, []);

  // Optimized Canvas render function using object-fit: cover math
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const targetFrame = targetFrameRef.current;
    if (targetFrame === lastDrawnFrameRef.current) return;

    // Search for target frame or nearest loaded frame
    let imgToDraw = imagesRef.current[targetFrame];
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      let offset = 1;
      while (offset < totalFrames) {
        const prev = imagesRef.current[targetFrame - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          imgToDraw = prev;
          break;
        }
        const next = imagesRef.current[targetFrame + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          imgToDraw = next;
          break;
        }
        offset++;
      }
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = imgToDraw.naturalWidth;
    const ih = imgToDraw.naturalHeight;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = cw;
      drawHeight = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawHeight) / 2;
    } else {
      drawWidth = ch * imgRatio;
      drawHeight = ch;
      offsetX = (cw - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = targetFrame;
  }, [totalFrames]);

  // RequestAnimationFrame ticker for buttery-smooth rendering
  const scheduleRender = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      renderCanvas();
      rafIdRef.current = null;
    });
  }, [renderCanvas]);

  // Resize canvas according to screen size and DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Cap DPR at 1.5 on mobile for 60fps battery efficiency, 2 on desktop
    const maxDpr = mobile ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    lastDrawnFrameRef.current = -1;
    scheduleRender();
  }, [scheduleRender]);

  // Progressive Preloading Strategy
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    let loadedCount = 0;
    const targetFirstBatch = Math.min(30, totalFrames);
    const step = mobile ? 2 : 1;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index]?.complete) {
          resolve();
          return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = getFrameUrl(index, mobile);

        const onDone = () => {
          imagesRef.current[index] = img;
          loadedCount++;
          setLoadProgress(Math.min(100, Math.round((loadedCount / (totalFrames / step)) * 100)));

          if (index === 1) {
            targetFrameRef.current = 1;
            scheduleRender();
          }
          if (loadedCount >= Math.min(25, targetFirstBatch) && !initialLoaded) {
            setInitialLoaded(true);
          }
          resolve();
        };

        img.onload = onDone;
        img.onerror = () => {
          img.src = getFallbackUrl(index);
          img.onload = onDone;
          img.onerror = () => resolve();
        };
      });
    };

    // 1. Immediately load frame 1
    loadImage(1).then(() => {
      // 2. Preload batch 1 to 30
      const batch1: Promise<void>[] = [];
      for (let i = 2; i <= targetFirstBatch; i += step) {
        batch1.push(loadImage(i));
      }

      Promise.all(batch1).then(() => {
        setInitialLoaded(true);

        // 3. Load remaining frames in idle chunks
        const remaining: number[] = [];
        for (let i = targetFirstBatch + 1; i <= totalFrames; i += step) {
          remaining.push(i);
        }

        let chunkIdx = 0;
        const chunkSize = mobile ? 4 : 8;

        const loadNextChunk = () => {
          if (chunkIdx >= remaining.length) return;
          const chunk = remaining.slice(chunkIdx, chunkIdx + chunkSize);
          chunkIdx += chunkSize;

          Promise.all(chunk.map((idx) => loadImage(idx))).then(() => {
            if ('requestIdleCallback' in window) {
              window.requestIdleCallback(loadNextChunk, { timeout: 250 });
            } else {
              setTimeout(loadNextChunk, 60);
            }
          });
        };

        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextChunk, { timeout: 300 });
        } else {
          setTimeout(loadNextChunk, 80);
        }
      });
    });

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [totalFrames, getFrameUrl, getFallbackUrl, scheduleRender, resizeCanvas, initialLoaded]);

  // ScrollTrigger linking scroll progress to frames
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        const p = Math.max(0, Math.min(1, self.progress));
        const frame = Math.max(1, Math.min(totalFrames, Math.round(p * (totalFrames - 1)) + 1));

        targetFrameRef.current = frame;
        setCurrentFrame(frame);
        scheduleRender();

        // Update active chapter
        const idx = filmChapters.findIndex(
          (ch) => frame >= ch.startFrame && frame <= ch.endFrame
        );
        if (idx !== -1 && idx !== activeChapterRef.current) {
          activeChapterRef.current = idx;
          setActiveChapterIndex(idx);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [totalFrames, scheduleRender]);

  const scrollToChapter = (chapter: FilmChapter) => {
    if (!containerRef.current) return;
    const progress = (chapter.startFrame - 1) / (totalFrames - 1);
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerRef.current.offsetTop + totalScroll * progress;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const activeChapter = filmChapters[activeChapterIndex] || filmChapters[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-forest-night select-none"
      style={{ height: containerHeight }}
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover transition-opacity duration-700 block"
          style={{ opacity: initialLoaded ? 1 : 0.3 }}
        />

        {/* Minimal Luxury Preloader */}
        {!initialLoaded && (
          <div className="absolute inset-0 z-40 bg-forest-night flex flex-col items-center justify-center gap-4 transition-opacity duration-700 px-6 text-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-gold animate-pulse">
              NECO PRODUCTS
            </span>
            <p className="text-xs uppercase tracking-widest text-cream/70 font-mono">
              Naturally Crafted from Fallen Leaves
            </p>
            <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2 relative">
              <div
                className="h-full bg-gradient-to-r from-gold via-sprout to-gold transition-all duration-300 rounded-full shadow-glow-gold"
                style={{ width: `${Math.max(15, loadProgress)}%` }}
              />
            </div>
            <span className="text-[10px] text-sage/80 font-mono tracking-wider">
              {loadProgress}% Loaded
            </span>
          </div>
        )}

        {/* Dark Vignette & Soft Gradient for Maximum Readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-forest-deep via-forest-night/40 to-transparent opacity-95" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-forest-night/80 via-transparent to-transparent opacity-75" />

        {/* HERO & CHAPTER TEXT OVERLAYS */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-10 lg:p-16">
          {/* Top Pill / Badge */}
          <div className="pt-20 sm:pt-16 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F3A2B]/85 backdrop-blur-md border border-gold/30 text-gold text-[10px] sm:text-xs font-semibold tracking-wider uppercase shadow-luxury">
              <span className="w-1.5 h-1.5 rounded-full bg-sprout animate-pulse" />
              <span>
                {currentFrame <= 22
                  ? '★ PURE ARECA LEAF TABLEWARE • EXPORT & PRIVATE LABEL'
                  : activeChapter.badge || '100% Fallen Palm Sheaths'}
              </span>
            </div>
          </div>

          {/* Main Content Area: Switches between Grand Stitch Hero and Chapter Overlays */}
          {currentFrame <= 22 ? (
            /* Grand Stitch Hero (Exact match to reference design) */
            <div className="w-full max-w-4xl mx-auto text-center pb-12 sm:pb-16 transition-all duration-700 ease-out">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-cream leading-[1.12] mb-4 sm:mb-6 drop-shadow-xl">
                Pure Areca Palm Leaf Tableware —{' '}
                <span className="italic text-gradient-gold">Straight from Nature&apos;s Canopy.</span>
              </h1>

              <p className="text-xs sm:text-base lg:text-lg text-cream/85 font-light leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow">
                No trees chopped. Zero petrochemical coatings or synthetic adhesives. Only naturally shed fallen palm leaf with quiet gratitude by Tamil Nadu farming hands, spring-cleansed and hydraulic steam-assigned.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
                <a
                  href="#collection"
                  className="px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gold hover:bg-gold-light text-[#13201A] transition-all duration-300 shadow-glow-gold flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>Explore The Collection</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="#quote"
                  className="px-7 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase bg-[#1F3A2B]/80 hover:bg-[#1F3A2B] text-cream border border-gold/40 backdrop-blur-md transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <span>Wholesale & Export Inquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            /* Chapter Story Overlays (Frames 23 - 240) */
            <div
              className={`w-full max-w-3xl pb-12 sm:pb-16 transition-all duration-500 ease-out ${
                activeChapter.align === 'center'
                  ? 'mx-auto text-center'
                  : activeChapter.align === 'right'
                  ? 'ml-auto text-right'
                  : 'mr-auto text-left'
              }`}
            >
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2 flex items-center gap-2 justify-inherit">
                {activeChapter.align === 'center' && (
                  <span className="w-6 h-[1px] bg-gold/50 inline-block" />
                )}
                <span>{activeChapter.eyebrow}</span>
                {activeChapter.align === 'center' && (
                  <span className="w-6 h-[1px] bg-gold/50 inline-block" />
                )}
              </p>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cream leading-[1.12] mb-3 sm:mb-4 drop-shadow-lg">
                {activeChapter.title}
              </h2>

              <p className="text-xs sm:text-base lg:text-lg text-cream/90 font-light leading-relaxed max-w-2xl drop-shadow">
                {activeChapter.description}
              </p>

              {activeChapter.actions && (
                <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto justify-center sm:justify-start">
                  <Link
                    href="/contact"
                    className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gold hover:bg-gold-light text-forest-night transition-all duration-300 shadow-glow-gold flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <span>Request Wholesale Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase bg-[#1F3A2B]/85 hover:bg-[#1F3A2B] text-cream border border-gold/40 backdrop-blur-md transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <span>Explore The Collection</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Bottom Bar: Frame & Mobile Indicators */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-xs text-cream/70 font-mono">
            <span className="text-sage/90">
              FRAME {String(currentFrame).padStart(4, '0')} / {String(totalFrames).padStart(4, '0')}
            </span>

            <div className="flex items-center gap-1.5 uppercase tracking-wider text-cream/70">
              <span className="hidden sm:inline">SCROLL TO ADVANCE FILM</span>
              <span className="sm:hidden">SCROLL</span>
              <ArrowDown className="w-3.5 h-3.5 text-gold animate-bounce" />
            </div>
          </div>
        </div>

        {/* 8 CHAPTER NAVIGATION DOTS (Right Edge) */}
        <aside
          aria-label="Film Chapters"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3"
        >
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-gold/30 to-gold/60" />
          {filmChapters.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(ch)}
                className="group relative flex items-center justify-center p-1.5 cursor-pointer focus:outline-none"
                aria-label={`Jump to chapter ${ch.id}: ${ch.title}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-3 sm:w-3.5 sm:h-3.5 bg-gold shadow-glow-gold scale-125'
                      : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cream/30 group-hover:bg-cream/70 group-hover:scale-110'
                  }`}
                />
                {/* Tooltip on Desktop */}
                <div className="absolute right-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 hidden md:block whitespace-nowrap">
                  <div className="bg-[#0C1611]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gold/30 text-cream shadow-xl text-left">
                    <p className="text-[9px] uppercase tracking-wider text-gold font-bold">
                      {ch.eyebrow}
                    </p>
                    <p className="text-xs font-serif text-cream">{ch.title}</p>
                  </div>
                </div>
              </button>
            );
          })}
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-t from-transparent via-gold/30 to-gold/60" />
        </aside>
      </div>
    </section>
  );
};
