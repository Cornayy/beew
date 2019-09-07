import { Client } from '../Client';
import { connect as connectToDatabase } from '../database/Database';
import Logger from '../utils/Logger';

export default class Ready {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async run(): Promise<void> {
        Logger.info('Beew is running.');

        this.client.user.setPresence(this.client.settings.presence);
        connectToDatabase();
    }
}
