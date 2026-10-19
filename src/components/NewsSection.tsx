import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { NewsItemType } from '../types';
import { 
  Newspaper, 
  Sparkles, 
  Calendar, 
  User, 
  Eye, 
  Gift, 
  ArrowLeft, 
  Pin, 
  ChevronRight, 
  X,
  Share2,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/sound';

export const NewsSection: React.FC = () => {
  const { newsList, showToast } = useServer();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'update' | 'event' | 'community'>('all');
  const [activeArticle, setActiveArticle] = useState<NewsItemType | null>(null);

  const categories = [
    { id: 'all', label: 'جميع الأخبار' },
    { id: 'update', label: 'تحديثات اللعبة' },
    { id: 'event', label: 'البطولات والرومات' },
    { id: 'community', label: 'الحماية والمجتمع' },
  ];

  const filteredNews = newsList.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleOpenArticle = (item: NewsItemType) => {
    sound.playClick();
    setActiveArticle(item);
  };

  const handleShare = (item: NewsItemType) => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#news - ${item.title}`);
      showToast('تم نسخ رابط الخبر للمشاركة!', 'success');
    }
  };

  return (
    <section id="news" className="relative py-16 sm:py-24 bg-[#0d071a] border-t border-purple-900/30 overflow-hidden" dir="rtl">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 mb-2 font-mono">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>مركز الأخبار والتحديثات الرسمية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-gaming">
              آخر مستجدات <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">فري فاير 2023</span>
            </h2>
            <p className="text-sm text-purple-200/70 mt-2 max-w-xl">
              إعلانات التحديثات الدورية، مواعيد صيانة الخوادم، نتائج بطولات الكلاش سكواد، وملاحظات المطورين مباشرة من لوحة التحكم.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-[#150a2b] border border-purple-800/50 rounded-2xl overflow-x-auto self-start md:self-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { sound.playClick(); setSelectedCategory(cat.id as any); }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                    : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              onClick={() => handleOpenArticle(item)}
              className="group relative flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#180d31] to-[#110722] border border-purple-800/40 hover:border-orange-500/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-950/30 cursor-pointer"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-purple-300/70 mb-3">
                  <div className="flex items-center gap-2">
                    {item.isPinned && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-orange-400">
                        <Pin className="w-3.5 h-3.5" />
                        <span>مثبت</span>
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-purple-300">{item.tag}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-purple-300/60">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-2 mb-3">
                  {item.title}
                </h3>

                {/* Content Excerpt */}
                <p className="text-xs sm:text-sm text-purple-200/70 line-clamp-3 leading-relaxed mb-4">
                  {item.content}
                </p>

                {/* Reward Banner if any */}
                {item.reward && (
                  <div className="mb-4 p-2.5 rounded-xl bg-orange-950/40 border border-orange-600/30 text-orange-300 text-xs flex items-center gap-2">
                    <Gift className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="font-bold truncate">مكافأة: {item.reward}</span>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between text-xs text-purple-300/60">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>{item.author}</span>
                </span>
                <span className="flex items-center gap-1 text-orange-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>قراءة التفاصيل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16 bg-[#160b2d]/50 rounded-3xl border border-purple-800/30">
            <Newspaper className="w-12 h-12 text-purple-500/50 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white">لا توجد أخبار في هذا القسم حالياً</h4>
            <p className="text-xs text-purple-300/60 mt-1">تابعنا باستمرار للاطلاع على جديد تحديثات السيرفر والبطولات.</p>
          </div>
        )}

      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#190d33] to-[#0e071c] border-2 border-orange-500/50 p-6 sm:p-8 shadow-2xl shadow-purple-950/80 space-y-5 text-right text-slate-100 max-h-[90vh] overflow-y-auto">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-purple-900/50 pb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold">
                  {activeArticle.tag}
                </span>
                <span className="text-purple-300/60 font-mono">{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-xl bg-purple-950/50 border border-purple-800/50 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Title */}
            <h2 className="text-xl sm:text-2xl font-black text-white font-gaming leading-snug">
              {activeArticle.title}
            </h2>

            {/* Author bar */}
            <div className="flex items-center gap-3 text-xs text-purple-300/80 py-2 border-y border-purple-900/30">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-400" />
                <span>الكاتب: <strong className="text-white">{activeArticle.author}</strong></span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-400" />
                <span>المشاهدات: {activeArticle.views.toLocaleString()}</span>
              </div>
            </div>

            {/* Reward Box */}
            {activeArticle.reward && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/60 to-purple-950/60 border border-orange-500/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-orange-300">مكافأة مرفقة مع الخبر</h4>
                    <p className="text-sm font-black text-white mt-0.5">{activeArticle.reward}</p>
                  </div>
                </div>
                <a
                  href="#redeem"
                  onClick={() => setActiveArticle(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-orange-500 text-black text-xs font-black hover:bg-orange-400 transition-colors shrink-0"
                >
                  استلام الجائزة
                </a>
              </div>
            )}

            {/* Article Full Content */}
            <div className="text-sm sm:text-base text-purple-100/90 leading-relaxed space-y-4 whitespace-pre-line py-2">
              {activeArticle.content}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-purple-900/50 flex items-center justify-between gap-3">
              <button
                onClick={() => handleShare(activeArticle)}
                className="px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 text-xs font-bold text-purple-200 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة الخبر</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black text-xs font-black hover:from-orange-300 hover:to-amber-400 transition-all cursor-pointer shadow-lg shadow-orange-500/20"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
