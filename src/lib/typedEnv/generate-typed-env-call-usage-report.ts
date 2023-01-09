import { ProjectOptions } from "ts-morph";
import { generateCallUsageReport } from "../functionCall/generate-call-usage-report";
import { TParseParameters } from "../functionCall/types";
import { uniqBy } from "../utils/util";

type TResult = {
  required: boolean;
  type: string;
  default?: string;
  errorMsg?: string;
};

type TFunCallArg = {
  [secretKey in string]: { [path in string]: TResult };
};

export type Report = { sourceFilePath: string; options?: ProjectOptions };

export function generateTypedEnvCallUsageReport({
  sourceFilePath,
  options,
}: Report) {
  return generateCallUsageReport({
    sourceFilePath,
    options,
    funcNames: [
      "typedEnv",
      "default",
      "required",
      "optional",
      "toString",
      "toInt",
      "toBoolean",
    ],
    convertData: (data: TParseParameters[][]) => {
      const result = parseEnvInfo(data);
      const errorMsg = errorReport(result);
      return {
        envNames: Object.keys(result),
        data: result,
        errorMsg,
      };
    },
  });
}

const errorReport = (data: TFunCallArg) => {
  const envNames = Object.keys(data);

  const msg = envNames.map((r) => {
    const env = data[r];
    const paths = Object.keys(env);

    const types = uniqBy(
      paths.map((p) => env[p].type),
      (t) => t
    );

    const line = paths
      .map((p) => ({
        path: p,
        errorMsg: env[p].errorMsg,
      }))
      .filter((e) => e != null);

    if (types.length > 1) {
      return {
        secretKey: r,
        types,
        line,
        errorMessage: `secretKey: ${r} has different types: ${types.join(",")}`,
      };
    }
  });

  return msg;
};

const parseEnvInfo = (result: TParseParameters[][]) => {
  return result.reduce<TFunCallArg>((acc, cur) => {
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
    } else {
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

const parseCallChaining = (args: TParseParameters[]) => {
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

  if (
    typeEnvInfo.args[0] != null &&
    ["''", '""'].includes(typeEnvInfo.args[0])
  ) {
    // console.warn(
    //   `not support secretKey is not \"\" or '' in ${typeEnvInfo.path}`
    // );

    return;
  }

  const secretKey: string = JSON.parse(typeEnvInfo.args[0]);

  let errorMsg = "";

  if (toInt) {
    try {
      const toIntArg = parseInt(toInt.args[0]);
      if (toIntArg < 2 || toIntArg > 36) {
        errorMsg = `radix must be between 2 and 36, but got ${toIntArg}`;
      }
    } catch (e) {
      errorMsg = `parseInt(${args[0]}) is not a number`;
    }
  }

  return {
    secretKey,
    path: typeEnvInfo.path,
    required:
      (optionalInfoIndex === -1 && requiredInfoIndex !== -1) ||
      optionalInfoIndex > requiredInfoIndex,
    type: toStringInfo
      ? "string"
      : toInt
      ? "number"
      : toBoolean
      ? "boolean"
      : "string",
    ...(defaultInfo
      ? {
          default: defaultInfo.args[0],
        }
      : {}),
    ...(errorMsg.length > 0 ? { errorMsg } : {}),
  };
};
