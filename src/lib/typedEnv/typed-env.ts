import { EnvBox } from "./env-box";

export function typedEnv<T extends string>(key: T) {
  return EnvBox.of(key);
}

export function anyEnv(key: string) {
  return EnvBox.of(key);
}
