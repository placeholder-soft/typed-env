/// <reference types="node" />
declare type EnvBoxValueType = string | undefined;
declare type DefinedAs<T, U> = T extends undefined ? U | undefined : U;
export declare class EnvBox<T extends EnvBoxValueType> {
    readonly name: string;
    private readonly value;
    constructor(name: string, value: T);
    required(): EnvBox<NonNullable<T>>;
    optional(): EnvBox<T>;
    default(value: string): EnvBox<string>;
    nonEmpty(): EnvBox<NonNullable<T>>;
    toBoolean(): boolean;
    toInt(radix?: number): DefinedAs<T, number>;
    toString(): T;
    static of<T extends string>(name: T): EnvBox<NodeJS.ProcessEnv[T]>;
}
export {};
