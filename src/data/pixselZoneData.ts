export interface ChannelItem {
  id: string;
  name: string;
  icon: string;
  type: 'text' | 'voice';
  badge?: string;
  titleArabic: string;
  descriptionArabic: string;
  features: string[];
  statusText: string;
}

export interface CategoryGroup {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  description: string;
  channels: ChannelItem[];
}

export const DISCORD_INVITE_URL = 'https://discord.gg/Qahdywj2Q';
export const PIXSEL_SERVER_LOGO = '/src/assets/images/pixsel_server_logo_1792347966593.jpg';

export const PIXSEL_CATEGORIES: CategoryGroup[] = [
  {
    id: 'auto-quest',
    title: '✨ || AUTO QUEST || ✨',
    titleEn: 'Auto Quest & Token Automation',
    icon: '✨',
    description: 'أقوى أدوات الأوتوميشن وتجميع التوكنات ومشاهدة فيديوهات المكافآت التلقائية بدون تعب وبأمان كامل.',
    channels: [
      {
        id: 'token-video',
        name: 'Token-video-🎬',
        icon: '🎥',
        type: 'text',
        badge: 'الأكثر طلباً',
        titleArabic: 'سيرفر توكنات الفيديوهات والمكافآت (Token Video)',
        descriptionArabic: 'بوتات وسكربتات حصرية لتوليد توكنات الفيديوهات والمكافآت التلقائية داخل اللعبة بنقرة واحدة، لتخطي إعلانات الانتظار وحصد الجوائز الفورية.',
        features: [
          'توليد التوكن التلقائي 24/7',
          'تخطي إعلانات المهام بنقرة زر',
          'حماية كاملة ضد كشف الحسابات (Anti-Ban)',
          'شروحات فيديو خطوة بخطوة داخل الروم',
        ],
        statusText: 'البوت يعمل بكفاءة 100% · تحديث يومي',
      },
      {
        id: 'auto-orbs',
        name: 'Auto-Orbs',
        icon: '⭐',
        type: 'text',
        badge: 'حصري',
        titleArabic: 'نظام جمع كرات الطاقة والـ Orbs الأوتوماتيكي',
        descriptionArabic: 'أداة ذكية لسحب وحصاد كرات الـ Orbs لرفع مستوى الحساب وفتح الصناديق التلقائية وسكنات الأسلحة بأقصى سرعة ممكنة.',
        features: [
          'مزارع Orbs سحابية متواصلة',
          'مزامنة فورية مع حسابك',
          'توزيع عادل للأعضاء النشطين في ديسكورد',
          'إشعارات فورية عند اكتمال الحصاد',
        ],
        statusText: 'تم شحن أكثر من 450,000 كورة Orbs هذا الأسبوع',
      },
      {
        id: 'important',
        name: 'Important',
        icon: '📌',
        type: 'text',
        badge: 'تنبيهات هامة',
        titleArabic: 'قناة الإعلانات والتعليمات الإجبارية (Important)',
        descriptionArabic: 'التنبيهات الإدارية الصارمة، مواعيد صيانة البانلات، تفادي كشف الحسابات عند نزول باتش جديد للعبة، وقواعد استخدام بوتات الأوتو كويست.',
        features: [
          'إشعارات فورية عند نزول أي باتش جديد في اللعبة',
          'توجيهات تفادي الباند وطرق التحديث الصحيحة للبانل',
          'قوانين السيرفر وشروط الحصول على رتب الـ VIP',
          'روابط تحميل النسخ الاحتياطية الرسمية',
        ],
        statusText: 'محدث باستمرار من قِبل إدارة PIXSEL SERVER',
      },
    ],
  },
  {
    id: 'panels',
    title: '⚡ || PANEL ZONE & MAKER || ⚡',
    titleEn: 'Gaming Panels & Optimization',
    icon: '⚡',
    description: 'بانلات احترافية معدلة خصيصاً لتحسين حساسية الهيد شوت، إزالة اللاق، وتثبيت الإيم لجميع المنصات (PC / iOS / Android).',
    channels: [
      {
        id: 'panel-pc',
        name: 'PANEL-PC',
        icon: '⚡',
        type: 'text',
        badge: 'محاكيات PC',
        titleArabic: 'بانل الكمبيوتر للمحاكيات (BlueStacks / MSI / SmartGaGa)',
        descriptionArabic: 'أقوى بانل خارجي لمحاكيات الكمبيوتر: تسريع استجابة الفأرة، تثبيت الـ X و Y، حجب الدروب فريم، وفتح 240 FPS مع حماية الباي باس (Bypass).',
        features: [
          'ضبط محور X و Y بدقة ميكرونية',
          'باي باس لتجنب كشف المحاكي (Emulator Bypass)',
          'ثبات الإيم في المسافات المتوسطة والبعيدة',
          'يعمل على BlueStacks 5 و MSI App Player',
        ],
        statusText: 'الإصدار V4.8 جاهز للتحميل في الديسكورد',
      },
      {
        id: 'panel-ios',
        name: 'PANEL-IOS',
        icon: '⚡',
        type: 'text',
        badge: 'بدون جلبريك',
        titleArabic: 'بانل الآيفون والآيباد (iOS Touch Speed)',
        descriptionArabic: 'أقوى ملفات تكوين DNS وسكربتات شهادات آبل لتحسين سرعة لمس الشاشة وسلاسة سحب الإيم بدون الحاجة لجلبريك وبطرق آمنة.',
        features: [
          'تثبيت سريع عبر ملف تعريف DNS أو Scarlet / ESign',
          'رفع معدل استجابة لمس الشاشة إلى أقصى حد',
          'تقليل حرارة الهاتف واستهلاك البطارية أثناء اللعب',
          'متوافق مع جميع إصدارات iOS 15 حتى iOS 18',
        ],
        statusText: 'يدعم جميع هواتف iPhone و iPad',
      },
      {
        id: 'panel-android',
        name: 'PANEL-ANDROID',
        icon: '⚡',
        type: 'text',
        badge: 'APK أصلي',
        titleArabic: 'بانل الأندرويد وملفات الريجدت (Android Panel APK)',
        descriptionArabic: 'تطبيق بانل أندرويد خفيف وسريع يتوافق مع جميع المعالجات (Snapdragon / MediaTek / Exynos)، ماكرو سحب الشاشة وحساسية الهيد شوت الخارقة.',
        features: [
          'واجهة أندرويد عائمة للتحكم داخل اللعبة',
          'حساسية خاصة ومدروسة لكل طراز هاتف (Samsung / Xiaomi / Realme / Infinix)',
          'منظف الذاكرة ومسرع معالج الرسوميات GPU',
          'بدون روت وبدون أي مخاطر على الحساب',
        ],
        statusText: 'أكثر من 8,200 تحميل نشط من أعضاء السيرفر',
      },
      {
        id: 'maker-zone',
        name: 'MAKER ZONE',
        icon: '🔊',
        type: 'voice',
        badge: 'روم صوتي',
        titleArabic: 'روم المطورين وصناع البانل (Voice Maker Zone)',
        descriptionArabic: 'روم صوتي مباشر يجتمع فيه مطورو سيرفر Pixsel Zone مع الأعضاء لمشاركة شاشات الإعداد، اختبار الحساسيات الجديدة، وحل أي مشكلة تقنية فوراً.',
        features: [
          'بث شاشة ومشاركة إعدادات البانل لايف',
          'مساعدة الأعضاء الجدد في التثبيت والتفعيل',
          'نقاشات حول تحديثات فري فاير القادمة',
        ],
        statusText: 'مفتوح يومياً للأعضاء المسجلين',
      },
    ],
  },
  {
    id: 'apostado-team',
    title: '🗡 || APOSTADO TEAM || 🗡',
    titleEn: 'Competitive Scrims & Tournaments',
    icon: '🗡',
    description: 'فريق Apostado الرسمي لسيرفر Pixsel Zone: أقوى تحديات الـ 4v4، بطولات السكريمات الكبرى، وجداول المباريات الحية مع جوائز مادية وجواهر.',
    channels: [
      {
        id: 'match-times',
        name: 'MATCH-TIMES',
        icon: '🗡',
        type: 'text',
        badge: 'جدول المباريات',
        titleArabic: 'مواعيد وجدول مباريات الـ 4v4 وتحديات السكريمات',
        descriptionArabic: 'الجدول الزمني اليومي لجميع مواجهات فريق Apostado، توقيتات فتح الرومات، بطاقات الآيدي وكلمات المرور للمشاركين المؤكدين.',
        features: [
          'مواعيد الرومات بالدقيقة (توقيت الجزائر / مكة / غرينتش)',
          'نظام تسجيل الفرق التلقائي في الديسكورد',
          'تحديات 4v4 رومات مخصصة ورومات كلاينت',
        ],
        statusText: 'الروم القادمة: اليوم الساعة 21:30 GMT+1',
      },
      {
        id: 'result',
        name: 'RESULT',
        icon: '📋',
        type: 'text',
        badge: 'لوحة النتائج',
        titleArabic: 'سجل النتائج الرسمية ولوحة شرف الفائزين',
        descriptionArabic: 'نشر إحصائيات المباريات المكتملة، صور سكوربورد الرومات، ترتيب الفرق الأكثر فوزاً، وتوزيع جوائز ومكافآت التحدي.',
        features: [
          'لقطات شاشة معتمدة لكل مباراة تنتهي',
          'إحصائيات القتلة و MVP لكل روم',
          'سجل انتصارات فريق Apostado الرسمي',
        ],
        statusText: 'نسبة انتصارات فريق Apostado تجاوزت 88%',
      },
      {
        id: 'test',
        name: 'TEST',
        icon: '🔊',
        type: 'voice',
        badge: 'تجارب أداء',
        titleArabic: 'روم اختبار واختيار اللاعبين الجدد (Tryouts)',
        descriptionArabic: 'روم صوتي مخصص لتقييم المتقدمين الجدد للانضمام إلى كلان وفريق Apostado، حيث يتم إجراء مباريات 1v1 و 4v4 تجريبية لاختيار الأقوى.',
        features: [
          'اختبار دقة الهيد شوت والحركة السريعة',
          'مراقبة اللعب النظيف والتأكد من مهارات اللاعب',
          'ترقية فورية إلى رتبة لاعب رسمي في السيرفر',
        ],
        statusText: 'تجارب الأداء مفتوحة أيام الخميس والجمعة والسبت',
      },
      {
        id: 'show-time',
        name: 'SHOW TIME',
        icon: '🔊',
        type: 'voice',
        badge: 'بث وتعليق حي',
        titleArabic: 'روم البث المباشر والتعليق الحماسي (Show Time)',
        descriptionArabic: 'الروم الصوتي الرئيسي أثناء المباريات الكبرى: استمع للتعليق الصوتي الحماسي، توجيهات قائد الفريق (IGL)، والتفاعل مع الجمهور في البث.',
        features: [
          'صوت عالي النقاء 384kbps بدون تقطيع',
          'حضور كاسترز ومعلقين محترفين من المجتمع العربي',
          'أجواء حماسية وجوائز عشوائية للمستمعين',
        ],
        statusText: 'البث يبدأ قبل انطلاق الروم بـ 15 دقيقة',
      },
    ],
  },
  {
    id: 'banned',
    title: '🛑 || BANNED & RULES || 🛑',
    titleEn: 'Anti-Cheat & Fair Play',
    icon: '🛑',
    description: 'قائمة الحظر الرسمية وقوانين السيرفر لضمان مجتمع نقي ولعب عادل خالٍ من المخادعين.',
    channels: [
      {
        id: 'banned-list',
        name: 'Banned 🛑',
        icon: '🛑',
        type: 'text',
        badge: 'القائمة السوداء',
        titleArabic: 'قائمة المحظورين وسجل مكافحة الغش (Blacklist)',
        descriptionArabic: 'سجل علني يحتوي على أرقام الـ UID وأسماء اللاعبين المحظورين نهائياً من رومات وتحديات سيرفر Pixsel Zone بسبب عدم الالتزام بالقواعد أو استخدام ملفات غير مصرح بها.',
        features: [
          'فحص الـ UID قبل قبول اللاعب في أي روم',
          'حظر فوري لأي لاعب يثبت عليه التلاعب بالنتائج',
          'نظام تبليغ مباشر مع فريق الإدارة',
        ],
        statusText: 'نظام حماية صارم 100% لضمان أمان الأعضاء',
      },
    ],
  },
];

export const RECENT_MATCH_RESULTS = [
  {
    id: 'm1',
    matchTitle: 'APOSTADO TEAM vs OMEGA CLAN',
    format: '4v4 Clash Squad',
    score: '7 - 3',
    winner: 'APOSTADO TEAM',
    date: 'اليوم · 20:00 GMT+1',
    mvp: 'APOSTADO_SNIPER (14 Kills)',
    map: 'Bermuda (Clock Tower)',
  },
  {
    id: 'm2',
    matchTitle: 'APOSTADO TEAM vs FURY SQUAD',
    format: '4v4 Tournament Final',
    score: '7 - 4',
    winner: 'APOSTADO TEAM',
    date: 'أمس · 21:30 GMT+1',
    mvp: 'PIXSEL_RUSHER (11 Kills)',
    map: 'Kalahari (Refinery)',
  },
  {
    id: 'm3',
    matchTitle: 'APOSTADO TEAM vs TITAN ESPORTS',
    format: '4v4 Show Match',
    score: '7 - 2',
    winner: 'APOSTADO TEAM',
    date: '16 أكتوبر · 22:00 GMT+1',
    mvp: 'MAKER_CHIEF (16 Kills)',
    map: 'Purgatory (Brasilia)',
  },
];

export const UPCOMING_MATCH_SCHEDULE = [
  {
    id: 'sch1',
    title: 'APOSTADO TEAM vs RISE ESPORTS',
    format: '4v4 Grand Scrims',
    time: '21:30 GMT+1 (اليوم)',
    roomType: 'روم كود رسمي مع بث صوتي في SHOW TIME',
    status: 'مؤكدة · التسجيل مغلق',
  },
  {
    id: 'sch2',
    title: 'تصفيات السيرفر المفتوحة (All Members)',
    format: 'رومات كلاينت سولو & سكواد',
    time: 'غداً · 20:00 GMT+1',
    roomType: 'متاحة لجميع أعضاء ديسكورد Pixsel Zone',
    status: 'التسجيل مفتوح في ديسكورد',
  },
  {
    id: 'sch3',
    title: 'APOSTADO TRYOUTS · اختبار اللاعبين الجدد',
    format: '1v1 & 4v4 Evaluation',
    time: 'الجمعة القادمة · 19:00 GMT+1',
    roomType: 'في روم TEST الصوتي مع الإدارة',
    status: 'تقديم الطلبات في السيرفر',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'كيف يمكنني الانضمام لسيرفر ديسكورد Pixsel Zone؟',
    a: 'يمكنك الانضمام فوراً ومجاناً عبر الرابط المباشر https://discord.gg/Qahdywj2Q أو بالنقر على زر "انضم إلى الديسكورد" في أي مكان بالموقع.',
  },
  {
    q: 'هل بانلات PC و iOS و Android آمنة وبدون باند؟',
    a: 'نعم، جميع البانلات المعروضة في قنوات PANEL-PC و PANEL-IOS و PANEL-ANDROID مزودة بحماية Bypass وتقنيات Anti-Detect لمنع كشف المحاكي أو التعديلات، ويتم تحديثها باستمرار من قِبل مطوري MAKER ZONE.',
  },
  {
    q: 'ما هي ميزة Auto Quest و Token Video؟',
    a: 'قنوات الأوتو كويست توفر لك بوتات وأدوات أوتوماتيكية لتجميع كرات الـ Orbs وتوليد توكنات الفيديوهات الإعلانية بدون الحاجة للمشاهدة اليدوية، لتستلم مكافآتك في حسابك مباشرة.',
  },
  {
    q: 'كيف يمكنني المشاركة في مباريات وسكريمات فريق Apostado؟',
    a: 'تابع قناة MATCH-TIMES في ديسكورد لمعرفة مواعيد الرومات اليومية، وإذا أردت الانضمام رسمياً كلاعب أساسي، ادخل روم TEST الصوتي أثناء أوقات تجارب الأداء المعلنة.',
  },
];
