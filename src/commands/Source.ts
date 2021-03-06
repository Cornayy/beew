import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../types';

export default class Source extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'source',
            description: 'Sends a link to the source code.',
            category: 'Information',
            usage: `${client.settings.prefix}source`,
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        await super.respond(message.channel, 'https://github.com/Cornayy/Beew');
    }
}
