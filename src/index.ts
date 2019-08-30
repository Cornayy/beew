import * as dotenv from 'dotenv';
import Beew from './Beew';
import settings from '../config';

dotenv.config();

const client: Beew = new Beew(settings);
client.login(client.settings.token);
