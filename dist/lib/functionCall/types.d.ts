import { Block, CallExpression, ExpressionStatement, ProjectOptions, SourceFile, ts } from "ts-morph";
export declare type TSource = SourceFile | Block | ExpressionStatement | CallExpression<ts.CallExpression>;
export declare type TParseParameters = {
    /**
     * function name.
     */
    funcName: string;
    /**
     * Current file path
     */
    path: string;
    /**
     * File location of the function
     */
    pos: {
        line: number;
        fullStart: number;
    };
    /**
     * function call arguments.
     */
    args: string[];
};
export declare type TGetArgsFromExpression = {
    /**
     * File source to be resolved
     */
    source: TSource;
    /**
     * Chain call function name.
     */
    chainCallFuncNames: string[];
    /**
     * Current file path
     */
    filePath: string;
};
export declare type TCallUsageArgs = {
    /**
     * File source to be resolved
     */
    sourceFile: SourceFile;
    /**
     * Chain call function name.
     */
    chainCallFuncNames: string[];
    /**
     * Whether to ignore the third-party package. default: true
     */
    analysisPathIgnorePatterns?: boolean;
};
export declare type TGenerateCallUsageReportBase = {
    /**
     * The path to the source file to analyze.
     */
    sourceFilePath: string;
    /**
     * Chain call function name.
     */
    chainCallFuncNames: string[];
    /**
     * Whether to ignore the third-party package. default: true
     */
    analysisPathIgnorePatterns?: boolean;
    /**
     * ts-morph options
     */
    options?: ProjectOptions;
};
export declare type TGenerateCallUsageReport<T> = TGenerateCallUsageReportBase & {
    /**
     *
     * @param v call usage args
     * @returns data
     */
    convertData: (v: TParseParameters[][]) => T;
};
/**
 * @description Whether the parameter contains convertData
 * @param args
 * @returns
 */
export declare const hasConvertData: <T>(args: any) => args is T;
