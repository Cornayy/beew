import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';
import Logger from '../utils/Logger';

export default class Kick extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'kick',
            description: 'Kicks the user, then reinvites in DM.',
            category: 'Information',
            usage: '!kick @user',
            cooldown: 1000,
            requiredPermissions: ['ADMINISTRATOR']
        });
    }

    public async run(message: Message): Promise<boolean> {
        const member = message.mentions.members.first();

        if (!member) return false;

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

            return true;
        } catch (err) {
            Logger.error(err);
        }

        return false;
    }
}
