import {
    TextChannel,
    DMChannel,
    GroupDMChannel,
    GuildMember,
    PermissionString,
    PresenceData,
    ClientOptions,
    Message
} from 'discord.js';

export interface IBeewClient {
    settings: ISettings;
    commandLoader: any;
    userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean;
}

export interface ICommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    args?: string[];
    cooldown: number;
    requiredPermissions: PermissionString[];
}

export interface ISettings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands: string;
        events: string;
    };
}

export interface IEvent {
    client: IBeewClient;
    run(message?: Message): void;
}

export type AnyChannel = TextChannel | DMChannel | GroupDMChannel;