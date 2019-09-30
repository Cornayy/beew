import {
    Client,
    TextChannel,
    DMChannel,
    GroupDMChannel,
    GuildMember,
    PermissionString,
    PresenceData,
    ClientOptions,
    RichEmbed,
    User,
    Guild
} from 'discord.js';

export interface IBeewClient extends Client {
    settings: ISettings;
    commandLoader: any;
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

export interface IUserCooldown {
    user: User;
    guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel | GroupDMChannel;
export type EmbedOrMessage = RichEmbed | string;
