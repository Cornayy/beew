import { Message, RichEmbed } from 'discord.js';
import { Command } from '../Command';
import { IBeewClient } from '../interfaces/modules/Beew';

export default class Help extends Command {
    constructor(client: IBeewClient) {
        super(client, {
            name: 'help',
            description: 'Displays all the commands.',
            category: 'Information',
            usage: '!help',
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<boolean> {
        const { commands } = this.client.commandLoader;
        const embed = new RichEmbed()
            .setTitle('Help')
            .setDescription(
                `${this.conf.description}, the prefix used for commands is: '${this.client.settings.prefix}'.`
            )
            .setColor(0x00b405)
            .setFooter(
                `${this.client.user.username} at ${new Date().toDateString()}`,
                this.client.user.avatarURL
            );

        commands.forEach((command: Command) =>
            embed.addField(command.conf.name, `*${command.conf.category}*`, true)
        );

        await super.respond(message.channel, embed);

        return true;
    }
}
