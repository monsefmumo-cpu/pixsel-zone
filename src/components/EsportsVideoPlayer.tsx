import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Flame,
  Zap,
  Clock,
  Sparkles,
  Shield,
  Film,
} from 'lucide-react';
import { TRAILER_SCENES, TrailerScene } from '../data/trailerData';
import { esportsAudio } from '../utils/esportsAudio';
import { ParticleEmbersCanvas } from './ParticleEmbersCanvas';

interface EsportsVideoPlayerProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onReminderClick: () => void;
}

export const EsportsVideoPlayer: React.FC<EsportsVideoPlayerProps> = ({
  isMuted,
  onToggleMute,
  onReminderClick,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(0); // 0 to 30 seconds
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const [lightningStrobe, setLightningStrobe] = useState<boolean>(false);
  const [sparkIgnited, setSparkIgnited] = useState<boolean>(false);
  const [lastSecondTick, setLastSecondTick] = useState<number>(-1);

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const audioTriggerMap = useRef<Set<string>>(new Set());

  // Determine active scene based on currentTime (0 - 30s)
  let activeSceneIndex = 0;
  if (currentTime >= 26.0) activeSceneIndex = 4; // 26-30s
  else if (currentTime >= 20.0) activeSceneIndex = 3; // 20-26s
  else if (currentTime >= 12.0) activeSceneIndex = 2; // 12-20s
  else if (currentTime >= 5.0) activeSceneIndex = 1; // 5-12s
  else activeSceneIndex = 0; // 0-5s

  const activeScene: TrailerScene = TRAILER_SCENES[activeSceneIndex];

  // Calculate live countdown to 21:30 GMT+1
  const [countdownRemaining, setCountdownRemaining] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
    millis: string;
  }>({ hours: '03', minutes: '45', seconds: '28', millis: '60' });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Calculate target time: Today at 21:30 GMT+1 (which is 20:30 UTC)
      const target = new Date();
      target.setUTCHours(20, 30, 0, 0); // 21:30 GMT+1 is 20:30 UTC
      if (now.getTime() > target.getTime()) {
        target.setDate(target.getDate() + 1); // tomorrow if past
      }

      const diff = Math.max(0, target.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      const millis = Math.floor((diff % 1000) / 10).toString().padStart(2, '0');

      setCountdownRemaining({ hours, minutes, seconds, millis });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 50);
    return () => clearInterval(interval);
  }, []);

  // Audio & Visual Event triggers mapped to specific timestamps
  useEffect(() => {
    if (!isPlaying) return;

    // 0.4s: Spark ignition click
    if (currentTime >= 0.4 && currentTime < 1.4 && !audioTriggerMap.current.has('spark')) {
      audioTriggerMap.current.add('spark');
      setSparkIgnited(true);
      esportsAudio.playSparkIgnition();
    }

    // 1.5s: Explosion slam for "TODAY IS FIRE" & Skull
    if (currentTime >= 1.5 && currentTime < 4.5 && !audioTriggerMap.current.has('title_slam')) {
      audioTriggerMap.current.add('title_slam');
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 700);
      esportsAudio.playTitleSlamExplosion();
    }

    // 5.0s: Arena atmosphere drone
    if (currentTime >= 5.0 && currentTime < 11.5 && !audioTriggerMap.current.has('arena_drone')) {
      audioTriggerMap.current.add('arena_drone');
      esportsAudio.startArenaAtmosphere();
      esportsAudio.playHeartbeat();
    }

    // 8.5s: Secondary heartbeat
    if (currentTime >= 8.5 && currentTime < 11.0 && !audioTriggerMap.current.has('heartbeat_2')) {
      audioTriggerMap.current.add('heartbeat_2');
      esportsAudio.playHeartbeat();
    }

    // 12.0s: Fast cuts whoosh
    if (currentTime >= 12.0 && currentTime < 14.0 && !audioTriggerMap.current.has('fast_cut_1')) {
      audioTriggerMap.current.add('fast_cut_1');
      esportsAudio.playFastCutWhoosh();
    }

    // 14.5s: Lightning flash & thunderclap
    if (currentTime >= 14.5 && currentTime < 16.0 && !audioTriggerMap.current.has('lightning')) {
      audioTriggerMap.current.add('lightning');
      setLightningStrobe(true);
      setTimeout(() => setLightningStrobe(false), 450);
      esportsAudio.playLightningThunder();
    }

    // 16.0s: Tension pitch riser building to 20s drop
    if (currentTime >= 16.0 && currentTime < 19.8 && !audioTriggerMap.current.has('riser')) {
      audioTriggerMap.current.add('riser');
      esportsAudio.playTensionRiser();
    }

    // 20.0s: *** THE BIG SUB-BASS 808 DROP! ***
    if (currentTime >= 20.0 && currentTime < 25.5 && !audioTriggerMap.current.has('bass_drop')) {
      audioTriggerMap.current.add('bass_drop');
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 900);
      esportsAudio.playBigBassDrop();
    }

    // 26.0s - 30.0s: Countdown ticking beeps
    const currentSecondFloor = Math.floor(currentTime);
    if (currentSecondFloor >= 26 && currentSecondFloor <= 30 && currentSecondFloor !== lastSecondTick) {
      setLastSecondTick(currentSecondFloor);
      esportsAudio.playCountdownTick(currentSecondFloor === 30);
    }
  }, [currentTime, isPlaying, lastSecondTick]);

  // Main high-precision animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
      return;
    }

    const step = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = ((now - lastTimeRef.current) / 1000) * playbackSpeed;
      lastTimeRef.current = now;

      setCurrentTime((prev) => {
        const next = prev + delta;
        if (next >= 30.0) {
          setIsPlaying(false);
          return 30.0;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      esportsAudio.stopDrone();
    } else {
      if (currentTime >= 30.0) {
        setCurrentTime(0);
        audioTriggerMap.current.clear();
      }
      setIsPlaying(true);
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    audioTriggerMap.current.clear();
    // Re-seed triggers before newTime
    if (newTime >= 0.4) audioTriggerMap.current.add('spark');
    if (newTime >= 1.5) audioTriggerMap.current.add('title_slam');
    if (newTime >= 5.0) audioTriggerMap.current.add('arena_drone');
    if (newTime >= 8.5) audioTriggerMap.current.add('heartbeat_2');
    if (newTime >= 12.0) audioTriggerMap.current.add('fast_cut_1');
    if (newTime >= 14.5) audioTriggerMap.current.add('lightning');
    if (newTime >= 16.0) audioTriggerMap.current.add('riser');
    if (newTime >= 20.0) audioTriggerMap.current.add('bass_drop');

    if (isPlaying) {
      if (newTime >= 5.0 && newTime < 12.0) esportsAudio.startArenaAtmosphere();
      else if (newTime >= 20.0 && newTime < 26.0) esportsAudio.playBigBassDrop();
    }
  };

  const jumpToScene = (sceneIndex: number) => {
    const target = TRAILER_SCENES[sceneIndex];
    handleSeek(target.startSec);
  };

  const restartTrailer = () => {
    handleSeek(0);
    setIsPlaying(true);
  };

  return (
    <section className="relative pt-4 pb-16 overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#ff3b00]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-[#ff7700]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#150d0a] border border-[#ff3b00]/40 text-xs font-tech text-[#ff6a00] mb-3 fire-box-glow">
            <Flame className="w-3.5 h-3.5 text-[#ff3b00] animate-pulse" />
            <span>OFFICIAL 30S ESPORTS ANNOUNCEMENT · 4K 60FPS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-stamp tracking-wider text-white uppercase mb-2">
            TODAY IS FIRE
          </h1>
          <p className="text-sm sm:text-base text-[#a3a3b2] font-sans">
            Free Fire 2026 Championship · 4v4 Match Standoff & Ruined Arena Clash
          </p>
        </div>

        {/* 16:9 Cinema Container */}
        <div
          className={`relative mx-auto rounded-2xl overflow-hidden border border-[#ff3b00]/40 bg-[#020204] shadow-[0_20px_70px_rgba(255,59,0,0.25)] transition-all duration-500 ${
            isCinemaMode ? 'max-w-6xl' : 'max-w-5xl'
          } ${screenShake ? 'animate-impact-shake' : ''}`}
        >
          {/* Main 16:9 Aspect Ratio Display */}
          <div className="relative aspect-[16/9] w-full overflow-hidden select-none bg-black">
            {/* Real-time Floating Particle Embers Canvas Overlay */}
            <ParticleEmbersCanvas
              intensity={
                currentTime >= 20 && currentTime <= 26
                  ? 'explosive'
                  : currentTime >= 1.5 && currentTime <= 5
                  ? 'high'
                  : 'medium'
              }
            />

            {/* Lightning Strobe Flash Overlay */}
            {lightningStrobe && (
              <div className="absolute inset-0 bg-cyan-100 z-30 pointer-events-none animate-lightning mix-blend-screen" />
            )}

            {/* Scanlines for 4K Broadcast Look */}
            <div className="absolute inset-0 scanlines pointer-events-none z-20 opacity-40" />

            {/* ======================================================== */}
            {/* SCENE RENDERING BASED ON TIMECODE */}
            {/* ======================================================== */}

            {/* 1. SCENE 1: 0 - 5s (Black Screen -> Spark Ignites -> Flames Explode -> TODAY IS FIRE + Skull) */}
            {currentTime < 5.0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                {/* 0.0s - 1.4s: Pitch Black with Igniting Spark */}
                {currentTime < 1.5 ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      {/* The Solitary Spark */}
                      <div
                        className={`w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                          currentTime >= 0.4
                            ? 'scale-[3.5] bg-[#ffaa00] shadow-[0_0_40px_#ff3b00]'
                            : 'scale-75 opacity-70 animate-ping'
                        }`}
                      />
                      {currentTime >= 0.4 && (
                        <div className="absolute w-24 h-24 rounded-full border border-[#ff6a00] animate-ping opacity-60" />
                      )}
                    </div>
                    <span className="text-[11px] font-tech text-white/40 tracking-[0.3em] uppercase mt-6">
                      IGNITING...
                    </span>
                  </div>
                ) : (
                  /* 1.5s - 5.0s: Explosion, Skull, and "TODAY IS FIRE" Slam */
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Fiery Background Image */}
                    <img
                      src="/src/assets/images/esports_scene1_fire_skull_1792154592230.jpg"
                      alt="Today Is Fire Skull Explosion"
                      className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[4000ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/70" />

                    {/* Slammed Text & Glowing Skull Presentation */}
                    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
                      {/* Big Bold White Text: "TODAY IS FIRE" */}
                      <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-stamp font-black tracking-tight text-white uppercase drop-shadow-[0_0_35px_rgba(255,59,0,0.9)] animate-impact-shake">
                        TODAY IS FIRE
                      </h2>

                      {/* Glowing Skull Pulse with Fire Subtext */}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#ff3b00]/30 border-2 border-[#ff3b00] flex items-center justify-center text-2xl sm:text-3xl animate-skull-pulse shadow-[0_0_30px_#ff3b00]">
                          💀
                        </div>
                        <span className="text-xs sm:text-sm font-tech tracking-[0.35em] text-[#ffaa00] uppercase font-bold drop-shadow">
                          ESPORTS CHAMPIONSHIP 2026
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. SCENE 2: 5 - 12s (Ruined Arena at Night, Embers Floating, Two Squads Standoff) */}
            {currentTime >= 5.0 && currentTime < 12.0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <img
                  src="/src/assets/images/esports_scene2_arena_squads_1792154593917.jpg"
                  alt="Ruined Arena Standoff"
                  className="w-full h-full object-cover scale-100 transition-transform duration-[7000ms] ease-out scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

                {/* Standoff Overlay HUD */}
                <div className="absolute top-6 inset-x-8 flex items-center justify-between text-xs font-tech text-white/80 pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded border border-[#ff3b00]/40">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>LOCATION: RUINED HAVOC ARENA</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded border border-white/20">
                    <span>TACTICAL STANDOFF · 4v4 SQUADS</span>
                  </div>
                </div>

                <div className="absolute bottom-6 inset-x-8 flex items-center justify-between text-xs font-tech pointer-events-none">
                  <div className="text-left bg-black/75 backdrop-blur p-2.5 rounded border border-blue-500/40">
                    <span className="text-blue-400 font-bold block">SQUAD ALPHA [BLUE]</span>
                    <span className="text-[10px] text-white/60">4 OPERATIVES IN POSITION</span>
                  </div>
                  <div className="text-right bg-black/75 backdrop-blur p-2.5 rounded border border-red-500/40">
                    <span className="text-red-400 font-bold block">SQUAD OMEGA [RED]</span>
                    <span className="text-[10px] text-white/60">4 OPERATIVES ADVANCING</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SCENE 3: 12 - 20s (Fast Cuts: Eyes, Boots on Dust, Hands Gripping Gear, Lightning, "4v4 MATCH – FREE FIRE 2026") */}
            {currentTime >= 12.0 && currentTime < 20.0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <img
                  src="/src/assets/images/esports_scene3_tense_closeups_1792154594115.jpg"
                  alt="Tense Tactical Closeups"
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    currentTime >= 16.0 ? 'scale-110 translate-y-1' : 'scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/70" />

                {/* Quick Cut Indicator & Tension Metronome */}
                <div className="absolute top-6 left-8 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-red-600 text-[10px] font-tech text-white uppercase tracking-widest animate-pulse">
                    LIVE INTEL
                  </span>
                  <span className="text-[11px] font-tech text-white/70">
                    {currentTime < 14.5 ? 'TARGET ACQUISITION: EYES' : currentTime < 17.5 ? 'GEAR GRIP TENSION' : 'LIGHTNING CONTACT'}
                  </span>
                </div>

                {/* Impact Title Text: "4v4 MATCH – FREE FIRE 2026" */}
                {currentTime >= 14.0 && (
                  <div className="absolute inset-x-4 bottom-12 flex flex-col items-center justify-center text-center animate-impact-shake">
                    <div className="inline-block px-6 py-3 rounded-lg bg-black/85 backdrop-blur-md border-2 border-[#ff3b00] shadow-[0_0_40px_rgba(255,59,0,0.6)]">
                      <h2 className="text-3xl sm:text-5xl md:text-6xl font-stamp font-black text-white tracking-wider uppercase drop-shadow-[0_0_20px_#ff3b00]">
                        4v4 MATCH – FREE FIRE 2026
                      </h2>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-tech text-cyan-300 tracking-[0.25em] uppercase">
                          MAXIMUM LETHALITY · ARENA OF HAVOC
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. SCENE 4: 20 - 26s (Both Squads Charge, Slow Motion, Camera Shake, Sparks, Smoke - BIG BASS DROP!) */}
            {currentTime >= 20.0 && currentTime < 26.0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <img
                  src="/src/assets/images/esports_scene4_squad_charge_1792154593811.jpg"
                  alt="Squads Charge Clash"
                  className="w-full h-full object-cover scale-110 transition-transform duration-[6000ms] ease-out animate-pulse"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

                {/* Big Bass Drop Visual Overlay Alert */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl sm:text-8xl md:text-9xl font-stamp font-black tracking-tight text-white uppercase drop-shadow-[0_0_50px_#ff2200] opacity-90 scale-105 animate-impact-shake">
                      THE CLASH
                    </span>
                    <div className="flex items-center justify-center gap-3 mt-1">
                      <span className="px-3 py-1 bg-[#ff2200] text-black font-tech font-extrabold text-xs tracking-[0.3em] uppercase">
                        SUB-BASS DROP 20s
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 inset-x-8 flex items-center justify-between text-xs font-tech text-[#ffaa00] pointer-events-none">
                  <span>8 OPERATIVES ENGAGED</span>
                  <span>120 FPS SLOW MOTION COMBAT</span>
                </div>
              </div>
            )}

            {/* 5. SCENE 5: 26 - 30s (Fade to Black, Glowing Countdown Clock, "Don't be late – 21:30 GMT+1") */}
            {currentTime >= 26.0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20 px-6 animate-fade-in">
                {/* Glowing Holographic Ring */}
                <div className="relative flex flex-col items-center justify-center p-8 rounded-2xl border border-[#ff3b00]/50 bg-[#080302]/90 shadow-[0_0_60px_rgba(255,59,0,0.4)] max-w-xl w-full text-center">
                  <div className="flex items-center gap-2 text-xs font-tech text-[#ff6a00] uppercase tracking-widest mb-3">
                    <Clock className="w-4 h-4 text-[#ff3b00] animate-spin" style={{ animationDuration: '6s' }} />
                    <span>OFFICIAL TOURNAMENT BROADCAST</span>
                  </div>

                  {/* Main Imperative Headline */}
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-stamp font-black text-white tracking-wider uppercase drop-shadow-[0_0_25px_#ff3b00] mb-3">
                    DON'T BE LATE – 21:30 GMT+1
                  </h2>

                  {/* Glowing Digital Countdown Clock */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl sm:text-5xl font-tech font-black text-[#ffaa00] bg-black/60 px-3 py-2 rounded border border-[#ff3b00]/40 tabular-nums shadow-[0_0_15px_rgba(255,59,0,0.3)]">
                        {countdownRemaining.hours}
                      </span>
                      <span className="text-[10px] font-tech text-white/50 mt-1 uppercase">HOURS</span>
                    </div>
                    <span className="text-2xl text-[#ff3b00] font-black">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl sm:text-5xl font-tech font-black text-[#ffaa00] bg-black/60 px-3 py-2 rounded border border-[#ff3b00]/40 tabular-nums shadow-[0_0_15px_rgba(255,59,0,0.3)]">
                        {countdownRemaining.minutes}
                      </span>
                      <span className="text-[10px] font-tech text-white/50 mt-1 uppercase">MINUTES</span>
                    </div>
                    <span className="text-2xl text-[#ff3b00] font-black">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl sm:text-5xl font-tech font-black text-[#ff3b00] bg-black/60 px-3 py-2 rounded border border-[#ff3b00]/60 tabular-nums shadow-[0_0_20px_rgba(255,59,0,0.5)] animate-pulse">
                        {countdownRemaining.seconds}
                      </span>
                      <span className="text-[10px] font-tech text-white/50 mt-1 uppercase">SECONDS</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#a3a3b2] font-sans mt-3">
                    Grand Finals 4v4 Standoff · Live on YouTube & Booyah Live
                  </p>

                  <button
                    onClick={onReminderClick}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#ff3b00] to-[#ff7700] hover:from-[#ff5500] hover:to-[#ff9900] text-black font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(255,59,0,0.5)] active:scale-95"
                  >
                    Set Calendar Reminder for 21:30 GMT+1
                  </button>
                </div>
              </div>
            )}

            {/* Top HUD Bar: Resolution, TC, Scene Name */}
            <div className="absolute top-4 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur border border-white/10 text-[11px] font-tech text-[#ffaa00] tracking-widest tabular-nums">
                  TC 00:{Math.floor(currentTime).toString().padStart(2, '0')}.{Math.floor((currentTime % 1) * 100).toString().padStart(2, '0')} / 00:30.00
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded bg-red-600/80 text-[10px] font-tech text-white uppercase tracking-wider">
                  4K UHD 60FPS
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-black/80 backdrop-blur border border-[#ff3b00]/40 text-xs font-tech text-white">
                  SCENE {activeScene.id}: {activeScene.tagline}
                </span>
              </div>
            </div>

            {/* Big Center Play Button Overlay (when paused) */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-[2px] cursor-pointer group transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-[#ff3b00]/25 border-2 border-[#ff3b00] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#ff3b00]/40 transition-all shadow-[0_0_40px_rgba(255,59,0,0.7)]">
                  <Play className="w-8 h-8 text-white fill-white translate-x-0.5" />
                </div>
              </div>
            )}
          </div>

          {/* Integrated Trailer Control Deck */}
          <div className="p-4 sm:p-6 bg-[#090507] border-t border-[#ff3b00]/25">
            {/* 30-Second Scrub Bar with 5 Scene Regions */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[#a3a3b2] mb-1.5 font-tech">
                <span className="text-[#ffaa00] font-bold">
                  00:{Math.floor(currentTime).toString().padStart(2, '0')}.{Math.floor((currentTime % 1) * 100).toString().padStart(2, '0')}
                </span>
                <span className="text-[11px] text-white/50 hidden sm:inline">
                  [0-5s: FIRE] · [5-12s: ARENA] · [12-20s: 4v4] · [20-26s: DROP] · [26-30s: 21:30]
                </span>
                <span>00:30.00</span>
              </div>

              {/* Progress Slider Track with Scene Boundary Pointers */}
              <div className="relative w-full h-3.5 bg-black/70 rounded-full overflow-hidden cursor-pointer group">
                {/* 5 Region segments */}
                <div
                  onClick={() => jumpToScene(0)}
                  className="absolute left-0 top-0 bottom-0 w-[16.66%] border-r border-[#ff3b00]/30 hover:bg-white/10 transition-colors"
                  title="0-5s: Ignition & TODAY IS FIRE"
                />
                <div
                  onClick={() => jumpToScene(1)}
                  className="absolute left-[16.66%] top-0 bottom-0 w-[23.33%] border-r border-[#ff3b00]/30 hover:bg-white/10 transition-colors"
                  title="5-12s: Ruined Arena Standoff"
                />
                <div
                  onClick={() => jumpToScene(2)}
                  className="absolute left-[40.0%] top-0 bottom-0 w-[26.66%] border-r border-[#ff3b00]/30 hover:bg-white/10 transition-colors"
                  title="12-20s: Fast Cuts & 4v4 Match"
                />
                <div
                  onClick={() => jumpToScene(3)}
                  className="absolute left-[66.66%] top-0 bottom-0 w-[20.0%] border-r border-[#ff3b00]/30 hover:bg-white/10 transition-colors"
                  title="20-26s: The Charge (Big Bass Drop!)"
                />
                <div
                  onClick={() => jumpToScene(4)}
                  className="absolute left-[86.66%] top-0 bottom-0 w-[13.34%] hover:bg-white/10 transition-colors"
                  title="26-30s: Countdown 21:30 GMT+1"
                />

                {/* Bass Drop Marker at 20s (66.66%) */}
                <div className="absolute left-[66.66%] top-0 bottom-0 w-[3px] bg-yellow-400 z-10 shadow-[0_0_10px_#eab308]" title="20s BASS DROP" />

                {/* Progress Fill */}
                <div
                  className="h-full bg-gradient-to-r from-[#ff1a00] via-[#ff6a00] to-[#ffaa00] relative"
                  style={{ width: `${(currentTime / 30) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#ff3b00] scale-100 group-hover:scale-125 transition-transform" />
                </div>

                {/* Range Slider for dragging */}
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.05"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>

            {/* Control Bar Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Playback Transport */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-gradient-to-r from-[#ff3b00] to-[#ff7700] text-black hover:from-[#ff5500] hover:to-[#ff9900] transition-all shadow-[0_0_20px_rgba(255,59,0,0.5)] active:scale-95"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black" />
                  ) : (
                    <Play className="w-5 h-5 fill-black translate-x-0.5" />
                  )}
                </button>

                <button
                  onClick={restartTrailer}
                  className="p-2.5 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-[#ff3b00]/60 transition-colors"
                  title="Restart 30s Trailer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Audio Mute Toggle */}
                <button
                  onClick={onToggleMute}
                  className={`p-2.5 rounded-full border transition-colors ${
                    isMuted
                      ? 'border-white/10 text-white/40 hover:text-white'
                      : 'border-[#ff3b00]/60 text-[#ffaa00] bg-[#ff3b00]/15'
                  }`}
                  title={isMuted ? 'Unmute Epic Bass & SFX' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Speed Selector */}
                <div className="flex items-center gap-1 border-r border-l border-white/10 px-3">
                  {[0.5, 1, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2 py-1 text-[11px] font-tech rounded transition-colors ${
                        playbackSpeed === speed
                          ? 'bg-[#ff3b00] text-black font-bold'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Jump Buttons for the 5 Phases */}
              <div className="hidden lg:flex items-center gap-2">
                {TRAILER_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    onClick={() => jumpToScene(idx)}
                    className={`px-3 py-1.5 text-xs font-tech rounded transition-all whitespace-nowrap ${
                      activeSceneIndex === idx
                        ? 'bg-[#ff3b00] text-black font-extrabold shadow-[0_0_15px_rgba(255,59,0,0.5)]'
                        : 'bg-black/50 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {scene.timeRange}: {scene.tagline.split('–')[0].trim()}
                  </button>
                ))}
              </div>

              {/* Right View Modes */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCinemaMode(!isCinemaMode)}
                  className="p-2.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-[#ff3b00]/50 transition-colors"
                  title={isCinemaMode ? 'Standard Width' : 'Wide Cinema Mode'}
                >
                  {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={onReminderClick}
                  className="px-4 py-2 rounded-lg bg-[#ff3b00]/20 hover:bg-[#ff3b00]/30 border border-[#ff3b00]/60 text-[#ffaa00] font-tech text-xs tracking-wider uppercase transition-all flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>21:30 GMT+1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
