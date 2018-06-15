const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');
const MusicCommand = require('../music_command');

module.exports = class NowPlaying extends MusicCommand {
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