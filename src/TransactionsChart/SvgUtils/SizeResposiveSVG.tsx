import { forwardRef, ReactNode } from 'react';

import { Dimensions } from './useChartSize';

type Props = {
  children: ReactNode;
  dimensions: Dimensions;
};

/**
 * SVG wrapper component with responsive sizing
 */
export default forwardRef<HTMLDivElement, Props>(function SizeResposiveSVG(props, ref) {
  return (
    <div ref={ref} className="h-full w-full">
      <svg height={props.dimensions.height} width={props.dimensions.width}>
        <g
          transform={`translate(${props.dimensions.marginLeft}, ${props.dimensions.marginTop})`}
        >
          {props.children}
        </g>
      </svg>
    </div>
  );
});
