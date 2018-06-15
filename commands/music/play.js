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
        async function nameToId(name) {
            const result = (await listPlaylists()).find(v => v.name === name);
            if (result) {
                return result;
            } else {
                throw new Error('Unknown playlist');
            }
        }
        try {
            console.log(JSON.stringify(name));
            const id = parseInt(name) || parseInt((await nameToId(name.trim())).id);
            const result = await getPlaylist(id);
            getPlayer(msg.guild.id).play(result, msg.member.voiceChannel, msg.channel);
            msg.say('Now playing...');
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};