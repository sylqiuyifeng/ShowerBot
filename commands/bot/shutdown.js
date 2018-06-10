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
            ownerOnly: true
        });
    }

    run(msg) {
        msg.say('OOPS i drop my soap.').then(()=>{
            close();
            this.client.destroy().then(()=>{
                process.exit();
            });
        });
    }
};