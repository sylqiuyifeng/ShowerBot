const { Command } = require('discord.js-commando');
const { close } = require('../../file/db');

module.exports = class Shutdown extends Command {
    constructor(client) {
        super(client, {
            name: 'shutdown',
            group: 'bot',
            memberName: 'shutdown',
            description: 'Shutdown the bot',
            examples: ['shutdown'],
            ownerOnly: true,
            args: [
                {
                    key: 'exit',
                    prompt: `Exit code (default 0)`,
                    type: 'integer',
                    default: 0
                }
            ]
        });
    }

    async run(msg, {exit}) {
        console.log('Shutting down the bot');
        await msg.say('OOPS i drop my soap.')
        await close();
        await this.client.destroy();
        process.exit(exit);
    }
};