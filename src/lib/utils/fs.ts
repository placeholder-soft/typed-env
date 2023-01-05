import fsa from "fs-extra";
import fs from "fs";
import path from "path";

async function mkdirPath(pathStr: string) {
  let projectPath = "";
  const folderPath = path.parse(pathStr);
  const tempDirArray = folderPath.dir.split("\\");
  for (let i = 0; i < tempDirArray.length; i++) {
    projectPath = projectPath + tempDirArray[i];
    if (fs.existsSync(projectPath)) {
      const tempstats = fs.statSync(projectPath);
      if (!tempstats.isDirectory()) {
        fs.unlinkSync(projectPath);
        fsa.mkdirpSync(projectPath);
      }
    } else {
      fsa.mkdirpSync(projectPath);
    }
  }
  return projectPath;
}

export async function writeFileSync(
  path: string,
  data: string | NodeJS.ArrayBufferView,
  options?: fs.WriteFileOptions
) {
  await mkdirPath(path);
  fs.writeFileSync(path, data, options);
}
