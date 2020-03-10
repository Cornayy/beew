import { Schema, Model, model } from 'mongoose';
import { IGuild } from '../types';
import { User } from './User';

export const Guild = new Schema<IGuild>({
    id: String,
    users: [User]
});

export const GuildModel: Model<IGuild> = model<IGuild>('Guild', Guild);
