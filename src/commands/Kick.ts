import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../types';
import { Logger } from '../utils/Logger';

export default class Kick extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'kick',
            description: 'Kicks the user, then reinvites in DM.',
            category: 'Information',
            usage: `${client.settings.prefix}kick @user`,
            cooldown: 1000,
            requiredPermissions: ['ADMINISTRATOR']
        });
    }

    public async run(message: Message): Promise<void> {
        const member = message.mentions.members.first();

        if (!member) throw new Error('No member specified.');

        try {
            const dmChannel = await member.createDM();
            const channel = await message.guild.channels.find(ch => ch.name === 'general');

            if (channel) {
                const invite = await channel.createInvite({ maxAge: 0, maxUses: 1 });

                await dmChannel.send(
                    `You got kicked from: ${message.guild.name}. But here is an invite back since this is not serious.`
                );
                await dmChannel.send(`Here is your invite: ${invite}`);
            }

            await member.kick();
            await super.respond(message.channel, `Succesfully kicked ${member}.`);
        } catch (err) {
            Logger.error(err);
            throw new Error(err);
        }
    }
}
