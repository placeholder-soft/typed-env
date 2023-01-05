import fs from "fs";
import path from "path";

const KNodeModulesFolderPath = path.resolve(process.cwd(), "./node_modules");
const KPackagePath = path.resolve(process.cwd(), "./package.json");

export const packageJson = JSON.parse(fs.readFileSync(KPackagePath, "utf-8"));

const packageName = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.devDependencies),
];

export const packageNameWithVersion = packageName.map((r) => {
  const result = JSON.parse(
    fs.readFileSync(
      path.resolve(KNodeModulesFolderPath, `${r}/package.json`),
      "utf-8"
    )
  );

  return `${r}@${result.version}`;
});
