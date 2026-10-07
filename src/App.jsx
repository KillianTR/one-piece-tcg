import React, { useState } from 'react';
import { CollectionProvider } from './context/CollectionContext';
import Navbar from './components/Navbar';
import VirtualBinder from './components/VirtualBinder';
import CardCatalog from './components/CardCatalog';
import TradeBoard from './components/TradeBoard';
import CardModal from './components/CardModal';
import VersionModal from './components/VersionModal';
import Footer from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState('binder'); // 'binder' | 'catalog' | 'trades'
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-amber-500 selection:text-neutral-950">
      <div>
        {/* Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenVersionModal={() => setIsVersionModalOpen(true)}
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

      {/* Footer */}
      <Footer onOpenVersionModal={() => setIsVersionModalOpen(true)} />
    </div>
  );
}

export default function App() {
  return (
    <CollectionProvider>
      <MainApp />
    </CollectionProvider>
  );
}
