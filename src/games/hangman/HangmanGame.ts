import { GuildMember } from 'discord.js';

export default class HangmanGame {
    public initiator: GuildMember;
    public participants: Set<GuildMember>;
    public word: string;

    constructor(initiator: GuildMember, word: string) {
        this.participants = new Set();
        this.initiator = initiator;
        this.word = word;

        this.participants.add(initiator);
    }

    addParticipant(participant: GuildMember): boolean {
        if (!this.participants.has(participant)) {
            this.participants.add(participant);
            return true;
        }

        return false;
    }

    start(initiator: GuildMember): boolean {
        if (this.initiator === initiator) {
            // Start game.
        }

        return false;
    }
}
