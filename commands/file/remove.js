const {
    Command
} = require('discord.js-commando');
const {
    remove
} = require('../../file/proxy');

module.exports = class Delete extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            group: 'file',
            memberName: 'delete',
            description: 'delete a file using file id, for bot owner only',
            examples: ['delete 1'],
            ownerOnly: true
        });
    }

    async run(msg) {
        try {
            const result = await remove(msg.argString.trim());
            msg.say(result);
        } catch (e) {
            msg.say(`Error deleting: ${e}`);
        }
    }
};