import { PresenceData, ClientOptions } from 'discord.js';

export default interface Settings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands: string;
        events: string;
    };
}
