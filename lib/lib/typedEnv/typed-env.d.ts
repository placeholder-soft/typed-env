/// <reference types="node" />
import { EnvBox } from "./env-box";
export declare function typedEnv<T extends string>(key: T): EnvBox<NodeJS.ProcessEnv[T]>;
export declare function anyEnv(key: string): EnvBox<string | undefined>;
