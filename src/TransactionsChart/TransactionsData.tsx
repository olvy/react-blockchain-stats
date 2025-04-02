import { useQuery } from '@apollo/client';
import { TransactionsChart } from 'react-components';
import { CHART_HEIGHT, getMockedTransactions } from './utils';
import { transactionsQuery } from './queries';

export default function TransactionsData() {
  const { data, loading } = useQuery(transactionsQuery)
  
  if (loading) return <div className='h-[200px]'>Loading Transactions...</div>

  const hasData = !!data?.EVM?.Transactions;
  const chartTitle = `Number of Etherium transactions grouped by blocks ${hasData ? '' : '(mocks)'}`
  // Since this is a test project, it is okay to fallback to mock data
  const transactions = data?.EVM?.Transactions ?? getMockedTransactions();
  return (
    <div>
      <div className='font-bold'>{chartTitle}</div>
      <TransactionsChart data={transactions} height={CHART_HEIGHT} />
    </div>
  );
}
