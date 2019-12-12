import { Message } from 'discord.js';
import * as fetch from 'node-fetch';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';
import Logger from '../utils/Logger';

export default class RandomGif extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'randomgif',
            description: 'Sends a random gif.',
            category: 'Utility',
            usage: `${client.settings.prefix}randomgif <tag> (optional)`,
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message, args: any[]): Promise<boolean> {
        try {
            const response = await this.getResponse(args);
            const json = await response.json();

            json
                ? await super.respond(message.channel, json.data.url)
                : await super.respond(message.channel, 'No gif found.');

            return true;
        } catch (e) {
            Logger.error(e);
        }

        return false;
    }

    async getResponse(args: any[]): Promise<any> {
        const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}`;

        if (args.length > 0) {
            return fetch.default(
                `https://api.giphy.com/v1/gifs/random?tag=${args.join('+')}&api_key=${
                    process.env.GIPHY_KEY
                }`
            );
        }
        return fetch.default(endpoint);
    }
}
