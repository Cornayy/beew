import { Message } from 'discord.js';
import { Command } from '../Command';
import { BeewInterface } from '../interfaces/BeewInterface';

export class Ping extends Command {
    constructor(client: BeewInterface) {
        super(client, {
            name: 'ping',
            description: 'Pings the bot.',
            category: 'Information',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        await super.respond(message.channel, 'Pong');
    }
}
