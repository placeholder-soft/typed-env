"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgsFromCall = void 0;
const ts_morph_1 = require("ts-morph");
function getArgsFromCall(args) {
    const { source, filePath, chainCallFuncNames } = args;
    const calls = source.getDescendantsOfKind(ts_morph_1.SyntaxKind.CallExpression);
    const argsInfo = [];
    for (const c of calls) {
        const pe = c.getExpressionIfKind(ts_morph_1.SyntaxKind.PropertyAccessExpression);
        const peName = pe?.getName();
        if (peName && chainCallFuncNames.includes(peName)) {
            argsInfo.push(generateArgINfo({
                filePath,
                funcName: peName,
                source: c,
            }));
            continue;
        }
        const identifierText = c
            .getExpressionIfKind(ts_morph_1.SyntaxKind.Identifier)
            ?.getText();
        if (identifierText && chainCallFuncNames.includes(identifierText)) {
            argsInfo.push(generateArgINfo({
                filePath,
                funcName: identifierText,
                source: c,
            }));
        }
    }
    if (argsInfo.length > 0) {
        return argsInfo;
    }
}
exports.getArgsFromCall = getArgsFromCall;
const generateArgINfo = ({ filePath, funcName, source, }) => {
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
