import Settings from './src/interfaces/Settings';

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
