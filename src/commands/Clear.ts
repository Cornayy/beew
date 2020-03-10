import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../types';
import Logger from '../utils/Logger';

export default class Clear extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'clear',
            description: 'Clears the specified amount of messages.',
            category: 'Utility',
            usage: '!clear <amount>',
            cooldown: 1000,
            requiredPermissions: ['ADMINISTRATOR']
        });
    }

    public async run(message: Message, args: any[]): Promise<boolean> {
        const amount = parseInt(args[0], 10);

        if (!amount) return false;

        try {
            const messages = await message.channel.fetchMessages({ limit: amount });
            await message.channel.bulkDelete(messages);

            super.respond(message.channel, `Cleared ${messages.size} message(s).`);

            return true;
        } catch (e) {
            Logger.error(e);
        }

        return false;
    }
}
