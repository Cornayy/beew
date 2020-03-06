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

    public async run(message: Message): Promise<void> {
        const { commands } = this.client.commandLoader;
        const embed = new RichEmbed()
            .setTitle('Help')
            .setDescription(
                `${this.conf.description}, the prefix used for commands is: '${this.client.settings.prefix}'.
                 You can also check the usage of a command with !usage command.`
            )
            .setColor(0x00b405)
            .setFooter(
                `${this.client.user.username} at ${new Date().toDateString()}`,
                this.client.user.avatarURL
            );

        commands.forEach((command: Command) =>
            embed.addField(command.conf.name, `*${command.conf.usage}*`, true)
        );

        await super.respond(message.channel, embed);
    }
}
