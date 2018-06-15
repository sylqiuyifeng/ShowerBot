const {
    Command
} = require('discord.js-commando');

module.exports = class MusicCommand extends Command {
    constructor(client, cmdinfo) {
        super(client, cmdinfo);
    }
    hasPermission(msg, ownerOverride = true) {
        const result = super.hasPermission(msg, ownerOverride);
        if (result === true) {
            return check(msg);
        } else {
            return result
        }
    }
}

function check(msg) {
    if (!msg.guild || !msg.member.voiceChannel) {
        return 'You have to be in a voice channel to use this command';
    }
    const channelName = msg.client.provider.get(msg.guild.id, 'music-channel', '.*');
    if (!(new RegExp(`^${channelName}$`)).exec(msg.channel.name)) {
        return `You have to be in ${channelName} to use music commands`;
    }
    return true;
}