import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CollectionProvider } from './context/CollectionContext';
import { Bug } from 'lucide-react';
import Navbar from './components/Navbar';
import VirtualBinder from './components/VirtualBinder';
import CardCatalog from './components/CardCatalog';
import TradeBoard from './components/TradeBoard';
import CardModal from './components/CardModal';
import ChangelogView from './components/ChangelogView';
import VersionModal from './components/VersionModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import BugReportModal from './components/BugReportModal';
import Footer from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#changelog') {
      return 'changelog';
    }
    return 'binder';
  });
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isBugModalOpen, setIsBugModalOpen] = useState(false);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  // Sync with browser hash #changelog
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#changelog') {
        setActiveTab('changelog');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'changelog') {
      window.location.hash = '#changelog';
    } else if (window.location.hash === '#changelog') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-neutral-950 transition-colors duration-200 ${
      isDark ? 'bg-[#090a0f] text-neutral-100' : 'bg-[#f8fafc] text-neutral-900'
    }`}>
      <div>
        {/* Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          onOpenVersionModal={() => handleTabChange('changelog')}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />

        {/* Main Workspace Views */}
        <main className="transition-all duration-300">
          {activeTab === 'binder' && <VirtualBinder />}
          {activeTab === 'catalog' && <CardCatalog />}
          {activeTab === 'trades' && <TradeBoard />}
          {activeTab === 'changelog' && <ChangelogView onBack={() => handleTabChange('binder')} />}
        </main>
      </div>

      {/* Global Card Detail Modal */}
      <CardModal />

      {/* Version & SemVer Modal (Quick view) */}
      <VersionModal 
        isOpen={isVersionModalOpen} 
        onClose={() => setIsVersionModalOpen(false)} 
      />

      {/* Supabase Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* User Profile Customization Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />

      {/* Bug Report Modal */}
      <BugReportModal 
        isOpen={isBugModalOpen} 
        onClose={() => setIsBugModalOpen(false)} 
      />

      {/* Floating "Report a Bug" Action Button (OPlayTCG style) */}
      <div className="fixed bottom-4 right-4 z-40 print:hidden">
        <button
          onClick={() => setIsBugModalOpen(true)}
          aria-label={t('bugReportButton')}
          title={t('bugReportButton')}
          className={`flex items-center gap-2 rounded-full border shadow-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-pointer backdrop-blur-md group ${
            isDark 
              ? 'bg-neutral-900/95 border-neutral-700/80 text-neutral-300 hover:text-white hover:border-amber-500/80 shadow-black/50' 
              : 'bg-white/95 border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-amber-500 shadow-neutral-400/30'
          }`}
        >
          <Bug className="w-4 h-4 text-amber-500 transition-transform group-hover:rotate-12 group-hover:scale-110" />
          <span className="hidden sm:inline font-bold">{t('bugReportButton')}</span>
        </button>
      </div>

      {/* Footer */}
      <Footer 
        onOpenVersionModal={() => handleTabChange('changelog')} 
        onOpenBugReport={() => setIsBugModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <CollectionProvider>
            <MainApp />
          </CollectionProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
