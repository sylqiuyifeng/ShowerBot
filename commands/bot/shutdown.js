const { Command } = require('discord.js-commando');
const { close } = require('../../file');

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

    run(msg, {exit}) {
        console.log('Shutting down the bot');
        msg.say('OOPS i drop my soap.').then(()=>{
            close();
            this.client.destroy().then(()=>{
                process.exit(exit);
            });
        });
    }
};