import {
    TextChannel,
    DMChannel,
    GroupDMChannel,
    GuildMember,
    PermissionString,
    PresenceData,
    ClientOptions
} from 'discord.js';

export interface BeewClient {
    settings: Settings;
    commandLoader: any;
    userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean;
}

export interface CommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    args?: string[];
    cooldown: number;
    requiredPermissions: PermissionString[];
}

export interface Settings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands: string;
        events: string;
    };
}

export type AnyChannel = TextChannel | DMChannel | GroupDMChannel;
