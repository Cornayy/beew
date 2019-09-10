import { Message, GuildMember } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';
import { GuildModel } from '../database/Database';
import Logger from '../utils/Logger';

export default class Ping extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'thank',
            description: 'Thanks a user and give them karma.',
            category: 'Utility',
            cooldown: 86400000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message, args: any[]): Promise<boolean> {
        const id: string = args[0];
        const reason = args.slice(1).join(' ');
        const member = message.guild.members.get(id.replace(/[\\<>@#&!]/g, ''));

        if (!member || !reason) {
            super.respond(message.channel, 'You have not specified a member or reason.');
            return false;
        }

        try {
            const { id } = member.guild;
            const guild = await GuildModel.findOne({ id: id }).exec();

            if (guild) {
                const user = guild.users.find(user => user.id === member.id);

                if (user) {
                    user.karma.push({ reason: reason, by: message.member.id, date: new Date() });

                    await guild.save();
                    super.respond(message.channel, `${member.user} has gained 1 karma.`);

                    return true;
                }
            } else {
                super.respond(message.channel, 'Something went wrong.');
            }
        } catch (e) {
            Logger.error(e);
        }
        return false;
    }
}
