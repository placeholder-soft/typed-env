/// <reference types="node" />
import { EnvBox } from "./env-box";
/**
 * @param key env key
 * @returns EnvBox
 */
export declare function typedEnv<T extends string>(key: T): EnvBox<NodeJS.ProcessEnv[T]>;
/**
 * @param key env key
 * @returns EnvBox
 */
export declare function anyEnv(key: string): EnvBox<string | undefined>;
