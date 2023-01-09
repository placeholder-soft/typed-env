import { ProjectOptions } from "ts-morph";
declare type TResult = {
    required: boolean;
    type: string;
    default?: string;
    errorMsg?: string;
};
declare type TFunCallArg = {
    [secretKey in string]: {
        [path in string]: TResult;
    };
};
export declare type Report = {
    sourceFilePath: string;
    options?: ProjectOptions;
};
export declare function generateTypedEnvCallUsageReport({ sourceFilePath, options, }: Report): {
    envNames: string[];
    data: TFunCallArg;
    exceptionReport: ({
        secretKey: string;
        types: string[];
        line: {
            path: string;
            errors: string | undefined;
        }[];
        errors: string[];
        warnings: string[];
    } | undefined)[];
};
export {};
