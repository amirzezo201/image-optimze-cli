import { logger } from "./logger.js";
import fs from "fs/promises";
import path from "path";
import { downscaleBySize } from "./downScaleBySize.js";
import { downScaleByResolution } from "./downScaleByResolution.js";

export const appEntry = async (srcPath: string, destPath: string, options: any) => {
  logger.info(`Scanning directory: ${srcPath}`);  
  try {
    const files = await fs.readdir(srcPath);
    logger.info(`Found ${files.length} files/directories in ${srcPath}`);

    for (const file of files) {
      const srcFilePath = path.join(srcPath, file);
      const destFilePath = path.join(destPath, file);
      logger.info(`Processing file: ${srcFilePath}`);
      logger.info(`Optimzarion  name: ${options}`);
      try {
        const stats = await fs.stat(srcFilePath);
        
        if (stats.isDirectory()) {
          logger.info(`${srcFilePath} is a directory. Creating in destination and recursing.`);
          await fs.mkdir(destFilePath, { recursive: true });
          await appEntry(srcFilePath, destFilePath, options);
        } else if (stats.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
          logger.info(`${srcFilePath} is an image file.`);
          logger.info(`Copying file to destination: ${JSON.stringify(options.optimize)}`);
          if (options.optimize === "By Size") {
            logger.info(`Optimizing by size: ${srcFilePath}`);
            const maxSizeInBytes = (options.maxSize as number) * 1024 * 1024;
            await downscaleBySize(srcFilePath, destFilePath, maxSizeInBytes);
          } else if (options.optimize === "By Resolution") {
            logger.info(`Optimizing by resolution: ${srcFilePath}`);
            if (typeof options.resolution !== 'string') {
              throw new Error(`Invalid resolution option: ${options.resolution}`);
            }
            const [maxWidth, maxHeight] = options.resolution.split(",").map(Number);
            if (isNaN(maxWidth) || isNaN(maxHeight)) {
              throw new Error(`Invalid resolution values: width=${maxWidth}, height=${maxHeight}`);
            }
            await downScaleByResolution(srcFilePath, destFilePath, maxWidth, maxHeight);
          } else {
            logger.warn(`Unknown optimization option: ${options.optimize}`);
          }
        } else {
          logger.info(`Skipping non-image file: ${srcFilePath}`);
        }
      } catch (err: any) {
        logger.error(`Error processing file ${srcFilePath}: ${err.message}`);
      }
    }
  } catch (err: any) {
    logger.error(`Error reading directory ${srcPath}: ${err.message}`);
  }
};