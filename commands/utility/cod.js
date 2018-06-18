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
        return (msg.author.id === '254077247940460544' ? true : 'You are not SYL, you cannot wash his dishes');
    }

    run(msg, args) {
        let embed = new RichEmbed();
        embed.setTitle(':sweat_drops::fork_knife_plate:');
        embed.setColor('47563E');
        switch (this.state) {
            case 0:
                embed.setDescription('SYL starts playing - Call of Dishes:SoapWarfare');
                this.startTime = new Date();
                this.state = 1;
                msg.embed(embed);
                return msg.delete();

            case 1:
                embed.setDescription(`SYL finished playing - Call of Dishes:SoapWarfare\nUsed time:${Math.trunc((new Date() - this.startTime) / 1000)} seconds`);
                this.state = 0;
                msg.embed(embed);
                return msg.delete();

            default:
                embed.setDescription('How do you find this? It shouldnt happen.');
                return msg.embed(embed);
        }
    }
};