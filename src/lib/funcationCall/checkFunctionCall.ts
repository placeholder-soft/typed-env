import path from "path";
import { Project } from "ts-morph";
import { getArgsFromExpressionStatement } from "./getArgs/expressionStatement";
import { packageNameWithVersion } from "./package";
import {
  hasMerge,
  hasParseArg,
  TCheckFunctionCall,
  TCheckFunctionCallBase,
  TCheckFunctionCallOnlyHasMerge,
  TCheckFunctionCallOnlyHasParse,
  TFunctionArgs,
  TFunctionArgsBase,
  TParseParameters,
} from "./types";

const KTsconfigPath = path.resolve(process.cwd(), "./tsconfig.json");

function getFunctionArgs<T>(args: TFunctionArgsBase): TParseParameters[];
function getFunctionArgs<T>(args: TFunctionArgs<T>): T[];

function getFunctionArgs<T>(args: TFunctionArgsBase | TFunctionArgs<T>) {
  const { sourceFile, funcNames, ignorePackage = true } = args;

  const parseArg = hasParseArg<TFunctionArgs<T>>(args)
    ? args.parseArg
    : undefined;

  const filePath = sourceFile.getFilePath();
  if (ignorePackage) {
    const index = packageNameWithVersion.findIndex((r) => filePath.includes(r));
    if (index !== -1) {
      return [];
    }
  }
  const result = [];

  if (
    filePath ===
    "/Users/pankai/projects/company/PlaceholderSoft/typed-env/src/lib/typedEnv/typed-env.ts"
  ) {
    result.push(
      ...getArgsFromExpressionStatement<T>({
        source: sourceFile,
        filePath,
        funcNames,
        parseArg,
      })
    );
  }

  const files = sourceFile.getReferencedSourceFiles();
  if (files.length > 0) {
    for (const f of files) {
      result.push(
        ...getFunctionArgs<T>({
          sourceFile: f,
          funcNames,
          parseArg,
          ignorePackage,
        })
      );
    }
  }

  return result;
}

export function checkFunctionCall<T, U>(arg: TCheckFunctionCall<T, U>): U;
export function checkFunctionCall<T>(
  args: TCheckFunctionCallOnlyHasParse<T>
): T[];
export function checkFunctionCall<T, U>(
  args: TCheckFunctionCallOnlyHasMerge<T, U>
): U;
export function checkFunctionCall<T>(
  args: TCheckFunctionCallBase
): TParseParameters[][];

export function checkFunctionCall<T, U>(
  args:
    | TCheckFunctionCallBase
    | TCheckFunctionCallOnlyHasParse<T>
    | TCheckFunctionCallOnlyHasMerge<T, U>
    | TCheckFunctionCall<T, U>
) {
  const {
    sourceFilePath,
    funcNames,
    ignorePackage,
    options = { tsConfigFilePath: KTsconfigPath },
  } = args;

  const parseArg = hasParseArg<TCheckFunctionCallOnlyHasParse<T>>(args)
    ? args.parseArg
    : undefined;
  const merge = hasMerge<TCheckFunctionCallOnlyHasMerge<T, U>>(args)
    ? args.merge
    : undefined;

  const project = new Project(options);
  const result = getFunctionArgs({
    sourceFile: project.getSourceFileOrThrow(sourceFilePath),
    funcNames,
    parseArg,
    ignorePackage,
  });

  return merge ? merge(result) : result;

  // if (notHasParseArgAndMerge<T, U>(arg, result)) {
  //   return result;
  // }

  // if (onlyHasParseArg<T, U>(arg, result)) {
  //   return result;
  // }

  // if (merge) {
  //   const mergeResult = merge(result);
  //   if (
  //     onlyHasMerge<T, U>(arg, mergeResult) ||
  //     hasParseArgAndMerge<T, U>(arg, mergeResult)
  //   ) {
  //     return mergeResult;
  //   }
  // }

  // return result;
}
