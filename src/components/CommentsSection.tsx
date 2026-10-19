import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { 
  MessageSquare, 
  Star, 
  Heart, 
  Pin, 
  Reply, 
  Send, 
  Trash2, 
  CheckCircle2, 
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Search,
  Gamepad2,
  Flame
} from 'lucide-react';
import { sound } from '../utils/sound';

export const CommentsSection: React.FC = () => {
  const { 
    comments, 
    addComment, 
    addAdminReply, 
    deleteAdminReply, 
    togglePinComment, 
    deleteComment, 
    likeComment, 
    isAdmin 
  } = useServer();

  // New Comment Form State
  const [authorName, setAuthorName] = useState('');
  const [authorTag, setAuthorTag] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<'review' | 'suggestion' | 'bug' | 'scrim'>('review');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Reply Input State for specific comment
  const [activeReplyCommentId, setActiveReplyCommentId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [adminRoleTitle, setAdminRoleTitle] = useState('مطور فري فاير 2023');

  // Filter & Search
  const [activeFilter, setActiveFilter] = useState<'all' | 'replied' | 'review' | 'bug' | 'scrim'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const avatarColors = ['#F59E0B', '#EF4444', '#8B5CF6', '#10B981', '#06B6D4', '#EC4899', '#3B82F6'];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    setIsSubmitting(true);
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    const initial = authorName.trim().charAt(0);

    const cleanTag = authorTag.trim() 
      ? (authorTag.toUpperCase().includes('ID') ? authorTag.trim() : `FF-ID: ${authorTag.trim()}`)
      : 'لاعب في النسخة';

    addComment({
      authorName: authorName.trim(),
      authorTag: cleanTag,
      avatarColor: randomColor,
      avatarInitial: initial,
      rating,
      category,
      content: content.trim()
    });

    setAuthorName('');
    setAuthorTag('');
    setContent('');
    setIsSubmitting(false);
  };

  const handleSendAdminReply = (commentId: string) => {
    if (!adminReplyText.trim()) return;
    addAdminReply(commentId, adminReplyText.trim(), adminRoleTitle);
    setActiveReplyCommentId(null);
    setAdminReplyText('');
  };

  // Filter comments
  const filteredComments = comments.filter((c) => {
    if (activeFilter === 'replied' && !c.adminReply) return false;
    if (activeFilter === 'review' && c.category !== 'review') return false;
    if (activeFilter === 'bug' && c.category !== 'bug') return false;
    if (activeFilter === 'scrim' && c.category !== 'scrim') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAuthor = c.authorName.toLowerCase().includes(q);
      const matchText = c.content.toLowerCase().includes(q);
      const matchReply = c.adminReply?.content.toLowerCase().includes(q);
      return matchAuthor || matchText || matchReply;
    }
    return true;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'suggestion': 
        return <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">اقتراح لسكن/سلاح 💡</span>;
      case 'bug': 
        return <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">بلاغ عن مشكلة ⚠️</span>;
      case 'scrim': 
        return <span className="text-[10px] px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800">طلب روم وتحدي ⚔️</span>;
      default: 
        return <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">تقييم ورأي ⭐</span>;
    }
  };

  return (
    <section id="comments" className="py-16 sm:py-24 border-b border-slate-800 bg-[#090d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-3 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>مجتمع اللاعبين والبلاغات المباشرة</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
              آراء لاعبي فري فاير 2023 وردود الإدارة
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              شاركنا تجربتك مع النسخة وسرعة السيرفر، اطلب رومات خاصة أو أبلغ عن أي مشكلة ليجيبك مطور النسخة بشكل مباشر ورسمي.
            </p>
          </div>

          {/* Admin status notification */}
          {isAdmin && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>وضع المطور نشط: يمكنك الرد كـ "المطور"، وتثبيت أو حذف أي تعليق</span>
            </div>
          )}
        </div>

        {/* Main Grid: Form on side + Comments list */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Add Comment Form (lg:col-span-4) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-gradient-to-b from-[#111728] to-[#0c101d] border-2 border-amber-500/30 p-6 space-y-5 text-right shadow-xl">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>اكتب رأيك أو بلاغك لمطور النسخة</span>
                </h3>
                <p className="text-xs text-slate-400">
                  اكتب رسالتك وستظهر لجميع اللاعبين وللمطور مباشرة بدون أي تسجيل معقد.
                </p>
              </div>

              <form onSubmit={handleSubmitComment} className="space-y-4">
                {/* Author Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    اسمك أو اسم حسابك في اللعبة <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="مثال: Booyah_Dz أو سفيان"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Free Fire ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    الآيدي الخاص بك باللعبة (Free Fire ID) <span className="text-slate-500 font-normal">(اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={authorTag}
                    onChange={(e) => setAuthorTag(e.target.value)}
                    placeholder="مثال: 819203810"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-500 text-left"
                    dir="ltr"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    نوع الرسالة
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="review">تقييم ورأي بالنسخة ⭐</option>
                    <option value="suggestion">اقتراح لسكن أو سلاح أو ميزة 💡</option>
                    <option value="bug">بلاغ عن مشكلة أو لاق أو هاك ⚠️</option>
                    <option value="scrim">طلب تنظيم روم أو تحدي تيمات ⚔️</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    تقييمك لسرعة النسخة واللعب:
                  </label>
                  <div className="flex items-center gap-1.5 p-2 bg-slate-950 rounded-xl border border-slate-800 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => { sound.playClick(); setRating(star); }}
                        className="p-1 text-slate-600 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-amber-400 mr-2">({rating}/5)</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    نص الرسالة أو البلاغ <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="اكتب رسالتك بوضوح..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5 text-black" />
                  <span>إرسال التعليق الآن</span>
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Comments List (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-5 text-right">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في تعليقات اللاعبين..."
                  className="w-full pr-8 pl-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
                <button
                  onClick={() => { sound.playClick(); setActiveFilter('all'); }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer ${
                    activeFilter === 'all' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  الكل ({comments.length})
                </button>
                <button
                  onClick={() => { sound.playClick(); setActiveFilter('replied'); }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer ${
                    activeFilter === 'replied' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ردود المطور 👑
                </button>
                <button
                  onClick={() => { sound.playClick(); setActiveFilter('bug'); }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer ${
                    activeFilter === 'bug' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  البلاغات ⚠️
                </button>
                <button
                  onClick={() => { sound.playClick(); setActiveFilter('scrim'); }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer ${
                    activeFilter === 'scrim' ? 'bg-orange-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  الرومات ⚔️
                </button>
              </div>
            </div>

            {/* List */}
            {filteredComments.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-2">
                <p className="text-sm">لم يتم العثور على تعليقات تطابق هذا البحث.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredComments.map((comm) => (
                  <div
                    key={comm.id}
                    className={`p-5 rounded-2xl border transition-all text-right space-y-3 ${
                      comm.isPinned 
                        ? 'bg-[#121626] border-amber-500/60 shadow-lg' 
                        : 'bg-[#0e1322] border-slate-800'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-black text-base shrink-0 shadow-md"
                          style={{ backgroundColor: comm.avatarColor || '#F59E0B' }}
                        >
                          {comm.avatarInitial}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-white">{comm.authorName}</h4>
                            <span className="text-[11px] text-slate-400 font-mono">{comm.authorTag}</span>
                            {getCategoryBadge(comm.category)}
                            {comm.isPinned && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold flex items-center gap-1">
                                <Pin className="w-2.5 h-2.5" /> مثبت في الأعلى
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <div className="flex items-center text-amber-400">
                              {[...Array(comm.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                              ))}
                            </div>
                            <span>• {comm.createdAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Admin Tools for this comment */}
                      {isAdmin && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => togglePinComment(comm.id)}
                            className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${comm.isPinned ? 'text-amber-400' : 'text-slate-400'}`}
                            title="تثبيت"
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setActiveReplyCommentId(comm.id);
                              setAdminReplyText(comm.adminReply?.content || '');
                            }}
                            className="p-1.5 text-amber-400 hover:bg-slate-800 rounded"
                            title="رد المطور"
                          >
                            <Reply className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteComment(comm.id)}
                            className="p-1.5 text-rose-400 hover:bg-rose-950/40 rounded"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                      {comm.content}
                    </p>

                    {/* Likes & Interaction */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={() => likeComment(comm.id)}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                        <span className="font-mono font-bold text-slate-300">{comm.likes}</span>
                        <span>إعجاب</span>
                      </button>

                      {comm.adminReply && (
                        <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> تم الرد من المطور
                        </span>
                      )}
                    </div>

                    {/* Official Developer Reply Display */}
                    {comm.adminReply && (
                      <div className="mr-3 sm:mr-6 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/40 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-400 flex items-center gap-1.5 font-gaming">
                            👑 {comm.adminReply.authorName} ({comm.adminReply.authorRole})
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{comm.adminReply.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {comm.adminReply.content}
                        </p>
                      </div>
                    )}

                    {/* Inline Reply input for Admin */}
                    {isAdmin && activeReplyCommentId === comm.id && (
                      <div className="mr-3 sm:mr-6 p-3 rounded-xl bg-slate-950 border border-amber-500/50 space-y-2 animate-in fade-in">
                        <label className="block text-[11px] font-bold text-amber-400">
                          كتابة رد المطور الرسمي:
                        </label>
                        <textarea
                          rows={2}
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          placeholder="اكتب ردك للاعب هنا..."
                          className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveReplyCommentId(null)}
                            className="px-3 py-1 text-xs text-slate-400"
                          >
                            إلغاء
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendAdminReply(comm.id)}
                            className="px-4 py-1 text-xs bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400"
                          >
                            نشر الرد
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
