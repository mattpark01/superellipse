# API Reference for Superellipse

The `Superellipse` component allows you to apply a superellipse (also known as squircle) mask to any React component, giving it rounded corners with a smooth transition between the sides and the corners, similar to Apple's iOS icons. This guide details the props available for the `Superellipse` component.

## Props

The component accepts the following props:

- `children`: The ReactNode(s) that you want to wrap with the superellipse shape. This can be any valid React element or component.
- `cornerRadius` (number): The radius of the corners. Default is `8`.
- `cornerSmoothing` (number): The smoothness of the corners. It adjusts how pronounced the superellipse effect is. Default is `1`.
- `topLeftCornerRadius`, `topRightCornerRadius`, `bottomLeftCornerRadius`, `bottomRightCornerRadius` (number): Specific corner radius values for each corner. This allows for asymmetric shapes.
- `topCornerRadius`, `leftCornerRadius`, `rightCornerRadius`, `bottomCornerRadius` (number): Specific corner radius values for each side. These provide more control than individual corner radii.
- `asChild` (boolean): If true, the component uses `Slot` from `@radix-ui/react-slot` instead of a div. This is useful for applying the superellipse effect directly to a child component without adding extra DOM elements.
- `style` (CSSProperties): Custom CSS styles to apply to the component.
- `width`, `height` (number): Explicit width and height for the component. If not provided, the component tries to infer these from its content or defaults.
- `defaultWidth`, `defaultHeight` (number): Fallback width and height if the actual dimensions cannot be determined.
- `className` (string): Custom className to apply to the component.
- `as` (ElementType): The component type to render as. Defaults to `"div"`.
- `onClick`, `onMouseEnter`, `onMouseLeave`, `onMouseDown`, `onDragStart`: Event handlers for corresponding mouse events.

## Example Usage

```jsx
import React from 'react';
import { Superellipse } from 'superellipse';

const MyComponent = () => (
  <Superellipse cornerRadius={10} cornerSmoothing={0.6} style={{ backgroundColor: 'royalblue' }}>
    <div style={{ padding: '20px', color: 'white' }}>Hello, Superellipse!</div>
  </Superellipse>
);

export default MyComponent;
