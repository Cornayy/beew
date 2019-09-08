import * as Discord from 'discord.js';
import { CommandLoader } from './loaders/CommandLoader';
import { ISettings, IBeewClient } from './interfaces/modules/Beew';
import { GuildModel } from './database/Database';
import Logger from './utils/Logger';

export class Client extends Discord.Client implements IBeewClient {
    public settings: ISettings;
    public commandLoader: CommandLoader;

    public constructor(settings: ISettings) {
        super(settings.clientOptions || {});

        this.settings = settings;
        this.settings.token = process.env.BOT_TOKEN;

        this.commandLoader = new CommandLoader();
        this.commandLoader.load(this);
    }

    public userHasPermission(
        user: Discord.GuildMember,
        requiredPermissions: Discord.PermissionString[]
    ): boolean {
        return user.hasPermission(requiredPermissions, false, true, true);
    }

    async updateGuilds(): Promise<void> {
        try {
            const guilds = (await GuildModel.find({}).exec()).map(guild => guild.id);

            this.guilds
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
            await this.updateGuildMembers();
        } catch (e) {
            Logger.error(e);
        }
    }

    async updateGuildMembers(): Promise<void> {
        try {
            const guilds = await GuildModel.find({}).exec();

            guilds.forEach(async guild => {
                const actualMembers = this.guilds
                    .find(clientGuild => clientGuild.id === guild.id)
                    .members.map(user => user.id);
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
                Logger.info('Synced guild members.');
            });
        } catch (e) {
            Logger.error(e);
        }
    }
}
