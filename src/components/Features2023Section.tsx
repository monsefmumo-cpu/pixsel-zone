import React from 'react';
import { 
  Crosshair, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Gamepad2, 
  Flame, 
  Layers, 
  Activity 
} from 'lucide-react';

export const Features2023Section: React.FC = () => {
  const features = [
    {
      icon: Crosshair,
      title: "ضرر دبل شوتجن M1887 وسويتش الـ AWM",
      desc: "استرجع ميكانيكا الون تاب الحقيقية وسرعة إطلاق النار الكلاسيكية للأسلحة بدون التعديلات والنيرف المعقد الذي أفسد متعة السلاح.",
      tag: "أسلحة كلاسيكية"
    },
    {
      icon: Zap,
      title: "خفة فائقة و 90 فريم بدون لاق أو تقطيع",
      desc: "تم تقليص حجم اللعبة إلى أقل من 1.2GB مع إزالة الملفات الزائدة والمؤثرات الثقيلة، لتعمل بسلاسة فائقة حتى على أجهزة 2GB و 3GB RAM.",
      tag: "أداء نقي"
    },
    {
      icon: Gamepad2,
      title: "رومات سقف فاكتوري وبيرمودا الكلاسيكية",
      desc: "استمتع بمواقع برمودا الأصلية القديمة (Clock Tower, Peak, Factory, Bimasakti) ورومات التحدي 1v1 بدون دروب فريم.",
      tag: "خرائط الحنين"
    },
    {
      icon: Flame,
      title: "سكنات ورقصات 2023 النادرة مفتوحة",
      desc: "سكن كوبرا MP40، سكن دراكو AK، حزم الساكورا والكرمنال ورقصة العرش الأسطورية متاحة مجاناً عبر أكواد السيرفر.",
      tag: "سكنات قديمة"
    },
    {
      icon: ShieldCheck,
      title: "حماية حقيقية ضد ملفات الهاك والآيمبوت",
      desc: "سيرفر نظيف مزود بنظام فحص تلقائي يكتشف ملفات الـ White Body والـ Aimlock ويحظر أي لاعب يخرب متعة البوياه.",
      tag: "لعب نظيف"
    },
    {
      icon: Activity,
      title: "توازن مهارات الشخصيات (ألوك وهياتو)",
      desc: "مهارات الشخصيات مضبوطة على معايير سنة 2023 العادلة حيث المهارة الفردية والسرعة هي التي تحدد الفائز في المواجهة.",
      tag: "توازن حقيقي"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-[#0b0f1b] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>لماذا نسخة 2023 هي الأفضل؟</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
            مميزات العصر الذهبي لفري فاير
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            كل ما أحببته في اللعبة عندما كانت بسيطة، سريعة، ومبنية على المهارة الفردية والتكتيك بدون تعقيدات التحديثات الجديدة.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#111627] to-[#0c101d] border border-slate-800 hover:border-amber-500/50 transition-all space-y-3 text-right group shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
