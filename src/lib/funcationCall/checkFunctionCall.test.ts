import path from "path";
import { checkFunctionCall } from "./checkFunctionCall";

const KSourceFilePath = path.resolve(process.cwd(), "./src/index.ts");

test("check typedEnv", () => {
  const info = checkFunctionCall(KSourceFilePath, "typedEnv");
  expect(info.length).toBe(0);
});
