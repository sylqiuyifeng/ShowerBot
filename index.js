const { CommandoClient, Command } = require('discord.js-commando');
const { token } = require('./config.json');
const {clientId,clientSecret,refreshToken} = require('./config.json')
const path = require('path');
const snoowrap = require('snoowrap');

const client = new CommandoClient({
    commandPrefix: '^',
    owner: '254077247940460544',
    disableEveryone: true
});

const r = new snoowrap({
    userAgent: 'ShowerBot',
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['bot', 'Bot commands'],
        ['reddit', 'Reddits']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('Logged in!');
});

client.login(token);