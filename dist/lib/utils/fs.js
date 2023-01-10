"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirSync = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const checkPath = (pth) => {
    if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path_1.default.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
            const error = new Error(`Path contains invalid characters: ${pth}`);
            throw error;
        }
    }
};
const getMode = (options) => {
    const defaults = { mode: 0o777 };
    if (typeof options === "number")
        return options;
    return { ...defaults, ...options }.mode;
};
const ensureDirSync = (dir, options) => {
    checkPath(dir);
    return fs_1.default.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true,
    });
};
exports.ensureDirSync = ensureDirSync;
