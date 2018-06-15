const {
    CommandoClient,
    SQLiteProvider
} = require('discord.js-commando');
const {
    token,
    owners
} = require('./config.json')
const {
    prefix
} = require('./setting.json');
const sqlite = require('sqlite');
const path = require('path');
const reddit = require('./commands/reddit');

require('./web/server');

const client = new CommandoClient({
    commandPrefix: prefix,
    owner: owners,
    disableEveryone: true
});

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new SQLiteProvider(db))
).catch(console.error);

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['bot', 'Bot commands'],
        ['reddit', 'Reddits'],
        ['file', 'File download'],
        ['utility', 'Utility functions'],
        ['music', 'Music']
    ])
    .registerCommands(reddit())
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
});

client.login(token);