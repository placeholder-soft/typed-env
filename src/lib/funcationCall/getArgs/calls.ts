import { CallExpression, SyntaxKind, ts } from "ts-morph";
import {
  hasParseArg,
  TGetArgsFromCall,
  TGetArgsFromCallBase,
  TParseParameters,
} from "../types";

export function getArgsFromCall<T>(
  args: TGetArgsFromCallBase
): TParseParameters[] | undefined;
export function getArgsFromCall<T>(args: TGetArgsFromCall<T>): T;

export function getArgsFromCall<T>(
  args: TGetArgsFromCallBase | TGetArgsFromCall<T>
) {
  const { source, filePath, funcNames } = args;

  const parseArg = hasParseArg<TGetArgsFromCall<T>>(args)
    ? args.parseArg
    : undefined;

  const calls = source.getDescendantsOfKind(SyntaxKind.CallExpression);

  const argsInfo: TParseParameters[] = [];

  for (const c of calls) {
    const pe = c.getExpressionIfKind(SyntaxKind.PropertyAccessExpression);

    const peName = pe?.getName();

    if (peName && funcNames.includes(peName)) {
      argsInfo.push(
        generateArgINfo({
          filePath,
          funcName: peName,
          source: c,
        })
      );
      continue;
    }

    const identifierText = c
      .getExpressionIfKind(SyntaxKind.Identifier)
      ?.getText();

    if (identifierText && funcNames.includes(identifierText)) {
      argsInfo.push(
        generateArgINfo({
          filePath,
          funcName: identifierText,
          source: c,
        })
      );
    }
  }

  if (parseArg) {
    return parseArg(argsInfo);
  }
  if (argsInfo.length > 0) {
    return argsInfo;
  }
}

const generateArgINfo = ({
  filePath,
  funcName,
  source,
}: {
  filePath: string;
  funcName: string;
  source: CallExpression<ts.CallExpression>;
}) => {
  return {
    path: `${filePath}#L${source.getStartLineNumber()}#S${source.getFullStart()}`,
    pos: {
      line: source.getStartLineNumber(),
      fullStart: source.getFullStart(),
    },
    funcName,
    args: source.getArguments().map((r) => r.getText()),
  };
};