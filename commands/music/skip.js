const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');
const MusicCommand = require('../music_command');

module.exports = class Skip extends MusicCommand {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Skip current playing',
            examples: ['skip']
        });
    }

    async run(msg) {
        try {
            getPlayer(msg.guild.id).skip();
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};