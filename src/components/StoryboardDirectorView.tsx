import React, { useState } from 'react';
import {
  Film,
  Camera,
  Music,
  Mic,
  Eye,
  Sparkles,
  Play,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { COMMERCIAL_SCENES, CommercialScene } from '../data/commercialData';
import { luxuryAudio, speakArabicVoiceover } from '../utils/luxuryAudio';

interface StoryboardDirectorViewProps {
  onSelectScene: (sceneIndex: number) => void;
}

export const StoryboardDirectorView: React.FC<StoryboardDirectorViewProps> = ({
  onSelectScene,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [playingVoiceoverId, setPlayingVoiceoverId] = useState<number | null>(null);

  const handlePlayVoiceover = (scene: CommercialScene) => {
    setPlayingVoiceoverId(scene.id);
    speakArabicVoiceover(
      scene.voiceoverArabic,
      () => setPlayingVoiceoverId(scene.id),
      () => setPlayingVoiceoverId(null)
    );
  };

  const handlePlayMusic = (sceneId: number) => {
    luxuryAudio.playSceneMotif(sceneId);
  };

  return (
    <section id="storyboard" className="py-20 relative bg-[#06140e] border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10271d] border border-[#c5a059]/30 text-xs font-serif-luxury tracking-wider text-[#c5a059] mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>CINEMATIC STORYBOARD & DIRECTOR'S TREATMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#f4ede2] mb-3">
            لوحة المشاهد والسيناريو الإخراجي
          </h2>

          <p className="text-[#ede8df]/75 font-arabic-luxury text-base sm:text-lg">
            تفصيل دقيق للمشاهد الثلاثة للإعلان التلفزيوني: حركة الكاميرا، هندسة الإضاءة، الموسيقى، والتعليق الصوتي.
          </p>
        </div>

        {/* Scene Selection Tabs (Clean segmented control) */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-[#0b1d15] border border-[#c5a059]/25 max-w-full overflow-x-auto">
            {COMMERCIAL_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#dfba73] text-[#07130f] font-semibold shadow-[0_2px_12px_rgba(197,160,89,0.3)]'
                    : 'text-[#ede8df]/70 hover:text-[#ede8df] hover:bg-white/5'
                }`}
              >
                <span>مشهد {scene.id}</span>
                <span className="text-[11px] opacity-75 font-mono">({scene.timeRange})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Scene Detailed Card */}
        {(() => {
          const scene = COMMERCIAL_SCENES[activeTab];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#091a12] rounded-2xl border border-[#c5a059]/25 p-6 sm:p-8 shadow-2xl">
              {/* Left Column: Visual Still + Director Play Action */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#c5a059]/30 group shadow-lg">
                  <img
                    src={scene.imageSrc}
                    alt={scene.titleArabic}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Scene Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#07130f]/80 backdrop-blur-md border border-[#c5a059]/40 text-xs font-serif-luxury text-[#f7dfa5]">
                    مشهد {scene.id} · {scene.timeRange}
                  </div>

                  {/* Camera Angle Tag */}
                  <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-xs text-[#ede8df]">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1 rounded border border-white/10 font-mono text-[11px]">
                      <Camera className="w-3.5 h-3.5 text-[#c5a059]" />
                      {scene.cameraTechnique}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      onSelectScene(activeTab);
                      const el = document.getElementById('commercial');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 px-4 rounded-lg bg-[#c5a059] hover:bg-[#dfba73] text-[#07130f] font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_2px_15px_rgba(197,160,89,0.25)] flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-[#07130f]" />
                    <span>تشغيل هذا المشهد في المشغل</span>
                  </button>

                  <button
                    onClick={() => handlePlayVoiceover(scene)}
                    className="py-3 px-4 rounded-lg bg-[#11261d] hover:bg-[#163327] text-[#f7dfa5] border border-[#c5a059]/30 text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap"
                    title="الاستماع للتعليق الصوتي العربي الخاص بهذا المشهد"
                  >
                    <Mic className={`w-4 h-4 ${playingVoiceoverId === scene.id ? 'animate-pulse text-amber-300' : ''}`} />
                    <span>التعليق الصوتي</span>
                  </button>

                  <button
                    onClick={() => handlePlayMusic(scene.id)}
                    className="py-3 px-4 rounded-lg bg-[#11261d] hover:bg-[#163327] text-[#ede8df] border border-white/10 text-xs font-medium transition-all flex items-center gap-2 whitespace-nowrap"
                    title="الاستماع للموسيقى التصويرية للمشهد"
                  >
                    <Music className="w-4 h-4 text-[#c5a059]" />
                    <span>الموسيقى</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Detailed Script & Cinematic Specs */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6 pt-4 lg:pt-0">
                {/* Title & Timing */}
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#c5a059] font-mono mb-1">
                    <span>TIMECODE: {scene.timeRange}</span>
                    <span>·</span>
                    <span>DURATION: {scene.duration}s</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#f4ede2] mb-1">
                    {scene.titleArabic}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-[#ede8df]/60 font-serif-luxury">
                    {scene.titleEnglish}
                  </span>
                </div>

                {/* 1. Visual Script (المشهد) */}
                <div className="p-4 rounded-xl bg-[#0e2118] border border-[#c5a059]/20">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#f7dfa5] mb-2 font-serif-luxury">
                    <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>المشهد البصري (Visual Description)</span>
                  </div>
                  <p className="text-sm text-[#ede8df]/90 font-arabic-luxury leading-relaxed">
                    {scene.visualArabic}
                  </p>
                </div>

                {/* 2. Voiceover (التعليق الصوتي) */}
                <div className="p-4 rounded-xl bg-[#12281e] border border-[#c5a059]/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#f7dfa5] mb-2 font-serif-luxury">
                    <Mic className="w-3.5 h-3.5 text-[#dfba73]" />
                    <span>التعليق الصوتي (Voiceover Script)</span>
                  </div>
                  <blockquote className="text-base sm:text-lg text-[#f7dfa5] font-serif-luxury font-medium leading-relaxed italic mb-1.5">
                    "{scene.voiceoverArabic}"
                  </blockquote>
                  <p className="text-xs text-[#ede8df]/65 font-sans">
                    {scene.voiceoverEnglish}
                  </p>
                </div>

                {/* 3. Audio & Foley (الصوت / الموسيقى) */}
                <div className="p-4 rounded-xl bg-[#0e2118] border border-[#c5a059]/20">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#f7dfa5] mb-2 font-serif-luxury">
                    <Music className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>الصوت والموسيقى (Audio & Soundscape)</span>
                  </div>
                  <p className="text-sm text-[#ede8df]/90 font-arabic-luxury leading-relaxed mb-2">
                    {scene.audioArabic}
                  </p>
                  <div className="text-[11px] font-mono text-[#c5a059]/80 bg-black/30 p-2 rounded">
                    FOLEY CUE: {scene.foleySound}
                  </div>
                </div>

                {/* 4. Lighting & Cinematography */}
                <div className="text-xs text-[#ede8df]/70 font-mono space-y-1 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-[#c5a059]">LIGHTING:</span> {scene.lightingNotes}
                  </div>
                  <div>
                    <span className="text-[#c5a059]">CAMERA:</span> {scene.cameraTechnique}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 3-Shot Thumbnail Overview Strip */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMERCIAL_SCENES.map((scene, idx) => (
            <div
              key={scene.id}
              onClick={() => setActiveTab(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#10271e] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                  : 'bg-[#091b13] border-white/10 hover:border-[#c5a059]/40'
              }`}
            >
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3">
                <img
                  src={scene.imageSrc}
                  alt={scene.titleArabic}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 font-mono text-[10px] text-[#f7dfa5]">
                  {scene.timeRange}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-[#f4ede2] font-serif-luxury mb-1">
                مشهد {scene.id}: {scene.titleArabic}
              </h4>
              <p className="text-xs text-[#ede8df]/70 line-clamp-2 font-arabic-luxury">
                {scene.voiceoverArabic}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
