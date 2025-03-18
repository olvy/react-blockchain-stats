import { TransactionsGrouped } from '../types';

type Props = {
  data: TransactionsGrouped;
};

export default function TransactionBarTooltipContent(props: Props) {
  const data = props.data;
  const block = data.group[0]?.Block;
  if (!block) return null; // Check sanity on this
  return (
    <div className="flex flex-col gap-2 min-w-36">
      <div className="-mt-1 text-black">
        <b>{`Block #${block.Number}`}</b>
        <div>{`Time: ${new Date(block.Time).toLocaleString()}`}</div>
        <div>{`Transactions (${data.group.length})`}</div>
        <div>{`Max Tx cost: ${data.stats.maxCost.toFixed(6)} (ETH)`}</div>
        <div>{`Average Tx cost: ${data.stats.averageCost.toFixed(6)} (ETH)`}</div>
      </div>
    </div>
  );
}
