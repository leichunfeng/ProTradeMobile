import React, { useState } from 'react';
import { Tab } from './types';
import MarketTab from './tabs/MarketTab';
import SectorTab from './tabs/SectorTab';
import StockTab from './tabs/StockTab';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MARKET);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.MARKET:
        return <MarketTab />;
      case Tab.SECTOR:
        return <SectorTab />;
      case Tab.STOCK:
        return <StockTab />;
      default:
        return <MarketTab />;
    }
  };

  return (
    <div className="min-h-screen bg-trade-bg text-trade-text font-sans antialiased selection:bg-trade-accent selection:text-white max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-white/5">
      {/* 
         We use max-w-md mx-auto to simulate mobile view on desktop, 
         while w-full ensures it takes full width on actual mobile devices.
      */}
      
      <main className="w-full min-h-screen">
        {renderContent()}
      </main>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;