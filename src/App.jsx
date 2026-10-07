import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CollectionProvider } from './context/CollectionContext';
import Navbar from './components/Navbar';
import VirtualBinder from './components/VirtualBinder';
import CardCatalog from './components/CardCatalog';
import TradeBoard from './components/TradeBoard';
import CardModal from './components/CardModal';
import VersionModal from './components/VersionModal';
import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import Footer from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState('binder'); // 'binder' | 'catalog' | 'trades'
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-neutral-950 transition-colors duration-200 ${
      isDark ? 'bg-[#090a0f] text-neutral-100' : 'bg-[#f8fafc] text-neutral-900'
    }`}>
      <div>
        {/* Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenVersionModal={() => setIsVersionModalOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
        />

        {/* Main Workspace Views */}
        <main className="transition-all duration-300">
          {activeTab === 'binder' && <VirtualBinder />}
          {activeTab === 'catalog' && <CardCatalog />}
          {activeTab === 'trades' && <TradeBoard />}
        </main>
      </div>

      {/* Global Card Detail Modal */}
      <CardModal />

      {/* Version & SemVer Modal */}
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

      {/* Footer */}
      <Footer onOpenVersionModal={() => setIsVersionModalOpen(true)} />
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
