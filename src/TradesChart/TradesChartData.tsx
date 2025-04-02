import { useQuery } from '@apollo/client';
import { CHART_HEIGHT, getMockedTrades } from './utils';
import { tradesQuery } from './queries';
import { TradesChart } from 'react-components';
import { TradesData } from './types';
import { useMemo } from 'react';

export default function TradesChartData() {
  const { data, loading } = useQuery(tradesQuery)

  const hasData = !!data?.EVM?.DEXTrades;
  const chartTitle = `Historical Trades data for Etherium ${hasData ? '' : '(mocks)'}`
  // Since this is a test project, it is okay to fallback to mock data
  const trades = data?.EVM?.DEXTrades ?? getMockedTrades();
  const sortedTrades = useMemo(() => [...trades.sort((a: TradesData, b: TradesData) => {
    return new Date(a.Block.Time).getTime() - new Date(b.Block.Time).getTime();
  })], [trades])
  
  if (loading) return <div className='h-[200px]'>Loading Trades...</div>

  return (
      <div>
        <div className='font-bold'>{chartTitle}</div>
        <TradesChart data={sortedTrades} height={CHART_HEIGHT} />
      </div>
  );
}
