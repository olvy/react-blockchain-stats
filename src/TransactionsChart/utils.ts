import { ScaleLinear } from 'd3-scale';

import transactionsMock from './transactions-mocks.json';
import { TransactionData, TransactionsGrouped } from './types';

export const CHART_HEIGHT = 182;

export function groupTransactionsByBlockHash(
  transactions: TransactionData[]
): TransactionsGrouped[] {
  const groupedTransactions: TransactionsGrouped[] = [];

  // Map to group by Block.Hash
  const groupsByBlockHash: Record<string, TransactionData[]> = {};

  // Group transactions by Block.Hash
  transactions.forEach((transaction) => {
    const blockHash = transaction.Block.Hash;

    if (!groupsByBlockHash[blockHash]) {
      groupsByBlockHash[blockHash] = [];
    }
    groupsByBlockHash[blockHash].push(transaction);
  });

  // Calculate stats for each group
  Object.keys(groupsByBlockHash).forEach((blockHash) => {
    const group = groupsByBlockHash[blockHash];
    let totalCost = 0;
    let totalCostInUSD = 0;
    let minCost = 0; // To ensure it correctly finds the minimum
    let maxCost = 0; // To ensure it correctly finds the maximum
    let minCostInUSD = 0; // Same as above
    let maxCostInUSD = 0; // Same as above

    group.forEach((transaction) => {
      const cost = parseFloat(transaction.Transaction.Cost);
      const costInUSD = parseFloat(transaction.Transaction.CostInUSD);

      totalCost += cost;
      totalCostInUSD += costInUSD;
      minCost = Math.min(minCost, cost);
      maxCost = Math.max(maxCost, cost);
      minCostInUSD = Math.min(minCostInUSD, costInUSD);
      maxCostInUSD = Math.max(maxCostInUSD, costInUSD);
    });

    const averageCost = totalCost / group.length;
    const averageCostInUSD = totalCostInUSD / group.length;

    groupedTransactions.push({
      group,
      stats: {
        minCost,
        maxCost,
        averageCost,
        minCostInUSD,
        maxCostInUSD,
        averageCostInUSD,
      },
      blockHash,
    });
  });

  // Sort by Block.Time in ascending order (from past to future)
  // Check if this is correct, it is probably already sorted in the backend API.
  groupedTransactions.sort((a, b) => {
    return new Date(a.group[0].Block.Time).getTime() - new Date(b.group[0].Block.Time).getTime();
  });

  return groupedTransactions;
}

/**
 * Get range for domain y.
 * From 0 to max transactions in block.
 */
export const getYDomain = (data: TransactionsGrouped[]): [number, number] => {
  const max = Math.max(...data.map((g) => g.group.length));
  return [0, max ?? 0];
};

const PADDING_FRACTION = 0.3;

export const getYDomainPadded = (yDataMin: number, yDataMax: number) => {
  const yMin = yDataMin;
  const yMax = yDataMax + yDataMax * PADDING_FRACTION;
  const yDomain: [number, number] = [yMin, yMax];
  return { yDomain, yMin, yMax };
};

const BAR_MIN_HEIGHT = 6;
const BAR_GAP_FRACTION = 0.2;

export const getTransactionsBarParams = (
  x: ScaleLinear<number, number>,
  y: ScaleLinear<number, number>,
  yMax: number,
  data: TransactionsGrouped,
  blockWidth: number,
) => {
  // Gap between bars
  const gapWidth = blockWidth * BAR_GAP_FRACTION;
  // Visible bar width
  const barWidth = blockWidth - gapWidth;
  // Bar height
  const value = data.group.length;
  const positionX = x(parseInt(data.group[0].Block.Number, 10));
  const positionY = y(yMax - value);
  let height = y(value);
  if (height < BAR_MIN_HEIGHT) {
    const fraction = BAR_MIN_HEIGHT / value;
    height *= fraction;
  }
  return { barWidth, gapWidth, height, positionX, positionY };
};

export const getMockedTransactions = () => 
  // @ts-expect-error too big to parse
  transactionsMock.EVM.Transactions as TransactionData[];
