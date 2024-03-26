import * as React from 'react';
import { MotionProps, motion } from "framer-motion";
import { useElementSize } from "../hooks/useElementResize";
import { Slot } from "@radix-ui/react-slot";
import { getSvgPath } from "../utils/getSVGPath";
import { cn } from "../utils/cn";

interface SuperellipseProps<E extends React.ElementType = "div"> extends MotionProps {
	key?: string;
	cornerSmoothing?: number;
	cornerRadius?: number;
	topLeftCornerRadius?: number;
	topRightCornerRadius?: number;
	bottomLeftCornerRadius?: number;
	bottomRightCornerRadius?: number;
	topCornerRadius?: number;
	leftCornerRadius?: number;
	rightCornerRadius?: number;
	bottomCornerRadius?: number;
	asChild?: boolean;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	width?: number;
	height?: number;
	defaultWidth?: number;
	defaultHeight?: number;
	className?: string;
	as?: E;
	onClick?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Superellipse = React.forwardRef(
	<E extends React.ElementType = "div">(
		{
			children,
			cornerRadius = 8,
			cornerSmoothing = 1,
			topLeftCornerRadius,
			topRightCornerRadius,
			bottomLeftCornerRadius,
			bottomRightCornerRadius,
			topCornerRadius,
			leftCornerRadius,
			rightCornerRadius,
			bottomCornerRadius,
			asChild,
			style,
			width: w,
			height: h,
			defaultWidth,
			defaultHeight,
			className,
			onClick,
			onMouseEnter,
			onMouseLeave,
			onMouseDown,
			as: E = "div",
			...props
		}: SuperellipseProps<E>,
		ref: React.Ref<any>,
	) => {
		const Comp = asChild ? Slot : motion.div;

		const [initialized, setInitialized] = React.useState(false);

		const [elementRef, { width, height }] = useElementSize<HTMLDivElement>({
			defaultWidth,
			defaultHeight,
		});

		React.useEffect(() => {
			if (width && height) setInitialized(true);
		}, [width, height]);

		const actualRef = ref || elementRef;

		const actualWidth = w ?? width ?? defaultWidth;
		const actualHeight = h ?? height ?? defaultHeight;

		const path =
			initialized && actualWidth && actualHeight
				? getSvgPath({
					width: actualWidth,
					height: actualHeight,
					topLeftCornerRadius:
						topLeftCornerRadius ??
						topCornerRadius ??
						leftCornerRadius ??
						cornerRadius ??
						0,
					topRightCornerRadius:
						topRightCornerRadius ??
						topCornerRadius ??
						rightCornerRadius ??
						cornerRadius ??
						0,
					bottomLeftCornerRadius:
						bottomLeftCornerRadius ??
						bottomCornerRadius ??
						leftCornerRadius ??
						cornerRadius ??
						0,
					bottomRightCornerRadius:
						bottomRightCornerRadius ??
						bottomCornerRadius ??
						rightCornerRadius ??
						cornerRadius ??
						0,
					cornerSmoothing,
				})
				: "";

		const combinedStyle = {
			...style,
			borderRadius: cornerRadius,
			clipPath: path ? `path('${path}')` : undefined,
			WebkitClipPath: path ? `path('${path}')` : undefined,
		};

		return (
			<Comp
				{...props}
				key={props.key}
				ref={actualRef}
				style={combinedStyle}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onMouseDown={onMouseDown}
				data-squircle={cornerRadius}
				className={cn(className)}
				onClick={onClick}
			>
				{children}
			</Comp>
		);
	},
);

Superellipse.displayName = "Superellipse";

export { Superellipse, type SuperellipseProps };