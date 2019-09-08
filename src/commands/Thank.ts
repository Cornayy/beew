import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';

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

    public async run(message: Message, args: string[]): Promise<void> {
        message.channel.send('Thank');
        console.log(args);
    }
}
