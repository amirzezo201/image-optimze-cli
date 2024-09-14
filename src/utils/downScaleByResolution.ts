import sharp from "sharp";
import fs from "fs/promises";
import { logger } from "./logger.js";

export const downScaleByResolution = async (
  srcPath: string,
  destPath: string,
  maxWidth: number,
  maxHeight: number
) => {
  try {
    logger.info(`Optimizing by resolution: ${srcPath}`);

    const image = sharp(srcPath);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Unable to read image dimensions");
    }

    const aspectRatio = metadata.width / metadata.height;

    let newWidth = Math.min(metadata.width, maxWidth);
    let newHeight = Math.round(newWidth / aspectRatio);

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = Math.round(newHeight * aspectRatio);
    }

    await image
      .resize(newWidth, newHeight, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(destPath);

    logger.info(`Image saved: ${destPath}`);
  } catch (error) {
    logger.error(
      `Error processing file ${srcPath}: ${(error as Error).message}`
    );
  }
};