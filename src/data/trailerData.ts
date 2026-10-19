export interface TrailerScene {
  id: number;
  timeRange: string;
  startSec: number;
  endSec: number;
  title: string;
  tagline: string;
  visualDescription: string;
  audioCues: string;
  cinematography: string;
  imageSrc: string;
}

export const TRAILER_SCENES: TrailerScene[] = [
  {
    id: 1,
    timeRange: "0 - 5s",
    startSec: 0,
    endSec: 5,
    title: "IGNITION & SLAM",
    tagline: "TODAY IS FIRE",
    visualDescription:
      "Black screen, a solitary spark ignites in the darkness. Violent flames explode and big bold white text 'TODAY IS FIRE' slams onto the screen with a glowing skull pulsing fiercely beside it in intense orange and red heat.",
    audioCues:
      "Metallic spark flint click (0.5s), violent sub-bass explosion slam (1.5s), roaring fire blast and pulsing skull hum.",
    cinematography: "Pitch Black Void · Sudden 24fps Strobe Explosion · Screen Impact Shake",
    imageSrc: "/src/assets/images/esports_scene1_fire_skull_1792154592230.jpg",
  },
  {
    id: 2,
    timeRange: "5 - 12s",
    startSec: 5,
    endSec: 12,
    title: "ARENA OF HAVOC",
    tagline: "THE STANDOFF",
    visualDescription:
      "Wide shot of a ruined battle-royale arena at night, embers floating in the air under a stormy apocalyptic sky. Two squads of four players in tactical combat gear walk in slow motion and face each other.",
    audioCues:
      "Low ominous sub-bass drone (55Hz), eerie arena wind howl, slow tactical heartbeat pulses (60 BPM).",
    cinematography: "35mm Anamorphic Wide Shot · 120fps Slow-Mo · Floating Ember Volumetrics",
    imageSrc: "/src/assets/images/esports_scene2_arena_squads_1792154593917.jpg",
  },
  {
    id: 3,
    timeRange: "12 - 20s",
    startSec: 12,
    endSec: 20,
    title: "FAST CUTS & LIGHTNING",
    tagline: "4v4 MATCH – FREE FIRE 2026",
    visualDescription:
      "Rapid tense cuts: focused soldier eyes behind tactical masks, boots grinding on ash and dust, hands gripping rifle gear with knuckles whitening. Blue lightning flash strobes across the battlefield. Bold impact text appears: '4v4 MATCH – FREE FIRE 2026'.",
    audioCues:
      "Rapid whoosh cuts, weapon cocking snap, explosive thunderclap, intense rising tension pitch riser building to a deafening climax at 19.8s.",
    cinematography: "Macro 100mm Quick Cuts · Dynamic Dutch Angles · Blue Strobe Lightning Flash",
    imageSrc: "/src/assets/images/esports_scene3_tense_closeups_1792154594115.jpg",
  },
  {
    id: 4,
    timeRange: "20 - 26s",
    startSec: 20,
    endSec: 26,
    title: "THE CLASH & CHARGE",
    tagline: "FULL SQUAD CLASH",
    visualDescription:
      "Both four-player squads sprint and charge toward each other in dramatic slow motion. Violent camera shake, flying sparks, fiery explosions, thick battle smoke, and intense tactical combat engagement.",
    audioCues:
      "MASSIVE SUB-BASS 808 DROP at 20.0s! Ground-shaking low frequency impact, aggressive combat percussion drive, explosive blast echoes.",
    cinematography: "Ground-Level Low Angle · Violent Impact Camera Shake · Slow Motion Combat Motion Blur",
    imageSrc: "/src/assets/images/esports_scene4_squad_charge_1792154593811.jpg",
  },
  {
    id: 5,
    timeRange: "26 - 30s",
    startSec: 26,
    endSec: 30,
    title: "THE COUNTDOWN",
    tagline: "DON'T BE LATE – 21:30 GMT+1",
    visualDescription:
      "Everything fades to pitch black. A high-contrast glowing holographic countdown clock appears with fire embers, displaying the imperative warning text: 'Don't be late – 21:30 GMT+1'.",
    audioCues:
      "Echoing sub-bass decay, sharp digital tactical countdown beeps ticking each second, final high-pitched confirmation chime.",
    cinematography: "Total Blackout Fade · Glowing Fiery Holographic HUD · Clean Minimalist Typography",
    imageSrc: "/src/assets/images/esports_scene1_fire_skull_1792154592230.jpg",
  },
];

export interface SquadMember {
  name: string;
  role: string;
  kills: number;
  kda: string;
  signatureWeapon: string;
  avatar: string;
}

export const SQUAD_ALPHA: SquadMember[] = [
  { name: "VORTEX_99", role: "IGL / Rusher", kills: 482, kda: "4.8", signatureWeapon: "MP40 Evo Predatory", avatar: "💀" },
  { name: "SHADOW_BLADE", role: "Sniper Specialist", kills: 395, kda: "5.2", signatureWeapon: "AWM Woodpecker", avatar: "🎯" },
  { name: "TITAN_REX", role: "Assault Support", kills: 412, kda: "4.1", signatureWeapon: "M4A1 Flaming Red", avatar: "🛡️" },
  { name: "CYBER_GHOST", role: "Flanker / Scout", kills: 368, kda: "3.9", signatureWeapon: "M1014 Green Flame", avatar: "⚡" },
];

export const SQUAD_OMEGA: SquadMember[] = [
  { name: "INFERNO_KING", role: "IGL / Entry Fragger", kills: 504, kda: "5.1", signatureWeapon: "AK47 Blue Flame Draco", avatar: "🔥" },
  { name: "VIPER_ZERO", role: "Long Range Sniper", kills: 420, kda: "5.4", signatureWeapon: "Barrett M82B", avatar: "🐍" },
  { name: "IRON_CLAD", role: "Breacher / Tank", kills: 388, kda: "4.0", signatureWeapon: "SCAR Megalodon", avatar: "⚔️" },
  { name: "PHANTOM_X", role: "Tactical Grenadier", kills: 375, kda: "4.3", signatureWeapon: "Groza Golden Rule", avatar: "💣" },
];
