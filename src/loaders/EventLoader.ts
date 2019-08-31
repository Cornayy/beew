import * as path from 'path';
import { readdir } from 'fs';
import { Beew } from '../Beew';
import Logger from '../utils/Logger';

export class EventLoader {
    public load(client: Beew): void {
        const dir = client.settings.paths.events;

        readdir(dir, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(evt => {
                const event = new (require(path.join('../../', `${dir}/${evt}`)))(client);
                const eventName = evt.split('.')[0];

                client.on(
                    eventName.charAt(0).toLowerCase() + eventName.slice(1),
                    (...args: string[]) => event.run(...args)
                );
            });
        });
    }
}
