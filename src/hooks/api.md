# API Reference for useElementSize Hook

`useElementSize` is a custom React hook designed to measure and track the dimensions (width and height) of an HTML element. It's particularly useful for responsive components that need to adjust based on their size or for cases where you need to perform operations based on an element's dimensions.

## Parameters

The hook accepts a single parameter: `defaultSize`, an object with optional `defaultWidth` and `defaultHeight` properties. These are used as initial values before the actual dimensions are determined.

- `defaultSize`: Object containing:
  - `defaultWidth` (number, optional): The default width of the element before actual dimensions are calculated.
  - `defaultHeight` (number, optional): The default height of the element before actual dimensions are calculated.

## Returns

`useElementSize` returns a tuple containing:

1. A ref setter function (`(node: T | null) => void`) that you should assign to the element you wish to measure. This function is used to set the reference to the HTML element whose size you want to track.
2. An object representing the size of the element (`Size`), with the following properties:
   - `width` (number): The current width of the element.
   - `height` (number): The current height of the element.

## Usage

Here's an example of how to use `useElementSize` within a component:

```jsx
import React from 'react';
import { useElementSize } from './useElementSize';

const MyComponent = () => {
  const [ref, size] = useElementSize({ defaultWidth: 100, defaultHeight: 100 });

  return (
    <div ref={ref} style={{ resize: 'both', overflow: 'auto', border: '1px solid black' }}>
      Resize me!
      <div>Width: {size.width}px</div>
      <div>Height: {size.height}px</div>
    </div>
  );
};

export default MyComponent;
```

In this example, `MyComponent` renders a `div` that can be resized. The `useElementSize` hook is used to track the dimensions of this `div`, and the current width and height are displayed inside it. Initially, the hook uses `defaultWidth` and `defaultHeight` for the size, but these values are updated based on the actual size of the `div` once it's rendered and whenever it's resized.

## Notes

- The hook uses a `ResizeObserver` to listen for changes in the dimensions of the target element. This means the size will be updated any time the element's size changes, not just on window resize events.
- It leverages `flushSync` from `react-dom` to ensure state updates are flushed synchronously within the `ResizeObserver` callback. This is to prevent possible layout shifts or inaccuracies in size measurements.