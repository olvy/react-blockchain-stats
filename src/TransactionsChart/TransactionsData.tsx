import { useQuery } from '@apollo/client';
import TransactionsChart from './TransactionsChart';
import { CHART_HEIGHT, getMockedTransactions } from './utils';
import { transactionsQuery } from './queries';

export default function TransactionsData() {
  const { data, loading } = useQuery(transactionsQuery, { pollInterval: 30000 })
  
  if (loading) return <>Loading...</>

  // Since this is a test project, it is okay to fallback to mock data
  const transactions = data?.EVM?.Transactions ?? getMockedTransactions();
  return (
      <TransactionsChart data={transactions} height={CHART_HEIGHT} />
  );
}
