"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqBy = void 0;
function uniqBy(input, by) {
    const result = new Map();
    for (const item of input) {
        if (result.has(by(item))) {
            continue;
        }
        result.set(by(item), item);
    }
    return Array.from(result.values());
}
exports.uniqBy = uniqBy;
