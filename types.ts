export interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  tag?: string;
}

export interface StockData {
  id: string;
  code: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  chartData: { value: number }[];
}

export interface SectorData {
  name: string;
  changePercent: number;
  leadStock: string;
  fundFlow: string;
}

export enum Tab {
  MARKET = 'MARKET',
  SECTOR = 'SECTOR',
  STOCK = 'STOCK'
}