import { existsSync } from "fs";
import path from "path";
import { genEnvName } from "../generate-env";

const kSourceFilePath = path.resolve(__dirname, "./usage-typed-env.ts");
const kTsconfigPath = path.resolve(__dirname, "../../../../tsconfig.t.json");
const kOutputPath = path.resolve(__dirname, "./env-name.ts");

test("generate env name", () => {
  genEnvName({
    sourceFilePath: kSourceFilePath,
    options: {
      tsConfigFilePath: kTsconfigPath,
    },
    output: kOutputPath,
  });
  expect(existsSync(kOutputPath)).toBe(true);
});
