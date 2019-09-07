/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Discord from 'discord.js';
import { Client } from '../Client';
import { IEvent } from '../interfaces/modules/Beew';

export default class Message implements IEvent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    run(message: Discord.Message): void {
        if (message.author.bot || !message.content.startsWith(this.client.settings.prefix)) return;

        const args = message.content.split(/\s+/g);
        const command = args.shift()!.slice(this.client.settings.prefix.length);
        const cmd = this.client.commandLoader.commands.get(command);

        if (!cmd) return;
        if (!cmd.hasPermission(message.author, message)) return;

        cmd.run(message, args);

        if (cmd.conf.cooldown > 0) cmd.setCooldown(message.author);
    }
}
