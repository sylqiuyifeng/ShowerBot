const { Command } = require('discord.js-commando');

module.exports = class Shutdown extends Command {
    constructor(client) {
        super(client, {
            name: 'shutdown',
            group: 'bot',
            memberName: 'shutdown',
            description: 'Shutdown the bot',
            examples: ['shutdown'],
            ownerOnly: true
        });
    }

    run(msg) {
        msg.say('OOPS i drop my soap.');
        return this.client.destroy();
    }
};