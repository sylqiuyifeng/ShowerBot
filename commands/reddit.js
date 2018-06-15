const {
    subs
} = require('../setting.json');
const Sub = require('../scripts/sub');
const {
    Command
} = require('discord.js-commando');
const {
    RichEmbed
} = require('discord.js');

class RedditCommand extends Command {
    constructor(name, client) {
        super(client, {
            name: name,
            aliases: subs[name].aliases,
            group: 'reddit',
            memberName: name,
            description: subs[name].description,
            examples: [`${name}`, `${name} hot`],
            args: [{
                key: 'type',
                prompt: `Which type of content you wan to see? (Default ${subs[name].default})`,
                type: 'string',
                oneOf: ['rnd', 'hot', 'new'],
                default: subs[name].default
            }]
        });
        this.name = name;
        this.sub = new Sub(subs[name].name);
    }

    async run(msg, {
        type
    }) {
        try {
            const submission = await this.sub.getSubmmision(type);
            const embed = new RichEmbed()
                .setColor(163228)
                .setTitle(`/r/${subs[this.name].name}`)
                .setURL(`https://www.reddit.com${submission.permalink}`)
                .setDescription(submission.title)
            if (submission.preview && submission.preview.images) {
                const url = submission.preview.images[0].source.url;
                embed.setImage(url);
            }
            return msg.embed(embed);
        } catch (e) {
            console.error(e);
            return msg.say(`Error: ${e}`);
        }
    }
}

module.exports = function () {
    return Object.keys(subs).map(v => function () {
        return new RedditCommand(v, ...arguments);
    })
}