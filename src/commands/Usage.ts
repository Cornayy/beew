import { Message, RichEmbed } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../types';

export default class Usage extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'usage',
            description: 'Shows the usage of a command',
            category: 'Information',
            usage: `${client.settings.prefix}usage <command>`,
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message, args: any[]): Promise<void> {
        const [command] = args;
        const cmd: Command = this.client.commandLoader.commands.find(
            (cmd: Command) => cmd.conf.name === command
        );

        if (!cmd) {
            await super.respond(message.channel, 'Could not find that command.');
            throw new Error('Command not found');
        }

        const embed = new RichEmbed()
            .setTitle(`Usage for: **${cmd.conf.name}**`)
            .setDescription(cmd.conf.description)
            .setColor(0x00b405)
            .addField('Category', cmd.conf.category, true)
            .addField('Usage', cmd.conf.usage, true)
            .setFooter(
                `${this.client.user.username} at ${new Date().toDateString()}`,
                this.client.user.avatarURL
            );

        await super.respond(message.channel, embed);
    }
}
