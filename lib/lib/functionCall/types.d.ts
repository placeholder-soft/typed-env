import { Block, CallExpression, ExpressionStatement, ProjectOptions, SourceFile, ts } from "ts-morph";
export declare type TSource = SourceFile | Block | ExpressionStatement | CallExpression<ts.CallExpression>;
export declare type TParseParameters = {
    funcName: string;
    path: string;
    pos: {
        line: number;
        fullStart: number;
    };
    args: string[];
};
export declare type TGetArgsFromExpression = {
    source: TSource;
    funcNames: string[];
    filePath: string;
};
export declare type TCallUsageArgs = {
    sourceFile: SourceFile;
    funcNames: string[];
    analysisPathIgnorePatterns?: boolean;
};
export declare type TGenerateCallUsageReportBase = {
    sourceFilePath: string;
    funcNames: string[];
    analysisPathIgnorePatterns?: boolean;
    options?: ProjectOptions;
};
export declare type TGenerateCallUsageReport<T> = TGenerateCallUsageReportBase & {
    convertData: (v: TParseParameters[][]) => T;
};
export declare const hasConvertData: <T>(args: any) => args is T;
