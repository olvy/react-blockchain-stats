import { ScaleLinear } from 'd3-scale';
import { useMemo } from 'react';

import { TransactionsGrouped } from '../types';
import { getTransactionsBarParams } from '../utils';
import { TOOLTIP_ID } from './TooltipPortal';

type Props = {
  blockWidth: number;
  x: ScaleLinear<number, number>;
  y: ScaleLinear<number, number>;
  yMax: number;
  data: TransactionsGrouped;
  index: number;
  isHovered: boolean;
  onMouseEnter: (xPosition: number) => void;
  onMouseLeave: () => void;
};

export default function TransactionsBar(props: Props) {
  const { barWidth, gapWidth, height, positionX, positionY } = useMemo(
    () => getTransactionsBarParams(props.x, props.y, props.yMax, props.data, props.blockWidth, props.index),
    [props.x, props.y, props.yMax, props.data, props.blockWidth, props.index]
  );

  return (
    <g transform={`translate(${positionX}, ${positionY})`}>
      {/* Transactions bar  */}
      <rect
        // bar color
        className="fill-indigo-400"
        height={height}
        width={barWidth}
        y={0}
      />
      {/* Dimm overlay  */}
      <rect
        className="fill-black"
        fillOpacity={props.isHovered ? 0.25 : 0}
        height={height}
        width={barWidth}
      />
      {/* Transparant hover overlay  */}
      <rect
        className="fill-transparent"
        height={height}
        onMouseEnter={() => props.onMouseEnter((positionX ?? 0) + barWidth / 2)}
        onMouseLeave={(e) => {
          // Use id to keep tooltip on the screen
          if (e.relatedTarget instanceof Element && e.relatedTarget?.id === TOOLTIP_ID) return;
          props.onMouseLeave();
        }}
        width={barWidth + gapWidth}
      />
    </g>
  );
}
