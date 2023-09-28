import path from 'path';
import fs from 'fs-extra';

export const link = async (cwd: string, target: string) => {
  const targetDir = path.join(cwd, target);

  const files = fs.readdirSync(targetDir);
  const fileNames = files.map((item) => item.split('.')[0]);

  const fileImports = files.map((item) => import(`${cwd}/${target}/${item}`));
  const fileContents = await Promise.all(fileImports);
  const items = fileNames.map((name, index) => ({
    ...fileContents[index],
    name,
  }));

  return items;
};