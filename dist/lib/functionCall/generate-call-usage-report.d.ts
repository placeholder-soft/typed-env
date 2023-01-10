import { TGenerateCallUsageReport, TGenerateCallUsageReportBase, TParseParameters } from "./types";
/**
 * @description Get the call report of the function
 */
export declare function generateCallUsageReport<T>(arg: TGenerateCallUsageReportBase): TParseParameters[][];
export declare function generateCallUsageReport<T>(args: TGenerateCallUsageReport<T>): T;
