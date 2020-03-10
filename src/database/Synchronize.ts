import { Collection, Guild } from 'discord.js';
import { GuildModel } from '../models/Guild';
import { Logger } from '../utils/Logger';

/**
 * Compares the client's guilds with the database's guilds.
 * Updates all the missing guilds.
 * @returns {void}
 */
export const updateGuilds = async (discordGuilds: Collection<string, Guild>): Promise<void> => {
    try {
        const guilds = (await GuildModel.find({}).exec()).map(guild => guild.id);

        discordGuilds
            .filter(guild => !guilds.includes(guild.id))
            .forEach(async guild => {
                const newGuild = new GuildModel({
                    id: guild.id,
                    users: guild.members.map(member => {
                        return {
                            id: member.id,
                            karma: []
                        };
                    })
                });

                await newGuild.save();
            });

        Logger.info('Synced guilds.');
    } catch (e) {
        Logger.error(e);
    }
};

/**
 * Compares all the users of the client's guilds with the guild's users in the database.
 * Updates all the missing users.
 * @returns {void}
 */
export const updateGuildMembers = async (
    discordGuilds: Collection<string, Guild>
): Promise<void> => {
    try {
        const guilds = await GuildModel.find({}).exec();

        guilds.forEach(async guild => {
            const actualGuild = discordGuilds.find(clientGuild => clientGuild.id === guild.id);

            if (actualGuild) {
                const actualMembers = actualGuild.members.map(user => user.id);
                const members = guild.users.map(user => user.id);

                actualMembers
                    .filter(user => !members.includes(user))
                    .forEach(id => {
                        guild.users.push({
                            id: id,
                            karma: []
                        });
                    });

                await GuildModel.updateOne({ id: guild.id }, guild);
            }
        });
        Logger.info('Synced guild members.');
    } catch (e) {
        Logger.error(e);
    }
};
