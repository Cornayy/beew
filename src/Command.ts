import { User, Message } from 'discord.js';
import {
    AnyChannel,
    IBeewClient,
    ICommandOptions,
    EmbedOrMessage
} from './interfaces/modules/Beew';

export abstract class Command {
    protected client: IBeewClient;
    public conf: ICommandOptions;
    public cooldowns: Set<User>;

    constructor(client: IBeewClient, options: ICommandOptions) {
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

    public hasPermission(user: User, message: Message): boolean {
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

    public respond(channel: AnyChannel, message: EmbedOrMessage): Command {
        channel.send(message);

        return this;
    }

    public abstract async run(message: Message, args: string[]): Promise<boolean>;
}
