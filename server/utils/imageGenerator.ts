import sharp from "sharp";
import * as path from "path";
import config from "../config.json";

export async function generateThumbnail(buffer: Buffer, filename: string) {
  await sharp(buffer)
    .jpeg({ quality: 98 })
    .resize(360, null)
    .toFile(path.join(config.uploadPath, filename + ".thumb"));
}

export async function generateMarked(buffer: Buffer, filename: string) {
  await sharp(buffer)
    .jpeg({ quality: 100 })
    .composite([
      {
        input: path.join(
          __dirname,
          "../",
          "../",
          "resources",
          "overlay.png"
        ),
        gravity: sharp.gravity.northwest,
        tile: true
      }
    ])
    .toFile(path.join(config.uploadPath, filename + ".marked"));
}
