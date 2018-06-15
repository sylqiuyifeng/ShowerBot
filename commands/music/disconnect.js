const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');
const MusicCommand = require('../music_command');

module.exports = class Play extends MusicCommand {
    constructor(client) {
        super(client, {
            name: 'disconnect',
            group: 'music',
            aliases: ['dc'],
            memberName: 'disconnect',
            description: 'disconnect from the voice channel',
            examples: ['dc']
        });
    }

    async run(msg) {
        try {
            getPlayer(msg.guild.id).exit();
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};