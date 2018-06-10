const { Command } = require('discord.js-commando');
const { list } = require('../../file');

module.exports = class Delete extends Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'file',
            memberName: 'list',
            description: 'list files, output id=>name',
            examples: ['list']
        });
    }

    async run(msg) {
        try {
            const result = await list();
            msg.say(result.join('\n'));
        } catch (e) {
            msg.say(`Error: ${e}`);
        }
    }
};