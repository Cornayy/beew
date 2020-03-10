import * as dotenv from 'dotenv';
import { settings } from './config/config';
import { Client } from './Client';
import { EventLoader } from './loaders/EventLoader';

dotenv.config();

const client = new Client(settings);
const events = new EventLoader();

events.load(client);
client.login(client.settings.token);
