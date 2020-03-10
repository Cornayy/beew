import { Message, RichEmbed } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../types';
import { GuildModel } from '../models/Guild';
import Logger from '../utils/Logger';

export default class Leaderboard extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'leaderboard',
            description: 'Sends a leaderboard of top ten users sorted by karma.',
            category: 'Information',
            usage: '!leaderboard',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<boolean> {
        try {
            const guild = await GuildModel.findOne({ id: message.guild.id }).exec();

            if (guild) {
                const { users } = guild;
                const sortedUsers = users
                    .sort((a, b) => (a.karma.length < b.karma.length ? 1 : -1))
                    .slice(0, 10);
                const embed = new RichEmbed()
                    .setTitle('User Information')
                    .setDescription(this.conf.description)
                    .setColor(0x00b405);

                await sortedUsers.forEach(async user => {
                    const guildUser = await message.guild.fetchMember(user.id);
                    embed.addField(
                        guildUser.nickname ? guildUser.nickname : guildUser.user.username,
                        user.karma.length,
                        false
                    );
                });

                await super.respond(message.channel, embed);
                return true;
            }
        } catch (e) {
            Logger.error(e);
            return false;
        }

        return false;
    }
}
