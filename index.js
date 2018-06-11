const { CommandoClient, Command , SQLiteProvider } = require('discord.js-commando');
const { token, clientId, clientSecret, refreshToken, owners } = require('./config.json')
const { prefix } = require('./setting.json');
const sqlite = require('sqlite');
const path = require('path');
const snoowrap = require('snoowrap');
const reddit = require('./commands/reddit');

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
        ['file', 'File download']
    ])
    .registerCommands(reddit())
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
});

client.login(token);