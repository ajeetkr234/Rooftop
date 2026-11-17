import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Shield, Play, Pause, Video, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Button } from '../ui/Buttons';
import { Hero3DRoofWidget } from '../hero/Hero3DRoofWidget';

export const HeroSection: React.FC = () => {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  useEffect(() => {
    // Ensure smooth autoplay and seamless loop across all mobile & desktop browsers
    const video = bgVideoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      const startPlay = () => {
        video.play().catch(() => {
          // Autoplay may be deferred until first user touch/scroll
        });
      };

      startPlay();

      // Listen for first mobile touch or scroll to immediately start video if low-power mode paused it
      const onFirstInteract = () => {
        if (video.paused) {
          video.play().catch(() => {});
        }
        window.removeEventListener('touchstart', onFirstInteract);
        window.removeEventListener('scroll', onFirstInteract);
      };

      window.addEventListener('touchstart', onFirstInteract, { passive: true });
      window.addEventListener('scroll', onFirstInteract, { passive: true });

      return () => {
        window.removeEventListener('touchstart', onFirstInteract);
        window.removeEventListener('scroll', onFirstInteract);
      };
    }
  }, []);

  const toggleBgVideo = () => {
    if (!bgVideoRef.current) return;
    if (isVideoPlaying) {
      bgVideoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      bgVideoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <section className="relative bg-[#080E17] text-white overflow-hidden min-h-[calc(100dvh-116px)] sm:min-h-[calc(100vh-116px)] flex items-center">
      {/* 1. Cinematic Background Video with Dynamic Responsive Sizing */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#080E17]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={bgVideoRef}
            poster="https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=2000&q=85"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-100 sm:scale-[1.12] filter brightness-95 contrast-105 transition-transform duration-700"
          >
            <source src="/videos/gemini_generated_video_5477c9c4.mp4" type="video/mp4" />
            <source src="/videos/landing-background.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 2. Responsive Translucent Gradients: Clear text contrast while letting the active background video shine through */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080E17]/80 via-[#080E17]/65 to-[#080E17]/85 sm:bg-gradient-to-r sm:from-[#080E17]/92 sm:via-[#080E17]/78 sm:to-[#080E17]/45 pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080E17]/90 via-transparent to-[#080E17]/60 pointer-events-none z-[1]" />

        {/* 3. Watermark Corner Shields: Hidden on small mobile to avoid obscuring the video */}
        <div className="hidden sm:block absolute bottom-0 right-0 w-64 h-36 bg-gradient-to-tl from-[#080E17] via-[#080E17]/90 to-transparent pointer-events-none z-[2]" />
        <div className="hidden sm:block absolute bottom-0 left-0 w-56 h-32 bg-gradient-to-tr from-[#080E17] via-[#080E17]/85 to-transparent pointer-events-none z-[2]" />
      </div>

      {/* 3. Hero Interactive Split Content */}
      <div className="relative z-10 max-w-content mx-auto px-3 sm:px-6 py-6 sm:py-14 md:py-16 lg:py-20 pb-16 sm:pb-24 lg:pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Headline, Copy & Conversion CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Status Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900/85 border border-slate-700/80 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-slate-200 mb-3 sm:mb-6 backdrop-blur-md shadow-md max-w-full">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-copper animate-ping shrink-0" />
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-copper shrink-0" />
              <span className="truncate hidden sm:inline">Architectural Craftsmanship & Structural Defense</span>
              <span className="truncate sm:hidden font-mono text-[9px] tracking-normal">Architectural Roofing & Defense</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.15] mb-3 sm:mb-6 drop-shadow-md">
              Reliable Roofing.
              <br />
              <span className="text-brand-copper">Lasting Protection.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-base md:text-lg text-slate-200 leading-relaxed mb-4 sm:mb-8 max-w-xl">
              {siteConfig.subHeadline}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
              <Button
                to="/request-estimate"
                variant="primary"
                size="lg"
                className="flex items-center justify-center gap-2 shadow-xl hover:shadow-brand-copper/30 min-h-[44px] sm:min-h-[48px] text-center text-xs sm:text-sm font-bold"
              >
                <span>Request a Free Estimate</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </Button>
              
              <Button
                to="/services"
                variant="dark"
                size="lg"
                className="flex items-center justify-center shadow-md min-h-[44px] sm:min-h-[48px] text-center text-xs sm:text-sm font-bold"
              >
                Explore Our Services
              </Button>
            </div>

            {/* Core Trust Indicators */}
            <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-[11px] sm:text-sm text-slate-300 w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper shrink-0" />
                <span className="font-medium">Full Installation & Repair</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper shrink-0" />
                <span className="font-medium">Quality-Focused Work</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-copper shrink-0" />
                <span className="font-medium">Clear Written Proposals</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Architectural Roof Model Studio */}
          <div className="lg:col-span-5 w-full flex justify-center mt-6 lg:mt-0">
            <Hero3DRoofWidget />
          </div>

        </div>
      </div>

      {/* 4. Ambient Background Video Floating Toggle (Bottom Right Corner) */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:flex items-center gap-2 bg-slate-950/85 border border-slate-800 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-slate-300 shadow-xl">
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <Video className="w-3 h-3 text-brand-copper" />
          <span>Aerial Roof Flight</span>
        </span>
        <button
          type="button"
          onClick={toggleBgVideo}
          className="text-slate-300 hover:text-white p-1 transition-colors ml-1 border-l border-slate-800 pl-2"
          title={isVideoPlaying ? 'Pause background video' : 'Play background video'}
          aria-label={isVideoPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
        </button>
      </div>
      {/* 5. Subtle Bouncing Scroll Indicator (Bottom Center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center pointer-events-auto">
        <a 
          href="#trust-indicators" 
          className="flex flex-col items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-slate-400 hover:text-brand-copper transition-colors group"
          aria-label="Scroll to explore services"
        >
          <span className="text-[10px] tracking-widest text-slate-400 group-hover:text-slate-200">Explore Capabilities</span>
          <ChevronDown className="w-4 h-4 text-brand-copper animate-bounce" />
        </a>
      </div>
    </section>
  );
};