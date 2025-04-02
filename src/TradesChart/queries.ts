
import { gql } from "@apollo/client";

export const tradesQuery = gql`
  query tradesQuery {
    EVM(dataset: archive, network: eth) {
      DEXTrades(
        limitBy: {by: Block_Date, count: 1}
        limit: {count: 100}
        orderBy: {descending: Block_Date}
        where: {Trade: {Buy: {Currency: {SmartContract: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}}}, Sell: {Currency: {SmartContract: {is: "0xdac17f958d2ee523a2206206994597c13d831ec7"}}}}}
      ) {
        Trade {
          Buy {
            Price
            Currency {
              SmartContract
              Name
            }
          }
          Sell {
            Currency {
              Name
            }
          }
        }
        Block {
          Date
          Time
        }
      }
    }
  }
`;
  