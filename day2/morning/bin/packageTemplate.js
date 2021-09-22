import fs from "fs";
import ejs from "ejs";
import prettier from "prettier";
import { fileURLToPath } from 'url'
import path from 'path'
export function createPackage(inputConfig) {
  const __dirname = fileURLToPath(import.meta.url)
  const template = fs.readFileSync(path.resolve(__dirname,"../template/package.ejs"), "utf-8");
  const code = ejs.render(template, {
    static: inputConfig.middleware[0] || "",
    router: inputConfig.middleware[1] || "",
    packageName: inputConfig.packageName,
  });
  return prettier.format(code, {
    parser: "json"
  });
}
