# typed-env

typed-env can help us better handle environment variables

## Methods

### [cli](#use-typed-env-cli)

- [use](#use-cli)
- [get-env](#get-env-cli)
- [get-env-name](#get-env-name-cli)
- [gen-env](#gen-env-cli)

### [lib](#use-typed-env-lib)

- [generateCallUsageReport](#generateCallUsageReport-lib)
- [typeEnv](#typeEnv-lib)
- [anyEnv](#anyEnv-lib)
- [genEnvName](#genEnvName-lib)
- [genEnv](#genEnv-lib)
- [generateTypedEnvCallUsageReport](#generateTypedEnvCallUsageReport-lib)

## Install

```bash
npm install typed-env
```

## <span id="use-typed-env-cli">Use typed-env cli</span>

### <span id="use-cli">use</span>

typed-env use [local | dev]

```bash
typed-env use local
```

### <span id="get-env-cli">get-env</span>

typed-env get-env current-env-json change-env-json

```bash
typed-env get-env "$(env)" "$(env)"
```

### <span id="get-env-name-cli">get-env-name</span>

typed-env get-env-name current-env-json change-env-json

```bash
typed-env get-env "$(env)" "$(env)"
```

### <span id="gen-env-cli">gen-env</span>

typed-env gen-env sourceFilePath tsconfigPath output

```bash
typed-env gen-env /Users/home/projects/src/lib/usage-typed-env.ts /Users/home/projects/tsconfig.json /Users/home/projects/.env
```

## <span id="use-typed-env-lib">Use typed-env lib</span>

### <span id="generateCallUsageReport-lib">generateCallUsageReport</span>

```typescript
generateCallUsageReport({
  sourceFilePath: "/home/index.ts",
  options: {
    tsConfigFilePath: "/home/.tsconfig.json",
  },
  chainCallFuncNames: [
    "typedEnv",
    "default",
    "required",
    "optional",
    "toString",
    "toInt",
    "toBoolean",
  ],
  convertData: (data: TParseParameters[][]) => {
    ...
    return parse(data);
  },
});
```

### <span id="typeEnv-lib">typeEnv</span>

```typescript
typedEnv<T>("TEST").required().toInt();
```

### <span id="anyEnv-lib">anyEnv</span>

```typescript
anyEnv("TEST").required().toInt();
```

### <span id="genEnvName-lib">genEnvName</span>

```typescript
genEnvName({
  sourceFilePath: "/home/index.ts",
  options: {
    tsConfigFilePath: "/home/.tsconfig.json",
  },
  output: "/home/env-name.ts",
});
```

### <span id="genEnv-lib">genEnv</span>

```typescript
genEnv({
  sourceFilePath: "/home/index.ts",
  options: {
    tsConfigFilePath: "/home/.tsconfig.json",
  },
  output: "/home/.env",
});
```

### <span id="generateTypedEnvCallUsageReport-lib">generateTypedEnvCallUsageReport</span>

```typescript
const info = generateTypedEnvCallUsageReport({
  sourceFilePath: "/home/index.ts",
  options: {
    tsConfigFilePath: "/home/.tsconfig.json",
  },
});
```
