import { terminalPrompt } from './utils/terminal.js';
import { logger } from './utils/logger.js';
import { appEntry } from './utils/entry.js';
const main = async () => {
  logger.info('Starting the image downscaling process...');
  const options:any = await terminalPrompt();
  console.log(options);
  appEntry(options.srcPath, options.destPath, options);
};

main();