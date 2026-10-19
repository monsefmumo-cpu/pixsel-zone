import React, { useState } from 'react';
import {
  Film,
  Zap,
  Flame,
  Volume2,
  Clock,
  Play,
  Camera,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TRAILER_SCENES, TrailerScene } from '../data/trailerData';
import { esportsAudio } from '../utils/esportsAudio';

interface EsportsStoryboardProps {
  onJumpToTime: (time: number) => void;
}

export const EsportsStoryboard: React.FC<EsportsStoryboardProps> = ({ onJumpToTime }) => {
  const [activeSceneTab, setActiveSceneTab] = useState<number>(0);

  const handleTestAudio = (sceneId: number) => {
    if (sceneId === 1) {
      esportsAudio.playSparkIgnition();
      setTimeout(() => esportsAudio.playTitleSlamExplosion(), 600);
    } else if (sceneId === 2) {
      esportsAudio.startArenaAtmosphere();
      esportsAudio.playHeartbeat();
    } else if (sceneId === 3) {
      esportsAudio.playFastCutWhoosh();
      setTimeout(() => esportsAudio.playLightningThunder(), 400);
      setTimeout(() => esportsAudio.playTensionRiser(), 800);
    } else if (sceneId === 4) {
      esportsAudio.playBigBassDrop();
    } else if (sceneId === 5) {
      esportsAudio.playCountdownTick(true);
    }
  };

  const selectedScene: TrailerScene = TRAILER_SCENES[activeSceneTab];

  return (
    <section id="storyboard" className="py-16 bg-[#040406] border-t border-[#ff3b00]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120906] border border-[#ff3b00]/30 text-xs font-tech text-[#ff6a00] mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>DIRECTOR'S 30-SECOND TRAILER BREAKDOWN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-stamp font-black text-white tracking-wider uppercase mb-2">
            FRAME-BY-FRAME CINEMATIC STORYBOARD
          </h2>
          <p className="text-[#a3a3b2] font-sans text-sm sm:text-base">
            Detailed scene anatomy of the dark moody high-contrast Free Fire 2026 trailer.
          </p>
        </div>

        {/* 5-Scene Segmented Tabs */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-xl bg-black border border-[#ff3b00]/25 max-w-full">
            {TRAILER_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => setActiveSceneTab(idx)}
                className={`px-4 py-2.5 rounded-lg text-xs font-tech font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeSceneTab === idx
                    ? 'bg-gradient-to-r from-[#ff3b00] to-[#ff7700] text-black shadow-[0_0_15px_rgba(255,59,0,0.5)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>SCENE {scene.id}</span>
                <span className="opacity-75 font-mono text-[11px]">({scene.timeRange})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Scene Inspection Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#080507] rounded-2xl border border-[#ff3b00]/30 p-6 sm:p-8 shadow-2xl">
          {/* Left Column: Visual Shot Still */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#ff3b00]/30 group shadow-lg">
              <img
                src={selectedScene.imageSrc}
                alt={selectedScene.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60" />

              {/* Timecode Tag */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 backdrop-blur border border-[#ff3b00]/50 text-xs font-tech text-[#ffaa00]">
                TIMECODE: {selectedScene.timeRange}
              </div>

              {/* Tagline */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-stamp text-2xl text-white tracking-wider uppercase drop-shadow">
                  {selectedScene.tagline}
                </span>
                <span className="font-tech text-[10px] text-[#ff6a00] bg-black/70 px-2 py-0.5 rounded border border-white/10">
                  {selectedScene.cinematography.split('·')[0]}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  onJumpToTime(selectedScene.startSec);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#ff3b00] to-[#ff7700] hover:from-[#ff5500] hover:to-[#ff9900] text-black font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,59,0,0.4)] flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Play This Scene in Player</span>
              </button>

              <button
                onClick={() => handleTestAudio(selectedScene.id)}
                className="py-3 px-4 rounded-lg bg-black/60 hover:bg-[#ff3b00]/20 text-[#ffaa00] border border-[#ff3b00]/40 text-xs font-tech font-bold transition-all flex items-center gap-2 whitespace-nowrap"
                title="Audition specific sound cues for this scene"
              >
                <Volume2 className="w-4 h-4" />
                <span>Audition Audio</span>
              </button>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 pt-4 lg:pt-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-tech text-[#ff6a00] mb-1">
                <span>SCENE 0{selectedScene.id} OF 05</span>
                <span>·</span>
                <span>DURATION: {selectedScene.endSec - selectedScene.startSec} SECONDS</span>
              </div>
              <h3 className="text-3xl font-stamp font-black text-white tracking-wider uppercase mb-1">
                {selectedScene.title}
              </h3>
              <p className="text-xs font-tech text-[#ffaa00] tracking-widest uppercase">
                {selectedScene.tagline}
              </p>
            </div>

            {/* 1. Visual Script */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-tech text-[#ff6a00] mb-2 uppercase font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>Visual Action & Environment</span>
              </div>
              <p className="text-sm text-[#f1f1f5] leading-relaxed">
                {selectedScene.visualDescription}
              </p>
            </div>

            {/* 2. Audio & Bass Drop Cue */}
            <div className="p-4 rounded-xl bg-[#120603] border border-[#ff3b00]/30">
              <div className="flex items-center gap-2 text-xs font-tech text-[#ffaa00] mb-2 uppercase font-bold">
                <Volume2 className="w-3.5 h-3.5 text-[#ff3b00]" />
                <span>Sound Design & Bass Drop</span>
              </div>
              <p className="text-sm text-[#f1f1f5] leading-relaxed mb-2">
                {selectedScene.audioCues}
              </p>
              {selectedScene.id === 4 && (
                <div className="p-2 rounded bg-[#ff3b00]/20 border border-[#ff3b00] text-xs font-tech text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>PEAK MOMENT: 808 Sub-Bass Impact with 35Hz rumble and high distortion!</span>
                </div>
              )}
            </div>

            {/* 3. Camera & Post-FX */}
            <div className="pt-2 border-t border-white/10 text-xs font-tech space-y-1 text-white/70">
              <div>
                <span className="text-[#ff6a00]">CAMERA RIG:</span> {selectedScene.cinematography}
              </div>
              <div>
                <span className="text-[#ff6a00]">COLOR GRADING:</span> High Contrast Moody Dark, Crushed Blacks, Saturated Fire Oranges (#ff3b00)
              </div>
            </div>
          </div>
        </div>

        {/* 5-Shot Grid Overview */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {TRAILER_SCENES.map((scene, idx) => (
            <div
              key={scene.id}
              onClick={() => setActiveSceneTab(idx)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                activeSceneTab === idx
                  ? 'bg-[#150a06] border-[#ff3b00] shadow-[0_0_15px_rgba(255,59,0,0.3)]'
                  : 'bg-black/50 border-white/10 hover:border-[#ff3b00]/40'
              }`}
            >
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-2">
                <img
                  src={scene.imageSrc}
                  alt={scene.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 font-tech text-[10px] text-[#ffaa00]">
                  {scene.timeRange}
                </span>
              </div>
              <h4 className="text-xs font-tech font-bold text-white uppercase truncate">
                {scene.tagline}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
