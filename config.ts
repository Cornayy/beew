import { ISettings } from './src/types/Beew';

const settings: ISettings = {
    presence: {
        game: {
            name: '!help for commands',
            type: 'PLAYING'
        }
    },
    prefix: '!',
    paths: {
        commands: 'src/commands',
        events: 'src/events'
    }
};

export default settings;
