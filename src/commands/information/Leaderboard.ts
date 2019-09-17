import { Message } from 'discord.js';
import { Command } from '../../Command';
import { IBeewClient } from '../../interfaces/modules/Beew';
import Logger from '../../utils/Logger';
import { GuildModel } from '../../database/Database';

export default class Leaderboard extends Command {
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
        try {
            const guild = await GuildModel.find({ id: message.guild }).exec();
        } catch (e) {
            Logger.error(e);
        }

        return true;
    }
}
