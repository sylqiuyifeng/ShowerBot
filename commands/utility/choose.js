const {
    Command
} = require('discord.js-commando');
const {
    RichEmbed
} = require('discord.js');

module.exports = class Choose extends Command {
    constructor(client) {
        super(client, {
            name: 'choose',
            group: 'utility',
            memberName: 'choose',
            description: 'Choose one from given choices',
            examples: ['choose A B C'],
            argsType: 'multiple'
        });
    }

    run(msg, args) {
        const embed = new RichEmbed()
            .addField(':slot_machine:', args[Math.floor(Math.random() * args.length)])
            .setColor('RANDOM')
        return msg.embed(embed)
    }
};