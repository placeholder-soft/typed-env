"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypedEnvCallUsageReport = void 0;
const generate_call_usage_report_1 = require("../functionCall/generate-call-usage-report");
const util_1 = require("../utils/util");
/**
 * @description Get the call report of all typedEnv functions
 */
function generateTypedEnvCallUsageReport({ sourceFilePath, options, }) {
    return (0, generate_call_usage_report_1.generateCallUsageReport)({
        sourceFilePath,
        options,
        chainCallFuncNames: [
            "typedEnv",
            "default",
            "required",
            "optional",
            "toString",
            "toInt",
            "toBoolean",
        ],
        convertData: (data) => {
            const result = parseEnvInfo(data);
            const exceptionResult = exceptionReport(result);
            return {
                envNames: Object.keys(result),
                data: result,
                exceptionReport: exceptionResult,
            };
        },
    });
}
exports.generateTypedEnvCallUsageReport = generateTypedEnvCallUsageReport;
const exceptionReport = (data) => {
    const envNames = Object.keys(data);
    return envNames
        .map((r) => {
        const env = data[r];
        const paths = Object.keys(env);
        const errors = [];
        const warnings = [];
        const types = (0, util_1.uniqBy)(paths.map((p) => env[p].type), (t) => t);
        if (types.length > 0) {
            errors.push(`secretKey: ${r} has different types: ${types.join(",")}`);
        }
        const defaultValue = (0, util_1.uniqBy)(paths.map((p) => env[p].default).filter((r) => r != null), (t) => t);
        if (defaultValue.length > 0) {
            warnings.push(`secretKey: ${r} has different default value: ${defaultValue.join(",")}`);
        }
        const line = paths
            .map((p) => ({
            path: p,
            errors: env[p].errorMsg,
        }))
            .filter((e) => e != null);
        if (errors.length === 0 && warnings.length === 0 && line.length === 0) {
            return;
        }
        return {
            secretKey: r,
            types,
            line,
            errors,
            warnings,
        };
    })
        .filter((r) => r != null);
};
const parseEnvInfo = (result) => {
    return result.reduce((acc, cur) => {
        if (cur == null) {
            return acc;
        }
        const value = parseCallChaining(cur);
        if (value == null) {
            return acc;
        }
        const secret = acc[value.secretKey];
        if (secret) {
            if (secret[value.path] == null) {
                secret[value.path] = {
                    required: value.required,
                    type: value.type,
                    ...(value.default ? { default: value.default } : {}),
                };
            }
        }
        else {
            acc[value.secretKey] = {
                [value.path]: {
                    required: value.required,
                    type: value.type,
                    ...(value.default ? { default: value.default } : {}),
                },
            };
        }
        return acc;
    }, {});
};
const parseCallChaining = (args) => {
    const typeEnvInfo = args.find((r) => r.funcName === "typedEnv");
    if (typeEnvInfo == null) {
        return;
    }
    const defaultInfo = args.find((r) => r.funcName === "default");
    const optionalInfoIndex = args.findIndex((r) => r.funcName === "optional");
    const requiredInfoIndex = args.findIndex((r) => r.funcName === "required");
    const toStringInfo = args.find((r) => r.funcName === "toString");
    const toInt = args.find((r) => r.funcName === "toInt");
    const toBoolean = args.find((r) => r.funcName === "toBoolean");
    if (typeEnvInfo.args[0] != null &&
        ["''", '""'].includes(typeEnvInfo.args[0])) {
        // console.warn(
        //   `not support secretKey is not \"\" or '' in ${typeEnvInfo.path}`
        // );
        return;
    }
    const secretKey = JSON.parse(typeEnvInfo.args[0]);
    let errorMsg = "";
    const type = toStringInfo
        ? "string"
        : toInt
            ? "number"
            : toBoolean
                ? "boolean"
                : "string";
    switch (type) {
        case "number": {
            try {
                const toIntArg = parseInt(toInt.args[0]);
                if (toIntArg < 2 || toIntArg > 36) {
                    errorMsg = `radix must be between 2 and 36, but got ${toIntArg}`;
                }
            }
            catch (e) {
                errorMsg = `parseInt(${args[0]}) is not a number`;
            }
            break;
        }
        case "boolean": {
            const toBooleanArg = toBoolean.args[0];
            if (toBooleanArg !== "true" && toBooleanArg !== "false") {
                errorMsg = `toBoolean(${toBooleanArg}) is not a boolean`;
            }
            break;
        }
    }
    return {
        secretKey,
        path: typeEnvInfo.path,
        required: (optionalInfoIndex === -1 && requiredInfoIndex !== -1) ||
            optionalInfoIndex > requiredInfoIndex,
        type,
        ...(defaultInfo
            ? {
                default: defaultInfo.args[0],
            }
            : {}),
        ...(errorMsg.length > 0 ? { errorMsg } : {}),
    };
};
