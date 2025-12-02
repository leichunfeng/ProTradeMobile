import React from 'react';
import { Tab } from '../types';
import { TrendingUp, PieChart, List } from 'lucide-react';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => {
    const isActive = activeTab === tab;
    return `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
      isActive ? 'text-trade-accent' : 'text-gray-500 hover:text-gray-300'
    }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-[#141414] border-t border-white/10 z-50 flex items-center justify-around pb- safe-area-bottom">
      <button className={getTabClass(Tab.MARKET)} onClick={() => onTabChange(Tab.MARKET)}>
        <TrendingUp size={22} strokeWidth={activeTab === Tab.MARKET ? 2.5 : 2} />
        <span className="text-[10px] font-medium">盯行情</span>
      </button>
      
      <button className={getTabClass(Tab.SECTOR)} onClick={() => onTabChange(Tab.SECTOR)}>
        <PieChart size={22} strokeWidth={activeTab === Tab.SECTOR ? 2.5 : 2} />
        <span className="text-[10px] font-medium">盯板块</span>
      </button>
      
      <button className={getTabClass(Tab.STOCK)} onClick={() => onTabChange(Tab.STOCK)}>
        <List size={22} strokeWidth={activeTab === Tab.STOCK ? 2.5 : 2} />
        <span className="text-[10px] font-medium">盯股票</span>
      </button>
    </nav>
  );
};

export default BottomNav;