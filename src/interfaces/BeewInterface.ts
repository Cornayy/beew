import { GuildMember, PermissionString } from 'discord.js';
import Settings from './Settings';

export interface BeewInterface {
    settings: Settings;
    commandLoader: any;
    userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean;
}
