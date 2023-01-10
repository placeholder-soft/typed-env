"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCallUsageReport = void 0;
const ts_morph_1 = require("ts-morph");
const statement_1 = require("./getArgs/statement");
const types_1 = require("./types");
function callUsageArgs(args) {
    const { sourceFile, chainCallFuncNames, analysisPathIgnorePatterns = true, } = args;
    const filePath = sourceFile.getFilePath();
    if (analysisPathIgnorePatterns) {
        if (filePath.includes("node_modules")) {
            return [];
        }
    }
    const result = [];
    result.push(...(0, statement_1.getCallUsageArgsFromStatement)({
        source: sourceFile,
        filePath,
        chainCallFuncNames,
    }));
    const files = sourceFile.getReferencedSourceFiles();
    if (files.length > 0) {
        for (const f of files) {
            result.push(...callUsageArgs({
                sourceFile: f,
                chainCallFuncNames,
                analysisPathIgnorePatterns,
            }));
        }
    }
    return result;
}
function generateCallUsageReport(args) {
    const { sourceFilePath, chainCallFuncNames, analysisPathIgnorePatterns, options, } = args;
    const convertData = (0, types_1.hasConvertData)(args)
        ? args.convertData
        : undefined;
    const project = new ts_morph_1.Project(options);
    const result = callUsageArgs({
        sourceFile: project.getSourceFileOrThrow(sourceFilePath),
        chainCallFuncNames,
        analysisPathIgnorePatterns,
    });
    return convertData ? convertData(result) : result;
}
exports.generateCallUsageReport = generateCallUsageReport;
