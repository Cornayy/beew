import { Message } from 'discord.js';
import { Command } from '../../Command';
import { IBeewClient } from '../../interfaces/modules/Beew';

export default class Source extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'hangman',
            description: 'Starts a new game of hangman.',
            category: 'Game',
            usage: '!hangman',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<boolean> {
        await super.respond(message.channel, 'https://github.com/Cornayy/Beew');

        return true;
    }
}
