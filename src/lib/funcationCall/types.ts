import { Block, CallExpression, SourceFile, ts } from "ts-morph";

export type TFunCallArg = { path: string; args: string[] };

export type TSource = Block | SourceFile | CallExpression<ts.CallExpression>;
