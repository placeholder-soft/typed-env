"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallUsageArgsFromStatement = void 0;
const ts_morph_1 = require("ts-morph");
const call_1 = require("./call");
function getCallUsageArgsFromStatement(args) {
    const { source, filePath, funcNames } = args;
    const argsInfo = [];
    const expressionStatements = source.getDescendantsOfKind(ts_morph_1.SyntaxKind.ExpressionStatement);
    for (const es of expressionStatements) {
        const result = (0, call_1.getArgsFromCall)({
            source: es,
            filePath,
            funcNames,
        });
        result && argsInfo.push(result);
    }
    return argsInfo;
}
exports.getCallUsageArgsFromStatement = getCallUsageArgsFromStatement;
