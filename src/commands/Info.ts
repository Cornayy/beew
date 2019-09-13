import { Message, RichEmbed } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';
import { GuildModel } from '../database/Database';
import Logger from '../utils/Logger';

export default class Info extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'info',
            description: 'Retrieves user information.',
            category: 'Information',
            usage: '!info @user',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<boolean> {
        const member = message.mentions.members.first();

        if (!member) {
            await super.respond(message.channel, 'You have not specified a user.');
            return false;
        }

        try {
            const { id } = member.guild;
            const guild = await GuildModel.findOne({ id: id }).exec();

            if (guild) {
                const user = guild.users.find(user => user.id === member.id);

                if (user) {
                    const lastKarma = user.karma
                        .map(karma => karma)
                        .sort((a, b) => (a.date > b.date ? 1 : -1))[user.karma.length];
                    const lastKarmaBy = await message.guild.fetchMember(lastKarma.by);

                    const embed = new RichEmbed()
                        .setTitle('User Information')
                        .setDescription(this.conf.description)
                        .setColor(0x00b405)
                        .setThumbnail(member.user.avatarURL)
                        .addField(
                            'Currently Playing',
                            member.user.presence.game ? member.user.presence.game : 'Nothing',
                            true
                        )
                        .addField('Karma', user.karma.length, true)
                        .addField(
                            'Last Karma',
                            `By: **${lastKarmaBy.user.username}**: *${lastKarma.reason}*`
                        )
                        .setFooter(
                            `${message.author.username} at ${new Date().toDateString()}`,
                            message.author.avatarURL
                        );

                    await super.respond(message.channel, embed);
                    return true;
                }
            } else {
                await super.respond(message.channel, 'Something went wrong.');
            }
        } catch (e) {
            Logger.error(e);
        }
        return false;
    }
}
