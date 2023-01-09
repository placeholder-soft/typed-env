"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genEnv = exports.genEnvName = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fs_2 = require("../utils/fs");
const util_1 = require("../utils/util");
const generate_typed_env_call_usage_report_1 = require("./generate-typed-env-call-usage-report");
const genEnvName = (arg) => {
    const envNames = (0, generate_typed_env_call_usage_report_1.generateTypedEnvCallUsageReport)(arg).envNames.reduce((pre, current) => {
        return {
            ...pre,
            [current]: current,
        };
    }, {});
    const fileContent = `export const AllProjectEnvNames = ${JSON.stringify(envNames, null, 2)} as const;
export type ProjectEnvName = keyof typeof AllProjectEnvNames;`;
    const folderPath = path_1.default.parse(arg.output);
    (0, fs_2.ensureDirSync)(folderPath.dir);
    fs_1.default.writeFileSync(arg.output, fileContent);
};
exports.genEnvName = genEnvName;
const genEnv = (arg) => {
    const report = (0, generate_typed_env_call_usage_report_1.generateTypedEnvCallUsageReport)(arg);
    const envValue = report.envNames.reduce((acc, cur) => {
        const envInfo = report.data[cur];
        const paths = Object.keys(envInfo);
        const values = (0, util_1.uniqBy)(paths.map((p) => envInfo[p].default).filter((r) => r != null), (t) => t);
        if (values.length > 1) {
            acc.push(`// default=[${values.join(",")}]`);
            acc.push(`${cur}=${values[0]}`);
        }
        else if (values.length === 1 && values[0].length > 0) {
            if (["''", '""'].includes(values[0])) {
                acc.push(`// default=[${values.join(",")}]`);
            }
            acc.push(`${cur}=`);
        }
        else {
            acc.push(`${cur}=`);
        }
        return acc;
    }, []);
    const folderPath = path_1.default.parse(arg.output);
    (0, fs_2.ensureDirSync)(folderPath.dir);
    fs_1.default.writeFileSync(arg.output, envValue.join("\n"));
};
exports.genEnv = genEnv;
