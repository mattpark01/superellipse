"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Superellipse = void 0;
const react_1 = require("react");
const framer_motion_1 = require("framer-motion");
const useElementResize_1 = require("../hooks/useElementResize");
const react_slot_1 = require("@radix-ui/react-slot");
const index_1 = require("../utils/index");
const cn_1 = require("../utils/cn");
const Superellipse = (0, react_1.forwardRef)((_a, ref) => {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var { children, cornerRadius = 8, cornerSmoothing = 1, topLeftCornerRadius, topRightCornerRadius, bottomLeftCornerRadius, bottomRightCornerRadius, topCornerRadius, leftCornerRadius, rightCornerRadius, bottomCornerRadius, asChild, style, width: w, height: h, defaultWidth, defaultHeight, className, onClick, onMouseEnter, onMouseLeave, onMouseDown, onDragStart, as: E = "div" } = _a, // Default to 'div' if not specified
    props = __rest(_a, ["children", "cornerRadius", "cornerSmoothing", "topLeftCornerRadius", "topRightCornerRadius", "bottomLeftCornerRadius", "bottomRightCornerRadius", "topCornerRadius", "leftCornerRadius", "rightCornerRadius", "bottomCornerRadius", "asChild", "style", "width", "height", "defaultWidth", "defaultHeight", "className", "onClick", "onMouseEnter", "onMouseLeave", "onMouseDown", "onDragStart", "as"]);
    const Comp = asChild ? react_slot_1.Slot : framer_motion_1.motion.div;
    const [initialized, setInitialized] = (0, react_1.useState)(false);
    const [elementRef, { width, height }] = (0, useElementResize_1.useElementSize)({
        defaultWidth,
        defaultHeight,
    });
    (0, react_1.useEffect)(() => {
        if (width && height)
            setInitialized(true);
    }, [width, height]);
    const actualRef = ref || elementRef;
    const actualWidth = (_b = w !== null && w !== void 0 ? w : width) !== null && _b !== void 0 ? _b : defaultWidth;
    const actualHeight = (_c = h !== null && h !== void 0 ? h : height) !== null && _c !== void 0 ? _c : defaultHeight;
    const path = initialized && actualWidth && actualHeight
        ? (0, index_1.getSvgPath)({
            width: actualWidth,
            height: actualHeight,
            topLeftCornerRadius: (_f = (_e = (_d = topLeftCornerRadius !== null && topLeftCornerRadius !== void 0 ? topLeftCornerRadius : topCornerRadius) !== null && _d !== void 0 ? _d : leftCornerRadius) !== null && _e !== void 0 ? _e : cornerRadius) !== null && _f !== void 0 ? _f : 0,
            topRightCornerRadius: (_j = (_h = (_g = topRightCornerRadius !== null && topRightCornerRadius !== void 0 ? topRightCornerRadius : topCornerRadius) !== null && _g !== void 0 ? _g : rightCornerRadius) !== null && _h !== void 0 ? _h : cornerRadius) !== null && _j !== void 0 ? _j : 0,
            bottomLeftCornerRadius: (_m = (_l = (_k = bottomLeftCornerRadius !== null && bottomLeftCornerRadius !== void 0 ? bottomLeftCornerRadius : bottomCornerRadius) !== null && _k !== void 0 ? _k : leftCornerRadius) !== null && _l !== void 0 ? _l : cornerRadius) !== null && _m !== void 0 ? _m : 0,
            bottomRightCornerRadius: (_q = (_p = (_o = bottomRightCornerRadius !== null && bottomRightCornerRadius !== void 0 ? bottomRightCornerRadius : bottomCornerRadius) !== null && _o !== void 0 ? _o : rightCornerRadius) !== null && _p !== void 0 ? _p : cornerRadius) !== null && _q !== void 0 ? _q : 0,
            cornerSmoothing,
        })
        : "";
    const combinedStyle = Object.assign(Object.assign({}, style), { borderRadius: cornerRadius, clipPath: path ? `path('${path}')` : undefined, WebkitClipPath: path ? `path('${path}')` : undefined });
    return (<Comp {...props} key={props.key} ref={actualRef} style={combinedStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseDown={onMouseDown} data-squircle={cornerRadius} className={(0, cn_1.cn)(className)} onClick={onClick} onDragStart={onDragStart}>
				{children}
			</Comp>);
});
exports.Superellipse = Superellipse;
Superellipse.displayName = "Superellipse";
