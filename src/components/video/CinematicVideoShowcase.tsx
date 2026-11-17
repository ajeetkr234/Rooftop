import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ShieldCheck, 
  ArrowRight,
  Video,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface VideoChapter {
  id: string;
  timeSec: number;
  timeLabel: string;
  title: string;
  badge: string;
  description: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    id: 'ch-1',
    timeSec: 0,
    timeLabel: '0:00',
    title: 'Aerial Drone Forensic Scan',
    badge: 'Phase 01',
    description: 'High-definition 4K aerial drone scans all roof pitches, valley intersections, and chimney flashing with millimeter precision.'
  },
  {
    id: 'ch-2',
    timeSec: 12,
    timeLabel: '0:45',
    title: 'Zero-Damage Tear-Off & Decking Repair',
    badge: 'Phase 02',
    description: 'Protecting property landscaping with heavy-duty tarps while stripping degraded materials down to solid structural deck boards.'
  },
  {
    id: 'ch-3',
    timeSec: 25,
    timeLabel: '1:15',
    title: 'Self-Adhering Ice Barrier & Synthetic Shield',
    badge: 'Phase 03',
    description: 'Installing ASTM D1970 self-sealing waterproof membranes in valleys and eaves, followed by high-tensile synthetic underlayment.'
  },
  {
    id: 'ch-4',
    timeSec: 38,
    timeLabel: '1:50',
    title: 'Precision Fastening & Balanced Ventilation',
    badge: 'Phase 04',
    description: 'Mechanically fastening Class-4 shingles and continuous ridge vents according to strict manufacturer wind-uplift specifications.'
  },
  {
    id: 'ch-5',
    timeSec: 50,
    timeLabel: '2:30',
    title: 'Magnetic Debris Sweep & Final Sign-Off',
    badge: 'Phase 05',
    description: 'Dual-pass industrial magnetic sweep guarantees zero nails on driveways or lawns before final client walkthrough.'
  }
];

// Verified high-performance web-optimized architectural video
const VIDEO_SRC = "/videos/hero-drone.webm";
// Backup fallback video
const BACKUP_VIDEO_SRC = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Photodrones_UAV_drone_Showreel.webm";

export const CinematicVideoShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(60);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Sync current time and chapters
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Determine current active chapter based on time
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (time >= CHAPTERS[i].timeSec) {
        setActiveChapterIndex(i);
        break;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 60);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const seekToChapter = (chapter: VideoChapter, index: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = chapter.timeSec;
    setActiveChapterIndex(index);
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#090E17] text-white relative overflow-hidden border-t border-slate-800" id="video-tour">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-copper/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-copper/15 border border-brand-copper/30 text-brand-copper text-xs font-bold uppercase tracking-widest mb-3">
              <Video className="w-3.5 h-3.5" />
              <span>Cinematic 4K Jobsite Tour</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Watch Our Craftsmanship in Action
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Experience the step-by-step process of our certified roofing crews—from high-resolution forensic aerial drone scans to spotless zero-debris yard cleanups.
            </p>
          </div>

          {/* Badge indicator */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
            <span className="font-extrabold text-white uppercase tracking-wider">4K Ultra-HD Drone Footage</span>
          </div>
        </div>

        {/* Video Player Box + Chapter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Viewport (8 Cols) */}
          <div 
            ref={containerRef}
            className="lg:col-span-8 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative group"
          >
            {/* The Video Element */}
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <video
                ref={videoRef}
                src={hasError ? BACKUP_VIDEO_SRC : VIDEO_SRC}
                onError={() => setHasError(true)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Top Gradient Shadow & Live Chapter Tag */}
              <div className="absolute top-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-brand-copper text-white text-[10px] font-black uppercase tracking-wider shadow">
                    {activeChapter.badge}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-white drop-shadow">
                    {activeChapter.title}
                  </span>
                </div>

                <div className="text-[11px] font-mono font-bold text-slate-300 bg-black/60 px-2.5 py-1 rounded border border-slate-700 backdrop-blur-md">
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </div>
              </div>

              {/* Big Centered Play/Pause Button on Hover */}
              <div 
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 group-hover:bg-black/40 transition-colors"
              >
                <button
                  type="button"
                  className="w-16 h-16 rounded-full bg-brand-copper/90 hover:bg-brand-copper text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform focus-visible:outline-none"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Bottom Custom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-3">
                {/* Progress Scrubber */}
                <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden cursor-pointer">
                  <div 
                    className="bg-brand-copper h-full transition-all duration-150"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="text-white hover:text-brand-copper p-1.5 transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="text-white hover:text-brand-copper p-1.5 transition-colors"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      {activeChapter.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="text-white hover:text-brand-copper p-1.5 transition-colors"
                      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Chapter Briefing Below Video */}
            <div className="p-6 bg-brand-slate border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-copper block mb-1">
                  Active Inspection Phase
                </span>
                <h4 className="font-extrabold text-base sm:text-lg text-white">
                  {activeChapter.title}
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-xl">
                  {activeChapter.description}
                </p>
              </div>

              <Link
                to="/request-estimate"
                className="px-4 py-2.5 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <span>Book Drone Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Chapter Timeline Navigation (4 Cols) */}
          <div className="lg:col-span-4 bg-brand-slate/90 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-copper flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Jobsite Flight Timeline</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">5 Chapters</span>
              </div>

              <div className="space-y-2.5">
                {CHAPTERS.map((chapter, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => seekToChapter(chapter, idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        isActive
                          ? 'bg-slate-900 border-brand-copper shadow-md ring-1 ring-brand-copper/60'
                          : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-brand-copper text-white' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {chapter.timeLabel}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            isActive ? 'text-brand-copper' : 'text-slate-500'
                          }`}>
                            {chapter.badge}
                          </span>
                        </div>
                        <h5 className={`font-bold text-xs leading-snug truncate ${
                          isActive ? 'text-white' : 'text-slate-300'
                        }`}>
                          {chapter.title}
                        </h5>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Credential Callout */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-brand-copper shrink-0" />
              <span>
                All aerial inspections performed by <strong className="text-white">FAA Part 107 Licensed Drone Pilots</strong>.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
