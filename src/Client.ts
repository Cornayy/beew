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
                .map(guild => guild.id)
                .filter(id => !guilds.includes(id))
                .forEach(async id => {
                    const guild = new GuildModel({
                        id: id
                    });

                    await guild.save();
                });

            Logger.info('Synced guilds.');
        } catch (e) {
            Logger.error(e);
        }
    }
}
