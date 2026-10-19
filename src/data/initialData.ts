import { 
  ServerInfo, 
  ServerRole, 
  CommunityComment, 
  ServerAnnouncement, 
  ServerRule,
  GameDownloadInfo,
  LiveRoomInfo,
  RedeemCode,
  PlayerSkinItem,
  PlayerAccount,
  BanLogEntry,
  GameServerConfig
} from '../types';

export const initialServerInfo: ServerInfo = {
  name: "Free Fire 2023",
  nameEn: "Free Fire Nostalgia 2023 Edition",
  tagline: "النسخة الأسطورية لسنة 2023 | خوادم كلاسيكية، حركات سريعة، وبوياه نقية بدون لاق",
  description: "المشروع العربي المخصص لعشاق العصر الذهبي للعبة فري فاير (نسخ 2023 OB38/OB39). استمتع بخرائط برمودا الأصلية، توازن الأسلحة القديم، رومات يومية وبطولات كلاش سكواد وجوائز حقيقية.",
  fullStory: "تم بناء وتطوير هذه النسخة الخاصة من فري فاير 2023 لإعادة تجربة اللعب الحقيقية التي افتقدها الملايين بعد التحديثات المعقدة. تتميز النسخة بوزن خفيف، أداء ثابت 60 إلى 90 إطار في الثانية حتى على الهواتف الضعيفة، إزالة التقطيع واللاق، إرجاع ضرر دبل شوتجن M1887 وسلاح MP40 الأصلي، وسرعة تبديل القناصة AWM. نقدم لكم خوادم محلية فائقة السرعة مع نظام حماية صارم ضد أي برامج غش.",
  discordInviteUrl: "https://discord.gg/m6etCxgUX",
  whatsappGroupUrl: "https://chat.whatsapp.com/freefire2023",
  telegramChannelUrl: "https://t.me/freefire2023_dz",
  youtubeUrl: "https://youtube.com/@freefire2023",
  onlinePlayers: 2840,
  totalDownloads: 43200,
  serverPing: "24ms",
  serverRegion: "شمال إفريقيا والشرق الأوسط (MENA)",
  bannerImage: "/src/assets/images/ff_2023_hero_1791392867260.jpg",
  logoImage: "/src/assets/images/ff_2023_logo_1791392883025.jpg",
  featuredFeatures: [
    "خفة فائقة وتعمل بسلاسة على أجهزة 2GB RAM",
    "توازن أسلحة 2023 الأصلي (M1887 و MP40 القديم)",
    "رومات كلاش سكواد وبيرمودا كلاسيك بدون لاق",
    "نظام حماية ضد ملفات الهاك والهيدشوت الزائف",
    "حفظ حسابك وتقدمك وسكناتك النادرة مجاناً"
  ]
};

export const initialDownloadInfo: GameDownloadInfo = {
  apkUrl: "https://mediafire.com/download/freefire_2023_nostalgia_v1.99.apk",
  obbUrl: "https://mediafire.com/download/main.2023.com.dts.freefireth.obb",
  pcEmulatorUrl: "https://bluestacks.com/download/ff2023_optimized_config",
  version: "OB39 v1.99.4 (2023 Stable)",
  apkSize: "465 MB",
  obbSize: "730 MB",
  lastUpdated: "أكتوبر 2023 (إصدار الحنين المستقر)",
  downloadCount: 43200,
  isMaintenance: false,
  maintenanceMessage: "السيرفر يعمل الآن بأعلى كفاءة. انضم للرومات واستمتع باللعب!",
  requireDiscordJoin: true,
  discordInviteUrl: "https://discord.gg/m6etCxgUX"
};

export const initialLiveRoom: LiveRoomInfo = {
  isActive: true,
  roomId: "8472910",
  roomPassword: "2023",
  mode: "كلاش سكواد 4v4 (بيرمودا كلاسيك)",
  hostName: "المطور MUMO",
  notes: "ممنوع قنابل الدخان والجل المحشور - اللعب النظيف فقط!",
  startedAt: "الآن مباشر"
};

export const initialRedeemCodes: RedeemCode[] = [
  {
    id: "code_1",
    code: "BOOYAH2023",
    reward: "1,500 جوهرة + سكن كوبرا MP40 لفل ماكس",
    usesLeft: 240,
    isActive: true,
    expiresAt: "متاح الآن"
  },
  {
    id: "code_2",
    code: "ALOK-CLASSIC",
    reward: "شخصية ألوك 2023 الأصلية + بدلة الهيب هوب",
    usesLeft: 180,
    isActive: true,
    expiresAt: "متاح الآن"
  },
  {
    id: "code_3",
    code: "SAKURA2023",
    reward: "حزمة الساكورا الكلاسيكية + رقصة العرش",
    usesLeft: 95,
    isActive: true,
    expiresAt: "متاح الآن"
  }
];

export const initialRoles: ServerRole[] = [
  {
    id: "role_developer",
    name: "🔥 مطور النسخة والمالك (Lead Developer)",
    nameEn: "Founder & Game Dev",
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.15)",
    borderColor: "#F59E0B",
    badge: "👑",
    order: 1,
    description: "صاحب المشروع ومطور ملفات وخوادم فري فاير 2023. يملك الصلاحيات الكاملة لإدارة السيرفر وتوزيع التحديثات والتحكم في اللعبة.",
    permissions: [
      "التحكم الكامل بلوحة إدارة السيرفر والتحديثات",
      "تعديل روابط تحميل الـ APK والـ OBB والمحاكي",
      "بث الرومات الحية وتوزيع أكواد الجواهر والهدايا",
      "تفعيل وضع الصيانة وإيقاف الخوادم للطوارئ"
    ],
    howToGet: "رتبة حصرية لمالك ومطور النسخة (محمية برمز المرور السري).",
    memberCount: 1,
    isSpecial: true
  },
  {
    id: "role_anticheat",
    name: "🛡️ فريق مكافحة الغش (Anti-Cheat Officer)",
    nameEn: "Anti-Cheat Guard",
    color: "#EF4444",
    bgColor: "rgba(239, 68, 68, 0.15)",
    borderColor: "#EF4444",
    badge: "🛡️",
    order: 2,
    description: "فريق المراقبة الميدانية المسؤول عن فحص ملفات اللاعبين وتتبع بلاغات الهاكات والآيم لوك والحظر المباشر من الرومات.",
    permissions: [
      "مراجعة لقطات وفيديوهات البلاغات",
      "حظر اللاعبين المخالفين لسياسة اللعب النظيف",
      "مراقبة استقرار الخوادم والبينغ في المباريات",
      "الإشراف على نزاهة البطولات والجوائز"
    ],
    howToGet: "اختيار من المطور بناءً على الخبرة في كشف برامج التعديل والملفات.",
    memberCount: 4,
    isSpecial: true
  },
  {
    id: "role_tournament",
    name: "🏆 منظم البطولات والرومات (Scrims Host)",
    nameEn: "Tournament Referee",
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.15)",
    borderColor: "#8B5CF6",
    badge: "🏆",
    order: 3,
    description: "المسؤول عن فتح الرومات المخصصة اليومية (4v4 وسولو وسكواد) وإدارة جداول السكريمات وتوزيع الجوائز على الفائزين.",
    permissions: [
      "فتح وتنسيق الرومات التنافسية الرسمية",
      "تسجيل الفرق المشاركة بالبطولات",
      "إعلان كود وكلمة سر الرومات في الموقع",
      "توثيق نتائج المباريات والسكورات"
    ],
    howToGet: "تقديم طلب إشراف الرومات وإثبات الالتزام اليومي.",
    memberCount: 6
  },
  {
    id: "role_grandmaster",
    name: "⭐ أساطير السيرفر (Grandmaster 2023)",
    nameEn: "Grandmaster Veteran",
    color: "#EC4899",
    bgColor: "rgba(236, 72, 153, 0.15)",
    borderColor: "#EC4899",
    badge: "⭐",
    order: 4,
    description: "النخبة من اللاعبين الذين حققوا أعلى نقاط في الرومات المصنفة وسيرفر كلاش سكواد 2023.",
    permissions: [
      "أولوية الدخول إلى رومات VIP والبطولات المغلقة",
      "شارات تمييز في الشات ومجتمع اللاعبين",
      "المشاركة في تجربة التحديثات والأسلحة التجريبية",
      "صوت في التصويت على التعديلات القادمة للأسلحة"
    ],
    howToGet: "الفوز بـ 15 روم كلاش سكواد رسمي أو تصدر ترتيب نقاط السيزون.",
    memberCount: 28
  },
  {
    id: "role_player",
    name: "⚡ مقاتل البوياه (Active Survivor)",
    nameEn: "Community Survivor",
    color: "#06B6D4",
    bgColor: "rgba(6, 182, 212, 0.15)",
    borderColor: "#06B6D4",
    badge: "⚡",
    order: 5,
    description: "جميع لاعبي النسخة المحملين للعبة والمتفاعلين في الرومات والتعليقات.",
    permissions: [
      "تحميل كافة ملفات اللعبة والباتشات مجاناً",
      "الدخول إلى الرومات العامة المفتوحة",
      "إرسال الاقتراحات والبلاغات في الموقع",
      "المطالبة بأكواد الهدايا الشهرية"
    ],
    howToGet: "تحميل اللعبة وتثبيتها والانضمام إلى مجتمع اللاعبين.",
    memberCount: 2840
  }
];

export const initialComments: CommunityComment[] = [
  {
    id: "comm_1",
    authorName: "سفيان الجزائري",
    authorTag: "FF-ID: 71928410",
    avatarColor: "#F59E0B",
    avatarInitial: "س",
    rating: 5,
    category: "review",
    content: "أقسم بالله أفضل نسخة فري فاير لعبتها من 2023! الشوتجن M1887 يدمج صح وسرعة الون تاب خرافية بدون أي تقطيع على هاتف ريلمي 6. الله يعطيك الصحة خويا على الخدمة النقية.",
    createdAt: "منذ ساعتين",
    likes: 42,
    isPinned: true,
    adminReply: {
      id: "reply_1",
      authorName: "مطور فري فاير 2023",
      authorRole: "إدارة وتطوير النسخة",
      content: "شكراً خويا سفيان على دعمك! التحديث القادم فيه استقرار أكثر للأندرويد 12 و13 مع بطولات كلاش سكواد أسبوعية، متعة البوياه الحقيقية رجعت!",
      createdAt: "منذ ساعة"
    }
  },
  {
    id: "comm_2",
    authorName: "عمر كينغ (Omar_Pro)",
    authorTag: "FF-ID: 99401283",
    avatarColor: "#EF4444",
    avatarInitial: "ع",
    rating: 5,
    category: "scrim",
    content: "يا مطور الروم اللي فتحتو اليوم في فاكتوري كان أسطوري بزاف! متى بطولة الـ 4v4 القادمة باش نسجل تيمي؟",
    createdAt: "منذ 4 ساعات",
    likes: 27,
    isPinned: false,
    adminReply: {
      id: "reply_2",
      authorName: "إدارة الرومات والبطولات",
      authorRole: "منظم الفعاليات",
      content: "البطولة يوم الجمعة القادم الساعة 20:00 بتوقيت الجزائر/تونس. التسجيل مجاني للكل والجوائز 5000 جوهرة للتيم الفائز!",
      createdAt: "منذ 3 ساعات"
    }
  },
  {
    id: "comm_3",
    authorName: "كريم تي إكس",
    authorTag: "FF-ID: 55192840",
    avatarColor: "#8B5CF6",
    avatarInitial: "ك",
    rating: 4,
    category: "suggestion",
    content: "هل تقدر تضيف خيار لتغيير صوت إطلاق النار لسلاح AK47 للدراكو الأصلي؟ أيضاً حركة الـ AWM سريعة جداً ما شاء الله.",
    createdAt: "منذ 6 ساعات",
    likes: 19,
    isPinned: false,
    adminReply: null
  },
  {
    id: "comm_4",
    authorName: "أحمد بن عيسى",
    authorTag: "FF-ID: 61849201",
    avatarColor: "#10B981",
    avatarInitial: "أ",
    rating: 5,
    category: "review",
    content: "جربت اللعبة على المحاكي BlueStacks وضبطت إعدادات الهيدشوت، السلاسة لا تقارن بالنسخة الحالية الثقيلة، 90 فريم حقيقي بدون دروب!",
    createdAt: "منذ يوم واحد",
    likes: 35,
    isPinned: false,
    adminReply: null
  }
];

export const initialAnnouncements: ServerAnnouncement[] = [
  {
    id: "ann_1",
    title: "🏆 بطولة كلاش سكواد 2023 الكبرى (جائزة 10,000 جوهرة)",
    tag: "بطولة رسمية",
    date: "هذا الأسبوع",
    content: "انطلاق أول بطولة رسمية لنسخة فري فاير 2023 بنظام 4v4 بدون أسلحة قنابل وبدون دروع لفل 4. التسجيل مفتوح لجميع التيمات عبر ديسكورد والموقع.",
    reward: "10,000 جوهرة + رتبة أساطير السيرفر",
    status: "active",
    participantsCount: 32
  },
  {
    id: "ann_2",
    title: "⚡ تحديث استقرار البينغ وحل مشكلة تحميل ملف OBB",
    tag: "تحديث تقني",
    date: "أمس",
    content: "تم تحسين مسار ملفات OBB للأندرويد 11 و12 و13 وتوفير رابط مباشر من ميديافاير بدون إعلانات مزعجة. كما تم خفض البينغ في دول شمال إفريقيا لـ 20-35ms.",
    reward: "كود هدايا تعويضي لجميع اللاعبين",
    status: "active",
    participantsCount: 1400
  },
  {
    id: "ann_3",
    title: "🎁 توزيع سكن كوبرا MP40 وريش الملاك الكلاسيكي",
    tag: "هدايا وأكواد",
    date: "قريباً",
    content: "بمناسبة وصول عدد التحميلات إلى أكثر من 40 ألف لاعب، سيتم إطلاق أكواد استبدال حصرية لسكنات 2023 النادرة لجميع اللاعبين المسجلين في الموقع.",
    reward: "سكنات نادرة مجانية",
    status: "upcoming",
    participantsCount: 850
  }
];

export const initialRules: ServerRule[] = [
  {
    id: "rule_1",
    number: 1,
    title: "الحظر الصارم لملفات الهاك والـ Regedit والـ Aimlock",
    description: "أي لاعب يستعمل برامج أو ملفات تعديل على اللعبة مثل كشف الأماكن (Antenna/ESP) أو الآيمبوت سيتعرض لحظر فوري ونهائي لجهازه ولـ ID حسابه.",
    category: "anticheat"
  },
  {
    id: "rule_2",
    number: 2,
    title: "قوانين رومات كلاش سكواد الكلاسيكية 4v4",
    description: "ممنوع استخدام القنابل اليدوية الدخانية أو قنابل الفلاش، وممنوع تخريب الجل (الوقوف وراء الجل أثناء إعادة التعبئة مسموح بدون حبس الخصم)، اللعب النظيف بروح رياضية.",
    category: "rooms"
  },
  {
    id: "rule_3",
    number: 3,
    title: "تنظيم لاعبي المحاكي (PC) مقابل الهواتف (Mobile)",
    description: "في البطولات الرسمية يتم فصل لاعبي الكمبيوتر والمحاكي عن لاعبي الهواتف لضمان التكافؤ والعدالة التامة بين جميع المتنافسين.",
    category: "emulator"
  },
  {
    id: "rule_4",
    number: 4,
    title: "الاحترام المتبادل في الشات والرومات الصوتية",
    description: "يمنع منعاً باتاً السب والشتم أو الاستفزاز الطائفي والعنصري. نحن مجتمع ألعاب يجمع اللاعبين في بيئة تنافسية راقية وأخوية.",
    category: "general"
  },
  {
    id: "rule_5",
    number: 5,
    title: "عدم بيع أو شراء الحسابات خارج الإشراف الرسمي",
    description: "إدارة النسخة غير مسؤولة عن أي عمليات نصب أو تبادل حسابات تجري في قنوات غير رسمية، حافظ على أمان جهازك وحسابك الشخصي.",
    category: "general"
  }
];

export const initialAvailableSkins: PlayerSkinItem[] = [
  {
    id: "skin_mp40_cobra",
    name: "سكن MP40 الكوبرا المفترسة (Lv.7 Max)",
    category: "weapon",
    rarity: "mythic",
    icon: "🐍",
    description: "أقوى سكن إيفو لسلاح MP40 مع سرعة إطلاق نار مضاعفة وتأثير الرصاص الناري الأسطوري لعام 2023."
  },
  {
    id: "skin_ak_draco",
    name: "سكن AK47 التنين الأزرق (Draco Flame)",
    category: "weapon",
    rarity: "mythic",
    icon: "🐉",
    description: "سكن الداركو الأصلي مع أجنحة اللهب الأزرق وضرر مضاعف على الدروع."
  },
  {
    id: "skin_m1887_onepunch",
    name: "دبل شوتجن M1887 وان بنش مان (One Punch)",
    category: "weapon",
    rarity: "mythic",
    icon: "🥊",
    description: "سكن الشوتجن الأصفر الأكثر طلباً في تاريخ اللعبة مع سرعة تعبئة خارقة وميزة الون تاب الفوري."
  },
  {
    id: "skin_m1887_rapper",
    name: "دبل شوتجن M1887 رابر اندر وورلد (Rapper Violet)",
    category: "weapon",
    rarity: "legendary",
    icon: "🔮",
    description: "شوتجن الرابر البنفسجي الكلاسيكي المفضل لأساطير السيرفر ورومات فاكتوري."
  },
  {
    id: "skin_criminal_red",
    name: "حزمة الكرمنال الأحمر (Top Criminal Red)",
    category: "bundle",
    rarity: "mythic",
    icon: "👺",
    description: "أندر حزمة في فري فاير على الإطلاق، بدلة المهرج الأحمر الكلاسيكية لعام 2023."
  },
  {
    id: "skin_criminal_blue",
    name: "حزمة الكرمنال الأزرق (Top Criminal Blue)",
    category: "bundle",
    rarity: "legendary",
    icon: "🎭",
    description: "حزمة النخبة الزرقاء الكلاسيكية مع شارة الهيبة في اللوبي والرومات."
  },
  {
    id: "skin_sakura_s1",
    name: "حزمة الساكورا السيزون 1 الأصلية (Sakura S1)",
    category: "bundle",
    rarity: "mythic",
    icon: "🌸",
    description: "حزمة أساطير الفاير باس الأول مع قناع الساموراي الكلاسيكي."
  },
  {
    id: "skin_hiphop_s2",
    name: "حزمة الهيب هوب السيزون 2 (Hip Hop S2)",
    category: "bundle",
    rarity: "mythic",
    icon: "🧢",
    description: "بدلة الهيب هوب الشهيرة مع النظارات والسترة الكلاسيكية النادرة."
  },
  {
    id: "skin_emote_throne",
    name: "رقصة العرش الملكي الأصلية (Royal Throne)",
    category: "emote",
    rarity: "legendary",
    icon: "👑",
    description: "الجلوس على العرش الذهبي الناري بعد تحقيق البوياه في الروم."
  },
  {
    id: "skin_emote_lol",
    name: "رقصة الضحكة الكلاسيكية (LOL Emote)",
    category: "emote",
    rarity: "rare",
    icon: "😂",
    description: "رقصة الاستفزاز والاحتفال الكلاسيكية الأكثر استخداماً في رومات 1v1."
  },
  {
    id: "skin_emote_cobra",
    name: "رقصة الكوبرا التفاعلية (Cobra Stance)",
    category: "emote",
    rarity: "legendary",
    icon: "🐍",
    description: "استدعاء دراجة الكوبرا والوقوف عليها وسط اللوبي."
  },
  {
    id: "skin_gloowall_angelic",
    name: "جدار الجل ريش الملاك الأبيض (Angelic Wall)",
    category: "gloo_wall",
    rarity: "legendary",
    icon: "🪽",
    description: "جل الحماية النادر مع أجنحة الملاك البيضاء وسرعة نشر عالية."
  }
];

export const initialPlayers: PlayerAccount[] = [
  {
    id: "player_1",
    playerId: "71928410",
    nickname: "MUMO_LEAD_DEV",
    level: 78,
    rank: "Grandmaster 2023",
    diamonds: 45000,
    gold: 185000,
    deviceModel: "ROG Phone 6 (165Hz)",
    ipAddress: "105.101.42.18 (الجزائر)",
    isBanned: false,
    ownedSkins: [
      "skin_mp40_cobra",
      "skin_ak_draco",
      "skin_m1887_onepunch",
      "skin_criminal_red",
      "skin_sakura_s1",
      "skin_emote_throne",
      "skin_emote_lol",
      "skin_gloowall_angelic"
    ],
    suspicionScore: 0,
    createdAt: "2023-01-10",
    lastLogin: "الآن (متصل)"
  },
  {
    id: "player_2",
    playerId: "81920381",
    nickname: "DZ_Sniper_Pro",
    level: 68,
    rank: "Heroic (35 Stars)",
    diamonds: 2400,
    gold: 42000,
    deviceModel: "Poco X3 Pro (90Hz)",
    ipAddress: "105.109.12.94 (وهران)",
    isBanned: false,
    ownedSkins: [
      "skin_mp40_cobra",
      "skin_m1887_rapper",
      "skin_criminal_blue",
      "skin_emote_lol"
    ],
    suspicionScore: 12,
    createdAt: "2023-02-14",
    lastLogin: "منذ 15 دقيقة"
  },
  {
    id: "player_3",
    playerId: "55192840",
    nickname: "Karim_OneTap",
    level: 61,
    rank: "Diamond IV",
    diamonds: 850,
    gold: 19000,
    deviceModel: "Samsung Galaxy A52",
    ipAddress: "41.107.88.21 (قسنطينة)",
    isBanned: false,
    ownedSkins: [
      "skin_m1887_onepunch",
      "skin_emote_throne"
    ],
    suspicionScore: 5,
    createdAt: "2023-04-02",
    lastLogin: "منذ ساعتين"
  },
  {
    id: "player_4",
    playerId: "99401283",
    nickname: "Hack_AimLock_99",
    level: 44,
    rank: "Platinum I",
    diamonds: 0,
    gold: 3200,
    deviceModel: "Emulated BlueStacks 4",
    ipAddress: "197.112.5.88 (محظور)",
    isBanned: true,
    banReason: "استخدام ملفات تعديل الآيم لوك (Aimlock Regedit) + شوتجن تلقائي",
    banType: "permanent",
    bannedAt: "2023-10-06 18:22",
    bannedBy: "نظام الحماية التلقائي / المطور MUMO",
    ownedSkins: [],
    suspicionScore: 98,
    createdAt: "2023-09-28",
    lastLogin: "محظور من الدخول"
  },
  {
    id: "player_5",
    playerId: "33819204",
    nickname: "Toxico_Bermuda",
    level: 52,
    rank: "Diamond II",
    diamonds: 120,
    gold: 8400,
    deviceModel: "Redmi Note 9",
    ipAddress: "154.121.74.19",
    isBanned: true,
    banReason: "تخريب رومات كلاش سكواد الرسمية والسب في الشات الصوتي",
    banType: "temporary",
    bannedAt: "2023-10-05 21:10",
    bannedBy: "مشرف الرومات",
    ownedSkins: ["skin_emote_lol"],
    suspicionScore: 45,
    createdAt: "2023-05-18",
    lastLogin: "محظور مؤقتاً (متبقي 2 يوم)"
  }
];

export const initialBanLogs: BanLogEntry[] = [
  {
    id: "log_1",
    playerId: "99401283",
    playerNickname: "Hack_AimLock_99",
    action: "ban",
    reason: "استخدام ملفات تعديل الآيم لوك (Aimlock Regedit) + شوتجن تلقائي",
    adminName: "المطور MUMO",
    timestamp: "2023-10-06 18:22"
  },
  {
    id: "log_2",
    playerId: "33819204",
    playerNickname: "Toxico_Bermuda",
    action: "ban",
    reason: "تخريب رومات كلاش سكواد والسب في الشات الصوتي",
    adminName: "مشرف الرومات",
    timestamp: "2023-10-05 21:10"
  },
  {
    id: "log_3",
    playerId: "81920381",
    playerNickname: "DZ_Sniper_Pro",
    action: "unban",
    reason: "تمت مراجعة البلاغ والتأكد من خلو ملفات اللعبة من الهاك - فك الحظر",
    adminName: "فريق مكافحة الغش",
    timestamp: "2023-10-04 14:05"
  }
];

export const initialGameServerConfig: GameServerConfig = {
  versionBuild: "OB39.2023.DZ_PRO_BUILD",
  m1887DamageMultiplier: 1.45,
  mp40FireRateMultiplier: 1.25,
  awmQuickSwitchEnabled: true,
  antiCheatSensitivity: "strict",
  broadcastMessage: "مرحباً بكم في سيرفر فري فاير 2023! الروم القادم الساعة 20:00 بتوقيت الجزائر.",
  broadcastActive: true
};

