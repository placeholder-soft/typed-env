import path from "path";
import { Project, SyntaxKind, SourceFile, ts, CallExpression } from "ts-morph";
import { packageNameWithVersion } from "./package";

const KTsconfigPath = path.resolve(process.cwd(), "./tsconfig.json");

type TFunCallArg = { path: string; args: string[] };

const getCallArgs = (
  c: CallExpression<ts.CallExpression>,
  filePath: string,
  funName: string
) => {
  if (c.getExpressionIfKind(SyntaxKind.Identifier)?.getText() === funName) {
    return {
      path: `${filePath}#L${c.getStartLineNumber()}`,
      args: c.getArguments().map((r) => r.getText()),
    };
  }
  return;
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

  const calls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

  for (const c of calls) {
    const result = getCallArgs(c, filePath, funName);
    if (result) {
      args.push(result);
    }
  }

  const files = sourceFile.getReferencedSourceFiles();

  if (files.length > 0) {
    for (const f of files) {
      args.push(...getFunctionArgs(f, funName, ignorePackage));
    }
  }

  return args;
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
