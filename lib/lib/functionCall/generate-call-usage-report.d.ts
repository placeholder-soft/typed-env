import { TGenerateCallUsageReport, TGenerateCallUsageReportBase, TParseParameters } from "./types";
export declare function generateCallUsageReport<T>(arg: TGenerateCallUsageReportBase): TParseParameters[][];
export declare function generateCallUsageReport<T>(args: TGenerateCallUsageReport<T>): T;
