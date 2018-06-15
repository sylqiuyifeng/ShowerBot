const {
    Command
} = require('discord.js-commando');
const {
    listPlaylists,
    getPlaylist
} = require('../../file/music');
const {
    getPlayer
} = require('../../file/player');
const MusicCommand = require('../music_command');

module.exports = class Play extends MusicCommand {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            aliases: ['p'],
            memberName: 'play',
            args: [{
                key: 'name',
                prompt: `ID or the name of the playlist`,
                type: 'string'
            }],
            description: 'play playlist',
            examples: ['play test']
        });
    }

    async run(msg, {
        name
    }) {
        try {
            const id = parseInt(name) || parseInt((await listPlaylists()).find(v => v.name === name).id);
            const [result, channel] = await Promise.all([
                getPlaylist(id),
                msg.member.voiceChannel.join()
            ])
            getPlayer(msg.guild.id).play(result, channel, msg.channel);
        } catch (e) {
            console.log(e);
            msg.say(`Error: ${e}`);
        }
    }
};