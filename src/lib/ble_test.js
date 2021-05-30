import { BLEEngine } from './ble_engine';
import { SecretsLoader } from './secrets_loader';
import logger from './logger';

export class BLEEngineTest extends BLEEngine {
  constructor() {
    super();

    const secrets = SecretsLoader.loadSecrets();
    this.testMAC = secrets.testMAC.toLowerCase();
  }

  async onDataReceived(peripheral, data, isNotification) {
    super.onDataReceived(peripheral, data, isNotification);
    if (peripheral.id === this.testMAC) {
      this.connectionManager.peripheralStatuses[peripheral.id].appendBuffer(data);
      const buffer = this.connectionManager.peripheralStatuses[peripheral.id].buffer;
      const history = this.connectionManager.peripheralStatuses[peripheral.id].dataStringHistory;
      logger.info(`[${peripheral.id}] Peripheral buffer - '${buffer}'`);
      logger.info(`[${peripheral.id}] Peripheral history - ${history}`);

      switch (peripheral.id) {
        case this.testMAC: {
          break;
        }
      }
    }
  }

  get connectionTargetMACs() {
    return [this.testMAC];
  }
}
