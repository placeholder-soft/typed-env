import path from "path";
import { Project } from "ts-morph";
import { getCallUsageArgsFromStatement } from "./getArgs/statement";
import {
  hasConvertData,
  TCallUsageArgs,
  TGenerateCallUsageReport,
  TGenerateCallUsageReportBase,
  TParseParameters,
} from "./types";

function callUsageArgs<T>(args: TCallUsageArgs): TParseParameters[][] {
  const { sourceFile, funcNames, analysisPathIgnorePatterns = true } = args;

  const filePath = sourceFile.getFilePath();
  if (analysisPathIgnorePatterns) {
    if (filePath.includes("node_modules")) {
      return [];
    }
  }
  const result = [];

  result.push(
    ...getCallUsageArgsFromStatement({
      source: sourceFile,
      filePath,
      funcNames,
    })
  );

  const files = sourceFile.getReferencedSourceFiles();
  if (files.length > 0) {
    for (const f of files) {
      result.push(
        ...callUsageArgs<T>({
          sourceFile: f,
          funcNames,
          analysisPathIgnorePatterns,
        })
      );
    }
  }

  return result;
}

export function generateCallUsageReport<T>(
  arg: TGenerateCallUsageReportBase
): TParseParameters[][];
export function generateCallUsageReport<T>(
  args: TGenerateCallUsageReport<T>
): T;

export function generateCallUsageReport<T>(
  args: TGenerateCallUsageReportBase | TGenerateCallUsageReport<T>
) {
  const { sourceFilePath, funcNames, analysisPathIgnorePatterns, options } =
    args;

  const convertData = hasConvertData<TGenerateCallUsageReport<T>>(args)
    ? args.convertData
    : undefined;

  const project = new Project(options);
  const result = callUsageArgs({
    sourceFile: project.getSourceFileOrThrow(sourceFilePath),
    funcNames,
    analysisPathIgnorePatterns,
  });

  return convertData ? convertData(result) : result;
}
