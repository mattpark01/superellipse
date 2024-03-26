"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distributeAndNormalize = void 0;
function distributeAndNormalize({ topLeftCornerRadius, topRightCornerRadius, bottomRightCornerRadius, bottomLeftCornerRadius, width, height, }) {
    const roundingAndSmoothingBudgetMap = {
        topLeft: -1,
        topRight: -1,
        bottomLeft: -1,
        bottomRight: -1,
    };
    const cornerRadiusMap = {
        topLeft: topLeftCornerRadius,
        topRight: topRightCornerRadius,
        bottomLeft: bottomLeftCornerRadius,
        bottomRight: bottomRightCornerRadius,
    };
    Object.entries(cornerRadiusMap)
        // Let the bigger corners choose first
        .sort(([, radius1], [, radius2]) => {
        return radius2 - radius1;
    })
        .forEach(([cornerName, radius]) => {
        const corner = cornerName;
        const adjacents = adjacentsByCorner[corner];
        // Look at the 2 adjacent sides, figure out how much space we can have on both sides,
        // then take the smaller one
        const budget = Math.min(...adjacents.map((adjacent) => {
            const adjacentCornerRadius = cornerRadiusMap[adjacent.corner];
            if (radius === 0 && adjacentCornerRadius === 0) {
                return 0;
            }
            const adjacentCornerBudget = roundingAndSmoothingBudgetMap[adjacent.corner];
            const sideLength = adjacent.side === "top" || adjacent.side === "bottom"
                ? width
                : height;
            // If the adjacent corner's already been given the rounding and smoothing budget,
            // we'll just take the rest
            if (adjacentCornerBudget >= 0) {
                return sideLength - roundingAndSmoothingBudgetMap[adjacent.corner];
            }
            else {
                return (radius / (radius + adjacentCornerRadius)) * sideLength;
            }
        }));
        roundingAndSmoothingBudgetMap[corner] = budget;
        cornerRadiusMap[corner] = Math.min(radius, budget);
    });
    return {
        topLeft: {
            radius: cornerRadiusMap.topLeft,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topLeft,
        },
        topRight: {
            radius: cornerRadiusMap.topRight,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.topRight,
        },
        bottomLeft: {
            radius: cornerRadiusMap.bottomLeft,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomLeft,
        },
        bottomRight: {
            radius: cornerRadiusMap.bottomRight,
            roundingAndSmoothingBudget: roundingAndSmoothingBudgetMap.bottomRight,
        },
    };
}
exports.distributeAndNormalize = distributeAndNormalize;
const adjacentsByCorner = {
    topLeft: [
        {
            corner: "topRight",
            side: "top",
        },
        {
            corner: "bottomLeft",
            side: "left",
        },
    ],
    topRight: [
        {
            corner: "topLeft",
            side: "top",
        },
        {
            corner: "bottomRight",
            side: "right",
        },
    ],
    bottomLeft: [
        {
            corner: "bottomRight",
            side: "bottom",
        },
        {
            corner: "topLeft",
            side: "left",
        },
    ],
    bottomRight: [
        {
            corner: "bottomLeft",
            side: "bottom",
        },
        {
            corner: "topRight",
            side: "right",
        },
    ],
};
