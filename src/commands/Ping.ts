import { Message } from 'discord.js';
import { Command } from '../Command';
import { BeewClient } from '../interfaces/BeewClient';

export default class Ping extends Command {
    constructor(client: BeewClient) {
        super(client, {
            name: 'ping',
            description: 'Pings the bot.',
            category: 'Information',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        await super.respond(message.channel, 'Pong!');
    }
}
