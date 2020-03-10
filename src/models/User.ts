import { Schema } from 'mongoose';
import { Karma } from './Karma';
import { IUser } from '../types';

export const User = new Schema<IUser>({
    id: String,
    karma: [Karma]
});
