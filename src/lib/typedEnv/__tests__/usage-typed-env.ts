import { EnvBox } from "../env-box";

export function typedEnv<T extends string>(key: T) {
  return EnvBox.of(key);
}

export function anyEnv(key: string) {
  // typedEnv("ddd").default("");
  return EnvBox.of(key);
}

export function aaa() {
  // typedEnv("aaa").optional().toBoolean();
}

typedEnv("bbb").required().default("111").toInt(111);
typedEnv("bbb").default("222").required().toInt(222);
typedEnv("bbb").default("333").required().toInt(333);
typedEnv("bbb").default("333").required().toString();

typedEnv("ccc").required().default("111").toInt(111);
typedEnv("ccc").default("222").required().toInt(222);
typedEnv("ccc").default("333").required().toInt(333);
typedEnv("ccc").default("333").required().toString();

// typedEnv("");typedEnv("bbb").required().toInt(111);typedEnv("bbb").required().toInt(222);

// typedEnv("bbb").required().toInt(111);typedEnv("bbb").required().toInt(111);
// typedEnv("bbb").required().toInt(111);
// typedEnv().required().toInt();
// typedEnv("");
// typedEnv("ccc").required().toInt(222);
