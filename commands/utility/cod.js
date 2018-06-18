const {
    Command
} = require('discord.js-commando');
const {
    RichEmbed
} = require('discord.js');

module.exports = class COD extends Command {
    constructor(client) {
        super(client, {
            name: 'choose',
            group: 'utility',
            memberName: 'choose',
            description: 'Choose one from given choices',
            examples: ['choose A B C'],
            argsType: 'multiple'
        });

        //0 for not start,1 for started
        this.state = 0;
        this.startTime = null;
    }

    hasPermission(msg, ownerOverride = false) {
        return msg.author.id === 254077247940460544;
    }

    run(msg, args) {
        return msg.say("You are SYL");
    }
};