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
        Mongoose.connection.once('open', () => {
            Logger.info('Connected to database.');
        });

        await Mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@dev-cluster-bsmvv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            { useNewUrlParser: true }
        );

        process.on('SIGINT', () => {
            Mongoose.connection.close(() => {
                Logger.info('Database disconnected.');
                // eslint-disable-next-line no-process-exit
                process.exit(0);
            });
        });
    } catch (err) {
        Logger.error(err);
    }
};
