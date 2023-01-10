"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyEnv = exports.typedEnv = void 0;
const env_box_1 = require("./env-box");
/**
 * @param key env key
 * @returns EnvBox
 */
function typedEnv(key) {
    return env_box_1.EnvBox.of(key);
}
exports.typedEnv = typedEnv;
/**
 * @param key env key
 * @returns EnvBox
 */
function anyEnv(key) {
    return env_box_1.EnvBox.of(key);
}
exports.anyEnv = anyEnv;
