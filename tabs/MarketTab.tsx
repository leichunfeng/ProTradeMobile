import React, { useState } from 'react';
import { MOCK_INDICES } from '../constants';
import { PercentChange, PriceDisplay } from '../components/Formatters';
import { ArrowUpRight, ArrowDownRight, Activity, BarChart2, Thermometer, ChevronDown, ChevronUp, CircleDollarSign, TrendingUp } from 'lucide-react';

const MarketTab: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col space-y-4 pb-24">
      {/* Header */}
      <header className="px-4 pt-6 pb-2">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">盯行情</h1>
            <div className="flex items-center space-x-2 text-xs text-trade-muted bg-trade-card px-2 py-1 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>交易中 星期一 2024/05/20</span>
            </div>
        </div>

        {/* Module Title: Market Thermometer */}
        <div className="flex items-center mb-3">
             <Thermometer size={16} className="mr-2 text-trade-accent" />
             <h2 className="text-sm font-semibold text-white">市场温度计</h2>
        </div>

        {/* Market Thermometer Card */}
        <div className="bg-trade-card p-4 rounded-xl border border-white/5 mb-6 shadow-sm">
            <div className="flex justify-between items-end mb-3">
                <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white tracking-tighter">65</span>
                    <span className="text-xl text-trade-muted ml-0.5 font-normal">°C</span>
                    <span className="text-sm text-trade-up ml-3 font-bold">微热</span>
                </div>
                <div className="text-xs text-trade-text mb-1.5 opacity-80">
                    中证全指大涨，多数股票都在涨
                </div>
            </div>

            <div className="relative pt-1 pb-1">
                {/* Marker Wrapper - Positioned based on percentage (65%) */}
                <div className="absolute -top-1 transform -translate-x-1/2 transition-all duration-1000" style={{ left: '65%' }}>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-trade-up mx-auto drop-shadow-sm"></div>
                </div>

                {/* Gradient Bar */}
                <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-blue-500 via-yellow-200 to-red-600 opacity-90"></div>

                {/* Axis Labels */}
                <div className="flex justify-between text-[10px] text-trade-muted mt-1.5 font-mono">
                    <span>0°</span>
                    <span>100°</span>
                </div>
            </div>
        </div>

        {/* Module Title: Real-time Quotes */}
        <div className="flex items-center justify-between mb-3">
             <div className="flex items-center">
                 <BarChart2 size={16} className="mr-2 text-trade-accent" />
                 <h2 className="text-sm font-semibold text-white">实时行情</h2>
             </div>
             <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-xs text-trade-muted px-2 py-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
             >
                {isExpanded ? (
                    <>收起 <ChevronUp size={12} className="ml-1" /></>
                ) : (
                    <>展开 <ChevronDown size={12} className="ml-1" /></>
                )}
             </button>
        </div>

        {/* Major Indices Cards */}
        <div className={
            isExpanded 
            ? "grid grid-cols-3 gap-2" // Expanded: Back to 3 cols
            : "flex overflow-x-auto space-x-2 pb-2 no-scrollbar snap-x" // Collapsed: Horizontal scroll
        }>
          {MOCK_INDICES.map((index) => (
            <div 
                key={index.name} 
                className={`bg-trade-card p-2 py-3 rounded-lg flex flex-col items-center justify-center border border-white/5 shadow-sm relative transition-all ${
                    !isExpanded ? 'min-w-[28%] flex-shrink-0 snap-start' : '' // Collapsed: ~3.5 items visible
                }`}
            >
              <div className="flex items-center justify-center space-x-1 mb-1 w-full">
                  <span className="text-[11px] text-trade-muted truncate max-w-[70%]">
                      {index.name}
                  </span>
                  {index.tag && (
                      <span className="text-[9px] px-1 py-0.5 rounded bg-white/10 text-trade-muted transform scale-90 origin-left border border-white/10">
                          {index.tag}
                      </span>
                  )}
              </div>
              
              <PriceDisplay value={index.value} change={index.changePercent} color className="text-base font-bold" />
              
              <div className="flex items-center justify-center space-x-1 mt-1 w-full flex-wrap">
                 <span className={`text-[10px] ${index.change >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
                    {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}
                 </span>
                 <PercentChange value={index.changePercent} className="text-[10px]" />
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Market Breadth / Up-Down Distribution */}
      <section className="mx-4 mt-2">
         <div className="flex items-center justify-between mb-3">
             <h2 className="text-sm font-semibold text-white flex items-center">
                <Activity size={16} className="mr-2 text-trade-accent" />
                涨跌分布
            </h2>
         </div>
         
         <div className="bg-trade-card p-4 rounded-xl border border-white/5">
            <div className="flex justify-between text-xs mb-2">
                <span className="text-trade-up font-bold flex items-center"><ArrowUpRight size={14} className="mr-1"/> 涨 3205 家</span>
                <span className="text-trade-muted">平 182 家</span>
                <span className="text-trade-down font-bold flex items-center">跌 1420 家 <ArrowDownRight size={14} className="ml-1"/></span>
            </div>
            {/* Visual Bar */}
            <div className="h-2 w-full flex rounded-full overflow-hidden bg-gray-800">
                <div className="h-full bg-trade-up" style={{ width: '65%' }}></div>
                <div className="h-full bg-gray-600" style={{ width: '5%' }}></div>
                <div className="h-full bg-trade-down" style={{ width: '30%' }}></div>
            </div>
            
            <div className="mt-4 grid grid-cols-5 gap-1 text-center text-[10px] text-trade-muted">
                <div>涨停<br/><span className="text-trade-up font-bold text-xs">45</span></div>
                <div>+5%<br/><span className="text-trade-up">120</span></div>
                <div>0%<br/><span className="text-white">182</span></div>
                <div>-5%<br/><span className="text-trade-down">56</span></div>
                <div>跌停<br/><span className="text-trade-down font-bold text-xs">8</span></div>
            </div>
         </div>
      </section>

      {/* Fund Flow / Capital Trends */}
      <section className="mx-4">
         <div className="flex items-center mb-3">
             <CircleDollarSign size={16} className="mr-2 text-trade-accent" />
             <h2 className="text-sm font-semibold text-white">资金动向</h2>
         </div>

         <div className="grid grid-cols-3 gap-2">
            {/* Card 1: Main Force Funds */}
            <div className="bg-trade-card p-3 rounded-xl border border-white/5 relative h-28">
                <div className="flex flex-col items-start h-full relative z-10">
                    <span className="text-[10px] text-trade-muted mb-auto">主力资金</span>
                    <span className="text-sm font-bold text-white mb-0.5">净流出</span>
                    <span className="text-lg font-mono font-bold text-trade-down leading-none mb-1">-2.84亿</span>
                    <span className="text-[10px] text-trade-muted mt-auto">净流入</span>
                </div>
                
                {/* Visual: Gauge */}
                <div className="absolute bottom-4 right-2 w-10 h-10 opacity-90">
                   <svg viewBox="0 0 36 18" className="w-full h-full">
                       <path d="M2 16 A 14 14 0 0 1 34 16" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                       <path d="M2 16 A 14 14 0 0 1 12 6" fill="none" stroke="#fe2d46" strokeWidth="4" strokeLinecap="round" />
                       <path d="M12 6 A 14 14 0 0 1 24 6" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
                       <path d="M24 6 A 14 14 0 0 1 34 16" fill="none" stroke="#00b578" strokeWidth="4" strokeLinecap="round" />
                   </svg>
                </div>
            </div>

            {/* Card 2: Turnover */}
            <div className="bg-trade-card p-3 rounded-xl border border-white/5 flex flex-col justify-between h-28 relative">
                 <div>
                    <p className="text-[10px] text-trade-muted mb-1">成交额</p>
                    <div className="flex items-center space-x-1 mb-1">
                         <span className="text-[10px] text-trade-text">较上一日</span>
                         <span className="text-xs font-bold text-trade-up">+18%</span>
                    </div>
                    <p className="text-base font-mono font-bold text-white leading-none">18739亿</p>
                    <p className="text-[10px] text-trade-muted mt-0.5 opacity-80">两市成交额</p>
                </div>
                
                {/* Visual: Bar Chart */}
                <div className="absolute bottom-3 right-3 flex items-end space-x-0.5">
                    <div className="w-1.5 h-3 bg-trade-muted opacity-30 rounded-t-sm"></div>
                    <div className="w-1.5 h-5 bg-trade-muted opacity-50 rounded-t-sm"></div>
                    <div className="w-1.5 h-7 bg-trade-up rounded-t-sm"></div>
                    <ArrowUpRight size={10} className="text-trade-up absolute -top-3 -right-1" />
                </div>
            </div>

            {/* Card 3: Size Comparison */}
            <div className="bg-trade-card p-3 rounded-xl border border-white/5 flex flex-col justify-between h-28">
                 <div>
                    <p className="text-[10px] text-trade-muted mb-1">大小盘对比</p>
                    <p className="text-sm font-bold text-white leading-tight mt-1">大盘股领涨</p>
                </div>

                {/* Visual: Squares */}
                <div className="flex items-end justify-between px-1 mt-2">
                    <div className="flex flex-col items-center">
                         <div className="w-6 h-6 bg-trade-up rounded-sm shadow-sm shadow-red-900/50"></div>
                         <span className="text-[8px] text-trade-muted mt-1 transform scale-90">大</span>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="w-5 h-5 bg-trade-up opacity-80 rounded-sm"></div>
                         <span className="text-[8px] text-trade-muted mt-1 transform scale-90">中</span>
                    </div>
                    <div className="flex flex-col items-center">
                         <div className="w-4 h-4 bg-trade-up opacity-60 rounded-sm"></div>
                         <span className="text-[8px] text-trade-muted mt-1 transform scale-90">小</span>
                    </div>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default MarketTab;