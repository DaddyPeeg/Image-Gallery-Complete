import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import moveFile from "./moveFiles.js";

let imageFiles = [];
const getDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return [month, day, year];
};

async function getImageFiles(dirPath) {
  const files = await fs.readdir(dirPath);

  for (let file of files) {
    const filePath = path.join(dirPath, file);
    const stat = await fs.stat(filePath);

    if (
      stat.isFile() &&
      [".jpg", ".jpeg", ".png", ".gif"].includes(path.extname(file))
    ) {
      imageFiles.push(filePath);
    }
  }
  return imageFiles;
}

export default async function imageResize(
  inputDir,
  size,
  outputDir,
  counter,
  breakpoint,
  date,
  filesImages
) {
  let count = 0;
  const outDir = await outputDir;
  const files = await getImageFiles(inputDir);
  files.forEach(async (files, index) => {
    let fileArray = await files.split("\\");
    try {
      sharp(files)
        .metadata()
        .then((metadata) => {
          sharp(files)
            .resize(size, Math.floor((metadata.height / metadata.width) * size))
            .withMetadata()
            .jpeg({ mozjpeg: true, quality: 60, force: true })
            .toFile(
              `./public/assets/${outDir}/${fileArray[fileArray.length - 1]}`,
              async (err, info) => {
                if (err) {
                  console.error(err);
                } else {
                  if (counter === breakpoint) {
                    count += 1;
                    if (count === breakpoint) {
                      const [month, day, year] = date;
                      filesImages.forEach((file) => {
                        moveFile(
                          `./public/assets/${month}-${day}-${year}_${file.originalname}`,
                          "./public/assets/images"
                        );
                      });
                    }
                  }
                }
              }
            );
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.log(err);
    }
  });
}

// imageResize("./public/assets/Sharp", resize, folderCheck(`${resize}_Image`));
