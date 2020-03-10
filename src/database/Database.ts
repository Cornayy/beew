import * as Mongoose from 'mongoose';
import { Logger } from '../utils/Logger';

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
