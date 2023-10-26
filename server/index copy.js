import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";

import imageResize from "./sharp.js";
import folderCheck from "./folder.js";
import moveFile from "./moveFiles.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const getDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return [month, day, year];
};

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const [month, day, year] = getDate();
    cb(null, `${month}-${day}-${year}_${file.originalname}`);
  },
});

const upload = multer({ storage: fileStorage });
app.get("/upload", (req, res) => {
  res.send("Hello World");
});
app.post("/upload", upload.array("photos"), async (req, res) => {
  try {
    const imageSizes = [4320, 2160, 1080, 640, 384, 256, 128];
    imageSizes.forEach((size) => {
      imageResize("./public/assets", size, folderCheck(`${size}_Image`));
    });
    const files = await req.files;
    const [month, day, year] = getDate();
    files.forEach(async (file) => {
      moveFile(
        `./public/assets/${month}-${day}-${year}_${file.originalname}`,
        "./public/assets/images"
      );
    });
    res.status(201).json({ message: `${req.files.length} Files Uploaded` });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

const PORT = process.env.NODE_PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
