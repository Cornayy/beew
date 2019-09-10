import {
    TextChannel,
    DMChannel,
    GroupDMChannel,
    GuildMember,
    PermissionString,
    PresenceData,
    ClientOptions,
    RichEmbed,
    User
} from 'discord.js';

export interface IBeewClient {
    settings: ISettings;
    commandLoader: any;
    user: User;
    userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean;
    updateGuilds(): Promise<void>;
}

export interface ICommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
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
    run(args?: any[]): void;
}

export type AnyChannel = TextChannel | DMChannel | GroupDMChannel;
export type EmbedOrMessage = RichEmbed | string;
