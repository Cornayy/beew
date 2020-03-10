import { Document } from 'mongoose';

export interface IUser {
    id: string;
    karma: IKarma[];
}

export interface IKarma {
    reason: string;
    by: string;
    date: Date;
}

export interface IGuild extends Document {
    id: string;
    users: IUser[];
}
