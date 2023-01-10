"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvBox = void 0;
const process = __importStar(require("process"));
class EnvBox {
    name;
    value;
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    required() {
        if (this.value == null) {
            throw new Error(`Required env variable for name: ${this.name} is not set`);
        }
        return new EnvBox(this.name, this.value);
    }
    optional() {
        return new EnvBox(this.name, this.value);
    }
    default(value) {
        return new EnvBox(this.name, this.value ?? value);
    }
    nonEmpty() {
        if (this.value == null || this.value === "") {
            throw new Error(`Env variable for name: ${this.name} is empty`);
        }
        return new EnvBox(this.name, this.value);
    }
    toBoolean() {
        const value = this.value;
        if (value === "true" || value === "TRUE") {
            return true;
        }
        if (value === "false" || value === "FALSE") {
            return false;
        }
        throw new Error(`Env variable for name: ${this.name} is not boolean, value: ${value}`);
    }
    toInt(radix) {
        const value = this.toString();
        if (value == null) {
            return undefined;
        }
        const val = parseInt(value, radix);
        if (isNaN(val)) {
            throw new Error(`Env variable for name: ${this.name} is not an integer`);
        }
        return val;
    }
    toString() {
        return this.value;
    }
    static of(name) {
        const val = process.env[name];
        return new EnvBox(name, val);
    }
}
exports.EnvBox = EnvBox;
