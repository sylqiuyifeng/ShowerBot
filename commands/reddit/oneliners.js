const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { r } = require('../../scripts/snoowrap.js')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'oneliners',
            aliases: ['1liners', 'oneliner', '1liner'],
            group: 'reddit',
            memberName: 'oneliners',
            description: 'Get a random oneliners',
            examples: ['oneliners']
        });
    }

    async run(msg) {
        let submission = await r.getSubreddit('oneliners').getRandomSubmission({ limit: 1 })

        const embed = new RichEmbed()
            .setAuthor("ShowerBot", "https://b.thumbs.redditmedia.com/q0bGsXH16vdr73XZwl1ScRWAIZwen-OMrnuMeR8zMIE.png")
            .setColor(16312092)
            .setTitle('/r/oneliners/')
            .setURL(`https://www.reddit.com${submission.permalink}`)
            .setDescription(submission.title)

        return msg.embed(embed);
    }
};