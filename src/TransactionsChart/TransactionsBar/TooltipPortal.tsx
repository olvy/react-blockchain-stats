import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export const TOOLTIP_ID = 'TOOLTIP_ID';

type Position = {
  y: number | undefined;
  x: number | undefined;
};

export type Props = {
  content: ReactNode;
  position: Position;
  offsetY?: number;
  onMouseLeave: () => void;
};

export default function TooltipPortal(props: Props) {
  const elementRef = useRef<SVGCircleElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (elementRef.current && width !== 0) {
      const rect = elementRef.current.getBoundingClientRect();
      setX(rect.left + window.scrollX - width / 2);
      setY(rect.top + window.scrollY);
    }
  }, [width, props.position.x]);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    if (tooltipRef.current) ro.observe(tooltipRef.current);
    return () => ro.disconnect();
  }, []);

  const hoverAttrs = {
    cx: props.position.x ?? 0,
    cy: props.position.y ?? 0,
    opacity: 0,
    r: 1,
  };

  if (props.position.x === undefined) return null;

  const portal = ReactDOM.createPortal(
    <div
      ref={tooltipRef}
      className="absolute z-50"
      id={TOOLTIP_ID}
      onMouseLeave={(e) => {
        // Use id to keep tooltip on the screen
        if (e.relatedTarget instanceof Element && e.relatedTarget?.id === TOOLTIP_ID) return;
        props.onMouseLeave();
      }}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        paddingTop: props.offsetY,
        opacity: width === 0 || (!x && !y) ? 0 : 1,
      }}
    >
      <div className="rounded-md bg-blue-50 px-3 py-2 shadow">
        {props.content}
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <circle ref={elementRef} {...hoverAttrs} />
      {portal}
    </>
  );
}
