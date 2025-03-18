import { useEffect, useRef, useState } from 'react';

export type Dimensions = {
  width: number;
  height: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

type Args = {
  width?: number;
  height?: number;
};

const DefaultMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
}

/**
 * Helper hook for subscribing to window resize events
 */
export default function useChartSize(args: Args) {
  const settings = { ...DefaultMargin, ...args }
  const ref = useRef(null);

  // container size
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (settings.width && settings.height) return;
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;
      const { contentRect } = entries[0];
      if (width !== contentRect.width) setWidth(contentRect.width);
      if (height !== contentRect.height) setHeight(contentRect.height);
    });

    resizeObserver.observe(element);
    return () => {
      resizeObserver.unobserve(element);
    };
  });

  const dimensions: Dimensions = {
    width,
    height,
    ...settings,
  };

  return { ref, dimensions };
};
