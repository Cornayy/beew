import { Client, GuildMember, PermissionString } from 'discord.js';
import { CommandLoader } from './loaders/CommandLoader';
import { Settings } from './modules/beew';

export class Beew extends Client {
    public settings: Settings;
    public commandLoader: CommandLoader;

    public constructor(settings: Settings) {
        super(settings.clientOptions || {});

        this.settings = settings;
        this.settings.token = process.env.BOT_TOKEN;

        this.commandLoader = new CommandLoader();
        this.commandLoader.load(this);
    }

    public userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean {
        return user.hasPermission(requiredPermissions, false, true, true);
    }
}
