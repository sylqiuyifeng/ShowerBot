const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { r } = require('../../scripts/snoowrap.js')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tightpussy',
            aliases: ['pussy'],
            group: 'reddit',
            memberName: 'tightpussy',
            description: 'Get a random PUSSY',
            examples: ['tightpussy']
        });
    }

    async run(msg) {
        let submission = await r.getSubreddit('TIGHTPUSSY').getRandomSubmission({ limit: 1 })

        const embed = new RichEmbed()
            .setAuthor("ShowerBot", "https://b.thumbs.redditmedia.com/q0bGsXH16vdr73XZwl1ScRWAIZwen-OMrnuMeR8zMIE.png")
            .setColor(16098851)
            .setTitle('/r/TIGHTPUSSY/')
            .setURL(`https://www.reddit.com${submission.permalink}`)
            .setDescription(submission.title)
            .setImage(submission.url)

        return msg.embed(embed);
    }
};