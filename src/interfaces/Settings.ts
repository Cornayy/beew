import { PresenceData, ClientOptions } from 'discord.js';

export default interface Settings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands: './src/commands';
        events: './src/events';
        services: './src/services';
    };
}
