import * as path from 'path';
import { readdir, statSync } from 'fs';
import { Collection } from 'discord.js';
import { BeewInterface } from '../interfaces/BeewInterface';
import { Command } from '../Command';
import Logger from '../utils/Logger';

export class CommandLoader {
    public commands: Collection<string, Command>;

    constructor() {
        this.commands = new Collection();
    }

    public load(client: BeewInterface): void {
        const dir = client.settings.paths.commands;

        readdir(dir, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(cmd => {
                if (statSync(path.join(dir, cmd)).isDirectory()) {
                    this.load(client);
                } else {
                    const command = new (require(path.join('../../', `${dir}/${cmd}`)))(client);

                    this.commands.set(command.help.name, command);
                }
            });
        });
    }
}
