const { Command } = require('discord.js-commando');
const {listPlaylists} = require('../../file/music');
const { domain, port } = require('../../config.json');
const { RichEmbed } = require('discord.js');

module.exports = class Playlist extends Command {
    constructor(client) {
        super(client, {
            name: 'playlist',
            group: 'music',
            aliases: ['pl'],
            memberName: 'playlist',
            description: 'List playlists',
            examples: ['playlist']
        });
    }

    async run(msg) {
        try {
            const result = await listPlaylists();
            const length = result?result[0].id.toString().length:0;
            const embed = new RichEmbed({
                title: 'Playlists',
                url: `http://${domain}:${port}/player/playlist.html`,
                description: result.map(v=>{
                    const width = v.id.toString().length;
                    return `${v.id}${' '.repeat(length-width)}=> ${v.name}`;
                }).join('\n')||'Empty'
            });
            msg.embed(embed);
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};