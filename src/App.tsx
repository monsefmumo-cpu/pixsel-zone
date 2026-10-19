import React, { useState } from 'react';
import { PixselNavbar } from './components/PixselNavbar';
import { PixselHero } from './components/PixselHero';
import { DiscordExplorer } from './components/DiscordExplorer';
import { PanelsShowcase } from './components/PanelsShowcase';
import { AutoQuestSection } from './components/AutoQuestSection';
import { ApostadoTeamSection } from './components/ApostadoTeamSection';
import { BannedListSection } from './components/BannedListSection';
import { PixselFAQ } from './components/PixselFAQ';
import { PixselFooter } from './components/PixselFooter';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#00f2fe] selection:text-black">
      {/* 1. Premier Top Navigation Bar */}
      <PixselNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Experience Flow */}
      <main className="flex-1">
        {/* 2. Hero Section with Glowing Pixsel Zone Emblem & Stats */}
        <PixselHero
          onExploreClick={() => handleNavigate('discord-explorer')}
          onNavigateToPanels={() => handleNavigate('panels')}
        />

        {/* 3. Discord Channels Explorer (Direct mapping to user screenshots) */}
        <DiscordExplorer />

        {/* 4. Gaming Panels (PC / iOS / Android / Maker Zone) */}
        <PanelsShowcase />

        {/* 5. Auto Quest & Token Automation (Token-video & Auto-Orbs) */}
        <AutoQuestSection />

        {/* 6. Apostado Team (Match-Times, Result, Test, Show Time) */}
        <ApostadoTeamSection />

        {/* 7. Banned List & Anti-Cheat Fair Play Verifier */}
        <BannedListSection />

        {/* 8. Frequently Asked Questions & Grand Discord CTA */}
        <PixselFAQ />
      </main>

      {/* 9. Brand Footer */}
      <PixselFooter
        onNavigate={handleNavigate}
      />
    </div>
  );
}
