# Internal API Reference for distributeAndNormalize Function

The `distributeAndNormalize` function is designed to calculate normalized corner radii and rounding/smoothing budgets for each corner of a rectangle, given its width, height, and corner radii. This is particularly useful for creating shapes with rounded corners that may have different radii and need to maintain visual consistency across different sizes.

## Input Interface

The function accepts a single argument of type `RoundedRectangle`, which consists of:

- `topLeftCornerRadius`, `topRightCornerRadius`, `bottomRightCornerRadius`, `bottomLeftCornerRadius` (number): The radius for each corner of the rectangle.
- `width`, `height` (number): The width and height of the rectangle.

## Output Interface

The function returns an object of type `NormalizedCorners`, which includes:

- `topLeft`, `topRight`, `bottomLeft`, `bottomRight` (`NormalizedCorner`): Objects representing each corner with the following properties:
  - `radius` (number): The normalized radius for the corner.
  - `roundingAndSmoothingBudget` (number): The budget for rounding and smoothing the corner, taking into account adjacent corners and available space.

## Types

### RoundedRectangle

An interface defining the input parameters:

```typescript
interface RoundedRectangle {
  topLeftCornerRadius: number;
  topRightCornerRadius: number;
  bottomRightCornerRadius: number;
  bottomLeftCornerRadius: number;
  width: number;
  height: number;
}
```

### NormalizedCorner

An interface for the normalized properties of a corner:

```typescript
interface NormalizedCorner {
  radius: number;
  roundingAndSmoothingBudget: number;
}
```

### NormalizedCorners

An interface grouping all four corners' normalized properties:

```typescript
interface NormalizedCorners {
  topLeft: NormalizedCorner;
  topRight: NormalizedCorner;
  bottomLeft: NormalizedCorner;
  bottomRight: NormalizedCorner;
}
```

## Function Description

`distributeAndNormalize` processes the given `RoundedRectangle` parameters to distribute the rounding and smoothing budgets among the corners, ensuring that the sum of the radii does not exceed the rectangle's dimensions. This distribution considers the interplay between adjacent corners and allocates space efficiently to maintain the shape's integrity and aesthetic appeal.

The normalization process adjusts each corner's radius and calculates a smoothing budget, allowing for flexible and consistent rendering of shapes with varying corner radii and dimensions.

## Example Usage

```typescript
const rectangle: RoundedRectangle = {
  topLeftCornerRadius: 10,
  topRightCornerRadius: 15,
  bottomRightCornerRadius: 20,
  bottomLeftCornerRadius: 25,
  width: 200,
  height: 100,
};

const normalizedCorners = distributeAndNormalize(rectangle);

console.log(normalizedCorners);
```

In this example, `distributeAndNormalize` takes a `RoundedRectangle` object as input and returns the normalized corner radii and budgets, ensuring that the final shape can be rendered smoothly with the specified constraints.