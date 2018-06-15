const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');

module.exports = class Queue extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            aliases: ['q'],
            description: 'Queue',
            examples: ['q']
        });
    }

    async run(msg) {
        try {
            const player = getPlayer(msg.guild.id);
            msg.say(player.playlist.map((v, i)=>i === player.index?`${v} <--`:v).join('\n'));
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};