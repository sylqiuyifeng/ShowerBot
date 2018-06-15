const {
    Command
} = require('discord.js-commando');
const {
    list
} = require('../../file/proxy');
const {
    domain,
    port
} = require('../../config.json');
const {
    RichEmbed
} = require('discord.js');

module.exports = class List extends Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'file',
            aliases: ['ls'],
            memberName: 'list',
            description: 'list files, output id=>name',
            examples: ['list']
        });
    }

    async run(msg) {
        try {
            const result = await list();
            const length = list ? list[0][0].toString().length : 0;
            const embed = new RichEmbed({
                title: 'List of files',
                description: result.map(v => {
                    const width = v[0].toString().length;
                    return `${v[0]}${' '.repeat(length-width)} => [${v[1]}](http://${domain}:${port}/proxy/${v[0]})`;
                }).join('\n') || 'No file'
            });
            msg.embed(embed);
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};