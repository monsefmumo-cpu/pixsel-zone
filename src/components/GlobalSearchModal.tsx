import React, { useState, useEffect, useRef } from 'react';
import { useServer } from '../context/ServerContext';
import { 
  Search, 
  X, 
  Shield, 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  ArrowLeft, 
  CornerDownLeft,
  Sparkles,
  Download,
  Gift,
  Radio,
  Flame
} from 'lucide-react';
import { sound } from '../utils/sound';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  type: 'download' | 'code' | 'role' | 'rule' | 'event' | 'comment';
  typeLabel: string;
  title: string;
  subtitle: string;
  badge?: string;
  color?: string;
  targetAnchor: string;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const { roles, rules, announcements, comments, redeemCodes, downloadInfo, liveRoom } = useServer();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'download' | 'code' | 'rule' | 'event' | 'comment'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Aggregate searchable items
  const allItems: SearchResultItem[] = [
    // Downloads
    {
      id: 'search_apk',
      type: 'download',
      typeLabel: 'تحميل اللعبة',
      title: `تحميل APK فري فاير 2023 (${downloadInfo.version})`,
      subtitle: `حجم الملف ${downloadInfo.apkSize} - متوافق مع جميع أجهزة أندرويد`,
      badge: '📥',
      color: '#F59E0B',
      targetAnchor: '#download'
    },
    {
      id: 'search_obb',
      type: 'download',
      typeLabel: 'ملف الداتا',
      title: `تحميل ملف OBB الأصلي (${downloadInfo.obbSize})`,
      subtitle: 'مسار التثبيت: Android/obb/com.dts.freefireth/',
      badge: '📦',
      color: '#06B6D4',
      targetAnchor: '#download'
    },
    // Redeem Codes
    ...redeemCodes.map((code) => ({
      id: `code_${code.id}`,
      type: 'code' as const,
      typeLabel: 'كود هدية',
      title: `كود: ${code.code}`,
      subtitle: `المكافأة: ${code.reward} - متبقي ${code.usesLeft} استخدام`,
      badge: '🎁',
      color: '#EC4899',
      targetAnchor: '#redeem'
    })),
    // Live room
    ...(liveRoom.isActive ? [{
      id: 'search_liveroom',
      type: 'event' as const,
      typeLabel: 'روم مباشر',
      title: `روم مباشر: ${liveRoom.mode} (ID: ${liveRoom.roomId})`,
      subtitle: `كلمة السر: ${liveRoom.roomPassword} - المضيف: ${liveRoom.hostName}`,
      badge: '🔥',
      color: '#EF4444',
      targetAnchor: '#liveroom'
    }] : []),
    // Rules
    ...rules.map((rule) => ({
      id: `rule_${rule.id}`,
      type: 'rule' as const,
      typeLabel: 'قانون ومكافحة الغش',
      title: `قانون 0${rule.number}: ${rule.title}`,
      subtitle: rule.description,
      badge: '🛡️',
      color: '#F43F5E',
      targetAnchor: '#rules'
    })),
    // Events & Tournaments
    ...announcements.map((ann) => ({
      id: `event_${ann.id}`,
      type: 'event' as const,
      typeLabel: 'بطولة / إعلان',
      title: ann.title,
      subtitle: `${ann.content} ${ann.reward ? `(الجوائز: ${ann.reward})` : ''} — ${ann.date}`,
      badge: '🏆',
      color: '#F59E0B',
      targetAnchor: '#events'
    })),
    // Comments
    ...comments.map((c) => ({
      id: `comment_${c.id}`,
      type: 'comment' as const,
      typeLabel: 'تعليق لاعب',
      title: `${c.authorName} (${c.authorTag})`,
      subtitle: `${c.content} ${c.adminReply ? `[رد المطور: ${c.adminReply.content}]` : ''}`,
      badge: '💬',
      color: '#10B981',
      targetAnchor: '#comments'
    }))
  ];

  // Filter items
  const results = allItems.filter((item) => {
    if (selectedCategory !== 'all' && item.type !== selectedCategory) {
      return false;
    }
    if (!query.trim()) {
      return true;
    }
    const q = query.trim().toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(q);
    const subMatch = item.subtitle.toLowerCase().includes(q);
    const typeMatch = item.typeLabel.toLowerCase().includes(q);
    return titleMatch || subMatch || typeMatch;
  }).slice(0, 20);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelectResult(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelectResult = (item: SearchResultItem) => {
    sound.playClick();
    onClose();
    const el = document.querySelector(item.targetAnchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f1322] border-2 border-amber-500/40 shadow-2xl overflow-hidden text-right flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-[#0a0d18]">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="ابحث عن: تحميل APK، كود هدية، بطولة، قوانين الهاك..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-xs"
          >
            إغلاق (Esc)
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto text-xs">
          <button
            onClick={() => { sound.playClick(); setSelectedCategory('all'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            الكل ({allItems.length})
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedCategory('download'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'download' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            التحميلات 📥
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedCategory('code'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'code' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            الأكواد 🎁
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedCategory('event'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'event' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            البطولات 🏆
          </button>
          <button
            onClick={() => { sound.playClick(); setSelectedCategory('rule'); }}
            className={`px-3 py-1 rounded-lg font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === 'rule' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            القوانين 🛡️
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              لا توجد نتائج مطابقة لبحثك "{query}"
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-start justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected ? 'bg-amber-500/15 border border-amber-500/40' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{item.badge}</span>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                          {item.typeLabel}
                        </span>
                        <h4 className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <CornerDownLeft className={`w-4 h-4 shrink-0 transition-opacity ${isSelected ? 'text-amber-400 opacity-100' : 'opacity-0'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#0a0d18] border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>↑↓ للتنقل</span>
            <span>·</span>
            <span>Enter للذهاب للقسم</span>
          </div>
          <span>Free Fire 2023 Search</span>
        </div>

      </div>
    </div>
  );
};
