import { GuildMember, PermissionString } from 'discord.js';
import Settings from './Settings';

export interface BeewClient {
    settings: Settings;
    commandLoader: any;
    userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean;
}
