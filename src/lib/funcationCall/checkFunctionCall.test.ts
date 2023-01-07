import path from "path";

import { checkFunctionCall } from "./checkFunctionCall";

const KSourceFilePath = path.resolve(process.cwd(), "./src/index.ts");

// test("check typedEnv", () => {
//   const info = checkFunctionCall(KSourceFilePath, "typedEnv");
//   expect(info.length).toBe(0);
// });

type TResult = {
  required: boolean;
  type: string | number;
  default?: string;
};

type TFunCallArg<T> = {
  [secretKey in string]: { [path in string]: T };
};

const info = checkFunctionCall({
  sourceFilePath: KSourceFilePath,
  funcNames: [
    "typedEnv",
    "default",
    "required",
    "optional",
    "toString",
    "toInt",
    "toBoolean",
  ],
  parseArg: (info) => {
    const typeEnvInfo = info.find((r) => r.funcName === "typedEnv");

    if (typeEnvInfo == null) {
      return;
    }

    const defaultInfo = info.find((r) => r.funcName === "default");

    const optionalInfoIndex = info.findIndex((r) => r.funcName === "optional");
    const requiredInfoIndex = info.findIndex((r) => r.funcName === "required");

    const toStringInfo = info.find((r) => r.funcName === "toString");
    const toInt = info.find((r) => r.funcName === "toInt");
    const toBoolean = info.find((r) => r.funcName === "toBoolean");

    // let secretKey = Symbol("typedEnv");

    // if (
    //   typeEnvInfo.args[0] != null &&
    //   !["''", '""'].includes(typeEnvInfo.args[0])
    // ) {
    //   secretKey = JSON.parse(typeEnvInfo.args[0]);
    // }

    const secretKey: string = JSON.parse(typeEnvInfo.args[0]);

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
    };
  },
  merge: (result) => {
    return result.reduce<TFunCallArg<TResult>>((acc, value) => {
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
  },
});

console.log(JSON.stringify(info, null, 4));
