/**
 * API types
 * TODO: generate API types based on a graphQL schema and query definition
 */

interface Currency {
  Name: string;
  SmartContract?: string; // Optional, as not all currencies have a SmartContract property
}

interface Block {
  Date: string; // ISO string date format
  Time: string; // ISO string timestamp
}

interface Trade {
  Buy: {
    Currency: Currency;
    Price: number;
  };
  Sell: {
    Currency: Currency;
  };
}

export interface TradesData {
  Block: Block;
  Trade: Trade;
}
