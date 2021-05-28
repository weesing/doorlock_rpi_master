import { BLELib } from '../lib/ble';
import { BLELibTest } from '../lib/ble_test';
import logger from '../lib/logger';

var boot = async function (testMode = false) {
  const config = require('../../config/config.json');

  logger.info(`Configuration loaded`);
  logger.info(config);

  if (testMode) {
    logger.warn(`Running in test mode.`);
    await BLELibTest.getInstance().initBLE();
  } else {
    await BLELib.getInstance().initBLE();
  }
};

export default boot;
