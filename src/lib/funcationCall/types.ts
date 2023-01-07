import {
  Block,
  CallExpression,
  ExpressionStatement,
  ProjectOptions,
  SourceFile,
  ts,
} from "ts-morph";

export type TSource =
  | SourceFile
  | Block
  | ExpressionStatement
  | CallExpression<ts.CallExpression>;

export type TParseParameters = {
  funcName: string;
  path: string;
  pos: {
    line: number;
    fullStart: number;
  };
  args: string[];
};

type TParseArg<T> = (info: TParseParameters[]) => T;

export type TGetArgsFromCallBase = {
  source: TSource;
  funcNames: string[];
  filePath: string;
};
export type TGetArgsFromCall<T> = TGetArgsFromCallBase & {
  parseArg?: TParseArg<T>;
};

export type TFunctionArgsBase = {
  sourceFile: SourceFile;
  funcNames: string[];
  ignorePackage?: boolean;
};
export type TFunctionArgs<T> = TFunctionArgsBase & {
  parseArg?: TParseArg<T>;
};

export type TCheckFunctionCallBase = {
  sourceFilePath: string;
  funcNames: string[];
  ignorePackage?: boolean;
  options?: ProjectOptions;
};

export type TCheckFunctionCallOnlyHasParse<T> = TCheckFunctionCallBase & {
  parseArg?: TParseArg<T>;
};

export type TCheckFunctionCallOnlyHasMerge<T, U> = TCheckFunctionCallBase & {
  merge?: (v: T[]) => U;
};

export type TCheckFunctionCall<T, U> = TCheckFunctionCallBase &
  TCheckFunctionCallOnlyHasParse<T> &
  TCheckFunctionCallOnlyHasMerge<T, U>;

export const hasParseArg = <T>(args: any): args is T => {
  return args["parseArg"];
};

export const hasMerge = <T>(args: any): args is T => {
  return args["merge"];
};
