const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const { r } = require('../../scripts/snoowrap.js')

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shower',
            aliases: ['sw'],
            group: 'reddit',
            memberName: 'shower',
            description: 'Get a random shower thought',
            examples: ['shower random', 'shower hot'],
            args: [
                {
                    key: 'type',
                    prompt: 'Which type of content you wan to see?',
                    type: 'string',
                    oneOf: ['random', 'hot'],
                    default: 'random'
                }
            ]
        });
    }

    async run(msg, { type }) {
        if (type === 'random') {
            let submission = await r.getRandomSubmission('Showerthoughts')

            const embed = new RichEmbed()
                .setColor(163228)
                .setTitle('/r/Showerthoughts/')
                .setURL(`https://www.reddit.com${submission.permalink}`)
                .setDescription(submission.title)

            return msg.embed(embed);
        }
        else {
            return msg.say('water is hot');
        }

    } 
};