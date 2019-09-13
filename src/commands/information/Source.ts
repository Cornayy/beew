import { Message } from 'discord.js';
import { Command } from '../../Command';
import { IBeewClient } from '../../interfaces/modules/Beew';

export default class Source extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'source',
            description: 'Sends a link to the source code.',
            category: 'Information',
            usage: '!source',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<boolean> {
        await super.respond(message.channel, 'https://github.com/Cornayy/Beew');

        return true;
    }
}
