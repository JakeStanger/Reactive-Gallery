import sharp from "sharp";
import * as path from "path";

export async function generateThumbnail(buffer: Buffer, filename: string) {
  await sharp(buffer)
    .jpeg({ quality: 98 })
    .resize(360, null)
    .toFile(path.join(process.env.UPLOAD_PATH, filename + ".thumb"));
}

export async function generateMarked(buffer: Buffer, filename: string) {
  let overlay = sharp(
    path.join(__dirname, "../", "../", "resources", "overlay.png")
  );

  const image = await sharp(buffer).jpeg({ quality: 98 });
  const { width, height } = await image.metadata();

  overlay = overlay.resize({ withoutEnlargement: true, width, height });
  const overlayBuffer = await overlay.toBuffer();

  await image
    .composite([
      {
        input: overlayBuffer,
        gravity: sharp.gravity.northwest,
        tile: true
      }
    ])
    .toFile(path.join(process.env.UPLOAD_PATH, filename + ".marked"));
}
