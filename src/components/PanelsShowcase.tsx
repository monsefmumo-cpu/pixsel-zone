import React, { useState } from 'react';
import { DISCORD_INVITE_URL } from '../data/pixselZoneData';
import {
  Monitor,
  Smartphone,
  Apple,
  Zap,
  Download,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
} from 'lucide-react';

export const PanelsShowcase: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'pc' | 'ios' | 'android'>('pc');
  const [selectedDevice, setSelectedDevice] = useState<string>('bluestacks5');

  const platforms = [
    {
      id: 'pc',
      name: 'PANEL-PC',
      title: 'بانل الكمبيوتر والمحاكيات',
      icon: Monitor,
      desc: 'مخصص لمحاكيات BlueStacks 5 و MSI App Player و SmartGaGa مع Bypass مضاد للحظر.',
      tag: 'إصدار V4.8 Pro',
      stats: { fps: '240 FPS Unlocked', response: '0.1ms Delay', status: 'Bypass Active' },
    },
    {
      id: 'ios',
      name: 'PANEL-IOS',
      title: 'بانل الآيفون والآيباد (iOS)',
      icon: Apple,
      desc: 'بدون جلبريك عبر ملفات DNS وتكوين السرعة مع توافق كامل مع جميع إصدارات iOS.',
      tag: 'No Jailbreak',
      stats: { fps: '120 FPS Extreme', response: 'Touch Speed x3', status: 'Safe & Verified' },
    },
    {
      id: 'android',
      name: 'PANEL-ANDROID',
      title: 'بانل الأندرويد والريجدت (APK)',
      icon: Smartphone,
      desc: 'تطبيق APK عائم يدعم جميع معالجات Snapdragon و MediaTek بحساسية هيد شوت مخصصة.',
      tag: 'APK خفيف وسريع',
      stats: { fps: '90/120 FPS Boost', response: 'Auto Aim Fix', status: 'Anti-Detect V2' },
    },
  ];

  const devicePresets: Record<string, { sens: number; x: number; y: number; dpi: number; recWeapon: string }> = {
    bluestacks5: { sens: 98, x: 1.45, y: 2.35, dpi: 440, recWeapon: 'MP40 / Desert Eagle' },
    msi: { sens: 95, x: 1.38, y: 2.25, dpi: 320, recWeapon: 'Woodpecker / AWM' },
    iphone14: { sens: 100, x: 2.1, y: 2.8, dpi: 460, recWeapon: 'M1014 / Groza' },
    samsung_s23: { sens: 97, x: 1.85, y: 2.65, dpi: 480, recWeapon: 'AK47 / Shotgun' },
  };

  const currentPreset = devicePresets[selectedDevice] || devicePresets['bluestacks5'];

  return (
    <section id="panels" className="py-20 bg-[#030816] border-t border-[#00f2fe]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081528] border border-[#00f2fe]/30 text-xs font-tech text-[#00f2fe] mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>PANEL ZONE · أقوى بانلات الألعاب المعدلة</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-brand font-black text-white tracking-wide mb-3">
            بانلات احترافية لجميع الأجهزة
          </h2>
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            اختر منصتك المفضلة (PC / iOS / Android) لتحميل البانل المخصص وضبط حساسية الهيد شوت من قنوات الديسكورد الرسمية.
          </p>
        </div>

        {/* 3 Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {platforms.map((p) => {
            const Icon = p.icon;
            const isSelected = activePlatform === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setActivePlatform(p.id as typeof activePlatform)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#091a38] border-[#00f2fe] shadow-[0_0_30px_rgba(0,242,254,0.3)]'
                    : 'bg-[#061022] border-white/10 hover:border-[#00f2fe]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        isSelected
                          ? 'bg-[#00f2fe] text-black shadow-[0_0_15px_#00f2fe]'
                          : 'bg-[#0a1b36] text-[#00f2fe] border border-[#00f2fe]/30'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-tech font-bold px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[#00f2fe]">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-brand font-black text-white mb-1">
                    {p.name}
                  </h3>
                  <span className="text-xs text-[#00f2fe] font-sans block mb-2">{p.title}</span>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-tech">
                  <div className="flex justify-between text-gray-300">
                    <span>معدل الإطارات:</span>
                    <span className="text-emerald-400 font-bold">{p.stats.fps}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>زمن الاستجابة:</span>
                    <span className="text-[#00f2fe] font-bold">{p.stats.response}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>الحماية:</span>
                    <span className="text-white font-bold">{p.stats.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Device Preset & Sensitivity Configurator */}
        <div className="rounded-2xl bg-[#071329] border border-[#00f2fe]/30 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-tech text-[#00f2fe] mb-1">
                <Sliders className="w-4 h-4" />
                <span>CALIBRATION & SENSITIVITY CALCULATOR</span>
              </div>
              <h3 className="text-2xl font-brand font-black text-white">
                حاسبة الحساسية وإعدادات البانل الموصى بها
              </h3>
            </div>

            {/* Device Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-sans hidden sm:inline">الجهاز / المحاكي:</span>
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="px-4 py-2 rounded-xl bg-[#040914] border border-[#00f2fe]/40 text-xs font-tech text-white focus:outline-none focus:border-[#00f2fe]"
              >
                <option value="bluestacks5">BlueStacks 5 (PC Emulator)</option>
                <option value="msi">MSI App Player (PC)</option>
                <option value="iphone14">iPhone 14 / 15 Pro (iOS)</option>
                <option value="samsung_s23">Samsung Galaxy S23 / Ultra (Android)</option>
              </select>
            </div>
          </div>

          {/* Calibrated Values */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-sans block mb-1">الحساسية العامة (General)</span>
              <span className="text-2xl sm:text-3xl font-brand font-black text-[#00f2fe]">{currentPreset.sens}%</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-sans block mb-1">محور X (الأفقي)</span>
              <span className="text-2xl sm:text-3xl font-brand font-black text-white">{currentPreset.x}</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-sans block mb-1">محور Y (الرأسي / هيد شوت)</span>
              <span className="text-2xl sm:text-3xl font-brand font-black text-[#00f2fe]">{currentPreset.y}</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center">
              <span className="text-xs text-gray-400 font-sans block mb-1">دقة الشاشة (DPI)</span>
              <span className="text-2xl sm:text-3xl font-brand font-black text-emerald-400">{currentPreset.dpi}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-gray-300 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مفاتيح التفعيل وكود التنزيل متاح مجاناً داخل قنوات PANEL في الديسكورد</span>
            </div>

            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#00f2fe] hover:bg-[#38bdf8] text-[#030712] font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تحميل البانل من الديسكورد</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
