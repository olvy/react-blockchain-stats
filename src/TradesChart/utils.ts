import tradesMock from './trades-mocks.json';
import { TradesData } from './types';

export const CHART_HEIGHT = 182;

export const getYDomain = (data: TradesData[]): [number, number] => {
  const prices = data.map((d) => d.Trade.Buy.Price);
  return [Math.min(...prices) ?? 0, Math.max(...prices) ?? 0];
};

export const getMockedTrades = () => 
  tradesMock.EVM.DEXTrades as TradesData[];
