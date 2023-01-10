# typed-env

typed-env can help us better handle environment variables

## Methods

### [cli](#use-typed-env-cli)

- [diff-env](#diff-env-cli)
- [diff-env-name](#diff-env-name-cli)
- [generate-env](#generate-env-cli)

### [lib](#use-typed-env-lib)

- [typeEnv](#typeEnv-lib)
- [anyEnv](#anyEnv-lib)
- [generateEnvName](#generateEnvName-lib)
- [generateEnv](#generateEnv-lib)
- [generateTypedEnvCallUsageReport](#generateTypedEnvCallUsageReport-lib)

## Install

```bash
npm install typed-env
```

## <span id="use-typed-env-cli">Use typed-env cli</span>

### <span id="diff-env-cli">diff-env</span>

Output changed environment variables

typed-env diff-env current-env-json change-env-json

```bash
$ typed-env diff-env "$(env)" "$(env)"
```

### <span id="diff-env-name-cli">diff-env-name</span>

Output changed environment variable name

typed-env diff-env-name current-env-json change-env-json

```bash
$ typed-env diff-env "$(env)" "$(env)"
```

### <span id="generate-env-cli">generate-env</span>

Check the file according to tsconfig and generate environment variables

typed-env generate-env sourceFilePath tsconfigPath output

```bash
$ typed-env generate-env /Users/home/projects/src/lib/usage-typed-env.ts /Users/home/projects/tsconfig.json /Users/home/projects/.env
```

## <span id="use-typed-env-lib">Use typed-env lib</span>

### <span id="typeEnv-lib">typeEnv</span>

```typescript
declare function typedEnv(key: EnvName): EnvBox<EnvName>;

typedEnv<T>("TEST").required().toInt();
```

### <span id="anyEnv-lib">anyEnv</span>

```typescript
anyEnv("TEST").required().toInt();
```

### <span id="generateEnvName-lib">generateEnvName</span>

Check the file according to tsconfig and generate environment variable name

```typescript
generateEnvName({
  sourceFilePath: "/home/index.ts",
  options: {
    tsConfigFilePath: "/home/.tsconfig.json",
  },
  output: "/home/env-name.ts",
});
```

### <span id="generateEnv-lib">generateEnv</span>

Check the file according to tsconfig and generate environment variables

```typescript
generateEnv({
  sourceFilePath: "/home/index.ts",
  options: {
    tsConfigFilePath: "/home/.tsconfig.json",
  },
  output: "/home/.env",
});
```

### <span id="generateTypedEnvCallUsageReport-lib">generateTypedEnvCallUsageReport</span>

Check the Typed-env call report of the file according to tsconfig

```typescript
const info = generateTypedEnvCallUsageReport({
  sourceFilePath: "/home/index.ts",
  options: {
    tsConfigFilePath: "/home/.tsconfig.json",
  },
});
```
