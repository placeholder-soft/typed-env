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

export type TGetArgsFromExpression = {
  source: TSource;
  funcNames: string[];
  filePath: string;
};

export type TCallUsageArgs = {
  sourceFile: SourceFile;
  funcNames: string[];
  analysisPathIgnorePatterns?: boolean;
};

export type TGenerateCallUsageReportBase = {
  sourceFilePath: string;
  funcNames: string[];
  analysisPathIgnorePatterns?: boolean;
  options?: ProjectOptions;
};

export type TGenerateCallUsageReport<T> = TGenerateCallUsageReportBase & {
  convertData: (v: TParseParameters[][]) => T;
};

export const hasConvertData = <T>(args: any): args is T => {
  return args["convertData"] != null;
};
