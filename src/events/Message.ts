import * as Discord from 'discord.js';
import { Beew } from '../Beew';

export default class Message {
    private client: Beew;

    constructor(client: Beew) {
        this.client = client;
    }

    run(message: Discord.Message): void {
        if (message.author.bot || !message.content.startsWith(this.client.settings.prefix)) return;

        const args = message.content.split(/\s+/g);
        const command = args[0].slice(this.client.settings.prefix.length);
        const cmd = this.client.commandLoader.commands.get(command);

        if (!cmd) return;
        if (!cmd.isAbleToUse(message.author, message)) return;

        cmd.run(message, args);

        if (cmd.conf.cooldown > 0) cmd.setCooldown(message.author);
    }
}
