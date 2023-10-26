import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// let date = new Date();
// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// let dayOfWeek = date.getDay();
// let dayWeek = ["Sun", "Mon", "Tue", "Wed", "Fri", "Sat"];

export default async function folderCheck(folderName) {
  const pictureDir = `${__dirname}\\public\\assets`;
  const imageFolder = path.join(pictureDir, folderName);

  let dir = await fs.readdir(pictureDir);
  if (!dir.includes(folderName)) {
    await fs.mkdir(imageFolder);
  }

  return folderName;
}
