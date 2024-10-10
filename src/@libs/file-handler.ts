import path from "node:path";
import fs from "node:fs";

const publicDir = path.join(process.cwd(), 'public');

export async function readJSONFileAsync(filePath: string) {
  try {
    const fullPath = path.join(publicDir, filePath);
    const data = await fs.promises.readFile(fullPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("파일을 읽는 중 오류 발생:", error);
    throw error;
  }
}

export async function writeJSONFileAsync(filePath: string, data: unknown) {
  try {
    const fullPath = path.join(publicDir, filePath);
    await fs.promises.writeFile(
      fullPath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("파일을 쓰는 중 오류 발생:", error);
    throw error;
  }
}

// export async function readKanbanItemsAsync() {
//   return readJSONFileAsync('static/kanban-items.json');
// }

// export async function readKanbanStacksAsync() {
//   return readJSONFileAsync('static/kanban-stacks.json');
// }
