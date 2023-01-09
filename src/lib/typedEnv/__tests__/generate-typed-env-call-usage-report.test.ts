import path from "path";
import { generateTypedEnvCallUsageReport } from "../generate-typed-env-call-usage-report";

const kSourceFilePath = path.resolve(__dirname, "./usage-typed-env.ts");
const kTsconfigPath = path.resolve(__dirname, "../../../../tsconfig.t.json");

test("generate typeEnv call usage report", () => {
  const info = generateTypedEnvCallUsageReport({
    sourceFilePath: kSourceFilePath,
    options: { tsConfigFilePath: kTsconfigPath },
  });
  expect(info.envNames[0]).toBe('bbb');
});
