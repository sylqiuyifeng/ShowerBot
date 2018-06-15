const {
    Command
} = require('discord.js-commando');
const {
    getPlayer
} = require('../../file/player');
const { RichEmbed } = require('discord.js');

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
            //create embed
            let embed = new RichEmbed();
            embed.setColor('GOLD');
            //add field
            let playing = [];
            player.playlist.map((v, i) => i === player.index ? embed.addField("Now playing",v) : playing.push(v));
            embed.addField('In queue',playing.join('/n'));
            return msg.embed(embed);
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};