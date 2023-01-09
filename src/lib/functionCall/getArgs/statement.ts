import { SyntaxKind } from "ts-morph";
import { TGetArgsFromExpression, TParseParameters } from "../types";
import { getArgsFromCall } from "./call";

export function getCallUsageArgsFromStatement(
  args: TGetArgsFromExpression
): TParseParameters[][] {
  const { source, filePath, funcNames } = args;

  const argsInfo: TParseParameters[][] = [];

  const expressionStatements = source.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  );

  for (const es of expressionStatements) {
    const result = getArgsFromCall({
      source: es,
      filePath,
      funcNames,
    });

    result && argsInfo.push(result);
  }

  return argsInfo;
}
