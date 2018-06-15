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
            embed.setTitle('Playlist');
            embed.setDescription(player.playlist.map((v, i) => i === player.index ? `**${v}**` : v).join('\n'));
            return msg.embed(embed);
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};