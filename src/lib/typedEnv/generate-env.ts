import fs from "fs";
import path from "path";
import { ensureDirSync } from "../utils/fs";
import {
  generateTypedEnvCallUsageReport,
  Report,
} from "./generate-typed-env-call-usage-report";

export const genEnvName = (arg: Report & { output: string }) => {
  const envNames = generateTypedEnvCallUsageReport(arg).envNames.reduce(
    (pre, current) => {
      return {
        ...pre,
        [current]: current,
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

  const folderPath = path.parse(arg.output);
  ensureDirSync(folderPath.dir);
  fs.writeFileSync(arg.output, fileContent);
};
