import { User, Message, TextChannel, DMChannel, GroupDMChannel } from 'discord.js';
import { BeewInterface } from './interfaces/BeewInterface';
import CommandOptions from './interfaces/CommandOptions';

export abstract class Command {
    private client: BeewInterface;
    public conf: CommandOptions;
    public cooldowns: Set<User>;

    constructor(client: BeewInterface, options: CommandOptions) {
        this.client = client;

        this.conf = {
            name: options.name,
            description: options.description || 'No information specified.',
            usage: options.usage || '',
            category: options.category || 'Information',
            args: options.args || [],
            cooldown: options.cooldown || 1000,
            requiredPermissions: options.requiredPermissions || ['READ_MESSAGES']
        };

        this.cooldowns = new Set();
    }

    public isAbleToUse(user: User, message: Message): boolean {
        if (
            !this.client.userHasPermission(message.member, this.conf.requiredPermissions) ||
            this.cooldowns.has(user)
        ) {
            message.channel.send('No permission or on cooldown.');
            return false;
        }
        return true;
    }

    public setCooldown(user: User): void {
        this.cooldowns.add(user);

        setTimeout(() => {
            this.cooldowns.delete(user);
        }, this.conf.cooldown);
    }

    public respond(channel: TextChannel | DMChannel | GroupDMChannel, message: string): Command {
        channel.send(message);

        return this;
    }

    public abstract async run(message: Message, args: string[]): Promise<any>;
}
