import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';
import Logger from '../utils/Logger';

export default class Clear extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'clear',
            description: 'Clears the specified amount of messages.',
            category: 'Utility',
            usage: `${client.settings.prefix}clear <amount>`,
            cooldown: 1000,
            requiredPermissions: ['ADMINISTRATOR']
        });
    }

    public async run(message: Message, args: any[]): Promise<void> {
        const amount = parseInt(args[0], 10);

        if (!amount) throw new Error('No amount argument');

        try {
            const messages = await message.channel.fetchMessages({ limit: amount });
            await message.channel.bulkDelete(messages);

            super.respond(message.channel, `Cleared ${messages.size} message(s).`);
        } catch (e) {
            Logger.error(e);
            throw new Error(e);
        }
    }
}
