import React, { useState } from 'react';
import {
  PIXSEL_CATEGORIES,
  CategoryGroup,
  ChannelItem,
  DISCORD_INVITE_URL,
  PIXSEL_SERVER_LOGO,
} from '../data/pixselZoneData';
import { sound } from '../utils/sound';
import {
  Hash,
  Volume2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export const DiscordExplorer: React.FC = () => {
  // Default to Token-video or Panel-PC
  const [selectedChannelId, setSelectedChannelId] = useState<string>('token-video');
  const [mobileView, setMobileView] = useState<'channels' | 'details'>('channels');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'auto-quest': true,
    'panels': true,
    'apostado-team': true,
    'banned': true,
  });
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleCategory = (catId: string) => {
    sound.playClick();
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Find active channel
  let activeChannel: ChannelItem = PIXSEL_CATEGORIES[0].channels[0];
  let activeCategory: CategoryGroup = PIXSEL_CATEGORIES[0];

  for (const cat of PIXSEL_CATEGORIES) {
    const found = cat.channels.find((c) => c.id === selectedChannelId);
    if (found) {
      activeChannel = found;
      activeCategory = cat;
      break;
    }
  }

  const handleCopyLink = () => {
    sound.playReward();
    navigator.clipboard.writeText(DISCORD_INVITE_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSelectChannel = (channelId: string) => {
    sound.playClick();
    setSelectedChannelId(channelId);
    // On mobile, automatically show details when tapped
    setMobileView('details');
  };

  return (
    <section id="discord-explorer" className="py-14 sm:py-20 bg-[#02050e] border-t border-[#00f2fe]/20 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081528] border border-[#00f2fe]/30 text-xs font-tech text-[#00f2fe] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCORD SERVER ARCHITECTURE · خريطة قنوات السيرفر</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-brand font-black text-white tracking-wide mb-2 sm:mb-3">
            استكشف قنوات ورومات PIXSEL ZONE
          </h2>
          <p className="text-gray-300 font-sans text-xs sm:text-base">
            كل الرومات الموضحة في صور الديسكورد متوفرة هنا: أوتو كويست، بانلات الأجهزة، وسكريمات وتحديات فريق Apostado.
          </p>

          {/* Mobile View Switcher (Only visible on Phones) */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-5 p-1 rounded-xl bg-[#09152b] border border-[#00f2fe]/30 max-w-xs mx-auto">
            <button
              onClick={() => {
                sound.playClick();
                setMobileView('channels');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-tech font-bold transition-all ${
                mobileView === 'channels'
                  ? 'bg-[#00f2fe] text-black shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              قنوات السيرفر
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMobileView('details');
              }}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-tech font-bold transition-all ${
                mobileView === 'details'
                  ? 'bg-[#00f2fe] text-black shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              تفاصيل الروم ({activeChannel.icon})
            </button>
          </div>
        </div>

        {/* Discord Mock UI Container */}
        <div className="rounded-2xl border border-[#00f2fe]/35 bg-[#070e1c] shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
          {/* Left Column: Discord Sidebar */}
          <div
            className={`md:col-span-4 bg-[#0a1324] border-l border-[#00f2fe]/20 p-3 sm:p-4 flex flex-col justify-between ${
              mobileView === 'details' ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div>
              {/* Discord Server Header */}
              <div className="p-3 mb-3 sm:mb-4 rounded-xl bg-[#040914] border border-[#00f2fe]/25 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full p-[1px] bg-[#00f2fe] overflow-hidden shrink-0">
                    <img
                      src={PIXSEL_SERVER_LOGO}
                      alt="PIXSEL SERVER"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="overflow-hidden text-right">
                    <span className="font-brand font-black text-white text-sm block truncate">
                      PIXSEL ZONE
                    </span>
                    <span className="text-[10px] font-tech text-emerald-400 block truncate">
                      ● سيرفر ديسكورد الرسمي
                    </span>
                  </div>
                </div>
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playReward()}
                  className="p-1.5 rounded-lg bg-[#00f2fe]/10 text-[#00f2fe] hover:bg-[#00f2fe]/20 transition-colors"
                  title="فتح في تطبيق ديسكورد"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Channels Accordion List */}
              <div className="space-y-3 sm:space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {PIXSEL_CATEGORIES.map((category) => {
                  const isExpanded = expandedCategories[category.id] ?? true;
                  return (
                    <div key={category.id} className="space-y-1">
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-tech font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {isExpanded ? (
                            <ChevronDown className="w-3 h-3 text-[#00f2fe]" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-gray-500" />
                          )}
                          <span className="truncate">{category.title}</span>
                        </div>
                      </button>

                      {/* Channels inside this Category */}
                      {isExpanded && (
                        <div className="space-y-1 pr-1 sm:pr-2">
                          {category.channels.map((channel) => {
                            const isSelected = selectedChannelId === channel.id;
                            return (
                              <button
                                key={channel.id}
                                onClick={() => handleSelectChannel(channel.id)}
                                className={`w-full flex items-center justify-between px-2.5 sm:px-3 py-2 rounded-lg text-xs font-tech transition-all text-right active:scale-98 ${
                                  isSelected
                                    ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-bold border border-[#00f2fe]/50 shadow-sm'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  {channel.type === 'voice' ? (
                                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  ) : (
                                    <Hash className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  )}
                                  <span className="truncate">{channel.name}</span>
                                </div>

                                {channel.badge && (
                                  <span
                                    className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 font-sans ${
                                      isSelected
                                        ? 'bg-[#00f2fe] text-black font-bold'
                                        : 'bg-white/10 text-gray-400'
                                    }`}
                                  >
                                    {channel.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Discord Fast Join Box */}
            <div className="pt-3 sm:pt-4 border-t border-white/10 mt-3 sm:mt-4">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playReward()}
                className="w-full py-2.5 px-3 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-[#030712] font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
              >
                <span>انضم للسيرفر الآن</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Detailed Channel View */}
          <div
            className={`md:col-span-8 p-4 sm:p-8 flex-col justify-between bg-[#040914]/90 space-y-6 ${
              mobileView === 'channels' ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div>
              {/* Channel Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#081528] border border-[#00f2fe]/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                    {activeChannel.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-brand font-black text-white flex items-center gap-2">
                      <span>{activeChannel.name}</span>
                    </h3>
                    <span className="text-xs text-[#00f2fe] font-tech">
                      {activeCategory.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-tech text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'تم نسخ الرابط' : 'نسخ رابط الديسكورد'}</span>
                  </button>
                </div>
              </div>

              {/* Main Content Card */}
              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="text-lg font-bold text-white font-sans mb-1">
                    {activeChannel.titleArabic}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {activeChannel.descriptionArabic}
                  </p>
                </div>

                {/* Features List */}
                <div className="p-4 rounded-xl bg-[#09152b] border border-[#00f2fe]/25 space-y-3">
                  <span className="text-xs font-tech font-bold text-[#00f2fe] block uppercase">
                    مميزات القناة والخدمات المتاحة للأعضاء:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeChannel.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Bar */}
                <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-xs text-gray-300 font-tech">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>الحالة الحالية:</span>
                  </span>
                  <span className="text-white/80">{activeChannel.statusText}</span>
                </div>
              </div>
            </div>

            {/* Bottom Call to Action for this Channel */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-400 font-sans">
                لتحميل الملفات والمشاركة في الروم، انضم مجاناً إلى سيرفر PIXSEL SERVER:
              </div>

              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playReward()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#0284c7] hover:from-[#38bdf8] hover:to-[#00f2fe] text-[#030712] font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
              >
                <span>فتح قناة #{activeChannel.name} في الديسكورد</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
