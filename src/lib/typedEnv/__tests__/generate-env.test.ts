import { existsSync } from "fs";
import path from "path";
import { genEnv, genEnvName } from "../generate-env";

const kSourceFilePath = path.resolve(__dirname, "./usage-typed-env.ts");
const kTsconfigPath = path.resolve(__dirname, "../../../../tsconfig.t.json");

test("generate env name", () => {
  const kOutputPath = path.resolve(__dirname, "./env-name.ts");
  genEnvName({
    sourceFilePath: kSourceFilePath,
    options: {
      tsConfigFilePath: kTsconfigPath,
    },
    output: kOutputPath,
  });
  expect(existsSync(kOutputPath)).toBe(true);
});

test("generate env", () => {
  const kOutputPath = path.resolve(__dirname, "./.env");
  genEnv({
    sourceFilePath: kSourceFilePath,
    options: {
      tsConfigFilePath: kTsconfigPath,
    },
    output: kOutputPath,
  });
  expect(existsSync(kOutputPath)).toBe(true);
});
