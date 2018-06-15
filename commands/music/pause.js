const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');
const MusicCommand = require('../music_command');

module.exports = class Pause extends MusicCommand {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pause current playing',
            examples: ['pause']
        });
    }

    async run(msg) {
        try {
            getPlayer(msg.guild.id).pause();
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};