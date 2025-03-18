/**
 * API and custom types
 * TODO: generate API types based on a graphQL schema and query definition
 */

interface Block {
  Hash: string;
  Number: string;
  Time: string;
}

interface Transaction {
  Cost: string;
  CostInUSD: string;
  Hash: string;
  Time: string;
}

export interface TransactionData {
  Block: Block;
  Transaction: Transaction;
}

export interface GroupStats {
  minCost: number;
  maxCost: number;
  averageCost: number;
  minCostInUSD: number;
  maxCostInUSD: number;
  averageCostInUSD: number;
}

export interface TransactionsGrouped {
  group: TransactionData[];
  stats: GroupStats;
  blockHash: string;
}
