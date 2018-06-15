const {
    Command
} = require('discord.js-commando');

module.exports = class MusicCommand extends Command {
    constructor(client, cmdinfo) {
        super(client, cmdinfo);
    }
    hasPermission(msg, ownerOverride = true) {
        return super.hasPermission(msg, ownerOverride) && check(msg);
    }
}

function check(msg) {
    if (!msg.guild || !msg.member.voiceChannel) {
        msg.say('You have to be in a voice channel to use this command');
        return false;
    }
    const channelName = msg.client.provider.get(msg.guild.id, 'music-channel', '.*');
    if (!(new RegExp(`^${channelName}$`)).exec(msg.channel.name)) {
        msg.say(`You have to be in ${channelName} to use music commands`);
        return false;
    }
    return true;
}