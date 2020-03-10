import { GuildMember } from 'discord.js';
import { Client } from '../Client';
import { IEvent } from '../types';
import { GuildModel } from '../models/Guild';
import { Logger } from '../utils/Logger';

export default class GuildMemberRemove implements IEvent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async run(args: any): Promise<void> {
        const member: GuildMember = args;

        try {
            const { id } = member.guild;
            const guild = await GuildModel.findOne({ id: id }).exec();

            if (guild) {
                guild.users = guild.users.filter(user => user.id !== member.id);

                await guild.save();
            }
        } catch (e) {
            Logger.error(e);
        }
    }
}
