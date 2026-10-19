export interface CommercialScene {
  id: number;
  timeRange: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  duration: number; // in seconds
  titleArabic: string;
  titleEnglish: string;
  visualArabic: string;
  audioArabic: string;
  voiceoverArabic: string;
  voiceoverEnglish: string;
  cameraTechnique: string;
  lightingNotes: string;
  foleySound: string;
  imageSrc: string;
}

export const COMMERCIAL_SCENES: CommercialScene[] = [
  {
    id: 1,
    timeRange: "0:00 - 0:05",
    startTime: 0,
    endTime: 5,
    duration: 5,
    titleArabic: "الغموض والأناقة",
    titleEnglish: "Mystery & Elegance",
    visualArabic:
      "خلفية هادئة باللون الأخضر الملكي الناعم. إضاءة مسرحية خفيفة تركز على حقيبة تسوق فاخرة باللون الأخضر الزيتي الغامق، مع حبال مضفورة بنيّة أنيقة ذات ملمس حريري.",
    audioArabic:
      "موسيقى كلاسيكية هادئة وبسيطة (Minimalist Piano) تمنح شعوراً بالفخامة والهدوء.",
    voiceoverArabic: "بعض التفاصيل لا تُحكى... بل تُلمس.",
    voiceoverEnglish: "Some details are never spoken... they are touched.",
    cameraTechnique: "Master Shot · 35mm Cinematic Lens · Subtle Theatrical Spotlight",
    lightingNotes: "Royal Emerald background fade · 45° Key Light with diffused floor shadow",
    foleySound: "Minimalist Acoustic Piano Chords (Ab - C - Eb)",
    imageSrc: "/src/assets/images/gravity_scene1_hero_1791550566181.jpg",
  },
  {
    id: 2,
    timeRange: "0:06 - 0:12",
    startTime: 5,
    endTime: 12,
    duration: 7,
    titleArabic: "التركيز على التفاصيل",
    titleEnglish: "Focus on Details",
    visualArabic:
      "الكاميرا تقترب لقطة مقربة (Close-up) على شعار 'GRAVITY' المطبوع بأسلوب ناعم وأنيق مع تفاصيل المطبوعات المتميزة. حركة بطيئة تظهر انحناء الحبال الفاخرة وجودة الورق الفاخر المخصص للمجوهرات.",
    audioArabic: "صوت حركة الورق الفاخر الهادئة مع استمرار الموسيقى.",
    voiceoverArabic:
      "لأن قيمتك وتألق مجوهراتك يبدآن من اللحظة الأولى... اختر التصميم الذي يعكس تميّز علاماتك.",
    voiceoverEnglish:
      "Because your distinction and the brilliance of your jewelry begin from the very first moment... Choose the packaging that reflects your brand's prestige.",
    cameraTechnique: "Macro 100mm Close-Up · Slow Motion 60fps Dolly · Shallow Depth of Field",
    lightingNotes: "Glancing foil reflection · Edge illumination on braided brown silk rope",
    foleySound: "Subtle Crisp Art-Paper Rustle + Harmonic Piano Progression",
    imageSrc: "/src/assets/images/gravity_scene2_macro_1791550578624.jpg",
  },
  {
    id: 3,
    timeRange: "0:13 - 0:15",
    startTime: 12,
    endTime: 15,
    duration: 3,
    titleArabic: "الختام والدعوة للتصميم",
    titleEnglish: "The Grand Finale",
    visualArabic:
      "ظهور الشعار والمجسم الكامل للحقيبة في المنتصف بشكل عائم وأنيق، مع ظهور عبارة سينمائية: 'Gravity – Elevate Your Brand'.",
    audioArabic:
      "نهاية موسيقية رخيمة بالبيانو مع صدى مسرحي ناعم يترك انطباعاً استثنائياً.",
    voiceoverArabic: "Gravity – Elevate Your Brand",
    voiceoverEnglish: "Gravity – Elevate Your Brand.",
    cameraTechnique: "Center Floating Hero Shot · Weightless Zero-G Suspension",
    lightingNotes: "Gold Rim Halo Lighting · Ambient Emerald Glow · Floating Gold Dust",
    foleySound: "Resonant Low Octave Sustained Chord & Celestial Decay",
    imageSrc: "/src/assets/images/gravity_scene3_floating_1791550592417.jpg",
  },
];

export interface BagCustomizationState {
  paperColor: "olive" | "emerald" | "obsidian" | "ivory";
  ropeColor: "brown" | "gold" | "champagne" | "forest";
  ropeStyle: "braided" | "ribbon" | "cord";
  foilFinish: "gold" | "roseGold" | "blindDeboss" | "silver";
  customBrandName: string;
  bagSize: "ring" | "necklace" | "parure";
}

export const BAG_SPECIFICATIONS = [
  {
    title: "خامة الورق الفاخر",
    value: "350 GSM Art Board",
    desc: "ورق فني ألماني فاخر مع طبقة Soft-Touch مخملية مقاومة للبصمات والخدوش.",
  },
  {
    title: "الحبال والمقابض",
    value: "Braided Silk Cord",
    desc: "حبال حريرية مضفورة يدوياً باللون البني الملكي بنهايات مخفية وتثبيت آمن.",
  },
  {
    title: "القاعدة المقواة",
    value: "600 GSM Rigid Base",
    desc: "قاعدة سفلية مضاعفة لتحمّل صناديق المجوهرات الثقيلة ومحافظ الساعات الفاخرة.",
  },
  {
    title: "تقنية الطباعة والفويل",
    value: "Hot Foil & 3D Deboss",
    desc: "بصمة حرارية ذهبية بدقة ميكرونية مع حفر غائر ناعم يُبرز تفاصيل شعار علامتك.",
  },
];
