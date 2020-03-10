import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../types';
import { GuildModel } from '../models/Guild';
import { Logger } from '../utils/Logger';

export default class Thank extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'thank',
            description: 'Thanks a user and give them karma.',
            category: 'Utility',
            usage: `${client.settings.prefix}thank @user <reason>`,
            cooldown: 86400000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message, args: any[]): Promise<void> {
        const [id] = args;
        const reason = args.slice(1).join(' ');
        const member = message.guild.members.get(id.replace(/[\\<>@#&!]/g, ''));

        if (!member || !reason || member.user === message.author) {
            await super.respond(
                message.channel,
                'You have not specified a member or reason. Or did you try thanking yourself? :thinking:'
            );
            throw new Error('You have not specified a member or reason.');
        }

        try {
            const { id } = member.guild;
            const guild = await GuildModel.findOne({ id: id }).exec();

            if (guild) {
                const user = guild.users.find(user => user.id === member.id);

                if (user) {
                    user.karma.push({ reason: reason, by: message.member.id, date: new Date() });

                    await guild.save();
                    await super.respond(message.channel, `${member.user} has gained 1 karma.`);
                }
            } else {
                await super.respond(message.channel, 'Something went wrong.');
                throw new Error('Something went wrong.');
            }
        } catch (e) {
            Logger.error(e);
            throw new Error('Something went wrong.');
        }
    }
}
