const {subs} = require('../config.json');
const Sub = require('../scripts/sub');
const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

class RedditCommand extends Command {
    constructor(name, client) {
        super(client, {
            name: name,
            aliases: subs[name].aliases,
            group: 'reddit',
            memberName: name,
            description: subs[name].description,
            examples: [`${name}`, `${name} hot`],
            args: [
                {
                    key: 'type',
                    prompt: `Which type of content you wan to see? (Default ${subs[name].default})`,
                    type: 'string',
                    oneOf: ['rnd', 'hot', 'new'],
                    default: subs[name].default
                }
            ]
        });
        this.name = name;
        this.sub = new Sub(subs[name].full);
    }

    async run(msg, { type }) {
        try {
            const submission = await this.sub.getSubmmision(type);
            const embed = new RichEmbed()
                .setColor(163228)
                .setTitle(`/r/${subs[this.name].full}`)
                .setURL(`https://www.reddit.com${submission.permalink}`)
                .setDescription(submission.title)
            if (submission.url.endsWith('.jpg') || submission.url.endsWith('.png')) {
                embed.setImage(submission.url);
            }
            return msg.embed(embed);
        } catch (e) {
            console.error(e);
            return msg.say(`Error: ${e}`);
        }
    }
}

module.exports = function() {
    return Object.keys(subs).map(v=>function () {
        return new RedditCommand(v, ...arguments);
    })
}