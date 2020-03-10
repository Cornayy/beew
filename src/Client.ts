import * as Discord from 'discord.js';
import { CommandLoader } from './loaders/CommandLoader';
import { ISettings, IBeewClient } from './types';

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
}
