import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';
import Logger from '../utils/Logger';

export default class Ping extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'thank',
            description: 'Thanks a user and give them karma.',
            category: 'Utility',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message, args: String[]): Promise<void> {
        Logger.info('Method not implemented.');
    }
}
