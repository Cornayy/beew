import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../types';
import { GuildModel } from '../models/Guild';
import { Logger } from '../utils/Logger';

export default class BigThank extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'bigthank',
            description: 'Thanks a user and give them a specified amount of karma.',
            category: 'Utility',
            usage: `${client.settings.prefix}thank @user <amount> <reason>`,
            cooldown: 1000,
            requiredPermissions: ['ADMINISTRATOR']
        });
    }

    public async run(message: Message, args: any[]): Promise<void> {
        const [id] = args;
        const amount = parseInt(args[1], 10);
        const reason = args.slice(2).join(' ');
        const member = message.guild.members.get(id.replace(/[\\<>@#&!]/g, ''));

        if (!member || !reason) {
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
                    for (let i = 0; i < amount; i += 1) {
                        user.karma.push({
                            reason: reason,
                            by: message.member.id,
                            date: new Date()
                        });
                    }

                    await guild.save();
                    await super.respond(
                        message.channel,
                        `${member.user} has gained ${amount} karma.`
                    );
                }
            } else {
                await super.respond(message.channel, 'Something went wrong.');
                throw new Error('Something went wrong.');
            }
        } catch (e) {
            Logger.error(e);
            throw new Error(e);
        }
    }
}
