import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Send } from 'lucide-react';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetDetails?: string;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  isOpen,
  onClose,
  presetDetails,
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    brandName: '',
    contactName: '',
    phone: '',
    email: '',
    city: '',
    quantity: '1000',
    notes: presetDetails || '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/v1/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // Fallback gracefully
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#071711] border border-[#c5a059]/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#c5a059]/20 flex items-center justify-between bg-[#040d09]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <h3 className="text-lg font-serif-luxury font-bold text-[#f4ede2]">
              طلب عينة وتصميم خاص · GRAVITY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 border border-[#c5a059] mx-auto flex items-center justify-center text-[#f7dfa5]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif-luxury font-bold text-[#f4ede2]">
                تم استلام طلبكم بنجاح
              </h4>
              <p className="text-sm text-[#ede8df]/80 font-arabic-luxury leading-relaxed max-w-sm mx-auto">
                شكراً لاهتمامكم بمنتجات Gravity. سيتواصل معكم مستشار التغليف الفاخر لدار المجوهرات الخاصة بكم لترتيب إرسال صندوق العينات الملموسة.
              </p>
              <div className="p-3 bg-[#0c2217] rounded-lg border border-[#c5a059]/25 text-xs font-mono text-[#c5a059] max-w-xs mx-auto">
                رقم المرجع: GRV-{(Math.random() * 10000).toFixed(0).padStart(4, '0')}
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-lg bg-[#c5a059] text-[#07130f] font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-[#ede8df]/70 font-arabic-luxury mb-2">
                يرجى تزويدنا ببيانات دار المجوهرات لإعداد عينات الحقيبة الورقية الفاخرة المخصصة:
              </div>

              <div>
                <label className="block text-xs font-medium text-[#f7dfa5] mb-1 font-serif-luxury">
                  اسم دار المجوهرات / المتجر *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مجوهرات الأندلس / Maison Diamant"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#c5a059]/30 text-sm text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#f7dfa5] mb-1 font-serif-luxury">
                    اسم المسؤول *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الكريم"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#c5a059]/30 text-sm text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#f7dfa5] mb-1 font-serif-luxury">
                    رقم الهاتف / واتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 5X XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#c5a059]/30 text-sm text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#f7dfa5] mb-1 font-serif-luxury">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="info@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#c5a059]/30 text-sm text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#f7dfa5] mb-1 font-serif-luxury">
                    المدينة والدولة *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="الرياض / دبي / الكويت"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-[#c5a059]/30 text-sm text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#f7dfa5] mb-1 font-serif-luxury">
                  الكمية التقديرية المتوقعة (MOQ: 500 قطعة)
                </label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#07130f] border border-[#c5a059]/30 text-sm text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                >
                  <option value="500">500 قطعة (عينة إنتاج تجريبية)</option>
                  <option value="1000">1,000 قطعة (موصى به للمتاجر الفردية)</option>
                  <option value="2500">2,500 قطعة (لسلسلة فروع)</option>
                  <option value="5000">5,000+ قطعة (إنتاج سنوي مخصص)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#f7dfa5] mb-1 font-serif-luxury">
                  تفاصيل إضافية أو متطلبات الفويل والحبال
                </label>
                <textarea
                  rows={2}
                  placeholder="ملاحظات حول أبعاد العلب الداخلية، بصمة الشعار، أو لون الحبال..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-black/40 border border-[#c5a059]/30 text-xs text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#dfba73] via-[#c5a059] to-[#b38e47] hover:from-[#f0d696] hover:to-[#c5a059] text-[#07130f] font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(197,160,89,0.25)] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال طلب العينات والمواصفات</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#ede8df]/50 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>خصوصية تامة لتصاميم وهويات دور المجوهرات</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
