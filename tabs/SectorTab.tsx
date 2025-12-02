import React from 'react';
import { SECTOR_RANKINGS, SECTOR_INFLOW, SECTOR_ACTIVITY } from '../constants';
import { Layers, Activity, Crosshair, BarChart3 } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis, LabelList, LineChart, Line, CartesianGrid, YAxis } from 'recharts';

const SectorTab: React.FC = () => {
  // Transform data for the Bar Chart:
  // We want all bars to point UP (positive height), but color them differently.
  const inflowChartData = SECTOR_INFLOW.map(item => ({
    ...item,
    // Use absolute value for the height of the bar
    displayValue: Math.abs(item.value),
    // Keep original value for coloring and labeling
    originalValue: item.value
  }));

  return (
    <div className="flex flex-col pb-24 space-y-6">
       <header className="px-4 pt-6 pb-2">
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">盯板块</h1>
       </header>

       {/* Module 1: Rankings (涨跌幅排行) */}
       <section className="px-4">
            <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center">
                    <Layers size={16} className="mr-2 text-trade-accent" />
                    <h2 className="text-sm font-semibold text-white">涨跌幅排行</h2>
                 </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
                {/* Gainers (Row 1) */}
                {SECTOR_RANKINGS.gainers.map((item, idx) => (
                    <div key={`gainer-${idx}`} className="bg-[#fe2d46]/10 rounded-lg p-3 flex flex-col items-center justify-center border border-[#fe2d46]/20 relative overflow-hidden h-20">
                        <span className="text-xs text-gray-200 font-medium mb-1 truncate w-full text-center">{item.name}</span>
                        <span className="text-base font-bold text-trade-up">+{item.changePercent.toFixed(2)}%</span>
                    </div>
                ))}
                
                {/* Losers (Row 2) */}
                {SECTOR_RANKINGS.losers.map((item, idx) => (
                    <div key={`loser-${idx}`} className="bg-[#00b578]/10 rounded-lg p-3 flex flex-col items-center justify-center border border-[#00b578]/20 relative overflow-hidden h-20">
                        <span className="text-xs text-gray-200 font-medium mb-1 truncate w-full text-center">{item.name}</span>
                        <span className="text-base font-bold text-trade-down">{item.changePercent.toFixed(2)}%</span>
                    </div>
                ))}
            </div>
       </section>

       {/* Module 2: Net Inflow (主力净流入排行) */}
       <section className="px-4">
           <div className="flex items-center mb-3">
                 <BarChart3 size={16} className="mr-2 text-trade-accent" />
                 <h2 className="text-sm font-semibold text-white">主力净流入排行</h2>
            </div>
            
            <div className="bg-trade-card p-4 pt-8 rounded-xl border border-white/5 h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inflowChartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#888', fontSize: 10, dy: 5 }} 
                            interval={0}
                        />
                        {/* Use displayValue so bars go Up, but color based on originalValue */}
                        <Bar dataKey="displayValue" radius={[4, 4, 4, 4]}>
                            {inflowChartData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.originalValue > 0 ? '#fe2d46' : '#00b578'} 
                                />
                            ))}
                            <LabelList 
                                dataKey="originalValue" 
                                position="top" 
                                content={(props) => {
                                    const { x, y, width, value } = props;
                                    const val = Number(value);
                                    // Always draw label above the bar since the bar goes up
                                    // Use original value for the text
                                    return (
                                        <text 
                                            x={(x as number) + (width as number) / 2} 
                                            y={(y as number) - 5} 
                                            fill={val > 0 ? '#fe2d46' : '#00b578'} 
                                            textAnchor="middle" 
                                            fontSize={10}
                                            fontWeight="bold"
                                            fontFamily="ui-monospace, monospace"
                                        >
                                            {val.toFixed(2)}亿
                                        </text>
                                    );
                                }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
       </section>

       {/* Module 3: Sector Activity (板块异动) */}
       <section className="px-4">
            <div className="flex items-center mb-3">
                 <Activity size={16} className="mr-2 text-trade-accent" />
                 <h2 className="text-sm font-semibold text-white">板块异动</h2>
            </div>

            <div className="bg-trade-card p-4 rounded-xl border border-white/5 relative overflow-hidden">
                {/* Chart Area */}
                <div className="h-56 w-full relative mb-4">
                     {/* Overlay Events Callouts */}
                     {SECTOR_ACTIVITY.events.map((event, i) => {
                        const isUp = event.direction === 'up';
                        return (
                         <div 
                            key={i} 
                            className="absolute z-10 pointer-events-none"
                            style={{ 
                                left: `${event.left}%`, 
                                top: `${event.top}%` // This anchors the "dot"
                            }}
                         >
                             {/* The Dot on the line */}
                             <div className={`absolute w-1.5 h-1.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${event.color === 'red' ? 'bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.8)]' : 'bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.8)]'}`}></div>

                             {/* The Vertical Line */}
                             <div 
                                className={`absolute w-px transform -translate-x-1/2 ${event.color === 'red' ? 'bg-red-500/40' : 'bg-green-500/40'}`}
                                style={{
                                    height: `${event.height}px`,
                                    // If 'up', the line goes up from the dot (bottom: 0), so we use bottom: 0. 
                                    // If 'down', it goes down from the dot (top: 0).
                                    [isUp ? 'bottom' : 'top']: '0' 
                                }}
                             ></div>

                             {/* The Label Box */}
                             <div 
                                className={`
                                   absolute transform -translate-x-1/2 whitespace-nowrap
                                   text-[10px] px-1.5 py-0.5 rounded border shadow-sm
                                   ${event.color === 'red' 
                                       ? 'bg-red-500/10 border-red-500/50 text-red-100' 
                                       : 'bg-green-500/10 border-green-500/50 text-green-100'}
                                `}
                                style={{
                                    // If 'up', box is at top of line (negative Y). If 'down', box is at bottom of line (positive Y).
                                    // We push it slightly further by the line height
                                    [isUp ? 'bottom' : 'top']: `${event.height}px` 
                                }}
                             >
                                 {event.label}
                             </div>
                         </div>
                        );
                     })}

                     <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={SECTOR_ACTIVITY.data} margin={{ top: 20, bottom: 20, left: 0, right: 0 }}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                             <YAxis 
                                hide 
                                domain={['dataMin - 10', 'dataMax + 10']} 
                             />
                             <YAxis 
                                yAxisId="right" 
                                orientation="right" 
                                domain={['-2', '2']} 
                                axisLine={false} 
                                tickLine={false}
                                tick={{ fill: '#ef4444', fontSize: 10 }}
                                width={30}
                             />
                             <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#2962ff" 
                                strokeWidth={2} 
                                dot={false} 
                                isAnimationActive={false}
                             />
                         </LineChart>
                     </ResponsiveContainer>
                     
                     {/* Y Axis Labels (Static for Price) */}
                     <div className="absolute top-2 left-0 text-[10px] text-trade-up font-mono opacity-80">3914.46</div>
                     <div className="absolute bottom-6 left-0 text-[10px] text-trade-down font-mono opacity-80">3862.73</div>

                     {/* X Axis Labels */}
                     <div className="flex justify-between text-[10px] text-trade-muted mt-1 px-1 font-mono border-t border-white/5 pt-1">
                         <span>09:30</span>
                         <span>11:30/13:00</span>
                         <span>15:00</span>
                     </div>
                </div>

                {/* News Ticker */}
                <div className="flex items-start pt-3 border-t border-white/10 bg-white/[0.02] -mx-4 -mb-4 px-4 py-3 mt-2">
                    <Crosshair size={14} className="text-blue-400 mt-0.5 mr-2 shrink-0 animate-pulse" />
                    <div>
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="font-mono text-xs font-bold text-white opacity-90">{SECTOR_ACTIVITY.news.time}</span>
                            <span className="text-[10px] font-bold text-trade-up bg-trade-up/10 px-1 py-0.5 rounded border border-trade-up/20">+{SECTOR_ACTIVITY.news.change}%</span>
                        </div>
                        <div className="text-xs text-gray-300 leading-normal">
                            {SECTOR_ACTIVITY.news.title}
                        </div>
                    </div>
                </div>
            </div>
       </section>
    </div>
  );
};

export default SectorTab;