import sharp from "sharp";
import fs from "fs/promises";
import { logger } from "./logger.js";

export const downscaleBySize = async (
  srcPath: string,
  destPath: string,
  maxSizeInBytes: number,
  quality = 80
) => {
  try {
    logger.info(`Downscaling by size: ${srcPath}`);
    let data = await sharp(srcPath).jpeg({ quality }).toBuffer();
    
    while (data.length > maxSizeInBytes && quality > 10) {
      quality -= 10;
      logger.warn(
        `File size exceeds ${maxSizeInBytes} bytes. Reducing quality to ${quality}% and retrying...`
      );
      data = await sharp(srcPath).jpeg({ quality }).toBuffer();
    }

    await fs.writeFile(destPath, data);
    logger.info(`Image saved: ${destPath}`);
  } catch (error) {
    logger.error(
      `Error processing file ${srcPath}: ${(error as Error).message}`
    );
  }
};