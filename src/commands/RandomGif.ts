import fetch from 'node-fetch';
import { Message } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';
import Logger from '../utils/Logger';

export default class RandomGif extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'randomgif',
            description: 'Sends a random gif.',
            category: 'Utility',
            usage: '!randomgif <tag> (optional)',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message, args: any[]): Promise<void> {
        try {
            const response = await this.getResponse(args);
            const json = await response.json();

            super.respond(message.channel, json.data.url);
        } catch (e) {
            Logger.error(e);
            throw new Error(e);
        }
    }

    async getResponse(args: any[]): Promise<any> {
        const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_KEY}`;

        if (args.length > 0) {
            return fetch(
                `https://api.giphy.com/v1/gifs/random?tag=${args.join('+')}&api_key=${
                    process.env.GIPHY_KEY
                }`
            );
        }
        return fetch(endpoint);
    }
}
