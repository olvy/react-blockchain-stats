import * as d3 from 'd3';
import { useMemo, useState } from 'react';

import TransactionsBar from './TransactionsBar/TransactionsBar';
import TransactionsBarTooltipContent from './TransactionsBar/TransactionsBarTooltipContent';
import { TransactionData } from './types';
import { getYDomain, getYDomainPadded, groupTransactionsByBlockHash } from './utils';
import useChartSize from './SvgUtils/useChartSize';
import SizeResposiveSVG from './SvgUtils/SizeResposiveSVG';
import TooltipPortal from './TransactionsBar/TooltipPortal';

const DEFAULT_MARGIN = {
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
};

type Props = {
  height: number;
  data: TransactionData[];
};

export default function TransactionsChart(props: Props) {
  const groups = useMemo(() => groupTransactionsByBlockHash(props.data), [props.data]);
  // total x range is from the first block number to the last block number
  const totalXRange = useMemo(() => [0, groups.length - 1], [groups]);

  // Hover
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [hoverX, setHoverX] = useState<number | undefined>(undefined);
  const hoverGroup = groups[hoverIndex];

  // Resizing
  const { ref, dimensions } = useChartSize({ height: props.height });
  const { width } = dimensions;
  const margin = DEFAULT_MARGIN;

  // Bars dimensions
  const blockWidth = Math.floor(width / groups.length) + 2

  // x domain
  const xMin = totalXRange[0];
  const xMax = totalXRange[1];
  const xDomain: [number, number] = [xMin, xMax];
  const xRange: [number, number] = [margin.left, width - margin.right];
  // x scale
  const x = d3.scaleLinear().domain(xDomain).range(xRange);

  // y domain
  const [yDataMin, yDataMax] = useMemo(() => getYDomain(groups), [groups]);
  // Add vertical padding
  const { yDomain, yMax } = useMemo(
    () => getYDomainPadded(yDataMin, yDataMax),
    [yDataMin, yDataMax]
  );
  const yRange: [number, number] = [margin.top, props.height - margin.bottom];
  // y scale
  const y = d3.scaleLinear().domain(yDomain).range(yRange);

  if (!props.data.length) {
    return null; // TODO: #issueNumber empty state placeholder
  }

  return (
    <SizeResposiveSVG ref={ref} dimensions={dimensions}>
      {/* Bars */}
      {groups.map((group, i) => (
        <TransactionsBar
          key={`bar-${group.blockHash}`}
          blockWidth={blockWidth}
          data={group}
          index={i}
          isHovered={hoverIndex !== -1 && hoverIndex !== i}
          onMouseEnter={(xPosition) => {
            setHoverIndex(i);
            setHoverX(xPosition);
          }}
          onMouseLeave={() => {
            setHoverIndex(-1);
            setHoverX(undefined);
          }}
          x={x}
          y={y}
          yMax={yMax}
        />
      ))}
      {/* Hover Tooltip */}
      {hoverGroup && (
        <TooltipPortal
          content={<TransactionsBarTooltipContent data={hoverGroup} />}
          offsetY={10}
          onMouseLeave={() => {
            setHoverIndex(-1);
            setHoverX(undefined);
          }}
          position={{
            x: hoverX,
            y: y(yMax),
          }}
        />
      )}
    </SizeResposiveSVG>
  );
}
