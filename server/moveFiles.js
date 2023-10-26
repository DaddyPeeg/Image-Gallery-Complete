import fs from "fs/promises";
import path from "path";

export default async function moveFile(sourceFile, destination) {
  try {
    if (!(await fs.stat(destination).catch(() => false))) {
      await fs.mkdir(destination, { recursive: true });
    }
    await fs.copyFile(
      `${sourceFile}`,
      `${destination}/${path.basename(sourceFile)}`
    );
    console.log("File copied successfully!");
    setTimeout(async () => {
      await fs.unlink(sourceFile);
      console.log("Original file deleted successfully!");
    }, 1000);
  } catch (err) {
    console.error(err);
  }
}
