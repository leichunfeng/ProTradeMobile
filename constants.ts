import { IndexData, SectorData, StockData } from './types';

// Mock Indices
export const MOCK_INDICES: IndexData[] = [
  { name: '上证指数', value: 3914.01, change: 25.41, changePercent: 0.65 },
  { name: '深证成指', value: 13146.72, change: 162.64, changePercent: 1.25 },
  { name: '创业板指', value: 3092.50, change: 39.91, changePercent: 1.31 },
  { name: '北证50', value: 1408.79, change: 21.09, changePercent: 1.52, tag: '北交所' },
  { name: '科创50', value: 1336.76, change: 9.61, changePercent: 0.72, tag: '科创板' },
  { name: '上证50', value: 2993.68, change: 24.06, changePercent: 0.81, tag: '龙头股' },
  { name: '深证100', value: 5768.01, change: 74.01, changePercent: 1.30, tag: '蓝筹股' },
  { name: '沪深300', value: 4576.49, change: 49.82, changePercent: 1.10, tag: '大盘股' },
  { name: '中证500', value: 7101.83, change: 70.28, changePercent: 1.00, tag: '中小盘' },
  { name: '中证1000', value: 7386.68, change: 52.47, changePercent: 0.72, tag: '小盘股' },
  { name: '国债指数', value: 225.28, change: 0.07, changePercent: 0.03 },
  { name: '企债指数', value: 302.29, change: 0.04, changePercent: 0.01 },
];

// Mock Chart Data for Index Trend
export const MOCK_INDEX_TREND = Array.from({ length: 48 }, (_, i) => {
  const base = 3000;
  const random = Math.random() * 20 - 10;
  return { time: `${9 + Math.floor(i / 12)}:${(i % 12) * 5}`, value: base + random + (i * 0.5) };
});

// Mock Data for Sector Rankings
export const SECTOR_RANKINGS = {
  gainers: [
    { name: '黄金概念', changePercent: 3.91 },
    { name: '通信设备', changePercent: 3.11 },
    { name: '有色金属', changePercent: 3.00 },
  ],
  losers: [
    { name: '养殖业', changePercent: -1.27 },
    { name: '保险', changePercent: -0.56 },
    { name: '农林牧渔', changePercent: -0.39 },
  ]
};

// Mock Data for Net Inflow Bar Chart
export const SECTOR_INFLOW = [
  { name: '物联网', value: 123.89 },
  { name: '高端制造', value: 118.57 },
  { name: 'ESG', value: 109.86 },
  { name: '光伏', value: -46.83 },
  { name: '国企改革', value: -41.02 },
  { name: '光伏设备', value: -30.06 },
];

// Mock Data for Sector Activity Chart
export const SECTOR_ACTIVITY = {
  data: Array.from({ length: 100 }, (_, i) => {
     let val = 3880;
     val += Math.sin(i / 10) * 15 + (i * 0.4) + Math.random() * 5; 
     return { i, value: val };
  }),
  events: [
    { left: 15, top: 45, label: '黄金概念 +5.19%', color: 'red', direction: 'down', height: 40 },
    { left: 38, top: 35, label: '消费电子 -0.25%', color: 'green', direction: 'down', height: 25 },
    { left: 60, top: 55, label: '半导体 +1.07%', color: 'red', direction: 'down', height: 40 },
    { left: 75, top: 25, label: '光刻胶 +3.11%', color: 'red', direction: 'up', height: 30 },
    { left: 88, top: 15, label: '冰雪产业 +1.90%', color: 'red', direction: 'down', height: 50 },
    { left: 45, top: 75, label: 'Kimi 概念 -1.18%', color: 'green', direction: 'up', height: 20 },
  ],
  news: {
    time: '14:30',
    change: 2.42,
    title: '冰雪产业概念短线冲高，冰山冷热涨停'
  }
};

// --- STOCK RANKINGS DATA ---

export interface RankItem {
  name: string;
  code: string;
  price: number;
  changePercent: number;
  // Optional fields for specific tabs
  popularityValue?: string; // e.g. "30.43万"
  speedChange?: number;     // e.g. 1.52 (5min change)
  turnoverRate?: number;    // e.g. 42.78
  premiumRate?: number;     // e.g. 18.39 (for ETF)
}

export const STOCK_RANKINGS_DATA: Record<string, RankItem[]> = {
  '涨幅榜': [
    { name: '豪声电子', code: '920701.BJ', price: 22.64, changePercent: 29.97 },
    { name: '华融化学', code: '301256.SZ', price: 17.21, changePercent: 20.01 },
    { name: '嘉戎技术', code: '301148.SZ', price: 39.64, changePercent: 20.01 },
    { name: '广和通', code: '300638.SZ', price: 32.38, changePercent: 20.01 },
    { name: '昀家科技', code: '688260.SH', price: 51.30, changePercent: 20.00 },
    { name: '贝隆精密', code: '301567.SZ', price: 55.63, changePercent: 20.00 },
  ],
  '跌幅榜': [
    { name: '爱科赛博', code: '688719.SH', price: 39.58, changePercent: -17.28 },
    { name: '惠城环保', code: '300779.SZ', price: 126.00, changePercent: -11.40 },
    { name: '华软科技', code: '002453.SZ', price: 6.83, changePercent: -10.01 },
    { name: '思维列控', code: '603508.SH', price: 27.88, changePercent: -10.01 },
    { name: '海德股份', code: '000567.SZ', price: 6.95, changePercent: -9.97 },
    { name: '汇通集团', code: '603176.SH', price: 6.16, changePercent: -9.94 },
  ],
  '人气榜': [
    { name: '平潭发展', code: '000592.SZ', price: 10.50, changePercent: 5.96, popularityValue: '30.43万' },
    { name: '山子高科', code: '000981.SZ', price: 5.20, changePercent: 7.23, popularityValue: '24.21万' },
    { name: '航天发展', code: '000547.SZ', price: 8.40, changePercent: 9.99, popularityValue: '15.22万' },
    { name: '天际股份', code: '002759.SZ', price: 12.30, changePercent: -5.29, popularityValue: '14.98万' },
    { name: '中兴通讯', code: '000063.SZ', price: 28.50, changePercent: 10.00, popularityValue: '14.15万' },
    { name: '实达集团', code: '600734.SH', price: 13.76, changePercent: 10.04, popularityValue: '13.76万' },
  ],
  '涨速榜': [
    // ChangePercent is set to negative for some items to visually match the user's reference image where prices are green (down) despite positive speed.
    { name: '永信至诚', code: '688244.SH', price: 24.06, changePercent: -0.15, speedChange: 1.52 },
    { name: '播恩集团', code: '001366.SZ', price: 14.21, changePercent: -0.85, speedChange: 1.43 },
    { name: '交大思诺', code: '300851.SZ', price: 28.30, changePercent: 2.50, speedChange: 1.36 },
    { name: '裕兴股份', code: '300305.SZ', price: 6.78, changePercent: 1.80, speedChange: 1.19 },
    { name: '绿地控股', code: '600606.SH', price: 1.72, changePercent: -1.15, speedChange: 1.18 },
    { name: '奥康国际', code: '603001.SH', price: 9.12, changePercent: -0.55, speedChange: 1.11 },
  ],
  '换手率': [
    { name: '贝隆精密', code: '301567.SZ', price: 55.63, changePercent: 20.00, turnoverRate: 42.78 },
    { name: '大鹏工业', code: '920091.BJ', price: 12.40, changePercent: -6.45, turnoverRate: 42.09 },
    { name: '航天环宇', code: '688523.SH', price: 22.30, changePercent: 10.09, turnoverRate: 39.43 },
    { name: '清水源', code: '300437.SZ', price: 15.60, changePercent: 6.40, turnoverRate: 39.32 },
    { name: '四川金顶', code: '600678.SH', price: 8.90, changePercent: 0.54, turnoverRate: 39.19 },
    { name: '海科新源', code: '301292.SZ', price: 38.04, changePercent: -5.63, turnoverRate: 38.04 },
  ]
};

export const ETF_RANKINGS_DATA: Record<string, RankItem[]> = {
  '涨幅榜': [
    { name: '黄金股票ETF基金', code: '159322.SZ', price: 1.627, changePercent: 4.09 },
    { name: '工业有色ETF', code: '560860.SH', price: 1.435, changePercent: 3.99 },
    { name: '物联网ETF南方', code: '159896.SZ', price: 1.126, changePercent: 3.68 },
    { name: '通信设备ETF', code: '159583.SZ', price: 1.130, changePercent: 3.48 },
    { name: '物联网ETF', code: '516330.SH', price: 1.385, changePercent: 3.36 },
    { name: '物联网50ETF', code: '516260.SH', price: 1.201, changePercent: 3.36 },
  ],
  '跌幅榜': [
    { name: '豆粕ETF', code: '159985.SZ', price: 1.973, changePercent: -2.52 },
    { name: '标普生物科技ETF', code: '159502.SZ', price: 1.318, changePercent: -2.30 },
    { name: '日经225ETF易方达', code: '513000.SH', price: 1.821, changePercent: -1.78 },
    { name: '日经ETF', code: '513520.SH', price: 1.828, changePercent: -1.61 },
    { name: '日经225ETF', code: '513880.SH', price: 1.721, changePercent: -1.49 },
    { name: '日经ETF', code: '159866.SZ', price: 1.362, changePercent: -1.45 },
  ],
  '人气榜': [
    { name: '半导体ETF', code: '512480.SH', price: 0.850, changePercent: 1.80, popularityValue: '20.87万' },
    { name: '通信ETF', code: '515880.SH', price: 1.020, changePercent: 2.84, popularityValue: '17.39万' },
    { name: '港股创新药ETF', code: '513120.SH', price: 0.780, changePercent: -0.44, popularityValue: '12.13万' },
    { name: '有色金属ETF', code: '512400.SH', price: 1.150, changePercent: 3.05, popularityValue: '11.81万' },
    { name: '人工智能ETF', code: '159819.SZ', price: 1.250, changePercent: 2.43, popularityValue: '11.52万' },
    { name: '黄金ETF', code: '518880.SH', price: 10.59, changePercent: 1.04, popularityValue: '10.59万' },
  ],
  '涨速榜': [
    { name: '800现金流ETF', code: '563990.SH', price: 1.243, changePercent: 0.57, speedChange: 0.57 },
    { name: '500ETF增强', code: '560950.SH', price: 1.278, changePercent: 0.55, speedChange: 0.55 },
    { name: '畜牧ETF', code: '159867.SZ', price: 0.651, changePercent: -0.46, speedChange: 0.46 }, // Negative changePercent
    { name: '科创100ETF基金', code: '588220.SH', price: 1.304, changePercent: 0.46, speedChange: 0.46 },
    { name: '国证2000指数ETF', code: '159505.SZ', price: 1.408, changePercent: 0.43, speedChange: 0.43 },
    { name: 'ESGETF基金', code: '510090.SH', price: 2.671, changePercent: 0.41, speedChange: 0.41 },
  ],
  '溢价率': [
    { name: '纳指科技ETF', code: '159509.SZ', price: 1.450, changePercent: -0.09, premiumRate: 18.39 },
    { name: '纳指100ETF', code: '159660.SZ', price: 1.320, changePercent: -0.47, premiumRate: 8.32 },
    { name: '纳指ETF', code: '513100.SH', price: 1.280, changePercent: -0.36, premiumRate: 7.58 },
    { name: '标普500ETF', code: '513500.SH', price: 1.540, changePercent: -0.12, premiumRate: 7.30 },
    { name: '纳指100ETF', code: '513390.SH', price: 1.350, changePercent: -0.51, premiumRate: 7.13 },
    { name: '纳指ETF易方达', code: '159696.SZ', price: 1.362, changePercent: -0.45, premiumRate: 6.60 },
  ]
};