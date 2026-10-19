import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Camera,
  Film,
  Mic,
  Music,
} from 'lucide-react';
import { COMMERCIAL_SCENES, CommercialScene } from '../data/commercialData';
import { luxuryAudio, speakArabicVoiceover, stopArabicVoiceover } from '../utils/luxuryAudio';

interface CommercialPlayerProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenInquiry: () => void;
}

export const CommercialPlayer: React.FC<CommercialPlayerProps> = ({
  isMuted,
  onToggleMute,
  onOpenInquiry,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0); // 0 to 15 seconds
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [voiceoverActive, setVoiceoverActive] = useState<boolean>(true);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [spotlightAngle, setSpotlightAngle] = useState<{ x: number; y: number }>({ x: 50, y: 35 });

  const animFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const lastTriggeredSceneRef = useRef<number>(-1);

  const activeScene: CommercialScene = COMMERCIAL_SCENES[activeSceneIndex];

  // Map currentTime to active scene
  useEffect(() => {
    let index = 0;
    if (currentTime >= 12.0) {
      index = 2; // Scene 3 (12 - 15)
    } else if (currentTime >= 5.0) {
      index = 1; // Scene 2 (5 - 12)
    } else {
      index = 0; // Scene 1 (0 - 5)
    }
    setActiveSceneIndex(index);

    // Audio cue trigger on scene transition
    if (isPlaying && lastTriggeredSceneRef.current !== index) {
      lastTriggeredSceneRef.current = index;
      if (!isMuted) {
        luxuryAudio.playSceneMotif(index + 1);
        if (voiceoverActive) {
          const scene = COMMERCIAL_SCENES[index];
          speakArabicVoiceover(scene.voiceoverArabic);
        }
      }
    }
  }, [currentTime, isPlaying, isMuted, voiceoverActive]);

  // Main playback animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      lastTimestampRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      setCurrentTime((prev) => {
        const nextTime = prev + delta;
        if (nextTime >= 15.0) {
          setIsPlaying(false);
          return 15.0;
        }
        return nextTime;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopArabicVoiceover();
    } else {
      if (currentTime >= 15.0) {
        setCurrentTime(0);
        lastTriggeredSceneRef.current = -1;
      }
      setIsPlaying(true);
      if (!isMuted) {
        const currentIdx = currentTime >= 12.0 ? 2 : currentTime >= 5.0 ? 1 : 0;
        luxuryAudio.playSceneMotif(currentIdx + 1);
        if (voiceoverActive) {
          speakArabicVoiceover(COMMERCIAL_SCENES[currentIdx].voiceoverArabic);
        }
      }
    }
  };

  const handleSeek = (newTime: number) => {
    stopArabicVoiceover();
    setCurrentTime(newTime);
    lastTriggeredSceneRef.current = -1;
    if (!isMuted && isPlaying) {
      const idx = newTime >= 12.0 ? 2 : newTime >= 5.0 ? 1 : 0;
      luxuryAudio.playSceneMotif(idx + 1);
      if (voiceoverActive) {
        speakArabicVoiceover(COMMERCIAL_SCENES[idx].voiceoverArabic);
      }
    }
  };

  const jumpToScene = (sceneIndex: number) => {
    stopArabicVoiceover();
    const targetScene = COMMERCIAL_SCENES[sceneIndex];
    setCurrentTime(targetScene.startTime);
    lastTriggeredSceneRef.current = -1;
    if (!isMuted) {
      luxuryAudio.playSceneMotif(targetScene.id);
      if (voiceoverActive) {
        speakArabicVoiceover(targetScene.voiceoverArabic);
      }
    }
  };

  const restartCommercial = () => {
    stopArabicVoiceover();
    setCurrentTime(0);
    lastTriggeredSceneRef.current = -1;
    setIsPlaying(true);
    if (!isMuted) {
      luxuryAudio.playSceneMotif(1);
      if (voiceoverActive) {
        speakArabicVoiceover(COMMERCIAL_SCENES[0].voiceoverArabic);
      }
    }
  };

  // Subtle interactive spotlight shift on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightAngle({ x, y });
  };

  return (
    <section id="commercial" className="relative pt-6 pb-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07130f] via-[#0b1f18] to-[#07130f] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#143426]/30 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaign Header / Hero Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#11241c] border border-[#c5a059]/30 text-xs font-serif-luxury tracking-widest text-[#c5a059] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#dfba73]" />
            <span>TV COMMERCIAL CONCEPT · فكرة إعلان تلفزيوني رسمي</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold tracking-tight text-[#f4ede2] mb-4 leading-tight">
            "فخامة في كل تفاصيلها"
          </h1>

          <p className="text-base sm:text-lg text-[#ede8df]/80 font-arabic-luxury leading-relaxed max-w-2xl mx-auto">
            حقيبة ورقية فاخرة خاصة بالـ <span className="text-[#f7dfa5] font-semibold">Jewelry Paper Bag</span> من ماركة{' '}
            <span className="font-brand font-semibold text-[#c5a059]">GRAVITY</span>. استعراض إخراجي متكامل يجسد أرقى معايير الفخامة والغموض لقطعة المجوهرات قبل فتحها.
          </p>
        </div>

        {/* Cinematic TV Commercial Frame */}
        <div
          className={`relative mx-auto transition-all duration-500 rounded-2xl overflow-hidden border border-[#c5a059]/30 bg-[#040a08] shadow-[0_25px_70px_rgba(0,0,0,0.85)] ${
            isCinemaMode ? 'max-w-6xl' : 'max-w-5xl'
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Virtual Film Aspect Ratio Letterbox bars */}
          <div className="relative aspect-[16/9] w-full overflow-hidden select-none bg-black">
            {/* Theatrical Stage Spotlight Gradient Overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10 transition-all duration-700 opacity-70"
              style={{
                background: `radial-gradient(circle at ${spotlightAngle.x}% ${spotlightAngle.y}%, rgba(197, 160, 89, 0.18) 0%, rgba(20, 52, 38, 0.3) 45%, rgba(4, 10, 8, 0.95) 100%)`,
              }}
            />

            {/* Subtle Vignette & Film Border */}
            <div className="absolute inset-0 pointer-events-none z-10 film-vignette" />

            {/* Render Image Assets for each Scene with smooth opacity crossfade */}
            {COMMERCIAL_SCENES.map((scene, idx) => {
              const isCurrent = activeSceneIndex === idx;
              return (
                <div
                  key={scene.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isCurrent ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={scene.imageSrc}
                    alt={scene.titleArabic}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                      isCurrent && isPlaying
                        ? idx === 1
                          ? 'scale-110 translate-x-2'
                          : idx === 2
                          ? 'scale-105 -translate-y-2'
                          : 'scale-105'
                        : 'scale-100'
                    }`}
                  />
                </div>
              );
            })}

            {/* Top Bar HUD: Timecode, Camera Specs & Scene Name */}
            <div className="absolute top-4 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#f7dfa5] tracking-widest tabular-nums">
                  TC {currentTime.toFixed(2)}s / 15.00s
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white/80">
                  <Camera className="w-3 h-3 text-[#c5a059]" />
                  <span>{activeScene.cameraTechnique.split('·')[0]}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#10271d]/80 backdrop-blur-md border border-[#c5a059]/40 text-xs font-serif-luxury text-[#f4ede2] tracking-wide">
                  مشهد {activeScene.id}: {activeScene.titleArabic}
                </span>
              </div>
            </div>

            {/* Center Play Overlay Trigger (when paused) */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer group transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c5a059]/30 transition-all shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                  <Play className="w-8 h-8 text-[#f7dfa5] fill-[#f7dfa5] translate-x-0.5" />
                </div>
              </div>
            )}

            {/* Scene 3 Tagline Cinematic Typography Overlay (Visible at Scene 3) */}
            {activeSceneIndex === 2 && (
              <div className="absolute inset-x-0 top-1/3 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-6">
                <div className="animate-fade-in transition-all">
                  <h2 className="font-brand text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.25em] gold-shimmer-text drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] mb-2">
                    GRAVITY
                  </h2>
                  <p className="text-sm sm:text-xl font-serif-luxury tracking-widest text-[#f4ede2] italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    — Elevate Your Brand —
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Subtitle / Voiceover Ribbon */}
            <div className="absolute bottom-6 inset-x-6 sm:inset-x-12 z-20 pointer-events-none text-center">
              <div className="inline-block px-6 py-3 rounded-lg bg-black/75 backdrop-blur-md border border-[#c5a059]/30 shadow-2xl max-w-3xl">
                <p className="text-base sm:text-lg lg:text-xl font-serif-luxury text-[#f7dfa5] font-medium leading-relaxed drop-shadow">
                  "{activeScene.voiceoverArabic}"
                </p>
                <p className="text-xs sm:text-sm text-[#ede8df]/70 font-sans tracking-wide mt-1">
                  {activeScene.voiceoverEnglish}
                </p>
              </div>
            </div>
          </div>

          {/* Integrated Commercial Control Deck */}
          <div className="p-4 sm:p-6 bg-[#081711] border-t border-[#c5a059]/20">
            {/* 15-Second Interactive Timeline Scrub Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[#ede8df]/70 mb-1.5 font-mono">
                <span className="text-[#f7dfa5] font-semibold">
                  00:{Math.floor(currentTime).toString().padStart(2, '0')}.{Math.floor((currentTime % 1) * 100).toString().padStart(2, '0')}
                </span>
                <span>المشاهد: [1: 0-5s] · [2: 6-12s] · [3: 13-15s]</span>
                <span>00:15.00</span>
              </div>

              {/* Progress Slider Track with Scene Boundary Pointers */}
              <div className="relative w-full h-3 bg-black/60 rounded-full overflow-hidden cursor-pointer group">
                {/* Scene 1 Region */}
                <div
                  onClick={() => jumpToScene(0)}
                  className="absolute left-0 top-0 bottom-0 w-[33.33%] border-r border-[#c5a059]/30 hover:bg-white/5 transition-colors"
                  title="مشهد 1: الغموض والأناقة (0-5s)"
                />
                {/* Scene 2 Region */}
                <div
                  onClick={() => jumpToScene(1)}
                  className="absolute left-[33.33%] top-0 bottom-0 w-[46.66%] border-r border-[#c5a059]/30 hover:bg-white/5 transition-colors"
                  title="مشهد 2: التركيز على التفاصيل (6-12s)"
                />
                {/* Scene 3 Region */}
                <div
                  onClick={() => jumpToScene(2)}
                  className="absolute left-[80%] top-0 bottom-0 w-[20%] hover:bg-white/5 transition-colors"
                  title="مشهد 3: الختام والدعوة للتصميم (13-15s)"
                />

                {/* Active Played Fill */}
                <div
                  className="h-full bg-gradient-to-r from-[#b38e47] via-[#c5a059] to-[#f7dfa5] relative"
                  style={{ width: `${(currentTime / 15) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#c5a059] scale-100 group-hover:scale-125 transition-transform" />
                </div>

                {/* Slider Input Handle for smooth dragging */}
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.05"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>

            {/* Playback Controls & Director Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left Zone: Transport Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#dfba73] text-[#07130f] hover:from-[#f0d696] hover:to-[#c5a059] transition-all shadow-[0_0_15px_rgba(197,160,89,0.3)] active:scale-95"
                  aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-[#07130f]" />
                  ) : (
                    <Play className="w-5 h-5 fill-[#07130f] translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={restartCommercial}
                  className="p-2.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-[#c5a059]/50 transition-colors"
                  title="إعادة تشغيل الإعلان من البداية"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Audio Toggles */}
                <div className="flex items-center gap-1 border-r border-l border-white/10 px-3">
                  <button
                    onClick={onToggleMute}
                    className={`p-2 rounded-md transition-colors ${
                      isMuted
                        ? 'text-white/40 hover:text-white'
                        : 'text-[#f7dfa5] bg-[#c5a059]/15'
                    }`}
                    title={isMuted ? 'تفعيل موسيقى البيانو والمؤثرات' : 'كتم الموسيقى'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      const next = !voiceoverActive;
                      setVoiceoverActive(next);
                      if (!next) stopArabicVoiceover();
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors ${
                      voiceoverActive
                        ? 'bg-[#c5a059]/20 text-[#f7dfa5] border border-[#c5a059]/40'
                        : 'text-white/40 border border-transparent'
                    }`}
                    title="التعليق الصوتي العربي (Voiceover)"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">التعليق الصوتي</span>
                  </button>
                </div>
              </div>

              {/* Middle Zone: Quick Scene Select Buttons */}
              <div className="flex items-center gap-2">
                {COMMERCIAL_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => jumpToScene(idx)}
                    className={`px-3 py-1.5 text-xs rounded-md transition-all whitespace-nowrap ${
                      activeSceneIndex === idx
                        ? 'bg-[#c5a059] text-[#07130f] font-semibold shadow-md'
                        : 'bg-[#10241b] text-[#ede8df]/80 hover:text-[#ede8df] hover:bg-[#163326] border border-[#c5a059]/20'
                    }`}
                  >
                    مشهد {scene.id} ({scene.timeRange.replace('0:0', '').replace('0:', '')})
                  </button>
                ))}
              </div>

              {/* Right Zone: Secondary Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCinemaMode(!isCinemaMode)}
                  className="p-2 rounded-md border border-white/10 text-white/70 hover:text-white hover:border-[#c5a059]/40 transition-colors"
                  title={isCinemaMode ? 'تصغير العرض' : 'وضع السينما العريض'}
                >
                  {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={onOpenInquiry}
                  className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#07130f] bg-[#c5a059] hover:bg-[#dfba73] rounded-md transition-colors"
                >
                  <span>طلب مواصفات الإعلان</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
