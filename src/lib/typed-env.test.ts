import { AllProjectEnvNames, ProjectEnvName } from "../generated/env-name";
import { anyEnv, typedEnv } from "./typed-env";

test("boolean env", () => {
  const envBox = typedEnv<ProjectEnvName>("NX_WORKSPACE_ROOT");
  const rs = envBox.required().toString();
  console.log("required boolean", rs);
  const envBox2 = anyEnv("ENV_TEXT_BOOLEAN_2");
  const s = envBox2.optional().toString();
  console.log("options boolean", s);
});

test("integer env", () => {
  const envBox = typedEnv(AllProjectEnvNames.NX_WORKSPACE_ROOT);
  const rs = envBox.required().toString();
  console.log("required integer", rs);
  const envBox2 = anyEnv("ENV_TEST_NUMBER_2");
  const s = envBox2.optional().toString();
  console.log("options integer", s);
});

test("string env", () => {
  const envBox = typedEnv<ProjectEnvName>("NX_WORKSPACE_ROOT");
  const rs = envBox.required().toString();
  console.log("required string", rs);
  const envBox2 = anyEnv("ENV_TEST_STRING_2");
  const s = envBox2.optional().toString();
  console.log("options string", s);
});

test("json env", () => {
  const envBox = typedEnv<ProjectEnvName>("NX_WORKSPACE_ROOT");
  const rs = envBox.required().toString();
  console.log("required json", rs);
  const envBox2 = anyEnv("ENV_TEST_JSON_2");
  const s = envBox2.optional().toString();
  console.log("options json", s);
});
