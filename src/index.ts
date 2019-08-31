import * as dotenv from 'dotenv';
import settings from '../config';
import { Beew } from './Beew';
import { EventLoader } from './loaders/EventLoader';

dotenv.config();

const client: Beew = new Beew(settings);
const events = new EventLoader();

events.load(client);
client.login(client.settings.token);
