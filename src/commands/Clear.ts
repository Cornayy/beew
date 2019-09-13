import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';

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
        const [amount] = args;

        if (!amount) return false;

        return true;
    }
}
