import { Schema } from 'mongoose';
import { IKarma } from '../types';

export const Karma = new Schema<IKarma>({
    reason: String,
    by: String,
    date: Date
});
