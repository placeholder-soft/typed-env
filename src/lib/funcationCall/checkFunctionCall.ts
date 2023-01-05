import path from "path";
import { Project, SyntaxKind, SourceFile } from "ts-morph";
import { uniqBy } from "../utils/util";
import { packageNameWithVersion } from "./package";
import { TFunCallArg, TSource } from "./types";

const KTsconfigPath = path.resolve(process.cwd(), "./tsconfig.json");

const getArgsFromCall = (
  source: TSource,
  filePath: string,
  funName: string
) => {
  const args: TFunCallArg[] = [];
  const calls = source.getDescendantsOfKind(SyntaxKind.CallExpression);
  for (const c of calls) {
    if (c.getExpressionIfKind(SyntaxKind.Identifier)?.getText() === funName) {
      args.push({
        path: `${filePath}#L${c.getStartLineNumber()}`,
        args: c.getArguments().map((r) => r.getText()),
      });
    }

    args.push(...getArgsFromCall(c, filePath, funName));
  }

  return uniqBy(args, (r) => `${r.path}${args.join("")}`);
};

const getFunctionArgs = (
  sourceFile: SourceFile,
  funName: string,
  ignorePackage: boolean = true
): TFunCallArg[] => {
  const filePath = sourceFile.getFilePath();
  if (ignorePackage) {
    const index = packageNameWithVersion.findIndex((r) => filePath.includes(r));
    if (index !== -1) {
      return [];
    }
  }
  const args: TFunCallArg[] = [];

  args.push(...getArgsFromCall(sourceFile, filePath, funName));

  const files = sourceFile.getReferencedSourceFiles();
  if (files.length > 0) {
    for (const f of files) {
      args.push(...getFunctionArgs(f, funName, ignorePackage));
    }
  }

  return uniqBy(args, (r) => `${r.path}${args.join("")}`);
};

export const checkFunctionCall = (
  sourcefilePath: string,
  funName: string,
  ignorePackage?: boolean
) => {
  const project = new Project({ tsConfigFilePath: KTsconfigPath });
  return getFunctionArgs(
    project.getSourceFileOrThrow(sourcefilePath),
    funName,
    ignorePackage
  );
};
