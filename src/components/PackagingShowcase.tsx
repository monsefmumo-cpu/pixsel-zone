import React from 'react';
import {
  ShieldCheck,
  Sparkles,
  Feather,
  Box,
  Layers,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { BAG_SPECIFICATIONS } from '../data/commercialData';

interface PackagingShowcaseProps {
  onOpenInquiry: () => void;
}

export const PackagingShowcase: React.FC<PackagingShowcaseProps> = ({ onOpenInquiry }) => {
  return (
    <section id="specifications" className="py-20 relative bg-[#06140e] border-t border-[#c5a059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10271d] border border-[#c5a059]/30 text-xs font-serif-luxury tracking-wider text-[#c5a059] mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>HAUTE JOAILLERIE SPECIFICATIONS & CRAFTSMANSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#f4ede2] mb-3">
            المواصفات الفنية وهندسة الفخامة
          </h2>

          <p className="text-[#ede8df]/75 font-arabic-luxury text-base sm:text-lg">
            "بعض التفاصيل لا تُحكى... بل تُلمس." كل عنصر في حقيبة Gravity مصمم ليوفر حماية كاملة وفخامة حسية تليق بأثمن قطع الألماس والمجوهرات الراقية.
          </p>
        </div>

        {/* 2-Column Split: Editorial Image Showcase (Left) + Specifications Grid (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Editorial Visual Still (Left 6 Cols) */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#c5a059]/25 shadow-2xl group">
            <img
              src="/src/assets/images/gravity_bag_jewelry_box_1791550602609.jpg"
              alt="Gravity Jewelry Paper Bag with Diamond Ring Velvet Box"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover min-h-[420px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute bottom-6 inset-x-6">
              <span className="text-[11px] uppercase tracking-widest text-[#c5a059] font-mono block mb-1">
                EDITORIAL SHOWCASE · اللحظة الأولى
              </span>
              <p className="text-base sm:text-lg font-serif-luxury text-[#f7dfa5] italic leading-relaxed">
                "لأن قيمتك وتألق مجوهراتك يبدآن من اللحظة الأولى... اختر التصميم الذي يعكس تميّز علاماتك."
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-[#ede8df]/80">
                <span>تغليف مجوهرات متكامل</span>
                <span>·</span>
                <span>صناعة يدوية دقيقة</span>
                <span>·</span>
                <span>مواد صديقة للبيئة FSC®</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Craftsmanship (Right 6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BAG_SPECIFICATIONS.map((spec, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#091d14] border border-[#c5a059]/20 flex flex-col justify-between hover:border-[#c5a059]/50 transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 flex items-center justify-center text-[#f7dfa5] mb-4 group-hover:bg-[#c5a059]/20 transition-colors">
                    {idx === 0 ? (
                      <Layers className="w-5 h-5 text-[#c5a059]" />
                    ) : idx === 1 ? (
                      <Feather className="w-5 h-5 text-[#c5a059]" />
                    ) : idx === 2 ? (
                      <Box className="w-5 h-5 text-[#c5a059]" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-[#c5a059]" />
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-[#f4ede2] font-serif-luxury mb-1">
                    {spec.title}
                  </h3>
                  <div className="text-xs font-mono text-[#c5a059] mb-2">{spec.value}</div>
                  <p className="text-xs text-[#ede8df]/70 font-arabic-luxury leading-relaxed">
                    {spec.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#ede8df]/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>معتمد لدور المجوهرات العالمية</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance Strip & B2B Inquiry Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0d261b] via-[#123324] to-[#0d261b] border border-[#c5a059]/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-right">
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#f4ede2]">
              هل ترغب بتطبيق هوية علامتك على حقائب Gravity؟
            </h3>
            <p className="text-sm text-[#ede8df]/80 font-arabic-luxury max-w-xl">
              نقدم خدمات التصميم وتصنيع العينات المادية لدور الذهب والمجوهرات الراقية، مع استشارات إخراجية لهوية التغليف والإعلانات التلفزيونية.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#b38e47] hover:from-[#f0d696] hover:to-[#c5a059] text-[#07130f] font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(197,160,89,0.3)] flex items-center gap-2"
            >
              <span>طلب عينات وكتالوج الأسعار</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
