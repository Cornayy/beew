import * as path from 'path';
import { readdir, statSync } from 'fs';
import { Collection } from 'discord.js';
import { IBeewClient } from '../interfaces/modules/Beew';
import { Command } from '../Command';
import Logger from '../utils/Logger';

export class CommandLoader {
    public commands: Collection<string, Command>;

    constructor() {
        this.commands = new Collection();
    }

    public load(client: IBeewClient): void {
        const { commands } = client.settings.paths;

        readdir(commands, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(cmd => {
                if (statSync(path.join(commands, cmd)).isDirectory()) {
                    this.load(client);
                } else {
                    const Command: any = require(path.join(
                        __dirname,
                        '../../',
                        `${commands}/${cmd.replace('ts', 'js')}`
                    )).default;
                    const command = new Command(client);

                    this.commands.set(command.conf.name, command);
                }
            });
        });
    }
}
