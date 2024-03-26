import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { flushSync } from "react-dom";

interface Size {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(
  defaultSize: {
    defaultWidth?: number;
    defaultHeight?: number;
  }
): [(node: T | null) => void, Size] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: defaultSize.defaultWidth ?? 0,
    height: defaultSize.defaultHeight ?? 0,
  });

  // Update size function without flushSync
  const updateSize = useCallback(() => {
    if (ref) {
      const newSize = {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
      };

      if (size.width !== newSize.width || size.height !== newSize.height) {
        setSize(newSize);
      }
    }
  }, [ref, size.width, size.height]);

  useLayoutEffect(() => {
    if (!ref) return;

    const resizeObserver = new ResizeObserver(() => {
      flushSync(() => {
        updateSize();
      });
    });

    resizeObserver.observe(ref);

    return () => resizeObserver.disconnect();
  }, [ref, updateSize]);

  return [setRef, size];
}