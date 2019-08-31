import { PermissionString } from 'discord.js';

export default interface CommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    args?: string[];
    cooldown: number;
    requiredPermissions: PermissionString[];
}
