import { rm } from "fs/promises";
import { join } from "path";

const targets = [".next", "node_modules"];

for (const arg of targets) {
  const path = join(process.cwd(), arg);
  console.log(`rm.mjs: deleting path "${path}"`);
  await rm(path, { recursive: true, force: true });
}
