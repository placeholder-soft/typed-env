import { SyntaxKind } from "ts-morph";
import {
  TGetArgsFromCall,
  TGetArgsFromCallBase,
  TParseParameters,
  hasParseArg,
} from "../types";
import { getArgsFromCall } from "./calls";

export function getArgsFromExpressionStatement<T>(
  arg: TGetArgsFromCallBase
): TParseParameters[];
export function getArgsFromExpressionStatement<T>(
  args: TGetArgsFromCall<T>
): T[];

export function getArgsFromExpressionStatement<T>(
  args: TGetArgsFromCallBase | TGetArgsFromCall<T>
) {
  const { source, filePath, funcNames } = args;

  const parseArg = hasParseArg<TGetArgsFromCall<T>>(args)
    ? args.parseArg
    : undefined;

  const argsInfo = [];

  const expressionStatements = source.getDescendantsOfKind(
    SyntaxKind.ExpressionStatement
  );

  for (const es of expressionStatements) {
    // const name = es.getExpression().getText();

    // const identifier = es.getExpressionIfKind(SyntaxKind.Identifier);
    // const identifierText = identifier?.getText();
    // const identifierTextArray = identifierText?.split(".");

    // const propertyAccessExpression = es.getExpressionIfKind(
    //   SyntaxKind.PropertyAccessExpression
    // );
    // const paText = propertyAccessExpression?.getText();
    // const paName = propertyAccessExpression?.getName();

    // const calls = es.getDescendantsOfKind(SyntaxKind.CallExpression);

    // console.log({
    //   name,
    //   path: filePath,
    //   line: es.getStartLineNumber(),
    //   identifierText,
    //   identifierTextArray,
    //   paText,
    //   paName,
    //   calls: calls.length,
    // });

    const result = getArgsFromCall<T>({
      source: es,
      filePath,
      funcNames,
      parseArg,
    });

    result && argsInfo.push(result);
  }

  return argsInfo;
}
