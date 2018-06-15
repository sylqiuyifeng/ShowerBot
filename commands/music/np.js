const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');

module.exports = class NowPlaying extends Command {
    constructor(client) {
        super(client, {
            name: 'nowplaying',
            group: 'music',
            memberName: 'nowplaying',
            aliases: ['np'],
            description: 'Get the name of the song now playing',
            examples: ['np']
        });
    }

    async run(msg) {
        try {
            msg.say(getPlayer(msg.guild.id).getNp());
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};