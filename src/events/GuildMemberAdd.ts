import { GuildMember } from 'discord.js';
import { Client } from '../Client';
import Logger from '../utils/Logger';
import { IEvent } from '../interfaces/modules/Beew';
import { GuildModel } from '../database/Database';

export default class GuildMemberAdd implements IEvent {
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
                guild.users.push({
                    id: member.id,
                    karma: []
                });

                await guild.save();
            }
        } catch (e) {
            Logger.error(e);
        }
    }
}
