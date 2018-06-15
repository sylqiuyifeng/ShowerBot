const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');
const MusicCommand = require('../music_command');

module.exports = class Resume extends MusicCommand {
    constructor(client) {
        super(client, {
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'Resume current playing',
            examples: ['resume']
        });
    }

    async run(msg) {
        try {
            getPlayer(msg.guild.id).resume();
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};