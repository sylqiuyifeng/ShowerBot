const {
    Command
} = require('discord.js-commando');
const {
    download
} = require('../../file/proxy');
const {
    domain,
    port
} = require('../../config.json');

module.exports = class Download extends Command {
    constructor(client) {
        super(client, {
            name: 'download',
            group: 'file',
            memberName: 'download',
            description: 'Download a file',
            examples: ['download http://example.com']
        });
    }

    async run(msg) {
        msg.say('Request received!');
        try {
            const id = await download(msg.argString.trim());
            msg.say(`Download success!`);
            msg.say(`ID: ${id}`);
            msg.say(`http://${domain}:${port}/${id}`);
        } catch (e) {
            msg.say(`Error downloading: ${e}`);
        }
    }
};