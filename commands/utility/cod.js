const {
    Command
} = require('discord.js-commando');
const {
    RichEmbed
} = require('discord.js');

module.exports = class COD extends Command {
    constructor(client) {
        super(client, {
            name: 'cod',
            group: 'utility',
            memberName: 'cod',
            description: 'Call of Dishes',
            examples: ['cod']
        });

        //0 for not start,1 for started
        this.state = 0;
        this.startTime = null;
    }

    hasPermission(msg, ownerOverride = false) {
        return (msg.author.id === '254077247940460544'?true:'You are not SYL, you cannot wash dishes');
    }

    run(msg, args) {
        return msg.say("You are SYL");
    }
};