const {
    Command
} = require('discord.js-commando');

module.exports = class Limit extends Command {
    constructor(client) {
        super(client, {
            name: 'limit',
            group: 'music',
            memberName: 'limit',
            description: 'limit the channel for using the player',
            examples: ['limit dj'],
            args: [{
                key: 'name',
                prompt: `Regex or the name of the channel`,
                type: 'string'
            }],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR']
        });
    }

    run(msg, {
        name
    }) {
        msg.client.provider.set(msg.guild.id, 'music-channel', name);
        msg.say(`Limited player usage to ${name}`);
    }
};