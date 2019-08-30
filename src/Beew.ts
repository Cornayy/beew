import { Client } from 'discord.js';
import Settings from './interfaces/Settings';

export default class Beew extends Client {
    public settings: Settings;

    public constructor(settings: Settings) {
        super(settings.clientOptions || {});

        this.settings = settings;
        this.settings.token = process.env.BOT_TOKEN;
    }
}
