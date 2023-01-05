import prettier from "prettier";
import { checkFunctionCall } from "./lib/funcationCall/checkFunctionCall";
import path from "path";
import { writeFileSync } from "./lib/utils/fs";

const KEnvNamePath = path.resolve(process.cwd(), "./generated/env-name.ts");

export const genEnvName = (
  sourceFilePath: string,
  outPut: string = KEnvNamePath
) => {
  const envNames = checkFunctionCall(sourceFilePath, "typedEnv").reduce(
    (pre, current) => {
      return {
        ...pre,
        [current.args[0]]: current.args[0],
      };
    },
    {}
  );

  const fileContent = `export const AllProjectEnvNames = ${JSON.stringify(
    envNames,
    null,
    2
  )} as const;
export type ProjectEnvName = keyof typeof AllProjectEnvNames;`;

  const formatContent = prettier.format(fileContent, {
    parser: "typescript",
    singleQuote: true,
    semi: true,
    tabWidth: 2,
    arrowParens: "avoid",
    trailingComma: "all",
    printWidth: 80,
  });

  writeFileSync(outPut, formatContent);
};
