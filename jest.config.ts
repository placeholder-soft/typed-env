/* eslint-disable */
export default {
  displayName: "typed-env",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    },
  },
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "html"],
  testPathIgnorePatterns: [
    "__tests__/.env",
    "__tests__/env-name.ts",
    "__tests__/usage-typed-env.ts",
  ],
};
