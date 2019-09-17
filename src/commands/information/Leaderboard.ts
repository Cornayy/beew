import { Message, RichEmbed } from 'discord.js';
import { Command } from '../../Command';
import { IBeewClient } from '../../interfaces/modules/Beew';
import Logger from '../../utils/Logger';
import { GuildModel } from '../../database/Database';

export default class Leaderboard extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'leaderboard',
            description: 'Sends a leaderboard of users sorted by karma.',
            category: 'Information',
            usage: '!leaderboard',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<boolean> {
        try {
            const guild = await GuildModel.findOne({ id: message.guild }).exec();

            if (guild) {
                const { users } = guild;
                const sortedUsers = users.sort((a, b) => (a.karma > b.karma ? 1 : -1));
                const embed = new RichEmbed()
                    .setTitle('User Information')
                    .setDescription(this.conf.description)
                    .setColor(0x00b405);

                sortedUsers.forEach(async user => {
                    const guildUser = await message.guild.fetchMember(user.id);
                    embed.addField(guildUser.user.username, user.karma);
                });

                super.respond(message.channel, embed);
                return true;
            }
        } catch (e) {
            Logger.error(e);
            return false;
        }

        return false;
    }
}
