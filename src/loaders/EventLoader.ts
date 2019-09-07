import * as path from 'path';
import { readdir } from 'fs';
import { Client } from '../Client';
import Logger from '../utils/Logger';

export class EventLoader {
    public load(client: Client): void {
        const dir = client.settings.paths.events;

        readdir(dir, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(evt => {
                const Event: any = require(path.join(
                    __dirname,
                    '../../',
                    `${dir}/${evt.replace('ts', 'js')}`
                )).default;

                const event = new Event(client);
                const eventName = evt.split('.')[0];

                client.on(
                    eventName.charAt(0).toLowerCase() + eventName.slice(1),
                    (...args: string[]) => event.run(...args)
                );
            });
        });
    }
}
