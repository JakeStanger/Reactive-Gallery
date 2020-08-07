import sharp from "sharp";
import * as path from "path";
import * as fs from "fs";

export async function generateThumbnail(buffer: Buffer, filename: string) {
  await sharp(buffer)
    .webp({ quality: 90 })
    .resize(360, null)
    .toFile(
      path.join(
        process.env.UPLOAD_PATH,
        "thumb",
        filename.replace(/\.(.*)$/, ".webp")
      )
    );
}

export async function generateMarked(buffer: Buffer, filename: string) {
  let overlay = sharp(
    path.join(__dirname, "../", "../", "resources", "overlay.png")
  );

  const image = await sharp(buffer);
  const { width, height } = await image.metadata();

  overlay = overlay.resize({ withoutEnlargement: true, width, height });
  const overlayBuffer = await overlay.toBuffer();

  return await image
    .composite([
      {
        input: overlayBuffer,
        gravity: sharp.gravity.northwest,
        tile: true
      }
    ])
    .webp({ quality: 95, alphaQuality: 95 })
    .toFile(
      path.join(
        process.env.UPLOAD_PATH,
        "marked",
        filename.replace(/\.(.*)$/, ".webp")
      )
    )
    .then(info => ({ width: info.width, height: info.height }));
}

/**
 * Generates a jpeg from a webp if required.
 * @param filename the webp filename
 * @param type marked or thumb image
 */
export async function generateJpeg(filename: string, type: "marked" | "thumb") {
  const filePath = path.join(process.env.UPLOAD_PATH, type, filename);
  const jpegPath = filePath.replace(/webp$/, "jpeg")

  if (fs.existsSync(jpegPath)) {
    return;
  }

  await sharp(filePath)
    .jpeg({ quality: 98 })
    .toFile(jpegPath);
}
