"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSvgPath = void 0;
const distribute_1 = require("../distribute");
const draw_1 = require("../draw");
function getSvgPath({ cornerRadius = 0, topLeftCornerRadius = 0, topRightCornerRadius = 0, bottomRightCornerRadius = 0, bottomLeftCornerRadius = 0, cornerSmoothing, width, height, preserveSmoothing = false, }) {
    topLeftCornerRadius = topLeftCornerRadius !== null && topLeftCornerRadius !== void 0 ? topLeftCornerRadius : cornerRadius;
    topRightCornerRadius = topRightCornerRadius !== null && topRightCornerRadius !== void 0 ? topRightCornerRadius : cornerRadius;
    bottomLeftCornerRadius = bottomLeftCornerRadius !== null && bottomLeftCornerRadius !== void 0 ? bottomLeftCornerRadius : cornerRadius;
    bottomRightCornerRadius = bottomRightCornerRadius !== null && bottomRightCornerRadius !== void 0 ? bottomRightCornerRadius : cornerRadius;
    if (topLeftCornerRadius === topRightCornerRadius &&
        topRightCornerRadius === bottomRightCornerRadius &&
        bottomRightCornerRadius === bottomLeftCornerRadius &&
        bottomLeftCornerRadius === topLeftCornerRadius) {
        const roundingAndSmoothingBudget = Math.min(width, height) / 2;
        const cornerRadius = Math.min(topLeftCornerRadius, roundingAndSmoothingBudget);
        const pathParams = (0, draw_1.getPathParamsForCorner)({
            cornerRadius,
            cornerSmoothing,
            preserveSmoothing,
            roundingAndSmoothingBudget,
        });
        return (0, draw_1.getSVGPathFromPathParams)({
            width,
            height,
            topLeftPathParams: pathParams,
            topRightPathParams: pathParams,
            bottomLeftPathParams: pathParams,
            bottomRightPathParams: pathParams,
        });
    }
    const { topLeft, topRight, bottomLeft, bottomRight } = (0, distribute_1.distributeAndNormalize)({
        topLeftCornerRadius,
        topRightCornerRadius,
        bottomRightCornerRadius,
        bottomLeftCornerRadius,
        width,
        height,
    });
    return (0, draw_1.getSVGPathFromPathParams)({
        width,
        height,
        topLeftPathParams: (0, draw_1.getPathParamsForCorner)({
            cornerSmoothing,
            preserveSmoothing,
            cornerRadius: topLeft.radius,
            roundingAndSmoothingBudget: topLeft.roundingAndSmoothingBudget,
        }),
        topRightPathParams: (0, draw_1.getPathParamsForCorner)({
            cornerSmoothing,
            preserveSmoothing,
            cornerRadius: topRight.radius,
            roundingAndSmoothingBudget: topRight.roundingAndSmoothingBudget,
        }),
        bottomRightPathParams: (0, draw_1.getPathParamsForCorner)({
            cornerSmoothing,
            preserveSmoothing,
            cornerRadius: bottomRight.radius,
            roundingAndSmoothingBudget: bottomRight.roundingAndSmoothingBudget,
        }),
        bottomLeftPathParams: (0, draw_1.getPathParamsForCorner)({
            cornerSmoothing,
            preserveSmoothing,
            cornerRadius: bottomLeft.radius,
            roundingAndSmoothingBudget: bottomLeft.roundingAndSmoothingBudget,
        }),
    });
}
exports.getSvgPath = getSvgPath;
