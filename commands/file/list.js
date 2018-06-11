const { Command } = require('discord.js-commando');
const { list } = require('../../file');
const { RichEmbed } = require('discord.js');

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
            const embed = new RichEmbed({
                title: 'List of files',
                description: result.join('\n')||'No file'
            });
            msg.embed(embed);
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};