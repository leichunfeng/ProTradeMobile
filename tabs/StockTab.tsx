import React, { useState } from 'react';
import { STOCK_RANKINGS_DATA, ETF_RANKINGS_DATA, RankItem } from '../constants';
import { ChevronRight } from 'lucide-react';

// --- Types for the internal component ---
interface RankingModuleProps {
  title: string;
  tabs: string[];
  dataMap: Record<string, RankItem[]>;
  showFilter?: boolean;
  pricePrecision?: number;
}

const RankingModule: React.FC<RankingModuleProps> = ({ 
  title, 
  tabs, 
  dataMap, 
  showFilter = false, 
  pricePrecision = 2 
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const currentData = dataMap[activeTab] || [];

  // Helper to determine columns based on active tab
  const getColumns = () => {
    switch (activeTab) {
      case '涨幅榜':
      case '跌幅榜':
        return { mid: '涨跌幅', right: '最新价', type: 'standard' };
      case '人气榜':
        return { mid: '人气值', right: '涨跌幅', type: 'popularity' };
      case '涨速榜':
        return { mid: '5分钟涨跌幅', right: '最新价', type: 'speed' };
      case '换手率':
        return { mid: '换手率', right: '涨跌幅', type: 'turnover' };
      case '溢价率':
        return { mid: '溢价率', right: '涨跌幅', type: 'premium' };
      default:
        return { mid: '涨跌幅', right: '最新价', type: 'standard' };
    }
  };

  const cols = getColumns();

  const renderMiddleColumn = (item: RankItem) => {
    switch (cols.type) {
      case 'standard':
        return <span className={`font-bold ${item.changePercent >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>{item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%</span>;
      case 'popularity':
        return <span className="font-bold text-white font-mono">{item.popularityValue}</span>;
      case 'speed':
        return <span className={`font-bold ${item.speedChange && item.speedChange >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>{item.speedChange && item.speedChange > 0 ? '+' : ''}{item.speedChange?.toFixed(2)}%</span>;
      case 'turnover':
        return <span className="font-bold text-white font-mono">{item.turnoverRate?.toFixed(2)}%</span>;
      case 'premium':
        return <span className="font-bold text-white font-mono">+{item.premiumRate?.toFixed(2)}%</span>;
      default:
        return null;
    }
  };

  const renderRightColumn = (item: RankItem) => {
     switch (cols.type) {
        case 'standard':
        case 'speed':
            return <span className={`font-mono font-bold ${item.changePercent >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>{item.price.toFixed(pricePrecision)}</span>;
        case 'popularity':
        case 'turnover':
        case 'premium':
            return <span className={`font-mono font-bold ${item.changePercent >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>{item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%</span>;
        default:
            return null;
     }
  };

  return (
    <div className="bg-trade-card rounded-xl p-4 border border-white/5 mb-4">
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      
      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-4 pb-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-trade-muted hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Checkbox (Visual only) */}
      {showFilter && (
         <div className="flex items-center mb-4 ml-1">
            <div className="w-3 h-3 rounded-full border border-trade-muted mr-2"></div>
            <span className="text-xs text-trade-muted">仅展示沪深主板股票 ⓘ</span>
         </div>
      )}
      
      {/* Table Header */}
      <div className="flex text-xs text-trade-muted mb-2 px-1">
          <div className="w-[40%] text-left">名称</div>
          <div className="w-[30%] text-right">{cols.mid}</div>
          <div className="w-[30%] text-right">{cols.right}</div>
      </div>

      {/* Table List */}
      <div className="space-y-4">
          {currentData.map((item, idx) => (
             <div key={idx} className="flex items-center px-1">
                 {/* Name / Code */}
                 <div className="w-[40%] text-left">
                     <div className="text-sm font-bold text-gray-200">{item.name}</div>
                     <div className="flex items-center mt-0.5">
                        {item.code.startsWith('科') && <span className="text-[9px] text-blue-400 mr-1">科</span>}
                        <span className="text-xs text-trade-muted font-mono">{item.code}</span>
                     </div>
                 </div>
                 
                 {/* Middle Col */}
                 <div className="w-[30%] text-right text-sm">
                    {renderMiddleColumn(item)}
                 </div>

                 {/* Right Col */}
                 <div className="w-[30%] text-right text-sm">
                    {renderRightColumn(item)}
                 </div>
             </div>
          ))}
      </div>

      {/* Footer Link */}
      <div className="mt-5 flex justify-center">
          <button className="text-xs text-trade-muted flex items-center hover:text-white transition-colors">
              查看更多排行 <ChevronRight size={12} className="ml-0.5" />
          </button>
      </div>
    </div>
  );
};

const StockTab: React.FC = () => {
  return (
    <div className="flex flex-col pb-24">
       {/* Page Title */}
       <header className="px-4 pt-6 pb-2 mb-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">盯股票</h1>
       </header>

       <div className="px-4">
           <RankingModule 
              title="股票排行"
              tabs={['涨幅榜', '跌幅榜', '人气榜', '涨速榜', '换手率']}
              dataMap={STOCK_RANKINGS_DATA}
              showFilter={true}
              pricePrecision={2}
           />

           <RankingModule 
              title="ETF排行"
              tabs={['涨幅榜', '跌幅榜', '人气榜', '涨速榜', '溢价率']}
              dataMap={ETF_RANKINGS_DATA}
              showFilter={true}
              pricePrecision={3}
           />
       </div>
    </div>
  );
};

export default StockTab;