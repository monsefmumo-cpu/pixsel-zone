import React, { useState } from 'react';
import { useServer } from '../../context/ServerContext';
import { ServerRole, CommunityComment, ServerAnnouncement, ServerRule, RedeemCode } from '../../types';
import { 
  X, 
  Settings, 
  Shield, 
  MessageSquare, 
  Bell, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Reply, 
  Lock, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Pin,
  ExternalLink,
  BookOpen,
  Radio,
  Gamepad2,
  Gift,
  KeyRound,
  Copy,
  AlertTriangle,
  Flame,
  Users
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'downloads' | 'rooms' | 'codes' | 'announcements' | 'comments' | 'rules' | 'settings';
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ 
  isOpen, 
  onClose,
  defaultTab = 'downloads' 
}) => {
  const { 
    serverInfo, 
    updateServerInfo,
    downloadInfo,
    updateDownloadInfo,
    liveRoom,
    updateLiveRoom,
    redeemCodes,
    addRedeemCode,
    toggleRedeemCode,
    deleteRedeemCode,
    roles, 
    addRole, 
    updateRole, 
    deleteRole, 
    comments, 
    addAdminReply, 
    deleteAdminReply, 
    togglePinComment, 
    deleteComment, 
    announcements, 
    addAnnouncement, 
    updateAnnouncement, 
    deleteAnnouncement, 
    rules,
    addRule,
    updateRule,
    deleteRule,
    lockAdmin, 
    adminPin, 
    changeAdminPin, 
    resetToDefaults, 
    exportDataJson, 
    importDataJson,
    isDiscordVerified,
    verifyDiscordJoin,
    resetDiscordVerification,
    setViewMode
  } = useServer();

  const [activeTab, setActiveTab] = useState<'downloads' | 'rooms' | 'codes' | 'announcements' | 'comments' | 'rules' | 'settings'>(defaultTab);

  // Download & Game Form
  const [downloadForm, setDownloadForm] = useState(downloadInfo);
  // Live Room Form
  const [roomForm, setRoomForm] = useState(liveRoom);
  // Server Info Form
  const [infoForm, setInfoForm] = useState(serverInfo);

  // New Redeem Code Form
  const [newCodeForm, setNewCodeForm] = useState({
    code: '',
    reward: '',
    usesLeft: 100,
    isActive: true,
    expiresAt: 'متاح للجميع'
  });
  const [showAddCode, setShowAddCode] = useState(false);

  // Announcement Form State
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const [annForm, setAnnForm] = useState<Partial<ServerAnnouncement>>({
    title: '',
    tag: 'بطولة كلاش سكواد',
    date: 'نهاية الأسبوع',
    content: '',
    reward: '',
    status: 'active',
    participantsCount: 16
  });

  // Rule Form State
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [ruleForm, setRuleForm] = useState<Partial<ServerRule>>({
    number: rules.length + 1,
    title: '',
    description: '',
    category: 'anticheat'
  });

  // Comment Reply Active State
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyInputText, setReplyInputText] = useState('');
  const [replyAdminRole, setReplyAdminRole] = useState('إدارة وتطوير فري فاير 2023');

  // New Admin Password State
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeError, setPinChangeError] = useState('');
  const [pinCopied, setPinCopied] = useState(false);

  // Import/Export States
  const [copiedExport, setCopiedExport] = useState(false);
  const [importText, setImportText] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSaveDownloads = (e: React.FormEvent) => {
    e.preventDefault();
    updateDownloadInfo(downloadForm);
    if (downloadForm.discordInviteUrl) {
      updateServerInfo({ discordInviteUrl: downloadForm.discordInviteUrl });
    }
  };

  const handleSaveLiveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    updateLiveRoom(roomForm);
  };

  const handleSaveServerInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateServerInfo(infoForm);
  };

  const handleCreateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeForm.code.trim() || !newCodeForm.reward.trim()) return;
    addRedeemCode({
      code: newCodeForm.code.trim().toUpperCase(),
      reward: newCodeForm.reward.trim(),
      usesLeft: Number(newCodeForm.usesLeft) || 50,
      isActive: newCodeForm.isActive,
      expiresAt: newCodeForm.expiresAt || 'متاح'
    });
    setNewCodeForm({
      code: '',
      reward: '',
      usesLeft: 100,
      isActive: true,
      expiresAt: 'متاح للجميع'
    });
    setShowAddCode(false);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title || !annForm.content) return;

    if (editingAnnId) {
      updateAnnouncement(editingAnnId, annForm);
      setEditingAnnId(null);
    } else {
      addAnnouncement({
        title: annForm.title || '',
        tag: annForm.tag || 'إعلان',
        date: annForm.date || 'اليوم',
        content: annForm.content || '',
        reward: annForm.reward,
        status: annForm.status || 'active',
        participantsCount: annForm.participantsCount || 0
      });
    }

    setAnnForm({
      title: '',
      tag: 'بطولة كلاش سكواد',
      date: 'نهاية الأسبوع',
      content: '',
      reward: '',
      status: 'active',
      participantsCount: 16
    });
  };

  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleForm.title || !ruleForm.description) return;

    if (editingRuleId) {
      updateRule(editingRuleId, ruleForm);
      setEditingRuleId(null);
    } else {
      addRule({
        number: rules.length + 1,
        title: ruleForm.title || '',
        description: ruleForm.description || '',
        category: ruleForm.category || 'general'
      });
    }

    setRuleForm({
      number: rules.length + 2,
      title: '',
      description: '',
      category: 'anticheat'
    });
  };

  const handleSendReply = (commentId: string) => {
    if (!replyInputText.trim()) return;
    addAdminReply(commentId, replyInputText.trim(), replyAdminRole);
    setReplyingCommentId(null);
    setReplyInputText('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeError('');
    if (!newPinInput.trim()) {
      setPinChangeError('يرجى كتابة كلمة المرور الجديدة');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeError('كلمتا المرور غير متطابقتين!');
      return;
    }
    changeAdminPin(newPinInput.trim());
    setNewPinInput('');
    setConfirmPinInput('');
  };

  const copyCurrentPin = () => {
    navigator.clipboard.writeText(adminPin);
    setPinCopied(true);
    sound.playClick();
    setTimeout(() => setPinCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl bg-[#0c101d] border-2 border-amber-500/40 shadow-2xl overflow-hidden text-right">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080b14] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-black shadow-md shadow-amber-500/30">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white font-gaming tracking-wide">لوحة تحكم مطور فري فاير 2023</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono">
                  MASTER ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400">تحكم كامل بالتحميلات، الرومات الحية، الجوائز، والرد على مجتمع اللاعبين</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Switch to Player Management & Game Version Console */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                setViewMode('admin-console');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-200 bg-red-950/70 hover:bg-red-900 border border-red-500/60 rounded-lg shadow-sm transition-all cursor-pointer"
              title="فتح موقع كونسول إدارة النسخة واللاعبين بالآيدي والسكنات والباند (خاص بالإدارة)"
            >
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">كونسول اللاعبين (Bans & Skins) ⚡</span>
              <span className="sm:hidden">الكونسول ⚡</span>
            </button>

            <button
              onClick={() => { lockAdmin(); onClose(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg border border-rose-900/50 transition-colors"
              title="قفل وتسجيل الخروج"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">قفل اللوحة</span>
            </button>
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#090d18] border-b border-slate-800/80 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => { sound.playClick(); setActiveTab('downloads'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'downloads'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>إدارة التحميلات والملفات</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('rooms'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'rooms'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>بث الرومات الحية والسيرفر</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('codes'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'codes'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>أكواد الهدايا ({redeemCodes.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('announcements'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'announcements'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>البطولات والتحديثات ({announcements.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('comments'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'comments'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>تعليقات وبلاغات اللاعبين ({comments.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('rules'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>قوانين مكافحة الهاك ({rules.length})</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('settings'); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>كلمة المرور والأمان</span>
          </button>
        </div>

        {/* Tab Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: DOWNLOADS & GAME FILES */}
          {activeTab === 'downloads' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  <span className="font-bold">ملاحظة المطور:</span> يمكنك تعديل روابط التحميل الخاصة بـ APK اللعبة وملف الـ OBB والمحاكي في أي وقت، وستتحدث مباشرة على الموقع لجميع الزوار فوراً.
                </div>
              </div>

              <form onSubmit={handleSaveDownloads} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رقم إصدار النسخة (Version)
                    </label>
                    <input
                      type="text"
                      value={downloadForm.version}
                      onChange={(e) => setDownloadForm({ ...downloadForm, version: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      تاريخ آخر تحديث / الاستقرار
                    </label>
                    <input
                      type="text"
                      value={downloadForm.lastUpdated}
                      onChange={(e) => setDownloadForm({ ...downloadForm, lastUpdated: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رابط تحميل ملف الـ APK (أندرويد)
                    </label>
                    <input
                      type="url"
                      value={downloadForm.apkUrl}
                      onChange={(e) => setDownloadForm({ ...downloadForm, apkUrl: e.target.value })}
                      placeholder="https://mediafire.com/.../freefire2023.apk"
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-500 text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      حجم ملف الـ APK
                    </label>
                    <input
                      type="text"
                      value={downloadForm.apkSize}
                      onChange={(e) => setDownloadForm({ ...downloadForm, apkSize: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رابط تحميل ملف الداتا (OBB Data)
                    </label>
                    <input
                      type="url"
                      value={downloadForm.obbUrl}
                      onChange={(e) => setDownloadForm({ ...downloadForm, obbUrl: e.target.value })}
                      placeholder="https://mediafire.com/.../main.com.dts.freefireth.obb"
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-500 text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      حجم ملف الـ OBB
                    </label>
                    <input
                      type="text"
                      value={downloadForm.obbSize}
                      onChange={(e) => setDownloadForm({ ...downloadForm, obbSize: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-amber-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رابط حزمة المحاكي للكمبيوتر (PC Emulator Package)
                    </label>
                    <input
                      type="url"
                      value={downloadForm.pcEmulatorUrl}
                      onChange={(e) => setDownloadForm({ ...downloadForm, pcEmulatorUrl: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-500 text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Maintenance Switch */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <AlertTriangle className={`w-4 h-4 ${downloadForm.isMaintenance ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span>وضع الصيانة المؤقتة (Maintenance Mode)</span>
                      </h4>
                      <p className="text-xs text-slate-400">عند تفعيله، سيظهر شريط تحذيري للاعبين يوضح أن السيرفر يخضع للصيانة</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={downloadForm.isMaintenance}
                        onChange={(e) => setDownloadForm({ ...downloadForm, isMaintenance: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {downloadForm.isMaintenance && (
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        رسالة الصيانة التي تظهر للاعبين
                      </label>
                      <input
                        type="text"
                        value={downloadForm.maintenanceMessage}
                        onChange={(e) => setDownloadForm({ ...downloadForm, maintenanceMessage: e.target.value })}
                        placeholder="السيرفر تحت الصيانة لإضافة سكنات جديدة، سنعود بعد قليل..."
                        className="w-full px-3 py-2 text-sm bg-slate-950 border border-amber-500/50 rounded-lg text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Discord Gate Requirement Settings */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-[#5865F2]/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#5865F2] animate-pulse" />
                        <span>شرط الانضمام لسيرفر الديسكورد قبل التحميل (Discord Gate)</span>
                      </h4>
                      <p className="text-xs text-slate-400">عند تفعيله، سيُطلب من أي زائر الانضمام لسيرفر ديسكورد أولاً قبل فتح رابط تحميل APK أو OBB</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={downloadForm.requireDiscordJoin}
                        onChange={(e) => setDownloadForm({ ...downloadForm, requireDiscordJoin: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5865F2]"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رابط سيرفر ديسكورد الرسمي (Discord Invite URL)
                    </label>
                    <input
                      type="url"
                      value={downloadForm.discordInviteUrl}
                      onChange={(e) => setDownloadForm({ ...downloadForm, discordInviteUrl: e.target.value })}
                      placeholder="https://discord.gg/m6etCxgUX"
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-[#5865F2] text-left"
                      dir="ltr"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">
                      حالة تحقق متصفحك حالياً: <strong className={isDiscordVerified ? 'text-emerald-400' : 'text-amber-400'}>{isDiscordVerified ? 'تم التحقق ✓' : 'غير متحقق (يظهر له الشرط)'}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={resetDiscordVerification}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] transition-colors"
                    >
                      إعادة تعيين التحقق لتجربة الشرط
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ تحديثات التحميل والملفات</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: LIVE ROOMS & SERVER STATUS */}
          {activeTab === 'rooms' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-start gap-3">
                <Radio className="w-5 h-5 text-orange-400 shrink-0 mt-0.5 animate-pulse" />
                <div className="text-xs text-orange-200">
                  <span className="font-bold">بث الرومات المباشرة:</span> عندما تنشئ روماً في اللعبة (كلاش سكواد أو بيرمودا)، ضع رقم الآيدي وكلمة السر هنا واضغط حفظ، وستظهر فوراً لجميع زوار موقعك ليدخلوا ويلعبوا معك!
                </div>
              </div>

              <form onSubmit={handleSaveLiveRoom} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${roomForm.isActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-500'}`} />
                    <h3 className="text-base font-bold text-white">حالة الروم المباشر في الموقع</h3>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <span>{roomForm.isActive ? 'الروم معروض للجميع (مباشر)' : 'الروم مخفي حالياً'}</span>
                    <input
                      type="checkbox"
                      checked={roomForm.isActive}
                      onChange={(e) => setRoomForm({ ...roomForm, isActive: e.target.checked })}
                      className="w-4 h-4 accent-amber-500"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رقم الروم (Room ID)
                    </label>
                    <input
                      type="text"
                      value={roomForm.roomId}
                      onChange={(e) => setRoomForm({ ...roomForm, roomId: e.target.value })}
                      placeholder="مثال: 8472910"
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold tracking-widest focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      كلمة سر الروم (Password)
                    </label>
                    <input
                      type="text"
                      value={roomForm.roomPassword}
                      onChange={(e) => setRoomForm({ ...roomForm, roomPassword: e.target.value })}
                      placeholder="مثال: 2023 أو 1234"
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold tracking-widest focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      نمط اللعب (Game Mode)
                    </label>
                    <input
                      type="text"
                      value={roomForm.mode}
                      onChange={(e) => setRoomForm({ ...roomForm, mode: e.target.value })}
                      placeholder="كلاش سكواد 4v4 / سولو سنايبر / كلاسيك بيرمودا"
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      صاحب الروم (Host Nickname)
                    </label>
                    <input
                      type="text"
                      value={roomForm.hostName}
                      onChange={(e) => setRoomForm({ ...roomForm, hostName: e.target.value })}
                      placeholder="مثال: المطور MUMO"
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      شروط وملاحظات الروم
                    </label>
                    <input
                      type="text"
                      value={roomForm.notes}
                      onChange={(e) => setRoomForm({ ...roomForm, notes: e.target.value })}
                      placeholder="ممنوع القنابل والدخان - مسموح فقط أسلحة الشوتجن والـ MP40..."
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>تحديث وبث بيانات الروم فوراً</span>
                  </button>
                </div>
              </form>

              {/* Server Live Stats Form */}
              <form onSubmit={handleSaveServerInfo} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>إحصائيات وخوادم السيرفر المعروضة</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      عدد اللاعبين المتصلين حالياً
                    </label>
                    <input
                      type="number"
                      value={infoForm.onlinePlayers}
                      onChange={(e) => setInfoForm({ ...infoForm, onlinePlayers: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      إجمالي عدد التحميلات
                    </label>
                    <input
                      type="number"
                      value={infoForm.totalDownloads}
                      onChange={(e) => setInfoForm({ ...infoForm, totalDownloads: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      معدل استجابة البينغ (Ping)
                    </label>
                    <input
                      type="text"
                      value={infoForm.serverPing}
                      onChange={(e) => setInfoForm({ ...infoForm, serverPing: e.target.value })}
                      placeholder="مثال: 24ms"
                      className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all cursor-pointer border border-slate-600"
                  >
                    <Save className="w-4 h-4" />
                    <span>تحديث الإحصائيات</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: REDEEM CODES */}
          {activeTab === 'codes' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">إدارة أكواد الهدايا والجواهر (Redeem Codes)</h3>
                  <p className="text-xs text-slate-400">يمكن للاعبين إدخال هذه الأكواد على الموقع للفوز بسكنات وجواهر 2023</p>
                </div>
                <button
                  onClick={() => setShowAddCode(!showAddCode)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-black font-bold rounded-xl text-xs hover:bg-amber-400 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة كود جديد</span>
                </button>
              </div>

              {/* Add Code Form */}
              {showAddCode && (
                <form onSubmit={handleCreateCode} className="p-4 rounded-xl bg-slate-900 border border-amber-500/50 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400">إنشاء كود مكافأة جديد:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">رمز الكود (Code)</label>
                      <input
                        type="text"
                        value={newCodeForm.code}
                        onChange={(e) => setNewCodeForm({ ...newCodeForm, code: e.target.value })}
                        placeholder="BOOYAH2023"
                        className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-amber-400 font-mono uppercase"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">المكافأة (Reward)</label>
                      <input
                        type="text"
                        value={newCodeForm.reward}
                        onChange={(e) => setNewCodeForm({ ...newCodeForm, reward: e.target.value })}
                        placeholder="1,000 جوهرة + سكن كوبرا"
                        className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">العدد المتاح للاستخدام</label>
                      <input
                        type="number"
                        value={newCodeForm.usesLeft}
                        onChange={(e) => setNewCodeForm({ ...newCodeForm, usesLeft: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">الصلاحية</label>
                      <input
                        type="text"
                        value={newCodeForm.expiresAt}
                        onChange={(e) => setNewCodeForm({ ...newCodeForm, expiresAt: e.target.value })}
                        placeholder="حتى نهاية الأسبوع"
                        className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCode(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400"
                    >
                      حفظ ونشر الكود
                    </button>
                  </div>
                </form>
              )}

              {/* Codes List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {redeemCodes.map((codeItem) => (
                  <div 
                    key={codeItem.id}
                    className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                      codeItem.isActive 
                        ? 'bg-slate-900/90 border-slate-700' 
                        : 'bg-slate-950/60 border-slate-800 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                          {codeItem.code}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          codeItem.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {codeItem.isActive ? 'مفعل' : 'معطل'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1 font-semibold">{codeItem.reward}</p>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        الاستخدامات المتبقية: <span className="text-amber-400 font-mono font-bold">{codeItem.usesLeft}</span> • {codeItem.expiresAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleRedeemCode(codeItem.id)}
                        className="px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        {codeItem.isActive ? 'إيقاف' : 'تفعيل'}
                      </button>
                      <button
                        onClick={() => deleteRedeemCode(codeItem.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ANNOUNCEMENTS & TOURNAMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6 animate-in fade-in">
              <form onSubmit={handleSaveAnnouncement} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-4">
                <h3 className="text-xs font-bold text-amber-400">
                  {editingAnnId ? 'تعديل الإعلان / البطولة' : 'نشر إعلان أو بطولة جديدة:'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">عنوان الإعلان / البطولة</label>
                    <input
                      type="text"
                      value={annForm.title}
                      onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                      placeholder="بطولة كلاش سكواد 2023 الكبرى..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">التصنيف</label>
                    <input
                      type="text"
                      value={annForm.tag}
                      onChange={(e) => setAnnForm({ ...annForm, tag: e.target.value })}
                      placeholder="بطولة رسمية / تحديث / فعاليات"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">الموعد أو التاريخ</label>
                    <input
                      type="text"
                      value={annForm.date}
                      onChange={(e) => setAnnForm({ ...annForm, date: e.target.value })}
                      placeholder="يوم الجمعة 20:00"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">الجائزة (اختياري)</label>
                    <input
                      type="text"
                      value={annForm.reward}
                      onChange={(e) => setAnnForm({ ...annForm, reward: e.target.value })}
                      placeholder="5,000 جوهرة للفريق الفائز"
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">الحالة</label>
                    <select
                      value={annForm.status}
                      onChange={(e) => setAnnForm({ ...annForm, status: e.target.value as 'upcoming' | 'active' | 'ended' })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="active">نشط حالياً</option>
                      <option value="upcoming">قريباً</option>
                      <option value="ended">منتهي</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">تفاصيل المنشور</label>
                    <textarea
                      rows={2}
                      value={annForm.content}
                      onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                      placeholder="اكتب تفاصيل البطولة وقوانين الاشتراك..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  {editingAnnId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAnnId(null);
                        setAnnForm({ title: '', tag: 'بطولة', date: '', content: '', reward: '', status: 'active' });
                      }}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      إلغاء التعديل
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400"
                  >
                    {editingAnnId ? 'تحديث الإعلان' : 'نشر الإعلان'}
                  </button>
                </div>
              </form>

              {/* Announcements List */}
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {ann.tag}
                        </span>
                        <h4 className="text-sm font-bold text-white">{ann.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300">{ann.content}</p>
                      {ann.reward && (
                        <p className="text-xs text-amber-400 font-semibold">🎁 الجائزة: {ann.reward}</p>
                      )}
                      <p className="text-[11px] text-slate-500">{ann.date} • الحالة: {ann.status}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditingAnnId(ann.id);
                          setAnnForm(ann);
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded"
                        title="تعديل"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(ann.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMMENTS & PLAYER BUG REPORTS */}
          {activeTab === 'comments' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">إدارة تعليقات وبلاغات اللاعبين</h3>
                  <p className="text-xs text-slate-400">يمكنك الرد كـ "المطور الرسمي" وتثبيت التعليقات الإيجابية أو حذف المسيئة</p>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comm) => (
                  <div key={comm.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-black"
                          style={{ backgroundColor: comm.avatarColor || '#F59E0B' }}
                        >
                          {comm.avatarInitial}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{comm.authorName}</h4>
                            <span className="text-[11px] text-slate-400 font-mono">{comm.authorTag}</span>
                            {comm.isPinned && (
                              <span className="text-[10px] px-2 py-0.2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded flex items-center gap-1">
                                <Pin className="w-2.5 h-2.5" /> مثبت
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">{comm.createdAt} • تقييم: {comm.rating}⭐</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => togglePinComment(comm.id)}
                          className={`p-1.5 rounded transition-colors ${comm.isPinned ? 'text-amber-400 bg-amber-950/40' : 'text-slate-400 hover:text-white'}`}
                          title="تثبيت"
                        >
                          <Pin className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setReplyingCommentId(comm.id);
                            setReplyInputText(comm.adminReply?.content || '');
                          }}
                          className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-slate-800 rounded"
                          title="رد المطور"
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteComment(comm.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      {comm.content}
                    </p>

                    {/* Official Admin Reply display */}
                    {comm.adminReply && (
                      <div className="mr-4 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-400 flex items-center gap-1.5">
                            👑 {comm.adminReply.authorName} ({comm.adminReply.authorRole})
                          </span>
                          <button
                            onClick={() => deleteAdminReply(comm.id)}
                            className="text-[10px] text-rose-400 hover:underline"
                          >
                            حذف الرد
                          </button>
                        </div>
                        <p className="text-xs text-slate-300">{comm.adminReply.content}</p>
                      </div>
                    )}

                    {/* Reply Input Form */}
                    {replyingCommentId === comm.id && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
                        <label className="block text-[11px] font-bold text-amber-400">
                          كتابة رد رسمي من مطور اللعبة:
                        </label>
                        <textarea
                          rows={2}
                          value={replyInputText}
                          onChange={(e) => setReplyInputText(e.target.value)}
                          placeholder="اكتب ردك للاعب هنا..."
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingCommentId(null)}
                            className="px-3 py-1 text-xs text-slate-400"
                          >
                            إلغاء
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendReply(comm.id)}
                            className="px-4 py-1 text-xs bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400"
                          >
                            إرسال الرد
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RULES */}
          {activeTab === 'rules' && (
            <div className="space-y-6 animate-in fade-in">
              <form onSubmit={handleSaveRule} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <h3 className="text-xs font-bold text-amber-400">
                  {editingRuleId ? 'تعديل القانون' : 'إضافة قانون أو حظر جديد:'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">عنوان القانون</label>
                    <input
                      type="text"
                      value={ruleForm.title}
                      onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })}
                      placeholder="حظر ملفات الهاك والآيم لوك..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">القسم</label>
                    <select
                      value={ruleForm.category}
                      onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value as any })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                    >
                      <option value="anticheat">مكافحة الغش والهاكات</option>
                      <option value="rooms">قوانين الرومات والبطولات</option>
                      <option value="emulator">المحاكي والكمبيوتر</option>
                      <option value="general">قواعد عامة</option>
                    </select>
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">الشرح والعقوبة</label>
                    <textarea
                      rows={2}
                      value={ruleForm.description}
                      onChange={(e) => setRuleForm({ ...ruleForm, description: e.target.value })}
                      placeholder="العقوبة: حظر نهائي للجهاز..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  {editingRuleId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingRuleId(null);
                        setRuleForm({ title: '', description: '', category: 'anticheat' });
                      }}
                      className="px-3 py-1.5 text-xs text-slate-400"
                    >
                      إلغاء
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400"
                  >
                    {editingRuleId ? 'تحديث القانون' : 'إضافة القانون'}
                  </button>
                </div>
              </form>

              <div className="space-y-3">
                {rules.map((rule) => (
                  <div key={rule.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono font-bold">
                          {rule.number}
                        </span>
                        <span>{rule.title}</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 mr-7">{rule.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingRuleId(rule.id);
                          setRuleForm(rule);
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-400 rounded"
                        title="تعديل"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteRule(rule.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 rounded"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PASSWORD & SECURITY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Change Password Card */}
              <div className="p-5 rounded-2xl bg-[#0e1424] border-2 border-amber-500/50 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500 text-black">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">كلمة المرور السرية للوحة التحكم (Admin Master Key)</h3>
                      <p className="text-xs text-slate-400">هذه هي الكلمة الوحيدة التي يمكنك بها فتح لوحة الإدارة. يمكنك تغييرها متى أردت.</p>
                    </div>
                  </div>
                </div>

                {/* Current Password Info */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">كلمة المرور الحالية النشطة:</span>
                    <span className="text-base font-black font-mono text-amber-400 tracking-wider">
                      {adminPin}
                    </span>
                  </div>
                  <button
                    onClick={copyCurrentPin}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                  >
                    {pinCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{pinCopied ? 'تم النسخ!' : 'نسخ الكلمة'}</span>
                  </button>
                </div>

                {/* Change Form */}
                <form onSubmit={handleChangePassword} className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-200">تعيين كلمة مرور جديدة:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        كلمة المرور الجديدة
                      </label>
                      <input
                        type="text"
                        value={newPinInput}
                        onChange={(e) => { setNewPinInput(e.target.value); setPinChangeError(''); }}
                        placeholder="اكتب كلمة مرور جديدة..."
                        className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        تأكيد كلمة المرور الجديدة
                      </label>
                      <input
                        type="text"
                        value={confirmPinInput}
                        onChange={(e) => { setConfirmPinInput(e.target.value); setPinChangeError(''); }}
                        placeholder="أعد كتابة الكلمة للتأكيد..."
                        className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {pinChangeError && (
                    <p className="text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-800">
                      {pinChangeError}
                    </p>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl transition-all shadow-md cursor-pointer"
                    >
                      حفظ كلمة المرور الجديدة
                    </button>
                  </div>
                </form>
              </div>

              {/* Backup & Export / Import */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>النسخ الاحتياطي واستعادة البيانات (Backup & Restore)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Export */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-bold text-slate-200">تصدير نسخة احتياطية (JSON)</h4>
                    <p className="text-[11px] text-slate-400">تحميل كافة بيانات النسخة والرومات والتعليقات كملف نصي للرجوع إليها مستقبلاً.</p>
                    <button
                      onClick={() => {
                        const json = exportDataJson();
                        navigator.clipboard.writeText(json);
                        setCopiedExport(true);
                        setTimeout(() => setCopiedExport(false), 2500);
                      }}
                      className="w-full py-2 text-xs bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 border border-slate-700"
                    >
                      {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedExport ? 'تم نسخ النسخة الاحتياطية!' : 'نسخ ملف النسخة الاحتياطية'}</span>
                    </button>
                  </div>

                  {/* Import */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-bold text-slate-200">استيراد نسخة سابقة</h4>
                    <input
                      type="text"
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      placeholder="الصق كود الـ JSON هنا..."
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                    />
                    <button
                      onClick={() => {
                        if (importText.trim()) {
                          importDataJson(importText.trim());
                          setImportText('');
                        }
                      }}
                      className="w-full py-2 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg border border-amber-500/40"
                    >
                      استعادة البيانات الآن
                    </button>
                  </div>
                </div>

                {/* Reset to Factory Defaults */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-rose-400 font-bold block">إعادة ضبط المصنع (Factory Reset)</span>
                    <span className="text-[11px] text-slate-500">مسح التغييرات والعودة للقيم الافتراضية لفري فاير 2023</span>
                  </div>

                  {confirmReset ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { resetToDefaults(); setConfirmReset(false); }}
                        className="px-3 py-1.5 text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg"
                      >
                        تأكيد المسح
                      </button>
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded-lg"
                      >
                        إلغاء
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmReset(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 rounded-lg"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة التعيين</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
