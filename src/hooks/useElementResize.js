"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementSize = void 0;
const react_1 = require("react");
const react_dom_1 = require("react-dom");
function useElementSize(defaultSize) {
    var _a, _b;
    const [ref, setRef] = (0, react_1.useState)(null);
    const [size, setSize] = (0, react_1.useState)({
        width: (_a = defaultSize.defaultWidth) !== null && _a !== void 0 ? _a : 0,
        height: (_b = defaultSize.defaultHeight) !== null && _b !== void 0 ? _b : 0,
    });
    // Update size function without flushSync
    const updateSize = (0, react_1.useCallback)(() => {
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
    (0, react_1.useLayoutEffect)(() => {
        if (!ref)
            return;
        const resizeObserver = new ResizeObserver(() => {
            (0, react_dom_1.flushSync)(() => {
                updateSize();
            });
        });
        resizeObserver.observe(ref);
        return () => resizeObserver.disconnect();
    }, [ref, updateSize]);
    return [setRef, size];
}
exports.useElementSize = useElementSize;
