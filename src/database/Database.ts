import * as Mongoose from 'mongoose';
import { IUser, IKarma, IGuild } from '../interfaces/modules/Guild';
import Logger from '../utils/Logger';

const Karma = new Mongoose.Schema<IKarma>({
    id: String,
    reason: String,
    by: String,
    date: Date
});

const User = new Mongoose.Schema<IUser>({
    id: String,
    karma: [Karma]
});

const Guild = new Mongoose.Schema<IGuild>({
    id: String,
    users: [User]
});

export const GuildModel: Mongoose.Model<IGuild> = Mongoose.model<IGuild>('Guild', Guild);

export const connect = async (): Promise<void> => {
    try {
        await Mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dev-cluster-bsmvv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            { useNewUrlParser: true }
        );

        Logger.info('Connected to database.');
    } catch (err) {
        Logger.error(err);
    }
};
