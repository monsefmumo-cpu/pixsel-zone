import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Palette,
  Check,
  Maximize,
  Sliders,
  Award,
  Box,
  Feather,
} from 'lucide-react';

interface InteractiveBagStudioProps {
  onOpenInquiry: (preset?: string) => void;
}

export const InteractiveBagStudio: React.FC<InteractiveBagStudioProps> = ({
  onOpenInquiry,
}) => {
  // Customization state
  const [paperColor, setPaperColor] = useState<'olive' | 'emerald' | 'obsidian' | 'champagne'>('olive');
  const [handleStyle, setHandleStyle] = useState<'braidedBrown' | 'goldCord' | 'velvetRibbon' | 'forestSilk'>('braidedBrown');
  const [foilFinish, setFoilFinish] = useState<'gold' | 'roseGold' | 'blindDeboss' | 'silver'>('gold');
  const [brandName, setBrandName] = useState<string>('GRAVITY');
  const [subText, setSubText] = useState<string>('FINE JEWELRY');
  const [bagSize, setBagSize] = useState<'ring' | 'necklace' | 'parure'>('necklace');
  const [viewMode, setViewMode] = useState<'full' | 'macro'>('full');

  // Color mapping styles
  const paperColors = [
    {
      id: 'olive',
      name: 'الأخضر الزيتي الغامق',
      enName: 'Royal Olive Green (إعلان فخامة)',
      isSignature: true,
      bgClass: 'bg-[#213527]',
      colorHex: '#213527',
      textureStyle: {
        backgroundColor: '#1b2c20',
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, #2a4533 0%, #15241a 85%)',
      },
    },
    {
      id: 'emerald',
      name: 'الزمردي الإمبراطوري',
      enName: 'Imperial Emerald',
      isSignature: false,
      bgClass: 'bg-[#0f2e24]',
      colorHex: '#0f2e24',
      textureStyle: {
        backgroundColor: '#0c271e',
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, #174234 0%, #081a14 85%)',
      },
    },
    {
      id: 'obsidian',
      name: 'الأسود الليلي المطفي',
      enName: 'Matte Obsidian Black',
      isSignature: false,
      bgClass: 'bg-[#181a18]',
      colorHex: '#181a18',
      textureStyle: {
        backgroundColor: '#141414',
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, #232323 0%, #0d0d0d 85%)',
      },
    },
    {
      id: 'champagne',
      name: 'العاجي اللؤلؤي الحريري',
      enName: 'Silk Pearl Champagne',
      isSignature: false,
      bgClass: 'bg-[#e7e1d5]',
      colorHex: '#e7e1d5',
      textureStyle: {
        backgroundColor: '#ded7c9',
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, #eee8dc 0%, #cdc5b4 85%)',
      },
    },
  ];

  const handleStyles = [
    {
      id: 'braidedBrown',
      name: 'حبال مضفورة بنيّة حريرية',
      desc: 'الحبال الأصلية للإعلان ذات ملمس حريري ناعم',
      colorHex: '#523824',
      isSignature: true,
    },
    {
      id: 'goldCord',
      name: 'حبال ذهبية مبرومة 24K',
      desc: 'خيوط لوريكس ذهبية عاكسة للضوء',
      colorHex: '#c5a059',
      isSignature: false,
    },
    {
      id: 'velvetRibbon',
      name: 'شريط مخمل بني شوكولاتة',
      desc: 'عرض 25 مم مع حواف حياكة دقيقة',
      colorHex: '#3d2516',
      isSignature: false,
    },
    {
      id: 'forestSilk',
      name: 'حبال حريرية خضراء زيتية',
      desc: 'نغمة متناسقة تماماً مع لون الورق',
      colorHex: '#1f3829',
      isSignature: false,
    },
  ];

  const foilFinishes = [
    {
      id: 'gold',
      name: 'ذهب نافر عيار 24',
      textColor: 'text-[#f5dc93]',
      style: {
        color: '#f6e09e',
        textShadow: '0 1px 1px #fff, 0 -1px 1px #875c1a, 0 2px 4px rgba(0,0,0,0.5)',
      },
      isSignature: true,
    },
    {
      id: 'roseGold',
      name: 'فويل الذهب الوردي',
      textColor: 'text-[#e5a898]',
      style: {
        color: '#e5a898',
        textShadow: '0 1px 1px #fff, 0 -1px 1px #783525, 0 2px 4px rgba(0,0,0,0.5)',
      },
      isSignature: false,
    },
    {
      id: 'blindDeboss',
      name: 'حفر غائر بدون لون (Blind)',
      textColor: 'text-white/40',
      style: {
        color: 'rgba(255,255,255,0.25)',
        textShadow: '0 -1px 1px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.3)',
      },
      isSignature: false,
    },
    {
      id: 'silver',
      name: 'فضة إسترلينية براقة',
      textColor: 'text-[#e2e8f0]',
      style: {
        color: '#f1f5f9',
        textShadow: '0 1px 1px #fff, 0 -1px 1px #475569, 0 2px 4px rgba(0,0,0,0.5)',
      },
      isSignature: false,
    },
  ];

  const bagSizes = [
    {
      id: 'ring',
      name: 'صغيرة (خواتم وأقراط)',
      dimensions: '14 × 12 × 6 سم',
      capacity: 'صندوق خاتم سوليتير أو علبة أقراط ألماسية',
    },
    {
      id: 'necklace',
      name: 'متوسطة (أساور وقلائد)',
      dimensions: '22 × 18 × 8 سم',
      capacity: 'علبة قلادة أو سوار عريض أو ساعة سويسرية',
      isRecommended: true,
    },
    {
      id: 'parure',
      name: 'كبيرة (أطقم ملكية كاملة)',
      dimensions: '32 × 26 × 11 سم',
      capacity: 'طقم مجوهرات عروس كامل مع علبة مخملية ضخمة',
    },
  ];

  const currentPaper = paperColors.find((p) => p.id === paperColor) || paperColors[0];
  const currentHandle = handleStyles.find((h) => h.id === handleStyle) || handleStyles[0];
  const currentFoil = foilFinishes.find((f) => f.id === foilFinish) || foilFinishes[0];
  const currentSize = bagSizes.find((s) => s.id === bagSize) || bagSizes[1];

  return (
    <section id="studio" className="py-20 relative bg-[#07130f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10271d] border border-[#c5a059]/30 text-xs font-serif-luxury tracking-wider text-[#c5a059] mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE ATELIER & PACKAGING CUSTOMIZER</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#f4ede2] mb-3">
            استوديو تخصيص حقيبة المجوهرات
          </h2>

          <p className="text-[#ede8df]/75 font-arabic-luxury text-base sm:text-lg">
            قم بتجربة ألوان الورق الملكي، الحبال الحريرية، ونوع بصمة الذهب على شعار علامتك مباشرة كما في المشهد الثاني من الإعلان.
          </p>
        </div>

        {/* 2-Column Split: Interactive Bag Canvas (Left) + Customization Controls (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Bag Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#040a08] rounded-2xl border border-[#c5a059]/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('full')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'full'
                      ? 'bg-[#c5a059] text-[#07130f] font-semibold'
                      : 'bg-black/40 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  المجسم الكامل (Full Bag)
                </button>
                <button
                  onClick={() => setViewMode('macro')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    viewMode === 'macro'
                      ? 'bg-[#c5a059] text-[#07130f] font-semibold'
                      : 'bg-black/40 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  لقطة مقربة للشعار (Macro Close-Up)
                </button>
              </div>

              <span className="text-xs text-[#c5a059] font-mono">
                {currentSize.dimensions}
              </span>
            </div>

            {/* Simulated 3D Paper Bag Container */}
            <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-6 select-none">
              {/* Studio Backdrop Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-60"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${currentPaper.colorHex} 0%, #030806 80%)`,
                }}
              />

              {viewMode === 'full' ? (
                /* Full Bag View */
                <div className="relative z-10 w-full max-w-sm flex flex-col items-center animate-fade-in">
                  {/* Braided Silk Handles (Curved Cord Top) */}
                  <div className="relative w-48 h-20 -mb-4 z-20 flex justify-center">
                    {/* Simulated Rope Curve with braid texture */}
                    <svg viewBox="0 0 200 90" className="w-full h-full drop-shadow-md">
                      <path
                        d="M 35 90 C 40 10, 160 10, 165 90"
                        fill="none"
                        stroke={currentHandle.colorHex}
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray={handleStyle === 'braidedBrown' ? '3, 2' : 'none'}
                        className="transition-all duration-500"
                      />
                      {/* Secondary rope shadow for depth */}
                      <path
                        d="M 37 90 C 42 12, 158 12, 163 90"
                        fill="none"
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Brass eyelet grommets on bag fold */}
                      <circle cx="35" cy="85" r="5" fill="#c5a059" stroke="#7a5b28" strokeWidth="1.5" />
                      <circle cx="165" cy="85" r="5" fill="#c5a059" stroke="#7a5b28" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Main Bag Body */}
                  <div
                    className="w-full rounded-t-sm rounded-b-md shadow-2xl relative transition-all duration-700 border-t border-white/10"
                    style={{
                      ...currentPaper.textureStyle,
                      height: bagSize === 'ring' ? '280px' : bagSize === 'necklace' ? '330px' : '370px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Paper Fold Creases and Side Gusset Highlight */}
                    <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-white/5 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-4 w-[1px] bg-black/30 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-6 bg-black/15 border-b border-black/20" />

                    {/* Centered Embossed Brand Wordmark */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center px-4">
                      <h3
                        className="font-brand font-bold text-2xl sm:text-3xl tracking-[0.25em] transition-all uppercase"
                        style={currentFoil.style}
                      >
                        {brandName || 'GRAVITY'}
                      </h3>
                      {subText && (
                        <p
                          className="font-serif-luxury text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-1 opacity-80"
                          style={{ color: currentFoil.style.color }}
                        >
                          {subText}
                        </p>
                      )}
                    </div>

                    {/* Subtle Bottom Fold Flap */}
                    <div className="absolute bottom-0 inset-x-0 h-4 bg-black/30 border-t border-black/40 rounded-b-md" />
                  </div>

                  {/* Ground Shadow on Travertine */}
                  <div className="w-5/6 h-5 bg-black/70 blur-md rounded-full mt-2" />
                </div>
              ) : (
                /* Macro Logo Close-up (Matching Scene 2) */
                <div
                  className="relative z-10 w-full max-w-md p-8 rounded-xl border border-white/10 shadow-2xl animate-fade-in"
                  style={currentPaper.textureStyle}
                >
                  {/* Rope in foreground showing curve */}
                  <div className="absolute -top-6 -right-4 w-32 h-16 pointer-events-none">
                    <svg viewBox="0 0 120 60" className="w-full h-full drop-shadow-lg">
                      <path
                        d="M 10 50 C 40 10, 100 10, 115 50"
                        fill="none"
                        stroke={currentHandle.colorHex}
                        strokeWidth="14"
                        strokeDasharray="4, 2"
                      />
                    </svg>
                  </div>

                  <div className="text-right mb-6 text-[10px] uppercase tracking-widest text-[#c5a059] font-mono">
                    MACRO 100MM · TACTILE GRAIN
                  </div>

                  <div className="my-8 text-center">
                    <h3
                      className="font-brand font-bold text-4xl sm:text-5xl tracking-[0.3em] uppercase mb-2"
                      style={currentFoil.style}
                    >
                      {brandName || 'GRAVITY'}
                    </h3>
                    <p
                      className="font-serif-luxury text-xs sm:text-sm tracking-[0.35em] uppercase opacity-90"
                      style={{ color: currentFoil.style.color }}
                    >
                      {subText}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#ede8df]/70">
                    <span>مستوى البروز: 0.4 مم عالي النعومة</span>
                    <span className="font-mono text-[#c5a059]">{currentFoil.name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Spec Badge */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#ede8df]/70 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                <span>الورق: {currentPaper.name}</span>
                <span>·</span>
                <span>المقبض: {currentHandle.name.split(' ')[0]} {currentHandle.name.split(' ')[1]}</span>
              </div>
              <span className="text-[#f7dfa5] font-serif-luxury">
                تطابق 100% مع مواصفات الإعلان التلفزيوني
              </span>
            </div>
          </div>

          {/* Configuration Controls (Right Column) */}
          <div className="lg:col-span-5 bg-[#081811] rounded-2xl border border-[#c5a059]/25 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-serif-luxury font-bold text-[#f4ede2] mb-1">
                تخصيص المواصفات والعلامة
              </h3>
              <p className="text-xs text-[#ede8df]/70 font-arabic-luxury mb-6">
                صمّم حقيبة مجوهراتك لتطابق هوية دارك الفاخرة.
              </p>

              {/* 1. Custom Brand Name Input */}
              <div className="space-y-3 mb-6">
                <label className="block text-xs font-semibold text-[#f7dfa5] tracking-wider uppercase font-serif-luxury">
                  اسم دار المجوهرات (Brand Name on Bag)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value.toUpperCase())}
                    placeholder="GRAVITY"
                    maxLength={18}
                    className="px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#c5a059]/40 text-[#f4ede2] font-brand tracking-widest text-sm focus:outline-none focus:border-[#c5a059]"
                  />
                  <input
                    type="text"
                    value={subText}
                    onChange={(e) => setSubText(e.target.value.toUpperCase())}
                    placeholder="FINE JEWELRY"
                    maxLength={22}
                    className="px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#c5a059]/30 text-[#f4ede2] font-serif-luxury tracking-wider text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* 2. Paper Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-[#f7dfa5] font-serif-luxury">
                    لون الورق الفاخر (Paper Shade)
                  </label>
                  {currentPaper.isSignature && (
                    <span className="text-[10px] text-[#c5a059] font-serif-luxury">لون بطل الإعلان الرسمي</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {paperColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setPaperColor(color.id as typeof paperColor)}
                      className={`p-2.5 rounded-lg border text-right transition-all flex items-center gap-2.5 ${
                        paperColor === color.id
                          ? 'bg-[#122a1f] border-[#c5a059] shadow-sm'
                          : 'bg-black/20 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-white/20"
                        style={{ backgroundColor: color.colorHex }}
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-medium text-[#ede8df] truncate">{color.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Handle / Rope Selection */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#f7dfa5] mb-2 font-serif-luxury">
                  نوع الحبال والمقابض (Handles & Ropes)
                </label>
                <div className="space-y-2">
                  {handleStyles.map((handle) => (
                    <button
                      key={handle.id}
                      onClick={() => setHandleStyle(handle.id as typeof handleStyle)}
                      className={`w-full p-2.5 rounded-lg border text-right transition-all flex items-center justify-between ${
                        handleStyle === handle.id
                          ? 'bg-[#122a1f] border-[#c5a059]'
                          : 'bg-black/20 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/20"
                          style={{ backgroundColor: handle.colorHex }}
                        />
                        <span className="text-xs font-medium text-[#ede8df]">{handle.name}</span>
                      </div>
                      {handle.isSignature && (
                        <span className="text-[10px] text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded font-mono">
                          HERO CORD
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Foil Finish Selection */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#f7dfa5] mb-2 font-serif-luxury">
                  نوع البصمة والفويل (Foil & Deboss Finish)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {foilFinishes.map((foil) => (
                    <button
                      key={foil.id}
                      onClick={() => setFoilFinish(foil.id as typeof foilFinish)}
                      className={`p-2.5 rounded-lg border text-right transition-all ${
                        foilFinish === foil.id
                          ? 'bg-[#122a1f] border-[#c5a059]'
                          : 'bg-black/20 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`text-xs font-medium ${foil.textColor}`}>
                        {foil.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Bag Size Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#f7dfa5] mb-2 font-serif-luxury">
                  المقاس الموصى به (Size & Proportion)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {bagSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setBagSize(size.id as typeof bagSize)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        bagSize === size.id
                          ? 'bg-[#122a1f] border-[#c5a059] text-[#f7dfa5]'
                          : 'bg-black/20 border-white/10 text-[#ede8df]/70 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-semibold">{size.name.split(' ')[0]}</div>
                      <div className="text-[10px] font-mono opacity-80 mt-0.5">{size.dimensions.split(' ')[0]}cm</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Trigger */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => onOpenInquiry(`حقيبة مخصصة لدار ${brandName || 'GRAVITY'} (${currentPaper.name} مع ${currentHandle.name})`)}
                className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#b38e47] hover:from-[#f0d696] hover:to-[#c5a059] text-[#07130f] font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(197,160,89,0.25)] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#07130f]" />
                <span>طلب عينة مجسمة بالهوية المحددة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
