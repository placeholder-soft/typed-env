import path from "path";
import { genEnvName } from "./codegen";

const KSourceFilePath = path.resolve(process.cwd(), "./src/index.ts");
const KOutPutPath = path.resolve(
  process.cwd(),
  "./generated/current-env-name.ts"
);

genEnvName(KSourceFilePath, KOutPutPath);
