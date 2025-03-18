
import { gql } from "@apollo/client";

export const transactionsQuery = gql`
  query transactionsQuery {
    EVM(network: eth) {
      Transactions(
        limit: {count: 10000, offset: 0}
        orderBy: {ascending: Transaction_Time}
      ) {
        Block {
          Hash
          Time
          Number
        }
        Transaction {
          Time
          Cost
          Hash
          CostInUSD
        }
      }
    }
  }
`;


  