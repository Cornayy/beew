import { Settings } from './src/modules/beew';

const settings: Settings = {
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
