import { ExifData, ExifImage } from "exif";
import { DateTime } from "luxon";

async function loadExif(image: Buffer) {
  return await new Promise<Error | ExifData>(
    (resolve, reject) =>
      new ExifImage(image, (err, data) => {
        if (data) resolve(data);
        else reject(err);
      })
  );
}

export async function getExif(image: Buffer) {
  const exif = await loadExif(image);

  if ((exif as Error).message) throw exif;

  const imageData: any = {};

  if ((exif as ExifData).exif) {
    const exifRaw = (exif as ExifData).exif;

    imageData.width = exifRaw.ExifImageWidth;
    imageData.height = exifRaw.ExifImageHeight;

    imageData.exposure = exifRaw.ExposureTime;
    imageData.focalLength = exifRaw.FocalLength;
    imageData.aperture = exifRaw.FNumber;
    imageData.iso = exifRaw.ISO;
    imageData.cameraModel = (exif as ExifData).image.Model;

    const timeTaken = DateTime.fromFormat(
      exifRaw.DateTimeOriginal,
      "yyyy:MM:dd hh:mm:ss"
    );
    if (timeTaken && timeTaken.isValid)
      imageData.timeTaken = timeTaken.toJSDate();
  }

  return imageData;
}
